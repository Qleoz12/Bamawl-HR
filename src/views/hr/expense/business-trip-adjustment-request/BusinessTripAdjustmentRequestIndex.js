/* eslint-disable eqeqeq */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';
import BusinessTripAdjustmentRequestInit from './BusinessTripAdjustmentRequestInit';
import AirTicketBusinessTripAdjustment from './AirTicketBusinessTripAdjustment';
import SeachApprover from './SeachApprover';
import ApproverListConfirmation from './ApproverListConfirmation';
import AdjustmentBudget from './AdjustmentBudget';
import { checkNullOrBlank, isEmpty, is2Decimal, validateNumberOnly, checkNullOrBlankString } from '../../../hr/hr-common/common-validation/CommonValidation';
import AccommodationBusinessTripAdjustment from './AccommodationBusinessTripAdjustment';
import OtherBusinessTripAdjustment from './OtherBusinessTripAdjustment';
import DailyAllowanceBusinessTripAdjustment from './DailyAllowanceBusinessTripAdjustment';
import TransportationBusinessTripAdjustment from './TransportationBusinessTripAdjustment';
import BusinessTripAdjustmentRequestSave from './BusinessTripAdjustmentRequestSave';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Moment from 'moment';
import Message from '../../../brycen-common/message/Message';
import apiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import { useHistory } from "react-router-dom";
function LegacyWelcomeClass({ t }) {
  const history = useHistory(); // For edit link
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const [show, setShow] = useState(false);// For show/hide confirmation box
  const [editData, setEditData] = useState(); // for Edit data
  const [popupError, setPopupError] = useState("");
  const [expenseDepartment, setExpenseDepartment] = useState();
  const [empId, setEmpId] = useState("");
  const [approverFlag, setApproverFlag] = useState("");
  const [empName, setEmpName] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [periodFrom, setPeriodFrom] = useState(null);
  const [businessTripID, setBusinessTripID] = useState(null);
  const [periodTo, setPeriodTo] = useState(null);
  const [requestedDate, setRequestedDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [tripType, setTripType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [exchangeRate, setExchangeRate] = useState();
  const [department, setDepartment] = useState();
  const [position, setPosition] = useState();
  const [rank, setRank] = useState([]);
  const [destination, setDestination] = useState("");
  const [approverData, setApproverData] = useState([]);
  const [approverState, setApproverState] = useState("");
  const [departmentState, setDepartmentState] = useState("");
  const [positionState, setPositionState] = useState("");
  const [addModalBox, setAddModalBox] = useState(false);// Add confirm box show or hide
  const typingTimeoutRef = useRef(null);    // keep value time out 
  const [mainTableModal, setMainTableModal] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(0);    // for row count
  const [approverModalBox, setApproverModalBox] = useState(false);
  const [mainTable, setMainTable] = useState([]); // for main table
  const [saveModalBox, setSaveModalBox] = useState(false); //for save button confirmation
  const [expenseDepartmentAPI, setExpenseDepartmentAPI] = useState([]);   // For Dept API
  const [numCurrencies, setNumCurrencies] = useState();
  const [flagAdmin, setFlagAdmin] = useState(false);
  const inputFile = useRef([]);

  /* Start Allwance */
  const [dataAllwance, setDataAllwance] = useState([]);
  const [allowanceState, setAllowanceState] = useState("");
  const [dateAllowance, setDateAllowance] = useState(null);
  const [currencyAllowance, setCurrencyAllowance] = useState("");
  const [currencyIDAllowance, setCurrencyIDAllowance] = useState(1);
  const [unitPriceAllowance, setUnitPriceAllowance] = useState("");
  const [dayTimeAllwance, setDayTimeAllwance] = useState("");
  const [totalAllwance, setTotalAllwance] = useState("");
  const [descriptionAllwanceState, setDescriptionAllwanceState] = useState("");
  const [multiFileOtherAttachement, setMultiFileOtherAttachement] = useState([]);
  const [subTotalAllwance, setSubTotalAllwance] = useState([]);
  const [budgetTotal, setBudgetTotal] = useState([]);
  const [actualTotal, setActualTotal] = useState([]);
  const [tripAdvance, setTripAdvance] = useState([]);
  const [multiFileAllwance, setMultiFileAllwance] = useState([]);
  const [advanceFlag, setAdvanceFlag] = useState();
  const [advanceAdditional, setadvanceAdditional] = useState();
  /* End Allwance */

  /* State For Other Start */
  const [dataOther, setDataOther] = useState([]);
  const [subTotalOther, setSubTotalOther] = useState([]);
  const [titleOtherState, setTitleOtherState] = useState("");
  const [unitPriceOtherState, setUnitPriceOtherState] = useState("");
  const [unitCurrencyOther, setUnitCurrencyOther] = useState(1);
  const [timesOtherState, setTimesOtherState] = useState("");
  const [totalOtherState, setTotalOtherState] = useState("");
  const [acceptCurrencyOther, setAcceptCurrencyOther] = useState(1);
  const [fxRateOtherState, setFxRateOtherState] = useState("");
  const [acceptAmountOtherState, setAcceptAmountOtherState] = useState("");
  const [checkInOtherState, setCheckInOtherState] = useState(null);
  const [descriptionOtherState, setDescriptionOtherState] = useState("");
  const [checkerOtherState, setCheckerOtherState] = useState(false);
  const [multiFileOther, setMultiFileOther] = useState([]);
  const [flagHiddenOther, setFlagHiddenOther] = useState(true); // hidden or show fx rate
  /* State For Other End */

  /* State For Air Ticket Start */
  const [dataAirTicket, setDataAirTicket] = useState([]);
  const [subTotalAirTicket, setSubTotalAirTicket] = useState([]);
  const [titleAirTicketState, setTitleAirTicketState] = useState("");
  const [unitPriceAirTicketState, setUnitPriceAirTicketState] = useState("");
  const [unitCurrencyAirTicket, setUnitCurrencyAirTicket] = useState(1);
  const [timesAirTicketState, setTimesAirTicketState] = useState("");
  const [totalAirTicketState, setTotalAirTicketState] = useState("");
  const [acceptCurrencyAirTicket, setAcceptCurrencyAirTicket] = useState(1);
  const [fxRateAirTicketState, setFxRateAirTicketState] = useState("");
  const [acceptAmountAirTicketState, setAcceptAmountAirTicketState] = useState("");
  const [checkInAirTicketState, setCheckInAirTicketState] = useState(null);
  const [descriptionAirTicketState, setDescriptionAirTicketState] = useState("");
  const [checkerAirTicketState, setCheckerAirTicketState] = useState(false);
  const [multiFileAirTicket, setMultiFileAirTicket] = useState([]);
  const [flagHiddenAirTicket, setFlagHiddenAirTicket] = useState(true); // hidden or show fx rate
  /* State For Air Ticket End */

  /* State For Transport Start */
  const [dataTransport, setDataTransport] = useState([]);
  const [subTotalTransport, setSubTotalTransport] = useState([]);
  const [titleTransportState, setTitleTransportState] = useState("");
  const [unitPriceTransportState, setUnitPriceTransportState] = useState("");
  const [unitCurrencyTransport, setUnitCurrencyTransport] = useState(1);
  const [timesTransportState, setTimesTransportState] = useState("");
  const [totalTransportState, setTotalTransportState] = useState("");
  const [acceptCurrencyTransport, setAcceptCurrencyTransport] = useState(1);
  const [fxRateTransportState, setFxRateTransportState] = useState("");
  const [acceptAmountTransportState, setAcceptAmountTransportState] = useState("");
  const [checkInTransportState, setCheckInTransportState] = useState(null);
  const [descriptionTransportState, setDescriptionTransportState] = useState("");
  const [checkerTransportState, setCheckerTransportState] = useState(false);
  const [multiFileTransport, setMultiFileTransport] = useState([]);
  const [flagHiddenTransport, setFlagHiddenTransport] = useState(true); // hidden or show fx rate
  /* State For Transport End */

  /* State For Accomodation Start */
  const [dataAccom, setDataAccom] = useState([]);
  const [subTotalAccom, setSubTotalAccom] = useState([]);
  const [titleAccomState, setTitleAccomState] = useState("");
  const [unitPriceAccomState, setUnitPriceAccomState] = useState("");
  const [unitCurrencyAccom, setUnitCurrencyAccom] = useState(1);
  const [timesAccomState, setTimesAccomState] = useState("");
  const [totalAccomState, setTotalAccomState] = useState("");
  const [acceptCurrencyAccom, setAcceptCurrencyAccom] = useState(1);
  const [fxRateAccomState, setFxRateAccomState] = useState("");
  const [acceptAmountAccomState, setAcceptAmountAccomState] = useState("");
  const [checkInAccomState, setCheckInAccomState] = useState(null);
  const [checkOutAccomState, setCheckOutAccomState] = useState(null);
  const [descriptionAccomState, setDescriptionAccomState] = useState("");
  const [checkerAccomState, setCheckerAccomState] = useState(false);
  const [multiFileAccom, setMultiFileAccom] = useState([]);
  const [flagHiddenAccom, setFlagHiddenAccom] = useState(true); // hidden or show fx rate
  const [positionRank, setPositionRank] = useState("");  // for session position rank
  const [approverSetting, setApproverSetting] = useState(''); // for approver setting
  /* State For Accomodation End */
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const refUpload = useRef([]);
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

  /**
    * Page Load
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadPositionRank();
    loadDept();
    loadAllowance();
    loadCurrency();
    let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_ADJUSTMENT_REQUEST_DATA"));
    if (edit_Data != null) {
      let edit_id = edit_Data;
      editIndex(edit_id);
      setEditData(edit_id);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    totalNoAdmin();
  }, [dataAllwance,
    dataOther,
    dataAirTicket,
    dataTransport,
    dataAccom]);

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
      login_employee_id: apiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: apiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) { }
  };

  const loadPositionRank = async () => {
    let params = {
      "company_id": apiPath.companyID,
      "employee_id": apiPath.loginEmp,
      "language": apiPath.lang
    };
    let obj = { package_name: 'hr', url: apiPath.businessTripAdjustmentRequestGetPoisionRank, method: 'post', params };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
    } else {
      setPositionRank(response.data.data.is_position_rank_zero);
    }
  };

  /* loadApprover */
  const loadApprover = async (employeeID) => {
    let params = {
      company_id: apiPath.companyID,
      employee_id: employeeID,
      device_flag: 1
    }
    let data = {
      package_name: 'erp',
      url: apiPath.ERPApproverList,
      method: 'post',
      params
    }
    let response = await ApiRequest(data);
    response.flag === false ? setApproverData([]) : setApproverData(response.data.data);
    setLoading(false);
  }

  const onUploadPress = (e) => {
    refUpload.current.click();
  }

  let exchangeRateChange = (e) => {
    setExchangeRate(e.target.value);
  }

  let destinationChange = (e) => {
    setDestination(e.target.value);
  }

  let purposeChange = (e) => {
    setPurpose(e.target.value);
  }

  let removeMessageError = () => {
    setError([]);
  }
  const addToggleAlert = (e) => {
    setAddModalBox(!addModalBox);
  };

  let removeMessageSuccess = () => {
    setSuccess("");
  }

  const addOnClose = () => {
    setAddModalBox(!addModalBox);
  };

  const removeMessagePopup = () => {
    setPopupError("");
  }

  /** Start Date In FormSearch */
  let handleFromDateChange = (e) => {
    setPeriodFrom(e);
  };
  let handleToDateChange = (e) => {
    setPeriodTo(e);
  };
  let removeFromDate = () => {
    setPeriodFrom(null);
  }
  let removeToDate = () => {
    setPeriodTo(null);
  }

  let removeDateInAccom = () => {
    setCheckInAccomState(null);
  }
  let removeDateOutAccom = () => {
    setCheckOutAccomState(null);
  }

  let removeDateInAirticket = () => {
    setCheckInAirTicketState(null);
  }

  let removeDateInTrans = () => {
    setCheckInTransportState(null);
  }

  let removeDateInOther = () => {
    setCheckInOtherState(null);
  }

  let handleDueDate = (e) => {
    setDueDate(e);
  }
  let removeDueDate = () => {
    setDueDate(null);
  }

  let handleDateAllowanceChange = (e) => {
    setDateAllowance(e);
  };

  let removeDateAllowance = () => {
    setDateAllowance(null);
  }

  let handleChangeDescriptionAllwance = (e) => {
    let data = e.target.value;
    setDescriptionAllwanceState(data);
  }
  /** End Date In FormSearch */

  /**
    * Load Currency
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const [allCurrency, setAllCurrency] = useState([]);
  const loadCurrency = async () => {
    let obj = { package_name: 'hr', url: apiPath.businessTripAdjustmentRequestGetCurrency, method: 'get' };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setAllCurrency([]);
    } else {
      let data = response.data.data;
      setAllCurrency(data);
      let TotalcolSpan
      TotalcolSpan = data.filter(item => item.expense_flag === 1);
      setNumCurrencies(TotalcolSpan.length);
    }
  }

  /**
    * Load Allowance
    *
    * @author  v_hao
    * @create  08/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const [allowanceAPI, setAllowanceAPI] = useState([]);
  const loadAllowance = async () => {
    let url = `${apiPath.testAllowance}?company_id=${apiPath.companyID}`
    let obj = { package_name: 'hr', url: url, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setAllowanceAPI([]);
    } else {
      setAllowanceAPI(response.data.data);
    }
  }

  /**
  * Load Department
  *
  * @author  v_hao
  * @create  08/07/2021 (D/M/Y)
  * @param
  * @return
  */
  const loadDept = async () => {
    let obj = { package_name: 'erp', url: apiPath.ERPGetAllDepartment, method: 'get' };
    let response = await ApiRequest(obj);
    response.flag === false ? setExpenseDepartmentAPI([]) : setExpenseDepartmentAPI(response.data.data);
  };

  const [actualNoAdmin, setActualNoAdmin] = useState([]);
  let calculate = (dataCategory) => {
    let data = [];
    allCurrency.map((ele, index) => {
      let result = 0;
      const obj = dataCategory?.infor?.filter(item => item.arrange_by_admin === 0 && item.actual_cost.accept_currency_id === ele.id && item.flag !== 1);
      if (obj) {
        obj.map(item => {
          result += Math.round(item.actual_cost.cost * 100) / 100;
        })
        data[index] = { currency_id: ele.id, total_not_include_admin_arrange: result }
      }
    });
    return data;
  }

  const totalNoAdmin = () => {
    let noAdminAccom = calculate(dataAccom);
    let noAdminAirTicket = calculate(dataAirTicket);
    let noAdminTransport = calculate(dataTransport);
    let noAdminOther = calculate(dataOther);
    let noAdminAllwance = calculate(dataAllwance);

    let data = [];
    allCurrency.map((ele, index) => {
      data[index] = {
        currency_id: ele.id,
        total_not_include_admin_arrange:
          Math.round(noAdminAccom[index]?.total_not_include_admin_arrange * 100) / 100 +
          Math.round(noAdminAirTicket[index]?.total_not_include_admin_arrange * 100) / 100 +
          Math.round(noAdminTransport[index]?.total_not_include_admin_arrange * 100) / 100 +
          Math.round(noAdminOther[index]?.total_not_include_admin_arrange * 100) / 100 +
          Math.round(noAdminAllwance[index]?.total_not_include_admin_arrange * 100) / 100
      }
    });
    setActualNoAdmin(data);
  }

  const validateFormAllwance = () => {
    let allError = [];
    if (isEmpty(allowanceState)) {
      allError.push(t('JSE124').replace('%s', t('Select Allwance')));
    }
    if (isEmpty(dateAllowance)) {
      allError.push(t('JSE124').replace('%s', t('Date Allwance')));
    }
    if (isEmpty(dayTimeAllwance)) {
      allError.push(t('JSE124').replace('%s', t('Days/Times Allwance')));
    }
    if (parseFloat(dayTimeAllwance) == 0) {
      allError.push(t('JSE10043').replace('%s', t('Days/Times Allwance')));
    }
    if (!isEmpty(allError)) {
      setError([...allError]);
      setSuccess('');
      return true;
    }
    return false;
  }

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
  /* Validate Search Approver End */

  let requestData = () => {
    let errMsgAll = [];

    /** Validate Deduction Category */
    if (!checkNullOrBlank(exchangeRate)) {
      const errMsg = t('JSE124').replace('%s', t('Exchange Rate'));
      errMsgAll.push(errMsg);
    }
    let trip_period_from_date = Moment(periodFrom).format('YYYY-MM-DD');
    let trip_period_to_date = Moment(periodTo).format('YYYY-MM-DD');

    if (trip_period_from_date > trip_period_to_date) {
      const errMsg = t('JSE156');
      errMsgAll.push(errMsg);
    }
    if (!checkNullOrBlank(destination)) {
      const errMsg = t('JSE124').replace('%s', t('Destination'));
      errMsgAll.push(errMsg);
    }
    if (!checkNullOrBlank(purpose)) {
      const errMsg = t('JSE124').replace('%s', t('Purpose'));
      errMsgAll.push(errMsg);
    }
    let budget = [];
    for (let i = 0; i < numCurrencies; i++) {
      budget[i] = (isEmpty(subTotalAirTicket[i]) ? 0 : subTotalAirTicket[i].sub_total)
        + (isEmpty(subTotalAccom[i]) ? 0 : subTotalAccom[i].sub_total)
        + (isEmpty(subTotalTransport[i]) ? 0 : subTotalTransport[i].sub_total)
        + (isEmpty(subTotalAllwance[i]) ? 0 : subTotalAllwance[i].sub_total)
        + (isEmpty(subTotalOther[i]) ? 0 : subTotalOther[i].sub_total);
    }

    let check_budget = budget.every(x => x == 0);
    if (check_budget) {
      const errMsg = t('JSE157');
      errMsgAll.push(errMsg);
    }

    if (positionRank == false) {
      if (mainTable.length == 0) {
        let errMsg = t("JSE158");
        errMsgAll.push(errMsg);
      } else {
        let approverOrChecker = 0;
        mainTable.map(e => {
          if (e.approver_or_checker != null) {
            if (e.approver_or_checker == 1)
              approverOrChecker++;
          }
        })
        if (approverOrChecker == 0) {
          let errMsg = t("JSE158");
          errMsgAll.push(errMsg);
        }
      }
    }
    // Validate fill Reason
    for (let i = 0; i < dataAirTicket.infor.length; i++) {
      if (isEmpty(dataAirTicket.infor[i].flag)) {
        if (isEmpty(dataAirTicket.infor[i].date_in)) {
          const errMsg = t('JSE153').replace('%s', t('Date')).replace('%s', t(i + 1)).replace('%s', t('Air Ticket'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAirTicket.infor[i].actual_cost?.unit_price) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', t(i + 1)).replace('%s', t('Air Ticket'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAirTicket.infor[i].actual_cost?.day_times) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', t(i + 1)).replace('%s', t('Air Ticket'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAirTicket.infor[i].actual_cost?.fx_rate) === 0) {
          const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', t(i + 1)).replace('%s', t('Air Ticket'));
          errMsgAll.push(errMsg);
        }
        if ((Number(dataAirTicket.infor[i].actual_cost?.unit_price) != Number(dataAirTicket.infor[i].budget_cost?.unit_price) ||
          Number(dataAirTicket.infor[i].actual_cost?.day_times) != Number(dataAirTicket.infor[i].budget_cost?.day_times) ||
          dataAirTicket.infor[i].actual_cost?.unit_price_currency_id != dataAirTicket.infor[i].budget_cost?.unit_price_currency_id ||
          Number(dataAirTicket.infor[i].actual_cost?.fx_rate) != Number(dataAirTicket.infor[i].budget_cost?.fx_rate) ||
          dataAirTicket.infor[i].actual_cost?.accept_currency_id != dataAirTicket.infor[i].budget_cost?.accept_currency_id)
          && dataAirTicket.infor[i].reason == null && isEmpty(dataAirTicket.infor[i].budget_cost) == false) {
          const errMsg = t('JSE153').replace('%s', t('Reason')).replace('%s', t(i + 1)).replace('%s', t('Air Ticket'));
          errMsgAll.push(errMsg);
        }
      }
    }

    for (let i = 0; i < dataAccom.infor.length; i++) {
      if (isEmpty(dataAccom.infor[i].flag)) {
        if (isEmpty(dataAccom.infor[i].date_in)) {
          const errMsg = t('JSE153').replace('%s', t('Check-In')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
        if (isEmpty(dataAccom.infor[i].date_out)) {
          const errMsg = t('JSE153').replace('%s', t('Check-Out')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
        if (isEmpty(dataAccom.infor[i].date_in) == false && isEmpty(dataAccom.infor[i].date_out) == false && dataAccom.infor[i].date_in > dataAccom.infor[i].date_out) {
          const errMsg = t('JSE154').replace('%s', t(i + 1));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAccom.infor[i].actual_cost?.unit_price) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAccom.infor[i].actual_cost?.day_times) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAccom.infor[i].actual_cost?.fx_rate) === 0) {
          const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
        if ((Number(dataAccom.infor[i].actual_cost?.unit_price) != Number(dataAccom.infor[i].budget_cost?.unit_price) ||
          Number(dataAccom.infor[i].actual_cost?.day_times) != Number(dataAccom.infor[i].budget_cost?.day_times) ||
          dataAccom.infor[i].actual_cost?.unit_price_currency_id != dataAccom.infor[i].budget_cost?.unit_price_currency_id ||
          Number(dataAccom.infor[i].actual_cost?.fx_rate) != Number(dataAccom.infor[i].budget_cost?.fx_rate) ||
          dataAccom.infor[i].actual_cost?.accept_currency_id != dataAccom.infor[i].budget_cost?.accept_currency_id)
          && dataAccom.infor[i].reason == null && isEmpty(dataAccom.infor[i].budget_cost) == false) {
          const errMsg = t('JSE153').replace('%s', t('Reason')).replace('%s', t(i + 1)).replace('%s', t('Accommodation'));
          errMsgAll.push(errMsg);
        }
      }
    }

    for (let i = 0; i < dataTransport.infor.length; i++) {
      if (isEmpty(dataTransport.infor[i].flag)) {
        if (isEmpty(dataTransport.infor[i].date_in)) {
          const errMsg = t('JSE153').replace('%s', t('Date')).replace('%s', t(i + 1)).replace('%s', t('Transportation'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataTransport.infor[i].actual_cost?.unit_price) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', t(i + 1)).replace('%s', t('Transportation'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataTransport.infor[i].actual_cost?.day_times) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', t(i + 1)).replace('%s', t('Transportation'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataTransport.infor[i].actual_cost?.fx_rate) === 0) {
          const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', t(i + 1)).replace('%s', t('Transportation'));
          errMsgAll.push(errMsg);
        }
        if ((Number(dataTransport.infor[i].actual_cost?.unit_price) != Number(dataTransport.infor[i].budget_cost?.unit_price) ||
          Number(dataTransport.infor[i].actual_cost?.day_times) != Number(dataTransport.infor[i].budget_cost?.day_times) ||
          dataTransport.infor[i].actual_cost?.unit_price_currency_id != dataTransport.infor[i].budget_cost?.unit_price_currency_id ||
          Number(dataTransport.infor[i].actual_cost?.fx_rate) != Number(dataTransport.infor[i].budget_cost?.fx_rate) ||
          dataTransport.infor[i].actual_cost?.accept_currency_id != dataTransport.infor[i].budget_cost?.accept_currency_id)
          && dataTransport.infor[i].reason == null && isEmpty(dataTransport.infor[i].budget_cost) == false) {
          const errMsg = t('JSE153').replace('%s', t('Reason')).replace('%s', t(i + 1)).replace('%s', t('Transportation'));
          errMsgAll.push(errMsg);
        }
      }
    }

    for (let i = 0; i < dataAllwance.infor.length; i++) {
      if (isEmpty(dataAllwance.infor[i].flag)) {
        if (isEmpty(dataAllwance.infor[i].date_in)) {
          const errMsg = t('JSE153').replace('%s', t('Date')).replace('%s', t(i + 1)).replace('%s', t('Daily Allowance'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAllwance.infor[i].actual_cost?.unit_price) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', t(i + 1)).replace('%s', t('Daily Allowance'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAllwance.infor[i].actual_cost?.day_times) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', t(i + 1)).replace('%s', t('Daily Allowance'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataAllwance.infor[i].actual_cost?.fx_rate) === 0) {
          const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', t(i + 1)).replace('%s', t('Daily Allowance'));
          errMsgAll.push(errMsg);
        }
        if ((Number(dataAllwance.infor[i].actual_cost?.unit_price) != Number(dataAllwance.infor[i].budget_cost?.unit_price) ||
          Number(dataAllwance.infor[i].actual_cost?.day_times) != Number(dataAllwance.infor[i].budget_cost?.day_times) ||
          dataAllwance.infor[i].actual_cost?.unit_price_currency_id != dataAllwance.infor[i].budget_cost?.unit_price_currency_id ||
          Number(dataAllwance.infor[i].actual_cost?.fx_rate) != Number(dataAllwance.infor[i].budget_cost?.fx_rate) ||
          dataAllwance.infor[i].actual_cost?.accept_currency_id != dataAllwance.infor[i].budget_cost?.accept_currency_id)
          && dataAllwance.infor[i].reason == null && isEmpty(dataAllwance.infor[i].budget_cost) == false) {
          const errMsg = t('JSE153').replace('%s', t('Reason')).replace('%s', t(i + 1)).replace('%s', t('Daily Allowance'));
          errMsgAll.push(errMsg);
        }
      }
    }

    for (let i = 0; i < dataOther.infor.length; i++) {
      if (isEmpty(dataOther.infor[i].flag)) {
        if (isEmpty(dataOther.infor[i].date_in)) {
          const errMsg = t('JSE153').replace('%s', t('Date')).replace('%s', t(i + 1)).replace('%s', t('Other'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataOther.infor[i].actual_cost?.unit_price) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Unit Price')).replace('%s', t(i + 1)).replace('%s', t('Other'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataOther.infor[i].actual_cost?.day_times) === 0) {
          const errMsg = t('JSE155').replace('%s', t('Qty')).replace('%s', t(i + 1)).replace('%s', t('Other'));
          errMsgAll.push(errMsg);
        }
        if (Number(dataOther.infor[i].actual_cost?.fx_rate) === 0) {
          const errMsg = t('JSE155').replace('%s', t('FX Rate')).replace('%s', t(i + 1)).replace('%s', t('Other'));
          errMsgAll.push(errMsg);
        }
        if ((Number(dataOther.infor[i].actual_cost?.unit_price) != Number(dataOther.infor[i].budget_cost?.unit_price) ||
          Number(dataOther.infor[i].actual_cost?.day_times) != Number(dataOther.infor[i].budget_cost?.day_times) ||
          dataOther.infor[i].actual_cost?.unit_price_currency_id != dataOther.infor[i].budget_cost?.unit_price_currency_id ||
          Number(dataOther.infor[i].actual_cost?.fx_rate) != Number(dataOther.infor[i].budget_cost?.fx_rate) ||
          dataOther.infor[i].actual_cost?.accept_currency_id != dataOther.infor[i].budget_cost?.accept_currency_id)
          && dataOther.infor[i].reason == null && isEmpty(dataOther.infor[i].budget_cost) == false) {
          const errMsg = t('JSE153').replace('%s', t('Reason')).replace('%s', t(i + 1)).replace('%s', t('Other'));
          errMsgAll.push(errMsg);
        }
      }
    }

    if (errMsgAll.length > 0) {
      setError([...errMsgAll]);
      setSuccess('');
    } else {
      setShow(!show); setContent('Are you sure want to save?'); setType('save');
      setError("");
    }
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
        parseInt(item.employee_id) === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked) {
        id_list.push(data[i].employee_id);
      }
    }
    setCheckBoxIdList(id_list);

    setAllCheck(data.every(item => item.is_checked));
    setMainTableModal(data);
  }
  /* END CHECKBOX ACTION */

  /** 
   * set price and currency when change dropdown allwance
  */
  function onAllowanceTitleChange(e) {
    setAllowanceState(e.target.value);
    let allowanceValue = allowanceAPI.find(i => i.id == e.target.value);
    if (!isEmpty(allowanceValue)) {
      setUnitPriceAllowance(allowanceValue.allowance_amount);
      let currencyValue = allCurrency.find(i => i.id == allowanceValue.currency_id);
      setCurrencyAllowance(currencyValue.currency_desc);
      setCurrencyIDAllowance(currencyValue.id);
      let teampTotal = allowanceValue.allowance_amount * dayTimeAllwance;
      if (is2Decimal(teampTotal)) {
        setTotalAllwance(teampTotal);
      }
    } else {
      setUnitPriceAllowance("");
      setCurrencyAllowance("");
      setTotalAllwance("");
    }
  }

  /** 
   * change dropdown allwance title table
  */
  function onAllowanceTitleChangeTable(e, idx) {
    let dataTemp = [];
    let index = e.target.selectedIndex;
    let optionElement = e.target.childNodes[index];
    let teampPrice = optionElement.getAttribute('name');
    let teampCurrency = optionElement.getAttribute('id');
    dataTemp = dataAllwance.infor?.map((ele, index) =>
      index == idx ? {
        ...ele, actual_cost: {
          "unit_price": parseFloat(teampPrice),
          "accept_currency_id": Number(teampCurrency),
          "day_times": Number(ele.actual_cost.day_times),
          "cost": parseFloat(teampPrice) * parseFloat(ele.actual_cost.day_times),
          "fx_rate": parseFloat(ele.actual_cost.fx_rate)
        },
        "sub_allowance_id": Number(e.target.value)
      } : ele
    )
    setDataAllwance({ ...dataAllwance, infor: dataTemp });
    updateTableAllwance({ ...dataAllwance, infor: dataTemp }, subTotalAllwance, setSubTotalAllwance);
  }

  let handleChangeDateOutTableAllwance = (value, obj) => {
    let dataTemp;
    dataTemp = dataAllwance.infor.map(ele =>
      ele.id == obj.id ? { ...ele, date_in: Moment(value).format("YYYY-MM-DD") } : ele
    )
    setDataAllwance({ ...dataAllwance, infor: dataTemp });
  }

  /** 
   * update table allwance
  */
  let updateTableAllwance = (data, subTotalActual, setSubTotalActualAllwance) => {
    setFlagAdmin(true);
    let subTotal = [...subTotalActual];
    let curData = { ...data };
    let dataTemp = curData.infor.reduce((prev, cur) => {
      if (cur.flag != 1) {
        const { accept_currency_id, cost } = cur.actual_cost;
        const currency_id = Number(accept_currency_id);
        const sub_total = parseFloat(cost);
        const index = prev.findIndex((item) => item.currency_id === currency_id);
        if (index >= 0) {
          prev[index].sub_total += parseFloat(sub_total);
        } else {
          prev.push({
            currency_id,
            sub_total,
          });
        }
      }
      return prev;
    }, []);
    allCurrency.map((item, index) => {
      subTotal[index] = { currency_id: item.id, sub_total: 0 };
    });
    subTotal.map(item => {
      let obj = dataTemp.find(ele => ele.currency_id === item.currency_id);
      if (obj && item.currency_id === obj.currency_id)
        item.sub_total = obj.sub_total
    });

    setSubTotalActualAllwance(subTotal);
  }

  /** 
   * add button allwance
  */
  let btnAddRowAllwance = (multiFile) => {
    if (validateFormAllwance()) return window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });;
    let attachFile = multiFile?.map((ele) => ({
      "business_trip_detail_document_name": ele.name,
      "file": ele
    }));

    let businessTripListValue = [];
    for (let i = 0; i < dayTimeAllwance; i++) {
      let cursorData = {
        "sub_allowance_id": allowanceState,
        "description": descriptionAllwanceState,
        "date_in": Moment(dateAllowance).format('YYYY-MM-DD'),
        "budget_cost": {
          "unit_price": null,
          "day_times": null,
          "accept_currency_id": null,
          "fx_rate": null,
          "cost": null
        },
        "actual_cost": {
          "unit_price": unitPriceAllowance,
          "day_times": 1,
          "accept_currency_id": currencyIDAllowance,
          "fx_rate": 1,
          "cost": parseFloat(unitPriceAllowance)
        },
        "arrange_by_admin": 0,
        "attach_file": [...attachFile],
        "flag": 0,
      }
      businessTripListValue.push(cursorData);
    }

    setDataAllwance({ ...dataAllwance, infor: [...dataAllwance.infor, ...businessTripListValue] });
    resetFormAllwance();
    updateTableAllwance({ ...dataAllwance, infor: [...dataAllwance.infor, ...businessTripListValue] }, subTotalAllwance, setSubTotalAllwance);
    setError([]);
    setSuccess('');
  }

  let resetFormAllwance = () => {
    setAllowanceState("");
    setDateAllowance(null);
    setUnitPriceAllowance("");
    setCurrencyAllowance("");
    setDescriptionAllwanceState("");
    setTotalAllwance("");
    setDayTimeAllwance("");
    setMultiFileAllwance([]);
  }

  let btnRemoveFileInTableAllwance = (positionData, positionFile) => {
    let currenData = dataAllwance.infor;
    currenData.map((ele, index) =>
      index === positionData ? ele.attach_file.splice(positionFile, 1) : ele
    )
    setDataAllwance({ ...dataAllwance, infor: currenData });
    updateTableAllwance({ ...dataAllwance, infor: currenData }, subTotalAllwance, setSubTotalAllwance);
  }

  let btnRemoveRowTableAllwance = (obj, index) => {
    if (obj.flag == 0 || obj.budget_cost == null) {
      dataAllwance.infor.splice(index, 1);
      setDataAllwance({ ...dataAllwance, infor: dataAllwance.infor });
      updateTableAllwance({ ...dataAllwance, infor: dataAllwance.infor }, subTotalAllwance, setSubTotalAllwance);
    }
    else {
      let cursorData = dataAllwance.infor.map(ele => ele.id == obj.id ? { ...ele, flag: 1, date_in: null } : ele);
      setDataAllwance({ ...dataAllwance, infor: cursorData });
      updateTableAllwance({ ...dataAllwance, infor: cursorData }, subTotalAllwance, setSubTotalAllwance);
    }
  }

  let dayTimeAllwanceChange = (e) => {
    let data = e.target.value;
    if (validateNumberOnly(data) || data === "") {
      let teampTotal = unitPriceAllowance * data;
      setDayTimeAllwance(data);
      setTotalAllwance(teampTotal);
    }
  }

  /** 
   * common validate upload file
  */
  const validateUploadFile = (file) => {
    const regex = /.*\.(jpg|jpe?g|png|pdf)$/igm;
    if (!regex.test(file.name)) {
      let errMsg = t("JSE159").replace("%s", ".PDF, .JPG, .JPEG, .PNG");
      return errMsg;
    }
    if (parseInt(file.size) > 10485760) {
      let errMsg = t("JSE111");
      return errMsg;
    }
    return true;
  }

  //check decimal for unit price
  const isDecimalPrice = (value) => {
    var decimalOnly = /^[]*?(\d{0,10})(\.\d{0,2})?$/;
    if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
      return true;
    }
    return false;
  }

  /** Start Save/Update function */
  const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  }

  /**
   * request form Business Trip Adjustment Request
  */
  const saveOK = async () => {
    //window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShow(!show); setType(''); setContent(''); setLoading(true);
    let approver = [];
    mainTable.map(item => approver.push(item.employee_id));

    let formData = new FormData();
    formData.append("company_id", apiPath.companyID);
    formData.append("business_trip_id", businessTripID);
    formData.append("trip_period_from_date", Moment(periodFrom).format('YYYY-MM-DD'));
    formData.append("trip_period_to_date", Moment(periodTo).format('YYYY-MM-DD'));
    formData.append("employee_id", empId);
    formData.append("destination", destination);
    formData.append("exchange_rate", exchangeRate);
    formData.append("applied_date", requestedDate);
    formData.append("due_date", Moment(dueDate).format('YYYY-MM-DD'));
    formData.append("purpose", purpose);
    formData.append("trip_type_id", tripType == "Domestic" ? 1 : 2);
    let idx = 0;
    for (let i = 0; i < dataAirTicket.infor.length; i++) {
      if (dataAirTicket.infor[i].flag != 1) {
        formData.append("air_ticket[" + idx + "][id]", isEmpty(dataAirTicket.infor[i].id) ? "" : dataAirTicket.infor[i].id);
        formData.append("air_ticket[" + idx + "][is_new]", isEmpty(dataAirTicket.infor[i].is_new) ? "" : dataAirTicket.infor[i].is_new);
        formData.append("air_ticket[" + idx + "][title]", (dataAirTicket.infor[i].flag == 0 && dataAirTicket.infor[i].arrange_by_admin == 1) ?
          dataAirTicket.infor[i].title.slice(0, -19) : dataAirTicket.infor[i].title);
        formData.append("air_ticket[" + idx + "][unit_price]", dataAirTicket.infor[i].actual_cost.unit_price);
        formData.append("air_ticket[" + idx + "][unit_price_currency_id]", dataAirTicket.infor[i].actual_cost.unit_price_currency_id);
        formData.append("air_ticket[" + idx + "][day_times]", dataAirTicket.infor[i].actual_cost.day_times);
        formData.append("air_ticket[" + idx + "][accept_currency_id]", dataAirTicket.infor[i].actual_cost.accept_currency_id);
        formData.append("air_ticket[" + idx + "][fx_rate]", dataAirTicket.infor[i].actual_cost.fx_rate);
        formData.append("air_ticket[" + idx + "][date]", Moment(dataAirTicket.infor[i].date_in).format('YYYY-MM-DD'));
        formData.append("air_ticket[" + idx + "][arrange_by_admin]", dataAirTicket.infor[i].arrange_by_admin);
        formData.append("air_ticket[" + idx + "][description]", isEmpty(dataAirTicket.infor[i].description) ? "" : dataAirTicket.infor[i].description);
        formData.append("air_ticket[" + idx + "][reason]", isEmpty(dataAirTicket.infor[i].reason) ? "" : dataAirTicket.infor[i].reason);
        if (isEmpty(dataAirTicket.infor[i].attach_file) == false) {
          for (let j = 0; j < dataAirTicket.infor[i].attach_file.length; j++) {
            formData.append("air_ticket[" + idx + "][attach_file][" + j + "][id]", isEmpty(dataAirTicket.infor[i].attach_file[j]?.id) ?
              "" : dataAirTicket.infor[i].attach_file[j]?.id);
            formData.append("air_ticket[" + idx + "][attach_file][" + j + "][file]", isEmpty(dataAirTicket.infor[i].attach_file[j]?.file) ?
              "" : dataAirTicket.infor[i].attach_file[j]?.file);
          }
        }
        idx++;
      }
    }
    idx = 0;
    for (let i = 0; i < dataAccom.infor.length; i++) {
      if (dataAccom.infor[i].flag != 1) {
        formData.append("accommodation[" + idx + "][id]", isEmpty(dataAccom.infor[i].id) ? "" : dataAccom.infor[i].id);
        formData.append("accommodation[" + idx + "][is_new]", isEmpty(dataAccom.infor[i].is_new) ? "" : dataAccom.infor[i].is_new);
        formData.append("accommodation[" + idx + "][title]", (dataAccom.infor[i].flag == 0 && dataAccom.infor[i].arrange_by_admin == 1) ?
          dataAccom.infor[i].title.slice(0, -19) : dataAccom.infor[i].title);
        formData.append("accommodation[" + idx + "][unit_price]", dataAccom.infor[i].actual_cost.unit_price);
        formData.append("accommodation[" + idx + "][unit_price_currency_id]", dataAccom.infor[i].actual_cost.unit_price_currency_id);
        formData.append("accommodation[" + idx + "][day_times]", dataAccom.infor[i].actual_cost.day_times);
        formData.append("accommodation[" + idx + "][accept_currency_id]", dataAccom.infor[i].actual_cost.accept_currency_id);
        formData.append("accommodation[" + idx + "][fx_rate]", dataAccom.infor[i].actual_cost.fx_rate);
        formData.append("accommodation[" + idx + "][check_in]", Moment(dataAccom.infor[i].date_in).format('YYYY-MM-DD'));
        formData.append("accommodation[" + idx + "][check_out]", Moment(dataAccom.infor[i].date_out).format('YYYY-MM-DD'));
        formData.append("accommodation[" + idx + "][arrange_by_admin]", dataAccom.infor[i].arrange_by_admin);
        formData.append("accommodation[" + idx + "][description]", isEmpty(dataAccom.infor[i].description) ? "" : dataAccom.infor[i].description);
        formData.append("accommodation[" + idx + "][reason]", isEmpty(dataAccom.infor[i].reason) ? "" : dataAccom.infor[i].reason);
        if (isEmpty(dataAccom.infor[i].attach_file) == false) {
          for (let j = 0; j < dataAccom.infor[i].attach_file.length; j++) {
            formData.append("accommodation[" + idx + "][attach_file][" + j + "][id]", isEmpty(dataAccom.infor[i].attach_file[j]?.id) ?
              "" : dataAccom.infor[i].attach_file[j]?.id);
            formData.append("accommodation[" + idx + "][attach_file][" + j + "][file]", isEmpty(dataAccom.infor[i].attach_file[j]?.file) ?
              "" : dataAccom.infor[i].attach_file[j]?.file);
          }
        }
        idx++;
      }
    }
    idx = 0;
    for (let i = 0; i < dataTransport.infor.length; i++) {
      if (dataTransport.infor[i].flag != 1) {
        formData.append("transportation[" + idx + "][id]", isEmpty(dataTransport.infor[i].id) ? "" : dataTransport.infor[i].id);
        formData.append("transportation[" + idx + "][is_new]", isEmpty(dataTransport.infor[i].is_new) ? "" : dataTransport.infor[i].is_new);
        formData.append("transportation[" + idx + "][title]", (dataTransport.infor[i].flag == 0 && dataTransport.infor[i].arrange_by_admin == 1) ?
          dataTransport.infor[i].title.slice(0, -19) : dataTransport.infor[i].title);
        formData.append("transportation[" + idx + "][unit_price]", dataTransport.infor[i].actual_cost.unit_price);
        formData.append("transportation[" + idx + "][unit_price_currency_id]", dataTransport.infor[i].actual_cost.unit_price_currency_id);
        formData.append("transportation[" + idx + "][day_times]", dataTransport.infor[i].actual_cost.day_times);
        formData.append("transportation[" + idx + "][accept_currency_id]", dataTransport.infor[i].actual_cost.accept_currency_id);
        formData.append("transportation[" + idx + "][fx_rate]", dataTransport.infor[i].actual_cost.fx_rate);
        formData.append("transportation[" + idx + "][date]", Moment(dataTransport.infor[i].date_in).format('YYYY-MM-DD'));
        formData.append("transportation[" + idx + "][arrange_by_admin]", dataTransport.infor[i].arrange_by_admin);
        formData.append("transportation[" + idx + "][description]", isEmpty(dataTransport.infor[i].description) ? "" : dataTransport.infor[i].description);
        formData.append("transportation[" + idx + "][reason]", isEmpty(dataTransport.infor[i].reason) ? "" : dataTransport.infor[i].reason);
        if (isEmpty(dataTransport.infor[i].attach_file) == false) {
          for (let j = 0; j < dataTransport.infor[i].attach_file.length; j++) {
            formData.append("transportation[" + idx + "][attach_file][" + j + "][id]", isEmpty(dataTransport.infor[i].attach_file[j]?.id) ?
              "" : dataTransport.infor[i].attach_file[j]?.id);
            formData.append("transportation[" + idx + "][attach_file][" + j + "][file]", isEmpty(dataTransport.infor[i].attach_file[j]?.file) ?
              "" : dataTransport.infor[i].attach_file[j]?.file);
          }
        }
        idx++;
      }
    }
    idx = 0;
    for (let i = 0; i < dataAllwance.infor.length; i++) {
      if (dataAllwance.infor[i].flag != 1) {
        formData.append("daily_allowance[" + idx + "][id]", isEmpty(dataAllwance.infor[i].id) ? "" : dataAllwance.infor[i].id);
        formData.append("daily_allowance[" + idx + "][is_new]", isEmpty(dataAllwance.infor[i].is_new) ? "" : dataAllwance.infor[i].is_new);
        formData.append("daily_allowance[" + idx + "][sub_allowance_id]", dataAllwance.infor[i].sub_allowance_id);
        formData.append("daily_allowance[" + idx + "][date]", Moment(dataAllwance.infor[i].date_in).format('YYYY-MM-DD'));
        formData.append("daily_allowance[" + idx + "][description]", isEmpty(dataAllwance.infor[i].description) ? "" : dataAllwance.infor[i].description);
        formData.append("daily_allowance[" + idx + "][reason]", isEmpty(dataAllwance.infor[i].reason) ? "" : dataAllwance.infor[i].reason);
        if (isEmpty(dataAllwance.infor[i].attach_file) == false) {
          for (let j = 0; j < dataAllwance.infor[i].attach_file.length; j++) {
            formData.append("daily_allowance[" + idx + "][attach_file][" + j + "][id]", isEmpty(dataAllwance.infor[i].attach_file[j]?.id) ?
              "" : dataAllwance.infor[i].attach_file[j]?.id);
            formData.append("daily_allowance[" + idx + "][attach_file][" + j + "][file]", isEmpty(dataAllwance.infor[i].attach_file[j]?.file) ?
              "" : dataAllwance.infor[i].attach_file[j]?.file);
          }
        }
        idx++;
      }
    }
    idx = 0;
    for (let i = 0; i < dataOther.infor.length; i++) {
      if (dataOther.infor[i].flag != 1) {
        formData.append("other[" + idx + "][id]", isEmpty(dataOther.infor[i].id) ? "" : dataOther.infor[i].id);
        formData.append("other[" + idx + "][is_new]", isEmpty(dataOther.infor[i].is_new) ? "" : dataOther.infor[i].is_new);
        formData.append("other[" + idx + "][title]", (dataOther.infor[i].flag == 0 && dataOther.infor[i].arrange_by_admin == 1) ?
          dataOther.infor[i].title.slice(0, -19) : dataOther.infor[i].title);
        formData.append("other[" + idx + "][unit_price]", dataOther.infor[i].actual_cost.unit_price);
        formData.append("other[" + idx + "][unit_price_currency_id]", dataOther.infor[i].actual_cost.unit_price_currency_id);
        formData.append("other[" + idx + "][day_times]", dataOther.infor[i].actual_cost.day_times);
        formData.append("other[" + idx + "][accept_currency_id]", dataOther.infor[i].actual_cost.accept_currency_id);
        formData.append("other[" + idx + "][fx_rate]", dataOther.infor[i].actual_cost.fx_rate);
        formData.append("other[" + idx + "][date]", Moment(dataOther.infor[i].date_in).format('YYYY-MM-DD'));
        formData.append("other[" + idx + "][arrange_by_admin]", dataOther.infor[i].arrange_by_admin);
        formData.append("other[" + idx + "][description]", isEmpty(dataOther.infor[i].description) ? "" : dataOther.infor[i].description);
        formData.append("other[" + idx + "][reason]", isEmpty(dataOther.infor[i].reason) ? "" : dataOther.infor[i].reason);
        if (isEmpty(dataOther.infor[i].attach_file) == false) {
          for (let j = 0; j < dataOther.infor[i].attach_file.length; j++) {
            formData.append("other[" + idx + "][attach_file][" + j + "][id]", isEmpty(dataOther.infor[i].attach_file[j]?.id) ?
              "" : dataOther.infor[i].attach_file[j]?.id);
            formData.append("other[" + idx + "][attach_file][" + j + "][file]", isEmpty(dataOther.infor[i].attach_file[j]?.file) ?
              "" : dataOther.infor[i].attach_file[j]?.file);
          }
        }
        idx++;
      }
    }
    if (isEmpty(multiFileOtherAttachement) == false) {
      for (let i = 0; i < multiFileOtherAttachement.length; i++) {
        formData.append("business_trip_other_attachment[" + i + "][id]", isEmpty(multiFileOtherAttachement[i]?.id) ?
          "" : multiFileOtherAttachement[i]?.id);
        formData.append("business_trip_other_attachment[" + i + "][file]", isEmpty(multiFileOtherAttachement[i]?.file) ?
          "" : multiFileOtherAttachement[i]?.file);
      }
    }
    approver.map((e, index) => {
      formData.append(`approver[${index}]`, e);
    })
    formData.append("language", apiPath.lang);

    let obj = {
      package_name: 'hr',
      url: approverFlag === 4 ? apiPath.businessTripAdjustmentRequestUpdate : apiPath.businessTripAdjustmentRequestSave,
      method: 'post',
      params: formData,
      headers: { "Content-Type": "multipart/form-data" }
    };
    setLoading(true);
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      setSuccess([response.data.message]);
      setTimeout(function () {
        editIndex(editData, false);
      }, 2500);
    }
  }

  /**
   * handle file Business Trip Other Attachement
  */
  const handleFileOtherAttachement = (e) => {
    let arrMsg = [];
    let mutilFile = []
    for (let file of e.target.files) {
      if (validateUploadFile(file) == true) {
        mutilFile.push(file);
      } else
        arrMsg.push(validateUploadFile(file));
    }

    let attachFile = mutilFile?.map((ele) => ({
      id: "",
      business_trip_document_name: ele.name,
      file: ele
    }));

    if (mutilFile.length > 0)
      setMultiFileOtherAttachement([...multiFileOtherAttachement, ...attachFile]);
    if (arrMsg.length > 0) {
      setError(arrMsg);
    }
  }

  /**
   * remove file Business Trip Other Attachement
  */
  let removeFileOtherAttachement = (index) => {
    multiFileOtherAttachement.splice(index, 1)
    setMultiFileOtherAttachement([...multiFileOtherAttachement]);
  }

  /**
   * remove row in table
   * 
   * @param data 
   * @param setData 
   * @param obj 
   * @param index 
   * @param updateTable 
   * @returns flag = 0 => new row. flag = 1 => row deleted
   */
  let btnRemoveRowTable = (data, setData, obj, index, block) => {
    if (obj.flag == 0 || obj.budget_cost == null) {
      data.infor.splice(index, 1);
      setData({ ...data, infor: data.infor });
      switch (block) {
        case "Other":
          updateTable({ ...data, infor: data.infor }, subTotalOther, setSubTotalOther);
          break;
        case "AirTicket":
          updateTable({ ...data, infor: data.infor }, subTotalAirTicket, setSubTotalAirTicket);
          break;
        case "Transportation":
          updateTable({ ...data, infor: data.infor }, subTotalTransport, setSubTotalTransport);
          break;
        case "Accommodation":
          updateTable({ ...data, infor: data.infor }, subTotalAccom, setSubTotalAccom);
          break;
        default:
          break;
      }
    }
    else {
      let cursorData = data.infor.map(ele => ele.id == obj.id ? { ...ele, flag: 1, date_in: null, date_out: null } : ele);
      setData({ ...data, infor: cursorData });
      switch (block) {
        case "Other":
          updateTable({ ...data, infor: cursorData }, subTotalOther, setSubTotalOther);
          break;
        case "AirTicket":
          updateTable({ ...data, infor: cursorData }, subTotalAirTicket, setSubTotalAirTicket);
          break;
        case "Transportation":
          updateTable({ ...data, infor: cursorData }, subTotalTransport, setSubTotalTransport);
          break;
        case "Accommodation":
          updateTable({ ...data, infor: cursorData }, subTotalAccom, setSubTotalAccom);
          break;
        default:
          break;
      }
    }
  }
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
    }
  }
  /**
   * Hidden or Show FX Rate
   * @param {*} e : event
   * @param {*} acceptCurrency 
   * @param {*} unitCurrency 
   * @param {*} setFlag 
   * @param {*} setTotalAmount 
   * @param {*} setUnitCurrency 
   * @param {*} setAcceptCurrency 
   * @param {*} totalState 
   * @param {*} fxRateState
   * @returns flase: show fxRate, true: hidden fxRate 
   */
  let handleChangeCurrency = (e, acceptCurrency, unitCurrency, setFlagHidden, setAcceptAmount, setUnitCurrency, setAcceptCurrency, totalState, fxRateState) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name == "unit") {
      if (value == acceptCurrency) {
        setFlagHidden(true);
        setAcceptAmount(totalState * 1);
      }
      else {
        setFlagHidden(false);
        setAcceptAmount(totalState * fxRateState);
      }
      setUnitCurrency(value);
    }
    else {
      if (value == unitCurrency) {
        setFlagHidden(true);
        setAcceptAmount(totalState * 1);
      }
      else {
        setFlagHidden(false);
        setAcceptAmount(totalState * fxRateState);
      }
      setAcceptCurrency(value);
    }
  }
  /**
   * Validate form before add to table
   * @returns false => add to table
   */
  const validateForm = (titleState, unitPriceState, timesState, acceptCurrency, unitCurrency, fxRateState, checkInState, checkOutState, block) => {
    let erro = [];
    if (isEmpty(titleState)) {
      erro.push(t('JSE124').replace('%s', t('Title') + " " + block));
    }
    if (isEmpty(unitPriceState)) {
      erro.push(t('JSE124').replace('%s', t('Unit Price') + " " + block));
    }
    if (parseFloat(unitPriceState) == 0) {
      erro.push(t('JSE10043').replace('%s', t('Unit Price') + " " + block));
    }
    if (isEmpty(timesState)) {
      erro.push(t('JSE124').replace('%s', t('Days/Times') + " " + block));
    }
    if (parseFloat(timesState) == 0) {
      erro.push(t('JSE10043').replace('%s', t('Days/Times') + " " + block));
    }

    if (acceptCurrency != unitCurrency) {
      if (isEmpty(fxRateState)) {
        erro.push(t('JSE124').replace('%s', t('FX Rate') + " " + block));
      }
    }
    if (block !== "Accommodation") {
      if (isEmpty(checkInState)) {
        erro.push(t('JSE124').replace('%s', t('Date') + " " + block));
      }
    }
    else {
      if (isEmpty(checkInState)) {
        erro.push(t('JSE124').replace('%s', t('Check In') + " " + block));
      }
      if (isEmpty(checkOutState)) {
        erro.push(t('JSE124').replace('%s', t('Check Out') + " " + block));
      }
      if (!isEmpty(checkInState) && !isEmpty(checkOutState) && checkInState > checkOutState) {
        let errMsg = t('JSE007').replace('%s', t('Check Out') + " " + block).replace('%s', t('Check In') + " " + block);
        erro.push(errMsg);
      }
    }
    if (!isEmpty(erro)) {
      setError([...erro]);
      setSuccess('');
      return true;
    }
    return false;
  }
  let resetForm = (block) => {
    switch (block) {
      case "Other":
        setTitleOtherState("");
        setUnitPriceOtherState("");
        setUnitCurrencyOther(1);
        setTimesOtherState("");
        setTotalOtherState("");
        setAcceptCurrencyOther(1);
        setFxRateOtherState(1);
        setAcceptAmountOtherState("");
        setCheckInOtherState(null);
        setDescriptionOtherState("");
        setCheckerOtherState(false);
        setMultiFileOther([]);
        setFlagHiddenOther(true);
        break;
      case "AirTicket":
        setTitleAirTicketState("");
        setUnitPriceAirTicketState("");
        setUnitCurrencyAirTicket(1);
        setTimesAirTicketState("");
        setTotalAirTicketState("");
        setAcceptCurrencyAirTicket(1);
        setFxRateAirTicketState(1);
        setAcceptAmountAirTicketState("");
        setCheckInAirTicketState(null);
        setDescriptionAirTicketState("");
        setCheckerAirTicketState(false);
        setMultiFileAirTicket([]);
        setFlagHiddenAirTicket(true);
        break;
      case "Transportation":
        setTitleTransportState("");
        setUnitPriceTransportState("");
        setUnitCurrencyTransport(1);
        setTimesTransportState("");
        setTotalTransportState("");
        setAcceptCurrencyTransport(1);
        setFxRateTransportState(1);
        setAcceptAmountTransportState("");
        setCheckInTransportState(null);
        setDescriptionTransportState("");
        setCheckerTransportState(false);
        setMultiFileTransport([]);
        setFlagHiddenTransport(true);
        break;
      case "Accommodation":
        setTitleAccomState("");
        setUnitPriceAccomState("");
        setUnitCurrencyAccom(1);
        setTimesAccomState("");
        setTotalAccomState("");
        setAcceptCurrencyAccom(1);
        setFxRateAccomState(1);
        setAcceptAmountAccomState("");
        setCheckInAccomState(null);
        setCheckOutAccomState(null);
        setDescriptionAccomState("");
        setCheckerAccomState(false);
        setMultiFileAccom([]);
        setFlagHiddenAccom(true);
        break;
      default:
        break;
    }
  }
  /**
   * remove file item
   * @param {*} listFile 
   * @param {*} setListFile 
   * @param {*} index 
   */
  let removeFile = (listFile, setListFile, index) => {
    listFile.splice(index, 1)
    setListFile([...listFile]);
  }
  /**
   * update subtotal after any change
   * @param {*} data data of block change
   * @param {*} subTotalActual 
   * @param {*} setSubTotalActual 
   */
  let updateTable = (data, subTotalActual, setSubTotalActual) => {
    setFlagAdmin(true);
    let subTotal = [...subTotalActual];
    let curData = { ...data };
    let dataTemp = curData.infor.reduce((prev, cur) => {
      if (cur.flag != 1) {
        const { accept_currency_id, cost } = cur.actual_cost;
        const currency_id = accept_currency_id;
        const sub_total = parseFloat(cost);
        const index = prev.findIndex((item) => item.currency_id === currency_id);
        if (index >= 0) {
          prev[index].sub_total += parseFloat(sub_total);
        } else {
          prev.push({
            currency_id,
            sub_total,
          });
        }
      }
      return prev;
    }, []);
    allCurrency.map((item, index) => {
      subTotal[index] = { currency_id: item.id, sub_total: 0 };
    });
    subTotal.map(item => {
      let obj = dataTemp.find(ele => ele.currency_id === item.currency_id);
      if (obj && item.currency_id === obj.currency_id)
        item.sub_total = obj.sub_total
    });
    setSubTotalActual(subTotal);
  }

  /**
   * 
   * @param {*} titleState 
   * @param {*} unitPriceState 
   * @param {*} timesState 
   * @param {*} acceptCurrency 
   * @param {*} unitCurrency 
   * @param {*} fxRateState 
   * @param {*} checkInState 
   * @param {*} checkOutState 
   * @param {*} multiFile 
   * @param {*} checkerState 
   * @param {*} descriptionState 
   * @param {*} setData 
   * @param {*} data : data for component
   * @param {*} block : Component is affected
   * @returns 
   */
  let btnAddRow = (titleState, unitPriceState, timesState, acceptCurrency, unitCurrency, fxRateState, checkInState, checkOutState, multiFile, checkerState, descriptionState, setData, data, block) => {
    if (validateForm(titleState, unitPriceState, timesState, acceptCurrency, unitCurrency, fxRateState, checkInState, checkOutState, block)) return;
    let total = parseFloat(unitPriceState) * parseFloat(timesState) * parseFloat(unitCurrency === acceptCurrency ? 1 : fxRateState);
    let attachFile = multiFile?.map((ele) => ({
      id: "",
      business_trip_detail_document_name: ele.name,
      file: ele
    }));
    let cursorData = {
      date_in: Moment(checkInState).format('YYYY-MM-DD'),
      date_out: checkOutState && Moment(checkOutState).format('YYYY-MM-DD'),
      title: `${titleState} ${checkerState === true ? "[Arrange by Admin]" : ""}`,
      attach_file: attachFile,
      description: descriptionState,
      arrange_by_admin: checkerState === true ? 1 : 0,
      budget_cost: {
        unit_price: null,
        unit_price_currency_id: null,
        day_times: null,
        accept_currency_id: null,
        fx_rate: null,
        cost: null,
      },
      actual_cost: {
        unit_price: parseFloat(unitPriceState),
        unit_price_currency_id: Number(unitCurrency),
        day_times: Number(timesState),
        accept_currency_id: Number(acceptCurrency),
        fx_rate: parseFloat(unitCurrency == acceptCurrency ? 1 : fxRateState),
        cost: parseFloat(total),
      },
      flag: 0,
    }
    setData({ ...data, infor: [...data.infor, cursorData] });
    resetForm(block);
    switch (block) {
      case "Other":
        updateTable({ ...data, infor: [...data.infor, cursorData] }, subTotalOther, setSubTotalOther);
        break;
      case "AirTicket":
        updateTable({ ...data, infor: [...data.infor, cursorData] }, subTotalAirTicket, setSubTotalAirTicket);
        break;
      case "Transportation":
        updateTable({ ...data, infor: [...data.infor, cursorData] }, subTotalTransport, setSubTotalTransport);
        break;
      case "Accommodation":
        updateTable({ ...data, infor: [...data.infor, cursorData] }, subTotalAccom, setSubTotalAccom);
        break;
      default:
        break;
    }
    setError([]);
    setSuccess('');
  }

  /** End allowance */

  let handleChangeChecker = (checkerState, setCheckerState
  ) => {
    setCheckerState(!checkerState);
  }
  let handleChangeTitle = (e, setTitleState) => {
    let data = e.target.value;
    setTitleState(data);
  }
  let handleChangePrice = (e, timesState, setUnitPriceState, setTotalState, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState) => {
    let data = e.target.value;
    if (isDecimalPrice(data)) {
      setUnitPriceState(data);
      let total = data * timesState
      setUnitPriceState(data);
      setTotalState(total);
      setAmount(total, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState);
    }
  }
  let handleChangeTimes = (e, unitPriceState, setTimesState, setTotalState, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState) => {
    let data = e.target.value;
    if (validateNumberOnly(data) || data === "") {
      let total = data * unitPriceState
      setTimesState(data);
      setTotalState(total);
      setAmount(total, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState);
    }
  }
  let handleChangeFxRate = (e, setFxRateState, setAcceptAmountState, totalState) => {
    let regex = /^\d{1,12}(\.\d{0,6})?$/;
    let data = e.target.value;
    if (regex.test(data) || data === "") {
      setFxRateState(data);
      setAcceptAmountState(totalState * data);
    }
  }
  let setAmount = (total, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState) => {
    if (unitCurrency != acceptCurrency)
      setAcceptAmountState(total * fxRateState);
    else setAcceptAmountState(total);
  }
  let handleChangeInDate = (e, setCheckInState) => {
    setCheckInState(e);
  }
  let handleChangeOutDate = (e, setCheckOutState) => {
    setCheckOutState(e);
  }
  let handleChangeDescription = (e, setDescriptionState) => {
    let data = e.target.value;
    setDescriptionState(data);
  }

  let onchangeInput = (row, e, data, setData, block) => {
    let id = row?.id;
    let value = e?.target.value;
    let name = e?.target.name;

    let regex = /^\d{1,12}(\.\d{0,6})?$/;
    let dataTemp;

    switch (name) {
      case "Unit Price":
        if (isDecimalPrice(value) || value === "") {
          value = e.target.value
        }
        else return;
        dataTemp = data.infor.map(ele =>
          ele.id == id ? {
            ...ele, actual_cost: {
              unit_price: value,
              day_times: Number(ele.actual_cost.day_times),
              unit_price_currency_id: Number(ele.actual_cost.unit_price_currency_id),
              fx_rate: Number(ele.actual_cost.fx_rate),
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: parseFloat(value * ele.actual_cost.day_times * ele.actual_cost.fx_rate),
            }
          } : ele
        )
        break;
      case "Qty":
        if (validateNumberOnly(value) || value === "") {
          value = e.target.value
        }
        else return;
        dataTemp = data.infor.map(ele =>
          ele.id == id ? {
            ...ele, actual_cost: {
              unit_price: Number(ele.actual_cost.unit_price),
              day_times: value,
              unit_price_currency_id: Number(ele.actual_cost.unit_price_currency_id),
              fx_rate: Number(ele.actual_cost.fx_rate),
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: parseFloat(ele.actual_cost.unit_price * value * ele.actual_cost.fx_rate),
            }
          } : ele
        )
        break;
      default:
        if (regex.test(value) || value === "") {
          value = e.target.value
        }
        else return;
        dataTemp = data.infor.map(ele =>
          ele.id == id ? {
            ...ele, actual_cost: {
              unit_price: Number(ele.actual_cost.unit_price),
              day_times: Number(ele.actual_cost.day_times),
              unit_price_currency_id: Number(ele.actual_cost.unit_price_currency_id),
              fx_rate: value,
              accept_currency_id: Number(ele.actual_cost.accept_currency_id),
              cost: parseFloat(ele.actual_cost.unit_price * ele.actual_cost.day_times * value),
            },

          } : ele
        )
        break;
    }
    setData({ ...data, infor: dataTemp });
    switch (block) {
      case "Other":
        updateTable({ ...data, infor: dataTemp }, subTotalOther, setSubTotalOther);
        break;
      case "AirTicket":
        updateTable({ ...data, infor: dataTemp }, subTotalAirTicket, setSubTotalAirTicket);
        break;
      case "Transportation":
        updateTable({ ...data, infor: dataTemp }, subTotalTransport, setSubTotalTransport);
        break;
      case "Accommodation":
        updateTable({ ...data, infor: dataTemp }, subTotalAccom, setSubTotalAccom);
        break;
      default:
        break;
    }
  }
  let btnRemoveFileInTable = (positionData, positionFile, data, setData, block) => {
    let currenData = data.infor;
    currenData.map((ele, index) =>
      index === positionData ? ele.attach_file.splice(positionFile, 1) : ele
    )
    setData({ ...data, infor: currenData });
    switch (block) {
      case "Other":
        updateTable({ ...data, infor: currenData }, subTotalOther, setSubTotalOther);
        break;
      case "AirTicket":
        updateTable({ ...data, infor: currenData }, subTotalAirTicket, setSubTotalAirTicket);
        break;
      case "Transportation":
        updateTable({ ...data, infor: currenData }, subTotalTransport, setSubTotalTransport);
        break;
      case "Accommodation":
        updateTable({ ...data, infor: currenData }, subTotalAccom, setSubTotalAccom);
        break;
      default:
        break;
    }
  }
  let handleChangeDateInTable = (value, obj, data, setData) => {
    let dataTemp;
    dataTemp = data.infor.map(ele =>
      ele.id == obj.id ? { ...ele, date_in: Moment(value).format("YYYY-MM-DD") } : ele
    )
    setData({ ...data, infor: dataTemp });
  }
  let handleChangeDateOutTable = (value, obj, data, setData) => {
    let dataTemp;
    dataTemp = data.infor.map(ele =>
      ele.id == obj.id ? { ...ele, date_out: Moment(value).format("YYYY-MM-DD") } : ele
    )
    setData({ ...data, infor: dataTemp });
  }
  let onchangePriceDropdown = (e, data, setData) => {
    let dataTemp;
    let value = e.target.value;
    let id = e.target.name;
    dataTemp = data.infor.map(ele =>
      ele.id == id ? {
        ...ele, actual_cost: {
          unit_price: parseFloat(ele.actual_cost.unit_price),
          unit_price_currency_id: Number(value),
          day_times: parseFloat(ele.actual_cost.day_times),
          accept_currency_id: Number(ele.actual_cost.accept_currency_id),
          fx_rate: value == ele.actual_cost.accept_currency_id ? 1 : parseFloat(ele.actual_cost.fx_rate),
          cost: parseFloat(ele.actual_cost.unit_price * ele.actual_cost.day_times * (value == ele.actual_cost.accept_currency_id || 1)),
        }
      } : ele
    )
    setData({ ...data, infor: dataTemp });
  }

  let onchangeAcceptDropdown = (e, data, setData, block) => {
    let value = e.target.value;
    let id = e.target.name;
    let dataTemp = data.infor.map(ele =>
      ele.id == id ? {
        ...ele, actual_cost: {
          unit_price: parseFloat(ele.actual_cost.unit_price),
          unit_price_currency_id: Number(ele.actual_cost.unit_price_currency_id),
          day_times: parseFloat(ele.actual_cost.day_times),
          accept_currency_id: Number(value),
          fx_rate: value == ele.actual_cost.unit_price_currency_id ? 1 : parseFloat(ele.actual_cost.fx_rate),
          cost: parseFloat(ele.actual_cost.unit_price * ele.actual_cost.day_times * (value == ele.actual_cost.unit_price_currency_id || 1)),
        }
      } : ele
    )
    setData({ ...data, infor: dataTemp });
    switch (block) {
      case "Other":
        updateTable({ ...data, infor: dataTemp }, subTotalOther, setSubTotalOther);
        break;
      case "AirTicket":
        updateTable({ ...data, infor: dataTemp }, subTotalAirTicket, setSubTotalAirTicket);
        break;
      case "Transportation":
        updateTable({ ...data, infor: dataTemp }, subTotalTransport, setSubTotalTransport);
        break;
      case "Accommodation":
        updateTable({ ...data, infor: dataTemp }, subTotalAccom, setSubTotalAccom);
        break;
      default:
        break;
    }
  }
  /* function for Other end */

  /* Add Approver Start */
  const addApprover = () => {
    document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
    let errMsgAll = [];
    if (checkBoxIdList.length === 0) {
      const errorMsg = t('JSE056').replace('%s', t('Approver'));
      errMsgAll.push(errorMsg);
      document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      if (!mainTable.some(value => checkBoxIdList.includes(value.employee_id))) {
        mainTableModal.map(value => {
          if (checkBoxIdList.includes(value.employee_id)) {
            setMainTable(mainTable => [...mainTable, value]);
          }
        })
      }
      else {
        mainTable.map(value => {
          if (checkBoxIdList.includes(value.employee_id)) {
            const errorMsg = t('JSE140').replace('%s', value.employee_id);
            errMsgAll.push(errorMsg);
            document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
          }
        })
      }
    }
    if (errMsgAll.length > 0) {
      setPopupError(errMsgAll);
      document.querySelector('.modal-header').scrollIntoView({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      closeApproverModal();
    }
  }
  /* Add Approver End */

  /* Delete Approver Start */
  const deleteApprover = (e) => {
    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.employee_id != e["employee_id"]);
    setMainTable(result_data);
  }
  /* Delete Approver End */

  /* Approver Modal Box Start */
  const openApproverModal = () => {
    setApproverModalBox(!approverModalBox);
    document.body.style.overflow = 'hidden';
  }

  const closeApproverModal = () => {
    setApproverModalBox(!approverModalBox);
    setCheckBoxIdList([]);
    setMainTableModal([]);
    setAllCheck(false);
    setPopupError([]);
    document.body.style.overflow = 'visible';
  }
  /* Approver Modal Box End */

  /* init form load Business Trip Adjustment Request */
  let editIndex = async (edit_id, msg = false) => {
    //setLoading(true);
    let obj = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentRequest + edit_id + "?language=" + apiPath.lang + "&company_id=" + apiPath.companyID + "&login_id=" + apiPath.loginEmp,
      method: 'get'
    };
    let response = await ApiRequest(obj);

    if (response.flag === false) {
      setSuccess("");
      setError(response.message);
      setTimeout(function () {
        history.push("./business-trip-list");
      }, 2500);
    } else {
      let data = response.data.data;

      setAdvanceFlag(data['advance_flag']);
      setadvanceAdditional(data['businesstrip_advance_additional']);
      setSubTotalOther(data.orther_list.actual_cost);
      setSubTotalAirTicket(data.air_ticket_list.actual_cost);
      setSubTotalTransport(data.transporation_list.actual_cost);
      setSubTotalAccom(data.accomodation_list.actual_cost);
      setDataOther(data.orther_list);
      setDataAirTicket(data.air_ticket_list);
      setDataTransport(data.transporation_list);
      setDataAccom(data.accomodation_list);
      setBusinessTripID(data.business_trip_id);
      setExpenseDepartment(data['expense_department_name']);
      setApproverFlag(data['approve_flag']);
      setEmpId(data['employee_id']);
      setEmpName(data['employee_name']);
      setEmpCode(data['employee_code']);
      setExchangeRate(data['exchange_rate']);
      setDestination(data['destination']);
      setPurpose(data['purpose']);
      setTripType(data['trip_type'] == 1 ? "Domestic" : "Oversea");
      let date_period_from = new Date(data['trip_period_from_date']);
      let date_period_to = new Date(data['trip_period_to_date']);
      setPeriodFrom(date_period_from);
      setPeriodTo(date_period_to);
      setRequestedDate(Moment(new Date()).format('YYYY-MM-DD'));
      setDueDate(Moment(new Date()).format('YYYY-MM-DD'));
      setDepartment(data.employee_has_dept_position[0].departments.department_name);
      setPosition(data.employee_has_dept_position[0].positions.position_name);
      setRank(data.employee_has_dept_position);
      setDataAllwance(data.daily_allowance_list);
      setSubTotalAllwance(data.daily_allowance_list.actual_cost);
      setBudgetTotal(data.estimated_budget_total_amount);
      setActualTotal(data.actual_budget_total_amount);
      setTripAdvance(data.business_trip_advance);
      setMainTable(response.data.data.business_trip_approver);
      setMultiFileOtherAttachement(response.data.data.business_trip_attach);
      loadApprover(data['employee_id']);
      setApproverSetting(data['approver_setting'])
      setError([]);
      msg && setSuccess("");
    }
    setLoading(false);
  }

  /* Search Approver API Start */
  const searchApproverAPI = async () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (validateSearch()) {
      typingTimeoutRef.current = setTimeout(async () => {
        setLoading(true)
        let params = {
          company_id: apiPath.companyID,
          employee_id: empId,
          language: apiPath.lang,
          position_id: positionState,
          department_id: departmentState
        }
        let obj = { package_name: 'hr', url: apiPath.businessTripAdjustmentRequestSearchApprover, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setError([]);
          setMainTableModal([]);
          openApproverModal();
        }
        else {
          setRowCount(t('Total Rows').replace('%s', response.data.row_count));
          let AproversList = [];
          response.data.data.map(e => {
            let aproverValue = {};
            aproverValue.employee_id = e.employee_id;
            aproverValue.employee_code = e.code;
            aproverValue.approver_or_checker = e.approver_or_checker;
            aproverValue.employee_name = e.name_eng;
            aproverValue.email = e.email;
            aproverValue.employee_has_dept_position = e.employee_has_dept_position;
            AproversList.push(aproverValue);
          })
          setMainTableModal(AproversList);
          setError([]);
          setSuccess("");
          openApproverModal();
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* Search Approver API End */

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

  let hanldeChangeReason = (e, row, data, setData) => {
    let value = e.target.value;
    let curData = data.infor.map(ele =>
      ele.id == row.id ? { ...ele, reason: value } : ele
    );
    setData({ ...data, infor: curData });
  }

  return (
    <CRow className="business-trip-adjustment-request modal-header-custom">
      <CCol>
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} saveOK={saveOK}
        />
        <CCard className="">
          <CCardHeader>
            <h5 id='lblBusinessTripAdjustmentRequest'>{t('Business Trip Adjustment Request')}</h5>
          </CCardHeader>
          <CCardBody>
            <BusinessTripAdjustmentRequestInit
              expenseDepartmentAPI={expenseDepartmentAPI}
              department={department}
              empId={empId}
              empCode={empCode}
              empName={empName}
              position={position}
              exchangeRate={exchangeRate}
              destination={destination}
              tripType={tripType}
              purpose={purpose}
              dueDate={dueDate}
              requestedDate={requestedDate}
              periodFrom={periodFrom}
              periodTo={periodTo}
              expenseDepartment={expenseDepartment}
              exchangeRateChange={exchangeRateChange}
              destinationChange={destinationChange}
              purposeChange={purposeChange}
              handleFromDateChange={handleFromDateChange}
              handleToDateChange={handleToDateChange}
              handleDueDate={handleDueDate}
              removeFromDate={removeFromDate}
              removeToDate={removeToDate}
              removeDueDate={removeDueDate}
            />
            <AirTicketBusinessTripAdjustment
              allCurrency={allCurrency}
              data={dataAirTicket} setData={setDataAirTicket}
              subTotal={subTotalAirTicket}
              totalState={totalAirTicketState} setTotalState={setTotalAirTicketState}
              titleState={titleAirTicketState} setTitleState={setTitleAirTicketState}
              unitPriceState={unitPriceAirTicketState} setUnitPriceState={setUnitPriceAirTicketState}
              unitCurrency={unitCurrencyAirTicket} setUnitCurrency={setUnitCurrencyAirTicket}
              timesState={timesAirTicketState} setTimesState={setTimesAirTicketState}
              acceptCurrency={acceptCurrencyAirTicket} setAcceptCurrency={setAcceptCurrencyAirTicket}
              fxRateState={fxRateAirTicketState} setFxRateState={setFxRateAirTicketState}
              acceptAmountState={acceptAmountAirTicketState} setAcceptAmountState={setAcceptAmountAirTicketState}
              checkInState={checkInAirTicketState} setCheckInState={setCheckInAirTicketState}
              descriptionState={descriptionAirTicketState} setDescriptionState={setDescriptionAirTicketState}
              checkerState={checkerAirTicketState} setCheckerState={setCheckerAirTicketState}
              multiFile={multiFileAirTicket} setMultiFile={setMultiFileAirTicket}
              flagHidden={flagHiddenAirTicket} setFlagHidden={setFlagHiddenAirTicket}
              btnRemoveRowTable={btnRemoveRowTable}
              handleImportFile={handleImportFile}
              handleChangeCurrency={handleChangeCurrency}
              removeFile={removeFile}
              handleChangeTitle={handleChangeTitle}
              handleChangePrice={handleChangePrice}
              handleChangeTimes={handleChangeTimes}
              handleChangeFxRate={handleChangeFxRate}
              handleChangeInDate={handleChangeInDate}
              handleChangeChecker={handleChangeChecker}
              handleChangeDescription={handleChangeDescription}
              btnAddRow={btnAddRow}
              onchangeInput={onchangeInput}
              btnRemoveFileInTable={btnRemoveFileInTable}
              handleChangeDateInTable={handleChangeDateInTable}
              onchangePriceDropdown={onchangePriceDropdown}
              onchangeAcceptDropdown={onchangeAcceptDropdown}
              removeDateInAirticket={removeDateInAirticket}
              hanldeChangeReason={hanldeChangeReason}
              inputFile={inputFile}
            />
            <AccommodationBusinessTripAdjustment
              allCurrency={allCurrency}
              data={dataAccom} setData={setDataAccom}
              subTotal={subTotalAccom}
              totalState={totalAccomState} setTotalState={setTotalAccomState}
              titleState={titleAccomState} setTitleState={setTitleAccomState}
              unitPriceState={unitPriceAccomState} setUnitPriceState={setUnitPriceAccomState}
              unitCurrency={unitCurrencyAccom} setUnitCurrency={setUnitCurrencyAccom}
              timesState={timesAccomState} setTimesState={setTimesAccomState}
              acceptCurrency={acceptCurrencyAccom} setAcceptCurrency={setAcceptCurrencyAccom}
              fxRateState={fxRateAccomState} setFxRateState={setFxRateAccomState}
              acceptAmountState={acceptAmountAccomState} setAcceptAmountState={setAcceptAmountAccomState}
              checkInState={checkInAccomState} setCheckInState={setCheckInAccomState}
              checkOutState={checkOutAccomState} setCheckOutState={setCheckOutAccomState}
              descriptionState={descriptionAccomState} setDescriptionState={setDescriptionAccomState}
              checkerState={checkerAccomState} setCheckerState={setCheckerAccomState}
              multiFile={multiFileAccom} setMultiFile={setMultiFileAccom}
              flagHidden={flagHiddenAccom} setFlagHidden={setFlagHiddenAccom}
              btnRemoveRowTable={btnRemoveRowTable}
              handleImportFile={handleImportFile}
              handleChangeCurrency={handleChangeCurrency}
              removeFile={removeFile}
              handleChangeTitle={handleChangeTitle}
              handleChangePrice={handleChangePrice}
              handleChangeTimes={handleChangeTimes}
              handleChangeFxRate={handleChangeFxRate}
              handleChangeInDate={handleChangeInDate}
              handleChangeOutDate={handleChangeOutDate}
              handleChangeChecker={handleChangeChecker}
              handleChangeDescription={handleChangeDescription}
              btnAddRow={btnAddRow}
              onchangeInput={onchangeInput}
              btnRemoveFileInTable={btnRemoveFileInTable}
              handleChangeDateInTable={handleChangeDateInTable}
              handleChangeDateOutTable={handleChangeDateOutTable}
              onchangePriceDropdown={onchangePriceDropdown}
              onchangeAcceptDropdown={onchangeAcceptDropdown}
              removeDateInAccom={removeDateInAccom}
              removeDateOutAccom={removeDateOutAccom}
              hanldeChangeReason={hanldeChangeReason}
              onUploadPress={onUploadPress}
              refUpload={refUpload}
            />
            <TransportationBusinessTripAdjustment
              allCurrency={allCurrency}
              data={dataTransport} setData={setDataTransport}
              subTotal={subTotalTransport}
              totalState={totalTransportState} setTotalState={setTotalTransportState}
              titleState={titleTransportState} setTitleState={setTitleTransportState}
              unitPriceState={unitPriceTransportState} setUnitPriceState={setUnitPriceTransportState}
              unitCurrency={unitCurrencyTransport} setUnitCurrency={setUnitCurrencyTransport}
              timesState={timesTransportState} setTimesState={setTimesTransportState}
              acceptCurrency={acceptCurrencyTransport} setAcceptCurrency={setAcceptCurrencyTransport}
              fxRateState={fxRateTransportState} setFxRateState={setFxRateTransportState}
              acceptAmountState={acceptAmountTransportState} setAcceptAmountState={setAcceptAmountTransportState}
              checkInState={checkInTransportState} setCheckInState={setCheckInTransportState}
              descriptionState={descriptionTransportState} setDescriptionState={setDescriptionTransportState}
              checkerState={checkerTransportState} setCheckerState={setCheckerTransportState}
              multiFile={multiFileTransport} setMultiFile={setMultiFileTransport}
              flagHidden={flagHiddenTransport} setFlagHidden={setFlagHiddenTransport}
              btnRemoveRowTable={btnRemoveRowTable}
              handleImportFile={handleImportFile}
              handleChangeCurrency={handleChangeCurrency}
              removeFile={removeFile}
              handleChangeTitle={handleChangeTitle}
              handleChangePrice={handleChangePrice}
              handleChangeTimes={handleChangeTimes}
              handleChangeFxRate={handleChangeFxRate}
              handleChangeInDate={handleChangeInDate}
              handleChangeChecker={handleChangeChecker}
              handleChangeDescription={handleChangeDescription}
              btnAddRow={btnAddRow}
              onchangeInput={onchangeInput}
              btnRemoveFileInTable={btnRemoveFileInTable}
              handleChangeDateInTable={handleChangeDateInTable}
              onchangePriceDropdown={onchangePriceDropdown}
              onchangeAcceptDropdown={onchangeAcceptDropdown}
              removeDateInTrans={removeDateInTrans}
              hanldeChangeReason={hanldeChangeReason}
              onUploadPress={onUploadPress}
              refUpload={refUpload}
            />
            <DailyAllowanceBusinessTripAdjustment
              onAllowanceTitleChange={onAllowanceTitleChange}
              allowanceState={allowanceState}
              allowanceAPI={allowanceAPI}
              allCurrency={allCurrency}
              handleDateAllowanceChange={handleDateAllowanceChange}
              removeDateAllowance={removeDateAllowance}
              dateAllowance={dateAllowance}
              currencyAllowance={currencyAllowance}
              unitPriceAllowance={unitPriceAllowance}
              dayTimeAllwance={dayTimeAllwance}
              dayTimeAllwanceChange={dayTimeAllwanceChange}
              totalAllwance={totalAllwance}
              dataAllwance={dataAllwance}
              setDataAllwance={setDataAllwance}
              handleImportFile={handleImportFile}
              onAllowanceTitleChangeTable={onAllowanceTitleChangeTable}
              btnRemoveFileInTableAllwance={btnRemoveFileInTableAllwance}
              handleChangeDateOutTableAllwance={handleChangeDateOutTableAllwance}
              handleChangeDescriptionAllwance={handleChangeDescriptionAllwance}
              descriptionAllwanceState={descriptionAllwanceState}
              btnAddRowAllwance={btnAddRowAllwance}
              subTotal={subTotalAllwance}
              btnRemoveRowTableAllwance={btnRemoveRowTableAllwance}
              removeFile={removeFile}
              multiFile={multiFileAllwance} setMultiFile={setMultiFileAllwance}
              numCurrencies={numCurrencies}
              hanldeChangeReason={hanldeChangeReason}
              onUploadPress={onUploadPress}
              refUpload={refUpload}
            />
            <OtherBusinessTripAdjustment
              allCurrency={allCurrency}
              data={dataOther} setData={setDataOther}
              subTotal={subTotalOther}
              totalState={totalOtherState} setTotalState={setTotalOtherState}
              titleState={titleOtherState} setTitleState={setTitleOtherState}
              unitPriceState={unitPriceOtherState} setUnitPriceState={setUnitPriceOtherState}
              unitCurrency={unitCurrencyOther} setUnitCurrency={setUnitCurrencyOther}
              timesState={timesOtherState} setTimesState={setTimesOtherState}
              acceptCurrency={acceptCurrencyOther} setAcceptCurrency={setAcceptCurrencyOther}
              fxRateState={fxRateOtherState} setFxRateState={setFxRateOtherState}
              acceptAmountState={acceptAmountOtherState} setAcceptAmountState={setAcceptAmountOtherState}
              checkInState={checkInOtherState} setCheckInState={setCheckInOtherState}
              descriptionState={descriptionOtherState} setDescriptionState={setDescriptionOtherState}
              checkerState={checkerOtherState} setCheckerState={setCheckerOtherState}
              multiFile={multiFileOther} setMultiFile={setMultiFileOther}
              flagHidden={flagHiddenOther} setFlagHidden={setFlagHiddenOther}
              btnRemoveRowTable={btnRemoveRowTable}
              handleImportFile={handleImportFile}
              handleChangeCurrency={handleChangeCurrency}
              removeFile={removeFile}
              handleChangeTitle={handleChangeTitle}
              handleChangePrice={handleChangePrice}
              handleChangeTimes={handleChangeTimes}
              handleChangeFxRate={handleChangeFxRate}
              handleChangeInDate={handleChangeInDate}
              handleChangeChecker={handleChangeChecker}
              handleChangeDescription={handleChangeDescription}
              btnAddRow={btnAddRow}
              onchangeInput={onchangeInput}
              btnRemoveFileInTable={btnRemoveFileInTable}
              handleChangeDateInTable={handleChangeDateInTable}
              onchangePriceDropdown={onchangePriceDropdown}
              onchangeAcceptDropdown={onchangeAcceptDropdown}
              removeDateInOther={removeDateInOther}
              hanldeChangeReason={hanldeChangeReason}
              onUploadPress={onUploadPress}
              refUpload={refUpload}
            />
            <AdjustmentBudget
              flagAdmin={flagAdmin}
              dataAccom={dataAccom}
              dataAllwance={dataAllwance}
              dataAirTicket={dataAirTicket}
              dataTransport={dataTransport}
              dataOther={dataOther}
              subTotalOther={subTotalOther}
              subTotalTransport={subTotalTransport}
              subTotalAirTicket={subTotalAirTicket}
              subTotalAccom={subTotalAccom}
              subTotalAllwance={subTotalAllwance}
              budgetTotal={budgetTotal}
              tripAdvance={tripAdvance}
              advanceFlag={advanceFlag}
              advanceAdditional={advanceAdditional}
              removeFileOtherAttachement={removeFileOtherAttachement}
              multiFileOtherAttachement={multiFileOtherAttachement}
              handleFileOtherAttachement={handleFileOtherAttachement}
              numCurrencies={numCurrencies}
              allCurrency={allCurrency}
              actualTotal={actualTotal}
              actualNoAdmin={actualNoAdmin}
              onUploadPress={onUploadPress}
              refUpload={refUpload}
            />
            <SeachApprover
              approverChange={approverChange}
              approverData={approverData}
              searchApproverAPI={searchApproverAPI}
              deleteApprover={deleteApprover}
              mainTable={mainTable}
              change_checkbox={change_checkbox}
              approverSetting={approverSetting}
              positionRank={positionRank}
            />
            <ApproverListConfirmation
              approverState={approverState}
              positionState={positionState}
              addToggleAlert={addToggleAlert}
              addModalBox={addModalBox}
              addOnClose={addOnClose}
              empId={empId}
              empCode={empCode}
              empName={empName}
              rowCount={rowCount}
              approverModalBox={approverModalBox}
              closeApproverModal={closeApproverModal}
              mainTableModal={mainTableModal}
              AllCheck={AllCheck}
              change_checkbox={change_checkbox}
              addApprover={addApprover}
              popupError={popupError}
              removeMessagePopup={removeMessagePopup}
            />
            <BusinessTripAdjustmentRequestSave
              requestData={requestData}
            />
            <Confirmation
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
export default function BusinessTripAdjustmentRequestIndex() { return (<Welcome />) }
