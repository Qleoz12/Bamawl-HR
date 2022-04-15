import React, { useState, useEffect, useCallback } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CButton, CLabel, CRow, CTabContent,CTabs,CNav, CNavItem, CImg,
  CNavLink,
  CTabPane,
  CModal,
CModalHeader, CModalBody, CButtonToolbar } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import api from '../../../../service/API';
import { format, getMonth } from 'date-fns';
import "./styles.css";
import $ from 'jquery';
import { isEmpty, englishCharacterNumberOnly, greaterThanHundred, isdigit } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import message from '../../hr-common/common-message/CommonMessage'; // Common message
import Message from '../../../brycen-common/message/Message';
import HolidayListTable from './HolidayListTable';
import HolidayFullCalendar from './HolidayFullCalendar';
import HolidayRegister from './HolidayRegister';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate'
import Moment from 'moment';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

// must manually import the stylesheets for each plugin
//import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const calendarComponentRef = React.createRef();

  const [error,setError]    = useState([]);
  const [success,setSuccess]= useState([]);
  const [listShow, setListShow]         = useState(false);// For show/hide list panel
  const [calendarShow, setCalendarShow] = useState(true);// For show/hide calendar panel
  const [ calendar, setCalendar ] = useState(true);

  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate]     = useState(null); // For Joined End Date

    /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState([]); // For delete data list

  const [content, setContent]                   = useState('');   // For Confirmation box
  const [type, setType]                         = useState('');   // For Confirmation box
  const [show, setShow]                         = useState(false);// For show/hide confirmation box
  const [ btn_click, setBtn_click ]             = useState(true); // for employee name data for autocomplete box
  let scrollTop = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }
  let companyId = 2; // This is the login company ID from ERP
  let employeeId = 20005; // This is the login Employee ID from ERP

     /** Start Form Load */
 useEffect(() => { loadMainTable(); }, [  ]);
 const [event, setEvent] = useState({
  //  calendarWeekends: true,
   calendarEvents: []
 });

 const [ mainTable, setMainTable ] = useState([]);
 const loadMainTable = async(e) => {
    let holiday_list = { url: 'api/holiday-setup', method: 'get', params: {'company_id':companyId} }
    let response = await ApiRequest(holiday_list);
    if(response.flag == false){ // catch error
      setSuccess([]);setError(response.message);
      scrollTop();$("#loadingImg").hide();
    }else{
      if(response.data.status === 'OK'){
        setMainTable(response.data.data);
      }else{
        // setAutocompleteID([]);
        setSuccess([]);setError(response.data.message);
      }
    }
 }

 const change_checkbox = (i) => {
  let value = i.target.value;
  let checked = i.target.checked;
  let data;
  let id_list  = [];
  if( value === "all-check" ){
    data = mainTable.map(item => 
      // ({ ...item, is_checked: checked }));
   ( item.deleteable === true ? { ...item, is_checked: checked } : item))

  }else{
      data = mainTable.map(item =>
      item.id == value ? { ...item, is_checked: checked } : item
    )
  }
  for(let i=0; i<data.length; i++){
    if(data[i].is_checked === true){
      id_list.push(data[i].id);
    }
  }
 // var x = id_list.toString();
  setDeleteIdList(id_list);
  setAllCheck(data.every(item => 
    ( item.deleteable === true ? item.is_checked : item)
    ));
  setMainTable(data);
}

  /** Click Save Button */
  let saveAllData=async(e)=> {
    setShow(!show);setContent('Are you sure want to save?');setType('save');
  }
  let saveOK=async()=> {
    setShow(!show);
    setError([]);
    setSuccess([]);
    let errMsg = [];
    let from_date='';
    let to_date='';

    if(isEmpty(holidayDescription)){ // Validate Holiday Description text field
      let err =  t(message.JSE005).replace('%s',t('Holiday Description'));
      errMsg.push(err);
    }else{
      if(!englishCharacterNumberOnly(holidayDescription)){
        let err =  t(message.JSE022);
        errMsg.push(err);
      }else{
        if(!greaterThanHundred(holidayDescription)){
          let err =  t(message.JSE011).replace('%s',t('Holiday Description'));
          errMsg.push(err);
        }
      }
    }
    if(isEmpty(selectedFromDate)){ // Validate date text field
      let err =  t(message.JSE018).replace('%s',t('From Date'));
      errMsg.push(err);
    }
    if(isEmpty(selectedToDate)){ // Validate date text field
      let err =  t(message.JSE018).replace('%s',t('To Date'));
      errMsg.push(err);
    }
    if(!isEmpty(selectedFromDate) && !isEmpty(selectedToDate)){
      from_date=format(selectedFromDate, 'yyyy-MM-dd');
      to_date=format(selectedToDate, 'yyyy-MM-dd');
      if(selectedFromDate>selectedToDate){
        let err = t(message.JSE014).replace('%s',t('From Date')).replace('%s',t('To Date'));
        errMsg.push(err);
      }
    }
    setError(errMsg);
    if(isEmpty(errMsg)){
      let holiday_list = { url: 'api/holiday-setup', method: 'post', params: {
        "company_id": companyId, 
        "from_date"	:  from_date,
        "to_date"	: to_date ,
        "holiday_name" : holidayDescription,
        "created_admin_id" : employeeId ,
        "updated_admin_id" : employeeId ,} }
      let response = await ApiRequest(holiday_list);
      if(response.flag == false){ // catch error
        setSuccess([]);setError(response.message);
        scrollTop();$("#loadingImg").hide();
      }else{
        if(response.data.status === 'OK'){
          setHolidayDescription('');
          setSelectedFromDate(null);
          setSelectedToDate(null);
          loadMainTable();
          loadCalendar();
          setError([]);
          setSuccess([response.data.message]);
        }else{
          setError([response.data.message]);
          setSuccess([]);
        }
      }
    }else{scrollTop();}
  }

  let handleFromDateChange = (e) => { setSelectedFromDate(e); };
  let handleToDateChange = (e) => { setSelectedToDate(e); };
  const [ yearMonth, setYearMonth ] = useState('');

  const loadCalendar = async(get_month) => {
    setSuccess([]);setError([]);
    let holiday_list = { url: 'api/holiday-setup/month', method: 'post', params: {'company_id':companyId, 'month':get_month} }
    let response = await ApiRequest(holiday_list);
    if(response.flag == false){ // catch error
      setSuccess([]);setError(response.message);
      scrollTop();$("#loadingImg").hide();
    }else{
      if(response.data.status === 'OK'){
        let data = response.data.data;
        let event_arr = [];
        data.map((i,index) => {
          let end_date = new Date(i.end_date);
          end_date.setDate(end_date.getDate()+1);
          end_date = format(new Date(end_date), 'yyyy-MM-dd');
          // adding event from month event calendar
          event_arr.push(
            { title: i.holiday_name,
            start: i.start_date,
            end: end_date,
            allDay: true}
          )
        });
        setEvent({
          // calendarWeekends: event.calendarWeekends,
          // add new event data
          calendarEvents: event_arr
        });
      }else{
        setSuccess([]);setError(response.data.message);
      }
    }
  };

  const [holidayDescription , setHolidayDescription] = useState('');
  const holidayDescriptionChange = (e) =>{ setHolidayDescription(e.target.value);}

   /* DELETE OVERTIME MODAL BOX */
  let deleteData=async(e)=> {
    setShow(!show);setContent('Are you sure want to delete?');setType('delete');
  }
   const deleteOK = async() =>{
    setShow(!show);
     var array = [...mainTable];
     $("#loadingImg").show();
     if(!isEmpty(deleteIdList)){
      let delete_list = { url: 'api/holiday-setup/delete', method: 'delete', params: {"id" :deleteIdList, "company_id": companyId} }
      let response = await ApiRequest(delete_list);
      if(response.flag == false){ // catch error
        setSuccess([]);setError([response.message]);
        scrollTop();$("#loadingImg").hide();
      }else{
        if(response.data.status === 'OK'){
          setError([]);
          setSuccess([response.data.message]);scrollTop();
          loadMainTable();
          loadCalendar();
        }else{
          setSuccess([]);setError([response.data.message]);scrollTop();
        }
      }
    }else{
      setSuccess([]);
      let errorMsg = t(message.JSE004);
      setError([errorMsg]);
    }
    $("#loadingImg").hide();
  }

  let calendarClick = () => {
    setCalendar(true);
  }
  let listClick = () => {
    setCalendar(false);
  }

