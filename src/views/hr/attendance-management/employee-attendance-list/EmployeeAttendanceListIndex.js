import React, { useState, useEffect } from "react";
import {CCard, CLabel, CCol, CRow, CImg, CCardHeader, CCardBody} from '@coreui/react';
import message from '../../hr-common/common-message/CommonMessage'; // Common message
import Message from '../../../brycen-common/message/Message';
import { withTranslation } from 'react-i18next';
import FormData from './FormData';
import { isEmpty, formatDate } from '../../hr-common/common-validation/CommonValidation'; // Common message
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Moment from 'moment';
import Loading from '../../../brycen-common/loading/Loading';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {

  const [loading, setLoading]                   = useState(false);// For Loading
  const [error,setError]                        = useState([]);
  const [success,setSuccess]                    = useState([]);
  const [ empID, setEmpID ]                     = useState(''); // for employee id autocomplete box 
  const [ empIDData, setEmpIDData ]             = useState([]); // for employee id data for autocomplete box
  const [ empCode, setEmpCode ]                 = useState(''); // for employee code autocomplete box
  const [ empCodeData, setEmpCodeData ]         = useState([]); // for employee code data for autocomplete box
  const [ empName, setEmpName ]                 = useState(''); // for employee name autocomplete box
  const [ empNameData, setEmpNameData ]         = useState([]); // for employee name data for autocomplete box
  const [departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
  const [selectedFromDate, setSelectedFromDate] = useState(new Date()); // For Joined Start Date
  const [selectedToDate, setSelectedToDate]     = useState(new Date()); // For Joined End Date
  const [deptState, setDeptState]               = useState('');   // For department select box toggle
  const [companyId, setCompanyId]                        = useState(localStorage.getItem('COMPANY_ID'));
	const [loginId, setLoginId]                            = useState(localStorage.getItem('LOGIN_ID'));

  // let company_id = 2;
  // let login_emp_id = 20001;

  /** Start Form Load */
  useEffect(() => { loadDept(); }, [  ]);

  const handleFromDateChange  = (e) => { setSelectedFromDate(e); };
  const handleToDateChange    = (e) => { setSelectedToDate(e); };
  const scrollTop             = () => { window.scrollTo({top: 0, left: 0, behavior: 'smooth' }); }
  const scrollDown            = () => { window.scrollTo(0,9999); }
  const deptChange            = (e) =>{ setDeptState(e.target.value); }

  /** Get All Departments From Database */
  let loadDept = async() => { setLoading(true);
    let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    let response = await ApiRequest(obj);
    if(response.flag === false)
    {setDepartmentAPI([]);}else{setDepartmentAPI(response.data.data); } setLoading(false);  
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
  let fromDate = null; let toDate = null;
  /** Export Function */
  let ExportData= async(pageNumber = 1) => {
    let errMsg = [];
    if(selectedFromDate !== null){fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');}
    if(selectedToDate !== null){toDate = Moment(selectedToDate).format('YYYY-MM-DD'); }
    if(selectedFromDate !== null && selectedToDate === null){let str = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(str);}
    if(selectedFromDate === null && selectedToDate !== null){let str = t(message.JSE001).replace('%s',t('From Date'));errMsg.push(str);}
    if(selectedFromDate === null && selectedToDate === null){let from_err = t(message.JSE001).replace('%s',t('From Date'));let to_err = t(message.JSE001).replace('%s',t('To Date'));errMsg.push(from_err);errMsg.push(to_err);}
    if(fromDate > toDate){ let str = t(message.JSE002).replace('%s',t('From Date')).replace('%s',t('To Date'));errMsg.push(str);}
    //validate company id, login id
      setLoading(true);
      setError(errMsg);
    if(isEmpty(errMsg)){
      let obj = {
        "method": "post",
        "url": "api/employee-attendance_list/export",
        "params": {
                "company_id"   : companyId,
                "employee_id"  : empID,
                "employee_code": empCode,
                "employee_name": empName,
                "department_id": deptState,
                "from_date"    : fromDate,
                "to_date"      : toDate,
                "login_id"     : loginId
                },
        "type": 'blob'
      };

      let response = await ApiRequest(obj);
      if(response.flag===false){
        setError(response.message);scrollTop();
      }else{
        // if(response.)
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
        setLoading(false);
      }
    }else{scrollTop();}
    setLoading(false);
  }

  return (
    <CRow>
    <CCol xs="12">
      <Loading start={loading}/>
      <Message error={error} success={success} error2={[]} />
      <CCard>
        <CCardHeader><h5><CLabel className="m-0">{t('Employee Attendance List')}</CLabel></h5></CCardHeader>
        <CCardBody>
          <FormData ExportData={ExportData} changeAutocomplete={changeAutocomplete} selectAutocomplete={selectAutocomplete} empIDData={empIDData} empID={empID} empCodeData={empCodeData} empCode={empCode} empNameData={empNameData} empName={empName} selectedFromDate={selectedFromDate} handleFromDateChange={handleFromDateChange} selectedToDate={selectedToDate} handleToDateChange={handleToDateChange} deptChange={deptChange} departmentAPI={departmentAPI} />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  );
}

export default withTranslation()(LegacyWelcomeClass)
