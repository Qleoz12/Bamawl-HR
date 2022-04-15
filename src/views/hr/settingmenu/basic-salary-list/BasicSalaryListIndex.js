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
import { default as ApiPath } from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import BasicSalaryListTable from './BasicSalaryListTable';
import SearchBasicSalaryList from './SearchBasicSalaryList';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    const [deptState, setDeptState] = useState(''); // For department dropdown toggle
    const [roleState, setRoleState] = useState(''); // For role dropdown toggle
    //const [OvertimeState, setOvertimeState] = useState(); // For overtime name dropdown toggle

    const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date

    const [rowCount, setRowCount] = useState();           // For row count
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
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [clearData, setClearData] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState('');   // For View_Permission API

    // Loaded initially
    useEffect(() => {
        setLoading(true);
        loadRole();
        loadDept();
        loadViewPermission();
    }, [loadRole, loadDept, loadViewPermission]);

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

    /* GET ROLE SELECT BOX */
    const [roleAPI, setRoleAPI] = useState([]);
    const loadRole = async () => {
        let params = {
            company_id: ApiPath.companyID
        }
        let obj = { package_name: 'hr', url: ApiPath.adminLevels, method: 'get', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setRoleAPI(response.data.data);
        }
    }

    let roleChange = (e) => {
        setRoleState(e.target.value);
    }
    /* GET DEPARTMENT SELECT BOX */
    const [departmentAPI, setDepartmentAPI] = useState([]);
    const loadDept = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setDepartmentAPI(response.data.data);
        }
    };

    let deptChange = (e) => {
        setDeptState(e.target.value);
    }

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
            if (parseInt(response.data.view_permission) === 0) {
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id);
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code);
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng);
            }
        }
    };

    /**Search API */
    const [requestState, setRequestState] = useState();
    const fnSearch = useCallback(() => {
        let fromDate = null;
        let toDate = null;
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
        if (fromDate != null && toDate == null) {
            let errMsg = t('JSE001').replace('%s', t('To Date'));
            setError([errMsg]);
        } else if (toDate != null && fromDate == null) {
            let errMsg = t('JSE001').replace('%s', t('From Date'));
            setError([errMsg]);
        } else if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
            setError([errMsg]);
        } else {
            const request = {
                department_id: deptState,
                role_id: roleState,
                from_date: fromDate,
                to_date: toDate,
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
                language: ApiPath.lang,
                company_id: ApiPath.companyID,
                per_page: null,
            }
            setRequestState(request);
            searchAPI(request);
        }
    });

    const searchAPI = async (request, page = 1, smg = true) => {
        page = parseInt(page) ? page : 1;
        setActivePage(page);
        setDeleteIdList('');

        request = { ...request, page: page }
        setLoading(true);
        let params = request;
        let obj = { package_name: 'hr', url: ApiPath.employeeBasicSalaryListSearch, method: 'post', params }
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
        }
    }


    /* CHECKBOX ACTION */
    const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
    const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
    const change_checkbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let id_list = [];

        if (value === "all-check") {
            data = mainTable.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = mainTable.map(item =>
                item.basic_salary_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true) {
                id_list.push(data[i].basic_salary_id);
            }
        }
        var x = id_list.toString();
        setDeleteIdList(x);

        setAllCheck(data.every(item => item.is_checked));
        setMainTable(data);
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
            let errorMsg = t('JSE004');
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    const deleteOK = async () => {
        //var array = [...mainTable];
        setDeleteModalBox(!deleteModalBox);

        if (!isEmpty(deleteIdList)) {
            setLoading(true);
            let url = `${ApiPath.employeeBasicSalaryListDelete}${deleteIdList}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
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
                setDeleteIdList('');
                searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            }
        }
    }

    /* EDIT OVERTIME MODAL BOX */
    const [editModalBox, setEditModalBox] = useState(false); // Edit confirm box show or hide
    const [editID, setEditID] = useState('');
    const editToggleAlert = (e) => {
        setEditID(e['basic_salary_id']);
        setContent(t('Are you sure want to edit?')); setType('edit');
        setEditModalBox(!editModalBox);
    }
    const editOnClose = () => {
        setEditID('');
        setEditModalBox(!editModalBox);
    }
    const editOK = () => {
        //var array = [...mainTable];
        setEditModalBox(!editModalBox);
        editRow(editID);
    }
    /*Set page */
    async function pagination(i) {
        await searchAPI(requestState, i);
        setActivePage(i)
    }
    /* EDIT LINK TO NEXT PAGE */
    const editRow = (id) => {
        sessionStorage.setItem('BASICSALARY_LIST_ID_DATA', JSON.stringify(id));
        history.push("./basic-salary-register");
    }

    const cancelClick = () => {
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
                        <h5><CLabel>{t('Basic Salary List')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchBasicSalaryList
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}

                            departmentAPI={departmentAPI}
                            viewPermissionAPI={viewPermissionAPI}
                            deptState={deptState}
                            deptChange={deptChange}
                            roleAPI={roleAPI}
                            roleState={roleState}
                            roleChange={roleChange}
                            theChosenJoinStartDate={theChosenJoinStartDate}
                            theChosenJoinEndDate={theChosenJoinEndDate}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
                            selectedToDate={selectedToDate}
                            handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
                            removeFromDate={removeFromDate}
                            removeToDate={removeToDate}
                            searchAPI={() => fnSearch()} />
                        <BasicSalaryListTable
                            pagination={pagination}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            perPage={perPage}
                            mainTable={mainTable}
                            rowCount={rowCount}
                            AllCheck={AllCheck}
                            change_checkbox={change_checkbox}
                            editToggleAlert={editToggleAlert}
                            deleteToggleAlert={deleteToggleAlert} />
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={editModalBox || deleteModalBox}
                            cancel={cancelClick}

                            deleteModalBox={deleteModalBox}
                            deleteToggleAlert={deleteToggleAlert}
                            deleteOK={deleteOK}
                            editModalBox={editModalBox}
                            editOK={editOK}
                            editOnClose={editOnClose} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BasicSalaryListIndex() {
    return (
        <Welcome />
    )
}