/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, } from '@coreui/react';
import { checkNullOrBlank, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import { withTranslation } from 'react-i18next';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import OvertimeNotificationTable from './OvertimeNotificationTable';
import OvertimeNotificationSettingTimeBox from './OvertimeNotificationSettingTimeBox';
import SearchOvertimeNotification from './SearchOvertimeNotification';
import SaveOvertimeNotification from './SaveOvertimeNotification';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");

    const defaultTime = "000:00";
    const [deptState, setDeptState] = useState(""); // for show department name
    const [roleState, setRoleState] = useState(""); // for show role name
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [roleAPI, setRoleAPI] = useState([]);   // For Role API
    const [selectedFromDate, setSelectedFromDate] = useState(null); //for Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);//for Joined End Date
    const [mainTable, setMainTable] = useState([]); // for main table
    const [rowCount, setRowCount] = useState(""); // for row count
    const [editData, setEditData] = useState([]); // for Edit data
    const [monthlyTimeLimit, setMonthlyTimeLimit] = useState(defaultTime); //for Monthly Time Limit
    const [weeklyTimeLimit, setWeeklyTimeLimit] = useState(defaultTime); //for Weekly Time Limit
    const [overTimeLimit, setOverTimeLimit] = useState(defaultTime); //for Over Time Limit
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [clearData, setClearData] = useState('');
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API
    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadRole();
        loadDept();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_OVERTIME_NOTIFICATION_DATA')); // return data from OT Rate List Form
        localStorage.removeItem('RETURN_OVERTIME_NOTIFICATION_DATA');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
    }, []);
    /** End Form Load */

    /**
    * If clearData is changed, remove array in autocomplete
    *
    * @author  c_dinh
    * @create  02/08/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    /**
    * GET VIEW PERMISSION
    *
    * @author  c_dinh
    * @create  09/08/2021 (D/M/Y)
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
            if (parseInt(response.data.view_permission) === 0) {
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
            }
        }
    };

    /**
    * change autocomplete
    *
    * @author  c_dinh
    * @create  02/08/2021 (D/M/Y)
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
    * @create  02/08/2021 (D/M/Y)
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
    * @create  02/08/2021 (D/M/Y)
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

    /**
    * Load Role
    *
    * @author  c_dinh
    * @create  02/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadRole = async () => {
        let params = {
            company_id: ApiPath.companyID,
        }
        let obj = { package_name: 'hr', url: ApiPath.adminLevels, method: 'get', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
    };
    let roleChange = (e) => {
        setRoleState(e.target.value);
    }

    /** end API for role */
    //format date yyyy-MM-dd
    const formatDate = (date) => {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
    }

    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };
    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };

    let monthlyTimeLimitChange = (value) => {
        setMonthlyTimeLimit(value);
    }

    let weeklyTimeLimitChange = (value) => {
        setWeeklyTimeLimit(value);
    }

    let overTimeLimitChange = (value) => {
        setOverTimeLimit(value);
    }

    let removeFromDate = () => {
        setSelectedFromDate(null);
    }
    let removeToDate = () => {
        setSelectedToDate(null);
    }
    /** End get Joined Date Value Function */

    /** Start Cancel All Data Function */
    let cancelData = () => {
        setError([]);
        setEditData("");
        setDeptState("");
        setRoleState("");
        if (viewPermissionAPI != 0) {
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
        }
        setMonthlyTimeLimit(defaultTime);
        setWeeklyTimeLimit(defaultTime);
        setOverTimeLimit(defaultTime);
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
    }
    /** End Cancel All Data Function */
    /** Start Search Function */
    let searchAPI = async (page = 1) => {
        let arrMsg = [];
        setError([]);
        setSuccess('');

        //validation From Date
        if (!checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
            let errMsg = t("JSE001").replace("%s", t("From Date"));
            arrMsg.push(errMsg);
        }
        //validation To Date
        if (!checkNullOrBlank(selectedToDate) && checkNullOrBlank(selectedFromDate)) {
            let errMsg = t("JSE001").replace("%s", t("To Date"));
            arrMsg.push(errMsg);
        }
        //validation check From Date > To Date
        if (checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
            if (formatDate(selectedFromDate) > formatDate(selectedToDate)) {
                let errMsg = t("JSE016").replace("%s", t("From Date")).replace("%s", t("To Date"));
                arrMsg.push(errMsg);
            }
        }

        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess("");
            setMonthlyTimeLimit(defaultTime);
            setWeeklyTimeLimit(defaultTime);
            setOverTimeLimit(defaultTime);
            setMainTable([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            setError([]);
            setSuccess('');
            setLoading(true);
            let params = {
                "company_id": ApiPath.companyID,
                "language": ApiPath.lang,
                "role_id": roleState,
                "employee_id": employeeID,
                "employee_code": employeeCode,
                "employee_name": employeeName,
                "department_id": deptState,
                "from_date": isEmpty(selectedFromDate) ? "" : formatDate(selectedFromDate),
                "to_date": isEmpty(selectedToDate) ? "" : formatDate(selectedToDate),
            }
            let obj = { package_name: 'hr', url: ApiPath.overtimeNotificationSearch, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMonthlyTimeLimit(defaultTime);
                setWeeklyTimeLimit(defaultTime);
                setOverTimeLimit(defaultTime);
                setMainTable([]);
            } else {
                setRowCount(response.data.data.length);
                setMainTable(response.data.data);
                setError([]);
                setSuccess("");
            }
        }
    }
    /** End Search Function */

    /** Start Click remove function */
    const removeRow = (e) => {
        let result_data = []; // to remove data by click icon
        result_data = mainTable.filter(main => main.employee_id != e['employee_id']);
        setMainTable(result_data);
        setRowCount(result_data.length);
    }
    /** End remove function */

    let saveData = () => {
        let errMsgAll = [];
        if (monthlyTimeLimit === defaultTime) {
            const errMsg = t("JSE009").replace('%s', t('Monthly Time Limit'));
            errMsgAll.push(errMsg);
        }
        if (weeklyTimeLimit === defaultTime) {
            const errMsg = t("JSE009").replace('%s', t('Weekly Time Limit'));
            errMsgAll.push(errMsg);
        }
        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setShow(!show);
            if (editData == "") {
                setContent(t("Are you sure want to save?")); setType("save"); setError([]);
            } else {
                setContent(t("Are you sure want to update?")); setType("update"); setError([]);
            }
        }
    }

    const saveOK = async () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShow(!show)
        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        })
        if (editData == "") { //REGISTER MODE
            setLoading(true);
            let params = {
                "company_id": ApiPath.companyID, // login data from erp 
                "employee_id": emp_data,
                "weekly_time_limit": weeklyTimeLimit,
                "monthly_time_limit": monthlyTimeLimit,
                "overtime_limit": overTimeLimit,
                "created_emp": ApiPath.createdEmp,  // login data from erp 
                "updated_emp": ApiPath.updatedEmp,   // login data from erp 
                "language": ApiPath.lang,
            }
            let obj = { package_name: 'hr', url: ApiPath.overtimeNotificationSave, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setError(response.message);
                setSuccess("");
                if (response.data.data.errors) {
                    setError([]);
                    setShow(show); setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
                }
            } else {
                cancelData()
                setError([]);
                setSuccess([response.data.message]);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            }
        } else { // EDIT MODE
            setLoading(true);
            let params = {
                "company_id": ApiPath.companyID, // login data from erp 
                "employee_id": emp_data[0],
                "weekly_time_limit": weeklyTimeLimit,
                "monthly_time_limit": monthlyTimeLimit,
                "overtime_limit": overTimeLimit,
                "updated_emp": ApiPath.updatedEmp   // login data from erp 
            }
            let obj = { package_name: 'hr', url: ApiPath.overtimeNotificationUpdate + editData, method: 'put', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setError(response.message);
                setSuccess("");
            } else {
                if (response.data.status == "OK") {
                    cancelData();
                    setError([]);
                    setSuccess([response.data.message]);
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                } else if (response.data.status == "NG") {
                    setError([response.data.message]);
                    setSuccess("");
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }
            }
        }
    }
    /** End Save/Update Function */
    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let url = `${ApiPath.overtimeNotificationUpdate}${edit_id}?company_id=${ApiPath.companyID}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setError(response.message);
        } else {
            if (response.data.status == "OK") {
                let data = response.data.data;
                setEmployeeID(data.employee_id);
                setEmployeeCode(data.employee_code);
                setEmployeeName(data.employee_name);
                let date = new Date(data.joined_date);
                setSelectedToDate(date);
                setSelectedFromDate(date);
                setRoleState(data.admin_level_id);
                setDeptState(data.departments[0].id);
                setMonthlyTimeLimit(response.data.data['monthly_time_limit']);
                setWeeklyTimeLimit(response.data.data['weekly_time_limit']);
                setOverTimeLimit(response.data.data['overtime_limit']);
                setMainTable([response.data.data]);
                setError([]);
                setSuccess("");
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
                setEditData("");
            }
        }
    }
    /** End Edit Function */

    const owsaveOK = async () => {
        setShow(!show)
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        })

        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "employee_id": emp_data,
            "weekly_time_limit": weeklyTimeLimit,
            "monthly_time_limit": monthlyTimeLimit,
            "overtime_limit": overTimeLimit,
            "created_emp": ApiPath.createdEmp,  // login data from erp 
            "updated_emp": ApiPath.updatedEmp,   // login data from erp 
            "language": ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.overtimeNotificationOverwriteSave, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            setError(response.message);
            setSuccess("");
        } else {
            if (response.data.status == "OK") {
                setError([]);
                setSuccess([response.data.message]);
                setEditData("");
                setMonthlyTimeLimit(defaultTime);
                setWeeklyTimeLimit(defaultTime);
                setOverTimeLimit(defaultTime);
                setRoleState("");
                setDeptState("")
                setEmployeeID("");
                setEmployeeCode("");
                setEmployeeName("");
                setMainTable([]);
                setSelectedFromDate(null);
                setSelectedToDate(null);
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
            }
        }
    }
    /** End Overwrite Save Function */

    return (
        <CRow className="overtime-notification-setup">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} saveOK={saveOK} updateOK={saveOK} owsaveOK={owsaveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5>{t('Overtime Notification Setup')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchOvertimeNotification
                            viewPermissionAPI={viewPermissionAPI}
                            editData={editData}
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
                            roleAPI={roleAPI}
                            roleState={roleState}
                            roleChange={roleChange}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={handleFromDateChange}
                            selectedToDate={selectedToDate}
                            handleToDateChange={handleToDateChange}
                            removeFromDate={removeFromDate}
                            removeToDate={removeToDate}
                            searchAPI={() => searchAPI()}
                        />
                        {/* Overtime Notification List Table Start */}
                        <OvertimeNotificationTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            removeRow={removeRow}
                            editData={editData}
                        />
                        <br />
                        {/* Overtime Notification List Table End */}

                        {/* Set time limit  start */}
                        <OvertimeNotificationSettingTimeBox
                            monthlyTimeLimit={monthlyTimeLimit}
                            weeklyTimeLimit={weeklyTimeLimit}
                            overTimeLimit={overTimeLimit}
                            monthlyTimeLimitChange={monthlyTimeLimitChange}
                            weeklyTimeLimitChange={weeklyTimeLimitChange}
                            overTimeLimitChange={overTimeLimitChange}
                            mainTable={mainTable}
                        />
                        {/* Set time limit End */}
                        <br />
                        <SaveOvertimeNotification
                            saveData={saveData}
                            mainTable={mainTable}
                            cancelData={cancelData}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function OvertimeNotificationSetupIndex() {
    return (
        <Welcome />
    )
}
