import React, { useState, useEffect } from "react";
import { CCol, CRow, CCard, CCardHeader, CCardBody, CImg, CLabel, CFormGroup, CButton, CInput } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import message from '../../hr-common/common-message/CommonMessage'; // Common message
import { isEmpty } from '../../hr-common/common-validation/CommonValidation'; // Common message
import FormData from './FormData';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Moment from 'moment';
import Loading from '../../../brycen-common/loading/Loading';

/**
 * Main Component
 * @author Aye Thiri Mon
 * @create 09/06/2021
 * @modify 09/06/2021
 * @returns Web Page
 */
function LegacyWelcomeClass({ t, i18n }) {
  const [ success, setSuccess]                          = useState([]); // for success message
  const [ error, setError ]                             = useState([]); // for error message
  const [ loading, setLoading ]                         = useState(false); // for loading
  const [ selectedPaymentMonth, setSelectedPaymentMonth]= useState(new Date()); // For Payment Month
  const [ empListModalShow, setEmpListModalShow ]       = useState(false); // for employee list modal show hide 
  const [ empListModalData, setEmpListModalData ]       = useState([]); // for employee list modal data
  const [ empAllCheck, setEmpAllCheck ]                 = useState(false); // for employee list modal all check box
  const [ empModalError, setEmpModalError ]             = useState([]); // for employee list modal error message
  const [ addEmpListData, setAddEmpListData ]           = useState([]); // for added employee list data
  const [ toggleCheck, setToggleCheck ]                 = useState(false); // for employee name data for autocomplete box
  const [ empID, setEmpID ]                             = useState(''); // for employee id autocomplete box 
  const [ empIDData, setEmpIDData ]                     = useState([]); // for employee id data for autocomplete box
  const [ empCode, setEmpCode ]                         = useState(''); // for employee code autocomplete box
  const [ empCodeData, setEmpCodeData ]                 = useState([]); // for employee code data for autocomplete box
  const [ empName, setEmpName ]                         = useState(''); // for employee name autocomplete box
  const [ empNameData, setEmpNameData ]                 = useState([]); // for employee name data for autocomplete box
  const [ deptState, setDeptState ]                     = useState('');   // For department select box toggle
  const [ posState, setPosState ]                       = useState('');   // For department select box toggle
  const [ departmentAPI, setDepartmentAPI ]             = useState([]);   // For Dept API
  const [ positionAPI, setPositionAPI ]                 = useState([]);   // For Dept API
	const [companyId, setCompanyId]                        = useState(localStorage.getItem('COMPANY_ID'));
	const [loginId, setLoginId]                            = useState(localStorage.getItem('LOGIN_ID'));

  let language = 'en';             // language change

  /** Start Form Load */
  useEffect(() => { 
    
    loadDept();
    loadPosition();
    formLoad();
   }, [  ]);
   
  const scrollTop             = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }
  const scrollDown            = () => { window.scrollTo(0,9999); }
  const scrollTopModal        = () => {
    const element = document.getElementById("employee-list-modal");
    element.scrollIntoView({behavior: "smooth", block: "start"});
  }
  const handlePaymentMonthChange = (e) => { setSelectedPaymentMonth(e); };
  /** Form Loaded empty data */
  const formLoad = () => {
    // setSelectedPaymentMonth(null);
    setAddEmpListData([]);
    setToggleCheck(false);
    setEmpID('');setEmpName('');setEmpCode('');setDeptState('');setPosState('');
  }
  /** Get All Departments From Database */
  const loadDept = async() => {
    setLoading(true);
    const obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    const response = await ApiRequest(obj);
    if(response.flag === false){setDepartmentAPI([]);
    }else{setDepartmentAPI(response.data.data); setLoading(false); }
  }
  /** Get All Departments From Database */
  const loadPosition = async() => {
    setLoading(true);
    const obj = { package_name: 'erp', url: 'api/position/get-all-position', method: 'get' }
    const response = await ApiRequest(obj);
    response.flag === false ? setPositionAPI([]) : setPositionAPI(response.data.data);
    setLoading(false);
  }
  /** Start employee list modal add button Function */
  const addBtn = ()=>{
    setEmpModalError([]);
    let check   = false;
    let flag    = true;
    let errMsg  = []; 
    let str     = "";
    empListModalData.forEach(data => {
      if(data.is_checked == true){
      check = true ;
      }
    });
    if(check == false){
      errMsg = [t(message.JSE001).replace('%s', t('Employee'))];
      setEmpModalError(errMsg);
      scrollTopModal();
    }else{
      let add_emp_data = addEmpListData;
      empListModalData.forEach((item, i) => {
        // if checkbox is selected, check duplicate data exist or not
       if( item.is_checked === true ){
         let employee_id = item.employee_id;
         addEmpListData.forEach((add, ii) => {
            // If employee is same, store same data to array
             if( employee_id == add.employee_id){
                 if(str!=""){
                     str = str +",";
                 }
                 str=str+employee_id;
                 flag=false;
             }
         });
     }
     })
      if(flag == false){
        setEmpModalError([t(message.JSE007).replace('%s',t('This Employee ID(')+str+t(')'))]);
        scrollTopModal();  
     }else{
         empListModalData.forEach(app=>{
             if(app.is_checked == true){
                 add_emp_data.push(app);
             }
         })
         setAddEmpListData(add_emp_data);
         empListModalClose();
         setEmpAllCheck(false);
     }
    }
  }
  /** End employee list modal add button Function */
  /** Start employee list modal close Function */
  const empListModalClose = ()=>{
    setEmpListModalShow(false);setEmpAllCheck(false);setEmpListModalData([]);
  }
  /** End employee list modal close Function */
  /** Start employee list plus button Function */
  const empListPlusBtn = ()=>{setEmpModalError([]);setError([]);setEmpID('');setEmpName('');setEmpCode('');setDeptState('');setPosState('');
    if(isEmpty(selectedPaymentMonth)){ setError([t(message.JSE005).replace('%s',t('Payment Month'))]);scrollTop();
    }else{ setEmpListModalShow(true); }
  }
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
    setEmpListModalData(data)
    let flag = true;
    data.forEach(data=>{
      if(data.is_checked == false){
        flag = false;
      }
    })
    setEmpAllCheck(flag);
  }
  /** End employee list modal sub checkbox Function */
  /** Start employee list table delete button Function */
  let empListTableDeleteBtn = (e)=>{
    let data = addEmpListData.filter(data=> data.employee_id !== e);
    setAddEmpListData(data);
  }
  /** End  employee list table delete button Function */
  /** Start search Function */
  let searchBtn = async() =>{  
    setLoading(true);setError([]);setEmpModalError([]);setSuccess([]);let flag = true;
    let params = {
      "company_id": companyId,
      "login_id": loginId,
      "payment_month": Moment(selectedPaymentMonth).format('YYYY-MM'),
      "employee_id": empID,
      "employee_code": empCode,
      "employee_name": empName,
      "department_id": deptState,
      "position_id": posState,
      "language": language
    };
    let data = [];
    let searchData = { url: 'api/pay-slips/search-employee', method: 'get', params: params};
    let response = await ApiRequest(searchData);
    if(response.flag == false){ // catch error
      setSuccess([]);setEmpModalError(response.message);scrollTopModal();setLoading(false);
    }else{
      if(response.data.status == "OK"){
        data = response.data.data;
        setLoading(false);
      }else{
        setSuccess([]);setError([]);setLoading(false);
        setEmpModalError(response.data.message);
        scrollTopModal();
      }
    }
    data.forEach(data=>{
      if(data.is_checked == false){
        flag = false;
      }
    })
    setEmpAllCheck(flag);
    setEmpListModalData(data);setLoading(false);
  }
  /** End search Function */

  const checkBoxChange = () => {
    setToggleCheck(!toggleCheck);
  }
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
        let obj = { package_name: 'erp', url: `api/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: companyId } }
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
    let object = { package_name: 'erp', url: 'api/employee/autocomplete-result', method: 'post', params: { id: obj.id, company_id: companyId } }
    let response = await ApiRequest(object);
    if(response.flag === false){
        setError(response.message);
    }else{
        if(response.data.data[0].employee_id !== null){setEmpID(response.data.data[0].employee_id)}else{setEmpID('')}
        if(response.data.data[0].name !== null){setEmpName(response.data.data[0].name)}else{setEmpName('')}
        if(response.data.data[0].employee_code !== null){setEmpCode(response.data.data[0].employee_code)}else{setEmpCode('')}
    }
  }
  /**End select autocomplete */
  const deptChange            = (e) =>{ setDeptState(e.target.value); }
  const positionChange        = (e) =>{ setPosState(e.target.value); }
  /**
	* Mail Send
	* @author  ATM 
	* @create  01/07/2021 
	* @param company_id, login_employee_id, payment_month, employee_data[employee_id,employee_code,employee_name,email], payment_transfer_report, language
	* @return
	*/
	const sentMail = async() => {
    let empData = []; let err = []; let params = ''; setError([]); setSuccess([]); setLoading(true);
    if(isEmpty(selectedPaymentMonth)){ err = [...err, t(message.JSE005).replace('%s',t('Payment Month'))];}
    if(isEmpty(addEmpListData)){ err = [...err, t(message.JSE019).replace('%s',t('Employee'))];
    }else{
      addEmpListData.map(item=> {
        let data = {
          'employee_id'   : item.employee_id, 
          'employee_code' : item.employee_code, 
          'employee_name' : item.employee_name, 
          'email'         : item.email, 
        }
        empData = [...empData, data];
      });
      params = {
        'company_id'              : companyId,
        'login_id'                : loginId,
        'payment_month'           : Moment(selectedPaymentMonth).format('YYYY-MM'),
        'employee_data'           : empData,
        'payment_transfer_report' : !toggleCheck,
        'language'                : language,
      };
    }
    if(!isEmpty(err)){ setError(err);scrollTop();
    }else{
      scrollTop();
      let obj = { url: 'api/pay-slips/sent-mail', method: 'post', params: params}
      let response = await ApiRequest(obj);
      if(response.flag===false){
        setError(response.message);
      }else{
        if(response.data.status == 'OK'){setSuccess([response.data.message]);formLoad();
        }else{setError([response.data.message]);}
      }
    }
    setLoading(false);
  }
  
  /**
	* Excel download
	* @author  ATM
	* @create  01/07/2021 
	* @param
	* @return
	*/
	const download = async() => {
    let empData = []; let err = []; let params = ''; setError([]); setSuccess([]); setLoading(true);
    if(isEmpty(selectedPaymentMonth)){ err = [...err, t(message.JSE005).replace('%s',t('Payment Month'))];}
    if(isEmpty(addEmpListData)){ err = [...err, t(message.JSE019).replace('%s',t('Employee'))];
    }else{
      addEmpListData.map(item=> {
        let data = {
          'employee_id'   : item.employee_id, 
          'employee_code' : item.employee_code, 
          'employee_name' : item.employee_name, 
          'email'         : item.email, 
        }
        empData = [...empData, data];
      });
      params = {
        'company_id'              : companyId,
        'login_id'                : loginId,
        'payment_month'           : Moment(selectedPaymentMonth).format('YYYY-MM'),
        'employee_data'           : empData,
        'payment_transfer_report' : !toggleCheck,
        'language'                : language,
      };
    }
    if(!isEmpty(err)){ setError(err);scrollTop();
    }else{
      scrollTop();
      let obj = { url: 'api/pay-slips/download', method: 'post', params: params, type: 'blob'}
      let response = await ApiRequest(obj);
      if(response.flag===false){
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
        formLoad();
      }
    }
    setLoading(false);
  }
  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading}/>
        <Message error={error} success={success} error2={[]} />
        <CCard>
          <FormData selectedPaymentMonth={selectedPaymentMonth} handlePaymentMonthChange={handlePaymentMonthChange} 
            empListPlusBtn={empListPlusBtn} toggleCheck={toggleCheck} checkBoxChange={checkBoxChange} 
            empID={empID} empIDData={empIDData}
            empCode={empCode} empCodeData={empCodeData}
            empName={empName} empNameData={empNameData} 
            changeAutocomplete={changeAutocomplete}  selectAutocomplete={selectAutocomplete}
            addBtn={addBtn} empListModalClose={empListModalClose} 
            empListModalShow={empListModalShow} empModalError={empModalError} empListModalData={empListModalData} 
            empAllCheck={empAllCheck} allCheckBoxChange={allCheckBoxChange} subCheckboxChange={subCheckboxChange}
            deptState={deptState} deptChange={deptChange} departmentAPI={departmentAPI}
            posState={posState} positionChange={positionChange} positionAPI={positionAPI}
            searchBtn={searchBtn} download={download} sentMail={sentMail} 
            addEmpListData={addEmpListData} empListTableDeleteBtn={empListTableDeleteBtn}
          />
        </CCard>
      </CCol>
  </CRow>
  );
}
export default withTranslation()(LegacyWelcomeClass)
