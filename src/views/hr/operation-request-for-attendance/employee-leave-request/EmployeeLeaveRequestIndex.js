import React ,{ useState, useEffect, useCallback} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg,CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { checkNullOrBlank,isdigit,validationWhiteSpace } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage'; 
import Moment from 'moment';
import $ from 'jquery';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import AddLeaveDaySetting from './AddLeaveDaySetting';
import Loading from '../../../brycen-common/loading/Loading';
import LeaveDataTable from './LeaveDataTable';
import ApproverSearch from './ApproverSearch';
import ApproverTable from './ApproverTable';
import ApproverModal from './ApproverModal';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import CommonAlert from '../../hr-common/common-alert/CommonAlert';

/**
 * Main Component
 * @author Su Pyae Maung
 * @create 10/05/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass({t}) {
    const history                                   = useHistory();   // For edit link
    const [error,setError]                          = useState([]);   // For Error Message
    const [error2,setError2]                        = useState([]);   // For Error2 Message
    const [success,setSuccess]                      = useState([]);   // For Success Message
    const [loading, setLoading]                     = useState(false);// For Loading
    const [departmentAPI, setDepartmentAPI]         = useState([]);   // For Dept API
    const [deptState, setDeptState]                 = useState("");   // For department dropdown toggle
    const [empId, setEmpId]                         = useState("");   // For employee id dropdown toggle
    const [autocompleteID, setAutocompleteID]       = useState([]);   // For Autocomplete EMP ID
    const [empCode, setEmpCode]                     = useState("");   // For employee code dropdown toggle
    const [autocompleteCode, setAutocompleteCode]   = useState([]);   // For Autocomplete EMP CODE
    const [empName, setEmpName]                     = useState("");   // For employee name dropdown toggle
    const [autocompleteName, setAutocompleteName]   = useState([]);   // For Autocomplete EMP NAME
    const [clearData, setClearData]                 = useState("");
    const [leavetypeAPI, setLeaveTypeAPI]           = useState([]);   // For Leave Type API
    const [leaveState, setLeaveState]               = useState("");   // For leave type id
    const [leaveName, setLeaveName]                 = useState("");   // For check leave type name
    const [levType, setLevType]                     = useState(false);// For check leave type name
    const [selectedFromDate, setSelectedFromDate]   = useState(()=>ChangeDate(new Date())); // For Joined Start Date
    const [selectedToDate, setSelectedToDate]       = useState(()=>ChangeDate(new Date())); // For Joined End Date
    const [reason , setReason]                      = useState("");   // For Reason
    const [ExcFileName, setExcFileName]             = useState([]);   // excel file name
    const [ExcFile, setExcFile]                     = useState([]);   // excel file
    const [rowCount , setRowCount]                  = useState("");   // For row count
    const [AllCheck, setAllCheck]                   = useState(false);// For select checkbox all or not
    const [deleteIdList, setDeleteIdList]           = useState("");   // For delete data list
    const [content, setContent]                     = useState("");   // For Confirmation box
    const [type, setType]                           = useState("");   // For Confirmation box
    const [show, setShow]                           = useState(false);// For show/hide confirmation box
    const [addEmpListData, setAddEmpListData ]      = useState([]); // for added employee list data
    const [ selectedAppEmp, setSelectedAppEmp ]     = useState(""); // for selected employee id for approver modal
    const [ empAllCheck, setEmpAllCheck ]           = useState(false); // for employee list modal all check box
    const [ approverData, setApproverData ]         = useState([]); // for Approver List Array
    const [ approverTable, setApproverTable ]       = useState([]); // for added main approver data
    const [approverState, setApproverState]         = useState("");   // For approver dropdown
    const [approverModalShow, setApproverModalShow] = useState(false); // For show/hide approver modal box
    const [ appModalError, setApproverModalError ]  = useState([]); // for approver modal error message
    const [ approverModalData, setApproverModalData ] = useState([]); // for approver modal data
    const [ appAllCheck, setAppallCheck ]           = useState(false); // for approver all checkbox
    const [ appID, setAppID ]                       = useState(""); // for approver id autocomplete box
    const [ appIDData, setAppIDData ]               = useState([]); // for approver id data for autocomplete box
    const [ appCode, setAppCode ]                   = useState(""); // for approver code autocomplete box
    const [ appCodeData, setAppCodeData ]           = useState([]); // for approver code data for autocomplete box
    const [ appName, setAppName ]                   = useState(""); // for approver name autocomplete box
    const [ appNameData, setAppNameData ]           = useState([]); // for approver name data for autocomplete box
    const [ deptPosStatus, setDeptPosStatus ]       = useState(""); // for department or position status
    const [leaveDataTable, setLeaveDataTable]       = useState([]);   // For Leave Data Table
    const [leaveTableLength, setLeaveTableLength]   = useState([]);   // For Leave Data Table Length
    const [remainDayTable, setRemainDayTable]       = useState([]);   // For Leave Remain Day Data Table
    const [fullCheck, setFullCheck]                 = useState(false);// For fullday select checkbox all or not 
    const [beforeCheck, setBeforeCheck]             = useState(false);// For before select checkbox all or not 
    const [afterCheck, setAfterCheck]               = useState(false);// For after select checkbox all or not 
    const [fileValue, setFileValue]                 = useState("");// For import
    const [appSetting, setAppSetting]               = useState(""); // For Approver Setting value
    const [showSearchApp, setShowSearchApp]         = useState(false); // For show/hide Search Approver
    const [ alert, setAlert ]                       = useState(false); // for common alert
    const [ alertContent, setAlertContent ]         = useState(""); // for alert content
    const [ continues, setContinues ]               = useState(true); // for alert continues
    const [disableAutocomplete, setDisableAutocomplete] = useState(true);
    const [tmpLeaveDateList, setTmpLeaveDateList]       = useState([]); // for new Leave Data Table
    const [tmpAppList, setTmpAppList]                   = useState([]); // for new Approver Table
    const [deptPosApprover, setDeptPosApprover]     = useState(""); // for search approver id
    const [disableApprover, setDisableApprover]     = useState(true); // For disable/enable approver list
    const [loginCode, setLoginCode]           = useState(""); // for view permission 0, emp code
    const [loginName, setLoginName]           = useState(""); // for view permission 0, emp name
    const [ loginID, setLoginID ]             = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ]         = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP
    const [ positionRank, setPositionRank]    = useState(JSON.parse(localStorage.getItem("POSITION_RANK"))); // for session position rank
	    
/** Form Load */
useEffect(() => {
    setLoading(true);loadDept();loadLeaveType();
},[]);

