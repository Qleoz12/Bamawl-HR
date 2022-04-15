/* eslint-disable no-use-before-define */
import {
CCard,
CCardBody,
CCardHeader,
CCol,
CRow
} from '@coreui/react';
import Moment from 'moment';
import React, { useEffect,useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import {isEmpty,checkNullOrBlankString,checkNullOrBlank, checkMaxLength,validationWhiteSpace} from '../../../hr/hr-common/common-validation/CommonValidation';
import ExpenseAdjustmentRequestDetail from './ExpenseAdjustmentRequestDetail';
import ExpenseAdjustmentRequestAdd from './ExpenseAdjustmentRequestAdd';
import ExpenseAdjustmentRequestBudgetTable from './ExpenseAdjustmentRequestBudgetTable';
import ExpenseAdjustmentRequestModalApprover from './ExpenseAdjustmentRequestModalApprover';
import ExpenseAdjustmentRequest from './ExpenseAdjustmentRequest';
import ExpenseAdjustmentRequestModalAdd from './ExpenseAdjustmentRequestModalAdd';
import ExpenseAdjustmentRequestApprover from './ExpenseAdjustmentRequestApprover';
import ExpenseAdjustmentRequestApproverTable from './ExpenseAdjustmentRequestApproverTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { useHistory } from "react-router-dom";
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

function LegacyWelcomeClass({ t, i18n }) {

const [error, setError]                                         = useState([]);
const [success, setSuccess]                                     = useState("");
const [popupError, setPopupError]                               = useState([]);
const [approverState, setApproverState]                         = useState("");
const [checkPosition, setCheckPosition]                         = useState("");
const [approverData, setApproverData]                           = useState([]);
const [poNo, setPONo]                                           = useState("");
const [subject, setSubject]                                     = useState([]);
const [employeeName, setEmployeeName]                           = useState('');
const [employeeCode, setEmployeeCode]                           = useState('');
const [employeeID, setEmployeeID]                               = useState('');
const [exchangeRate, setExchangeRate]                           = useState("");
const [expenseDepartment, setExpenseDepartment]                 = useState("");
const [saveModalBox, setSaveModalBox]                           = useState(false);
const date                                                      = Moment(new Date()).format("YYYY-MM-DD");
const [appliedDate, setAppliedDate]                             = useState(date);
const [dueDate, setDueDate]                                     = useState(date);
const [dateAdd, setDateAdd]                                     = useState(date);
const [acceptAmountAdd, setAcceptAmountAdd]                     = useState("");
const [deleteFileID, setDeleteFileID]                           = useState([]);
const [deleteID, setDeleteID]                                   = useState([]);
const [itemModal, setItemModal]                                 = useState(false);
const [approveFlag, setApproveFlag]                             = useState("");
const [requestDate, setRequestDate]                             = useState(date);
const [item, setItem]                                           = useState("");
const [positionState, setPositionState]                         = useState("");
const [expenseCateName, setExpenseCateName]                     = useState("");
const [addItem, setAddItem]                                     = useState("");
const [expenseCategory, setExpenseCategory]                     = useState("");
const [unitPriceNumber, setUnitPriceNumber]                     = useState("");
const [unitPriceCurrency, setUnitPriceCurrency]                 = useState(1);
const [qty, setQty]                                             = useState("");
const [acceptCurrency, setAcceptCurrency]                       = useState(1);
const [fxRateNumber, setFxRateNumber]                           = useState("");
const [description, setDescription]                             = useState("");
const [department, setDepartment]                               = useState("");
const [departmentState, setDepartmentState]                     = useState("");// for aporover
const [position, setPosition]                                   = useState("");
const [approverModalBox, setApproverModalBox]                   = useState(false);
const [mainTable, setMainTable]                                 = useState([]); // for main table
const [mainTableModal, setMainTableModal]                       = useState([]); // for main table
const [rowCount, setRowCount]                                   = useState(0);  // for row count
const [loading, setLoading]                                     = useState(false);
const [dynamicTable, setDynamicTable]                           = useState([]);
const [multiFile, setMultiFile]                                 = useState([]);
const [multiFileOtherAttach, setMultiFileOtherAttach]           = useState([]);
const [deleteOtherFileID, setDeleteOtherFileID]                 = useState([]);
const [advanceFlag, setAdvanceFlag]                             = useState();
const [advanceAdditional, setAdvanceAdditional]                 = useState([]);
const [estimatedTotalNotAdmin, setEstimatedTotalNotAdmin]       = useState([]);
const [actualTotalNotAdmin, setActualTotalNotAdmin]             = useState([]);
const [actualAdvanceAmount, setActualAdvanceAmount]             = useState();
const [estimatedAdvanceAmount, setEstimatedAdvanceAmount]       = useState();
const [show, setShow]                                           = useState(false);
const [itemData, setItemData]                                   = useState([]);
const [expenseCategoryData, setExpenseCategoryData]             = useState([]);
const [unitPriceCurrencyData, setUnitPriceCurrencyData]         = useState([]);
const [acceptCurrencyData, setAcceptCurrencyData]               = useState([]);
const [allCheck, setAllCheck]                                   = useState(false);// For select checkbox in Approver all or not
const [checkBoxIdList, setCheckBoxIdList]                       = useState(''); // For checkbox approver
const [checkByAdmin, setCheckByAdmin]                           = useState(0); // For priceCurrency Table
const [vendorCompany, setVendorCompany]                         = useState(''); // For vendorCompany
const [vendorName, setVendorName]                               = useState(''); // For vendorName
const [phoneEmail, setPhoneEmail]                               = useState(''); // For phone/email
const [allCheckAdd, setAllCheckAdd]                             = useState(false);// For select checkbox all or not in Dynamic Table
const [budgetTotal, setBudgetTotal]                             = useState([]);
const [expenseDepartmentAPI, setExpenseDepartmentAPI]           = useState([]);   // For Dept API
const [subTotalActual, setSubTotalActual]                       = useState([]);
const [content, setContent]                                     = useState('');
const [type, setType]                                           = useState('');
const [totalAdd, setTotalAdd]                                   = useState('');
const [editData, setEditData]                                   = useState(); // for Edit data
const [showSearch, setShowSearch]                               = useState(false); // for show/hide button search
const history                                                   = useHistory(); // For edit link

/**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
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
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
useEffect(() => {
    setLoading(true);
    let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_ADJUSTMENT_REQUEST_DATA"));
    if (edit_Data != null) {
        let edit_id = edit_Data;
        loadExpense(edit_id);
        setEditData(edit_id);
        loadExCategory();
        loadCurency();
        loadDept();
        loadItem();
        loadPosition();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    else{
        history.push('./expense-list');
    }
}, []);
/** End Form Load */

/**
  * Load Department
  *
  * @author  nt_linh
  * @create  22/07/2021 (D/M/Y)
  * @param
  * @return
  */
 const loadDept = async () => {
    let data = {
        package_name: 'erp',
        url: ApiPath.ERPGetAllDepartment,
        method: 'get',
      }
      let response = await ApiRequest(data);
      response.flag === false ? setExpenseDepartmentAPI([]) : setExpenseDepartmentAPI(response.data.data);
  };

    /**
     * Load Position
     *
     * @author  nt_linh
     * @create  22/07/2021 (D/M/Y)
     * @param
     * @return
     */
 const loadPosition = async () => {
    let params = {
        login_id: ApiPath.loginEmp,
        company_id: ApiPath.companyID,
        language: ApiPath.lang
    }
    let obj = {
        package_name: 'hr',
        url: ApiPath.expenseadjustmentrequestGetPosition,
        method: 'post',
        params
    };
    let response = await ApiRequest(obj);
    if(response.flag === false ) setError([]);
    else{
        let data=response.data.data
        setCheckPosition(data.is_position_rank_zero);
        if(data.approver_setting == 1||data.approver_setting == 4||data.approver_setting == 5)
            setShowSearch(true);
    }
  };


  /* Validate Search Approver Start */
  const validateSearch = () => {
    setError([]);
    setSuccess("");
    let allError = [];
    if (!checkNullOrBlankString(approverState)) {
      let errMsg = t("JSE001").replace("%s", t("Approver"))
      allError.push(errMsg);
    } else return true;
    setError(allError);
  }
  /**
     * Search Approver
     *
     * @author  nt_linh
     * @create  22/07/2021 (D/M/Y)
     * @param
     * @return
     */
    const searchApproverAPI = async() => {
        setPopupError([]);
        if (validateSearch()) {
            setLoading(true);
            let params
            positionState  ? params = {
                company_id: ApiPath.companyID,
                employee_id: employeeID,
                language: ApiPath.lang,
                position_id: positionState,
            }:params={
                company_id: ApiPath.companyID,
                employee_id: employeeID,
                language: ApiPath.lang,
                department_id: departmentState
            }
            let obj = { package_name: 'hr', url: ApiPath.expenseadjustmentrequestSearch, method: 'post', params }
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError("");
                setMainTableModal([]);
                openApproverModal();
            }
            else {
                setRowCount(t('Total Rows').replace('%s', response.data.row_count));
                setMainTableModal(response.data.data);
                setError([]);
                setSuccess("");
                openApproverModal();
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }
/* Search Approver API End */

const loadApprover = async(employeeID) => {
    let params = {
      company_id: ApiPath.companyID,
      employee_id: employeeID,
      device_flag:1
    }
    let data = {
      package_name: 'erp',
      url: ApiPath.ERPApproverList,
      method: 'post',
      params
    }
    let response = await ApiRequest(data);
    response.flag === false ? setApproverData([]) : setApproverData(response.data.data);
}

    /**
    * Load currency
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
 const loadCurency = async () => {
    let params = {
        login_id:ApiPath.loginEmp,
        company_id: ApiPath.companyID,
        language: ApiPath.lang
    };
    let obj = {
        package_name: 'hr',
        url: ApiPath.expenseadjustmentrequestGetCurrency,
        method: 'post',
        params
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
    } else {
        let data = response.data.data;
        let acceptCurrency=data.filter((i) =>i.expense_flag == 1);
        setUnitPriceCurrencyData(data);
        setAcceptCurrencyData(acceptCurrency);
    }
};

  /**
    * Load detail
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
 const loadExpense = async (id=editData) => {
    setLoading(true);
    let params = {
        company_id: ApiPath.companyID,
        login_id:ApiPath.loginEmp,
        language: ApiPath.lang
    };
    let obj = {
        package_name: 'hr',
        url: ApiPath.expenseadjustmentrequestGetDetail + id,
        method: 'post',
        params
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setSuccess("");
        setError(response.message);
        history.push('./expense-list');
    } else {
        let data = response.data.data;
        setDynamicTable(data.details);
        setMainTable(data.approver);
        setEmployeeID(data.employee_id);
        setEmployeeCode(data.employee_code);
        setEmployeeName(data.employee_name);
        setExpenseDepartment(data.expense_department_id);
        setDepartment(data.employee_has_dept_position.map(i=>i.departments.department_name));
        setPosition(data.employee_has_dept_position.map(i=>i.positions.position_name));
        setExchangeRate(parseFloat(data.exchange_rate).toString());
        setPONo(data.po_number);
        setPhoneEmail(data.contact_ph_email);
        setVendorCompany(data.vendor_company);
        setVendorName(data.vendor_name);
        setMultiFileOtherAttach(data.other_attach);
        setBudgetTotal(data.estimated_budget_total[0].budget_total);
        setSubTotalActual(data.actual_budget_total[0].budget_total);
        setAdvanceFlag(data.advance_flag);
        setApproveFlag(data.approve_flag);
        setAdvanceAdditional(data.advance_additional);
        setEstimatedTotalNotAdmin(data.estimated_budget_total[0].total_not_include_admin_arrange);
        setActualTotalNotAdmin(data.actual_budget_total[0].total_not_include_admin_arrange);
        setActualAdvanceAmount(data.actual_budget_total[0].advance_amount);
        setEstimatedAdvanceAmount(data.estimated_budget_total[0].advance_amount);
        setSubject(data.subject);
        setRequestDate(data.requested_date);
        loadApprover(data.employee_id);
        setAllCheckAdd(data.details.every(i=>i.additional_advance_item ==1));
    }
  };

   /** Start Save/Update function */
   const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  }

  let onchangeInput = (row, e, data, setData) => {
    let id = row?.expense_detail_id;
    let value = e?.target.value;
    let name = e?.target.name;
    let dataTemp;
    switch (name) {
      case "Unit Price":
        if (isDecimal(value) || value === "") {
          value = e.target.value
        }
        else return;
        dataTemp = data.map(ele =>
          ele.expense_detail_id == id ? {
            ...ele, actual_cost: {
              unit_price: value,
              qty: Number(ele.actual_cost.qty),
              currency_id: Number(ele.actual_cost.currency_id),
              fx_rate: Number(ele.actual_cost.fx_rate),
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: Math.round(value * ele.actual_cost.qty * ele.actual_cost.fx_rate*100)/100,
            }
          } : ele
        )
        break;
      case "Qty":
        if (isDecimal(value) || value === "") {
          value = e.target.value;
        }
        else return;
        dataTemp = data.map(ele =>
          ele.expense_detail_id == id ? {
            ...ele, actual_cost: {
              unit_price: Number(ele.actual_cost.unit_price),
              qty: value,
              currency_id: Number(ele.actual_cost.currency_id),
              fx_rate: Number(ele.actual_cost.fx_rate),
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: Math.round(ele.actual_cost.unit_price * value * ele.actual_cost.fx_rate*100)/100,
            }
          } : ele
        )
        break;
      default:
        if (isDecimalFX(value) || value === "") {
          value = e.target.value;
        }
        else return;
        dataTemp = data.map(ele =>
          ele.expense_detail_id == id ? {
            ...ele, actual_cost: {
              unit_price: Number(ele.actual_cost.unit_price),
              qty: Number(ele.actual_cost.qty),
              currency_id: Number(ele.actual_cost.currency_id),
              fx_rate: value,
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: Math.round(ele.actual_cost.unit_price * ele.actual_cost.qty * value*100)/100,
            },

          } : ele
        )
        break;
    }
    setData(dataTemp);
    updateTable(dataTemp,subTotalActual, setSubTotalActual);
    totalNoAdmin(dataTemp,actualTotalNotAdmin, setActualTotalNotAdmin);
 }

    /**
    * Load ExpenseCategory
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
 let onchangePriceDropdown = (e, data, setData) => {
    let dataTemp;
    let value = e.target.value;
    let id = e.target.id;
    dataTemp = data.map(ele =>
      ele.expense_detail_id == id ? {
        ...ele, actual_cost: {
          unit_price: parseFloat(ele.actual_cost.unit_price),
          currency_id: Number(value),
          qty: parseFloat(ele.actual_cost.qty),
          accept_currency_id: Number(ele.actual_cost.accept_currency_id),
          fx_rate: value == ele.actual_cost.accept_currency_id ? 1 : parseFloat(ele.actual_cost.fx_rate),
          cost: Math.round(100*ele.actual_cost.unit_price * ele.actual_cost.qty * (value == ele.actual_cost.accept_currency_id || 1))/100,
        }
      } : ele
    )
    setData(dataTemp);
  }

   /**
   * update subtotal after any change
   * @param {*} data data of block change
   * @param {*} subTotalActual
   * @param {*} setSubTotalActual
   */
    let updateTable = (data,subTotalActual, setSubTotalActual) => {
        let subTotal = [...subTotalActual];
        let curData = [...data];
        let dataTemp = curData.reduce((prev, cur) => {
          if (cur.flag != 1 && !isEmpty(cur.actual_cost)) {
            const { accept_currency_id, cost } = cur.actual_cost;
            const currency_id = accept_currency_id;
            const amount = parseFloat(cost);
            const index = prev.findIndex((item) => item.currency_id == currency_id);
            if (index >= 0) {
              prev[index].amount += parseFloat(amount);
            } else {
              prev.push({
                currency_id,
                amount
              });
            }
          }
          return prev;
        }, []);
        acceptCurrencyData.map((item, index) => {
          subTotal[index] = { currency_id: item.id, amount: 0 };
        });
        subTotal.map(item => {
          let obj = dataTemp.find(ele => ele.currency_id == item.currency_id);
          if (obj && item.currency_id == obj.currency_id)
            item.amount = obj.amount
        });
        setSubTotalActual(subTotal);
      }

    /**
    * Load ExpenseCategory
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
  let onchangeAcceptDropdown = (e, data, setData) => {
    let value = e.target.value;
    let id = e.target.id;
    let dataTemp = data.map(ele =>
      ele.expense_detail_id == id ? {
        ...ele, actual_cost: {
          unit_price: parseFloat(ele.actual_cost.unit_price),
          currency_id: ele.actual_cost.currency_id,
          qty: parseFloat(ele.actual_cost.qty),
          accept_currency_id: Number(value),
          fx_rate: value == ele.actual_cost.currency_id ? 1 : parseFloat(ele.actual_cost.fx_rate),
          cost: Math.round(100*ele.actual_cost.unit_price * ele.actual_cost.qty * (value == ele.actual_cost.currency_id || 1))/100,
        }
      } : ele
    )
    setData(dataTemp);
    updateTable(dataTemp,subTotalActual, setSubTotalActual);
    totalNoAdmin(dataTemp,actualTotalNotAdmin, setActualTotalNotAdmin);
  }


    /**
    * Load Expenst Item
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const loadItem = async ()=>{
    let params = {
        company_id: ApiPath.companyID,
        login_id: ApiPath.loginEmp,
        language: ApiPath.lang
    }
    let obj = {
        package_name: 'hr',
        url: ApiPath.expenseadjustmentrequestGetItem,
        method: 'post',
        params
    };
    let response = await ApiRequest(obj);
    response.flag === false ? setItemData('') : setItemData(response.data.data);
}
    /**
    * Load Expenst Category
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const loadExCategory = async ()=>{
    let params = {
        company_id: ApiPath.companyID,
        login_id: ApiPath.loginEmp,
        language: ApiPath.lang
    }
    let obj = {
        package_name: 'hr',
        url: ApiPath.expenseadjustmentrequestGetExpenseCategory,
        method: 'post',
        params
    };
    let response = await ApiRequest(obj);
    response.flag === false ? setError(response.message) : setExpenseCategoryData(response.data.data);
}

    /**
    *  Check decimal Uniprice
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const isDecimal=(value)=>{
    let decimalOnly = /^[]*?(\d{0,8})(\.\d{0,2})?$/;
    if(decimalOnly.test(value)) {
        return true;
    }
    return false;
}

    /**
    * Check decimal FX Rate
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const isDecimalFX=(value)=>{
        let decimalOnly = /^[]*?(\d{0,6})(\.\d{0,6})?$/;
        if(decimalOnly.test(value)) {
            return true;
        }
        return false;
    }

    /**
    * Add data for table DynamicTable
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const addDynamicTable = () => {
        setError([]);
        setSuccess("");
        let arrMsg = [];
        //validation item not null
        if (!checkNullOrBlank(item)) {
            let errMsg = t("JSE124").replace("%s", t("Item"));
            arrMsg.push(errMsg);
        }
        //validation Unit price not null
        if (!checkNullOrBlank(unitPriceNumber)) {
            let errMsg = t("JSE124").replace("%s", t("Unit Price"));
            arrMsg.push(errMsg);
        }
        //validation fx rate
        if(acceptCurrency!="" && unitPriceCurrency!="" && acceptCurrency!=unitPriceCurrency){
            //not null
            if (!checkNullOrBlank(fxRateNumber)) {
                let errMsg = t("JSE124").replace("%s", t("Fx Rate"));
                arrMsg.push(errMsg);
            }
            //must >0
            if(parseFloat(fxRateNumber)===0)
            {
                let errMsg = t("JSE10043").replace("%s", t("Fx Rate"));
                arrMsg.push(errMsg);
            }

        }
        //validation Unit price > 0
        if(parseFloat(unitPriceNumber)===0)
        {
            let errMsg = t("JSE10043").replace("%s", t("Unit Price"));
            arrMsg.push(errMsg);
        }
        //validation qty not null
        if (!checkNullOrBlank(qty)) {
            let errMsg = t("JSE124").replace("%s", t("Qty"));
            arrMsg.push(errMsg);
        }
        //validation qty > 0
        if(parseFloat(qty)===0){
            let errMsg = t("JSE10043").replace("%s", t("Qty"));
            arrMsg.push(errMsg);
        }
        //validation accept currency
        if (!checkNullOrBlank(acceptCurrency)) {
            let errMsg = t("JSE001").replace("%s", t("Accept Currency"));
            arrMsg.push(errMsg);
        }
        //validation Unit Price currency
        if (!checkNullOrBlank(unitPriceCurrency)) {
            let errMsg = t("JSE001").replace("%s", t("Unit Price Currency"));
            arrMsg.push(errMsg);
        }
         //validation Accept amount
        if (parseFloat(acceptAmountAdd) === 0) {
            let errMsg = t("JSE10043").replace("%s", t("Accept Amount"));
            arrMsg.push(errMsg);
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess("");
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
        else{
            setError([]);
            setSuccess([]);
            let attachFile = multiFile?.map((ele) => ({
                id: "",
                file_name: ele.name,
                file: ele
              }));
            let data = {
                expense_categories_id:expenseCategory,
                expense_items_id:item,
                expense_category: expenseCateName,
                additional_advance_item:0,
                arrange_by_admin: checkByAdmin,
                attach_file: attachFile,
                description: description,
                detail_date: dateAdd,
                budget_cost:{
                    unit_price: null,
                    currency_id: null,
                    qty: null,
                    accept_currency_id: null,
                    fx_rate: null,
                    cost: null,
                },
                actual_cost:{
                    unit_price: parseFloat(unitPriceNumber),
                    qty: parseFloat(qty),
                    currency_id: unitPriceCurrency,
                    fx_rate:parseFloat(fxRateNumber ? fxRateNumber : 1),
                    accept_currency_id: acceptCurrency,
                    cost: acceptAmountAdd
                },
                flag: 0,
            }
            setDynamicTable([...dynamicTable, data]);
            setAllCheckAdd([...dynamicTable, data].every(i=>i.additional_advance_item ==1));
            resetForm();
            updateTable([...dynamicTable, data], subTotalActual, setSubTotalActual);
            totalNoAdmin([...dynamicTable, data],actualTotalNotAdmin, setActualTotalNotAdmin);
        }
    }

    const totalNoAdmin = (dataTable, totalNoAdmin, setTotalNoAdmin) => {
        let subtotal = [...totalNoAdmin];
        acceptCurrencyData.map((ele, index) => {
            let result = 0;
            const obj = dataTable.filter(item => item.arrange_by_admin == 0 && item.actual_cost?.accept_currency_id == ele.id && item.flag !== 1);
            if (obj) {
                obj.map(item => {
                result += Math.round(item.actual_cost.cost * 100)/100;
                })
                subtotal[index] = {
                    currency_id: ele.id,
                    amount: result
                }
            }
        })
        setTotalNoAdmin(subtotal);
    }
 /**
    * Remove Dynamic Table
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const removeRowDynamicTable = (data, setData, obj, index) => {
    if (obj.flag == 0) {
        data.splice(index, 1);
        setData(data);
        updateTable(data,subTotalActual, setSubTotalActual);
        totalNoAdmin(data,actualTotalNotAdmin, setActualTotalNotAdmin);
        setAllCheckAdd(data.every(i=>i.additional_advance_item ==1));
    }else if(obj.budget_cost== null && isEmpty(obj.flag) ){
        setDeleteID([...deleteID, obj.expense_detail_id]);
        data.splice(index, 1);
        setData(data);
        updateTable(data,subTotalActual, setSubTotalActual);
        totalNoAdmin(data,actualTotalNotAdmin, setActualTotalNotAdmin);
        setAllCheckAdd(data.every(i=>i.additional_advance_item ==1));
    }
    else {
        setDeleteID([...deleteID, obj.expense_detail_id]);
        let dataNew = data.map(ele => ele.expense_detail_id == obj.expense_detail_id ? { ...ele, flag: 1, detail_date: null} : ele);
        setData(dataNew);
        updateTable(dataNew,subTotalActual, setSubTotalActual);
        totalNoAdmin(dataNew,actualTotalNotAdmin, setActualTotalNotAdmin);
        setAllCheckAdd(data.every(i=>i.additional_advance_item ==1));
    }
}

/* CHECKBOX ACTION FOR dynamicTable */
const changeCheckAllAdd = (e) => {
    let value = e.target.value;
    let checked = e.target.checked;
    let data;
    let idList = [];

    if (value === "allCheckAdd") {
        data = dynamicTable.map((item) => item.additional_advance_item==1?({ ...item, is_checked: checked }):({ ...item}));
    } else {
        data = dynamicTable.map((item) =>
        item.id === parseInt(value) ? { ...item, is_checked: checked } : item
        );
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].is_checked === true) {
        idList.push(data[i].id);
        }
    }
    var x = idList.toString();
    setAllCheckAdd(data.every((item) => item.is_checked));
    setDynamicTable(data);
};

