/* eslint-disable eqeqeq */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import Moment from 'moment';
import SearchEmployeeDeductionList from './SearchEmployeeDeductionList';
import EmployeeDeductionListTable from './EmployeeDeductionListTable';
import DeleteEmployeeDeductionList from './DeleteEmployeeDeductionList';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import { element } from 'prop-types';
function LegacyWelcomeClass({ t, i18n }) {
  //  pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [perPage, setPerPage] = useState(0);    // total row per page
  //  common for all screen list
  const history = useHistory();   // For edit link
  const [error, setError] = useState([]);   // For Error Message
  const [success, setSuccess] = useState("");   // For Success Message
  const [mainTable, setMainTable] = useState([]);   // For Main Table
  const [rowCount, setRowCount] = useState();     // For row count
  const [AllCheck, setAllCheck] = useState(false);// For select checkbox all or not
  //  show modal box 
  const [deleteIdList, setDeleteIdList] = useState('');   // For delete data list
  const [deleteModalBox, setDeleteModalBox] = useState(false);// Delete confirm box show or hide
  const [editModalBox, setEditModalBox] = useState(false);// Edit confirm box show or hide
  const [editID, setEditID] = useState('');   // For Edit ID
  const [empIDArr, setEmpIDArr] = useState([]);   // For Edit ID
  //  state for call API
  const [departmentAPI, setDepartmentAPI] = useState([]);   // For Dept API
  const [roleAPI, setRoleAPI] = useState([]);   // For Role API
  const [deductoinCategoryAPI, setDeductionCategoryAPI] = useState([]);   // For Deduction category API
  const [deducitonRuleAPI, setDeductionRuleAPI] = useState([]);   // For Deduction Rule API
  //  state for request seach
  const [deductionOptionState, setDeductionOptionState] = useState(2);
  const [deptState, setDeptState] = useState();     // For department dropdown toggle
  const [roleState, setRoleState] = useState();     // For role dropdown toggle
  const [fromDateState, setFromDateState] = useState(null);   // For Joined Start Date
  const [toDateState, setToDateState] = useState(null);   // For Joined End Date
  const [deductionCategoryState, setDeductionCategoryState] = useState();   // For deduction category dropdown
  const [deductionRulesState, setDeductionRulesState] = useState();   // For deduction name dropdown
  const [clearData, setClearData] = useState('');
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);// For show/hide confirmation box
  const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

  /**
  * If error state or succes state is changed, scroll automatically to top
  *
  * @author  v_hao
  * @create  07/08/2021 (D/M/Y)
  * @param
  * @return
  */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadRole();
    loadDept();
    loadDeductinCategory();
    loadDeductionRules();
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
    * Load Department
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
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
  * @create  08/07/2021 (D/M/Y)
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

  /**
    * Load Deduction Category
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadDeductinCategory = async () => {
    let params = {
      language: ApiPath.lang,
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeDeductionCategory, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setDeductionCategoryAPI([]);
    } else {
      let data = response.data.data;
      data && setDeductionCategoryAPI(data);
    }
  }

  let categoryChange = async (e) => {
    setDeductionCategoryState(e.target.value);
    setDeductionRulesState("");
    let params = {
      company_id: ApiPath.companyID,
      deduction_category_id: e.target.value,
    }
    if (e.target.value != "") {
      let obj = { package_name: 'hr', url: ApiPath.employeeDeductionChangeCategory, method: 'post', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
      } else {
        if (response.data.status == "OK") {
          let data = response.data.data;
          setDeductionRuleAPI(data);
          setError([]);
          setSuccess("");
        } else if (response.data.status == "NG") {
          setError([response.data.message]);
          setSuccess("");
        }
      }
    } else {
      loadDeductionRules();
    }
  }

  /**
    * Load Deduction Name
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadDeductionRules = async () => {
    let params = {
      company_id: ApiPath.companyID,
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeDeductionName, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setDeductionRuleAPI([]);
    } else {
      let data = response.data.data;
      data && setDeductionRuleAPI(data);
    }
  }

  let deductionRulesChange = (e) => {
    setDeductionRulesState(e.target.value);
  }

  /**
    * change autocomplete
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
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
  * @create  08/07/2021 (D/M/Y)
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

  let handleFromDateChange = (e) => {
    setFromDateState(e);
  };
  let handleToDateChange = (e) => {
    setToDateState(e);
  };
  let removeFromDate = () => {
    setFromDateState(null);
  }
  let removeToDate = () => {
    setToDateState(null);
  }
  let deductionOptionChange = (e) => {
    setDeductionOptionState(e.target.value);
    setDeductionCategoryState("");
    setDeductionRulesState("");
    if (viewPermissionAPI !== 0) {
      setEmployeeID("");
      setEmployeeCode("");
      setEmployeeName("");
    }
    setDeptState();
    setRoleState("");
    setFromDateState(null);
    setToDateState(null);
    setMainTable([]);
    setError("");
    setSuccess("");
  }

  /** START SEARCH API */
  const [requestState, setRequestState] = useState();
  const fnSearch = useCallback(() => {
    setError('');
    setSuccess('');
    let fromDate = "";
    let toDate = "";

    if (fromDateState != null) {
      fromDate = Moment(fromDateState).format('YYYY-MM-DD');
    } else {
      fromDate = fromDateState;
    }
    if (toDateState != null) {
      toDate = Moment(toDateState).format('YYYY-MM-DD');
    } else {
      toDate = toDateState;
    }
    if (fromDate != null && toDate == null) {
      let errMsg = t('JSE001').replace('%s', t('To Date'));
      setError([errMsg]);
      setMainTable([]);
    }
    else if (toDate != null && fromDate == null) {
      let errMsg = t('JSE001').replace('%s', t('From Date'));
      setError([errMsg]);
      setMainTable([]);
    }
    else if (fromDate > toDate) {
      let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
      setError([errMsg]);
      setMainTable([]);
    }
    else {
      let request = {
        company_id: ApiPath.companyID,
        deduction_calculate_option: deductionOptionState,
        deduction_category_id: deductionCategoryState,
        per_page: 20,
        deduction_name: deductionRulesState,
      };
      if (deductionOptionState == 2) {
        request.department_id = deptState;
        request.admin_level_id = roleState;
        request.from_date = fromDate;
        request.to_date = toDate;
        request.employee_id = employeeID;
        request.employee_code = employeeCode;
        request.employee_name = employeeName;
      }
      setRequestState(request);
      searchAPI(request);
    }
  });
  const searchAPI = async (request, pageNumber = 1, msg = true) => {
    //request.page = pageNumber;
    request = { ...request, page: pageNumber }
    setLoading(true);
    let params = {
      ...request,
      page: pageNumber
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeDeductionListSearch, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      msg && setError(response.message);
      msg && setSuccess("");
      setMainTable([]);
    } else {
      let res = response.data.employee_deduction_list;
      setCurrentPage(res.current_page);
      setTotalPage(res.last_page);
      setPerPage(res.per_page);
      setRowCount(res.total);
      await setMainTable(res.data);
      setDeleteIdList("");
      setAllCheck(false);
      setDeleteIdList('');
    }
  }

  /* CHECKBOX ACTION */
  const [idList, setIdList] = useState([]);
  const [deductionRuleList, setDeductionRuleList] = useState([]);
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];
    let deduction_rule_id_list = [];
    let emp_list = [];


    if (value === "all-check") {
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map(item =>
        parseInt(item.id) === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        id_list.push(data[i].id);
        emp_list.push(data[i].employees);
        deduction_rule_id_list.push(data[i].deduction_rule_id);
      }
    }
    setDeductionRuleList(deduction_rule_id_list.toString());
    setDeleteIdList(id_list.toString());
    setIdList(id_list);
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }
  /** Page Change Navigation */
  async function pageChange(i) {
    setError("");
    setSuccess("");
    await searchAPI(requestState, i);
    setAllCheck(false);
    setCurrentPage(i);
  }
  /* DELETE MODAL BOX */
  const deleteToggleAlert = () => {
    if (!isEmpty(deleteIdList)) {
      setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
      setError("");
    } else {
      setSuccess('');
      let errorMsg = t("JSE004");
      setError([errorMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }
  const deleteOK = async () => {
    setShow(!show);
    let delete_data = [];
    let emp_delete = [];
    let temp_emp = {};
    var array = [...mainTable];
    if (!isEmpty(deleteIdList)) {
      if (deductionOptionState == 2) {
        for (let i = 0; i < mainTable.length; i++) {
          temp_emp = {};
          emp_delete = [];
          for (let j = 0; j < idList.length; j++) {
            if (mainTable[i].id == idList[j]) {
              for (let k = 0; k < mainTable[i].employees.length; k++) {
                temp_emp = {
                  "employee_id": mainTable[i].employees[k].employee_id
                }
                emp_delete.push(temp_emp)
              }
              let temp = {
                "deduction_rule_id": mainTable[i].deduction_rule_id,
                "employees": emp_delete
              }
              delete_data.push(temp)
              break;
            }
          }
        }
      }
      setLoading(true);
      let request = {
        "delete": delete_data
      }
      let url = `${ApiPath.employeeDeductionListDelete}${deductionRuleList}?deduction_calculate_option=${deductionOptionState}&employee_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'delete', params: deductionOptionState == 2 ? request : null }

      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setSuccess('');
        setError(response.message);
        searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
      } else {
        if (response.data.status == 'OK') {
          let successMsg = t("JSE003");
          setError('');
          setTimeout(function () {
            searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
            setSuccess([successMsg]);
          }, 2500);
          loadDeductionRules();
        } else if (response.data.status == 'NG') {
          setSuccess('');
          let errorMsg = response.data.message;
          setError([errorMsg]);
        }
      }
    } else {
      setSuccess('');
      let errorMsg = t("JSE004");
      setError([errorMsg]);
    }
  }
  /* EDIT MODAL BOX */
  const editToggleAlert = (e) => {
    if (deductionOptionState == 2) {
      let emp_edit = [];
      for (let i = 0; i < e.employeeArr.length; i++) {
        emp_edit.push(e.employeeArr[i].employee_id);
      }
      setEmpIDArr(emp_edit);
    }
    setEditID(e.id);
    setShow(!show); setContent(t('Are you sure want to edit?')); setType('edit');
  }
  const editOnClose = () => {
    setEditID('');
    setEditModalBox(!editModalBox);
  }
  const editOK = () => {
    var array = [...mainTable];
    setShow(!show);
    editRow(editID, deductionOptionState == 2 ? empIDArr : null);
  }
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id, employeeArr) => {
    localStorage.setItem('RETURN_EMPLOYEE_DEDUCTION_DATA_ID', JSON.stringify(id));
    if (deductionOptionState == 2) {
      localStorage.setItem('RETURN_EMPLOYEE_DEDUCTION_DATA_EMP_ARR', JSON.stringify(employeeArr));
    }
    history.push("./employee-deduction-registration");
  }

  const removeMessage = () => {
    setError('');
    setSuccess('');
  }

  return (
    <CRow className="employee-deduction-list">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} deleteOK={deleteOK} editOK={editOK}
        />
        <CCard>
          <CCardHeader>
            <h5 id="lblEmployeeDeductionList">{t('Employee Deduction List')}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchEmployeeDeductionList
              viewPermissionAPI={viewPermissionAPI}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              deductionOptionState={deductionOptionState} deductionOptionChange={deductionOptionChange}
              departmentAPI={departmentAPI} deptState={deptState} deptChange={deptChange}
              roleAPI={roleAPI} roleState={roleState} roleChange={roleChange}
              deductionCategoryAPI={deductoinCategoryAPI} deductionCategoryState={deductionCategoryState} deductionCategoryChange={categoryChange}
              deductionRulesAPI={deducitonRuleAPI} deductionRulesState={deductionRulesState} deductionRulesChange={deductionRulesChange}
              handleFromDateChange={i => setFromDateState(ChangeDate(i))}
              handleToDateChange={i => setToDateState(ChangeDate(i))}
              fromDateState={fromDateState}
              toDateState={toDateState}
              removeFromDate={removeFromDate} removeToDate={removeToDate}
              searchAPI={() => fnSearch()}
            />
            <EmployeeDeductionListTable
              deductionOptionState={deductionOptionState}
              mainTable={mainTable} rowCount={rowCount}
              AllCheck={AllCheck} change_checkbox={change_checkbox}
              editToggleAlert={editToggleAlert}
              currentPage={currentPage} totalPage={totalPage} perPage={perPage} pageChange={pageChange}
            />
            <DeleteEmployeeDeductionList
              mainTable={mainTable} deleteToggleAlert={deleteToggleAlert}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeDeductionListIndex() {
  return (
    <Welcome />
  )
}