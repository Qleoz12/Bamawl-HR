/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import { checkNullOrBlank, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import SearchEmployeeOvertimeRegistration from './SearchEmployeeOvertimeRegistration';
import EmployeeOvertimeRegistrationTable from './EmployeeOvertimeRegistrationTable';
import TitleOvertimeEmployeeOrvertimeRegistration from './TitleOvertimeEmployeeOrvertimeRegistration';
import EmployeeOvertimeRegistrationOvertimeTable from './EmployeeOvertimeRegistrationOvertimeTable';
import SaveAndCancelEmployeeOvertimeRegistration from './SaveAndCancelEmployeeOvertimeRegistration';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const [deptState, setDeptState] = useState(); // for show department name
    const [roleState, setRoleState] = useState(); // for show role name
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [roleAPI, setRoleAPI] = useState([]);   // For Role API
    const [selectedFromDate, setSelectedFromDate] = useState(null); //for Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);//for Joined End Date
    const [selectedOTData, setSelectedOTData] = useState(""); // for selected OT id
    const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
    const [overWriteModalBox, setOverWriteModalBox] = useState(false); // for overwrite save button confirmation
    const [mainTable, setMainTable] = useState([]); // for main table
    const [rowCount, setRowCount] = useState(""); // for row count
    const [overtimeTable, setOvertimeTable] = useState([]); // for OT table
    const [editData, setEditData] = useState([]); // for Edit data
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [clearData, setClearData] = useState('');
    const [showModalBox, setShowModalBox] = useState(false);// For show/hide confirmation box
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadRole();
        loadDept();
        loadOTName();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_OT_RATE_DATA')); // return data from OT Rate List Form
        localStorage.removeItem('RETURN_OT_RATE_DATA');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
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
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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

    /**
    * Load Overtime Title
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [OTNameAPI, setOTNameAPI] = useState([]);
    const loadOTName = async () => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeOvertimeGetRate, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setOTNameAPI([]);
        } else {
            setOTNameAPI(response.data.data);
        }
    }

    /** Start Dept, Role and Ot Title change function */
    let otTitleChange = async (e) => {
        let ot_id = e.target.value;
        setSelectedOTData(ot_id);
        let otTable = [];
        if (ot_id != "") {
            setLoading(true);
            let url = `${ApiPath.employeeOvertimeGetRateInfo}${ot_id}?company_id=${ApiPath.companyID}`;
            let obj = { package_name: 'hr', url: url, method: 'get' };
            let response = await ApiRequest(obj);
            setLoading(false);

            if (response.flag === false) {
                setError(response.message);
                setOvertimeTable([]);
            } else {
                let data = response.data.data;
                data = data.map(ele => ({ ...ele, setting_type: (ele.setting_type === 1 ? "Auto Setting" : "User Defined") }))
                setOvertimeTable(data);
                setError([]);
                setSuccess("");
            }
        } else {
            setOvertimeTable([]);
        }
    }
    /** End Dept, Role and Ot Title change function */

    /** Start Cancel All Data Function */
    let cancelData = () => {
        setEditData("");
        setDeptState("");
        setRoleState("");
        if(viewPermissionAPI !==0){
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
        }
        setSelectedOTData("");
        setMainTable([]);
        setOvertimeTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSuccess('');
        setError([]);
    }

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
            setMainTable([]);
            setOvertimeTable([]);
            setSelectedOTData("");
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
            let obj = { package_name: 'hr', url: ApiPath.employeeOvertimeRegistrationSearch, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMainTable([]);
                setOvertimeTable([]);
                setSelectedOTData("");
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

    /** Start Save/Update function */
    const closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    }

    let saveData = () => {
        if (!checkNullOrBlank(selectedOTData)) {
            let errMsg = t('JSE001').replace('%s', t('Overtime Title'));
            setError([errMsg]);
        } else {
            setShowModalBox(!showModalBox);
            if(editData == ""){
                setContent(t("Are you sure want to save?"));setType("save");setError([]);
            }else{
                setContent(t("Are you sure want to update?"));setType("update");setError([]);
            }
        }
    }

    const clearEditAndUpdateData = () => {
        setError([]);
        setEditData("");
        setEmployeeID("");
        setEmployeeCode("");
        setEmployeeName("");
        setRoleState("");
        setSelectedOTData("");
        setRoleState("");
        setDeptState("");
        setMainTable([]);
        setOvertimeTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
    }

    /** Start Save/Update Function */
    const saveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        })

        let otrateid = overtimeTable.map(item => item.overtime_rate_setting_id);
        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "overtime_rate_setting_id": otrateid[0],
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
            "language": ApiPath.lang,
        };

        let url = '', method = '';
        if (editData == "") { //EDIT
            params = { ...params, "created_emp": ApiPath.createdEmp, "employee_id": emp_data };
            url = ApiPath.employeeOvertimeRegistrationSave;
            method = 'post';
        } else { //UPDATE
            params = { ...params, "employee_id": emp_data[0] };
            url = ApiPath.employeeOvertimeRegistration + editData;
            method = 'put';
        };
        let obj = { package_name: 'hr', url: url, method: method, params };
        let response = await ApiRequest(obj);
        setLoading(false);

        if (response.flag === false) {
            if (response.data.data.errors) {
                setError([]);
                setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
                setShowModalBox(true);
                setSuccess([]);
            } else {
                setError(response.message);
                setSuccess("");
            }
        } else {
            clearEditAndUpdateData();
            setSuccess([response.data.message]);
        };
    }
    /** End Save/Update Function */

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        let edit_OtData = [];
        setLoading(true);
        let url = `${ApiPath.employeeOvertimeRegistration}${edit_id}?company_id=${ApiPath.companyID}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);

        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            setEditData("");
            setMainTable([]);
            setOvertimeTable([]);
        } else {
            let data = response.data.data;
            setDeptState(data.erp_info[0].departments[0].id);
            setEmployeeID(data.erp_info[0]['employee_id']);
            setEmployeeCode(data.erp_info[0]['employee_code']);
            setEmployeeName(data.erp_info[0]['employee_name']);
            setRoleState(response.data.data.admin_level_id);
            let date = new Date(data.erp_info[0]['joined_date']);
            setSelectedToDate(isEmpty(data.erp_info[0]['joined_date']) ? "" : date);
            setSelectedFromDate(isEmpty(data.erp_info[0]['joined_date']) ? "" : date);
            setSelectedOTData(response.data.data['overtime_rate_setting_id']);
            setMainTable(response.data.data.erp_info);
            edit_OtData.push({
                "id": 1,
                "overtime_name": response.data.data.overtime_name,
                "sn_name": response.data.data.sn_name,
                "setting_type": response.data.data.setting_type === 1 ? "Auto Setting" : "User Defined",
                "based_on_salary": response.data.data.based_on_salary,
                "calculate_methods": response.data.data.calculate_methods,
                "m_factor": response.data.data.m_factor,
                "e_addition": response.data.data.e_addition,
                "overtime_rate_setting_id": response.data.data.overtime_rate_setting_id
            })
            setOvertimeTable(edit_OtData);
            setError([]);
            setSuccess("");
        }
    }
    /** End Edit Function */

    /** Start Overwrite Save Function */
    const owsaveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        })
        let otrateid = overtimeTable.map(item => item.overtime_rate_setting_id);
        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "employee_id": emp_data,
            "overtime_rate_setting_id": otrateid[0],
            "created_emp": ApiPath.createdEmp, // login data from erp 
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
            "language": ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeOvertimeRegistrationOverwritesave, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        } else {
            clearEditAndUpdateData();
            setSuccess([response.data.message]);
        }
    }
    /** End Overwrite Save Function */

    let clearBeforeSearch = () => {
        setOvertimeTable([]);
        setSelectedOTData("");
    }
    const removeMessage = () => {
        setError("");
        setSuccess("");
    }

    return (
        <CRow className="employyOvertimeRegistion">
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
                    saveOK={saveOK}
                    updateOK={saveOK}
                    owsaveOK={owsaveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5>{t('Employee Overtime Registration')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchEmployeeOvertimeRegistration
                            viewPermissionAPI={viewPermissionAPI}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            editData={editData}
                            departmentAPI={departmentAPI}
                            deptState={deptState}
                            deptChange={deptChange}
                            roleAPI={roleAPI}
                            roleState={roleState}
                            roleChange={roleChange}
                            handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
                            handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
                            selectedFromDate={selectedFromDate}
                            selectedToDate={selectedToDate}
                            searchAPI={searchAPI}
                        />
                        {/* Employee List Table Start */}
                        <EmployeeOvertimeRegistrationTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            removeRow={removeRow}
                            editData={editData}
                        />
                        <br />
                        {/* Employee List Table End */}
                        <TitleOvertimeEmployeeOrvertimeRegistration
                            mainTable={mainTable}
                            OTNameAPI={OTNameAPI}
                            selectedOTData={selectedOTData}
                            otTitleChange={otTitleChange}
                        />
                        {/* Overtime List Table Start */}
                        <EmployeeOvertimeRegistrationOvertimeTable
                            mainTable={mainTable}
                            selectedOTData={selectedOTData}
                            overtimeTable={overtimeTable}
                        />
                        {/* Ovetime List Table End */}
                        <br />
                        <SaveAndCancelEmployeeOvertimeRegistration
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

export default function EmployeeOvertimeRegistrationIndex() {
    return (
        <Welcome />
    )
}