const changeUnitPriceNumber = (e) => {
    setError("");
    setSuccess("");
    let value= (e.target.value);
    console.log(value);
    if(isDecimal(value)){
        setUnitPriceNumber(value);
        if(qty!==""){
            setTotalAdd(Math.round(100*value * qty)/100);
            acceptCurrency == unitPriceCurrency? setAcceptAmountAdd(Math.round(value*qty*100)/100):setAcceptAmountAdd(Math.round(value*qty*fxRateNumber*100)/100);
        }else{
            setTotalAdd("");
            setAcceptAmountAdd("");
        }
    }

}
const changeQty = (e) => {
    setError("");
    setSuccess("");
    let qty=e.target.value;
    if( isDecimal(qty)){
        setQty(qty);
        if(unitPriceNumber!==""){
            setTotalAdd(Math.round(qty* unitPriceNumber*100)/100);
            acceptCurrency == unitPriceCurrency?setAcceptAmountAdd(Math.round(qty*unitPriceNumber* 100)/100):setAcceptAmountAdd(Math.round(qty*unitPriceNumber*fxRateNumber* 100)/100);
        }else{
            setTotalAdd("");
            setAcceptAmountAdd("");
        }
    }

}
const changeDescription = (e) => {
    setError("");
    setSuccess("");
    setDescription(e.target.value);
}
const changeCheckByAdmin = (e) => {
    setError("");
    setSuccess("");
    let id=e.target.checked === true ? 1 : 0;
    setCheckByAdmin(id);
}
const changeFXRateNumber = (e) => {
    setError("");
    setSuccess("");
    let value=e.target.value;
    if(isDecimalFX(value)){
        setFxRateNumber(value);
        setAcceptAmountAdd(Math.round(value* qty* unitPriceNumber*100)/100);
    }
}
const handleExChangeRate = (e) => {
    setError("");
    setSuccess("");
    let value=e.target.value;
    if(isDecimalFX(value))
    setExchangeRate(value);
}
const handleVendorCompany = (e) => {
    setError("");
    setSuccess("");
    setVendorCompany(e.target.value);
};
const handleVendorName = (e) => {
    setError("");
    setSuccess("");
    setVendorName(e.target.value);
};
const handlePhoneEmail = (e) => {
    setError("");
    setSuccess("");
    setPhoneEmail(e.target.value);
};
const changeExpenseDepartment = (e) => {
    setError("");
    setSuccess("");
    setExpenseDepartment(e.target.value)
}
const changeItem = (e) => {
    setError("");
    setSuccess("");
    let id=e.target.value;
    setItem(id);
}
const changeExpenseCategory = (e) => {
    setError("");
    setSuccess("");
    let id=e.target.value
    setExpenseCategory(e.target.value);
    expenseCategoryData.map(i=>i.id==id?setExpenseCateName(i.expense_category):"")
}
const changeUnitPriceCurrency = (e) => {
    setError("");
    setSuccess("");
    setUnitPriceCurrency(e.target.value);
}
const changeAcceptCurrency = (e) => {
    setError("");
    setSuccess("");
    setAcceptCurrency(e.target.value);
    setAcceptAmountAdd(qty*unitPriceNumber);
}

