/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLabel,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import message from '../../hr-common/common-message/CommonMessage';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import $ from 'jquery';
import FormData from './FormData';
import TableData from './TableData';
import SaveData from './SaveData';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [error,setError]                          = useState([]); // For Error Message
    const [error2,setError2]                        = useState([]); // For Error2 Message
    const [success,setSuccess]                      = useState([]); // For Success Message
    const [loading, setLoading]                     = useState(false); // For Loading
    const [dednameAPI,setDedNameAPI]                = useState([]); // For Deduction Name API
    const [dedName,setDedName]                      = useState(""); // For Deduction Name id
    const [decateAPI,setDecateAPI]                  = useState([]); // For Deduction Category API
    const [deCate,setDeCate]                        = useState("3"); // For Deduction Category id 
    const [deType,setDeType]                        = useState("1"); // For Deduction Type 1= Percentage, 2= Amount
    const [deCount,setDeCount]                      = useState(""); // For Deduction Count
    const [dePeriod,setDePeriod]                    = useState("1"); // For Deduction Period 1= Customized, 2= EveryMonth
    const [deMonth,setDeMonth]                      = useState(""); // For Deduction Period Month
    const [dePeriodMethod,setDePeriodMethod]        = useState({isChecked: false}); // use for Deduction Period Method
    const [method, setMethod]                       = useState('deMethod'); // For Deduction Method
    const [label1, setLabel1]                       = useState('Customized Percentage'); //For Label1
    const [label2, setLabel2]                       = useState('Equal Percentage'); // For Label2
    const [deTable, setDeTable]                     = useState([]); // For Deduction Period Table
    const [deEqual, setDeEqual]                     = useState(""); // For Deduction Period Equal Amt or % value
    const [deInstallType, setDeInstallType]         = useState(""); // For Deduction Installment Type
    const [deEveryMonth, setDeEveryMonth]           = useState(""); // For Deduction Period Every Month value
    const [deductionDate, setDeductionDate]         = useState(()=>ChangeDate(new Date())); // For Deduction Date
    const [deReason, setDeReason]                   = useState(""); // For Deduction Reason
    const [deCalculateMethod,setDeCalculateMethod]  = useState({isChecked: true}); // use for Deduction Calculate Method
    const [calMethod, setCalMethod]                 = useState('deCalMethod'); // For Deduction Calculate Method
    const [selectedFromDate, setSelectedFromDate]   = useState(()=>ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate]       = useState(()=>ChangeDate(new Date())); // For Joined End Date
    const [departmentAPI, setDepartmentAPI]         = useState([]);   // For Dept API
    const [deptState, setDeptState]                 = useState("");   // For department id
    const [positionAPI, setPositionAPI]             = useState([]);   // For Position API
    const [positionState, setpositionState]         = useState("");   // For position id
    const [empId, setEmpId]                         = useState("");   // For employee id dropdown toggle
    const [autocompleteID, setAutocompleteID]       = useState([]);   // For Autocomplete EMP ID
    const [empCode, setEmpCode]                     = useState("");   // For employee code dropdown toggle
    const [autocompleteCode, setAutocompleteCode]   = useState([]);   // For Autocomplete EMP CODE
    const [empName, setEmpName]                     = useState("");   // For employee name dropdown toggle
    const [autocompleteName, setAutocompleteName]   = useState([]);   // For Autocomplete EMP NAME
    const [clearData, setClearData]                 = useState("");
    const [mainTable, setMainTable]                 = useState([]);   // For Main table 
    const [rowCount , setRowCount]                  = useState("");   // For row count
    const [content, setContent]                     = useState("");   // For Confirmation box
    const [type, setType]                           = useState("");   // For Confirmation box
    const [show, setShow]                           = useState(false);// For show/hide confirmation box
    const [editID, setEditID]                       = useState(""); // For Edit Data
    const [otherDeductionID, setOtherDeductionID]   = useState(""); // For Deduction ID from Edit Data
    const [ loginID, setLoginID ]                   = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]               = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Start Form Load */
