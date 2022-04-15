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
import { isEmpty, ValidateNumberZeroOrOne, isdigit } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import message from '../../hr-common/common-message/CommonMessage';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import SaveData from './SaveData';
import TableData from './TableData';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error,setError]                    = useState([]); // For Error Message
  const [success,setSuccess]                = useState([]); // For Success Message
  const [loading, setLoading]               = useState(false); // For Loading

  const [companyNameAPI, setCompanyNameAPI] = useState([]); // For All Company Name from Database
  const [companyName , setCompanyName]      = useState(""); // For Company Name
  const [minuteFrom , setMinuteFrom]        = useState(""); // For Minute From
  const [minuteTo , setMinuteTo]            = useState(""); // For Minute To
  const [rate , setRate]                    = useState(""); // For Rate

  const [ rowCount , setRowCount]           = useState(""); // for row count
  const [ deleteData, setDeleteData ]       = useState(""); // For Delete data

  const [content, setContent]               = useState("");   // For Confirmation box
  const [type, setType]                     = useState("");   // For Confirmation box
  const [show, setShow]                     = useState(false);// For show/hide confirmation box

  const [mainTable, setMainTable]           = useState([]); // For MainTable

  const [ loginID, setLoginID ]             = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
  const [ departmentID, setDepartmentID ]   = useState(localStorage.getItem('DEPARTMENT_ID')); // for session department id from ERP
  const [ positionID, setPositionID ]       = useState(localStorage.getItem('POSITION_ID')); // for session position id from ERP
  const [ companyID, setCompanyID ]         = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Start Form Load */
useEffect(() => {
  setLoading(true);
  loadCompanyName();loadMainTable();
},[ loadCompanyName, loadMainTable ]);
/** End Form Load */

/** Get Overtime Set Minute Range List from database */
const loadMainTable = async() => {
  let obj = {method:"get",url: "api/overtime-setminute-range/list",params: {"company_id": companyID}}
  let response = await ApiRequest(obj);setLoading(false);
  if(response.flag === false){ // catch error
    setSuccess([]);setError([]);setMainTable([]);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    if(response.data.status === "OK"){
      setMainTable(response.data.data);
      setSuccess([]);setError([]);
    }else if(response.data.status === "NG"){
      setMainTable([]);setSuccess([]);setError([]);
    }
  }
}

/** GET all company name from database */
const loadCompanyName = async () => {
    let obj = {method:"get",url: "api/companies",params: {}}
    let response = await ApiRequest(obj);
    response.flag === false ? setCompanyNameAPI([]): setCompanyNameAPI(response.data.data);
    setLoading(false);
}

const companyNameChange = (e) => {setCompanyName(e.target.value);}
const minuteFromChange = (e) => {setMinuteFrom(e.target.value);}
const minuteToChange = (e) => {setMinuteTo(e.target.value);}
const rateChange = (e) => {setRate(e.target.value);}