useEffect(()=> {
    if(clearData !== ''){setAutocompleteID([]); setAutocompleteName([]); setAutocompleteCode([]);}
},[clearData]);

/** Start Autocomplete Employee ID, Code, Name Function */
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
        if(response.data.data[0].employee_id !== null){
            let id  = response.data.data[0].employee_id;
            getLeaveByEmp(id);setEmpId(id);
        }else{setEmpId('')}
        if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
        if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
    }
}
/** End Autocomplete Employee ID, Code, Name Function */
/** Leave Type Dropdown by Employee ID */
const getLeaveByEmp = async(id) =>{
    setLoading(true);setLeaveState("");
    let obj = { url: 'api/employee-leave-request/leave-type', method: 'post', params: { company_id: companyID, employee_id: id } }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);setLeaveTypeAPI([]);
    }else{
        setLeaveTypeAPI(response.data.leave_datas); 
    }
}
/** Start approver modal change autocomplete */
const approverChangeAutocomplete = async (type, i) => {
    setError([]); setSuccess([]);setApproverModalError([]);
    // type is id, show name in Employee ID and clear remain input
    if(type === 'id'){
        setAppID(i.target.value); setAppCode(''); setAppName('');
    }
    // type is code, show name in Employee Code and clear remain input
    else if(type === 'code') {
        setAppID(''); setAppCode(i.target.value); setAppName('');
    }
    // type is name, show name in Employee Name and clear remain input
    else{
        setAppID(''); setAppCode(''); setAppName(i.target.value);
    }
    // if empty, remove data from autocomplete
    if(i.target.value === ''){
        setAppID(''); setAppName(''); setAppCode('');
    }else{
        let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyID } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setApproverModalError(response.message); setAppID([]); setAppName([]); setAppCode([]);
        }else{
            (type === 'id') ? setAppIDData(response.data.data) :
            (type === 'code') ? setAppCodeData(response.data.data) : setAppNameData(response.data.data);
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
        if(response.data.data[0].employee_id !== null){setAppID(response.data.data[0].employee_id)}else{setAppID('')}
        if(response.data.data[0].name !== null){setAppName(response.data.data[0].name)}else{setAppName('')}
        if(response.data.data[0].employee_code !== null){setAppCode(response.data.data[0].employee_code)}else{setAppCode('')}
    }
}
/**End approver modal select autocomplete */

/** Get All Departments From ERP Database */
const loadDept = async () => {
    let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    let response = await ApiRequest(obj);setLoading(false);
    response.flag === false ? setDepartmentAPI([]): setDepartmentAPI(response.data.data);
}
const deptChange = (e) =>{ setDeptState(e.target.value); }

/** Get Approver List by applicant id Function */
const getApplicant = ()=>{}
const getApprover = async (levdata) => {
    setApproverData([]); let idArr = [];
    for(let i = 0; i < levdata.length; i++){
        idArr.push(levdata[i].employee_id);
    }
    let obj = { package_name: 'erp', url: 'api/approver-list', method: 'post',params: {employee_id: idArr,company_id: companyID, device_flag:1} }
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){ 
        // setSuccess([]);setError(response.message);
        // window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        if(response.data.status == "OK"){
            let temp = [];
            if(response.data.data.department != undefined){
                if(response.data.data.department.length > 0 ){
                    response.data.data.department.forEach(dep=>{
                        temp.push({
                            "id": "d"+dep.id, 
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
                            "id": "p"+pos.id,
                            "code": "",
                            "name": pos.position_name,
                            "status": "position"
                        })
                    })
                }
                setApproverData(temp);
            }
        }else if(response.data.status == "NG"){
            setSuccess([]);setError(response.data.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }
}

