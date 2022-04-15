import React ,{ useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg,CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty,checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage'; 
import Moment from 'moment';
import $ from 'jquery';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import SearchData from './SearchData';
import TableListData from './TableListData';
import Loading from '../../../brycen-common/loading/Loading';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
/**
 * Main Component
 * @author Su Pyae Maung
 * @create 26/04/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass({t}) {
    const history                                 = useHistory();   // For edit link
    const [error,setError]                        = useState([]);   // For Error Message
    const [success,setSuccess]                    = useState([]);   // For Success Message
    const [loading, setLoading]                   = useState(false);// For Loading
    const [departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
    const [deptState, setDeptState]               = useState('');     // For department id 
    const [positionAPI, setPositionAPI]           = useState([]);   // For Position API
    const [positionState, setpositionState]       = useState('');     // For position id 
    const [empId, setEmpId]                       = useState('');   // For employee id  
    const [autocompleteID, setAutocompleteID]     = useState([]);   // For Autocomplete EMP ID
    const [empCode, setEmpCode]                   = useState('');   // For employee code  
    const [autocompleteCode, setAutocompleteCode] = useState([]);   // For Autocomplete EMP CODE
    const [empName, setEmpName]                   = useState('');   // For employee name  
    const [autocompleteName, setAutocompleteName] = useState([]);   // For Autocomplete EMP NAME
    const [clearData, setClearData]               = useState('');
    const [currentDate, setCurrentDate]           = useState(Moment(new Date()).format('YYYY-MM-DD')); // For Current Date
    const [selectedFromDate, setSelectedFromDate] = useState(()=>ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate]     = useState(()=>ChangeDate(new Date())); // For Joined End Date
    const [rowCount , setRowCount]                = useState();     // For row count
    const [AllCheck, setAllCheck]                 = useState(false);// For select checkbox all or not
    const [deleteIdList, setDeleteIdList]         = useState('');   // For delete data list
    const [editID, setEditID]                     = useState('');   // For Edit ID
    const [content, setContent]                   = useState('');   // For Confirmation box
    const [type, setType]                         = useState('');   // For Confirmation box
    const [show, setShow]                         = useState(false);// For show/hide confirmation box
    const [noData, setNoData]                     = useState('');   // For show There is no data!
    const [mainTable, setMainTable]               = useState([]);   // For Main Table
    const [disableAutocomplete, setDisableAutocomplete] = useState(true); 
    const [deleteShow, setDeleteShow]             = useState(false);            // For delete button show hide (table bottom)
    const [ loginID, setLoginID ]                 = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]             = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Form Load */
useEffect(() => {
    setLoading(true);
    loadDept();loadPosition();getPermission();
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
    let obj = { url: 'api/employee-by-view-permission', method: 'post', params: { loginID, companyID } }
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

/** Search Function */
const searchAPI= async(pageNumber = 1) => {
    let errMsg = [];
    let fromDate = null; let toDate = null;

    if(selectedFromDate === null){
        let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str); 
    }else{
        fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
    }
    if(selectedToDate === null){
        let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str); 
    }else{
        toDate = Moment(selectedToDate).format('YYYY-MM-DD');
    }
    if(fromDate > toDate){
        let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);
    }
    if(checkNullOrBlank(errMsg)){
      setError(errMsg);setSuccess([]);
    }else{
        setLoading(true);
        // setError([]);setSuccess([]);
        setMainTable([]); 
        let search = {
            "method":"post","url": "api/announcement-list",
            "params": {
                "login_id": loginID,
                "company_id": companyID,
                "from_date": fromDate,
                "to_date": toDate,
                "employee_id": empId,
                "employee_name": empName,
                "employee_code": empCode,
                "department_name": deptState,
                "position_name": positionState
            }
        }
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
            setMainTable([]); setSuccess([]); setError([]);
            setNoData(response.message);
        }else{
          if(response.data.status === 'OK'){
            let result = response.data.data;let flag = false;

            result.forEach(data=>{
                if(data.deleteFlag == true){
                  flag = true;
                }
            });setDeleteShow(flag);
            setNoData('');setSuccess([]);setError([]);setAllCheck(false);
            setRowCount(response.data.row_count); setMainTable(response.data.data);
          }else if(response.data.status === 'NG'){
            setMainTable([]);setSuccess([]);setError([]);
            setNoData(response.data.message);
          }
        }
    }
}

