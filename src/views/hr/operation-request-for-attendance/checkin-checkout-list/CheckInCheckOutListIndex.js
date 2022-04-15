/* eslint-disable no-use-before-define */
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import Moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkMaxLength, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import CheckInCheckOutTable from './CheckInCheckOutTable';
import SearchCheckInCheckOutList from './SearchCheckInCheckOutList';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    //const [OvertimeState, setOvertimeState] = useState(); // For overtime name dropdown toggle

    const [selectedFromDate, setSelectedFromDate] = useState(() => ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(() => ChangeDate(new Date())); // For Joined End Date

    const [rowCount, setRowCount] = useState();           // For row count
    //const [mainTableSH, setMainTableSH] = useState(false); // For main table show or hide
    const [mainTable, setMainTable] = useState([]);

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [currentPage, setActivePage] = useState(1) // for Pagination
    const [totalPage, setTotalPage] = useState(1) // for Pagination
    const [perPage, setPerPage] = useState(1) // for Pagination
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const typingTimeoutRef = useRef(null);    // keep value time out when rerender
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [clearData, setClearData] = useState('');

    // Loaded initially
    useEffect(() => {
        setLoading(true);
        loadEmployeeInfor();
        loadViewPermission();

        localStorage.removeItem("RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS");
        let dash_data = JSON.parse(localStorage.getItem("DETAIL_ID_RETURN"));
        localStorage.removeItem("DETAIL_ID_RETURN");
        let pre_Data = JSON.parse(sessionStorage.getItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS")); // return data from OT Rate List Form
        sessionStorage.removeItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS");
        let flag_data = JSON.parse(sessionStorage.getItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS_PREVIOUS"));
        sessionStorage.removeItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS_PREVIOUS");
        if (dash_data) {
            searchAPI(dash_data);
            setSelectedFromDate(dash_data.from_date ? (Moment(dash_data.from_date).format('MM/DD/YYYY')) : null);
            setSelectedToDate(dash_data.to_date ? (Moment(dash_data.to_date).format('MM/DD/YYYY')) : null);
            setApproverStatus(dash_data.approver_status ? dash_data.approver_status : "");
            setEmployeeCode(dash_data.employee_code ? dash_data.employee_code : "");
            setEmployeeID(dash_data.employee_id ? dash_data.employee_id : "");
            setEmployeeName(dash_data.employee_name ? dash_data.employee_name : "");
            setRequestState(dash_data);
        }
        else if (pre_Data !== null && flag_data === 1) {
            searchAPI(pre_Data);
            setSelectedFromDate(pre_Data.from_date ? (Moment(pre_Data.from_date).format('MM/DD/YYYY')) : null);
            setSelectedToDate(pre_Data.to_date ? (Moment(pre_Data.to_date).format('MM/DD/YYYY')) : null);
            setApproverStatus(pre_Data.approver_status ? pre_Data.approver_status : "");
            setEmployeeCode(pre_Data.employee_code ? pre_Data.employee_code : "");
            setEmployeeID(pre_Data.employee_id ? pre_Data.employee_id : "");
            setEmployeeName(pre_Data.employee_name ? pre_Data.employee_name : "");
            setRequestState(pre_Data);
        }

    }, [loadEmployeeInfor, loadViewPermission]);

    /**
    * If error state or success state is changed, scroll automatically to top
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /**
       * If clearData is changed, remove array in autocomplete
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    /* Get Employee Autocomplete  Start*/
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]); setClearData('');

        // type is id, show name in Employee ID and clear remain input
        if (type === 'id') {
            setEmployeeID(i.target.value); setEmployeeCode(''); setEmployeeName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if (type === 'code') {
            setEmployeeID(''); setEmployeeCode(i.target.value); setEmployeeName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else {
            setEmployeeID(''); setEmployeeCode(''); setEmployeeName(i.target.value);
        }

        // if empty, remove data from autocomplete
        if (i.target.value === '') {
            setClearData('clear');
        } else {
            let obj = {
                package_name: 'erp',
                url: `api/${ApiPath.customerName}/employee/${type}-autocomplete-search`,
                method: 'post',
                params: { search_item: i.target.value, company_id: ApiPath.companyID }
            }
            let response = await ApiRequest(obj);
            if (response.flag === false) {
                setError(response.message); setClearData('clear');
            } else {
                (type === 'id') ? setIdArr(response.data.data) :
                    (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
            }
        }
    }

    const selectAutocomplete = async (val, obj) => {
        setClearData('clear');
        let object = {
            package_name: 'erp',
            url: ApiPath.employeeAutoCompleteResult,
            method: 'post',
            params: { id: obj.id, company_id: ApiPath.companyID }
        };
        let response = await ApiRequest(object);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setEmployeeID(response.data.data[0].employee_id);
            setEmployeeName(response.data.data[0].name);
            setEmployeeCode(response.data.data[0].employee_code);
        }
    }

    /* Get Employee Autocomplete  End*/

    /**Search API */
    const [requestState, setRequestState] = useState();
    const fnSearch = useCallback(() => {
        let fromDate = null;
        let toDate = null;
        let errorMsg = [];
        setError([]);
        setSuccess("");

        if (selectedFromDate != null) {
            fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
        } else {
            fromDate = selectedFromDate;
        }
        if (selectedToDate != null) {
            toDate = Moment(selectedToDate).format('YYYY-MM-DD');
        } else {
            toDate = selectedToDate;
        }
        if (isEmpty(fromDate)) {
            let errMsg = t('JSE001').replace('%s', t('From Date'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(toDate)) {
            let errMsg = t('JSE001').replace('%s', t('To Date'));
            errorMsg.push(errMsg);
        } else if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
            errorMsg.push(errMsg);
        }
        if (errorMsg.length > 0) {
            setError(errorMsg);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            const request = {
                from_date: fromDate,
                to_date: toDate,
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
                language: ApiPath.lang,
                company_id: ApiPath.companyID,
                page_size: null,
                approver_status: approverStatus,
                login_id: parseInt(ApiPath.loginEmp),
            }
            setRequestState(request);
            searchAPI(request);
        }
    });

    const searchAPI = async (request, page = 1, smg = true) => {
        //setMainTableSH(true);
        page = parseInt(page) ? page : 1;
        setActivePage(page);
        setDeleteIdList('');
        setConfirmRejectList('');

        request = { ...request, page: page }
        setLoading(true);
        let params = request;
        let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutListSearch, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag == false) {
            setRowCount('');
            smg && setError(response.message);
            smg && setSuccess("");
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setMainTable([]);
        }
        else {
            setRowCount(t("Total Rows").replace('%s', response.data.total));
            setMainTable(response.data.data);
            setTotalPage(response.data.last_page);
            setPerPage(parseInt(response.data.per_page));
            setAllCheck(false);
            const checkConfirm = response.data.data.map(item => item.confirm_checkbox === true);
            if (checkConfirm.find(i => i === true)) {
                setShowConfirm(true);
            }
            else setShowConfirm(false);
            const checkDelete = response.data.data.map(item => item.delete_checkbox === true);
            if (checkDelete.find(i => i === true)) {
                setShowCheckDelete(true);
            }
            else setShowCheckDelete(false);
        }
    }

    const [showConfirm, setShowConfirm] = useState(false);
    const [showCheckDelete, setShowCheckDelete] = useState(false);

    /* CHECKBOX ACTION */
    const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
    const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
    const [confirmRejectList, setConfirmRejectList] = useState(''); // For confirm reject data list
    const changeCheckbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let dataDel;
        let id_list = [];
        let mainTableNew = [];
        if (showDelete) {
            mainTableNew = mainTable.filter(item => item.delete_checkbox === true)

            if (value === "all-check") {
                data = mainTable.map(item => ({ ...item, is_checked: checked }));
            } else {
                data = mainTable.map(item =>
                    item.employee_attendance_id === parseInt(value) ? { ...item, is_checked: checked } : item
                )
            }

            if (value === "all-check") {
                dataDel = mainTableNew.map(item => ({ ...item, is_checked: checked }));
            } else {
                dataDel = mainTableNew.map(item =>
                    item.employee_attendance_id === parseInt(value) ? { ...item, is_checked: checked } : item
                )
            }
        } else {
            mainTableNew = mainTable.filter(item => item.confirm_checkbox === true)

            if (value === "all-check") {
                data = mainTable.map(item => ({ ...item, is_checked: checked }));
            } else {
                data = mainTable.map(item =>
                    item.employee_attendance_id === parseInt(value) ? { ...item, is_checked: checked } : item
                )
            }

            if (value === "all-check") {
                dataDel = mainTableNew.map(item => ({ ...item, is_checked: checked }));
            } else {
                dataDel = mainTableNew.map(item =>
                    item.employee_attendance_id === parseInt(value) ? { ...item, is_checked: checked } : item
                )
            }
        }

        for (let i = 0; i < dataDel.length; i++) {
            if (dataDel[i].is_checked === true) {
                id_list.push(dataDel[i].employee_attendance_id);
            }
        }

        var itemDel = id_list.toString();
        setDeleteIdList(itemDel);
        setConfirmRejectList(id_list);

        if (mainTableNew.length > 0) setAllCheck(dataDel.every(item => item.is_checked));
        else setAllCheck(data.every(item => item.is_checked));
        //setAllCheck(dataDel.every(item => item.is_checked));
        setMainTable(data);
    }

    /* Show Button Delete */
    const [showDelete, setShowDelete] = useState(false);
    const showButtonDelete = (i) => {
        let checked = i.target.checked;
        let mainTableNew = [];
        mainTableNew = mainTable.filter(item => item.delete_checkbox && item.delete_checkbox === true);
        mainTableNew.map(item => item.is_checked = false);
        setAllCheck(false);
        setDeleteIdList('');
        setConfirmRejectList('');
        if (checked) {
            setShowDelete(true);
        }
        else {
            setShowDelete(false);
        }
    }

    /* Detail icon*/
    const getDetails = (e) => {
        sessionStorage.setItem('RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS', e['employee_attendance_id']);
        sessionStorage.setItem('RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS', JSON.stringify(requestState));
        history.push("./checkin-checkout-detail-information");
    }

    /* Open Modal Reject */
    const [modalReject, setModalReject] = useState(false);
    const openModalReject = (e) => {
        setReason("");
        setErrorModal([]);
        if (!isEmpty(confirmRejectList)) {
            setError([]);
            setSuccess("");
            setModalReject(!modalReject)
        } else {
            setSuccess('');
            let errorMsg = t('JSE001').replace('%s', t('Attendance'));
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }

    /* Show dropdown toggle */
    const theChosenJoinStartDate = () => {
        const chosenJoinedDate = selectedFromDate;
        if (chosenJoinedDate != null) {
            return chosenJoinedDate ? t('From') + ": " + Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(chosenJoinedDate) : t('From Date');
        } else {
            return chosenJoinedDate ? t('From') + ": " + Intl.DateTimeFormat() : t('From Date');
        }
    }
    const theChosenJoinEndDate = () => {
        const chosenJoinedDate = selectedToDate;
        if (chosenJoinedDate != null) {
            return chosenJoinedDate ? t('To') + ": " + Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(chosenJoinedDate) : t('To Date');
        } else {
            return chosenJoinedDate ? t('To') + ": " + Intl.DateTimeFormat() : t('To Date');
        }
    }

    let removeFromDate = () => {
        setSelectedFromDate(null);
    }
    let removeToDate = () => {
        setSelectedToDate(null);
    }

    /* DELETE OVERTIME MODAL BOX */
    const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide
    const deleteToggleAlert = () => {
        if (!isEmpty(deleteIdList)) {
            setError([]);
            setSuccess("");
            setContent(t('Are you sure want to delete?')); setType('delete');
            setDeleteModalBox(!deleteModalBox);
        } else {
            setSuccess('');
            let errorMsg = t('JSE001').replace('%s', t('Attendance'));
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    const deleteOK = async () => {
        //var array = [...mainTable];
        setDeleteModalBox(!deleteModalBox);

        if (!isEmpty(deleteIdList)) {
            setLoading(true);

            let url = `${ApiPath.CheckInCheckOutListDelete}${deleteIdList}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
            let obj = { package_name: 'hr', url: url, method: 'delete' };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            } else {
                setSuccess([response.data.message]);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            }
        }
    }

    /* COMFIRM MODAL BOX */
    const [confirmModalBox, setConfirmModalBox] = useState(false); // Delete confirm box show or hide
    const confirmToggleAlert = () => {
        if (!isEmpty(confirmRejectList)) {
            setError([]);
            setSuccess("");
            setContent(t('Are you sure want to confirm?')); setType('confirm');
            setConfirmModalBox(!confirmModalBox);
        } else {
            setSuccess('');
            let errorMsg = t('JSE001').replace('%s', t('Attendance'));
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    const confirmOK = async () => {
        //var array = [...mainTable];
        setConfirmModalBox(!confirmModalBox);

        setLoading(true);
        let params = {
            login_id: ApiPath.loginEmp,
            attendance_ids: confirmRejectList,
            company_id: ApiPath.companyID
        }
        let obj = { package_name: "hr", url: ApiPath.CheckInCheckOutListConfirm, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess("");
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
        }
        else {
            setSuccess([response.data.message]);
            setError('');
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
        }
    }

    /*Set page */
    // async function pagination(i) {
    //     await searchAPI(requestState, i);
    //     setActivePage(i)
    // }
    const pagination = (newPage) => {
        setActivePage(newPage);
        searchAPI(requestState, newPage);
    }

    let refresh = () => {
        window.location.reload(false);
    }

    const removeMessage = () => {
        setError("");
        setSuccess("");
        setErrorModal([]);
    }
    /* SAVE REJECT */
    const [errorModal, setErrorModal] = useState([]);
    const RejectOK = async () => {
        if (isEmpty(reason.trim())) {
            setErrorModal([t('JSE124').replace('%s', t('Reason'))]);
        }
        else if (!checkMaxLength(reason, 500)) {
            setErrorModal([t('JSE123').replace('%s', t('Reason')).replace('%s', 500)]);
        }
        else {
            let params = {
                login_id: ApiPath.loginEmp,
                attendance_ids: confirmRejectList,
                company_id: ApiPath.companyID,
                denied_reason: reason
            }
            let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutListReject, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                closeModalReject();
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            }
            else {
                setSuccess([response.data.message]);
                setError('');
                closeModalReject();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            }
        }
    }

    /* CLOSE MODAL REJECT */
    const closeModalReject = () => {
        setModalReject(!modalReject);
    }

    /* VALUE REASON*/
    const [reason, setReason] = useState("");
    let changeReason = (e) => {
        setReason(e.target.value);
    }

    /* GET VIEW PERMISSION */
    const [viewPermissionAPI, setViewPermissionAPI] = useState('');
    const loadViewPermission = async () => {
        let params = {
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.autocomplete);
            if (response.data.autocomplete && !isEmpty(requestState)) {
                setEmployeeID("");
                setEmployeeCode("");
                setEmployeeName("");
            }
            else if (!response.data.autocomplete) {
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id);
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code);
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng);
            }
        }
    };

    /* GET EMPLOYEE INFO */
    const [approverStatusAPI, setApproverStatusAPI] = useState([]);
    const loadEmployeeInfor = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
            login_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutListGetEmployeeInfor, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            if (response.data?.data) {
                let data = response.data.data[0];
                setApproverStatusAPI(data.approver_status);
            }
        }
    };

    const [approverStatus, setApproverStatus] = useState("");
    const chooseApproverStatus = (e) => {
        setApproverStatus(parseInt(e.target.value));
    }

    const cancelClick = () => {
        setConfirmModalBox(false);
        setDeleteModalBox(false);
    }

    return (
        <CRow>
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5><CLabel>{t('Check In Check Out List')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchCheckInCheckOutList
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}

                            approverStatusAPI={approverStatusAPI}
                            viewPermissionAPI={viewPermissionAPI}
                            theChosenJoinStartDate={theChosenJoinStartDate}
                            theChosenJoinEndDate={theChosenJoinEndDate}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
                            selectedToDate={selectedToDate}
                            handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
                            removeFromDate={removeFromDate}
                            removeToDate={removeToDate}
                            chooseApproverStatus={chooseApproverStatus}
                            approverStatus={approverStatus}
                            searchAPI={() => fnSearch()} />
                        <CheckInCheckOutTable
                            showConfirm={showConfirm}
                            showCheckDelete={showCheckDelete}
                            openModalReject={openModalReject}
                            modalReject={modalReject}
                            getDetails={getDetails}
                            showButtonDelete={showButtonDelete}
                            showDelete={showDelete}
                            pagination={pagination}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            perPage={perPage}
                            mainTable={mainTable}
                            rowCount={rowCount}
                            AllCheck={AllCheck}
                            changeCheckbox={changeCheckbox}
                            confirmToggleAlert={confirmToggleAlert}
                            deleteToggleAlert={deleteToggleAlert} />
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={confirmModalBox || deleteModalBox}
                            cancel={cancelClick}
                            confirmOK={confirmOK}
                            deleteOK={deleteOK} />
                        <ModalReject
                            removeMessage={removeMessage}
                            errorModal={errorModal}
                            changeReason={changeReason}
                            reason={reason}
                            RejectOK={RejectOK}
                            closeModalReject={closeModalReject}
                            modalReject={modalReject} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function CheckInCheckOutListIndex() {
    return (
        <Welcome />
    )
}