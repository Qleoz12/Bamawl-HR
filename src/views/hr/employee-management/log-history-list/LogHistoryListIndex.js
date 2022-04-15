/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { isEmpty, checkNullOrBlank } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import Message from '../../../brycen-common/message/Message';
import SearchLogHistoryList from './SearchLogHistoryList';
import LogHistoryListTable from './LogHistoryListTable';
import LogHistoryListFormSearch from './LogHistoryListFormSearch';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';

/**
 * Component for Log History List
 * 
 * @author c_dinh
 * @create_date 2021-07-27
 */
function LegacyWelcomeClass({ t, i18n }) {
  /** State for main screen */
  const defaultPerPage = ApiPath.defaultPerPage;//default page
  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date
  const [statusState, setStatusState] = useState(); // For status
  const [platformState, setPlatformState] = useState(""); // for platform
  const [formNameState, setFormNameState] = useState(""); // for form name

  const [totalRow, setTotalRow] = useState('');
  const [mainTable, setMainTable] = useState([]);
  const [formSearchState, setFormSearchState] = useState(null); // keep form search when click button search
  const [error, setError] = useState([]);
  const [errorModal, setErrorModal] = useState([]);
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [formNameAPI, setFormNameAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clearData, setClearData] = useState('');

  const [statusData, setStatusData] = useState([
    { op_flag: 1, name: "Save" }, { op_flag: 2, name: "Update" },
    { op_flag: 5, name: "Upload" }, { op_flag: 3, name: "Delete" },
    { op_flag: 6, name: "Request" }, { op_flag: 4, name: "Download" }
  ])
  const platformData = [
    { device_flag: "", name: 'None' },
    { device_flag: 1, name: "Web" },
    { device_flag: 2, name: "Android" },
    { device_flag: 3, name: "IOS" }
  ];

  /** State for pop up */
  const [autocompletedFormName, setAutocompletedFormName] = useState(""); // For input in form search list modal box
  const [formSeachModalBox, setFormSeachModalBox] = useState(false); // Show or hidden form search list

  // Loaded initially
  useEffect(() => {
    loadViewPermission();
    formSeachModalBox ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";;
  }, []);
  /**
    * GET VIEW PERMISSION
    *
    * @author  c_dinh
    * @create  09/08/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag == false) {
      window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
    }
  };

  let chooseStatus = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let list_status = [];
    let data;
    data = statusData.map(item =>
      item.op_flag == value ? { ...item, is_checked: checked } : item
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        list_status.push(data[i].op_flag);
      }
    }
    setStatusData(data);
    setStatusState(list_status);
  }

  //format date yyyy-MM-dd
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  /** START SEARCH API */
  const searchClick = () => {
    let arrMsg = [];
    setError([]);
    setSuccess('');
    /* check from date is null */
    if (!checkNullOrBlank(selectedFromDate)) {
      let errMsg = t("JSE001").replace("%s", t("From Date"));
      arrMsg.push(errMsg);
    }
    if (!checkNullOrBlank(selectedToDate)) {
      let errMsg = t("JSE001").replace("%s", t("To Date"));
      arrMsg.push(errMsg);
    }
    //validation check Applied From Date > Applied To Date
    if (checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
      if (formatDate(selectedFromDate) > formatDate(selectedToDate)) {
        let errMsg = t("JSE016").replace("%s", t("From Date")).replace("%s", t("To Date"));
        arrMsg.push(errMsg);
      }
    }
    /* check status is null */
    if (isEmpty(statusState)) {
      let errMsg = t('JSE126').replace('%s', t('Status'));
      arrMsg.push(errMsg);
    }
    if (!isEmpty(arrMsg)) {
      setError(arrMsg);
      setMainTable([]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      const requestFormSearch = {
        login_id: ApiPath.loginEmp,
        from_date: formatDate(selectedFromDate),
        to_date: formatDate(selectedToDate),
        form: formNameState,
        op_flag: statusState,
        device_flag: platformState,
        company_id: ApiPath.companyID,
        language: ApiPath.lang
      }
      setFormSearchState(requestFormSearch);
      searchAPI(1, defaultPerPage, requestFormSearch);
      setCurrentPage(1);
    }
  }
  const searchAPI = async (page = 1, pageSize = 20, formSearch = null, searchFlag = true) => {
    setLoading(true);
    let params = {
      ...formSearch,
      page,
      per_page: pageSize,
    }
    let obj = { package_name: 'hr', url: ApiPath.logHistoryListSearch, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setMainTable([]);
      setTotalRow(0);
      setSuccess('');
    }
    else {
      let res = response.data.log_history_list;
      let data = res.data;
      data = data.map(ele => ({
        ...ele,
        op_flag: changeStatus(ele.op_flag),
        device_flag: changePlatform(ele.device_flag)
      }));
      setMainTable(data);
      setTotalRow(res.total);
      setTotalPage(res?.last_page);
    }
  }
  /* END SEARCH API */

  async function pageChange(newPage) {
    setCurrentPage(newPage);
    setError('');
    setSuccess('');
    searchAPI(newPage, defaultPerPage, formSearchState, true);
  }

  /** Action before seach start */
  let platformChange = (e) => {
    setPlatformState(e.target.value);
  }
  let formNameChange = (e) => {
    let data = e.target.value;
    setFormNameState(data);
  }
  let formNameSelect = (e) => {
    setAutocompletedFormName(e)
  }

  /** API for Form Search List (input) */

  const changeAutoFormName = async (i) => {
    let data = "";
    if (i) {
      data = i.target.value;
      setAutocompletedFormName(i.target.value)
    }
    setError([]); setSuccess([]);
    setClearData('');
    // if empty, remove data from autocomplete
    if (i) {
      setAutocompletedFormName(i.target.value)
    }
    let obj = {
      package_name: 'hr', url: ApiPath.getFormName, method: 'post', params: { form_name: data, language: ApiPath.lang }
    }
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError(response.message);
      setFormSeachModalBox(false);
      setClearData('clear');
    } else {
      setFormNameAPI(response.data.form);
    }
  }

  let handleFromDateChange = (e) => {
    setSelectedFromDate(e);
  }
  let handleToDateChange = (e) => {
    setSelectedToDate(e);
  }
  let removeFromDate = () => {
    setSelectedFromDate(null);
  }
  let removeToDate = () => {
    setSelectedToDate(null);
  }
  let showFormSearchBox = (value) => {
    setFormSeachModalBox(!formSeachModalBox);
    setAutocompletedFormName("");
    setErrorModal([]);
    /** Call api when "Form Search List" showed */
    changeAutoFormName();
  }
  let btnAddFormSearchList = (data) => {
    if (data) {
      if (!isEmpty(formNameAPI.find(ele => ele.form === data))) {
        setFormNameState(autocompletedFormName);
        setFormSeachModalBox(false);
      }
      else {
        let errMsg = t('JSE108');
        setErrorModal([errMsg]);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }
    else {
      setFormNameState(data);
      setFormSeachModalBox(false);
    }
  }
  let btnCloseFormSearchList = () => {
    setFormSeachModalBox(false);
    setAutocompletedFormName("");
    setFormNameAPI([]);
  }
  /** Action before seach end */

  /** Change platform from id to string when call api result table */
  let changePlatform = (device_flag) => {
    switch (device_flag) {
      case 1:
        return "Web";
      case 2:
        return "Android";
      default:
        return "IOS"
    }
  }
  /** Change status from id to string when call api for result table */
  let changeStatus = (op_flag) => {
    switch (op_flag) {
      case 1:
        return "Save";
      case 2:
        return "Update";
      case 3:
        return "Delete";
      case 4:
        return "Download";
      case 5:
        return "Upload";
      default:
        return "Request";
    }
  }

  const removeMessageModal = () => {
    setErrorModal([]);
  }

  return (
    <CRow className="log-history-list">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        {/* SuccessMessage End */}
        <CCard>
          <CCardHeader>
            <h5 id="cardTitle">{t('Log History List')}</h5>
          </CCardHeader>
          <CCardBody >
            <SearchLogHistoryList
              statusData={statusData}
              chooseStatus={chooseStatus}
              platformData={platformData}
              platformChange={platformChange}
              platformState={platformState}
              formNameState={formNameState}
              formNameChange={formNameChange}
              showFormSearchBox={() => showFormSearchBox(formSeachModalBox)}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
              handleFromDateChange={handleFromDateChange}
              handleToDateChange={handleToDateChange}
              removeFromDate={removeFromDate}
              removeToDate={removeToDate}
              searchClick={searchClick}
            />
            <LogHistoryListTable
              mainTable={mainTable}
              totalRow={totalRow}
              currentPage={currentPage} totalPage={totalPage}
              defaultPerPage={defaultPerPage} pageChange={pageChange}
            />
          </CCardBody>
          <LogHistoryListFormSearch
            errorModal={errorModal} removeMessageModal={removeMessageModal}
            formSeachModalBox={formSeachModalBox}
            autocompletedFormName={autocompletedFormName}
            formNameSelect={formNameSelect}
            formNameAPI={formNameAPI}
            changeAutoFormName={changeAutoFormName}
            btnAddFormSearchList={btnAddFormSearchList}
            btnCloseFormSearchList={btnCloseFormSearchList} />
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function LogHistoryList() {
  return (
    <Welcome />
  )
}