useEffect(() => {
    setLoading(true);
    $(".perCust").addClass('btnGroup2');
    loadDept();loadPosition();
    loadDeductionName(); loadDeductionCate();

    let id = JSON.parse(localStorage.getItem('DEDUCTION_ID'));
    localStorage.removeItem('DEDUCTION_ID');
    // let id=2;
    (id === '' || id === null) ? setEditID(id) : get_edit_data(id);
},[]);
/** End Form Load */

useEffect(()=> {
  if(clearData !== ''){
    setAutocompleteID([]); setAutocompleteName([]); setAutocompleteCode([]);
  }
},[clearData]);

/** Autocomplete Employee ID, Code, Name Function */
const changeAutocomplete = async (type, i) => {
    setError([]); setSuccess([]); setClearData('');

    // type is id, show name in Employee ID and clear remain input
    if(type === 'id'){
        setEmpId(i.target.value); setEmpCode(''); setEmpName('');
    }
    // type is code, show name in Employee Code and clear remain input
    else if(type === 'code') {
        setEmpId(''); setEmpCode(i.target.value); setEmpName('');
    }
    // type is name, show name in Employee Name and clear remain input
    else{
        setEmpId(''); setEmpCode(''); setEmpName(i.target.value);
    }

    // if empty, remove data from autocomplete
    if(i.target.value === ''){
        setClearData('clear');
    }else{
        let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError(response.message); setClearData('clear');
        }else{
            (type === 'id') ? setAutocompleteID(response.data.data) :
            (type === 'code') ? setAutocompleteCode(response.data.data) : setAutocompleteName(response.data.data);
        }
    }
}

const selectAutocomplete = async (val, obj) => {
    setClearData('clear');
    let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
    let response = await ApiRequest(object);
    if(response.flag === false){
        setError(response.message);
    }else{
        if(response.data.data[0].employee_id !== null){setEmpId(response.data.data[0].employee_id)}else{setEmpId('')}
        if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
        if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
    }
}

/** Get All Departments From ERP Database */
const loadDept = async () => {
    let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDepartmentAPI([]): setDepartmentAPI(response.data.data);
    setLoading(false);
}
let deptChange = (e) =>{ setDeptState(e.target.value); }

