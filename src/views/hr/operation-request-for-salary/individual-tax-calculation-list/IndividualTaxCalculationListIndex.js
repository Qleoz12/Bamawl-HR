/**
 * Individual Tax Calculation List
 *
 * @author  Nay Zaw Linn
 * @create  14/07/2021 (D/M/Y)
 * @param
 * @return
 */
import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import Message from "../../../brycen-common/message/Message";
import Loading from "../../../brycen-common/loading/Loading";
import FormData from "./FormData";
import { ApiRequest } from "../../../brycen-common/api-request/RequestApi";
import { ChangeDate } from "../../hr-common/change-date/ChangeDate";
import message from "../../hr-common/common-message/CommonMessage";
import { checkNullOrBlank } from "../../hr-common/common-validation/CommonValidation";
import Moment from "moment";

function LegacyWelcomeClass({ t, i18n }) {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deptArr, setDeptArr] = useState([]);
  const [deptID, setDeptID] = useState("");
  const [month, setMonth] = useState(() => ChangeDate(new Date()));

  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [clearData, setClearData] = useState("");

  // const [login_id, setLoginID] = useState(20002);
  // const [company_id, setCompanyID] = useState(1);
  const [disableAutocomplete, setDisableAutocomplete] = useState(true);
  const [view, setView] = useState("0"); // pdf - 0, excel - 1
  const [language, setLanguage] = useState("en");

  const [company_id, setCompanyID] = useState(
    localStorage.getItem("COMPANY_ID")
  ); // for session company id
  const [login_id, setLoginID] = useState(localStorage.getItem("LOGIN_ID")); // for session login id
  const [departmentID, setDepartmentID] = useState(
    localStorage.getItem("DEPARTMENT_ID")
  ); // for session department id
  const [positionID, setPositionID] = useState(
    localStorage.getItem("POSITION_ID")
  ); // for session position id
  const [positionRank, setPositionRank] = useState(
    localStorage.getItem("POSITION_RANK")
  ); // for session position rank

  /**
   * page load
   *
   * @author  Nay Zaw Linn
   * @create  21/06/2021 (D/M/Y)
   * @param
   * @return
   */
  useEffect(() => {
    getPermission();
  }, []);

  /**
   * get view permission
   *
   * @author  Nay Zaw Linn
   * @create  15/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const getPermission = async () => {
    setLoading(true);
    let obj = {
      url: "api/individual-tax-calculations/index",
      method: "get",
      params: { company_id, login_id, language },
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      let object = response.data.data;
      setView(response.data.view);
      for (const property in object) {
        if (property == login_id && response.data.autocomplete === false) {
          setDisableAutocomplete(response.data.autocomplete);
          setEmployeeID(property);
          setEmployeeCode(object[login_id].code);
          setEmployeeName(object[login_id].name_eng);
        }
      }

      if (response.data.autocomplete) {
        getDepartment();
      } else {
        setDeptArr(object[login_id].departments);
      }
    }
  };

  /**
   * If error or succes is changed, scroll automatically to top
   *
   * @author  Nay Zaw Linn
   * @create  21/06/2021 (D/M/Y)
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
   * @author  Nay Zaw Linn
   * @create  08/06/2021 (D/M/Y)
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
   * get department data from API
   *
   * @author  Nay Zaw Linn
   * @create  21/06/2021 (D/M/Y)
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
   * change autocomplete
   *
   * @author  Nay Zaw Linn
   * @create  08/06/2021 (D/M/Y)
   * @param
   * @return
   */
  const changeAutocomplete = async (type, i) => {
    setError([]);
    setSuccess([]);
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
        params: { search_item: i.target.value, company_id },
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
   * @create  08/06/2021 (D/M/Y)
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
      params: { id: obj.id, company_id },
    };
    let response = await ApiRequest(object);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    } else {
      if (response.data.data[0].employee_id !== null) {
        setEmployeeID(response.data.data[0].employee_id);
      } else {
        setEmployeeID("");
      }
      if (response.data.data[0].name !== null) {
        setEmployeeName(response.data.data[0].name);
      } else {
        setEmployeeName("");
      }
      if (response.data.data[0].employee_code !== null) {
        setEmployeeCode(response.data.data[0].employee_code);
      } else {
        setEmployeeCode("");
      }
    }
  };

  /**
   * excel download button
   *
   * @author  Nay Zaw Linn
   * @create  14/07/2021 (D/M/Y)
   * @param
   * @return
   */
  const download = async () => {
    setError([]);
    setSuccess([]);

    if (!checkNullOrBlank(month)) {
      let errMsg = t(message.JSE019).replace("%s", t("Month"));
      setError([errMsg]);
    } else {
      setLoading(true);
      let obj = {
        method: "post",
        url: "api/individual-tax-calculations/download",
        params: {
          login_id,
          company_id,
          employee_id: employeeID,
          employee_name: employeeName,
          employee_code: employeeCode,
          search_month: Moment(month).format("YYYY-MM"),
          department_id: deptID,
          view,
        },
        type: "blob",
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
      } else {
        let getHeader = response.headers["content-disposition"];
        // get only file name from getHeader variable
        let tmpName = getHeader.split("filename=")[1];
        let fileName = tmpName.replace(/['"]+/g, "");
        // generate link for blob object
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName; //or any other extension
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Loading start={loading} />
      <Message success={success} error={error} error2={[]} />

      <FormData
        changeAutocomplete={changeAutocomplete}
        selectAutocomplete={selectAutocomplete}
        empID={employeeID}
        empName={employeeName}
        empCode={employeeCode}
        idArr={idArr}
        nameArr={nameArr}
        codeArr={codeArr}
        disableAutocomplete={disableAutocomplete}
        deptArr={deptArr}
        changeDept={(i) => setDeptID(i.target.value)}
        deptID={deptID}
        month={month}
        changeMonth={(i) => setMonth(i)}
        download={download}
        view={view}
      />
    </>
  );
}

export default withTranslation()(LegacyWelcomeClass);
