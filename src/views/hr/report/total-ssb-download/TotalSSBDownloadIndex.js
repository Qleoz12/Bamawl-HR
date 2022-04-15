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
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import message from '../../hr-common/common-message/CommonMessage';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Moment from 'moment';
import FormData from './FormData';
import TableData from './TableData';

/**
 * Main Component
 * @author Su Pyae Maung
 * @create 14/07/2021
 * @modify 
 * @returns output shown in web page
 */
function LegacyWelcomeClass({ t, i18n }) {
  const [error,setError]                    = useState([]); // For Error Message
  const [error2,setError2]                  = useState([]); // For Error2 Message
  const [success,setSuccess]                = useState([]); // For Success Message
  const [loading, setLoading]               = useState(false); // For Loading

  const [departmentAPI, setDepartmentAPI]   = useState([]);   // For Dept API
  const [deptState, setDeptState]           = useState('');   // For department id
  const [searchDept,setSearchDept]          = useState('');   // For Search Dept id
  const [selectDate, setSelectDate]         = useState(new Date()); // For Current Month
  const [calculateMonth, setCalculateMonth] = useState(''); // For Previous Month
  const [rowCount , setRowCount]            = useState('');   // For row count
  const [totalSSBTable, setTotalSSBTable]   = useState([]);   // For Salary Calculation2 table
  
  const [noData, setNoData]                 = useState('');   // For There is No Data msg
  const [content, setContent]               = useState('');   // For Confirmation box
  const [type, setType]                     = useState('');   // For Confirmation box
  const [show, setShow]                     = useState(false);// For show/hide confirmation box

  const [ loginID, setLoginID ]             = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
  const [ companyID, setCompanyID ]         = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Start Form Load */
useEffect(() => {
  setLoading(true);loadDept();
  let get_month  = selectDate.setMonth(selectDate.getMonth()-1);
  let prev_month = Moment(get_month).format('YYYY-MM');
  setCalculateMonth(prev_month);
},[]);
/** End Form Load */

/** Get All Departments From ERP Database */
const loadDept = async () => {
    let obj = { package_name: 'erp', url: 'api/department/get-all-department', method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDepartmentAPI([]): setDepartmentAPI(response.data.data);
    setLoading(false);
}
let deptChange = (e) =>{ setDeptState(e.target.value); }

/**Choose Month Function */
const changeDate = (e) => { setSelectDate(e); };

/** Search Function */
const searchData = async() =>{
  let errMsg = [];
  // if(!checkNullOrBlank(deptState)){let str = t(message.JSE001).replace('%s',t('Department Name'));errMsg.push(str);}
  if(checkNullOrBlank(errMsg)){
    setError(errMsg);setSuccess([]);setError2([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    setSearchDept(deptState);setLoading(true);
    setError([]);setSuccess([]);setTotalSSBTable([]); 
    let search = {
      "method":"post",
      "url": "api/total-ssb-download/search",
      "params": {
        "login_id": loginID,
        "company_id": companyID,
        "cal_month": calculateMonth,
        "department_id": deptState,
      }
    }
    let response = await ApiRequest(search);setLoading(false);
    if(response.flag === false){
        setTotalSSBTable([]); setNoData(response.message); //setError(response.message);
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{setNoData(''); setRowCount(response.data.total_rows); setTotalSSBTable(response.data.data);}
  }
}

/** Start Export(Download) Excel Function */
const exportExcel = async()=>{
  let errMsg = [];
  // if(!checkNullOrBlank(searchDept)){let str = t(message.JSE001).replace('%s',t('Department Name'));errMsg.push(str);}
  if(checkNullOrBlank(errMsg)){
    setError(errMsg);setSuccess([]);setError2([]);window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    setError([]);setSuccess([]);setError2([]);
    setShow(!show);setContent('Are you sure want to Download?');setType('confirm');
  }
}
const confirmOK=async()=>{
  setShow(!show);setLoading(true);
  let obj={
    method:"post", url:"api/total-ssb-download/export",
    params:{
      "login_id": loginID,
      "company_id": companyID,
      "cal_month": calculateMonth,
      "department_id": searchDept
    },
    type: 'blob',
  }
  let response = await ApiRequest(obj);setLoading(false);
  if(response.flag == false){ 
    setSuccess([]);setError(response.message);setError2([]);
    window.scrollTo({top:0, left:0, behavior:'smooth'});
  }else{
    let getHeader = response.headers["content-disposition"];
    let tmpName  = getHeader.split('filename=')[1];
    let fileName = tmpName.replace(/['"]+/g, '');
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setSuccess(["Successfully Download!"]);window.scrollTo({top:0, left:0, behavior:'smooth'});
  }
}
/** End Export(Download) Excel Function */

  return (
    <CRow>
    <CCol xs="12">
      <Loading start={loading} />
      <Message success={success} error={error} error2={[]} />
      <CCard>
        <CCardHeader>
          <h5><CLabel className="m-0">{t('SSB Amount Download List')}</CLabel></h5>
        </CCardHeader>
        <CCardBody>
          <FormData
            departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
            selectDate={selectDate} changeDate={changeDate}
            searchData={searchData} noData={noData}
          />
          <TableData
            totalSSBTable={totalSSBTable} rowCount={rowCount} exportExcel={exportExcel}
          />
          <Confirmation
            content={content} okButton={t('OK')} cancelButton={t('Cancel')} 
            type={type} show={show} cancel={()=>setShow(!show)} confirmOK={confirmOK}
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  );
  }
export default withTranslation()(LegacyWelcomeClass);