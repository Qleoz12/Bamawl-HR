/* eslint-disable no-use-before-define */
import React, { useState, useEffect, useRef } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from "@coreui/react";
import { withTranslation } from "react-i18next";
import {
    validateNumberOnly
} from "../../../hr/hr-common/common-validation/CommonValidation";
import Moment from "moment";
import httpStatus from '../../../../common-const/commonStatusCode';
import $ from 'jquery';
import SearchPayrollRuleCalculationMethodSetup from './SearchPayrollRuleCalculationMethodSetup';
import PayrollRuleCalculationMethodSetupTable from './PayrollRuleCalculationMethodSetupTable';
import SaveCancelPayrollRuleCalculationMethodSetup from './SaveCancelPayrollRuleCalculationMethodSetup';
import PayrollCaculationMethodSetupSalaryCaculate from './PayrollCaculationMethodSetupSalaryCaculate';
import PayrollCaculationMethodSetupSetupPayroll from './PayrollCaculationMethodSetupSetupPayroll';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {

    const [departmentAPI, setDepartmentAPI] = useState([]);    // For Dept API
    const [deptState, setDeptState] = useState('');    // For department dropdown toggle
    const [roleState, setRoleState] = useState('');    // For role dropdown toggle
    // const [joinStartDate, setJoinStartDate] = useState(t('From Date')); //for show From Date Search
    // const [joinEndDate, setJoinEndDate] = useState(t('To Date'));   //for show To Date Search
    const [allCurrency, setAllCurrency] = useState([]);    // for currency API
    const [calCulateBaseOnMethodAPI, setCalCulateBaseOnMethodAPI] = useState([]);    // for calculation base on method API
    const [selectedFromDate, setSelectedFromDate] = useState(null);  // For Joined Start Date
    const [selectedToDate, setSelectedToDate] = useState(null);  // For Joined End Date
    const [rowCount, setRowCount] = useState();      // For row count
    const [mainTable, setMainTable] = useState([]);    // for table list
    const [editData, setEditData] = useState(null);  // for Edit data
    const [swithFirstDay, setSwithFirstDay] = useState(false); // for switch First day to last day
    const [switchCreation, setSwitchCreation] = useState(false); // for switch Creation
    const [salaryCalculationDayStart, setSalaryCalculationDayStart] = useState("");    // for select day form
    const [salaryCalculationDayEnd, setSalaryCalculationDayEnd] = useState("");    // for select day to
    const [bankPaymentDate, setBankPaymentDate] = useState(0);     // for bank payment date
    const [currencyID, setCurrentcyID] = useState(null);  // for currency ID
    const [calculateMethodID, setCalculateMethodID] = useState("");    // for select Calculate Method
    const [bankPaymentDateModal, setBankPaymentDateModal] = useState(false); // for popup modal bank payment date
    const [error, setError] = useState([]);    // for show messenge error
    const [success, setSuccess] = useState("");    // for show messenge success
    const [loading, setLoading] = useState(false);
    const [collapseSalary, setCollapseSalary] = useState(false)  // for collapse Payroll Calculation Method
    const [collapsePayroll, setCollapsePayroll] = useState(false)  // for collapse Salary Calculate Day Range (days) 
    const [fDivisor, setFDivisor] = useState("");    // for divisor hour
    const [bankPaymentDateShow, setBankPaymentDateShow] = useState("");    // for show bank payment date when select payment date
    const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [showModalBox, setShowModalBox] = useState(false);// For show/hide confirmation box
    const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For View_Permission API
    const elementFocus = useRef(null);
    //create const

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
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
    * If clearData is changed, remove array in autocomplete
    *
    * @author  dh_khanh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    /** Form Load */
    useEffect(() => {
        loadViewPermission();
        let edit_Data = JSON.parse(sessionStorage.getItem('RETURN_PRCMS_DATA')); // return data from Payroll Calculation List
        sessionStorage.removeItem('RETURN_PRCMS_DATA');
        setLoading(true);
        loadRole(edit_Data); loadDept(edit_Data); loadCurrency(edit_Data); loadCalculateBaseOnMethod(edit_Data);
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
    /**
    * change autocomplete
    *
    * @author  dh_khanh
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
    * @author  dh_khanh
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

    /* GET ROLE SELECT BOX */
    const [roleAPI, setRoleAPI] = useState([]);
    const loadRole = async (edit_Data) => {
        let url = `${ApiPath.adminLevels}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
    }

    let roleChange = (e) => {
        setRoleState(e.target.value);
    }

    /* GET DEPARTMENT SELECT BOX */
    const loadDept = async (edit_Data) => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    }
    let deptChange = (e) => {
        setDeptState(e.target.value);
    }

    const loadCurrency = async (edit_Data) => {
        let obj = { package_name: 'hr', url: ApiPath.currencies, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        if (response.flag === false) {
            setAllCurrency([]);
        } else {
            let data = response.data.data;
            setAllCurrency(data);
            if (edit_Data == null) {
                setCurrentcyID(data[0]['id']);
            }
        }
    }

    const loadCalculateBaseOnMethod = async (edit_Data) => {
        let url = `${ApiPath.PayrollRuleCalculationMeThodSetupGetCalculateMethod}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (edit_Data == null) setLoading(false);
        if (response.flag === false) {
            setCalCulateBaseOnMethodAPI([]);
        } else {
            let data = response.data.data;
            setCalCulateBaseOnMethodAPI(data);
            if (edit_Data == null) {
                setCalculateMethodID(data[0]['id']);
            }
        }
    }
    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };

    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };

    let handleChangeCollapseSalary = () => {
        setCollapseSalary(!collapseSalary);
    }

    let handleChangeCollapsePayroll = () => {
        setCollapsePayroll(!collapsePayroll);
    }

    let handleChangeSwitchFirstDay = () => {
        setSwithFirstDay(!swithFirstDay);
    }

    let handleChangeSwitchCreation = () => {
        setSwitchCreation(!switchCreation);
    }

    let handleChangeBankPaymentDate = (e) => {
        setBankPaymentDate(Number(e.target.value));
    }

    let handleCalculateMethodChange = (e) => {
        setCalculateMethodID(Number(e.target.value));
        if (Number(e.target.value) !== 2) {
            // setFDivisor("");
        } else if (elementFocus.current) {
            elementFocus.current.focus();
        }
    }

    let handleChangeCurrency = (e) => {
        setCurrentcyID(Number(e.target.value));
    }

    let handleChangeSalaryCalculationDayStart = (e) => {
        setSalaryCalculationDayStart(Number(e.target.value));
    }

    let handleChangeSalaryCalculationDayEnd = (e) => {
        setSalaryCalculationDayEnd(Number(e.target.value));
    }

    let handleChangeFDivisor = (e) => {
        if (validateNumberOnly(e.target.value) || e.target.value === "") {
            setFDivisor(e.target.value);
        }
    }

    const clearAllBeforeSearch = () => {
        setError([]);
        setSuccess("");
    }

    /** Start Search Function */
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
            setSuccess([]);
        } else if (toDate != null && fromDate == null) {
            let errMsg = t('JSE001').replace('%s', t('From Date'));
            setError([errMsg]);
            setSuccess([]);
        } else if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
            setError([errMsg]);
            setSuccess([]);
        } else {
            setError([]);
            setSuccess([]);
            searchPayrollRuleCalculationMethod(fromDate, toDate);
        }
    }

    const searchPayrollRuleCalculationMethod = async (fromDate, toDate) => {
        setLoading(true);
        let params = {
            "company_id": ApiPath.companyID,
            "role_id": roleState,
            "employee_id": employeeID,
            "employee_name": employeeName,
            "employee_code": employeeCode,
            "department_id": deptState,
            "from_date": fromDate,
            "to_date": toDate,
            "language": ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.PayrollRuleCalculationMeThodSetupSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setMainTable([]);
        } else {
            setRowCount(response.data.data.length);
            setMainTable(response.data.data);
            setError([]);
            setSuccess([]);
        };
    }
    /** End Search Function */

    let saveData = () => {
        let errMsgAll = [];
        if (swithFirstDay) {
            // salaryCalculationDayStart = 0 || salaryCalculationDayStart === "" is null
            if (salaryCalculationDayStart === "" || salaryCalculationDayStart === 0) {
                const errMsg = t('JSE001').replace('%s', t('From Date')) + ' ' + t('Salary Calculate Day Range (days)');
                errMsgAll.push(errMsg);
            };
            // salaryCalculationDayEnd = 0 || salaryCalculationDayEnd === "" is null
            if (salaryCalculationDayEnd === "" || salaryCalculationDayEnd === 0) {
                const errMsg = t('JSE001').replace('%s', t('To Date')) + ' ' + t('Salary Calculate Day Range (days)');
                errMsgAll.push(errMsg);
            };
        };
        // bankPaymentDate = 0 is null
        if (bankPaymentDate === 0) {
            const errMsg = t('JSE001').replace('%s', t('Bank Payment Date'));
            errMsgAll.push(errMsg);
        };
        if (currencyID === null) {
            const errMsg = t('JSE001').replace('%s', t('Payment Type'));
            errMsgAll.push(errMsg);
        };
        if (calculateMethodID === "") {
            const errMsg = t('JSE001').replace('%s', t('Calculation method'));
            errMsgAll.push(errMsg);
        };
        if (calculateMethodID === 2 && fDivisor === "") {
            const errMsg = t('JSE124').replace('%s', t('Division Hour'));
            errMsgAll.push(errMsg);
        };
        if (errMsgAll.length > 0) {
            setError([...errMsgAll]);
            setSuccess('');
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setContent(t('Are you sure want to save?')); setType('save');
            setShowModalBox(!showModalBox);
            setError([]);
            setSuccess([]);
        };
    }
    const saveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        });
        let params = {
            "employee_id": emp_data,
            "end_offdays_month": swithFirstDay ? 2 : 1,
            "salary_calculation_day_start": swithFirstDay ? salaryCalculationDayStart : "",
            "salary_calculation_day_end": swithFirstDay ? salaryCalculationDayEnd : "",
            "basic_salary_create": switchCreation ? 2 : 1,
            "salary_pay_date": bankPaymentDate,
            "calculate_method_id": calculateMethodID,
            "currency_id": currencyID,
            "f_divisor": calculateMethodID === 2 ? Number(fDivisor) : null,
            "company_id": ApiPath.companyID, // login data from erp
            "updated_emp": ApiPath.updatedEmp,   // login data from erp
            "language": ApiPath.lang
        };
        let url = '', method = '';
        if (!editData) { //REGISTER MODE
            params = { ...params, "created_emp": ApiPath.createdEmp };
            url = ApiPath.PayrollRuleCalculationMeThodSetupSave;
            method = 'post';
        } else {
            url = ApiPath.PayrollRuleCalculationMeThodSetup + editData;
            method = 'put';
        };
        let obj = { package_name: 'hr', url: url, method: method, params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            // if (!editData && response.data?.data?.status === "NG") {
            //     setContent(t('Data is already exist! Are you sure want to overwrite this employees?')); setType('owsave');
            //     setShowModalBox(true);
            //     setSuccess([]);
            // } else {
            //     setError(response.message);
            //     setSuccess([]);
            // };
            if (response?.data?.status === httpStatus.UNPROCESSABLE_ENTITY) {
                setError(response.message);
                setSuccess([]);
            }
            else {
                setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
                setShowModalBox(true);
                setSuccess([]);
            }
        } else {
            cancelData();
            setSuccess([response.data.message]);
        };
    }

    const owsaveOK = async () => {
        setShowModalBox(!showModalBox);
        setLoading(true);
        let emp_data = [];
        mainTable.forEach((main, index) => {
            emp_data[index] = main.employee_id
        });
        let params = {
            "employee_id": emp_data,
            "end_offdays_month": swithFirstDay ? 2 : 1,
            "salary_calculation_day_start": swithFirstDay ? salaryCalculationDayStart : "",
            "salary_calculation_day_end": swithFirstDay ? salaryCalculationDayEnd : "",
            "basic_salary_create": switchCreation ? 2 : 1,
            "salary_pay_date": bankPaymentDate,
            "calculate_method_id": calculateMethodID,
            "currency_id": currencyID,
            "f_divisor": calculateMethodID === 2 ? Number(fDivisor) : null,
            "company_id": ApiPath.companyID, // login data from erp
            "created_emp": ApiPath.createdEmp,  // login data from erp
            "updated_emp": ApiPath.updatedEmp,   // login data from erp
            "language": ApiPath.lang
        };
        let obj = { package_name: 'hr', url: ApiPath.PayrollRuleCalculationMeThodSetupOverwritesave, method: 'post', params };
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

    /** Start Cancel All Data Function */
    let cancelData = () => {
        $('#searchBtn').show();
        setEditData(null);
        setDeptState("");
        setRoleState("");
        setEmployeeID("");
        setEmployeeCode("");
        setEmployeeName("");
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setSwithFirstDay(false);
        setSwitchCreation(false);
        setError([]);
        setSuccess("");
        setCollapsePayroll(false);
        setCollapseSalary(false);
        setSalaryCalculationDayStart("");
        setSalaryCalculationDayEnd("");
        setBankPaymentDate(0);
        setFDivisor("");
        setBankPaymentDateShow("");
        allCurrency.length > 0 && setCurrentcyID(allCurrency[0].id);
        calCulateBaseOnMethodAPI.length > 0 && setCalculateMethodID(calCulateBaseOnMethodAPI[0].id);
    }
    /** Start Click remove function */
    const removeRow = (e) => {
        let result_data = []; // to remove data by click icon
        result_data = mainTable.filter(main => main != e);
        setMainTable(result_data);
        setRowCount(rowCount - 1);
    }

    /** Start Edit Function */
    let editIndex = async (edit_id) => {
        let url = `${ApiPath.PayrollRuleCalculationMeThodSetup}${edit_id}?language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            if (response.data.status === "OK") {
                const data = response.data.data;
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
                            // setJoinStartDate(t('From') + ": " + Moment(empInfo['joined_date'], 'YYYY/MM/DD').format('MM/DD/YYYY'));
                            // setJoinEndDate(t('To') + ": " + Moment(empInfo['joined_date'], 'YYYY/MM/DD').format('MM/DD/YYYY'));
                        }
                        setMainTable(data['erp_info']);
                    }
                    setRoleState(data['admin_level_id']);
                    setBankPaymentDate(data['salary_pay_date'] === null ? '' : data['salary_pay_date']);
                    setBankPaymentDateShow(data['salary_pay_date'] === null ? '' : data['salary_pay_date']);
                    setSwitchCreation(data['basic_salary_create'] === 1 ? false : true);
                    setSwithFirstDay(data['end_offdays_month'] === 1 ? false : true);
                    if (data['calculate_method_id'] === 2) {
                        setFDivisor(data['f_divisor']);
                    }
                    setSalaryCalculationDayStart(data['salary_calculation_day_start']);
                    setSalaryCalculationDayEnd(data['salary_calculation_day_end']);
                    setCurrentcyID(Number(data['currency_id']));
                    setCalculateMethodID(Number(data['calculate_method_id']));
                };
                setCollapsePayroll(true);
                setCollapseSalary(true);
                setError([]);
                setSuccess("");
            } else if (response.data.status === "NG") {
                setError([response.data.message]);
                setSuccess("");
                $('#searchBtn').show();
                setEditData(null);
                setMainTable([]);
            };
        };
    }
    /** End Edit Function */

    const styleSwitchOn = {
        borderBottom: "2px solid blue",
        transition: "color 1s ease",
    }

    const styleSwitchOff = {
        color: "#00000059",
        transition: "border-bottom 1s ease"
    }

    let handleClickBankPaymentDate = () => {
        setBankPaymentDateModal(!bankPaymentDateModal);
    }

    let bankPaymentDateModalOK = () => {
        setBankPaymentDateModal(false);
        bankPaymentDate === 0 ? setBankPaymentDateShow("") : setBankPaymentDateShow(bankPaymentDate);
    }

    let bankPaymentDateModalClose = () => {
        setBankPaymentDateModal(false);
    }

    return (
        <CRow className="payrollRuleCalculationMethodSetup modal-header-custom">
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
                        <h5 id="pageTitle"><label>{t("Payroll Rule Calculation Method Setup")}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchPayrollRuleCalculationMethodSetup
                            departmentAPI={departmentAPI}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
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
                        />
                        <PayrollRuleCalculationMethodSetupTable
                            mainTable={mainTable}
                            rowCount={rowCount}
                            editData={editData}
                            removeRow={removeRow}
                        />
                        <PayrollCaculationMethodSetupSalaryCaculate
                            mainTable={mainTable}
                            saveData={saveData}
                            cancelData={cancelData}
                            collapseSalary={collapseSalary}
                            handleChangeCollapseSalary={handleChangeCollapseSalary}
                            swithFirstDay={swithFirstDay}
                            handleChangeSwitchFirstDay={handleChangeSwitchFirstDay}
                            bankPaymentDate={bankPaymentDate}
                            handleChangeBankPaymentDate={handleChangeBankPaymentDate}
                            switchCreation={switchCreation}
                            handleChangeSwitchCreation={handleChangeSwitchCreation}
                            salaryCalculationDayStart={salaryCalculationDayStart}
                            salaryCalculationDayEnd={salaryCalculationDayEnd}
                            handleChangeSalaryCalculationDayStart={handleChangeSalaryCalculationDayStart}
                            handleChangeSalaryCalculationDayEnd={handleChangeSalaryCalculationDayEnd}
                            styleSwitchOn={styleSwitchOn}
                            styleSwitchOff={styleSwitchOff}
                            bankPaymentDateModal={bankPaymentDateModal}
                            handleClickBankPaymentDate={handleClickBankPaymentDate}
                            bankPaymentDateShow={bankPaymentDateShow}
                            bankPaymentDateModalOK={bankPaymentDateModalOK}
                            bankPaymentDateModalClose={bankPaymentDateModalClose}
                            editData={editData}
                        />
                        <PayrollCaculationMethodSetupSetupPayroll
                            mainTable={mainTable}
                            collapsePayroll={collapsePayroll}
                            handleChangeCollapsePayroll={handleChangeCollapsePayroll}
                            allCurrency={allCurrency}
                            calculateMethodID={calculateMethodID}
                            handleCalculateMethodChange={handleCalculateMethodChange}
                            calCulateBaseOnMethodAPI={calCulateBaseOnMethodAPI}
                            currencyID={currencyID}
                            handleChangeCurrency={handleChangeCurrency}
                            styleSwitchOn={styleSwitchOn}
                            styleSwitchOff={styleSwitchOff}
                            fDivisor={fDivisor}
                            handleChangeFDivisor={handleChangeFDivisor}
                            editData={editData}
                            elementFocus={elementFocus}
                        />
                        <SaveCancelPayrollRuleCalculationMethodSetup
                            mainTable={mainTable}
                            saveData={saveData}
                            cancelData={cancelData}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function PayrollRuleCalculationMethodSetupIndex() {
    return <Welcome />;
}
