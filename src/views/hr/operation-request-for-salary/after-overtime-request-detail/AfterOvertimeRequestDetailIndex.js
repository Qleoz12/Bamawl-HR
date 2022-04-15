/* eslint-disable no-use-before-define */
import React ,{ useState, useEffect, useCallback} from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLabel,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import message from '../../hr-common/common-message/CommonMessage';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import AfterOvertimeRequestDetailForm from './AfterOvertimeRequestDetailForm';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { isEmpty, checkNullOrBlank, formatDate } from '../../hr-common/common-validation/CommonValidation'; // Common message
import { useHistory } from "react-router-dom";

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
	const history = useHistory();
  const [error,setError]                        = useState([]); // For Error Message
  const [success,setSuccess]                    = useState([]); // For Success Message
  const [loading, setLoading]                   = useState(false); // For Loading
	const [content, setContent] 									= useState('');
  const [type, setType] 												= useState('');
	const [show, setShow] 												= useState(false);
	const [open, setOpen] 												= useState(false);
  const [approverData, setApproverData] 				= useState([]);
  const [overtimeData, setOvertimeData] 				= useState([]);
  const [employeeName, setEmployeeName] 				= useState();
	const [employeeCode, setEmployeeCode] 				= useState();
	const [employeeID, setEmployeeID] 						= useState();
	const [deptName, setDeptName] 								= useState();
	const [posName, setPosName] 									= useState();
  const [reason, setReason] 										= useState('');
	const [rejectError, setRejectError] 					= useState([]);
  const [confirmRejectShow, setConfirmRejectShow] = useState(false);
  const [sessionData, setSessionData]             = useState(null);
  const [companyId, setCompanyId]                 = useState(localStorage.getItem('COMPANY_ID'));
  const [loginId, setLoginId]                     = useState(localStorage.getItem('LOGIN_ID'));

	let customer_name                               = window.location.href.split("/")[3];
  let carry_data = [];
  
  /** Start Form Load */
  useEffect(() => { 
    carry_data = JSON.parse(localStorage.getItem('AFTER_OT_REQ_DATA'));
    localStorage.removeItem('AFTER_OT_REQ_DATA');
    setSessionData(carry_data);
    formLoad(carry_data); },[]);
  /** End Form Load */

  const scrollTop             = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }

  const formLoad = async(sessionData) => {
    setLoading(true);
    if(sessionData !== null){
      let obj = { method: 'post', url: 'api/overtime-request-detail'
      , params: {
          'id':sessionData.employee_overtime_id,
          'company_id': companyId,
          'login_id': loginId,
        } 
      }
      let response = await ApiRequest(obj); 
      if(response.flag === false){
        setError(response.message);
      }else{
        let status = response.data.status;
        if(status == 'OK'){
          setEmployeeCode(response.data.data.employee_data.employee_code);
          setEmployeeID(response.data.data.employee_data.employee_id);
          setEmployeeName(response.data.data.employee_data.employee_name);
          setDeptName(response.data.data.employee_data.department[0].department_name);
          setPosName(response.data.data.employee_data.position[0].position_name);
          setOvertimeData(response.data.data.after_OT_request_data[0]);
          setApproverData(response.data.data.approver_data);
          setConfirmRejectShow(response.data.data.confirm_reject_btn);
        }else{
          setError(response.data.message);
        }
      }
    }else{
      history.push(`/${customer_name}/hr/operation-request-for-salary/after-overtime-request-list`);
    }
    setLoading(false);
  }

  /**
	* click confirm button
	* @author  
	* @param
	* @return
	*/
	const confirm = () => { setType('save'); setContent(t('Are you sure want to confirm?')); setShow(!show); }
	/**
	* click reject button
	* @author  
	* @param
	* @return
	*/
  const reject = () => { setReason(''); setOpen(!open); setRejectError([]); }
  let confirmOK = async() => {
    setError([]);setSuccess([]);
    setType(''); setContent(''); setShow(!show); setLoading(true);
    let obj = {
      method: 'patch',
      url: `api/after-overtime-requests/confirm`,
      params: {
        "login_id": loginId,
        "company_id": companyId,
        "overtime_ids": [sessionData.employee_overtime_id],
        "language": "en"
      }
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if(response.flag === false){
        setError(response.message);
    }else{
      setSuccess([response.data.message]);
    }
    formLoad(sessionData);scrollTop();
    setLoading(false);
  }
 let rejectOK = async () => {
  setLoading(true);
  setError([]); setSuccess([]);
  if(!checkNullOrBlank(reason)){
    setRejectError([t(message.JSE005).replace('%s',t('Reason'))]);
  }else{
    setOpen(!open); 
    let obj = {
      method: 'patch',
      url: `api/after-overtime-requests/reject`,
      params: {
        'login_id':loginId,
        "company_id": companyId,
        "overtime_ids": [sessionData.employee_overtime_id],
        'reason': reason,
        "language": "en"
      }
    }
    let response = await ApiRequest(obj);
    if(response.flag === false){
      setError(response.message);
  }else{
      setSuccess([response.data.message]);
    }
    formLoad(sessionData);scrollTop();
    setLoading(false);
  }
  setLoading(false);
}

	// const save = () => {
	// 	setRejectError(['Please fill reason']);
  // }

  /**
    * go back to after overtime request list page
    *
    * @author Aye Thiri Mon
    * @create  27/07/2021 (D/M/Y)
    * @param
    * @return
    */
	const previous = () => {
		localStorage.setItem('AFTER_OT_REQ_DATA_RETURN', JSON.stringify(sessionData) );
		history.push(`/${customer_name}/hr/operation-request-for-salary/after-overtime-request-list`);
  }
  
  return (
    <CRow>
    <CCol xs="12">
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
      <AfterOvertimeRequestDetailForm confirmRejectShow={confirmRejectShow} overtimeData={overtimeData} approverData={approverData} 
      empName={employeeName} empCode={employeeCode} empID={employeeID} depName={deptName} posName={posName} 
      confirm={confirm} reject={reject} previous={previous} />
    </CCol>
  </CRow>
  );
  }
export default withTranslation()(LegacyWelcomeClass);