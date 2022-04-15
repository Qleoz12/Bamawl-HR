/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import $ from "jquery";
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { isBetween, isEmpty, validateNumberOnly } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import SalaryTransferSettingByGroupCurrencyBox from './SalaryTransferSettingByGroupCurrencyBox';
import SalaryTransferSettingByGroupTable from './SalaryTransferSettingByGroupTable';
import SalaryTransferSettingByGroupTableAdd from './SalaryTransferSettingByGroupTableAdd';
import SearchSalaryTransferSettingByGroup from './SearchSalaryTransferSettingByGroup';
import ShowSalaryTransferSettingByGroup from './ShowSalaryTransferSettingByGroup';
import ViewPermision from '../../../brycen-common/constant/ViewPermission';


// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory(); // For edit link
  const [deptState, setDeptState] = useState(); // For department dropdown toggle
  const [positionState, setPositionState] = useState(); // For role dropdown toggle
  const [paymentAccountState, setPaymentAccountState] = useState("");
  const [selectedpaymentAccount, setSelectedPaymentAccount] = useState([]);
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  const [clearData, setClearData] = useState('');

  const [fixedAmount, setFixedAmount] = useState({}); // for amount data 
  const [selectedPaymentAccountSetting, setSelectedPaymentAccountSetting] = useState([])

  const [rowCount, setRowCount] = useState('');           // For row count
  const [mainTableSH, setMainTableSH] = useState(false); // For main table show or hide
  const [mainTable, setMainTable] = useState([]);
  const [mainEmployeeList, setMainEmployeeList] = useState(false);
  const [mainCurrency, setMainCurrency] = useState(false);

  const [currencySetting, setCurrencySetting] = useState([]); //get data for currency in search form
  const [editData, setEditData] = useState([]); // for Edit data
  const [salaryTransferState, setSalaryTransferState] = useState(false); //for value of salary transfer exist
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation
  const [overWriteModalBox, setOverWriteModalBox] = useState(false); // for overwrite save button confirmation
  const [paymentTypeState, setPaymentTypeState] = useState({});

  const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For View_Permission API
  
  const typingTimeoutRef = useRef(null);    // keep value time out when rerender
  // Loaded initially
  useEffect(() => {
    loadViewPermission();

    let edit_Data = JSON.parse(sessionStorage.getItem("SALARY_TRANSFER_SETTING_LIST_ID_DATA")); // return data from Sarary Transfer List Form
    sessionStorage.removeItem("SALARY_TRANSFER_SETTING_LIST_ID_DATA");
    if (edit_Data != null) {
      let edit_id = edit_Data;
      setEditData(edit_id);
      editIndex(edit_id);
    }
  }, []);


  useEffect(() => {
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [clearData]);


  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);


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
    if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
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
        setError(); setClearData('clear');
      } else {
        (type === 'id') ? setIdArr(response.data.data) :
          (type === 'code') ? setCodeArr(response.data.data) : setNameArr(response.data.data);
      }
    }
  }
  const selectAutocomplete = async (val, obj) => {
    setClearData('clear');
    let object = { package_name: 'erp', url: ApiPath.employeeAutoCompleteResult, method: 'post', params: { id: obj.id, company_id: ApiPath.companyID } }
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError();
    } else {
      setEmployeeID(response.data.data[0].employee_id);
      setEmployeeName(response.data.data[0].name);
      setEmployeeCode(response.data.data[0].employee_code);
    }
  }
  /** End API for Employee */

  /** End API for department */
  const [departmentAPI, setDepartmentAPI] = useState([]);
  const loadDept = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetDepartment, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
  };
  /** End API for department */

  /** Start API for admin lever */
  const [positionAPI, setPositionAPI] = useState([]);
  const loadPosition = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetAllPosition, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setPositionAPI([]) : setPositionAPI(response.data.data);
  };

  // Payment Account API
  const [paymentAccountAPI, setpaymentAccountAPI] = useState([]);
  const loadpaymentAccount = async () => {
    setLoading(false);
    let url = `${ApiPath.salaryTransferSettingByGroupPaymentAcount}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}`
    let obj = { package_name: 'hr', url: url, method: 'get' }
    let response = await ApiRequest(obj);
    response.flag === false ? setpaymentAccountAPI([]) : setpaymentAccountAPI(response.data.data);
  };

  //value of payment Account Change
  let paymentAccountChange = (e) => {
    let resultArray = []
    let payment = {
      bank_name: e.target.attributes.bank_name.value,
      bank_currency_id: parseInt(e.target.attributes.bank_currency_id.value),
      priority: parseInt(e.target.attributes.priority.value),
      priority_name: e.target.attributes.priority_name.value,
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
      resultArray = selectedpaymentAccount.filter(CheckedId =>
        CheckedId !== e.target.attributes.priority.value
      )
      resultArray = resultArray.filter(item => item.priority !== payment.priority || item.bank_currency_id !== payment.bank_currency_id);
      setSelectedPaymentAccount(resultArray);
    }
  }
  /** End API for admin lever */

  // Function called when Add button is clicked!
  const currencyList = async (pageNumber = 1) => {
    setLoading(true);
    if (addIdList.length <= 0) {
      let errMsg = t('JSE001').replace('%s', t('Employee'));
      setError([errMsg]);
      setLoading(false);
    }
    else if (addIdList.length !== 0) {
      setMainTable(mainTable.filter(item => addIdList.includes((item.employee_id))));
      setRowCount(t("Total Rows").replace('%s', mainTable.filter(item => addIdList.includes((item.employee_id))).length));
      setEditData([]);
      setError('');
      setSuccess('');
      setMainEmployeeList(false);
      setMainCurrency(true);
      setMainTableSH(false);
      setError('');
      setSuccess('');
      let params = {
        bank_priority: selectedPaymentAccountSetting,
        company_id: ApiPath.companyID,
        language: ApiPath.lang
      }
      let obj = { package_name: 'hr', url: ApiPath.salaryTransferSettingByGroupGetPaymentAccountSetting, method: 'post', params }
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setRowCount('');
        setError(response.message);
        setSuccess("");
        setMainTable([]);
        setLoading(false);
      }
      else {
        setCurrencySetting(response.data.data);
        setError('');
        setSuccess('');
        setLoading(false);
      }
    }

  }

  // Function show search Form of employee list
  const employeeList = () => {
    setError('');
    setSuccess('');
    setEditData([]);
    setMainEmployeeList(true);
    setMainCurrency(false);
    setAddIdList('');
    setSalaryTransferState(false);
    if(mainEmployeeList === true) {

    } else {
      loadpaymentAccount();
      loadDept();
      loadPosition();
    }
    setSelectedPaymentAccount([]);
    setPaymentTypeState({})
    setFixedAmount({});
  }

  // Salary transfer Already exist
  let salaryTransferChange = (e) => {
    setSalaryTransferState(e.target.checked);
  }

  const searchAPI = async (pageNumber = 1, object) => {
    setLoading(true);
    setAllCheck(false);
    setMainTableSH(true);
    setError('');
    setSuccess('');
    setMainTable('');
    setSelectedPaymentAccountSetting(selectedpaymentAccount);
    setError('');
    setSuccess('');
    if (selectedpaymentAccount.length <= 0) {
      let errMsg = t('JSE001').replace('%s', t('Payment Account'));
      setError([errMsg]);
      setLoading(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      let params = {
        employee_id: employeeID,
        employee_code: employeeCode,
        employee_name: employeeName,
        department_id: deptState,
        position_id: positionState,
        salary_transfer_exist: salaryTransferState,
        bank_currency_priority: selectedpaymentAccount,
        company_id: ApiPath.companyID,
        language: ApiPath.lang,
        login_id: ApiPath.loginEmp
      }
      let obj = { package_name: 'hr', url: ApiPath.salaryTransferSettingByGroupSearch, method: 'post', params }
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setLoading(false);
        setRowCount('');
        setError(response.message);
        setSuccess("");
        setMainTableSH(false);
        setMainTable([]);
      }
      else {
        setRowCount(t("Total Rows").replace('%s', response.data.data.length));
        setMainTable(response.data.data);
        setError('');
        setSuccess('');
        setLoading(false);
      }
    }
  }

  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [addIdList, setAddIdList] = useState(''); // For delete data list
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
    setAddIdList(x);
    setAllCheck(data.every(item => item.is_checked));
    setMainTable(data);
  }

  /* Show dropdown toggle */


  let refresh = () => {
    window.location.reload(false);
  }

  const removeMessage = () => {
    setError("");
    setSuccess("");
  }


  /** Start Click remove function */
  const removeRow = (e) => {
    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.employee_id != e["employee_id"]);
    setMainTable(result_data);
    setRowCount(t("Total Rows").replace('%s', result_data.length));
    if (result_data.length === 0) {
      setMainCurrency(false);
    }
  };
  /** End remove function */

  /** Start Save/Update function */
  let saveData = () => {
    let errMsgAll = [];
    let total = [];
    let total_amount = [];
    let subMgs = [];
    setError([]);
    setSuccess("");

    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });
    currencySetting.forEach((main, index) => {
      main.priority_list.forEach((element, idx) => {
        element = { ...element, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: fixedAmount[main.currency_desc + idx], amount_type: paymentTypeState[index] }
        total.push({ currency_desc: main.currency_desc, monthly_salary: main.monthly_salary, amount: element.amount, amount_type: element.amount_type }); //push currency name and amount into new array
        payment_list.push(element);
        if (isEmpty(element.bank_currency_id)) {
          const errMsg = t("JSE124").replace("%s", 'Bank currency id ' + element.bank_name + '(' + element.priority_name + ')');
          errMsgAll.push(errMsg);
        }
        if (isEmpty(element.priority)) {
          const errMsg = t("JSE124").replace("%s", 'Priority ' + element.bank_name + '(' + element.priority_name + ')');
          errMsgAll.push(errMsg);
        }
        if (isEmpty(element.amount)) {
          const errMsg = t("JSE124").replace("%s", 'Amount ' + element.bank_name + '(' + element.priority_name + ')');
          errMsgAll.push(errMsg);
        } else
          if (!validateNumberOnly(element.amount)) {
            const errMsg = t("JSE005").replace("%s", 'Amount ' + element.bank_name + '(' + element.priority_name + ')');
            errMsgAll.push(errMsg);
          }
          
        if (!isEmpty(element.amount) && element.amount_type === 2 && element.amount.length > 10) {
          const errMsg = t("JSE128").replace("%s", element.bank_name + '(' + element.priority_name + ')').replace("%s", '10 ');
          errMsgAll.push(errMsg);
        }
        if (isEmpty(element.amount_type)) {
          const errMsg = t("JSE126").replace("%s", 'Amount Type');
          subMgs.push(errMsg)
          
        }
      })
    });

      if(subMgs.length > 0) {
        errMsgAll.push(subMgs[0]);
      }
      // fill total_amount array with amount_type = 1
      total_amount = total.filter(item => parseInt(item.amount_type) === 1)
      const unique = [...new Set(total_amount.map(item => item.currency_desc))];
      let amount = [];
      unique.map((i, index) => {
          let a = {
              amount: 0,
              currency_desc: ""
          }
          amount[index] = a;
          total_amount.map(it => {
              if (it.currency_desc === i) {
                  amount[index].amount += parseInt(it.amount);
                  amount[index].currency_desc = it.currency_desc;
              }
          })
      })
      amount.map(item => {
          if (item.amount < 100) {
              const errMsg = t("JSE10020").replace("%s", item.currency_desc);
              errMsgAll.push(errMsg);
          } else if (item.amount > 100) {
              const errMsg = t("JSE10021").replace("%s", item.currency_desc);
              errMsgAll.push(errMsg);
          }
      })
  
    if (emp_data.length === 0) {
      const errMsg = t("JSE004").replace("%s", t("Employee ID"));
      errMsgAll.push(errMsg);
    }
    if (payment_list.length === 0) {
      const errMsg = t("JSE004").replace("%s", t("Payment transfer list"));
      errMsgAll.push(errMsg);
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

  let paymentTypeChange = (index, e) => {
    let paymentType = Object.assign({}, paymentTypeState)
    paymentType[index] = parseInt(e.currentTarget.value);
    setPaymentTypeState(paymentType);
  };

  let fixedAmountChange = (id, index, e) => {
    let amount = Object.assign({}, fixedAmount)
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
        amount[id] = e.currentTarget.value;
    }
    setFixedAmount(amount);
};


  let payment_list = [];

  const saveOK = async () => {
    setSaveModalBox(!saveModalBox);
    let emp_data = [];
    mainTable.forEach((main, index) => {
      emp_data[index] = main.employee_id;
    });
    currencySetting.forEach((main, index) => {
      main.priority_list.forEach((element, idx) => {
        element = { ...element, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: parseInt(fixedAmount[main.currency_desc + idx]), amount_type: paymentTypeState[index] }
        payment_list.push(element)
      })
    });

    if (editData == "") {
      // REGISTER MODE
      setLoading(true);
      let params = {
        company_id: ApiPath.companyID, // login data from erp
        employee_id: emp_data,
        payment_transfer_list: payment_list,
        created_emp: ApiPath.createdEmp, // login data from erp
        updated_emp: ApiPath.updatedEmp, // login data from erp
        login_id: ApiPath.loginEmp,
        language: ApiPath.lang
      }
      let obj = { package_name: 'hr', url: ApiPath.salaryTransferSettingByGroupSave, method: 'post', params }
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
        setDeptState("");
        setPositionState("");
        setPaymentTypeState({})
        setFixedAmount({});
        if(parseInt(viewPermissionAPI)  !== 0) {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName("");
        }
        setAddIdList("");
        setMainTableSH("");
        setMainEmployeeList(false);
        setMainCurrency(false);
        setSalaryTransferState(false);
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
      } else {
        setLoading(true);
        let params = {
          company_id: ApiPath.companyID, // login data from erp
          employee_id: emp_data,
          payment_transfer_list: payment_list,
          created_emp: ApiPath.createdEmp, // login data from erp
          updated_emp: ApiPath.updatedEmp, // login data from erp
          login_id: ApiPath.loginEmp,
          language: ApiPath.lang
        }
        let obj = { package_name: 'hr', url: ApiPath.salaryTransferSettingByGroupUpdate + editData, method: 'put', params }
        let response = await ApiRequest(obj);
        if (response.flag === false) {
          setError(response.message);
          setSuccess("");
          setLoading(false);
        } else {
          setError([]);
          setSuccess([response.data.message]);
          setEditData([]);
          setDeptState("");
          setPositionState("");
          setPaymentTypeState({})
          setFixedAmount({});
          if(parseInt(viewPermissionAPI)  !== 0) {
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
          }
          setAddIdList("");
          setMainTableSH("");
          setMainEmployeeList(false);
          setMainCurrency(false);
          setSalaryTransferState(false);
          setMainTable([]);
          setLoading(false);
        }
        // }
      }
    }
  };
  /** End Save/Update Function */


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
    currencySetting.forEach((main, index) => {
      main.priority_list.forEach((element, idx) => {
        element = { ...element, bank_currency_id: element.bank_currency_id, priority: element.priority, amount: parseInt(fixedAmount[main.currency_desc + idx]), amount_type: paymentTypeState[index] }
        payment_list.push(element)
      })
    });

    setLoading(true);
    let params = {
      company_id: ApiPath.companyID, // login data from erp
      employee_id: emp_data,
      payment_transfer_list: payment_list,
      created_emp: ApiPath.createdEmp, // login data from erp
      updated_emp: ApiPath.updatedEmp, // login data from erp
      login_id: ApiPath.loginEmp,
      language: ApiPath.lang
    }
    let obj = { package_name: 'hr', url: ApiPath.salaryTransferSettingByGroupOverwrite, method: 'post', params }
    let response = await ApiRequest(obj);  
  if (response.flag === false) {
      setError(response.message);
      setSuccess("");
      setLoading(false);
    } else {
      setError([]);
      setSuccess([response.data.message]);
      setDeptState("");
      setPositionState("");
      setPaymentTypeState({})
      setFixedAmount({});
      setMainEmployeeList(false);
      setMainCurrency(false);
      setSalaryTransferState(false);
      setMainTable([]);
      setLoading(false);
      if(parseInt(viewPermissionAPI)  !== 0) {
        setEmployeeID("");
        setEmployeeCode("");
        setEmployeeName("");
      }
    }
  }
  /** End Overwrite Save Function */


  /** Start Cancel All Data Function */
  let cancelData = () => {
    $('#searchBtn').show();
    setEditData([]);
    setDeptState("");
    setPositionState("");
    setEmployeeID("");
    setEmployeeCode("");
    setEmployeeName("");
    setAddIdList("");
    setMainTableSH("");
    setMainTable([]);
    setMainEmployeeList(false);
    setMainCurrency(false);
    setSalaryTransferState(false);
    setSelectedPaymentAccount([]);
  }
  /** End Cancel All Data Function */

  /** Start Edit Function */
  let editIndex = async(edit_id) => {
    let ammout_data = [];
    let obj = { package_name: 'hr', url: `${ApiPath.salaryTransferSettingByGroupDetail}${edit_id}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&login_id=${ApiPath.loginEmp}`, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(true);
    if (response.flag === false) {
      setError(response.message);
      setSuccess("");
      setMainTable([]);
      setLoading(false);
    } else {
      setLoading(false);
      const object = response.data.data;
            object.payment_transfer_list.map((item, idx) => {
              item.priority_list.map((i, index) => {
                ammout_data[item.currency_desc + index] = i.amount !== null ? i.amount : "";
                paymentTypeState[idx] = i.amount_type !== null ? i.amount_type : "";
              })
            });
            setFixedAmount(ammout_data);
            setRowCount('');
            setCurrencySetting(response.data.data.payment_transfer_list);
            setPaymentTypeState(paymentTypeState);

            // setEmployeeID(object.employee_id);
            // setEmployeeCode(object.emp_code);
            // setEmployeeName(object.emp_name);
            setMainCurrency(true);
            setMainTable([object]);
            setError([]);
            setSuccess("");
    }
  };

  /** End Edit Function */

  const cancelClick = () => {
    setOverWriteModalBox(false);
    setSaveModalBox(false);
  }

  return (
    <CRow>
      <CCol xs="12">
        {/* Error and success msg */}
        <Message success={success} error={error} />
        <Loading start={loading} />
        <CCard>
          <CCardHeader>
            <h5><CLabel className="mt-0">{t('Salary Transfer Setting By Group')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <ShowSalaryTransferSettingByGroup
              employeeList={employeeList} />
            <SearchSalaryTransferSettingByGroup
              mainEmployeeList={mainEmployeeList}
              editData={editData}
              empID={employeeID} empName={employeeName} empCode={employeeCode} idArr={idArr} nameArr={nameArr} codeArr={codeArr}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              setEmployeeCode={setEmployeeCode}
              setEmployeeName={setEmployeeName}
              setEmployeeID={setEmployeeID}
              deptArr={departmentAPI} changeDept={i => setDeptState(i.target.value)} deptID={deptState}
              posArr={positionAPI} changePos={i => setPositionState(i.target.value)} posID={positionState}
              searchAPI={searchAPI}
              paymentAccountAPI={paymentAccountAPI}
              paymentAccountChange={paymentAccountChange}
              paymentAccountState={paymentAccountState}
              salaryTransferState={salaryTransferState}
              salaryTransferChange={salaryTransferChange}
              viewPermissionAPI = {viewPermissionAPI}
            />

            <br />

            <SalaryTransferSettingByGroupTable
              mainTableSH={mainTableSH}
              rowCount={rowCount}
              change_checkbox={change_checkbox}
              mainTable={mainTable}
              currencyList={currencyList}
              AllCheck={AllCheck}
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

            <SalaryTransferSettingByGroupTableAdd
              mainCurrency={mainCurrency}
              rowCount={rowCount}
              mainTable={mainTable}
              removeRow={removeRow}
              editData={editData} />

            <SalaryTransferSettingByGroupCurrencyBox
              mainCurrency={mainCurrency}
              currencySetting={currencySetting}
              paymentTypeChange={paymentTypeChange}
              fixedAmountChange={fixedAmountChange}
              fixedAmount={fixedAmount} saveData={saveData}
              editData={editData}
              paymentTypeState={paymentTypeState} />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function SalaryTransferSettingByGroupIndex() {
  return (
    <Welcome />
  )
}