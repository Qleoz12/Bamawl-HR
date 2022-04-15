/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import DeleteSalaryTransferSettingList from './DeleteSalaryTransferSettingList';
import SalaryTransferSettingListTable from './SalaryTransferSettingListTable';
import SearchSalaryTransferSettingList from './SearchSalaryTransferSettingList';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory(); // For edit link
  const [deptState, setDeptState] = useState(''); // For department dropdown toggle
  const [rowCount, setRowCount] = useState();           // For row count
  const [mainTable, setMainTable] = useState([]);
  const [editData, setEditData] = useState([]); // for Edit data
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [position, setPositions] = useState([]);
  const [selectedpaymentAccount, setSelectedPaymentAccount] = useState([]); //Set Payment Account
  const typingTimeoutRef = useRef(null);    // keep value time out when rerender
  const [paymentTable, setPaymentTable] = useState([]);
  const [currentPage, setActivePage] = useState(1) // for Pagination
  const [totalPage, setTotalPage] = useState(1) // for Pagination
  const [perPage, setPerPage] = useState(1) // for Pagination
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [clearData, setClearData] = useState('');
  const [viewPermissionAPI, setViewPermissionAPI] = useState('');   // For View_Permission API

  // Loaded initially
  useEffect(() => {
    setLoading(true);
    loadDept();
    loadPay();
    loadPos();
    loadViewPermission();
  }, [loadDept, loadPay, loadPos, loadViewPermission]);

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

  /** start API for department */
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

  /* START GET POSITION SELECT BOX */
  const [posState, setposState] = useState('');
  const [positionAPI, setPositionAPI] = useState([]);
  const loadPos = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetAllPosition, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setPositionAPI(response.data.data);
    }
  };
  let posChange = (e) => {
    setposState(e.target.value);
  }
  /* END GET POSITION SELECT BOX */

  /** start API for Payment Account */
  const [paymentAccountAPI, setPaymentAccountAPI] = useState([]);
  const loadPay = async () => {
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    }
    let obj = { package_name: 'hr', url: ApiPath.SalaryTransferSettingListGetPaymentAccount, method: 'get', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      let data = response.data.data;
      setPaymentAccountAPI(data);
    }
  }

  /**Check Payment Account */
  let paymentAccountChange = (e) => {
    let resultArray = []
    let payment = {
      //bank_name: e.target.attributes.bank_name.value,
      bank_currency_id: parseInt(e.target.attributes.bank_currency_id.value),
      priority: parseInt(e.target.attributes.priority.value),
      //priority_name: e.target.attributes.priority_name.value,
    }
    if (e.target.checked)      //if checked (true), then add this id into checkedList
    {
      resultArray = selectedpaymentAccount.filter(CheckedId =>
        CheckedId !== e.target.attributes.priority.value
      )
      resultArray.push(payment);
      setSelectedPaymentAccount(resultArray);
    }
    else                    //if not checked (false), then remove this id from checkedList
    {
      setSelectedPaymentAccount(resultArray);
      resultArray = selectedpaymentAccount.filter(CheckedId =>
        CheckedId !== e.target.attributes.priority.value
      )
      resultArray = resultArray.filter(item => item.priority !== payment.priority || item.bank_currency_id !== payment.bank_currency_id);
      setSelectedPaymentAccount(resultArray);
    }
  }

  /** end API for department */

  /**Search API */
  const [requestState, setRequestState] = useState();
  const fnSearch = useCallback(() => {
    setError('');
    setSuccess("");

    if (selectedpaymentAccount.length <= 0) {
      let errMsg = t('JSE001').replace('%s', t('Payment Account'));
      setError([errMsg]);
    } else {
      const request = {
        company_id: ApiPath.companyID,
        language: ApiPath.lang,
        employee_id: employeeID,
        employee_code: employeeCode,
        employee_name: employeeName,
        department_id: deptState,
        position_id: posState,
        bank_currency_priority: selectedpaymentAccount,
        page_size: null,
      }
      setRequestState(request);
      searchAPI(request);
    }
  });

  const searchAPI = async (request, page = 1, smg = true) => {
    page = parseInt(page) ? page : 1;
    setActivePage(page);
    setDeleteIdList('');

    request = { ...request, page: page }
    setLoading(true);
    let params = request;
    let obj = { package_name: 'hr', url: ApiPath.SalaryTransferSettingListSearch, method: 'post', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag == false) {
      setRowCount('');
      smg && setError(response.message);
      smg && setSuccess("");
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setMainTable([]);
    }
    else {
      setRowCount(t("Total Rows").replace('%s', response.data.total));
      setMainTable(response.data.data);
      //setPositions(response.data.data[0].positions);
      setTotalPage(response.data.last_page);
      setPerPage(parseInt(response.data.per_page));
      setPaymentTable(selectedpaymentAccount);
      setError('');
      setSuccess('');
      setAllCheck(false);
      setDeleteIdList("");
    }
  }



  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];

    if (value === "all-check") {
      data = mainTable.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map(item =>
        item.employee_id === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }

    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        id_list.push(data[i].employee_id);
      }
    }
    var x = id_list.toString();
    setDeleteIdList(x);

    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  /* DELETE OVERTIME MODAL BOX */
  const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide
  const deleteToggleAlert = () => {
    if (!isEmpty(deleteIdList)) {
      setError("");
      setSuccess("");
      setContent(t('Are you sure want to delete?')); setType('delete');
      setDeleteModalBox(!deleteModalBox);
    } else {
      setSuccess('');
      let errorMsg = t('JSE004');
      setError([errorMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  const deleteOK = async () => {
    setDeleteModalBox(!deleteModalBox);

    if (!isEmpty(deleteIdList)) {
      setLoading(true);
      let url = `${ApiPath.SalaryTransferSettingListDelete}${deleteIdList}?company_id=${ApiPath.companyID}&employee_id=${ApiPath.createdEmp}&language=${ApiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'delete' };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setSuccess([response.data.message]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        searchAPI(requestState, AllCheck ? currentPage - 1 : currentPage, false);
      }
    }
  }

  /*Set page */
  async function pagination(i) {
    await searchAPI(requestState, i);
    setActivePage(i)
  }

  /* EDIT OVERTIME MODAL BOX */
  const [editModalBox, setEditModalBox] = useState(false); // Edit confirm box show or hide
  const [editID, setEditID] = useState('');
  const editToggleAlert = (e) => {
    setEditID(e['employee_id']);
    setContent(t('Are you sure want to edit?')); setType('edit');
    setEditModalBox(!editModalBox);
  }
  const editOnClose = () => {
    setEditID('');
    setEditModalBox(!editModalBox);
  }
  const editOK = () => {
    var array = [...mainTable];
    setEditModalBox(!editModalBox);
    editRow(editID);
  }
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    sessionStorage.setItem('SALARY_TRANSFER_SETTING_LIST_ID_DATA', JSON.stringify(id));
    history.push("./salary-transfer-setting-by-group");
  }

  const cancelClick = () => {
    setEditModalBox(false);
    setDeleteModalBox(false);
  }

  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h5><CLabel>{t('Salary Transfer Setting List')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <SearchSalaryTransferSettingList
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}

              departmentAPI={departmentAPI}
              viewPermissionAPI={viewPermissionAPI}
              deptState={deptState}
              deptChange={deptChange}
              positionAPI={positionAPI}
              posState={posState}
              posChange={posChange}
              paymentAccountAPI={paymentAccountAPI}
              searchAPI={() => fnSearch()}
              editData={editData}
              paymentAccountChange={paymentAccountChange} />
            <SalaryTransferSettingListTable
              pagination={pagination}
              currentPage={currentPage}
              totalPage={totalPage}
              perPage={perPage}
              paymentTable={paymentTable}
              selectedpaymentAccount={selectedpaymentAccount}
              position={position}
              mainTable={mainTable}
              rowCount={rowCount}
              AllCheck={AllCheck}
              change_checkbox={change_checkbox}
              editToggleAlert={editToggleAlert} />
            <DeleteSalaryTransferSettingList
              mainTable={mainTable}
              deleteToggleAlert={deleteToggleAlert} />
            <Confirmation
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              show={editModalBox || deleteModalBox}
              cancel={cancelClick}
              editOK={editOK}

              deleteModalBox={deleteModalBox}
              deleteToggleAlert={deleteToggleAlert}
              deleteOK={deleteOK}
              editOnClose={editOnClose} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function SalaryTransferSettingListIndex() {
  return (
    <Welcome />
  )
}