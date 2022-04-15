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
import { checkNullOrBlank } from '../../hr-common/common-validation/CommonValidation';
import message from '../../hr-common/common-message/CommonMessage';
import { ApiRequest } from '../../../brycen-common/api-request/RequestApi';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import SearchData from './SearchData';
import TableData from './TableData';

/**
 * Main Component
 * @author Su Pyae Maung
 * @create 02/08/2021
 * @modify 
 * @returns output shown in web page
 */
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error,setError]                    = useState([]); // For Error Message
  const [success,setSuccess]                = useState([]); // For Success Message
  const [loading, setLoading]               = useState(false); // For Loading
  const [bankAPI, setBankAPI]               = useState([]); // For API Payment Transfer Method
  const [bankID, setBankID]                 = useState(""); // For Payment Transfer Method id
  const [bankName, setBankName]             = useState(""); // For Payment Transfer Method name
  const [currencyAPI , setCurrencyAPI]      = useState([]); // For API Currency
  const [currency , setCurrency]            = useState(""); // For Currency id
  const [curName , setCurName]              = useState(""); // For Currency name
  const [curDes , setCurDes]                = useState(""); // For Currency description
  const [rowCount , setRowCount]            = useState(""); // for row count
  const [noData, setNoData]                 = useState(""); // for there is no data!
  const [mainTable, setMainTable]           = useState([]); // For MainTable
  const [ loginID, setLoginID ]             = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
  const [ departmentID, setDepartmentID ]   = useState(localStorage.getItem('DEPARTMENT_ID')); // for session department id from ERP
  const [ positionID, setPositionID ]       = useState(localStorage.getItem('POSITION_ID')); // for session position id from ERP
  const [ companyID, setCompanyID ]         = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP

/** Start Form Load */
useEffect(() => {
  setLoading(true);loadCurrency();
  loadBank();
},[]);
/** End Form Load */

/** Get all currency type(MMK, USD) from database */
const loadCurrency = async () => {
    let obj = { method: 'get', url: 'api/currencies' }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{setCurrencyAPI(response.data.data);}
}
const currencyChange=(id, name, des)=>{
  setCurrency(id);setCurName(name);setCurDes(des);
}

/** Get all banks(CB, KBZ) from database */
const loadBank = async () => {
    let obj = { method: 'get', url: 'api/bank-error-check-list/payroll-bank',
        params:{"login_id" :loginID, "company_id": companyID}
    }
    let response = await ApiRequest(obj);setLoading(false);
    if(response.flag === false){
        setError(response.message); window.scrollTo({top:0, left:0, behavior:'smooth'});
    }else{setBankAPI(response.data.data);}
}
const bankChange=(id,name)=>{
  setBankID(id);setBankName(name);
}

/** Start Search Function */
const searchAPI= async(pageNumber = 1) => {
  let errMsg = [];
  if(!checkNullOrBlank(bankName)){
    let str = t(message.JSE019).replace('%s',t('Payment Transfer Method'));errMsg.push(str); 
  }
  if(!checkNullOrBlank(currency)){
    let str = t(message.JSE019).replace('%s',t('Currency'));errMsg.push(str); 
  }
  if(checkNullOrBlank(errMsg)){
    setError(errMsg);setSuccess([]);
  }else{
    setError([]);setSuccess([]);setMainTable([]);setNoData('');
    setLoading(true); 
    let search = {
      method: "patch", url: "api/bank-error-check-list/search",
      params: {
        "company_id": companyID,
        "login_id": loginID,
        "bank_id": bankID,
        "bank_name": bankName,
        "currency_id": currency,
        "currency_name": curName,
        "currency_description": curDes,
        }
    }
    let response = await ApiRequest(search);setLoading(false);
    if(response.flag === false){
      setMainTable([]); setError([]);
      setNoData(response.message);
    }else{
      setNoData('');
      setRowCount(response.data.data.row_count); 
      setMainTable(response.data.data.table_data);
    }
  }
}

return (
  <CRow>
    <CCol xs="12">
      <Loading start={loading} />
      <Message success={success} error={error} error2={[]} />
      <CCard>
        <CCardHeader>
          <h5><CLabel className="m-0">{t('Bank Error Check List')}</CLabel></h5>
        </CCardHeader>
        <CCardBody>
          <SearchData
            bankAPI={bankAPI} currencyAPI={currencyAPI} 
            bankName={bankName} bankID={bankID} currency={currency}
            bankChange={bankChange} currencyChange={currencyChange} searchAPI={searchAPI} noData={noData}
          />
          <TableData
            mainTable={mainTable} rowCount={rowCount}
          />
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
);}
export default withTranslation()(LegacyWelcomeClass);