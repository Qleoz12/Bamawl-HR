/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    CCard, CCardBody, CCardHeader, CCol, CRow
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import Moment from 'moment';
import SearchEmployeeAllowanceRegistration from './SearchEmployeeAllowanceRegistration';
import EmployeeAllowanceRegistrationTable from './EmployeeAllowanceRegistrationTable';
import EmployeeAllowanceRegistrationForm from './EmployeeAllowanceRegistrationForm';
import SaveCancelEmployeeAllowanceRegistration from './SaveCancelEmployeeAllowanceRegistration';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import ViewPermision from "../../../brycen-common/constant/ViewPermission";
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

import {
    validateIntegerOnly
} from "../../../hr/hr-common/common-validation/CommonValidation"; // Common validation function
// use hoc for functional based components
/**
 * Page EmployeeAllowanceRegistration
 * 
 * @author  dh_khanh
 * @create_date  
 */
function LegacyWelcomeClass({ t, i18n }) {

    const [error, setError]                                 = useState([]);
    const [success, setSuccess]                             = useState([]);
    const [loading, setLoading]                             = useState(false);
    const [departmentAPI, setDepartmentAPI]                 = useState([]);   // For Dept API
    const [roleAPI, setRoleAPI]                             = useState([]);   // For Role API
    const [subAllowanceAPI, setSubAllowanceAPI]             = useState([]);   // for Sub Allowance API
    const [allowanceAPI, setAllowanceAPI]                   = useState([]);   // for Allowance API
    const [deptState, setDeptState]                         = useState(""); // for show department name
    const [roleState, setRoleState]                         = useState(""); // for show role name
    const [selectedPayDate, setSelectedPayDate]             = useState(null); // for selected PayDate
    const [allowanceAmount, setAllowanceAmount]             = useState(""); // for allowance Amount input
    const [allowanceID, setAllowanceID]                     = useState(""); // for selected allowance id
    const [subAllowanceID, setSubAllowanceID]               = useState(""); // for selected subAllowance allowance id
    const [selectedFromDate, setSelectedFromDate]           = useState(null); //for Joined Start Date
    const [selectedToDate, setSelectedToDate]               = useState(null);//for Joined End Date
    const [mainTable, setMainTable]                         = useState([]); // for main table
    const [rowCount, setRowCount]                           = useState(""); // for row count
    const [editData, setEditData]                           = useState(null); // for Edit data
    const typingTimeoutRef                                  = useRef(null);    // keep value time out when rerender
    const [clearData, setClearData]                         = useState('');
    const [idArr, setIdArr]                                 = useState([]);
    const [nameArr, setNameArr]                             = useState([]);
    const [codeArr, setCodeArr]                             = useState([]);
    const [employeeName, setEmployeeName]                   = useState('');
    const [employeeCode, setEmployeeCode]                   = useState('');
    const [employeeID, setEmployeeID]                       = useState('');
    const [content, setContent]                             = useState('');
    const [type, setType]                                   = useState('');
    const [showModalBox, setShowModalBox]                   = useState(false); // For show/hide confirmation box
    const [currencyName, setCurrencyName]                   = useState('');
    const [viewPermissionAPI, setViewPermissionAPI]         = useState([]);   // For View_Permission API
    
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
        let edit_Data = JSON.parse(sessionStorage.getItem('RETURN_EAR_DATA')); // return data from Employee Allowance List
        sessionStorage.removeItem('RETURN_EAR_DATA');
        setLoading(true);
        loadRole(edit_Data);
        loadDept(edit_Data);
        loadAllowance(edit_Data);
        loadViewPermission();
        if (edit_Data != null) {
            $('#searchBtn').hide();
            let edit_id = edit_Data;
            setEditData(edit_id);
            editIndex(edit_id);
        }
    }, []);
    const loadViewPermission = async () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.view_permission);
            if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
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
    const loadDept = useCallback(async (edit_Data) => {
        let params = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        }
        let obj = { package_name: 'erp', url: ApiPath.departmentAutoCompleteSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    }, []);
    let deptChange = (e) => {
        setDeptState(e.target.value);
    }

    /* GET ROLE SELECT BOX */
    const loadRole = useCallback(async (edit_Data) => {
        let url = `${ApiPath.adminLevels}?company_id=${ApiPath.companyID}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
    }, []);
    let roleChange = (e) => {
        setRoleState(e.target.value);
    }

    const loadAllowance = useCallback(async(edit_Data) => {
        let url = `${ApiPath.EmployeeAllowanceRegistrationGetAllowace}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        response.flag === false ? setAllowanceAPI([]) : setAllowanceAPI(response.data.data);
    }, []);

    const loadSubAllownce = async (allowanceID, edit_Data = null) => {
        let url = `${ApiPath.EmployeeAllowanceRegistrationChangeAllowance}${allowanceID}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSubAllowanceAPI([]);
            setSubAllowanceID("");
        } else {
            setSubAllowanceAPI(response.data.data);
            if(edit_Data == null) setSubAllowanceID("");
        }
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
    let searchAPI = (page = 1) => {
        clearAllBeforeSearch();
        let fromDate = null;
        let toDate = null;
        if (selectedFromDate != null) {
            fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
        }
        if (selectedToDate != null) {
            toDate = Moment(selectedToDate).format('YYYY-MM-DD');
        }
        if (fromDate != null && toDate == null) {
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
            searchEmployeeAllowanceRegistration(fromDate, toDate);
        }
    }

    const searchEmployeeAllowanceRegistration = async (fromDate, toDate) => {
        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "employee_name": employeeName,
            "employee_code": employeeCode,
            "department_id": deptState,
            "from_date": fromDate,
            "to_date": toDate,
            "role_id": roleState,
            "language": ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.EmployeeAllowanceRegistrationSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setMainTable([]);
            setSuccess([]);
        } else {
            setRowCount(response.data.data.length);
            setMainTable(response.data.data);
            setError([]);
            setSuccess([]);
        };
    }

    const removeRow = (e) => {
        let result_data = []; // to remove data by click icon
        result_data = mainTable.filter(main => main !== e);
        setMainTable(result_data);
        setRowCount(rowCount - 1);
    }

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        let url = `${ApiPath.EmployeeAllowanceRegistration}${edit_id}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            if (response.data?.status === "NG") {
                setSuccess("");
                $('#searchBtn').show();
                setEditData(null);
                setMainTable([]);
            }
            setError(response.message);
        } else {
            const data = response.data?.data;
            if (data) {
                const empInfo = data['erp_info'].find(info => Number(info['employee_id']) === Number(data['employee_id']));
                if (empInfo) {
                    setDeptState(empInfo['departments'][0]['id']);
                    setEmployeeID(empInfo['employee_id']);
                    setEmployeeCode(empInfo['employee_code']);
                    setEmployeeName(empInfo['employee_name']);
                    if (empInfo['joined_date']) {
                        setSelectedToDate(Moment(empInfo['joined_date'], 'YYYY/MM/DD').format('MM/DD/YYYY'));
                        setSelectedFromDate(Moment(empInfo['joined_date'], 'YYYY/MM/DD').format('MM/DD/YYYY'));
                    }
                    setMainTable(data['erp_info']);
                }
                setRoleState(data['admin_level_id']);
                setAllowanceID(data['allowance_id']);
                setSubAllowanceID(data['sub_allowance_id']);
                setAllowanceAmount(data['allowance_amount']);
                setCurrencyName(data['currency_name']);
                setSelectedPayDate(data['allowance_paid_date']);
                loadSubAllownce(data['allowance_id'], edit_id);
            }
            setError([]);
            setSuccess([]);
        }
    }
    /** End Edit Function */

    let handlePayDateChange = (e) => {
        setSelectedPayDate(e);
    }

    let handleChangeAllowance = (e) => {
        const value = e.target.value;
        if (value !== "") {
            setAllowanceID(e.target.value);
            loadSubAllownce(e.target.value);
        } else {
            setAllowanceID("");
            setSubAllowanceAPI([]);
            setSubAllowanceID("");
        }
        setAllowanceAmount("");
        setCurrencyName("");
    }

    let handleChangeSubAllowance = (e) => {
        const value = e.target.value;
        if (value) {
            setSubAllowanceID(value);
            const subAllowance = subAllowanceAPI.find(item => Number(item.id) === Number(value));
            if (subAllowance) {
                setAllowanceAmount(subAllowance.allowance_amount);
                setCurrencyName(subAllowance.currency_name);
            }
        } else {
            setSubAllowanceID("");
            setAllowanceAmount("");
            setCurrencyName("");
        }
    }

    let handleChangeAllowanceAmount = (e) => {
        const value = e.target.value;
        if(value === "" || validateIntegerOnly(value)){
            setAllowanceAmount(e.target.value);
        }
    }

    let cancelData = () => {
        $('#searchBtn').show();
        setEditData(null);
        setEmployeeID("");
        setEmployeeCode("");
        setEmployeeName("");
        setDeptState("");
        setRoleState("");
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSelectedPayDate(null);
        setAllowanceAmount("");
        setCurrencyName("");
        setAllowanceID("");
        setSubAllowanceID("");
        setSubAllowanceAPI([]);
        setError([]);
        setSuccess([]);
    }

    let saveData = () => {
        let errMsgAll = [];
        if (allowanceID === "") {
            const errMsg = t('JSE001').replace('%s', t('Allowance Title'))
            errMsgAll.push(errMsg);
        }
        if (subAllowanceID === "") {
            const errMsg = t('JSE001').replace('%s', t('Sub Allowance Title'))
            errMsgAll.push(errMsg);
        }
        if (!selectedPayDate) {
            const errMsg = t('JSE001').replace('%s', t('Pay Date'))
            errMsgAll.push(errMsg);
        }
        if(allowanceAmount !== "" && !validateIntegerOnly(allowanceAmount)){
            const errMsg = t('JSE005').replace('%s', t('Allowance amount'));
            errMsgAll.push(errMsg);
        }else if(allowanceAmount > 2147483647){
            const errMsg = t('JSE002').replace('%s', t('Allowance amount')).replace('%s', 2147483647);
            errMsgAll.push(errMsg);
        }
        if (errMsgAll.length > 0) {
            setError(errMsgAll);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setContent(t('Are you sure want to save?')); setType('save');
            setShowModalBox(!showModalBox);
            setError([]);
            setSuccess([]);
        }
    }
    const saveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id;
        })
        let params = {
            "employee_id": emp_data,
            "allowance_id": allowanceID,
            "sub_allowance_id": subAllowanceID,
            "allowance_paid_date": Moment(selectedPayDate).format('YYYY-MM-DD'),
            "allowance_amount": allowanceAmount,
            "company_id": ApiPath.companyID, // login data from erp 
            "updated_emp": ApiPath.updatedEmp,   // login data from erp 
            "language": ApiPath.lang
        };
        let url = '', method = '';
        if (!editData) { //REGISTER MODE
            params = { ...params, "created_emp": ApiPath.createdEmp };
            url = ApiPath.EmployeeAllowanceRegistrationSave;
            method = 'post';
        } else {
            url = ApiPath.EmployeeAllowanceRegistration + editData;
            method = 'put';
        };
        let obj = { package_name: 'hr', url: url, method: method, params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            if (response?.data?.status === 422) {
                setError(response.message);
                setSuccess([]);
            }
            else if(response.data.data?.status === "NG") {
                setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
                setShowModalBox(true);
                setSuccess([]);
            }
        } else {
            cancelData();
            setSuccess([response.data.message]);
        };
    }

    /** Start Overwrite Save Function */
    const owsaveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        });
        let params = {
            "employee_id": emp_data,
            "allowance_id": allowanceID,
            "sub_allowance_id": subAllowanceID,
            "allowance_paid_date": Moment(selectedPayDate).format('YYYY-MM-DD'),
            "allowance_amount": allowanceAmount,
            "company_id": ApiPath.companyID, // login data from erp 
            "created_emp": ApiPath.createdEmp,  // login data from erp 
            "updated_emp": ApiPath.updatedEmp,   // login data from erp 
            "language": ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.EmployeeAllowanceRegistrationOverwritesave, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
        } else {
            cancelData();
            setSuccess([response.data.message]);
        };
    }


    return (
        <CRow className="employeeAllowanceRegistration">
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
                    owsaveOK={owsaveOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="pageTitle"><label>{t('Employee Allowance Registration')}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchEmployeeAllowanceRegistration
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
                            searchAPI={searchAPI}
                            editData={editData}
                            viewPermissionAPI={viewPermissionAPI}
                            ViewPermision={ViewPermision}
                        ></SearchEmployeeAllowanceRegistration>
                        <EmployeeAllowanceRegistrationTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            editData={editData}
                            removeRow={removeRow}
                        />
                        <EmployeeAllowanceRegistrationForm
                            mainTable={mainTable}
                            editData={editData}
                            selectedPayDate={selectedPayDate}
                            handlePayDateChange={handlePayDateChange}
                            allowanceAPI={allowanceAPI}
                            selectAllowanceID={allowanceID}
                            subAllowanceAPI={subAllowanceAPI}
                            handleChangeAllowance={handleChangeAllowance}
                            selectSubAllowanceID={subAllowanceID}
                            handleChangeSubAllowance={handleChangeSubAllowance}
                            allowanceAmount={allowanceAmount}
                            handleChangeAllowanceAmount={handleChangeAllowanceAmount}
                            currencyName={currencyName}
                        />
                        <SaveCancelEmployeeAllowanceRegistration
                            mainTable={mainTable}
                            saveData={saveData}
                            cancelData={cancelData}
                        ></SaveCancelEmployeeAllowanceRegistration>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeOvertimeRegistration() {
    return (
        <Welcome />
    )
}