return (
  <CRow>
  <CCol xs="12">
    <div id="loadingImg" className="loading">
      <CImg src={'../../../../../../image/loading.gif'} alt="loading" className="img" />
    </div>
    <Message error={error} success={success} error2={[]} />
    <CCard>
      <CCardHeader><h5><CLabel className="m-0">{t('Holiday Setup')}</CLabel></h5></CCardHeader>
      <CCardBody>
        <HolidayRegister holidayDescription={holidayDescription} holidayDescriptionChange={holidayDescriptionChange} handleFromDateChange={handleFromDateChange} selectedFromDate={selectedFromDate} selectedToDate={selectedToDate} handleToDateChange={handleToDateChange} saveAllData={saveAllData}/>
        <CRow className='ml-3 mr-3'>
            <CButton className={`calendar-${calendar ? 'active' : 'in-active' }`} active onClick={calendarClick}><CLabel>{t('Calendar')}</CLabel></CButton> 
            <CButton className={`list-${calendar ? 'in-active' : 'active' }`} onClick={listClick}><CLabel>{t('List')}</CLabel></CButton>
          </CRow>
          <CRow className='ml-2 mr-2'>
            <CCol>
            { calendar === true && 
              <HolidayFullCalendar event={event} setEvent={setEvent} setYearMonth={setYearMonth} yearMonth={yearMonth} event={event} calendarComponentRef={calendarComponentRef} loadCalendar={loadCalendar} />
            }
            { calendar === false && 
              <HolidayListTable mainTable={mainTable} AllCheck={AllCheck} change_checkbox={change_checkbox} deleteData={deleteData}/>
            }
            </CCol>
          </CRow>
        <Confirmation
            content={content} okButton={t('OK')} cancelButton={t('Cancel')} type={type} show={show} cancel={()=>setShow(!show)} saveOK={saveOK} deleteOK={deleteOK}
        />
      </CCardBody>
    </CCard>
  </CCol>
</CRow>
);
}

export default withTranslation()(LegacyWelcomeClass)