/** Approver Dropdown Change */
const approverChange = (e) =>{ 
    let id = e.target.value; let app_id = id.substr(1, id.length-1);
    if(id != ""){
        let data = approverData.filter(app => id ==  app.id);
        setDeptPosStatus(data[0]['status']);  
    }
    setApproverState(id); setDeptPosApprover(app_id);
}

/** Get All Leave Types From Database */
const loadLeaveType = async () => {
    let obj = { url: `api/employee-leave-request?login_id=${loginID}&company_id=${companyID}&device_flag=1`, method: 'get'}
    let response = await ApiRequest(obj); setLoading(false);
    if(response.flag === false){
        setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        let data = response.data.leave_datas;
        setAppSetting(data.approver_setting);
        setDisableAutocomplete(data.view_permission);
        setLoginCode(data.employee_code); setLoginName(data.employee_name);
        if(data.view_permission === false){
            getLeaveByEmp(loginID);  // get leave type by employee id function
            setEmpId(loginID);      
            setEmpCode(data.employee_code);    
            setEmpName(data.employee_name);     
        }
        if(data.approver_setting == "1" || data.approver_setting == "4" || data.approver_setting == "5"){
            setShowSearchApp(true);
        }
        if(data.approver_setting == "2" || data.approver_setting == "3" || positionRank.includes(0) ){
            setShowSearchApp(false);
        }
    }
}

/** Leave Type Change Function */
const leaveChange = (i) =>{
    let  lev_id= i.target.value; setLeaveState(lev_id);
    if(lev_id == 11){
        setLeaveName('CompLev');setLevType(true);
    }else if(lev_id == 12){
        setLeaveName('OFFINLev');setLevType(true);
    }else if(lev_id == 13){ 
        setLeaveName('PHINLev');setLevType(true);
    }else{setLeaveName('');setLevType(false);}
}

