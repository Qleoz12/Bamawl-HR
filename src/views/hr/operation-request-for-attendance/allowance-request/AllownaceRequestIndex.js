/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CImg,CLabel,CButton,CFormGroup,CModal,CModalHeader,CModalBody,CInputRadio,CSelect,CInput, CInputCheckbox} from '@coreui/react';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import message from '../../hr-common/common-message/CommonMessage';
import Dropdown from 'react-bootstrap/Dropdown';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withTranslation } from 'react-i18next';
import $ from 'jquery'
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import {ChangeDate} from '../../hr-common/change-date/ChangeDate';
import {validationWhiteSpace,formatDate, currentDate} from '../../hr-common/common-validation/CommonValidation'
import Method from '../../hr-common/method/Method';
import AttachFile from './AttachFile';
import ApproverModal from './ApproverModal';
import ApproverTable from './ApproverTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const [ success, setSuccess] = useState([]); // for success message
    const [ error, setError ] = useState([]); // for error message
    const [ error2, setError2 ] = useState([]); // for error message
    const [ loading, setLoading ] = useState(false); // for loading
    const [ empID, setEmpID ] = useState(''); // for employee id autocomplete box 
    const [ empIDData, setEmpIDData ] = useState([]); // for employee id data for autocomplete box
    const [ empCode, setEmpCode ] = useState(''); // for employee code autocomplete box
    const [ empCodeData, setEmpCodeData ] = useState([]); // for employee code data for autocomplete box
    const [ empName, setEmpName ] = useState(''); // for employee name autocomplete box
    const [ empNameData, setEmpNameData ] = useState([]); // for employee name data for autocomplete box
    const [ fromDate, setFromDate ] = useState(currentDate); // for from date
    const [ toDate, setToDate ] = useState(currentDate); // for to date
    const [ payAllowance, setPayAllowance ] = useState(0); // for pay allowance toggle
    const [ amount, setAmount ] = useState("0"); // for amount
    const [ allowanceNameData, setAllowanceNameData ] = useState([]); // for allowance name dropdown data
    const [ allowanceName, setAllowanceName ] = useState(''); // for allowance name
    const [ allowanceID, setAllowanceID ] = useState(""); // for allowance id
    const [ reqAttendance, setReqAttendance ] = useState(0); // for request for attendance
    const [ days, setDays ] = useState("0"); // for days
    const [ currencyID ,setCurrencyID ] = useState(""); // for currency id
    const [ totalAmount, setTotalAmount ] = useState("0"); // for total amount
    const [ currency, setCurrency ] = useState(""); // for currency
    const [ExcFileName, setExcFileName] = useState([]); // excel file name
    const [ExcFile, setExcFile] = useState([]); // excel file
    const [Remove, setRemove] = useState(false); // remove button
    const [ description, setDescription ] = useState(""); // for description
    const [Save, setSave] = useState(false); // save button
    const [ approver, setApprover ] = useState(""); // for selected approver
    const [ approverModalShow, setApproverModalShow ] = useState(false); // for approver modal show or hide
    const [ appModalError, setApproverModalError ] = useState([]); // for approver modal error message
    const [ approverModalData, setApproverModalData ] = useState([]); // for approver modal data
    const [ appAllCheck, setAppAllCheck ] = useState(false); // for approver all checkbox
    const [ appID, setAppID ] = useState(''); // for approver id autocomplete box
    const [ appCode, setAppCode ] = useState(''); // for approver code autocomplete box
    const [ appName, setAppName ] = useState(''); // for approver name autocomplete box
    const [ approverData, setApproverData ] = useState([]); // for approver data
    const [ addApproverData, setAddApproverData ] = useState([]); // for added approver data
    const [ appSetting, setAppSetting ] = useState(""); // for approver setting
    const [ confirmShow, setConfirmShow ] = useState(false); // for confirmation message box
    const [ content, setContent ] = useState(""); // for content confirmation message
    const [ confirmType, setConfirmType ] = useState(""); // for confirmation type 
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id
    const [ deptPosStatus, setDeptPosStatus ] = useState(""); // for department or position status
    const [ positionRank, setPositionRank ] = useState(JSON.parse(localStorage.getItem('POSITION_RANK')));  // for session position rank
    const [ viewPermission, setViewPermission ] = useState(true);
    /** Form Load */
    useEffect(() => {
        setLoading(true);
        setDays(1);index();
    },[]);
    /**  common view permission  */
    const indexAPI = async (appSetting) => {
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
                getAllowanceName(property);getDepartment(property);
                if(appSetting > 1){
                    getApproverData(property)
                }
               
                }
            }
            }else{
            setError(response.data.message);
            }
        }
    }
    
    /** Start index Function */
    let index =async ()=>{
        let obj = { package_name: 'hr', url: 'api/get-approver-setting', method: 'post',params: {company_id: companyID,login_id: loginID} }
        let response = await ApiRequest(obj);
        if(response.flag === false ){setError(response.message)}else{
            if(response.data.status == "OK"){
                setAppSetting(response.data.data.approver_setting);
                indexAPI(response.data.data.approver_setting);
            }else{
                setAppSetting('')
            }
        }
        
    }
    /** End index Function */

    /** Start get approver data Function */
    let getApproverData =async (id)=>{
        let obj = { package_name: 'hr', url: 'api/allowance-request/get-approver-data', method: 'post',params: {company_id: companyID,employee_id: id} }
        let response = await ApiRequest(obj);
        response.flag === false ? setError(response.message) : 
        response.data.status == "OK" ? setAddApproverData(response.data.data)  : setAddApproverData([])
    }
    /** End get approver data Function */
    
    /**Start change autocomplete */
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]);let val=i.target.value;
        // type is id, show name in Employee ID and clear remain input
        if(type === 'id'){
            setEmpID(val); setEmpCode(''); setEmpName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if(type === 'code') {
            setEmpID(''); setEmpCode(val); setEmpName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else{
            setEmpID(''); setEmpCode(''); setEmpName(val);
        }
        setAddApproverData([]);
        // if empty, remove data from autocomplete
        if(val === ''){
            setEmpID(''); setEmpName(''); setEmpCode('');
        }else{
            let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: val, company_id: companyID } }
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
        setLoading(true);
        let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
        let response = await ApiRequest(object);
        setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            if(response.data.data[0].employee_id !== null){setEmpID(response.data.data[0].employee_id);getDepartment(response.data.data[0].employee_id);getAllowanceName(response.data.data[0].employee_id);}else{setEmpID('')}
            if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
            if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
            if(appSetting == 2 || appSetting == 3 || appSetting == 4 || appSetting == 5){
                getApproverData(response.data.data[0].employee_id);
            }
            
            
        }
    }
    /**End select autocomplete */

    /** Start from date change Function */
    let fromDateChange = (e)=>{
        setFromDate(ChangeDate(e));
        if(ChangeDate(e) > toDate){
            setToDate(null)
        }
        if(toDate !== null ){
            let from = new Date(ChangeDate(e));  
            let to = new Date(toDate);  
            let time_difference = to.getTime() - from.getTime(); 
            let different_date =1+ time_difference / (1000 * 60 * 60 * 24);
            setDays(different_date);setTotalAmount(different_date*amount);
        }
    }
    /** End from date change Function */
     
    /** Start to date change Function */
    let toDateChange = (e)=>{
        setToDate(ChangeDate(e));
        if(fromDate !== null ){
            let from = new Date(fromDate);  
            let to = new Date(ChangeDate(e));  
            let time_difference = to.getTime() - from.getTime(); 
            let different_date =1+ time_difference / (1000 * 60 * 60 * 24);
            setDays(different_date);setTotalAmount(different_date*amount);
        }
     
    }
    /** End to date change Function */

    /** Start approver dropdown change Function */
    let approverDropdownChange=(e)=>{
        let id = e.target.value ;

        if(id != ""){
            let dataId = id.split('');
            let status = dataId[dataId.length-1] === "1" ? "department" : "position";
            setDeptPosStatus(status);setApprover(id);
        }else{
            setDeptPosStatus("");setApprover("");
        }
        
    }
    /** End approver dropdown change Function */

    /** Start pay allowance change Function */
    let payAllowanceChange = ()=>{
        if(payAllowance == 0){
            setPayAllowance(1)
        }else{
            setPayAllowance(0);
        }
       
    }
    /** End pay allowance change Function */

    /** Start  allowance name change Function */
    let allowanceNameChange = (e)=>{
        if(e.target.value != ""){
            let data = allowanceNameData.filter(i=> i.id == e.target.value);
            setCurrencyID(data[0].currency_id);setCurrency(data[0].currency_name);setAmount(data[0].allowance_amount);setTotalAmount(data[0].allowance_amount * days);setAllowanceID(data[0].id);setAllowanceName(data[0].others_allowance);
        }else{
            setCurrency("");setAmount("0");setTotalAmount("0");setAllowanceName('');setAllowanceID("")
        }
    }
    /** End  allowance name change Function */

    /** Start request for attendance change Function */
    let reqAttendanceChange = ()=>{
        if(reqAttendance == 0){
            setReqAttendance(1)
        }else{
            setReqAttendance(0)
        }
        
    }
    /** End  request for attendance change Function */
    
    /** Start File change Function */
    let changeFile = (i) => {
        let flag = false;setError([]);
        const zero = 0;let fileName=[...ExcFileName];let file=[...ExcFile];let mess ="";
        let File = i.target.files;
        if(ExcFileName.length >19 ){
            flag = true;mess = t(message.JSE009);
        }
        if(File.length >20 ){
            flag = true;mess = t(message.JSE009);
        }
        if(flag == false){
            for(let i=0 ; i<File.length ; i++){
                let name = File[i].name;
                ExcFileName.forEach(exc=>{
                    if(exc == name){flag = true; mess = t(message.JSE022)}
                })
                if(flag == false){
                    const fsize = File[i].size;
                    const size = Math.round((fsize / 1024));
                    if(size > 10000 ){
                        flag = true;mess = t(message.JSE014).replace('%s', t('This file\'s size')).replace('%s', t('10M'))
                    }
                }
                if(flag == false){
                    fileName.push(File[i].name);
                    file.push(File[i]);
                }
                
            }
        }
        if(flag == false){
            setExcFileName(fileName)
            setExcFile(file);
            setRemove(true);
            setSave(true);
        }else{
            setError([mess]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }
    }  
    /** End File change Function */

    /** Start Clear excel filename and file Function */
    let clearFile = (i) => {
        i.target.value = null;
    }
    /** End Clear excel filename and file Function */

    /** Start Clear excel filename and file Function */
    let removeFile = (val) => {
        let data = ExcFileName.filter(data=> data != val );
        setExcFileName(data);
        // setExcFile('');
        // setRemove(false);
        // setSave(false);
        // i.target.value = null;
    }
    /** End Clear excel filename and file Function */
          
    /** Start all checkbox change  Function */
    let  appAllCheckboxChange= () => {
        let Data = approverModalData.map(data =>{
            data.is_checked= !appAllCheck
            return data;
        });
        setAppAllCheck(!appAllCheck);
        setApproverModalData(Data)
    }
    /** End  all checkbox change Function */

    /** Start approver modal search button  Function */
    let searchBtn =async () => {
        setLoading(true);setError([]);setSuccess([]);let flag = true;let params="";let dataId = approver.slice(0, -1);
            if(deptPosStatus == "department"){
                params={"company_id":companyID,"employee_id": empID,"department_id": dataId,"position_id": ""}
            }else if(deptPosStatus == "position"){
                params={"company_id":companyID,"employee_id": empID,"department_id": "","position_id": dataId}
            }
        let search = {
            "method":"post",
            "url": "api/allowance-request/approver-on-department-data",
            "params": params
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError([]);setApproverModalError(response.message);
        }else{
            if(response.data.status == "OK"){
                setError([]);setSuccess([]);setApproverModalError([]);let data=response.data.data;
                setAppAllCheck(false);setApproverModalData(data);setLoading(false);
            }else if(response.data.status == "NG"){
                setSuccess([]);setApproverModalError(response.data.message);setError([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End approver modal search button Function */

    /** Start approver modal close button  Function */
    let  closeBtn= () => {
        setApproverModalShow(false);setApproverModalError([]);setApproverModalData([]);setAppName('');setAppCode('');setAppID('');
    }
    /** End approver modal close button Function */

    /** Start approver search button  Function */
    let  approverSearchBtn = () => {
        if(approver === ""){
            let errmsg = t(message.JSE001).replace('%s', t('Approver'));
            setError([errmsg]);
            $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setError([]);setSuccess([]);setApproverModalShow(true);setAppID(empID);setAppCode(empCode);setAppName(empName)
        }
        
    }
    /** End approver search button  Function */
 

     /** Start get Approver Function */
     const getDepartment = async (id) => {
        let obj = { package_name: 'erp', url: 'api/approver-list', method: 'post',params: {employee_id: id,company_id: companyID,device_flag: 1} }
        let response = await ApiRequest(obj);
        if(response.flag == false){ // catch error asdknkfasd
            // setSuccess([]);setError(response.message);
            // window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
               let temp = [];
                if(response.data.data.department != undefined){
                    if(response.data.data.department.length > 0 ){
                        response.data.data.department.forEach(dep=>{
                            temp.push({
                                "id": dep.id, 
                                "code": dep.department_code,
                                "name": dep.department_name,
                                "status": "department"
                            })
                        })
                        
                    }
                }
               if(response.data.data.position != undefined){
                if(response.data.data.position.length > 0){
                    response.data.data.position.forEach(pos=>{
                         temp.push({
                             "id": pos.id,
                             "code": "",
                             "name": pos.position_name,
                             "status": "position"
                         })
                    })
               }
               
                setApproverData(temp);
            }
            }else if(response.data.status == "NG"){
                setSuccess([]);setError([]);setApproverData([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
           
        }
    }
    /** End get Approver Function */

    /** Start get allowance name Function */
    let getAllowanceName=async (id)=>{
        setLoading(false);
        let obj = { package_name: 'hr', url: 'api/emp-sub-allowance-list', method: 'post' ,params: { "company_id":companyID,"employee_id": id}}
        let response = await ApiRequest(obj);
        if(response.flag === false ){
            setError(response.message);setAllowanceNameData([]);setAllowanceID("");
        }else{
            if(response.data.status == "OK"){
                setError([]);setAllowanceNameData(response.data.data);
            }else{
                setAllowanceNameData([])
            }
        }  
    }
    /** End get allowance name Function */
    
    /** Start employee list modal sub checkbox Function */
    let subCheckboxChange = (e)=>{
        let id = e.target.value;
        let data = approverModalData.map(main=>{
          if(main.approver_id == id){
            main.is_checked = !main.is_checked;
            return main;
          }
          return main;
        })
        setApproverModalData(data)
        let flag = true;
        data.forEach(data=>{
          if(data.is_checked == false){
            flag = false;
          }
        })
        setAppAllCheck(flag);
    }
    /** End employee list modal sub checkbox Function */

    /*** scroll function */
    let scrollModal = (modal_id) => {
        let element = document.getElementById(modal_id);
        element.scrollIntoView({behavior: "smooth", block: "start"});
    }

    /** Start approver modal add button Function */
    let  appAddBtn=()=>{
        let check = false;let flag= true;let str="";
        approverModalData.forEach(data => {
            if(data.is_checked == true){
            check = true ;
            }

        });
        if(check == false){
            let errmsg = t(message.JSE001).replace('%s', t('Approver'));
            setApproverModalError([errmsg]);
            let element = document.getElementById("approver-modal");
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }else{
            setApproverModalError([]);let add_app_data = addApproverData;
            approverModalData.forEach((item, i) => {
                // if checkbox is selected, check duplicate data exist or not
                if( item.is_checked === true ){
                    let { approver_id, applicant_id } = item;
                    addApproverData.forEach((add, ii) => {
                        // If material is same, store same data to array
                        if( applicant_id == add.applicant_id && approver_id == add.approver_id){
                            if(str!=""){
                                str = str +",";
                            }
                            str=str+approver_id;
                            flag=false;
                        }
                    });
                }
            })
            if(flag == false){
                setApproverModalError([t(message.JSE007).replace('%s',t('This approver ID(')+str+t(')'))]);
                scrollModal("approver-modal");
            }else{
                approverModalData.forEach(app=>{
                    if(app.is_checked == true){
                        add_app_data.push(app);
                    }
                })
                setAddApproverData(add_app_data);
                closeBtn();
                setAppAllCheck(false);
            }
            
        }
    }
    /** End approver modal add button Function */

    /** Start save button Function */
    let  saveBtn=()=>{
        setContent(t("Are you sure want to save?"));setConfirmType("save");setConfirmShow(true);setError([]);
    }
    /** End save button Function */

    /** Start approver tabel delete button Function */
    let  appDeleteBtn=(apl,app)=>{
        let data = addApproverData.filter(data=>{
            if(data.applicant_id !== apl ){return data; }else if(data.approver_id !== app){return data;}
        } );
        setAddApproverData(data);

    }
    /** End approver tabel delete button Function */
    
    
    /** Start save button Function */
    let  saveOk=async()=>{
           setError([]);setSuccess([]);setConfirmShow(false);setLoading(true);
            const formData  = new FormData();
            ExcFile.forEach((data,i)=>{
                formData.append(`files[${i}]`, data);
            })
            formData.append("company_id", companyID);
            formData.append("login_id",loginID );
            positionRank.forEach((pos,i)=>{
                formData.append(`position_rank[${i}]`, pos );
            })
            formData.append("calculate_flag",payAllowance );
            formData.append("attendance_flag",reqAttendance );
            formData.append("from_date",fromDate );
            formData.append("to_date",toDate );
            formData.append("description",description );
            formData.append("total_amount",totalAmount );
            formData.append("amount",amount );
            formData.append("allowance_id",allowanceID );
            formData.append("allowance_name",allowanceName );
            formData.append("employee_id", empID );
            formData.append("employee_name", empName );
            formData.append("employee_code", empCode.toString() );
            addApproverData.forEach((data,i)=>{
                formData.append(`approver_data[${i}][approver_id]`, data.approver_id);
                formData.append(`approver_data[${i}][approver_name]`, data.approver_name);
                formData.append(`approver_data[${i}][email]`, data.email);
                formData.append(`approver_data[${i}][approver_or_checker]`, data.approver_or_checker);
                formData.append(`approver_data[${i}][email_flag]`, data.email_flag);
    
            })
            formData.append("currency_id",currencyID );
            let search = {
                    "method":"post",
                    "url": "api/allowance-request",
                    "params": formData,
                "package_name": "hr"
            }
            let response = await ApiRequest(search);
            if(response.flag == false){ // catch error
                setLoading(false);setSuccess([]);setError(response.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                if(response.data.status == "OK"){
                    clear();setError([]);setSuccess([response.data.message]);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }else if(response.data.status == "NG"){
                    setSuccess([]);setError(response.data.message);
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
                setLoading(false);
            }
     }
     /** End save button Function */
    /**Start Clear variable function */
    let clear = ()=>{
        if(viewPermission == true){
            setEmpID('');setEmpIDData([]);setEmpCode('');setEmpCodeData([]);setEmpName('');setEmpNameData([]);
        }
        setFromDate(currentDate);setToDate(currentDate);setPayAllowance(0);setAmount(0);setAllowanceName('');setAllowanceID('');setReqAttendance(0);setDays("0");setCurrencyID("");setTotalAmount("0");setCurrency("");setExcFileName([]);setExcFile([]);setRemove(false);setDescription("");setApprover("");setAppID('');setAppCode('');setAppName('');setApproverData([]);setAddApproverData([]);
    }
    /**End Clear variable function */
    
    return (
        <>
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader>
                <h5><CLabel className="m-0">{t('Allowance Request')}</CLabel></h5>
            </CCardHeader>
                <CCardBody>
                    <CRow lg="12" style={{marginBottom:'10px'}}>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_id" className="required">{t('Employee ID')}</CLabel>
                                {viewPermission > 0 &&
                                    <Autocomplete onChange={(i) =>changeAutocomplete('id', i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />
                                }
                                {viewPermission < 1 &&
                                    <CInput type="text" value={empID} className="bamawl-input" readOnly />
                                }
                        </CCol>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                {viewPermission > 0 &&
                                    <Autocomplete onChange={(i) =>changeAutocomplete('code', i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />
                                }
                                {viewPermission < 1 &&
                                    <CInput type="text" value={empCode} className="bamawl-input" readOnly />
                                }
                        </CCol>
                        <CCol lg="4" >
                                <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                {viewPermission > 0 &&
                                    <Autocomplete onChange={(i) =>changeAutocomplete('name', i)} onSelect={selectAutocomplete} items={empNameData} name={empName} />
                                }
                                {viewPermission < 1 &&
                                    <CInput type="text" value={empName} className="bamawl-input" readOnly />
                                }
                                   
                        </CCol>
                    </CRow>
                    <CRow className="mt-4">
                        <CCol lg="5" >
                                <CLabel  className="required">{t('From Date')}</CLabel>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        className="date-css"
                                        format="yyyy-MM-dd"
                                        value={fromDate}
                                        onChange={fromDateChange}
                                        clearable={true}
                                        InputProps={{ readOnly: true }}
                                    />
                                </MuiPickersUtilsProvider>
                        </CCol> <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                        <CCol lg="5"  >
                                <CLabel  className="required">{t('To Date')}</CLabel>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        className="date-css"
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
                    <CRow className="mt-4">
                        <CCol lg="5" >
                            <CLabel className="required">{t('Description')}</CLabel>
                            <CInput type="text" className="bamawl-input" value={description}  onChange={(e)=> setDescription(e.target.value)} />
                         
                        </CCol> <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                        <CCol lg="5"  >
                            <CLabel className="required">{t('Allowance Payment')}</CLabel>
                            <div style={{marginLeft: "15px"}}>
                            <CRow>
                                <p className="mr-5">{t('Pay Allowance')}</p>
                                <div className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        className="toggle-switch-checkbox"
                                        id='payAllowance'
                                        value={payAllowance}
                                        checked={payAllowance}
                                        onChange={payAllowanceChange}
                                    />
                                    <label className="toggle-switch-label" htmlFor='payAllowance'>
                                        <span className='toggle-switch-inner-2'/>
                                        <span className="toggle-switch-switch"/>
                                    </label>
                                </div>
                            </CRow>
                                
                            </div> 
                        </CCol>
                    </CRow>
                
                    <CRow className="mt-4">
                        <CCol lg="5" >
                            <CLabel className="required">{t('Allowance Name')}</CLabel>
                            <CSelect  className="bamawl-select " custom  id="approver" value={allowanceID} onChange={allowanceNameChange}>
                                        <option key="" value="">---Select---</option>
                                        {
                                            allowanceNameData.length >0 &&
                                                allowanceNameData.map((i,index) => {
                                                    return( 
                                                          <option key={index} name={i.id} value={i.id}>{i.others_allowance}</option>
                                                    )
                                                })
                                        }
                                    </CSelect>
                        
                        </CCol> <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                        <CCol lg="5"  >
                            <CLabel className="required">{t('Request For Attendance')}</CLabel>
                            <CRow>
                                <CLabel style={{marginTop: "5px", marginLeft: "15px",fontWeight: "unset"}} htmlFor="request_for_attendance">{t('Request For Attendance')}</CLabel>
                                <CInputCheckbox id="request_for_attendance" name="method" checked={reqAttendance} value={reqAttendance} onChange={reqAttendanceChange} style={{marginLeft: "180px", marginTop: "8px"}}/>
                            </CRow>
                        </CCol>
                    </CRow>
                
                    {payAllowance === 1 &&
                        <CRow className="mt-4">
                            <CCol lg="5" >
                                <CLabel className="">{t('Days')}</CLabel>
                                <CInput type="text" id="days" className="bamawl-input" value={days} disabled />
                            </CCol> <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                            <CCol lg="5"  >
                                <CLabel className="">{t('Total Amount')}</CLabel>
                                <CInput type="text" id="total_amount" className="bamawl-input" value={totalAmount} disabled />
                                <CCol lg="12" className="mt-2">
                                    <CRow alignHorizontal="end">
                                        <p>({amount}x{days}){currency}</p>
                                    </CRow>
                                </CCol>
                            </CCol>
                        </CRow>
                    }
                    <AttachFile onChange={changeFile} onClick={clearFile} removeFile={removeFile} Remove={Remove} removeFile={removeFile} ExcFileName={ExcFileName}/>
                    {
                        empID != "" && empCode != "" && empName != "" &&  (appSetting == 1 || appSetting == 4 || appSetting == 5) && !positionRank.includes(0) &&
                        <CRow lg="12" className="mt-5">
                            <CCol lg="4">
                                <CLabel className="required">{t('Approver')}</CLabel>
                                <CSelect  className="bamawl-select " custom  id="approver" value={approver} onChange={approverDropdownChange}>
                                    <option key="" value="">---Select---</option>
                                    {
                                            approverData.length >0 &&
                                                approverData.map(i => {
                                                    return( <option key={i.id} value={i.id+(i.status === 'department' ? '1' : '2')}>{ i.name }</option>)})
                                    }
                                </CSelect>
                            </CCol>
                            <CCol lg="2" style={{marginTop: "27px"}}>
                                <CButton  className="form-btn" onClick={approverSearchBtn}>{t('Search')}</CButton>
                            </CCol>
                           
                        </CRow>
                    }
                    <ApproverModal appModalError={appModalError} approverModalShow={approverModalShow} data={approverModalData} appAllCheck={appAllCheck} allCheckBoxChange={appAllCheckboxChange} subCheckboxChange={subCheckboxChange} searchBtn={searchBtn} closeBtn={closeBtn} appID={appID}  appCode={appCode}  appName={appName}  addBtn={appAddBtn}  />
                    {
                        empID != "" && addApproverData.length > 0 && !positionRank.includes(0) &&
                        <CCol lg="3" className="mt-5">
                            <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Approver Data')}</CLabel>
                        </CCol>
                    }
                    
                    <ApproverTable data={addApproverData} saveBtn={saveBtn} deleteBtn={appDeleteBtn} positionRank={positionRank}  />
                    <Confirmation show={confirmShow} content={content} type={confirmType} saveOK={saveOk} okButton={t("Ok")} cancel={()=>setConfirmShow(false)}  cancelButton={t('Cancel')} />                  
                    
                </CCardBody>
        </CCard>     
         
        </>
    );
                                
}

export default withTranslation()(LegacyWelcomeClass)
