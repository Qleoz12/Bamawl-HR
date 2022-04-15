import React ,{ useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg,CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty,checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage'; 
import Moment from 'moment';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import SearchData from './SearchData';
import TableListData from './TableListData';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
/**
 * Main Component
 * @author Su Pyae Maung
 * @create 25/03/2021
 * @modify 08/04/2021
 * @returns output shown in web page
 */
function LegacyWelcomeClass({t}) {
    const history                                 = useHistory();   // For edit link
    const [error,setError]                        = useState([]);   // For Error Message
    const [error2, setError2]                     = useState([]);   // For Error2 Message
    const [success,setSuccess]                    = useState([]);   // For Success Message
    const [loading, setLoading]                   = useState(false);// For Loading
    const [ disableOrNone, setDisableOrNone]      = useState(true); // For view permission true: non disable / false: disable
    const [departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
    const [appStatusArr, setAppStatusArr]         = useState([]);   // For Approver Status API
    const [deptState, setDeptState]               = useState('');   // For department id
    const [approverStatus, setApproverStatus]     = useState('');   // For approver status id
    const [empId, setEmpId]                       = useState('');   // For employee id 
    const [autocompleteID, setAutocompleteID]     = useState([]);   // For Autocomplete EMP ID
    const [empCode, setEmpCode]                   = useState('');   // For employee code
    const [autocompleteCode, setAutocompleteCode] = useState([]);   // For Autocomplete EMP CODE
    const [empName, setEmpName]                   = useState('');   // For employee name 
    const [autocompleteName, setAutocompleteName] = useState([]);   // For Autocomplete EMP NAME
    const [clearData, setClearData]               = useState('');
    const [selectedFromDate, setSelectedFromDate] = useState(()=>ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate]     = useState(()=>ChangeDate(new Date())); // For Joined End Date
    const [rowCount , setRowCount]                = useState('');   // For row count
    const [allCheck, setAllCheck]                 = useState(false);// For select checkbox all or not
    const [deleteIdList, setDeleteIdList]         = useState('');   // For delete data list
    const [editID, setEditID]                     = useState('');   // For Edit ID
    const [content, setContent]                   = useState('');   // For Confirmation box
    const [type, setType]                         = useState('');   // For Confirmation box
    const [show, setShow]                         = useState(false);// For show/hide confirmation box
    const [mainTable, setMainTable]               = useState([]);   // For Main Table
    const [deleteFlag, setDeleteFlag]             = useState(false);            // For Show Delete Button (table top)
    const [deleteShow, setDeleteShow]             = useState(false);            // For delete button show hide (table bottom)
    const [ confirmRejectShow, setConfirmRejectShow ] = useState(true); // for confirm reject button show hide
    const [open, setOpen]                         = useState(false);
    const [reason, setReason]                     = useState('');
    const [rejectError, setRejectError]           = useState([]);
    const [currentPage, setCurrentPage]           = useState(1);
    const [lastPage, setLastPage]                 = useState(0);
    const [total, setTotal]                       = useState(0);
    const [noData, setNoData]                     = useState('');   // For show There is no data!
    const [ loginID, setLoginID ]                 = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]             = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP
        
/** Form Load */
useEffect(() => {
    setLoading(true);
    let data = JSON.parse(localStorage.getItem('DETAIL_ID_RETURN'));
    localStorage.removeItem('DETAIL_ID_RETURN');
    if(data !== null){
        let { empId, empCode, empName, selectedFromDate, selectedToDate,  deptState, id, approverStatus , page} = data;
        setEmpId(empId); setEmpCode(empCode); setEmpName(empName); setSelectedFromDate(selectedFromDate); setSelectedToDate(selectedToDate);
        setDeptState(deptState); setApproverStatus(approverStatus); setCurrentPage(page);
        indexAPI(data);
    }
    loadDept();getAppStatus();getPermission();
},[]);

useEffect(()=> {
  if(clearData !== ''){
    setAutocompleteID([]); setAutocompleteName([]); setAutocompleteCode([]);
  }
},[clearData]);

/** View Permission Function */
const getPermission = async () => {
    let obj = { method: 'post', url: 'api/employee-by-view-permission', 
        params: {
            'company_id': companyID,
            'login_employee_id': loginID
        }  
    }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        setError(response.message);
    }else{
        let object = response.data.data;
        for (const property in object) {
            if(property == loginID && response.data.autocomplete === false){
                setDisableOrNone(response.data.autocomplete);
                setEmpId(property);
                setEmpCode(object[loginID].code);
                setEmpName(object[loginID].name_eng);
            }
        }
    }
}

/** show data from Dashboard or Detail page */
const indexAPI = async (data) => {
    let { empId, empCode, empName, selectedFromDate, selectedToDate,  deptState, id, approverStatus, page} = data;
    setLoading(true);setDeleteFlag(false);
    let params = {
        login_id: loginID, company_id: companyID, employee_code: empCode, employee_id: empId, employee_name: empName,
        from_date: selectedFromDate, to_date: selectedToDate, department_id: deptState, approver_status: approverStatus,
    }
    let obj = { method: 'post', url: 'api/forgetcard-list/search', params }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setMainTable([]); setError([]);setCurrentPage(1);
        setNoData(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setNoData('');
        if(response.data.data.data.length > 0){
            let result = response.data.data.data;let flag = false;
            result.forEach(data=>{
                if(data.is_approve == true){
                    flag = true;
                }
            });
            setConfirmRejectShow(flag);
            setMainTable(response.data.data.data);
            setCurrentPage(response.data.data.current_page); 
            setLastPage(response.data.data.last_page);
            setTotal(response.data.data.total);
        }else{
            let subtract_page = page - 1;
            if( subtract_page !== 0 ){
                searchAPI(subtract_page);
            }
        }
    }
}

const scrollTop = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }

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

