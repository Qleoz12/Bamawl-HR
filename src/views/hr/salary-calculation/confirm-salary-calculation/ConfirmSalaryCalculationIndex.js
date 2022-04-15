/**
* Confirm Salary Calculation
*
* @author  Nay Zaw Linn
* @create  07/07/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import message from '../../hr-common/common-message/CommonMessage';
import { checkNullOrBlank, isEmpty, validateNumberOnly } from '../../hr-common/common-validation/CommonValidation';
import RejectModal from '../../hr-common/reject-modal/RejectModal';
import { CModal, CModalHeader, CModalBody, CCol, CRow, CButton } from '@coreui/react';
import EmployeeListModal from './EmployeeListModal';
import Moment from 'moment';
import { useHistory } from "react-router-dom";



function LegacyWelcomeClass ({t, i18n}) {
    const history = useHistory();
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(false);

    const [payMonth, setPayMonth] = useState(Moment(ChangeDate(new Date())).format('YYYY-MM'));
    const [payType, setPayType] = useState("1");
    const [deptArr, setDeptArr] = useState([]);
    const [deptID, setDeptID] = useState('');
    const [deptName, setDeptName] = useState('');
    const [tableData, setTableData] = useState([]);
    const [checkboxColumn, setCheckboxColumn] = useState(false);
    const [checkApplicantApprover, setCheckApplicantApprover] = useState('');
    const [allChecked, setAllChecked] = useState(false);
    const [totalConfirmMMK, setTotalConfirmMMK] = useState(200000);
    const [totalConfirmUSD, setTotalConfirmUSD] = useState(150);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [deleteData, setDeleteData] = useState({});

    const [open, setOpen] = useState(false);
    const [denied_reason, setReason] = useState('');
	const [rejectError, setRejectError] = useState([]);

    const [showDepModal, setShowDepModal] = useState(false);
    const [depNameInModal, setDepNameInModal] = useState('');
    const [depList, setDepList] = useState([
        // {
        //     id: 1,
        //     employee_id: 20001,
        //     employee_code: 'EMP20001',
        //     employee_name: 'UF',
        //     email: 'hr@brycenmyanmar.com.mm'
        // }
    ]);

    const [totalConfirmAmountShow, setTotalConfirmAmountShow] = useState(false);
    const [totalConfirmArray, setTotalConfirmArray] = useState([]);
    const [currency, setCurrency] = useState([]);
    const [totalColumn, setTotalColumn] = useState(0);
    const [ login_id, setLoginID ]                      = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ company_id, setCompanyID ]                  = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP
    const [ position_rank, setPositionRank]             = useState( JSON.parse(localStorage.getItem('POSITION_RANK'))); // for session position rank

    const [searchData, setSearchData]                   = useState({});
    const [approverStatusShow, setApproverStatusShow]   = useState(false);
    const [approveFlag, setApproveFlag]                 = useState('');
    const [approveStatusID, setApproveStatusID]         = useState('');
    const [noData, setNoData]                           = useState([]);   // For show There is no data!
    
    /**
    * page load
    *
    * @author  Nay Zaw Linn
    * @create  12/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect( () => {
        getDepartment();
    }, [])

    /**
	* If error or succes is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  05-05-2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success]);

    /**
    * get department data from API
    *
    * @author  Nay Zaw Linn
    * @create  12/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const getDepartment = async () => {
        let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDeptArr([]) : setDeptArr(response.data.data);
    }

    /**
    * search button
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const click_search = () => {
        setError([]); setSuccess([]); search_api();
    }

    /**
    * search api
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @modified  27/08/2021 (D/M/Y)
    * @param
    * @return
    */
    const search_api = async () => {
        let err = [];
        if(approverStatusShow && isEmpty(approveStatusID)){
           err.push(t(message.JSE019).replace('%s',t(' approve status')));
        }
        if(isEmpty(err)){
            setLoading(true); 
            setAllChecked(false);
            setSearchData({ payment_month: payMonth, payment_type: payType, department_id: deptID, department_name: deptName})
            let obj = { method: 'post', url: 'api/confirm-salary-calculation/search', params: {
                company_id, login_id, position_rank,
                department_name: deptName,
                department_id: deptID,
                department: deptArr,
                payment_type: payType,
                payment_month: payMonth,
                approve_flag: approveStatusID
            }}
            let response = await ApiRequest(obj); setLoading(false);
            if(response.flag === false){
                setError([]); setTableData([]);setNoData(response.message);
                setTotalConfirmAmountShow(false);
            }else{
                setNoData([]);
                setTableData(response.data.data.salary_data);
                setCurrency(response.data.data.currency);
                setTotalConfirmArray(response.data.data.confirm_amount_data);
                setTotalConfirmAmountShow(response.data.data.confirm_amount_show);
                setTotalColumn(response.data.data.total_currency_count);
                setCheckboxColumn(response.data.data.checkbox_column);
                setCheckApplicantApprover(response.data.data.check_applicant_approver);
            }
        }else{
            setError(err);setSuccess([]);setNoData('');
        }
        
    }

    /**
    * change checkbox in table
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeCheckbox = (i) => {
        let value = i.target.value, checked = i.target.checked, data = [], temp = [];

        if(value === "allcheck"){
            data = tableData.map(item =>
                item.checkbox_row === true ? { ...item, is_checked: checked } : item
            );
            setAllChecked(checked);
        }else{
            data = tableData.map(item =>
                parseInt(item.id) === parseInt(value) ? { ...item, is_checked: checked } : item
            );
            data.forEach((item, i) => {
                if(item.checkbox_row === true){
                    temp.push(item);
                }
            });
            setAllChecked(temp.every(item => item.is_checked));
        }
        setTableData(data);
    }

    /**
    * clickt delete in table
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const click_delete = (i) => {
        setSuccess([]); setError([]); setDeleteData(i);
        setContent(t('Are you sure want to delete?')); setType('delete'); setShow(!show);
    }

    /**
    * confirm delete
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const deleteOK = async () => {
        setContent(''); setType(''); setShow(!show); setLoading(true);

        let obj = { method: 'delete', url: 'api/confirm-salary-calculation/delete', params: {
            login_id, company_id, position_rank, payment_type: searchData.payment_type, salary_data: deleteData
        }}

        let response = await ApiRequest(obj); setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            setSuccess([response.data.message]);
        }
        search_api();
    }

    /**
    * click confirm button
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const click_confirm = () => {
        setSuccess([]); setError([]); let temp = [];

        tableData.forEach((item, i) => {
            if(item.is_checked === true){
                temp.push(item);
            }
        });

        if(temp.length === 0){
            let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to confirm'));
            setError([errMsg]);
        }else{
            setContent(t('Are you sure want to confirm?')); setType('confirm'); setShow(!show);
        }
    }

    /**
    * confirm for confirm button
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const confirmOK = async () => {
        setContent(''); setType(''); setShow(!show); setLoading(true);

        let temp = [];
        tableData.forEach((item, i) => {
            if(item.is_checked === true){
                temp.push(item);
            }
        });

        let obj = {
            method: 'patch', url: 'api/confirm-salary-calculation/confirm', params: {
            company_id, login_id, position_rank, table_data: temp, payment_type: searchData.payment_type, payment_month: searchData.payment_month
        }}
        let response = await ApiRequest(obj); setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            setSuccess([response.data.message]);
        }
        search_api();
    }

    /**
	* click reject button
	*
	* @author  Nay Zaw Linn
	* @create  13/07/2021 (D/M/Y)
	* @param
	* @return
	*/
	const reject = () => {
		setError([]); setSuccess([]); let temp = [];
        tableData.forEach((item, i) => {
            if(item.is_checked === true){
                temp.push(item);
            }
        });
        if(temp.length > 0){
            setReason(''); setOpen(!open); setRejectError([]);
        }else{
            let errMsg = t(message.JSE001).replace('%s',t('the checkbox you want to reject'));
            setError([errMsg]);
        }
	}

	/**
	* confirm action for reject button
	*
	* @author  Nay Zaw Linn
	* @create  13/07/2021 (D/M/Y)
	* @param
	* @return
	*/
	const rejectOK = async () => {
		if(!checkNullOrBlank(denied_reason)){
			setRejectError([t(message.JSE005).replace('%s',t('Reason'))]);
		}else{
            setOpen(!open); let temp = []; setLoading(true);

            tableData.forEach((item, i) => {
                if(item.is_checked === true){
                    temp.push(item);
                }
            });

			let obj = {
				method: 'patch', url: 'api/confirm-salary-calculation/reject',
				params: { login_id, company_id, position_rank, denied_reason, table_data: temp, payment_type: searchData.payment_type, payment_month: searchData.payment_month }
			}
			let response = await ApiRequest(obj); setLoading(false);
			if(response.flag === false){
				setError(response.message);
			}else{
				setSuccess([response.data.message]);
			}
			search_api();
		}
	}

    /**
    * download payslip
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const download_payslip = async () => {
        setLoading(true); setError([]); setSuccess([]);
		let obj = {
            method: 'post', url: 'api/confirm-salary-calculation/download', type: 'blob',
			params: { login_id, company_id, position_rank, table_data: tableData, payment_type: searchData.payment_type }
		}
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError(response.message);
        }else{
			let getHeader = response.headers["content-disposition"];
            // get only file name from getHeader variable
            let tmpName = getHeader.split('filename=')[1];
            let fileName = tmpName.replace(/['"]+/g, '');
            // generate link for blob object
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName; //or any other extension
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
		setLoading(false);
    }

    /**
    * pay bank
    *
    * @author  Nay Zaw Linn
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const ready_to_bank_pay = () => {
        setError([]); setSuccess([]);
        let customer_name = window.location.href.split("/")[3];
        if(searchData.payment_type === "1"){
            history.push(`/${customer_name}/hr/salary-calculation/bank-salary-pay`);
        }else{
            history.push(`/${customer_name}/hr/salary-calculation/bank-salary-pay`);
        }
    }

    /**
    * department modal
    *
    * @author  Nay Zaw Linn
    * @create  13/07/2021 (D/M/Y)
    * @param i
    * @return
    */
    const department_modal = async (i) => {
        setLoading(true); setError([]); setSuccess([]);
        let { department_name } = i;
        setDepNameInModal(department_name);
        setShowDepModal(!showDepModal);

        let obj = {
            method: 'post', url: 'api/confirm-salary-calculation/employee-data-model', params: {
            login_id, company_id, payment_type: searchData.payType, salary_data: i,
        }}
        let response = await ApiRequest(obj); setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            setShowDepModal(!showDepModal);
            setDepList(response.data.data);
        }
    }

    /**
    * approve status
    * @author  ATM
    * @create  27/08/2021 (D/M/Y)
    */
    const payTypeChange = async (i) => { 
        setPayType(i.target.value);
        if(i.target.value === "2"){
            setApproverStatusShow(true);setApproveFlag();
        }else{
            setApproverStatusShow(false);setApproveFlag('');
        }
    }

    return(<>
        <Loading start={loading} />
        <Message success={success} error={error} error2={[]} />
        <Confirmation
            content={content}
            okButton={t('Ok')}
            cancelButton={t('Cancel')}
            type={type}
            show={show}
            cancel={()=>setShow(!show)}
            confirmOK={confirmOK}
            deleteOK={deleteOK}
        />
        <EmployeeListModal
            showDepModal={showDepModal}
            depList={depList}
            depNameInModal={depNameInModal}
            close={()=>setShowDepModal(!showDepModal)}
        />
        <RejectModal
            open={open}
            close={reject}
            value={denied_reason}
            change={(i)=>setReason(i.target.value)}
            error={rejectError}
            save={rejectOK}
        />

        <FormData
            payMonth={payMonth}
            payMonthChange={i=>setPayMonth(Moment(ChangeDate(i)).format('YYYY-MM'))}

            payType={payType}
            payTypeChange= {payTypeChange}

            deptArr={deptArr}
            deptID={deptID}
            changeDept={i=>{ setDeptID(i.target.value); setDeptName(i.nativeEvent.target[i.nativeEvent.target.selectedIndex].text) }}

            search={click_search}

            tableData={tableData}
            checkboxColumn={checkboxColumn}
            checkApplicantApprover={checkApplicantApprover}
            changeCheckbox={changeCheckbox}
            allChecked={allChecked}

            totalConfirmMMK={totalConfirmMMK}
            totalConfirmUSD={totalConfirmUSD}
            delete={click_delete}
            confirm={click_confirm}
            reject={reject}
            payslipDownload={download_payslip}
            payBank={ready_to_bank_pay}
            depModal={department_modal}

            totalConfirmAmountShow={totalConfirmAmountShow}
            totalConfirmArray={totalConfirmArray}
            currency={currency}
            totalColumn={totalColumn}
            approverStatusShow={approverStatusShow}
            approveStatusID={approveStatusID}
            changeApproveStatus={i=>{ setApproveStatusID(i.target.value);}}
            noData = {noData}
        />
    </>)
}

export default withTranslation()(LegacyWelcomeClass)