/* Start Save Function */
const saveData = () =>{
  let errMsg = [];
  if(isEmpty(companyName)){
    let err =  t(message.JSE001).replace('%s',t('Company Name'));errMsg.push(err);
  }
  if(isEmpty(minuteFrom)){
    let err =  t(message.JSE001).replace('%s',t('Minute From'));errMsg.push(err);
  }else{
    if(!isdigit(minuteFrom)){
      let err =  t(message.JSE013).replace('%s',t('Minute From'));errMsg.push(err);
    }
    if(minuteFrom>60){
      let err = t(message.JSE015).replace('%s',t('Minute From'));errMsg.push(err);
    }
  }
  if(isEmpty(minuteTo)){
    let err =  t(message.JSE001).replace('%s',t('Minute To'));errMsg.push(err);
  }else{
    if(!isdigit(minuteTo)){
      let err =  t(message.JSE013).replace('%s',t('Minute To'));errMsg.push(err);
    }
    if(minuteTo>60){
      let err = t(message.JSE015).replace('%s',t('Minute To'));errMsg.push(err);
    }
  }
  if(!isEmpty(minuteFrom) && !isEmpty(minuteTo)){
    if(minuteFrom > minuteTo){
      let err = t(message.JSE014).replace('%s',t('Minute From')).replace('%s',t('Minute To'));errMsg.push(err);
    }
  }
  if(isEmpty(rate)){
    let err =  t(message.JSE001).replace('%s',t('Rate'));errMsg.push(err);
  }else{
    if(!isdigit(rate)){
      let err =  t(message.JSE013).replace('%s',t('Rate'));errMsg.push(err);
    }else{
      if(ValidateNumberZeroOrOne(rate)){
        let err =  t(message.JSE012).replace('%s',t('Rate'));errMsg.push(err);
      }
    }
  }
  if(errMsg != ""){
    setSuccess([]);setError(errMsg);
  }else{
    setShow(!show);setContent('Are you sure want to save?');setType('save');
  }
}
const saveOK = async(e) => {
  setShow(!show);
  let login_id = 20000;
  setSuccess([]);setError([]);setLoading(true);
  let savedata = {method:"post",url: "api/overtime-setminute-range/setminute",
    params: {
      "company_id": companyName,
      "minute_from": minuteFrom,
      "minute_to": minuteTo,
      "rate": rate,
      "created_emp": loginID,
      "updated_emp": loginID
    }
  }
  let response = await ApiRequest(savedata);setLoading(false); 
  if(response.flag === false){ // catch error
    setSuccess([]);setError(response.message);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    if(response.data.status === "OK"){
      setCompanyName("");setMinuteFrom("");setMinuteTo("");setRate("");
      setSuccess([response.data.message]);setError([]);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      setTimeout(function(){loadMainTable();}, 1000);
    }else if(response.data.status === "NG"){
      setCompanyName("");setMinuteFrom("");setMinuteTo("");setRate("");
      setSuccess([]);setError(response.data.message);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }
}
/** End Save Function */

/* Start Delete Function */
const deleteToggleAlert = (e) => {
  setDeleteData(e['id']);setShow(!show);setContent('Are you sure want to delete?');setType('delete');
}
const deleteOK = async() =>{
  setShow(!show);setLoading(true);
  let deldata = {method:"delete",url: "api/overtime-setminute-range/destory/"+deleteData,params: {}}
  let response = await ApiRequest(deldata);setLoading(false);
  if(response.flag === false){ // catch error
    setSuccess([]);setError(response.message);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    if(response.data.status === "OK"){
      setSuccess([response.data.message]);setError([]);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      setTimeout(function(){loadMainTable();}, 1000);
    }else if(response.data.status === "NG"){
      setSuccess([]);setError([response.data.message]);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }
}
/** End Delete Function */

  return (
    <CRow>
    <CCol xs="12">
      <Loading start={loading} />
      <Message success={success} error={error} error2={[]} />
      <CCard>
        <CCardHeader>
          <h5><CLabel className="m-0">{t('Overtime Set Minute Range')}</CLabel></h5>
        </CCardHeader>
        <CCardBody>
          <SaveData
            companyNameAPI={companyNameAPI} companyNameChange={companyNameChange} 
            companyName={companyName} minuteFromChange={minuteFromChange} minuteFrom={minuteFrom}
            minuteToChange={minuteToChange} minuteTo={minuteTo} 
            rateChange={rateChange} rate={rate} saveData={saveData}
          />
          <TableData
            mainTable={mainTable} rowCount={rowCount} deleteToggleAlert={deleteToggleAlert}
          />
          <Confirmation
            content={content} okButton={t('OK')} cancelButton={t('Cancel')} type={type} show={show} 
            cancel={()=>setShow(!show)} deleteOK={deleteOK} saveOK={saveOK}
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  );
  }
export default withTranslation()(LegacyWelcomeClass);