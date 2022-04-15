/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react';
import Moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import BudgetYearIncomeTaxTable from './BudgetYearIncomeTaxTable';
import SearchBudgetYearIncomeTax from './SearchBudgetYearIncomeTax';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';

/**
 * Component for Budget Year Income Tax
 * 
 * @author c_dinh
 * @create_date 2021/08/03
 */
function LegacyWelcomeClass({ t, i18n }) {
  /** State for main screen */
  const [employeeID, setEmployeeID] = useState('');   // For employee id dropdown toggle
  const [IdArr, setIdArr] = useState([]);   // For Autocomplete EMP ID
  const [employeeCode, setEmployeeCode] = useState('');   // For employee code dropdown toggle
  const [codeArr, setCodeArr] = useState([]);   // For Autocomplete EMP CODE
  const [employeeName, setEmployeeName] = useState('');   // For employee name dropdown toggle
  const [nameArr, setNameArr] = useState([]);   // For Autocomplete EMP NAME
  const [budgetYearState, setBudgetYearState] = useState(null); // for budget year
  const [mainTable, setMainTable] = useState(null);
  const [clearData, setClearData] = useState('');
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [viewPermissionAPI, setViewPermissionAPI] = useState();   // For View_Permission API

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
  }, []);

  // Loaded initially
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [error, success, clearData]);

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

  /** START SEARCH API */
  const fnSearch = useCallback(() => {
    setError([]);
    setSuccess('');
    let targetYear = "";
    let erro = [];
    /* check employee id is null */
    if (isEmpty(employeeID)) {
      let errMsg = t('JSE124').replace('%s', t('Employee ID'));
      erro.push(errMsg);
    }
    /* check budget year is null */
    if (isEmpty(budgetYearState)) {
      let errMsg = t('JSE124').replace('%s', t('Budget Year'));
      erro.push(errMsg);
    }
    else targetYear = Moment(budgetYearState).format('YYYY');
    if (!isEmpty(erro)) {
      setError(erro);
      setMainTable();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      const request = {
        company_id: ApiPath.companyID,
        employee_id: employeeID,
        budget_year: targetYear,
        language: ApiPath.lang,

      }
      searchAPI(request);
    }
  });
  const searchAPI = async (request, pageNumber = 1, msg = true) => {
    setLoading(true);
    let obj = {
      package_name: 'hr',
      url: ApiPath.BudgetYearIncomeTaxSearch,
      method: 'post',
      params: request
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setMainTable();
    }
    else {
      let data = response.data;
      setMainTable(data.budget_year_income_tax_salary);
    }
  }
  /* END SEARCH API */

  /** Action before seach start */
  let handleBudgetDateChange = (e) => {
    setBudgetYearState(e);
  }
  /** Action before seach end */

  return (
    <CRow className="budget-yaer-income-tax">
      <CCol xs="12">
        <Loading start={loading} />
        <Message error={error} success={success} />
        <CCard>
          <CCardHeader>
            <h5 id="cardTitle">{t('Budget Year Income Tax Salary')}</h5>
          </CCardHeader>
          <CCardBody >
            <SearchBudgetYearIncomeTax
              viewPermissionAPI={viewPermissionAPI}
              employeeID={employeeID} employeeCode={employeeCode} employeeName={employeeName}
              IdArr={IdArr} codeArr={codeArr} nameArr={nameArr}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              budgetYearState={budgetYearState} handleBudgetDateChange={handleBudgetDateChange}
              searchAPI={() => fnSearch()}
            />
            <BudgetYearIncomeTaxTable mainTable={mainTable} />
          </CCardBody>

        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BudgetYearIncomeTaxIndex() {
  return (
    <Welcome />
  )
}