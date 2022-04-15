import React ,{ useState, useEffect, useCallback,useRef} from 'react';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CImg, CLabel} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import CommonBusinessTripRequest from "./CommonBusinessTripRequest";
import CategoryBusinessTripRequest from "./CategoryBusinessTripRequest";
import EstimatedBudgetBusinessTripRequest from "./EstimatedBudgetBusinessTripRequest";
import OtherAttachementBusinessTripRequest from "./OtherAttachementBusinessTripRequest";
import ButtonRequestBusinessTripRequest from "./ButtonRequestBusinessTripRequest";
import AllowanceBusinessTripRequest from "./AllowanceBusinessTripRequest";
import { checkNullOrBlankString,checkNullOrBlank } from "../../../hr/hr-common/common-validation/CommonValidation";
import SeachApprover from './SeachApprover';
import ApproverListConfirmation from './ApproverListConfirmation';
import Loading from "../../../brycen-common/loading/Loading";
// import Moment from 'moment';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import ViewPermision from "../../../brycen-common/constant/ViewPermission";

function LegacyWelcomeClass({ t}) {
  const [error, setError]                                                                   = useState([]);
  const [success, setSuccess]                                                               = useState([]);
  const [tripPeriodFromDate,setTripPeriodFromDate]                                          = useState(ChangeDate(new Date)); //for trip period from date
  const [tripPeriodToDate,setTripPeriodToDate]                                              = useState(ChangeDate(new Date)); //for trip period to date
  const [appliedDate,setAppliedDate]                                                        = useState(ChangeDate(new Date)); //for applied date
  const [dueDate,setDueDate]                                                                = useState(ChangeDate(new Date)); //for due date
  const [clearData, setClearData]                                                           = useState(''); //clear data in autocomplete
  const [idArr, setIdArr]                                                                   = useState([]); //for show array id
  const [nameArr, setNameArr]                                                               = useState([]); //for show array name
  const [codeArr, setCodeArr]                                                               = useState([]); //for show array code
  const [loading, setLoading]                                                               = useState(false); //for show loading
  const [employeeName, setEmployeeName]                                                     = useState(''); // for employee name
  const [employeeCode, setEmployeeCode]                                                     = useState(''); // for employee code
  const [employeeID, setEmployeeID]                                                         = useState(''); // for employee id

  const [permission, setPermission]                                                         = useState(ViewPermision.All) // for view permission
  const [destination,setDestination]                                                        = useState("");  // for destination
  const [purpose,setPurpose]                                                                = useState("");  // for purpose
  const [exchangeRate,setExchangeRate]                                                      = useState(""); // for exchangeRate
  const [currencyList,setCurrencyList]                                                      = useState([]); // for curencyList
  const [airTicketBusinessTripList,setAirTicketBusinessTripList]                            = useState([]); // for air ticket business trip
  const [accommodationBusinessTripList,setAccommodationBusinessTripList]                    = useState([]); // for Accommodation business trip
  const [transportationBusinessTripList,setTransportationBusinessTripList]                  = useState([]); // for Transportation business trip
  const [otherBusinessTripList,setOtherBusinessTripList]                                    = useState([]); // for Other business trip
  const [allowanceBusinessTripList,setAllowanceBusinessTripList]                            = useState([]); // for Allowance business trip
  const [allowanceList,setAllowanceList]                                                    = useState([]); // for Allowance list
  const [daysTimesAllowance, setDaysTimesAllowance]                                         = useState("");// set days/times for allowance
  const [otherFile, setOtherFile]                                                           = useState([]);// set other file
  const [expenseDepartmentID, setExpenseDepartmentID]                                       = useState(""); // for department id
  const [department, setDepartment]                                                         = useState(""); // for department
  const [expenseDepartmentList,setExpenseDepartmentList]                                    = useState([]);
  const [needAdvance, setNeedAdvance]                                                       = useState(0); // for advvance
  const [needAdvanceType, setNeedAdvanceType]                                               = useState(0); // for advvance
  const [airTicketTotal, setAirTicketTotal]                                                 = useState([]); // for air tiket total
  const [accommodationTotal, setAccommodationTotal]                                         = useState([]); // for accommodation total
  const [transportationTotal, setTransportationTotal]                                       = useState([]); // for transportation total
  const [otherTotal, setOtherTotal]                                                         = useState([]); // for other total
  const [allowanceTotal, setAllowanceTotal]                                                 = useState([]); // for allowance total
  const [advancedMoney, setAdvancedMoney]                                                   = useState([]); // for advance money
  const [budgetTotal, setBudgetTotal]                                                       = useState([]); // for budget Total
  const [totalNotAdmin, setTotalNotAdmin]                                                   = useState([]); // for Total (Admin Arrange Amount Not Include)
  const [advanceAdditional, setAdvanceAdditional]                                           = useState(""); // for percent add
  const [checkedAirTicket, setcheckedAirTicket]                                             = useState(false); // for checked checkbox airticket
  const [checkedAccomodation, setCheckedAccomodation]                                       = useState(false); // for checked checkbox Accomodation
  const [checkedTransportation, setCheckedTransportation]                                   = useState(false); // for checked checkbox Transportation
  const [checkedAllowance, setCheckedAllowance]                                             = useState(false); // for checked checkbox Allowance
  const [checkedOther, setCheckedOther]                                                     = useState(false); // for checked checkbox Other
  const [airTicketTotalNotAdmin, setAirTicketTotalNotAdmin]                                 = useState([]); // for  airticket total not arange by admin
  const [accommodationTotalNotAdmin, setAccommodationTotalNotAdmin]                         = useState([]); // for  accommodation total not arange by admin
  const [transportationTotalNotAdmin, setTransportationTotalNotAdmin]                       = useState([]); // for  transportation total not arange by admin
  const [otherTotalNotAdmin, setOtherTotalNotAdmin]                                         = useState([]); // for  other total not arange by admin
  const [approverState, setApproverState]                                                   = useState("");// for approver state
  const [approverData, setApproverData]                                                     = useState([]);// for approver data
  const [mainTable, setMainTable]                                                           = useState([]); // for main table
  const [AllCheck, setAllCheck]                                                             = useState(false);      // For select checkbox all or not
  const [checkBoxIdList, setCheckBoxIdList]                                                 = useState(''); // For delete data list
  const [positionState, setPositionState]                                                   = useState("");
  const [position, setPosition]                                                             = useState("");
  const [addModalBox, setAddModalBox]                                                       = useState(false);// Add confirm box show or hide
  const [rowCount, setRowCount]                                                             = useState(0);    // for row count
  const [approverModalBox, setApproverModalBox]                                             = useState(false);
  const [mainTableModal, setMainTableModal]                                                 = useState([]); // for main table
  const [popupError, setPopupError]                                                         = useState(""); // for show pop up error in model
  const [departmentState, setDepartmentState]                                               = useState(""); // department
  const [saveModalBox, setSaveModalBox] 					                                = useState(false); //for show hide model save
  const [tripTypeId, setTripTypeId] 						                                = useState(1); //for trip type
  const [tripTypeList, setTripTypeList] 				                                    = useState([]); //for trip type list
  const [airTicketBusinessTripListFile,setAirTicketBusinessTripListFile]                    = useState([]); // for air ticket business trip file
  const [accommodationBusinessTripListFile,setAccommodationBusinessTripListFile]            = useState([]); // for Accommodation business trip file
  const [transportationBusinessTripListFile,setTransportationBusinessTripListFile]          = useState([]); // for Transportation business trip file
  const [otherBusinessTripListFile,setOtherBusinessTripListFile]                            = useState([]); // for Other business trip file
  const [allowanceBusinessTripListFile,setAllowanceBusinessTripListFile]                    = useState([]); // for Allowance business trip file
  const [storeEditData,setStoreEditData]                                                    = useState(""); // for store edit data
  const [deletedAttachId,setDeletedAttachId]                                                = useState([]); // for deleted attach id
  const [deletedAttachDetailId,setDeletedAttachDetailId]                                    = useState([]); // for deleted Attach Detail Id
  const [deletedBusinessTripDetailId,setDeletedBusinessTripDetailId]                        = useState([]); // for deleted Business Trip Detail Id
  const [positionRank,setPositionRank]                                                      = useState(""); // for position rank
  const [content, setContent]                                                               = useState(''); // set content show mesager
  const [type, setType]                                                                     = useState(''); // settype messager
  const [checkFlagLoadData, setCheckFlagLoadData]                                           = useState(0); // settype flag check load data
  const [checkShowCheckboxAirticket, setCheckShowCheckboxAirticket]                         = useState(false); // for check not disable airticket
  const [checkShowCheckboxAccomodation, setCheckShowCheckboxAccomodation]                   = useState(false); // for check not disable accomodation
  const [checkShowCheckboxTransportation, setCheckShowCheckboxTransportation]               = useState(false); // for check not disable transport
  const [checkShowCheckboxDailyAllowance, setCheckShowCheckboxDailyAllowance]               = useState(false); // for check not disable daily alloance
  const [checkShowCheckboxOther, setCheckShowCheckboxOther]                                 = useState(false); // for check not disable other
  const [approverSetting,setApproverSetting]                                                = useState(0); // for approver setting
    /**
     * If error state or succes state is changed, scroll automatically to top
     *
     * @author  lq_don
     * @create  19/07/2021 (D/M/Y)
     * @param
     * @return
     */
     useEffect(() => {
      if (error.length > 0 || success.length > 0) {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
  }, [error, success]);

  /**
   * If clearData is changed, remove array in autocomplete
   *
   * @author  lq_don
   * @create  19/07/2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
      if (clearData !== "") {
          setIdArr([]);
          setNameArr([]);
          setCodeArr([]);
      }
  }, [clearData]);

  /**
   * Page Load
   *
   * @author  lq_don
   * @create  19/07/2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
      setLoading(true);
      let sessionStoreId = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_REQUEST_DATA"));
      if (sessionStoreId == null) loadAdvanceAddtional();
      loadCurrency();
      loadAllowance();
      loadDepartment();
      loadTripType();
      loadPositionRank();
      //set days/times for allowance
      if (sessionStoreId == null)
          setDaysTimesAllowance(
              daysBetween(tripPeriodToDate, tripPeriodFromDate) + 1 <= 0
                  ? ""
                  : daysBetween(tripPeriodToDate, tripPeriodFromDate) + 1
          );
  }, [loadApprover]);
  useEffect(() => {
      if (checkFlagLoadData == 0) setCheckFlagLoadData(1);
      else loadEditDetail();
  }, [currencyList]);
  //load edit form
  const loadEditDetail = async () => {
      let editData = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_REQUEST_DATA"));
      if (editData != null) {
          setStoreEditData(editData);
          let url = `${ApiPath.businessTripRequestDetail}/${editData}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
          let obj = { package_name: "hr", url: url, method: "get" };
          let response = await ApiRequest(obj);
          setLoading(false);
          response.flag === false ? setError(response.message) : defaultDataEdit(response.data.data);
      }
  };
  //load edit form
  const loadAdvanceAddtional = async () => {
      let url = `${ApiPath.businessTripRequestGetAddtional}`;
      let obj = { package_name: "hr", url: url, method: "get" };
      let response = await ApiRequest(obj);
      response.flag === false
          ? setAdvanceAdditional("")
          : setAdvanceAdditional(parseFloat(response.data.data.advanced_additional));
  };
  //set default data if edit
  const defaultDataEdit = (detail) => {
      if (currencyList.length > 0) {
          //set Default common
          setEmployeeCode(detail.emp_code);
          setEmployeeID(detail.employee_id);
          setEmployeeName(detail.emp_name);
          loadApprover(detail.employee_id);
          setDepartment(detail.department);
          setExpenseDepartmentID(detail.expense_department_id);
          setPosition(detail.position);
          setTripPeriodFromDate(detail.trip_period_from_date.split(" ")[0]);
          setTripPeriodToDate(detail.trip_period_to_date.split(" ")[0]);
          setDaysTimesAllowance(
              daysBetween(detail.trip_period_to_date.split(" ")[0], detail.trip_period_from_date.split(" ")[0]) + 1 <=
                  0
                  ? ""
                  : daysBetween(
                        detail.trip_period_to_date.split(" ")[0],
                        detail.trip_period_from_date.split(" ")[0]
                    ) + 1
          );
          setTripTypeId(detail.trip_type);
          setExchangeRate(parseFloat(detail.exchange_rate).toString());
          setDestination(detail.destination);
          setPurpose(detail.purpose == null ? "" : detail.purpose);
          setAppliedDate(detail.applied_date.split(" ")[0]);
          setDueDate(detail.due_date.split(" ")[0]);
          setAdvanceAdditional(detail.advance_additional);
          setNeedAdvance(detail.advance_flag == 1 ? 0 : 1);
          setNeedAdvanceType(detail.advance_flag == 3 ? 1 : 0);
          //for setCheckbox
          if (detail.advance_flag == 2) {
              if (detail.air_ticket.length > 0) {
                  setcheckedAirTicket(detail.air_ticket[0].additional_advance_item == 1 ? true : false);
              }
              if (detail.accommodation.length > 0) {
                  setCheckedAccomodation(detail.accommodation[0].additional_advance_item == 1 ? true : false);
              }
              if (detail.transportation.length > 0) {
                  setCheckedTransportation(detail.transportation[0].additional_advance_item == 1 ? true : false);
              }
              if (detail.daily_allowance.length > 0) {
                  setCheckedAllowance(detail.daily_allowance[0].additional_advance_item == 1 ? true : false);
              }
              if (detail.other.length > 0) {
                  setCheckedOther(detail.other[0].additional_advance_item == 1 ? true : false);
              }
          }
          if (detail.advance_flag == 3) {
              let advanceAmountValue = loadDefaultCurrency();
              detail.advance_amount.map((e) => {
                  advanceAmountValue.map((i) => {
                      if (e.currency_id == i.id) {
                          i.currency_amount = parseFloat(e.advance_amount);
                      }
                  });
              });
              setAdvancedMoney(advanceAmountValue);
          }
          //other Business Trip Other Attachement
          if (detail.business_trip_other_attach.length > 0) {
              let businessTripOtherFile = [];
              detail.business_trip_other_attach.map((e) => {
                  let objOtherFile = { id: e.id, name: e.business_trip_document_name };
                  businessTripOtherFile.push(objOtherFile);
              });
              setOtherFile([...businessTripOtherFile]);
          }
          //set defautl air ticket business trip
          if (detail.air_ticket.length > 0) {
              setValueBusinessTripList(detail.air_ticket, "air_ticket");
          }
          //set defautl accommodation business trip
          if (detail.accommodation.length > 0) {
              setValueBusinessTripList(detail.accommodation, "accommodation");
          }
          //set defautl transportation business trip
          if (detail.transportation.length > 0) {
              setValueBusinessTripList(detail.transportation, "transportation");
          }
          //set defautl other business trip
          if (detail.other.length > 0) {
              setValueBusinessTripList(detail.other, "other");
          }
          //set defautl allowance business trip
          if (detail.daily_allowance.length > 0) {
              let businessTripListValue = [];
              let businessTripListFileValue = [];
              let listIdSubAllowance = [];
              detail.daily_allowance.map((e) => {
                  listIdSubAllowance.push(e.business_trip_detail_allowance.sub_allowance_id);
              });
              listIdSubAllowance = Array.from(new Set(listIdSubAllowance));
              let newBusinessTripAllowance = [];
              listIdSubAllowance.map((e) => {
                  newBusinessTripAllowance.push(
                      detail.daily_allowance.filter((i) => i.business_trip_detail_allowance.sub_allowance_id == e)
                  );
              });
              let indexValue = -1;
              newBusinessTripAllowance.map((i) => {
                  i.map((e, index) => {
                      let businessTripValue = {
                          is_new: 0,
                          indexValue: indexValue,
                          id: e.id,
                          title: e.title,
                          sub_allowance_id: e.business_trip_detail_allowance.sub_allowance_id,
                          unit_price: parseFloat(e.unit_price),
                          unit_price_currency_id: e.unit_price_currency_id,
                          unit_price_curency: getcurrencyName(e.unit_price_currency_id),
                          day_times: 1,
                          fx_rate: 1,
                          accept_currency_id: e.accept_currency_id,
                          accept_currency: getcurrencyName(e.accept_currency_id),
                          description: e.description != null ? e.description : "",
                      };
                      businessTripListValue.push(businessTripValue);
                      if (e.attachement.length > 0) {
                          let valueFile = [];
                          e.attachement.map((i) => {
                              valueFile.push({ id: i.id, name: i.name });
                          });
                          businessTripListFileValue.push(valueFile);
                      } else businessTripListFileValue.push([]);
                  });
                  indexValue--;
              });
              setAllowanceBusinessTripListFile(businessTripListFileValue);
              setAllowanceBusinessTripList([...businessTripListValue]);
          }
          // for advance amount
          //setAprover
          setMainTable(detail.approver);
          sessionStorage.removeItem("RETURN_BUSINESS_TRIP_REQUEST_DATA");
      }
  };
  //set value for business trip list
  const setValueBusinessTripList = (valueBusinessTrip, category) => {
      let businessTripListValue = [];
      let businessTripListFileValue = [];
      valueBusinessTrip.map((e, index) => {
          let businessTripValue = {
              is_new: 0,
              id: e.id,
              title: e.title,
              unit_price: parseFloat(e.unit_price),
              unit_price_currency_id: e.unit_price_currency_id,
              unit_price_curency: getcurrencyName(e.unit_price_currency_id),
              day_times: parseInt(e.day_times != null ? e.day_times : 1),
              fx_rate: parseFloat(e.fx_rate != null ? e.fx_rate : ""),
              accept_currency_id: e.accept_currency_id,
              accept_currency: getcurrencyName(e.accept_currency_id),
              arrange_by_admin: e.arrange_by_admin,
              description: e.description != null ? e.description : "",
          };
          businessTripListValue.push(businessTripValue);
          if (e.attachement.length > 0) {
              let valueFile = [];
              e.attachement.map((i) => {
                  valueFile.push({ id: i.id, name: i.name });
              });
              businessTripListFileValue.push(valueFile);
          } else businessTripListFileValue.push([]);
      });
      if (category == "air_ticket") {
          setAirTicketBusinessTripListFile(businessTripListFileValue);
          setAirTicketBusinessTripList([...businessTripListValue]);
      }
      if (category == "accommodation") {
          setAccommodationBusinessTripListFile(businessTripListFileValue);
          setAccommodationBusinessTripList([...businessTripListValue]);
      }
      if (category == "transportation") {
          setTransportationBusinessTripListFile(businessTripListFileValue);
          setTransportationBusinessTripList([...businessTripListValue]);
      }
      if (category == "other") {
          setOtherBusinessTripListFile(businessTripListFileValue);
          setOtherBusinessTripList([...businessTripListValue]);
      }
  };
  //get currency name with id
  const getcurrencyName = (id) => {
      let currency = "";
      currencyList.map((e) => {
          if (e.id == id) currency = e.currency_name;
      });
      return currency;
  };
  /* Fake Approver */
  const loadApprover = async (empID = "") => {
      let params = {
          company_id: ApiPath.companyID,
          employee_id: empID,
          device_flag: 1,
      };
      let data = {
          package_name: "erp",
          url: ApiPath.ERPApproverList,
          method: "post",
          params,
      };
      let response = await ApiRequest(data);
      setLoading(false);
      response.flag === false ? setError([]) : setApproverData(response.data.data);
  };
  //chatch event change businesstriplist
  let useEffectChange = [airTicketTotal, allowanceTotal, accommodationTotal, otherTotal, transportationTotal];
  useEffect(() => {
      loadTotalBudgetAndAdminNotRange();
  }, useEffectChange);
  //set default total 0
  const loadDefaultCurrency = () => {
      let currencyData = [];
      currencyList.map((i) => {
          if (i.expense_flag == 1) {
              let itemCurrency = {
                  id: i.id,
                  currency_name: i.currency_name,
                  currency_amount: 0,
              };
              currencyData.push(itemCurrency);
          }
      });

      //calculation total row in table
      return currencyData;
  };
  const loadTotalBudgetAndAdminNotRange = () => {
      if (
          airTicketTotal.length > 0 &&
          allowanceTotal.length > 0 &&
          accommodationTotal.length > 0 &&
          otherTotal.length > 0 &&
          transportationTotal.length > 0 &&
          airTicketTotalNotAdmin.length > 0 &&
          accommodationTotalNotAdmin.length > 0 &&
          otherTotalNotAdmin.length > 0 &&
          transportationTotalNotAdmin.length > 0
      ) {
          //calculation total row in table
          let totalValue = loadDefaultCurrency();
          totalValue.map((e, index) => {
              e.currency_amount =
                  airTicketTotal[index].currency_amount +
                  allowanceTotal[index].currency_amount +
                  accommodationTotal[index].currency_amount +
                  otherTotal[index].currency_amount +
                  transportationTotal[index].currency_amount;
          });
          setBudgetTotal(totalValue);
          // set total Admin Arrange Amount Not Include
          let totalNotAdminValue = loadDefaultCurrency();
          // let flagCheckTotalNotAdmin=0;
          totalNotAdminValue.map((e, index) => {
              //set disable checkbox if category not have not admin range
              if (needAdvance == 1 && needAdvanceType == 0) {
                  if (airTicketTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxAirticket(true);
                  if (allowanceTotal[index].currency_amount > 0) setCheckShowCheckboxDailyAllowance(true);
                  if (accommodationTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxAccomodation(true);
                  if (otherTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxOther(true);
                  if (transportationTotalNotAdmin[index].currency_amount > 0)
                      setCheckShowCheckboxTransportation(true);
              }
              e.currency_amount =
                  airTicketTotalNotAdmin[index].currency_amount +
                  allowanceTotal[index].currency_amount +
                  accommodationTotalNotAdmin[index].currency_amount +
                  otherTotalNotAdmin[index].currency_amount +
                  transportationTotalNotAdmin[index].currency_amount;
              // if(e.currency_amount!=0)
              //   flagCheckTotalNotAdmin++;
          });
          setTotalNotAdmin(totalNotAdminValue);
          //set total Advance Money
          if (needAdvance == 1 && needAdvanceType == 0) setAdvanceTotal();
      }
  };
  //count day between two day
  const daysBetween = (dateStart, dateEnd) => {
      // The number of milliseconds in one day
      const ONE_DAY = 1000 * 60 * 60 * 24;

      // Calculate the difference in milliseconds
      const differenceMs = new Date(dateStart) - new Date(dateEnd);
      // Convert back to days and return
      return Math.round(differenceMs / ONE_DAY);
  };
  //change trip type
  const changeTripType = (e) => {
      setTripTypeId(e.target.value);
  };
  /* Add Approver Start */
  const addApprover = () => {
      let errMsgAll = [];
      if (checkBoxIdList.length === 0) {
          const errorMsg = t("JSE056").replace("%s", t("Approver"));
          errMsgAll.push(errorMsg);
      } else {
          if (!mainTable.some((value) => checkBoxIdList.includes(value.approver_id))) {
              mainTableModal.map((value) => {
                  if (checkBoxIdList.includes(value.approver_id)) {
                      setMainTable((mainTable) => [...mainTable, value]);
                  }
              });
          } else {
              mainTable.map((value) => {
                  if (checkBoxIdList.includes(value.approver_id)) {
                      const errorMsg = t("JSE140").replace("%s", value.approver_id);
                      errMsgAll.push(errorMsg);
                  }
              });
          }
      }
      if (errMsgAll.length > 0) {
          setPopupError(errMsgAll);
      } else {
          closeApproverModal();
      }
  };
  const removeMessagePopup = () => {
      setPopupError("");
  };
  /* Delete Approver Start */
  const deleteApprover = (e) => {
      let result_data = []; // to remove data by click icon
      result_data = mainTable.filter((main) => main.approver_id != e["approver_id"]);
      setMainTable(result_data);
  };
  /* Search Approver API Start */
  const searchApproverAPI = async () => {
      if (validateSearch()) {
          let params = {
              company_id: ApiPath.companyID,
              employee_id: employeeID,
              language: ApiPath.lang,
              position_id: positionState,
              department_id: departmentState,
          };
          let obj = { package_name: "hr", url: ApiPath.businessTripRequestGetApprover, method: "post", params };
          setLoading(true);
          let response = await ApiRequest(obj);
          setLoading(false);
          if (response.flag === false) {
              setSuccess([]);
              setMainTableModal([]);
              openApproverModal();
              setError([]);
          } else {
              setRowCount(t("Total Rows").replace("%s", response.data.row_count));
              setMainTableModal(response.data.data);
              setError([]);
              setSuccess([]);
              openApproverModal();
          }
      }
  };
  /* Validate Search Approver Start */
  const validateSearch = () => {
      setError([]);
      setSuccess([]);
      let allError = [];
      if (!checkNullOrBlankString(approverState)) {
          let errMsg = t("JSE001").replace("%s", t("Approver"));
          allError.push(errMsg);
      } else return true;
      setError(allError);
  };
  /* Approver Modal Box Start */
  const openApproverModal = () => {
      setApproverModalBox(!approverModalBox);
  };
  const addToggleAlert = (e) => {
      setAddModalBox(!addModalBox);
  };
  const addOnClose = () => {
      setAddModalBox(!addModalBox);
  };
  const closeApproverModal = () => {
      setApproverModalBox(!approverModalBox);
      setCheckBoxIdList([]);
      setMainTableModal([]);
      setAllCheck(false);
      setPopupError([]);
  };
  //load view permition
  const loadPositionRank = async () => {
      setLoading(true);
      let params = {
          company_id: ApiPath.companyID,
          employee_id: ApiPath.loginEmp,
          language: ApiPath.lang,
      };
      let obj = { package_name: "hr", url: ApiPath.businessTripRequestGetPoisionRank, method: "post", params };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
      } else {
          setPositionRank(response.data.data.is_position_rank_zero);
          setApproverSetting(parseInt(response.data.data.approver_setting));
          loadViewPermition(parseInt(response.data.data.approver_setting));
      }
  };
    /* Load Approver Data API Start */
    const loadApproverDataAPI = async (employeeId) => {
        let params = {
          company_id: ApiPath.companyID,
          employee_id: employeeId,
        }
        let obj = { package_name: 'hr', url: ApiPath.businessTripRequestGetApproverData, method: 'post', params }
        let response = await ApiRequest(obj);
        if (response.flag === false) {
          setError([])
          setMainTable([]);
        }
        else {
          setMainTable(response.data.data);
          setError([]);
          setSuccess([]);
        }
      }
  //get position rank
  const loadViewPermition = async (approverSetting) => {
      let params = {
          login_employee_id: ApiPath.loginEmp,
      };
      let obj = { package_name: "hr", url: ApiPath.employeeByViewPermission, method: "post", params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag !== false) {
          if (response.data.autocomplete === false) {
              setPermission(ViewPermision.ONLY_ME);
              setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id);
              setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng);
              setEmployeeCode(response.data.data[ApiPath.loginEmp].code);
              setDepartment(
                  response.data.data[ApiPath.loginEmp].employee_has_dept_position.map(
                      (i) => i.departments.department_name
                  )
              );
              setPosition(
                  response.data.data[ApiPath.loginEmp].employee_has_dept_position.map(
                      (i) => i.positions.position_name
                  )
              );
              loadApprover(response.data.data[ApiPath.loginEmp].employee_id);
              if ([2,3,4,5].includes(approverSetting)&&positionRank==false) {
                loadApproverDataAPI(response.data.data[0].employee_id);
              }
          } else setPermission(ViewPermision.ALL);
      }
  };
  //load trip type
  const loadTripType = async () => {
      setTripTypeList([
          { trip_type_id: 1, trip_type_name: "Domestic" },
          { trip_type_id: 2, trip_type_name: "Oversea" },
      ]);
  };
  const change_checkbox = (i) => {
      let value = i.target.value;
      let checked = i.target.checked;
      let data;
      let id_list = [];

      if (value === "all-check") {
          data = mainTableModal.map((item) => ({ ...item, is_checked: checked }));
      } else {
          data = mainTableModal.map((item) =>
              parseInt(item.approver_id) === parseInt(value) ? { ...item, is_checked: checked } : item
          );
      }
      for (let i = 0; i < data.length; i++) {
          if (data[i].is_checked) {
              id_list.push(data[i].approver_id);
          }
      }
      setCheckBoxIdList(id_list);

      setAllCheck(data.every((item) => item.is_checked));
      setMainTableModal(data);
  };
  //load load Department
  const loadDepartment = async () => {
      setLoading(true);
      let obj = { package_name: "erp", url: ApiPath.ERPGetAllDepartment, method: "get" };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
      } else {
          setExpenseDepartmentList(response.data.data);
      }
  };
  //load allowance
  const loadAllowance = async () => {
      let url = `${ApiPath.businessTripRequestGetAllowance}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
      let obj = { package_name: "hr", url: url, method: "get" };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
          setSuccess([]);
          setAllowanceList([]);
      } else setAllowanceList(response.data.data);
  };
  const selectExpenseDepartment = (e) => {
      setExpenseDepartmentID(e.target.value);
  };
  //load curency
  const loadCurrency = async () => {
      let url = `${ApiPath.businessTripRequestGetCurrency}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
      let obj = { package_name: "hr", url: url, method: "get" };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
          setSuccess([]);
          setError([]);
      } else {
          setCurrencyList(response.data.data);
          let currencyData = [];
          response.data.data.map((i) => {
              if (i.expense_flag == 1) {
                  let itemCurrency = {
                      id: i.id,
                      currency_name: i.currency_name,
                      currency_amount: 0,
                  };
                  currencyData.push(itemCurrency);
              }
          });
          // set default for total
          setAirTicketTotal(currencyData);
          setAccommodationTotal(currencyData);
          setTransportationTotal(currencyData);
          setOtherTotal(currencyData);
          setAllowanceTotal(currencyData);
          setAdvancedMoney(currencyData);
          setBudgetTotal(currencyData);
          setTotalNotAdmin(currencyData);
          setAirTicketTotalNotAdmin(currencyData);
          setAccommodationTotalNotAdmin(currencyData);
          setTransportationTotalNotAdmin(currencyData);
          setOtherTotalNotAdmin(currencyData);
      }
  };
  //select previod from date
  const handleTripPeriodFromDateChange = (e) => {
      //set for trip period date
      setTripPeriodFromDate(ChangeDate(e));
      //set days/times for allowance
      setDaysTimesAllowance(daysBetween(tripPeriodToDate, e) + 1 <= 0 ? "" : daysBetween(tripPeriodToDate, e) + 1);
  };
  //select trip period to date
  const handleTripPeriodToDateChange = (e) => {
      //set for trip period to day
      setTripPeriodToDate(ChangeDate(e));
      //set days/times for allowance
      setDaysTimesAllowance(
          daysBetween(e, tripPeriodFromDate) + 1 <= 0 ? "" : daysBetween(e, tripPeriodFromDate) + 1
      );
  };
  //select applied date
  const selectAppliedDate = (e) => {
      setAppliedDate(ChangeDate(e));
  };
  //select due date
  const selectDueDate = (e) => {
      setDueDate(ChangeDate(e));
  };

  /**
   * change autocomplete
   *
   * @author  lq_don
   * @create  14/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const changeAutocomplete = async (type, i) => {
      setApproverState([]);
      setMainTable([]);
      setApproverData([]);
      setError([]);
      setSuccess([]);
      setClearData("");
      // type is id, show name in Employee ID and clear remain input
      if (type === "id") {
          setEmployeeID(i.target.value);
          setEmployeeCode("");
          setEmployeeName("");
          setDepartment("");
          setPosition("");
      }
      // type is code, show name in Employee Code and clear remain input
      else if (type === "code") {
          setEmployeeID("");
          setEmployeeCode(i.target.value);
          setEmployeeName("");
          setDepartment("");
          setPosition("");
      }
      // type is name, show name in Employee Name and clear remain input
      else {
          setEmployeeID("");
          setEmployeeCode("");
          setEmployeeName(i.target.value);
          setDepartment("");
          setPosition("");
      }

      // if empty, remove data from autocomplete
      if (i.target.value === "") {
          setClearData("clear");
      } else {
          let obj = {
              package_name: "erp",
              url: `api/${ApiPath.customerName}/employee/${type}-autocomplete-search`,
              method: "post",
              params: { search_item: i.target.value, company_id: ApiPath.companyID },
          };
          let response = await ApiRequest(obj);
          if (response.flag === false) {
              setError(response.message);
              setClearData("clear");
          } else {
              type === "id"
                  ? setIdArr(response.data.data)
                  : type === "code"
                  ? setCodeArr(response.data.data)
                  : setNameArr(response.data.data);
          }
      }
  };

  /**
   * select autocomplete
   *
   * @author  lq_don
   * @create  14/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const selectAutocomplete = async (type, val) => {
      setClearData("clear");
      let objectEmp = {
          package_name: "erp",
          url: ApiPath.employeeAutoCompleteResult,
          method: "post",
          params: { id: val.id, company_id: ApiPath.companyID },
      };
      let responseEmp = await ApiRequest(objectEmp);
      if (responseEmp.flag === false) {
          setError(responseEmp.message);
      } else {
          setEmployeeID(responseEmp.data.data[0].employee_id);
          setEmployeeName(responseEmp.data.data[0].name);
          setEmployeeCode(responseEmp.data.data[0].employee_code);
          if ([2,3,4,5].includes(approverSetting)&&positionRank==false) {
            loadApproverDataAPI(responseEmp.data.data[0].employee_id);
          }
          let attr = { employee_id: responseEmp.data.data[0].employee_id, company_id: ApiPath.companyID };
          let object = {
              package_name: "erp",
              url: ApiPath.ERPSearchEmployee,
              method: "post",
              params: attr,
          };
          let response = await ApiRequest(object);
          if (response.flag === false) {
              setError(response.message);
          } else {
              setDepartment(
                  response.data.data[0].employee_has_dept_position.map((i) => i.departments.department_name)
              );
              setPosition(response.data.data[0].employee_has_dept_position.map((i) => i.positions.position_name));
              loadApprover(response.data.data[0].employee_id);
          }
      }
  };
  /** End API for Employee */
  //on change purpose
  const changePurpose = (e) => {
      if (e.target.value.length < 65535) setPurpose(e.target.value);
  };
  //on change exchangerate
  const changeExchangeRate = (e) => {
      let ExchangeRateNum = e.target.value;
      if (isDecimalExchangeRate(ExchangeRateNum)) setExchangeRate(ExchangeRateNum);
  };
  //check decimal exchangerate
  const isDecimalExchangeRate = (value) => {
      var decimalOnly = /^[]*?(\d{0,6})(\.\d{0,6})?$/;
      if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
          return true;
      }
      return false;
  };
  //check decimal
  const isDecimal = (value) => {
      var decimalOnly = /^[]*?(\d{0,18})(\.\d{0,2})?$/;
      if (decimalOnly.test(value) && value.substring(0, 1) != ".") {
          return true;
      }
      return false;
  };
  //set total Advance Money
  const setAdvanceTotal = () => {
      let totalAdvanceMoney = loadDefaultCurrency();
      let totalNotAdmin = loadDefaultCurrency();
      totalAdvanceMoney.map((e, index) => {
          //set disable checkbox if category not have not admin range
          if (airTicketTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxAirticket(true);
          if (allowanceTotal[index].currency_amount > 0) setCheckShowCheckboxDailyAllowance(true);
          if (accommodationTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxAccomodation(true);
          if (otherTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxOther(true);
          if (transportationTotalNotAdmin[index].currency_amount > 0) setCheckShowCheckboxTransportation(true);
      });
      if (checkedAirTicket == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + airTicketTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + airTicketTotalNotAdmin[index].currency_amount;
          });
      }
      if (checkedAccomodation == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + accommodationTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + accommodationTotalNotAdmin[index].currency_amount;
          });
      }
      if (checkedTransportation == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + transportationTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + transportationTotalNotAdmin[index].currency_amount;
          });
      }
      if (checkedAllowance == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + allowanceTotal[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + allowanceTotal[index].currency_amount;
          });
      }
      if (checkedOther == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + otherTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + otherTotalNotAdmin[index].currency_amount;
          });
      }
      totalAdvanceMoney.map((e, index) => {
          if (e.currency_amount != 0)
              e.currency_amount =
                  Math.round(
                      ((e.currency_amount * advanceAdditional) / 100 + totalNotAdmin[index].currency_amount) * 100
                  ) / 100;
          else e.currency_amount = 0;
      });
      setAdvancedMoney(totalAdvanceMoney);
  };
  const loadDefaultCurrencyWithTotalNotAdmin = () => {
      let currencyData = [];
      currencyList.map((i) => {
          if (i.expense_flag == 1) {
              let itemCurrency = {
                  id: i.id,
                  currency_name: i.currency_name,
                  currency_amount: totalNotAdmin.find((e) => e.id == i.id).currency_amount,
              };
              currencyData.push(itemCurrency);
          }
      });

      //calculation total row in table
      return currencyData;
  };
  //change when click radio advance type
  const changeAdvanceType = (e) => {
      if (e.target.value == 0) {
          setAdvanceTotal();
      } else {
          defaultCheckbox();
          // let currencyData=loadDefaultCurrency();
          //calculation total row in table
          setAdvancedMoney(loadDefaultCurrencyWithTotalNotAdmin());
      }
      setNeedAdvanceType(e.target.value);
  };
  //set default check box
  const defaultCheckbox = () => {
      setCheckedAccomodation(false);
      setcheckedAirTicket(false);
      setCheckedAllowance(false);
      setCheckedOther(false);
      setCheckedTransportation(false);
  };
  //change when click radio advance
  const changeAdvance = (e) => {
      if (e.target.value == 1 && needAdvanceType == 0) {
          setAdvanceTotal();
      } else {
          defaultCheckbox();
          //set default advance monney
          setAdvancedMoney(loadDefaultCurrency());
      }
      setNeedAdvance(e.target.value);
      if (e.target.value == 0) setNeedAdvanceType(0);
  };
  //on change destination
  const changeDestination = (e) => {
      if (e.target.value.length < 65535) setDestination(e.target.value);
  };
  //change  Advance Money
  const changeAdvanceMoney = (e) => {
      let advanceValue = [...advancedMoney];
      let totalValue = e.target.value;
      let idValue = e.target.id;
      if (isDecimal(totalValue)) {
          advanceValue.map((e) => {
              if (e.id == idValue) e.currency_amount = totalValue;
          });
      }
      setAdvancedMoney(advanceValue);
  };
  //when click check box advance
  const changeCheckboxAdvance = (e) => {
      let airTicket = checkedAirTicket;
      let accomodation = checkedAccomodation;
      let transportation = checkedTransportation;
      let allowance = checkedAllowance;
      let other = checkedOther;
      if (e.target.value == "AirTicket") {
          setcheckedAirTicket(e.target.checked);
          airTicket = e.target.checked;
      }
      if (e.target.value == "Accomodation") {
          setCheckedAccomodation(e.target.checked);
          accomodation = e.target.checked;
      }
      if (e.target.value == "Transportation") {
          setCheckedTransportation(e.target.checked);
          transportation = e.target.checked;
      }
      if (e.target.value == "DailyAllowance") {
          setCheckedAllowance(e.target.checked);
          allowance = e.target.checked;
      }
      if (e.target.value == "Other") {
          setCheckedOther(e.target.checked);
          other = e.target.checked;
      }
      let totalAdvanceMoney = loadDefaultCurrency();
      let totalNotAdmin = loadDefaultCurrency();
      if (airTicket == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + airTicketTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + airTicketTotalNotAdmin[index].currency_amount;
          });
      }
      if (accomodation == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + accommodationTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + accommodationTotalNotAdmin[index].currency_amount;
          });
      }
      if (transportation == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + transportationTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + transportationTotalNotAdmin[index].currency_amount;
          });
      }
      if (allowance == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + allowanceTotal[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + allowanceTotal[index].currency_amount;
          });
      }
      if (other == true) {
          totalAdvanceMoney.map((e, index) => {
              e.currency_amount = e.currency_amount + otherTotalNotAdmin[index].currency_amount;
              totalNotAdmin[index].currency_amount =
                  totalNotAdmin[index].currency_amount + otherTotalNotAdmin[index].currency_amount;
          });
      }
      totalAdvanceMoney.map((e, index) => {
          if (e.currency_amount != 0)
              e.currency_amount =
                  Math.round(
                      ((e.currency_amount * advanceAdditional) / 100 + totalNotAdmin[index].currency_amount) * 100
                  ) / 100;
          else e.currency_amount = 0;
      });
      setAdvancedMoney(totalAdvanceMoney);
  };
  //event change approve
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
  };
  //event click request
  const requestClick = () => {
      // deletedAttachDetailId.map((e,index)=>{
      //   console.log(e);
      // })
      let arrMsg = [];
      //remove "." last in Ex ChangeRate
      if (exchangeRate.substr(exchangeRate.length - 1) == ".")
          setExchangeRate(exchangeRate.substring(0, exchangeRate.length - 1));
      let value = advancedMoney;
      advancedMoney.map((e, index) => {
          if (e.currency_amount != null && e.currency_amount != "")
              if (e.currency_amount.toString().substr(e.currency_amount.length - 1) == ".")
                  value[index].currency_amount = e.currency_amount
                      .toString()
                      .substring(0, e.currency_amount.length - 1);
      });
      setAdvancedMoney([...value]);
      if (needAdvance != 0) {
          let checkNullFlag = 0;
          for (let e of advancedMoney) {
              if (checkNullOrBlank(parseFloat(e.currency_amount))) {
                  checkNullFlag++;
              }
          }
          if (checkNullFlag == 0) {
              let errMsg = t("JSE124").replace("%s", t("Advance Money"));
              arrMsg.push(errMsg);
          }
      }
      //validation The air ticket or accommodation or transportation or daily allowance or other
      let checkNullFlag = 0;
      for (let e of budgetTotal) {
          if (checkNullOrBlank(e.currency_amount)) {
              checkNullFlag++;
          }
      }
      if (checkNullFlag == 0) {
          let errMsg = t("JSE152");
          arrMsg.push(errMsg);
      }
      //validation aprover
      if (positionRank == false) {
          if (mainTable.length == 0) {
              let errMsg = t("JSE158");
              arrMsg.push(errMsg);
          } else {
              if (storeEditData == null) {
                  let approverOrChecker = 0;
                  mainTable.map((e) => {
                      if (e.approver_or_checker != null) {
                          if (e.approver_or_checker == 1) approverOrChecker++;
                      }
                  });
                  if (approverOrChecker == 0) {
                      let errMsg = t("JSE158");
                      arrMsg.push(errMsg);
                  }
              }
          }
      }
      //validation Applied Date
      if (!checkNullOrBlankString(appliedDate)) {
          let errMsg = t("JSE124").replace("%s", t("Applied Date"));
          arrMsg.push(errMsg);
      }
      //validation Due Date
      if (!checkNullOrBlankString(dueDate)) {
          let errMsg = t("JSE124").replace("%s", t("Due Date"));
          arrMsg.push(errMsg);
      }
      //validation Business Trip Period From date not null
      if (!checkNullOrBlankString(tripPeriodFromDate)) {
          let errMsg = t("JSE124").replace("%s", t("Business Trip Period From date"));
          arrMsg.push(errMsg);
      }
      //validation Business Trip Period To date not null
      if (!checkNullOrBlankString(tripPeriodToDate)) {
          let errMsg = t("JSE124").replace("%s", t("Business Trip Period To date"));
          arrMsg.push(errMsg);
      }
      //validation Business Trip Period To date > Business Trip Period From date
      if (checkNullOrBlankString(tripPeriodToDate) && checkNullOrBlankString(tripPeriodFromDate)) {
          if (formatDate(tripPeriodFromDate) > formatDate(tripPeriodToDate)) {
              let errMsg = t("JSE016")
                  .replace("%s", t("Business Trip Period From date"))
                  .replace("%s", t("Business Trip Period To date"));
              arrMsg.push(errMsg);
          }
      }
      //validation Business Trip Period To date > Business Trip Period From date
      if (checkNullOrBlankString(appliedDate) && checkNullOrBlankString(dueDate)) {
          if (formatDate(appliedDate) > formatDate(dueDate)) {
              let errMsg = t("JSE002")
                  .replace("%s", t("Business Trip Period Due Date"))
                  .replace("%s", t("Business Trip Period Applied Date"));
              arrMsg.push(errMsg);
          }
      }
      //validation Employee Id not null
      if (!checkNullOrBlankString(employeeID)) {
          let errMsg = t("JSE126").replace("%s", t("Employee Id"));
          arrMsg.push(errMsg);
      }
      //validation Trip Type not null
      if (!checkNullOrBlankString(tripTypeId)) {
          let errMsg = t("JSE126").replace("%s", t("Trip Type"));
          arrMsg.push(errMsg);
      }
      //validation ExChange Rate not null
      if (!checkNullOrBlankString(exchangeRate)) {
          let errMsg = t("JSE124").replace("%s", t("Exchange Rate"));
          arrMsg.push(errMsg);
      }
      //validation ExChange Rate !=0
      if (parseFloat(exchangeRate) == 0) {
          let errMsg = t("JSE10043").replace("%s", t("Exchange Rate"));
          arrMsg.push(errMsg);
      }
      //validation Destination not null
      if (!checkNullOrBlankString(destination.trim())) {
          let errMsg = t("JSE124").replace("%s", t("Destination"));
          arrMsg.push(errMsg);
      }
      //validation Expense Department not null
      if (!checkNullOrBlankString(expenseDepartmentID)) {
          let errMsg = t("JSE126").replace("%s", t("Expense Department"));
          arrMsg.push(errMsg);
      }
      if (arrMsg.length > 0) {
          setError(arrMsg);
          setSuccess([]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
          setSaveModalBox(!saveModalBox);
          setContent(t("Are you sure want to save?"));
          setType("save");
      }
  };
  //format date yyyy-MM-dd
  const formatDate = (date) => {
      let d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
  };
  // event save
  const saveOK = () => {
      setSaveModalBox(!saveModalBox);
      if (storeEditData != "") EditBusinessTrip();
      else requestBusinessTrip();
  };
  const convertToAdvanceAmount = () => {
      let advanceAmount = [];
      advancedMoney.map((e) => {
          let advanceAmountValue = {};
          advanceAmountValue.currency_id = e.id;
          advanceAmountValue.amount = e.currency_amount;
          advanceAmount.push(advanceAmountValue);
      });
      return advanceAmount;
  };
  //edit businesstrip
  const EditBusinessTrip = async () => {
      let params = new FormData();
      params.append("id", storeEditData);
      params.append("company_id", ApiPath.companyID);
      params.append("created_emp", ApiPath.createdEmp);
      params.append("updated_emp", ApiPath.updatedEmp);
      params.append("expense_department_id", expenseDepartmentID);
      params.append("trip_period_from_date", tripPeriodFromDate);
      params.append("trip_period_to_date", tripPeriodToDate);
      params.append("employee_id", employeeID);
      params.append("destination", destination);
      if (checkNullOrBlank(purpose)) params.append("purpose", purpose);
      params.append("trip_type_id", tripTypeId);
      params.append("exchange_rate", parseFloat(exchangeRate));
      params.append("applied_date", appliedDate);
      params.append("due_date", dueDate);
      params.append("advanced_flag", needAdvance == 0 ? 1 : needAdvanceType == 0 ? 2 : 3);
      if (mainTable.length > 0) {
          mainTable.map((e, index) => {
              params.append(`approver_id[${index}]`, e.approver_id);
          });
      }
      let indexFile = 0;
      otherFile.map((e, index) => {
          if (e.id == null) {
              params.append(`business_trip_other_file[${indexFile}]`, e);
              indexFile++;
          }
      });
      deletedAttachId.map((e, index) => {
          params.append(`deleted_attach_id[${index}]`, e);
      });
      deletedAttachDetailId.map((e, index) => {
          params.append(`deleted_attach_detail_id[${index}]`, e);
      });
      deletedBusinessTripDetailId.map((e, index) => {
          params.append(`deleted_business_trip_detail_id[${index}]`, e);
      });
      convertToAdvanceAmount().map((e, index) => {
          for (const property in e) {
              params.append(`advance_amount[${index}][${property}]`, e[property]);
          }
      });
      airTicketBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`air_ticket[${index}][${property}]`, e[property]);
          }
      });

      params.append("air_ticket_advance", checkedAirTicket ? 1 : 0);

      accommodationBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`accommodation[${index}][${property}]`, e[property]);
          }
      });
      params.append("accommodation_advance", checkedAccomodation ? 1 : 0);

      transportationBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`transportation[${index}][${property}]`, e[property]);
          }
      });
      params.append("transportation_advance", checkedTransportation ? 1 : 0);

      allowanceBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "indexValue" &&
                  property != "title" &&
                  property != "unit_price" &&
                  property != "fx_rate" &&
                  property != "unit_price_currency_id" &&
                  property != "accept_currency_id" &&
                  property != "id"
              )
                  params.append(`daily_allowance[${index}][${property}]`, e[property]);
          }
      });

      params.append("daily_allowance_advance", checkedAllowance ? 1 : 0);

      otherBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`other[${index}][${property}]`, e[property]);
          }
      });
      params.append("other_advance", checkedOther ? 1 : 0);

      airTicketBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              if (e.id == null) params.append(`air_ticket_file[${index}][${indexFile}]`, e);
          });
      });

      accommodationBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              if (e.id == null) params.append(`accommodation_file[${index}][${indexFile}]`, e);
          });
      });

      transportationBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              if (e.id == null) params.append(`transportation_file[${index}][${indexFile}]`, e);
          });
      });

      allowanceBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              if (e.id == null) params.append(`daily_allowance_file[${index}][${indexFile}]`, e);
          });
      });

      otherBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              if (e.id == null) params.append(`other_file[${index}][${indexFile}]`, e);
          });
      });
      params.append("language", ApiPath.lang);

      let obj = {
          package_name: "hr",
          url: ApiPath.businessTripRequestUpdate,
          method: "post",
          params,
          headers: { "Content-Type": "multipart/form-data" },
      };
      setLoading(true);
      let response = await ApiRequest(obj);
      setLoading(false);
      // setLoading(false);
      if (response.flag === false) {
          setError(response.message);
      } else {
          setSuccess([response.data.message]);
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          //set default common
          setExpenseDepartmentID("");
          if (permission != ViewPermision.ONLY_ME) {
              setEmployeeCode("");
              setEmployeeID("");
              setEmployeeName("");
              setDepartment("");
              setPosition("");
          }
          setExchangeRate("");
          setDestination("");
          setTripTypeId(1);
          setPurpose("");
          setTripPeriodFromDate(ChangeDate(new Date()));
          setTripPeriodToDate(ChangeDate(new Date()));
          setAppliedDate(ChangeDate(new Date()));
          setDueDate(ChangeDate(new Date()));
          //set default page
          setMainTable([]);
          let loadDefaultCurrencyValue = loadDefaultCurrency();
          setAirTicketBusinessTripList([]);
          setAirTicketBusinessTripListFile([]);
          setOtherBusinessTripList([]);
          setOtherBusinessTripListFile([]);
          setAllowanceBusinessTripListFile([]);
          setAllowanceBusinessTripList([]);
          setAccommodationBusinessTripList([]);
          setAccommodationBusinessTripListFile([]);
          setTransportationBusinessTripList([]);
          setTransportationBusinessTripListFile([]);
          setOtherFile([]);
          setDaysTimesAllowance(
              daysBetween(ChangeDate(new Date()), ChangeDate(new Date())) + 1 <= 0
                  ? ""
                  : daysBetween(ChangeDate(new Date()), ChangeDate(new Date())) + 1
          );
          setAirTicketTotal(loadDefaultCurrencyValue);
          setAccommodationTotal(loadDefaultCurrencyValue);
          setTransportationTotal(loadDefaultCurrencyValue);
          setOtherTotal(loadDefaultCurrencyValue);
          setAllowanceTotal(loadDefaultCurrencyValue);
          setAdvancedMoney(loadDefaultCurrencyValue);
          setBudgetTotal(loadDefaultCurrencyValue);
          setTotalNotAdmin(loadDefaultCurrencyValue);
          setAirTicketTotalNotAdmin(loadDefaultCurrencyValue);
          setAccommodationTotalNotAdmin(loadDefaultCurrencyValue);
          setTransportationTotalNotAdmin(loadDefaultCurrencyValue);
          setOtherTotalNotAdmin(loadDefaultCurrencyValue);
          setApproverState("");
          setDepartmentState("");
          setPositionState("");
          //set default Estimated Budget
          setNeedAdvanceType(0);
          setNeedAdvance(0);
          setCheckedTransportation(false);
          setCheckedOther(false);
          setcheckedAirTicket(false);
          setCheckedAllowance(false);
          setCheckedAccomodation(false);
          setError([]);
          setStoreEditData("");
          //set local store
      }
  };
  //send request business trip
  const requestBusinessTrip = async () => {
      let params = new FormData();
      params.append("company_id", ApiPath.companyID);
      params.append("created_emp", ApiPath.createdEmp);
      params.append("updated_emp", ApiPath.updatedEmp);
      params.append("expense_department_id", expenseDepartmentID);
      params.append("trip_period_from_date", tripPeriodFromDate);
      params.append("trip_period_to_date", tripPeriodToDate);
      params.append("employee_id", employeeID);
      params.append("destination", destination);
      if (checkNullOrBlank(purpose)) params.append("purpose", purpose);
      params.append("trip_type_id", tripTypeId);
      params.append("exchange_rate", parseFloat(exchangeRate));
      params.append("applied_date", appliedDate);
      params.append("due_date", dueDate);
      params.append("advanced_flag", needAdvance == 0 ? 1 : needAdvanceType == 0 ? 2 : 3);
      if (mainTable.length > 0) {
          mainTable.map((e, index) => {
              params.append(`approver_id[${index}]`, e.approver_id);
          });
      }
      otherFile.map((e, index) => {
          params.append(`business_trip_other_file[${index}]`, e);
      });
      convertToAdvanceAmount().map((e, index) => {
          for (const property in e) {
              params.append(`advance_amount[${index}][${property}]`, e[property]);
          }
      });
      airTicketBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`air_ticket[${index}][${property}]`, e[property]);
          }
      });

      params.append("air_ticket_advance", checkedAirTicket ? 1 : 0);

      accommodationBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`accommodation[${index}][${property}]`, e[property]);
          }
      });
      params.append("accommodation_advance", checkedAccomodation ? 1 : 0);

      transportationBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`transportation[${index}][${property}]`, e[property]);
          }
      });
      params.append("transportation_advance", checkedTransportation ? 1 : 0);

      allowanceBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "indexValue" &&
                  property != "title" &&
                  property != "unit_price" &&
                  property != "fx_rate" &&
                  property != "unit_price_currency_id" &&
                  property != "accept_currency_id"
              )
                  params.append(`daily_allowance[${index}][${property}]`, e[property]);
          }
      });

      params.append("daily_allowance_advance", checkedAllowance ? 1 : 0);

      otherBusinessTripList.map((e, index) => {
          for (const property in e) {
              if (
                  checkNullOrBlank(e[property].toString()) &&
                  property != "accept_currency" &&
                  property != "unit_price_curency" &&
                  property != "id"
              )
                  params.append(`other[${index}][${property}]`, e[property]);
          }
      });
      params.append("other_advance", checkedOther ? 1 : 0);

      airTicketBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              params.append(`air_ticket_file[${index}][${indexFile}]`, e);
          });
      });

      accommodationBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              params.append(`accommodation_file[${index}][${indexFile}]`, e);
          });
      });

      transportationBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              params.append(`transportation_file[${index}][${indexFile}]`, e);
          });
      });

      allowanceBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              params.append(`daily_allowance_file[${index}][${indexFile}]`, e);
          });
      });

      otherBusinessTripListFile.map((e, index) => {
          e.map((e, indexFile) => {
              params.append(`other_file[${index}][${indexFile}]`, e);
          });
      });
      params.append("language", ApiPath.lang);

      let obj = {
          package_name: "hr",
          url: ApiPath.businessTripRequestSave,
          method: "post",
          params,
          headers: { "Content-Type": "multipart/form-data" },
      };
      setLoading(true);
      let response = await ApiRequest(obj);
      setLoading(false);
      // setLoading(false);
      if (response.flag === false) {
          setError(response.message);
      } else {
          setSuccess([response.data.message]);
          //set default page
          setMainTable([]);
          //set default common
          setExpenseDepartmentID("");
          if (permission != ViewPermision.ONLY_ME) {
              setEmployeeCode("");
              setEmployeeID("");
              setEmployeeName("");
              setDepartment("");
              setPosition("");
          }
          setExchangeRate("");
          setDestination("");
          setTripTypeId(1);
          setPurpose("");
          setTripPeriodFromDate(ChangeDate(new Date()));
          setTripPeriodToDate(ChangeDate(new Date()));
          setAppliedDate(ChangeDate(new Date()));
          setDueDate(ChangeDate(new Date()));
          let loadDefaultCurrencyValue = loadDefaultCurrency();
          setAirTicketBusinessTripList([]);
          setAirTicketBusinessTripListFile([]);
          setOtherBusinessTripList([]);
          setOtherBusinessTripListFile([]);
          setAllowanceBusinessTripListFile([]);
          setAllowanceBusinessTripList([]);
          setAccommodationBusinessTripList([]);
          setAccommodationBusinessTripListFile([]);
          setTransportationBusinessTripList([]);
          setTransportationBusinessTripListFile([]);
          setOtherFile([]);
          setAirTicketTotal(loadDefaultCurrencyValue);
          setAccommodationTotal(loadDefaultCurrencyValue);
          setTransportationTotal(loadDefaultCurrencyValue);
          setOtherTotal(loadDefaultCurrencyValue);
          setAllowanceTotal(loadDefaultCurrencyValue);
          setAdvancedMoney(loadDefaultCurrencyValue);
          setBudgetTotal(loadDefaultCurrencyValue);
          setTotalNotAdmin(loadDefaultCurrencyValue);
          setAirTicketTotalNotAdmin(loadDefaultCurrencyValue);
          setAccommodationTotalNotAdmin(loadDefaultCurrencyValue);
          setTransportationTotalNotAdmin(loadDefaultCurrencyValue);
          setOtherTotalNotAdmin(loadDefaultCurrencyValue);
          setApproverState("");
          setDepartmentState("");
          setPositionState("");
          setDaysTimesAllowance(
              daysBetween(ChangeDate(new Date()), ChangeDate(new Date())) + 1 <= 0
                  ? ""
                  : daysBetween(ChangeDate(new Date()), ChangeDate(new Date())) + 1
          );
          //set default Estimated Budget
          setNeedAdvanceType(0);
          setNeedAdvance(0);
          setCheckedTransportation(false);
          setCheckedOther(false);
          setcheckedAirTicket(false);
          setCheckedAllowance(false);
          setCheckedAccomodation(false);
          setError([]);
      }
  };
  return (
      <CRow className="business-trip-request modal-header-custom">
          <CCol>
              <Message error={error} success={success}></Message>
              <Loading start={loading} />
              <CCard>
                  <CCardHeader>
                      <h5 id="lblBusinessTripRequest">
                          <label>{t("Business Trip Request")}</label>
                      </h5>
                  </CCardHeader>
                  <CCardBody>
                      <CommonBusinessTripRequest
                          tripPeriodFromDate={tripPeriodFromDate}
                          tripPeriodToDate={tripPeriodToDate}
                          handleTripPeriodFromDateChange={handleTripPeriodFromDateChange}
                          handleTripPeriodToDateChange={handleTripPeriodToDateChange}
                          appliedDate={appliedDate}
                          dueDate={dueDate}
                          selectAppliedDate={selectAppliedDate}
                          selectDueDate={selectDueDate}
                          permission={permission}
                          changeAutocomplete={changeAutocomplete}
                          selectAutocomplete={selectAutocomplete}
                          idArr={idArr}
                          employeeID={employeeID}
                          codeArr={codeArr}
                          employeeCode={employeeCode}
                          nameArr={nameArr}
                          employeeName={employeeName}
                          ViewPermision={ViewPermision}
                          changePurpose={changePurpose}
                          changeExchangeRate={changeExchangeRate}
                          exchangeRate={exchangeRate}
                          changeDestination={changeDestination}
                          destination={destination}
                          selectExpenseDepartment={selectExpenseDepartment}
                          department={department}
                          expenseDepartmentID={expenseDepartmentID}
                          expenseDepartmentList={expenseDepartmentList}
                          tripTypeId={tripTypeId}
                          tripTypeList={tripTypeList}
                          changeTripType={changeTripType}
                          position={position}
                          purpose={purpose}
                          storeEditData={storeEditData}
                      ></CommonBusinessTripRequest>
                      <span className="text-danger">
                          # {t("Arrange By Admin")} :
                          {t("You cannot get this amount because of admin or company arrange/buy for you.")}
                      </span>
                      <CRow>
                          <CCol lg="12">
                              <CImg
                                  src={"avatars/list.png"}
                                  className="list-icon"
                                  width="6px"
                                  style={{ marginRight: "10px", marginBottom: "6px" }}
                              />
                              <CLabel id="lblAirTicket" className="mt-3">
                                  {t("Air Ticket")}
                              </CLabel>
                              <CCard className="table-panel table-panel-businesstrip">
                                  <CategoryBusinessTripRequest
                                      currencyList={currencyList}
                                      setError={setError}
                                      setSuccess={setSuccess}
                                      setBusinessTripList={setAirTicketBusinessTripList}
                                      businessTripList={airTicketBusinessTripList}
                                      setTotal={setAirTicketTotal}
                                      total={airTicketTotal}
                                      setCategolyTotalNotAdmin={setAirTicketTotalNotAdmin}
                                      businessTripListFile={airTicketBusinessTripListFile}
                                      setBusinessTripListFile={setAirTicketBusinessTripListFile}
                                      storeEditData={storeEditData}
                                      setDeletedAttachDetailId={setDeletedAttachDetailId}
                                      deletedAttachDetailId={deletedAttachDetailId}
                                      deletedBusinessTripDetailId={deletedBusinessTripDetailId}
                                      setDeletedBusinessTripDetailId={setDeletedBusinessTripDetailId}
                                      titleName={"Air Ticket"}
                                      nameCategory={"AirTicket"}
                                  ></CategoryBusinessTripRequest>
                              </CCard>
                          </CCol>
                          <CCol lg="12">
                              <CImg
                                  src={"avatars/list.png"}
                                  className="list-icon"
                                  width="6px"
                                  style={{ marginRight: "10px", marginBottom: "6px" }}
                              />
                              <CLabel id="lblAccommodation">{t("Accommodation")}</CLabel>
                              <CCard className="table-panel table-panel-businesstrip">
                                  <CategoryBusinessTripRequest
                                      currencyList={currencyList}
                                      setError={setError}
                                      setSuccess={setSuccess}
                                      setBusinessTripList={setAccommodationBusinessTripList}
                                      businessTripList={accommodationBusinessTripList}
                                      setTotal={setAccommodationTotal}
                                      total={accommodationTotal}
                                      setCategolyTotalNotAdmin={setAccommodationTotalNotAdmin}
                                      businessTripListFile={accommodationBusinessTripListFile}
                                      setBusinessTripListFile={setAccommodationBusinessTripListFile}
                                      storeEditData={storeEditData}
                                      setDeletedAttachDetailId={setDeletedAttachDetailId}
                                      deletedAttachDetailId={deletedAttachDetailId}
                                      deletedBusinessTripDetailId={deletedBusinessTripDetailId}
                                      setDeletedBusinessTripDetailId={setDeletedBusinessTripDetailId}
                                      titleName={"Accommodation"}
                                      nameCategory={"Accommodation"}
                                  ></CategoryBusinessTripRequest>
                              </CCard>
                          </CCol>
                          <CCol lg="12">
                              <CImg
                                  src={"avatars/list.png"}
                                  className="list-icon"
                                  width="6px"
                                  style={{ marginRight: "10px", marginBottom: "6px" }}
                              />
                              <CLabel id="lblTransportation">{t("Transportation")}</CLabel>
                              <CCard className="table-panel table-panel-businesstrip">
                                  <CategoryBusinessTripRequest
                                      currencyList={currencyList}
                                      setError={setError}
                                      setSuccess={setSuccess}
                                      setBusinessTripList={setTransportationBusinessTripList}
                                      businessTripList={transportationBusinessTripList}
                                      setTotal={setTransportationTotal}
                                      total={transportationTotal}
                                      setCategolyTotalNotAdmin={setTransportationTotalNotAdmin}
                                      businessTripListFile={transportationBusinessTripListFile}
                                      setBusinessTripListFile={setTransportationBusinessTripListFile}
                                      storeEditData={storeEditData}
                                      setDeletedAttachDetailId={setDeletedAttachDetailId}
                                      deletedAttachDetailId={deletedAttachDetailId}
                                      deletedBusinessTripDetailId={deletedBusinessTripDetailId}
                                      setDeletedBusinessTripDetailId={setDeletedBusinessTripDetailId}
                                      titleName={"Transportation"}
                                      nameCategory={"Transportation"}
                                  ></CategoryBusinessTripRequest>
                              </CCard>
                          </CCol>
                          <CCol lg="12">
                              <CImg
                                  src={"avatars/list.png"}
                                  className="list-icon"
                                  width="6px"
                                  style={{ marginRight: "10px", marginBottom: "6px" }}
                              />
                              <CLabel id="DailyAllowance">{t("Daily Allowance")}</CLabel>
                              <CCard className="table-panel table-panel-businesstrip">
                                  <AllowanceBusinessTripRequest
                                      setError={setError}
                                      setSuccess={setSuccess}
                                      setBusinessTripList={setAllowanceBusinessTripList}
                                      businessTripList={allowanceBusinessTripList}
                                      allowanceList={allowanceList}
                                      tripPeriodFromDate={tripPeriodFromDate}
                                      tripPeriodToDate={tripPeriodToDate}
                                      daysTimes={daysTimesAllowance}
                                      setDaysTimes={setDaysTimesAllowance}
                                      currencyList={currencyList}
                                      setTotal={setAllowanceTotal}
                                      total={allowanceTotal}
                                      businessTripListFile={allowanceBusinessTripListFile}
                                      setBusinessTripListFile={setAllowanceBusinessTripListFile}
                                      storeEditData={storeEditData}
                                      setDeletedAttachDetailId={setDeletedAttachDetailId}
                                      deletedAttachDetailId={deletedAttachDetailId}
                                      deletedBusinessTripDetailId={deletedBusinessTripDetailId}
                                      setDeletedBusinessTripDetailId={setDeletedBusinessTripDetailId}
                                  ></AllowanceBusinessTripRequest>
                              </CCard>
                          </CCol>
                          <CCol lg="12">
                              <CImg
                                  src={"avatars/list.png"}
                                  className="list-icon"
                                  width="6px"
                                  style={{ marginRight: "10px", marginBottom: "6px" }}
                              />
                              <CLabel id="lblOther">{t("Other")}</CLabel>
                              <CCard className="table-panel table-panel-businesstrip">
                                  <CategoryBusinessTripRequest
                                      currencyList={currencyList}
                                      setError={setError}
                                      setSuccess={setSuccess}
                                      setBusinessTripList={setOtherBusinessTripList}
                                      businessTripList={otherBusinessTripList}
                                      setTotal={setOtherTotal}
                                      total={otherTotal}
                                      setCategolyTotalNotAdmin={setOtherTotalNotAdmin}
                                      businessTripListFile={otherBusinessTripListFile}
                                      setBusinessTripListFile={setOtherBusinessTripListFile}
                                      storeEditData={storeEditData}
                                      setDeletedAttachDetailId={setDeletedAttachDetailId}
                                      deletedAttachDetailId={deletedAttachDetailId}
                                      deletedBusinessTripDetailId={deletedBusinessTripDetailId}
                                      setDeletedBusinessTripDetailId={setDeletedBusinessTripDetailId}
                                      titleName={"Other"}
                                      nameCategory={"Other"}
                                  ></CategoryBusinessTripRequest>
                              </CCard>
                          </CCol>
                      </CRow>
                      <OtherAttachementBusinessTripRequest
                          setOtherFile={setOtherFile}
                          otherFile={otherFile}
                          setError={setError}
                          setSuccess={setSuccess}
                          storeEditData={storeEditData}
                          setDeletedAttachId={setDeletedAttachId}
                          deletedAttachId={deletedAttachId}
                      ></OtherAttachementBusinessTripRequest>
                      <EstimatedBudgetBusinessTripRequest
                          changeAdvance={changeAdvance}
                          changeAdvanceType={changeAdvanceType}
                          needAdvance={needAdvance}
                          needAdvanceType={needAdvanceType}
                          airTicketTotal={airTicketTotal}
                          transportationTotal={transportationTotal}
                          accommodationTotal={accommodationTotal}
                          allowanceTotal={allowanceTotal}
                          otherTotal={otherTotal}
                          budgetTotal={budgetTotal}
                          totalNotAdmin={totalNotAdmin}
                          advancedMoney={advancedMoney}
                          changeAdvanceMoney={changeAdvanceMoney}
                          changeCheckboxAdvance={changeCheckboxAdvance}
                          checkedAccomodation={checkedAccomodation}
                          checkedAirTicket={checkedAirTicket}
                          checkedAllowance={checkedAllowance}
                          checkedOther={checkedOther}
                          checkedTransportation={checkedTransportation}
                          advanceAdditional={advanceAdditional}
                          checkShowCheckboxAirticket={checkShowCheckboxAirticket}
                          checkShowCheckboxAccomodation={checkShowCheckboxAccomodation}
                          checkShowCheckboxTransportation={checkShowCheckboxTransportation}
                          checkShowCheckboxDailyAllowance={checkShowCheckboxDailyAllowance}
                          checkShowCheckboxOther={checkShowCheckboxOther}
                      ></EstimatedBudgetBusinessTripRequest>
                      <SeachApprover
                          approverState={approverState}
                          approverChange={approverChange}
                          approverData={approverData}
                          searchApproverAPI={searchApproverAPI}
                          deleteApprover={deleteApprover}
                          mainTable={mainTable}
                          change_checkbox={change_checkbox}
                          permission={permission}
                          ViewPermision={ViewPermision}
                          employeeID={employeeID}
                          positionRank={positionRank}
                          approverSetting={approverSetting}
                      />
                      <ApproverListConfirmation
                          approverState={approverState}
                          positionState={positionState}
                          addToggleAlert={addToggleAlert}
                          addModalBox={addModalBox}
                          addOnClose={addOnClose}
                          employeeID={employeeID}
                          employeeCode={employeeCode}
                          employeeName={employeeName}
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
                      <ButtonRequestBusinessTripRequest
                          requestClick={requestClick}
                      ></ButtonRequestBusinessTripRequest>
                      {/* show model box confirm */}
                      <Confirmation
                          content={content}
                          okButton={t("Ok")}
                          cancelButton={t("Cancel")}
                          type={type}
                          show={saveModalBox}
                          cancel={() => setSaveModalBox(!saveModalBox)}
                          saveOK={saveOK}
                      />
                  </CCardBody>
              </CCard>
          </CCol>
      </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BusinessTripRequestIndex() {
  return <Welcome />;
}
