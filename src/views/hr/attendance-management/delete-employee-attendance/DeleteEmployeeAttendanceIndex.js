/**
* Delete Employee Attendance
*
* @author  Nay Zaw Linn
* @create  08/06/2021 (D/M/Y)
* @modify  20/08/2021 ATM
* @param
* @return
*/
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { CCard, CCardBody, CButton, CCardHeader, CForm, CRow, CCol, CImg, CLabel } from '@coreui/react';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import FormData from './FormData';
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage';
import $ from 'jquery';

function LegacyWelcomeClass ({t, i18n}) {

	const [error, setError] = useState([]);
	const [error2, setError2] = useState([]);
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
	const [fromDate, setFromDate] = useState(()=>ChangeDate(new Date()));
    const [toDate, setToDate] = useState(()=>ChangeDate(new Date()));
	const [posArr, setPosArr] = useState([])
    const [posID, setPosID] = useState('');
	const [dept, setDept] = useState([]);
    const [deptID, setDeptID] = useState('');
	const [statusArr, setStatusArr] = useState([
		{ id: 1, status_name: 'IN' }, { id: 2, status_name: 'OUT' }
	]);
	const [status, setStatus] = useState('');
	const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
	const [employeeName, setEmployeeName] = useState('');
	const [employeeCode, setEmployeeCode] = useState('');
	const [employeeID, setEmployeeID] = useState('');
	const [tableData, setTableData] = useState([]);
	const [allChecked, setAllChecked] = useState(false);
	const [rowCount, setRowCount] = useState('');
	const [deleteData, setDeleteData] = useState([]);

	const [disableAutocomplete, setDisableAutocomplete] = useState(true);
    const [login_employee_id , setLoginEmpID] 			= useState(localStorage.getItem('LOGIN_ID'));
	const [company_id, setCompanyID]                    = useState(localStorage.getItem('COMPANY_ID'));
    const [login_id, setLoginID]                        = useState(localStorage.getItem('LOGIN_ID'));
    const [noData, setNoData]                           = useState('');   // For show There is no data!

	/**
	* Page Load
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(() => {
		get_position(); get_department(); getPermission();
	},[])

	/**
    * get view permission
    *
    * @author  Nay Zaw Linn
    * @create  15/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const getPermission = async () => {
        let obj = { url: 'api/employee-by-view-permission', method: 'post', params: { company_id, login_employee_id } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            // setError(response.message);
        }else{
            let object = response.data.data;
            for (const property in object) {
                if(property == login_employee_id && response.data.autocomplete === false){
                    setDisableAutocomplete(response.data.autocomplete);
                    setEmployeeID(property);
                    setEmployeeCode(object[login_employee_id].code);
                    setEmployeeName(object[login_employee_id].name_eng);
                }
            }
        }
    }

	/**
	* If error state or succes state is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  24/05/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0 || error2.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success, error2]);

	/**
	* If clearData is changed, remove array in autocomplete
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(clearData !== ''){
			setIdArr([]); setNameArr([]); setCodeArr([]);
		}
	},[clearData]);

	/**
	* Get department data from ERP API for tree structure
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
	const get_department = async () => {
        let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDept([]) : setDept(response.data.data);
    }

	/**
	* Get position data from ERP API for dropdown
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
	const get_position = async () => {
        let obj = { package_name: 'erp', url: 'api/position/get-all-position', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setPosArr([]) : setPosArr(response.data.data);
    }

	/**
	* change autocomplete
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]); setError2([]); setClearData('');

        // type is id, show name in Employee ID and clear remain input
        if(type === 'id'){
            setEmployeeID(i.target.value); setEmployeeCode(''); setEmployeeName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if(type === 'code') {
            setEmployeeID(''); setEmployeeCode(i.target.value); setEmployeeName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else{
            setEmployeeID(''); setEmployeeCode(''); setEmployeeName(i.target.value);
        }

        // if empty, remove data from autocomplete
        if(i.target.value === ''){
            setClearData('clear');
        }else{
            let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: company_id } }
            let response = await ApiRequest(obj);
            if(response.flag === false){
                setError(response.message); 
                setClearData('clear');
            }else{
                (type === 'id') ? setIdArr(response.data.data) :
                (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
            }
        }
    }

    /**
	* select autocomplete
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const selectAutocomplete = async (val, obj) => {
        setClearData('clear'); setLoading(true);
        let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: company_id } }
        let response = await ApiRequest(object);
		setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            setEmployeeID(response.data.data[0].employee_id);
            setEmployeeName(response.data.data[0].name);
            setEmployeeCode(response.data.data[0].employee_code);
        }
    }

	/**
	* change checkbox in table
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const changeCheckbox = (i) => {
        let value = i.target.value, checked = i.target.checked, data;

        if( value === "allcheck" ){
            data = tableData.map(item => ({ ...item, is_checked: checked }));
        }else{
            data = tableData.map(item =>
                item.attendance_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        setAllChecked(data.every(item => item.is_checked));
        setTableData(data);
    }

	/**
	* click delete button
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const deleteCheckbox = () => {
        let temp = []; setError([]); setSuccess([]); setError2([]);
        tableData.forEach((item, i) => {
            if(item.is_checked === true){
                temp.push(item);
            }
        });

        if(temp.length > 0){
            setContent(t('Are you sure want to delete?')); setShow(!show); setType('delete');
            setDeleteData(temp);
        }else{
            setError([t(message.JSE001).replace('%s',t('the checkbox you want to delete'))]);
        }
    }

    /**
	* confirm for delete
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const deleteOK = async () =>{
        setShow(!show); setType(''); setContent('');
        let obj = { url: 'api/employee-attendance/delete', method: 'delete', params: { login_id: login_id, company_id: company_id, data: deleteData } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError2(response.message);
        }else{
            setSuccess([response.data.message]);
        }
        search_api(true);
    }

	/**
    * api for search
    *
    * @author  Nay Zaw Linn
    * @create  08/06/2021 (D/M/Y)
    * @param
    * @return
    */
    const search_api = async (delete_status) => {
        setLoading(true);
        let search_obj = {
			login_id: login_id, company_id: company_id,
            employee_id: employeeID, employee_code: employeeCode, employee_name: employeeName,
			from_date: fromDate, to_date: toDate, department_id: deptID, position_id: posID, status
        }
        let obj = { url: 'api/employee-attendance/search', method: 'get', params: search_obj }
        let response = await ApiRequest(obj);
        setLoading(false); setAllChecked(false);
        if(response.flag === false){
            setNoData(response.message);setError([]);setTableData([]); setRowCount('');
        }else{
            setNoData('');
            if(delete_status === false){
                $("html, body").animate({ scrollTop: $(document).height() }, 'slow');
            }
            setRowCount(response.data.row_count); setTableData(response.data.data);
        }
    }

    /**
	* click search button
	*
	* @author  Nay Zaw Linn
	* @create  08/06/2021 (D/M/Y)
	* @param
	* @return
	*/
    const search = (delete_status) => {
        setError([]); setSuccess([]); setError2([]); search_api(delete_status);
    }


	return(<>
		<Loading start={loading} />
        <Message success={success} error={error} error2={error2} />
        <Confirmation
            content={content}
            okButton={t('Ok')}
            cancelButton={t('Cancel')}
            type={type}
            show={show}
            cancel={()=>setShow(!show)}
			deleteOK={deleteOK}
        />
        <FormData
            changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete} empID={employeeID} empName={employeeName} empCode={employeeCode} idArr={idArr} nameArr={nameArr} codeArr={codeArr} disableAutocomplete={disableAutocomplete}
            deptArr={dept} changeDept={i=>setDeptID(i.target.value)} deptID={deptID}
			posArr={posArr} changePos={i=>setPosID(i.target.value)} posID={posID}
			statusArr={statusArr} changeStatus={i=>setStatus(i.target.value)} status={status}
            fromDate={fromDate} toDate={toDate} changeFromDate={i=>{ setFromDate(ChangeDate(i)); if(ChangeDate(i) > toDate) setToDate(null); } } changeToDate={i=>setToDate(ChangeDate(i))}
            tableData={tableData} rowCount={rowCount} allChecked={allChecked} checkboxChanged={changeCheckbox} checkboxDelete={deleteCheckbox}
            search={()=>search(false)} noData={noData}
        />
	</>)
}

export default withTranslation()(LegacyWelcomeClass)