/** Get All ApproverStatus From Database */
const getAppStatus = async () => {
    let obj = { url: 'api/allowance-request-list/approver-status', method: 'get', params: { login_id: loginID, company_id: companyID } }
    let response = await ApiRequest(obj);
    response.flag === false ? setAppStatusArr([]) : setAppStatusArr(response.data.data);
    setLoading(false);
}
let statusChange = (e) =>{ setApproverStatus(e.target.value); }

/* Pagination Function */
const changePaginate = (page) => {
    setCurrentPage(page);searchAPI(page);
    setError([]); setSuccess([]);
}

/** Search Function */
const search = () => {
    setError([]); setSuccess([]); setError2([]); searchAPI(1);
}
const searchAPI= async(page) => {
    let errMsg = [];
    if(!checkNullOrBlank(selectedFromDate)){let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str); }   
    if(!checkNullOrBlank(selectedToDate)){let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate > selectedToDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}

    if(checkNullOrBlank(errMsg)){
      setError(errMsg);setSuccess([]);
    }else{
        setAllCheck(false);setLoading(true);setDeleteFlag(false);
        // setMainTable([]); 
        let search = {
            method:"post",
            url: "api/forgetcard-list/search"+"?page="+page,
            params: {
                "login_id": loginID,
                "company_id": companyID,
                "employee_id": empId,
                "employee_code": empCode,
                "employee_name": empName,
                "department_id": deptState,
                "from_date": selectedFromDate, 
                "to_date": selectedToDate, 
                "approver_status": approverStatus, 
            }
        }
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
            setMainTable([]); setError([]);
            setNoData(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            setNoData('');
            if(response.data.data.data.length > 0){
                let result = response.data.data.data;let flag = false;
                result.forEach(data=>{
                    if(data.is_approve == true){
                        flag = true;
                    }
                });
                setConfirmRejectShow(flag);
                setMainTable(response.data.data.data);
                setCurrentPage(response.data.data.current_page);
                setLastPage(response.data.data.last_page);
                setTotal(response.data.data.total);
            }else{
                // setMainTable([]);
                let subtract_page = page - 1;
                if( subtract_page !== 0 ){
                    searchAPI(subtract_page);
                }
            }
        }
    }
}