/** Get All Positions From ERP Database */
const loadPosition = async () => {
    let obj = { url: 'api/admin-level', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setPositionAPI([]): setPositionAPI(response.data.data);
    setLoading(false);
}
const positionChange = (e) =>{ setpositionState(e.target.value); }

/** Get All Deduction Category From Database */
const loadDeductionCate = async () => {
    let obj = { url: 'api/get-deduction-category-list', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDecateAPI([]): setDecateAPI(response.data.data);
    setLoading(false);
}

/** Get All Deduction Name From Database */
const loadDeductionName = async () => {
    let obj = { url: 'api/get-deduction-name-list', method: 'post', params:{'company_id':companyID} }
    let response = await ApiRequest(obj);
    response.flag === false ? setDedNameAPI([]): setDedNameAPI(response.data.data);
    setLoading(false);
}
/** Deduction Name Change Function */
const dedNameChange = async(e)=>{
    setLoading(true);
    let id = e.target.value;
    if(id != ""){
        setDedName(e.target.value);
        let obj = {
            "method":"post","url":"api/employee-deduction-request/selectDeductionName",
            "params": {
              "company_id" :companyID,
              "deduction_rule_id":id
            }
        }
        let response = await ApiRequest(obj);setLoading(false);
        if(response.flag == false){ // catch error
            setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status === 'OK'){
                let data = response.data.data;
                setDeCate(data.category_id);
                setDeType(data.deduction_type);
                if(data.deduction_type == "1"){
                    setLabel1('Customized Percentage');setLabel2('Equal Percentage');
                }
                if(data.deduction_type == "2"){
                    setLabel1('Customized Amount');setLabel2('Equal Amount');
                }
                setDeCount(data.deduction_count);
                if(data.deduction_period == "1"){
                    $(".perCust").addClass('btnGroup2');$(".perEvery").removeClass('btnGroup2');
                }else{
                    $(".perEvery").addClass('btnGroup2');$(".perCust").removeClass('btnGroup2');
                }
                setDePeriod(data.deduction_period);
                setDeMonth(data.deduction_month);
                setDeTable(data.deduction_installment);
                setDeInstallType(data.deduction_installment_type);
                if(data.deduction_installment_type == "2"){
                    setDePeriodMethod( { isChecked: !dePeriodMethod.isChecked } );
                }
                setDeEqual(data.deduction_installment[0]['deduction']);
                setDeEveryMonth(data.deduction_installment[0]['deduction']);
            }else{
                setSuccess([]);setError(response.data.message);
            }
        }
    }else{
        setLoading(false);
        setError([]);setError2([]);setSuccess([]);
        setDedName('');setDeCate("3");setDeType("1");setDeCount('');setDePeriod("1");setDeMonth('');setDePeriodMethod(false);
        setDeTable([]);setDeEqual('');setDeEveryMonth('');setDeductionDate(()=>ChangeDate(new Date()));
        setDeReason('');setDeptState('');setpositionState('');
        setEmpId('');setEmpCode('');setEmpName('');setMainTable([]);
    }
}
const cateNameChange =(e)=>{
  setDeCate(e.target.value);
}
const deMethodChecked = () => {
  setDePeriodMethod( { isChecked: !dePeriodMethod.isChecked } );
}
const changeReason =(e)=>{
  setDeReason(e.target.value);
}
const deCalculateMethodChecked = () => {
  setDeCalculateMethod( { isChecked: !deCalculateMethod.isChecked } );
}

/** Search Function */
const searchAPI=async()=>{
    let errMsg = [];
    if(!checkNullOrBlank(selectedFromDate)){let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str); }   
    if(!checkNullOrBlank(selectedToDate)){let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str);}    
    if(selectedFromDate > selectedToDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setLoading(true);
        setError([]);setSuccess([]);setMainTable([]);
        let search = {
            method:"post",
            url: "api/employee-deduction-request/search",
            params: {
                "login_id": loginID,
                "company_id": companyID,
                "employee_id": empId,
                "employee_code": empCode,
                "employee_name": empName,
                "department_id": deptState,
                "join_from_date": selectedFromDate, 
                "join_to_date": selectedToDate,
                "role_id": positionState,
            }
        } 
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
          setMainTable([]); setError(response.message);
          window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            setRowCount(response.data.data.length);
            // setRowCount(response.data.row_count); 
            setMainTable(response.data.data);
        }
    }
}

/**  Remove Function */
const remove = (id) => {
    let data = mainTable.filter(data=>{
        if(data.employee_id !== id ){return data;}
    });
    setMainTable(data);
    let total =  rowCount - 1; setRowCount(total);
}

