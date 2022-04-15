import React, { useState, useEffect } from "react";
import { CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { isEmpty, checkNullOrBlank, formatDate } from '../../hr-common/common-validation/CommonValidation'; // Common message
import message from '../../hr-common/common-message/CommonMessage'; // Common message
import Message from '../../../brycen-common/message/Message';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Loading from '../../../brycen-common/loading/Loading';
import Moment from 'moment';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import FormData from './FormData';
import { useHistory } from "react-router-dom";

/**
 * Main Component
 * @author Aye Thiri Mon
 * @create 11/05/2021
 * @modify 20/08/2021
 * @returns Web Page
 */
function LegacyWelcomeClass({ t, i18n }) {
  const history                                  = useHistory();   // For edit link
  const [ loading, setLoading]                   = useState(false);// For Loading
  const [ error,setError]                        = useState([]);
  const [ error2,setError2]                      = useState([]);
  const [ success,setSuccess]                    = useState([]);
  const [ leaveTypeState, setLeaveTypeState]     = useState('');   // For leave Type select box toggle
  const [ leaveStatusState, setLeaveStatusState] = useState('');   // For department select box toggle
  const [ departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
  const [ deptState, setDeptState]               = useState('');   // For department select box toggle
  const [ selectedFromDate, setSelectedFromDate] = useState(new Date()); // For Joined Start Date
  const [ selectedToDate, setSelectedToDate]     = useState(new Date()); // For Joined End Date
  const [ deptID, setDeptID]                     = useState('');
  const [ leaveTypeID, setLeaveTypeID]           = useState('');
  const [ leaveStatusID, setLeaveStatusID]       = useState('');
	const [ startDate, setStartDate]               = useState(null);
	const [ endDate, setEndDate]                   = useState(null);
  const [ empID, setEmpID ]                      = useState(''); // for employee id autocomplete box 
  const [ empIDData, setEmpIDData ]              = useState([]); // for employee id data for autocomplete box
  const [ empCode, setEmpCode ]                  = useState(''); // for employee code autocomplete box
  const [ empCodeData, setEmpCodeData ]          = useState([]); // for employee code data for autocomplete box
  const [ empName, setEmpName ]                  = useState(''); // for employee name autocomplete box
  const [ empNameData, setEmpNameData ]          = useState([]); // for employee name data for autocomplete box
  const [ currentPage, setCurrentPage]           = useState(1);
  const [ lastPage, setLastPage]                 = useState(0);
  const [ disableOrNone, setDisableOrNone]       = useState(true); // true: non disable / false: disable
  
  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck]                 = useState(false);  // For select checkbox all or not
  const [AllDelCheck, setAllDelCheck]           = useState(false);  // For select checkbox all or not
  const [deleteIdList, setDeleteIdList]         = useState([]);     // For delete data list
  const [confirmRejectIdList, setConfirmRejectIdList]         = useState([]); // For delete data list
  const [rowCount, setRowCount]                               = useState('');

  /* GET LEAVE TYPE and STATUS SELECT BOX */
  const [leaveTypeAPI, setLeaveTypeAPI]         = useState([]);
  const [leaveStatusAPI, setLeaveStatusAPI]     = useState([]);
  const [showDelete, setShowDelete]             = useState(false);// For show delete checkbox
  const [ mainTable, setMainTable ]             = useState([]);
  const handleFromDateChange  = (e) => { setSelectedFromDate(e); };
  const handleToDateChange    = (e) => { setSelectedToDate(e); };
  const scrollTop             = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }
  const scrollDown            = () => { window.scrollTo(0,9999); }
  const [companyId, setCompanyId]                 = useState(localStorage.getItem('COMPANY_ID'));
  const [loginId, setLoginId]                     = useState(localStorage.getItem('LOGIN_ID'));
  const [noData, setNoData]                       = useState('');   // For show There is no data!
  const [ confirmRejectShow, setConfirmRejectShow ] = useState(true); // for confirm reject button show hide
  const [ language, setLanguage ]                   = useState('en'); // for languange

  /** Start Form Load */
  useEffect(() => { 
    let data = JSON.parse(localStorage.getItem('LEAVE_DETAIL_FORM'));
    localStorage.removeItem('LEAVE_DETAIL_FORM');
    if(data !== null){
      let { empName, empCode, empID, selectedFromDate, selectedToDate, leaveTypeState, leaveStatusState, deptState, id } = data;
      setEmpName(empName);setEmpCode(empCode);setEmpID(empID);setSelectedFromDate(selectedFromDate);setSelectedToDate(selectedToDate);setLeaveTypeState(leaveTypeState);
      setLeaveStatusID(leaveStatusState);setLeaveStatusState(leaveStatusState);setDeptState(deptState);
      searchTempData(currentPage, empName, empCode, empID, selectedFromDate, selectedToDate, leaveStatusState, deptState, leaveTypeState);
    }
    setLoading(true); loadDept(); loadLeaveType(); 
    loadLeaveStatus();
    indexAPI();
  }, [  ]);

  const indexAPI = async (data) => {
    setLoading(true);
    let obj = { method: 'post', url: 'api/employee-by-view-permission'
    , params: {
        'company_id': companyId,
        'login_employee_id': loginId
      } 
   }
    let response = await ApiRequest(obj); 
    setLoading(false);
    if(response.flag === false){
      // setError(response.message);
    }else{
      let status = response.data.status;
      if(status == 'OK'){
        let object = response.data.data;
        for (const property in object) {
          if(property==loginId && response.data.autocomplete === false){
            setDisableOrNone(response.data.autocomplete);
            setEmpID(property);
            setEmpCode(object[loginId].code);
            setEmpName(object[loginId].name_eng);
          }
        }
      }else{
        setError(response.data.message);
      }
    }
  }
  let change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list  = [];
    if( value === "all-check" ){ data = mainTable.map(item => ( item.is_approve === true ? { ...item, is_checked: checked } : item));
    }else{ data = mainTable.map(item =>item.leave_attach_id == value ? { ...item, is_checked: checked } : item)}
    for(let i=0; i<data.length; i++){
      if(data[i].is_checked === true){
        id_list.push(data[i].leave_attach_id);
      }
    }
    setConfirmRejectIdList(id_list);
    setAllCheck(data.every(item => ( item.is_approve === true ? item.is_checked : item) ));
    setMainTable(data);
  }
  let change_del_checkbox = (i) => { 
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list  = [];
    if( value === "all-delete-check" ){data = mainTable.map(item => ( item.can_delete === true ? { ...item, is_del_checked: checked } : item))
    }else{data = mainTable.map(item =>item.leave_attach_id == value ? { ...item, is_del_checked: checked } : item)}
    for(let i=0; i<data.length; i++){
      if(data[i].is_del_checked === true){
        id_list.push(data[i].leave_attach_id);
      }
    }
    setDeleteIdList(id_list);
    setAllDelCheck(data.every(item => ( item.can_delete === true ? item.is_del_checked : item) ));
    setMainTable(data);
  }

  let fromDate = null; let toDate = null;
  /** Search Function */
  let searchData=async () => {
    let errMsg = [];
    if(selectedFromDate !== null){fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');}
    if(selectedToDate !== null){toDate = Moment(selectedToDate).format('YYYY-MM-DD'); }
    if(selectedFromDate !== null && selectedToDate === null){let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate === null && selectedToDate !== null){let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str);}
    if(selectedFromDate === null && selectedToDate === null){let from_err = t(message.JSE001).replace('%s',t('From Date'));let to_err = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(from_err);errMsg.push(to_err);}
    if(fromDate > toDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    setError([]);
    setError2([]);
    setShowDelete(false);
    if(isEmpty(errMsg)){
      setLoading(true);
      let params = {
        'company_id': companyId,
        'login_id': loginId,
        'employee_id': empID,  
        'employee_name': empName,
        'employee_code': empCode,
        'department_id': deptState,
        'from_date': fromDate,
        'to_date': toDate,
        'approver_status': leaveStatusState, 
        'leave_type': leaveTypeState
      };
      let searchData = { url: 'api/employee-leave-list/search', method: 'post', params: params}
      let response = await ApiRequest(searchData);
      if(response.flag == false){ // catch error
        setSuccess([]);setError([]);setNoData(response.message);setMainTable([]);scrollTop();setLoading(false);
      }else{
        if(response.data.status == "OK"){
          let result = response.data.data.data;let flag = false;
          result.forEach(data=>{
            if(data.is_approve == true){
                flag = true;
            }
          });
          setConfirmRejectShow(flag);
          setMainTable(response.data.data.data); setNoData('');setSuccess([]);setError([]);
          setRowCount(response.data.data.total);
          setCurrentPage(response.data.data.current_page);
          setLastPage(response.data.data.last_page);
          setLoading(false);
          scrollDown();
        }else{
          setSuccess([]);setError([response.data.message]);setNoData('');setMainTable([]);setLoading(false);scrollTop();
        }
      }
    }else{
      setError(errMsg);
      setMainTable([]);
      scrollTop();}
  }
  /** Search Function */
  let searchTempData= async (pageNumber = currentPage, empName, empCode, empID, selectedFromDate, selectedToDate, leaveStatusState, deptState, leaveTypeState) => {
      setLoading(true); 
      let params = {
        'company_id': companyId,
        'login_id': loginId,
        'employee_id': empID,  
        'employee_name': empName,
        'employee_code': empCode,
        'department_id': deptState,
        'from_date': Moment(selectedFromDate).format('YYYY-MM-DD'),
        'to_date': Moment(selectedToDate).format('YYYY-MM-DD'),
        'approver_status': leaveStatusState, 
        'leave_type': leaveTypeState
      };
      setShowDelete(false);
      let show_delete = false;
      setNoData('');
      let searchData = { url: 'api/employee-leave-list/search'+'?page='+pageNumber, method: 'post', params: params}
      let response = await ApiRequest(searchData);
      if(response.flag == false){ // catch error
        setNoData(response.message);setLoading(false);setMainTable([]);
        setLoading(false);
      }else{
        if(response.data.status == "OK"){
          let result = response.data.data.data;let flag = false;
          result.forEach(data=>{
            if(show_delete === false){
              if(data.is_approve == true){
                flag = true;
              }
            }else{
                if(data.can_delete === true){
                flag = true;
              }
            }
          });
          setConfirmRejectShow(flag);
          setMainTable(response.data.data.data);
          setRowCount(response.data.data.total);
          setCurrentPage(pageNumber);
          setLastPage(response.data.data.last_page);
          setNoData('');
          setLoading(false); 
        }else{
          setNoData('');
          setError([...error, response.data.message]);setMainTable([]);setLoading(false);scrollTop();
        }
      }
  }
  /* Start pagination Function */
  let setActivePage = (page) => {
    setCurrentPage(page);
    searchTempData(page, empName, empCode, empID,  selectedFromDate, selectedToDate, leaveStatusState, leaveTypeState, deptState);
  }
  /* End pagination Function */
  let leaveTypeChange   = (e) =>{ setLeaveTypeState(e.target.value); }
  let leaveStatusChange = (e) =>{ setLeaveStatusState(e.target.value); }
  let deptChange        = (e) =>{ setDeptState(e.target.value); }

/** Get All Departments From Database */
let loadDept = async() => {
  let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
  let response = await ApiRequest(obj);
  if(response.flag === false)
  {setDepartmentAPI([]);}else{setDepartmentAPI(response.data.data); setLoading(false); }
}
/** Get Leave Type From Database */
let loadLeaveType = async() => {
  let obj = { url: 'api/leave-type-register', method: 'get' } // should api/leave-type-register/get-leave-types-list
  let response = await ApiRequest(obj);
  if(response.flag === false)
  {setLeaveTypeAPI([]);}else{setLeaveTypeAPI(response.data.data); setLoading(false); }
}
/** Get Leave Status From Database */
let loadLeaveStatus = async() => {
  let obj = { url: 'api/allowance-request-list/approver-status', method: 'get', params: {'login_id':loginId, 'company_id':companyId} }
  let response = await ApiRequest(obj);
  if(response.flag === false)
  {setLeaveStatusAPI([]);}else{setLeaveStatusAPI(response.data.data); setLoading(false); }
}

const detail = (i) => {
  let obj = { companyId, loginId, empName, empCode, empID, selectedFromDate, selectedToDate, deptState, leaveStatusState, leaveTypeState, 'leave_attach_id': i.leave_attach_id };
  localStorage.setItem('DETAIL_LEAVE_REQUEST_ID', JSON.stringify(obj) );
  let customer_name = window.location.href.split("/")[3];
  // window.location.href = `/${customer_name}/hr/operation-request-for-attendance/employee-leave-detail`;
  history.push(`/${customer_name}/hr/operation-request-for-attendance/employee-leave-detail-information`);
}

let [content, setContent] = useState('');
let [type, setType] = useState('');
let [show, setShow] = useState(false);
let [open, setOpen] = useState(false);
let [reason, setReason] = useState('');
let [rejectError, setRejectError] = useState([]);
let reject = () => {
  setError([]); setSuccess([]);
  setReason(''); setOpen(!open); setRejectError([]);
}
let rejectOK = async () => {
  setError([]); setSuccess([]);
  if(!checkNullOrBlank(reason)){
    setRejectError([t(message.JSE005).replace('%s',t('Reason'))]);
  }else{
    setOpen(!open); setLoading(true);
    let obj = {
      method: 'post',
      url: `api/employee-leave-list/reject`,
      params: {
        'leave_attach_id':confirmRejectIdList.toString(),
        'login_id':loginId,
        'denied_reason': reason,
        'company_id': companyId,
      }
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
    //   if(response.flag === false && response.data.data.status === 'NG'){
    //     setError(response.data.data.message);
    //   }else{
    //     setError(response.message);
    // }
      setSuccess([]);setError(response.message);
      scrollTop();setLoading(false);
  }else{
      setSuccess([response.data.message]);
      setAllCheck(false);
    }
    scrollTop();
    searchTempData(currentPage, empName, empCode, empID, selectedFromDate, selectedToDate, leaveStatusState, leaveTypeState, deptState);
  }
}

let confirmData=async(e)=> {
  if(confirmRejectIdList.length<=0){let str = t(message.JSE019).replace('%s',t("employee's leave"));setError([str]);scrollTop();setAllCheck(false);setAllDelCheck(false);}
  else{setShow(!show);setContent('Are you sure want to confirm?');setType('confirm');}
}
let rejectData=async(e)=> {
  if(confirmRejectIdList.length<=0){let str = t(message.JSE019).replace('%s',t("employee's leave"));setError([str]);scrollTop();setAllCheck(false);setAllDelCheck(false);}
  else{setReason(''); setOpen(!open); setRejectError([]);}
}
let deleteData=async(e)=> {
  if(deleteIdList.length<=0){let str = t(message.JSE019).replace('%s',t("employee's leave"));setError([str]);scrollTop();}
  else{  setShow(!show);setContent('Are you sure want to delete?');setType('delete');}setAllCheck(false);setAllDelCheck(false);
}
let deleteOK = async() => {
  setShow(!show); 
  var array = [...mainTable];
  setLoading(true); 
  if(!isEmpty(deleteIdList)){
    let delete_list = { url: 'api/employee-leave-list/delete', method: 'post', params: {"leave_attach_id" :deleteIdList.toString(), "company_id": companyId, "login_id": loginId} }
    let response = await ApiRequest(delete_list);
    if(response.flag == false){ // catch error
      setSuccess([]);setError([response.data.data.message]);
      scrollTop();setLoading(false);
    }else{
      if(response.data.status ===  'OK'){
        setError([]);
        setSuccess([response.data.message]);scrollTop();
      }else{
        setSuccess([]);setError([response.data.message]);scrollTop();
      }
    }
  }else{
    setSuccess([]);
    let errorMsg = t(message.JSE004);
    setError([errorMsg]);
  }
  scrollTop();searchTempData(currentPage, empName, empCode, empID, selectedFromDate, selectedToDate, leaveStatusState, leaveTypeState, deptState);
  setLoading(false);
}

let confirmOK = async() => {
  setError([]);setSuccess([]);
  setType(''); setContent(''); setShow(!show); setLoading(true);
  let obj = {
    method: 'post',
    url: `api/employee-leave-list/confirm`,
    params: {
      'leave_attach_id':confirmRejectIdList.toString(),
      'login_id':loginId,
      'company_id':companyId,
    }
  }
  let response = await ApiRequest(obj);
    setLoading(false);
  if(response.flag === false){
    // if(response.flag === false && response.data.data.status === 'NG'){
    //   setError(response.data.data.message);
    // }else{
    //   setError(response.message);
    // }
    setError(response.message);
  }else{
    setSuccess([response.data.message]);
    setAllCheck(false);
  }
  scrollTop();
  searchTempData(currentPage, empName, empCode, empID, selectedFromDate, selectedToDate, leaveStatusState, leaveTypeState, deptState);
  setLoading(false);
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
      let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyId } }
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
/**Start select autocomplete */
const selectAutocomplete = async (val, obj) => {
  let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyId } }
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

