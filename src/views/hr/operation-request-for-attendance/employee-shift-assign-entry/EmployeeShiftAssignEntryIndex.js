import React ,{ useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg,CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage'; 
import Moment from 'moment';
import $ from 'jquery';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import EmployeeListData from './EmployeeListData';
import EmpListModal from './EmpListModal';
import ShiftAssignData from './ShiftAssignData';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import CommonAlert from '../../hr-common/common-alert/CommonAlert';

/**
 * Main Component
 * @author Su Pyae Maung
 * @create 24/05/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass({t}) {
    const history                                 = useHistory();   // For edit link
    const [error,setError]                        = useState([]);   // For Error Message
    const [error2,setError2]                      = useState([]);   // For Error2 Message
    const [success,setSuccess]                    = useState([]);   // For Success Message
    const [loading, setLoading]                   = useState(false);// For Loading
    const [departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
    const [deptState, setDeptState]               = useState('');   // For department dropdown toggle
    const [positionAPI, setPositionAPI]           = useState([]);   // For Position API
    const [positionState, setpositionState]       = useState('');   // For position dropdown toggle
    const [empId, setEmpId]                       = useState('');   // For employee id dropdown toggle
    const [autocompleteID, setAutocompleteID]     = useState([]);   // For Autocomplete EMP ID
    const [empCode, setEmpCode]                   = useState('');   // For employee code dropdown toggle
    const [autocompleteCode, setAutocompleteCode] = useState([]);   // For Autocomplete EMP CODE
    const [empName, setEmpName]                   = useState('');   // For employee name dropdown toggle
    const [autocompleteName, setAutocompleteName] = useState([]);   // For Autocomplete EMP NAME
    const [clearData, setClearData]               = useState('');
    const [excFileName, setExcFileName]           = useState('');   // excel file name
    const [excFile, setExcFile]                   = useState('');   // excel file
    const [shiftNameAPI, setShiftNameAPI]         = useState([]);   // For Shift Name API
    const [shiftName, setShiftName]               = useState('');   // For shift name id
    const [selectedFromDate, setSelectedFromDate] = useState(()=>ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate]     = useState(()=>ChangeDate(new Date())); // For Joined End Date
    const [rowCount , setRowCount]                = useState('');   // For row count
    const [content, setContent]                   = useState('');   // For Confirmation box
    const [type, setType]                         = useState('');   // For Confirmation box
    const [show, setShow]                         = useState(false);// For show/hide confirmation box
    
    const [modalBoxShow, setModalBoxShow]           = useState(false); // For show/hide emp list modal box
    const [modalBoxError, setModalBoxError]         = useState([]); // for emp list modal error message
    const [empAllCheck, setEmpAllCheck]             = useState(false); // for employee list modal all check box
    const [empModalData, setEmpModalData]           = useState([]); // for employee list modal data
    const [empDataTable, setEmpDataTable]           = useState([]); // for added employee data

    const [shiftAssignTable, setShiftAssignTable]       = useState([]);   // For Shift Assign Table
    const [ alert, setAlert ] = useState(false); // for common alert
    const [ alertContent, setAlertContent ] = useState(""); // for alert content
    const [ continues, setContinues ] = useState(true); // for alert continues
    const [ overtwriteStatus, setOvertwriteStatus ] = useState(0); // for overtime_status 0 = insert new data
    const [ noAction, setNoAction ] = useState(false); // for confirmation cancel condition
    const [disableAutocomplete, setDisableAutocomplete] = useState(true); 

    const [ loginID, setLoginID ]             = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]         = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Form Load */
useEffect(() => {
    setLoading(true);
    loadDept();loadPosition();
    laodShiftName();
    getPermission();
},[]);

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

/** Get View Permission for employee id,code,name */
const getPermission = async () => {
    let obj = { url: 'api/employee-by-view-permission', method: 'post', params: { companyID, loginID } }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        // setError(response.message);
    }else{
        let object = response.data.data;
        for (const property in object) {
            if(property == loginID && response.data.autocomplete === false){
                setDisableAutocomplete(response.data.autocomplete);
                setEmpId(property);
                setEmpCode(object[loginID].code);
                setEmpName(object[loginID].name_eng);
            }
        }
    }
}

