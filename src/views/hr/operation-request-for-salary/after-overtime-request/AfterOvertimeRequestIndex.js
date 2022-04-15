/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import {CCard, CCardBody, CCardHeader, CCol, CRow, CInput, CLabel, CButton, CImg, CSelect } from "@coreui/react";
import Message from "../../../brycen-common/message/Message";
import Loading from "../../../brycen-common/loading/Loading";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { withTranslation } from "react-i18next";
import $ from "jquery";
import Autocomplete from "../../../brycen-common/autocomplete/CommonAutocomplete";
import { ApiRequest } from "../../../brycen-common/api-request/RequestApi";
import { ChangeDate } from "../../hr-common/change-date/ChangeDate";
import { currentDate, isEmpty } from "../../hr-common/common-validation/CommonValidation";
import ApproverTable from "./ApproverTable";
import OvertimeRequestTable from "./OvertimeRequestTable";
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import ApproverModal from "./ApproverModal";
import OvertimeRequestModal from "./OvertimeRequestModal";
import { useHistory } from "react-router-dom";
// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory();
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [error2, setError2] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // for loading
  const [fromDate, setFromDate] = useState(currentDate); // for from date
  const [toDate, setToDate] = useState(currentDate); // for to date
  const [empID, setEmpID] = useState(""); // for employee id autocomplete box
  const [empIDData, setEmpIDData] = useState([]); // for employee id data for autocomplete box
  const [empCode, setEmpCode] = useState(""); // for employee code autocomplete box
  const [empCodeData, setEmpCodeData] = useState([]); // for employee code data for autocomplete box
  const [empName, setEmpName] = useState(""); // for employee name autocomplete box
  const [empNameData, setEmpNameData] = useState([]); // for employee name data for autocomplete box
  const [disableOrNone, setDisableOrNone] = useState(true); // true: non disable / false: disable
  const [shiftNameData, setShiftNameData] = useState([]); // for shift name data
  const [shiftName, setShiftName] = useState(""); // for shift name
  const [overtimeRate, setOvertimeRate] = useState(""); // for overtime rate
  const [overtimeRateData, setOvertimeRateData] = useState([]); // for overtime rate data
  const [inOutConfirmation, setInOutConfirmation] = useState(2); //for 1 => in , 2 => out
  const [showOvertimeRequest, setShowOvertimeRequest] = useState(false); //for show overtime request
  const [approverList, setApproverList] = useState([]); // for approver data
  const [approver, setApprover] = useState(""); // for approver dept/postition list
  const [approverData, setApproverData] = useState(""); // for approver
  const [approverResultList, setApproverResultList] = useState([]); // for approver result list
  const [approverSetting, setApproverSetting] = useState("");
  const [showApproverList, setShowApproverList] = useState(false); //for show approver data list
  const [allCheck, setAllCheck] = useState(false); //for all check/uncheck
  const [overtimeData, setOvertimeData] = useState([]); // for overtime data
  const [confirmShow, setConfirmShow] = useState(false); // for confirmation message box
  const [content, setContent] = useState(""); // for content confirmation message
  const [confirmType, setConfirmType] = useState(""); // for confirmation type
  const [confirmOTShow, setConfirmOTShow] = useState(false); // for confirmation ot limit exceed message
  const [confirmContent, setConfirmContent] = useState(""); // for ot limit exceed content confirmation message
  const [confirmOTType, setConfirmOTType] = useState("confirm"); // for confirmation type
  const [overtimeReasonShow, setOvertimeReasonShow] = useState(false); // for overtime reason modal
  const [overtimeRemark, setOvertimeRemark] = useState(""); // for overtime remark message
  const [empIdErrorMessage, setEmpIdErrorMessage] = useState(""); // for employee id error message
  const [shiftNameErrorMessage, setShiftNameErrorMessage] = useState(""); // for shift name error message
  const [overtimeRateErrorMessage, setOvertimeRateErrorMessage] = useState(""); // for overtime rate error message 
  const [remarkErrorMessage, setRemarkErrorMessage] = useState(""); // for remark message empty
  const [approverErrorMessage, setApproverErrorMessage] = useState(false); // for no approver select error message
  const [approverAddErrorMessage, setApproverAddErrorMessage] = useState(""); // for approver add to already added data
  const [showApproverAddError, setShowApproverAddError] = useState(false); // for approver add to already added data
  const [deptPosStatus, setDeptPosStatus] = useState(""); // for department or position status
  const [filteredOTData, setFilteredOTData] = useState([]); // for single overtime data from filter
  const [currency, setCurrency] = useState([]); // for currency
  const [noData, setNoData] = useState('');   // For show There is no data!
  const [companyID, setCompanyID] = useState(localStorage.getItem("COMPANY_ID")); // for session company id
  const [loginID, setLoginID] = useState(localStorage.getItem("LOGIN_ID")); // for session login id
  const [positionRank, setPositionRank] = useState(JSON.parse(localStorage.getItem("POSITION_RANK"))); // for session position rank

  /** Form Load */
  useEffect(() => {
    indexAPI();
  }, []);

  /**
   * when in/out confirmation click
   *
   * @author  Zin Min Myat
   * @create  28/07/2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
    if (inOutConfirmation === 2) {
      $("#out-ot-confirmation").addClass("in-out-ot-confirmation-css");
      $("#in-ot-confirmation").removeClass("in-out-ot-confirmation-css");
    } else {
      $("#out-ot-confirmation").removeClass("in-out-ot-confirmation-css");
      $("#in-ot-confirmation").addClass("in-out-ot-confirmation-css");
    }
  }, [inOutConfirmation]);

  /** for form load function */
  const indexAPI = async () => {
    setLoading(true);
    let obj = {
      method: "post",
      url: "api/employee-by-view-permission",
      params: {
        company_id: companyID,
        login_employee_id: loginID,
      },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      // setError(response.message);
    } else {
      let status = response.data.status;
      if (status == "OK") {
        let object = response.data.data;
        for (const property in object) {
          if (property == loginID && response.data.autocomplete === false) {
            setDisableOrNone(response.data.autocomplete);
            setEmpID(property);
            setEmpCode(object[loginID].code);
            setEmpName(object[loginID].name_eng);
            getShiftName(property, fromDate, toDate);
          }
        }
      }
    }
  };

  /** Get shift name at form load */
  const getShiftName = async (employeeID, startDate, endDate) => {
    setShiftName("");
    setShiftNameData([]);
    setOvertimeRate("");
    setOvertimeRateData([]);

    let obj = {
      method: "post",
      url: "api/after-overtime-request/get_shift_name",
      params: {
        company_id: companyID,
        employee_id: employeeID,
        from_date: startDate,
        to_date: endDate,
      },
    };

    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      let status = response.data.status;
      if (status == "OK") {
        let object = response.data.data;
        setShiftNameData(object);
      }
    }
  };

  /**Start change autocomplete */
  const changeAutocomplete = async (type, i) => {
    setError([]);
    setSuccess([]);
    
    if (type === "id") { // type is id, show name in Employee ID and clear remain input
      setEmpID(i.target.value);
      setEmpCode("");
      setEmpName("");
      setEmpIdErrorMessage("");
    } else if (type === "code") { // type is code, show name in Employee Code and clear remain input
      setEmpID("");
      setEmpCode(i.target.value);
      setEmpName("");
    } else { // type is name, show name in Employee Name and clear remain input
      setEmpID("");
      setEmpCode("");
      setEmpName(i.target.value);
    }

    // if empty, remove data from autocomplete
    if (i.target.value === "") {
      setEmpID("");
      setEmpName("");
      setEmpCode("");
    } else {
      let obj = {
        package_name: "erp",
        url: `api/employee/${type}-autocomplete-search`,
        method: "post",
        params: { search_item: i.target.value, company_id: 1 },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setSuccess([]);
        setEmpID([]);
        setEmpName([]);
        setEmpCode([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([]);
        type === "id" ? setEmpIDData(response.data.data) : type === "code" ? setEmpCodeData(response.data.data) : setEmpNameData(response.data.data);
      }
    }
  };
  /**End change autocomplete */

  /**Start select autocomplete */
  const selectAutocomplete = async (val, obj) => {
    setApproverSetting("");
    setShowOvertimeRequest(false);
    setApproverList([]);

    let object = {
      package_name: "erp",
      url: "api/employee/autocomplete-result",
      method: "post",
      params: { id: obj.id, company_id: 1 },
    };
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      setEmpIdErrorMessage("");

      if (response.data.data[0].employee_id === null) {
        setEmpID("");
      } else if (response.data.data[0].name === null) {
        setEmpName("");
      } else if (response.data.data[0].employee_code === null) {
        setEmpCode("");
      } else {
        setEmpID(response.data.data[0].employee_id);
        setEmpName(response.data.data[0].name);
        setEmpCode(response.data.data[0].employee_code);
      }

      getShiftName(response.data.data[0].employee_id, fromDate, toDate);
    }
  };
  /**End select autocomplete */

  /** Start date change Function */
  let dateChange = (date, status) => {
    if(empID === "") {
      setEmpIdErrorMessage("Please Fill Employee ID");
    } else {
      setEmpIdErrorMessage("");
      if(status === 1) {
        setFromDate(ChangeDate(date));
        getShiftName(empID, ChangeDate(date), toDate);
      } else if(status === 2) {
        setToDate(ChangeDate(date));
        getShiftName(empID, fromDate, ChangeDate(date));
      }
    }
  };
  /** End date change Function */

  /** Start shift name change Function */
  const shiftNameChange = async (shiftID) => {
    setShiftName(shiftID);
    setOvertimeRate("");
    setOvertimeRateData([]);

    let obj = {
      method: "post",
      url: "api/after-overtime-request/get_overtime_rate_name",
      params: {
        company_id: companyID,
        shift_normal_rule_id: shiftID,
      },
    };

    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      let status = response.data.status;
      if (status == "OK") {
        let object = response.data.data;
        setOvertimeRateData(object);
      }
    }
  };
  /** End shift name change Function */

  /** Start search overtime request Function */
  const searchOverTimeRequest = async () => {
    if(empID === "") {
      setEmpIdErrorMessage("Please Fill Employee ID");
    } else {
      setEmpIdErrorMessage("");
    }

    if(shiftName === "") {
      setShiftNameErrorMessage("Please Select Shift Name");
    } else {
      setShiftNameErrorMessage("");
    }

    if(overtimeRate === "") {
      setOvertimeRateErrorMessage("Please Select Overtime Rate");
    } else {
      setOvertimeRateErrorMessage("");
    }

    if(empID !== "" && shiftName !== "" && overtimeRate !== "") {
      setApproverList([]);
      setOvertimeData([]);
      setShowOvertimeRequest(false);
      setApproverData("");
      setApprover([]);
      setError("");
      setLoading(true);

      let obj = {
        method: "post",
        url: "api/after-overtime-request/search",
        params: {
          company_id: companyID,
          login_id: loginID,
          employee_id: empID,
          employee_code: empCode,
          employee_name: empName,
          from_date: fromDate,
          to_date: toDate,
          shift_normal_rule_id: shiftName,
          overtime_id: overtimeRate,
          in_out_flag: inOutConfirmation,
        },
      };

      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setNoData(response.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setNoData([]);

        let status = response.data.status;
        if (status == "OK") {
          let object = response.data.data;
          setOvertimeData(object.overtime_data);
          setCurrency(object.currencies);
          setApproverSetting(object.approver_setting);
          setShowOvertimeRequest(true);

          if(!positionRank.includes(0)) {
            if (object.approver_setting === "1" || object.approver_setting === "4" || object.approver_setting === "5") {
              getApprover();
            }
  
            if(object.approver_setting !== "1") {
              setApproverList(object.approver_data);
            }
          } else {
            setApproverList([loginID]);
          }
        }
      }
    }
  };
  /** End search overtime request Function */

  /** Start get Approver Function */
  const getApprover = async () => {
    let obj = {
      package_name: "erp",
      url: "api/approver-list",
      method: "post",
      params: { employee_id: empID, company_id: companyID, device_flag: 1 },
    };

    let response = await ApiRequest(obj);

    if (response.flag == false) {
      // catch error
      setSuccess([]);
      setError(response.message);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      if (response.data.status == "OK") {
        let temp = [];
        if (response.data.data.department != undefined) {
          if (response.data.data.department.length > 0) {
            response.data.data.department.forEach((dep) => {
              temp.push({
                id: dep.id,
                code: dep.department_code,
                name: dep.department_name,
                status: "department",
              });
            });
          }
        }
        if (response.data.data.position != undefined) {
          if (response.data.data.position.length > 0) {
            response.data.data.position.forEach((pos) => {
              temp.push({
                id: pos.id,
                code: "",
                name: pos.position_name,
                status: "position",
              });
            });
          }
          setApprover(temp);
        }
      } else if (response.data.status == "NG") {
        setSuccess([]);
        setError(response.data.message);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }
  };
  /** End get Approver Function */

  /** Start approver dropdown change Function */
  const approverDropdownChange = (e) => {
    let id = e.target.value;
    if (id !== "") {
      let dataId = id.split('');
      let status = dataId[dataId.length-1] === "1" ? "department" : "position";
      setDeptPosStatus(status);
    }

    setApproverData(id);
  };
  /** End approver dropdown change Function */

  /** Start approver modal toggle Function */
  const toggleApproverModal = () => {
    if (approverData === "") {
      setError([t('Please select Approver!')]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      setShowApproverList(true);
    }
  };
  /** End approver modal toggle Function */

  /** Start get Approver list Function */
  const getApproverList = async () => {
    if (approverData !== "") {
      setLoading(true);
      
      let params = {};
      let dataId = approverData.slice(0, -1);

      if (deptPosStatus == "department") {
        params = {
          company_id: companyID,
          employee_id: empID,
          department_id: dataId,
          position_id: "",
        };
      } else if (deptPosStatus == "position") {
        params = {
          company_id: companyID,
          employee_id: empID,
          department_id: "",
          position_id: dataId,
        };
      }

      let obj = {
        method: "post",
        url: "api/after-overtime-request/get_approver_data_on_department",
        params: params,
      };

      let response = await ApiRequest(obj);

      setLoading(false);

      if (response.flag === false) {
        setApproverAddErrorMessage(response.message[0]);
        setShowApproverAddError(true);
        document.querySelector(".modal-header").scrollIntoView({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([]);

        let status = response.data.status;
        if (status == "OK") {
          let object = response.data.approver_data;

          setApproverResultList(object)
          setShowApproverList(true);
        }
      }
    }
  };
  /** End get Approver list Function */

  /** Start handle all check Function */
  const handleAllCheck = () => {
    let isAllCheck = !allCheck;

    setAllCheck(isAllCheck);

    for(let i=0; i < approverResultList.length; i++) {
      if(isAllCheck) {
        approverResultList[i].is_checked = true;
      } else {
        approverResultList[i].is_checked = false;
      }
    }

    setApproverResultList(approverResultList)
  };
  /** End handle all check Function */

  /** Start handle approver check Function */
  const handleApproverCheck = (approverId) => {
    let checkCount = 0;

    for(let i=0; i < approverResultList.length; i++) {
      if(approverResultList[i].approver_id == approverId) {
        approverResultList[i].is_checked = !approverResultList[i].is_checked;
      }

      if(approverResultList[i].is_checked) checkCount++;
    }

    if(checkCount === approverResultList.length) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }

    setApproverResultList([...approverResultList]);
  };
  /** End handle approver check Function */

  /** Start add approver Function */
  const addApprover = () => {
    let isExist = false;
    let existedId = [];

    let data = approverResultList.filter((data) => data.is_checked === true);

    if(isEmpty(data)) {
      setApproverAddErrorMessage(t("Please select Employee!"));
      setShowApproverAddError(true);
      document.querySelector(".modal-header").scrollIntoView({ top: 0, left: 0, behavior: "smooth" });
    } else {
      for(let i=0; i < approverResultList.length; i++) {
        if(approverResultList[i].is_checked) {
          for(let j=0; j < approverList.length; j++) {
            if(approverResultList[i].approver_id === approverList[j].approver_id) {
              isExist = true;
              existedId.push(approverResultList[i].approver_id);
            }
          }
  
          if(!isExist) {
            approverList.push(approverResultList[i]);
          }
        }
      }
  
      if(isExist) {
        let str = t("Employee ID") + " '" + existedId.join() + "' " + t("already exists!");
        setApproverAddErrorMessage(t(str));
        setShowApproverAddError(true);
        document.querySelector(".modal-header").scrollIntoView({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setApproverAddErrorMessage("");
        setShowApproverAddError(false);
        setApproverResultList([]);
        setShowApproverList(false);
        setAllCheck(false);
      }
  
      setApproverList([...approverList]);
    }
  };
  /** End add approver Function */

  /** Start close approver list Function */
  const closeApproverList = () => {
    setApproverResultList([]);
    setApproverAddErrorMessage("");
    setShowApproverAddError(false);
    setShowApproverList(false);
    setAllCheck(false);
  };
  /** End close approver list Function */

  /** Start delete approver Function */
  const deleteApprover = (e) => {
    let filtered = [];

    filtered = approverList.filter(function (item) {
      return item.approver_id !== parseInt(e.target.dataset.id);
    });

    setApproverList(filtered);
  };
  /** End delete approver Function */

  /** Start request OT Function */
  const requestOT = async (e) => {
    e.preventDefault();

    let filtered = [];

    filtered = overtimeData.filter(function (item) {
      return item.Id === e.target.dataset.id;
    });

    setFilteredOTData(filtered);
    setLoading(true);

    let obj = {
      method: "post",
      url: "api/after-overtime-request/request",
      params: {
        company_id: companyID,
        login_id: loginID,
        employee_id: empID,
        overtime_date: filtered[0].overtime_date,
        shift_normal_rule_id: filtered[0].shift_normal_rule_id,
        overtime_rate_setting_id: overtimeRate,
        status: inOutConfirmation,
        update_attendance: filtered[0].update_attendance,
      },
    };

    let response = await ApiRequest(obj);

    setLoading(false);

    if (response.flag === false) {
      setError(response.message);
      setSuccess([]);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setError([]);
      let status = response.data.status;

      if (status == "OK") {
        let object = response.data;
        if (object.pop_up) {
          setConfirmOTShow(true);
          setConfirmContent(object.message);
        } else {
          setOvertimeReasonShow(true);
        }
      }
    }
  };
  /** End request OT Function */

  /** Start confirm ot limit Function */
  const confirmOTLimit = () => {
    setConfirmOTShow(false);
    setOvertimeReasonShow(true);
  };
  /** End confirm ot limit Function */

  /** Start close ot reason Function */
  const closeOvertimeRequest = () => {
    setOvertimeReasonShow(false);
    setOvertimeRemark("");
    setRemarkErrorMessage("");
    setApproverErrorMessage(false);
  };
  /** End close ot reason Function */

  /** Start save overtime request Function */
  const saveOvertimeRequest = async () => {
    if(approverList.length === 0) {
      setApproverErrorMessage(true);

      if (overtimeRemark === "") {
        setRemarkErrorMessage("Please fill remark");
      } else {
        setRemarkErrorMessage("");
      }
    } else if(overtimeRemark === "") {
      setRemarkErrorMessage("Please fill remark");
    }else {
      setApproverErrorMessage(false);
      setRemarkErrorMessage("");
      setLoading(true);

      let otAmount = [];

      if(!positionRank.includes(0)) {
        for (let i = 0; i < approverList.length; i++) {
          approverList[i].approver_email = approverList[i].email;
        }
      }

      for (let i = 0; i < currency.length; i++) {
        otAmount.push({
          currency_id: currency[i].id,
          currency_desc: currency[i].currency_desc,
          amount: filteredOTData[0].overtime_amount[i],
        });
      }

      let obj = {
        method: "post",
        url: "api/after-overtime-request/save",
        params: {
          company_id: companyID,
          login_id: loginID,
          position_rank: positionRank,
          employee_id: empID,
          employee_name: empName,
          overtime_date: filteredOTData[0].overtime_date,
          shift_normal_rule_id: filteredOTData[0].shift_normal_rule_id,
          shift_name: filteredOTData[0].shift_name,
          overtime_rate_setting_id: overtimeRate,
          overtime_hr: filteredOTData[0].real_ot_hour,
          status: inOutConfirmation,
          remark: overtimeRemark,
          update_attendance: filteredOTData[0].update_attendance,
          overtime_amount: otAmount,
          approver_data: positionRank.includes(0) ? [] : approverList,
        },
      };

      let response = await ApiRequest(obj);

      setLoading(false);

      if (response.flag === false) {
        setOvertimeReasonShow(false);
        setOvertimeRemark("");
        setError(response.message);
        setSuccess([]);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        setError([]);
        let status = response.data.status;

        if (status == "OK") {
          setOvertimeReasonShow(false);
          setOvertimeRemark("");
          setSuccess([response.data.message]);
          searchOverTimeRequest();
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
      }
    }
  };
  /** End save overtime request Function */

  /** Start in out confirmation Function */
  const inOutChange = (res) => {
    setInOutConfirmation(res);
    setEmpID(""); setEmpCode(""); setEmpName("");
    setFromDate(currentDate); setToDate(currentDate);
    setShiftName(""); setShiftNameData([]);
    setOvertimeRate(""); setOvertimeRateData([]);
    setApproverList([]); setApproverData(""); setApprover([]);
    setOvertimeData([]);
    setShowOvertimeRequest(false);
    setError([]); setSuccess([]);
    indexAPI();
  };
  /** End in out confirmation Function */

  return (
    <>
      <Loading start={loading} />
      <Message success={success} error={error} error2={error2} />
      <CCard>
        <CCardHeader>
          <h5>
            <CLabel className="m-0">{t("After Overtime Request")}</CLabel>
          </h5>
        </CCardHeader>
        <CCardBody>
          <CRow alignHorizontal="start" lg="12" style={{ marginLeft: "11px" }}>
            <CCol className="in-out-overtime-confirmation pointer" value="out" lg="3" id="out-ot-confirmation" onClick={() => inOutChange(2)}>
              <CLabel style={{ marginTop: "8px" }} className="pointer">
                {t("Out Overtime Confirmation")}
              </CLabel>
            </CCol>
            <CCol className="in-out-overtime-confirmation pointer" lg="3" value="in" id="in-ot-confirmation" onClick={() => inOutChange(1)}>
              <CLabel style={{ marginTop: "8px" }} className="pointer">
                {t("In Overtime Confirmation")}
              </CLabel>
            </CCol>
          </CRow>
          <div style={{backgroundColor: "#FCFCFC", border: "1px solid #E6E6E6", borderTopRightRadius: "10px", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", marginLeft: "10px", marginRight: "10px", }} className="">
            <CCard className="inner-card " style={{ background: "#fafbfc", borderColor: "transparent" }}>
              <CRow lg="12" style={{ marginBottom: "10px" }} className="mt-2">
                {disableOrNone == true && (
                  <>
                    <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                      <CLabel htmlFor="emp_id" className="required">
                        {t("Employee ID")}
                      </CLabel>
                      <Autocomplete onChange={(i) => changeAutocomplete("id", i)} onSelect={selectAutocomplete} items={empIDData} name={empID} />
                      {empIdErrorMessage !== "" && (
                        <p style={{margin: "0", color: "red"}}>
                          {t(empIdErrorMessage)}
                        </p>
                      )}
                    </CCol>
                    <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                      <CLabel htmlFor="emp_code">{t("Employee Code")}</CLabel>
                      <Autocomplete onChange={(i) => changeAutocomplete("code", i)} onSelect={selectAutocomplete} items={empCodeData} name={empCode} />
                    </CCol>
                    <CCol lg="4">
                      <CLabel htmlFor="emp_name">{t("Employee Name")}</CLabel>
                      <Autocomplete onChange={(i) => changeAutocomplete("name", i)} onSelect={selectAutocomplete} items={empNameData} name={empName} />
                    </CCol>
                  </>
                )}
                {disableOrNone == false && (
                  <>
                    <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                      <CLabel htmlFor="emp_id" className="required">
                        {t("Employee ID")}
                      </CLabel>
                      <CInput type="text" value={empID} className="bamawl-input" readOnly />
                    </CCol>
                    <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                      <CLabel htmlFor="emp_code">{t("Employee Code")}</CLabel>
                      <CInput type="text" value={empCode} className="bamawl-input" readOnly />
                    </CCol>
                    <CCol lg="4">
                      <CLabel htmlFor="emp_name">{t("Employee Name")}</CLabel>
                      <CInput type="text" value={empName} className="bamawl-input" readOnly />
                    </CCol>
                  </>
                )}
              </CRow>
              <CRow lg="12" style={{ marginBottom: "10px" }} className="mt-4">
                <CCol lg="5">
                  <CLabel className="required">{t("From Date")}</CLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" format="yyyy-MM-dd" value={fromDate} onChange={(date) => dateChange(date, 1)} clearable={true} InputProps={{ readOnly: true }} maxDate={toDate} />
                  </MuiPickersUtilsProvider>
                </CCol>
                <CCol lg="1" style={{ borderRight: "1px solid #E3E5F1" }}
                ></CCol>
                <CCol lg="1"></CCol>
                <CCol lg="5">
                  <CLabel className="required">{t("To Date")}</CLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker margin="normal" id="date-picker-dialog" format="yyyy-MM-dd" value={toDate} onChange={(date) => dateChange(date, 2)} clearable={true} InputProps={{ readOnly: true }} minDate={fromDate} />
                  </MuiPickersUtilsProvider>
                </CCol>
              </CRow>
              <CRow lg="12" style={{ marginBottom: "10px" }} className="mt-4">
                <CCol lg="5">
                  <CLabel htmlFor="approver_status" className="required">
                    {t("Shift Name")}
                  </CLabel>
                  <CSelect className="bamawl-select" value={shiftName} onChange={(i) => shiftNameChange(i.target.value)} custom >
                    <option key="" value="">
                      ---{t("Select Shift Name")}---
                    </option>
                    {shiftNameData.length > 0 &&
                      shiftNameData.map((i) => {
                        return (
                          <option key={i.shift_normal_rule_id} value={i.shift_normal_rule_id}>
                            {" "}{i.sn_name}{" "}
                          </option>
                        );
                      })}
                  </CSelect>
                  {shiftNameErrorMessage !== "" && (
                    <p style={{margin: "0", color: "red"}}>
                      {t(shiftNameErrorMessage)}
                    </p>
                  )}
                </CCol>
                <CCol lg="1" style={{ borderRight: "1px solid #E3E5F1" }}></CCol>
                <CCol lg="1"></CCol>
                <CCol lg="5">
                  <CLabel htmlFor="approver_status" className="required">
                    {t("Overtime Rate")}
                  </CLabel>
                  <CSelect className="bamawl-select" value={overtimeRate} onChange={(i) => setOvertimeRate(i.target.value)} custom >
                    <option key="" value="">
                      ---{t("Select Overtime Rate")}---
                    </option>
                    {overtimeRateData.length > 0 &&
                      overtimeRateData.map((i) => {
                        return (
                          <option key={i.overtime_id} value={i.overtime_id}>
                            {" "}{i.overtime_name}{" "}
                          </option>
                        );
                      })}
                  </CSelect>
                  {overtimeRateErrorMessage !== "" && (
                    <p style={{margin: "0", color: "red"}}>
                      {t(overtimeRateErrorMessage)}
                    </p>
                  )}
                </CCol>
              </CRow>
              <CRow alignHorizontal="center" className="mt-5">
                <CButton className="form-btn" onClick={searchOverTimeRequest}>
                  {t("Search")}
                </CButton>
              </CRow>
              <Confirmation show={confirmShow} content={content} type={confirmType} okButton={t("Ok")} cancel={() => setConfirmShow(false)} cancelButton={t("Cancel")} />
            </CCard>
          </div>
          
          {noData != ""  && (
            <>
              <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
              <CLabel style={{color:"red"}}>※{t(noData)}</CLabel>
              </CRow><br/>
            </>
          )}
          {showOvertimeRequest && (
            <>
            {!positionRank.includes(0) && (
              <>
                {(approverSetting === "1" || approverSetting === "4" || approverSetting === "5") && (
                  <>
                    <CRow lg="12" className="mt-5 ml-3">
                      <CCol lg="4" className="">
                        <CImg src={"/avatars/list.png"} className="" alt="titleicon" style={{ width: "5px", height: "12px", marginBottom: "2px", }} />
                        <CLabel style={{ fontWeight: "bold", marginLeft: "10px" }} >   {t("Select Approver")}
                        </CLabel>
                      </CCol>
                    </CRow>
                    <CRow lg="12" className="ml-5" style={{ backgroundColor: "#FCFCFC", border: "1px solid #E6E6E6", borderRadius: "5px", marginLeft: "10px", marginRight: "10px", paddingTop: "17px", paddingBottom: "17px",}} >
                      <CCol lg="4" className="">
                        <CSelect className="bamawl-select" custom id="approver" value={approverData} onChange={approverDropdownChange}>
                          <option key="" value="">
                            {t("---Select---")}
                          </option>
                          {approver.length > 0 &&
                            approver.map((i, index) => {
                              return (
                                <option key={index} value={i.id + (i.status === 'department' ? '1' : '2')} name={i.name}>
                                  {i.name}
                                </option>
                              );
                            })}
                        </CSelect>
                      </CCol>
                      <CCol lg="2">
                        <CButton className="form-btn" onClick={toggleApproverModal}>
                          {t("Add")}
                        </CButton>
                      </CCol>
                    </CRow>
                  </>
                )}
                <CRow lg="12" className="mt-5 ml-3">
                  <CCol lg="4" className="">
                    <CImg src={"/avatars/list.png"} className="" alt="titleicon" style={{width: "5px", height: "12px",marginBottom: "2px", }} />
                    <CLabel style={{ fontWeight: "bold", marginLeft: "10px" }}>
                      {t("Approver Data")}
                    </CLabel>
                  </CCol>
                </CRow>
                <ApproverTable data={approverList} deleteApprover={deleteApprover} approverSetting={approverSetting} />
              </>
            )}
              <CRow lg="12" className="mt-5 ml-3">
                <CCol lg="4" className="">
                  <CImg src={"/avatars/list.png"} className="" alt="titleicon" style={{width: "5px", height: "12px",marginBottom: "2px", }} />
                  <CLabel style={{ fontWeight: "bold", marginLeft: "10px" }}>
                    {t("Overtime Data List")}
                  </CLabel>
                </CCol>
              </CRow>
            <OvertimeRequestTable data={overtimeData} currency={currency} requestOT={requestOT} />
            </>
          )}
          <ApproverModal showApproverList={showApproverList} empID={empID} empCode={empCode} empName={empName} approverResultList={approverResultList} addApprover={addApprover} getApproverList={getApproverList} closeApproverList={closeApproverList} allCheck={allCheck} handleAllCheck={handleAllCheck} handleApproverCheck={handleApproverCheck} approverAddErrorMessage={approverAddErrorMessage} showApproverAddError={showApproverAddError} />
          <Confirmation show={confirmOTShow} content={confirmContent} type={confirmOTType} confirmOK={confirmOTLimit} okButton={t("Ok")} cancel={() => setConfirmOTShow(false)} cancelButton={t("Cancel")} />
          <OvertimeRequestModal overtimeReasonShow={overtimeReasonShow} overtimeRemark={overtimeRemark} overtimeRemarkChange={(val) => setOvertimeRemark(val)} remarkErrorMessage={remarkErrorMessage} saveOvertimeRequest={saveOvertimeRequest} closeOvertimeRequest={closeOvertimeRequest} approverErrorMessage={approverErrorMessage} />
        </CCardBody>
      </CCard>
    </>
  );
}

export default withTranslation()(LegacyWelcomeClass);
