import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty, checkNullOrBlank } from '../../../hr/hr-common/common-validation/CommonValidation';
import SearchOvertimeList from './SearchOvertimeList';
import OvertimeListTable from './OvertimeListTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

function LegacyWelcomeClass({ t }) {
  const history = useHistory();   // For edit link
  const [error, setError] = useState([]);   // For Error Message
  const [success, setSuccess] = useState("");   // For Success Message
  const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
  const [roleAPI, setRoleAPI] = useState([]);   // For Role API
  const [otNameAPI, setOTNameAPI] = useState([]);   // For Overitme API
  const [deptState, setDeptState] = useState();     // For department dropdown toggle
  const [roleState, setRoleState] = useState();     // For role dropdown toggle
  const [overtimeState, setOvertimeState] = useState();     // For overtime name dropdown toggle
  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date
  const [mainTable, setMainTable] = useState([]);   // For Main Table
  const [rowCount, setRowCount] = useState();     // For row count
  const [AllCheck, setAllCheck] = useState(false);// For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState('');   // For delete data list
  const [editModalBox, setEditModalBox] = useState(false);// Edit confirm box show or hide
  const [editID, setEditID] = useState('');   // For Edit ID
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(0);    // total row per page
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);// For show/hide confirmation box
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [clearData, setClearData] = useState('');
  const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

  /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  /**
      * Page Load
      *
      * @author  v_hao
      * @create  29/07/2021 (D/M/Y)
      * @param
      * @return
      */
  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadRole();
    loadDept();
    loadOTName();
  }, []);

      /**
    * GET VIEW PERMISSION
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
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
    if (response.flag !== false) {
      setViewPermissionAPI(response.data.view_permission);
      if (parseInt(response.data.view_permission) === 0) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
      }
    }
  };

  /**
    * change autocomplete
    *
    * @author  v_hao
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
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

  /**
  * select autocomplete
  *
  * @author  v_hao
  * @create  29/07/2021 (D/M/Y)
  * @param
  * @return
  */
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

  /**
  * Load Department
  *
  * @author  v_hao
  * @create  29/07/2021 (D/M/Y)
  * @param
  * @return
  */
  const loadDept = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
  };
  let deptChange = (e) => {
    setDeptState(e.target.value);
  }

  /**
  * Load Role
  *
  * @author  v_hao
  * @create  29/07/2021 (D/M/Y)
  * @param
  * @return
  */
  const loadRole = async () => {
    let params = {
      company_id: ApiPath.companyID,
    }
    let obj = { package_name: 'hr', url: ApiPath.adminLevels, method: 'get', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
  };
  let roleChange = (e) => {
    setRoleState(e.target.value);
  }
  /** end API for role */

  /**
  * Load Overtime Title
  *
  * @author  v_hao
  * @create  08/07/2021 (D/M/Y)
  * @param
  * @return
  */
  const loadOTName = async () => {
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeOvertimeGetRate, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setOTNameAPI([]);
    } else {
      setOTNameAPI(response.data.data);
    }
  }

  let overtimeChange = (e) => {
    setOvertimeState(e.target.value);
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

  /** Search Function */
  const [requestState, setRequestState] = useState();
  const fnSearch = useCallback => {
    clearAllBeforeSearch();

    let arrMsg = [];
    setError([]);
    setSuccess('');
    //validation From Date
    if (!checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
      let errMsg = t("JSE001").replace("%s", t("From Date"));
      arrMsg.push(errMsg);
    }
    //validation To Date
    if (!checkNullOrBlank(selectedToDate) && checkNullOrBlank(selectedFromDate)) {
      let errMsg = t("JSE001").replace("%s", t("To Date"));
      arrMsg.push(errMsg);
    }
    //validation check From Date > To Date
    if (checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
      if (formatDate(selectedFromDate) > formatDate(selectedToDate)) {
        let errMsg = t("JSE016").replace("%s", t("From Date")).replace("%s", t("To Date"));
        arrMsg.push(errMsg);
      }
    }

    if (arrMsg.length > 0) {
      setError(arrMsg);
      setSuccess("");
      setMainTable([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      let request = {
        "admin_level_id": roleState,
        "employee_id": employeeID,
        "employee_code": employeeCode,
        "employee_name": employeeName,
        "department_id": deptState,
        "from_date": isEmpty(selectedFromDate) ? "" : formatDate(selectedFromDate),
        "to_date": isEmpty(selectedToDate) ? "" : formatDate(selectedToDate),
        "company_id": ApiPath.companyID,
        "language": ApiPath.lang,
        "per_page": 20,
        "overtime_rate_setting_id": overtimeState,
      }
      setRequestState(request);
      searchAPI(request);
    }
  }

  const searchAPI = async (request, pageNumber = 1, msg = true) => {
    request = { ...request, page: pageNumber }
    let params = {
      ...request,
      page: pageNumber
    }

    let obj = { package_name: 'hr', url: ApiPath.employeeOvertimeListSearch, method: 'post', params };
    setLoading(true);
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setRowCount('');
      msg && setError(response.message);
      msg && setSuccess("");
      setMainTable([]);
    } else {
      let res = response.data.employee_overtime_data;
      let data = res.data
      setCurrentPage(res.current_page);
      setTotalPage(res.last_page);
      setPerPage(res.per_page)
      setRowCount(res.total);
      setMainTable(data);
      setAllCheck(false);
      setDeleteIdList("");
    }
  }

  function clearAllBeforeSearch() {
    setError([]);
    setSuccess("");
  }

  /* Checkbox Function */
  let change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];
    if (value === "all-check") {
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map(item =>
        item.id === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        id_list.push(data[i].id);
      }
    }
    var x = id_list.toString();
    setDeleteIdList(x);
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  /** Delete Function */
  let deleteToggleAlert = () => {
    if (!isEmpty(deleteIdList)) {
      setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
      setError("");
    } else {
      setSuccess('');
      let errorMsg = t("JSE004");
      setError([errorMsg]);
    }
  }
  let deleteOK = async () => {
    var array = [...mainTable];
    setShow(!show);

    if (!isEmpty(deleteIdList)) {
      let url = `${ApiPath.employeeOvertimeList}${deleteIdList}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'delete' };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
        setSuccess('');
      } else {
        let successMsg = t("JSE003");
        setError('');
        setTimeout(function () {
          searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
          setSuccess([successMsg]);
        }, 2500);
        loadOTName();
      }
    } else {
      setSuccess('');
      let errorMsg = t("JSE004");
      setError([errorMsg]);
    }
  }

  async function pageChange(i) {
    await searchAPI(requestState, i);
    setAllCheck(false);
    setCurrentPage(i);
    setAllCheck(false);
    setDeleteIdList('');
  }

  /** Edit Function */
  let editToggleAlert = (e) => {
    setEditID(e['id']);
    setShow(!show); setContent(t('Are you sure want to edit?')); setType('edit');
  }
  let editOnClose = () => {
    setEditID('');
    setEditModalBox(!editModalBox);
  }
  let editOK = () => {
    var array = [...mainTable];
    setShow(!show);
    editRow(editID);
  }
  let editRow = (id) => {
    localStorage.setItem('RETURN_OT_RATE_DATA', JSON.stringify(id));
    history.push("./employee-overtime-registration");
  }
  let refresh = () => {
    window.location.reload(false);
  }

  const removeMessage = () => {
    setError("");
    setSuccess("");
  }

  return (
    <CRow className="employyOvertimeRegistion">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} deleteOK={deleteOK} editOK={editOK}
        />
        <CCard>
          <CCardHeader>
            <h5>{t('Employee Overtime List')}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchOvertimeList
              viewPermissionAPI={viewPermissionAPI}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              handleFromDateChange={i => setSelectedFromDate(ChangeDate(i))}
              handleToDateChange={i => setSelectedToDate(ChangeDate(i))}
              selectedFromDate={selectedFromDate}
              selectedToDate={selectedToDate}
              departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
              roleAPI={roleAPI} roleState={roleState} roleChange={roleChange}
              otNameAPI={otNameAPI} overtimeState={overtimeState} overtimeChange={overtimeChange}
              searchAPI={() => fnSearch()}
            />
            <OvertimeListTable
              mainTable={mainTable}
              rowCount={rowCount}
              AllCheck={AllCheck}
              change_checkbox={change_checkbox}
              editToggleAlert={editToggleAlert}
              currentPage={currentPage}
              totalPage={totalPage} perPage={perPage} pageChange={pageChange}
              deleteToggleAlert={deleteToggleAlert}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function EmployeeOvertimeList() { return (<Welcome />) }