/** Get All Departments From ERP Database */
const loadDept = async () => {
    let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDepartmentAPI([]): setDepartmentAPI(response.data.data);
    setLoading(false);
}
const deptChange = (e) =>{ setDeptState(e.target.value); }

/** Get All Positions From ERP Database */
const loadPosition = async () => {
    let obj = { package_name: 'erp', url: 'api/position/get-all-position', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setPositionAPI([]): setPositionAPI(response.data.data);
    setLoading(false);
}
const positionChange = (e) =>{ setpositionState(e.target.value); }

/** Show Employee List Modal Box Function */
const empListModel = () =>{
    setModalBoxShow(!modalBoxShow);
}
/** Emp Modal Box close Function */
const closeBtn=()=>{
    setModalBoxShow(false);setModalBoxError([]);setEmpAllCheck(false);
    setEmpModalData([]);setEmpId('');setEmpCode('');setEmpName('');setDeptState('');setpositionState('');
}
/** Emp Modal Search Function */
const searchBtn=async()=>{ 
    let errMsg = [];
    // if(!checkNullOrBlank(empId)){let str = t(message.JSE005).replace('%s',t('Employee ID'));errMsg.push(str); }
    if(checkNullOrBlank(errMsg)){
      setModalBoxError(errMsg);setSuccess([]);
    }else{
        setLoading(true);let flag = true;
        setError([]);setSuccess([]);setEmpModalData([]);setError2([]);setModalBoxError([]);
        let search = {
            method:"post",url: "api/employee-shift-assign-entry/search",
            params: {
                "company_id": companyID,
                "employee_id": empId,
                "employee_code": empCode,
                "employee_name": empName,
                "department_id": deptState,
                "position_id": positionState,
                "login_employee_id":loginID ,
                "login_id":loginID
            }
        }
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
            setEmpModalData([]); setModalBoxError(response.message);
        }else{setRowCount(response.data.row_count); setEmpModalData(response.data.data);}
    }
}
/** Employee all checkbox change Function */
const allCheckBoxChange=()=>{
    let Data = empModalData.map(data =>{
        data.is_checked= !empAllCheck
        return data;
    });
    setEmpAllCheck(!empAllCheck);
    setEmpModalData(Data);
}
/** Employee sub checkbox change Function */
const subCheckboxChange=(e)=>{
    let id = e.target.value;
    let data = empModalData.map(main=>{
        if(main.employee_id == id){
            main.is_checked = !main.is_checked;
            return main;
        }
        return main;
    })
    setEmpModalData(data);
    let flag = false;
    data.forEach(data=>{
        if(data.is_checked == false){
            flag = false;
        }
    })
    setEmpAllCheck(flag);
}

/** Add Emp list button Function */
const empAddBtn=()=>{
    let check = false;
    empModalData.forEach(data => {
        if(data.is_checked == true){
            check = true ;
        }
    });
    if(check == false){
        let errmsg = t(message.JSE001).replace('%s', t('Employee Checkbox'));
        setModalBoxError([errmsg]);
        let element = document.getElementById("approver-modal");
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }else{
        setModalBoxError([]);
        let add_emp_data = [];
        empModalData.forEach(data=>{
            if(data.is_checked == true){
                add_emp_data.push(data);
            }
        })
        setEmpDataTable(add_emp_data);closeBtn();
        setEmpAllCheck(false);
    }
}

/** Remove main Employee table Function */
const removeEmp=(id)=>{
    let value = empDataTable.filter(data => data.employee_id != id);
    setEmpDataTable(value);
}

/** Shift Name Change Function */
const laodShiftName = async () => {
    let obj = { url: 'api/shift-normal-rule/list', method: 'post', params:{'company_id':companyID} }
    let response = await ApiRequest(obj);
    response.flag === false ? setShiftNameAPI([]): setShiftNameAPI(response.data.data);
    setLoading(false);
}
const shiftChange = (e) =>{ setShiftName(e.target.value); }

