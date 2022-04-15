import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import SearchApproverList from './SearchApproverList';
import ApproverListConfirmation from './ApproverListConfirmation';
import ApproverListTable from './ApproverListTable';
import { useHistory } from "react-router-dom";
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';

/**
 * ApproverListIndex
 * 
 * @author  c_dinh
 * @create_date  28/07/2021 (D/M/Y)
 */

function LegacyWelcomeClass({ t }) {
    /** Pagination */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [perPage, setPerPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPageEmployee, setCurrentPageEmployee] = useState(1);
    const [totalPageEmployee, setTotalPageEmployee] = useState(0);
    const [perPageEmployee, setPerPageEmployee] = useState(0);
    const [error, setError] = useState([]);   // For Error Message
    const [success, setSuccess] = useState("");   // For Success Message
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [deptState, setDeptState] = useState(); // for show department name
    const [positionAPI, setPositionAPI] = useState([]); // for position API
    const [positionState, setPositionState] = useState(); // for show position
    const [positionRankAPI, setPositionRankAPI] = useState([]); // for position Rank API
    const [positionRankState, setPositionRankState] = useState(); // for show position Rank
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [mainTableApplicantApprover, setMainTableApplicantApprover] = useState([]);   // For Main Table Applicant Approver
    const [mainTableEmployee, setMainTableEmployee] = useState([]);   // For Main Table Employee
    const [rowCount, setRowCount] = useState(); // For row count Approver
    const [rowCountEmployee, setRowCountEmployee] = useState(); // For row count Employee
    const [addModalBox, setAddModalBox] = useState(false);// Add confirm box show or hide
    const history = useHistory();   // For edit link
    const [idDelete, setIdDelete] = useState(0); //for id delete
    const [editID, setEditID] = useState('');   // For Edit ID
    const [idRow, setIdRow] = useState();
    const [idApprover, setIdApprover] = useState();
    const [errorModal, setErrorModal] = useState([]);
    const [successModal, setSuccessModal] = useState("");   // For Success Message
    const [flagPedingDel, setFlagPedingDel] = useState(0);
    const [flagCount, setFlagCount] = useState(false);
    const [showModalBox, setShowModalBox] = useState(false);// For show/hide confirmation box
    //param form init
    const [applicantName, setApplicantName] = useState("");
    const [approverName, setApproverName] = useState("");
    const [applicantPosition, setApplicantPosition] = useState();
    const [approverPosition, setApproverPosition] = useState();
    const [applicantDepartment, setApplicantDepartment] = useState();
    const [approverDepartment, setApproverDepartment] = useState();
    const [autocompleteApplicantName, setAutocompleteApplicantName] = useState([]);
    const [autocompleteApproverName, setAutocompleteApproverName] = useState([]);
    const [clearData, setClearData] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

    /** Form Load */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadApproverSetting();
        loadDept();
        loadPostionRank();
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
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.view_permission);
            if (parseInt(response.data.view_permission) === 0 || parseInt(response.data.view_permission) === 2) {
                window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
            }
        }
    };

    /**
    * GET APPROVER SETTING
    *
    * @author  c_dinh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const loadApproverSetting = async () => {
        let params = {
            company_id: ApiPath.companyID
        }
        let obj = { package_name: 'hr', url: ApiPath.ApproverGetApproverSetting, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            if (response.data.check_approver_setting == false) {
                window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
            }
        }
    };

    const addOnClose = () => {
        setAddModalBox(!addModalBox);
        setDeptState();
        setEmployeeID("")
        setEmployeeName("")
        setApplicantName("");
        setApproverName("");
        setPositionRankState();
        setPositionState();
        setErrorModal([]);
        setSuccessModal("");
        setAddIdList([]);
        setMainTableEmployee([]);
        setAllCheck(false);
        document.body.style.overflow = 'visible';
    };

    /**
    * change autocomplete
    *
    * @author  c_dinh
    * @create  28/07/2021 (D/M/Y)
    * @param
    * @return
    */
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

    /**
    * select autocomplete
    *
    * @author  c_dinh
    * @create  28/07/2021 (D/M/Y)
    * @param
    * @return
    */
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

    /**
    * Change Applicant Name
    *
    * @author  v_hao
    * @create  06/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeApplicantName = async (i) => {
        setError([]); setSuccess([]); setClearData('');
        setApplicantName(i.target.value);

        // if empty, remove data from autocomplete
        if (i.target.value === '') {
            setClearData('clear');
        } else {
            let obj = {
                package_name: 'erp',
                url: `api/${ApiPath.customerName}/employee/name-autocomplete-search`,
                method: 'post',
                params: { search_item: i.target.value, company_id: ApiPath.companyID }
            }
            let response = await ApiRequest(obj);
            if (response.flag === false) {
                setError(response.message); setClearData('clear');
            } else {
                setAutocompleteApplicantName(response.data.data);
            }
        }
    }

    /**
    * Select Applicant Name
    *
    * @author  v_hao
    * @create  06/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectApplicantName = async (val, obj) => {
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
            setApplicantName(response.data.data[0].name);
        }
    }

    /**
    * Change Approver Name
    *
    * @author  v_hao
    * @create  06/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeApproverName = async (i) => {
        setError([]); setSuccess([]); setClearData('');
        setApproverName(i.target.value)

        // if empty, remove data from autocomplete
        if (i.target.value === '') {
            setClearData('clear');
        } else {
            let obj = {
                package_name: 'erp',
                url: `api/${ApiPath.customerName}/employee/name-autocomplete-search`,
                method: 'post',
                params: { search_item: i.target.value, company_id: ApiPath.companyID }
            }
            let response = await ApiRequest(obj);
            if (response.flag === false) {
                setError(response.message); setClearData('clear');
            } else {
                setAutocompleteApproverName(response.data.data);
            }
        }
    }

    /**
    * Select Approver Name
    *
    * @author  v_hao
    * @create  06/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectApproverName = async (val, obj) => {
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
            setApproverName(response.data.data[0].name);
        }
    }

    /**
    * Load Department
    *
    * @author  c_dinh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadDept = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    };

    let deptChange = (e) => {
        setDeptState(e.target.value);
    }
    let applicantDepartmentChange = (e) => {
        setApplicantDepartment(e.target.value);
    }
    let approverDepartmentChange = (e) => {
        setApproverDepartment(e.target.value);
    }

    let positionChange = (e) => {
        setPositionState(e.target.value);
    }
    let applicantPositionChange = (e) => {
        setApplicantPosition(e.target.value);
    }
    let approverPositionChange = (e) => {
        setApproverPosition(e.target.value);
    }

    /**
    * Load Position
    *
    * @author  v_hao
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadPostionRank = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllPosition, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setPositionAPI([]);
            setPositionRankAPI([]);
        } else {
            setPositionAPI(response.data.data);
            let rankArr = []
            let rankAPIData = []
            if (response.data.data.length > 0) {
                response.data.data.map(item => rankArr.push(item.position_rank))
            }
            let unique = rankArr.filter((item, i, ar) => ar.indexOf(item) === i);
            unique.map((i, index) => {
                let rankData = {
                    id: index,
                    position_rank: i
                }
                rankAPIData.push(rankData);
            })
            setPositionRankAPI(rankAPIData);
        }
    };

    let positionRankChange = (e) => {
        setPositionRankState(e.target.value);
    }

    /**
    * Function Search Employee
    *
    * @author  v_hao
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [requestStateEmployee, setRequestStateEmployee] = useState();
    const fnSearchEmployeeAPI = useCallback => {
        setErrorModal("");
        setSuccessModal("");
        const request = {
            position_id: positionState,
            position_rank_id: positionRankState,
            employee_id: employeeID,
            employee_name: employeeName,
            department_id: deptState,
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
            per_page: 20,
        }
        setRequestStateEmployee(request);
        searchAPIEmployeeAPI(request);
    }

    const searchAPIEmployeeAPI = async (request, pageNumber = 1, msg = true) => {
        request = { ...request, page: pageNumber }
        let params = {
            ...request,
            page: pageNumber
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeListSearch, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setRowCountEmployee('');
            msg && setErrorModal(response.message);
            msg && setSuccessModal("");
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setMainTableEmployee([]);
        } else {
            setCurrentPageEmployee(response.data.approver_list.current_page);
            setTotalPageEmployee(response.data.approver_list.last_page);
            setPerPageEmployee(response.data.approver_list.per_page)
            setRowCountEmployee(response.data.approver_list.total);
            setMainTableEmployee(response.data.approver_list.data);
            setAddIdList([]);
            setErrorModal("");
            setAllCheck(false);
        }
    }

    /**
    * Function Search 
    *
    * @author  v_hao
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [requestStateAprover, setRequestStateAprover] = useState();
    const fnSearch = useCallback => {
        setError([]);
        setSuccess("");
        const request = {
            applicant_name: applicantName,
            approver_name: approverName,
            applicant_position_id: applicantPosition,
            approver_position_id: approverPosition,
            applicant_department_id: applicantDepartment,
            approver_department_id: approverDepartment,
            language: ApiPath.lang,
            company_id: ApiPath.companyID,
            per_page: 20,
        }
        setRequestStateAprover(request);
        searchAPI(request);
    }

    const searchAPI = async (request, pageNumber = 1, msg = true) => {
        request = { ...request, page: pageNumber }
        let params = {
            ...request,
            page: pageNumber
        }
        let obj = { package_name: 'hr', url: ApiPath.approverListSearch, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setRowCount('');
            msg && setError(response.message);
            msg && setSuccess("");
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setMainTableApplicantApprover([]);
        } else {
            let res = response.data.approver_list;
            setCurrentPage(res.current_page);
            setTotalPage(res.last_page);
            setPerPage(res.per_page);
            setRowCount(res.total);
            await setMainTableApplicantApprover(res.data);
        }
    }

    /* CHECKBOX ACTION */
    const [addIdList, setAddIdList] = useState([]);  // For add data list
    const [AllCheck, setAllCheck] = useState(false); // For select checkbox all or not
    const change_checkbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let id_list = [];

        if (value === "all-check") {
            data = mainTableEmployee.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = mainTableEmployee.map(item =>
                parseInt(item.employee_id) === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked) {
                id_list.push(data[i].employee_id);
            }
        }

        setAddIdList(id_list);
        setAllCheck(data.every(item => item.is_checked));
        setMainTableEmployee(data);
    }

    /* POPUP EMPLOYEE MODAL BOX */
    const addToggleAlert = async () => {
        document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
        let params = {
            "applicant_id": idDelete,
            "approver_id": addIdList, //array 
            "created_emp": ApiPath.loginEmp,
            "updated_emp": ApiPath.loginEmp,
            "employee_id": ApiPath.loginEmp,
            "language": ApiPath.lang
        }

        if (!isEmpty(addIdList)) {
            let flg = false;
            let errMsgAll = [];
            for (let i = 0; i < addIdList.length; i++) {
                for (let j = 0; j < idApprover.length; j++) {
                    if (addIdList[i] == idApprover[j]) {
                        flg = true;
                        const errorMsg = t('JSE140').replace('%s', addIdList[i]);
                        errMsgAll.push(errorMsg);
                    }
                }
            }
            if (errMsgAll.length > 0) {
                setErrorModal([...errMsgAll]);
                setSuccessModal("");
            }
            document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
            let obj = { package_name: 'hr', url: ApiPath.approverListSave, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                if (flg == false) {
                    setErrorModal(response.message);
                }
                setSuccessModal("");
                document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
            }
            else {
                setErrorModal([]);
                let temp_approver_id = [];
                temp_approver_id.push(idApprover)
                for (let i = 0; i < addIdList.length; i++) {
                    temp_approver_id.push(addIdList[i]);
                }
                setIdApprover(temp_approver_id);
                setTimeout(function () {
                    setSuccessModal(response.data.message)
                    setFlagCount(false);
                    searchAPI(requestStateAprover, AllCheck ? currentPage - 1 : currentPage, false); //call search Approver ERP
                }, 2500);
                setDeptState('');
                setEmployeeID("")
                setEmployeeName("")
                setApplicantName("");
                setApproverName("");
                setPositionRankState('');
                setPositionState('');
                //setAddIdList([]);
                //setMainTableEmployee([]);
                setAllCheck(false);
                document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
            }
        } else {
            setSuccess('');
            setSuccessModal('');
            setFlagCount(true);
            let errorMsg = t("JSE056");
            setErrorModal([errorMsg]);
            document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    async function pageChangeEmployee(i) {
        await searchAPIEmployeeAPI(requestStateEmployee, i);
        setCurrentPageEmployee(i);
        setAddIdList([]);
    }

    /** Page Change Navigation */
    async function pageChange(i) {
        await searchAPI(requestStateAprover, i);
        setCurrentPage(i);
        setIdDelete(0);
    }

    /* DELETE OVERTIME MODAL BOX */
    const showModelDelete = async (e) => {
        setIdRow(e.approver.id);
        setIdDelete(e['applicant_id']);
        setIdApprover(e.approver.approver_id);

        let teampApproverId = e.approver.approver_id;
        let teampApplicantId = e['applicant_id'];
        let params = {
            "applicant_id": teampApplicantId,
            "approver_id": teampApproverId,
            "language": ApiPath.lang,
            "company_id": ApiPath.companyID
        }
        let obj = { package_name: 'hr', url: ApiPath.approverListCheckPendingDelete, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setFlagPedingDel(response.data.pending_flag_del);
            if (response.data.pending_flag_del == 1) { //check pending approver
                setContent(<span>{t('Are you sure want to delete?')}<br />{t('If you delete this data, the requested data in pending state will be also deleted. So applicant should request again.')}</span>);
                setType('delete');
                setShowModalBox(!showModalBox);
                document.body.style.overflow = 'visible';
            } else if (response.data.approver_flag_left == true) { //check only one approver left for this applicant
                setAddModalBox(!addModalBox);
                document.body.style.overflow = 'hidden';
            } else { //delete approver, checker from approvers table
                setContent(t('Are you sure want to delete?')); setType('delete');
                setShowModalBox(!showModalBox);
                document.body.style.overflow = 'visible';
            }
            setError([]);
            setSuccess("");
        }
    };

    const deleteOK = async () => {
        setShowModalBox(!showModalBox);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        let url = `${ApiPath.approverListDelete}${idRow}?applicant_id=${idDelete}&approver_id=${idApprover}&employee_id=${ApiPath.loginEmp}`;
        let obj = { package_name: 'hr', url: url, method: 'delete' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            searchAPI(requestStateAprover, mainTableApplicantApprover.length % 20 == 1 ? currentPage - 1 : currentPage, false);
        }
        else {
            setError([]);
            setTimeout(function () {
                let successMsg = t("JSE003");
                setSuccess([successMsg]);
                searchAPI(requestStateAprover, mainTableApplicantApprover.length % 20 == 1 ? currentPage - 1 : currentPage, false);
            }, 2500);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    /* EDIT OVERTIME MODAL BOX */
    const showModelEdit = (e) => {
        setEditID(e['applicant_id']);
        setContent(t('Are you sure want to edit?')); setType('edit');
        setShowModalBox(!showModalBox);
    }

    const editApprover = async () => {
        let params = {
            applicant_id: editID,
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.approverListCheckPendingEdit, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setErrorModal(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            let flag = -1;
            let requestType;
            flag = response.data.data.pending_flag;
            requestType = response.data.data.pending_request_types;
            editRow(editID, flag, requestType);
            setSuccess("");
        }
    }

    const editOK = () => {
        setShowModalBox(!showModalBox);
        editApprover();
    }

    /* EDIT LINK TO NEXT PAGE */
    const editRow = (id, flag, requestType) => {
        if (flag == 1) {
            const errMsg = t("JSE142").replace('%s', requestType);
            setError([errMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            localStorage.setItem('RETURN_APPROVER_DATA', JSON.stringify(id));
            history.push("./approver-register");
        }
    }

    const removeMessage = () => {
        setError("");
        setSuccess("");
        setErrorModal("");
        setSuccessModal("");
    }

    return (
        <CRow className="approver-list modal-header-custom">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={showModalBox}
                    cancel={() => setShowModalBox(!showModalBox)}
                    deleteOK={deleteOK}
                    editOK={editOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="cardTitle">{t('Approver List')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchApproverList
                            viewPermissionAPI={viewPermissionAPI}
                            applicantName={applicantName} autocompleteApplicantName={autocompleteApplicantName} changeApplicantName={changeApplicantName} selectApplicantName={selectApplicantName}
                            approverName={approverName} autocompleteApproverName={autocompleteApproverName} changeApproverName={changeApproverName} selectApproverName={selectApproverName}
                            applicantDepartmentChange={applicantDepartmentChange} applicantDepartment={applicantDepartment}
                            approverDepartmentChange={approverDepartmentChange} approverDepartment={approverDepartment}
                            departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
                            positionAPI={positionAPI} positionChange={positionChange} positionState={positionState}
                            applicantPositionChange={applicantPositionChange} applicantPosition={applicantPosition}
                            approverPositionChange={approverPositionChange} approverPosition={approverPosition}
                            searchAPI={() => fnSearch()}
                        />
                        <ApproverListTable
                            mainTableApplicantApprover={mainTableApplicantApprover} rowCount={rowCount}
                            showModelEdit={showModelEdit} showModelDelete={showModelDelete}
                            currentPage={currentPage} totalPage={totalPage} perPage={perPage} pageChange={pageChange}
                        />
                        <ApproverListConfirmation
                            viewPermissionAPI={viewPermissionAPI}
                            flagCount={flagCount}
                            errorModal={errorModal} successModal={successModal}
                            removeMessage={removeMessage}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
                            positionAPI={positionAPI} positionChange={positionChange} positionState={positionState}
                            positionRankAPI={positionRankAPI} positionRankChange={positionRankChange} positionRankState={positionRankState}
                            addModalBox={addModalBox} addOnClose={addOnClose} mainTableEmployee={mainTableEmployee} addToggleAlert={addToggleAlert}
                            change_checkbox={change_checkbox} AllCheck={AllCheck}
                            searchEmployeeAPI={() => fnSearchEmployeeAPI()} rowCountEmployee={rowCountEmployee}
                            currentPageEmployee={currentPageEmployee} totalPageEmployee={totalPageEmployee} perPageEmployee={perPageEmployee} pageChangeEmployee={pageChangeEmployee}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ApproverListIndex() { return (<Welcome />) }
