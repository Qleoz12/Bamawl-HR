/**
* Business Trip/Expense Dashboard
*
* @author  v_hao
* @create  2021-07-20 (YYYY-MM-DD)
* @param
* @return
*/
import React, { useState, useEffect, useRef } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { withTranslation } from "react-i18next";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import { checkMaxLength, isEmpty } from '../../hr-common/common-validation/CommonValidation';
import BusinessTripExpenseDashboardTable from "./BusinessTripExpenseDashboardTable";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { useHistory } from "react-router-dom";
import ModalReject from '../../hr-common/modal-reject/ModalReject';

function LegacyWelcomeClass({ t, i18n }) {
    //create useState hook
    const [error, setError] = useState([]); // for error message
    const [success, setSuccess] = useState(""); // for success message
    const [loading, setLoading] = useState(false);
    const [currency, setCurrency] = useState([]); // for currency
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [mainTable, setMainTable] = useState([]);
    const history = useHistory(); // For edit link
    const [confirmRejectBuniness, setConfirmRejectBuniness] = useState('');
    const [confirmRejectExpense, setConfirmRejectExpense] = useState('');
    const [confirmConfirmBuniness, setConfirmConfirmBuniness] = useState('');
    const [confirmConfirmExpense, setConfirmConfirmExpense] = useState('');
    const [errorModal, setErrorModal] = useState([]);
    const [reason, setReason] = useState("");// for reason
    const [modalReject, setModalReject] = useState(false);// for show /hide modal reason
    const [numCurrencies, setNumCurrencies] = useState();
    const [collapseBTRequest, setCollapseBTRequest] = useState(false);
    const [collapseBTARequest, setCollapseBTARequest] = useState(false);
    const [collapseERequest, setCollapseERequest] = useState(false);
    const [collapseEARequest, setCollapseEARequest] = useState(false);
    const [employeeName, setEmployeeName] = useState(localStorage.getItem('EMP_NAME'));
    const [settingTime, setSettingTime] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /**
    * Page Load
    *
    * @author  v_hao
    * @create  22/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        getGreetingTime();
        loadViewPermission();
        loadBusinessExpenseDashboard();
        loadCurrency();
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_ID_DETAILS_DETAILS_DASHBOARD");
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_DASHBOARD");
        sessionStorage.removeItem("RETURN_EXPENSE_ID_DETAILS_DASHBOARD");
        sessionStorage.removeItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD");
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID");
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID");
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_INFO_DETAILS");
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS");
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY");
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS");
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_HISTORY");
    }, []);

    /**
    * GET VIEW PERMISSION
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadViewPermission = async () => {
        let params = {
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.view_permission);
        }
    };

    /**
    * Load Currency
    *
    * @author  v_hao
    * @create  22/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCurrency = async () => {
        let params = {
            company_id: ApiPath.companyID,
            login_id: ApiPath.loginEmp
        };
        let obj = { package_name: 'hr', url: ApiPath.BusinessExpenseDashboardCurrency, method: 'post', params };
        let response = await ApiRequest(obj);
        let data = response.data.data;
        let TotalcolSpan
        TotalcolSpan = data.filter(item => item.expense_flag === 1);
        setNumCurrencies(TotalcolSpan.length);
        response.flag === false ? setError(response.message) : setCurrency(data);
    };

    const getGreetingTime = () => {
        const date = new Date();
        const currentTime = date.getHours();

        let greeting;

        if (currentTime >= 0 && currentTime <= 12) {
            greeting = "Good Morning";
        } else if (currentTime > 12 && currentTime <= 18) {
            greeting = "Good Afternoon";
        } else {
            greeting = "Good Evening";
        }
        setSettingTime(greeting);
    };

    /**
    * Load Business-Expense-Dashboard
    *
    * @author  v_hao
    * @create  22/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadBusinessExpenseDashboard = async () => {
        let params = {
            company_id: ApiPath.companyID,
            login_id: ApiPath.loginEmp
        };
        setLoading(true);
        let obj = { package_name: 'hr', url: ApiPath.BusinessExpenseDashboard, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setLoading(false);
            setMainTable([]);
        } else {
            setLoading(false);
            setMainTable(response.data.data);
        }
    }

    const clickHereBusinessTrip = (e) => {
        let data = "";
        data = {
            business_trip_id: e.business_trip_id,
            employee_id: e.employee_id,
            employee_code: e.employee_code,
            employee_name: e.employee_name,
            period_from_date: e.trip_period_from_date,
            period_to_date: e.trip_period_to_date,
            business_trip_applied_from_date: e.business_trip_applied_from_date,
            business_trip_applied_to_date: e.business_trip_applied_to_date,
            business_trip_due_from_date: e.business_trip_due_from_date,
            business_trip_due_to_date: e.business_trip_due_to_date,
            business_trip_adjustment_applied_from_date: e.business_trip_adjustment_applied_from_date,
            business_trip_adjustment_applied_to_date: e.business_trip_adjustment_applied_to_date,
            business_trip_adjustment_due_from_date: e.business_trip_adjustment_due_from_date,
            business_trip_adjustment_due_to_date: e.business_trip_adjustment_due_to_date,
            department_id: e.departments[0].id,
            position_id: e.positions[0].id,
            expense_department_id: e.expense_department_id,
            approver_status: e.approver_status,
            trip_type: e.trip_type,
        };
        localStorage.setItem('RETURN_BUSINESS_TRIP_LIST_ID', JSON.stringify(data));
        history.push("./business-trip-list");
    };

    const clickHereExpenseList = (e) => {
        let data = "";
        data = {
            expense_id: e.expense_id,
            employee_id: e.employee_id,
            employee_code: e.employee_code,
            employee_name: e.employee_name,
            department_id: e.departments[0].id,
            position_id: e.positions[0].id,
            expense_department_id: e.expense_department_id,
            subject: e.subject,
            po_number: e.po_number,
            approver_status: e.approver_status,
            expense_applied_from_date: e.expense_applied_from_date,
            expense_applied_to_date: e.expense_applied_to_date,
            expense_due_from_date: e.expense_due_from_date,
            expense_due_to_date: e.expense_due_to_date,
            expense_adjustment_applied_from_date: e.expense_adjustment_applied_from_date,
            expense_adjustment_applied_to_date: e.expense_adjustment_applied_to_date,
            expense_adjustment_due_from_date: e.expense_adjustment_due_from_date,
            expense_adjustment_due_to_date: e.expense_adjustment_due_to_date,
        };
        localStorage.setItem('RETURN_EXPENSE_LIST_ID', JSON.stringify(data));
        history.push("./expense-list");
    };

    const clickHereBusinessTripRequest = (ele) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_ID_DETAILS_DETAILS_DASHBOARD', JSON.stringify(ele.business_trip_id));
        history.push("./business-trip-detail");
    };

    const clickHereBusinessTripAdjustmentRequest = (ele) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_DASHBOARD', JSON.stringify(ele.business_trip_id));
        history.push("./business-trip-adjustment-detail");
    };

    const clickHereExpenseRequest = (ele) => {
        sessionStorage.setItem('RETURN_EXPENSE_ID_DETAILS_DASHBOARD', JSON.stringify(ele.expense_id));
        history.push("./expense-detail");
    };

    const clickHereExpenseAdjustmentRequest = (ele) => {
        sessionStorage.setItem('RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD', JSON.stringify(ele.expense_id));
        history.push("./expense-adjustment-detail");
    };

    /** Start Confirm Business Function */
    const [confirmModalBox, setConfirmModalBox] = useState(false);
    const [flagConfirm, setFlagConfirm] = useState(false);
    const [flagConfirmAdjustment, setFlagConfirmAdjustment] = useState(false);
    const confirmBusiness = (e, block) => {
        switch (block) {
            case "Business Trip Request":
                setConfirmConfirmBuniness(e.business_trip_id);
                setFlagConfirm(false);
                setFlagConfirmAdjustment(false);
                break;
            case "Business Trip Adjustment Request":
                setConfirmConfirmBuniness(e.business_trip_id);
                setFlagConfirm(false);
                setFlagConfirmAdjustment(true);
                break;
            case "Expense Request":
                setConfirmConfirmExpense(e.expense_id);
                setFlagConfirm(true);
                setFlagConfirmAdjustment(false);
                break;
            case "Expense Adjustment Request":
                setConfirmConfirmExpense(e.expense_id);
                setFlagConfirm(true);
                setFlagConfirmAdjustment(true);
                break;
            default:
                break;
        }
        setType('confirm');
        //setContent(<span>Are you sure want to confirm?<br />After click OK button, you cannot edit anything!</span>);
        setContent(t('Are you sure want to confirm?')); 
        setConfirmModalBox(!confirmModalBox);
        setError("");
    }

    const confirmOK = async () => {
        setLoading(true);
        setConfirmModalBox(!confirmModalBox)
        let request = {
            login_id: ApiPath.loginEmp,
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
            is_adjustment: flagConfirmAdjustment ? true : false
        }

        switch (flagConfirm) {
            case false:
                request = { ...request, business_trip_ids: [confirmConfirmBuniness] }
                break;
            default:
                request = { ...request, expense_ids: [confirmConfirmExpense] }
                break;
        }

        let obj = {
            url: flagConfirm ? ApiPath.ExpenseListConfirm : ApiPath.BusinessTripListConfirm,
            method: 'post',
            params: request,
            package_name: 'hr'
        }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        } else {
            setSuccess([response.data.message]);
            setTimeout(function () {
                loadBusinessExpenseDashboard();
            }, 2500);
            setError('');
        }
    }

    const [flagReject, setFlagReject] = useState(false);
    const [flagRejectAdjustment, setFlagRejectAdjustment] = useState(false);
    const openItemModal = (e, block) => {
        setModalReject(!modalReject);
        switch (block) {
            case "Business Trip Request":
                setConfirmRejectBuniness(e.business_trip_id);
                setFlagReject(false);
                setFlagRejectAdjustment(false);
                break;
            case "Business Trip Adjustment Request":
                setConfirmRejectBuniness(e.business_trip_id);
                setFlagReject(false);
                setFlagRejectAdjustment(true);
                break;
            case "Expense Request":
                setConfirmRejectExpense(e.expense_id);
                setFlagReject(true);
                setFlagRejectAdjustment(false);
                break;
            case "Expense Adjustment Request":
                setConfirmRejectExpense(e.expense_id);
                setFlagReject(true);
                setFlagRejectAdjustment(true);
                break;
            default:
                break;
        }
    }

    const rejectOK = async () => {
        let arMess = []
        if (isEmpty(reason.trim())) {
            let errMsg = t('JSE124').replace('%s', t('Reason'));
            arMess.push(errMsg);
        }
        else if (!checkMaxLength(reason, 500)) {
            let errMsg = t('JSE123').replace('%s', t('Reason')).replace('%s', 500);
            arMess.push(errMsg);
        }

        if (arMess.length > 0) {
            setErrorModal(arMess);
        }
        else {
            setError([]);
            setSuccess("");
            setModalReject(!modalReject);
            setLoading(true);

            let request = {
                login_id: ApiPath.loginEmp,
                company_id: ApiPath.companyID,
                denied_reason: reason,
                is_adjustment: flagRejectAdjustment ? true : false,
                language: ApiPath.lang
            }

            switch (flagReject) {
                case false:
                    request = { ...request, business_trip_ids: [confirmRejectBuniness] }
                    break;
                default:
                    request = { ...request, expense_ids: [confirmRejectExpense] }
                    break;
            }

            let obj = {
                url: flagReject ? ApiPath.ExpenseListReject : ApiPath.BusinessTripListReject,
                method: 'post',
                params: request,
                package_name: 'hr'
            }

            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
            } else {
                setReason("");
                setSuccess([response.data.message]);
                closeModalReject();
                setError([]);
                setTimeout(function () {
                    loadBusinessExpenseDashboard();
                }, 2500);
            }
        }
    }

    let removeMessageError = () => {
        setErrorModal("");
    }

    const changeReason = (e) => {
        setReason(e.target.value)
    }

    const closeModalReject = () => {
        setReason("");
        setModalReject(!modalReject);
        setErrorModal("");
    }

    let handleChangeCollapseBTRequest = () => {
        setCollapseBTRequest(!collapseBTRequest);
    }

    let handleChangeCollapseBTARequest = () => {
        setCollapseBTARequest(!collapseBTARequest);
    }

    let handleChangeCollapseERequest = () => {
        setCollapseERequest(!collapseERequest);
    }

    let handleChangeCollapseEARequest = () => {
        setCollapseEARequest(!collapseEARequest);
    }

    return (
        <CRow className="business-trip-expense-dashboard">
            <CCol lg="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={confirmModalBox}
                    cancel={() => setConfirmModalBox(!confirmModalBox)}
                    confirmOK={confirmOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblBusinessTrip/ExpenseDashboard">{t("Business Trip/Expense Dashboard")}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <BusinessTripExpenseDashboardTable
                            viewPermissionAPI={viewPermissionAPI}
                            settingTime={settingTime}
                            currency={currency}
                            mainTable={mainTable}
                            clickHereBusinessTrip={clickHereBusinessTrip}
                            clickHereExpenseList={clickHereExpenseList}
                            clickHereBusinessTripRequest={clickHereBusinessTripRequest}
                            clickHereBusinessTripAdjustmentRequest={clickHereBusinessTripAdjustmentRequest}
                            clickHereExpenseRequest={clickHereExpenseRequest}
                            clickHereExpenseAdjustmentRequest={clickHereExpenseAdjustmentRequest}
                            openItemModal={openItemModal}
                            confirmBusiness={confirmBusiness}
                            numCurrencies={numCurrencies}
                            handleChangeCollapseBTRequest={handleChangeCollapseBTRequest}
                            handleChangeCollapseBTARequest={handleChangeCollapseBTARequest}
                            handleChangeCollapseERequest={handleChangeCollapseERequest}
                            handleChangeCollapseEARequest={handleChangeCollapseEARequest}
                            employeeName={employeeName}
                            collapseBTRequest={collapseBTRequest}
                            collapseBTARequest={collapseBTARequest}
                            collapseERequest={collapseERequest}
                            collapseEARequest={collapseEARequest}
                        />
                        <ModalReject
                            removeMessage={removeMessageError}
                            errorModal={errorModal}
                            changeReason={changeReason}
                            reason={reason}
                            RejectOK={rejectOK}
                            closeModalReject={closeModalReject}
                            modalReject={modalReject}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function BusinessTripExpenseDashboardIndex() {
    return <Welcome />;
}
