/**
 * Allowance Request List
 *
 * @author  Nay Zaw Linn
 * @create  05-05-2021 (D/M/Y)
 * @param
 * @return
 */
import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Message from "../../../brycen-common/message/Message";
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import Loading from "../../../brycen-common/loading/Loading";
import FormData from "./FormData";
import { ApiRequest } from "../../../brycen-common/api-request/RequestApi";
import message from "../../hr-common/common-message/CommonMessage";
import RejectModal from "../../hr-common/reject-modal/RejectModal";
import { ChangeDate } from "../../hr-common/change-date/ChangeDate";
import { checkNullOrBlank } from "../../hr-common/common-validation/CommonValidation";
import { useHistory } from "react-router-dom";

function LegacyWelcomeClass({ t, i18n }) {
  const history = useHistory();
  const [error, setError] = useState([]);
  const [error2, setError2] = useState([]);
  const [success, setSuccess] = useState([]);
  const [callBackSearch, setCallBackSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [clearData, setClearData] = useState("");
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [startDate, setStartDate] = useState(() => ChangeDate(new Date()));
  const [endDate, setEndDate] = useState(() => ChangeDate(new Date()));
  const [allowance, setAllowance] = useState([]);
  const [allowanceID, setAllowanceID] = useState("");
  const [deptArr, setDeptArr] = useState([]);
  const [deptID, setDeptID] = useState("");
  const [appStatusArr, setAppStatusArr] = useState([]);
  const [appStatus, setAppStatus] = useState("");
  const [rowCount, setRowCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [denied_reason, setReason] = useState("");
  const [rejectError, setRejectError] = useState([]);
  const [total, setTotal] = useState(0);
  const [disableAutocomplete, setDisableAutocomplete] = useState(true);
  const [showConfirmReject, setShowConfirmReject] = useState(false);
  const [noData, setNoData]  = useState('');   // For show There is no data!

  const [loginID, setLoginID] = useState(localStorage.getItem("LOGIN_ID")); // for session login id from ERP
  const [companyID, setCompanyID] = useState(localStorage.getItem("COMPANY_ID")); // for session company id from ERP

  /**
   * page load
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("DETAIL_ID_RETURN"));
    localStorage.removeItem("DETAIL_ID_RETURN");

    if (data !== null) {
      let {
        employeeName,
        employeeCode,
        employeeID,
        startDate,
        endDate,
        allowanceID,
        deptID,
        id,
        appStatus,
        page,
      } = data;
      setEmployeeID(employeeID);
      setEmployeeCode(employeeCode);
      setEmployeeName(employeeName);
      setStartDate(startDate);
      setEndDate(endDate);
      setAllowanceID(allowanceID);
      setDeptID(deptID);
      setAppStatus(appStatus);
      setCurrentPage(page);
      indexAPI(data);
    }
    // getDepartment();
    getDepartment();
    getAllowance();
    getAppStatus();
    getPermission();
  }, []);

  const indexAPI = async (data) => {
    let {
      employeeName,
      employeeCode,
      employeeID,
      startDate,
      endDate,
      allowanceID,
      deptID,
      id,
      appStatus,
      page,
    } = data;
    setLoading(true);
    let params = {
      page,
      login_id: loginID,
      company_id: companyID,
      employee_id: employeeID,
      employee_name: employeeName,
      employee_code: employeeCode,
      start_date: startDate,
      end_date: endDate,
      sub_allowance_id: allowanceID,
      department_id: deptID,
      approver_status: appStatus,
    };
    let obj = {
      method: "post",
      url: "api/allowance-request-list/search",
      params,
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setTableData([]);setError([]);
      setNoData(response.message);
      setCurrentPage(1);
    } else {
      setNoData("");
      if (response.data.data.data.length > 0) {
        let checkApprover = response.data.data.data.filter(
          (tableData) => tableData.is_approver
        );

        checkApprover.length > 0
          ? setShowConfirmReject(true)
          : setShowConfirmReject(false);
        setRowCount(response.data.row_count);
        setTableData(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        let subtract_page = page - 1;
        if (subtract_page !== 0) {
          search_api(subtract_page);
        }
      }
    }
  };

  /**
   * get view permission
   *
   * @author  Nay Zaw Linn
   * @create  15/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const getPermission = async () => {
    let obj = {
      url: "api/employee-by-view-permission",
      method: "post",
      params: {
        company_id: companyID,
        login_employee_id: loginID,
      },
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError(response.message);
    } else {
      let object = response.data.data;
      for (const property in object) {
        if (property == loginID && response.data.autocomplete === false) {
          setDisableAutocomplete(response.data.autocomplete);
          setEmployeeID(property);
          setEmployeeCode(object[loginID].code);
          setEmployeeName(object[loginID].name_eng);
        }
      }
    }
  };

  /**
   * If error or succes is changed, scroll automatically to top
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
    if (error.length > 0 || success.length > 0 || error2.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [error, success, error2]);

  /**
   * If clearData is changed, remove array in autocomplete
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
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
   * get department
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const getDepartment = async () => {
    let obj = {
      package_name: "erp",
      url: "api/department/get-all-department",
      method: "get",
    };
    let response = await ApiRequest(obj);
    response.flag === false ? setDeptArr([]) : setDeptArr(response.data.data);
  };

  /**
   * get allowance
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const getAllowance = async () => {
    let obj = {
      url: "api/sub-allowance-list",
      method: "post",
      params: { company_id: companyID },
    };
    let response = await ApiRequest(obj);
    response.flag === false
      ? setAllowance([])
      : setAllowance(response.data.data);
  };

  /**
   * get approver status
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const getAppStatus = async () => {
    let obj = {
      url: "api/allowance-request-list/approver-status",
      method: "get",
      params: { login_id: loginID, company_id: companyID },
    };
    let response = await ApiRequest(obj);
    response.flag === false
      ? setAppStatusArr([])
      : setAppStatusArr(response.data.data);
  };

  /**
   * change autocomplete
   *
   * @author  Nay Zaw Linn
   * @create  27/04/2021 (D/M/Y)
   * @param
   * @return
   */
  const changeAutocomplete = async (type, i) => {
    setError([]);
    setSuccess([]);
    setError2([]);
    setClearData("");

    // type is id, show name in Employee ID and clear remain input
    if (type === "id") {
      setEmployeeID(i.target.value);
      setEmployeeCode("");
      setEmployeeName("");
    }
    // type is code, show name in Employee Code and clear remain input
    else if (type === "code") {
      setEmployeeID("");
      setEmployeeCode(i.target.value);
      setEmployeeName("");
    }
    // type is name, show name in Employee Name and clear remain input
    else {
      setEmployeeID("");
      setEmployeeCode("");
      setEmployeeName(i.target.value);
    }

    // if empty, remove data from autocomplete
    if (i.target.value === "") {
      setClearData("clear");
    } else {
      let obj = {
        package_name: "erp",
        url: `api/employee/${type}-autocomplete-search`,
        method: "post",
        params: { search_item: i.target.value, company_id: companyID },
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
   * @author  Nay Zaw Linn
   * @create  27/04/2021 (D/M/Y)
   * @param
   * @return
   */
  const selectAutocomplete = async (val, obj) => {
    setClearData("clear");
    setLoading(true);
    let object = {
      package_name: "erp",
      url: "api/employee/autocomplete-result",
      method: "post",
      params: { id: obj.id, company_id: companyID },
    };
    let response = await ApiRequest(object);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      setEmployeeID(response.data.data[0].employee_id);
      setEmployeeName(response.data.data[0].name);
      setEmployeeCode(response.data.data[0].employee_code);
    }
  };

  /**
   * checkbox in table
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const checkboxChanged = (i) => {
    let [value, flag] = i.target.value.split(",");
    let checked = i.target.checked;
    let data,
      id_list = [],
      temp = [];

    if (flag === "false") {
      // confirm/reject condition
      if (value === "allcheck") {
        data = tableData.map((item) =>
          item.is_approver === true ? { ...item, is_checked: checked } : item
        );
        setAllChecked(checked);
      } else {
        data = tableData.map((item) => {
          if (item.allowance_request_id === parseInt(value)) {
            temp.push({ ...item, is_checked: checked });
            return { ...item, is_checked: checked };
          } else {
            if (item.is_approver === true) temp.push({ ...item });
            return item;
          }
        });
        setAllChecked(temp.every((item) => item.is_checked));
      }
    } else {
      // delete condition
      if (value === "allcheck") {
        data = tableData.map((item) =>
          item.can_delete === true ? { ...item, is_checked: checked } : item
        );
        setAllChecked(checked);
      } else {
        data = tableData.map((item) => {
          if (item.allowance_request_id === parseInt(value)) {
            temp.push({ ...item, is_checked: checked });
            return { ...item, is_checked: checked };
          } else {
            if (item.can_delete === true) temp.push({ ...item });
            return item;
          }
        });
        setAllChecked(temp.every((item) => item.is_checked));
      }
    }
    setTableData(data);
  };

  /**
   * common function for confirm api (or) delete api
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const confirmDelete = async (flag) => {
    let id_list = [],
      allowance_request_id;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].is_checked === true) {
        id_list.push(tableData[i].allowance_request_id);
      }
    }
    allowance_request_id = id_list.toString();
    setType("");
    setContent("");
    setShow(!show);

    let params = {
      login_id: loginID,
      company_id: companyID,
      allowance_request_id,
      login_form: "Allowance Request List",
    };
    let obj = { method: "post", url: `api/allowance-request/${flag}`, params };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
      setError2(response.message);
    } else {
      setSuccess([response.data.message]);
    }
    search_api(currentPage);
  };

  /**
   * click confirm button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const confirm = () => {
    setError([]);
    setSuccess([]);
    setError2([]);
    let id_list = [],
      allowance_request_id;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].is_checked === true) {
        id_list.push(tableData[i].allowance_request_id);
      }
    }

    if (id_list.length > 0) {
      setType("save");
      setContent(t("Are you sure want to confirm?"));
      setShow(!show);
    } else {
      let errMsg = t(message.JSE001).replace(
        "%s",
        t("the checkbox you want to confirm")
      );
      setError([errMsg]);
    }
  };

  /**
   * confirm action for confirm button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const confirmOK = () => {
    confirmDelete("confirm");
  };

  /**
   * click reject button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const reject = () => {
    setError([]);
    setSuccess([]);
    setError2([]);
    setReason("");
    setOpen(!open);
    setRejectError([]);
  };

  /**
   * confirm action for reject button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const rejectOK = async () => {
    if (!checkNullOrBlank(denied_reason)) {
      setRejectError([t(message.JSE005).replace("%s", t("Reason"))]);
    } else {
      setOpen(!open);
      setLoading(true);

      let id_list = [],
        allowance_request_id;
      for (let i = 0; i < tableData.length; i++) {
        if (tableData[i].is_checked === true) {
          id_list.push(tableData[i].allowance_request_id);
        }
      }
      allowance_request_id = id_list.toString();
      let obj = {
        method: "post",
        url: `api/allowance-request/reject`,
        params: {
          allowance_request_id,
          login_id: loginID,
          company_id: companyID,
          denied_reason,
          login_form: "Allowance Request List",
        },
      };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
      } else {
        setSuccess([response.data.message]);
      }
      search_api();
    }
  };

  /**
   * Show/Hide flag for delete button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const changeShowDeleteButton = (i) => {
    let data = tableData.map((item) => ({ ...item, is_checked: false }));
    setAllChecked(false);
    setTableData(data);
    setDeleteFlag(i.target.checked);
  };

  /**
   * click delete button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const clickDelete = () => {
    setError([]);
    setSuccess([]);
    setError2([]);

    let id_list = [],
      allowance_request_id;
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].is_checked === true) {
        id_list.push(tableData[i].allowance_request_id);
      }
    }

    if (id_list.length > 0) {
      setType("delete");
      setContent(t("Are you sure want to delete?"));
      setShow(!show);
    } else {
      let errMsg = t(message.JSE001).replace(
        "%s",
        t("the checkbox you want to delete")
      );
      setError([errMsg]);
    }
  };

  /**
   * confirm action for delete button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const deleteOK = () => {
    confirmDelete("delete");
  };

  /**
   * click search button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const search = () => {
    setError([]);
    setSuccess([]);
    setError2([]);
    search_api(1);
  };

  /**
   * search api
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const search_api = async (page) => {
    setAllChecked(false);
    setLoading(true);
    let params = {
      page,
      login_id: loginID,
      company_id: companyID,
      employee_id: employeeID,
      employee_name: employeeName,
      employee_code: employeeCode,
      start_date: startDate,
      end_date: endDate,
      sub_allowance_id: allowanceID,
      department_id: deptID,
      approver_status: appStatus,
    };
    let obj = {
      method: "post",
      url: "api/allowance-request-list/search",
      params,
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setTableData([]);setError([]);
      setNoData(response.message);
      setCurrentPage(1);
    } else {
      setNoData('');
      if (response.data.data.data.length > 0) {
        let checkApprover = response.data.data.data.filter(
          (tableData) => tableData.is_approver
        );

        checkApprover.length > 0
          ? setShowConfirmReject(true)
          : setShowConfirmReject(false);

        setRowCount(response.data.row_count);
        setTableData(response.data.data.data);
        setCurrentPage(response.data.data.current_page);
        setLastPage(response.data.data.last_page);
        setTotal(response.data.data.total);
      } else {
        let subtract_page = page - 1;
        if (subtract_page !== 0) {
          search_api(subtract_page);
        }
      }
    }
  };

  /**
   * click detail button
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const detail = (i) => {
    let obj = {
      employeeName,
      employeeCode,
      employeeID,
      startDate,
      endDate,
      allowanceID,
      deptID,
      appStatus,
      id: i.allowance_request_id,
      page: currentPage,
    };
    // console.log('asdfasdfasdfi', i);
    // console.log('obj', obj);
    // return false;
    localStorage.setItem("DETAIL_ID", JSON.stringify(obj));
    let customer_name = window.location.href.split("/")[3];
    history.push(
      `/${customer_name}/hr/operation-request-for-attendance/allowance-request-detail-information`
    );
  };

  /**
   * click pagination
   *
   * @author  Nay Zaw Linn
   * @create  05-05-2021 (D/M/Y)
   * @param
   * @return
   */
  const changePaginate = (page) => {
    setCurrentPage(page);
    setError([]);
    setSuccess([]);
    search_api(page);
  };

  return (
    <>
      <Loading start={loading} />
      <Message success={success} error={error} error2={error2} />
      <RejectModal
        open={open}
        close={reject}
        value={denied_reason}
        change={(i) => setReason(i.target.value)}
        error={rejectError}
        save={rejectOK}
      />
      <Confirmation
        content={content}
        okButton={t("Ok")}
        cancelButton={t("Cancel")}
        type={type}
        show={show}
        cancel={() => setShow(!show)}
        saveOK={confirmOK}
        deleteOK={deleteOK}
      />
      <FormData
        // autocomplete
        empID={employeeID}
        empName={employeeName}
        empCode={employeeCode}
        changeAutocomplete={changeAutocomplete}
        selectAutocomplete={selectAutocomplete}
        idArr={idArr}
        nameArr={nameArr}
        codeArr={codeArr}
        disableAutocomplete={disableAutocomplete}
        // start date & end date
        startDate={startDate}
        endDate={endDate}
        changeStartDate={(i) => {
          setStartDate(ChangeDate(i));
          if (ChangeDate(i) > endDate) setEndDate(null);
        }}
        changeEndDate={(i) => setEndDate(ChangeDate(i))}
        // allowance name
        allowance={allowance}
        changeAllowance={(i) => setAllowanceID(i.target.value)}
        allowanceID={allowanceID}
        // department name
        deptArr={deptArr}
        changeDept={(i) => setDeptID(i.target.value)}
        deptID={deptID}
        // approver status
        appStatusArr={appStatusArr}
        changeAppStatus={(i) => setAppStatus(i.target.value)}
        appStatus={appStatus}
        // search button
        search={search} noData={noData}
        // table
        tableData={tableData}
        total={total}
        rowCount={rowCount}
        currentPage={currentPage}
        lastPage={lastPage}
        changeShowDeleteButton={changeShowDeleteButton}
        deleteFlag={deleteFlag}
        checkboxChanged={checkboxChanged}
        allChecked={allChecked}
        detail={detail}
        changePaginate={changePaginate}
        // confirm, reject, delete button
        confirm={confirm}
        reject={reject}
        delete={clickDelete}
        showConfirmReject={showConfirmReject}
      />
    </>
  );
}
export default withTranslation()(LegacyWelcomeClass);