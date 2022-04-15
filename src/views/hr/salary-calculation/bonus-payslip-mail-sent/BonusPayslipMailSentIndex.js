/**
 * Bonus payslip mail sent
 *
 * @author  lq_don
 * @create  02/06/2021 (D/M/Y)
 * @param
 * @return
 */
 import React, { useState, useEffect, useCallback, useRef } from "react";
 import { CCard, CCardBody, CCardHeader, CCol, CRow, CImg } from "@coreui/react";
 import { withTranslation } from "react-i18next";
 import { checkNullOrBlank } from "../../../hr/hr-common/common-validation/CommonValidation"; // Common validation function
 import BonusPayslipMailSentAdd from "./BonusPayslipMailSentAdd";
 import BonusPayslipMailSentModal from "./BonusPayslipMailSentModal";
 import BonusPayslipMailSentPaymentMonth from "./BonusPayslipMailSentPaymentMonth";
 import BonusPayslipMailSentPaymentReport from "./BonusPayslipMailSentPaymentReport";
 import BonusPayslipMailSentExport from "./BonusPayslipMailSentExport";
 import BonusPayslipMailSentTable from "./BonusPayslipMailSentTable";
 import ApiPath from "../../../brycen-common/api-path/ApiPath";
 import httpStatus from "../../../../common-const/commonStatusCode";
 import Confirmation from "../../../brycen-common/confirmation/Confirmation";
 import Loading from "../../../brycen-common/loading/Loading";
 import { ApiRequest } from "../../../brycen-common/api-request/ApiRequest";
 import Message from '../../../brycen-common/message/Message';
 import ViewPermision from "../../../brycen-common/constant/ViewPermission";
 import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
 function LegacyWelcomeClass({ t }) {
    const [error, setError]                                 = useState([]);
    const [success, setSuccess]                             = useState([]);
    const [departmentID, setDepartmentID]                   = useState(""); // for department id
    const [department, setDepartment]                       = useState([]); // for department
    const [positionID, setPositionID]                       = useState(""); // for set position id
    const [positionList, setPositionList]                   = useState([]); // for set position
    const [addModalBox, setAddModalBox]                     = useState(false); // Add confirm box show or hide
    const [errorModal, setErrorModal]                       = useState([]);// for error modal
    const [report, setReport]                               = useState(1); // for report
    const [paymentMonth, setPaymentMonth]                   = useState(ChangeDate(new Date)); // for Autocomplete EMP NAME
    const [listEmployeeModal, setListEmployeeModal]         = useState([]); // for set list employee in modal
    const [allCheck, setAllCheck]                           = useState(0); // for set all check
    const [listEmployeeTemp, setListEmployeeTemp]           = useState([]); //for set list employee Temporary
    const [listEmployee, setListEmployee]                   = useState([]); //for set list employee
    const [sendMailModalBox, setSendMailModalBox] 			= useState(false); //for show hide model send mail
    const typingTimeoutRef                                  = useRef(null); // keep value time out when rerender
    const [content, setContent]                             = useState(''); // set content show mesager
    const [type, setType]                                   = useState(''); // settype messager
    const [clearData, setClearData]                         = useState(''); //clear data in autocomplete
    const [idArr, setIdArr]                                 = useState([]); //for show array id
    const [nameArr, setNameArr]                             = useState([]); //for show array name
    const [codeArr, setCodeArr]                             = useState([]); //for show array code
    const [loading, setLoading]                             = useState(false); //for show loading
    const [employeeName, setEmployeeName]                       = useState(''); // for employee name
    const [employeeCode, setEmployeeCode]                       = useState(''); // for employee code
    const [employeeID, setEmployeeID]                           = useState(''); // for employee id
    const [permission, setPermission]                           = useState(ViewPermision.All) // for view permission
     /**
      * If error state or succes state is changed, scroll automatically to top
      *
      * @author  lq_don
      * @create  14/07/2021 (D/M/Y)
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
      * @create  14/04/2021 (D/M/Y)
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
      * @create  14/07/2021 (D/M/Y)
      * @param
      * @return
      */
     useEffect(() => {
         setLoading(true);
         loadDepartment();
         loadPosition();
        checkViewPermission();
     }, []);
    /**
    * change autocomplete
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
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

    /**
    * select autocomplete
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
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
    /**
      * Load position
      *
      * @author  lq_don
      * @create  14/04/2021 (D/M/Y)
      * @param
      * @return
      */
     const loadPosition = async()=>{
         let url = ApiPath.ERPGetAllPosition;
         let obj = { package_name: "erp", url: url, method: "get" };
         let response = await ApiRequest(obj);
         response.flag === false ? setPositionList([]) : setPositionList(response.data.data);
         setLoading(false);
     };
    /**
      * Load department
      *
      * @author  lq_don
      * @create  14/04/2021 (D/M/Y)
      * @param
      * @return
      */
     const loadDepartment = async() => {
        // let params = {
        //     company_id: ApiPath.companyID,
        //     language: ApiPath.lang
        // }
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartment([]) : setDepartment(response.data.data);
     };
    /**
      * select department
      *
      * @author  lq_don
      * @create  14/04/2021 (D/M/Y)
      * @param
      * @return
      */
     const selectDepartmentName = (e) => {
         setDepartmentID(e.target.value);
     };
    /**
      * select position
      *
      * @author  lq_don
      * @create  14/04/2021 (D/M/Y)
      * @param
      * @return
      */
     const selectPosition = (e) => {
         setPositionID(e.target.value);
     };

    /**
    * change report click
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const reportChange = (e) => {
         let checked = e.target.checked;
         let id = "";
         if (checked === true) {
             id = 2;
         } else {
             id = 1;
         }
         setReport(id);
     };

    /**
    * Mail send after click ok on form
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const mailSent = () => {
         let arrMsg = [];
         setError([]);
         setSuccess([]);
         //validation start Date
         if (!checkNullOrBlank(paymentMonth)) {
             let errMsg = t("JSE126").replace("%s", t("Payment Month"));
             arrMsg.push(errMsg);
         }
         //validation table employee list
         if (!checkNullOrBlank(listEmployee)) {
             let errMsg = t("JSE126").replace("%s", t("Employee"));
             arrMsg.push(errMsg);
         }
         if (arrMsg.length == 0) {
             //employee id to string
             if (listEmployee.length > 0)
             {
                setSendMailModalBox(!sendMailModalBox);
                setContent(t('Are you sure want to send Mail?')); setType('sendMail');
             }
             setSuccess([]);
             setError([]);
         } else {
             setSuccess([]);
             setError(arrMsg);
         }
     };
    /**
    * format date yyyy-mm
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const formatDate = (date) => {
         let d = new Date(date),
             month = "" + (d.getMonth() + 1),
             day = "" + d.getDate(),
             year = d.getFullYear();

         if (month.length < 2) month = "0" + month;

         return [year, month].join("-");
     };
     //export file
     const exportBonus  = async () => {
         let arrMsg = [];
         setError([]);
         setSuccess([]);
         //validation start Date
         if (!checkNullOrBlank(paymentMonth)) {
             let errMsg = t("JSE126").replace("%s", t("Payment Month"));
             arrMsg.push(errMsg);
         }
         //validation table employee list
         if (!checkNullOrBlank(listEmployee)) {
             let errMsg = t("JSE126").replace("%s", t("Employee"));
             arrMsg.push(errMsg);
         }
         if (arrMsg.length == 0) {
             //employee id to string
             let employeedata = [];
             if (listEmployee.length > 0)
                 for (let i of listEmployee) {
                     employeedata.push(i.employee_id);
                 }
                 let params = {
                    "company_id": ApiPath.companyID,
                    "payment_month": formatDate(paymentMonth),
                    "language": ApiPath.lang,
                    "employee_id": employeeID,
                    "employee_code": employeeCode,
                    "employee_name": employeeName,
                    "login_id": ApiPath.loginEmp,
                    "payment_transfer_report": report,
                    "department_id": departmentID,
                    "position_id": positionID,
                    "employee_id_selected_list": employeedata,
                };
                setLoading(true);
                let obj = {package_name: 'hr', url: ApiPath.BonusPayslipMailSentExport, method: 'post', params, type: "blob" };
                let response = await ApiRequest(obj);
                setLoading(false);
                if (response.flag === false) {
                    if (response.data.status === httpStatus.UNPROCESSABLE_ENTITY||response.data.status === httpStatus.OK) {
                        setError(response.message);
                    } else {
                        setError(["Something went wrong !"]);
                    }
                    setListEmployeeModal([]);
                    setSuccess([]);
                } else {
                    const isReturnFile = response.headers["content-disposition"];
                    if (isReturnFile) {
                        let fileName = response.headers["content-disposition"].split("filename=")[1];
                        const modifyFileName = fileName.slice(1, fileName.length - 1);
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", modifyFileName);
                        document.body.appendChild(link);
                        link.click();
                    }
                    else {
                        setError(response.message);
                        setSuccess([]);
                    }
                }
         } else {
             setSuccess([]);
             setError(arrMsg);
         }
     };
    /**
    * when click checkbox
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const changeCheckbox = (i) => {
         let value = i.target.value;
         let checked = i.target.checked;
         let data;
         let list = [];

         if (value === "all-check") {
             data = listEmployeeModal.map((item) => ({ ...item, is_checked: checked }));
         } else {
             data = listEmployeeModal.map((item) =>
                 item.employee_id == value ? { ...item, is_checked: checked } : item
             );
         }
         list = data.filter((i) => i.is_checked == true);
         setListEmployeeTemp(list);
         setAllCheck(data.every((item) => item.is_checked));
         setListEmployeeModal(data);
     };
     //add employee from model
     const addDataModal = () => {
         let arrMsg = [];
         setErrorModal([]);
         //validation list employee select in modal
         if (!checkNullOrBlank(listEmployeeTemp)) {
             let errMsg = t("JSE056");
             arrMsg.push(errMsg);
             setErrorModal(arrMsg);
         } else {
             let arrModel = [];
             listEmployeeTemp.map((val) => {
                 listEmployee.map((item) => {
                     if (item.employee_id == val.employee_id) {
                         let errMsg = t("JSE140").replace("%s", t(val.employee_id));
                         arrModel.push(errMsg);
                     }
                 });
             });
             if (arrModel.length > 0) {
                 setErrorModal(arrModel);
             } else {
                 setListEmployee([...listEmployee, ...listEmployeeTemp]);
                 setAllCheck(false);
                 setAddModalBox(!addModalBox);
                 setListEmployeeTemp([]);
                 setErrorModal([]);
                 setEmployeeCode("");
                 setEmployeeName("");
                 setEmployeeID("");
                 setPositionID("");
                 setDepartmentID("");
             }
         }
     };
    /**
    * search employee list
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const searchEmployeeList = async() => {
        setListEmployeeTemp([]);
        setErrorModal([]);
        let params = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "employee_code": employeeCode,
            "employee_name": employeeName,
            "payment_month": formatDate(paymentMonth),
            "language": ApiPath.lang,
            "department_id": departmentID,
            "position_id": positionID,
           }
           setLoading(true);
           let obj = {package_name: 'hr', url: ApiPath.BonusPayslipMailSentSearch, method: 'post', params };
           let response = await ApiRequest(obj);
           setLoading(false);
           if (response.flag === false) {
                // check event click search or show form
                setErrorModal(response.message);
                setListEmployeeModal([]);
                setSuccess([]);
           }
           else {
                setAllCheck(false);
                let data = response.data.data;
                setListEmployeeModal(data);
                // if (checkShowForm == true) setAddModalBox(!addModalBox);
           }
     };
    /**
    * when click search on screen
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const searchClick = () => {
         searchEmployeeList();
     };
     //close send mail form
     const closeSendMailAlert = () => {
         setSendMailModalBox(!sendMailModalBox);
     };
    /**
    * when click ok in form send mail confirmation
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const sendMailOK = async () => {
         closeSendMailAlert();
         let employeedata = [];
         if (listEmployee.length > 0)
             for (let i of listEmployee) {
                 employeedata.push(i.employee_id);
             }
             let params = {
             "company_id": ApiPath.companyID,
             "payment_month": formatDate(paymentMonth),
             "language": ApiPath.lang,
             "employee_id": employeeID,
             "employee_code": employeeCode,
             "employee_name": employeeName,
             "login_id": ApiPath.loginEmp,
             "payment_transfer_report": report,
             "department_id": departmentID,
             "position_id": positionID,
             "employee_id_selected_list": employeedata
            }
            setLoading(true);
            let obj = {package_name: 'hr', url: ApiPath.BonusPayslipMailSent, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setListEmployeeModal([]);
                setSuccess([]);
            }
            else {
                setSuccess([response.data.message]);
                setError([]);
            }
     };
    /**
    * show model add employee list
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const addToggleAlert = (e) => {
         let arrMsg = [];
         setError([]);
         setSuccess([]);
         //validation start Date
         if (!checkNullOrBlank(paymentMonth)) {
             let errMsg = t("JSE126").replace("%s", t("Payment Month"));
             arrMsg.push(errMsg);
         }
         if (arrMsg.length == 0) {
            setListEmployeeModal([]);
            setAddModalBox(!addModalBox);
        } else {
            setSuccess([]);
            setError(arrMsg);
        }
     };
     const checkViewPermission = async () => {
        setLoading(true);
        let params = {
            login_employee_id: ApiPath.loginEmp
          }
          let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
          let response = await ApiRequest(obj);
          setLoading(false);
          if (response.flag !== false) {
            setPermission(response.data.view_permission);
            if(parseInt(response.data.view_permission)===0){
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
            }
          }
    }
    /**
    * close model employee list
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const closeDataModal = () => {
         //set default search
         setEmployeeCode("");
         setEmployeeName("");
         setEmployeeID("");
         setPositionID("");
         setDepartmentID("");
         setAddModalBox(!addModalBox);
         setAllCheck(false);
         setListEmployeeTemp([]);
         setErrorModal([]);
     };
    /**
    * delete row in table employee list
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const deleteRow = (e) => {
         setListEmployee(listEmployee.filter((i) => i.employee_id != e));
     };
    /**
    * change payment month
    *
    * @author  lq_don
    * @create  14/07/2021 (D/M/Y)
    * @param
    * @return
    */
     const changePaymentMonth = (e) => {
         setPaymentMonth(e);
     };
     return (
         <CRow className="bonus-pay-slip-mail-sent">
             <CCol>
                 <Loading start={loading} />
                 <Message success={success} error={error} />
                 {/* show model box confirm */}
                 <Confirmation
                     content={content}
                     okButton={t("Ok")}
                     cancelButton={t("Cancel")}
                     type={type}
                     show={sendMailModalBox}
                     cancel={() => setSendMailModalBox(!sendMailModalBox)}
                     sendMailOK={sendMailOK}
                 />
                 <CCard className="bonusPayslipMailSent">
                     <CCardHeader>
                         <h5 id="lblBonusPayslipMailSent">{t("Mail Send For Bonus Pay Slip")}</h5>
                     </CCardHeader>
                     <CCardBody>
                         <CRow lg="12">
                             <CCol className="d-flex align-items-center flex-nowrap mb-3">
                                 <CImg className="img-title" src="avatars/list.png" alt="titleicon" />
                                 <label id="lbBonusTitle" className="ml-3 mb-0">
                                     {t("View Employee Data for Bonus Pay Slip")}
                                 </label>
                             </CCol>
                         </CRow>
                         <CCard className="mainBonus table-panel">
                             {/* show payment month */}
                             <BonusPayslipMailSentPaymentMonth
                                 paymentMonth={paymentMonth}
                                 changePaymentMonth={changePaymentMonth}
                             />
                             {/* show add employee */}
                             <BonusPayslipMailSentAdd addToggleAlert={addToggleAlert} />
                             {/* show model employee list */}
                             <BonusPayslipMailSentModal
                                 addModalBox={addModalBox}
                                 selectDepartmentName={selectDepartmentName}
                                 departmentID={departmentID}
                                 department={department}
                                 listEmployeeModal={listEmployeeModal}
                                 allCheck={allCheck}
                                 changeCheckbox={changeCheckbox}
                                 errorModal={errorModal}
                                 addDataModal={addDataModal}
                                 closeDataModal={closeDataModal}
                                 searchClick={searchClick}
                                 positionList={positionList}
                                 selectPosition={selectPosition}
                                 positionID={positionID}
                                 changeAutocomplete={changeAutocomplete}
                                 selectAutocomplete={selectAutocomplete}
                                 idArr={idArr}
                                 employeeID={employeeID}
                                 codeArr={codeArr}
                                 employeeCode={employeeCode}
                                 nameArr={nameArr}
                                 employeeName={employeeName}
                                ViewPermision={ViewPermision}
                                permission={permission}
                             />
                             {/* show table employee list */}
                             <BonusPayslipMailSentTable listEmployee={listEmployee} deleteRow={deleteRow} />
                             {/* show switch Payment Transfer Report */}
                             <BonusPayslipMailSentPaymentReport report={report} reportChange={reportChange} />
                         </CCard>
                            {/* show button send mail and export */}
                            <BonusPayslipMailSentExport mailSent={mailSent} exportBonus={exportBonus} />
                     </CCardBody>
                 </CCard>
             </CCol>
         </CRow>
     );
 }
 const Welcome = withTranslation()(LegacyWelcomeClass);
 export default function BonusPayslipMailSent() {
     return <Welcome />;
 }
