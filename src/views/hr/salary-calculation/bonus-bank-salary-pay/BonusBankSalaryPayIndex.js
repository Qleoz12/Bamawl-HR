import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CLabel,
} from "@coreui/react";
import { withTranslation } from "react-i18next";
import { ApiRequest } from "../../../brycen-common/api-request/RequestApi";
import message from "../../hr-common/common-message/CommonMessage"; // Common message
import SettingSetup from "./SettingSetup";
import {
  isEmpty,
  notAcceptCharacter,
} from "../../hr-common/common-validation/CommonValidation"; // Common validation function
import Loading from "../../../brycen-common/loading/Loading";
import Message from "../../../brycen-common/message/Message";
import Moment from "moment";
import $ from "jquery";
import { object } from "prop-types";

/**
 * Main Component
 * @author Aung Khant Kyaw
 * @create 06/08/2021
 * @modify 21/07/2021
 * @returns Web Page
 */
function LegacyWelcomeClass({ t, i18n }) {
  const [success, setSuccess] = useState([]); // for success message
  const [error, setError] = useState([]); // for error message
  const [loading, setLoading] = useState(false); // for loading
  const [selectedPaymentMonth, setSelectedPaymentMonth] = useState(new Date()); // For Payment Month
  const [empListModalShow, setEmpListModalShow] = useState(false); // for employee list modal show hide
  const [empListModalData, setEmpListModalData] = useState([]); // for employee list modal data
  const [empAllCheck, setEmpAllCheck] = useState(false); // for employee list modal all check box
  const [empAllListCheck, setEmpAllListCheck] = useState(false); // for employee list modal all check box
  const [empModalError, setEmpModalError] = useState([]); // for employee list modal error message
  const [addEmpListData, setAddEmpListData] = useState([]); // for added employee list data
  const [addEmpListDataHeader, setAddEmpListDataHeader] = useState([]); // for added employee list data header
  const [empID, setEmpID] = useState(""); // for employee id autocomplete box
  const [empIDData, setEmpIDData] = useState([]); // for employee id data for autocomplete box
  const [empCode, setEmpCode] = useState(""); // for employee code autocomplete box
  const [empCodeData, setEmpCodeData] = useState([]); // for employee code data for autocomplete box
  const [empName, setEmpName] = useState(""); // for employee name autocomplete box
  const [empNameData, setEmpNameData] = useState([]); // for employee name data for autocomplete box
  const [departmentData, setDepartmentData] = useState([]); // for department data
  const [currencyBankAccount, setCurrencyBankAccount] = useState([]); // for Currency Bank Account
  const [curBankRadio, setCurBankRadio] = useState(""); // for selected currency bank radio
  const [paymentMethod, setPaymentMethod] = useState([]); // for Payment Method
  const [paymentMethodID, setPaymentMethodID] = useState([]); // for Payment Method checked id
  const [transferMethod, setTransferMethod] = useState([]); // for Transfer Method
  const [transferMethodRadio, setTransferMethodRadio] = useState(""); // for selected currency bank radio
  const [roleAPI, setRoleAPI] = useState([]); // For Role API
  const [roleState, setRoleState] = useState(""); // For role dropdown toggle
  const [departmentAPI, setDepartmentAPI] = useState([]); // For Dept API
  const [deptState, setDeptState] = useState(""); // For department dropdown toggle
  const [rowCount, setRowCount] = useState("");
  const [rowCountModalBox, setRowCountModalBox] = useState("");
  const [showEmployeeAddError, setShowEmployeeAddError] = useState(false); // for approver add to already added data
  const [employeeAddErrorMessage, setEmployeeAddErrorMessage] = useState(""); // for approver add to already added data
  const [companyId, setCompanyId] = useState(
    localStorage.getItem("COMPANY_ID")
  );
  const [loginId, setLoginId] = useState(localStorage.getItem("LOGIN_ID"));

  /** Start Form Load */
  useEffect(() => {
    getDepartment();
    loadRole();
    loadDept();
    formLoad();
  }, []);

  let scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  /** Start get Form Load Data */
  const formLoad = async () => {
    let obj = {
      url: "api/bonus-bank-salary-pay/form-load",
      method: "get",
      params: {
        login_id: loginId,
        company_id: companyId,
      },
    };
    setLoading(true);
    let response = await ApiRequest(obj);
    if (response.flag == false) {
      // catch error
      setSuccess([]);
      setError(response.message);
      scrollTop();
      setLoading(false);
    } else {
      setCurrencyBankAccount(response.data.currency_bank_account);
      setPaymentMethod(response.data.payment_method);
      setTransferMethod(response.data.transfer_method);

      if (response.data.currency_bank_account.length === 1) {
        setCurBankRadio(response.data.currency_bank_account[0].currency_id);
      }
      if (response.data.payment_method.length === 1) {
        setPaymentMethodID([response.data.payment_method[0].bank_id]);
      } else {
        setPaymentMethodID([]);
      }
      if (response.data.transfer_method.length === 1) {
        setTransferMethodRadio(
          response.data.transfer_method[0].transfer_method
        );
      }

      setLoading(false);
    }
  };
  /** End get Form Load Data */
  /** Start get Department Function */
  const getDepartment = async () => {
    setLoading(true);
    let obj = {
      package_name: "erp",
      url: "api/department/get-all-department",
      method: "get",
    };
    let response = await ApiRequest(obj);
    response.flag === false
      ? setDepartmentData([])
      : setDepartmentData(response.data.data);
    setLoading(false);
  };
  /** End get Department Function */
  const handlePaymentMonthChange = (e) => {
    formLoad();
    setAddEmpListData([]);
    setAddEmpListDataHeader([]);
    setCurBankRadio();
    setTransferMethodRadio();
    setSelectedPaymentMonth(e);
  };

  /** Start employee list modal add button Function */
  const addBtn = async () => {
    let old_emp_id = [];
    let new_emp_id = [];
    let empData = [];
    let err = [];

    setEmpAllListCheck(false);
    setLoading(true);

    let data = empListModalData.filter((data) => data.is_checked === true);
    if (!isEmpty(data)) {
      if (!isEmpty(addEmpListData)) {
        data.map((x) => {
          new_emp_id = [
            ...new_emp_id,
            {
              employee_id: x.employee_id,
              employee_code: x.employee_code,
              employee_name: x.employee_name,
              total_amount: x.total_amount,
            },
          ];
        });
        addEmpListData.map((x) => {
          old_emp_id = [
            ...old_emp_id,
            {
              employee_id: x.employee_id,
              employee_code: x.employee_code,
              employee_name: x.employee_name,
              total_amount: x.total_amount,
            },
          ];
        });

        empData = new_emp_id
          .filter(
            (a) =>
              !old_emp_id.find((b) => a["employee_id"] === b["employee_id"])
          )
          .concat(old_emp_id);
      } else {
        data.map((x) => {
          empData = [
            ...empData,
            {
              employee_id: x.employee_id,
              employee_code: x.employee_code,
              employee_name: x.employee_name,
              total_amount: x.total_amount,
            },
          ];
        });
      }

      const empTemp = data.map((item) => {
        return item.employee_id;
      });

      const tableTemp = addEmpListData.map((item) => {
        return item.employee_id;
      });

      let found = false,
        foundID = [];
      for (let i = 0; i < empTemp.length; i++) {
        if (tableTemp.indexOf(empTemp[i]) > -1) {
          found = true;
          foundID.push(empTemp[i]);
        }
      }

      if (found) {
        let str = t("Employee ID") + " '" + foundID.join() + "' " + t("already exists!");
        setShowEmployeeAddError(true);
        setEmployeeAddErrorMessage(str);
        setLoading(false);
        document
          .querySelector(".modal-header")
          .scrollIntoView({ top: 0, left: 0, behavior: "smooth" });
      } else {
        let paymentMethodIds = [];

        paymentMethod.forEach((data) => {
          paymentMethodIds.push(data.bank_id);
        });

        let obj = {
          url: "api/bonus-bank-salary-pay/add-employee-list",
          method: "post",
          params: {
            login_id: loginId,
            company_id: companyId,
            payment_month: Moment(selectedPaymentMonth).format("YYYY-MM"),
            currency_id: curBankRadio,
            payment_method: paymentMethodIds,
            employee_list: empData, // updated data
          },
        };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
          err.push(response.message);
          setEmpModalError(err);
          const element = document.getElementById("employee-list-modal");
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          if (response.data.status == "NG") {
            err.push(response.data.message);
            setEmpModalError(err);
            const element = document.getElementById("employee-list-modal");
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            setAddEmpListData(
              response.data.table_body.sort(getSortOrder("employee_id"))
            );
            setAddEmpListDataHeader(response.data.table_header);
            setRowCount(response.data.row_count);
            empListModalClose();
            setEmpID("");
            setEmpName("");
            setEmpCode("");
            setDeptState("");
            setRoleState("");
          }
        }
      }
    } else {
      let str = t(message.JSE001).replace("%s", t("Data"));
      err.push(str);
      setEmpModalError(err);
      const element = document.getElementById("employee-list-modal");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setLoading(false);
  };
  /** End employee list modal add button Function */

  //Comparer Function
  const getSortOrder = (prop) => {
    return (a, b) => {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  };

  /** Start employee list modal close Function */
  const empListModalClose = () => {
    setEmpListModalShow(false);
    setEmpAllCheck(false);
    setEmpListModalData([]);
    setEmpID("");
    setEmpName("");
    setEmpCode("");
    setDeptState("");
    setRoleState("");
    setShowEmployeeAddError(false);
    setEmployeeAddErrorMessage("");
    document.body.style.overflow = "visible";
  };
  /** End employee list modal close Function */
  /** Start employee list modal all checkbox Function */
  let allCheckBoxChange = () => {
    let Data = empListModalData.map((data) => {
      data.is_checked = !empAllCheck;
      return data;
    });
    setEmpAllCheck(!empAllCheck);
    setEmpListModalData(Data);
  };
  /** End employee list modal all checkbox Function */
  /** Start employee list all checkbox Function */
  let allListCheckBoxChange = () => {
    //needed
    let Data = addEmpListData.map((data) => {
      data.is_check = !empAllListCheck;
      return data;
    });
    setEmpAllListCheck(!empAllListCheck);
    setAddEmpListData(Data);
  };
  /** End employee list all checkbox Function */
  /** Start employee list sub checkbox Function */
  let subListCheckboxChange = (e) => {
    let id = e.target.value;
    let data = addEmpListData.map((main) => {
      if (main.employee_id == id) {
        main.is_check = !main.is_check;
        return main;
      }
      return main;
    });
    setAddEmpListData(data);
    let flag = true;
    data.forEach((data) => {
      if (data.is_check == false) {
        flag = false;
      }
    });
    setEmpAllListCheck(flag);
  };
  /** End employee list sub checkbox Function */
  /** Start employee list modal sub checkbox Function */
  let subCheckboxChange = (e) => {
    let id = e.target.value;
    let data = empListModalData.map((main) => {
      if (main.employee_id == id) {
        main.is_checked = !main.is_checked;
        return main;
      }
      return main;
    });
    setEmpListModalData(data);
    let flag = true;
    data.forEach((data) => {
      if (data.is_checked == false) {
        flag = false;
      }
    });
    setEmpAllCheck(flag);
  };
  /** End employee list modal sub checkbox Function */
  /** Start employee list table delete button Function */
  let empListTableDeleteBtn = (e) => {
    let data = addEmpListData.filter((data) => data.employee_id !== e);
    setAddEmpListData(data);
  };
  /** End  employee list table delete button Function */
  /** Start search Function */
  let searchBtn = async () => {
    // show employee data with salary ( already salary calculated employee )
    setSuccess([]);
    setError([]);
    setLoading(true);
    setEmpModalError([]);
    setEmpListModalData([]);
    let search = {
      method: "post",
      url: "api/bonus-bank-salary-pay/search-employee-list",
      params: {
        login_id: loginId,
        company_id: companyId,
        employee_id: empID,
        employee_code: empCode,
        employee_name: empName,
        department_id: deptState,
        role_id: roleState,
        currency_id: curBankRadio,
        payment_month: Moment(selectedPaymentMonth).format("YYYY-MM"),
      },
    };
    let response = await ApiRequest(search);
    if (response.flag == false) {
      // catch error
      setLoading(false);
      setSuccess([]);
      setEmpModalError(response.message);
      const element = document.getElementById("employee-list-modal");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      if (response.data.status == "OK") {
        setRowCountModalBox(response.data.row_count);
        setEmpListModalData(response.data.data);
      } else if (response.data.status == "NG") {
        setEmpModalError([response.data.message]);
        const element = document.getElementById("employee-list-modal");
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    setLoading(false);
  };
  /** End search Function */

  let currencyBankAccOnChange = (i) => {
    let data = currencyBankAccount.map((cur) => {
      if (cur.currency_id == i.currency_id) {
        setCurBankRadio(i.currency_id);
        return cur;
      }
      return cur;
    });
    formLoad();
    if (!isEmpty(addEmpListData) && !isEmpty(addEmpListDataHeader)) {
      setAddEmpListData([]);
      setAddEmpListDataHeader([]);
      setSelectedPaymentMonth(new Date());
    }
    setTransferMethodRadio();
    setCurrencyBankAccount(data);
  };

  let paymentMethodOnChange = async (i) => {
    let checked = !i.is_checked;
    let data;
    let id_list = [];
    data = paymentMethod.map((item) =>
      item.bank_id == i.bank_id ? { ...item, is_checked: checked } : item
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        id_list.push(data[i].bank_id);
      }
    }
    setPaymentMethod(data);
    setPaymentMethodID(id_list);
    setEmpAllListCheck(false);
  };

  let transferMethodOnChange = async (i) => {
    let data = transferMethod.map((tra) => {
      if (tra.transfer_method == i.transfer_method) {
        setTransferMethodRadio(i.transfer_method);
        return tra;
      }
      return tra;
    });
    setTransferMethod(data);
    setLoading(false);
  };
  /**Start change autocomplete */
  const changeAutocomplete = async (type, i) => {
    setError([]);
    setSuccess([]);
    setDeptState("");
    setRoleState("");
    // type is id, show name in Employee ID and clear remain input
    if (type === "id") {
      setEmpID(i.target.value);
      setEmpCode("");
      setEmpName("");
    }
    // type is code, show name in Employee Code and clear remain input
    else if (type === "code") {
      setEmpID("");
      setEmpCode(i.target.value);
      setEmpName("");
    }
    // type is name, show name in Employee Name and clear remain input
    else {
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
        params: { search_item: i.target.value, company_id: companyId },
      };
      let response = await ApiRequest(obj);
      if (response.flag === false) {
        setError(response.message);
        setEmpID([]);
        setEmpName([]);
        setEmpCode([]);
      } else {
        type === "id"
          ? setEmpIDData(response.data.data)
          : type === "code"
          ? setEmpCodeData(response.data.data)
          : setEmpNameData(response.data.data);
      }
    }
  };
  /**End change autocomplete */
  /**Start select autocomplete */
  const selectAutocomplete = async (val, obj) => {
    setSuccess([]);
    setError([]);

    let object = {
      package_name: "erp",
      url: "api/employee/autocomplete-result",
      method: "post",
      params: { id: obj.id, company_id: companyId },
    };
    let response = await ApiRequest(object);
    if (response.flag === false) {
      setError(response.message);
    } else {
      if (response.data.data[0].employee_id !== null) {
        setEmpID(response.data.data[0].employee_id);
      } else {
        setEmpID("");
      }
      if (response.data.data[0].name !== null) {
        setEmpName(response.data.data[0].name);
      } else {
        setEmpName("");
      }
      if (response.data.data[0].employee_code !== null) {
        setEmpCode(response.data.data[0].employee_code);
      } else {
        setEmpCode("");
      }
    }
  };
  /**End select autocomplete */
  /** Get All Departments From Database */
  const loadDept = async () => {
    let obj = {
      package_name: "erp",
      url: "api/department/get-all-department",
      method: "get",
    };
    let response = await ApiRequest(obj);
    response.flag === false
      ? setDepartmentAPI([])
      : setDepartmentAPI(response.data.data);
    setLoading(false);
  };
  /** Get All Roles From Database */
  const loadRole = async () => {
    let obj = {
      package_name: "erp",
      url: "api/position/get-all-position",
      method: "get",
    };
    setLoading(true);
    let response = await ApiRequest(obj);
    response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
    setLoading(false);
  };
  let deptChange = (e) => {
    setDeptState(e.target.value);
  };
  let roleChange = (e) => {
    setRoleState(e.target.value);
  };

  /** Start employee list plus button Function */
  const empListPlusBtn = () => {
    setSuccess([]);
    setError([]);
    setEmpModalError([]);

    let errMsg = [];
    if (isEmpty(selectedPaymentMonth)) {
      let str = t(message.JSE001).replace("%s", t("Payment Month"));
      errMsg.push(str);
    }
    if (isEmpty(curBankRadio)) {
      let str = t(message.JSE019).replace("%s", t("Currency Bank Account"));
      errMsg.push(str);
    }
    if (isEmpty(errMsg)) {
      setEmpListModalShow(true);
      document.body.style.overflow = "hidden";
    } else {
      setError(errMsg);
      scrollTop();
    }
  };
  /** End employee list plus button Function */

  /** Start Bonus Bank Transfer Function */
  let bonusBankTransfer = async () => {
    setSuccess([]);
    setError([]);

    let errMsg = [];

    if (transferMethod.length > 1) {
      if (isEmpty(transferMethodRadio)) {
        let str = t(message.JSE019).replace("%s", t("Transfer Method"));
        errMsg.push(str);
      }
    }

    if (isEmpty(errMsg)) {
      let err = [];
      let data = addEmpListData.filter((data) => data.is_check === true);

      Object.size = (obj) => {
        let size = 0,
          key;
        for (key in obj) {
          if (obj[key].length != 0) size++;
        }
        return size;
      };

      let filtered = data.filter((item) => {
        return Object.size(item.amount_data) < 1;
      });

      if (filtered.length > 0) {
        let str = "";

        const temp = filtered.map((item) => {
          return item.employee_id;
        });

        str = t("Employee ID") + " '" + temp.join() + "' " + t("do not register in payment transfer setting");

        err.push(str);
        setError(err);
        scrollTop();
      } else {
        setLoading(true);

        if (!isEmpty(data)) {
          for (let i = 0; i < data.length; i++) {
            let diff_amount = 0;
            let employee_bank_data = [];
            let total = document.getElementById(
              `total_${data[i].employee_id}`
            ).value;
            let total_cur_amt = document.getElementById(
              `total_cur_amt_${data[i].employee_id}`
            ).value;

            if ((total != null) & (total_cur_amt != null)) {
              if (parseInt(total) > parseInt(total_cur_amt)) {
                diff_amount = parseInt(total) - parseInt(total_cur_amt);
                err = [
                  ...err,
                  t("Employee ID") + " " + data[i].employee_id + " : " + t("total amount is less than bonus amount (left amount is ") + diff_amount + ")",
                ];
              } else if (parseInt(total) < parseInt(total_cur_amt)) {
                diff_amount = parseInt(total_cur_amt) - parseInt(total);
                err = [
                  ...err,
                  t("Employee ID") + " " + data[i].employee_id + " : " + t("total amount is greater than bonus amount (greater amount is ") + diff_amount + ")",
                ];
              } else if (parseInt(total) === parseInt(total_cur_amt)) {
                employee_bank_data = [...employee_bank_data, data];
              }
            }
          }
          if (isEmpty(err)) {
            let transferMth =
              transferMethod.length === 1
                ? parseInt(transferMethod[0].transfer_method)
                : transferMethodRadio;

            let search = {
              method: "post",
              url: "api/bonus-bank-salary-pay/bonus-pay-to-bank",
              params: {
                login_id: loginId,
                company_id: companyId,
                currency_id: curBankRadio,
                payment_month: Moment(selectedPaymentMonth).format("YYYY-MM"),
                payment_method: paymentMethodID,
                transfer_method: transferMth,
                employee_bank_data: data,
              },
            };

            if (transferMth === "2") {
              search.type = "blob";
            }

            let response = await ApiRequest(search);

            if (response.flag == false) {
              // catch error
              setError(response.message);
              scrollTop();
            } else {
              if (response.data.status == "OK") {
                setSuccess([response.data.message]);
                formLoad();
                setAddEmpListData([]);
                setAddEmpListDataHeader([]);
                setCurBankRadio();
                setTransferMethodRadio();
                setSelectedPaymentMonth(new Date());
                setEmpAllListCheck(false);
                scrollTop();
              } else if (response.data.status == "NG") {
                setError(response.data.message);
                scrollTop();
              } else {
                let getHeader = response.headers["content-disposition"];
                // get only file name from getHeader variable
                let tmpName = getHeader.split("filename=")[1];
                let fileName = tmpName.replace(/['"]+/g, "");
                // generate link for blob object
                const url = window.URL.createObjectURL(
                  new Blob([response.data])
                );
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName; //or any other extension
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                formLoad();
                setAddEmpListData([]);
                setAddEmpListDataHeader([]);
                setCurBankRadio();
                setTransferMethodRadio();
                setSelectedPaymentMonth(new Date());
                setEmpAllListCheck(false);
              }
            }
          } else {
            setError(err);
            scrollTop();
          }
        } else {
          let str = t(message.JSE001).replace("%s", t("Data"));
          err.push(str);
          setError(err);
          scrollTop();
        }
        setLoading(false);
      }
    } else {
      setError(errMsg);
      scrollTop();
    }
  };
  /** End Bonus Bank Transfer Function */

  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        <Message error={error} success={success} error2={[]} />
        <CCard>
          <CCardHeader>
            <h5>
              <CLabel className="m-0">{t("Bonus Bank Salary Pay")}</CLabel>
            </h5>
          </CCardHeader>
          <CCardBody>
            <SettingSetup
              rowCount={rowCount}
              rowCountModalBox={rowCountModalBox}
              selectedPaymentMonth={selectedPaymentMonth}
              handlePaymentMonthChange={handlePaymentMonthChange}
              currencyBankAccount={currencyBankAccount}
              curBankRadio={curBankRadio}
              currencyBankAccOnChange={currencyBankAccOnChange}
              paymentMethod={paymentMethod}
              paymentMethodOnChange={paymentMethodOnChange}
              transferMethod={transferMethod}
              transferMethodRadio={transferMethodRadio}
              transferMethodOnChange={transferMethodOnChange}
              empListPlusBtn={empListPlusBtn}
              addBtn={addBtn}
              empListModalClose={empListModalClose}
              empListModalShow={empListModalShow}
              empListModalData={empListModalData}
              empAllCheck={empAllCheck}
              allCheckBoxChange={allCheckBoxChange}
              subCheckboxChange={subCheckboxChange}
              empIDData={empIDData}
              empID={empID}
              empNameData={empNameData}
              empName={empName}
              departmentData={departmentData}
              searchBtn={searchBtn}
              empModalError={empModalError}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}
              empCodeData={empCodeData}
              empCode={empCode}
              departmentAPI={departmentAPI}
              deptState={deptState}
              deptChange={deptChange}
              roleAPI={roleAPI}
              roleState={roleState}
              roleChange={roleChange}
              addEmpListData={addEmpListData}
              empListTableDeleteBtn={empListTableDeleteBtn}
              allListCheckBoxChange={allListCheckBoxChange}
              empAllListCheck={empAllListCheck}
              subListCheckboxChange={subListCheckboxChange}
              addEmpListDataHeader={addEmpListDataHeader}
              notAcceptCharacter={notAcceptCharacter}
              bonusBankTransfer={bonusBankTransfer}
              showEmployeeAddError={showEmployeeAddError}
              employeeAddErrorMessage={employeeAddErrorMessage}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
export default withTranslation()(LegacyWelcomeClass);