const handleAddItemChange = (e) => {
    setError("");
    setSuccess("");
    setAddItem(e.target.value);
};

const handleReasonChange = (e, row, data, setData) => {
    setError("");
    setSuccess("");
    let value = e.target.value;
    let curData = data.map(ele =>
      ele.expense_detail_id == row.expense_detail_id ? { ...ele, reason: value } : ele
    );
    setData(curData);
};

/* Fake Data */

/* Reset Form Start */
const resetForm = () => {
    setItem("");
    setUnitPriceNumber("");
    setDateAdd(date);
    setFxRateNumber("");
    setExpenseCategory("");
    setQty("");
    setUnitPriceCurrency(1);
    setAcceptCurrency(1);
    setTotalAdd("");
    setAcceptAmountAdd("");
    setMultiFile([]);
    setCheckByAdmin(0);
    setDescription("");
    setAddItem("");
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
    setError("");
    setSuccess("");
    setDueDate(ChangeDate(e));
};
let handleDateAddChange = (e) => {
    setError("");
    setSuccess("");
    setDateAdd(ChangeDate(e));
};
let handleChangeDateInTable = (value, obj, data, setData) => {
    setError("");
    setSuccess("");
    let dataTemp;
    dataTemp = data.map(ele =>
      ele.expense_detail_id == obj.expense_detail_id ? { ...ele, detail_date: Moment(value).format("YYYY-MM-DD") } : ele
    )
    setData(dataTemp);
  }

