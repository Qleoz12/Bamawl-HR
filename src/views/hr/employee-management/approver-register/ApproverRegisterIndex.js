/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback } from 'react';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import apiPath from './../../../brycen-common/api-path/ApiPath';
import ApproverRegisterApplicantList from './ApproverRegisterApplicantList';
import ApproverRegisterApproverList from './ApproverRegisterApproverList';
import ApproverRegisterApplicantAndApproverList from './ApproverRegisterApplicantAndApproverList';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { useHistory } from "react-router-dom";

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const defaultPerPage = ApiPath.defaultPerPage;//default page
    const [error, setError] = useState([]);
    const [errorModal, setErrorModal] = useState([]);
    const [success, setSuccess] = useState("");
    const [successModal, setSuccessModal] = useState("");
    const [loading, setLoading] = useState(false);
    const [deptApplicantState, setDeptApplicantState] = useState(); // for show department name
    const [deptEmpState, setDeptEmpState] = useState(); // for show department name
    const [applicantRankState, setApplicantRankState] = useState(); // for show Rank name
    const [searchByState, setSearchByState] = useState("Approver"); // for show Search(Approver/Acknowledged)
    const [applicantRankAPI, setApplicantRankAPI] = useState([]); // For Applicant Rank API
    const [positionRankAPI, setPositionRankAPI] = useState([]); // For Position Rank API
    const [positionAPI, setPositionAPI] = useState([]); // For Position API
    const [positionState, setPositonState] = useState(); // for select position
    const [positionRankState, setPositionRankState] = useState(); // for select position rank
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [emailFlag, setEmailFlag] = useState(1);   // For Email Flag
    const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
    const [formSearchState, setFormSearchState] = useState(null); // keep form search when click button search
    const [editData, setEditData] = useState([]); // for Edit data
    const [applicantTable, setApplicantTable] = useState([]); // For Applicant Table
    const [approverTable, setApproverTable] = useState([]);  // For Approver Table
    const [empListTable, setEmpListTable] = useState([]); // For Employee List table
    const [tempApprover, setTempApprover] = useState([]); // 
    const [applicantAndApproverListTable, setApplicantAndApproverListTable] = useState([]); // For main table
    const [currentPage, setCurrentPage] = useState(1); // For curent page
    const [totalPage, setTotalPage] = useState(0);  // For total page
    const [perPage, setPerPage] = useState(0);    // total row per page
    const [rowEmpCount, setRowEmpCount] = useState();     // For row count
    const [clearData, setClearData] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API
    const history = useHistory(); // For edit link
    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadApproverSetting();
        window.scrollTo({ top: 0, left: 0 });
        loadDept();
        loadPositionRank();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_APPROVER_DATA')); // return data from Approver List Form
        localStorage.removeItem('RETURN_APPROVER_DATA');
        if (edit_Data != null) {
            $('#searchBtn').hide();
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
    }, []);

    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

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

    let deptApplicantChange = (e) => {
        setDeptApplicantState(e.target.value);
    }
    let deptEmpChange = (e) => {
        setDeptEmpState(e.target.value);
    }
    let applicantRankChange = (e) => {
        setApplicantRankState(e.target.value);
    }
    let searchByChange = (e) => {
        setSearchByState(e.target.value);
    }
    let positionChange = (e) => {
        setPositonState(e.target.value);
    }
    let positionRankChange = (e) => {
        setPositionRankState(e.target.value);
    }
    let chooseSend = (e) => {
        setEmailFlag(e.target.value)
    }
    /**
    * Load Position Rank
    *
    * @author  c_dinh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadPositionRank = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllPosition, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setPositionRankAPI([]);
        } else {
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
            setPositionAPI(response.data.data);
        }
    };

    const searchApplicantClick = () => {
        if (isEmpty(applicantRankState)) {
            let errMsg = t('JSE001').replace('%s', t('Applicant Rank'));
            setError([errMsg]);
            setApplicantTable([]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            searchApplicantAPI();
            // setCurrentPage(1);
        }
    }
    const searchApplicantAPI = async () => {
        let applicantData = {
            "company_id": apiPath.companyID,
            "applicant_rank": applicantRankState,
            "department_id": Number(deptApplicantState),
            "language": apiPath.lang,
        }
        setLoading(true);
        let params = {
            ...applicantData
        }
        let obj = { package_name: 'hr', url: ApiPath.ApplicantListSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setApplicantCheckedList([]);
            setAllApplicantCheck(false);
            setApplicantTable([]);
            setSuccess("");
        }
        else {
            setApplicantTable(response.data.applicant_list);
            setApplicantCheckedList([]);
            setAllApplicantCheck(false);
            setError([]);
            setSuccess("");
        }
    }

    /** Start Search Approver Function */
    const [searchEmpModalBox, setSearchEmpModalBox] = useState(false); // Delete confirm box show or hide

    const openSearchEmp = () => {
        setSearchEmpModalBox(!searchEmpModalBox);
        document.body.style.overflow = 'hidden';
    }

    const closeSearchEmp = () => {
        document.body.style.overflow = 'visible';
        setSearchEmpModalBox(!searchEmpModalBox);
        setDeptEmpState();
        if (viewPermissionAPI === true) {
            setEmployeeID("");
            setEmployeeName("");
        }
        setPositonState();
        setPositionRankState();
        setErrorModal([]);
        setSuccessModal("");
        setEmpCheckedList([]);
        setEmpListTable([]);
        setAllEmpCheck(false);
    }
    /** End Search Approver Function */
    const searchEmpListClick = () => {
        const requestFormSearch = {
            company_id: ApiPath.companyID,
            employee_id: employeeID,
            employee_name: employeeName,
            department_id: deptEmpState,
            position_id: positionState,
            position_rank: positionRankState,
            language: ApiPath.lang
        }
        setFormSearchState(requestFormSearch);
        searchEmpListAPI(1, defaultPerPage, requestFormSearch);
        setCurrentPage(1);
    }

    // /** Start Search Emp Function */
    const searchEmpListAPI = async (page = 1, pageSize = 20, formSearch = null, searchFlag = true) => {
        setLoading(true);
        let params = {
            ...formSearch,
            page,
            per_page: pageSize,
        }
        let obj = { package_name: 'hr', url: ApiPath.ApproverListSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setErrorModal(response.message);
            setEmpListTable([]);
            setEmpCheckedList([]);
            setAllEmpCheck(false);
            setSuccessModal('');
        }
        else {
            setEmpListTable(response.data.approver_list.data);
            setRowEmpCount(response.data.approver_list.total);
            setTotalPage(response.data.approver_list.last_page)
            setAllEmpCheck(false);
            setEmpCheckedList([]);
            setErrorModal([]);
            setSuccessModal('');
        }
    }
    /** End Search Emp Function */

    const pageChange = (newPage) => {
        setCurrentPage(newPage);
        setAllEmpCheck(false);
        setErrorModal('');
        setSuccessModal('');
        searchEmpListAPI(newPage, defaultPerPage, formSearchState, true);
    }

    /** Start Click remove function */
    const [AllApplicantCheck, setAllApplicantCheck] = useState(false);      // For select applicant checkbox all or not
    const [applicantCheckedList, setApplicantCheckedList] = useState([]); // For display in Applicant and Approver table
    const change_applicant_checkbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let applicant_id_list = [];
        let applicant_list = [];
        if (value === "all-check") {
            data = applicantTable.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = applicantTable.map(item =>
                parseInt(item.employee_id) === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true) {
                applicant_id_list.push(data[i].employee_id);
                applicant_list.push(data[i]);
            }
        }
        setApplicantCheckedList(applicant_list);
        setAllApplicantCheck(data.every(item => item.is_checked));
        setApplicantTable(data);
    }

    const [AllEmpCheck, setAllEmpCheck] = useState(false);      // For select employee checkbox all or not
    const [empCheckedList, setEmpCheckedList] = useState([]); // For display in Approver list table
    const change_emp_checkbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let approver_list = [];
        if (value === "all-check") {
            data = empListTable.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = empListTable.map(item =>
                parseInt(item.employee_id) === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true) {
                approver_list.push(data[i]);
            }
        }
        setEmpCheckedList(approver_list);
        setAllEmpCheck(data.every(item => item.is_checked));
        setEmpListTable(data);
    }
    /** Add from Employee List to Approver List function */
    const addApprover = () => {
        console.log(empCheckedList);
        document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
        let errMsgAll = [];
        if (!isEmpty(empCheckedList)) {
            if (tempApprover.length > 0) {
                for (let i = 0; i < empCheckedList.length; i++) {
                    for (let j = 0; j < tempApprover.length; j++) {
                        if (empCheckedList[i].employee_id == tempApprover[j].employee_id) {
                            const errorMsg = t('JSE140').replace('%s', empCheckedList[i].employee_id);
                            errMsgAll.push(errorMsg);
                        }
                    }
                }
                if (errMsgAll.length > 0) {
                    setErrorModal([...errMsgAll]);
                    setSuccessModal("");
                }
                else {
                    for (let i = 0; i < empCheckedList.length; i++) {
                        let temp = {
                            "employee_id": empCheckedList[i].employee_id,
                            "employee_code": empCheckedList[i].employee_code,
                            "employee_name": empCheckedList[i].employee_name,
                            "email": empCheckedList[i].email,
                            "employee_has_dept_position": empCheckedList[i].employee_has_dept_position,
                            "status": searchByState
                        }
                        tempApprover.push(temp);
                        const successMsg = t('JSE143');
                        setSuccessModal(successMsg);
                        setErrorModal([]);
                    }
                    //closeSearchEmp();
                }
            }
            else {
                for (let i = 0; i < empCheckedList.length; i++) {
                    let temp = {
                        "employee_id": empCheckedList[i].employee_id,
                        "employee_code": empCheckedList[i].employee_code,
                        "employee_name": empCheckedList[i].employee_name,
                        "email": empCheckedList[i].email,
                        "employee_has_dept_position": empCheckedList[i].employee_has_dept_position,
                        "status": searchByState
                    }
                    tempApprover.push(temp);
                    const successMsg = t('JSE143');
                    setSuccessModal(successMsg);
                    setErrorModal([]);
                }
            }
        } else {
            const errorMsg = t('JSE126').replace('%s', t('Approver'));
            setErrorModal([errorMsg]);
            setSuccessModal("")
        }
        setApproverTable(tempApprover);
    }

    const removeRow = (e) => {
        let result_data = []; // to remove data by click icon
        result_data = approverTable.filter(main => main.employee_id != e['employee_id']);
        setApproverTable(result_data);
        setTempApprover(result_data);
    }
    /** End remove function */

    /** Add To Applicant and Approver List function */
    const add = () => {
        const temp_main_table = [];
        let temp_approver_arr = approverTable.slice();
        if (!isEmpty(applicantCheckedList)) {
            for (let i = 0; i < applicantCheckedList.length; i++) {
                let temp = {
                    "applicant": applicantCheckedList[i],
                    "approver": temp_approver_arr
                }
                temp_main_table.push(temp);
            }
            setApplicantAndApproverListTable(temp_main_table);
            // setError();
        } else {
            const errorMsg = t('JSE126').replace('%s', t('Applicant'));
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }

    /** Start Save/Update function */
    const closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    }

    let saveData = () => {
        let errMsgAll = [];
        if (isEmpty(applicantAndApproverListTable)) {
            const errMsg = t("JSE141");
            errMsgAll.push(errMsg);
        }
        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setShow(!show); setContent('Are you sure want to save?'); setType('save');
            setError([]);
            setSuccess('');
        }
    }
    const saveOK = async () => {
        setShow(!show);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        let approver_data = [];
        let applicant_data = [];
        applicantAndApproverListTable.forEach((main, index) => {
            applicant_data[index] = main.applicant.employee_id
            main.approver.forEach((i, item) => {
                approver_data[item] = {
                    "approver_id": i.employee_id,
                    "approver_checker": i.status == "Approver" ? 1 : 2
                }
            })
        })
        let params = {
            "applicant_id": applicant_data,
            "approvers": approver_data,
            "email_flag": emailFlag,
            "employee_id": ApiPath.loginEmp,
            "company_id": ApiPath.companyID,
            "language": ApiPath.lang,
            "created_emp": ApiPath.loginEmp,
            "updated_emp": ApiPath.loginEmp
        }
        if (editData == "") { //REGISTER MODE
            let obj = { package_name: 'hr', url: ApiPath.ApproverRegisterSave, method: 'post', params };
            setLoading(true);
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
                setEditData("");
                setDeptApplicantState("");
                setEmployeeID("");
                setEmployeeName("");
                setApplicantRankState("");
                setApplicantTable([]);
                setApproverTable([]);
                setTempApprover([]);
                setSearchByState("Approver");
                setApplicantAndApproverListTable([]);
                setEmpCheckedList([]);
                setEmpListTable([]);
                setAllEmpCheck(false);
                setApplicantCheckedList([]);
                setAllApplicantCheck(false);
                setEmailFlag(1);
                setSuccess('');
                setError([]);
                setSuccess([response.data.message]);
            }
        } else { // EDIT MODE
            let params = {
                "approver_id_first": approverIdFirst,
                "approvers": approver_data,
                "email_flag": emailFlag,
                "updated_emp": ApiPath.loginEmp,
                "employee_id": ApiPath.loginEmp,
                "company_id": ApiPath.companyID,
                "language": ApiPath.lang,
            }
            let obj = { package_name: 'hr', url: ApiPath.ApproverRegisterUpdate + editData, method: 'put', params };
            setLoading(true);
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess("");
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
                setEditData("");
                setDeptApplicantState("");
                setEmployeeID("");
                setEmployeeName("");
                setApplicantRankState("");
                setApplicantTable([]);
                setApproverTable([]);
                setTempApprover([]);
                setSearchByState("Approver");
                setApplicantAndApproverListTable([]);
                setEmpCheckedList([]);
                setEmpListTable([]);
                setAllEmpCheck(false);
                setApplicantCheckedList([]);
                setAllApplicantCheck(false);
                setEmailFlag(1);
                setSuccess('');
                setError([]);
                setSuccess([response.data.message]);
            }
        }
    }
    /** Start Edit Function */
    const [approverIdFirst, setApproverIdFirst] = useState([]);
    let editIndex = async (edit_id) => {
        setLoading(true);
        let obj = { package_name: 'hr', url: apiPath.ApproverRegisterUpdate + edit_id, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else {
            let data = response.data.data;
            let approver_id_first = [];
            data['approver'].forEach((main, index) => {
                approver_id_first[index] = main.employee_id;
            })
            let temp_main_table = [];
            let temp_approver_arr = data['approver'].slice();
            let temp = {
                "applicant": data['applicant'],
                "approver": temp_approver_arr
            }
            temp_main_table.push(temp);
            setApplicantRankState(data.applicant.employee_has_dept_position[0].positions.position_rank);
            setDeptApplicantState(data.applicant.employee_has_dept_position[0].departments.id);
            setApplicantCheckedList([data['applicant']]);
            setApproverIdFirst(approver_id_first);
            setAllApplicantCheck(true);
            setApplicantTable([data['applicant']]);
            setApproverTable(data['approver']);
            setTempApprover(data['approver']);
            setApplicantAndApproverListTable(temp_main_table);
            setSearchByState("Approver");
            setEmailFlag(1);
            setError([]);
            setSuccess("");
        }
    }
    /** Start Cancel All Data Function */
    let cancelData = () => {
        $('#searchBtn').show();
        setEditData("");
        setDeptApplicantState("");
        setEmployeeID("");
        setEmployeeName("");
        setApplicantRankState("");
        setApplicantTable([]);
        setApproverTable([]);
        setTempApprover([]);
        setSearchByState("Approver");
        setApplicantAndApproverListTable([]);
        setEmpCheckedList([]);
        setEmpListTable([]);
        setAllEmpCheck(false);
        setApplicantCheckedList([]);
        setAllApplicantCheck(false);
        setEmailFlag(1);
        setSuccess('');
        setError([]);
    }
    /** End Cancel All Data Function */

    return (
        <CRow className="approver modal-header-custom">
            <CCol xs="12">
                <Loading start={loading} />
                {/* ErrorMessage Start */}
                <Message success={success} error={error} />
                {/* ErrorMessage End */}
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} saveOK={saveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5>{t('Approver Register')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <ApproverRegisterApplicantList
                            searchApplicantClick={searchApplicantClick} applicantRankChange={applicantRankChange}
                            applicantRankState={applicantRankState} positionRankAPI={positionRankAPI}
                            deptApplicantState={deptApplicantState} deptApplicantChange={deptApplicantChange} departmentAPI={departmentAPI}
                            change_applicant_checkbox={change_applicant_checkbox} AllApplicantCheck={AllApplicantCheck}
                            applicantTable={applicantTable} editData={editData} />
                        <ApproverRegisterApproverList
                            viewPermissionAPI={viewPermissionAPI}
                            searchByChange={searchByChange} searchByState={searchByState}
                            searchEmpModalBox={searchEmpModalBox} closeSearchEmp={closeSearchEmp} openSearchEmp={openSearchEmp}
                            errorModal={errorModal} successModal={successModal}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            departmentAPI={departmentAPI} deptEmpState={deptEmpState} deptEmpChange={deptEmpChange}
                            positionAPI={positionAPI} positionChange={positionChange} positionState={positionState}
                            positionRankChange={positionRankChange} positionRankState={positionRankState} positionRankAPI={positionRankAPI}
                            currentPage={currentPage} totalPage={totalPage} perPage={perPage} pageChange={pageChange}
                            searchEmpListClick={searchEmpListClick} rowEmpCount={rowEmpCount}
                            empListTable={empListTable} editData={editData} approverTable={approverTable}
                            change_emp_checkbox={change_emp_checkbox} AllEmpCheck={AllEmpCheck}
                            addApprover={addApprover} add={add} removeRow={removeRow} />
                        <ApproverRegisterApplicantAndApproverList
                            applicantAndApproverListTable={applicantAndApproverListTable}
                            chooseSend={chooseSend} emailFlag={emailFlag}
                            saveData={saveData} cancelData={cancelData} searchByChange={searchByChange} searchByState={searchByState} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeOvertimeRegistrationIndex() {
    return (
        <Welcome />
    )
}