/** Save Function */
const saveAllData = ()=>{
    let errMsg = [];
    if(!checkNullOrBlank(dedName)){let str = t(message.JSE001).replace('%s',t('Deduction Name'));errMsg.push(str); }
    if(!checkNullOrBlank(deductionDate)){let str = t(message.JSE005).replace('%s',t('Deduction Date'));errMsg.push(str); }
    if(!checkNullOrBlank(deReason)){let str = t(message.JSE005).replace('%s',t('Deduction Reason'));errMsg.push(str); }
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setError2([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(editID === "" || editID === null){
            setError([]);setSuccess([]);setError2([]);
            setShow(!show);setContent('Are you sure want to save?');setType('save'); 
        }else{
            setError([]);setSuccess([]);setError2([]);
            setShow(!show);setContent('Are you sure want to update?');setType('save');
        }
    }
}
const saveOK = async() =>{
    setShow(!show);setLoading(true);setError([]);setError2([]);setSuccess([]);
    if(editID === null || editID === ""){ // register mode
        let idArr = [];
        for(let i = 0; i < mainTable.length; i++){
            idArr.push(mainTable[i].employee_id);
        }
        let savedata = {
          method:"post", url:"api/employee-deduction-request/save",
          params: {
            "company_id" : companyID,
            "login_id": loginID,
            "employee_id_array": idArr,
            "deduction_rule_id": dedName,
            "deduction_date": deductionDate,
            "deduction_reason": deReason,
          }
        }
        let response = await ApiRequest(savedata);setLoading(false);
        if(response.flag == false){ 
            setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status === 'OK'){
                setSuccess([response.data.message]);setError([]);
                setDedName("");setDeCate("3");setDeType("1");
                setDeCount("");setDePeriod("1");setDeMonth("");
                setDePeriodMethod({isChecked: false});setDeTable([]);setDeEqual("");
                setDeInstallType("");setDeEveryMonth("");
                setDeductionDate(()=>ChangeDate(new Date()));
                setDeReason("");setDeCalculateMethod({isChecked: true});
                setSelectedFromDate(()=>ChangeDate(new Date()));
                setSelectedToDate(()=>ChangeDate(new Date()));
                setDeptState("");setpositionState("");
                setEmpId("");setEmpCode("");setEmpName("");setMainTable([]);setEditID(null);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        }
    }else{ // update mode
        let updatedata = {
            method:"post", url:"api/employee-deduction-request/update",
            params: {
                "company_id" : companyID,
                "login_id": loginID,
                "employee_other_deduction_setting_id": otherDeductionID,
                "employee_id": empId,
                "deduction_rule_id": dedName,
                "deduction_date": deductionDate,
                "deduction_reason": deReason,
            }
        }
        let response = await ApiRequest(updatedata);setLoading(false);
        if(response.flag == false){ 
            setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status === 'OK'){
                setSuccess([response.data.message]);setError([]);
                setDedName("");setDeCate("3");setDeType("1");
                setDeCount("");setDePeriod("1");setDeMonth("");
                setDePeriodMethod({isChecked: false});setDeTable([]);setDeEqual("");
                setDeInstallType("");setDeEveryMonth("");
                setDeductionDate(()=>ChangeDate(new Date()));
                setDeReason("");setDeCalculateMethod({isChecked: true});
                setSelectedFromDate(()=>ChangeDate(new Date()));
                setSelectedToDate(()=>ChangeDate(new Date()));
                setDeptState("");setpositionState("");
                setEmpId("");setEmpCode("");setEmpName("");setMainTable([]);setEditID(null);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        }
    }
}

/** Edit Data from List */
const get_edit_data = async(id)=>{
    setLoading(true); setEditID(id); let emp_data = [];
    let obj = { url: `api/employee-deduction-request-list/edit`, method: 'post', 
        params:{
            "employee_deduction_requset_id": id,
            "login_id": loginID,
            "company_id": companyID
        } 
    }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setOtherDeductionID(response.data.employee_other_deduction_setting_id);
        setDedName(response.data.deduction_rule_id);
        setDeCate(response.data.deduction_category_id);
        setDeType(response.data.deduction_type);
        if(response.data.deduction_type == 2){
            setLabel1('Customized Amount');setLabel2('Equal Amount');
        }
        setDeCount(response.data.deduction_count);
        if(response.data.deduction_period == 1){
            $(".perCust").addClass('btnGroup2');$(".perEvery").removeClass('btnGroup2');
        }else{
            $(".perEvery").addClass('btnGroup2');$(".perCust").removeClass('btnGroup2');
        }
        setDePeriod(response.data.deduction_period);
        setDeMonth(response.data.deduction_month);
        setDeTable(response.data.deduction_installment);
        setDeInstallType(response.data.deduction_installment_type);
        if(response.data.deduction_installment_type == 2){
            setDePeriodMethod( { isChecked: !dePeriodMethod.isChecked } );
            setDeTable([]);
        }
        setDeEqual(response.data.deduction_installment[0]['deduction']);
        setDeEveryMonth(response.data.deduction_installment[0]['deduction']);
        setDeductionDate(response.data.deduction_date);
        setDeReason(response.data.deduction_reason);
        if(response.data.deduction_cal_method == 2){
            setDeCalculateMethod( { isChecked: !deCalculateMethod.isChecked } );
        }
        setEmpId(response.data.employee_id);
        emp_data.push({
            "employee_id": response.data.employee_id,
            "employee_code": response.data.employee_code,
            "employee_name": response.data.employee_name,
            "departments": response.data.departments,
            "join_date": response.data.join_date,
        })
        setMainTable(emp_data);
    }
}