/** Search Temporary Function */
const searchTempAPI= async(pageNumber = 1) => {
  let errMsg = [];
  let fromDate = null; let toDate = null;

  if(selectedFromDate === null){
      let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str); 
  }else{
      fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
  }
  if(selectedToDate === null){
      let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str); 
  }else{
      toDate = Moment(selectedToDate).format('YYYY-MM-DD');
  }
  if(fromDate > toDate){
      let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);
  }
  if(checkNullOrBlank(errMsg)){
    setError(errMsg);setSuccess([]);
  }else{
      setLoading(true);
      // setError([]);setSuccess([]);
      setMainTable([]); 
      let search = {
          "method":"post","url": "api/announcement-list",
          "params": {
              "login_id": loginID,
              "company_id": companyID,
              "from_date": fromDate,
              "to_date": toDate,
              "employee_id": empId,
              "employee_name": empName,
              "employee_code": empCode,
              "department_name": deptState,
              "position_name": positionState
          }
      }
      let response = await ApiRequest(search);setLoading(false);
      if(response.flag === false){
          setMainTable([]); setSuccess([]); setError([]);
          setNoData(response.message);
      }else{
        if(response.data.status === 'OK'){
          setNoData(''); setSuccess([]); setError([]);
          setRowCount(response.data.row_count); setMainTable(response.data.data); setAllCheck(false);
        }else if(response.data.status === 'NG'){
          setMainTable([]);setSuccess([]);setError([]);
          setNoData(response.data.message);
        }
      }
  }
}

/** Checkbox Function */
const change_checkbox = (i) => {
  let value = i.target.value;
  let checked = i.target.checked;
  let data, id_list  = [], temp = [];

  if( value === "all-check" ){
    data = mainTable.map(item => 
        item.deleteFlag === true ? { ...item, is_checked: checked } : item
    );
    setAllCheck(checked);
  }else{
    data = mainTable.map(item => {
        if(item.id === parseInt(value)){
            temp.push({...item, is_checked: checked});
            return { ...item, is_checked: checked }
        }else{
            if(item.deleteFlag === true) temp.push({...item});
            return item
        }
    });
    setAllCheck(temp.every(item => item.is_checked));
  }
  for(let i=0; i<data.length; i++){
    if(data[i].is_checked === true){ id_list.push(data[i].id); }
  }
  var x = id_list.toString();
  setDeleteIdList(id_list); setMainTable(data); //setAllCheck(data.every(item => item.is_checked)); 
}

/** Delete Function */
const deleteToggleAlert = () => {
  if(!isEmpty(deleteIdList)){
    setShow(!show);setContent('Are you sure want to delete?');setType('delete');
  }else{
    setSuccess([]);setError([t(message.JSE004)]);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }
}
const deleteOK = async() => {
  // var array = [...mainTable];
  setShow(!show);
  setLoading(true);
  let obj = { method:"delete",url:"api/announcement-list",params:{"login_id": loginID, "id": deleteIdList}}
  let response = await ApiRequest(obj);setLoading(false);
  if(response.flag == false){ 
    setSuccess([]);setError(response.message);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    if(response.data.status == "OK"){
      setSuccess([response.data.message]);setError([]);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      // setTimeout(function(){searchAPI();}, 2500);
    }else if(response.data.status == "NG"){
      setSuccess([]);setError(response.data.message);
    }
  }searchTempAPI();
}

/**  Edit Function */
const edit = (id) => {
  localStorage.setItem('ANNOUNCEMENT_ID', JSON.stringify(id));
  let customer_name = window.location.href.split("/")[3];
  history.push(`/${customer_name}/hr/dashboard/announcement-register`); 
}

return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={[]} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Announcement List')}</CLabel></h5></CCardHeader>
            <CCardBody>
            <SearchData 
                disableAutocomplete={disableAutocomplete}
                changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete}
                empId={empId} empCode={empCode} empName={empName}
                autocompleteID={autocompleteID} autocompleteCode={autocompleteCode} autocompleteName={autocompleteName}
                departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
                positionAPI={positionAPI} positionState={positionState} positionChange={positionChange}
                selectedFromDate={selectedFromDate} changeFromDate={i=>setSelectedFromDate(ChangeDate(i))}  
                selectedToDate={selectedToDate} changeToDate={i=>setSelectedToDate(ChangeDate(i))}
                searchAPI={searchAPI} noData={noData}
            />
            <TableListData
                mainTable={mainTable} rowCount={rowCount} AllCheck={AllCheck} 
                change_checkbox={change_checkbox} edit={edit} deleteToggleAlert={deleteToggleAlert} currentDate={currentDate}  deleteShow={deleteShow}
            />
            <Confirmation content={content} okButton={t('OK')} cancelButton={t('Cancel')} type={type} show={show} cancel={()=>setShow(!show)} deleteOK={deleteOK} />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
export default withTranslation()(LegacyWelcomeClass);