/** Add Shit Date Function */
const addShiftData = async() =>{
    let errMsg = [];
    // let fromDate = null;let toDate = null;
    if(!checkNullOrBlank(shiftName)){let str = t(message.JSE001).replace('%s',t('Shift Name'));errMsg.push(str);}
    if(!checkNullOrBlank(selectedFromDate)){let str = t(message.JSE005).replace('%s',t('From Date'));errMsg.push(str); }   
    if(!checkNullOrBlank(selectedToDate)){let str = t(message.JSE005).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate > selectedToDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setShiftAssignTable([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setLoading(true);setShiftAssignTable([]);
        setError([]);setSuccess([]);setError2([]);
        let search = {
            method:'get',
            url: `api/shift-normal-rule-work-day/shift-work-day/${shiftName}`,
        }
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
            setShiftAssignTable([]); setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            let data = response.data.data; // API return data
            let days =["SUNDAY","MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];
            let start_date = new Date(selectedFromDate);
            let end_date = new Date(selectedToDate);
            let dates = []; 
            while (start_date <= end_date) {
                for(let i=0; i<data.length ; i++){
                    if(data[i]['work_day_name'] == days[start_date.getDay()]){
                        dates = [...dates, new Date(start_date)];
                    }
                }
                start_date.setDate(start_date.getDate() + 1)
                
            }
            let shiftArr = dates.map((k,index)=>{
                let dayName =[];
                dayName['id'] = index;
                dayName['date'] = k.toISOString().slice(0,10);;
                dayName['name'] = days[k.getDay()];
                return dayName;
            })
            setShiftAssignTable(shiftArr); 
        }
    }
}
/** Remove Shift Assign Date table Function */
const removeShift=(id)=>{
    let value = shiftAssignTable.filter(data => data.id != id);
    setShiftAssignTable(value);
}

/** Save Function */
const saveData = () =>{
    let errMsg = [];
    if(!checkNullOrBlank(empDataTable)){let str = t(message.JSE005).replace('%s',t('Employee List'));errMsg.push(str); }
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setError2([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setError([]);setSuccess([]);setError2([]);
        setShow(!show);setContent('Are you sure want to save?');setType('save');
    }
}
const saveOK = async() =>{
    setShow(!show);
    let idArr = [], empIdArr; let dateArr = [];
    for(let i = 0; i < empDataTable.length; i++){
        idArr.push(empDataTable[i].employee_id);
    }empIdArr = idArr.toString();

    for(let i = 0; i < shiftAssignTable.length; i++){
        dateArr.push(shiftAssignTable[i].date);
    }
    setLoading(true);setError([]);setSuccess([]);
    let savedata = {
        method:"post", url:"api/employee-shift-assign-entry",
        params: {
            "company_id" : companyID,
            "employee_id": idArr,
            "shift_normal_rule_id": shiftName,
            "from_date": selectedFromDate,
            "to_date": selectedToDate,
            "assign_date":dateArr,
            "overwrite_status":"0",
            "login_id":loginID,
            "updated_emp":loginID
        }
    }
    let response = await ApiRequest(savedata);setLoading(false);
    if(response.flag === false){
        if(response.data.data.status === 'NG'){
            if(response.data.data.overwrite_flag === false){
                setSuccess([]);setError(response.data.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'}); 
            }else if(response.data.data.overwrite_flag === true){
                setAlert(true);setAlertContent(response.data.data.message); 
            }
        }else{
            setSuccess([]); setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }else{
        if(response.data.status === 'OK'){
            setSuccess([response.data.message]);setError([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
            setEmpDataTable([]);setShiftAssignTable([]);setShiftName('');
            setSelectedFromDate(()=>ChangeDate(new Date()));
            setSelectedToDate(()=>ChangeDate(new Date()));
        }
    }
}

let  alertOkBtn= async()=>{
    setAlert(false);
    let idArr = []; let dateArr = [];
    for(let i = 0; i < empDataTable.length; i++){
        idArr.push(empDataTable[i].employee_id);
    }
    for(let i = 0; i < shiftAssignTable.length; i++){
        dateArr.push(shiftAssignTable[i].date);
    }

    setLoading(true);setError([]);setSuccess([]);
    let savedata = {
        method:"post", url:"api/employee-shift-assign-entry",
        params: {
            "company_id" : companyID,
            "employee_id": idArr,
            "shift_normal_rule_id": shiftName,
            "from_date": selectedFromDate,
            "to_date": selectedToDate,
            "assign_date":dateArr,
            "overwrite_status":"1", // insert new and overwrite data 
            "login_id":loginID,
            "updated_emp":loginID
        }
    }
    let response = await ApiRequest(savedata);setLoading(false);
    if(response.data.status === 'OK'){
        setSuccess([response.data.message]);setError([]);
        setEmpDataTable([]);setShiftAssignTable([]);setShiftName('');
        setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
}
let  alertCancelBtn= async()=>{ // insert new data only not include overwrite data
    setAlert(false);
    let idArr = []; let dateArr = [];
    for(let i = 0; i < empDataTable.length; i++){
        idArr.push(empDataTable[i].employee_id);
    }
    for(let i = 0; i < shiftAssignTable.length; i++){
        dateArr.push(shiftAssignTable[i].date);
    }

    setLoading(true);setError([]);setSuccess([]);
    let savedata = {
        method:"post", url:"api/employee-shift-assign-entry",
        params: {
            "company_id" : companyID,
            "employee_id": idArr,
            "shift_normal_rule_id": shiftName,
            "from_date": selectedFromDate,
            "to_date": selectedToDate,
            "assign_date":dateArr,
            "overwrite_status":"2", // insert new data only not include overwrite data
            "login_id":loginID,
            "updated_emp":loginID
        }
    }
    let response = await ApiRequest(savedata);setLoading(false);
    if(response.data.status === 'OK'){
        setSuccess([response.data.message]);setError([]);
        setEmpDataTable([]);setShiftAssignTable([]);setShiftName('');
        setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
}

/** Start Excel Download Function */
const excelDownload = async() => {
    let errMsg = [];
    if(!checkNullOrBlank(empDataTable)){let str = t(message.JSE005).replace('%s',t('Employee List'));errMsg.push(str); }
    if(!checkNullOrBlank(selectedFromDate)){let str = t(message.JSE005).replace('%s',t('From Date'));errMsg.push(str); }   
    if(!checkNullOrBlank(selectedToDate)){let str = t(message.JSE005).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate > selectedToDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setError2([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setError([]);setSuccess([]);setError2([]);
        setShow(!show);setContent('Are you sure want to Download?');setType('active');
    }
}
const exportconfirmOK = async()=>{
    setShow(!show);setLoading(true);
    let idArr = []; let codeArr = []; let nameArr = []; let deptArr = []; let posArr = [];
    for(let i = 0; i < empDataTable.length; i++){
        for(let j=0; j< empDataTable[i]['departments'].length; j++){
            deptArr.push(empDataTable[i]['departments'][j].department_name); 
        }
        for(let k=0; k< empDataTable[i]['positions'].length; k++){
            posArr.push(empDataTable[i]['positions'][k].position_name); 
        }
        idArr.push(empDataTable[i].employee_id);
        codeArr.push(empDataTable[i].code);
        nameArr.push(empDataTable[i].name_eng);
    }
    let obj={
        method:"post", url:"api/shift-roster-export-excel",
        params:{
            "company_id": companyID,
            "employee_id": idArr,
            "employee_code": codeArr,
            "employee_name": nameArr,
            "department": deptArr,
            "position": posArr,
            "from_date":selectedFromDate,
            "to_date": selectedToDate,
            "login_id": loginID
        },
        type: 'blob',
    }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag == false){ // catch error
        // setError(["Internal Server Error"]);
        setSuccess([]);setError(response.message);setError2([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        let getHeader = response.headers["content-disposition"];
        let tmpName  = getHeader.split('filename=')[1];
        let fileName = tmpName.replace(/['"]+/g, '');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setSuccess(["Successfully Download!"]);window.scrollTo({top:0, left:0, behavior:'smooth'});
        setEmpDataTable([]);setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));
    }
}
/** End Excel Download Function */

/** Start File Import Function */
const clearFile = (i) => {
    i.target.value = null;
}
const importFile = async(i) => {
    let file = i.target.files[0];
    let file_name = i.target.files[0].name;
    setExcFileName(file_name);
    setExcFile(file);
    let  formData  = new FormData();
    formData.append("company_id",companyID);
    formData.append("login_id", loginID);
    formData.append("overwrite_status", "0");
    formData.append("import_file", file);
    let obj = { "method":"post","url": "api/shift-roster-import-excel","params": formData }
    let response = await ApiRequest(obj); setLoading(false);

    if(response.flag === false){
        if(response.data.data.status === 'NG'){
            if(response.data.data.overwrite_flag === false){
                setSuccess([]);setError(response.data.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'}); 
            }else if(response.data.data.overwrite_flag === true){
                setShow(!show);setContent(response.data.data.message);setType('confirm');
                setNoAction(true);
            }
        }else{
            setSuccess([]); setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }else{
        if(response.data.status === 'OK'){
            setSuccess([response.data.message]);setError([]);
            setEmpDataTable([]);setSelectedFromDate(()=>ChangeDate(new Date()));
            setSelectedToDate(()=>ChangeDate(new Date()));
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }
}
const importconfirmOK = async(i) =>{
    setShow(!show);
    let  formData  = new FormData();
    formData.append("company_id",companyID);
    formData.append("login_id", loginID);
    formData.append("overwrite_status", "1");
    formData.append("import_file", excFile);
    let obj = { "method":"post","url": "api/shift-roster-import-excel","params": formData }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.data.status === 'OK'){;
        setSuccess([response.data.message]);setError([]);
        setEmpDataTable([]);setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
}
// const importCancel= async(i)=>{
//     setShow(!show);
//     let  formData  = new FormData();
//     formData.append("company_id", "1");
//     formData.append("login_id", 20001);
//     formData.append("overwrite_status", "2");
//     formData.append("import_file", excFile);
//     let obj = { "method":"post","url": "api/shift-roster-import-excel","params": formData }
//     let response = await ApiRequest(obj); setLoading(false);
//     if(response.data.status === 'OK'){
//         setSuccess([response.data.message]);setError([]);
//         window.scrollTo({top:0, left:0, behavior:'smooth'});
//     }
// }
/** End Import Funtion */

/** Confirmation Cancel Function */
const cancelFuntion = async(i)=>{
    if(noAction == false){
        setShow(!show);
    }else if(noAction == true){
        setShow(!show);
        let  formData  = new FormData();
        formData.append("company_id", companyID);
        formData.append("login_id", loginID);
        formData.append("overwrite_status", "2");
        formData.append("import_file", excFile);
        let obj = { "method":"post","url": "api/shift-roster-import-excel","params": formData }
        let response = await ApiRequest(obj); setLoading(false);
        if(response.data.status === 'OK'){
            setSuccess([response.data.message]);setError([]);
            setEmpDataTable([]);setSelectedFromDate(()=>ChangeDate(new Date()));
            setSelectedToDate(()=>ChangeDate(new Date()));
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }
}

return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={[]} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Employee Shift Assign Entry')}</CLabel></h5></CCardHeader>
            <CCardBody>
                <EmployeeListData
                    empListModel={empListModel}
                    selectedFromDate={selectedFromDate} changeFromDate={i=>setSelectedFromDate(ChangeDate(i))}
                    selectedToDate={selectedToDate} changeToDate={i=>setSelectedToDate(ChangeDate(i))}
                    empDataTable={empDataTable} removeEmp={removeEmp}
                    excelDownload={excelDownload} importFile={importFile} clearFile={clearFile}
                />
                <EmpListModal
                    modalBoxShow={modalBoxShow} modalBoxError={modalBoxError} 
                    disableAutocomplete={disableAutocomplete} rowCount={rowCount}
                    changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete}
                    empId={empId} empCode={empCode} empName={empName}
                    autocompleteID={autocompleteID} autocompleteCode={autocompleteCode} autocompleteName={autocompleteName}
                    departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange} 
                    positionAPI={positionAPI} positionState={positionState} positionChange={positionChange}
                    closeBtn={closeBtn} searchBtn={searchBtn} data={empModalData} 
                    empAllCheck={empAllCheck} allCheckBoxChange={allCheckBoxChange}
                    subCheckboxChange={subCheckboxChange} addBtn={empAddBtn} 
                />
                <ShiftAssignData
                    shiftNameAPI={shiftNameAPI} shiftName={shiftName} shiftChange={shiftChange}
                    addShiftData={addShiftData} shiftAssignTable={shiftAssignTable} 
                    removeShift={removeShift}
                    saveData={saveData}
                />
                <Confirmation
                    content={content} okButton={t('OK')} cancelButton={t('Cancel')} 
                    type={type} show={show} cancel={cancelFuntion} saveOK={saveOK} activeOK={exportconfirmOK} confirmOK={importconfirmOK}
                />
                <CommonAlert show={alert} content={alertContent} okBtn={alertOkBtn} cancelBtn={alertCancelBtn} continues={continues} okButton={alertCancelBtn} />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
export default withTranslation()(LegacyWelcomeClass);