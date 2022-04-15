/* eslint-disable no-use-before-define */
import {
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
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkMaxLength, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import ConfirmAndRejectAndDownloadExpenseDetail from './ConfirmAndRejectAndDownloadExpenseDetail';
import ExpenseDetailApproverTable from './ExpenseDetailApproverTable';
import ExpenseDetailBudgetTable from './ExpenseDetailBugetTable';
import ExpenseDetailEmployeeBox from './ExpenseDetailEmployeeBox';
import ExpenseDetailTotalAmountTable from './ExpenseDetailTotalAmountTable';
import PreviousExpenseDetail from './PreviousExpenseDetail';



// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    const [approverTable, setApproverTable] = useState([]); // for amount data 
    const [rowCount, setRowCount] = useState('');           // For row count
    const [mainTable, setMainTable] = useState([]);
    const [editData, setEditData] = useState([]); // for Edit data
    const [detailData, setDetailData] = useState([]); // for Edit data
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [canConfirm, setCanConfirm] = useState();
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState([]);
    const [allCheck, setAllCheck] = useState(false);
    const [budgetTotal, setBudgetTotal] = useState([]);
    const [budgetNotInclude, setBudgetNotInclude] = useState([]);
    const [advanceMoney, setAdvanceMoney] = useState([]);
    const [paymentFlag, setPaymentFlag] = useState();
    const [advanceFlag, setAdvanceFlag] = useState();
    const [expenseAdvance, setExpenseAdvance] = useState();
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [dashboardData, setDashboardData] = useState();
    const [infoData, setInfoData] = useState();
    const [department, SetDepartment] = useState([]);
    const [position, SetPosition] = useState([]);


    const typingTimeoutRef = useRef(null);    // keep value time out 
    // Loaded initially
    useEffect(() => {
        ApiViewPermission.loadViewPermission();
        let detail_info = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_INFO_DETAILS"))
        let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS")); // return data from Expense List
        let detail_From_Dashboard = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_ID_DETAILS_DASHBOARD")); //return data from Dashboard

        if (edit_Data) {
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
            setInfoData(detail_info);
        } else if (detail_From_Dashboard) {
            let edit_id = detail_From_Dashboard;
            setEditData(edit_id);
            editIndex(edit_id);
            setDashboardData(edit_id);
        }
    }, []);

    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);



    const removeMessage = () => {
        setError("");
        setSuccess("");
        setErrorModal("");
    }

    /** Start Confirm function */
    const [errorModal, setErrorModal] = useState([]);
    const [confirmModalBox, setConfirmModalBox] = useState(false); // Delete confirm box show or hide
    const confirmToggleAlert = () => {
        setContent(t('Are you sure want to confirm?')); setType('confirm');
        setError([]);
        setSuccess("");
        setConfirmModalBox(!confirmModalBox);
    }
    const confirmOK = async () => {
        setLoading(true);
        setConfirmModalBox(!confirmModalBox);
        let params = {
            "language": "en",
            "login_id": ApiPath.loginEmp,
            "expense_ids": [editData],
            "device_flag": ApiPath.deviceFlag,
            "company_id": 1,
            "is_adjustment": false
        }
        let obj = { package_name: 'hr', url: ApiPath.ExpenseDetailConfirm, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            editIndex(editData);
        } else {
            setError([]);
            setSuccess([response.data.message]);
            editIndex(editData);
        }
    };
    /** End Confirm Function */

    /* Open Modal Reject */
    const [modalReject, setModalReject] = useState(false);
    const openModalReject = (e) => {
        setContent(t('Are you sure want to reject?')); setType('reject');
        setReason("");
        setError([]);
        setSuccess("");
        setModalReject(!modalReject)
    }

    const closeModalReject = () => {
        setModalReject(!modalReject);
        setErrorModal("");
    }

    const [reason, setReason] = useState("");
    let changeReason = (e) => {
        setReason(e.target.value);
    }

    /** Reject Function */
    const RejectOK = async () => {
        let params = {
            "language": "en",
            "login_id": ApiPath.loginEmp,
            "expense_ids": [editData],
            "device_flag": ApiPath.deviceFlag,
            "company_id": 1,
            "denied_reason": reason,
            "is_adjustment": false

        }
        if (isEmpty(reason)) {
            setErrorModal([t('JSE124').replace('%s', t('Reason'))]);
        }
        else if (!checkMaxLength(reason, 500)) {
            setErrorModal([t('JSE123').replace('%s', t('Reason')).replace('%s', 500)]);
        }
        else {
            setLoading(true);
            setModalReject(!modalReject);
            let obj = { package_name: 'hr', url: ApiPath.ExpenseDetailReject, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
                editIndex(editData);
            } else {
                setError([]);
                setSuccess([response.data.message]);
                setModalReject(!modalReject);
                editIndex(editData);
            }
        }
    };
    /** Reject Function End*/

    /** Start Detail Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let params = {
            "company_id": 1,
            "login_id": ApiPath.loginEmp,
            "expense_id": edit_id
        }
        let obj = { package_name: 'hr', url: ApiPath.ExpenseDetailGetDetail, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            setEditData([]);
            setMainTable([]);
            setLoading(false);
        } else {
            let currency_data = response.data.data.currencies.filter(item => item.expense_flag === 1);
            let budget_data = [];
            let advangeMoney_data = [];
            let total_not_include_data = [];
            let department_data = [];
            let position_data = [];
            response.data.data.budget.total_not_include_admin_arrange.map(item => {
                currency_data.map(sec => {
                    if (item.currency_id == sec.id)
                    total_not_include_data.push(item);
                })
            });
            response.data.data.budget.advance_money.map(item => {
                currency_data.map(sec => {
                    if (item.currency_id == sec.id)
                    advangeMoney_data.push(item);
                })
            });
            response.data.data.budget.budget_total.map(item => {
                currency_data.map(sec => {
                    if (item.currency_id == sec.id)
                        budget_data.push(item);
                })
            });

            [response.data.data].map(item => {
                item.employee_has_dept_position.map(sec => {
                    department_data.push(sec.departments.department_name)
                });
                item.employee_has_dept_position.map(sec => {
                    position_data.push(sec.positions.position_name)
                })
            });

            setLoading(false);
            setCanConfirm(response.data.data.can_confirm);
            setAdvanceMoney(advangeMoney_data);
            setPaymentFlag(response.data.data.payment_flag);
            setAdvanceFlag(response.data.data.advance_flag);
            setApproverTable(response.data.data.approvers);
            setExpenseAdvance(response.data.data.expense_advance_additional);
            setMainTable([response.data.data]);
            setDetail(response.data.data.details);
            setCurrency(response.data.data.currencies);
            setAllCheck(response.data.data.details.every(item => item.additional_advance_item === 1));
            setBudgetTotal(budget_data);
            setBudgetNotInclude(total_not_include_data);
            SetDepartment(department_data.toString());
            SetPosition(position_data.toString());

            // setError([]);
            // setSuccess("");
        }
    };

    /**Start Download File */
    const downloadFile = async (e, imgName, event) => {
        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID,
            "file_id": e.id,
            "login_id": ApiPath.loginEmp,
            "is_detail": event.target.getAttribute('detail') ? true : false,
            "language": ApiPath.language
        };
        let obj = { package_name: 'hr', url: ApiPath.ExpenseDetailDownloadFile, method: 'post', params, type: "arraybuffer" };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setLoading(false);
            setSuccess("");
            setError(response.message);
        } else {
            // let fileName = response.headers["content-disposition"].split("filename=")[1];
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', imgName); //or any other extension
            document.body.appendChild(link);
            link.click();
            setError([]);
            setLoading(false);
        }
    }

    /**End Download File */

    /**Start Export File */
    const exportFile = async () => {
        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID,
            "login_id": ApiPath.loginEmp,
            "expense_id": editData
        }
            ;
        let obj = { package_name: 'hr', url: ApiPath.ExpenseDetailExportFile, method: 'post', params, type: "blob" };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setLoading(false);
            setSuccess("");
            setError(response.message);
        } else {
            let fileName = response.headers["content-disposition"].split("filename=")[1];
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const modifyFileName = fileName.slice(1, fileName.length - 1)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', modifyFileName); //or any other extension
            document.body.appendChild(link);
            link.click();
            setError([]);
            setLoading(false);
        }
    }

    /**End Export File */


    const changePrevious = () => {
        if (!isEmpty(dashboardData)) {

            sessionStorage.removeItem("RETURN_EXPENSE_ID_DETAILS_DASHBOARD");
            history.push("../expense/dashboard")
        } else {
            sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS");
            sessionStorage.setItem("RETURN_EXPENSE_LIST_INFO_DETAILS_PREVIOUS", 1);
            sessionStorage.setItem("RETURN_EXPENSE_LIST_INFO_DETAILS", JSON.stringify(infoData));
            history.push("../expense/expense-list");
        }
    }


    return (
        <CRow>
            <CCol xs="12">
                {/* Error and success msg */}
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5><CLabel>{t('Expense Request Detail')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <ModalReject
                            removeMessage={removeMessage}
                            errorModal={errorModal}
                            changeReason={changeReason}
                            reason={reason}
                            RejectOK={RejectOK}
                            closeModalReject={closeModalReject}
                            modalReject={modalReject} />
                        <PreviousExpenseDetail
                            changePrevious={changePrevious} />
                        <br />
                        <ExpenseDetailEmployeeBox
                            mainTable={mainTable}
                            downloadFile={downloadFile}
                            department={department}
                            position={position}
                        />
                        <br />
                        <br />
                        <ExpenseDetailTotalAmountTable
                            downloadFile={downloadFile}
                            currency={currency}
                            detail={detail}
                            allCheck={allCheck}
                            budgetTotal={budgetTotal}

                        />
                        <ExpenseDetailBudgetTable
                            budgetTotal={budgetTotal}
                            mainTable={mainTable}
                            currency={currency}
                            budgetNotInclude={budgetNotInclude}
                            advanceMoney={advanceMoney}
                            paymentFlag={paymentFlag}
                            advanceFlag={advanceFlag}
                            expenseAdvance={expenseAdvance}
                        />
                        <ExpenseDetailApproverTable
                            approverTable={approverTable}
                            mainTable={mainTable}
                        />
                        <ConfirmAndRejectAndDownloadExpenseDetail
                            mainTable={mainTable}
                            canConfirm={canConfirm}
                            confirmToggleAlert={confirmToggleAlert}
                            openModalReject={openModalReject}
                            exportFile={exportFile}
                        />
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={confirmModalBox}
                            cancel={() => setConfirmModalBox(!confirmModalBox)}
                            confirmOK={confirmOK}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ExpenseDetailIndex() {
    return (
        <Welcome />
    )
}