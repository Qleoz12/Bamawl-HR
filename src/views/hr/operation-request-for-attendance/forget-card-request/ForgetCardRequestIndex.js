/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CImg,CLabel,CButton,CFormGroup,CModal,CModalHeader,CModalBody,CButtonToolbar,CSelect, CInput} from '@coreui/react';
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
import EmployeeListModal from './EmployeeListModal';
import EmployeeListTable from './EmployeeListTable';
import SettingTable from './SettingTable';
import ApproverModal from './ApproverModal';
import ApproverTable from './ApproverTable';
import {validationWhiteSpace,formatDate,currentDate} from '../../hr-common/common-validation/CommonValidation'
import CommonAlert from '../../hr-common/common-alert/CommonAlert'
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
    const [ empListModalShow, setEmpListModalShow ] = useState(false); // for employee list modal show hide 
    const [ empListModalData, setEmpListModalData ] = useState([]); // for employee list modal data
    const [ empAllCheck, setEmpAllCheck ] = useState(false); // for employee list modal all check box
    const [ departmentData, setDepartmentData ] = useState([]); // for department data
    const [ positionData, setPositionData ] = useState([]); // for position data
    const [ department, setDepartment ] = useState(""); // for checked department
    const [ position, setPosition ] = useState(""); // for checked position
    const [ empModalError, setEmpModalError ] = useState([]); // for employee list modal error message
    const [ addEmpListData, setAddEmpListData ] = useState([]); // for added employee list data
    const [ fromDate, setFromDate ] = useState(currentDate); // for from date
    const [ toDate, setToDate ] = useState(currentDate); // for to date
    const [ settingTableData, setSettingTableData ] = useState([]); // for setting table data
    const [ inOutStatusData, setInOutStatusData ] = useState([{id: "1",name: "In"},{id: "2",name: "Out"},{id: "3",name: "Both"}])
    const [ inHrData, setInHrData ] = useState([{id:'00'},{id: '01'},{id: '02'},{id: '03'},{id: '04'},{id: '05'},{id: '06'},{id: '07'},{id: '08'},{id: '09'},{id: '10'},{id: '11'},{id: '12'},{id: '13'},{id: '14'},{id: '15'},{id: '16'},{id: '17'},{id: '18'},{id: '19'},{id: '20'},{id: '21'},{id: '22'},{id: '23'}]);
    const [ outHrData, setOutHrData ] =  useState([{id:'00'},{id: '01'},{id: '02'},{id: '03'},{id: '04'},{id: '05'},{id: '06'},{id: '07'},{id: '08'},{id: '09'},{id: '10'},{id: '11'},{id: '12'},{id: '13'},{id: '14'},{id: '15'},{id: '16'},{id: '17'},{id: '18'},{id: '19'},{id: '20'},{id: '21'},{id: '22'},{id: '23'}]);
    const [ inMinData, setInMinData ] = useState([{id:'00'},{id: '01'},{id: '02'},{id: '03'},{id: '04'},{id: '05'},{id: '06'},{id: '07'},{id: '08'},{id: '09'},{id: '10'},{id: '11'},{id: '12'},{id: '13'},{id: '14'},{id: '15'},{id: '16'},{id: '17'},{id: '18'},{id: '19'},{id: '20'},{id: '21'},{id: '22'},{id: '23'},{id: '24'},{id: '25'},{id: '26'},{id: '27'},{id: '28'},{id: '29'},{id: '30'},{id: '31'},{id: '32'},{id: '33'},{id: '34'},{id: '35'},{id: '36'},{id: '37'},{id: '38'},{id: '39'},{id: '40'},{id: '41'},{id: '42'},{id: '43'},{id: '44'},{id: '45'},{id: '46'},{id: '47'},{id: '48'},{id: '49'},{id: '50'},{id: '51'},{id: '52'},{id: '53'},{id: '54'},{id: '55'},{id: '56'},{id: '57'},{id: '58'},{id: '59'}]);
    const [ outMinData, setOutMinData ] = useState([{id:'00'},{id: '01'},{id: '02'},{id: '03'},{id: '04'},{id: '05'},{id: '06'},{id: '07'},{id: '08'},{id: '09'},{id: '10'},{id: '11'},{id: '12'},{id: '13'},{id: '14'},{id: '15'},{id: '16'},{id: '17'},{id: '18'},{id: '19'},{id: '20'},{id: '21'},{id: '22'},{id: '23'},{id: '24'},{id: '25'},{id: '26'},{id: '27'},{id: '28'},{id: '29'},{id: '30'},{id: '31'},{id: '32'},{id: '33'},{id: '34'},{id: '35'},{id: '36'},{id: '37'},{id: '38'},{id: '39'},{id: '40'},{id: '41'},{id: '42'},{id: '43'},{id: '44'},{id: '45'},{id: '46'},{id: '47'},{id: '48'},{id: '49'},{id: '50'},{id: '51'},{id: '52'},{id: '53'},{id: '54'},{id: '55'},{id: '56'},{id: '57'},{id: '58'},{id: '59'}]);
    const [ inOutStatus, setInOutStatus ] = useState(""); // for in out status 
    const [ inHr, setInHr ] = useState(""); // for in hour 
    const [ inMin, setInMin ] = useState(""); // for in minute
    const [ outHr, setOutHr ] = useState(""); // for out hour
    const [ outMin, setOutMin ] = useState(""); // for out minute
    const [ description, setDescription ] = useState(""); // for description
    const [ approverData, setApproverData ] = useState([]); // for approver data
    const [ approver, setApprover ] = useState(""); // for selected approver
    const [ approverModalShow, setApproverModalShow ] = useState(false); // for approver modal show or hide
    const [ appModalError, setApproverModalError ] = useState([]); // for approver modal error message
    const [ approverModalData, setApproverModalData ] = useState([]); // for approver modal data
    const [ appAllCheck, setAppallCheck ] = useState(false); // for approver all checkbox
    const [ settingAllCheck, setSettingAllCheck ] = useState(false); // for setting table all checkbox
    const [ addApproverData, setAddApproverData ] = useState([]); // for added approver data
    const [ viewPermission, setViewPermission ] = useState(true); // for view permission 
    const [ approverSetting, setApproverSetting ] = useState(''); // for approver setting
    const [ modalEmpIDData, setModalEmpIDData] = useState([]); // for modal employee id data
    const [ modalEmpID, setModalEmpID] = useState(''); // for modal employee id
    const [ modalEmpNameData, setModalEmpNameData] = useState([]); // for modal employee name data
    const [ modalEmpName, setModalEmpName] = useState(''); // for modal employee name
    const [ alert, setAlert ] = useState(false); // for common alert
    const [ alertContent, setAlertContent ] = useState(""); // for alert content
    const [ continues, setContinues ] = useState(true); // for alert continues
    const [ tempData, setTempData ] = useState([]); // tempory data for setting table
    const [ deletedEmpID, setDeletedEmpID ] = useState([]); // for deleted employee id
    const [ appModalEmpIDData, setAppModalEmpIDData] = useState([]); // for approer modal employee id data
    const [ appModalEmpID, setAppModalEmpID] = useState(''); // for approer modal employee id
    const [ appModalEmpNameData, setAppModalEmpNameData] = useState([]); // for approer modal employee name data
    const [ appModalEmpName, setAppModalEmpName] = useState(''); // for approer modal employee name
    const [ appModalEmpCodeData, setAppModalEmpCodeData] = useState([]); // for approer modal employee code data
    const [ appModalEmpCode, setAppModalEmpCode] = useState(''); // for approer modal employee code
    const [ addedEmpID, setAddedEmpID ] = useState([]); // for added employee id 
    const [ confirmShow, setConfirmShow ] = useState(false); // for confirmation message box
    const [ content, setContent ] = useState(""); // for content confirmation message
    const [ confirmType, setConfirmType ] = useState(""); // for confirmation type 
    const [ allowRequest, setAllowRequest ] = useState("false"); // for allow request 
    const [ deptPosStatus, setDeptPosStatus ] = useState(""); // for department or position status
    const [ editID, setEditID ] = useState(''); // for edit id from forget card list form
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id
    const [ positionRank, setPositionRank ] = useState(JSON.parse(localStorage.getItem('POSITION_RANK')));  // for session position rank
    /** Form Load */
    useEffect(() => {
        setLoading(true); getDepartment();getPosition();let id = JSON.parse(localStorage.getItem('FORGETCARD_ID'));localStorage.removeItem('FORGETCARD_ID');
        indexAPI();if(id === '' || id === null){index();}else{setEditID(id);editIndex(id);}
    },[]);
    /** Start get Department Function */
    const getDepartment = async () => {
        let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDepartmentData([]) : setDepartmentData(response.data.data);
    }
    /** End get Department Function */
    /** Start get Approver Function */
    const getApprover = async (id) => {
        let obj = { package_name: 'erp', url: 'api/approver-list', method: 'post',params: {employee_id: id,company_id: companyID,device_flag: 1} }
        let response = await ApiRequest(obj);
        if(response.flag == false){ // catch error
        }else{
            if(response.data.status == "OK"){let temp = [];
                if(response.data.data.department != undefined){
                    if(response.data.data.department.length > 0 ){
                        response.data.data.department.forEach(dep=>{temp.push({"id": dep.id,"code": dep.department_code,"name": dep.department_name,"status": "department"})})  
                    }
                }
               if(response.data.data.position != undefined){
                if(response.data.data.position.length > 0){
                    response.data.data.position.forEach(pos=>{ temp.push({"id": pos.id,"code": "","name": pos.position_name,"status": "position"}) })
                }
                setApproverData(temp);
            }}else if(response.data.status == "NG"){} 
        }
    }
    /** End get Approver Function */
    /**  common view permission  */
    const indexAPI = async (data) => {
        setLoading(true);
        let obj = { method: 'post', url: 'api/employee-by-view-permission', params: {'company_id': companyID,'login_employee_id': loginID} }
        let response = await ApiRequest(obj); 
        setLoading(false);
        if(response.flag === false){setError(response.message);}else{
            let status = response.data.status;
            if(status == 'OK'){
                let object = response.data.data;
            for (const property in object) {
                if(property==loginID && response.data.autocomplete === false){
                setViewPermission(response.data.autocomplete);setEmpID(property);setEmpCode(object[loginID].code);setEmpName(object[loginID].name_eng);
                }
            }}else{setError(response.data.message);}
        }
    }
    /** Start get Department Function */
    const getPosition = async () => {
        let obj = { package_name: 'erp', url: 'api/position/get-all-position', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setPositionData([]) : setPositionData(response.data.data);
    }
    /** End get Department Function */
    /** Start get Approver Function */
    const getApproverTableData = async (empID) => {
        let search = { "method":"post","url": "api/forget-card-entry/get-approver-data", "params": { "company_id":companyID, "employee_id": empID}, "package_name": "hr"}
        let response = await ApiRequest(search);
        response.flag === false ? setAddApproverData([]) : setAddApproverData(response.data.data);   
    }
    /** End get approver Function */
    /**Start index function */
    let index=async ()=>{
        let search = { "method":"post", "url": "api/forget-card-entry/get-formload-data", "params": {"company_id":companyID,"login_id":loginID }}
        let response = await ApiRequest(search);
        if(response.flag == false){ setLoading(false);setSuccess([]);setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                setApproverSetting(response.data.data[0].approver_setting);
            }else if(response.data.status == "NG"){
                setLoading(false);setSuccess([]);setError(response.data.message);window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /**End index function */
    /**Start edit index function */
    let editIndex=async (id)=>{
        let data = [];let status ='';let in_out_status = "";
        let search = { "method":"post","url": "api/forgetcard-list/edit","params": {"id": id,"login_id":loginID,"company_id":companyID} }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                status = response.data.data.status;
                (status == "IN")? in_out_status = "1" : in_out_status = "2";
                if(in_out_status == "1"){
                    data.push({date: response.data.data.attendance_date , description: response.data.data.description ,employee_id: response.data.data.employee_id ,employee_code: response.data.data.code, employee_name: response.data.data.employee_name,in_hr: response.data.data.attendance_time.split(':')[0] ,in_min: response.data.data.attendance_time.split(':')[1] ,in_out_status: in_out_status ,is_checked: true,out_hr: '',out_min: ''
                    })
                }else{
                    data.push({date: response.data.data.attendance_date ,description: response.data.data.description ,employee_id: response.data.data.employee_id , employee_code: response.data.data.code,employee_name: response.data.data.employee_name,in_hr: '' , in_min: '' ,in_out_status: in_out_status ,is_checked: true, out_hr: response.data.data.attendance_time.split(':')[0],out_min: response.data.data.attendance_time.split(':')[1]})
                }
                setSettingTableData(data);
                setAddApproverData(response.data.data.approver_data);
                setViewPermission(response.data.data.view_permission);
                setApproverSetting(response.data.data.approver_setting);setFromDate(response.data.data.attendance_date);setToDate(response.data.data.attendance_date);
                setSettingAllCheck(true);setEmpID(response.data.data.employee_id);setEmpCode(response.data.data.code);setEmpName(response.data.data.employee_name);
            }else if(response.data.status == "NG"){
                setLoading(false);setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /**End edit index function */
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
        }else{
            if(response.data.data[0].employee_id !== null){setEmpID(response.data.data[0].employee_id)}else{setEmpID('')}
            if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
            if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
        }
    }
    /**End select autocomplete */
    /**Start approver modal change autocomplete */
    const approverChangeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]);setApproverModalError([]);
        // type is id, show name in Employee ID and clear remain input
        if(type === 'id'){setAppModalEmpID(i.target.value); setAppModalEmpCode(''); setAppModalEmpName('');}
        // type is code, show name in Employee Code and clear remain input
        else if(type === 'code') {setAppModalEmpID(''); setAppModalEmpCode(i.target.value); setAppModalEmpName('');}
        // type is name, show name in Employee Name and clear remain input
        else{setAppModalEmpID(''); setAppModalEmpCode(''); setAppModalEmpName(i.target.value);}
        // if empty, remove data from autocomplete
        if(i.target.value === ''){
            setAppModalEmpID(''); setAppModalEmpName(''); setAppModalEmpCode('');
        }else{
            let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
            let response = await ApiRequest(obj);
            if(response.flag === false){
                setApproverModalError(response.message); setAppModalEmpID([]); setAppModalEmpName([]); setAppModalEmpCode([]);
            }else{
                (type === 'id') ? setAppModalEmpIDData(response.data.data) :
                (type === 'code') ? setAppModalEmpCodeData(response.data.data) : setAppModalEmpNameData(response.data.data);
            }
        }
    }
    /**End approver modal change autocomplete */
    /**Start approver modal select autocomplete */
    const approverSelectAutocomplete = async (val, obj) => {
        let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
        let response = await ApiRequest(object);
        if(response.flag === false){
            setApproverModalError(response.message);
        }else{
            if(response.data.data[0].employee_id !== null){setAppModalEmpID(response.data.data[0].employee_id)}else{setAppModalEmpID('')}
            if(response.data.data[0].name !== null){setAppModalEmpName(response.data.data[0].name)}else{setAppModalEmpName('')}
            if(response.data.data[0].employee_code !== null){setAppModalEmpCode(response.data.data[0].employee_code)}else{setAppModalEmpCode('')}
        }
    }
    /**End approver modal select autocomplete */
     /**Start modal change autocomplete */
     const modalChangeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]);
        // type is id, show name in Employee ID and clear remain input
        if(type === 'id'){
            setModalEmpID(i.target.value); setModalEmpName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else{
            setModalEmpID(''); setModalEmpName(i.target.value);
        }
        // if empty, remove data from autocomplete
        if(i.target.value === ''){
            setModalEmpID(''); setModalEmpName('');
        }else{
            let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
            let response = await ApiRequest(obj);
            if(response.flag === false){
                empModalError(response.message); setModalEmpIDData([]); setModalEmpNameData([]);
            }else{
                (type === 'id') ? setModalEmpIDData(response.data.data) : setModalEmpNameData(response.data.data);
            }
        }
    }
    /**End modal change autocomplete */
    /**Start modal select autocomplete */
    const modalSelectAutocomplete = async (val, obj) => {
        let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyID } }
        let response = await ApiRequest(object);
        if(response.flag === false){
            empModalError(response.message);
        }else{
            if(response.data.data[0].employee_id !== null){setModalEmpID(response.data.data[0].employee_id)}else{setModalEmpID('')}
            if(response.data.data[0].name !== null){setModalEmpName(response.data.data[0].name)}else{setModalEmpName('')}
        }
    }
    /**End modal select autocomplete */
    /** Start employee list modal add button Function */
    let addBtn = ()=>{
        let check = false;
        empListModalData.forEach(data => {if(data.is_checked == true){check = true ;} });
        if(check == false){
            let errmsg = t(message.JSE001).replace('%s', t('Employee'));setEmpModalError([errmsg]);
            let element = document.getElementById("employee-list-modal");element.scrollIntoView({behavior: "smooth", block: "start"});
        }else{
            setEmpModalError([]);let add_emp_data = [];
            empListModalData.forEach(data=>{if(data.is_checked == true){add_emp_data.push(data); } })
            setAddEmpListData(add_emp_data); empListModalClose(); setEmpAllCheck(false);setEmpListModalData([]);
        }
    }
    /** End employee list modal add button Function */
    /** Start employee list modal close Function */
    let empListModalClose = ()=>{
        setEmpListModalShow(false);setEmpAllCheck(false);setEmpListModalData([]);setModalEmpID('');setModalEmpIDData([]);setModalEmpName('');setModalEmpNameData([]);
    }
    /** End employee list modal close Function */
    /** Start employee list plus button Function */
    let empListPlusBtn = ()=>{setEmpListModalShow(true); }
    /** End employee list plus button Function */
    /** Start employee list modal all checkbox Function */
    let allCheckBoxChange = ()=>{
        let Data = empListModalData.map(data =>{
            data.is_checked= !empAllCheck
            return data;
        });
        setEmpAllCheck(!empAllCheck);
        setEmpListModalData(Data)
    }
    /** End employee list modal all checkbox Function */
    /** Start employee list modal sub checkbox Function */
    let subCheckboxChange = (e)=>{
        let id = e.target.value;
        let data = empListModalData.map(main=>{
          if(main.employee_id == id){
            main.is_checked = !main.is_checked;
            return main;
          }
          return main;
        })
        setEmpListModalData(data); let flag = true;
        data.forEach(data=>{
          if(data.is_checked == false){flag = false;}
        })
        setEmpAllCheck(flag);
    }
    /** End employee list modal sub checkbox Function */
    /** Start department change Function */
    let departmentChange = (e)=>{
        setDepartment(e.target.value)
    }
    /** End department change Function */
    /** Start position change Function */
    let positionChange = (e)=>{
        setPosition(e.target.value);
    }
    /** End position change Function */
    /** Start search Function */
    let searchBtn =async ()=>{   
        setLoading(true);setError([]);setSuccess([]);let flag = true;setEmpModalError([]);
        let search = { "method":"post", "url": "api/forget-card-entry/search", "params": { "company_id":companyID,"login_id": loginID,"employee_id":modalEmpID,"department_id": department,"position_id": position,"employee_name": modalEmpName}, "package_name": "hr" }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setEmpModalError(response.message);setError([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                let data = response.data.data;
                addEmpListData.forEach(add=>{
                    data.forEach(data=>{
                        if(add.employee_id == data.employee_id){data.is_checked= true}
                    })
                })
                data.forEach(data=>{
                if(data.is_checked == false){
                    flag = false;
                }
                })
                setEmpAllCheck(flag);setEmpListModalData(data);setLoading(false);
            }else if(response.data.status == "NG"){
                setSuccess([]);setEmpModalError(response.data.message);setError([]); window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End search Function */
    /** Start employee list table delete button Function */
    let empListTableDeleteBtn = (e)=>{
        let data = addEmpListData.filter(data=> data.employee_id !== e);
        setAddEmpListData(data);
    }
    /** End  employee list table delete button Function */
    /** Start from date change Function */
    let fromDateChange = (e)=>{
       setFromDate(ChangeDate(e))
    }
    /** End from date change Function */
    /** Start to date change Function */
    let toDateChange = (e)=>{
        setToDate(ChangeDate(e))
    }
    /** End to date change Function */
    /** Start setting add button Function */
    let settingAddBtn =async ()=>{
        let error = [];setLoading(true);
        if(empID == "" && addEmpListData.length < 1){
            let msg = t(message.JSE005).replace('%s', t('Employee ID'));
            error.push(msg)
        }
        if(fromDate === null){let msg = t(message.JSE001).replace('%s', t('From Date')); error.push(msg);}
        if(toDate === null){let msg = t(message.JSE001).replace('%s', t('To Date'));error.push(msg); }
        if(fromDate > toDate){let msg = t(message.JSE017).replace('%s', t('From Date')).replace('%s', t('To Date')); error.push(msg);}
        if(error.length> 0){setError(error);setSuccess([]);setLoading(false); $("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            setError([]);setSuccess([]);let array = [];let from = fromDate;
            let employee_id=[];let temp=[];
            if(empID != ""){employee_id.push(empID);}
            addEmpListData.forEach(add=>{
                if(add.employee_id != empID){employee_id.push(add.employee_id);}
            })
            let search = {"method":"post", "url": "api/forget-card-entry/add","params": {"company_id":companyID,"login_employee_id":loginID,"employee_id":employee_id,"from_date":fromDate, "to_date":toDate}}
            let response = await ApiRequest(search);
            if(response.flag == false){  setLoading(false);setSuccess([]);setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                if(response.data.status == "OK"){
                    if(response.data.data.status == true){
                        if(response.data.data.deleted_employee_id.length == employee_id.length){ setContinues(false);}
                        setDeletedEmpID(response.data.data.deleted_employee_id);setAddedEmpID(employee_id); setAlert(true);setAlertContent(response.data.data.message);setTempData(response.data.data.employee_data);
                    }else{
                        let total_empID = addedEmpID;let temp_dup =[];
                        if(approverSetting == 2 || approverSetting == 3 || approverSetting == 4 || approverSetting == 5 ){
                            if(addedEmpID.length > 0){
                                employee_id.forEach(emp=>{
                                    addedEmpID.forEach(add=>{ if(emp == add){ temp_dup.push(emp); }})
                                })
                            }
                            temp_dup.forEach(d=>{employee_id = employee_id.filter(data => !(data == d))})
                            total_empID.forEach(a=>{employee_id.push(a); })
                            getApproverTableData(employee_id);
                        }
                        let temp = settingTableData;let data = response.data.data.employee_data;let dupli = [];
                        if(settingTableData.length > 0){
                            for(let i=0; i<data.length ; i++){
                                for(let p=0; p<temp.length; p++){
                                    if(data[i].employee_id == temp[p].employee_id && data[i].date == temp[p].date){
                                        dupli.push({ "employee_id": data[i].employee_id,"date": data[i].date });
                                       break;  
                                    }
                                }
                            }
                            dupli.forEach(d=>{data = data.filter(data => !(data.employee_id == d.employee_id && data.date == d.date ))})
                            data.forEach(a=>{ settingTableData.push(a);  })
                        }else{data.forEach(a=>{settingTableData.push(a);})}
                        setAddedEmpID(employee_id)
                    } 
                    getApprover(employee_id);setAddEmpListData([]);setSettingAllCheck(false);
                }else if(response.data.status == "NG"){setSuccess([]);setError(response.data.message);window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
                setLoading(false);
            }
        }
    }
    /** End setting add button Function */
    /** Start all in out status change Function */
    let inOutAllChange = (e)=>{
        setInOutStatus(e.target.value)
        settingTableData.forEach(data=>{data.in_out_status = e.target.value;})
        setSettingTableData(settingTableData)
    }
    /** End all in out status change Function */
    /** Start sub in out status change Function */
    let subInOutChange = (id,date,e)=>{
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.in_out_status = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);setInOutStatus("");
    }
    /** End sub in out status change Function */
    /** Start all in hour change Function */
    let allInHrChange = (e)=>{
        setInHr(e.target.value)
        settingTableData.forEach(data=>{ data.in_hr = e.target.value;})
        setSettingTableData(settingTableData)
    }
    /** End all in hour change Function */
     /** Start all in minute change Function */
     let allInMinChange = (e)=>{
        setInMin(e.target.value)
        settingTableData.forEach(data=>{ data.in_min = e.target.value;})
        setSettingTableData(settingTableData)
    }
    /** End all in minute change Function */
    /** Start all out hour change Function */
    let allOutHrChange = (e)=>{
        setOutHr(e.target.value)
        settingTableData.forEach(data=>{data.out_hr = e.target.value; })
        setSettingTableData(settingTableData)
    }
    /** End all out hour change Function */
    /** Start all out minute change Function */
    let allOutMinChange = (e)=>{
        setOutMin(e.target.value)
        settingTableData.forEach(data=>{
            data.out_min = e.target.value;
        })
        setSettingTableData(settingTableData)
    }
    /** End all out minute change Function */
    /** Start description change Function */
    let allDescriptionChange=(e)=>{
        setDescription(e.target.value);
    }
    /** End description Function */
    /** Start set button Function */
    let setBtn = (e)=>{
        let data = settingTableData.map(i=>{
            i.description = e;
            return i;
        })
        setSettingTableData(data)
    }
    /** End set button Function */
    /** Start sub in hour change Function */
    let subInHrChange=(id,date,e)=>{
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.in_hr = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);setInHr("");
    }
    /** End sub in hour change Function */
    /** Start sub in minute change Function */
    let subInMinChange=(id,date,e)=>{
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.in_min = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);setInMin("");
    }
    /** End sub in minute change Function */

    /** Start sub out hour change Function */
    let subOutHrChange=(id,date,e)=>{
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.out_hr = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);setOutHr("");
    }
    /** End sub out hour change Function */
    /** Start sub out minute change Function */
    let subOutMinChange=(id,date,e)=>{
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.out_min = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);setOutMin("");
    }
    /** End sub out minute change Function */
    /** Start sub description change Function */
    let subDescriptionChange=(id,date,e)=>{
        $('#all-description').val("");
        let data = settingTableData.map(main=>{
            if(main.employee_id == id && main.date == date){
                main.description = e.target.value;
                return main;
                }
                return main;
        })
        setSettingTableData(data);
    }
    /** End sub description change Function */
    /** Start approver search button Function */
    let approverSearchBtn=()=>{
        if(approver === ""){
            let errmsg = t(message.JSE001).replace('%s', t('Approver'));setError([errmsg]);$("html, body").animate({ scrollTop: 0 }, 1000);
        }else{ setError([]);setSuccess([]);setApproverModalShow(true); } 
    }
    /** End approver search button Function */
    /** Start approver dropdown change Function */
    let approverDropdownChange=(e)=>{
        let id = e.target.value ;
        if(id != ""){
            let dataId = id.split('');
            let status = dataId[dataId.length-1] === "1" ? "department" : "position";
            setDeptPosStatus(status);setApprover(id);
        }else{ setDeptPosStatus("");setApprover("");}
    }
    /** End approver dropdown change Function */
    /** Start approver all checkbox change Function */
    let appAllCheckboxChange=()=>{
        let Data = approverModalData.map(data =>{
            data.is_checked= !appAllCheck
            return data;
        });
        setAppallCheck(!appAllCheck);setApproverModalData(Data);
    }
    /** End approver all checkbox change Function */
    /** Start approver sub checkbox change Function */
    let approverSubCheckChange=(e)=>{
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
          if(data.is_checked == false){ flag = false; }
        })
        setAppallCheck(flag);
    }
    /** End approver sub checkbox change Function */
    /** Start approver search button Function */
    let  appSearchBtn=async ()=>{
        setApproverModalError([]);setSuccess([]);let params="";let flg = false;let dataId = approver.slice(0, -1);
        if(appModalEmpID == ""){setApproverModalError([t(message.JSE001).replace('%s', t('Applicant'))]);scrollModal("approver-modal");
        }else{
            settingTableData.forEach(data=>{ if(data.employee_id == appModalEmpID){flg = true;} })
            if(flg == false){ let errmsg = t(message.JSE008);setApproverModalError([errmsg]);}else{
                setApproverModalError([]);setLoading(true);
                if(deptPosStatus == "department"){ params={"company_id":companyID,"employee_id": appModalEmpID,"department_id": dataId,"position_id": ""}
                }else if(deptPosStatus == "position"){  params={"company_id":companyID,"employee_id": appModalEmpID,"department_id": "","position_id": dataId}
                }
                let search = { "method":"post", "url": "api/forget-card-entry/approver-on-department-data", "params": params }
                let response = await ApiRequest(search);
                setLoading(false);
                if(response.flag == false){ setLoading(false);setSuccess([]);setApproverModalError(response.message); scrollModal("approver-modal");
                }else{
                    if(response.data.status == "OK"){
                        setAppallCheck(false);setApproverModalData(response.data.data);
                    }else if(response.data.status == "NG"){
                        setSuccess([]);setApproverModalError(response.data.message); scrollModal("approver-modal");
                    }
                    setLoading(false);
                }
            }
        }
    }
    /** End approver search button Function */
    /** Start approver close button Function */
    let  appCloseBtn=()=>{
        setApproverModalShow(false);setApproverModalData([]);
        setApproverModalError([]);setAppModalEmpID('');setAppModalEmpCode('');setAppModalEmpName('');setAppModalEmpIDData([]);setAppModalEmpNameData([]);setAppModalEmpCodeData([]);
    }
    /** End approver close button Function */
    /** Start setting all checkbox change Function */
    let  settingAllCheckChange=()=>{
        let Data = settingTableData.map(data =>{
            data.is_checked= !settingAllCheck;
            return data;
        });
        setSettingAllCheck(!settingAllCheck);setSettingTableData(Data)
    }
    /** End setting all checkbox change Function */
    /** Start setting sub checkbox change  Function */
    let  settingSubCheckChange=(date,id)=>{
        let data = settingTableData.map(main=>{
          if(main.employee_id == id && main.date == date){
            main.is_checked = !main.is_checked;
            return main;
          }
          return main;
        })
        setSettingTableData(data)
        let flag = true;
        data.forEach(data=>{
          if(data.is_checked == false){
            flag = false;
          }
        })
        setSettingAllCheck(flag);
    }
    /** End setting sub checkbox change Function */
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
            scrollModal("approver-modal");
        }else{
            setApproverModalError([]);let add_app_data = addApproverData;
            approverModalData.forEach((item, i) => {
                // if checkbox is selected, check duplicate data exist or not
                if( item.is_checked === true ){
                    let { approver_id, applicant_id } = item;
                    addApproverData.forEach((add, ii) => {
                        // If applicant and approver are the same, store same data to array
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
                appCloseBtn();
                setAppallCheck(false);
            }
        }
    }
    /** End approver modal add button Function */
    /** Start save button Function */
    let  saveBtn=()=>{
        let flag = false;let error=[];let str="";let in_out_id="",in_id="",out_id="",des_id="";let msg="";
        settingTableData.forEach(data=>{
            if(data.is_checked == true){
                flag = true;
                if(data.in_out_status == ""){
                    if(in_out_id != ""){ in_out_id=in_out_id+","+data.employee_id; }else{  in_out_id=data.employee_id; }
                }else{
                    if(data.in_out_status == 1){
                        if(data.in_hr == "" || data.in_min == ""){
                            if(in_id != ""){ in_id=in_id+","+data.employee_id; }else{in_id=data.employee_id;} 
                        }
                    }
                    if(data.in_out_status == 2){
                        if(data.out_hr == "" || data.out_min == ""){
                            if(out_id != ""){ out_id=out_id+","+data.employee_id;}else{ out_id=data.employee_id;}
                        }
                    }
                    if(data.in_out_status == 3){
                        if(data.in_hr == "" || data.in_min == ""){
                            if(in_id != ""){ in_id=in_id+","+data.employee_id; }else{in_id=data.employee_id; }  
                        }
                        if(data.out_hr == "" || data.out_min == ""){
                            if(out_id != ""){ out_id=out_id+","+data.employee_id; }else{ out_id=data.employee_id;}  
                        }
                    }
                    if(data.description == ""){
                        if(des_id != ""){des_id=des_id+","+data.employee_id;}else{ des_id=data.employee_id;}  
                    }
                }     
            }
        })
        if(in_out_id !=""){ in_out_id = Array.from(new Set(in_out_id.split(','))).toString();msg = t(message.JSE006).replace('%s', t('In or Out Status'))+' '+in_out_id; error.push(msg); }
        if( in_id !=""){ in_id= Array.from(new Set(in_id.split(','))).toString();msg = t(message.JSE006).replace('%s', t('In Time'))+' '+in_id;error.push(msg);}
        if( out_id !=""){ out_id= Array.from(new Set(out_id.split(','))).toString();msg = t(message.JSE006).replace('%s', t('Out Time'))+' '+out_id;error.push(msg); }
        if( des_id !=""){ des_id= Array.from(new Set(des_id.split(','))).toString();msg = t(message.JSE006).replace('%s', t('Description'))+' '+des_id;error.push(msg); }
        if(flag == false){
             setError([t(message.JSE001).replace('%s', t('Employee'))]);$("html, body").animate({ scrollTop: 0 }, 1000);
        }else if(error.length > 0){ setError(error);$("html, body").animate({ scrollTop: 0 }, 1000);
        }else{
            if(editID == ""){setContent(t("Are you sure want to save?"));setConfirmType("save");setConfirmShow(true);setError([]); }else{ setContent(t("Are you sure want to update?"));setConfirmType("update");setConfirmShow(true);setError([]); }
        }
    }
    /** End save button Function */
    /** Start approver tabel delete button Function */
    let  appDeleteBtn=(apl,app)=>{
        let data = addApproverData.filter(data=>{ if(data.applicant_id !== apl ){return data; }else if(data.approver_id !== app){return data;}} );
        setAddApproverData(data);
    }
    /** End approver tabel delete button Function */
    /** Start alert ok button Function */
    let  alertOkBtn=()=>{
        let data=addEmpListData;let res = addedEmpID;let dupli =[];let temp = settingTableData;let Data = tempData;
        deletedEmpID.forEach(del=>{ data = data.filter(add=> add.employee_id != del);})
        deletedEmpID.forEach(del=>{res = res.filter(add=> add != del);
        })
        setAddEmpListData(data);setAddedEmpID(res);
        for(let i=0; i<Data.length ; i++){
            for(let p=0; p<temp.length; p++){
                if(Data[i].employee_id == temp[p].employee_id && Data[i].date == temp[p].date){
                    dupli.push({"employee_id": Data[i].employee_id,"date": Data[i].date});break; }
            }
        }
        dupli.forEach(d=>{Data = Data.filter(data => !(data.employee_id == d.employee_id && data.date == d.date ))})
        Data.forEach(a=>{ settingTableData.push(a); })
        setAlert(false); getApproverTableData(res);setTempData([]);
    }
    /** End alert ok button Function */
    /** Start alert cancel button Function */
    let  alertCancelBtn=()=>{ setAlert(false); }
    /** End alert cancel button Function */
    /** Start save button Function */
    let  saveOk=async()=>{
        let emp_data = [];let approver_data=[];setConfirmShow(false);setLoading(true);
        settingTableData.forEach(set=>{
            if(set.is_checked == true){
                emp_data.push({"emp_id": set.employee_id,"emp_code": (set.employee_code).toString(), "emp_name": set.employee_name, "date": set.date,"in_out_status": set.in_out_status,"in_hr": set.in_hr,"in_min": set.in_min,"out_hr": set.out_hr, "out_min": set.out_min, "description": set.description,
                })
            }
        })
        if(!positionRank.includes(0)){
            addApproverData.forEach(app=>{ approver_data.push({ "applicant_id":app.applicant_id ,"approver_id": app.approver_id ,"approver_name": app.approver_name ,"email": app.email ,"approver_or_checker": app.approver_or_checker,"email_flag": app.email_flag})
            })
        }
        let search = {  "method":"post", "url": "api/forget-card-entry", "params": {"company_id":companyID,"login_id":loginID, "position_rank": positionRank,"allow_request": allowRequest, "emp_data": emp_data,"approver_data": approver_data},"package_name": "hr" }
        let response = await ApiRequest(search);
        if(response.flag == false){  setLoading(false);setSuccess([]);setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                if(viewPermission == true){setEmpID('');setEmpIDData([]);setEmpCode('');setEmpCodeData([]);setEmpName('');setEmpNameData([]); }
                setInHr('');setInMin('');setOutHr('');setOutMin('');setInOutStatus("");setEmpListModalData([]);setEmpAllCheck(false);setDepartment('');setPosition('');setAddEmpListData([]);setFromDate(currentDate);setToDate(currentDate);setSettingTableData([]);setApprover('');setApproverModalData('');setAppallCheck(false);setSettingAllCheck(false);setAddApproverData([]);setTempData([]);setDeletedEmpID([]);setAllowRequest("false"); setError([]);setSuccess([response.data.message]);window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else if(response.data.status == "NG"){
                setSuccess([]);setEmpModalError(response.data.message);setError([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End save button Function */
    /** Start Allow Request Change */
    let allowRequestChange=()=>{
        if(allowRequest == "true"){ setAllowRequest("false");
        }else{ setAllowRequest("true");  }
    }
    /** End Allow Request Change */
    /** Start Allow Request Change */
    let updateOK=async ()=>{
        let emp_data = [];let approver_data=[];setConfirmShow(false);setLoading(true);
        settingTableData.forEach(set=>{
            if(set.is_checked == true){ emp_data.push({"emp_id": set.employee_id,"emp_code": (set.employee_code).toString(),"emp_name": set.employee_name, "date": set.date,"in_out_status": set.in_out_status,"in_hr": set.in_hr,"in_min": set.in_min,"out_hr": set.out_hr,"out_min": set.out_min,"description": set.description,})
            }
        })
        if(!positionRank.includes(0)){
            addApproverData.forEach(app=>{ approver_data.push({"applicant_id":app.applicant_id ,"approver_id": app.approver_id ,"approver_name": app.approver_name ,"email": app.email ,"approver_or_checker": app.approver_or_checker,"email_flag": app.email_flag})
            })
        }
        let search = { "method":"put", "url": `api/forget-card-entry/${editID}`,"params": {"company_id":companyID,"login_id":loginID,"position_rank": positionRank,"allow_request": allowRequest,"emp_data": emp_data,"approver_data": approver_data}}
        let response = await ApiRequest(search);
        if(response.flag == false){  setLoading(false);setSuccess([]);setError(response.message);window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                if(viewPermission == true){ setEmpID('');setEmpIDData([]);setEmpCode('');setEmpCodeData([]);setEmpName('');setEmpNameData([]);}
                setInHr('');setInMin('');setOutHr('');setOutMin('');setInOutStatus(""); setEmpListModalData([]);setEmpAllCheck(false);setDepartment('');setPosition('');setAddEmpListData([]);setFromDate(currentDate);setToDate(currentDate);setSettingTableData([]);setApprover('');setApproverModalData('');setAppallCheck(false);setSettingAllCheck(false);setAddApproverData([]);setTempData([]);setDeletedEmpID([]);setAllowRequest("false");            
                setError([]);setSuccess([response.data.message]); window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else if(response.data.status == "NG"){ setSuccess([]);setEmpModalError(response.data.message);setError([]); window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End Allow Request Change */
    return (
        <>
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Forget Card Entry')}</CLabel></h5></CCardHeader>
                <CCardBody>
                    <CRow lg="12" style={{marginBottom:'10px'}}>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_id" className="">{t('Employee ID')}</CLabel>
                                {viewPermission > 0 && <Autocomplete onChange={(i) =>changeAutocomplete('id', i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />}
                                {viewPermission < 1 && <CInput type="text" value={empID} className="bamawl-input" readOnly />}
                        </CCol>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                {viewPermission > 0 && <Autocomplete onChange={(i) =>changeAutocomplete('code', i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />}
                                {viewPermission < 1 && <CInput type="text" value={empCode} className="bamawl-input" readOnly />}
                        </CCol>
                        <CCol lg="4">
                                <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                {viewPermission > 0 && <Autocomplete onChange={(i) =>changeAutocomplete('name', i)} onSelect={selectAutocomplete} items={empNameData} name={empName} /> }
                                {viewPermission < 1 && <CInput type="text" value={empName} className="bamawl-input" readOnly /> }
                        </CCol>
                    </CRow>
                    {viewPermission>0 && settingTableData.length < 1 &&
                        <CRow className="mt-3">
                            <CButton size="sm" className="m-left-6 mt-3" onClick={empListPlusBtn} ><img width="34px" src={'/avatars/Add Allowance .png'} /></CButton>
                            &nbsp;<b className="m-top-28 sidebar-text-color">{t('Employee List')}</b>
                        </CRow>
                    }
                    {viewPermission>0 && settingTableData.length > 0 &&
                        <CRow className="mt-3">
                            <CButton size="sm" className="m-left-6 mt-3" disabled ><img width="34px" src={'/avatars/Add Allowance .png'} /></CButton>
                            &nbsp;<b className="m-top-28 sidebar-text-color">{t('Employee List')}</b>
                        </CRow>
                    }
                    <EmployeeListModal addBtn={addBtn} closeBtn={empListModalClose} empListModalShow={empListModalShow} data={empListModalData} allCheckBoxChange={allCheckBoxChange} empAllCheck={empAllCheck} subCheckboxChange={subCheckboxChange}  departmentData={departmentData} positionData={positionData} departmentChange={departmentChange} positionChange={positionChange} searchBtn={searchBtn} empModalError={empModalError} changeAutocomplete={modalChangeAutocomplete} selectAutocomplete={modalSelectAutocomplete} empIDData={modalEmpIDData} empID={modalEmpID} empNameData={modalEmpNameData} empName={modalEmpName}  />
                    <EmployeeListTable  data={addEmpListData} deleteBtn={empListTableDeleteBtn} />
                    {/* <SettingCard fromDate={fromDate} fromDateChange={fromDateChange} toDate={toDate} toDateChange={toDateChange} settingAddBtn={settingAddBtn} /> */}
                    <CCol lg="3" className="mt-5">
                        <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Setting')}</CLabel>
                    </CCol>  
                    
                        <div style={{background:'#fafbfc',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                            <CCard className='table-panel mt-3' style={{background:'#fafbfc',borderColor: "transparent"}}>
                                <CRow>
                                    <CCol lg="1"></CCol>
                                    <CCol lg="4" >
                                            <CLabel  className="required">{t('Date(From)')}</CLabel>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker margin="normal" id="date-picker-dialog" format="yyyy-MM-dd" value={fromDate} onChange={fromDateChange} clearable={true} InputProps={{ readOnly: true }} />
                                            </MuiPickersUtilsProvider>
                                    </CCol><CCol lg="1"  style={{borderRight:"1px solid #E3E5F1"}}></CCol><CCol lg="1"></CCol>
                                    <CCol lg="4"  >
                                            <CLabel  className="required">{t('Date(To)')}</CLabel>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <KeyboardDatePicker margin="normal" id="date-picker-dialog" format="yyyy-MM-dd" value={toDate} onChange={toDateChange} clearable={true} InputProps={{ readOnly: true }}/>
                                            </MuiPickersUtilsProvider>
                                    </CCol>
                                </CRow>
                                <CRow alignHorizontal="center" className="mt-3">
                                    {settingTableData.length > 0 &&
                                        <CButton  className="form-btn" disabled>{t('Add')}</CButton>
                                    }
                                    {settingTableData.length < 1 &&
                                        <CButton  className="form-btn" onClick={settingAddBtn}>{t('Add')}</CButton>
                                    }
                                </CRow>
                                <SettingTable  data={settingTableData} inOutStatusData={inOutStatusData} inOutStatus={inOutStatus} inHrData={inHrData} outHrData={outHrData} inMinData={inMinData} outMinData={outMinData} inOutAllChange={inOutAllChange} subInOutChange={subInOutChange} allInHrChange={allInHrChange} allInMinChange={allInMinChange}  allOutHrChange={allOutHrChange} allOutMinChange={allOutMinChange} inHr={inHr} inMin={inMin} outHr={outHr} outMin={outMin} allDescriptionChange={allDescriptionChange} description={description} setBtn={setBtn} subInHrChange={subInHrChange} subInMinChange={subInMinChange} subOutHrChange={subOutHrChange} subOutMinChange={subOutMinChange} subDescriptionChange={subDescriptionChange} settingAllCheck={settingAllCheck} settingAllCheckChange={settingAllCheckChange} settingSubCheckChange={settingSubCheckChange} />
                            </CCard>
                        </div>
                            <CRow lg="12" className="mt-5">
                            {
                                settingTableData.length >0 && (approverSetting == 1 || approverSetting == 4 || approverSetting == 5) && !positionRank.includes(0) &&
                                <>
                                <CCol lg="4">
                                    <CLabel className="required">{t('Approver')}</CLabel>
                                    <CSelect className="bamawl-select" custom    id="approver" value={approver} onChange={approverDropdownChange}>
                                        <option key="" value="">---Select---</option>
                                        {approverData.length >0 &&
                                                approverData.map(i => { return( <option key={i.id} value={i.id+(i.status === 'department' ? '1' : '2')}>{ i.name }</option>)})}
                                    </CSelect>
                                </CCol>
                                <CCol lg="2" style={{marginTop: "27px"}}><CButton  className="form-btn" onClick={approverSearchBtn}>{t('Search')}</CButton></CCol>
                                </>
                            }
                            {settingTableData.length >0 &&
                                <CCol lg="6" style={{marginTop: "37px"}}><input type="checkbox" id="allow-request" checked={allowRequest == "true"} onChange={allowRequestChange} /><CLabel htmlFor="allow-request" style={{marginLeft: "5px"}} >{t('Allow if the date has been requested as leave or business trip')}</CLabel></CCol>
                            }
                            </CRow>
                        <ApproverModal appModalError={appModalError} approverModalShow={approverModalShow} data={approverModalData} appAllCheck={appAllCheck} allCheckBoxChange={appAllCheckboxChange} appIDData={appModalEmpIDData} appID={appModalEmpID}  appCodeData={appModalEmpCodeData} appCode={appModalEmpCode} appNameData={appModalEmpNameData} appName={appModalEmpName} searchBtn={appSearchBtn} closeBtn={appCloseBtn} subCheckboxChange={approverSubCheckChange} addBtn={appAddBtn} changeAutocomplete={approverChangeAutocomplete} selectAutocomplete={approverSelectAutocomplete}  />
                        {
                            settingTableData.length >0 && addApproverData.length > 0 && !positionRank.includes(0) &&
                            <CCol lg="3" className="mt-5">
                                <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                                <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Approver Data')}</CLabel>
                            </CCol>
                        }
                        <ApproverTable data={addApproverData} saveBtn={saveBtn} deleteBtn={appDeleteBtn} positionRank={positionRank} settingTableData={settingTableData}  />
                        <CommonAlert show={alert} content={alertContent} okBtn={alertOkBtn} cancelBtn={alertCancelBtn} continues={continues} okButton={alertCancelBtn} />
                        <Confirmation show={confirmShow} content={content} type={confirmType} saveOK={saveOk} updateOK={updateOK} okButton={t("Ok")} cancel={()=>setConfirmShow(false)}   cancelButton={t('Cancel')} />                  
                </CCardBody>
        </CCard>     
        </>
    );                             
}
export default withTranslation()(LegacyWelcomeClass)
