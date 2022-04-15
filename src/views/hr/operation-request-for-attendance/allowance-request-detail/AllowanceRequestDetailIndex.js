import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import message from '../../hr-common/common-message/CommonMessage';
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { useHistory } from "react-router-dom";
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
	const [loginID, setLoginID] 					= useState(localStorage.getItem('LOGIN_ID'));
	const [companyID, setCompanyId]                 = useState(localStorage.getItem('COMPANY_ID'));

	const [employeeName, setEmployeeName] = useState('');
	const [employeeCode, setEmployeeCode] = useState('');
	const [employeeID, setEmployeeID] = useState('');
	const [dept, setDept] 	= useState([]);
	const [pos, setPos] 	= useState([]);
	const [fromDate, setFromDate] = useState('');
	const [toDate, setToDate] = useState('');
	const [days, setDays] = useState('');
	const [payAllowance, setPayAllowance] = useState(null);
	const [amount, setAmount] = useState('');
	const [description, setDescription] = useState('');
	const [attendance, setAttendance] = useState(null);
	const [sessionData, setSessionData] = useState(null);
	const [approverData, setApproverData] = useState([])
	const [reason, setReason] = useState('');
	const [rejectError, setRejectError] = useState([]);
	const [fileData, setFileData] = useState([])
	const [confirmRejBtn, setConfirmRejBtn] = useState(null);

	// let customer_name = window.location.href.split("/")[3];
	let customer_name = ApiPath.customerName;


	/**
    * page load
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	useEffect( () => {
		fetchingData();
	}, [] )

	/**
	* If error or succes is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  24/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success]);

	/**
    * get id from session and call api
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const fetchingData = async () => {
		let data = JSON.parse(localStorage.getItem('DETAIL_ID'));
		localStorage.removeItem('DETAIL_ID');
		setSessionData(data);
		if(data !== null){
			setLoading(true);
			let obj = { method: 'get', url: `api/allowance-request/detail/${data.id}`, params: { login_id: loginID, company_id: companyID } }
	        let response = await ApiRequest(obj);
			setLoading(false);
	        if(response.flag === false){
	            setError(response.message);
	        }else{
	            setEmployeeID(response.data.allowance_req_detail.emp_id);
				setEmployeeCode(response.data.allowance_req_detail.emp_code);
				setEmployeeName(response.data.allowance_req_detail.emp_name);
				setDept(response.data.allowance_req_detail.department);
				setPos(response.data.allowance_req_detail.position);
				setFromDate(response.data.allowance_req_detail.from_date);
				setToDate(response.data.allowance_req_detail.to_date);
				setDays(response.data.allowance_req_detail.days);
				if(response.data.allowance_req_detail.allowance_payment == 1){ setPayAllowance(true);}
				else{setPayAllowance(false);}
				setAmount(response.data.allowance_req_detail.amount);
				setDescription(response.data.allowance_req_detail.description);
				setAttendance(response.data.allowance_req_detail.attendance);
				setApproverData(response.data.allowance_req_detail.approver_data);
				setFileData(response.data.allowance_req_detail.attach_file_data);
				setConfirmRejBtn(response.data.confirm_reject_btn);
	        }
		}else{
			history.push(`/${customer_name}/hr/operation-request-for-attendance/allowance-request-list`);
		}
	}
/** On load Function */
let ReloadData= async (data) => {
		if(data !== null){
			setLoading(true);
			let obj = { method: 'get', url: `api/allowance-request/detail/${data}`, params: { login_id: loginID, company_id: companyID } }
	        let response = await ApiRequest(obj);
			setLoading(false);
	        if(response.flag === false){
	            setError(response.message);
	        }else{
	            setEmployeeID(response.data.allowance_req_detail.emp_id);
				setEmployeeCode(response.data.allowance_req_detail.emp_code);
				setEmployeeName(response.data.allowance_req_detail.emp_name);
				setDept(response.data.allowance_req_detail.department);
				setPos(response.data.allowance_req_detail.position);
				setFromDate(response.data.allowance_req_detail.from_date);
				setToDate(response.data.allowance_req_detail.to_date);
				setDays(response.data.allowance_req_detail.days);
				if(response.data.allowance_req_detail.allowance_payment == 1){ setPayAllowance(true);}
				else{setPayAllowance(false);}
				setAmount(response.data.allowance_req_detail.amount);
				setDescription(response.data.allowance_req_detail.description);
				setAttendance(response.data.allowance_req_detail.attendance);
				setApproverData(response.data.allowance_req_detail.approver_data);
				setFileData(response.data.allowance_req_detail.attach_file_data);
				setConfirmRejBtn(response.data.confirm_reject_btn);
	        }
		}else{
			history.push(`/${customer_name}/hr/operation-request-for-attendance/allowance-request-list`);
		}
	}
	/**
    * click confirm button
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const confirm = () => {
		setType('confirm'); setContent(t('Are you sure want to confirm?')); setShow(!show); setError([]); setSuccess([]);
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
			url: `api/allowance-request/confirm`,
			params: {
				allowance_request_id:sessionData.id,
   				login_id:loginID,
   				login_form:"Allowance Request Detail"
			}
		}
		let response = await ApiRequest(obj);
		setLoading(false);
		if(response.flag === false){
			setError(response.message);
		}else{
			setSuccess([response.data.message]);
		}
		ReloadData(sessionData.id);
	}

	/**
    * click reject button
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const reject = () => {
		setReason(''); setOpen(!open); setRejectError([]);
	}

	/**
    * confirm for reject
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const rejectOK = async () => {
		setError([]); setSuccess([]);
		if(!checkNullOrBlank(reason)){
			setRejectError([t(message.JSE005).replace('%s',t('Reason'))]);
		}else{
			setOpen(!open); setLoading(true);
			let obj = {
				method: 'post',
				url: `api/allowance-request/reject`,
				params: {
					allowance_request_id:sessionData.id,
	   				login_id:loginID,
					denied_reason: reason,
	   				login_form:"Allowance Request Detail"
				}
			}
			let response = await ApiRequest(obj);
			setLoading(false);
			if(response.flag === false){
				setError(response.message);
			}else{
				setSuccess([response.data.message]);
			}
		}
		ReloadData(sessionData.id);
	}

	/**
    * download
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const download = async (i) => {
		setLoading(true); setError([]); setSuccess([]);
		let { allowance_req_upload_id, attach_file_name } = i;
		let obj = {
			method: 'get',
			url: 'api/allowance-request/detail/{sessionData.id}/download-attach-file',
			params: { allowance_req_upload_id, attach_file_name, login_id: loginID },
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
    * go back to allowance request list page
    *
    * @author  Nay Zaw Linn
    * @create  12/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const previous = () => {
		localStorage.setItem('DETAIL_ID_RETURN', JSON.stringify(sessionData) );
		history.push(`/${customer_name}/hr/operation-request-for-attendance/allowance-request-list`);
	}


	return(<>
		<Message success={success} error={error} error2={[]} />
		<Loading start={loading} />
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
		/>
		<FormData
			previous={previous}
			empID={employeeID} empName={employeeName} empCode={employeeCode} dept={dept} pos={pos}
			fromDate={fromDate} toDate={toDate} days={days} payAllowance={payAllowance} amount={amount} desc={description} attendance={attendance}
			approverData={approverData}
			fileData={fileData} download={download}
			confirm={confirm} reject={reject} flag={confirmRejBtn}
		/>
	</>)
}

export default withTranslation()(LegacyWelcomeClass)