/** Show/hide delete button Function */
const changeDelete = (i) => {
    // let data = mainTable.map(item => ({ ...item, is_checked: false }));
    // setAllCheck(false); setMainTable(data); setDeleteFlag(i.target.checked);
    let flag = false;
    let data = mainTable.map(data => { 
        data.is_checked = false;
            if(data.can_delete === true){
                flag = true;
            }
        return data;
    });
    setAllCheck(false); setMainTable(data); 
    setDeleteFlag(i.target.checked); setDeleteShow(flag); 
    //setConfirmRejectShow(flag);
}
let clickDelete = () => {
    setError([]); setSuccess([]); setError2([]);
    let id_list = [], id;
    for(let i = 0; i < mainTable.length; i++){
        if(mainTable[i].is_checked === true){
            id_list.push(mainTable[i].id);
        }
    }
    if(id_list.length > 0){
        setType('delete'); setContent('Are you sure want to delete?'); setShow(!show);
    }else{
        let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to delete'));
        setError([errMsg]); scrollTop();
    }
}
const deleteOK = async() => {
    let id_list = [], forget_request_id;
    for(let i = 0; i < mainTable.length; i++){
        if(mainTable[i].is_checked === true){
            id_list.push(mainTable[i].id);
        }
    }
    forget_request_id = id_list.toString();
    setType(''); setContent(''); setShow(!show);
    let params = {"login_id": loginID, "company_id": companyID, "id":forget_request_id}
    let obj = { method: "post", url: "api/forgetcard-list/delete", params }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        setError2(response.message);
    }else{
        setSuccess([response.data.message]);
        searchAPI(currentPage);
    }
    scrollTop();
}

/** Checkbox Function */
let change_checkbox = (i) => {
    let [ value, flag ] = i.target.value.split(',');
    let checked = i.target.checked;
    let data, id_list  = [], temp = [];
    if( flag === "false" ){ // confirm/reject condition
        if( value === "allcheck" ){
            data = mainTable.map(item =>
                item.is_approve === true ? { ...item, is_checked: checked } : item
            )
            setAllCheck(checked);
        }else{
            data = mainTable.map(item => {
                if(item.id === parseInt(value)){
                    temp.push({...item, is_checked: checked});
                    return { ...item, is_checked: checked }
                }else{
                    if(item.is_approve === true) temp.push({...item});
                    return item
                }
            });
            setAllCheck(temp.every(item => item.is_checked));
        }
    }else{ // delete condition
        if( value === "allcheck" ){
            data = mainTable.map(item => 
                item.can_delete === true ? { ...item, is_checked: checked } : item
            );
            setAllCheck(checked);
        }else{
            data = mainTable.map(item => {
                if(item.id === parseInt(value)){
                    temp.push({...item, is_checked: checked});
                    return { ...item, is_checked: checked }
                }else{
                    if(item.can_delete === true) temp.push({...item});
                    return item
                }
            });
            setAllCheck(temp.every(item => item.is_checked));
        }
    }
    setMainTable(data);
}