const changeDeleteCheckbox = () => {
  let show = !showDelete;let flag = false;
  setAllDelCheck(false);
  setShowDelete(show);
  let Data = mainTable.map(data =>{
    data.is_checked= false;
    data.is_del_checked= false;
    if(show === true ){
        if(data.can_delete === true){
            flag = true;
        }
    }else{
      if(data.is_approve === true){
        flag = true;
      }
    }
    return data;
  });
  setAllCheck(false);setMainTable(Data);setConfirmRejectShow(flag);
}

return (
  <CRow>
  <CCol xs="12">
    <Loading start={loading}/>
    <Message error={error} success={success} error2={error2} />
    <RejectModal
			open={open}
			close={reject}
			value={reason}
			change={(i)=>setReason(i.target.value)}
			error={rejectError}
			save={rejectOK}
		/>
		<Confirmation
			content={content}
			okButton={t('Ok')}
			cancelButton={t('Cancel')}
			type={type}
			show={show}
			cancel={()=>setShow(!show)}
			confirmOK={confirmOK}
			deleteOK={deleteOK}
		/>
    <FormData
      empID={empID} 
      empCode={empCode} 
      empName={empName} 
      empIDData={empIDData} 
      empCodeData={empCodeData} 
      empNameData={empNameData} 
      changeAutocomplete={changeAutocomplete}
      selectAutocomplete={selectAutocomplete}
      selectedFromDate={selectedFromDate} 
      handleFromDateChange={handleFromDateChange} 
      selectedToDate={selectedToDate} 
      handleToDateChange={handleToDateChange} 
      searchData={searchData}  
      leaveTypeAPI={leaveTypeAPI} 
      leaveTypeState={leaveTypeState} 
      leaveTypeChange={leaveTypeChange}
      leaveStatusAPI={leaveStatusAPI} 
      leaveStatusState={leaveStatusState} 
      leaveStatusChange={leaveStatusChange} 
      departmentAPI={departmentAPI} 
      deptState={deptState} 
      deptChange={deptChange}
      showDelete={showDelete} 
      setShowDelete={setShowDelete} 
      AllCheck={AllCheck}
      AllDelCheck={AllDelCheck}
      change_checkbox={change_checkbox} 
      change_del_checkbox={change_del_checkbox}
      rowCount={rowCount} 
      mainTable={mainTable} 
      detail={detail}
      confirmData={confirmData}
      rejectData={rejectData}
      deleteData={deleteData}
      changeDeleteCheckbox={changeDeleteCheckbox}
      setActivePage={setActivePage}
      currentPage={currentPage}
      lastPage={lastPage}
      disableOrNone = {disableOrNone}
      noData = {noData}
      confirmRejectShow={confirmRejectShow}
    />
  </CCol>
</CRow>
);
}
export default withTranslation()(LegacyWelcomeClass)