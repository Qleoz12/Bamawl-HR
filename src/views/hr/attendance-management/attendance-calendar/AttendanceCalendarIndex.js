import React, { useState,useEffect, useRef } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import Message from '../../../brycen-common/message/Message';
import interactionPlugin from '@fullcalendar/interaction'
// import { INITIAL_EVENTS, createEventId } from './event-utils'
import { withTranslation } from 'react-i18next';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CImg,CSpinner,CLabel,CButton,CFormGroup,CModal,CModalHeader,CPagination,CModalBody,CButtonToolbar,CSelect} from '@coreui/react';
import Loading from '../../../brycen-common/loading/Loading';
import $ from 'jquery';
import "./styles.css";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; // optional for styling
import Form from './Form';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import { format } from 'date-fns';
import {currentMonth} from "../../hr-common/common-validation/CommonValidation";
function LegacyWelcomeClass({ t, i18n }) {
  const [ loading, setLoading ] = useState(false);
  const [ success, setSuccess] = useState([]); // for success message
  const [ error, setError ] = useState([]); // for error message
  const [ error2, setError2 ] = useState([]); // for error message
  const [ createEventId, setCreateEventId] = useState(1);
  const [ yearMonth, setYearMonth ] = useState('');
  const [ empID, setEmpID ] = useState(''); // for employee id autocomplete box 
  const [ empIDData, setEmpIDData ] = useState([]); // for employee id data for autocomplete box
  const [ empCode, setEmpCode ] = useState(''); // for employee code autocomplete box
  const [ empCodeData, setEmpCodeData ] = useState([]); // for employee code data for autocomplete box
  const [ empName, setEmpName ] = useState(''); // for employee name autocomplete box
  const [ empNameData, setEmpNameData ] = useState([]); // for employee name data for autocomplete box
  const [ department, setDepartment ] = useState(''); // for department name autocomplete box
  const [ departmentData, setDepartmentData ] = useState([]); // for department data for autocomplete box
  const [ departmentName, setDepartmentName ] = useState(""); // for selected department name
  const [ positionName, setPositionName ] = useState(""); // for selected position name
  const [ employeeName, setEmployeeName ] = useState(""); // for selected employee name
  const [ employeeID ,setEmployeeID ] = useState(""); // for selected employee id
  const [ currentPage, setCurrentPage ] = useState(1); // for current page
  const [ lastPage, setLastPage] = useState(1); // last page of paginate
  const [ reload, setReload ] = useState(false); // for reload button
  const [ total, setTotal ] = useState(""); // for pagination total
  const [ viewPermission, setViewPermission ] = useState(""); // view permission
  const [ currentEvents, setCurrentEvents ] = useState([]); 
  const [ search, setSearch ] = useState(false); // for search or not
  const [ employeeCode, setEmployeeCode] = useState(''); // for selected employee code
  const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for login id
  const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
  const [ calendarShow, setCalendarShow ] = useState(false); // for calendar show hide 
  const [ noData, setNoData ] = useState(''); //for data is not found error message
  const [ searchDataNotFound, setSearchDataNotFound ] = useState(true);
  /** Form Load */
  useEffect(() => {
    setLoading(true);
    getDepartment();index();
  },[]);

  /** Form load function */
  let index =async ()=>{
    let data = { url: 'api/attendance-calendar/formload', method: 'post', params: {'company_id':companyID, 'login_id': loginID} }
    let response = await ApiRequest(data);
    if(response.flag == false){ // catch error
      setSuccess([]);setError(response.message);
      window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
      if(response.data.status === 'OK'){
        setEmployeeCode(response.data.data.employee_code);setEmployeeID(response.data.data.employee_id);setEmployeeName(response.data.data.employee_name);setDepartmentName(response.data.data.department_name);setPositionName(response.data.data.position_name);
        setViewPermission(response.data.data.view_permission);
      }else{
        setSuccess([]);setError(response.data.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
      }
    }
  }
  // /** get attendance data */
  let getAttendanceData =async (month,id)=>{
    let data = { url: 'api/attendance-calendar/get-attendance-data', method: 'post', params: {'company_id':companyID, 'employee_id': id, "calendar_date": month } }
    let response = await ApiRequest(data);setLoading(false);setReload(false);

    if(response.flag == false){ // catch error
      setSuccess([]);setError([]);setLoading(false);setCurrentEvents([]);setNoData(response.message[0]);
      scrollModal("no-data");
    }else{
      if(response.data.status === 'OK'){
        setCurrentEvents(response.data.data);
      }else{
        setSuccess([]);setError(response.data.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
      }
    }
  }

  
  let eventContent = (args, createElement)=>{  

    let title = args.event.title; let extendedProps = args.event._def.extendedProps;
    if(args.event.classNames[0] == "holiday"){
      if(extendedProps.shift != ""){
        title = title +'<div class="holiday-inner-css">'+extendedProps.shift;
        if(extendedProps.trip_des != ""){ title = title +` <img src="/avatars/group_7765.png" width="15px" id="plane${args.event.id}" ></img>`;}
        title = title +'</div>';
      }
    }else{
      if(extendedProps.shift != ""){
        title = title +'<div>'+extendedProps.shift;
        if(extendedProps.trip_des != ""){ title = title +` <img src="/avatars/group_7765.png" width="15px" id="plane${args.event.id}" ></img>`;}
        title = title +'</div>';
      }
    }
    
    if(extendedProps.in_hour != "" || extendedProps.out_hour != ""){
      title = title +'<div>';
      if(extendedProps.in_hour != ""){
        if(extendedProps.in_status != ""){ title = title +`<font color="red">` ;}
        title = title +extendedProps.in_hour +`IN <img src="/avatars/group_7751.png" width="15px" class="pointer" id="in${args.event.id}" >`;
        if(extendedProps.in_status != ""){ title = title+`</font>` ;}
      }
      if(extendedProps.out_hour != ""){
        if(extendedProps.out_status != ""){ title = title +`<font color="red">` ;}
        title = title +'&nbsp'+extendedProps.out_hour +`OUT <img src="/avatars/group_7751.png" class="pointer" width="15px" id="out${args.event.id}" >` ;
        if(extendedProps.out_status != ""){ title = title+`</font>` ;}
      }
      title = title +'</div>';
    }
    
    
    if(extendedProps.leave_name != ""){
      title = title +'<div class="leave-inner-css">'+extendedProps.leave_name+'&nbsp'+`<img src="/avatars/group_7763.png" width="15px" id="human${args.event.id}" >`+'</div>'  ;
    }
    if(extendedProps.working_hour != ""){
      title = title +'<div>Working HR: '+ extendedProps.working_hour+'</div>';
    }
    return {
      html: title
    };
  }
 
   /**Start change autocomplete */
   const changeAutocomplete = async (type, i) => {
    setError([]); setSuccess([]);
    // type is id, show name in Employee ID and clear remain input
    if(type === 'id'){
        setEmpID(i.target.value); setEmpCode(''); setEmpName('');
    }
    // type is code, show name in Employee Code and clear remain input
    else if(type === 'code') {
        setEmpID(''); setEmpCode(i.target.value); setEmpName('');
    }
    // type is name, show name in Employee Name and clear remain input
    else{
        setEmpID(''); setEmpCode(''); setEmpName(i.target.value);
    }

    // if empty, remove data from autocomplete
    if(i.target.value === ''){
        setEmpID(''); setEmpName(''); setEmpCode('');
    }else{
        let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError(response.message); setEmpID([]); setEmpName([]); setEmpCode([]);
        }else{
            (type === 'id') ? setEmpIDData(response.data.data) :
            (type === 'code') ? setEmpCodeData(response.data.data) : setEmpNameData(response.data.data);
        }
    }
}
/**End change autocomplete */

/*** scroll function */
let scrollModal = (modal_id) => {
  let element = document.getElementById(modal_id);
  element.scrollIntoView({behavior: "smooth", block: "start"});
}

/**Start select autocomplete */ 
const selectAutocomplete = async (val, obj) => {
    let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
    let response = await ApiRequest(object);
    if(response.flag === false){
        setError(response.message);
    }else{
        if(response.data.data[0].employee_id !== null){setEmpID(response.data.data[0].employee_id)}else{setEmpID('')}
        if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
        if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
    }
}
/**End select autocomplete */

/** Start get Department Function */
const getDepartment = async () => {
  let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
  let response = await ApiRequest(obj);
  response.flag === false ? setDepartmentData([]) : setDepartmentData(response.data.data);
}
/** End get Department Function */

/** Start pagination button Function */
const searchBtn = async (page=currentPage) => {

  setError([]);setSuccess([]);setLoading(true);setNoData('');
  let data = { url: `api/attendance-calendar/search-emp?page=${page}`, method: 'post', params: { "company_id":companyID,"login_id" : loginID,"department_id": department,"employee_id": "","employee_code": "","employee_name": ""} }
  let response = await ApiRequest(data);
  if(response.flag == false){ // catch error
    setSuccess([]);setError([]);setLoading(false);setSearch(false);setCurrentEvents([]);setEmployeeID(empID);setEmployeeCode(empCode);setEmployeeName(empName);setNoData(response.message[0]);
    scrollModal("no-data");
  }else{
    if(response.data.status === 'OK'){
      let emp_id = "";
      if(response.data.data.data.length > 0){
        setEmployeeID(response.data.data.data[0].employee_id);setEmployeeName(response.data.data.data[0].employee_name);setDepartmentName(response.data.data.data[0].department_name);setPositionName(response.data.data.data[0].position_name);
        setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);setSearch(true);
        // if(empID == ""){ emp_id = response.data.data.data[0].employee_id}else{ emp_id = empID}
        getAttendanceData(yearMonth,response.data.data.data[0].employee_id)
      }
      setNoData('');
      setLoading(false);
    }else{
      setSuccess([]);setError(response.data.message);setSearch(false);setLoading(false);
      window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
  }
}
/** End search button Function */

/** Start pagination button Function */
const schButton = async (page=currentPage) => {

  setError([]);setSuccess([]);setLoading(true);setNoData('');
  let data = { url: `api/attendance-calendar/search-emp?page=${page}`, method: 'post', params: { "company_id":companyID,"login_id" : loginID,"department_id": department,"employee_id": empID,"employee_code": empCode,"employee_name": empName} }
  let response = await ApiRequest(data);
  if(response.flag == false){ // catch error
    setSuccess([]);setError([]);setLoading(false);setSearch(false);setCurrentEvents([]);setNoData(response.message[0]);setSearchDataNotFound(false);
    scrollModal("no-data");
  }else{
    if(response.data.status === 'OK'){
      let emp_id = "";
      if(response.data.data.data.length > 0){
        setSearchDataNotFound(true);
        setEmployeeID(response.data.data.data[0].employee_id);setEmployeeName(response.data.data.data[0].employee_name);setDepartmentName(response.data.data.data[0].department_name);setPositionName(response.data.data.data[0].position_name);
        setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);setSearch(true);
        if(empID == ""){ emp_id = response.data.data.data[0].employee_id}else{ emp_id = empID}
        getAttendanceData(yearMonth,emp_id)
      }
      setNoData('');
      setLoading(false);
    }else{
      setSuccess([]);setError(response.data.message);setSearch(false);setLoading(false);
      window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
  }
}
/** End search button Function */

/** Start pagination Function */
let setActivePage = (page) => {
  setError([]);setSuccess([]);setLoading(true);searchBtn(page);  
}
/** End pagination Function */

/*** search button function */
let searchButton = ()=>{
  setError([]);setSuccess([]);setLoading(true);schButton(1);  
}

/** Start reload button Function */
let reloadBtn = () => {
  setReload(true);
  getAttendanceData(yearMonth,employeeID);
}
/** End reload button Function */


  return (
    <>
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader>
                <h5><CLabel className="m-0">{t('Employee Attendance Calendar')}</CLabel></h5>
            </CCardHeader>
                <CCardBody id="no-data">
                    <Form empIDData={empIDData} empID={empID} empCodeData={empCodeData} empCode={empCode} empNameData={empNameData} empName={empName} department={department} departmentData={departmentData} departmentChange={(i)=>{setDepartment(i.target.value)}} changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete} searchBtn={()=>searchButton()} departmentName={departmentName} positionName={positionName} viewPermission={viewPermission} employeeID={employeeID} employeeCode={employeeCode} employeeName={employeeName} departmentName={departmentName} /> 

                          {viewPermission > 0 && search == true &&
                            <CRow alignHorizontal="center" className="mt-5">
                              <CPagination
                                  activePage={currentPage}
                                  pages={lastPage}
                                  dots={false}
                                  arrows={false}
                                  align="center"
                                  firstButton="First page"
                                  lastButton="Last page"
                                  onActivePageChange={ (i) => setActivePage(i) }
                              ></CPagination>
                             </CRow>
                          }
                    {searchDataNotFound == true &&
                    <>
                      <CRow lg="12" style={{marginBottom:'10px'}} className="mt-5">
                          <CCol lg="3"> 
                                  <CLabel className="">{t('Employee ID')}</CLabel>
                          </CCol>
                          <CCol lg="3" > 
                                  <CLabel className="">{employeeID}</CLabel>
                          </CCol>
                          <CCol lg="3"> 
                                  <CLabel className="">{t('Employee Name')}</CLabel> 
                          </CCol>
                          <CCol lg="3"> 
                                  <CLabel className="">{employeeName}</CLabel>
                          </CCol>
                      </CRow>
                      <CRow lg="12" style={{marginBottom:'10px'}} >
                            <CCol lg="3"> 
                                    <CLabel className="">{t('Department Name')}</CLabel>
                            </CCol>
                            <CCol lg="3" > 
                                    <CLabel className="">{departmentName}</CLabel>
                            </CCol>
                            <CCol lg="3"> 
                                    <CLabel className="">{t('Position Name')}</CLabel> 
                            </CCol>
                            <CCol lg="3"> 
                                    <CLabel className="">{positionName}</CLabel>
                            </CCol>
                      </CRow>
                      </>
                    }
                    
                    {noData != ""  && 
                      <CRow lg="12" style={{margin:"5px 0px 0px 5px"}} className="mt-5">
                        <CLabel style={{color:"red"}}>※{noData}</CLabel>
                      </CRow>
                    }
                    <>
                      <CRow className='mt-3' >
                          <CButton className='calendar-active'  style={{marginLeft: "-16px !important",cursor: "pointer"}}><CLabel>{t('Calendar')}</CLabel></CButton> 
                            <CButton  onClick={reloadBtn} style={{position: "absolute",right: "0"}}>
                              {reload == false &&
                                <CLabel style={{marginRight: "7px",cursor: "pointer"}}>{t('Reload')}</CLabel>
                              }
                              {reload == true &&
                                <CSpinner style={{width: "24px",height: "24px",marginRight: "13px"}} component="span" aria-hidden="true" color="primary"/>
                              }
                              
                            </CButton>
                      </CRow>
                      <CRow lg="12" style={{marginBottom:'10px'}}>
                        <CCol lg="12">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            defaultView="dayGridMonth"
                            header={{
                              left: "prev,next today",
                              center: "title",
                              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                            }}s
                            initialView='dayGridMonth'
                            eventContent={eventContent} // custom render function
                            contentHeight="auto"
                            events={currentEvents}

                            eventTimeFormat= {{ // like '14:30:00'
                              hour: '2-digit',
                              minute: '2-digit',
                              // meridiem: false]
                              hour12:false
                            }}
                            eventMouseEnter={(event,domEvent,view)=>{
                  
                              let id = event.event._def.publicId;
                              // $("#plus"+id).click(function(){
                                tippy("#human"+id, {
                                  content: event.event._def.extendedProps.leave_des,
                                });
                                tippy("#plane"+id, {
                                  content: event.event._def.extendedProps.trip_des,
                                });
                                if(event.event._def.extendedProps.in_des == ""){
                                  tippy("#in"+id, {
                                    content: "IN",
                                  });
                                }else{
                                  tippy("#in"+id, {
                                    content: event.event._def.extendedProps.in_des,
                                  });
                                }
                                if(event.event._def.extendedProps.out_des == ""){
                                  tippy("#out"+id, {
                                    content: "OUT",
                                    
                                  });
                                }else{
                                  tippy("#out"+id, {
                                    content: event.event._def.extendedProps.out_des,
                                    
                                  });
                                }
                              // });
                            }}
                            // eventMouseout ={(event)=>{
                            //    alert("out")
                            // }}
                            // eventRender={(info) =>{
                            //   info.el.innerHTML = info.el.innerHTML.replace('$ICON', "<em class='far fa-"+info.event.extendedProps.img+"'></em>");
                            // }}
                            datesSet={(args) => {
                              // props.setEvent({calendarWeekends: true,calendarEvents:[]}); 
                              let label = $('.fc-toolbar-title');
                              let text = '1 '+label.text();
                              let emp_id = "";
                              let get_month = format(new Date(text), 'yyyy-MM-dd');
                              setYearMonth(get_month);setLoading(true);
                              if(employeeID == ""){emp_id = loginID}else{ emp_id = employeeID }
                              getAttendanceData(get_month,emp_id);
                            }}
                          />
                        </CCol>
                      </CRow>     
                      </>
                  
                </CCardBody>
        </CCard>     
         
        </>
  )
}
export default withTranslation()(LegacyWelcomeClass)