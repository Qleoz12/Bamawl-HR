/* eslint-disable no-use-before-define */
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import SalaryTransferSettingHeaderBox from '../../hr-common/employee-personal-header-box/HeaderBox';
import SalaryTransferSettingEmployeeBox from './SalaryTransferSettingEmployeeBox';
import SalaryTransferSettingPaymentAmountBox from './SalaryTransferSettingPaymentAmountBox';
import SalaryTransferSettingTable from './SalaryTransferSettingTable';
import SaveAndPrevAndNextSalaryTransferSetting from './SaveAndPrevAndNextSalaryTransferSetting';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    const [fixedAmount, setFixedAmount] = useState({}); // for amount data 

    const [rowCount, setRowCount] = useState('');           // For row count
    const [mainTable, setMainTable] = useState([]);
    const [currencySetting, setCurrencySetting] = useState([]); //get data for currency in search form
    const [currencyTable, setCurrencyTable] = useState([]);
    const [editData, setEditData] = useState([]); // for Edit data
    const [detailData, setDetailData] = useState([]); // for Edit data
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
    const [paymentTypeState, setPaymentTypeState] = useState({});
    const [showAmount, setShowAmount] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For View_Permission API

    const typingTimeoutRef = useRef(null);    // keep value time out 
    // Loaded initially
    useEffect(() => {
        loadViewPermission();
        let object = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT")); // return data from EMPLOYEE List Form
        let edit_Data = object.id;
        if (!object) {
            history.push('./employee-list')
        }
        else {
            // localStorage.removeItem("RETURN_EMP_LIST_ID_EDIT");
            if (edit_Data) {
                let edit_id = edit_Data;
                setEditData(edit_id);
                editIndex(edit_id);
            }
        }
    }, []);

    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

