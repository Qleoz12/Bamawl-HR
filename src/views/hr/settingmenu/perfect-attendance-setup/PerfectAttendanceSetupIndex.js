/* eslint-disable no-use-before-define */

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from "@coreui/react";
import $ from "jquery";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { withTranslation } from "react-i18next";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isEmpty, validateNumberOnly } from "../../../hr/hr-common/common-validation/CommonValidation";
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import PerfectAttendanceSetupBox from "./PerfectAttendanceSetupBox";
import PerfectAttendanceSetupTable from "./PerfectAttendanceSetupTable";
import SaveAndCancelPerfectAttendanceSetup from "./SaveAndCancelPerfectAttendanceSetup";
import SearchPerfectAttendanceSetup from "./SearchPerfectAttendanceSetup";
import ViewPermision from '../../../brycen-common/constant/ViewPermission';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [deptState, setDeptState] = useState(""); // for show department name
  const [selectedDeptData, setSelectedDeptData] = useState(""); // for selected department id
  const [roleState, setRoleState] = useState(""); // for show role name
  const [selectedRoleData, setSelectedRoleData] = useState(""); // for selected role id
  const [fixedAmount, setFixedAmount] = useState(""); // for amount data
  const [fromDate, setFromDate] = useState(() => ChangeDate(new Date()));
  const [toDate, setToDate] = useState(() => ChangeDate(new Date()));
  const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
  const [overWriteModalBox, setOverWriteModalBox] = useState(false); // for overwrite save button confirmation
  const [selectedCurrentcies, setSelectedCurrentcies] = useState("");
  const [mainTable, setMainTable] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(""); // for row count
  const [editData, setEditData] = useState([]); // for Edit data
  const [joinDate, setJoinDate] = useState("");
  const [clearData, setClearData] = useState('');
  const [dept, setDept] = useState([]);
  const [deptID, setDeptID] = useState('');
  const [role, setRole] = useState([]);
  const [roleID, setRoleID] = useState('');
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory(); // For edit link

  const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For View_Permission API

  const typingTimeoutRef = useRef(null);    // keep value time out when rerender
  useEffect(() => {
    setLoading(true);
    get_role();
    loadCurency();
    get_department();
    loadViewPermission();
    setFromDate(null);
    setToDate(null);

    let edit_Data = JSON.parse(localStorage.getItem("RETURN_OT_RATE_DATA")); // return data from OT Rate List Form
    localStorage.removeItem("RETURN_OT_RATE_DATA");
    if (edit_Data != null) {
      $("#searchBtn").hide();
      let edit_id = edit_Data;
      setEditData(edit_id);
      editIndex(edit_id);
    }
  }, []);
  /** End Form Load */


  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  useEffect(() => {
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [clearData]);


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
      if (parseInt(response.data.view_permission) === ViewPermision.ONLY_ME) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
      }
    }
  };


  /** Change Auto Complete */

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
      let obj = { package_name: 'erp', url: `api/${ApiPath.customerName}/employee/${type}-autocomplete-search`, method: 'post', params: { search_item: i.target.value, company_id: ApiPath.companyID } }
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message); setClearData('clear');
      } else {
        (type === 'id') ? setIdArr(response.data.data) :
          (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
        setLoading(false);
      }
    }
  }

  const selectAutocomplete = async (val, obj) => {
    setClearData('clear');
    let object = { package_name: 'erp', url: ApiPath.employeeAutoCompleteResult, method: 'post', params: { id: obj.id, company_id: ApiPath.companyID } }
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError(response.message);
    } else {
      setEmployeeID(response.data.data[0].employee_id);
      setEmployeeName(response.data.data[0].name);
      setEmployeeCode(response.data.data[0].employee_code);
    }
  }
  /** End API for Employee */

  /** Start API for department */
  const get_department = async () => {
    setLoading(false);
    let obj = { package_name: 'erp', url: ApiPath.ERPGetDepartment, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDept([]) : setDept(response.data.data);
  }

  /** End API for department */

  /** Start API for admin lever */
  const get_role = async () => {
    setLoading(false);
    let url = `${ApiPath.adminLevels}?company_id=${ApiPath.companyID}`
    let obj = { package_name: 'hr', url: url, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setRole([]) : setRole(response.data.data);
  }

  /** End API for admin lever */

  /** Start API for Currency */
  const [curencyAPI, setCurencyAPI] = useState([]);
  const loadCurency = async () => {
    setLoading(false);
    let url = `${ApiPath.currencies}`
    let obj = { package_name: 'hr', url: url, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setCurencyAPI([]) : setCurencyAPI(response.data.data);
  }

  /** End API for Currency */

  let fixedAmountChange = (e) => {
    setFixedAmount(e.target.value);
  };
  let selectedCurrentcisChange = (e) => {
    setSelectedCurrentcies(parseInt(e.target.value));
  };
  /** End Dept, Role,Flag,Currency and Ot Title change function */

  /** Start Cancel All Data Function */
  let cancelData = () => {

    let errMsgAll = [];
    if (errMsgAll.length > 0) {

    } else {

      setError([]);
      setSuccess("");
    }

    $("#searchBtn").show();
    setEditData([]);
    setDeptID("");
    setRoleID("");
    setEmployeeID("");
    setEmployeeCode("");
    setEmployeeName("");
    setSelectedCurrentcies("");
    setFixedAmount();
    setMainTable([]);
    setFromDate(null);
    setToDate(null);
  };
  /** End Cancel All Data Function */


  /** Start Search Function */
  let searchAPI = async (object) => {
    setError([]);
    setSuccess("");
    // Validate
    if (fromDate != null && toDate === null) {
      let errMsg = t("JSE001").replace("%s", t("To Date"));
      setError([errMsg]);
    } else if (toDate != null && fromDate === null) {
      let errMsg = t("JSE001").replace("%s", t("From Date"));
      setError([errMsg]);
    } else if (fromDate > toDate) {
      const errMsg = t("JSE002").replace("%s", t("From Date")).replace("%s", t("To Date"));
      setError([errMsg]);
    } else if (toDate < fromDate) {
      const errMsg = t("JSE007").replace("%s", t("To Date")).replace("%s", t("From Date"));
      setError([errMsg]);
    } else {
      setLoading(true);
      let params = {
        company_id: ApiPath.companyID,
        role_id: roleID,
        employee_id: employeeID,
        employee_code: employeeCode,
        employee_name: employeeName,
        department_id: deptID,
        from_date: fromDate,
        to_date: toDate,
        language: ApiPath.lang,
        login_id: ApiPath.loginEmp
      }
      let obj = { package_name: 'hr', url: ApiPath.perfectAttendanceSetupSearch, method: 'post', params }
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setSuccess("");
        setMainTable([]);
        setLoading(false);
      } else {
        setRowCount(response.data.data.length);
        setMainTable(response.data.data);
        setFixedAmount("");
        setSelectedCurrentcies("");
        setError([]);
        setSuccess("");
        setLoading(false);
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

  let saveData = () => {
    let errMsgAll = [];
    setError([]);
    setSuccess("");
    // validate
    if (!fixedAmount) {
      const errMsg = t("JSE001").replace("%s", t("fixed amount"));
      errMsgAll.push(errMsg)
    } else
      if (!validateNumberOnly(fixedAmount)) {
        const errMsg = t("JSE005").replace("%s", t("fixed amount"));
        errMsgAll.push(errMsg)
      }
    if (!selectedCurrentcies) {
      const errMsg = t("JSE001").replace("%s", t("Payment Type"));
      errMsgAll.push(errMsg)
    }
    if (errMsgAll.length > 0) {
      setError([...errMsgAll]);
      setSuccess("");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setContent(t('Are you sure want to save?')); setType('save');
      setSaveModalBox(!saveModalBox);
      setError([]);
      setSuccess("");
    }
  };

  const saveOK = async () => {
    setSaveModalBox(!saveModalBox);
    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });
    if (editData == "") {
      //REGISTER MODE
      let SavePerfectAttendantSetup = {
        company_id: ApiPath.companyID, // login data from erp
        employee_id: emp_data,
        perfect_attendance_amount: parseInt(fixedAmount),
        currency_id: selectedCurrentcies,
        login_id: ApiPath.loginEmp, // login data from erp
        language: ApiPath.lang
      }
      setLoading(true);
      let params = {
        ...SavePerfectAttendantSetup
      }
      let obj = { package_name: 'hr', url: ApiPath.perfectAttendanceSetupSave, method: 'post', params };
      let response = await ApiRequest(obj);
      if (response.data.data && response.data.data.status && response.data.data.status === "NG" && typeof (response.data.data.message) === "string") {
        setContent(t('Data is already exist! Are you sure want to overwrite?')); setType('owsave');
        setOverWriteModalBox(!overWriteModalBox);
        setLoading(false);
      } else if (response.flag === false) {
        setError(response.message);
        setSuccess("");
        setLoading(false);
      } else {
        setError([]);
        setSuccess([response.data.message]);
        setDeptID("");
        setRoleID("");
        setFixedAmount("");
        setSelectedCurrentcies("");
        if (parseInt(viewPermissionAPI) !== 0) {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName("");
        }
        setMainTable([]);
        setLoading(false);
      }
    } else {
      // EDIT MODE
      let errMsgAll = [];
      if (errMsgAll.length > 0) {
        setError([...errMsgAll]);
        setSuccess("");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      let params = {
        company_id: ApiPath.companyID, // login data from erp
        employee_id: emp_data,
        perfect_attendance_amount: parseInt(fixedAmount),
        currency_id: selectedCurrentcies,
        login_id: ApiPath.loginEmp, // login data from erp
        language: ApiPath.lang
      }
      setLoading(true);
      let obj = { package_name: 'hr', url: ApiPath.perfectAttendanceSetup + editData, method: 'put', params };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setSuccess("");
        setLoading(false);
      } else {
        $("#searchBtn").show();
        setEditData([]);
        setDeptID("");
        setRoleID("");
        if (parseInt(viewPermissionAPI) !== 0) {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName("");
        }
        setFixedAmount("");
        setSelectedCurrentcies("");
        setMainTable([]);
        setFromDate(null);
        setToDate(null)
        setSuccess([response.data.message]);
        setLoading(false);
      }
    }
  };
  /** End Save/Update Function */

  /** Start Edit Function */
  let editIndex = async (edit_id) => {
    let obj = { package_name: 'hr', url: `${ApiPath.perfectAttendanceSetup}${edit_id}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(true);
    if (response.flag === false) {
      setError(response.message);
      setSuccess("");
      $("#searchBtn").show();
      setMainTable([]);
      setLoading(false);
    } else {
      setLoading(false);
      const object = response.data.data[0];
      setDeptState(isEmpty(object.departments[0].id) ? "" : object.departments[0].id);
      setRoleState(isEmpty(object.admin_level_id) ? "" : object.admin_level_id);
      setJoinDate(object.joined_date);
      setEmployeeID(object.employee_id);
      setEmployeeCode(object.employee_code);
      setEmployeeName(object.employee_name);
      setMainTable([object]);
      setFixedAmount(object.perfect_attendance_amount);
      setSelectedCurrentcies(object.currency_id);
      setError([]);
      setSuccess("");
    }
  };
  /** End Edit Function */

  /** Start Overwrite Save Function */
  const closeOWSaveAlert = () => {
    setOverWriteModalBox(!overWriteModalBox);
  };
  const owsaveOK = async () => {
    setOverWriteModalBox(!overWriteModalBox);
    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });

    let params = {
      company_id: ApiPath.companyID, // login data from erp
      employee_id: emp_data,
      perfect_attendance_amount: parseInt(fixedAmount),
      currency_id: selectedCurrentcies,
      login_id: ApiPath.loginEmp, // login data from erp
      language: ApiPath.lang
    }
    setLoading(true);
    let obj = { package_name: 'hr', url: ApiPath.perfectAttendanceSetupSaveOverwrite, method: 'post', params };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setSaveModalBox(!saveModalBox);
      setError(response.message);
      setSuccess("");
      setLoading(false);
    } else {
      setLoading(false);
      setError([]);
      setSuccess([response.data.message]);
      setDeptID("");
      setRoleID("");
      if (parseInt(viewPermissionAPI) !== 0) {
        setEmployeeID("");
        setEmployeeCode("");
        setEmployeeName("");
      }
      setFixedAmount("");
      setSelectedCurrentcies("");
      setMainTable([]);
      setFromDate(null);
      setToDate(null);
    }
  }
  /** End Overwrite Save Function */

  const cancelClick = () => {
    setOverWriteModalBox(false);
    setSaveModalBox(false);
  }

  return (
    <CRow>
      <CCol xs="12">
        <Message success={success} error={error} />
        <Loading start={loading} />
        <CCard>
          <CCardHeader><h5><CLabel className="m-0">{t('Perfect Attendance Setup')}</CLabel></h5></CCardHeader>
          <CCardBody>
            <SearchPerfectAttendanceSetup
              empID={employeeID} empName={employeeName} empCode={employeeCode} idArr={idArr} nameArr={nameArr} codeArr={codeArr}
              editData={editData}
              deptArr={dept} changeDept={i => setDeptID(i.target.value)} deptID={deptID}
              roleArr={role} changeRole={i => setRoleID(i.target.value)} roleID={roleID}
              fromDate={fromDate} toDate={toDate} changeFromDate={i => setFromDate(ChangeDate(i))} changeToDate={i => setToDate(ChangeDate(i))}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              editIndex={editIndex}
              setEmployeeID={setEmployeeID}
              roleState={roleState}
              joinDate={joinDate}
              setEmployeeName={setEmployeeName}
              setSelectedDeptData={setSelectedDeptData}
              isEmpty={isEmpty}
              setSelectedRoleData={setSelectedRoleData}
              setEmployeeCode={setEmployeeCode}
              deptState={deptState}
              searchAPI={searchAPI}
              viewPermissionAPI={viewPermissionAPI}
            />

            <PerfectAttendanceSetupTable
              mainTable={mainTable}
              rowCount={rowCount}
              removeRow={removeRow}
              editData={editData} />

            <PerfectAttendanceSetupBox
              mainTable={mainTable}
              curencyAPI={curencyAPI}
              selectedCurrentcies={selectedCurrentcies}
              selectedCurrentcisChange={selectedCurrentcisChange}
              fixedAmount={fixedAmount}
              fixedAmountChange={fixedAmountChange} />

            <SaveAndCancelPerfectAttendanceSetup
              mainTable={mainTable}
              saveData={saveData}
              cancelData={cancelData} />

            <Confirmation
              saveOK={saveOK}
              show={overWriteModalBox || saveModalBox}
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              saveModalBox={saveModalBox}
              owsaveOK={owsaveOK}
              cancel={cancelClick}
              closeOWSaveAlert={closeOWSaveAlert}
              overWriteModalBox={overWriteModalBox}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function PerfectAttendanceSetupIndex() {
  return <Welcome />;
}
