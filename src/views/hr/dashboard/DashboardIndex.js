/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback } from 'react';
import {CCard,CCardBody,CCardHeader,CCol,CRow,CImg,CLabel,CButton,CFormGroup,CModal,CModalHeader,CModalBody,CButtonToolbar,CSelect, CInput} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import $ from 'jquery';
import { useHistory } from "react-router-dom";
import {CChartDoughnut} from '@coreui/react-chartjs'
import RequestForAllowance from './RequestForAllowance';
import CheckInOutRequest from './CheckInOutRequest';
import ForgetCardRequest from './ForgetCardRequest';
import LeaveRequest from './LeaveRequest';
import PrerequestForOvertime from './PrerequestForOvertime';
import RequestForOvertime from './RequestForOvertime';
import ExchangeDateRequest from './ExchangeDateRequest';
import ContractExpire from './ContractExpire';
import HappyBirthday from './HappyBirthday';
import CheckProbationPeriod from './CheckProbationPeriod';
import BonusNotification from './BonusNotification';
import Loading from '../../brycen-common/loading/Loading';
import { ApiRequest } from '../../brycen-common/api-request/RequestApi';
import Message from '../../brycen-common/message/Message';
import Confirmation from '../../brycen-common/confirmation/Confirmation';
import RejectModal from './RejectModal';
import message from '../hr-common/common-message/CommonMessage';
import Moment from 'moment';
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory();
    const [ empName, setEmpName ] = useState(localStorage.getItem('EMP_NAME') ); // for employee name
    const [ loading, setLoading ] = useState(false); // for loading
    const [ success, setSuccess] = useState([]); // for success message
    const [ error, setError ] = useState([]); // for error message
    const [ error2, setError2 ] = useState([]); // for error message
    const [ amountShow, setAmountShow ] = useState(false); // for amount show or hide
    const [ announceShow, setAnnounceShow ] = useState(false); // for announce show or hide
    const [ announcement, setAnnouncement ] = useState([]);
    const [ graphShow, setGraphShow ] = useState(false); // for graph show or hide
    const [ dailyLate, setDailyLate ] = useState([]); // for daily late early summary
    const [ attendanceLabel, setAttendanceLabel ] = useState(['Atendance', 'Leave', 'Absent']); // for attendance label
    const [ attendanceData, setAttendanceData ] = useState([]); // for attendance data
    const [ lateEarlyLabel, setLateEarlyLabel ] = useState(['Atendance', 'Late', 'Early']); // for late early label
    const [ lateEarlyData, setLateEarlyData ] = useState([]);  // for late early data
    const [ empTypeData, setEmpTypeData ] = useState([]);
    const [ empTypeColor, setEmpTypeColor ] = useState(['#7cbf37','#f2c6d2','#ffd45c','#f63822']); // for employee type summary color
    const [requestForAllowanceUpDown, setRequestForAllowanceUpDown ] = useState(false);  // for request for allowance up down button
    const [requestForAllowanceData, setRequestForAllowanceData ] = useState([]);  // for request for allowance data
    const [checkInOutUpDown, setCheckInOutUpDown ] = useState(false);  // for check in out up down button
    const [checkInOutData, setCheckInOutData ] = useState([]);  // for check in out  data
    const [forgetCardUpDown, setForgetCardUpDown ] = useState(false);  // for forget card request up down button
    const [forgetCardData, setForgetCardData ] = useState([]);  // for forget card request data
    const [leaveRequestUpDown, setLeaveRequestUpDown ] = useState(false);  // for leave request up down button
    const [leaveRequestData, setLeaveRequestData ] = useState([]);  // for leave request data
    const [preReqOvertimeUpDown, setPreReqOvertimeUpDown ] = useState(false);  // for prerequest overtime request up down button
    const [preReqOvertimeData, setPreReqOvertimeData ] = useState([]);  // for prerequest overtime data
    const [reqForOvertimeUpDown, setReqForOvertimeUpDown ] = useState(false);  // for request for overtime up down button
    const [reqForOvertimeData, setReqForOvertimeData ] = useState([]);  // for request for overtime data
    const [exchangeDateUpDown, setExchangeDateUpDown ] = useState(false);  // for exchange date request up down button
    const [exchangeDateData, setExchangeDateData ] = useState([]);  // for exchange date request dataset 
    const [contractExpireUpDown, setContractExpireUpDown ] = useState(false);  // for contract expire up down button
    const [contractExpireData, setContractExpireData ] = useState([]);  // for contract expire up data
    const [happyBirthdayUpDown, setHappyBirthdayUpDown ] = useState(false);  // for employee happy birthday up down button
    const [happyBirthdayData, setHappyBirthdayData ] = useState([]);  // for employee happy birthday data
    const [probationPeriodUpDown, setProbationPeriodUpDown ] = useState(false);  // for Probation Period up down button
    const [probationPeriodData, setProbationPeriodData ] = useState([]);  // for Probation Period data
    const [bonusNotificationUpDown, setBonusNotificationUpDown ] = useState(false);  // for Bonus Notification up down button
    const [bonusNotificationData, setBonusNotificationData ] = useState([]);  // for Bonus Notification data
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id
    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id
    const [ departmentID, setDepartmentID ] = useState(JSON.parse(localStorage.getItem('DEPARTMENT_ID'))); // for session department id
    const [ positionID, setPositionID ] = useState(JSON.parse(localStorage.getItem('POSITION_ID'))); // for session position id
    const [ confirmShow, setConfirmShow ] = useState(false); // for confirmation message box
    const [ content, setContent ] = useState(""); // for content confirmation message
    const [ confirmType, setConfirmType ] = useState(""); // for confirmation type 
    const [ tableName, setTableName ] = useState("");  // for table name
    const [ clickedID, setClickedID ] = useState("");  // for clicked id
    const [ modalError, setModalError ] = useState([]);  // for reject modal error
    const [ reason, setReason ] = useState(""); // for reason at reject modal
    const [ modalShow, setModalShow ] = useState(false); // for reject modal show hide

    let customer_name = window.location.href.split("/")[3];
    
    /** Form Load */
    useEffect(() => {
      setLoading(true);index();
    },[]);

    /** Start index Function */
    let index=async()=>{
        let empTypeData = [];
        let search = {
            "method":"post",
            "url": "api/dashboard",
            "params": {
                "company_id" : companyID,
                "login_id" : loginID,
                "department_id" : departmentID,
                "position_id" : positionID
            }
        }
        let response = await ApiRequest(search);
        if(response.flag == false){ // catch error
            setLoading(false);setSuccess([]);setError(response.message);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            if(response.data.status == "OK"){
                setAmountShow(response.data.data.amount_show);
                setAnnounceShow(response.data.data.announce_show);
                setAnnouncement(response.data.data.announcement);
                setCheckInOutData(response.data.data.check_in_out);
                setForgetCardData(response.data.data.forget_card);
                setLeaveRequestData(response.data.data.leave);
                setReqForOvertimeData(response.data.data.request_overtime);
                setRequestForAllowanceData(response.data.data.allowance);
                setContractExpireData(response.data.data.contract_expire);
                setHappyBirthdayData(response.data.data.birthday);
                setBonusNotificationData(response.data.data.bonus);
                setProbationPeriodData(response.data.data.probation);
                setExchangeDateData(response.data.data.exchange_date);
                setPreReqOvertimeData(response.data.data.pre_request_overtime);
            }else if(response.data.status == "NG"){ 
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
            setLoading(false);
        }
    }
    /** End index Function */

    /** Start announcement description down animation chnage Function */
    let annoDescDownChange = (title,name,id)=>{
        let data= announcement.map(data=>{
            if(data.announcement_title == title){data.is_checked = true; return data}return data;
        })
        setAnnouncement(data);
        let  clientHeight = document.getElementById(name).clientHeight;
        $('#'+id).css("height", clientHeight);
    }
    /** End announcement description down animation chnage Function */

    /** Start anncement description up animation chnage Function */
    let annoDescUpChange = (title,name,id)=>{
        let data= announcement.map(data=>{
            if(data.announcement_title == title){data.is_checked = false; return data}return data;
        })
        setAnnouncement(data);
        $('#'+id).css("height", "0px");
    }
    /** End announcement description up animation chnage Function */

    /***Start Announce plus button function */
    let announcePlusBtn = ()=>{
		let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/dashboard/announcement-register`);
    }
    /**End announce plus button function */
    /** Start Employee Type Summary  */
    let values = empTypeData.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="value" style={{'color': item.color, 'width': item.value + '%'}}  key={i}>
                    <span>{item.value}%</span>
                </div>
            )
        }
    }, this);
    let calibrations = empTypeData.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="graduation" style={{'color': item.color, 'width': item.value + '%'}}  key={i}>
                    <span>|</span>
                </div>
            )
        }
    }, this);
    let bars = empTypeData.map(function(item, i) {
        if(item.value > 0) {
            return (
                <div className="bar" style={{'backgroundColor': item.color, 'width': item.value + '%'}}  key={i}>

                </div>
            )
        }
    }, this);

    let legends = empTypeData.map(function(item, i) {
          if(item.value > 0) {
            return (
                <div className="legend" key={i}>
                    <span className="dot" style={{'color': item.color}}>●</span>
                    <span className="label">{item.name}</span>
                </div>
         )
     }
    }, this);
    /** End Employee Type Summary  */

    /** Start request for allowance  */
    let reqForAllUpDownBtnChange = ()=>{
        setRequestForAllowanceUpDown(!requestForAllowanceUpDown);  
    }

    /** Start Check in check out  */
    let inOutUpDownBtnChange = ()=>{
        setCheckInOutUpDown(!checkInOutUpDown); 
    }

    /** End Check in check out  */

    /** Start Forget Card Requset  */
    let forgetCardUpDownBtnChange = ()=>{
        setForgetCardUpDown(!forgetCardUpDown);
        
    }

    /** End Forget Card Request  */

    /** Start leave request  */
    let leaveRequestUpDownBtnChange = ()=>{
        setLeaveRequestUpDown(!leaveRequestUpDown); 
    }

    /** End leave request  */

    /** Start preRequest Overtime  */
    let preReqOvertimeUpDownBtnChange = ()=>{
        setPreReqOvertimeUpDown(!preReqOvertimeUpDown); 
    }

    /** End preRequest Overtime  */

    /** Start Exchange Date  */
    let exchangeDateUpDownBtnChange = ()=>{
        setExchangeDateUpDown(!exchangeDateUpDown);
        
    }
    /** End Exchange Date  */

    /** Start request for overtime  */
    let reqForOvertimeUpDownBtnChange = ()=>{
        setReqForOvertimeUpDown(!reqForOvertimeUpDown);
        
    }
    /** End request for overtime  */
    
    /** Start contract expire  */
    let contractExpireUpDownBtnChange = ()=>{
        setContractExpireUpDown(!contractExpireUpDown);
    }
    /** End contract expire */

    /** Start employee happy birthday for this month  */
    let happyBirthdayUpDownBtnChange = ()=>{
        setHappyBirthdayUpDown(!happyBirthdayUpDown);
    }

    /** End employee happy birthday for this month */

    /** Start Probation Period  */
    let probationPeriodUpDownBtnChange = ()=>{
        setProbationPeriodUpDown(!probationPeriodUpDown);
    }
    /** End Probation Period  */

    /** Start Probation Period  */
    let bonusNotificationUpDownBtnChange = ()=>{
        setBonusNotificationUpDown(!bonusNotificationUpDown);
    }
    /** End Probation Period  */

    /**common confirm alert */
    let comfirmAlert=(id,name)=>{
        setContent(t("Are you sure want to confirm?"));setConfirmType("confirm");setConfirmShow(true);setError([]);setTableName(name);setClickedID(id);
    }

    /**common confirm ok button */
    let confirmOK=async ()=>{
        setConfirmShow(false);setLoading(true);setError([]);setSuccess([]);let params = "";let url="",method="";
        if(tableName == "check-in-out"){
            method="post";
            url = "api/check-in-check-out-detail-information/confirm";  
            params = {
                company_id: companyID,
                login_id: loginID,
                attendance_ids: [clickedID]
            }
        }
        if(tableName == "forget-card-request"){
            method="post";
            url = "api/forgetcard-list/confirm";  
            params = {
                id: clickedID,              
                login_id: loginID,
                company_id: companyID
            }
                
        }
        if(tableName == "leave-request"){
            method="post";
            url = "api/employee-leave-list/confirm";  
            params = {
                leave_attach_id: clickedID,
                login_id: loginID,
                company_id: companyID
            }
        }
        if(tableName == "pre-request-overtime"){
            // url = "api/forgetcard-list/confirm";  
            // params = {
            //     id: clickedID,              
            //     login_id: loginID,
            //     company_id: companyID
            // }
        }
        if(tableName == "request-for-overtime"){
            method="patch";
            url = "api/after-overtime-requests/confirm";  
            params = {
                "login_id": loginID,
                "company_id": companyID,
                "overtime_ids": [clickedID],
                "language": "en"
            }
        }
        if(tableName == "request-for-allowance"){
            method="post";
            url = "api/allowance-request/confirm";  
            params = {
                allowance_request_id: clickedID,
   				login_id: loginID,
   				login_form:"Allowance Request Detail"
            }
        }
        let obj = { method: method, url: url,
        params: params
        }
        let response = await ApiRequest(obj); 
       
        if(response.flag === false){
            setLoading(false);
            setSuccess([]);setError(response.message);setError2([]);setClickedID('');setTableName('');setModalError([]);
            window.scrollTo({top:0, left:0, behavior:'smooth'});
        }else{
            let status = response.data.status;
            if(status == 'OK'){
                setError([]);setSuccess([response.data.message]);index();
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                setLoading(false);
                setSuccess([]);setError(response.data.message);
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }
        } 

    }
    /*** Reject Modal save button function */
    let rejectSaveBtn =async ()=>{
        if(reason == ""){
            setModalError([t(message.JSE005).replace('%s', t('Reason'))]);
        }else{
            setModalShow(false);setLoading(true);setModalError([]);let params = "";let url="";setError([]);let method='';
           
            if(tableName == "check-in-out"){
    
                method = 'post';
                url = "api/check-in-check-out-detail-information/reject";  
                params = {
                    company_id: companyID,
                    login_id: loginID,
                    attendance_ids: [clickedID],
                    denied_reason: reason,
                }
            }
            if(tableName == "forget-card-request"){
                method = 'post';
                url = "api/forgetcard-list/reject";  
                params = {
                    id: clickedID,
                    login_id: loginID,
                    company_id: companyID,
                    denied_reason: reason,
                }
                    
            }
            if(tableName == "leave-request"){
                method = 'post';
                url = "api/employee-leave-list/reject";  
                params = {
                    leave_attach_id: clickedID,
                    login_id: loginID,
                    company_id: companyID,
                    denied_reason: reason,
                }
            }
            if(tableName == "pre-request-overtime"){
                // url = "api/forgetcard-list/confirm";  
                // params = {
                //     id: clickedID,              
                //     login_id: loginID,
                //     company_id: companyID
                // }
            }
            if(tableName == "request-for-overtime"){
                method = 'patch';
                url = "api/after-overtime-requests/reject";  
                params = {
                    'login_id':loginID,
                    "company_id": companyID,
                    "overtime_ids": [clickedID],
                    'reason': reason,
                    "language": "en"
                }
               
      
            }
            if(tableName == "request-for-allowance"){
                method = 'post';
                url = "api/allowance-request/reject";  
                params = {
                    allowance_request_id: clickedID,
                    login_id: loginID,
                    denied_reason: reason,
                    login_form: "Allowance Request Detail"
                }
            }
            let obj = { method: method, url: url,params: params}
            let response = await ApiRequest(obj); 
            setLoading(false);
            if(response.flag === false){
                setSuccess([]);setError(response.message);setError2([]);setClickedID('');setTableName('');setModalError([]);setReason('');
                window.scrollTo({top:0, left:0, behavior:'smooth'});
            }else{
                let status = response.data.status;
                if(status == 'OK'){
                    setError([]);setSuccess([response.data.message]);index();
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }else{
                    setSuccess([]);setError(response.data.message);setReason("");
                    window.scrollTo({top:0, left:0, behavior:'smooth'});
                }
            } 
        }
    }
    
    /**common reject modal show function */
    let rejectBtn=(id,name)=>{
        setError([]);setTableName(name);setClickedID(id);setSuccess([]);setModalError([]);setModalShow(true);
    }

    /** common detail function */
    let detailBtn = (id,name)=>{
        let data = "";let url="";
        if(name == "check-in-out"){           
            data ={employee_attendance_id: id.check_in_out_id,
                from_date: Moment(id.check_date).format('YYYY-MM-DD'),
                to_date: Moment(id.check_date).format('YYYY-MM-DD'),
                employee_id: id.employee_id,
                employee_code: id.employee_code,
                employee_name: id.employee_name,
                approver_status: "",
                flag_data : true
                    
            };
            sessionStorage.setItem('RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS', JSON.stringify(data));
            url = "hr/operation-request-for-attendance/checkin-checkout-detail-information";
        }
        if(name == "forget-card-request"){
            data ={
                id: id.forget_card_id,
                selectedFromDate: Moment(id.forget_card_date).format('YYYY-MM-DD'),
                selectedToDate: Moment(id.forget_card_date).format('YYYY-MM-DD'),
                empId: id.employee_id,
                empCode: id.employee_code,
                empName: id.employee_name
            };
            localStorage.setItem('DETAIL_ID', JSON.stringify(data) );
            url = "hr/operation-request-for-attendance/forget-card-detail-information";
        }
        if(name == "leave-request"){
            data ={
                    leave_attach_id: id.leave_attach_id,
                    selectedFromDate: id.leave_date.slice(0, 10),
                    selectedToDate: id.leave_date.slice(11, 21),
                    empName: id.employee_name, 
                    empCode: id.employee_code,
                    empID: id.employee_id, 
                };
            localStorage.setItem('DETAIL_LEAVE_REQUEST_ID', JSON.stringify(data) );
            url="hr/operation-request-for-attendance/employee-leave-detail-information";
        }
        if(name == "pre-request-overtime"){
            
        }
        if(name == "request-for-overtime"){
            data ={
                'employee_overtime_id': id.request_overtime_id,
                'from_date': id.overtime_date,
                'to_date': id.overtime_date,
                'employee_id': id.employee_id,
                'employee_code': id.employee_code,
                'employee_name': id.employee_name,
                'show_delete_button': false
            };
            localStorage.setItem('AFTER_OT_REQ_DATA', JSON.stringify(data) );
            url="hr/operation-request-for-salary/after-overtime-request-detail-information";
        }
        if(name == "request-for-allowance"){
            data ={
                id: id.allowance_id,
                startDate: id.allowance_date[0],
                endDate: id.allowance_date[id.allowance_date.length-1],
                employeeID: id.employee_id,
                employeeCode: id.employee_code,
                employeeName: id.employee_name
            };
            localStorage.setItem('DETAIL_ID', JSON.stringify(data) );
            url="hr/operation-request-for-attendance/allowance-request-detail-information";
        }
        history.push(`/${customer_name}/${url}`);
    }

    /** common clickHere Button function */
    let clickHereBtn =async (e,name)=>{
        let data = "";let url="";
        if(name == "check-in-out"){
            let date = new Date(e.check_date),
            month1 = '' + (date.getMonth() + 1),
            day1 = '' + date.getDate(),
            year1 = date.getFullYear();
 
            if (month1.length < 2)
                month1 = '0' + month1;
            if (day1.length < 2)
                day1 = '0' + day1;
 
            let select_date = [year1, month1, day1].join('-');
            data ={
                employee_id: e.employee_id, 
                employee_code: e.employee_code,
                employee_name: e.employee_name, 
                from_date: select_date,
                to_date: select_date,
                employee_attendance_id: e.check_in_out_id,
                approver_status: ""
            };
            localStorage.setItem('DETAIL_ID_RETURN', JSON.stringify(data) );
            url = "hr/operation-request-for-attendance/checkin-checkout-list";            
        }
        if(name == "forget-card-request"){
            let date = new Date(e.forget_card_date),
            month1 = '' + (date.getMonth() + 1),
            day1 = '' + date.getDate(),
            year1 = date.getFullYear();
 
            if (month1.length < 2)
                month1 = '0' + month1;
            if (day1.length < 2)
                day1 = '0' + day1;
 
            let select_date = [year1, month1, day1].join('-');
            data ={
                empId: e.employee_id, 
                empCode: e.employee_code,
                empName: e.employee_name, 
                selectedFromDate: select_date,
                selectedToDate: select_date,
                deptState: "",
                approverStatus: ""
            };
            localStorage.setItem('DETAIL_ID_RETURN', JSON.stringify(data) );
            url = "hr/operation-request-for-attendance/forget-card-list";
        }
        if(name == "leave-request"){
            let date = e.leave_date;
            data ={
                empName: e.employee_name, 
                empCode: e.employee_code,
                empID: e.employee_id, 
                selectedFromDate: date.slice(0, 10),
                selectedToDate: date.slice(11, 21),
                leaveTypeState: e.leave_type_id,
                leaveStatusId: "",
                deptState: null,
                leaveAttachId: ""
            };
            localStorage.setItem('LEAVE_DETAIL_FORM', JSON.stringify(data) );
            url="hr/operation-request-for-attendance/employee-leave-list";
        }
//         if(name == "pre-request-overtime"){
            
//         }
            if(name == "request-for-overtime"){
                data ={
                    employee_id: e.employee_id, 
                    employee_code: e.employee_code, 
                    employee_name: e.employee_name, 
                    from_date: e.overtime_date,
                    to_date: e.overtime_date,
                    approver_status: "",
                    show_delete_button: false,
                    current_page: 1
                };
                localStorage.setItem('AFTER_OT_REQ_DATA_RETURN', JSON.stringify(data) );
                url="hr/operation-request-for-salary/after-overtime-request-list";
            }
            if(name == "request-for-allowance"){
                data ={
                    employeeID: e.employee_id, 
                    employeeCode: e.employee_code, 
                    employeeName: e.employee_name, 
                    startDate: e.allowance_date[0],
                    endDate: e.allowance_date[0],
                    allowanceID: "",
                    deptID: "",
                    appStatus: "",
                    page: 1
                };
                localStorage.setItem('DETAIL_ID_RETURN', JSON.stringify(data) );
                url="hr/operation-request-for-attendance/allowance-request-list";
            }
        history.push(`/${customer_name}/${url}`);
    }
    return (
        <>
        <Loading start={loading}/>
        <Message success={success} error={error} error2={error2}/>
        <CRow lg="12" >
            <CCol lg="4"><CLabel className="dashboard-title">{t('Welcome!')}</CLabel></CCol>   
        </CRow>
        <CRow lg="12" >
            <CCol lg="12">
                <CLabel className="dashboard-title">{t('Dear')}&nbsp;</CLabel><CLabel className="dashboard-title" style={{color: "#4e57a9"}}>{empName},</CLabel>&nbsp;<CLabel className="dashboard-title">{t('Good Morning')} </CLabel>
            </CCol>
        </CRow>
        {
        announceShow == true &&
        <CRow className="dashboard-row">
            <div className="dashboard-announcement">
                <CLabel className="m-top-12 dashboard-title" style={{color: "white"}} >{t('Today\'s Announcement')}</CLabel>
            </div>
            <CCard className="modified-card" style={{width: "100%"}}>
                    <CCardHeader>
                        <CLabel>{t('Announcement Create')}</CLabel><CImg width="30px" src={"/avatars/Add Allowance .png"} className="m-left-10" style={{cursor: "pointer"}} onClick={announcePlusBtn} />
                    </CCardHeader>
                <CCardBody>
                    {announcement.length > 0 &&
                        announcement.map((data,index)=>{
                            let name = `des${data.announcement_title}`;
                            let id = `des${data.announcement_id}`;
                            return(
                                <div key={index}>
                                    <CRow lg="12" >
                                        <CCol lg="12" >
                                            <p style={{color: "#b1acac",fontSize: "12px"}}>{t('Posted Date')}&nbsp;:{data.announcement_date}</p>
                                        </CCol>
                                    </CRow>
                                    <CRow lg="12">
                                        <CCol lg="1" className="right">
                                            <CImg src={'/avatars/icon_awesome_star8.png'} width="15px"/>
                                        </CCol>
                                        <CCol lg="11">
                                            <CRow lg="12">
                                                <CCol lg="11"><CLabel className="break-all">{data.announcement_title}</CLabel></CCol>
                                                <CCol lg="1">
                                                    {data.is_checked == false &&
                                                        <CImg  src={'/avatars/down.png'} width="15px" onClick={(e)=>annoDescDownChange(data.announcement_title,name,id)} />
                                                    }
                                                    {data.is_checked == true &&
                                                        <CImg  src={'/avatars/up.png'} width="15px" onClick={(e)=>annoDescUpChange(data.announcement_title,name,id)} />
                                                    }
                                                </CCol>
                                            </CRow>
                                            
                                        </CCol>
                                    </CRow>
                                    <div id={id} className="animation_down" >
                                        <CRow lg="12">
                                            <CCol lg="1"></CCol>
                                            <CCol lg="11">
                                                <div id={name} className="announcement-description">{data.announcement_description}</div>

                                            </CCol>
                                        </CRow>
                                    </div><br/>
                                </div>
                            )
                        })
                    }
                </CCardBody>
            </CCard>   
        </CRow>
        }
        {graphShow == true &&
            <>
            <CRow lg="12" >
                <CCol lg="6">
                    <CRow className="dashboard-row">
                        <CCard style={{width: "100%"}}>
                            <CCardBody>
                                <CRow>
                                    <CLabel className="dashboard-title m-left-10">{t('Daily Attendance Summary')}</CLabel>
                                </CRow>
                                <CRow>
                                <CChartDoughnut
                                    type="doughnut"
                                    datasets={attendanceData}
                                    labels={attendanceLabel}
                                    options={{
                                        legend: {
                                        position: "right",
                                        labels: {
                                            boxWidth: 15,
                                            boxHeight: 2,
                                        },
                                        },
                                    }}
                                />
                                </CRow>
                                
                            </CCardBody>
                        </CCard>
                    </CRow>
                </CCol>
                <CCol lg="6">
                    <CRow className="dashboard-row">
                        <CCard style={{width: "100%"}}>
                            <CCardBody>
                                <CRow>
                                    <CLabel className="dashboard-title m-left-10">{t('Daily Late Early Summary')}</CLabel>
                                </CRow>
                                <CRow>
                                <CChartDoughnut
                                    type="doughnut"
                                    datasets={lateEarlyData}
                                    labels={lateEarlyLabel}
                                    options={{
                                        legend: {
                                        position: "right",
                                        labels: {
                                            boxWidth: 15,
                                            boxHeight: 2,
                                        },
                                        },
                                    }}
                                />
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CRow>
                </CCol>
                </CRow>
                <CRow className="dashboard-row">
                <CCard style={{width: "100%"}}>
                    <CCardBody>
                        <CRow>
                            <CLabel className="dashboard-title m-left-10">{t('Employee Type Summary')}</CLabel>
                        </CRow>
                        <CRow>
                        <div className="multicolor-bar">
                            <div className="values">
                                {values == ''?'':values}
                            </div>
                            <div className="scale">
                                {calibrations == ''?'':calibrations}
                            </div>
                            <div className="bars">
                                {bars == ''?'':bars}
                            </div>
                            <div className="legends">
                                {legends == ''?'':legends}
                            </div>
                        </div>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CRow>
            </>
        }<br/>
      
        <CheckInOutRequest data={checkInOutData} upDown={checkInOutUpDown} upDownBtn={inOutUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <ForgetCardRequest data={forgetCardData} upDown={forgetCardUpDown} upDownBtn={forgetCardUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <LeaveRequest data={leaveRequestData} upDown={leaveRequestUpDown} upDownBtn={leaveRequestUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <PrerequestForOvertime data={preReqOvertimeData} upDown={preReqOvertimeUpDown} upDownBtn={preReqOvertimeUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <RequestForOvertime data={reqForOvertimeData} upDown={reqForOvertimeUpDown} upDownBtn={reqForOvertimeUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <RequestForAllowance data={requestForAllowanceData} upDown={requestForAllowanceUpDown} upDownBtn={reqForAllUpDownBtnChange} confirmBtn={comfirmAlert} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <ExchangeDateRequest data={exchangeDateData} upDown={exchangeDateUpDown} upDownBtn={exchangeDateUpDownBtnChange} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <ContractExpire data={contractExpireData} upDown={contractExpireUpDown} upDownBtn={contractExpireUpDownBtnChange} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <HappyBirthday data={happyBirthdayData} upDown={happyBirthdayUpDown} upDownBtn={happyBirthdayUpDownBtnChange} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <CheckProbationPeriod data={probationPeriodData} upDown={probationPeriodUpDown} upDownBtn={probationPeriodUpDownBtnChange} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <BonusNotification data={bonusNotificationData} upDown={bonusNotificationUpDown} upDownBtn={bonusNotificationUpDownBtnChange} rejectBtn={rejectBtn} detailBtn={detailBtn} clickHereBtn={clickHereBtn} />                 
        <Confirmation show={confirmShow} content={content} type={confirmType} confirmOK={confirmOK}  okButton={t("Ok")} cancel={()=>setConfirmShow(false)}   cancelButton={t('Cancel')} />                  
        <RejectModal  modalShow={modalShow} modalError={modalError} reason={reason} textAreaChange={(e)=>setReason(e.target.value)} rejectSaveBtn={rejectSaveBtn} rejectCloseBtn={()=>setModalShow(false)}  />
        </>
    );
                                
}

export default withTranslation()(LegacyWelcomeClass)




