import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import message from '../../hr-common/common-message/CommonMessage';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import Download from '../../hr-common/method/Download';


function LegacyWelcomeClass ({t, i18n}) {
	const history = useHistory();
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState('');
	const [type, setType] = useState('');
	const [show, setShow] = useState(false);
	const [open, setOpen] = useState(false);
	// const [login_id, setLoginID] = useState(20001);
	// const [company_id, setCompanyID] = useState(1);
	const [login_id, setLoginID] 					= useState(localStorage.getItem('LOGIN_ID'));
	const [company_id, setCompanyID]                = useState(localStorage.getItem('COMPANY_ID'));

	const [employeeName, setEmployeeName] = useState('');
	const [employeeCode, setEmployeeCode] = useState('');
	const [employeeID, setEmployeeID] = useState();
	const [deptName, setDeptName] = useState([]);
	const [posName, setPosName] = useState([]);
	const [leaveType, setLeaveType] = useState('');
	const [leaveDay, setLeaveDay] = useState('');
	const [totalDay, setTotalDay] = useState('');
	const [leaveReason, setLeaveReason] = useState('');
	const [sessionData, setSessionData] = useState({});

	const [leaveData, setLeaveData] = useState([])
	const [approverData, setApproverData] = useState([])
	const [attachFile, setAttachFile] = useState([])
	const [reason, setReason] = useState('');
	const [rejectError, setRejectError] = useState([]);
	const [confirmRejBtn, setConfirmRejBtn] = useState(false);


	let customer_name = window.location.href.split("/")[3];



	/**
	* page load
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		let data = JSON.parse(localStorage.getItem('DETAIL_LEAVE_REQUEST_ID'));
		localStorage.removeItem('DETAIL_LEAVE_REQUEST_ID');
		setSessionData(data);
		fetchingData(data);
	},[]);

	/**
	* click confirm button
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const fetchingData = async(data) => {
		if(data !== null){
			setLoading(true);
			let obj = { method: 'get', url: `api/leave-detail`, params: { leave_attach_id: data.leave_attach_id, login_id, company_id } }
			let response = await ApiRequest(obj);
			setLoading(false);
	        if(response.flag === false){
	            setError(response.message);
	        }else{
				setEmployeeID(response.data.data.employee_data.employee_id);
				setEmployeeCode(response.data.data.employee_data.employee_code);
				setEmployeeName(response.data.data.employee_data.employee_name);
				setDeptName(response.data.data.employee_data.department);
				setPosName(response.data.data.employee_data.position);
				setApproverData(response.data.data.leave_approver_data);
				setConfirmRejBtn(response.data.data.confirm_reject_button);
				setAttachFile(response.data.data.attach_file_data)
				let leave_temp_data = response.data.data.leave_data;
				
				setLeaveData(leave_temp_data);
				setLeaveType(leave_temp_data[0].leave_type);
				setLeaveDay(leave_temp_data[0].remain_leave_day);
				setTotalDay(response.data.data.total_day);
				setLeaveReason(leave_temp_data[0].reason);

	        }
		}else{
			history.push(`/${customer_name}/hr/operation-request-for-attendance/employee-leave-list`);
		}
	}

	/**
	* If error state or succes state is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success]);

	/**
	* click confirm button
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const confirm = () => {
		setError([]); setSuccess([]); setType('save'); setContent(t('Are you sure want to confirm?')); setShow(!show);
	}

	/**
    * confirm for clicking confirm button
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const confirmOK = async () => {
		setType(''); setContent(''); setShow(!show); setLoading(true);
		let obj = {
			method: 'post',
			url: `api/employee-leave-list/confirm`,
			params: {
				leave_attach_id:sessionData.leave_attach_id,
				login_id, company_id
			}
		}
		let response = await ApiRequest(obj);
		setLoading(false);
		if(response.flag === false){
			if(response.flag === false && response.data.data.status === 'NG'){
	          	setError(response.data.data.message);
	        }else{
	          	setError(response.message);
	      	}
		}else{
			setSuccess([response.data.message]);
		}
		fetchingData(sessionData);
	}

	/**
	* click reject button
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const reject = () => {
		setError([]); setSuccess([]); setReason(''); setOpen(!open); setRejectError([]);
	}

	/**
	* confirm for reject
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const rejectOK = async () => {
		if(!checkNullOrBlank(reason)){
			setRejectError([t(message.JSE005).replace('%s',t('Reason'))]);
		}else{
			setOpen(!open); setLoading(true);
			let obj = {
				method: 'post',
				url: `api/employee-leave-list/reject`,
				params: {
					leave_attach_id:sessionData.leave_attach_id,
	   				login_id, company_id,
					denied_reason: reason,
				}
			}
			let response = await ApiRequest(obj);
			setLoading(false);
			if(response.flag === false){
				if(response.flag === false && response.data.data.status === 'NG'){
		          	setError(response.data.data.message);
		        }else{
		          	setError(response.message);
		      	}
			}else{
				setSuccess([response.data.message]);
			}
		}
		fetchingData(sessionData);
	}

	/**
	* download
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const download = async (data) => {
		setLoading(true); setError([]); setSuccess([]);
		let { leave_req_upload_id, attach_file_name } = data;
		let obj = {
			method: 'get',
			url: 'api/download-file',
			params: { leave_req_upload_id, attach_file_name, login_id },
			type: 'blob'
		}
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError(response.message);
        }else{
			Download(response);
        }
		setLoading(false);
	}

	/**
	* back to employee leave list page
	*
	* @author  Nay Zaw Linn
	* @create  10/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const back = () => {
		localStorage.setItem('LEAVE_DETAIL_FORM', JSON.stringify(sessionData) );
		let customer_name = window.location.href.split("/")[3];
		history.push(`/${customer_name}/hr/operation-request-for-attendance/employee-leave-list`);
	}


	return(<>
		<Loading start={loading} />
		<Message success={success} error={error} error2={[]} />
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
			saveOK={confirmOK}
		/>
		<FormData
			empID={employeeID} empName={employeeName} empCode={employeeCode} depName={deptName} posName={posName}
			leaveDay={leaveDay} leaveType={leaveType} totalDay={totalDay} leaveReason={leaveReason} attachFile={attachFile} download={download}
			leaveData={leaveData} approverData={approverData}
			confirm={confirm} reject={reject} confirmRejBtn={confirmRejBtn} back={back}
		/>
	</>)
}

export default withTranslation()(LegacyWelcomeClass)
