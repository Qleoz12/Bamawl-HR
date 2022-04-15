/**
* Forget Card Detail
*
* @author  Nay Zaw Linn
* @create  10/05/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useEffect } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { useHistory } from "react-router-dom";
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import Moment from 'moment';
import message from '../../hr-common/common-message/CommonMessage';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import ApiPath from '../../../brycen-common/api-path/ApiPath';

function LegacyWelcomeClass ({t, i18n}) {
	const history = useHistory();
	const [error, setError] = useState([]);
	const [success, setSuccess] = useState([]);
	const [loading, setLoading] = useState(false);
	const [content, setContent] = useState('');
	const [type, setType] = useState('');
	const [show, setShow] = useState(false);
	const [open, setOpen] = useState(false);
	const [empName, setEmployeeName] = useState('');
	const [empCode, setEmployeeCode] = useState('');
	const [empID, setEmployeeID] = useState('');
	const [deptName, setDeptName] = useState('');
	const [posName, setPosName] = useState('');
	const [attendanceDate, setAttenDate] = useState('');
	const [attendanceTime, setAttenTime] = useState('');
	const [attendanceStatus, setAttenStatus] = useState('');
	const [attendanceDescription, setAttenDesc] = useState('');
	const [approverData, setApproverData] = useState([])
	const [reason, setReason] = useState('');
	const [rejectError, setRejectError] = useState([]);
	const [confirmRejBtn, setConfirmRejBtn] = useState(true);
	const [sessionData, setSessionData] = useState(null);
	const [loginID, setLoginID] 					= useState(localStorage.getItem('LOGIN_ID'));
	const [companyID, setCompanyId]                 = useState(localStorage.getItem('COMPANY_ID'));

	// let customer_name = window.location.href.split("/")[3];
	let customer_name = ApiPath.customerName;

	/**
	* page load
	*
	* @author  Nay Zaw Linn
	* @create  05/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect( () => {
		let data = JSON.parse(localStorage.getItem('DETAIL_ID'));
		localStorage.removeItem('DETAIL_ID');
		setSessionData(data);
		fetchingData(data);
	}, [] )

	/**
	* If error or succes is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  05/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success]);

	/**
	* get id from session and call API
	*
	* @author  Nay Zaw Linn
	* @create  05/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	const fetchingData = async(data) => {
		if(data !== null){
			setLoading(true);
			let obj = { method: 'get', url: `api/forget-card-detail`, params: { id:data.id, login_id: loginID, company_id: companyID } }
			let response = await ApiRequest(obj);
			setLoading(false);
	        if(response.flag === false){
	            setError(response.message);
	        }else{
				setEmployeeID(response.data.forget_card_detail_data.employee_id);
				setEmployeeCode(response.data.forget_card_detail_data.code);
				setEmployeeName(response.data.forget_card_detail_data.employee_name);
				setDeptName(response.data.forget_card_detail_data.emp_dep_position.department_name);
				setPosName(response.data.forget_card_detail_data.emp_dep_position.position_name);
				setAttenDate(response.data.forget_card_detail_data.attendance_date);
				setAttenTime(response.data.forget_card_detail_data.attendance_time);
				setAttenStatus(response.data.forget_card_detail_data.status);
				setAttenDesc(response.data.forget_card_detail_data.description);
				setApproverData(response.data.forget_card_detail_data.approver_data);
				setConfirmRejBtn(response.data.forget_card_detail_data.confirm_reject_btn);
	        }
		}else{
			history.push(`/${customer_name}/hr/operation-request-for-attendance/forget-card-list`);
		}
	}

	/**
    * click confirm button
    *
    * @author  Nay Zaw Linn
    * @create  05/05/2021 (D/M/Y)
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
    * @create  05/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const confirmOK = async () => {
		setType(''); setContent(''); setShow(!show); setLoading(true);
		let obj = {
			method: 'post',
			url: `api/forgetcard-list/confirm`,
			params: {
				id: sessionData.id,
   				login_id: loginID,
				company_id: companyID
			}
		}
		let response = await ApiRequest(obj);
		setLoading(false);
		fetchingData(sessionData);		
		if(response.flag === false){
			setError(response.message);
		}else{
			setSuccess([response.data.message]);
		}
	}

	/**
    * click reject button
    *
    * @author  Nay Zaw Linn
    * @create  05/05/2021 (D/M/Y)
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
    * @create  05/05/2021 (D/M/Y)
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
				url: `api/forgetcard-list/reject`,
				params: {
					id: sessionData.id,
	   				login_id: loginID,
					company_id: companyID,
					denied_reason: reason,
				}
			}
		let response = await ApiRequest(obj);
			setLoading(false);
			fetchingData(sessionData);		
			if(response.flag === false){
				setError(response.message);
			}else{
				setSuccess([response.data.message]);
			}
		}
	}

	/**
    * go back to forget card request list page
    *
    * @author  Nay Zaw Linn
    * @create  05/05/2021 (D/M/Y)
    * @param
    * @return
    */
	const previous = () => {
		localStorage.setItem('DETAIL_ID_RETURN', JSON.stringify(sessionData) );
		history.push(`/${customer_name}/hr/operation-request-for-attendance/forget-card-list`);
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
			confirmOK={confirmOK}
		/>
		<FormData
			previous={previous}
			empID={empID} empName={empName} empCode={empCode} depName={deptName} posName={posName}
			attenDate={attendanceDate} attenTime={attendanceTime} attenStatus={attendanceStatus} attenDesc={attendanceDescription}
			approverData={approverData}
			confirm={confirm} reject={reject} flag={confirmRejBtn}
		/>
	</>)
}

export default withTranslation()(LegacyWelcomeClass)