/** ADD button for Leave Type Setting Function */
const [addData, setAddData] = useState([]);
const addAPI= async(pageNumber = 1) => {
    let errMsg = [];
    if(!checkNullOrBlank(empId)){let str = t(message.JSE005).replace('%s',t('Employee ID'));errMsg.push(str);}
    if(!checkNullOrBlank(empCode)){let str = t(message.JSE005).replace('%s',t('Employee Code'));errMsg.push(str);}
    if(!checkNullOrBlank(empName)){let str = t(message.JSE005).replace('%s',t('Employee Name'));errMsg.push(str);}
    if(!checkNullOrBlank(leaveState)){let str = t(message.JSE001).replace('%s',t('Leave Type'));errMsg.push(str);}
    if(!checkNullOrBlank(selectedFromDate)){let str = t(message.JSE005).replace('%s',t('From Date'));errMsg.push(str); }   
    if(!checkNullOrBlank(selectedToDate)){let str = t(message.JSE005).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate > selectedToDate){let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setError2([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{
        setError([]);setSuccess([]);setError2([]);
        setLoading(true);
        let add_data = {
            "method":"post","url":"api/employee-leave-request/add-employee-leave-data",
            "params": {
                "company_id" : companyID,
                "login_id": loginID,
                "employee_id": empId,      
                "employee_code": empCode, 
                "employee_name": empName,    
                "leave_type_id":leaveState, 
                "from_date": selectedFromDate, 
                "to_date": selectedToDate,   
            }
        }
        let response = await ApiRequest(add_data);setLoading(false);
        if(response.flag === false){
            setSuccess([]);setError(response.message);setError2([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status === 'OK'){
                let data = response.data.leave_request_data;
                setSuccess([]);setError([]);setError2([]);
                if(checkNullOrBlank(data.message)){
                    setAlert(true);setAlertContent(data.message);setContinues(false);
                }else{ setAlert(false); }
                let newData = data.request_leave_datas;
                let conditionData = leaveDataTable;
				setTmpLeaveDateList([]);
                if(leaveDataTable.length > 0){
					newData.forEach((newdata, newIndex) =>{
						for(let i=0; i < leaveDataTable.length; i++){
							let tmpData = leaveDataTable[i];
							// if(tmpData.employee_id == newdata.employee_id && tmpData.leave_date == newdata.leave_date){ // old condition
                            if(tmpData.employee_id == newdata.employee_id){
                                setError([t(message.JSE007).replace('%s',t('Employee ID(')+newdata.employee_id+t(')'))]);
                                window.scrollTo({top:0, left:0, behavior:'smooth'});
								break;
							}else {
								if((i+1) == leaveDataTable.length){
									tmpLeaveDateList.push(newdata); 
								}
							}
						}    
					})
					let tmpConcatArray = leaveDataTable.concat(tmpLeaveDateList);
                    attachspan(tmpConcatArray);// call attach file rowspan function
					setLeaveDataTable(tmpConcatArray);  
                    getApprover(tmpConcatArray); // call get approver list function
                }else{
                    attachspan(data.request_leave_datas); // call attach file rowspan function
                    setLeaveDataTable(data.request_leave_datas);
                    getApprover(data.request_leave_datas); // call get approver list function
                }
                let newRemain = [];
                if(remainDayTable.length > 0){
                    for (var i = 0; i < remainDayTable.length; i++) {
                        let tmpOldRemain = remainDayTable[i];
                        let tmpNewRemain = data.leave_remain_data;
                        if(tmpOldRemain["employee_id"] == data["employee_id"] 
                            && tmpOldRemain["leave_name"] == data["leave_name"]){
                            if (tmpNewRemain.prev_remain_day != "-") { 
                                tmpOldRemain["prev_remain_day"] = tmpNewRemain.prev_remain_day;
                            }
                            if (tmpNewRemain.cur_remain_day != "-") {
                                tmpOldRemain["cur_remain_day"] = tmpNewRemain.cur_remain_day;
                            }
                            if (tmpNewRemain.next_remain_day != "-") {
                                tmpOldRemain["next_remain_day"] = tmpNewRemain.next_remain_day;
                            }
                        } else {
                            if(tmpOldRemain["employee_id"] != data["employee_id"] ){ // new condition
                                if ((i+1) == remainDayTable.length) {
                                    let tmp     = [];
                                    tmp["employee_id"] = data.employee_id;
                                    tmp["employee_code"] = data.request_leave_datas[0]['employee_code'];
                                    tmp["leave_name"]  = data.leave_name;
                                    tmp["prev_remain_day"] = data.leave_remain_data.prev_remain_day;
                                    tmp["cur_remain_day"] = data.leave_remain_data.cur_remain_day;
                                    tmp["next_remain_day"] = data.leave_remain_data.next_remain_day;
                                    newRemain.push(tmp);
                                }
                            }
                        }
                    }
                    let concatData = remainDayTable.concat(newRemain);
                    setRemainDayTable(concatData);
                }else{
                    let tmp     = [];
                    tmp["employee_id"] = data.employee_id;
                    tmp["employee_code"] = data.request_leave_datas[0]['employee_code'];
                    tmp["leave_name"]  = data.leave_name;
                    tmp["prev_remain_day"] = data.leave_remain_data.prev_remain_day;
                    tmp["cur_remain_day"] = data.leave_remain_data.cur_remain_day;
                    tmp["next_remain_day"] = data.leave_remain_data.next_remain_day;
                    newRemain.push(tmp);
                    setRemainDayTable(newRemain);
                }
                /** For Approver Table */
                let newApprover = data.approver_datas;
                setTmpAppList([]);
                if(appSetting != "1"){
                    if(approverTable.length > 0){
                        newApprover.forEach((newapp, newAppIndex) =>{
                            for(let i=0; i < approverTable.length; i++){
                                let tmpData = approverTable[i];
                    
                                if(tmpData.applicant_id == newapp.applicant_id){
                                    break;
                                }else {
                                    if((i+1) == approverTable.length){
                                        tmpAppList.push(newapp); 
                                    }
                                }
                            }
                        })
                        let tmpConcatApprover = approverTable.concat(tmpAppList);
                        setApproverTable(tmpConcatApprover);

                    }else{
                        setApproverTable(data.approver_datas);
                    }  
                }
            }else{
                setSuccess([]);setError(response.data.data.message);setError2([]);
                setLeaveDataTable([]);setApproverTable([]);setRemainDayTable([]);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        }
    }  // end else
}
const  alertOkBtn= async()=>{setAlert(false);}
const  alertCancelBtn=()=>{setAlert(false);}

/** Rowspan for attach file  Function */
const attachspan =(tmplev)=>{
    let lev_arr = [];
    tmplev.forEach((data,idx)=>{
        if(lev_arr.length > 0){
            lev_arr.forEach((j,index) =>{
                if(j.employee_id == data.employee_id){
                    j.spin_count ++ ; return false;
                }else if(index == lev_arr.length -1){
                    let innerTmp =[];
                    innerTmp['employee_id'] = data.employee_id;
                    innerTmp['begin_spin']	= idx;
                    innerTmp['spin_count']	= 1;
                    lev_arr.push(innerTmp);
                }
            })
        }else{
            let innerTmp =[];
            innerTmp['employee_id'] = data.employee_id;
            innerTmp['begin_spin']	= idx;
            innerTmp['spin_count']	= 1;
            lev_arr.push(innerTmp);
        }
    })
    if(lev_arr.length > 0) {setDisableApprover(false);}
    setLeaveTableLength(lev_arr);
}

/** Full Day Checkbox Function */
const fulldayChange = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    if(checked == true){
        setFullCheck(true);
        setBeforeCheck(false);
        setAfterCheck(false);
        leaveDataTable.map(j=>{
            j.full_day = true;
            j.before_break = false;
            j.after_break = false;
            j.full_half_flag = 1;
            return j;
        });
    }else{
        setFullCheck(false);
        leaveDataTable.map(j=>{
            j.full_day = false;
            j.full_half_flag = ""; return j;
        });
    }
}
/** Before Day Checkbox Function */
const beforeChange = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    if(checked == true){
        setFullCheck(false);
        setBeforeCheck(true);
        setAfterCheck(false);
        leaveDataTable.map(j=>{
            j.full_day = false;
            j.before_break = true;
            j.after_break = false;
            j.full_half_flag = 2;
            return j;
        });
    }else{
        setBeforeCheck(false);
        leaveDataTable.map(j=>{
            j.before_break = false;
            j.full_half_flag = ""; return j;

        });
    }
}
/** After Day Checkbox Function */
const afterChange = (i) => {
    let checked = i.target.checked;
    if(checked == true){
        setFullCheck(false);
        setBeforeCheck(false);
        setAfterCheck(true);
        leaveDataTable.map(j=>{
            j.full_day = false;
            j.before_break = false;
            j.after_break = true;
            j.full_half_flag = 3;
            return j;
        });
    }else{
        setAfterCheck(false);
        leaveDataTable.map(j=>{
            j.after_break = false;
            j.full_half_flag = ""; return j;
        });
    }
}
/** Sub Fullday Radio Function */
const subFullChange = (i)=>{
    let data = leaveDataTable.map(j=>{
        if(j.employee_id == i.employee_id && j.leave_date == i.leave_date){
            j.full_day = true;
            j.before_break = false;
            j.after_break = false;
            j.full_half_flag = 1;
        }return j;
    });
    setLeaveDataTable(data); checkboxFullFunction(); checkboxBeforeFunction(); checkboxAfterFunction();
}
/** Sub Before Break Radio Function */
const subBeforeChange = (i)=>{
    let data = leaveDataTable.map(j=>{
        if(j.employee_id == i.employee_id && j.leave_date == i.leave_date){
            j.full_day = false;
            j.before_break = true;
            j.after_break = false;
            j.full_half_flag = 2;
        }return j;
    });
    setLeaveDataTable(data); checkboxFullFunction(); checkboxBeforeFunction(); checkboxAfterFunction();
}
/** Sub After Break Radio Function */
const subAfterChange = (i)=>{
    let data = leaveDataTable.map(j=>{
        if(j.employee_id == i.employee_id && j.leave_date == i.leave_date){
            j.full_day = false;
            j.before_break = false;
            j.after_break = true;
            j.full_half_flag = 3;
        }return j;
    });
    setLeaveDataTable(data); checkboxFullFunction(); checkboxBeforeFunction(); checkboxAfterFunction();
}
/** Start For ALL Checkbox,Radio Function */
const checkboxFullFunction = () =>{
    for(let i=0; i< leaveDataTable.length; i++){
        if(leaveDataTable[i]['full_day'] == false){
            setFullCheck(false);return false;
        }else{
            setFullCheck(true);
        }
    }
}
const checkboxBeforeFunction = () =>{
    for(let i=0; i< leaveDataTable.length; i++){
        if(leaveDataTable[i]['before_break'] == false){
            setBeforeCheck(false);return false;
        }else{
            setBeforeCheck(true);
        }
    }
}
const checkboxAfterFunction = () =>{
    for(let i=0; i< leaveDataTable.length; i++){
        if(leaveDataTable[i]['after_break'] == false){
            setAfterCheck(false);return false;
        }else{
            setAfterCheck(true);
        }
    }
}
/** End For ALL Checkbox,Radio Function */
/** Set Reason button Function */
let setBtn = (e) => {
    let data = leaveDataTable.map(i=>{i.reason = e; return i;})
    setLeaveDataTable(data);
}
let allReasonSet = (e) =>{ setReason(e.target.value); }
let subReasonChange =(id, date, e)=>{
    $('#all-reason').val("");
    let data = leaveDataTable.map((main,i)=>{
        if(main.employee_id == id && main.leave_date == date){
            main.reason = e.target.value;
            return main;
        }
            return main;
    })
    setLeaveDataTable(data);
}
/** Delete Leave Data Function */
let deleteLeaveDay=(i)=>{
    let data = leaveDataTable.filter(j=>{
        if(j.leave_date !== i.leave_date){ return j; }
        else if(j.employee_id !== i.employee_id){ return j; }
    } );
    if(data.length <= 0){ setRemainDayTable([]); } // if leave table length is 0, hide remain day table

    let empdatelist = leaveDataTable.filter(k=>{
        if(k.employee_id == i.employee_id){ return k; } 
    })
    let obj = remainDayTable.filter(k=>{
        if(k.employee_id != i.employee_id || empdatelist.length > 1){ return k; } // remove employee's remain day
    })
    if(data.length < 1) { setDisableApprover(true); } // if leave table length is 0, disable approver search
    
    let approverTableData = approverTable.filter(data => {
        if(i.employee_id != data.applicant_id || empdatelist.length > 1){ return data; } // remove approver data
    })
    if(approverTableData.length <= 0) { setApproverData([]); } // if approver table length is 0, hide approver table

    setApproverTable(approverTableData);
    attachspan(data); // call attach file rowspan function
    if(data.length > 0){ getApprover(data); }  // call approver list function
    setLeaveDataTable(data);setRemainDayTable(obj);
}
/** File Import Function */
const txtFile = (i)=>{ setFileValue(i); }
const clearFile = (i) => { i.target.value = null; }
const importFile = (i) => {
    let flag = false;setError([]); let obj = "";let k = fileValue;let mess ="";
    let zero = 0;let fileName=[...ExcFileName];let file=[...ExcFile];
    let File = i.target.files;
    if(ExcFileName.length >19){flag= true; mess = t(message.JSE009);} // check file limit (max 20)
    if(file.length >20){ flag= true; mess = t(message.JSE009);} // check file limit (max 20)
    for(let i=0 ; i<File.length ; i++){
        let name = File[i].name;
        ExcFileName.forEach(exc=>{if(exc == name){
            flag = true; mess = t(message.JSE022)} // check file name duplicate
        })
        if(flag == false){
            const fsize = File[i].size;
            const size = Math.round((fsize / 1024));
            if(size > 10000 ){ // check file size (max 10M)
                flag = true;mess = t(message.JSE014).replace('%s', t('This file\'s size')).replace('%s', t('10M'));
            }
        }
        if(flag == false){
            fileName.push(File[i].name);
            file.push(File[i]); obj = File[i];
        }  
    }
    if(flag == false){
        setExcFileName(fileName);
        setExcFile(file);
        let data = leaveDataTable.map(j=>{
            if(j.leave_date == k.leave_date && j.employee_id == k.employee_id){
                File.forEach( f =>{
                    j.attach_files.push(f);
                })
            }
            return j; 
        } );
        setLeaveDataTable(data);
    }else{ setError([mess]);$("html, body").animate({ scrollTop: 0 }, 1000); }
}
/** Start Clear excel filename and file Function */
const removeFile = (val, i) => {
    let data = leaveDataTable.map(j=>{
        if(j.leave_date == val.leave_date && j.employee_id == val.employee_id){
            j.attach_files.splice(i,1);
        }
        return j; 
    } );
    setLeaveDataTable(data);setExcFileName(data);
}
/** Search Approver Modal box Function */
let searchApprover=async()=>{
    let errMsg = [];
    if(!checkNullOrBlank(approverState)){let str = t(message.JSE001).replace('%s',t('Approver'));errMsg.push(str);}
    if(leaveDataTable.length <= 0){let str = t(message.JSE005).replace('%s',t('Leave Data Table'));errMsg.push(str);}
    if(checkNullOrBlank(errMsg)){
        setError(errMsg);setSuccess([]);setError2([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }
    else{
        setSuccess([]); setError([]); setApproverModalShow(!approverModalShow);
    }
}
/** Approver all checkbox change Function */
let appAllCheckboxChange=()=>{
    let Data = approverModalData.map(data =>{
        data.is_checked= !appAllCheck
        return data;
    });
    setAppallCheck(!appAllCheck); setApproverModalData(Data)
}
/** Approver search button Function */
let appSearchBtn= async()=>{
    setApproverModalError([]);setSuccess([]);let params="";
    if(appID == ""){
        setApproverModalError([t(message.JSE005).replace('%s', t('Employee ID'))]);
    }else{
        setApproverModalError([]);
        setLoading(true);
        let idArr = [];
        for(let i = 0; i < leaveDataTable.length; i++){
            idArr.push(leaveDataTable[i].employee_id);
        }
        if(deptPosStatus == "department"){
            params={"company_id":companyID,"employee_id": appID,"department_id": deptPosApprover,"position_id": "", "table_employee_id": idArr}
        }else if(deptPosStatus == "position"){
            params={"company_id":companyID,"employee_id": appID,"department_id": "","position_id": deptPosApprover, "table_employee_id": idArr}
        }
        let search = {
            "method":"post",
            "url": "api/employee-leave-request/search-approver-data",
            "params": params
        }
        let response = await ApiRequest(search);setLoading(false);
        if(response.flag === false){
            setSuccess([]);setApproverModalError(response.message);
        }else{
            setAppallCheck(false);setApproverModalData(response.data.approver_datas);
        } 
    }
}
/** Approver sub checkbox change Function */
let approverSubCheckChange=(e)=>{
    let id = e.target.value;
    let data = approverModalData.map(main=>{
        if(main.approver_id == id){
            main.is_checked = !main.is_checked;
            return main;
        }
        return main;
    })
    setApproverModalData(data);
    let flag = true;
    data.forEach(data=>{
        if(data.is_checked == false){
            flag = false;
        }
    })
    setAppallCheck(flag);
}
/** Approver close button Function */
let appCloseBtn=()=>{
    setApproverModalShow(false);setApproverModalError([]);setApproverModalData([]);setAppName('');setAppCode('');setAppID('');setAppIDData([]);setAppCodeData([]);setAppNameData([]);
}
/** Approver modal add button Function */
let appAddBtn=()=>{
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
        setApproverModalError([]);
        let add_app_data = approverTable
        approverModalData.forEach((item, i) => {
            if( item.is_checked === true ){
                let { approver_id, applicant_id } = item;
                approverTable.forEach((add, ii) => {
                    if( applicant_id == add.applicant_id && approver_id == add.approver_id){
                        if(str!=""){str = str +",";}
                        str=str+approver_id;flag=false;
                    }
                });
            }
        });
        if(flag == false){
            setApproverModalError([t(message.JSE007).replace('%s',t('This approver ID(')+str+t(')'))]);
            let element = document.getElementById("approver-modal");
            element.scrollIntoView({behavior: "smooth", block: "start"});
        }else{
            approverModalData.forEach(app=>{
                if(app.is_checked == true){ add_app_data.push(app);}
            })
            setApproverTable(add_app_data);appCloseBtn();setAppallCheck(false);
        }
    }
}
/** Delete Main Approver data Function */
let deleteApprover=(i)=>{
    let data = approverTable.filter(j=>{
        if(j.applicant_id !== i.applicant_id){return j; }
        else if(j.approver_id !== i.approver_id){return j;}
    } );setApproverTable(data);
}
/** Save Function */
let saveData =()=>{
    let errMsg = [];
    if(leaveDataTable.length <= 0){let str = t(message.JSE005).replace('%s',t('Leave Type Setting'));errMsg.push(str);}
    if(!positionRank.includes(0)){
        if(approverTable.length <= 0){let str = t(message.JSE005).replace('%s',t('Approver Data'));errMsg.push(str);}
    }
    if(checkNullOrBlank(errMsg)){
      setError(errMsg);setSuccess([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{setShow(!show);setContent('Are you sure want to save?');setType('save');}
}
const saveOK = async() => {
    setShow(!show);setSuccess([]);setError([]); setLoading(true);
    const formData  = new FormData();
    formData.append("login_id", loginID);
    formData.append("company_id", companyID);
    positionRank.forEach((rank,p)=>{
        formData.append(`position_rank[${p}]`, rank);
    })
    formData.append("email","supyaemaung@brycenmyanmar.com.mm" );
    formData.append("device_flag",1 );
    leaveDataTable.forEach((lev,i)=>{
        formData.append(`leave_data[${i}][company_id]`, companyID);
        formData.append(`leave_data[${i}][employee_id]`, lev.employee_id);
        formData.append(`leave_data[${i}][employee_name]`, lev.employee_name);
        formData.append(`leave_data[${i}][employee_code]`, lev.employee_code);
        formData.append(`leave_data[${i}][leave_date]`, lev.leave_date);
        formData.append(`leave_data[${i}][work_off_day]`, lev.work_off_day );
        formData.append(`leave_data[${i}][leave_type_id]`, lev.leave_type_id);
        formData.append(`leave_data[${i}][leave_type_name]`, lev.leave_type_name);
        formData.append(`leave_data[${i}][full_half_flag]`, lev.full_half_flag);
        formData.append(`leave_data[${i}][reason]`, lev.reason );
        formData.append(`leave_data[${i}][getLeaveFlag]`, lev.getLeaveFlag);
        lev.attach_files.forEach((data,j)=>{ 
            formData.append(`leave_data[${i}][attach_files][${j}]`, data);
        })
    })
    approverTable.forEach((app,i)=>{
        formData.append(`approver_data[${i}][applicant_id]`, app.applicant_id);
        formData.append(`approver_data[${i}][approver_id]`, app.approver_id);
        formData.append(`approver_data[${i}][approver_name]`, app.approver_name);
        formData.append(`approver_data[${i}][approver_email]`, app.email);
        formData.append(`approver_data[${i}][approver_or_checker]`, "1");
        formData.append(`approver_data[${i}][email_flag]`, "1");
    })

    let obj = {method:"post",url: "api/employee-leave-request/check-employee-leave-data",params: formData}
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        if(response.data.data.alert_box === true){
            setShow(true);setContent(response.message);setType('confirm');
        }else{
            setSuccess([]);setError(response.message);setFullCheck(false);setBeforeCheck(false);setAfterCheck(false);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }
    }else{     
        setError([]);setSuccess([response.data.message]);
        setLeaveDataTable([]);setRemainDayTable([]);setApproverTable([]);
        if(disableAutocomplete == false){
            setEmpId(loginID);setEmpName(loginName);setEmpCode(loginCode);
        }else{setEmpId("");setEmpName("");setEmpCode("");}
        setLeaveState("");setFullCheck(false);setBeforeCheck(false);setAfterCheck(false);
        setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));setApproverState(""); setExcFileName([]); setExcFile([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});       
    }
}
/** if Attendance IN/OUT data exist, overwrite Function */
const confirmOK= async()=>{
    setShow(!show);setSuccess([]);setError([]); setLoading(true);
    const formData  = new FormData();
    formData.append("login_id", loginID);
    formData.append("company_id", companyID);
    positionRank.forEach((rank,p)=>{
        formData.append(`position_rank[${p}]`, rank);
    })
    formData.append("email","supyaemaung@brycenmyanmar.com.mm" );
    formData.append("device_flag",1 );
    leaveDataTable.forEach((lev,i)=>{
        formData.append(`leave_data[${i}][company_id]`, companyID);
        formData.append(`leave_data[${i}][employee_id]`, lev.employee_id);
        formData.append(`leave_data[${i}][employee_name]`, lev.employee_name);
        formData.append(`leave_data[${i}][employee_code]`, lev.employee_code);
        formData.append(`leave_data[${i}][leave_date]`, lev.leave_date);
        formData.append(`leave_data[${i}][work_off_day]`, lev.work_off_day );
        formData.append(`leave_data[${i}][leave_type_id]`, lev.leave_type_id);
        formData.append(`leave_data[${i}][leave_type_name]`, lev.leave_type_name);
        formData.append(`leave_data[${i}][full_half_flag]`, lev.full_half_flag);
        formData.append(`leave_data[${i}][reason]`, lev.reason );
        formData.append(`leave_data[${i}][getLeaveFlag]`, lev.getLeaveFlag);
        lev.attach_files.forEach((data,j)=>{ 
            formData.append(`leave_data[${i}][attach_files][${j}]`, data);
        })
    })
    approverTable.forEach((app,i)=>{
        formData.append(`approver_data[${i}][applicant_id]`, app.applicant_id);
        formData.append(`approver_data[${i}][approver_id]`, app.approver_id);
        formData.append(`approver_data[${i}][approver_name]`, app.approver_name);
        formData.append(`approver_data[${i}][approver_email]`, app.email);
        formData.append(`approver_data[${i}][approver_or_checker]`, "1");
        formData.append(`approver_data[${i}][email_flag]`, "1");
    })
    let obj = {method:"post",url: "api/employee-leave-request/save-employee-leave-data",params: formData}
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message);setSuccess([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{   
        setLeaveDataTable([]);setRemainDayTable([]);setApproverTable([]);
        if(disableAutocomplete == false){
            setEmpId(loginID);setEmpName(loginName);setEmpCode(loginCode);
        }else{setEmpId("");setEmpName("");setEmpCode("");}
        setLeaveState("");setFullCheck(false);setBeforeCheck(false);setAfterCheck(false);
        setSelectedFromDate(()=>ChangeDate(new Date()));
        setSelectedToDate(()=>ChangeDate(new Date()));setApproverState("");    
        setError([]);setSuccess([response.data.message]); setExcFileName([]); setExcFile([]);
        window.scrollTo({top:0, left:0, behavior:'smooth'});         
    }
}
return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message success={success} error={error} error2={[]} />
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Employee Leave Request')}</CLabel></h5></CCardHeader>
            <CCardBody>
                <AddLeaveDaySetting
                    disableAutocomplete={disableAutocomplete} changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete}
                    empId={empId} empCode={empCode} empName={empName} autocompleteID={autocompleteID} autocompleteCode={autocompleteCode} autocompleteName={autocompleteName}
                    leavetypeAPI={leavetypeAPI} leaveState={leaveState} leaveChange={leaveChange} leaveName={leaveName} levType={levType}
                    selectedFromDate={selectedFromDate} changeFromDate={i=>setSelectedFromDate(ChangeDate(i))}
                    selectedToDate={selectedToDate} changeToDate={i=>setSelectedToDate(ChangeDate(i))} addAPI={addAPI}
                />
                <LeaveDataTable
                    leaveDataTable={leaveDataTable} remainDayTable={remainDayTable} fullCheck={fullCheck} fulldayChange={fulldayChange} fullCheck={fullCheck}
                    beforeCheck={beforeCheck} beforeChange={beforeChange} afterCheck={afterCheck} afterChange={afterChange} subFullChange={subFullChange} subBeforeChange={subBeforeChange} subAfterChange={subAfterChange}
                    deleteLeaveDay={deleteLeaveDay} reason={reason} allReasonSet={allReasonSet} setBtn={setBtn} subReasonChange={subReasonChange}
                    importFile={importFile} clearFile={clearFile} ExcFileName={ExcFileName} ExcFile={ExcFile} removeFile={removeFile} txtFile={txtFile} leaveTableLength={leaveTableLength}
                />
                <ApproverSearch
                    approverData={approverData} showSearchApp={showSearchApp} approverChange={approverChange} 
                    approverState={approverState} searchApprover={searchApprover} getApplicant={getApplicant} disableApprover={disableApprover}
                />
                <ApproverModal
                    appModalError={appModalError} approverModalShow={approverModalShow} data={approverModalData} 
                    appAllCheck={appAllCheck} allCheckBoxChange={appAllCheckboxChange} 
                    appIDData={appIDData} appID={appID} appCodeData={appCodeData} appCode={appCode} appNameData={appNameData} appName={appName}
                    searchBtn={appSearchBtn} closeBtn={appCloseBtn} subCheckboxChange={approverSubCheckChange} addBtn={appAddBtn}
                    changeAutocomplete={approverChangeAutocomplete} selectAutocomplete={approverSelectAutocomplete} 
                />
                <ApproverTable
                    approverTable={approverTable} deleteApprover={deleteApprover} leaveDataTable={leaveDataTable} saveData={saveData} positionRank={positionRank}
                />
                <Confirmation
                    content={content} okButton={t('OK')} cancelButton={t('Cancel')} type={type} show={show} cancel={()=>setShow(!show)} saveOK={saveOK} confirmOK={confirmOK}
                />
                <CommonAlert show={alert} content={alertContent} okBtn={alertOkBtn} cancelBtn={alertCancelBtn} continues={continues} okButton={alertCancelBtn} />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);}
export default withTranslation()(LegacyWelcomeClass);