/** End Date In Form */

/** Start Change Event */

const openItemModal = () => {
    setAddItem("");
    setItemModal(!itemModal);
    setPopupError([]);
    setError([]);
    setSuccess("");
}

const closeItemModal = () => {
    setItemModal(!itemModal);
}
/** End Change Event */

/**
     * Import file to view
     *
     * @param e: event
     * @param files
     * @param setFiles
     * @returns list files
     */
 const handleImportFile = (e, files, setFiles) => {
    setError("");
    setSuccess("");
    let arrMsg = [];
    let mutilFile = []
    for (let file of e.target.files) {
      if (validateUploadFile(file) == true) {
        mutilFile.push(file);
      } else
        arrMsg.push(validateUploadFile(file));
    }
    if (mutilFile.length > 0)
      setFiles(Object.values([...files, ...mutilFile]));
    if (arrMsg.length > 0) {
      setError(arrMsg);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

const validateUploadFile = (file) => {
    const regex = /.*\.(jpg|jpe?g|png|pdf)$/igm;
    if (!regex.test(file.name)) {
      let errMsg = t("JSE159").replace("%s", t("*.pdf, *.jpg, *.jpeg, *.png."));
      return errMsg;
    }
    if (parseInt(file.size) > 10485760) {
      let errMsg = t("JSE111");
      return errMsg;
    }
    return true;
  }

const handleFileOtherAttachement = (e) => {
    setError("");
    setSuccess("");
    let arrMsg = [];
    let mutilFile = []
    for (let file of e.target.files) {
      if (validateUploadFile(file) == true) {
        mutilFile.push(file);
      } else
        arrMsg.push(validateUploadFile(file));
    }

    let attachFile = mutilFile?.map((ele) => ({
      flag: 1,
      expense_document_name: ele.name,
      file: ele
    }));

    if (mutilFile.length > 0)
    setMultiFileOtherAttach([...multiFileOtherAttach, ...attachFile]);
    if (arrMsg.length > 0) {
      setError(arrMsg);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }

  let removeFileOtherAttachement = (e) => {
    setError("");
    setSuccess("");
    let fileDelete=multiFileOtherAttach.filter((item,i) =>i === e)[0];
    if(isEmpty(fileDelete.flag)){
        setDeleteOtherFileID([...deleteOtherFileID,fileDelete.id]);
    }
    setMultiFileOtherAttach(multiFileOtherAttach.filter((item,i) =>i !== e));

  }

  let removeAttachFile = (e, i, data, setData) => {
    setError("");
    setSuccess("");
    if(data[e].attach_file[i].id!="")
        setDeleteFileID([...deleteFileID,data[e].attach_file[i].id]);
    let dynamicTableNew = data;
    dynamicTableNew.map((ele, index) =>
      index === e ? ele.attach_file.splice(i, 1) : ele
    )
    setData(dynamicTableNew);
    updateTable(dynamicTableNew,subTotalActual,setSubTotalActual);
  }


/**
 * remove file item
 * @param {*} listFile
 * @param {*} setListFile
 * @param {*} index
 */
let removeFile = (listFile, setListFile, index) => {
    setError("");
    setSuccess("");
    listFile.splice(index, 1)
    setListFile([...listFile]);
}

/**
 * Save ITem
 * @param
 * @param
 * @param
 */
const saveItem=async()=>{
    let arrMsg=[];
    if (!checkNullOrBlank(addItem.trim())) {
        let errMsg = t("JSE124").replace("%s", t("Item"));
        arrMsg.push(errMsg);

    }
    if(arrMsg.length > 0){
        setPopupError(arrMsg);
    }
    else{
        setLoading(true);
        setPopupError([]);
        let params = {
            company_id: ApiPath.companyID,
            login_id:ApiPath.loginEmp,
            expense_item:addItem
        };
        let obj = {
            package_name: 'hr',
            url: ApiPath.expenseadjustmentrequestSaveItem,
            method: 'post',
            params
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setPopupError(response.message);
        } else {
            setSuccess([response.data.message]);
            setItemModal(!itemModal);
            loadItem();
        }
    }
}

/* START CHECKBOX ACTION */

const changeCheckbox = (i) => {
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

/* Add Approver Start */
const addApprover = () => {
    let errMsgAll = [];
    if (checkBoxIdList.length === 0) {
    const errorMsg = t('JSE126').replace('%s', t('Approver'));
    errMsgAll.push(errorMsg);
    } else {
        if (!mainTable.some(i => checkBoxIdList.includes(i.approver_id))) {
            mainTableModal.map(value => {
                if (checkBoxIdList.includes(value.approver_id)) {
                    setMainTable(mainTable => [...mainTable,value,]);
                }
            })
        }
        else {
            mainTable.map(i => {
                if (checkBoxIdList.includes(i.approver_id)) {
                    const errorMsg = t('JSE140').replace('%s',i.approver_id );
                    errMsgAll.push(errorMsg);
                }
            })
        }
    }
    if (errMsgAll.length > 0) {
        setError([]);
        setPopupError(errMsgAll);
    }
    else {
        closeApproverModal();
    }
}
/* Add Approver End */

/* Delete Approver Start */
const deleteApprover = (e) => {
    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.approver_id != e["approver_id"] );
    setMainTable(result_data);
}
/* Delete Approver End */

/**Save data request */
const saveData=()=>{
    let arrMsg = [];
    if(checkPosition == false){
        if(mainTable.length == 0){
            let errMsg = t("JSE158");
             arrMsg.push(errMsg);
        }else{
            let checkApprover = mainTable.filter(i => i.approver_or_checker == 1 || i.value.approver_or_checker == 1);
            if (checkApprover.length <= 0) {
              let errMsg = t('JSE158');
              arrMsg.push(errMsg);
            }
        }
    }
    //validate duedate
    let toDate = Moment(dueDate).format('YYYY-MM-DD');
    let requeDate= Moment(requestDate).format('YYYY-MM-DD');
    let fromDate = Moment(appliedDate).format('YYYY-MM-DD');
    if (fromDate > toDate || toDate < requeDate) {
        let errMsg = t('JSE172');
        arrMsg.push(errMsg);
    }
     //remove "." last in unit price
    if(exchangeRate.substr(exchangeRate.length-1)==".")
        setExchangeRate(exchangeRate.substring(0,exchangeRate.length-1));
   // validation Exchange Rate > 0
    if(parseFloat(exchangeRate)===0){
        let errMsg = t("JSE10043").replace("%s", t("Exchange Rate"));
        arrMsg.push(errMsg);
    }
    if(!checkNullOrBlank(exchangeRate)){
        let errMsg = t("JSE124").replace("%s", t("Exchange Rate"));
        arrMsg.push(errMsg);
    }
    //validation Vendor Company max length> 500 character
    if(checkNullOrBlank(vendorCompany) || !validationWhiteSpace(vendorCompany)){
        if (!checkMaxLength(vendorCompany, 500)) {
            let errMsg=t('JSE123').replace('%s', t('Vendor Company')).replace('%s', 500);
            arrMsg.push(errMsg);
           }
    }
    //validation Vendor Name max length> 500 character
    if(checkNullOrBlank(vendorName) || !validationWhiteSpace(vendorName)){
        if (!checkMaxLength(vendorName, 500)) {
            let errMsg=t('JSE123').replace('%s', t('Vendor Name')).replace('%s', 500);
            arrMsg.push(errMsg);
        }
    }
    //validation Phone/Email max length> 500 character
    if(checkNullOrBlank(phoneEmail) || !validationWhiteSpace(phoneEmail)){
        if (!checkMaxLength(phoneEmail, 30)) {
            let errMsg=t('JSE123').replace('%s', t('Phone/Email')).replace('%s', 30);
            arrMsg.push(errMsg);
        }
    }
    let data=  dynamicTable.filter(i=> !isEmpty(i.budget_cost)&& !isEmpty(i.actual_cost));
    data.length !="" && data.map((i,index)=>{
        if (isEmpty(i.flag)) {
            if((Number(i.actual_cost?.unit_price) != Number(i.budget_cost?.unit_price) ||
            Number(i.actual_cost?.qty) != Number(i.budget_cost?.qty)||
            Number(i.actual_cost?.currency_id) != Number(i.budget_cost?.currency_id) ||
            Number(i.actual_cost?.accept_currency_id) != Number(i.budget_cost?.accept_currency_id)||
            Number(i.actual_cost?.fx_rate) != Number(i.budget_cost?.fx_rate ))&& (isEmpty(i.reason))){
               const errMsg = t('JSE174').replace('%s', t('Reason')).replace('%s', (index + 1)).replace('%s', t('Table'));
               arrMsg.push(errMsg);
         }
        }
    })
     // Validate fill Reason
     for (let i = 0; i < dynamicTable.length; i++) {
        if (isEmpty(dynamicTable[i].flag)) {
          if (isEmpty(dynamicTable[i].detail_date) && !isEmpty(dynamicTable[i].actual_cost)) {
            const errMsg = t('JSE171').replace('%s', t('Date')).replace('%s', (i + 1)).replace('%s', t('Table'));
            arrMsg.push(errMsg);
          }
          if (Number(dynamicTable[i].actual_cost?.unit_price) === 0) {
            const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', (i + 1)).replace('%s', t('Table'));
            arrMsg.push(errMsg);
          }
          if (Number(dynamicTable[i].actual_cost?.qty) === 0) {
            const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', (i + 1)).replace('%s', t('Table'));
            arrMsg.push(errMsg);
          }
          if (Number(dynamicTable[i].actual_cost?.fx_rate) === 0) {
            const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', (i + 1)).replace('%s', t('Table'));
            arrMsg.push(errMsg);
          }
        }
      }
    let budget = [];
    for (let i = 0; i < acceptCurrencyData.length; i++) {
      budget[i] = (isEmpty(subTotalActual[i]) ? 0 : subTotalActual[i].amount)
    }
    let check_budget = budget.every(x => x == 0);
    if (check_budget) {
        const errMsg = t('JSE170');
        arrMsg.push(errMsg);
    }
    if (arrMsg.length > 0) {
        setError(arrMsg);
        setSuccess("");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    else{
        setShow(!show); setContent('Are you sure want to save?'); setType('save');
        setError("");
        setSuccess("");
    }
}

  /**
    * Save Expense Adjustment Request
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const saveOK = async () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShow(!show); setType(''); setContent('');
    setLoading(true);
    let approver = [];
    mainTable.map(item => approver.push(item.approver_id));
    let formData = new FormData();
    formData.append("login_id", ApiPath.loginEmp);
    formData.append("company_id", ApiPath.companyID);
    formData.append("expense_id", editData);
    if(!isEmpty(vendorCompany)){
        formData.append("vendor_company",vendorCompany );
    }
    if(!isEmpty(vendorName)){
        formData.append("vendor_name",vendorName );
    }
    if(!isEmpty(phoneEmail)){
        formData.append("contact_ph_email",phoneEmail);
    }
  //  formData.append("contact_ph_email",isEmpty(phoneEmail)? "":phoneEmail);
    formData.append("exchange_rate", exchangeRate);
    if(approveFlag==2){
        formData.append("requested_date", appliedDate)
    }else{
        formData.append("requested_date", requestDate);
    }
    formData.append("due_date", dueDate);
    let idx = 0;
    for (let i = 0; i < dynamicTable.length; i++) {
        if(dynamicTable[i].flag!= 1 && !isEmpty(dynamicTable[i].actual_cost)){
            if(dynamicTable[i].flag != 0){
                if(approveFlag== 4){
                    formData.append("expense_items[" + idx + "][expense_adjustment_detail_id]", dynamicTable[i].expense_detail_id);
                }
                else{
                    formData.append("expense_items[" + idx + "][expense_detail_id]", dynamicTable[i].expense_detail_id);
                }
            }
            if(dynamicTable[i].flag == 0){
                formData.append("expense_items[" + idx + "][expense_item_id]", dynamicTable[i].expense_items_id);
                if(!isEmpty(dynamicTable[i].expense_categories_id) )
                    formData.append("expense_items[" + idx + "][expense_category_id]",dynamicTable[i].expense_categories_id);
            }
            formData.append("expense_items[" + idx + "][adjustment_detail_date]", dynamicTable[i].detail_date);
            formData.append("expense_items[" + idx + "][unit_price]", dynamicTable[i].actual_cost.unit_price);
            formData.append("expense_items[" + idx + "][unit_price_currency_id]", dynamicTable[i].actual_cost.currency_id);
            formData.append("expense_items[" + idx + "][qty]", dynamicTable[i].actual_cost.qty);
            formData.append("expense_items[" + idx + "][accept_currency_id]", dynamicTable[i].actual_cost.accept_currency_id);
            formData.append("expense_items[" + idx + "][fx_rate]", dynamicTable[i].actual_cost.fx_rate);
            formData.append("expense_items[" + idx + "][arrange_by_admin]", dynamicTable[i].arrange_by_admin);
            if(!isEmpty(dynamicTable[i].description)){
                formData.append("expense_items[" + idx + "][description]",dynamicTable[i].description);
            }
           // formData.append("expense_items[" + idx + "][description]", isEmpty(dynamicTable[i].description) ? "" : dynamicTable[i].description);
           if(!isEmpty(dynamicTable[i].reason)){
                formData.append("expense_items[" + idx + "][reason]", dynamicTable[i].reason);
           }
         //  formData.append("expense_items[" + idx + "][reason]", isEmpty(dynamicTable[i].reason) ? "" : dynamicTable[i].reason);
            if(dynamicTable[i].flag == 0){
                if (isEmpty(dynamicTable[i].attach_file) == false) {
                    for (let j = 0; j < dynamicTable[i].attach_file.length; j++) {
                        formData.append("expense_items[" + idx + "][attachs][" + j + "][file]", isEmpty(dynamicTable[i].attach_file[j]?.file) ?
                        "" : dynamicTable[i].attach_file[j]?.file);
                    }
                }
                idx++;
            }
            else{
                if (isEmpty(dynamicTable[i].attach_file) == false) {
                    for (let j = 0; j < dynamicTable[i].attach_file.length; j++) {
                    formData.append("expense_items[" + idx + "][attachs][" + j + "][id]", isEmpty(dynamicTable[i].attach_file[j]?.id) ?
                        "" : dynamicTable[i].attach_file[j]?.id);
                    }
                }
                idx++;
            }
        }
    }
    if (isEmpty(multiFileOtherAttach) == false) {
      for (let i = 0; i < multiFileOtherAttach.length; i++) {
          if(multiFileOtherAttach[i].flag == 1){
            formData.append("expense_other_attachs[" + i + "][file]", multiFileOtherAttach[i]?.file);
          }
          else{
            formData.append("expense_other_attachs[" + i + "][id]", multiFileOtherAttach[i]?.id);
          }
      }
    }
    if(approver.length > 0){
        approver.map((e, index) => {
        formData.append(`approver_id[${index}]`, e);
        })
    }
    if(approveFlag == 4 ){
        deleteID.map((e,index)=>{
            formData.append("deleted_expense_adjustment_detail_id[" + index + "]", e);
        })
        deleteOtherFileID.map((e,index)=>{
            formData.append("deleted_expense_adjustment_orther_attach_id[" + index + "]", e);
        })
        deleteFileID.map((e,index)=>{
            formData.append("deleted_expense_adjustment_detail_attach_id[" + index + "]", e);
        })
    }
    let obj = {
        package_name: 'hr',
        url: approveFlag == 4 ? ApiPath.expenseadjustmentrequestUpdate : ApiPath.expenseadjustmentrequestSave,
        method: 'post',
        params: formData
     };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setError(response.message);
        setSuccess("");
    } else {
        setDeleteFileID([]);
        setDeleteID([]);
        setDeleteOtherFileID([]);
        setError([]);
        setSuccess([response.data.message]);
        loadExpense(editData);
    }
    setApproverState("");
}
return (
    <CRow>
        <CCol xs="12">
            <Loading start={loading} />
            <Message success={success} error={error} />
            <CCard>
                <CCardHeader className="pb-0">
                    <h5 className="mt-3 mb-3" id="cardTitle"><label>{t('Expense Adjustment Request')}</label></h5>
                </CCardHeader>
                <CCardBody className="expense-adjustment-request modal-header-custom">
                    <ExpenseAdjustmentRequestDetail
                        approveFlag={approveFlag}
                        requestDate={requestDate}
                        expenseDepartmentAPI={expenseDepartmentAPI}
                        poNo={poNo}
                        subject={subject}
                        employeeID={employeeID}
                        employeeCode={employeeCode}
                        employeeName={employeeName}
                        department={department}
                        position={position}
                        appliedDate={appliedDate}
                        dueDate={dueDate}
                        handleDueDateChange={handleDueDateChange}
                        exchangeRate={exchangeRate}
                        handleExChangeRate={handleExChangeRate}
                        vendorCompany={vendorCompany}
                        handleVendorCompany={handleVendorCompany}
                        vendorName={vendorName}
                        handleVendorName={handleVendorName}
                        phoneEmail={phoneEmail}
                        handlePhoneEmail={handlePhoneEmail}
                        handleAppliedDateChange={handleAppliedDateChange}
                        expenseDepartment={expenseDepartment}
                        changeExpenseDepartment={changeExpenseDepartment}
                    />
                    <ExpenseAdjustmentRequestAdd
                        advanceAdditional={advanceAdditional}
                        removeAttachFile={removeAttachFile}
                        itemData={itemData}
                        removeFileOtherAttachement={removeFileOtherAttachement}
                        handleFileOtherAttachement={handleFileOtherAttachement}
                        expenseCateName={expenseCateName}
                        totalAdd={totalAdd}
                        advanceFlag={advanceFlag}
                        acceptAmountAdd={acceptAmountAdd}
                        subTotal={subTotalActual}
                        budgetTotal={budgetTotal}
                        onchangeAcceptDropdown={onchangeAcceptDropdown}
                        onchangePriceDropdown={onchangePriceDropdown}
                        dynamicTable={dynamicTable}
                        setDynamicTable={setDynamicTable}
                        onchangeInput={onchangeInput}
                        changeCheckAllAdd={changeCheckAllAdd}
                        allCheckAdd={allCheckAdd}
                        changeCheckByAdmin={changeCheckByAdmin}
                        checkByAdmin={checkByAdmin}
                        handleReasonChange={handleReasonChange}
                        dateAdd={dateAdd}
                        handleDateAddChange={handleDateAddChange}
                        itemModal={itemModal}
                        openItemModal={openItemModal}
                        closeItemModal={closeItemModal}
                        handleImportFile={handleImportFile}
                        multiFile={multiFile}
                        setMultiFile={setMultiFile}
                        removeFile={removeFile}
                        item = {item}
                        changeItem = {changeItem}
                        expenseCategory = {expenseCategory}
                        changeExpenseCategory = {changeExpenseCategory}
                        unitPriceCurrency = {unitPriceCurrency}
                        changeUnitPriceCurrency = {changeUnitPriceCurrency}
                        acceptCurrency = {acceptCurrency}
                        changeAcceptCurrency = {changeAcceptCurrency}
                        expenseCategoryData = {expenseCategoryData}
                        unitPriceCurrencyData = {unitPriceCurrencyData}
                        acceptCurrencyData = {acceptCurrencyData}
                        description = {description}
                        unitPriceNumber = {unitPriceNumber}
                        qty = {qty}
                        fxRateNumber = {fxRateNumber}
                        changeDescription={changeDescription}
                        changeUnitPriceNumber = {changeUnitPriceNumber}
                        changeQty = {changeQty}
                        changeFXRateNumber = {changeFXRateNumber}
                        addDynamicTable = {addDynamicTable}
                        removeRowDynamicTable = {removeRowDynamicTable}
                        multiFileOtherAttach={multiFileOtherAttach}
                        setMultiFileOtherAttach={setMultiFileOtherAttach}
                        handleChangeDateInTable={handleChangeDateInTable}
                    />
                    <ExpenseAdjustmentRequestBudgetTable
                        estimatedAdvanceAmount={estimatedAdvanceAmount}
                        actualAdvanceAmount={actualAdvanceAmount}
                        subTotal={subTotalActual}
                        estimatedTotalNotAdmin={estimatedTotalNotAdmin}
                        actualTotalNotAdmin={actualTotalNotAdmin}
                        budgetTotal={budgetTotal}
                        acceptCurrencyData={acceptCurrencyData}
                        advanceFlag={advanceFlag}
                        advanceAdditional={advanceAdditional}
                    />
                    <ExpenseAdjustmentRequestModalAdd
                        error={popupError}
                        itemModal={itemModal}
                        saveItem={saveItem}
                        closeItemModal={closeItemModal}
                        addItem={addItem}
                        handleAddItemChange={handleAddItemChange}
                        popupError={popupError}
                    />
                    <ExpenseAdjustmentRequestApprover
                        showSearch={showSearch}
                        checkPosition={checkPosition}
                        searchApproverAPI={searchApproverAPI}
                        approverState={approverState}
                        approverData={approverData}
                        approverChange={approverChange}
                        approverModalBox={approverModalBox}
                        openApproverModal={openApproverModal}
                        closeApproverModal={closeApproverModal}
                    />
                    <ExpenseAdjustmentRequestModalApprover
                        empID={employeeID}
                        empCode={employeeCode}
                        empName={employeeName}
                        popupError={popupError}
                        changeCheckbox={changeCheckbox}
                        allCheck={allCheck}
                        totalRow={rowCount}
                        mainTableModal={mainTableModal}
                        addApprover={addApprover}
                        approverModalBox={approverModalBox}
                        closeApproverModal={closeApproverModal}
                    />
                    <ExpenseAdjustmentRequestApproverTable
                        checkPosition={checkPosition}
                        employeeID={employeeID}
                        mainTable={mainTable}
                        deleteApprover={deleteApprover}
                        approverState={approverState}
                        approverData={approverData}
                    />
                    <ExpenseAdjustmentRequest
                        saveData={saveData}
                    />
                    <Confirmation
                        content={content}
                        okButton={t('Ok')}
                        cancelButton={t('Cancel')}
                        type={type} show={show}
                        cancel={() => setShow(!show)}
                        saveOK={saveOK}
                        saveModalBox={saveModalBox}
                        closeSaveAlert={closeSaveAlert}
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
