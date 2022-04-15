/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from 'react';
import { checkNullOrBlank, validateNumberOnly, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import SearchSSBCalculateSetupList from './SearchSSBCalculateSetupList';
import SSBCalculateSetupTable from './SSBCalculateSetupTable';
import SSBCalculateSetupSettingBox from './SSBCalculateSetupSettingBox';
import SaveAndCancelSSBCalculateSetup from './SaveAndCancelSSBCalculateSetup';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");

    const [deptState, setDeptState] = useState(""); // for show department name
    const [roleState, setRoleState] = useState(""); // for show role name
    const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
    const [roleAPI, setRoleAPI] = useState([]);   // For Role API
    const [selectedFromDate, setSelectedFromDate] = useState(null); //for Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);//for Joined End Date
    const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
    const [overWriteModalBox, setOverWriteModalBox] = useState(false); // for overwrite save button confirmation
    const [mainTable, setMainTable] = useState([]); // for main table
    const [rowCount, setRowCount] = useState(""); // for row count
    const [editData, setEditData] = useState(""); // for Edit data
    const [paid, setPaid] = useState(true);
    const [basedOn, setBasedOn] = useState(2);
    const [fixedAmount, setFixedAmount] = useState();
    const [rate, setRate] = useState(true);
    const [accordion, setAccordion] = useState(true);
    const typingTimeoutRef = useRef(null);    // keep value time out when rerender
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
        loadBasedOn();

        let edit_Data = JSON.parse(localStorage.getItem('RETURN_CALCULATE_DATA')); // return data from CALCULATE DATA List Form
        localStorage.removeItem('RETURN_CALCULATE_DATA');
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

    /** end API for role */

    /**
    * Load Based On Methods
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const [basedOnMethod, setBasedOnMethod] = useState([]);
    const loadBasedOn = async () => {
        let obj = { package_name: 'hr', url: ApiPath.ssbCalculateMethodBasedOnMethods, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setBasedOnMethod([]);
        } else {
            setBasedOnMethod(response.data.data);
        }
    }

    const basicSalaryChange = (e) => {
        setBasedOn(Number(e.target.value));
    }

    let paidChange = () => {
        setPaid(!paid);

        if (paid == false) {
            setBasedOn(2);
            setRate(true);
            setFixedAmount();
        }
    }
    let fixedAmountChane = (e) => {
        setFixedAmount(e.target.value);
    }
    let rateChange = () => {
        setRate(!rate);
    }
    let accordionChange = () => {
        setAccordion(!accordion);
    }

    /** End get Joined Date Value Function */

    /** Start Cancel All Data Function */
    let cancelData = () => {
        setError([]);
        setEditData("");
        setDeptState("");
        setRoleState("");
        if (viewPermissionAPI !== 0) {
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
        }
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setPaid(true)
        setBasedOn(2);
        setRate(true);
        setFixedAmount();
    }
    /** End Cancel All Data Function */

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
            setPaid(true)
            setBasedOn(2);
            setRate(true);
            setFixedAmount();
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
            let obj = { package_name: 'hr', url: ApiPath.ssbCalculateMethodSetupSearch, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMainTable([]);
                setPaid(true)
                setBasedOn(2);
                setRate(true);
                setFixedAmount();
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
        let errMsgAll = [];
        if (checkNullOrBlank(fixedAmount) && basedOn == 3 && paid == 1) {
            if (!validateNumberOnly(fixedAmount) && basedOn == 3 && paid == 1) {
                const errMsg = t('JSE005').replace('%s', t('SSB Paid Fixed Amount'))
                errMsgAll.push(errMsg);
            } else if ((fixedAmount > 300000) && basedOn == 3 && paid == 1) {
                const errMsg = t('JSE002').replace('%s', t('SSB Paid Fixed Amount')).replace('%s', t('300000'));
                errMsgAll.push(errMsg);
            }
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

        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "ssb_paid": paid == true ? 1 : 2,
            "ssb_based_on": Number(basedOn),
            "employee_ssb_rate": rate == false ? 1 : 2,
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
            "language": ApiPath.lang,
        }

        let url = '', method = '';
        if (editData == "") { //EDIT
            params = { ...params, "created_emp": ApiPath.createdEmp, "employee_id": emp_data, "ssb_fixed_amount": Number(basedOn) == 3 ? fixedAmount : "" };
            url = ApiPath.ssbCalculateMethodSetupSave;
            method = 'post';
        } else { //UPDATE
            params = { ...params, "employee_id": emp_data[0], "ssb_fixed_amount": fixedAmount };
            url = ApiPath.ssbCalculateMethodSetupUpdate + editData;
            method = 'put';
        };
        let obj = { package_name: 'hr', url: url, method: method, params };
        let response = await ApiRequest(obj);
        setLoading(false);

        if (response.flag === false) {
            if (response.data.data.errors) {
                setError([]);
                setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
                setOverWriteModalBox(!overWriteModalBox);
            } else {
                setError(response.message);
                setSuccess("");
            }
        } else {
            cancelData();
            setSuccess([response.data.message]);
        };
    }
    /** End Save/Update Function */

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        setLoading(true);
        let url = `${ApiPath.ssbCalculateMethodSetupUpdate}${edit_id}?company_id=${ApiPath.companyID}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            if (response.data.status == "OK") {
                let data = response.data.data;
                setEmployeeID(data.erp_info[0]['employee_id']);
                setEmployeeCode(data.erp_info[0]['employee_code']);
                setEmployeeName(data.erp_info[0]['employee_name']);
                setBasedOn(data['ssb_based_on']);
                setRoleState(data['admin_level_id']);
                let paid = (data['ssb_paid']);
                if (paid == 1) {
                    setPaid(true);
                    setAccordion(true);
                } else {
                    setPaid(false);
                    setAccordion(true);
                }
                let date = new Date(data.erp_info[0]['joined_date']);
                setSelectedToDate(isEmpty(data.erp_info[0]['joined_date']) ? "" : date);
                setSelectedFromDate(isEmpty(data.erp_info[0]['joined_date']) ? "" : date);
                setDeptState(data.erp_info[0].departments[0].id);
                let rate = (data['employee_ssb_rate']);
                if (rate == 1) {
                    setRate(false);
                } else {
                    setRate(true);
                }
                setFixedAmount(data['ssb_fixed_amount']);
                setMainTable(data.erp_info);
                setError([]);
                setSuccess("");
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
                setEditData("");
            }
        }
    }

    /** Start Overwrite Save Function */
    const closeOWSaveAlert = () => {
        setOverWriteModalBox(!overWriteModalBox);
    }

    const owsaveOK = async () => {
        setOverWriteModalBox(!overWriteModalBox);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        })

        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID, // login data from erp 
            "employee_id": emp_data,
            "ssb_paid": paid == true ? 1 : 2,
            "ssb_based_on": Number(basedOn),
            "ssb_fixed_amount": Number(basedOn) == 3 ? fixedAmount : "",
            "employee_ssb_rate": rate == false ? 1 : 2,
            "created_emp": ApiPath.createdEmp, // login data from erp 
            "updated_emp": ApiPath.updatedEmp,  // login data from erp 
            "language": ApiPath.lang,
        }
        let obj = { package_name: 'hr', url: ApiPath.ssbCalculateMethodSetupOverwriteSave, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
        } else {
            if (response.data.status == "OK") {
                cancelData()
                setSuccess([response.data.message]);
                setError([]);
            } else if (response.data.status == "NG") {
                setError([response.data.message]);
                setSuccess("");
            }
        }
    }
    const removeMessage = () => {
        setError("");
        setSuccess("");
    }
    /** End Overwrite Save Function */
    return (
        <CRow className="ssbcalculation">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} saveOK={saveOK} updateOK={saveOK}
                />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={overWriteModalBox}
                    cancel={() => setOverWriteModalBox(!overWriteModalBox)}
                    owsaveOK={owsaveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblSSBCalculationMethodSetup">{t("SSB Calculation Method Setup")}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchSSBCalculateSetupList
                            editData={editData}
                            mainTable={mainTable}
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
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            viewPermissionAPI={viewPermissionAPI}
                        />
                        <SSBCalculateSetupTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            removeRow={removeRow}
                            editData={editData}
                        />
                        <br />
                        <SSBCalculateSetupSettingBox
                            accordionChange={accordionChange}
                            paid={paid}
                            paidChange={paidChange}
                            mainTable={mainTable}
                            accordion={accordion}
                            basedOnMethod={basedOnMethod}
                            basicSalaryChange={basicSalaryChange}
                            basedOn={basedOn}
                            rate={rate}
                            rateChange={rateChange}
                            editData={editData}
                            fixedAmountChane={fixedAmountChane}
                            fixedAmount={fixedAmount}
                        />
                        <br />
                        <SaveAndCancelSSBCalculateSetup
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

export default function SSBCalculationMethodSetupIndex() {
    return <Welcome />;
}