/** Confirmation Function */
let confirm = () => {
    setError([]); setSuccess([]); setError2([]);
    let id_list = [], forget_request_id;
    for(let i = 0; i < mainTable.length; i++){
        if(mainTable[i].is_checked === true){
            id_list.push(mainTable[i].id);
        }
    }
    if(id_list.length > 0){
        setType('save'); setContent(t('Are you sure want to confirm?')); setShow(!show);
    }else{
        let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to confirm'));
        setError([errMsg]); scrollTop();
    }
}
let confirmOK = async() => {
    let id_list = [], forget_request_id;
    for(let i = 0; i < mainTable.length; i++){
        if(mainTable[i].is_checked === true){
            id_list.push(mainTable[i].id);
        }
    }
    forget_request_id = id_list.toString();
    setType(''); setContent(''); setShow(!show);

    let obj = { 
        method: "post", url: "api/forgetcard-list/confirm",
        params: { "login_id": loginID, "company_id": companyID, "id": forget_request_id } 
    }
    let response = await ApiRequest(obj);
    if(response.flag === false){
        // if(response.data.data.status === "NG"){
        //     setError(response.data.data.message);
        // }else{
            setError(response.message);
        // }
    }else{
        setSuccess([response.data.message]);
    }
    searchAPI(currentPage);
    scrollTop();
}
/** Reject Function */
let reject = () => {
    setError([]); setSuccess([]); setError2([]);
    let id_list = [], forget_request_id;
    for(let i = 0; i < mainTable.length; i++){
        if(mainTable[i].is_checked === true){
            id_list.push(mainTable[i].id);
        }
    }
    if(id_list.length > 0){
        setReason(''); setOpen(!open); setRejectError([]);
    }else{
        let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to reject'));
        setError([errMsg]); scrollTop();
    }
}
let rejectOK = async() => {
    if(!checkNullOrBlank(reason)){
        let errMsg = t(message.JSE005).replace('%s',t('reason'));
        setRejectError([errMsg]);
    }else{
        setRejectError([]);setOpen(!open); setLoading(true);
        let id_list = [], forget_request_id;
        for(let i = 0; i < mainTable.length; i++){
            if(mainTable[i].is_checked === true){
                id_list.push(mainTable[i].id);
            }
        }
        forget_request_id = id_list.toString();
        let obj = {
            method: "post",
            url: "api/forgetcard-list/reject",
            params: { "login_id": loginID, "company_id": companyID, "id": forget_request_id, "denied_reason": reason }
        }
        let response = await ApiRequest(obj);setLoading(false);
        if(response.flag === false){
            // if(response.data.data.status === "NG"){
            //     setError(response.data.data.message);
            // }else{
                setError(response.message);
            // }
        }else{
            setSuccess([response.data.message]);
        }
        searchAPI(currentPage);
        scrollTop();
    }

}
/** Detail Function */
const detail = (i) => {
    let obj = { id:i.id, empId, empName, empCode, selectedFromDate, selectedToDate, deptState, approverStatus, page: currentPage};
    localStorage.setItem('DETAIL_ID', JSON.stringify(obj) );
    let customer_name = window.location.href.split("/")[3];
    history.push(`/${customer_name}/hr/operation-request-for-attendance/forget-card-detail-information`);
}
/**  Edit Function */
const edit = (id) => {
    localStorage.setItem('FORGETCARD_ID', JSON.stringify(id));
    let customer_name = window.location.href.split("/")[3];
    history.push(`/${customer_name}/hr/operation-request-for-attendance/forget-card-request`); 
}

return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Forget Card List')}</CLabel></h5></CCardHeader>
            <CCardBody>
            <SearchData 
                changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete}
                empId={empId} empCode={empCode} empName={empName}
                autocompleteID={autocompleteID} autocompleteCode={autocompleteCode} autocompleteName={autocompleteName}
                departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange} 
                appStatusArr={appStatusArr} approverStatus={approverStatus} statusChange={statusChange}
                selectedFromDate={selectedFromDate} changeFromDate={i=>setSelectedFromDate(ChangeDate(i))}
                selectedToDate={selectedToDate} changeToDate={i=>setSelectedToDate(ChangeDate(i))}
                search={search} disableOrNone={disableOrNone} noData={noData}
            />
            <TableListData
                mainTable={mainTable} rowCount={rowCount} allCheck={allCheck} 
                total={total} currentPage={currentPage} lastPage={lastPage}
                changePaginate={changePaginate}
                changeDelete={changeDelete} deleteFlag={deleteFlag} deleteShow={deleteShow}
                change_checkbox={change_checkbox} 
                confirm={confirm} reject={reject} delete={clickDelete}
                edit={edit} detail={detail} confirmRejectShow={confirmRejectShow}
            />
            <Confirmation
                content={content}
                okButton={t('Ok')}
                cancelButton={t('Cancel')}
                type={type}
                show={show}
                cancel={()=>setShow(!show)}
                saveOK={confirmOK}
                deleteOK={deleteOK}
            />
            <RejectModal
                open={open}
                close={reject}
                value={reason}
                change={(i)=>setReason(i.target.value)}
                error={rejectError}
                save={rejectOK}
            />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
export default withTranslation()(LegacyWelcomeClass);