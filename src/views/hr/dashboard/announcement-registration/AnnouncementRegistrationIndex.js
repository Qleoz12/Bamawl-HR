/**
 * Announcement Registration
 *
 * @author  Nay Zaw Linn
 * @create  24/05/2021 (D/M/Y)
 * @param
 * @return
 */
import React, { useState, useEffect, useCallback } from "react";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import {
    CCard,
    CCardBody,
    CButton,
    CCardHeader,
    CForm,
    CRow,
    CCol,
    CImg,
    CLabel,
} from "@coreui/react";
import { ChangeDate } from "../../hr-common/change-date/ChangeDate";
import Message from "../../../brycen-common/message/Message";
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import Loading from "../../../brycen-common/loading/Loading";
import { ApiRequest } from "../../../brycen-common/api-request/RequestApi";
import ChooseAnnouncement from "./ChooseAnnouncement";
import Department from "./Department";
import EmployeeIDName from "./EmployeeIDName";
import PositionComponent from "./Position";
import FormInput from "./FormInput";
import {
    checkNullOrBlank,
    formatDate,
} from "../../hr-common/common-validation/CommonValidation";
import message from "../../hr-common/common-message/CommonMessage";
import Moment from "moment";
import { tr } from "date-fns/locale";

function LegacyWelcomeClass({ t, i18n }) {
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
    const [criteria, setCriteria] = useState();
    const [fromDate, setFromDate] = useState(() => ChangeDate(new Date()));
    const [toDate, setToDate] = useState(() => ChangeDate(new Date()));
    const [currentDate, setCurrentDate] = useState(
        Moment(new Date()).format("YYYY-MM-DD")
    );
    const [announceTitle, setAnnounceTitle] = useState("");
    const [announceDesc, setAnnounceDesc] = useState("");
    const [posArr, setPosArr] = useState([]);
    const [posID, setPosID] = useState("");
    const [dept, setDept] = useState([]);
    const [clearData, setClearData] = useState("");
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [deptMsg, setDeptMsg] = useState("");
    const [editID, setEditID] = useState("");

    // const [login_id, setLoginID] = useState(20001);
    // const [company_id, setCompanyID] = useState(2);
    const [disableAutocomplete, setDisableAutocomplete] = useState(true);

    const [ loginID, setLoginID ] = useState(localStorage.getItem('LOGIN_ID')); // for session login id from ERP
    const [ companyID, setCompanyID ] = useState(localStorage.getItem('COMPANY_ID')); // for session company id from ERP
    const [departmentID, setDepartmentID] = useState(
        JSON.parse(localStorage.getItem("DEPARTMENT_ID"))
    ); // for session department id from ERP
    const [positionID, setPositionID] = useState(
        localStorage.getItem("POSITION_ID")
    ); // for session position id from ERP
    const [positionRank, setPositionRank] = useState(
        localStorage.getItem("POSITION_RANK")
    ); // for session position rank

    /**
     * Page Load
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
     * @param
     * @return
     */
    useEffect(() => {
        let id = JSON.parse(localStorage.getItem("ANNOUNCEMENT_ID"));
        localStorage.removeItem("ANNOUNCEMENT_ID");
        id === "" || id === null ? setCriteria(1) : get_edit_data(id);
        get_position();
        get_department();
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
            // setError(response.message);
        } else {
            let object = response.data.data;
            for (const property in object) {
                if (
                    property == loginID &&
                    response.data.autocomplete === false
                ) {
                    setDisableAutocomplete(response.data.autocomplete);
                    setEmployeeID(property);
                    setEmployeeCode(object[loginID].code);
                    setEmployeeName(object[loginID].name_eng);
                }
            }
        }
    };

    /**
     * If error state or succes state is changed, scroll automatically to top
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
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
     * @create  27/04/2021 (D/M/Y)
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
     * Choose option to announce
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
     * @param
     * @return
     */
    const change_announcement = (i) => {
        if (editID === "") {
            setCriteria(parseInt(i.target.value));
            setError([]);
            setSuccess([]);
            setPosID("");
            setEmployeeID("");
            setEmployeeCode("");
            setEmployeeName("");
            setChecked([]);
        }
    };

    /**
     * Get data to edit
     *
     * @author  Nay Zaw Linn
     * @create  14/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const get_edit_data = async (id) => {
        setLoading(true);
        setEditID(id);
        let obj = {
            url: `api/announcement/${id}`,
            method: "get",
            params: { login_id: loginID },
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setCriteria(response.data.data.announcement_criteria.criteria);

            let temp_emp = response.data.data.announcement_employee,
                arr = [];
            let { employee_id, employee_name, employee_code, position_id } =
                temp_emp[0];

            if (response.data.data.announcement_criteria.criteria === "1") {
                temp_emp.forEach((item, i) => {
                    arr.push(item.department_id);
                });
                setChecked(arr);
            }
            if (response.data.data.announcement_criteria.criteria === "2") {
                setEmployeeID(employee_id);
                setEmployeeCode(employee_code);
                setEmployeeName(employee_name);
            }
            if (response.data.data.announcement_criteria.criteria === "3") {
                setPosID(position_id);
            }
            let temp_from_date = response.data.data.announcement_from_date;
            let temp_to_date = response.data.data.announcement_to_date;
            let fdate = temp_from_date.slice(0, 10),
                todate = temp_to_date.slice(0, 10);

            setFromDate(fdate);
            setToDate(todate);
            setAnnounceTitle(response.data.data.announcement_title);
            setAnnounceDesc(response.data.data.announcement_description);
        }
    };

    /**
     * Get department data from ERP API for tree structure
     *
     * @author  Nay Zaw Linn
     * @create  08/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const get_department = async () => {
        setLoading(true);
        let obj = {
            package_name: "erp",
            url: "api/department/department_tree",
            method: "get",
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setDeptMsg(response.message);
        } else {
            setDept(response.data.data);
            setExpanded(response.data.total_id);
        }
    };

    /**
     * Get position data from ERP API for dropdown
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
     * @param
     * @return
     */
    const get_position = async () => {
        let obj = {
            package_name: "erp",
            url: "api/position/get-all-position",
            method: "get",
        };
        let response = await ApiRequest(obj);
        response.flag === false ? setPosArr([]) : setPosArr(response.data.data);
    };

    /**
     * change autocomplete
     *
     * @author  Nay Zaw Linn
     * @create  01/06/2021 (D/M/Y)
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
     * @create  01/06/2021 (D/M/Y)
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
     * Click save button and validate
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
     * @param
     * @return
     */
    const click_save = () => {
        let err = [];
        setError([]);
        setSuccess([]);
        // criteria is 1(Department)
        if (criteria == "1") {
            // if not choose department, store error message
            if (!checkNullOrBlank(checked)) {
                err.push(t(message.JSE019).replace("%s", t("Department List")));
            }
        }
        // criteria is 2(Employee ID and Name)
        else if (criteria == "2") {
            // if null or blank, store error message
            if (!checkNullOrBlank(employeeID)) {
                err.push(t(message.JSE005).replace("%s", t("Employee ID")));
            }
            // if null or blank, store error message
            if (!checkNullOrBlank(employeeCode)) {
                err.push(t(message.JSE005).replace("%s", t("Employee Code")));
            }
            // if null or blank, store error message
            if (!checkNullOrBlank(employeeName)) {
                err.push(t(message.JSE005).replace("%s", t("Employee Name")));
            }
        }
        // criteria is 3(Position)
        else if (criteria == "3") {
            // if null or blank, store error message
            if (!checkNullOrBlank(posID)) {
                err.push(t(message.JSE001).replace("%s", t("Position")));
            }
            // if null or blank, store error message
            if (!checkNullOrBlank(fromDate)) {
                err.push(t(message.JSE019).replace("%s", t("From Date")));
            }
            // if null or blank, store error message
            if (!checkNullOrBlank(toDate)) {
                err.push(t(message.JSE019).replace("%s", t("To Date")));
            }
        }

        // if null or blank, store error message
        if (!checkNullOrBlank(announceTitle)) {
            err.push(t(message.JSE005).replace("%s", t("Announce Title")));
        }
        // if null or blank, store error message
        if (!checkNullOrBlank(announceDesc)) {
            err.push(
                t(message.JSE005).replace("%s", t("Announce Description"))
            );
        }

        // if stored error is exist, show error message
        if (err.length > 0) {
            setError(err);
        }
        // show confirmation box to save
        else {
            setContent(t("Are you sure want to save?"));
            setType("save");
            setShow(!show);
        }
    };

    // Get checked id with it parent nodes id
    let getAllCheckId = (inputId, childArray) => {
        if (!childArray) {
            return;
        }
        for (const parent of childArray) {
            if (parent.value === inputId) {
                return [parent.value];
            } else {
                let res = getAllCheckId(inputId, parent.children);
                if (res) {
                    res.push(parent.value);
                    return res;
                }
            }
        }
        return;
    };

    // Trim partially checked id
    let trimCheckList = (parentArray, childArray) => {
        let res = [];
        let isSomeCheck = false;

        for (const parent of parentArray) {
            res.push(parent.value);

            if (parent.children !== null) {
                for(let i=0; i < parent.children.length; i++) {
                    if(!childArray.includes(parseInt(parent.children[i].value))) {
                        isSomeCheck = true;
                        break;
                    }
                }

                if (isSomeCheck) {
                    res.pop();
                }

                isSomeCheck = false;

                for (const parent2 of parent.children) {
                    res.push(parent2.value);

                    if (parent2.children !== null) {
                        for(let i=0; i < parent2.children.length; i++) {
                            if(!childArray.includes(parseInt(parent2.children[i].value))) {
                                isSomeCheck = true;
                                break;
                            }
                        }

                        if (isSomeCheck) {
                            res.pop();

                            for (var i = 0; i < res.length; i++) {
                                if (res[i] == parseInt(parent.value)) {
                                    res.splice(i, 1);
                                }
                            }
                        }

                        isSomeCheck = false;

                        for (const parent3 of parent2.children) {
                            res.push(parent3.value);

                            if (parent3.children !== null) {
                                for(let i=0; i < parent3.children.length; i++) {
                                    if(!childArray.includes(parseInt(parent3.children[i].value))) {
                                        isSomeCheck = true;
                                        break;
                                    }
                                }

                                if (isSomeCheck) {
                                    res.pop();

                                    for (var i = 0; i < res.length; i++) {
                                        if (res[i] == parseInt(parent2.value) || res[i] == parseInt(parent.value)) {
                                            res.splice(i, 1);
                                        }
                                    }
                                }

                                isSomeCheck = false;
                                
                                for (const parent4 of parent3.children) {
                                    res.push(parent4.value);

                                    if (parent4.children !== null) {
                                        for(let i=0; i < parent4.children.length; i++) {
                                            if(!childArray.includes(parseInt(parent4.children[i].value))) {
                                                isSomeCheck = true;
                                                break;
                                            }
                                        }

                                        if (isSomeCheck) {
                                            res.pop();

                                            for (var i = 0; i < res.length; i++) {
                                                if (res[i] == parseInt(parent3.value) || res[i] == parseInt(parent2.value) || 
                                                    res[i] == parseInt(parent.value)) {
                                                    res.splice(i, 1);
                                                }
                                            }
                                        }

                                        isSomeCheck = false;

                                        for (const parent5 of parent4.children) {
                                            res.push(parent5.value);

                                            if (parent5.children !== null) {
                                                for(let i=0; i < parent5.children.length; i++) {
                                                    if(!childArray.includes(parseInt(parent5.children[i].value))) {
                                                        isSomeCheck = true;
                                                        break;
                                                    }
                                                }

                                                if (isSomeCheck) {
                                                    res.pop();

                                                    for (var i = 0; i < res.length; i++) {
                                                        if (
                                                            res[i] == parseInt(parent4.value) || res[i] == parseInt(parent3.value) || 
                                                            res[i] == parseInt(parent2.value) || res[i] == parseInt(parent.value)
                                                        ) {
                                                            res.splice(i, 1);
                                                        }
                                                    }
                                                }

                                                isSomeCheck = false;

                                                for (const parent6 of parent5.children) {
                                                    res.push(parent6.value);

                                                    if (parent6.children !== null) {
                                                        for(let i=0; i < parent6.children.length; i++) {
                                                            if(!childArray.includes(parseInt(parent6.children[i].value))) {
                                                                isSomeCheck = true;
                                                                break;
                                                            }
                                                        }

                                                        if (isSomeCheck) {
                                                            res.pop();

                                                            for (var i = 0; i < res.length; i++) {
                                                                if (
                                                                    res[i] == parseInt(parent5.value) || res[i] == parseInt(parent4.value) || 
                                                                    res[i] == parseInt(parent3.value) || res[i] == parseInt(parent2.value) || 
                                                                    res[i] == parseInt(parent.value)
                                                                ) {
                                                                    res.splice(i, 1);
                                                                }
                                                            }
                                                        }

                                                        isSomeCheck = false;
                                                        
                                                        for (const parent7 of parent6.children) {
                                                            res.push(parent7.value);

                                                            if (parent7.children !== null) {
                                                                for(let i=0; i < parent7.children.length; i++) {
                                                                    if(!childArray.includes(parseInt(parent7.children[i].value))) {
                                                                        isSomeCheck = true;
                                                                        break;
                                                                    }
                                                                }

                                                                if (isSomeCheck) {
                                                                    res.pop();

                                                                    for (var i = 0; i < res.length; i++) {
                                                                        if (
                                                                            res[i] == parseInt(parent6.value) || res[i] == parseInt(parent5.value) || res[i] == parseInt(parent4.value) || 
                                                                            res[i] == parseInt(parent3.value) || res[i] == parseInt(parent2.value) || res[i] == parseInt(parent.value)
                                                                        ) {
                                                                            res.splice(i, 1);
                                                                        }
                                                                    }
                                                                }

                                                                isSomeCheck = false;

                                                                for (const parent8 of parent7.children) {
                                                                    res.push(parent8.value);

                                                                    for(let i=0; i < parent8.children.length; i++) {
                                                                        if(!childArray.includes(parseInt(parent8.children[i].value))) {
                                                                            isSomeCheck = true;
                                                                            break;
                                                                        }
                                                                    }

                                                                    if (isSomeCheck) {
                                                                        res.pop();

                                                                        for (var i = 0; i < res.length; i++) {
                                                                            if (
                                                                                res[i] == parseInt(parent7.value) || res[i] == parseInt(parent6.value) || 
                                                                                res[i] == parseInt(parent5.value) || res[i] == parseInt(parent4.value) || 
                                                                                res[i] == parseInt(parent3.value) || res[i] == parseInt(parent2.value) || 
                                                                                res[i] == parseInt(parent.value)
                                                                            ) {
                                                                                res.splice(i, 1);
                                                                            }
                                                                        }
                                                                    }
    
                                                                    isSomeCheck = false;
                                                                }
                                                            } else {
                                                                continue;
                                                            }
                                                        }
                                                    } else {
                                                        continue;
                                                    }
                                                }
                                            } else {
                                                continue;
                                            }
                                        }
                                    } else {
                                        continue;
                                    }
                                }
                            } else {
                                continue;
                            }
                        }
                    } else {
                        continue;
                    }
                }
            } else {
                continue;
            }
        }

        return res;
    };

    /**
     * Click Ok button in confirmation box
     *
     * @author  Nay Zaw Linn
     * @create  24/05/2021 (D/M/Y)
     * @param
     * @return
     */
    const saveOK = async () => {
        setContent("");
        setType("");
        setShow(!show);
        setLoading(true);

        let allCheckList = [];
        
        for (let i = 0; i < checked.length; i++) {
            allCheckList = [
                ...allCheckList,
                ...getAllCheckId(parseInt(checked[i]), dept),
            ];
        }

        allCheckList = [...new Set(allCheckList)];
        allCheckList.sort();

        let resData = trimCheckList(dept, allCheckList);
        
        let tmp = [], finalCheckList=[];

        for (let i = 0; i < resData.length; i++) {
            if (allCheckList.includes(resData[i])) {
                tmp.push(resData[i]);
            }
        }

        for (let i = 0; i < tmp.length; i++) {
            finalCheckList.push(tmp[i] + '');
        }

        let obj,
            params = {
                company_id: companyID,
                login_id: loginID,
                criteria,
                department_id: finalCheckList, // criteria 1
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName, // criteria 2
                position_id: posID, // criteria 3
                from_date: fromDate,
                to_date: toDate,
                title: announceTitle,
                description: announceDesc,
            };
        // edit condition
        if (editID !== "" && editID !== null) {
            obj = { url: `api/announcement/${editID}`, method: "put", params };
        }
        // save condition
        else {
            obj = { url: "api/announcement", method: "post", params };
        }

        let response = await ApiRequest(obj);
        setLoading(false);
        // if flag is false, show error message
        if (response.flag === false) {
            setError(response.message);
        }
        // show success message and reset to default form data
        else {
            setSuccess([response.data.message]);
            setClearData("");
            setPosID("");
            setAnnounceTitle("");
            setAnnounceDesc("");
            setChecked([]);
        }
    };

    return (
        <>
            <Loading start={loading} />
            <Message success={success} error={error} error2={[]} />
            <Confirmation
                content={content}
                okButton={t("Ok")}
                cancelButton={t("Cancel")}
                type={type}
                show={show}
                cancel={() => setShow(!show)}
                saveOK={saveOK}
            />
            <CCard>
                <CCardHeader>
                    <h5>
                        <CLabel className="m-0">{t("Announcement")}</CLabel>
                    </h5>
                </CCardHeader>
                <CCardBody>
                    <CForm>
                        <ChooseAnnouncement
                            change={change_announcement}
                            criteria={criteria}
                            flag={editID !== "" ? "edit" : "save"}
                        />
                        <Department
                            criteria={criteria}
                            data={dept}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expand) => setExpanded(expand)}
                            message={deptMsg}
                            flag={editID !== "" ? "edit" : "save"}
                        />
                        <EmployeeIDName
                            criteria={criteria}
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            flag={editID !== "" ? "edit" : "save"}
                            disableAutocomplete={disableAutocomplete}
                        />
                        <PositionComponent
                            criteria={criteria}
                            data={posArr}
                            posID={posID}
                            change={(i) => setPosID(i.target.value)}
                            flag={editID !== "" ? "edit" : "save"}
                        />
                        <FormInput
                            criteria={criteria}
                            data={dept}
                            fromDate={fromDate}
                            toDate={toDate}
                            currentDate={currentDate}
                            fromChange={(i) => {
                                setFromDate(ChangeDate(i));
                                if (ChangeDate(i) > toDate) setToDate(null);
                            }}
                            toChange={(i) => setToDate(ChangeDate(i))}
                            title={announceTitle}
                            changeTitle={(i) =>
                                setAnnounceTitle(i.target.value)
                            }
                            description={announceDesc}
                            changeDesc={(i) => setAnnounceDesc(i.target.value)}
                            save={click_save}
                        />
                    </CForm>
                </CCardBody>
            </CCard>
        </>
    );
}

export default withTranslation()(LegacyWelcomeClass);
