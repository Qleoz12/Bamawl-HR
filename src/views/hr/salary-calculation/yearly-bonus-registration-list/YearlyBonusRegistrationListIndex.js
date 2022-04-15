/**
* Yearly Bonus Registration List
*
* @author  Nay Zaw Linn
* @create  27/04/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useEffect } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import message from '../../hr-common/common-message/CommonMessage';
import $ from 'jquery';

function LegacyWelcomeClass ({t, i18n}) {

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);
    const [login_id, setLoginID] 					= useState(localStorage.getItem('LOGIN_ID'));
	const [company_id, setCompanyId]                = useState(localStorage.getItem('COMPANY_ID'));
    const [login_employee_id, setLoginEmpID]        = useState(localStorage.getItem('LOGIN_ID'));

    const [autocomplete, setAutocomplete] = useState([]);
    const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employee_name, setEmployeeName] = useState('');
    const [employee_code, setEmployeeCode] = useState('');
    const [employee_id, setEmployeeID] = useState('');
    const [deptArr, setDeptArr] = useState([]);
    const [department_id, setDeptID] = useState('');
    const [methodValue, setMethodValue] = useState(1);
    const [method, setMethod] = useState('bonus_menthod');
    const [methodCheck, setMethodCheck] = useState(false);
    const [allChecked, setAllChecked] = useState(false);
    const [rowCount, setRowCount] = useState("");
    const [paid_with_salary, setPaidWithSalary] = useState(1);
    const [yearly_bonus_id, setYearlyBonusID] = useState([]);
    const [from_date, setFromDate] = useState(()=>ChangeDate(new Date()));
    const [to_date, setToDate] = useState(()=>ChangeDate(new Date()));
    const [mainTable, setMainTable] = useState([]);
    const [position_rank, setPositionRank] = useState(JSON.parse(localStorage.getItem('POSITION_RANK')));
    const [disableAutocomplete, setDisableAutocomplete] = useState(true);
    const [noData, setNoData] = useState('');   // For show There is no data!

    /**
    * page load
    *
    * @author  Nay Zaw Linn
    * @create  27/04/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect( () => {
        getDepartment();
        getPermission();
    }, [] )

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
            setError(response.message);
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
	* If error or succes is changed, scroll automatically to top
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(error.length > 0 || success.length > 0){
			window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
		}
	},[error, success]);

    /**
	* If clearData is changed, remove array in autocomplete
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
	useEffect(()=> {
		if(clearData !== ''){
			setIdArr([]); setNameArr([]); setCodeArr([]);
		}
	},[clearData]);

    /**
    * change bonus method
    *
    * @author  Nay Zaw Linn
    * @create  27/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeMethod = () => {
        paid_with_salary === 1 ? setPaidWithSalary(0) : setPaidWithSalary(1);
        setMethodCheck(!methodCheck);
    }

    /**
    * get department data from API
    *
    * @author  Nay Zaw Linn
    * @create  27/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const getDepartment = async () => {
        let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
        let response = await ApiRequest(obj);
        response.flag === false ? setDeptArr([]) : setDeptArr(response.data.data);
    }

    /**
    * api for search
    *
    * @author  Nay Zaw Linn
    * @create  27/04/2021 (D/M/Y)
    * @param
    * @return
    */
    const search_api = async (delete_status) => {
        setLoading(true); setAllChecked(false);
        let search_obj = {
            login_id: login_id,
            employee_id, employee_code, employee_name, company_id: company_id, from_date, to_date, department_id, paid_with_salary
        }

        let obj = { url: 'api/yearly-bonus-list/search', method: 'post', params: search_obj }
        let response = await ApiRequest(obj);
        setLoading(false);
        if(response.flag === false){
            setNoData(response.message); setMainTable([]); setRowCount('');
        }else{
            if(delete_status === false){
                $("html, body").animate({ scrollTop: $(document).height() }, 'slow');
            }
            setNoData('');
            setRowCount(response.data.row_count);
            setMainTable(response.data.emp_yearly_bonus_data.data);
        }
    }

    /**
	* click search button
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
    const search = (delete_status) => {
        setError([]); setSuccess([]); search_api(delete_status);
    }

    /**
	* change checkbox in table
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
    const changeCheckbox = (i) => {
        let value = i.target.value, checked = i.target.checked, data;

        if( value === "allcheck" ){
            data = mainTable.map(item => ({ ...item, is_checked: checked }));
        }else{
            data = mainTable.map(item =>
                item.id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        setAllChecked(data.every(item => item.is_checked));
        setMainTable(data);
    }

    /**
	* click delete button
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
    const deleteCheckbox = () => {
        let temp = [];
        mainTable.forEach((item, i) => {
            if(item.is_checked === true){
                temp.push(item.id);
            }
        });

        if(temp.length > 0){
            setContent(t('Are you sure want to delete?')); setShow(!show); setType('delete');
            setYearlyBonusID(temp); setError([]);
        }else{
            setError([t(message.JSE001).replace('%s',t('the checkbox you want to delete'))]);
        }
    }

    /**
	* confirm for delete
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
    const deleteOK = async () =>{
        setShow(!show); setType(''); setContent('');
        let obj = { url: 'api/yearly-bonus-list', method: 'delete', params: { yearly_bonus_id, company_id: company_id, login_id: login_employee_id, position_rank } }
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setError(response.message);
        }else{
            setSuccess([response.data.message]);
        }
        search_api(true);
    }

    /**
	* change autocomplete
	*
	* @author  Nay Zaw Linn
	* @create  27/04/2021 (D/M/Y)
	* @param
	* @return
	*/
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]); setClearData('');

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
                setError(response.message); setClearData('clear');
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
	* @create  27/04/2021 (D/M/Y)
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
            deleteOK={deleteOK}
        />
        <FormData
            changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete} empID={employee_id} empName={employee_name} empCode={employee_code} idArr={idArr} nameArr={nameArr} codeArr={codeArr} disableAutocomplete={disableAutocomplete}
            deptArr={deptArr} changeDept={i=>setDeptID(i.target.value)} deptID={department_id}
            fromDate={from_date} toDate={to_date} changeFromDate={i=>{setFromDate(ChangeDate(i)); if(ChangeDate(i) > to_date) setToDate(null);}} changeToDate={i=>setToDate(ChangeDate(i))}
            label1={t('With Salary')} label2={t('Without Salary')} changeMethod={changeMethod} transferMethod={methodValue} method={method} methodCheck={methodCheck}
            mainTable={mainTable} rowCount={rowCount} allChecked={allChecked} checkboxChanged={changeCheckbox} checkboxDelete={deleteCheckbox}
            search={()=>search(false)} noData = {noData}
        />
    </>)
}

export default withTranslation()(LegacyWelcomeClass)
