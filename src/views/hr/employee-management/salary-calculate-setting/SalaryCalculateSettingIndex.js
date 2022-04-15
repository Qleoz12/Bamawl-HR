/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import {
    CCard, CCardBody, CCardHeader, CCol, CRow, CButton
} from '@coreui/react';
import { useHistory } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import apiPath from '../../../brycen-common/api-path/ApiPath';
import {
    validateNumberOnly,
    checkNullOrBlank
} from "../../hr-common/common-validation/CommonValidation";
import SalaryCalculateSettingCalculateSalary from './SalaryCalculateSettingCalculateSalary';
import SalaryCalculateSettingAllowance from './SalaryCalculateSettingAllowance';
import SavePrevNextSalaryCalculateSetting from './SavePrevNextSalaryCalculateSetting'
import EmployeeTabMenu from '../../hr-common/employee-personal-header-box/HeaderBox';
import SalaryCalculateSettingEmployeeBox from './SalaryCalculateSettingEmployeeBox';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
// use hoc for functional based components
/**
 * Page SalaryCalculateSetting
 * 
 * @author  dh_khanh
 * @create_date  2021/05/07
 */
function LegacyWelcomeClass({ t, i18n }) {
    const history                                                   = useHistory(); // For edit link
    const [error, setError]                                         = useState([]);
    const [success, setSuccess]                                     = useState([]);
    const [loading, setLoading]                                     = useState(false);
    const [editData, setEditData]                                   = useState(null); // for Edit data
    const [detailData, setDetailData]                               = useState(null); // for detail data
    const [currencyAPI, setCurrencyAPI]                             = useState([]);
    const [basicSalaryAPI, setBasicSalaryAPI]                       = useState([]);
    const [allowanceAPI, setAllowanceAPI]                           = useState([]);
    const [basicSalaryCreateAPI, setBasicSalaryCreateAPI]           = useState("");
    const [menuSalaryTransferSetting, setMenuSalaryTransferSetting] = useState(false);
    const [employeeID, setEmployeeID]                               = useState("");
    const [employeeCode, setEmployeeCode]                           = useState("");
    const [employeeName, setEmployeeName]                           = useState("");
    const [radCalculateSalary, setRadCalculateSalary]               = useState(0);
    const [radAllowance, setRadAllowance]                           = useState(0);
    const [radPaymentType, setRadPaymentType]                       = useState("");
    const [radSalaryEqualityAdjust, setRadSalaryEqualityAdjust]     = useState("");
    const [basicSalaryID, setBasicSalaryID]                         = useState(0);
    const [radbasicSalary, setRadBasicSalary]                       = useState(0);
    const [basicSalary, setBasicSalary]                             = useState("");
    const [basicReason, setBasicReason]                             = useState("");
    const [lifeInsurance, setlifeInsurance]                         = useState("");
    const [salaryEqualityAdjust, setSalaryEqualityAdjust]           = useState("");
    const [salaryEqualityAdjustReson, setSalaryEqualityAdjustReson] = useState("");
    const [calculateAllSaralyAPI, setCalculateAllSaralyAPI]         = useState([]);
    const [subTotal, setSubTotal]                                   = useState("");
    const [totalIncludeSalary, setTotalIncludeSalary]               = useState("");
    const [totalMonthlySalary, setTotalMonthlySalary]               = useState("");
    const [basicSalaryModal, setBasicSalaryModal]                   = useState(false);
    const [saveModalBox, setSaveModalBox]                           = useState(false);          // for save button confirmation
    const typingTimeoutRef                                          = useRef(null);    // keep value time out when rerender
    const elementFocus1                                             = useRef(null);
    const elementFocus2                                             = useRef(null);
    const elementFocus3                                             = useRef(null);
    const [content, setContent]                                     = useState('');
    const [type, setType]                                           = useState('');
    const [permission, setPermission]                               = useState(ViewPermision.ONLY_ME) // for view permission
    const [payrollCalculateOption, setPayrollCalculateOption]       = useState(null);
    const [transactionCurrency, setTransactionCurrency]             = useState(null);
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /** Start Form Load */
    useEffect(() => {
        let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT")); // return data from EMPLOYEE List Form
        let detail_Data = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_DETAILS")); // return data from EMPLOYEE List Form
        if (!edit_Data && !detail_Data) {
            history.push('./employee-list');
        }else if(edit_Data['is_new']==true){
            history.push('./employee-personal');
        } else {
            loadViewPermission();
            if (edit_Data) {
                setEditData(edit_Data['id']);
                loadDetail(edit_Data['id']);
            }
            if (detail_Data) {
                setDetailData(detail_Data)
                loadDetail(detail_Data);
            }
        }
    }, []);
    /** End Form Load */

    /**
    * Load view permission user login
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const loadViewPermission = async  () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setPermission(response.data.view_permission);    
        } 
    }

    const loadDetail = async (empID = null, index = 0) => {
        setLoading(true);
        if (index !== 0) {
            setBasicSalaryCreateAPI("");
            setCurrencyAPI([]);
            setAllowanceAPI([]);
            setBasicSalary("");
            setBasicReason("");
            setlifeInsurance("");
            setSalaryEqualityAdjust("");
            setSalaryEqualityAdjustReson("");
            setSubTotal("");
            setTotalIncludeSalary("");
            setTotalMonthlySalary("");
            setRadPaymentType("");
            setRadSalaryEqualityAdjust("");
            setError([]);
            setSuccess([]);
        }
        let url = `${ApiPath.SalaryCalculateSettingDetail}${empID}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&index=${index}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else {
            setError([]);
            let data = response.data.data;
            setEmployeeID(data['employee_id']);
            setEmployeeCode(data['emp_code']);
            setEmployeeName(data['emp_name']);
            setMenuSalaryTransferSetting(data['salary_transfer_setting']);
            const basicSalaryCreate = data['basic_salary_create'];
            if (basicSalaryCreate) {
                setBasicSalaryCreateAPI(basicSalaryCreate);
            }
            const payrollCalculateOption = data['payroll_calculate_option'];
            const transactionCurrency = data['transaction_currency'];
            setPayrollCalculateOption(payrollCalculateOption);
            setTransactionCurrency(transactionCurrency);
            const payrollCalculateCurrency = data['payroll_calculate_currency'];
            const salaryCalculate = data['salary_calculate_setting'];
            if (payrollCalculateCurrency) {
                setCurrencyAPI(payrollCalculateCurrency);
                if (salaryCalculate == null && data['basic_salary_create'] === 2) {
                    if(payrollCalculateOption === 2 && transactionCurrency !== null){
                        setRadPaymentType(transactionCurrency);
                        setRadSalaryEqualityAdjust(transactionCurrency);
                    }else {
                        setRadPaymentType(payrollCalculateCurrency[0]['id']);
                        setRadSalaryEqualityAdjust(payrollCalculateCurrency[0]['id']);
                    }
                }
            }           
            if (salaryCalculate) {
                setBasicSalaryID(salaryCalculate['basic_salary_id']);
                setRadCalculateSalary(salaryCalculate['calculate_sal_flag']);
                if (elementFocus1.current && salaryCalculate['calculate_sal_flag'] === 2) {
                    elementFocus1.current.focus();
                }
                if (elementFocus2.current && salaryCalculate['calculate_sal_flag'] === 1) {
                    elementFocus2.current.focus();
                }
                if (elementFocus3.current && salaryCalculate['calculate_sal_flag'] === 3) {
                    elementFocus3.current.focus();
                }
                setRadAllowance(salaryCalculate['payment_status']);
                setBasicSalary(salaryCalculate['basic_salary']);
                setBasicReason(salaryCalculate['basic_salary_reason']);
                setlifeInsurance(salaryCalculate['life_insurance']);
                setSalaryEqualityAdjust(salaryCalculate['equality_salary']);
                setSalaryEqualityAdjustReson(salaryCalculate['equality_reason']);
                if(basicSalaryCreate === 2){
                    setRadPaymentType(salaryCalculate['basic_salary_currency']);
                    setRadSalaryEqualityAdjust(salaryCalculate['equality_salary_currency']);
                }
                loadCalculateAllSalary(salaryCalculate['basic_salary'],
                    salaryCalculate['equality_salary'],
                    data['employee_id'],
                    salaryCalculate['basic_salary_currency'],
                    salaryCalculate['equality_salary_currency'],
                    basicSalaryCreate
                );
            } else {
                setRadAllowance(1);
                setRadCalculateSalary(2);
                if (elementFocus1.current) {
                    elementFocus1.current.focus();
                }
                setBasicSalaryID(0);
                setBasicSalary("");
                setBasicReason("");
                setlifeInsurance("");
                setSalaryEqualityAdjust("");
                setSalaryEqualityAdjustReson("");
                loadCalculateAllSalary(0, 0, data['employee_id']);
            }
            const employeeAllowanceSettings = data['employee_allowance_settings'];
            if (employeeAllowanceSettings) {
                setAllowanceAPI(employeeAllowanceSettings);
            }
            const employeeBasicSalarySettings = data['employee_basic_salary_settings'];
            if (employeeBasicSalarySettings) {
                mapBasicSalary(employeeBasicSalarySettings);
            }
            if (index !== 0) {
                let item = {
                    id: data['employee_id'],
                    is_new: data['is_new']
                }
                sessionStorage.setItem("RETURN_EMP_LIST_ID_EDIT",JSON.stringify(item));
                // sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(data['employee_id']));
                setEditData(data['employee_id']);
                if(response.data.data.is_new == true){
                    history.push('./employee-personal');
                }
            }
        } 
    }

    const mapBasicSalary = (basicSalaryData = []) => {
        let basicSalaryArr = [];
        basicSalaryData.forEach((basicSalary) => {
            let periodFrom = '';
            let periodTo = '';
            const year = basicSalary['exp_year_from'];
            const yearTo = basicSalary['exp_year_to'];
            const month = basicSalary['exp_month_from'];
            const monthTo = basicSalary['exp_month_to'];
            //form
            if ((year === 0 || year === null) && (month === 0 || month === null)) {
                periodFrom = 'Between ' + year;
            } else if (year === 0 || year === null) {
                periodFrom = 'Between ' + month + ' month and ';
            } else if (month === 0 || month === null) {
                periodFrom = 'Between ' + year + ' year and ';
            } else {
                periodFrom = 'Between ' + year + ' year ' + month + ' month and ';
            }
            //to
            if ((yearTo === 0 || yearTo === null) && (monthTo === 0 || monthTo === null)) {
                periodTo = '';
            } else if (yearTo === 0 || yearTo === null) {
                periodTo = monthTo + ' month';
            } else if (monthTo === 0 || monthTo === null) {
                periodTo = yearTo + ' year ';
            } else {
                periodTo = yearTo + ' year ' + monthTo + ' month';
            }
            basicSalaryArr.push({
                'id': basicSalary['id'],
                'basic_amount': basicSalary['basic_amount'],
                'experience': periodFrom + periodTo
            });
        });
        setBasicSalaryAPI(basicSalaryArr);
    }

    const loadCalculateAllSalary = async (basicSalary = 0, equalitySalary = 0, empID = null, paymentTypeCurrencyId = "", salaryEqualityCurrencyId = "") => {
        let params = {
            "company_id": apiPath.companyID,
            "employee_id": empID === null ? editData : empID,
            "basic_salary": !checkNullOrBlank(basicSalary) ? 0 : Number(basicSalary),
            "equality_salary": !checkNullOrBlank(equalitySalary) ? 0 : Number(equalitySalary),
            "payment_type_currency_id": paymentTypeCurrencyId === 0 ? "" : paymentTypeCurrencyId,
            "salary_equality_currency_id": salaryEqualityCurrencyId === 0 ? "" : salaryEqualityCurrencyId
        }
        let obj = { package_name: 'hr', url: ApiPath.SalaryCalculateSettingGetCalculateAllSalary, method: 'post', params };
        let response = await ApiRequest(obj);
        response.flag === false ? setError(response.message) : setCalculateAllSaralyAPI(response.data.data);
    }

    const nextEmployee = () => {
        loadDetail(editData, 1);
    }

    const prevEmployee = () => {
        loadDetail(editData, -1);
    }

    const handleChangeRadCalculateSalary = (e) => {
        setRadCalculateSalary(Number(e.target.value));
    }

    const handleChangeRadAllowance = (e) => {
        if(Number(e.target.value) == 2 || Number(e.target.value) == 3){
            setSalaryEqualityAdjust(0);setSalaryEqualityAdjustReson('EQUALITY');
        }
        setRadAllowance(Number(e.target.value));
    }

    const handleChangeTextField = (e) => {
        let value = e.target.value;
        const id = e.target.id;
        const maxInteger = 2147483647;
        switch (id) {
            case "txtBasicSalary":
                if (value === "" || validateNumberOnly(value)) {
                    if (Number(value) > maxInteger) {
                        setBasicSalary(maxInteger);
                        value = maxInteger;
                    } else {
                        setBasicSalary(value);
                    }
                }
                break;
            case "txtLifeInsurance":
                if (value === "" || validateNumberOnly(value)) {
                    if (Number(value) > maxInteger) {
                        setlifeInsurance(maxInteger);
                        value = maxInteger;
                    } else {
                        setlifeInsurance(value);
                    }
                }
                break;
            case "txtSalaryEqualityAdjust":
                if (value === "" || validateNumberOnly(value)) {
                    if (Number(value) > maxInteger) {
                        setSalaryEqualityAdjust(maxInteger);
                        value = maxInteger;
                    } else {
                        setSalaryEqualityAdjust(value);
                    }
                }
                break;
            case "txtBasicReason":
                setBasicReason(value);
                break;
            case "txtSalaryEqualityAdjustReson":
                setSalaryEqualityAdjustReson(value);
                break;
            default:
                break;
        }
        if (id === "txtBasicSalary" || id === "txtSalaryEqualityAdjust") {
            if(!validateNumberOnly(value) && value !== ""){
                return;
            }
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                if (id === "txtBasicSalary") {                    
                    loadCalculateAllSalary(value, salaryEqualityAdjust, editData, radPaymentType, radSalaryEqualityAdjust);
                } else {
                    loadCalculateAllSalary(basicSalary, value, editData, radPaymentType, radSalaryEqualityAdjust);
                }
            }, 300);
        }
    }

    const handleChangePaymentType = (e) => {
        const value = Number(e.target.value);
        setRadPaymentType(value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            loadCalculateAllSalary(basicSalary, salaryEqualityAdjust, editData, value, radSalaryEqualityAdjust);
        }, 300);
    }

    const handleChangeRadSalaryAdjust = (e) => {
        const value = Number(e.target.value);
        setRadSalaryEqualityAdjust(value);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            loadCalculateAllSalary(basicSalary, salaryEqualityAdjust, editData, radPaymentType, value);
        }, 300);
    }

    const handleClickBasicSalary = () => {
        setBasicSalaryModal(true);
        setRadBasicSalary(basicSalaryID);
    }

    const basicSalaryModalClose = () => {
        setBasicSalaryModal(false);
    }

    let closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    }

    const saveData = () => {
        let errMsgAll = [];
        if (currencyAPI.length > 1 && radPaymentType === 0) {
            const errMsg = t('JSE001').replace('%s', t('Payment Type'));
            errMsgAll.push(errMsg);
        }
        if (!validateNumberOnly(basicSalary) && basicSalary !== "") {
            const errMsg = t('JSE005').replace('%s', t('Basic Salary'));
            errMsgAll.push(errMsg);
        }
        // if (!englishCharacterNumberOnly(basicReason)) {
        //     const errMsg = t('JSE10019').replace('%s', t('Basic Reason'));
        //     errMsgAll.push(errMsg);
        // }
        if (!validateNumberOnly(lifeInsurance) && lifeInsurance !== "") {
            const errMsg = t('JSE005').replace('%s', t('Life Insurance'));
            errMsgAll.push(errMsg);
        }
        if (!validateNumberOnly(salaryEqualityAdjust) && salaryEqualityAdjust !== "") {
            const errMsg = t('JSE005').replace('%s', t('Salary Equality Adjust'));
            errMsgAll.push(errMsg);
        }
        if (currencyAPI.length > 1 && radSalaryEqualityAdjust === 0) {
            const errMsg = t('JSE001').replace('%s', t('Salary Equality Adjust') + " " + t('Payment Type'));
            errMsgAll.push(errMsg);
        }
        // if (!englishCharacterNumberOnly(salaryEqualityAdjustReson)) {
        //     const errMsg = t('JSE10019').replace('%s', t('Salary Equality Adjust:Reason'));
        //     errMsgAll.push(errMsg);
        // }
        if (errMsgAll.length > 0) {
            setSuccess([]);
            setError([...errMsgAll]);
        }
        else {
            setContent(t('Are you sure want to save?')); setType('save');
            setSaveModalBox(!saveModalBox);
            setError([]);
            setSuccess([]);
        }
    }

    const saveOK = async () => {
        setSaveModalBox(!saveModalBox);
        setLoading(true);
        let params = {
            "company_id": apiPath.companyID,
            "basic_salary_id": basicSalaryID === 0 ? "" : basicSalaryID,
            "basic_salary": basicSalary,
            "payment_type_currency_id": radPaymentType === 0 ? "" : radPaymentType,
            "salary_equality_currency_id": radSalaryEqualityAdjust === 0 ? "" : radSalaryEqualityAdjust,
            "basic_salary_reason": basicReason,
            "payment_status": radAllowance,
            "calculate_sal_flag": radCalculateSalary,
            "life_insurance": lifeInsurance,
            "equality_salary": salaryEqualityAdjust,
            "equality_reason": salaryEqualityAdjustReson,
            "updated_emp": apiPath.updatedEmp,
            "language": apiPath.lang
        }
        let obj = {package_name: 'hr', url: ApiPath.SalaryCalculateSettingDetail + editData, method: 'put', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setError(response.message) : setSuccess([response.data.message]);
    }

    const handleChangeRadBasicSalary = (e) => {
        const value = e.target.value;
        setRadBasicSalary(Number(value));
    }

    const basicSalaryModalAdd = () => {
        setBasicSalaryID(radbasicSalary);
        setBasicSalaryModal(false);
        if (radbasicSalary === 0) {
            setBasicSalary(0);
            loadCalculateAllSalary(0, salaryEqualityAdjust, editData, radPaymentType, radSalaryEqualityAdjust);
        } else {
            const basicSalary = basicSalaryAPI.find(item => item.id === Number(radbasicSalary));
            if (basicSalary) {
                setBasicSalary(basicSalary['basic_amount']);
                loadCalculateAllSalary(basicSalary['basic_amount'], salaryEqualityAdjust, editData, radPaymentType, radSalaryEqualityAdjust);
            }
        }
    }

    return (
        <CRow className="salary-calculate-setting modal-header-custom">
            <CCol>
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={saveModalBox}
                    cancel={closeSaveAlert}
                    saveOK={saveOK}
                />
                <CCard>
                    <EmployeeTabMenu
                        PaymentSetting={menuSalaryTransferSetting}
                        setSalaryCalculateSetting={true}
                    />
                    <CCardHeader>
                        <div className="d-flex justify-content-between">
                            <h5 id="pageTitle"><label>{t('Salary Calculate Setting')}</label></h5>
                            <div>
                                <CButton type="button"
                                    id="btnPrevious"
                                    className=""
                                    onClick={() => history.push("./employee-leave-setting")}
                                    style={{ backgroundColor: "#F4F6FD" }}>
                                    <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                                    {t("Previous")}
                                </CButton>
                                <CButton type="button"
                                    id="btnNext"
                                    className="ml-2"
                                    onClick={() => history.push("./salary-transfer-setting")}
                                    style={{ backgroundColor: "#F4F6FD" }}>
                                    {t("Next")}
                                    <i className="fa fa-step-forward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                                </CButton>
                            </div>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <SalaryCalculateSettingEmployeeBox
                            employeeID={employeeID}
                            employeeCode={employeeCode}
                            employeeName={employeeName}
                        />
                        <SalaryCalculateSettingCalculateSalary
                            radCalculateSalary={radCalculateSalary}
                            handleChangeRadCalculateSalary={handleChangeRadCalculateSalary}
                            detailData={detailData}
                            elementFocus1={elementFocus1}
                            elementFocus2={elementFocus2}
                            elementFocus3={elementFocus3}  
                        />
                        <SalaryCalculateSettingAllowance
                            currencyAPI={currencyAPI}
                            basicSalaryAPI={basicSalaryAPI}
                            allowanceAPI={allowanceAPI}
                            basicSalaryCreateAPI={basicSalaryCreateAPI}
                            calculateAllSaralyAPI={calculateAllSaralyAPI}
                            radAllowance={radAllowance}
                            radPaymentType={radPaymentType}
                            radSalaryEqualityAdjust={radSalaryEqualityAdjust}
                            basicSalaryID={basicSalaryID}
                            basicSalary={basicSalary}
                            basicReason={basicReason}
                            lifeInsurance={lifeInsurance}
                            salaryEqualityAdjust={salaryEqualityAdjust}
                            salaryEqualityAdjustReson={salaryEqualityAdjustReson}
                            subTotal={subTotal}
                            totalIncludeSalary={totalIncludeSalary}
                            totalMonthlySalary={totalMonthlySalary}
                            basicSalaryModal={basicSalaryModal}
                            radbasicSalary={radbasicSalary}
                            detailData={detailData}
                            payrollCalculateOption={payrollCalculateOption}
                            transactionCurrency={transactionCurrency}
                            handleClickBasicSalary={handleClickBasicSalary}
                            basicSalaryModalClose={basicSalaryModalClose}
                            handleChangeRadAllowance={handleChangeRadAllowance}
                            handleChangeTextField={handleChangeTextField}
                            handleChangePaymentType={handleChangePaymentType}
                            basicSalaryModalAdd={basicSalaryModalAdd}
                            handleChangeRadBasicSalary={handleChangeRadBasicSalary}
                            handleChangeRadSalaryAdjust={handleChangeRadSalaryAdjust}                        
                        />
                        {
                            detailData == null &&
                            <>
                                <SavePrevNextSalaryCalculateSetting
                                    nextEmployee={nextEmployee}
                                    prevEmployee={prevEmployee}
                                    saveData={saveData}
                                    detailData={detailData}
                                    permission={permission}
                                />
                            </>
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function SalaryCalculateSetting() {
    return (
        <Welcome />
    )
}