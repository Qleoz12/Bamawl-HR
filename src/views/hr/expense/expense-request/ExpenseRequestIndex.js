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
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlank, checkNullOrBlankString, validateDecimal } from '../../../hr/hr-common/common-validation/CommonValidation';
import ApproverListModalExpenseRequestBox from './ApproverListModalExpenseRequestBox';
import ExpenseRequestApproverTableBox from './ExpenseRequestApproverTableBox';
import ExpenseRequestBudgetTableBox from './ExpenseRequestBudgetTableBox';
import ExpenseRequestDetailInfoBox from './ExpenseRequestDetailInfoBox';
import ExpenseRequestGeneralInfoBox from './ExpenseRequestGeneralInfoBox';
import RequestExpenseRequest from './RequestExpenseRequest';

function LegacyWelcomeClass({ t, i18n }) {
  const [permission, setPermission] = useState(true) // for view permission
  const date = Moment(new Date).format("YYYY-MM-DD");

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const [popupError, setPopupError] = useState("");

  const [approverState, setApproverState] = useState("");
  const [approverData, setApproverData] = useState([]);

  const [clearData, setClearData] = useState('');
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [expenseDepartment, setExpenseDepartment] = useState('');

  const [expenseDepartmentData, setExpenseDepartmentData] = useState([])
  const [itemData, setItemData] = useState([]);
  const [expenseCategoryData, setExpenseCategoryData] = useState([]);
  const [currencyData, setCurrencyData] = useState([]);

  const [poNumber, setPONumber] = useState("");
  const [vendorCompany, setVendorCompany] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [exChangeRate, setExChangeRate] = useState("");
  const [phoneEmail, setPhoneEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [appliedDate, setAppliedDate] = useState(date);
  const [dueDate, setDueDate] = useState(date);

  const [itemModal, setItemModal] = useState(false);
  const [itemName, setItemName] = useState("");

  const [cashVoucher, setCashVoucher] = useState(true);
  const [prepaidVoucher, setPrepaidVoucher] = useState(false);

  const [need, setNeed] = useState(false);
  const [noNeed, setNoNeed] = useState(false);
  const [additionRadio, setAdditionRadio] = useState(false);
  const [additionData, setAdditionData] = useState("");
  const [amountRadio, setAmountRadio] = useState(false);

  const [item, setItem] = useState("");
  const [itemID, setItemID] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseCategoryID, setExpenseCategoryID] = useState("");
  const [unitPriceNumber, setUnitPriceNumber] = useState("");
  const [unitPriceCurrency, setUnitPriceCurrency] = useState("");
  const [unitPriceCurrencyID, setUnitPriceCurrencyID] = useState("");
  const [qty, setQty] = useState("");
  const [totalCardDetail, setTotalCardDetail] = useState("");
  const [amountCardDetail, setAmountCardDetail] = useState("");
  const [acceptCurrency, setAcceptCurrency] = useState("");
  const [acceptCurrencyID, setAcceptCurrencyID] = useState("");
  const [fxRateNumber, setFxRateNumber] = useState(1);
  const [description, setDescription] = useState("")
  const [arrangeAdmin, setArrangeAdmin] = useState(false);
  const [additionCheckbox, setAdditionCheckbox] = useState(false);

  /* Position and Department in Approver */
  const [departmentState, setDepartmentState] = useState("");
  const [positionState, setPositionState] = useState("");

  const [saveModalBox, setSaveModalBox] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  const [approverModalBox, setApproverModalBox] = useState(false);

  const [mainTable, setMainTable] = useState([]); // for main table
  const [mainTableModal, setMainTableModal] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(0);    // for row count

  const typingTimeoutRef = useRef(null);    // keep value time out 
  const [loading, setLoading] = useState(false);
  const [expenseDetailID, setExpenseDetailID] = useState("");

  const [removeOtherAttachment, setRemoveOtherAttachment] = useState([]);
  const [removeDetailAttachment, setRemoveDetailAttachment] = useState([]);
  const [removeDetailRow, setRemoveDetailRow] = useState([]);

  const [otherAttachmentLoad, setOtherAttachmentLoad] = useState([]);
  const [detailAttachmentLoad, setDetailAttachmentLoad] = useState([]);

  const [dynamicTable, setDynamicTable] = useState([]);

  const [totalCurrency, setTotalCurrency] = useState([]);
  const [totalCurrencyNotInclude, setTotalCurrencyNotInclude] = useState([]);
  const [totalCurrencyAddition, setTotalCurrencyAddition] = useState([]);
  const [totalCurrencyAmount, setTotalCurrencyAmount] = useState([]);

  const [positionRank, setPositionRank] = useState(false);

  const [checkAllCheckboxDynamic, setCheckAllCheckboxDynamic] = useState(true);
  const [approverSetting, setApproverSetting] = useState("");
  const [rowCountApproverData, setRowCountApproverData] = useState(0);    // for row count


  /** Start Form Load */
  useEffect(() => {
    setLoading(true);
    loadCurrencies();
    loadViewPermission();
    loadExpenseItems();
    loadExpenseCategory();
    loadExpenseAdvanceAdditional();
    loadExpenseDepartment();
    getRankPosition()
    if (!JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_REQUEST_DATA"))) {
      setExpenseDetailID("");
    } else {
      let expense_id = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_REQUEST_DATA"));
      sessionStorage.removeItem("RETURN_EXPENSE_REQUEST_DATA");
      setExpenseDetailID(expense_id);
      getDetailExpenseRequestAPI(expense_id);
    }
    // return data from EXPENSE List Form

  }, [loadExpenseAdvanceAdditional,
    loadCurrencies,
    loadExpenseCategory,
    loadExpenseItems,
    loadViewPermission,
    loadExpenseDepartment,
    getDetailExpenseRequestAPI,
  ]);
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

  const removeMessagePopup = () => {
    setPopupError("");
  }
  /* Remove Message End */

  /**
   * Load view permission user login
   */
  const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    };
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setPermission(response.data.autocomplete);
      if (response.data.autocomplete === false) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
        setDepartmentName(response.data.data[ApiPath.loginEmp].employee_has_dept_position[0].departments.department_name);
        setPositionName(response.data.data[ApiPath.loginEmp].employee_has_dept_position[0].positions.position_name);
        loadApprover(response.data.data[ApiPath.loginEmp].employee_id);
        getRankPosition(response.data.data[ApiPath.loginEmp].employee_id)
      }
    }
  }


  /**
  * Load Expense Items
  */
  const loadExpenseItems = async (init) => {
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetExpenseItem, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setItemData(response.data.data);
      if (init) {
        setItem(response.data.data[response.data.data.length - 1].expense_item);
        setItemID(response.data.data[response.data.data.length - 1].id);
      }
    }
  };

  /**
  * Load Expense Category
  */
  const loadExpenseCategory = async () => {
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetExpenseCategory, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setExpenseCategoryData(response.data.data);
    }
  };

  /**
  Load Currencies
  */
  const loadCurrencies = async (init) => {
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetCurrencies, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setCurrencyData(response.data.data);
      if (response.data.data && response.data.data.length > 0) {
        setUnitPriceCurrency(response.data.data[0].currency_desc);
        setUnitPriceCurrencyID(response.data.data[0].id)
        let currency_expense = response.data.data.filter(data => parseInt(data.expense_flag) === 1);
        if (currency_expense && currency_expense.length > 0) {
          setAcceptCurrency(currency_expense[0].currency_desc);
          setAcceptCurrencyID(currency_expense[0].id)
        }
        if (!expenseDetailID || init) {
          createTotalCurrency(response.data.data);
          createTotalCurrencyNot(response.data.data);
          createTotalCurrencyAddition(response.data.data);
          createTotalCurrencyAmount(response.data.data);
        }
      }
    }
  };

  /**
* Get Rank Position Employee
*/
  const getRankPosition = async (employeeID, status) => {
    let params = {
      company_id: ApiPath.companyID,
      employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetPositionRank, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setPositionRank(response.data.data.has_rank_zero);
      setApproverSetting(response.data.data.approver_setting);
      if (employeeID !== undefined) {
        if ([2, 3, 4, 5].includes(response.data.data.approver_setting)
          && !response.data.data.has_rank_zero && status !== true) {
          loadApproverDataAPI(employeeID);
        }
      }
    }
  };

  /* Load Approver Data API Start */
  const loadApproverDataAPI = async (employeeID) => {
    setLoading(true)
    let params = {
      company_id: ApiPath.companyID,
      employee_id: employeeID,
    }
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestLoadApproverData, method: 'post', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError([])
      setMainTable([]);
    }
    else {
      setMainTable(response.data.data);
      setRowCountApproverData(response.data.row_count);
      setError([]);
      setSuccess([]);
    }
  }
  /* Load Approver Data API End */

  /**
  Load Expense Advance Additional
  */
  const loadExpenseAdvanceAdditional = async () => {
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetExpenseAdvanceAdditional, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setError([]) : setAdditionData(response.data.data.expense_advance_additional);
  };

  /* Get Employee Autocomplete  Start*/
  const changeAutocomplete = async (type, i) => {
    setError([]); setSuccess([]); setClearData(''); setMainTable([]);
    setApproverState(""); setApproverData([]);

    // type is id, show name in Employee ID and clear remain input
    if (type === 'id') {
      setEmployeeID(i.target.value); setEmployeeCode(''); setEmployeeName('');
      setDepartmentName("");
      setPositionName("");
    }
    // type is code, show name in Employee Code and clear remain input
    else if (type === 'code') {
      setEmployeeID(''); setEmployeeCode(i.target.value); setEmployeeName('');
      setDepartmentName("");
      setPositionName("");
    }
    // type is name, show name in Employee Name and clear remain input
    else {
      setEmployeeID(''); setEmployeeCode(''); setEmployeeName(i.target.value);
      setDepartmentName("");
      setPositionName("");
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
    setMainTable([])
    let object = {
      package_name: 'erp',
      url: ApiPath.employeeAutoCompleteResult,
      method: 'post',
      params: { id: obj.id, company_id: ApiPath.companyID }
    };
    let response1 = await ApiRequest(object);
    if (response1.flag === false) {
      setError(response1.message);
    } else {
      setEmployeeID(response1.data.data[0].employee_id);
      setEmployeeName(response1.data.data[0].name);
      setEmployeeCode(response1.data.data[0].employee_code);

      loadApprover(response1.data.data[0].employee_id);
      getRankPosition(response1.data.data[0].employee_id)

      let searchEmp = {
        package_name: 'erp',
        url: ApiPath.ERPSearchEmployee,
        method: 'post',
        params: { employee_id: response1.data.data[0].employee_id, company_id: ApiPath.companyID }
      }
      let response2 = await ApiRequest(searchEmp);
      if (response2.flag === false) {
        setError(response2.message);
      } else {
        setDepartmentName(response2.data.data[0].employee_has_dept_position.map((i) => i.departments.department_name));
        setPositionName(response2.data.data[0].employee_has_dept_position.map((i) => i.positions.position_name));
      }
    }
  }

  /* Get Employee Autocomplete  End*/

  /* Create Item API Start */
  const createItemAPI = async () => {
    if (validateCreateItemAPI()) {
      setLoading(true)
      let params = {
        login_id: ApiPath.loginEmp,
        expense_item: itemName
      }
      let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestItemsRegistration, method: 'post', params }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setPopupError(response.message)
      }
      else {
        closeItemModal();
        loadExpenseItems(true);
      }
    }
  }
  /* Create Item API End */

  /* Search Approver API Start */
  const searchApproverAPI = async () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (validateSearch()) {
      typingTimeoutRef.current = setTimeout(async () => {
        setLoading(true)
        let params = {
          company_id: ApiPath.companyID,
          employee_id: employeeID,
          language: ApiPath.lang,
          position_id: positionState,
          department_id: departmentState
        }
        let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestSearchApprover, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setError("")
          setMainTableModal([]);
          openApproverModal();
        }
        else {
          setRowCount(t('Total Rows').replace('%s', response.data.row_count));
          setMainTableModal(response.data.data);
          setError([]);
          setSuccess([]);
          openApproverModal();
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* Search Approver API End */

  /* Expense Request API Start */
  const expenseRequestAPI = async () => {
    setSaveModalBox(!saveModalBox);
    setLoading(true);
    let formData = new FormData();
    formData.append("company_id", ApiPath.companyID);
    formData.append("login_id", ApiPath.loginEmp);
    formData.append("employee_id", employeeID);
    formData.append("expense_department_id", expenseDepartment);
    formData.append("po_number", poNumber);
    formData.append("vendor_company", vendorCompany);
    formData.append("vendor_name", vendorName);
    formData.append("contact_ph_email", phoneEmail);
    formData.append("exchange_rate", exChangeRate);
    formData.append("requested_date", date);
    formData.append("due_date", dueDate);
    formData.append("subject", subject);
    formData.append("payment_flag", cashVoucher === true ? 1 : 2);
    if (!cashVoucher) {
      if (noNeed === true) {
        formData.append("advance_flag", 1);
      } else if (additionRadio === true) {
        formData.append("advance_flag", 2);
      } else {
        formData.append("advance_flag", 3);
        totalCurrencyAmount.map((ica, indexIca) => {
          formData.append("specified_amount[" + indexIca + "][currency_id]", ica.currency_id_amount);
          formData.append("specified_amount[" + indexIca + "][advance_amount]", ica.total_currency_amount);
        })
      }
    }
    let index_attach = 0;
    dynamicTable.map((i, index) => {
      formData.append("details[" + index + "][expense_item_id]", i.item_id);
      formData.append("details[" + index + "][expense_category_id]", i.expense_category_id);
      formData.append("details[" + index + "][unit_price]", i.price_number);
      formData.append("details[" + index + "][qty]", i.qty);
      formData.append("details[" + index + "][currency_id]", i.price_currency_id);
      formData.append("details[" + index + "][fx_rate]", i.fx_rate);
      formData.append("details[" + index + "][accept_currency_id]", i.accept_currency_id);
      formData.append("details[" + index + "][arrange_by_admin]", i.arrange_admin === true ? 1 : 0);
      formData.append("details[" + index + "][additional_advance_item]", i.is_checked === true ? 1 : 0,);
      formData.append("details[" + index + "][description]", i.description);
      if (i.attachment && i.attachment.length > 0) {
        i.attachment.map((it) => {
          formData.append("details[" + index + "][attachment][" + index_attach + "]", it);
          index_attach++;
        })
      }
    })
    multiFileOtherAttach.map((iFile, indexFile) => {
      formData.append("other_attachment[" + indexFile + "]", iFile);
    })
    mainTable.map((iMain, indexMain) => {
      formData.append("approver_id[" + indexMain + "]", iMain.approver_id);
    })
    let params = formData;
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestSaveRequest, method: 'post', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message)
    }
    else {
      setSuccess([response.data.message]);
      resetForm();
    }
  }
  /* Expense Request API End */

  /* Get Detail Expense Request API Start */
  const getDetailExpenseRequestAPI = async (expense_id) => {
    setLoading(true);
    let params = {
      company_id: ApiPath.companyID,
      login_id: ApiPath.loginEmp,
      expense_id: expense_id,
      language: ApiPath.lang
    }
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestGetDetail, method: 'post', params }
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError(response.message)
    }
    else {
      setLoading(false);
      let get_detail = response.data.data;
      setEmployeeID(get_detail.employee_id); 
      setEmployeeCode(get_detail.employee_code);
      setEmployeeName(get_detail.employee_name);
      if (get_detail.employee_id){
        loadApprover(get_detail.employee_id);
        getRankPosition(get_detail.employee_id, true);
      }
      if (get_detail.employee_has_dept_position && get_detail.employee_has_dept_position.length > 0) {
        setDepartmentName(get_detail.employee_has_dept_position.map((i) => i.departments.department_name));
        setPositionName(get_detail.employee_has_dept_position.map((i) => i.positions.position_name));
      }
      setExpenseDepartment(get_detail.expense_department_id ? get_detail.expense_department_id : "");
      setPONumber(get_detail.po_number ? get_detail.po_number : "");
      setVendorCompany(get_detail.vendor_company ? get_detail.vendor_company : "");
      setVendorName(get_detail.vendor_name ? get_detail.vendor_name : "");
      setExChangeRate(parseFloat(get_detail.exchange_rate));
      setPhoneEmail(get_detail.contact_ph_email ? get_detail.contact_ph_email : "");
      setSubject(get_detail.subject ? get_detail.subject : "");
      setAppliedDate(get_detail.requested_date);
      setDueDate(get_detail.due_date)
      if (get_detail.payment_flag === 1) {
        setCashVoucher(true)
      } else {
        setPrepaidVoucher(true);
        setCashVoucher(false)
      }
      if (get_detail.payment_flag !== 1) {
        if (get_detail.advance_flag === 1) {
          setNoNeed(true)
          setNeed(false);
          setAdditionRadio(false);
          setAmountRadio(false);
        } else if (get_detail.advance_flag === 2) {
          setNeed(true);
          setAdditionRadio(true);
          setAmountRadio(false);
          let currency_data_add = [];
          get_detail.currencies.map((ic) => {
            get_detail.budget.advance_money.map(ib => {
              if (ib.currency_id === ic.id && ic.expense_flag === 1) {
                let data = {
                  currency_id_add: ic.id,
                  currency_desc_add: ic.currency_desc,
                  total_currency_add: ib.amount !== null ? parseFloat(ib.amount) : 0
                }
                currency_data_add.push(data);
              }
            })
          })
          setTotalCurrencyAddition(currency_data_add);
        } else {
          setNeed(true);
          setAdditionRadio(false);
          setAmountRadio(true);
          let currency_data_amount = [];
          let amount_state = [];
          get_detail.currencies.map((ic) => {
            get_detail.budget.advance_money.map(ib => {
              if (ib.currency_id === ic.id && ic.expense_flag === 1) {
                let data = {
                  currency_id_amount: ic.id,
                  currency_desc_amount: ic.currency_desc,
                  total_currency_amount: ib.amount !== null ? parseFloat(ib.amount) : 0
                }
                currency_data_amount.push(data);
                amount_state.push(parseFloat(ib.amount));
              }
            })
          })
          setTotalCurrencyAmount(currency_data_amount);
          setAmountBudgetState(amount_state);
        }
      }
      let data_table = [];
      let data_attach_table = []
      get_detail.details.map(ie => {
        let data = {
          idDynamicTable: ie.expense_detail_id,
          item: ie.expense_item,
          expense_category: ie.expense_category,
          attachment: ie.attach_file,
          description: ie.description,
          price_number: parseFloat(ie.unit_price),
          qty: parseFloat(ie.qty),
          total: Math.round((ie.unit_price * ie.qty) * 100) / 100,
          price_currency: get_detail.currencies.find(e => e.id === ie.currency_id).currency_desc ?
            get_detail.currencies.find(e => e.id === ie.currency_id).currency_desc : "",
          price_currency_id: get_detail.currencies.find(e => e.id === ie.currency_id).id ?
            get_detail.currencies.find(e => e.id === ie.currency_id).id : "",
          fx_rate: parseFloat(ie.fx_rate),
          accept_currency: get_detail.currencies.find(e => e.id === ie.accept_currency_id).currency_desc ?
            get_detail.currencies.find(e => e.id === ie.accept_currency_id).currency_desc : "",
          accept_currency_id: get_detail.currencies.find(e => e.id === ie.accept_currency_id).id ?
            get_detail.currencies.find(e => e.id === ie.accept_currency_id).id : "",
          amount: parseFloat(ie.cost),
          arrange_admin: ie.arrange_by_admin === 1 ? true : false,
          additional_advance_item: ie.additional_advance_item === 1 ? true : false,
          is_checked: ie.additional_advance_item === 1 ? true : false,
          data_load: true
        }
        data_table.push(data);
        data_attach_table.push(ie.attach_file);
      })
      setDynamicTable(data_table);
      setDetailAttachmentLoad(data_attach_table);
      setAllCheckDynamic(data_table.every(item => item.is_checked));
      setCheckAllCheckboxDynamic(false);
      let currency_data = [];
      get_detail.currencies.map((ic) => {
        get_detail.budget.budget_total.map(ib => {
          if (ib.currency_id === ic.id && ic.expense_flag === 1) {
            let data = {
              currency_id: ic.id,
              currency_desc: ic.currency_desc,
              total_currency: ib.amount !== null ? parseFloat(ib.amount) : 0
            }
            currency_data.push(data);
          }
        })
      })
      setTotalCurrency(currency_data);

      let currency_data_not_include = [];
      get_detail.currencies.map((ic) => {
        get_detail.budget.total_not_include_admin_arrange.map(ib => {
          if (ib.currency_id === ic.id && ic.expense_flag === 1) {
            let data = {
              currency_id_not: ic.id,
              currency_desc_not: ic.currency_desc,
              total_currency_not: ib.amount !== null ? parseFloat(ib.amount) : 0
            }
            currency_data_not_include.push(data);
          }
        })
      })
      setTotalCurrencyNotInclude(currency_data_not_include);

      setMultiFileOtherAttach(get_detail.other_attach ? get_detail.other_attach : [])
      setMainTable(get_detail.approvers);
      setRowCountApproverData(get_detail.approvers.length);
      setOtherAttachmentLoad(get_detail.other_attach ? get_detail.other_attach : [])
    }
  }
  /* Get Detail Expense Request API End */

  /* Update Expense Request API End */
  const updateExpenseRequestAPI = async () => {
    setSaveModalBox(!saveModalBox);
    setLoading(true);
    let formData = new FormData();
    formData.append("_method", "PUT");
    formData.append("company_id", ApiPath.companyID);
    formData.append("login_id", ApiPath.loginEmp);
    formData.append("employee_id", employeeID);
    formData.append("expense_department_id", expenseDepartment);
    formData.append("po_number", poNumber);
    formData.append("vendor_company", vendorCompany);
    formData.append("vendor_name", vendorName);
    formData.append("contact_ph_email", phoneEmail);
    formData.append("exchange_rate", exChangeRate);
    formData.append("requested_date", date);
    formData.append("due_date", dueDate);
    formData.append("subject", subject);
    formData.append("payment_flag", cashVoucher === true ? 1 : 2);
    if (prepaidVoucher === true) {
      if (noNeed === true) {
        formData.append("advance_flag", 1);
      } else if (additionRadio === true) {
        formData.append("advance_flag", 2);
      } else {
        formData.append("advance_flag", 3);
        totalCurrencyAmount.map((ica, indexIca) => {
          formData.append("specified_amount[" + indexIca + "][currency_id]", ica.currency_id_amount);
          formData.append("specified_amount[" + indexIca + "][advance_amount]", ica.total_currency_amount);
        })
      }
    }
    let index_attach = 0;
    dynamicTable.map((i, index) => {
      if (!i.data_load) {
        formData.append("details[" + index + "][expense_item_id]", i.item_id);
        formData.append("details[" + index + "][expense_category_id]", i.expense_category_id);
        formData.append("details[" + index + "][unit_price]", i.price_number);
        formData.append("details[" + index + "][qty]", i.qty);
        formData.append("details[" + index + "][currency_id]", i.price_currency_id);
        formData.append("details[" + index + "][fx_rate]", i.fx_rate);
        formData.append("details[" + index + "][accept_currency_id]", i.accept_currency_id);
        formData.append("details[" + index + "][arrange_by_admin]", i.arrange_admin === true ? 1 : 0);
        formData.append("details[" + index + "][additional_advance_item]", i.is_checked === true ? 1 : 0,);
        formData.append("details[" + index + "][description]", i.description);
        if (i.attachment && i.attachment.length > 0) {
          i.attachment.map((it) => {
            formData.append("details[" + index + "][attachment][" + index_attach + "]", it);
            index_attach++;
          })
        }
      }
    })
    let multiFileOtherAttachTemp = multiFileOtherAttach.filter(e => otherAttachmentLoad.indexOf(e) === -1)
    multiFileOtherAttachTemp.map((iFile, indexFile) => {
      formData.append("other_attachment[" + indexFile + "]", iFile);
    })
    removeOtherAttachment.map((iro, indexRo) => {
      formData.append("remove_other_attachment[" + indexRo + "]", iro.id);
    })
    removeDetailAttachment.map((idt, indexDetail) => {
      formData.append("remove_detail_attachment[" + indexDetail + "]", idt.id);
    })
    removeDetailRow.map((ird, indexIrd) => {
      formData.append("remove_detail[" + indexIrd + "]", ird.idDynamicTable);
    })
    mainTable.map((iMain, indexMain) => {
      formData.append("approver_id[" + indexMain + "]", iMain.approver_id);
    })

    let params = formData;
    let obj = { package_name: 'hr', url: ApiPath.ExpenseRequestUpdateRequest + expenseDetailID, method: 'post', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message)
    }
    else {
      setSuccess([response.data.message]);
      setExpenseDetailID("");
      resetForm(true);
    }
  }
  /* Update Expense Request API End */

  /* loadApprover */
  const loadApprover = async (empID) => {
    let params = {
      company_id: ApiPath.companyID,
      employee_id: empID,
      device_flag: 1
    }
    let data = {
      package_name: 'erp',
      url: ApiPath.ERPApproverList,
      method: 'post',
      params
    }
    let response = await ApiRequest(data);
    setLoading(false);
    if (response.flag !== false) {
      setApproverData(response.data.data);
    }
  }

  /* loadExpenseDepartment */
  const loadExpenseDepartment = async () => {
    let data = {
      package_name: 'erp',
      url: ApiPath.ERPGetDepartment,
      method: 'get',
    }
    let response = await ApiRequest(data);
    setLoading(false);
    if (response.flag !== false) {
      setExpenseDepartmentData(response.data.data);
    }
  }

  /* changeEvent */
  const changeExpenseDepartment = (e) => {
    setExpenseDepartment(e.target.value)
  }
  const changePONumber = (e) => {
    setPONumber(e.target.value)
  }
  const changeVendorCompany = (e) => {
    setVendorCompany(e.target.value)
  }
  const changeVendorName = (e) => {
    setVendorName(e.target.value)
  }
  const changeExchangeRate = (e) => {
    if (isDecimalExchangeRate(e.target.value)) {
      setExChangeRate(e.target.value)
    }
  }
  const changePhoneEmail = (e) => {
    setPhoneEmail(e.target.value)
  }
  const changeSubject = (e) => {
    setSubject(e.target.value)
  }
  const changeItem = (e) => {
    setItem(e.target.value)
    setItemID(e.target[e.target.selectedIndex].id)
  }
  const changeExpenseCategory = (e) => {
    setExpenseCategory(e.target.value)
    setExpenseCategoryID(e.target[e.target.selectedIndex].id)
  }
  const changeUnitPriceCurrency = (e) => {
    setUnitPriceCurrency(e.target.value)
    setUnitPriceCurrencyID(parseInt(e.target[e.target.selectedIndex].id));
  }
  const changeAcceptCurrency = (e) => {
    setAcceptCurrency(e.target.value)
    setAcceptCurrencyID(parseInt(e.target[e.target.selectedIndex].id))
  }
  const changeNeedRadio = (e) => {
    setNeed(true);
    setNoNeed(false)
    setAdditionRadio(true)
    setAmountRadio(false)
  }

  const changeNoNeedRadio = (e) => {
    setNeed(false);
    setNoNeed(true);
    setAdditionRadio(false)
    setAmountRadio(false)
    setAdditionCheckbox(false);
    setAllCheckDynamic(false);
    if (expenseDetailID) {
      setDynamicTable(dynamicTable.map(item => item.data_load ? item : ({ ...item, is_checked: false })));
    } else {
      setDynamicTable(dynamicTable.map(item => ({ ...item, is_checked: false })));
    }
  }

  const changeAmountRadio = (e) => {
    setAdditionRadio(false)
    setAmountRadio(true)
    setAdditionCheckbox(false);
    let amount = Object.assign({}, amountBudgetState)
    totalCurrencyNotInclude.map((it, index) => {
      amount[index] = it.total_currency_not;
    })
    totalCurrencyAmount.map((it, index) => {
      it.total_currency_amount = amount[index]
    })
    setAmountBudgetState(amount);
    setAllCheckDynamic(false);
    if (expenseDetailID) {
      setDynamicTable(dynamicTable.map(item => item.data_load ? item : ({ ...item, is_checked: false })));
    } else {
      setDynamicTable(dynamicTable.map(item => ({ ...item, is_checked: false })));
    }

  }

  const changeAdditionRadio = (e) => {
    setAdditionRadio(true)
    setAmountRadio(false)
      let data = dynamicTable;
      totalCurrencyAddition.map(it => it.total_currency_add = 0);
      data.map(item => {
        totalCurrencyAddition.map(it => {
          if (it.currency_id_add === item.accept_currency_id) {
            if (item.is_checked === true && item.arrange_admin === false) {
              it.total_currency_add += (item.amount + item.amount * additionData / 100);
              it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
            }
          }
        })
      })
  }

  const changeArrangeAdmin = (e) => {
    setArrangeAdmin(e.target.checked)
  }

  const changeAdditionCheckbox = (e) => {
    setAdditionCheckbox(e.target.checked)
  }

  const changeUnitPriceNumber = (e) => {
    if (isDecimal(e.target.value)) {
      setUnitPriceNumber(e.target.value)
      if (qty !== "") {
        let unitTemp = Math.round(e.target.value * 100) / 100;
        let qtyTemp = Math.round(qty * 100) / 100;
        let fxRateNumberTemp = fxRateNumber;
        setTotalCardDetail(Math.round((unitTemp * qtyTemp) * 100) / 100);
        setAmountCardDetail(Math.round((unitTemp * qtyTemp * fxRateNumberTemp) * 100) / 100);
      }
      else {
        setTotalCardDetail("");
        setAmountCardDetail("")
      }
    }
  }
  const changeQty = (e) => {
    if (isDecimalAmount(e.target.value)) {
      setQty(e.target.value)
      if (unitPriceNumber !== "") {
        let qtyTemp = Math.round(e.target.value * 100) / 100;
        let unitPriceNumberTemp = Math.round(unitPriceNumber * 100) / 100;
        let fxRateNumberTemp = fxRateNumber;
        setTotalCardDetail(Math.round((qtyTemp * unitPriceNumberTemp) * 100) / 100);
        setAmountCardDetail(Math.round((qtyTemp * unitPriceNumberTemp * fxRateNumberTemp) * 100) / 100);
      }
      else {
        setTotalCardDetail("");
        setAmountCardDetail("")
      }
    }
  }
  const changeDescription = (e) => {
    setDescription(e.target.value)
  }
  const changeFXRateNumber = (e) => {
    if (isDecimalExchangeRate(e.target.value)) {
      setFxRateNumber(e.target.value)
      if (totalCardDetail !== "") {
        let fxRateTemp = e.target.value;
        let qtyTemp = Math.round(qty * 100) / 100;
        let unitPriceNumberTemp = Math.round(unitPriceNumber * 100) / 100;
        setAmountCardDetail(Math.round((qtyTemp * unitPriceNumberTemp * fxRateTemp) * 100) / 100);
      }
      else {
        setAmountCardDetail("")
      }
    }
  }
  const changeFXRateNumberSelect = (e) => {
    setFxRateNumber(e)
    if (totalCardDetail !== "") {
      let fxRateTemp = e;
      let qtyTemp = Math.round(qty * 100) / 100;
      let unitPriceNumberTemp = Math.round(unitPriceNumber * 100) / 100;
      setAmountCardDetail(Math.round((qtyTemp * unitPriceNumberTemp * fxRateTemp) * 100) / 100);
    }
    else {
      setAmountCardDetail("")
    }
  }

  const changeItemName = (e) => {
    setItemName(e.target.value)
  }

  const changePaymentCash = (e) => {
    setCashVoucher(true);
    setPrepaidVoucher(false)
    setNeed(false);
    setNoNeed(false);
    setAdditionRadio(false);
    setAmountRadio(false);
    setAdditionCheckbox(false);
    setAllCheckDynamic(false);
    if (expenseDetailID) {
      setDynamicTable(dynamicTable.map(item => item.data_load ? item : ({ ...item, is_checked: false })));
    } else {
      setDynamicTable(dynamicTable.map(item => ({ ...item, is_checked: false })));
    }
  }

  const changePaymentPrepaid = (e) => {
    setCashVoucher(false);
    setPrepaidVoucher(true)
    setNeed(true);
    setAdditionRadio(true);
    if (expenseDetailID) {
      let data = dynamicTable;
      totalCurrencyAddition.map(it => it.total_currency_add = 0);
      data.map(item => {
        totalCurrencyAddition.map(it => {
          if (it.currency_id_add === item.accept_currency_id) {
            if (item.is_checked === true && item.arrange_admin === false) {
              it.total_currency_add += (item.amount + item.amount * additionData / 100);
              it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
            }
          }
        })
      })
    }
  }

  const [amountBudgetState, setAmountBudgetState] = useState([]);
  const changeAmountBudget = (e, id, index) => {
    if (isDecimalAmount(e.currentTarget.value)) {
      let amount = Object.assign({}, amountBudgetState)
      amount[index] = e.currentTarget.value;
      setAmountBudgetState(amount);
      totalCurrencyAmount.map(i => {
        if (i.currency_id_amount === id)
          i.total_currency_amount = parseFloat(e.target.value);
      })
    }
  }

  /* changeEvent */

  const createTotalCurrency = (currency) => {
    let currency_data = [];
    currency.map(i => {
      if (i.expense_flag === 1) {
        let data = {
          currency_id: i.id,
          currency_desc: i.currency_desc,
          total_currency: 0.00
        }
        currency_data.push(data);
      }
    })
    setTotalCurrency(currency_data);
  }

  const createTotalCurrencyNot = (currency) => {
    let currency_data = [];
    let budget_amount_data = [];
    currency.map(i => {
      if (i.expense_flag === 1) {
        let data = {
          currency_id_not: i.id,
          currency_desc_not: i.currency_desc,
          total_currency_not: 0.00
        }
        currency_data.push(data);
        budget_amount_data.push(0.00)
      }
    })
    setTotalCurrencyNotInclude(currency_data);
    setAmountBudgetState(budget_amount_data);
  }

  const createTotalCurrencyAddition = (currency) => {
    let currency_data = [];
    currency.map(i => {
      if (i.expense_flag === 1) {
        let data = {
          currency_id_add: i.id,
          currency_desc_add: i.currency_desc,
          total_currency_add: 0.00
        }
        currency_data.push(data);
      }
    })
    setTotalCurrencyAddition(currency_data);
  }

  const createTotalCurrencyAmount = (currency) => {
    let currency_data = [];
    currency.map(i => {
      if (i.expense_flag === 1) {
        let data = {
          currency_id_amount: i.id,
          currency_desc_amount: i.currency_desc,
          total_currency_amount: 0.00
        }
        currency_data.push(data);
      }
    })
    setTotalCurrencyAmount(currency_data);
  }

  const isDecimal = (value) => {
    var decimalOnly = /^[]*?(\d{0,8})(\.\d{0,2})?$/;
    if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
      return true;
    }
    return false;
  }

  const isDecimalExchangeRate = (value) => {
    var decimalOnly = /^[]*?(\d{0,6})(\.\d{0,6})?$/;
    if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
      return true;
    }
    return false;
  }

  const isDecimalAmount = (value) => {
    var decimalOnly = /^[]*?(\d{0,18})(\.\d{0,2})?$/;
    if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
      return true;
    }
    return false;
  }

  /* Validate */
  const validateCreateItemAPI = () => {
    let arrMsg = [];
    setError([]);
    setPopupError([]);
    setSuccess([]);
    if (!checkNullOrBlank(itemName)) {
      let errMsg = t("JSE124").replace("%s", t("Item Name"));
      arrMsg.push(errMsg);
    } else if (itemName.trim().length <= 0) {
      let errMsg = t("JSE124").replace("%s", t("Item Name"));
      arrMsg.push(errMsg);
    } else if (itemName.length > 500) {
      let errMsg = t("JSE123").replace("%s", t("Item Name")).replace("%s", t("500"));
      arrMsg.push(errMsg);
    }

    if (arrMsg.length > 0) {
      setPopupError(arrMsg);
      setSuccess([]);
    } else { return true }
  }

  const validateExpenseRequest = () => {
    let arrMsg = [];
    setError([]);
    setSuccess([]);

    if (!checkNullOrBlank(employeeID)) {
      let errMsg = t("JSE001").replace("%s", t("Employee ID"));
      arrMsg.push(errMsg);
    }

    if (poNumber && poNumber.length > 10) {
      let errMsg = t("JSE123").replace("%s", t("P.O No")).replace("%s", t("10"));
      arrMsg.push(errMsg);
    }

    if (vendorCompany && vendorCompany.length > 500) {
      let errMsg = t("JSE123").replace("%s", t("Vendor Company")).replace("%s", t("500"));
      arrMsg.push(errMsg);
    }

    if (vendorName && vendorName.length > 500) {
      let errMsg = t("JSE123").replace("%s", t("Vendor Name")).replace("%s", t("500"));
      arrMsg.push(errMsg);
    }

    if (phoneEmail && phoneEmail.length > 30) {
      let errMsg = t("JSE123").replace("%s", t("Phone/Email")).replace("%s", t("30"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(exChangeRate.toString())) {
      let errMsg = t("JSE124").replace("%s", t("Exchange Rate"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(exChangeRate) || parseFloat(exChangeRate) < 0) {
      let errMsg = t("JSE005").replace("%s", t("Exchange Rate"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(exChangeRate) || parseFloat(exChangeRate) > 999999.999999) {
      let errMsg = t("JSE007").replace("%s", t("Exchange Rate")).replace("%s", t("999999.999999"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(subject)) {
      let errMsg = t("JSE124").replace("%s", t("Subject"));
      arrMsg.push(errMsg);
    } else if (subject.trim().length <= 0) {
      let errMsg = t("JSE124").replace("%s", t("Subject"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(dueDate)) {
      let errMsg = t("JSE001").replace("%s", t("Due Date"));
      arrMsg.push(errMsg);
    } else if (expenseDetailID) {
      if (appliedDate > dueDate) {
        let errMsg = t("JSE007").replace("%s", t("Due Date")).replace("%s", t("Applied Date"));
        arrMsg.push(errMsg);
      }
    } else if (date > dueDate) {
      let errMsg = t("JSE007").replace("%s", t("Due Date")).replace("%s", t("Applied Date"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(appliedDate)) {
      let errMsg = t("JSE001").replace("%s", t("Applied Date"));
      arrMsg.push(errMsg);
    }

    if ((dynamicTable && dynamicTable.length <= 0)) {
      let errMsg = t("JSE173")
      arrMsg.push(errMsg);
    }

    if (!positionRank) {
      if (!mainTable || mainTable.length <= 0) {
        let errMsg = t("JSE126").replace("%s", t("the approver for your request"))
        arrMsg.push(errMsg);
      } else {
        let checkApprover = mainTable.filter(item => item.approver_or_checker == 1);
        if (checkApprover.length <= 0) {
          let errMsg = t('JSE177');
          arrMsg.push(errMsg);
        }
      }
    }

    if (amountRadio) {
      let amount = Object.assign({}, amountBudgetState)
      for (let i = 0; i < totalCurrencyAmount.length; i++) {
        if ((amount[i]) === "" || (amount[i]) === null) {
          let errMsg = t('JSE124').replace('%s', t('Advanced Money' + ' ' + totalCurrencyAmount[i].currency_desc_amount));
          arrMsg.push(errMsg);
        } else if (!validateDecimal(amount[i]) || parseFloat(amount[i]) < 0) {
          let errMsg = t("JSE005").replace("%s", t("Advanced Money" + ' ' + totalCurrencyAmount[i].currency_desc_amount));
          arrMsg.push(errMsg);
        } else if (!validateDecimal(amount[i]) || parseFloat(amount[i]) > 999999999999999999.99) {
          let errMsg = t("JSE007").replace("%s", t("Advanced Money" + ' ' + totalCurrencyAmount[i].currency_desc_amount)).replace("%s", t("999999999999999999.99"));
          arrMsg.push(errMsg);
        }
      }
    }

    if (arrMsg.length > 0) {
      setError(arrMsg);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else { return true }
  }

  const validDynamicTable = () => {
    let arrMsg = [];
    setError([]);
    setSuccess([]);
    if (!checkNullOrBlank(itemID)) {
      let errMsg = t("JSE001").replace("%s", t("Item"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(unitPriceNumber)) {
      let errMsg = t("JSE124").replace("%s", t("Unit Price"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(unitPriceNumber) || parseFloat(unitPriceNumber) < 0) {
      let errMsg = t("JSE124").replace("%s", t("number only"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(unitPriceNumber) || parseFloat(unitPriceNumber) > 99999999.99) {
      let errMsg = t("JSE007").replace("%s", t("Unit Price")).replace("%s", t("99999999.99"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(unitPriceCurrencyID)) {
      let errMsg = t("JSE001").replace("%s", t("Unit Price"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(qty)) {
      let errMsg = t("JSE124").replace("%s", t("Qty"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(qty) || parseFloat(qty) < 0) {
      let errMsg = t("JSE124").replace("%s", t("number only"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(qty) || parseFloat(qty) > 999999999999999999.99) {
      let errMsg = t("JSE007").replace("%s", t("Qty")).replace("%s", t("999999999999999999.99"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(fxRateNumber)) {
      let errMsg = t("JSE124").replace("%s", t("FX Rate Number"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(fxRateNumber) || parseFloat(fxRateNumber) < 0) {
      let errMsg = t("JSE124").replace("%s", t("number only"));
      arrMsg.push(errMsg);
    } else if (!validateDecimal(fxRateNumber) || parseFloat(fxRateNumber) > 999999.999999) {
      let errMsg = t("JSE007").replace("%s", t("FX Rate Number")).replace("%s", t("999999.999999"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(acceptCurrencyID)) {
      let errMsg = t("JSE001").replace("%s", t("Accept Currency"));
      arrMsg.push(errMsg);
    }

    if (!checkNullOrBlank(description)) {
      let errMsg = t("JSE124").replace("%s", t("Description"));
      arrMsg.push(errMsg);
    } else if (description.trim().length <= 0) {
      let errMsg = t("JSE124").replace("%s", t("Description"));
      arrMsg.push(errMsg);
    }

    if (arrMsg.length > 0) {
      setError(arrMsg);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else { return true }
  }

  /* Validate Search Approver Start */
  const validateSearch = () => {
    setError([]);
    setSuccess([]);
    let allError = [];
    if (!checkNullOrBlankString(approverState)) {
      let errMsg = t("JSE001").replace("%s", t("Approver"))
      allError.push(errMsg);
    } else return true;
    setError(allError);
  }
  /* Validate Search Approver End */

  const validateUploadFile = (file) => {
    const regex = /.*\.(jpg|jpe?g|png|pdf)$/igm;
    if (!regex.test(file.name)) {
      let errMsg = t("JSE110");
      return errMsg;
    }
    if (parseInt(file.size) > 10485760) {
      let errMsg = t("JSE111");
      return errMsg;
    }
    return true;
  }
  /* Validate */

  /* addDynamicTable */
  const [idAddDynamic, setIdAddDynamic] = useState(1);
  const addDynamicTable = (idAdd, additionChk) => {
    let data = {}
    let id = idAdd;
    if (validDynamicTable()) {
      if (additionChk) {
        data = {
          idDynamicTable: id,
          item_id: itemID,
          item: item,
          expense_category: expenseCategory,
          expense_category_id: expenseCategoryID,
          attachment: [...multiFile],
          description: description,
          price_number: Math.round(unitPriceNumber * 100) / 100,
          qty: Math.round(qty * 100) / 100,
          total: totalCardDetail,
          price_currency: unitPriceCurrency,
          price_currency_id: unitPriceCurrencyID,
          fx_rate: fxRateNumber,
          accept_currency: acceptCurrency,
          accept_currency_id: acceptCurrencyID,
          amount: amountCardDetail,
          arrange_admin: arrangeAdmin,
          additional_advance_item: additionChk,
          is_checked: true
        }
        setMultiFile([]);
        totalCurrencyAddition.map(it => {
          if ((it.currency_id_add === data.accept_currency_id) && (data.is_checked === true) && (arrangeAdmin === false)) {
            it.total_currency_add += amountCardDetail + amountCardDetail * additionData / 100;
            it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
          }
        })
      } else {
        data = {
          idDynamicTable: id,
          item_id: itemID,
          item: item,
          expense_category: expenseCategory,
          expense_category_id: expenseCategoryID,
          attachment: [...multiFile],
          description: description,
          price_number: Math.round(unitPriceNumber * 100) / 100,
          qty: Math.round(qty * 100) / 100,
          total: totalCardDetail,
          price_currency: unitPriceCurrency,
          price_currency_id: unitPriceCurrencyID,
          fx_rate: fxRateNumber,
          accept_currency: acceptCurrency,
          accept_currency_id: acceptCurrencyID,
          amount: amountCardDetail,
          arrange_admin: arrangeAdmin,
          additional_advance_item: additionChk,
          is_checked: false
        }
      }
      setMultiFile([]);
      setIdAddDynamic(id + 1);
      setDynamicTable([...dynamicTable, data]);
      if (expenseDetailID) {
        setAllCheckDynamic(([...dynamicTable, data].filter(item => !item.data_load)).every(item => item.is_checked));
      } else setAllCheckDynamic([...dynamicTable, data].every(item => item.is_checked));
      totalCurrency.map(i => {
        if (i.currency_id === data.accept_currency_id) {
          i.total_currency += data.amount;
          i.total_currency = Math.round(i.total_currency * 100) / 100;
        }
      })

      let amount = Object.assign({}, amountBudgetState)
      totalCurrencyNotInclude.map((it, index) => {
        if ((it.currency_id_not === data.accept_currency_id) && (data.arrange_admin === false)) {
          it.total_currency_not += amountCardDetail;
          it.total_currency_not = Math.round(it.total_currency_not * 100) / 100;
          amount[index] = it.total_currency_not;
        }
      })
      setAmountBudgetState(amount);
      resetAddDynamicTable();
      setCheckAllCheckboxDynamic(true);
    }
  }
  /* addDynamicTable */

  /* Remove Event */
  const removeAttachFileDynamicTable = (i, idx, file) => {
    detailAttachmentLoad.map(iat => {
      let ele = iat.find(f => f.id === file.id)
      if (ele)
        setRemoveDetailAttachment([...removeDetailAttachment, ele]);
    })
    let tpm = dynamicTable[i]
    let tpm1 = tpm.attachment.filter((item, index) => index !== idx);
    tpm.attachment = [];
    tpm.attachment = tpm1;
    let temp = dynamicTable.filter((item, index) => index !== i);
    temp.splice(i, 0, tpm);
    setDynamicTable(temp);
  }

  const removeRowDynamicTable = (i, index) => {
    totalCurrency.map((item) => {
      if (item.currency_id === i.accept_currency_id) {
        item.total_currency -= i.amount;
        item.total_currency = Math.round(item.total_currency * 100) / 100;
      }
    })
    let data_amount_budget = Object.assign({}, amountBudgetState);
    totalCurrencyNotInclude.map((item, index) => {
      if (item.currency_id_not === i.accept_currency_id && i.arrange_admin === false) {
        item.total_currency_not -= i.amount;
        item.total_currency_not = Math.round(item.total_currency_not * 100) / 100;
        data_amount_budget[index] = item.total_currency_not;
      }
    })
    setAmountBudgetState(data_amount_budget);
    totalCurrencyAddition.map((item) => {
      if (item.currency_id_add === i.accept_currency_id && i.is_checked === true && i.arrange_admin === false) {
        item.total_currency_add -= (i.amount + i.amount * additionData / 100);
        item.total_currency_add = Math.round(item.total_currency_add * 100) / 100;
      }
    })
    setRemoveDetailRow([...removeDetailRow, dynamicTable.filter((item, idx) => idx === index)[0]]);
    setDynamicTable(dynamicTable.filter((item, idx) => idx !== index));
  }
  /* Remove Event */

  /* Reset Form Start */
  const resetForm = (init) => {
    if (permission === true) {
      setEmployeeID("");
      setEmployeeCode("");
      setEmployeeName("");
      setDepartmentName("");
      setPositionName("");
      setApproverData([]);
    } else {
      loadApprover(employeeID);
    }
    setExpenseDepartment("");
    setPONumber("");
    setVendorCompany("");
    setVendorName("");
    setExChangeRate("");
    setPhoneEmail("");
    setSubject("");
    setDueDate(date);
    setCashVoucher(true);
    setPrepaidVoucher(false);
    setNeed(false)
    setNoNeed(false);
    setAdditionRadio(false);
    setAmountRadio(false);
    resetAddDynamicTable();
    setMultiFileOtherAttach([]);
    loadCurrencies(init);
    setApproverState("");
    setMainTable([]);
    setDynamicTable([]);
    setApproverSetting(1);
  }
  const resetAddDynamicTable = () => {
    setItem("");
    setItemID("");
    setExpenseCategory("");
    setExpenseCategoryID("")
    if (currencyData && currencyData.length > 0) {
      setUnitPriceCurrency(currencyData[0].currency_desc)
      setUnitPriceCurrencyID(currencyData[0].id)
    }
    setUnitPriceNumber("");
    setQty("")
    let currency_expense = currencyData.filter(item => item.expense_flag === 1)
    if (currency_expense && currency_expense.length > 0) {
      setAcceptCurrency(currency_expense[0].currency_desc);
      setAcceptCurrencyID(currency_expense[0].id);
    }
    setTotalCardDetail("");
    setAmountCardDetail("");
    setArrangeAdmin(false);
    document.getElementById("chkArrangeAdmin").checked = false;
    setAdditionCheckbox(false)
    setDescription("");
    setMultiFile([]);
  }
  /* Reset Form Start */

  /* Approver Modal Box Start */
  const openApproverModal = () => {
    setApproverModalBox(!approverModalBox);
  }

  const closeApproverModal = () => {
    setApproverModalBox(!approverModalBox);
    setCheckBoxIdList([])
    setMainTableModal([]);
    setAllCheck(false);
    setPopupError([]);
  }
  /* Approver Modal Box End */

  /* Approver Change Start */
  const approverChange = (e) => {
    if (e.target[e.target.selectedIndex].getAttribute("position")) {
      setPositionState(e.target[e.target.selectedIndex].getAttribute("position"));
      setDepartmentState("");
      setApproverState("pos" + e.target[e.target.selectedIndex].getAttribute("position"));
    } else if (e.target[e.target.selectedIndex].getAttribute("department")) {
      setDepartmentState(e.target[e.target.selectedIndex].getAttribute("department"));
      setPositionState("");
      setApproverState("dep" + e.target[e.target.selectedIndex].getAttribute("department"));
    } else {
      setApproverState(e.target[e.target.selectedIndex].value);
      setDepartmentState("");
      setPositionState("");
    }
  }
  /* Approver Change End */

  /** Start Date In Form */
  let handleAppliedDateChange = (e) => {
    setAppliedDate(e);
  };
  let handleDueDateChange = (e) => {
    if (e) {
      let dueDate = Moment(e).format('YYYY-MM-DD');
      setDueDate(dueDate);
    } else {
      setDueDate(e);
    }
  };
  /** End Date In Form */

  /** Modal Event */
  const openItemModal = () => {
    setItemModal(!itemModal);
  }

  const closeItemModal = () => {
    setItemModal(!itemModal);
    setPopupError("");
    setItemName("");
  }
  /** Modal Event */

  /**
     * Import file to view
     * 
     * @param e: event
     * @param files 
     * @param setFiles 
     * @returns list files
     */
  const handleImportFile = (e, files, setFiles) => {
    let arrMsg = [];
    let multiFile = []
    for (let file of e.target.files) {
      if (validateUploadFile(file) !== true) {
        arrMsg.push(validateUploadFile(file));
      } else {
        multiFile.push(file);
      }
    }

    if (multiFile.length > 0) {
      setFiles([...files, ...multiFile]);
    }

    if (arrMsg.length > 0) {
      setError(arrMsg);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

  }

  const [multiFile, setMultiFile] = useState([]);
  const [multiFileOtherAttach, setMultiFileOtherAttach] = useState([]);
  /**
 * remove file item
 * @param {*} listFile 
 * @param {*} setListFile 
 * @param {*} index 
 */
  let removeFile = (listFile, setListFile, index, id) => {
    let ele = otherAttachmentLoad.find((e) => e.id === id)
    if (ele) {
      setRemoveOtherAttachment([...removeOtherAttachment, ele]);
    }
    listFile.splice(index, 1)
    setListFile([...listFile]);
  }

  /* START CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [checkBoxIdList, setCheckBoxIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];

    if (value === "all-check") {
      data = mainTableModal.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTableModal.map(item =>
        parseInt(item.approver_id) === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked) {
        id_list.push(data[i].approver_id);
      }
    }
    setCheckBoxIdList(id_list);

    setAllCheck(data.every(item => item.is_checked));
    setMainTableModal(data);
  }
  /* END CHECKBOX ACTION */

  /* START CHECKBOX DYNAMIC TABLE ACTION */
  const [allCheckDynamic, setAllCheckDynamic] = useState(false);      // For select checkbox all or not
  const change_checkbox_dynamic = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let id = i.target.id;
    let data;
    let id_list = [];

    if (expenseDetailID) {
      if (value === "all-check-dynamic") {
        data = dynamicTable.map(item => item.data_load ? item : ({ ...item, is_checked: checked }));
        totalCurrencyAddition.map(it => it.total_currency_add = 0);
        data.map(item => {
          totalCurrencyAddition.map(it => {
            if (it.currency_id_add === item.accept_currency_id) {
              if (item.is_checked === true && item.arrange_admin === false ) {
                it.total_currency_add += (item.amount + item.amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
            }
          })
        })
      } else {
        data = dynamicTable.map(item =>
          parseInt(item.idDynamicTable) === parseInt(value) ? { ...item, is_checked: checked } : item
        )
        totalCurrencyAddition.map(it => {
          if (it.currency_id_add === data[id].accept_currency_id) {
            if (data[id].arrange_admin === false) {
              if (data[id].is_checked === true) {
                it.total_currency_add += (data[id].amount + data[id].amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
              else {
                it.total_currency_add -= (data[id].amount + data[id].amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
            }
          }
        })
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_checked) {
          id_list.push(data[i].idDynamicTable);
        }
      }
      let data_table = data.filter(item => !item.data_load);
      setAllCheckDynamic(data_table.every(item => item.is_checked));
      setDynamicTable(data);

    } else {
      if (value === "all-check-dynamic") {
        data = dynamicTable.map(item => ({ ...item, is_checked: checked }));
        totalCurrencyAddition.map(it => it.total_currency_add = 0);
        data.map(item => {
          totalCurrencyAddition.map(it => {
            if (it.currency_id_add === item.accept_currency_id) {
              if (item.is_checked === true && item.arrange_admin === false) {
                it.total_currency_add += (item.amount + item.amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
            }
          })
        })

      } else {
        data = dynamicTable.map(item =>
          parseInt(item.idDynamicTable) === parseInt(value) ? { ...item, is_checked: checked } : item
        )
        totalCurrencyAddition.map(it => {
          if (it.currency_id_add === data[id].accept_currency_id) {
            if (data[id].arrange_admin === false) {
              if (data[id].is_checked === true) {
                it.total_currency_add += (data[id].amount + data[id].amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
              else {
                it.total_currency_add -= (data[id].amount + data[id].amount * additionData / 100);
                it.total_currency_add = Math.round(it.total_currency_add * 100) / 100;
              }
            }
          }
        })
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].is_checked) {
          id_list.push(data[i].idDynamicTable);
        }
      }
      setAllCheckDynamic(data.every(item => item.is_checked));
      setDynamicTable(data);
    }

  }
  /* END CHECKBOX DYNAMIC TABLE ACTION */

  /* Add Approver Start */
  const addApprover = () => {
    let errMsgAll = [];
    if (checkBoxIdList.length === 0) {
      const errorMsg = t('JSE126').replace('%s', t('Approver'));
      errMsgAll.push(errorMsg);
    } else {
      if (!mainTable.some(value => checkBoxIdList.includes(value.approver_id))) {
        mainTableModal.map(value => {
          if (checkBoxIdList.includes(value.approver_id)) {
            setMainTable(mainTable => [...mainTable, value]);
          }
        })
      }
      else {
        mainTable.map(value => {
          if (checkBoxIdList.includes(value.approver_id)) {
            const errorMsg = t('JSE140').replace('%s', value.approver_id);
            errMsgAll.push(errorMsg);
          }
        })
      }
    }
    if (errMsgAll.length > 0) {
      setPopupError(errMsgAll);
    }
    else {
      setRowCountApproverData(rowCountApproverData+checkBoxIdList.length);
      closeApproverModal();
    }
  }
  /* Add Approver End */

  /* Delete Approver Start */
  const deleteApprover = (e) => {
    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.approver_id != e["approver_id"]);
    setRowCountApproverData(result_data.length);
    setMainTable(result_data);
  }
  /* Delete Approver End */

  /** Start Save/Update function */
  const requestToggleAlert = () => {
    if (validateExpenseRequest()) {
      setSaveModalBox(!saveModalBox);
      if (expenseDetailID) {
        setContent(t('Are you sure want to update?'));
        setType('update');
      } else {
        setContent(t('Are you sure want to save?'));
        setType('save');
      }
    }
  }
  const saveOK = () => {
    if (expenseDetailID) {
      updateExpenseRequestAPI();
    } else {
      expenseRequestAPI()
    }
  }
  /** Start Save/Update function */

  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        {/* ErrorMessage Start */}
        <Message success={success} error={error} />

        <CCard>
          <CCardHeader className="pb-0">
            <h5 id="cardTitle"><CLabel>{t('Expense Request')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <ExpenseRequestGeneralInfoBox
              permission={permission}
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}

              appliedDate={appliedDate}
              dueDate={dueDate}
              handleAppliedDateChange={handleAppliedDateChange}
              handleDueDateChange={handleDueDateChange}

              expenseDetailID={expenseDetailID}

              poNumber={poNumber}
              vendorCompany={vendorCompany}
              vendorName={vendorName}
              exChangeRate={exChangeRate}
              phoneEmail={phoneEmail}
              subject={subject}
              departmentName={departmentName}
              positionName={positionName}

              changePONumber={changePONumber}
              changeVendorCompany={changeVendorCompany}
              changeVendorName={changeVendorName}
              changeExchangeRate={changeExchangeRate}
              changePhoneEmail={changePhoneEmail}
              changeSubject={changeSubject}

              expenseDepartment={expenseDepartment}
              expenseDepartmentData={expenseDepartmentData}
              changeExpenseDepartment={changeExpenseDepartment}

            />
            <ExpenseRequestDetailInfoBox

              cashVoucher={cashVoucher}
              prepaidVoucher={prepaidVoucher}

              changePaymentCash={changePaymentCash}
              changePaymentPrepaid={changePaymentPrepaid}
              changeAmountRadio={changeAmountRadio}
              changeAdditionRadio={changeAdditionRadio}

              need={need}
              noNeed={noNeed}
              additionRadio={additionRadio}
              additionData={additionData}
              amountRadio={amountRadio}

              changeNeedRadio={changeNeedRadio}
              changeNoNeedRadio={changeNoNeedRadio}

              itemModal={itemModal}
              openItemModal={openItemModal}
              closeItemModal={closeItemModal}
              changeItemName={changeItemName}
              itemName={itemName}
              createItemAPI={createItemAPI}
              popupError={popupError}
              removeMessagePopup={removeMessagePopup}

              handleImportFile={handleImportFile}
              removeFile={removeFile}

              multiFile={multiFile}
              setMultiFile={setMultiFile}

              multiFileOtherAttach={multiFileOtherAttach}
              setMultiFileOtherAttach={setMultiFileOtherAttach}

              item={item}
              changeItem={changeItem}
              expenseCategory={expenseCategory}
              changeExpenseCategory={changeExpenseCategory}
              unitPriceCurrency={unitPriceCurrency}
              changeUnitPriceCurrency={changeUnitPriceCurrency}
              acceptCurrency={acceptCurrency}
              changeAcceptCurrency={changeAcceptCurrency}
              itemData={itemData}
              expenseCategoryData={expenseCategoryData}
              currencyData={currencyData}
              arrangeAdmin={arrangeAdmin}
              changeArrangeAdmin={changeArrangeAdmin}

              description={description}
              unitPriceNumber={unitPriceNumber}
              qty={qty}
              fxRateNumber={fxRateNumber}
              totalCardDetail={totalCardDetail}
              amountCardDetail={amountCardDetail}

              changeDescription={changeDescription}
              changeUnitPriceNumber={changeUnitPriceNumber}
              changeQty={changeQty}
              changeFXRateNumber={changeFXRateNumber}
              changeFXRateNumberSelect={changeFXRateNumberSelect}
              addDynamicTable={addDynamicTable}
              totalCurrency={totalCurrency}

              dynamicTable={dynamicTable}
              allCheckDynamic={allCheckDynamic}
              change_checkbox_dynamic={change_checkbox_dynamic}
              idAddDynamic={idAddDynamic}
              removeAttachFileDynamicTable={removeAttachFileDynamicTable}
              removeRowDynamicTable={removeRowDynamicTable}
              changeAdditionCheckbox={changeAdditionCheckbox}
              additionCheckbox={additionCheckbox}

              checkAllCheckboxDynamic={checkAllCheckboxDynamic}
            />

            <ExpenseRequestBudgetTableBox
              cashVoucher={cashVoucher}
              prepaidVoucher={prepaidVoucher}
              need={need}
              noNeed={noNeed}
              additionRadio={additionRadio}
              additionData={additionData}
              amountRadio={amountRadio}
              totalCurrency={totalCurrency}
              totalCurrencyNotInclude={totalCurrencyNotInclude}
              totalCurrencyAddition={totalCurrencyAddition}
              totalCurrencyAmount={totalCurrencyAmount}
              changeAmountBudget={changeAmountBudget}
              amountBudgetState={amountBudgetState}
              expenseDetailID={expenseDetailID}
            />
            <ExpenseRequestApproverTableBox
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              mainTable={mainTable}
              searchApproverAPI={searchApproverAPI}
              mainTableModal={mainTableModal}
              approverState={approverState}
              approverData={approverData}
              approverChange={approverChange}
              approverModalBox={approverModalBox}
              openApproverModal={openApproverModal}
              closeApproverModal={closeApproverModal}
              change_checkbox={change_checkbox}
              AllCheck={AllCheck}
              addApprover={addApprover}
              popupError={popupError}
              removeMessagePopup={removeMessagePopup}
              deleteApprover={deleteApprover}
              rowCount={rowCount}
              approverSetting={approverSetting}
              positionRank={positionRank}
              rowCountApproverData={rowCountApproverData}
            />
            <ApproverListModalExpenseRequestBox />
            <RequestExpenseRequest
              mainTable={mainTable}
              positionRank={positionRank}
              requestToggleAlert={requestToggleAlert}
            />
            <Confirmation
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              show={saveModalBox}
              cancel={() => setSaveModalBox(!saveModalBox)}
              saveOK={saveOK}
              updateOK={saveOK}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function ExpenseRequest() {
  return (
    <Welcome />
  )
}