/** Cancel Function */
const cancelAllData = ()=>{
  setError([]);setError2([]);setSuccess([]);
  setDedName('');setDeCate("3");setDeType("1");setDeCount('');setDePeriod("1");setDeMonth('');setDePeriodMethod(false);
  setDeTable([]);setDeEqual('');setDeEveryMonth('');setDeductionDate(()=>ChangeDate(new Date()));
  setDeReason('');setDeCalculateMethod({isChecked: true});
  setSelectedFromDate(()=>ChangeDate(new Date()));setSelectedToDate(()=>ChangeDate(new Date()));
  setDeptState('');setpositionState('');
  setEmpId('');setEmpCode('');setEmpName('');setMainTable([]);setEditID(null);
}

  return (
  <CRow>
    <CCol xs="12">
      <Loading start={loading} />
      <Message success={success} error={error} error2={[]} />
      <CCard>
        <CCardHeader>
          <h5><CLabel className="m-0">{t('Employee Deduction Request')}</CLabel></h5>
        </CCardHeader>
        <CCardBody>
          <FormData
            dednameAPI={dednameAPI} dedName={dedName} dedNameChange={dedNameChange}
            decateAPI={decateAPI} deCate={deCate} cateNameChange={cateNameChange}
            deType={deType} deCount={deCount} dePeriod={dePeriod} deMonth={deMonth}
            label1={label1} label2={label2}
            methodCheck={dePeriodMethod.isChecked} changeMethod={deMethodChecked.bind(this)}
            dePeriodMethod={dePeriodMethod.isChecked} method={method}
            deTable={deTable} deEqual={deEqual} deEveryMonth={deEveryMonth}
            deductionDate={deductionDate} changeDate={i=>setDeductionDate(ChangeDate(i))}
            deReason={deReason} changeReason={changeReason}
            calmethod1={t('All')} calmethod2={t('Individual')}
            calculateCheck={deCalculateMethod.isChecked} changeCalculateMethod={deCalculateMethodChecked.bind(this)}
            calMethod={calMethod} deCalculateMethod={deCalculateMethod}
            selectedFromDate={selectedFromDate} changeFromDate={i=>setSelectedFromDate(ChangeDate(i))}
            selectedToDate={selectedToDate} changeToDate={i=>setSelectedToDate(ChangeDate(i))}
            departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
            positionAPI={positionAPI} positionState={positionState} positionChange={positionChange}
            changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete}
            empId={empId} empCode={empCode} empName={empName}
            autocompleteID={autocompleteID} autocompleteCode={autocompleteCode} autocompleteName={autocompleteName}
            searchAPI={searchAPI} editID={editID} deInstallType={deInstallType}
          />
          <TableData 
            calculateCheck={deCalculateMethod.isChecked}
            mainTable={mainTable} rowCount={rowCount} remove={remove} editID={editID}
          />
          <SaveData
            calculateCheck={deCalculateMethod.isChecked} mainTable={mainTable}
            saveAllData={saveAllData} cancelAllData={cancelAllData} editID={editID}
          />
          <Confirmation
            content={content} okButton={t('OK')} cancelButton={t('Cancel')} 
            type={type} show={show} cancel={()=>setShow(!show)} saveOK={saveOK}
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  );
}
export default withTranslation()(LegacyWelcomeClass);