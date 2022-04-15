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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { default as ApiPath } from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ViewPermission from '../../../brycen-common/constant/ViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlankString, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import EmployeeRoleRegistrationTable from './EmployeeRoleRegistrationTable';
import SearchEmployeeRoleRegistration from './SearchEmployeeRoleRegistration';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {


  const [permission, setPermission] = useState(ViewPermission.All) // for view permission
  const [deptState, setDeptState] = useState(""); // for show department name

  const [rankState, setRankState] = useState(""); // for show rank name
  const [rankData, setRankData] = useState(""); // for show rank name

  const [roleState, setRoleState] = useState(""); // for show role name

  const [clearData, setClearData] = useState('');
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');

  const [roleNameState, setRoleNameState] = useState(""); // For role name dropdown toggle

  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date

  const [rowCount, setRowCount] = useState('');
  const [mainTable, setMainTable] = useState([]);

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState('');

  const [loading, setLoading] = useState(false);

  const [content, setContent] = useState('');
  const [type, setType] = useState('');



  const typingTimeoutRef = useRef(null);    // keep value time out when rerender
  // Loaded initially
  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadRank();
    loadRole();
    loadDept();
  }, [loadRank, loadRole, loadDept, loadViewPermission]);

  /**
    * If error state or success state is changed, scroll automatically to top
  */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  /**
     * If clearData is changed, remove array in autocomplete
  */
  useEffect(() => {
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [clearData]);

  /* Get Employee Autocomplete  Start*/
  const changeAutocomplete = async (type, i) => {
    setError([]); setSuccess([]); setClearData('');

    // type is id, show name in Employee ID and clear remain input
    if (type === 'id') {
      setEmployeeID(i.target.value); setEmployeeCode(''); setEmployeeName('');
    }
    // type is code, show name in Employee Code and clear remain input
    else if (type === 'code') {
      setEmployeeID(''); setEmployeeCode(i.target.value); setEmployeeName('');
    }
    // type is name, show name in Employee Name and clear remain input
    else {
      setEmployeeID(''); setEmployeeCode(''); setEmployeeName(i.target.value);
    }

    // if empty, remove data from autocomplete
    if (i.target.value === '') {
      setClearData('clear');
    } else {
      let obj = {
        package_name: 'erp',
        url: `api/${ApiPath.customerName}/employee/${type}-autocomplete-search`,
        method: 'post',
        params: { search_item: i.target.value, company_id: ApiPath.companyID }
      }
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message); setClearData('clear');
      } else {
        (type === 'id') ? setIdArr(response.data.data) :
          (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
      }
    }
  }

  const selectAutocomplete = async (val, obj) => {
    setClearData('clear');
    let object = {
      package_name: 'erp',
      url: ApiPath.employeeAutoCompleteResult,
      method: 'post',
      params: { id: obj.id, company_id: ApiPath.companyID }
    };
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError(response.message);
    } else {
      setEmployeeID(response.data.data[0].employee_id);
      setEmployeeName(response.data.data[0].name);
      setEmployeeCode(response.data.data[0].employee_code);
    }
  }

  /* Get Employee Autocomplete  End*/

  /* GET VIEW PERMISSION */
  const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setPermission(parseInt(response.data.view_permission));
      if (parseInt(response.data.view_permission) === ViewPermission.ONLY_ME) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
      }
    }
  };

  /* Start Get Data Select Box */
  let deptChange = (e) => {
    setDeptState(e.target.value);
  }
  let rankChange = (e) => {
    setRankState(e.target.value);
    setRankData(e.target[e.target.selectedIndex].getAttribute("id"))
  }
  let roleChange = (e) => {
    setRoleState(e.target.value);
  }
  let roleNameChange = (e) => {
    setRoleNameState(e.target.value);
  }
  /* End Get Data Select Box */


  /* START GET RANK SELECT BOX */
  const [rankAPI, setRankAPI] = useState([]);
  const loadRank = useCallback(async () => {
    let obj = {
      package_name: 'erp',
      url: ApiPath.ERPGetAllPosition,
      method: 'get',
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      let rankArr = []
      let rankAPIData = []
      if (response.data.data.length > 0) {
        response.data.data.map(item => rankArr.push(item.position_rank))
      }
      let unique = rankArr.filter((item, i, ar) => ar.indexOf(item) === i);
      unique.map((i, index) => {
        let rankData = {
          id: index,
          position_rank: i
        }
        rankAPIData.push(rankData);
      })
      setRankAPI(rankAPIData);
    }
  }, []);
  /* END GET RANK SELECT BOX */

  /* START GET ROLE NAME SELECT BOX */
  const [roleAPI, setRoleAPI] = useState([]);
  const loadRole = useCallback(async () => {
    let obj = {
      package_name: 'hr',
      url: ApiPath.adminLevels + "?company_id=" + ApiPath.companyID,
      method: 'get',
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setRoleAPI(response.data.data);
    }
  }, []);
  /* END GET ROLE NAME SELECT BOX */

  /* START GET DEPARTMENT SELECT BOX */
  const [departmentAPI, setDepartmentAPI] = useState([]);
  const loadDept = useCallback(async () => {
    let obj = {
      package_name: 'erp',
      url: ApiPath.ERPGetAllDepartment,
      method: 'get'
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setDepartmentAPI(response.data.data);
    }
  }, []);
  /* END GET DEPARTMENT SELECT BOX */


  /* START SEARCH API */
  const [requestState, setRequestState] = useState();
  const fnSearch = useCallback(() => {
    setError([]);
    setSuccess('');
    let fromDate = null;
    let toDate = null;
    if (selectedFromDate != null) {
      fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
    } else {
      fromDate = selectedFromDate;
    }
    if (selectedToDate != null) {
      toDate = Moment(selectedToDate).format('YYYY-MM-DD');
    } else {
      toDate = selectedToDate;
    }
    if (fromDate != null && toDate == null) {
      let errMsg = t('JSE001').replace('%s', t('To Date'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (toDate != null && fromDate == null) {
      let errMsg = t('JSE001').replace('%s', t('From Date'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (fromDate > toDate) {
      let errMsg = t('JSE007').replace('%s', t('To Date')).replace('%s', t('From Date'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      const request = {
        department_id: deptState,
        role_id: roleState,
        position_rank: rankData,
        from_date: fromDate,
        to_date: toDate,
        employee_id: employeeID,
        employee_name: employeeName,
        employee_code: employeeCode,
        company_id: ApiPath.companyID,
        language: ApiPath.lang
      }
      setRequestState(request);
      searchAPI(request);
    }
  });
  const searchAPI = async (request) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError([]);
      setSuccess('');
      let params = request;
      let obj = {
        package_name: 'hr',
        url: ApiPath.employeeRoleRegistrationSearch,
        method: 'post',
        params
      }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag !== false) {
        setRowCount(t("Total Rows").replace('%s', response.data.row_count));
        setMainTable(response.data.data);
        setAllCheck(false);
        setCheckBoxIdList([]);
        setError([]);
        setSuccess('');
      } else {
        setError(response.message);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    }, 300);
  }
  /* END SEARCH API */

  /* START CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [checkBoxIdList, setCheckBoxIdList] = useState([]); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];

    if (value === "all-check") {
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map(item =>
        parseInt(item.employee_id) === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked) {
        id_list.push(data[i].employee_id);
      }
    }
    setCheckBoxIdList(id_list);

    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }
  /* END CHECKBOX ACTION */

  /* Show dropdown toggle */


  let handleFromDateChange = (e) => {
    setSelectedFromDate(e);
  };
  let handleToDateChange = (e) => {
    setSelectedToDate(e);
  };
  let removeFromDate = () => {
    setSelectedFromDate(null);
  }
  let removeToDate = () => {
    setSelectedToDate(null);
  }

  /* resetForm */
  const resetForm = () => {
    setDeptState('')
    setRankState('')
    setRoleState('')
    if (permission !== ViewPermission.ONLY_ME) {
      setEmployeeID('')
      setEmployeeCode('')
      setEmployeeName('')
    }
    setRoleNameState('')
    setSelectedFromDate(null)
    setSelectedToDate(null)
  }
  /* resetForm */



  /* Validate */
  function validateSave() {
    setError([]);
    let allError = [];
    let check = true;
    if (!checkNullOrBlankString(roleNameState)) {
      let errMsg = t("JSE001").replace('%s', t('Set Role Name'))
      allError.push(errMsg);
      check = false;
    }
    if (isEmpty(checkBoxIdList)) {
      let errMsg = t("JSE001").replace('%s', t('Employee ID'))
      allError.push(errMsg);
      check = false;
    }
    setError(allError);
    if (check)
      return true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function validateSaveOW() {
    setError([]);
    let allError = [];
    if (isEmpty(checkBoxIdList)) {
      let errMsg = t("JSE001").replace('%s', t('Employee ID'))
      allError.push(errMsg);
    }
    else return true;
    setError([allError]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  function validateDelete() {
    setError([]);
    let allError = [];
    if (isEmpty(checkBoxIdList)) {
      let errMsg = t('JSE001').replace('%s', t('Employee ID'));
      allError.push(errMsg);
    } else return true;
    setError(allError);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  /* Validate */

  /* START  DELETE  */
  const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide
  const deleteToggleAlert = () => {
    if (validateDelete()) {
      setContent(t('Are you sure want to delete?'))
      setType('delete')
      setDeleteModalBox(!deleteModalBox);
    }
  }
  const deleteOK = async () => {
    setDeleteModalBox(!deleteModalBox);
    setLoading(true);
    let obj = {
      package_name: 'hr',
      url: ApiPath.employeeRoleRegistrationDelete + checkBoxIdList + '?company_id=' + ApiPath.companyID + "&language=" + ApiPath.lang,
      method: 'delete'
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setSuccess([response.data.message]);
      setRoleNameState("");
      setTimeout(function () {
        searchAPI(requestState);
      }, 2500);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* END  DELETE */

  /* START SAVE  */
  const [saveModalBox, setSaveModalBox] = useState(false); // Edit confirm box show or hide
  const saveToggleAlert = (e) => {
    if (validateSave()) {
      setContent(t('Are you sure want to save?'));
      setType('save')
      setSaveModalBox(!saveModalBox);
    }

  }
  const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  }
  const saveOK = async () => {
    setLoading(true)
    setSaveModalBox(!saveModalBox);
    let saveList = [...checkBoxIdList];
    let params = {
      employee_id: saveList,
      role_id: roleNameState,
      login_id: ApiPath.loginEmp,
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    };
    let obj = {
      package_name: 'hr',
      url: ApiPath.employeeRoleRegistrationSave,
      method: 'post',
      params
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setSuccess([response.data.message]);
      setError([]);
      setRoleNameState("");
      setTimeout(function () {
        searchAPI(requestState);
      }, 2500);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setError([]);
      saveOverWriteToggleAlert();
    }
  }
  /* END SAVE  */

  /* START SAVE OVERWRITE  */
  const [saveOverWriteModalBox, setSaveOverWriteModalBox] = useState(false); // Edit confirm box show or hide

  const closeOWSaveAlert = () => {
    if (validateSaveOW())
      setSaveOverWriteModalBox(!saveOverWriteModalBox);
  }
  const saveOverWriteToggleAlert = () => {
    setContent(t('Data is already exist! Are you sure want to overwrite?'));
    setType('owsave')
    setSaveOverWriteModalBox(!saveOverWriteModalBox);
  }
  const saveOverWriteOK = async () => {
    setLoading(true)
    setSaveOverWriteModalBox(!saveOverWriteModalBox);
    let saveList = [...checkBoxIdList];
    let params = {
      employee_id: saveList,
      role_id: roleNameState,
      login_id: ApiPath.loginEmp,
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    };
    let obj = {
      package_name: 'hr',
      url: ApiPath.employeeRoleRegistrationSaveOverWrite,
      method: 'post',
      params
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setSuccess([response.data.message]);
      setError([]);
      setRoleNameState("");
      setTimeout(function () {
        searchAPI(requestState);
      }, 2500);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* END SAVE OVERWRITE  */


  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h5 id="cardTitle"><CLabel>{t('Employee Role Registration')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <SearchEmployeeRoleRegistration
              permission={permission}
              ViewPermission={ViewPermission}

              departmentAPI={departmentAPI}
              deptChange={deptChange}
              deptState={deptState}

              rankChange={rankChange}
              rankAPI={rankAPI}
              rankState={rankState}

              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}

              selectedFromDate={selectedFromDate}
              handleFromDateChange={handleFromDateChange}
              removeFromDate={removeFromDate}
              selectedToDate={selectedToDate}
              handleToDateChange={handleToDateChange}
              removeToDate={removeToDate}

              roleAPI={roleAPI}
              roleChange={roleChange}
              roleState={roleState}

              searchAPI={() => fnSearch()}
            />
            <EmployeeRoleRegistrationTable
              mainTable={mainTable}
              rowCount={rowCount}

              AllCheck={AllCheck}
              change_checkbox={change_checkbox}

              saveToggleAlert={saveToggleAlert}
              saveModalBox={saveModalBox}
              setSaveModalBox={setSaveModalBox}
              closeSaveAlert={closeSaveAlert}
              saveOK={saveOK}

              content={content}
              type={type}

              saveOverWriteModalBox={saveOverWriteModalBox}
              closeOWSaveAlert={closeOWSaveAlert}
              saveOverWriteOK={saveOverWriteOK}
              setSaveOverWriteModalBox={setSaveOverWriteModalBox}

              deleteToggleAlert={deleteToggleAlert}
              deleteModalBox={deleteModalBox}
              setDeleteModalBox={setDeleteModalBox}
              deleteOK={deleteOK}

              roleAPI={roleAPI}
              roleNameChange={roleNameChange}
              roleNameState={roleNameState}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function EmployeeRoleRegistration() {
  return (
    <Welcome />
  )
}