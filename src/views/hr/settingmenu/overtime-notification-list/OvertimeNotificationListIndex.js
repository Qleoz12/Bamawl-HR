import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty, checkNullOrBlank } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import SearchOvertimeNotitficationList from './SearchOvertimeNotitficationList';
import OvertimeNotitficationListTable from './OvertimeNotitficationListTable';
import DeleteOvertimeNotitficationList from './DeleteOvertimeNotitficationList';
import ApiPath from './../../../brycen-common/api-path/ApiPath';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const defaultPerPage = ApiPath.defaultPerPage;//default page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(0);    // total row per page
  const history = useHistory();   // For edit link
  const [error, setError] = useState([]);   // For Error Message
  const [success, setSuccess] = useState("");   // For Success Message
  const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
  const [roleAPI, setRoleAPI] = useState([]);   // For Role API
  const [deptState, setDeptState] = useState();     // For department dropdown toggle
  const [roleState, setRoleState] = useState();     // For role dropdown toggle
  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null); // For Joined End Date
  const [mainTable, setMainTable] = useState([]);   // For Main Table
  const [rowCount, setRowCount] = useState();     // For row count
  const [AllCheck, setAllCheck] = useState(false);// For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState('');   // For delete data list
  const [editID, setEditID] = useState('');   // For Edit ID
  const [clearData, setClearData] = useState('');
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
  const [formSearchState, setFormSearchState] = useState(null); // keep form search condition
  const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API
  // Loaded initially
  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadRole();
    loadDept();
  }, []);

  /**
  * If clearData is changed, remove array in autocomplete
  *
  * @author  c_dinh
  * @create  02/08/2021 (D/M/Y)
  * @param
  * @return
  */
  useEffect(() => {
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [clearData]);

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
    * @author  c_dinh
    * @create  02/08/2021 (D/M/Y)
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
  * @author  c_dinh
  * @create  02/08/2021 (D/M/Y)
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
    * @author  c_dinh
    * @create  02/08/2021 (D/M/Y)
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
  * @author  c_dinh
  * @create  02/08/2021 (D/M/Y)
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

  const searchClick = () => {
    let arrMsg = [];
    setError([]);
    setSuccess('');
    //validation Applied From Date
    if (!checkNullOrBlank(selectedFromDate) && checkNullOrBlank(selectedToDate)) {
      let errMsg = t("JSE001").replace("%s", t("From Date"));
      arrMsg.push(errMsg);
    }
    //validation To Date
    if (!checkNullOrBlank(selectedToDate) && checkNullOrBlank(selectedFromDate)) {
      let errMsg = t("JSE001").replace("%s", t("To Date"));
      arrMsg.push(errMsg);
    }
    //validation check From Date >  To Date
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
      const requestFormSearch = {
        admin_level_id: roleState,
        employee_id: employeeID,
        employee_code: employeeCode,
        employee_name: employeeName,
        department_id: deptState,
        from_date: isEmpty(selectedFromDate) ? "" : formatDate(selectedFromDate),
        to_date: isEmpty(selectedToDate) ? "" : formatDate(selectedToDate),
        company_id: ApiPath.companyID,
        language: ApiPath.lang
      }
      setFormSearchState(requestFormSearch);
      searchOvertimeNotificationList(1, defaultPerPage, requestFormSearch);
      setCurrentPage(1);
    }
  }
  //get summarize total amount
  const searchOvertimeNotificationList = async (page = 1, pageSize = 20, formSearch = null, searchFlag = true) => {
    setLoading(true);
    let params = {
      ...formSearch,
      page,
      per_page: pageSize,
    }
    let obj = { package_name: 'hr', url: ApiPath.overtimeNotificationListSearch, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      searchFlag && setError(response.message);
      setMainTable([]);
      setRowCount('');
      searchFlag && setSuccess('');
    }
    else {
      let res = response.data.overtime_notification_list;
      setCurrentPage(res.current_page);
      setTotalPage(res.last_page);
      setPerPage(res.per_page);
      setRowCount(res.total);
      await setMainTable(res.data);
      setAllCheck(false);
      setDeleteIdList('');
      searchFlag && setSuccess('');
    }
  }

  /* CHECKBOX ACTION */
  const change_checkbox = (i) => {
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

    setDeleteIdList(id_list.toString());
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  const changePage = (newPage) => {
    setCurrentPage(newPage);
    setAllCheck(false);
    setError('');
    setSuccess('');
    searchOvertimeNotificationList(newPage, defaultPerPage, formSearchState, true);
  }

  let handleFromDateChange = (e) => {
    setSelectedFromDate(e);
  };
  let handleToDateChange = (e) => {
    setSelectedToDate(e);
  };

  /* DELETE OVERTIME MODAL BOX */
  const deleteToggleAlert = () => {
    if (isEmpty(deleteIdList)) {
      setSuccess("");
      let errorMsg = t('JSE004');
      setError([errorMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
      setError("");
    }
  }
  const deleteOK = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShow(!show);
    if (!isEmpty(deleteIdList)) {
      setLoading(true);
      let url = `${ApiPath.overtimeNotificationListDelete}${deleteIdList}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'delete' };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        let pageCheck = AllCheck && currentPage === totalPage ? (totalPage == 1 ? currentPage : currentPage - 1) : currentPage;
        searchOvertimeNotificationList(pageCheck, defaultPerPage, formSearchState, false);
        setCurrentPage(pageCheck);
        setSuccess('');
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setSuccess([response.data.message]);
        setTimeout(function () {
          let pageCheck = AllCheck && currentPage === totalPage ? (totalPage == 1 ? currentPage : currentPage - 1) : currentPage;
          searchOvertimeNotificationList(pageCheck, defaultPerPage, formSearchState, false);
          setCurrentPage(pageCheck);
        }, 300);
      }
    } else {
      setSuccess('');
      let errorMsg = t("JSE162");
      setError([errorMsg]);
    }
  }
  const editToggleAlert = (e) => {
    setEditID(e['id']);
    setShow(!show); setContent(t('Are you sure want to edit?')); setType('edit');
  }
  const editOK = () => {
    setShow(!show);
    editRow(editID);
  }
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    localStorage.setItem('RETURN_OVERTIME_NOTIFICATION_DATA', JSON.stringify(id));
    history.push("./overtime-notification-setup");
  }

  return (
    <CRow className="overtime-notification-setup">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} editOK={editOK} deleteOK={deleteOK}
        />
        <CCard>
          <CCardHeader>
            <h5>{t('Overtime Notification List')}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchOvertimeNotitficationList
              viewPermissionAPI={viewPermissionAPI}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
              roleAPI={roleAPI} roleState={roleState} roleChange={roleChange}
              selectedFromDate={selectedFromDate}
              handleFromDateChange={handleFromDateChange}
              selectedToDate={selectedToDate}
              handleToDateChange={handleToDateChange}
              searchClick={searchClick} />
            <OvertimeNotitficationListTable mainTable={mainTable} rowCount={rowCount} AllCheck={AllCheck}
              change_checkbox={change_checkbox} editToggleAlert={editToggleAlert} currentPage={currentPage}
              totalPage={totalPage} perPage={perPage} changePage={changePage} />
            <DeleteOvertimeNotitficationList mainTable={mainTable} deleteToggleAlert={deleteToggleAlert} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function OvertimeNotificationListIndex() {
  return (
    <Welcome />
  )
}