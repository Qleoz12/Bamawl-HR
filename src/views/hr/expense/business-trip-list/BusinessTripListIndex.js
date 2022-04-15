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
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkMaxLength, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import BusinessTripListTable from './BusinessTripListTable';
import ModalRejectHistory from './ModalRejectHistory';
import SearchBusinessTripList from './SearchBusinessTripList';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    //const [OvertimeState, setOvertimeState] = useState(); // For overtime name dropdown toggle

    const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date

    const [selectedTripAppliedFromDate, setSelectedTripAppliedFromDate] = useState(null); // For Joined Start Date
    const [selectedTripAppliedToDate, setSelectedTripAppliedToDate] = useState(null); // For Joined End Date

    const [selectedTripDueFromDate, setSelectedTripDueFromDate] = useState(null); // For Joined Start Date
    const [selectedTripDueToDate, setSelectedTripDueToDate] = useState(null); // For Joined End Date

    const [selectedAdjustmentAppliedFromDate, setSelectedAdjustmentAppliedFromDate] = useState(null); // For Joined Start Date
    const [selectedAdjustmentAppliedToDate, setSelectedAdjustmentAppliedToDate] = useState(null); // For Joined End Date

    const [selectedAdjustmentDueFromDate, setSelectedAdjustmentDueFromDate] = useState(null); // For Joined Start Date
    const [selectedAdjustmentDueToDate, setSelectedAdjustmentDueToDate] = useState(null); // For Joined End Date

    const [rowCount, setRowCount] = useState();           // For row count
    //const [mainTableSH, setMainTableSH] = useState(false); // For main table show or hide
    const [mainTable, setMainTable] = useState([]);

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState('');
    const [currentPage, setActivePage] = useState(1) // for Pagination
    const [totalPage, setTotalPage] = useState(1) // for Pagination
    const [perPage, setPerPage] = useState(1) // for Pagination
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [numCurrencies, setNumCurrencies] = useState('');
    const [clearData, setClearData] = useState('');

    const [rejectHistoryBox, setRejectHistoryBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    // Loaded initially
    useEffect(() => {
        setLoading(true);
        loadDept();
        loadPos();
        loadEmployeeInfor();
        loadViewPermission();

        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS");
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_HISTORY");
        let pre_Data = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS")); // return data from OT Rate List Form
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS");
        let flag_data = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS_PREVIOUS"));
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS_PREVIOUS");
        let dash_data = JSON.parse(localStorage.getItem("RETURN_BUSINESS_TRIP_LIST_ID"));
        localStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID");
        if (dash_data) {
            let data = {
                business_trip_id: parseInt(dash_data.business_trip_id)
            }
            searchAPI(data);
            setSelectedFromDate(dash_data.period_from_date ? Moment(dash_data.period_from_date).format('MM/DD/YYYY') : null);
            setSelectedToDate(dash_data.period_to_date ? Moment(dash_data.period_to_date).format('MM/DD/YYYY') : null);
            setApproverStatus(dash_data.approver_status ? dash_data.approver_status : "");
            setDepartment(dash_data.department_id ? dash_data.department_id : "");
            setPositon(dash_data.position_id ? dash_data.position_id : "");
            setExpenseDepartment(dash_data.expense_department_id ? dash_data.expense_department_id : "");
            setTripType(dash_data.trip_type ? dash_data.trip_type : "");
            setSelectedTripAppliedFromDate(dash_data.business_trip_applied_from_date ? Moment(dash_data.business_trip_applied_from_date).format('MM/DD/YYYY') : null);
            setSelectedTripAppliedToDate(dash_data.business_trip_applied_to_date ? Moment(dash_data.business_trip_applied_to_date).format('MM/DD/YYYY') : null);
            setSelectedTripDueFromDate(dash_data.business_trip_due_from_date ? Moment(dash_data.business_trip_due_from_date).format('MM/DD/YYYY') : null);
            setSelectedTripDueToDate(dash_data.business_trip_due_to_date ? Moment(dash_data.business_trip_due_to_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentAppliedFromDate(dash_data.business_trip_adjustment_applied_from_date ? Moment(dash_data.business_trip_adjustment_applied_from_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentAppliedToDate(dash_data.business_trip_adjustment_applied_to_date ? Moment(dash_data.business_trip_adjustment_applied_to_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentDueFromDate(dash_data.business_trip_adjustment_due_from_date ? Moment(dash_data.business_trip_adjustment_due_from_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentDueToDate(dash_data.business_trip_adjustment_due_to_date ? Moment(dash_data.business_trip_adjustment_due_to_date).format('MM/DD/YYYY') : null);
            setEmployeeCode(dash_data.employee_code ? dash_data.employee_code : "");
            setEmployeeID(dash_data.employee_id ? dash_data.employee_id : "");
            setEmployeeName(dash_data.employee_name ? dash_data.employee_name : "");
            setRequestState(dash_data);
        }
        else if (pre_Data !== null && flag_data === 1) {
            if (pre_Data.business_trip_id) {
                let item = {
                    business_trip_id: parseInt(pre_Data.business_trip_id)
                }
                searchAPI(item);
            }
            else {
                searchAPI(pre_Data);
            }
            setSelectedFromDate(pre_Data.period_from_date ? Moment(pre_Data.period_from_date).format('MM/DD/YYYY') : null);
            setSelectedToDate(pre_Data.period_to_date ? Moment(pre_Data.period_to_date).format('MM/DD/YYYY') : null);
            setApproverStatus(pre_Data.approver_status ? pre_Data.approver_status : "");
            setDepartment(pre_Data.department_id ? pre_Data.department_id : "");
            setPositon(pre_Data.position_id ? pre_Data.position_id : "");
            setExpenseDepartment(pre_Data.expense_department_id ? pre_Data.expense_department_id : "");
            setTripType(pre_Data.trip_type ? pre_Data.trip_type : "");
            setSelectedTripAppliedFromDate(pre_Data.business_trip_applied_from_date ? Moment(pre_Data.business_trip_applied_from_date).format('MM/DD/YYYY') : null);
            setSelectedTripAppliedToDate(pre_Data.business_trip_applied_to_date ? Moment(pre_Data.business_trip_applied_to_date).format('MM/DD/YYYY') : null);
            setSelectedTripDueFromDate(pre_Data.business_trip_due_from_date ? Moment(pre_Data.business_trip_due_from_date).format('MM/DD/YYYY') : null);
            setSelectedTripDueToDate(pre_Data.business_trip_due_to_date ? Moment(pre_Data.business_trip_due_to_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentAppliedFromDate(pre_Data.business_trip_adjustment_applied_from_date ? Moment(pre_Data.business_trip_adjustment_applied_from_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentAppliedToDate(pre_Data.business_trip_adjustment_applied_to_date ? Moment(pre_Data.business_trip_adjustment_applied_to_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentDueFromDate(pre_Data.business_trip_adjustment_due_from_date ? Moment(pre_Data.business_trip_adjustment_due_from_date).format('MM/DD/YYYY') : null);
            setSelectedAdjustmentDueToDate(pre_Data.business_trip_adjustment_due_to_date ? Moment(pre_Data.business_trip_adjustment_due_to_date).format('MM/DD/YYYY') : null);
            setEmployeeCode(pre_Data.employee_code ? pre_Data.employee_code : "");
            setEmployeeID(pre_Data.employee_id ? pre_Data.employee_id : "");
            setEmployeeName(pre_Data.employee_name ? pre_Data.employee_name : "");
            setRequestState(pre_Data);
        }

    }, [loadEmployeeInfor, loadDept, searchAPI, loadPos, loadViewPermission]);

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
        let tripAppliedFromDate = null;
        let tripAppliedToDate = null;
        let tripDueFromDate = null;
        let tripDueToDate = null;
        let adjustmentAppliedFromDate = null;
        let adjustmentAppliedToDate = null;
        let adjustmentDueFromDate = null;
        let adjustmentDueToDate = null;

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
        if (!isEmpty(fromDate) && isEmpty(toDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Period (To Date)'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(fromDate) && !isEmpty(toDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Period (From Date)'));
            errorMsg.push(errMsg);
        }
        if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('Business Trip Period (From Date)')).replace('%s', t('Business Trip Period (To Date)'));
            errorMsg.push(errMsg);
        }

        if (selectedTripAppliedFromDate != null) {
            tripAppliedFromDate = Moment(selectedTripAppliedFromDate).format('YYYY-MM-DD');
        } else {
            tripAppliedFromDate = selectedTripAppliedFromDate;
        }
        if (selectedTripAppliedToDate != null) {
            tripAppliedToDate = Moment(selectedTripAppliedToDate).format('YYYY-MM-DD');
        } else {
            tripAppliedToDate = selectedTripAppliedToDate;

        }
        if (!isEmpty(tripAppliedFromDate) && isEmpty(tripAppliedToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Applied Date To'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(tripAppliedFromDate) && !isEmpty(tripAppliedToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Applied Date From'));
            errorMsg.push(errMsg);
        }
        if (tripAppliedFromDate > tripAppliedToDate) {
            let errMsg = t('JSE002').replace('%s', t('Business Trip Applied Date From')).replace('%s', t('Business Trip Applied Date To'));
            errorMsg.push(errMsg);
        }

        if (selectedTripDueFromDate != null) {
            tripDueFromDate = Moment(selectedTripDueFromDate).format('YYYY-MM-DD');
        } else {
            tripDueFromDate = selectedTripDueFromDate;
        }
        if (selectedTripDueToDate != null) {
            tripDueToDate = Moment(selectedTripDueToDate).format('YYYY-MM-DD');
        } else {
            tripDueToDate = selectedTripDueToDate;
        }
        if (!isEmpty(tripDueFromDate) && isEmpty(tripDueToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Due Date To'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(tripDueFromDate) && !isEmpty(tripDueToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Due Date From'));
            errorMsg.push(errMsg);
        }
        if (tripDueFromDate > tripDueToDate) {
            let errMsg = t('JSE002').replace('%s', t('Business Trip Due Date From')).replace('%s', t('Business Trip Due Date To'));
            errorMsg.push(errMsg);
        }

        if (selectedAdjustmentAppliedFromDate != null) {
            adjustmentAppliedFromDate = Moment(selectedAdjustmentAppliedFromDate).format('YYYY-MM-DD');
        } else {
            adjustmentAppliedFromDate = selectedAdjustmentAppliedFromDate;
        }
        if (selectedAdjustmentAppliedToDate != null) {
            adjustmentAppliedToDate = Moment(selectedAdjustmentAppliedToDate).format('YYYY-MM-DD');
        } else {
            adjustmentAppliedToDate = selectedAdjustmentAppliedToDate;
        }
        if (!isEmpty(adjustmentAppliedFromDate) && isEmpty(adjustmentAppliedToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Adjustment Applied Date To'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(adjustmentAppliedFromDate) && !isEmpty(adjustmentAppliedToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Adjustment Applied Date From'));
            errorMsg.push(errMsg);
        }
        if (adjustmentAppliedFromDate > adjustmentAppliedToDate) {
            let errMsg = t('JSE002').replace('%s', t('Business Trip Adjustment Applied From Date')).replace('%s', t('Business Trip Adjustment Applied To Date'));
            errorMsg.push(errMsg);
        }

        if (selectedAdjustmentDueFromDate != null) {
            adjustmentDueFromDate = Moment(selectedAdjustmentDueFromDate).format('YYYY-MM-DD');
        } else {
            adjustmentDueFromDate = selectedAdjustmentDueFromDate;
        }
        if (selectedAdjustmentDueToDate != null) {
            adjustmentDueToDate = Moment(selectedAdjustmentDueToDate).format('YYYY-MM-DD');
        } else {
            adjustmentDueToDate = selectedAdjustmentDueToDate;
        }
        if (!isEmpty(adjustmentDueFromDate) && isEmpty(adjustmentDueToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Adjustment Due Date To'));
            errorMsg.push(errMsg);
        }
        if (isEmpty(adjustmentDueFromDate) && !isEmpty(adjustmentDueToDate)) {
            let errMsg = t('JSE001').replace('%s', t('Business Trip Adjustment Due Date From'));
            errorMsg.push(errMsg);
        }
        if (adjustmentDueFromDate > adjustmentDueToDate) {
            let errMsg = t('JSE002').replace('%s', t('Business Trip Adjustment Due Date From')).replace('%s', t('Business Trip Adjustment Due Date To'));
            errorMsg.push(errMsg);
        }
        if (errorMsg.length > 0) {
            setError(errorMsg);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            const request = {
                period_from_date: fromDate,
                period_to_date: toDate,
                business_trip_applied_from_date: tripAppliedFromDate,
                business_trip_applied_to_date: tripAppliedToDate,
                business_trip_due_from_date: tripDueFromDate,
                business_trip_due_to_date: tripDueToDate,
                business_trip_adjustment_applied_from_date: adjustmentAppliedFromDate,
                business_trip_adjustment_applied_to_date: adjustmentAppliedToDate,
                business_trip_adjustment_due_from_date: adjustmentDueFromDate,
                business_trip_adjustment_due_to_date: adjustmentDueToDate,
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
                language: ApiPath.lang,
                company_id: ApiPath.companyID,
                page_size: null,
                approver_status: approverStatus,
                trip_type: tripType,
                department_id: department,
                position_id: position,
                expense_department_id: expenseDepartment,
                login_id: parseInt(ApiPath.loginEmp),
            }
            setRequestState(request);
            searchAPI(request);
        }
    });

    const [checkHidden, setCheckHidden] = useState(false);
    const searchAPI = async (request, page = 1, smg = true) => {
        //setMainTableSH(true);
        page = parseInt(page) ? page : 1;
        setActivePage(page);
        setConfirmRejectList('');

        request = { ...request, page: page }
        setLoading(true);
        let params = request;
        let obj = { package_name: 'hr', url: ApiPath.BusinessTripListSearch, method: 'post', params }
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
            let num = 0;
            let curr = response.data.data[0].currencies.length;
            for (let i = 1; i < response.data.data.length; i++) {
                if (response.data.data[i].currencies.length > curr) {
                    num = i;
                }
            }
            setCurrencies(response.data.data[num].currencies);
            setNumCurrencies(response.data.data[num].currencies.length);
            if (isAdjustment === false) {
                let tmp = response.data.data.filter(item => item.business_trip && item.business_trip.show_confirm === true)
                if (tmp && tmp.length > 0) {
                    setCheckHidden(true);
                }
                else {
                    setCheckHidden(false);
                }
            }
            else {
                let tmp = response.data.data.filter(item => item.business_trip_adjustment && item.business_trip_adjustment.show_confirm === true)
                if (tmp && tmp.length > 0) {
                    setCheckHidden(true);
                }
                else {
                    setCheckHidden(false);
                }
            }
        }
    }

    /* CHECKBOX ACTION */
    const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
    const [confirmRejectList, setConfirmRejectList] = useState(''); // For confirm reject data list
    const changeCheckbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let dataDel;
        let id_list = [];
        let mainTableNew = [];

        if (!isAdjustment) {
            mainTableNew = mainTable.filter(item => item.business_trip && item.business_trip.show_confirm === true)
        }
        else if (isAdjustment) {
            mainTableNew = mainTable.filter(item => item.business_trip_adjustment && item.business_trip_adjustment.show_confirm === true)
        }

        if (value === "all-check") {
            data = mainTable.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = mainTable.map(item =>
                item.business_trip_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }

        if (value === "all-check") {
            dataDel = mainTableNew.map(item => ({ ...item, is_checked: checked }));
        } else {
            dataDel = mainTableNew.map(item =>
                item.business_trip_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }

        for (let i = 0; i < dataDel.length; i++) {
            if (dataDel[i].is_checked === true) {
                id_list.push(dataDel[i].business_trip_id);
            }
        }

        setConfirmRejectList(id_list);

        if (mainTableNew.length > 0) setAllCheck(dataDel.every(item => item.is_checked));
        else setAllCheck(data.every(item => item.is_checked));
        setMainTable(data);
    }

    /* Show Button Delete */
    const [showDelete, setShowDelete] = useState(false);
    const showButtonDelete = (i) => {
        let checked = i.target.checked;
        if (checked) {
            setShowDelete(true);
        }
        else setShowDelete(false);
    }

    /* EDIT OVERTIME MODAL BOX */
    const [editModalBox, setEditModalBox] = useState(false); // Edit confirm box show or hide
    const [editID, setEditID] = useState('');
    const [flagId, setFlag] = useState('');
    const editToggleAlertBusinessTrip = (e) => {
        setFlag(1);
        setEditID(e['business_trip_id']);
        setContent(t('Are you sure want to edit?')); setType('edit');
        setEditModalBox(!editModalBox);
    }
    const editToggleAlertBusinessTripAdjustment = (e) => {
        setFlag('');
        setEditID(e['business_trip_id']);
        setContent(t('Are you sure want to edit?')); setType('edit');
        setEditModalBox(!editModalBox);
    }

    const editOK = () => {
        //var array = [...mainTable];
        setEditModalBox(!editModalBox);
        editRow(editID);
    }
    /* EDIT LINK TO NEXT PAGE */
    const editRow = (id) => {
        if (flagId === 1) {
            sessionStorage.setItem('RETURN_BUSINESS_TRIP_REQUEST_DATA', JSON.stringify(id));
            history.push("./business-trip-request");
        }
        else {
            sessionStorage.setItem('RETURN_BUSINESS_TRIP_ADJUSTMENT_REQUEST_DATA', JSON.stringify(id));
            history.push("./business-trip-adjustment-request");
        }
    }

    /* Detail Business Trip*/
    const getDetailsBusinessTrip = (e) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_ID_DETAILS', e['business_trip_id']);
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS', JSON.stringify(requestState));
        history.push("./business-trip-detail");
    }
    /* Detail Business Trip Adjustment*/
    const getDetailsBusinessTripAdjusment = (e) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_ID_DETAILS', e['business_trip_id']);
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS', JSON.stringify(requestState));
        history.push("./business-trip-adjustment-detail");
    }
    /* Detail Business Trip Adjustment*/
    const getDetailsBusinessTripAdjusmentHistory = (e) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_HISTORY', e['id']);
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS', JSON.stringify(requestState));
        history.push("./business-trip-adjustment-detail");
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
            let errorMsg = t('JSE001').replace('%s', t('Business Trip'));
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }

    /* DELETE OVERTIME MODAL BOX */
    const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide
    const [flagAdjustment, setFlagAdjustment] = useState(false);
    const [businessTripId, setBusinessTripId] = useState("");
    const deleteToggleAlertBusinessTrip = (e) => {
        let businessId = e['business_trip_id'];
        if (!isEmpty(businessId)) {
            setBusinessTripId(businessId);
            setFlagAdjustment(false);
            setError([]);
            setSuccess("");
            setContent(t('Are you sure want to delete?')); setType('delete');
            setDeleteModalBox(!deleteModalBox);
        } else {
            setSuccess('');
            let errorMsg = t('Please choose you want to Delete!');
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    const deleteToggleAlertBusinessTripAdjustment = (e) => {
        let businessId = e['business_trip_id'];
        if (!isEmpty(businessId)) {
            setBusinessTripId(businessId);
            setFlagAdjustment(true);
            setError([]);
            setSuccess("");
            setContent(t('Are you sure want to delete?')); setType('delete');
            setDeleteModalBox(!deleteModalBox);
        } else {
            setSuccess('');
            let errorMsg = t('Please choose you want to Delete!');
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }

    const deleteOK = async () => {
        //var array = [...mainTable];
        setDeleteModalBox(!deleteModalBox);

        if (!isEmpty(businessTripId)) {
            setLoading(true);
            let params = {
                is_adjustment: flagAdjustment === true ? 1 : 0
            }
            let url = `${ApiPath.BusinessTripListDelete}${businessTripId}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
            let obj = { package_name: 'hr', url: url, method: 'delete', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setSuccess([]);
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            } else {
                setSuccess([response.data.message]);
                setError('');
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
            let errorMsg = t('JSE001').replace('%s', t('Business Trip'));
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
            business_trip_ids: confirmRejectList,
            company_id: ApiPath.companyID,
            is_adjustment: isAdjustment
        }
        let obj = { package_name: "hr", url: ApiPath.BusinessTripListConfirm, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
        } else {
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
            setLoading(true);
            let params = {
                login_id: ApiPath.loginEmp,
                business_trip_ids: confirmRejectList,
                company_id: ApiPath.companyID,
                denied_reason: reason,
                is_adjustment: isAdjustment
            }
            let obj = { package_name: 'hr', url: ApiPath.BusinessTripListReject, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setSuccess([]);
                setError(response.message);
                closeModalReject();
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            } else {
                setError('');
                setSuccess([response.data.message]);
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

    /* START BZ TRIP HISTORY */
    const [popupError, setPopupError] = useState();
    const [tableBzTripHistory, setTableBzTripHistory] = useState([]);
    const GetBzTripHistory = async (business_trip_id) => {
        setLoading(true);
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
            login_id: ApiPath.loginEmp,
            business_trip_id: business_trip_id
        }
        let obj = { package_name: 'hr', url: ApiPath.BusinessTripListBzTripHistory, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            closeRejectHistoryModal();
            setError(response.message);
        }
        else {
            setPopupError();
            setTableBzTripHistory(response.data.data);
        }
    };

    const removeMessagePopup = () => {
        setPopupError();
    }
    /* END BZ TRIP HISTORY */

    /* START GET DEPARTMENT SELECT BOX */
    const [departmentAPI, setDepartmentAPI] = useState([]);
    const loadDept = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setDepartmentAPI(response.data.data);
        }
    };
    /* END GET DEPARTMENT SELECT BOX */

    /* START GET POSITION SELECT BOX */
    const [positionAPI, setPositionAPI] = useState([]);
    const loadPos = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllPosition, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setPositionAPI(response.data.data);
        }
    };
    /* END GET POSITION SELECT BOX */

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
        let obj = { package_name: 'hr', url: ApiPath.BusinessTripListGetEmployeeInfo, method: 'post', params };
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
    const [department, setDepartment] = useState("");
    const [position, setPositon] = useState("");
    const [expenseDepartment, setExpenseDepartment] = useState("");
    const [tripType, setTripType] = useState("");
    const chooseDepartment = (e) => {
        setDepartment(parseInt(e.target.value));
    }
    const choosePosition = (e) => {
        setPositon(parseInt(e.target.value));
    }
    const chooseApproverStatus = (e) => {
        setApproverStatus(parseInt(e.target.value));
    }
    const chooseExpenseDepartment = (e) => {
        setExpenseDepartment(parseInt(e.target.value));
    }
    const chooseTripType = (e) => {
        setTripType(e.target.value);
    }
    const [isAdjustment, setIsAdjustment] = useState(false);
    let chooseIsAdjustment = (e) => {
        setAllCheck(false);
        setConfirmRejectList('');
        mainTable.map(item => item.is_checked = false);

        setIsAdjustment(!isAdjustment);
        if (!isAdjustment === false) {
            let tmp = mainTable.filter(item => item.business_trip && item.business_trip.show_confirm === true)
            if (tmp && tmp.length > 0) {
                setCheckHidden(true);
            }
            else {
                setCheckHidden(false);
            }
        }
        else {
            let tmp = mainTable.filter(item => item.business_trip_adjustment && item.business_trip_adjustment.show_confirm === true)
            if (tmp && tmp.length > 0) {
                setCheckHidden(true);
            }
            else {
                setCheckHidden(false);
            }
        }
    }

    /* Approver Modal Box Start */
    const openRejectHistoryModal = (e) => {
        setRejectHistoryBox(!rejectHistoryBox);
        let businessId = e['business_trip_id'];
        setBusinessTripId(businessId);
        GetBzTripHistory(businessId);
    }
    const closeRejectHistoryModal = () => {
        setRejectHistoryBox(!rejectHistoryBox);
        setTableBzTripHistory([]);
        setPopupError();
    }
    const linkAdjustmentRequest = (e) => {
        sessionStorage.setItem('RETURN_BUSINESS_TRIP_ADJUSTMENT_REQUEST_DATA', e['business_trip_id']);
        history.push("./business-trip-adjustment-request");
    }

    const cancelClick = () => {
        setConfirmModalBox(false);
        setEditModalBox(false);
        setDeleteModalBox(false);
    }
    return (
        <CRow>
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5><CLabel>{t('Business Trip List')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchBusinessTripList
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}

                            departmentAPI={departmentAPI}
                            positionAPI={positionAPI}
                            chooseIsAdjustment={chooseIsAdjustment}
                            isAdjustment={isAdjustment}
                            approverStatusAPI={approverStatusAPI}
                            viewPermissionAPI={viewPermissionAPI}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
                            selectedToDate={selectedToDate}
                            handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
                            chooseApproverStatus={chooseApproverStatus}
                            approverStatus={approverStatus}
                            chooseDepartment={chooseDepartment}
                            department={department}
                            choosePosition={choosePosition}
                            position={position}
                            chooseExpenseDepartment={chooseExpenseDepartment}
                            expenseDepartment={expenseDepartment}
                            chooseTripType={chooseTripType}
                            tripType={tripType}
                            handleTripAppliedFromDateChange={i => setSelectedTripAppliedFromDate(ChangeDate(i))}
                            handleTripAppliedToDateChange={i => setSelectedTripAppliedToDate(ChangeDate(i))}
                            handleTripDueFromDateChange={i => setSelectedTripDueFromDate(ChangeDate(i))}
                            handleTripDueToDateChange={i => setSelectedTripDueToDate(ChangeDate(i))}
                            handleAdjustmentAppliedFromDateChange={i => setSelectedAdjustmentAppliedFromDate(ChangeDate(i))}
                            handleAdjustmentAppliedToDateChange={i => setSelectedAdjustmentAppliedToDate(ChangeDate(i))}
                            handleAdjustmentDueFromDateChange={i => setSelectedAdjustmentDueFromDate(ChangeDate(i))}
                            handleAdjustmentDueToDateChange={i => setSelectedAdjustmentDueToDate(ChangeDate(i))}
                            selectedTripAppliedFromDate={selectedTripAppliedFromDate}
                            selectedTripAppliedToDate={selectedTripAppliedToDate}
                            selectedTripDueFromDate={selectedTripDueFromDate}
                            selectedTripDueToDate={selectedTripDueToDate}
                            selectedAdjustmentAppliedFromDate={selectedAdjustmentAppliedFromDate}
                            selectedAdjustmentAppliedToDate={selectedAdjustmentAppliedToDate}
                            selectedAdjustmentDueFromDate={selectedAdjustmentDueFromDate}
                            selectedAdjustmentDueToDate={selectedAdjustmentDueToDate}
                            searchAPI={() => fnSearch()} />
                        <BusinessTripListTable
                            openModalReject={openModalReject}
                            modalReject={modalReject}
                            getDetailsBusinessTrip={getDetailsBusinessTrip}
                            getDetailsBusinessTripAdjusment={getDetailsBusinessTripAdjusment}
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
                            deleteToggleAlertBusinessTripAdjustment={deleteToggleAlertBusinessTripAdjustment}
                            deleteToggleAlertBusinessTrip={deleteToggleAlertBusinessTrip}
                            editToggleAlertBusinessTripAdjustment={editToggleAlertBusinessTripAdjustment}
                            editToggleAlertBusinessTrip={editToggleAlertBusinessTrip}
                            openRejectHistoryModal={openRejectHistoryModal}
                            linkAdjustmentRequest={linkAdjustmentRequest}
                            currencies={currencies}
                            numCurrencies={numCurrencies}
                            isAdjustment={isAdjustment}
                            checkHidden={checkHidden} />
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={confirmModalBox || editModalBox || deleteModalBox}
                            cancel={cancelClick}
                            confirmOK={confirmOK}
                            editOK={editOK}
                            deleteOK={deleteOK} />
                        <ModalReject
                            removeMessage={removeMessage}
                            errorModal={errorModal}
                            changeReason={changeReason}
                            reason={reason}
                            RejectOK={RejectOK}
                            closeModalReject={closeModalReject}
                            modalReject={modalReject} />
                        <ModalRejectHistory
                            closeRejectHistoryModal={closeRejectHistoryModal}
                            tableBzTripHistory={tableBzTripHistory}
                            getDetailsBusinessTripAdjusmentHistory={getDetailsBusinessTripAdjusmentHistory}
                            rejectHistoryBox={rejectHistoryBox}
                            currencies={currencies}
                            numCurrencies={numCurrencies}
                            popupError={popupError}
                            removeMessagePopup={removeMessagePopup} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BusinessTripListIndex() {
    return (
        <Welcome />
    )
}