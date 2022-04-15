/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
    CCard, CCardBody, CCardHeader, CCol, CRow
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Moment from 'moment';
import SearchEmployeeLateAbsentLeaveList from './SearchEmployeeLateAbsentLeaveList';
import EmployeeLateAbsentLeaveListTable from './EmployeeLateAbsentLeaveListTable';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';
import ViewPermision from "../../../brycen-common/constant/ViewPermission";
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

// use hoc for functional based components
/**
 * Page EmployeeLateAbsentLeaveList
 * 
 * @author  dh_khanh
 * @create_date  
 */
function LegacyWelcomeClass({ t, i18n }) {

    const [error, setError]                                 = useState([]);
    const [success, setSuccess]                             = useState([]);
    const [loading, setLoading]                             = useState(false);
    const [departmentAPI, setDepartmentAPI]                 = useState([]);     // For Dept API
    const [listTitle, setListTitle]                         = useState([]);     // for Sub Allowance API
    const [deptState, setDeptState]                         = useState("");     // for show department name
    const [selectedFromDate, setSelectedFromDate]           = useState(null);   //for Joined Start Date
    const [selectedToDate, setSelectedToDate]               = useState(null);   //for Joined End Date
    const [mainTable, setMainTable]                         = useState([]);     // for main table
    const [rowCount, setRowCount]                           = useState("");     // for row count
    const [clearData, setClearData]                         = useState('');
    const [idArr, setIdArr]                                 = useState([]);
    const [nameArr, setNameArr]                             = useState([]);
    const [codeArr, setCodeArr]                             = useState([]);
    const [employeeName, setEmployeeName]                   = useState('');
    const [employeeCode, setEmployeeCode]                   = useState('');
    const [employeeID, setEmployeeID]                       = useState('');
    const [viewPermissionAPI, setViewPermissionAPI]         = useState(ViewPermision.ALL);     // For View_Permission API
    const [listFromToDate, setListFromToDate]               = useState([]);
    const [formSearchState, setFormSearchState]             = useState(null);

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

    /**
    * If clearData is changed, remove array in autocomplete
    *
    * @author  dh_khanh
    * @create  27/04/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        loadDept();
        loadViewPermission();
    }, []);

    const loadViewPermission = async () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(Number(response.data.view_permission));
            if (parseInt(response.data.view_permission) === ViewPermision.ONLY_ME) {
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id);
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code);
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng);
            }
        }
    };
    /** End Form Load */

    /**
    * change autocomplete
    *
    * @author  dh_khanh
    * @create  05/07/2021 (D/M/Y)
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
    * @author  dh_khanh
    * @create  05/07/2021 (D/M/Y)
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

    /* GET DEPARTMENT SELECT BOX */
    const loadDept = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        }
        let obj = { package_name: 'erp', url: ApiPath.getAllDepartment, method: 'get', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    }
    
    let deptChange = (e) => {
        setDeptState(e.target.value);
    }

    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };
    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };

    const clearAllBeforeSearch = () => {
        setError([]);
        setSuccess("");
    }

    /** Search Function */
    let searchAPI = (type = 'search') => {
        clearAllBeforeSearch();
        let fromDate = null;
        let toDate = null;        
        if (selectedFromDate != null) {
            fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
        }
        if (selectedToDate != null) {
            toDate = Moment(selectedToDate).format('YYYY-MM-DD');
        }
        if (fromDate == null && toDate == null) {
            let errMsg1 = t("JSE001").replace("%s", t("From Date"));
            let errMsg2 = t('JSE001').replace('%s', t('To Date'));
            setError([errMsg1, errMsg2]);
            setSuccess('');
        } else if (fromDate != null && toDate == null) {
            let errMsg = t('JSE001').replace('%s', t('To Date'));
            setError([errMsg]);
            setSuccess('');
        } else if (toDate != null && fromDate == null) {
            let errMsg = t('JSE001').replace('%s', t('From Date'));
            setError([errMsg]);
            setSuccess('');
        } else if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
            setError([errMsg]);
            setSuccess('');
        } else {
            setError([]);
            setSuccess([]);
            type === 'export' ? exportCSV() : searchEmployeeLateAbsentLeaveList(fromDate, toDate);
        }
    }

    const searchEmployeeLateAbsentLeaveList = async (fromDate, toDate) => {
        setLoading(true);
        const params = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "employee_name": employeeName,
            "employee_code": employeeCode,
            "department_id": deptState,
            "from_date": fromDate,
            "to_date": toDate,
            "language": ApiPath.lang
        };
        setFormSearchState(params);
        let obj = { package_name: 'hr', url: ApiPath.EmployeeLateAbsentLeaveListSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setMainTable([]);
            setSuccess([]);
        } else {
            const data = response.data.data;
            setRowCount(data.employee_late_absent_leave_list.length);
            setListTitle(data.title_late_absent_leave_list);
            setMainTable(data.employee_late_absent_leave_list);
            let listFromTo = [];
            data.employee_late_absent_leave_list?.length > 0 && data.employee_late_absent_leave_list[0].range_list.forEach(element => {
                listFromTo.push({ date_start: element.date_start, date_end: element.date_end });
            });
            setListFromToDate(listFromTo);
            setError([]);
            setSuccess([]);
        };        
    }

    const exportCSV = async () => {
        setLoading(true);
        let obj = {
            package_name: 'hr',
            url: ApiPath.EmployeeLateAbsentLeaveListExport,
            method: 'post',
            params: formSearchState,
            type: "blob",
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            response.message && setError(response.message);
        } else {
            const isReturnFile = response.headers["content-disposition"];
            if (isReturnFile) {
                let fileName = response.headers["content-disposition"].split("filename=")[1];              // Remove special character from response file name
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
            };
        };
    }

    return (
        <CRow className="employee-late-absent-leave-list">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5 id="pageTitle"><label>{t('Employee Late, Absent, Leave List')}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchEmployeeLateAbsentLeaveList
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            departmentAPI={departmentAPI}
                            deptState={deptState}
                            deptChange={deptChange}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={handleFromDateChange}
                            selectedToDate={selectedToDate}
                            handleToDateChange={handleToDateChange}
                            searchAPI={searchAPI}
                            viewPermissionAPI={viewPermissionAPI}
                            ViewPermision={ViewPermision}
                        ></SearchEmployeeLateAbsentLeaveList>
                        <EmployeeLateAbsentLeaveListTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            listTitle={listTitle}
                            listFromToDate={listFromToDate}
                            searchAPI={searchAPI}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeLateAbsentLeaveList() {
    return (
        <Welcome />
    )
}
