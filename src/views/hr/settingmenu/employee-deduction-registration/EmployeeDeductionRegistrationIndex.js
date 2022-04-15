/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { isEmpty, checkNullOrBlank } from '../../../hr/hr-common/common-validation/CommonValidation';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import EmployeeDeductionNameBox from './EmployeeDeductionNameBox';
import EmployeeDeductionCategoryBox from './EmployeeDeductionCategoryBox';
import SaveAndCancelEmployeeDeduction from './SaveAndCancelEmployeeDeduction';
import EmployeeDeductionTypeBox from './EmployeeDeductionTypeBox';
import EmployeeDeductionCountForBox from './EmployeeDeductionCountForBox';
import SeachEmployeeDeduction from './SeachEmployeeDeduction';
import EmployeeDeductionPeriodBox from './EmployeeDeductionPeriodBox';
import ShowDeductionAllBox from './ShowDeductionAllBox';
import EmployeeDeductionTable from './EmployeeDeductionTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
/**
 * EmployeeDeductionRegistrationIndex
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [deptState, setDeptState] = useState(); // for show department name
    const [roleAPI, setRoleAPI] = useState([]);   // For Role API
    const [roleState, setRoleState] = useState(""); // for show role name
    const [selectedFromDate, setSelectedFromDate] = useState(null); //for Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);//for Joined End Date
    const [mainTable, setMainTable] = useState([]); // for main table
    const [rowCount, setRowCount] = useState(""); // for row count
    const [deductionName, setDeductionName] = useState(""); //for deduction name
    const [deductionID, setDeductionID] = useState(); //for deduction id
    const [selectDeductionCategory, setSelectDeductionCategory] = useState(); //select Deduction Category
    const [typeDeduction, setTypeDeduction] = useState("");
    const [countDeduction, setCountDeduction] = useState(""); //for count deduction
    const [periodDeduction, setPeriodDeduction] = useState("2");
    const [lableDeductionType, setLableDeductionType] = useState("Percentage");
    const [calMethod, setCalMethod] = useState(true); //for save button confirmation
    const [editData, setEditData] = useState([]); //for Edit data
    const [saveModalBox, setSaveModalBox] = useState(false); //for save button confirmation
    const [overWriteModalBox, setOverWriteModalBox] = useState(false); // for overwrite save button confirmation
    const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModalBox, setShowModalBox] = useState(false);// For show/hide confirmation box
    const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  07/08/2021 (D/M/Y)
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
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadDept();
        loadRole();
        loadDeductionName();
        loadDeductionCategory();
        let edit_Data = JSON.parse(localStorage.getItem('RETURN_EMPLOYEE_DEDUCTION_DATA_ID')); // return data DEDUCTION DATA List Form
        let employee_Arr = JSON.parse(localStorage.getItem('RETURN_EMPLOYEE_DEDUCTION_DATA_EMP_ARR'));
        localStorage.removeItem('RETURN_EMPLOYEE_DEDUCTION_DATA_ID');
        localStorage.removeItem('RETURN_EMPLOYEE_DEDUCTION_DATA_EMP_ARR');
        if (edit_Data != null) {
            let edit_id = edit_Data;
            let edit_id_emp_arr = employee_Arr;
            setEditData(edit_Data);
            editIndex(edit_id, edit_id_emp_arr);
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
    * @create  08/07/2021 (D/M/Y)
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
    * @create  08/07/2021 (D/M/Y)
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
    * @create  08/07/2021 (D/M/Y)
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
    * @create  08/07/2021 (D/M/Y)
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
    * Load Deduction Name
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [DeductionNameAPI, setDeductionNameAPI] = useState([]);
    const loadDeductionName = async () => {
        let params = {
            company_id: ApiPath.companyID,
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeDeductionName, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setDeductionNameAPI([]);
        } else {
            let data = response.data.data;
            data && setDeductionNameAPI(data);
        }
    }

    /**
    * Load Deduction Category
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [deductionCategoryAPI, setDeductionCategoryAPI] = useState([]);
    const loadDeductionCategory = async () => {
        let params = {
            language: ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeDeductionCategory, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setDeductionCategoryAPI([]);
        } else {
            let data = response.data.data;
            data && setDeductionCategoryAPI(data);
        }
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
            let obj = { package_name: 'hr', url: ApiPath.employeeDeductionSearch, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMainTable([]);
            } else {
                setRowCount(response.data.row_count);
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
        setRowCount("Total Rows:" + (result_data.length) + " row(s)");
    }
    /** End remove function */

    let chooseDeductionCategory = async (e) => {
        setLableDeductionType("Percentage");
        setTypeDeduction("");
        setCountDeduction("");
        setDeductionID("");

        setSelectDeductionCategory(e.target.value);
        let params = {
            deduction_category_id: e.target.value,
            company_id: ApiPath.companyID, // login data from erp
            language: ApiPath.lang
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeDeductionChangeCategory, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            if (response.data.status == "OK") {
                let data = response.data.data;
                setDeductionNameAPI(data);
                setError([]);
                setSuccess("");
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
            }
        }
    }

    const deductionNameChange = async (e) => {
        setDeductionName(e.target.name);
        setDeductionID(e.target.value);
        let teamp_Id = e.target.value;
        let params = {
            deduction_rule_id: e.target.value,
            company_id: ApiPath.companyID, // login data from erp
            language: ApiPath.lang
        }
        if (teamp_Id != "") {
            let obj = { package_name: 'hr', url: ApiPath.employeeDeductionChangeName, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
            } else {
                if (response.data.status == "OK") {
                    setLableDeductionType(response.data.data['deduction_type'] == 1 ? "Percentage" : "Amount");
                    setTypeDeduction(response.data.data['deduction']);
                    setCountDeduction(response.data.data['deduction_count']);
                    setError([]);
                    setSuccess("");
                } else if (response.data.status == "NG") {
                    setLableDeductionType("Percentage");
                    setTypeDeduction("");
                    setCountDeduction("");
                    setError([response.data.message]);
                    setSuccess("");
                }
            }
        } else {
            setSelectDeductionCategory();
            setLableDeductionType("Percentage");
            setTypeDeduction("");
            setCountDeduction("");
        }
    }

    let calMethodChange = () => {
        setCalMethod(!calMethod);
    }
    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };
    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };
    let removeFromDate = () => {
        setSelectedFromDate(null);
    }
    let removeToDate = () => {
        setSelectedToDate(null);
    }

    /** Start Cancel All Data Function */
    let cancelData = () => {
        setSuccess('');
        setError([]);
        setDeductionName("");
        setDeductionID("");
        setSelectDeductionCategory();
        setTypeDeduction("");
        setCountDeduction("");
        setPeriodDeduction("2");
        setLableDeductionType("Percentage");
        setCalMethod(true);
        setEditData("");
        setDeptState("");
        setRoleState("");
        if(viewPermissionAPI !==0){
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
        }
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    /** End Cancel All Data Function */

    /** Start Save/Update function */
    const closeSaveAlert = () => {
        setSaveModalBox(!saveModalBox);
    }

    let saveData = () => {
        let errMsgAll = [];

        if (isEmpty(deductionID)) {
            const errMsg = t("JSE126").replace("%s", t("Deduction Name"));
            errMsgAll.push(errMsg);
        }

        let arrEmployeeID = [];
        if (calMethod == true) {
            mainTable.forEach((main, index) => {
                arrEmployeeID[index] = main.employee_id
            })
        }

        if (isEmpty(arrEmployeeID) && calMethod == true) {
            const errMsg = t("JSE126").replace("%s", t("Employee ID"));
            errMsgAll.push(errMsg);
        }

        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        } else {
            setShowModalBox(!showModalBox);
            if(editData == ""){
                setContent(t("Are you sure want to save?"));setType("save");setError([]);
            }else{
                setContent(t("Are you sure want to update?"));setType("update");setError([]);
            }
        }
    }

    const saveOK = async () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShowModalBox(!showModalBox);
        setLoading(true);
        let emp_data = [];
        if (calMethod == true) {
            mainTable.forEach((main, index) => {
                emp_data[index] = main.employee_id
            })
        }
        let params = {
            "company_id": ApiPath.companyID, // login data from erp
            "employee_ids": emp_data, // update many record  
            "deduction_rule_id": Number(deductionID),
            "deduction_calculate_option": calMethod == false ? 1 : 2,
            "employee_id": ApiPath.loginEmp, // login data from erp 
            "language": ApiPath.lang,
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
        }

        let url = '', method = '';
        if (editData == "") { //EDIT
            params = { ...params, "created_emp": ApiPath.createdEmp };
            url = ApiPath.employeeDeductionRegisterSave;
            method = 'post';
        } else { //UPDATE
            params = { ...params, "employee_ids_first": employeeIdFirst };
            url = ApiPath.employeeDeductionRegister + editData;
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
            cancelData()
            setSuccess([response.data.message]);
        };
    }
    /** End Save/Update Function */

    /** Start Edit Function */
    const [employeeIdFirst, setEmployeeIdFirst] = useState([]);
    let editIndex = async (edit_id, edit_id_employee_arr) => {
        setLoading(true);
        let url = `${ApiPath.employeeDeductionRegister}${edit_id}?language=${ApiPath.lang}&employee_ids=${edit_id_employee_arr}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            if (response.data.status == "OK") {
                let data = response.data.data;
                let employee_id_first = [];
                data['employees'].forEach((main, index) => {
                    employee_id_first[index] = main.employee_id;
                })
                setEmployeeIdFirst(employee_id_first);
                setMainTable(response.data.data.employees);
                setSelectDeductionCategory(response.data.data['deduction_category_id']);
                setDeductionID(response.data.data['deduction_rule_id']); //note
                setLableDeductionType(response.data.data['deduction_type'] == 1 ? "Percentage" : "Amount");
                setTypeDeduction(response.data.data['deduction']);
                setCountDeduction(response.data.data['deduction_count']);
                setCalMethod(response.data.data['deduction_calculate_option'] == 1 ? false : true);
                setError([]);
                setSuccess("");
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
                setEditData("");
            }
        }
    }

    const closeOWSaveAlert = () => {
        setOverWriteModalBox(!overWriteModalBox);
    }

    const owsaveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        let emp_data = [];
        if (calMethod == true) {
            mainTable.forEach((main, index) => {
                emp_data[index] = main.employee_id
            })
        }
        let params = {
            "company_id": ApiPath.companyID, // login data from erp
            "employee_ids": emp_data,
            "deduction_rule_id": Number(deductionID),
            "deduction_calculate_option": calMethod == false ? 1 : 2,
            "employee_id": ApiPath.loginEmp, // login data from erp 
            "language": ApiPath.lang,
            "created_emp": ApiPath.createdEmp, // login data from erp 
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeDeductionRegistrationOverwriteSave, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        } else {
            cancelData();
            setError([]);
            setSuccess([response.data.message]);
        }
    }

    const removeMessage = () => {
        setError("");
        setSuccess("");
    }
    /** End Edit Function */
    return (
        <CRow className="deduction employee-deduction" >
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
                        <h5 id="lblEmployeeDeductionRegistration">{t('Employee Deduction Registration')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <EmployeeDeductionCategoryBox
                            deductionCategoryAPI={deductionCategoryAPI}
                            chooseDeductionCategory={chooseDeductionCategory}
                            selectDeductionCategory={selectDeductionCategory}
                        />
                        <EmployeeDeductionNameBox
                            deductionID={deductionID}
                            deductionName={deductionName}
                            deductionNameChange={deductionNameChange}
                            DeductionNameAPI={DeductionNameAPI}
                        />
                        <EmployeeDeductionTypeBox
                            lableDeductionType={lableDeductionType}
                            typeDeduction={typeDeduction}
                        />
                        <EmployeeDeductionCountForBox
                            countDeduction={countDeduction}
                        />
                        <EmployeeDeductionPeriodBox
                            viewPermissionAPI={viewPermissionAPI}
                            periodDeduction={periodDeduction}
                            calMethodChange={calMethodChange}
                            calMethod={calMethod}
                        />
                        <ShowDeductionAllBox
                            viewPermissionAPI={viewPermissionAPI}
                            calMethod={calMethod}
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
                        />
                        <SeachEmployeeDeduction
                            searchAPI={searchAPI}
                            calMethod={calMethod}
                        />
                        <EmployeeDeductionTable
                            calMethod={calMethod}
                            mainTable={mainTable}
                            rowCount={rowCount}
                            removeRow={removeRow}
                        />
                        <SaveAndCancelEmployeeDeduction
                            saveData={saveData}
                            cancelData={cancelData}
                            mainTable={mainTable}
                            calMethod={calMethod}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeDeductionRegistrationIndex() {
    return (
        <Welcome />
    )
}