/* GET VIEW PERMISSION */
const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setViewPermissionAPI(response.data.view_permission);
    }
  };

    /** Start Save/Update function */
    const closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    };
    let saveData = () => {
        let total = [];
        let total_amount = [];
        let amount_salary = [];
        let errMsgAll = [];
        setError([]);
        setSuccess("");

        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id;
        });
        if (showAmount == false) {
            const errMsg = t("JSE132").replace("%s", 'payment amount');
            errMsgAll.push(errMsg);
        } else {
            currencySetting.forEach((main, index) => {
                main.priority_list.forEach((element, idx) => {
                    element = { ...element, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: fixedAmount[main.currency_desc + idx], amount_type: paymentTypeState[index].toString() }
                    total.push({ currency_desc: main.currency_desc, monthly_salary: main.monthly_salary, amount: element.amount, amount_type: element.amount_type }) //push currency name and amount into new array
                    payment_list.push(element)
                    if (isEmpty(element.bank_currency_id)) {
                        const errMsg = t("JSE001").replace("%s", 'Bank currency id ' + element.bank_name + '(' + element.priority_name + ')');
                        errMsgAll.push(errMsg);
                    }
                    if (isEmpty(element.priority)) {
                        const errMsg = t("JSE001").replace("%s", 'Priority ' + element.bank_name + '(' + element.priority_name + ')');
                        errMsgAll.push(errMsg);
                    }
                    if (isEmpty(element.amount) || element.amount === "") {
                        const errMsg = t("JSE124").replace("%s", 'Amount ' + element.bank_name + '(' + element.priority_name + ')');
                        errMsgAll.push(errMsg);
                    }
                    if (!isEmpty(element.amount) && element.amount_type === "2" && element.amount > 2147483647) {
                        const errMsg = t("JSE128").replace("%s", element.bank_name + '(' + element.priority_name + ')').replace("%s", '2147483647 ');
                        errMsgAll.push(errMsg);
                    }
                })
            });
      
       
        // fill total_amount array with amount_type = 1
        total_amount = total.filter(item => item.amount_type === "1")
        const unique = [...new Set(total_amount.map(item => item.currency_desc))];
        let amount = [];
        unique.map((i, index) => {
            let a = {
                amount: 0,
                currency_desc: ""
            }
            amount[index] = a;
            total_amount.map(it => {
                if (it.currency_desc === i) {
                    amount[index].amount += parseInt(it.amount);
                    amount[index].currency_desc = it.currency_desc;
                }
            })
        })
        amount.map(item => {
            if (item.amount < 100) {
                const errMsg = t("JSE10020").replace("%s", item.currency_desc);
                errMsgAll.push(errMsg);
            } else if (item.amount > 100) {
                const errMsg = t("JSE10021").replace("%s", item.currency_desc);
                errMsgAll.push(errMsg);
            }
        })

        amount_salary = total.filter(item => item.amount_type === "2")
        const salary = [...new Set(amount_salary.map(item => item.currency_desc))]
        let total_salary = [];
        salary.map((sal, idx) => {
            let b = {
                amount: 0,
                currency_desc: "",
                monthly_salary: 0
            }
            total_salary[idx] = b;
            amount_salary.map(it => {
                if (it.currency_desc === sal) {
                    total_salary[idx].amount += parseInt(it.amount);
                    total_salary[idx].currency_desc = it.currency_desc;
                    total_salary[idx].monthly_salary = it.monthly_salary;
                }
            })
        })
        total_salary.map(item => {
            if (item.monthly_salary !== null && item.amount > item.monthly_salary) {
                const errMsg = t("JSE002").replace("%s", t("Total amount at ") + item.currency_desc).replace("%s", t('your salary amount'));
                errMsgAll.push(errMsg);
            } else if(item.monthly_salary === null) {
                const errMsg = t("JSE175");
                errMsgAll.push(errMsg);
            }
        })
    }   
        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess("");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            setContent(t('Are you sure want to save?')); setType('save');
            setSaveModalBox(!saveModalBox);
            setError([]);
            setSuccess("");
        }
    };

    // Function change of amount_type
    let paymentTypeChange = (index, e) => {
        let paymentType = Object.assign({}, paymentTypeState)
        paymentType[index] = parseInt(e.currentTarget.value);
        setPaymentTypeState(paymentType);
    };
    // Function change of amount
    let fixedAmountChange = (id, index, e) => {
        let amount = Object.assign({}, fixedAmount)
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            amount[id] = e.currentTarget.value;
        }
        setFixedAmount(amount);
    };
    // Function change of showing amount and amount_type of edit button
    let setAmountChange = (e) => {
        setShowAmount(true);
    }


    let payment_list = [];
    let payment_list_update = [];

    const saveOK = async() => {
        setSaveModalBox(!saveModalBox);
        setLoading(true);
        currencySetting.forEach((main, index) => {
            main.priority_list.forEach((element, idx) => {
                element = { ...element, employee_account_id: element.employee_account_id, amount_type: paymentTypeState[index], amount: parseInt(fixedAmount[main.currency_desc + idx]) }
                payment_list_update.push(element)
            })
        });
        // EDIT MODE
        let salaryTransferSetting = {
            company_id: ApiPath.companyID,
            payment_transfer_list: payment_list_update,
            created_emp: ApiPath.createdEmp,
            updated_emp: ApiPath.updatedEmp,
            login_id: ApiPath.loginEmp,
            language: ApiPath.lang,
        }
        let params = {
          ...salaryTransferSetting
        }
        let obj = { package_name: 'hr', url: ApiPath.SalaryTransferSettingEdit + editData, method: 'put', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
          setSaveModalBox(!saveModalBox);
          setError(response.message);
          setSuccess("");
          setLoading(false);
          editIndex(editData);
        }
        else {
            setError([]);
            setSuccess([response.data.message]);
            setLoading(false);
            editIndex(editData);
        }
    };
    /** End Save/Update Function */

    const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide
    const deleteToggleAlert = () => {
        setContent(t('Are you sure want to delete?')); setType('delete');
        setDeleteModalBox(!deleteModalBox);
        setError("");
    }

    /** Delete Function */
    let deleteOK = async() => {
        setDeleteModalBox(!deleteModalBox);
        setLoading(true);
        let url = `${ApiPath.SalaryTransferSettingDelete}${editData}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}`
        let obj = { package_name: 'hr', url : url, method: 'delete'}
        let response = await ApiRequest(obj);
        if(response.flag === false) {
            setSuccess('');
            setError(response.message);
            setLoading(false);
            editIndex(editData)
        } else {
            setSuccess([response.data.message]);
            setError([]);
            setLoading(false);
            editIndex(editData)
        }
    }

    /** Start Edit Function */
    let editIndex = async (edit_id, index = 0) => {
        setLoading(true);
        let amount_data = [];
        let url = `${ApiPath.SalaryTransferSetting}${edit_id}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}&index=${index}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            history.push('./employee-personal')
            setLoading(false);
        } else {
            const object = response.data.data;
            object.payment_transfer_list.map((item, idx) => {
                item.priority_list.map((i, index) => {
                    amount_data[item.currency_desc + index] = i.amount !== null ? i.amount.toString() : "";
                    paymentTypeState[idx] = i.amount_type !== null ? i.amount_type : 1;
                })
            });

            object.payment_transfer_list.forEach((main, index) => {
                main.priority_list.forEach((element, idx) => {
                    element = { ...element, currency_desc: main.currency_desc, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: amount_data[main.currency_desc + idx], amount_type: element.amount_type }
                    payment_list.push(element)
                })
            });
            if (response.data.data.payment_transfer_list.length == 0) {
                history.push('./employee-personal')
            } else {
                setFixedAmount(amount_data);
                setShowAmount(false);
                setRowCount(t('Total Rows').replace('%s', response.data.row_count));
                setCurrencySetting(response.data.data.payment_transfer_list);
                setCurrencyTable(payment_list)
                setMainTable([object]);
                setLoading(false);
            }
        }
    };

    // next edit/detail employee function
    const nextEmployee = async() => {
        setLoading(true);
        let url = `${ApiPath.SalaryTransferSetting}${editData}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}&index=${1}`
        let obj = { url : url , method: 'get'};
        let amount_data = [];
        let response = await ApiRequest(obj);
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
                setEditData([]);
                setDetailData([]);
                setMainTable([]);
                setLoading(false);
            } else {
                setLoading(false);
                const object = response.data.data;
                object.payment_transfer_list.map((item, idx) => {

                    item.priority_list.map((i, index) => {
                        amount_data[item.currency_desc + index] = i.amount !== null ? i.amount.toString() : "";
                        paymentTypeState[idx] = i.amount_type !== null ? i.amount_type : 1;
                    })
                });

                object.payment_transfer_list.forEach((main, index) => {
                    main.priority_list.forEach((element, idx) => {
                        element = { ...element, currency_desc: main.currency_desc, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: amount_data[main.currency_desc + idx], amount_type: element.amount_type }
                        payment_list.push(element)
                    })
                });
                let emp = {
                    "id" : object.employee_id,
                    "is_new" : object.is_new
                }
                sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(emp));

                if (response.data.data.payment_transfer_list.length == 0) {
                    history.push('./employee-personal')
                } else {
                    setFixedAmount(amount_data);
                    setEditData(object.employee_id);
                    setShowAmount(false);
                    setRowCount(t('Total Rows').replace('%s', response.data.row_count));
                    setCurrencySetting(response.data.data.payment_transfer_list);
                    setCurrencyTable(payment_list)
                    setMainTable([object]);
                    setError([]);
                    setSuccess("");
                    setLoading(false);
                }
            }

    }

    // Previous edit/detail employee
    const prevEmployee = async() => {
        setLoading(true);   
        let url = `${ApiPath.SalaryTransferSetting}${editData}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}&index=${-1}`
        let obj = {url : url , method: 'get'};
        let amount_data = [];
        let response = await ApiRequest(obj);   
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
                setEditData([]);
                setDetailData([]);
                setMainTable([]);
                setLoading(false);
            } else {
                const object = response.data.data;
                object.payment_transfer_list.map((item, idx) => {

                    item.priority_list.map((i, index) => {
                        amount_data[item.currency_desc + index] = i.amount !== null ? i.amount.toString() : "";
                        paymentTypeState[idx] = i.amount_type !== null ? i.amount_type : 1;
                    })
                });

                object.payment_transfer_list.forEach((main, index) => {
                    main.priority_list.forEach((element, idx) => {
                        element = { ...element, currency_desc: main.currency_desc, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: amount_data[main.currency_desc + idx], amount_type: element.amount_type }
                        payment_list.push(element)
                    })
                });
                let emp = {
                    "id" : object.employee_id,
                    "is_new" : object.is_new
                }
                sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(emp));
                if (response.data.data.payment_transfer_list.length == 0) {
                    history.push('./employee-personal')
                } else {
                    setFixedAmount(amount_data);
                    setShowAmount(false);
                    setRowCount(t('Total Rows').replace('%s', response.data.row_count));
                    setCurrencySetting(response.data.data.payment_transfer_list);
                    setCurrencyTable(payment_list)
                    setEditData(object.employee_id);
                    setMainTable([object]);
                    setError([]);
                    setSuccess("");
                    setLoading(false);
                }
            }

    }

    const cancelClick = () => {
        setDeleteModalBox(false);
        setSaveModalBox(false);
      }

    /** End Edit Function */

    return (
        <CRow>
            <CCol xs="12" style={{ display: currencySetting && currencySetting.length > 0 ? "block" : "none" }}>
                <Loading start={loading} />
                {/* Error and success msg */}
                <Message success={success} error={error} />
                <CCard>
                    <SalaryTransferSettingHeaderBox
                        setActiveAvatar={false}
                        setEmployeePersonal={false}
                        setFamilyMember={false}
                        setLeaveSetting={false}
                        setSalaryCalculateSetting={false}
                        setSalaryTranferSetting={true}
                        PaymentSetting={true}
                    />
                    <CCardHeader>
                        <div className="d-flex justify-content-between">
                            <h5><CLabel className="">{t('Salary Transfer Setting')}</CLabel></h5>
                            <CButton type="button"
                                id="btnPrev"
                                className=""
                                onClick={() => history.push("./salary-calculate-setting")}
                                style={{ backgroundColor: "#F4F6FD" }}>
                                <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                                {t("Previous")}
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <SalaryTransferSettingEmployeeBox
                            mainTable={mainTable} />
                        <br />
                        {detailData && detailData == "" &&
                            <SalaryTransferSettingPaymentAmountBox
                                fixedAmountChange={fixedAmountChange}
                                paymentTypeState={paymentTypeState}
                                showAmount={showAmount}
                                currencySetting={currencySetting}
                                paymentTypeChange={paymentTypeChange}
                                fixedAmount={fixedAmount}
                                detailData={detailData}
                                editData={editData}
                            />
                        }

                        <br />

                        <SalaryTransferSettingTable
                            rowCount={rowCount}
                            setAmountChange={setAmountChange}
                            detailData={detailData}
                            mainTable={mainTable}
                            currencyTable={currencyTable}
                            currencySetting={currencySetting}
                            deleteToggleAlert={deleteToggleAlert}
                            rowCount={rowCount} />


                        <SaveAndPrevAndNextSalaryTransferSetting
                            saveData={saveData}
                            nextEmployee={nextEmployee}
                            prevEmployee={prevEmployee}
                            detailData={detailData}
                            viewPermissionAPI={viewPermissionAPI}
                        />

                        <Confirmation
                            show={deleteModalBox || saveModalBox}
                            content={content}
                            type={type}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            cancel={cancelClick}
                            saveOK={saveOK}
                            saveModalBox={saveModalBox}
                            deleteToggleAlert={deleteToggleAlert}
                            deleteModalBox={deleteModalBox}
                            closeSaveAlert={closeSaveAlert}
                            deleteOK={deleteOK} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function SalaryTransferSettingIndex() {
    return (
        <Welcome />
    )
}