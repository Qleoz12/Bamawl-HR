/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CInput,CLabel,CButton,CFormGroup,CModal,CModalHeader,CModalBody,CButtonToolbar,CSelect} from '@coreui/react';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import message from '../../hr-common/common-message/CommonMessage';
import Dropdown from 'react-bootstrap/Dropdown';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { withTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import $ from 'jquery';
import Moment from 'moment';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import {ChangeDate} from '../../hr-common/change-date/ChangeDate';
import {validationWhiteSpace,formatDate,currentDate} from '../../hr-common/common-validation/CommonValidation'
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Table from './Table';
import Modal from './Modal';
import { useHistory } from "react-router-dom";
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory();
    const [ success, setSuccess] = useState([]); // for success message
    const [ error, setError ] = useState([]); // for error message
    const [ error2, setError2 ] = useState([]); // for error message
    const [ loading, setLoading ] = useState(false); // for loading
    const [ fromDate, setFromDate ] = useState(currentDate); // for from date
    const [ toDate, setToDate ] = useState(currentDate); // for to date
    const [ empID, setEmpID ] = useState(''); // for employee id autocomplete box 
    const [ empIDData, setEmpIDData ] = useState([]); // for employee id data for autocomplete box
    const [ empCode, setEmpCode ] = useState(''); // for employee code autocomplete box
    const [ empCodeData, setEmpCodeData ] = useState([]); // for employee code data for autocomplete box
    const [ empName, setEmpName ] = useState(''); // for employee name autocomplete box
    const [ empNameData, setEmpNameData ] = useState([]); // for employee name data for autocomplete box
    const [ confirmShow, setConfirmShow ] = useState(false); // for confirmation message box
    const [ content, setContent ] = useState(""); // for content confirmation message
    const [ confirmType, setConfirmType ] = useState(""); // for confirmation type 
    const [ currentPage, setCurrentPage ] = useState(1); // for current page
    const [ lastPage, setLastPage] = useState(1); // last page of paginate
    const [ total, setTotal ] = useState(''); // for total rows
    const [ mainTable, setMainTable ] = useState([]); // for main table
    const [ showDelete, setShowDelete ] = useState(false); // for show delete checkbox
    const [ disableOrNone, setDisableOrNone] = useState(true); // true: non disable / false: disable
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID'));  // for company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // login id
	const [ appStatusArr, setAppStatusArr] = useState([]);
	const [ appStatus, setAppStatus] = useState('');
    const [ totalOvertimeAmount, setTotalOvertimeAmount ] = useState([]); // for total overtime amount 
    const [ currency, setCurrency ] = useState([]); // for currency
    const [ approveReject, setApproveReject ] = useState(false); // for approve reject button show or hide 
    const [ showAmount, setShowAmount ] = useState(''); // for amount show or hide
    const [ modalShow, setModalShow ] = useState(false); // for modal show or hide 
    const [ modalError, setModalError ] = useState([]); // for modal error
    const [ remark, setRemark ] = useState(""); // for remark box
    const [ allCheck, setAllCheck ] = useState(false); // for all check box change
    const [ language, setLanguage ] = useState('en'); // for languange
    const [ confirmRejectShow, setConfirmRejectShow ] = useState(true); // for confirm reject button show hide
    const [ noData, setNoData ] = useState(''); //for data is not found error message

    /** Form Load */
    useEffect(() => {
        setLoading(true);indexAPI();getAppStatus();
        let data = JSON.parse(localStorage.getItem('AFTER_OT_REQ_DATA_RETURN'));
        localStorage.removeItem('AFTER_OT_REQ_DATA_RETURN');
        if(data != null){
            setAppStatus(data['approver_status']);
            setCurrentPage(data['current_page']);
            setEmpID(data['employee_id']);
            setEmpCode(data['employee_code']);
            setEmpName(data['employee_name']);
            setFromDate(data['from_date']);
            setToDate(data['to_date']);
            setShowDelete(data['show_delete_button']);
            searchBtn(data['current_page'],data['employee_id'],data['employee_code'],data['employee_name'],data['from_date'],data['to_date'],data['approver_status'] );
        }
    },[]);

    /** for form load function */
    const indexAPI = async (data) => {
        let obj = { method: 'post', url: 'api/employee-by-view-permission'
        , params: {
            'company_id': companyID,
            'login_employee_id': loginID
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
                if(property==loginID && response.data.autocomplete === false){
                setDisableOrNone(response.data.autocomplete);
                setEmpID(property);
                setEmpCode(object[loginID].code);
                setEmpName(object[loginID].name_eng);
                }
            }
            }
        }
    }
    /**
	* get approver status
	*
	* @author  Zin Min Myat
	* @create  21-07-2021 (D/M/Y)
	* @param
	* @return
	*/
	const getAppStatus = async () => {
		let obj = { url: 'api/allowance-request-list/approver-status', method: 'get', params: { login_id: loginID, company_id: companyID } }
        let response = await ApiRequest(obj);
        response.flag === false ? setAppStatusArr([]) : setAppStatusArr(response.data.data);
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

     /** Start from date change Function */
     let fromDateChange = (e)=>{
        setFromDate(ChangeDate(e));
        if(ChangeDate(e) > toDate){
            setToDate(null)
        }
    }
    /** End from date change Function */
     
    /** Start to date change Function */
    let toDateChange = (e)=>{
        setToDate(ChangeDate(e));
    }
    /** End to date change Function */

    /** Start search button Function */
    let searchBtn =async (page=currentPage, emp_id = empID, emp_code= empCode,emp_name= empName,from_date= fromDate,to_date = toDate,app_status= appStatus)=>{
        let error=[];let str=""; 
        if(fromDate == null ){
            error.push(t(message.JSE001).replace('%s', t('From Date')))
        }
        if(toDate == null ){
            error.push(t(message.JSE001).replace('%s', t('To Date')))
        }
        if(error.length>0){
            setError(error);$("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setSuccess([]);setError([]);setLoading(true); setNoData('');
            let object = { package_name: 'hr', url: `api/after-overtime-requests/search?page=${page}`, method: 'post', 
                            params: {   "login_id": loginID,
                                        "company_id": companyID,
                                        "employee_id": emp_id,
                                        "employee_code": emp_code,
                                        "employee_name": emp_name,
                                        "from_date": from_date,
                                        "to_date": to_date,
                                        "approver_status": app_status,
                                        "language": language
                                    } }
            let response = await ApiRequest(object);setLoading(false);
            if(response.flag === false){
                setNoData(response.message[0]);setMainTable([]);setError([]);
            }else{
                if(response.data.status === 'OK'){
                    let result = response.data.data.data;let flag = false;
                    let num = response.data.currencies.length;
                    let width = 1550+(num * 130)+"px";
                    result.forEach(data=>{
                        if(data.checkbox == true){
                            flag = true;
                        }
                    })
                
                    setMainTable(result);setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);setAllCheck(false);setTotal(response.data.data.total)
                    setTotalOvertimeAmount(response.data.total_overtime_amount);setCurrency(response.data.currencies);setApproveReject(response.data.approve_reject_btn);setShowAmount(response.data.show_amount);
                    $("#after-overtime-request-list").css("min-width",width);setConfirmRejectShow(flag);
                }else{
                    setSuccess([]);setError(response.data.message);setMainTable([]);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
            }
        }
    }
    /** End search button Function */

    /** Start search button Function */
    let tempSearchBtn =async (page=currentPage, emp_id = empID, emp_code= empCode,emp_name= empName,from_date= fromDate,to_date = toDate,app_status= appStatus)=>{
            let object = { package_name: 'hr', url: `api/after-overtime-requests/search?page=${page}`, method: 'post', 
                            params: {   "login_id": loginID,
                                        "company_id": companyID,
                                        "employee_id": emp_id,
                                        "employee_code": emp_code,
                                        "employee_name": emp_name,
                                        "from_date": from_date,
                                        "to_date": to_date,
                                        "approver_status": app_status,
                                        "language": language
                                    } }
            let response = await ApiRequest(object);setLoading(false);
            if(response.flag === false){
                setMainTable([]);setNoData(response.message[0]);
            }else{
                if(response.data.status === 'OK'){
                    let result = response.data.data.data;let flag = false;
                    let num = response.data.currencies.length;
                    let width = 1420+(num * 130)+"px";
                    result.forEach(data=>{
                        if(data.checkbox == true){
                            flag = true;
                        }
                    })
                    setMainTable(result);setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);setAllCheck(false);setTotal(response.data.data.total)
                    setTotalOvertimeAmount(response.data.total_overtime_amount);setCurrency(response.data.currencies);setApproveReject(response.data.approve_reject_btn);setShowAmount(response.data.show_amount);
                    $("#after-overtime-request-list").css("min-width",width);setConfirmRejectShow(flag);
                }else{
                    setSuccess([]);setError(response.data.message);setMainTable([]);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
            }
        
    }
    /** End search button Function */
    
    /** Start confirm button Function */
    let confirmBtn = ()=>{
        let flag = false;let error=[];let str=""; 
        mainTable.forEach(data=>{
            if(data.checkbox_checked == true){
                flag = true;
            }
            if(data.delete_checkbox_checked == true){
                flag = true;
            }
        })
        if(flag == false){
            setError([t(message.JSE001).replace('%s', t('Employee'))]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setContent(t("Are you sure want to confirm?"));setConfirmType("confirm");setConfirmShow(true);setError([]);
        }
    }
    /** End confirm button Function */

    /** Start reject button Function */
    let rejectBtn = ()=>{
        let flag = false;let error=[];let str=""; 
        mainTable.forEach(data=>{
            if(data.checkbox_checked == true){
                flag = true;
            }
            if(data.delete_checkbox_checked == true){
                flag = true;
            }
        })
        if(flag == false){
            setError([t(message.JSE001).replace('%s', t('Employee'))]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setModalShow(true);setError([]);
        }
    }
    /** End reject button Function */

    /** Start export button Function */
    let exportBtn =async ()=>{
        setLoading(true);
        let obj={
            method:"post", url:"api/after-overtime-requests/export",
            params:{
                "login_id": loginID,
                "company_id": companyID,
                "employee_id": empID,
                "employee_code": empCode,
                "employee_name": empName,
                "from_date": fromDate,
                "to_date": toDate,
                "approver_status": appStatus,
                "language": language
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
            setSuccess(["Successfully Downloaded!"]);window.scrollTo({top:0, left:0, behavior:'smooth'});setError([]);
        }
    }
    /** End export button Function */

    /** Start delete button Function */
    let deleteBtn = ()=>{
        let flag = false;let error=[];let str=""; 
        mainTable.forEach(data=>{
            if(data.delete_checkbox == true && data.delete_checkbox_checked == true ){
                flag = true;
            }
        })
        if(flag == false){
            setError([t(message.JSE001).replace('%s', t('Employee'))]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setContent(t("Are you sure want to delete?"));setConfirmType("delete");setConfirmShow(true);setError([]);
        }
        
    }
    /** End delete button Function */

    /** for pagination function */
    let setActivePage =(page)=>{
        setError([]);setSuccess([]);setLoading(true);searchBtn(page ,empID, empCode, empName, fromDate, toDate, appStatus);
    }

    /** for save button function */
    let  saveBtn=async ()=>{
        if(remark == ""){
            setModalError([t(message.JSE005).replace('%s', t('Reason'))]);
        }else{
            setModalShow(false);setLoading(true);let overtime_ids = [];setModalError([]);
            if(showDelete == false){
                mainTable.forEach(main=>{
                    if(main.checkbox_checked == true && main.checkbox == true){
                        overtime_ids.push(main.employee_overtime_id);
                    }
                })
            }else{
                mainTable.forEach(main=>{
                    if(main.delete_checkbox_checked == true && main.delete_checkbox == true){
                        overtime_ids.push(main.employee_overtime_id);
                    }
                })
            }
            let search = {
                "method":"patch",
                "url": "api/after-overtime-requests/reject",
                "params": {
                    "login_id": loginID,
                    "company_id": companyID,
                    "overtime_ids": overtime_ids,
                    "reason": remark,
                    "language": language
                    
                }
            }
            let response = await ApiRequest(search);
            if(response.flag == false){ // catch error
                setLoading(false);setSuccess([]);setError(response.message);setRemark('');
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                if(response.data.status == "OK"){
                    let len = currentPage;let res = mainTable.length - overtime_ids.length;
                    if(res == 0){
                        len = len - 1;
                    }
                    setAllCheck(false);setCurrentPage(len);setRemark('');         
                    setError([]);setSuccess([response.data.message]);
                    tempSearchBtn(len ,empID, empCode, empName, fromDate, toDate, appStatus);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }else if(response.data.status == "NG"){
                    setSuccess([]);setError(response.data.message);setRemark('');
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
                setLoading(false);
            }
        }
        
    }

    /*** show delete button function */
    let showDeleteChange =()=>{
        let show = !showDelete;let flag = false;
        setShowDelete(show);
        let Data = mainTable.map(data =>{
            data.checkbox_checked= false;
            data.delete_checkbox_checked= false;
            if(show == false ){
                if(data.checkbox == true){
                    flag = true;
                }
            }
            return data;
        });
        setAllCheck(false);setMainTable(Data);setConfirmRejectShow(flag);
    }

    /** Start all check box change function */ 
    let allCheckChange = ()=>{
        let Data = mainTable.map(data =>{
            data.checkbox_checked= !allCheck;
            data.delete_checkbox_checked= !allCheck;
            return data;
        });
        setAllCheck(!allCheck);
        setMainTable(Data)
    }
    /** End all check box change function */

    /** Start sub check box change function */
    let subCheckChange = (e)=>{
        let id = e.target.value;
        let data = mainTable.map(main=>{
        if(main.employee_overtime_id == id){
            if(showDelete == false){
                main.checkbox_checked = !main.checkbox_checked;
            }else{
                main.delete_checkbox_checked = !main.delete_checkbox_checked;
            } 
            return main;
        }
        return main;
        })
        setMainTable(data)
        let flag = true;
        data.forEach(data=>{
            if(showDelete == false && data.checkbox == true){
                if(data.checkbox_checked == false){
                    flag = false;
                }
            }else if(showDelete == true && data.delete_checkbox == true){
                if(data.delete_checkbox_checked == false){
                    flag = false;
                }
            }
        
        })
        setAllCheck(flag);
    }
    /** End sub check box change function */
    
    /** start confirm button function */
    let  confirmOK =async ()=>{
        setConfirmShow(false);setLoading(true);let overtime_ids = [];
        if(showDelete == false){
            mainTable.forEach(main=>{
                if(main.checkbox_checked == true && main.checkbox == true){
                    overtime_ids.push(main.employee_overtime_id);
                }
            })
        }else{
            mainTable.forEach(main=>{
                if(main.delete_checkbox_checked == true && main.delete_checkbox == true){
                    overtime_ids.push(main.employee_overtime_id);
                }
            })
        }
        let search = {
            "method":"patch",
            "url": "api/after-overtime-requests/confirm",
            "params": {
                "login_id": loginID,
                "company_id": companyID,
                "overtime_ids": overtime_ids,
                "language": language
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                let len = currentPage;let res = mainTable.length - overtime_ids.length;
                    if(res == 0){
                        len = len - 1;
                    }
                    setAllCheck(false);setCurrentPage(len);setRemark('');         
                    setError([]);setSuccess([response.data.message]);
                    tempSearchBtn(len ,empID, empCode, empName, fromDate, toDate, appStatus);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else if(response.data.status == "NG"){
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }

    /** start confirm button function */
    let deleteOK =async ()=>{
        setConfirmShow(false);setLoading(true);let overtime_ids = [];
        if(showDelete == false){
            mainTable.forEach(main=>{
                if(main.checkbox_checked == true){
                    overtime_ids.push(main.employee_overtime_id);
                }
            })
        }else{
            mainTable.forEach(main=>{
                if(main.delete_checkbox_checked == true && main.delete_checkbox == true){
                    overtime_ids.push(main.employee_overtime_id);
                }
            })
        }
        let search = {
            "method":"delete",
            "url": "api/after-overtime-requests/delete",
            "params": {
                "login_id": loginID,
                "company_id": companyID,
                "overtime_ids": overtime_ids,
                "language": language
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                let len = currentPage;let res = mainTable.length - overtime_ids.length;
                    if(res == 0){
                        len = len - 1;
                    }
                    setAllCheck(false);setCurrentPage(len);setRemark('');         
                    setError([]);setSuccess([response.data.message]);
                    tempSearchBtn(len ,empID, empCode, empName, fromDate, toDate, appStatus);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else if(response.data.status == "NG"){
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }

     /** Start detail button function */
     let detailChange = (id)=>{
        let data={
            "employee_id": empID,
            "employee_code": empCode,
            "employee_name": empName,
            "from_date": fromDate,
            "to_date": toDate,
            "approver_status": appStatus,
            "show_delete_button": showDelete,
            "current_page": currentPage,
            "employee_overtime_id": id
            
          };
        localStorage.setItem('AFTER_OT_REQ_DATA', JSON.stringify(data));
        let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/operation-request-for-salary/after-overtime-request-detail-information`);
    }
    /** End detail button function */
    
    return (
        <>
        <Loading start={loading}/>
        <Modal modalShow={modalShow} modalError={modalError} remark={remark} textAreaChange={(e)=>setRemark(e.target.value)} saveBtn={saveBtn} closeBtn={()=>setModalShow(false)} />
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('After Overtime Request List')}</CLabel></h5></CCardHeader>
                <CCardBody>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-2">
                        {disableOrNone == true &&
                            <>
                                <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}> 
                                    <CLabel htmlFor="emp_id">{t('Employee ID')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('id', i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />   
                                </CCol>
                                <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('code', i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />                
                                </CCol>
                                <CCol lg="4" >
                                    <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                    <Autocomplete onChange={(i) =>changeAutocomplete('name', i)} onSelect={selectAutocomplete} items={empNameData} name={empName} />   
                                </CCol>
                            </>
                        }
                        {disableOrNone == false &&
                            <>
                                <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}> 
                                    <CLabel htmlFor="emp_id">{t('Employee ID')}</CLabel>
                                    <CInput type="text" value={empID} className="bamawl-input" readOnly />
                                </CCol>
                                <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                    <CInput type="text" value={empCode} className="bamawl-input" readOnly />
                                </CCol>
                                <CCol lg="4" >
                                    <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                    <CInput type="text" value={empName} className="bamawl-input" readOnly /> 
                                </CCol>
                            </>
                        }
                        
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                        <CCol lg="5" >
                            <CLabel className="required">{t('From Date')}</CLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="yyyy-MM-dd"
                                    value={fromDate}
                                    onChange={fromDateChange}
                                    clearable={true}
                                    InputProps={{ readOnly: true }}
                                />
                            </MuiPickersUtilsProvider>
                                           
                        </CCol><CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                        <CCol lg="5" >
                            <CLabel className="required">{t('To Date')}</CLabel>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    format="yyyy-MM-dd"
                                    value={toDate}
                                    onChange={toDateChange}
                                    clearable={true}
                                    InputProps={{ readOnly: true }}
                                    minDate={fromDate}
                                />
                            </MuiPickersUtilsProvider>   
                            
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                        <CCol lg="5">
                            <CLabel htmlFor="approver_status">{t('Approver Status')}</CLabel>
                                <CSelect className="bamawl-select" value={appStatus} onChange={i=>setAppStatus(i.target.value)} custom>
                                    <option key="" value="">---{t('Select Approver Status')}---</option>
                                    {appStatusArr.length > 0 &&
                                        appStatusArr.map( i => {
                                            return( <option key={ i.id } value={ i.id }> { i.approver_status_name } </option> )
                                        } )
                                    }
                                </CSelect>               
                        </CCol>
                    </CRow>
                    <CRow alignHorizontal="center" className="mt-5">
                        <CButton  className="form-btn" onClick={()=>searchBtn()}>{t('Search')}</CButton> 
                    </CRow> 
                    {noData != ""  && 
                      <CRow lg="12" style={{margin:"5px 0px 0px 5px"}} className="mt-3">
                        <CLabel style={{color:"red"}}>※{noData}</CLabel>
                      </CRow>
                    }
                    <Table data={mainTable} confirmBtn={confirmBtn} rejectBtn={rejectBtn} exportBtn={exportBtn} deleteBtn={deleteBtn} showDelete={showDelete} showDeleteChange={showDeleteChange} currentPage={currentPage} lastPage={lastPage} setActivePage={setActivePage} total={total} totalOvertimeAmount={totalOvertimeAmount} currency={currency} approveReject={approveReject} showAmount={showAmount} allCheckBoxChange={allCheckChange} allCheck={allCheck} subCheckboxChange={subCheckChange} detailChange={detailChange} confirmRejectShow={confirmRejectShow} />
                    <Confirmation show={confirmShow} content={content} type={confirmType} confirmOK={confirmOK} deleteOK={deleteOK} okButton={t("Ok")} cancel={()=>setConfirmShow(false)}   cancelButton={t('Cancel')} />                  
                </CCardBody>
        </CCard>     
         
        </>
    );
                                
}

export default withTranslation()(LegacyWelcomeClass)
