/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CPagination,CLabel,CButton,CInput,CModal,CModalHeader,CModalBody,CButtonToolbar,CSelect} from '@coreui/react';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import message from '../../hr-common/common-message/CommonMessage';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import {ChangeDate} from '../../hr-common/change-date/ChangeDate';
import {validationWhiteSpace,formatDate,currentDate} from '../../hr-common/common-validation/CommonValidation'
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Table from './Table';
import { useHistory } from "react-router-dom";

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory();
    const [ success, setSuccess] = useState([]); // for success message
    const [ error, setError ] = useState([]); // for error message
    const [ error2, setError2 ] = useState([]); // for error message
    const [ loading, setLoading ] = useState(false); // for loading
    const [ department, setDepartment ] = useState(''); // for department name autocomplete box
    const [ departmentData, setDepartmentData ] = useState([]); // for department data for autocomplete box
    const [ role, setRole ] = useState(''); // for role name autocomplete box  
    const [ roleData, setRoleData ] = useState([]); // for role data for autocomplete box
    const [ fromDate, setFromDate ] = useState(null); // for from date
    const [ toDate, setToDate ] = useState(null); // for to date
    const [ empID, setEmpID ] = useState(''); // for employee id autocomplete box 
    const [ empIDData, setEmpIDData ] = useState([]); // for employee id data for autocomplete box
    const [ empCode, setEmpCode ] = useState(''); // for employee code autocomplete box
    const [ empCodeData, setEmpCodeData ] = useState([]); // for employee code data for autocomplete box
    const [ empName, setEmpName ] = useState(''); // for employee name autocomplete box
    const [ empNameData, setEmpNameData ] = useState([]); // for employee name data for autocomplete box
    const [ deductCategoryData, setDeductCategoryData ] = useState([]); // for deduction category data
    const [ deductCategory, setDeductCategory ] = useState(''); // for selected deduction category
    const [ deductName, setDeductName ] = useState(""); // for deduction name 
    const [ deductNameData, setDeductNameData ] = useState([]); // for deduction name data
    const [ mainTable, setMainTable ] = useState([]); // for main table data
    const [ allCheck, setAllCheck ] = useState(false); // for all check box change
    const [ confirmShow, setConfirmShow ] = useState(false); // for confirmation message box
    const [ content, setContent ] = useState(""); // for content confirmation message
    const [ confirmType, setConfirmType ] = useState(""); // for confirmation type 
    const [ currentPage, setCurrentPage ] = useState(1); // for current page
    const [ lastPage, setLastPage] = useState(1); // last page of paginate
    const [ total, setTotal ] = useState(''); // for total rows
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id
    const [ viewPermission, setViewPermission] = useState(true);  // for view permission
    const [ noData, setNoData ] = useState(''); //for data is not found error message

    /** Form Load */
    useEffect(() => {
        setLoading(true);
        getDepartment();getRole();getDeductCategory();getDeductName();indexAPI();
    },[]);

     /**  common view permission  */
     const indexAPI = async () => {
        setLoading(true);
        let obj = { method: 'post', url: 'api/employee-by-view-permission'
        , params: {
            'company_id': companyID,
            'login_employee_id': loginID
            } 
        }
        let response = await ApiRequest(obj); 
        setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            let status = response.data.status;
            if(status == 'OK'){
            let object = response.data.data;
            
            for (const property in object) {
                if(property==loginID && response.data.autocomplete === false){
                setViewPermission(response.data.autocomplete);
                setEmpID(property);
                setEmpCode(object[loginID].code);
                setEmpName(object[loginID].name_eng);
               
                }
            }
            }else{
            setError(response.data.message);
            }
        }
    }
    /** Start get deduction Category function */
    let getDeductCategory =async ()=>{
        let obj = {url: 'api/get-deduction-category-list', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDeductCategoryData([]) : setDeductCategoryData(response.data.data);
    }
    /** End get deduction Category function */

    /** Start get deduction name function */
    let getDeductName =async ()=>{
        let obj = {url: 'api/get-deduction-name-list', method: 'post',params: {company_id: companyID} }
        let response = await ApiRequest(obj);setLoading(false);
        response.flag === false ? setDeductNameData([]) : setDeductNameData(response.data.data);
    }
    /** End get deduction name function */

    /** Start get Department Function */
    const getDepartment = async () => {
        let obj = {package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDepartmentData([]) : setDepartmentData(response.data.data);
    }
    /** End get Department Function */

    /** Start get Department Function */
    const getRole = async () => {
        let obj = { package_name: 'hr', url: 'api/admin-level', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setRoleData([]) : setRoleData(response.data.data);
        setLoading(false);
    }
    /** End get Department Function */

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

    /** Start Search Btn function */
    let searchBtn =async (page=currentPage)=>{
        setLoading(true);setError([]);setSuccess([]);setNoData("");
        let search = {
            "method":"post",
            "url": `api/employee-deduction-request-list/search?page=${page}`,
            "params": {
                "login_id":loginID,
                "company_id":companyID,
                "department_id": department,
                "role_id": role,
                "employee_id": empID,
                "employee_name": empName,
                "employee_code": empCode,
                "join_from_date": fromDate,
                "join_to_date": toDate,
                "deduction_category_id": deductCategory,
                "deduction_name_id": deductName
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setNoData(response.message[0]);setError2([]);setMainTable([]);setError([]);
        }else{
            
            if(response.data.status == "OK"){
               setMainTable(response.data.data.data);setSuccess([]);setError([]);setError2([]);setTotal(response.data.data.total);setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);setAllCheck(false);
            }else if(response.data.status == "NG"){
                setSuccess([]);setError(response.data.message);setError2([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
        setLoading(false);
    }
    /** End Search Btn function */

    /** Start all check box change function */
    let allCheckChange = ()=>{
        let Data = mainTable.map(data =>{
            data.is_checked= !allCheck;
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
          if(main.id == id){
            main.is_checked = !main.is_checked;
            return main;
          }
          return main;
        })
        setMainTable(data)
        let flag = true;
        data.forEach(data=>{
          if(data.is_checked == false){
            flag = false;
          }
        })
        setAllCheck(flag);
    }
    /** End sub check box change function */

    /** Start edit button function */
    let editBtn = (id)=>{
        localStorage.setItem('DEDUCTION_ID', JSON.stringify(id));
        let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/operation-request-for-salary/employee-deduction-request`);
    }
    /** End edit button function */

    /** Start delete button function */
    let deleteBtn = ()=>{
        let error=[];let flag=false;
        mainTable.forEach(data=>{
            if(data.is_checked == true){
                flag=true;
            }
        })
        if(flag == false){
            setError([t(message.JSE001).replace('%s', t('Employee'))]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setSuccess([]); setError([]);setContent(t("Are you sure want to delete?"));setConfirmType("delete");setConfirmShow(true);
        }
    }
    /** End delete button function */
    
    /** Start confirm save ok function */
    let deleteOK =async ()=>{
        setConfirmShow(false);setLoading(true);let str="";let count = 0;
        mainTable.forEach(main=>{
            if(main.is_checked == true){
                if(str != ""){ str = str+",";}
                    str = str+main.id ;
                    count = count + 1;
            }
        })
        
        let search = {
            "method":"post",
            "url": "api/employee-deduction-request-list/delete",
            "params": {
                "employee_deduction_requset_id": str,
                "login_id": loginID,
                "login_form": "Employee Deduction Request List",
                "company_id":companyID
                
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);setError2([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            
            if(response.data.status == "OK"){
                let page = currentPage;
                if(mainTable.length == count ) { page = page - 1}
                setSuccess([response.data.message]);setError([]);setError2([]);
                setMainTable([]);setAllCheck(false);
                setCurrentPage(1);setLastPage(1);setTotal('');tempSearchBtn(page);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else if(response.data.status == "NG"){
                setSuccess([]);setError(response.data.message);setError2([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End confirm save ok function */
    /** for pagination function */
    let setActivePage =(page)=>{
        setError([]);setSuccess([]);setLoading(true);searchBtn(page);  
    }

    /** temp search */
    let tempSearchBtn =async (page)=>{
        setLoading(true);
        let search = {
            "method":"post",
            "url": `api/employee-deduction-request-list/search?page=${page}`,
            "params": {
                "login_id":loginID,
                "company_id":companyID,
                "department_id": department,
                "role_id": role,
                "employee_id": empID,
                "employee_name": empName,
                "employee_code": empCode,
                "join_from_date": fromDate,
                "join_to_date": toDate,
                "deduction_category_id": deductCategory,
                "deduction_name_id": deductName
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setNoData(response.message[0]);setMainTable([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            
            if(response.data.status == "OK"){
               setMainTable(response.data.data.data);setTotal(response.data.data.total);setCurrentPage(response.data.data.current_page);setLastPage(response.data.data.last_page);
            }else if(response.data.status == "NG"){
                setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
        setLoading(false);
    }
    
    return (
        <>
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Employee Deduction Request List')}</CLabel></h5></CCardHeader>
                <CCardBody>
                    <CRow lg="12" style={{marginBottom:'10px'}}>
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel htmlFor="department_name">{t('Department Name')}</CLabel>
                                <CSelect  className="bamawl-select" custom  id="department_name" value={department} onChange={(i)=>{setDepartment(i.target.value);}}>
                                <option key="" value="">---Select---</option>
                                {
                                    departmentData != "" &&
                                        departmentData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.department_name }</option>)})
                                }
                            </CSelect>                  
                        </CCol>
                        <CCol lg="6" >
                            <CLabel htmlFor="role">{t('Role')}</CLabel>
                            <CSelect  className="bamawl-select" custom  id="role" value={role} onChange={(i)=>{setRole(i.target.value);}}>
                                <option key="" value="">---Select---</option>
                                {
                                    roleData.length > 0 &&
                                    roleData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.admin_level_name }</option>)})
                                }
                            </CSelect>
                                
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel>{t('Joined Date (From)')}</CLabel>
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
                                           
                        </CCol>
                        <CCol lg="6" >
                            <CLabel>{t('Joined Date (To)')}</CLabel>
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
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                            {viewPermission > 0 &&
                                <Autocomplete onChange={(i) =>changeAutocomplete('name', i)} onSelect={selectAutocomplete} items={empNameData} name={empName} />         
                            }
                            {viewPermission < 1 &&
                                <CInput type="text" value={empName} className="bamawl-input" readOnly />
                            }
                        </CCol>
                        <CCol lg="6" > 
                            <CLabel htmlFor="emp_id">{t('Employee ID')}</CLabel>
                                {viewPermission > 0 &&
                                    <Autocomplete onChange={(i) =>changeAutocomplete('id', i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />     
                                }
                                {viewPermission < 1 &&
                                    <CInput type="text" value={empID} className="bamawl-input" readOnly />
                                }
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                {viewPermission > 0 &&
                                    <Autocomplete onChange={(i) =>changeAutocomplete('code', i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />                  
                                }
                                {viewPermission < 1 &&
                                    <CInput type="text" value={empCode} className="bamawl-input" readOnly />
                                }
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel htmlFor="department_name">{t('Deduction Category')}</CLabel>
                                <CSelect  className="bamawl-select" custom  id="deduction_category" value={deductCategory} onChange={(i)=>{setDeductCategory(i.target.value);}}>
                                <option key="" value="">---Select---</option>
                                {
                                    deductCategoryData != "" &&
                                    deductCategoryData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.category_name }</option>)})
                                }
                            </CSelect>                  
                        </CCol>
                        <CCol lg="6" >
                            <CLabel htmlFor="role">{t('Deduction Name')}</CLabel>
                            <CSelect  className="bamawl-select" custom  id="deduction_name" value={deductName} onChange={(i)=>{setDeductName(i.target.value);}}>
                                <option key="" value="">---Select---</option>
                                {
                                    deductNameData.length > 0 &&
                                    deductNameData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.deduction_name }</option>)})
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
                    <Table data={mainTable} allCheckBoxChange={allCheckChange} allCheck={allCheck} subCheckboxChange={subCheckChange} editBtn={editBtn} deleteBtn={deleteBtn} currentPage={currentPage} lastPage={lastPage} setActivePage={setActivePage} total={total} />
                    <Confirmation show={confirmShow} content={content} type={confirmType} deleteOK={deleteOK} okButton={t("Ok")} cancel={()=>setConfirmShow(false)}  cancelButton={t('Cancel')} />                  
                  
                </CCardBody>
        </CCard>     
         
        </>
    );
                                
}

export default withTranslation()(LegacyWelcomeClass)
