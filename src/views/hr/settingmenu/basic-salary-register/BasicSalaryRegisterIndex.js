/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from "@coreui/react";
import $ from "jquery";
import Moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { default as ApiPath } from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from "../../../brycen-common/api-request/ApiRequest";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from "../../../brycen-common/loading/Loading";
import Message from "../../../brycen-common/message/Message";
import { isEmpty, validateNumberOnly } from "../../../hr/hr-common/common-validation/CommonValidation";
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import BasicSalaryRegisterAmountBox from './BasicSalaryRegisterAmountBox';
import BasicSalaryRegisterFromToBox from "./BasicSalaryRegisterFromToBox";
import BasicSalaryRegisterTable from "./BasicSalaryRegisterTable";
import SaveAndCancelBasicSalaryRegister from './SaveAndCancelBasicSalaryRegister';
import SearchBasicSalaryRegister from './SearchBasicSalaryRegister';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory(); // For edit link
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [monthState, setMonthState] = useState(""); // for show Month State
  const [monthStateTo, setMonthStateTo] = useState(""); // for show Month State To
  const [deptState, setDeptState] = useState(""); // for show department name
  const [roleState, setRoleState] = useState(""); // for show role name
  const [selectedFromDate, setSelectedFromDate] = useState(null); //for Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null); //for Joined End Date
  const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
  const [overWriteModalBox, setoverWriteModalBox] = useState(false); // for overwrite save button confirmation
  const [fixedAmount, setFixedAmount] = useState(""); // for amount data
  const [expYearFrom, setExpYearFrom] = useState(""); // for Exp Year From
  const [expYearTo, setExpYearTo] = useState(""); // for Exp To From
  const [expMonthFrom, setExpMonthFrom] = useState(""); // for Exp Month From
  const [expMonthTo, setExpMonthTo] = useState(""); // for Exp Month To
  const [monthData, setMonthData] = useState(""); // for show Month Data From
  const [mainTable, setMainTable] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(""); // for row count
  const [selectedCurrentcies, setSelectedCurrentcies] = useState("");
  const [editData, setEditData] = useState([]); // for Edit data
  const [joinedDate, setJoinedDate] = useState(null)
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [clearData, setClearData] = useState('');
  const [viewPermissionAPI, setViewPermissionAPI] = useState('');   // For View_Permission API


  /** Start Form Load */
  useEffect(() => {
    setLoading(true);
    loadRole();
    loadDept();
    loadCurency();
    MockMonthData();
    loadViewPermission();

    let edit_Data = JSON.parse(sessionStorage.getItem("BASICSALARY_LIST_ID_DATA")); // return data from OT Rate List Form
    sessionStorage.removeItem("BASICSALARY_LIST_ID_DATA");
    if (edit_Data != null) {
      $("#searchBtn").hide();
      let edit_id = edit_Data;
      setEditData(edit_id);
      editIndex(edit_id);
    }

  }, [loadRole, loadDept, loadCurency, MockMonthData, loadViewPermission]);
  /** End Form Load */
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

  /* GET ROLE SELECT BOX */
  const [roleAPI, setRoleAPI] = useState([]);
  const loadRole = async () => {
    let params = {
      company_id: ApiPath.companyID
    }
    let obj = { package_name: 'hr', url: ApiPath.adminLevels, method: 'get', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setRoleAPI(response.data.data);
    }
  }

  let roleChange = (e) => {
    setRoleState(e.target.value);
  }

  /** Start API for Department */
  const [departmentAPI, setDepartmentAPI] = useState([]);
  const loadDept = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setDepartmentAPI(response.data.data);
    }
  };

  let deptChange = (e) => {
    setDeptState(e.target.value);
  }

  /** End API for department */

  /* MOCK DATA  TO SELECT BOX */
  const MockMonthData = useCallback(() => {
    let data = []
    for (let i = 0; i <= 11; i++) {
      data.push({
        month: i.toString(),
      });
    }
    setMonthData(data);
  })

  /*END MOCK DATA TO  SELECT BOX */



  /** Start API for Currency */
  const [curencyAPI, setCurencyAPI] = useState([]);
  const loadCurency = async () => {
    let obj = { package_name: 'hr', url: ApiPath.currencies, method: 'get' }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setCurencyAPI(response.data.data);
    }
  }

  /* GET VIEW PERMISSION */
  const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setViewPermissionAPI(response.data.view_permission);
      if (parseInt(response.data.view_permission) === 0) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id);
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code);
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng);
      }
    }
  };

  /** Start get Joined Date Value Function */
  const theChosenJoinStartDate = () => {
    const chosenJoinedDate = selectedFromDate;
    if (chosenJoinedDate != null) {
      return chosenJoinedDate
        ? t("From") +
        ": " +
        Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(chosenJoinedDate)
        : t("From Date");
    } else {
      return chosenJoinedDate
        ? t("From") + ": " + Intl.DateTimeFormat()
        : t("From Date");
    }
  };


  /** start API for Chosen Month From */

  const theChosenMonthFrom = () => {
    const chosenMonth = monthState;
    return chosenMonth ? chosenMonth : t('Select Month');
  }
  /** end API for Chosen Month From */



  /** start API for Chosen Month To */

  const theChosenMonthTo = () => {
    const chosenMonth = monthStateTo;
    return chosenMonth ? chosenMonth : t('Select Month');
  }
  /** end API for Chosen Month From */



  /** Start get Joined Date Value Function */
  const theChosenJoinEndDate = () => {
    const chosenJoinedDate = selectedToDate;
    if (chosenJoinedDate != null) {
      return chosenJoinedDate
        ? t("To") +
        ": " +
        Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(chosenJoinedDate)
        : t("To Date");
    } else {
      return chosenJoinedDate
        ? t("To") + ": " + Intl.DateTimeFormat()
        : t("To Date");
    }
  };

  let removeFromDate = () => {
    setSelectedFromDate(null);
  };
  let removeToDate = () => {
    setSelectedToDate(null);
  };
  /** End get Joined Date Value Function */

  /** Start Dept, Role  function */
  let selectedCurrentcisChange = (e) => {
    setSelectedCurrentcies(e.target.value);
  };
  let fixedAmountChane = (e) => {
    setFixedAmount(e.target.value);
  };
  let fixedExpYearFromChane = (e) => {
    setExpYearFrom(e.target.value);
  };

  let fixedExpYearToChane = (e) => {
    setExpYearTo(e.target.value);
  };
  let monthFromChange = (e) => {
    setExpMonthFrom(parseInt(e.target.value));
  };
  let monthToChange = (e) => {
    setExpMonthTo(parseInt(e.target.value));
  };

  /** Start Cancel All Data Function */
  let cancelData = () => {
    let errMsgAll = [];
    if (errMsgAll.length > 0) {

    } else {

      setError([]);
      setSuccess([]);
    }
    $("#searchBtn").show();
    setEditData("");
    setDeptState("");
    setRoleState("");
    setExpYearFrom("");
    setExpYearTo("");
    setSelectedCurrentcies("");
    setMonthState("");
    setMonthStateTo("");
    setExpMonthTo("");
    setExpMonthFrom("");
    setFixedAmount("");
    setEmployeeID("");
    setEmployeeCode("");
    setEmployeeName("");
    setMainTable([]);
    setSelectedFromDate(null);
    setSelectedToDate(null);
  };
  /** End Cancel All Data Function */

  /** Start Search Function */
  let searchAPI = async (page = 1, object) => {
    let fromDate = null;
    let toDate = null;
    setError([]);
    setSuccess([]);
    setExpYearFrom("");
    setExpYearTo("");
    setSelectedCurrentcies("");
    setMonthState("");
    setMonthStateTo("");
    setExpMonthTo("");
    setExpMonthFrom("");
    setFixedAmount("");



    if (selectedFromDate != null) {
      // fromDate = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(selectedFromDate);
      fromDate = Moment(selectedFromDate).format("YYYY-MM-DD");
    } else {
      fromDate = selectedFromDate;
    }

    if (selectedToDate != null) {
      // toDate = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(selectedToDate);
      toDate = Moment(selectedToDate).format("YYYY-MM-DD");

    } else {
      toDate = selectedToDate;
    }
    if (fromDate != null && toDate == null) {
      let errMsg = t('JSE001').replace('%s', t('To Date'));
      setError([errMsg]);
    } else if (toDate != null && fromDate == null) {
      let errMsg = t('JSE001').replace('%s', t('From Date'));
      setError([errMsg]);
    } else if (fromDate > toDate) {
      let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
      setError([errMsg]);
    } else if (toDate < fromDate) {
      let errMsg = t('JSE007').replace('%s', t('To Date')).replace('%s', t('From Date'));
      setError([errMsg]);
    } else {
      setError([]);
      setSuccess([]);
      setLoading(true);
      let params = {
        company_id: ApiPath.companyID,
        role_id: roleState,
        employee_id: object ? object.id : employeeID,
        employee_code: object ? object.code : employeeCode,
        employee_name: object ? object.name : employeeName,
        department_id: deptState,
        from_date: fromDate,
        to_date: toDate,
        language: ApiPath.lang
      }
      let obj = { package_name: 'hr', url: ApiPath.employeeBasicSalaryRegistrationSearch, method: 'post', params }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag == false) {
        setRowCount('');
        setError(response.message);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setMainTable([]);
      }
      else {
        setRowCount(response.data.data.length);
        setMainTable(response.data.data);
        setError([]);
        setSuccess([]);
      }
    }
  };
  /** End Search Function */

  /** Start Click remove function */
  const removeRow = (e) => {

    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.employee_id != e["employee_id"]);
    setMainTable(result_data);
    setRowCount(rowCount - 1);
  };
  /** End remove function */

  /** Start Save/Update function */
  const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  };
  let saveData = () => {
    let errMsgAll = [];

    if (isEmpty(expYearFrom)) {
      const errMsg = t("JSE124").replace("%s", t("Year From"));
      errMsgAll.push(errMsg);
    }
    if (!isEmpty(expYearFrom) && !validateNumberOnly(expYearFrom)) {
      const errMsg = t("JSE005").replace("%s", t("Year Form"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(expMonthFrom)) {
      const errMsg = t("JSE001").replace("%s", t("Month From"));
      errMsgAll.push(errMsg);
    }
    if (!isEmpty(expMonthFrom) && !validateNumberOnly(expMonthFrom)) {
      const errMsg = t("JSE001").replace("%s", t("Month Form"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(expYearTo)) {
      const errMsg = t("JSE124").replace("%s", t("Year To"));
      errMsgAll.push(errMsg);
    }
    if (!isEmpty(expYearTo) && !validateNumberOnly(expYearTo)) {
      const errMsg = t("JSE005").replace("%s", t("Year To"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(expMonthTo)) {
      const errMsg = t("JSE001").replace("%s", t("Month To"));
      errMsgAll.push(errMsg);
    }
    if (!isEmpty(expMonthTo) && !validateNumberOnly(expMonthTo)) {
      const errMsg = t("JSE001").replace("%s", t("Month To"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(fixedAmount)) {
      const errMsg = t("JSE124").replace("%s", t("Payment Amount"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(selectedCurrentcies)) {
      const errMsg = t("JSE001").replace("%s", t("Payment type"));
      errMsgAll.push(errMsg);
    }
    if (!isEmpty(fixedAmount) && !validateNumberOnly(fixedAmount)) {
      const errMsg = t("JSE005").replace("%s", t("Payment Amount"));
      errMsgAll.push(errMsg);
    }

    if (errMsgAll.length > 0) {
      setError([...errMsgAll]);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setSaveModalBox(!saveModalBox);
      setContent(t('Are you sure want to save?')); setType('save');
      setError([]);
      setSuccess([]);
    }
  };
  const saveOK = async () => {
    setSaveModalBox(!saveModalBox);
    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });
    //saveData();
    if (editData == "") {
      //REGISTER MODE
      let params = {
        company_id: ApiPath.companyID, // login data from erp
        employee_id: emp_data,
        basic_amount: parseInt(fixedAmount),
        currency_id: selectedCurrentcies,
        exp_year_from: parseInt(expYearFrom),
        exp_year_to: parseInt(expYearTo),
        exp_month_from: expMonthFrom,
        exp_month_to: expMonthTo,
        created_emp: ApiPath.createdEmp, // login data from erp
        updated_emp: ApiPath.updatedEmp,
        language: ApiPath.lang
      }
      setLoading(true);
      let obj = { package_name: 'hr', url: ApiPath.empBasicSalarySave, method: 'post', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.data.data && response.data.data.status && response.data.data.status === "NG" && typeof (response.data.data.message) === "string") {
        setoverWriteModalBox(!overWriteModalBox);
        setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
      }
      else if (response.flag === false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([]);
        setSuccess([response.data.message]);
        setEditData("");
        if (parseInt(viewPermissionAPI) !== 0) {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName("");
        }
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setExpYearFrom("");
        setFixedAmount("");
        setExpMonthFrom("");
        setExpYearTo("");
        setExpMonthTo("");
        setSelectedCurrentcies("");
        setRoleState("");
        setMonthStateTo("");
        setMonthState("");
        setDeptState("");
      }
    } else {
      // EDIT MODE
      let params = {
        company_id: ApiPath.companyID, // login data from erp
        employee_id: emp_data,
        basic_amount: parseInt(fixedAmount),
        currency_id: selectedCurrentcies,
        exp_year_from: parseInt(expYearFrom),
        exp_year_to: parseInt(expYearTo),
        exp_month_from: expMonthFrom,
        exp_month_to: expMonthTo,
        login_id: ApiPath.loginEmp,
        language: ApiPath.lang
      }
      setLoading(true);
      let url = `${ApiPath.empBasicSalaryUpdate}${editData}`
      let obj = { package_name: 'hr', url: url, method: 'put', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      else {
        $("#searchBtn").show();
        setEditData("");
        if (parseInt(viewPermissionAPI) !== 0) {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName("");
        }
        setMainTable([]);
        setSelectedFromDate(null);
        setSelectedToDate(null);
        setError([]);
        setSuccess([response.data.message]);
        setExpYearFrom("");
        setFixedAmount("");
        setExpMonthFrom("");
        setExpYearTo("");
        setExpMonthTo("");
        setSelectedCurrentcies("");
        setRoleState("");
        setMonthStateTo("");
        setMonthState("");
        setDeptState("");
      }
    }
  };
  /** End Save/Update Function */

  /** Start Edit Function */
  let editIndex = async (edit_id) => {
    setLoading(true);
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    }
    let url = `${ApiPath.empBasicSalaryDetail}${edit_id}`;
    let obj = { package_name: 'hr', url: url, method: 'get', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    else {
      const object = response.data.data[0];
      setDeptState(object.departments[0].id);
      setRoleState(isEmpty(object.admin_level_id) ? "" : object.admin_level_id);
      setEmployeeID(object.employee_id);
      setEmployeeCode(object.employee_code);
      setEmployeeName(object.employee_name);
      setFixedAmount(object.basic_amount);
      setSelectedCurrentcies(object.currency_id);
      setExpYearFrom(object.exp_year_from);
      setExpYearTo(object.exp_year_to);
      setExpMonthFrom(object.exp_month_from);
      setExpMonthTo(object.exp_month_to);
      setMonthStateTo(object.exp_month_to);
      setMonthState(object.exp_month_from);
      setJoinedDate(Moment(object.joined_date).format('MM/DD/YYYY'));
      setMainTable([object]);
      setSelectedFromDate(object.joined_date ? (Moment(object.joined_date).format('MM/DD/YYYY')) : null);
      setSelectedToDate(object.joined_date ? (Moment(object.joined_date).format('MM/DD/YYYY')) : null);
      setError([]);
      setSuccess([]);
    }
  }
  /** End Edit Function */

  /** Start Overwrite Save Function */
  const closeOWSaveAlert = () => {
    setoverWriteModalBox(!overWriteModalBox);
  };
  const owsaveOK = async () => {
    setoverWriteModalBox(!overWriteModalBox);
    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });
    setLoading(true);
    let params = {
      company_id: ApiPath.companyID, // login data from erp
      employee_id: emp_data,
      basic_amount: parseInt(fixedAmount),
      currency_id: selectedCurrentcies,
      exp_year_from: parseInt(expYearFrom),
      exp_year_to: parseInt(expYearTo),
      exp_month_from: expMonthFrom,
      exp_month_to: expMonthTo,
      login_id: ApiPath.loginEmp,
      language: ApiPath.lang,
    }
    let obj = { package_name: 'hr', url: ApiPath.empBasicSalarySaveOverwrite, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      setSuccess([response.data.message]);
      setEditData("");
      setEmployeeID("");
      setEmployeeCode("");
      setEmployeeName("");
      setMainTable([]);
      setSelectedFromDate(null);
      setSelectedToDate(null);
      setExpYearFrom("");
      setFixedAmount("");
      setExpMonthFrom("");
      setExpYearTo("");
      setExpMonthTo("");
      setSelectedCurrentcies("");
      setRoleState("");
      setMonthStateTo("");
      setMonthState("");
    }
  }
  /** End Overwrite Save Function */

  const cancelClick = () => {
    setSaveModalBox(false);
    setoverWriteModalBox(false);
  }

  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <CCard io="formCard">
          <CCardHeader>
            <h5>{t("Basic Salary Registration")}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchBasicSalaryRegister
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}

              viewPermissionAPI={viewPermissionAPI}
              joinedDate={joinedDate}
              departmentAPI={departmentAPI}
              deptState={deptState}
              deptChange={deptChange}
              roleAPI={roleAPI}
              roleState={roleState}
              roleChange={roleChange}
              theChosenJoinStartDate={theChosenJoinStartDate}
              theChosenJoinEndDate={theChosenJoinEndDate}
              selectedFromDate={selectedFromDate}
              handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
              selectedToDate={selectedToDate}
              handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
              removeFromDate={removeFromDate}
              removeToDate={removeToDate}
              searchAPI={searchAPI}
              editData={editData} />
            <BasicSalaryRegisterTable
              mainTable={mainTable}
              rowCount={rowCount}
              removeRow={removeRow}
              editData={editData} />
            <BasicSalaryRegisterFromToBox
              mainTable={mainTable}
              monthToChange={monthToChange}
              monthFromChange={monthFromChange}

              fixedExpYearFromChane={fixedExpYearFromChane}
              expYearFrom={expYearFrom}
              theChosenMonthFrom={theChosenMonthFrom}
              setMonthState={setMonthState}
              monthData={monthData}
              isEmpty={isEmpty}
              expMonthFrom={expMonthFrom}
              setExpMonthFrom={setExpMonthFrom}
              expYearTo={expYearTo}
              fixedExpYearToChane={fixedExpYearToChane}
              theChosenMonthTo={theChosenMonthTo}
              setMonthStateTo={setMonthStateTo}
              expMonthTo={expMonthTo}
              setExpMonthTo={setExpMonthTo} />
            <BasicSalaryRegisterAmountBox
              mainTable={mainTable}
              fixedAmount={fixedAmount}
              fixedAmountChane={fixedAmountChane}
              fixedAmount={fixedAmount}
              curencyAPI={curencyAPI}
              selectedCurrentcisChange={selectedCurrentcisChange}
              selectedCurrentcies={selectedCurrentcies}
              setSelectedCurrentcies={setSelectedCurrentcies} />
            <SaveAndCancelBasicSalaryRegister
              mainTable={mainTable}
              cancelData={cancelData}
              saveData={saveData} />
            <Confirmation
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              show={saveModalBox || overWriteModalBox}
              cancel={cancelClick}

              overWriteModalBox={overWriteModalBox}
              saveOK={saveOK}
              closeSaveAlert={closeSaveAlert}
              closeOWSaveAlert={closeOWSaveAlert}
              owsaveOK={owsaveOK} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function BasicSalaryRegister() {
  return <Welcome />;
}
