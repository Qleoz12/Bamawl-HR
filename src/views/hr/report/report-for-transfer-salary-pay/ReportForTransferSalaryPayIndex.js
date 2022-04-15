/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import Moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlank, checkNullOrBlankRadio } from '../../hr-common/common-validation/CommonValidation'; // Common validation function
import ReportForTransferSalaryPayTable from './ReportForTransferSalaryPayTable';
import SearchReportForTransferSalaryPay from './SearchReportForTransferSalaryPay';


// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory(); // For edit link
  const [currencyState, setCurrencyState] = useState(); // For department dropdown toggle
  const [paymentNameState, setpaymentNameState] = useState(); // For role dropdown toggle

  const [rowCount, setRowCount] = useState('');           // For row count
  const [mainTable, setMainTable] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [paymentTypeState, setPaymentTypeState] = useState(1);
  const typingTimeoutRef = useRef(null);    // keep value time out when rerender
  // Loaded initially
  useEffect(() => {
    setLoading(true);
    loadCurrency();
    ApiViewPermission.loadViewPermission();
  }, []);

  /** Start API for currency */
  const [currencyAPI, setCurrencyAPI] = useState([]);
  const loadCurrency = async () => {
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang,
      login_id: ApiPath.loginEmp
    };
    let obj = { package_name : 'hr', url: ApiPath.ReportForTransferSalaryPayGetCurrency, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess('');
      setError();
    } else {
      setCurrencyAPI(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        setCurrencyState(response.data.data[0].id)
        loadPaymentName(response.data.data[0].id)
      }
    }
  };
  const currencyChange = (e) => {
    setCurrencyState(e.currentTarget.value);
    loadPaymentName(e.target.value);
    setpaymentNameState();
   let paymentName = document.getElementsByName("PaymentName");
   for(let i = 0; i< paymentName.length; i++) {
    paymentName[i].checked = false
   }
  }
  /** End API for currency */

  /** Start API for paymentName */
  const [paymentNameAPI, setPaymentNameAPI] = useState([]);
  const loadPaymentName = async(id) => {
    let params = {
      company_id: ApiPath.companyID,
      currency_id: id,
      language: ApiPath.lang,
      login_id: ApiPath.loginEmp
    };
    let obj = { package_name: 'hr', url: ApiPath.ReportForTransferSalaryPayGetPaymentName, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSuccess('');
      setError();
    } else {
      setPaymentNameAPI(response.data.data);
    }
  };
  let paymentNameChange = (e) => {
    setpaymentNameState(e.target.value);
  }
  /** End API for paymentName */

  const searchClick = () => {
    let errMsgAll = [];
    setError([]);
    setSuccess('');
    if (!checkNullOrBlank(selectedDate)) {
      let errMsg = t('JSE001').replace('%s', t('Payment Month'));
      errMsgAll.push(errMsg);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (!checkNullOrBlankRadio(paymentNameState)) {
      let errMsg = t('JSE001').replace('%s', t('Payment Name'));
      errMsgAll.push(errMsg);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (errMsgAll.length > 0) {
      setError([...errMsgAll]);
      setSuccess("");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    else {
      searchAPI(true);
    }
}

  const searchAPI = async(searchFlag = false) => { 
      let reportForTransferSalaryData = {
        language: ApiPath.lang,
        login_id: ApiPath.loginEmp,
        company_id: ApiPath.companyID,
        payment_month: Moment(selectedDate).format("yyyy-MM"),
        currency_id: currencyState,
        payment_id: paymentNameState,
        payment_type: paymentTypeState
      }
      if (searchFlag === true) {
        setMainTable(reportForTransferSalaryData);
      } else {
        reportForTransferSalaryData = mainTable;
      }
      setLoading(true);
      let params = {
        ...reportForTransferSalaryData
      }
      let obj = { package_name : 'hr', url: ApiPath.ReportForTransferSalaryPaySearch, method: 'post', params };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setRowCount('');
        setError(response.message);
        setSuccess("");
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setMainTable([]);
        setLoading(false);
      }
      else {
        setRowCount(t("Total Rows").replace('%s', response.data.data.length));
        setMainTable(response.data.data);
        setError('');
        setSuccess('');
        setLoading(false);
      }
  }

  /**Start Download File */
  const downLoadFile = async(e) => {
    setLoading(true);
    let params = {
      login_id: ApiPath.loginEmp,
      file_name: e.file_name,
      company_id: ApiPath.companyID,
      payment_month: Moment(selectedDate).format("yyyy-MM"),
      currency_id: currencyState,
      payment_id: parseInt(paymentNameState),
      payment_type: paymentTypeState
    };
    let obj = { package_name : 'hr', url: ApiPath.ReportForTransferSalaryDownload, method: 'post', params, type: "blob" };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
        setSuccess("");
        setError(response.message);
        setLoading(false);
    } else {
            // let fileName = response.headers["content-disposition"].split("filename=")[1];
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', e.file_name); //or any other extension
            document.body.appendChild(link);
            link.click();
            setError([]);
            setLoading(false);
    }
  }

  /**End Download File */

  /* DELETE OVERTIME MODAL BOX */

  let paymentTypeChange = (e) => {
    setPaymentTypeState(e.currentTarget.value);
  };

  /** Start Date In FormSearch */
  let handleDateChange = (e) => {
    setSelectedDate(e)
  };

  let removeDate = () => {
    setSelectedDate(null);
  }

  /** End Date In FormSearch */


  return (
    <CRow>
      <CCol xs="12">
        {/* Error and success msg */}
        <Message success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h5><CLabel>{t('Report For Transfer Salary/Bonus')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
          <Loading start={loading} />
            <SearchReportForTransferSalaryPay
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
              removeDate={removeDate}
              currencyAPI={currencyAPI}
              currencyChange={currencyChange}
              paymentNameChange={paymentNameChange}
              paymentTypeChange={paymentTypeChange}
              paymentNameAPI={paymentNameAPI}
              currencyState={currencyState}
              searchClick={searchClick} />
            <ReportForTransferSalaryPayTable
              mainTable={mainTable}
              downLoadFile={downLoadFile} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ReportForTransferSalartPayIndex() {
  return (
    <Welcome />
  )
}