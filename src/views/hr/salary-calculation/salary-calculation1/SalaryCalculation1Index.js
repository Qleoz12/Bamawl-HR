/**
 * Salary Calculation
 *
 * @author  Nay Zaw Linn
 * @create  21/06/2021 (D/M/Y)
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
import { ChangeDate } from "../../hr-common/change-date/ChangeDate";
import message from "../../hr-common/common-message/CommonMessage";
import {
    checkNullOrBlank,
    validateNumberOnly,
} from "../../hr-common/common-validation/CommonValidation";
import Moment from "moment";
import { useHistory } from "react-router-dom";

function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory();
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);

    const [login_id, setLoginID] = useState(localStorage.getItem("LOGIN_ID"));
    const [company_id, setCompanyId] = useState(
        localStorage.getItem("COMPANY_ID")
    );
    const [position_rank, setPositionRank] = useState(
        JSON.parse(localStorage.getItem("POSITION_RANK"))
    ); // for session position rank
    const [login_employee_id, setLoginEmpID] = useState(
        localStorage.getItem("LOGIN_ID")
    );

    const [autocomplete, setAutocomplete] = useState([]);
    const [clearData, setClearData] = useState("");
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [employeeID, setEmployeeID] = useState("");
    const [deptArr, setDeptArr] = useState([]);
    const [deptID, setDeptID] = useState("");
    const [rowCount, setRowCount] = useState("");
    const [month, setMonth] = useState(() => ChangeDate(new Date()));
    const [mainTable, setMainTable] = useState([]);
    const [companyLeave, setCompanyLeave] = useState([]);
    const [allLeave, setAllLeave] = useState(null);
    const [previousData, setPreviousData] = useState(0);
    const [previousRemainDay, setPreviousRemainDay] = useState(0);

    const [ex, setEX] = useState("");
    const [dayRangeArr, setDayRangeArr] = useState([]);
    const [dayRange, setDayRange] = useState("");
    const [saveNext, setSaveNext] = useState({});
    const [autoFile, setAutoFile] = useState(false);
    const [disableAutocomplete, setDisableAutocomplete] = useState(true);

    /**
     * page load
     *
     * @author  Nay Zaw Linn
     * @create  21/06/2021 (D/M/Y)
     * @param
     * @return
     */
    useEffect(() => {
        getDepartment();
        getDayRange();
        getPermission();
    }, []);

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
     * @create  21/06/2021 (D/M/Y)
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
        response.flag === false
            ? setDeptArr([])
            : setDeptArr(response.data.data);
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
            params: { company_id, login_id, login_employee_id },
        };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setError(response.message);
        } else {
            let object = response.data.data;
            for (const property in object) {
                if (
                    property == login_employee_id &&
                    response.data.autocomplete === false
                ) {
                    setDisableAutocomplete(response.data.autocomplete);
                    setEmployeeID(property);
                    setEmployeeCode(object[login_employee_id].code);
                    setEmployeeName(object[login_employee_id].name_eng);
                }
            }
        }
    };

    /**
     * get day range from API
     *
     * @author  Nay Zaw Linn
     * @create  21/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const getDayRange = async () => {
        let obj = {
            url: "api/salary-calculate1/index",
            method: "get",
            params: { company_id, login_id, position_rank },
        };
        let response = await ApiRequest(obj);
        response.flag === false
            ? setDayRangeArr([])
            : setDayRangeArr(response.data.data);
    };

    /**
     * click delete button
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const click_delete = () => {
        let err = [];
        setError([]);
        setSuccess([]);

        if (!checkNullOrBlank(month)) {
            err.push(
                t(message.JSE019).replace("%s", t("month to calculate salary"))
            );
        }

        if (!checkNullOrBlank(ex)) {
            err.push(t(message.JSE005).replace("%s", t("Exchange Rate")));
        } else {
            if (!validateNumberOnly(ex)) {
                err.push(t(message.JSE013).replace("%s", t("Exchange Rate")));
            }
        }

        // if stored error is exist, show error message
        if (err.length > 0) {
            setError(err);
        }
        // if ok, show confirmation box to delete
        else {
            setContent(t("Are you sure want to delete?"));
            setShow(!show);
            setType("delete");
        }
    };

    /**
     * confirm for delete
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const deleteOK = async () => {
        setShow(!show);
        setType("");
        setContent("");
        setMainTable([]);
        setLoading(true);
        let obj = {
            url: "api/salary-calculate1/delete-Calculated-Data",
            method: "post",
            params: {
                company_id,
                login_id,
                position_rank,
                calculate_month: Moment(month).format("YYYY-MM"),
                exchange_rate: ex,
                day_range: dayRange,
                department_id: deptID,
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
            },
        };
        let response = await ApiRequest(obj); 
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setSuccess([response.data.message]);
        }
    };

    /**
     * change autocomplete
     *
     * @author  Nay Zaw Linn
     * @create  21/06/2021 (D/M/Y)
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
     * @create  21/06/2021 (D/M/Y)
     * @param val, obj
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
            setEmployeeID(response.data.data[0].employee_id);
            setEmployeeName(response.data.data[0].name);
            setEmployeeCode(response.data.data[0].employee_code);
        }
    };

    /**
     * Leave adjustment in table
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param type, row_data, leave_data, i
     * @return
     */
    const change_leave_adjustment = async (type, row_data, leave_data, i) => {
        setError([]);
        setSuccess([]);
        let input_data = i.target.value,
            total_remain_day,
            temp = [];
        let { employee_id, id } = row_data;
        let { leave_id, remain_day, year_status, company_leave_id } =
            leave_data;

        if (type === "leave_adjustment") {
            setLoading(true);

            let object = {
                url: "api/salary-calculate1/leave-adjustment",
                method: "get",
                params: {
                    company_id,
                    row_id: id,
                    employee_id,
                    leave_id,
                    remain_day,
                    company_leave_id,
                    year_status,
                    leave_adjustment: i.target.value,
                },
            };

            let response = await ApiRequest(object);
            setLoading(false);

            if (response.flag === false) {
                setError(response.message);
                input_data = previousData === "" ? 0 : previousData;
                total_remain_day = previousRemainDay;
            } else {
                setPreviousData(input_data);
                setPreviousRemainDay(response.data.data.total_remain_day);
                total_remain_day = response.data.data.total_remain_day;
            }

            temp = row_data.leave_type.map((item) => {
                if (item.leave_id === leave_data.leave_id)
                    return {
                        ...item,
                        leave_adjustment: input_data,
                        total_remain_day,
                    };
                else return item;
            });
        } else {
            setLoading(true);

            let object = {
                url: "api/salary-calculate1/leave-adjust-comment",
                method: "patch",
                params: {
                    company_id,
                    row_id: id,
                    employee_id,
                    leave_id,
                    company_leave_id,
                    leave_adjust_comment: input_data,
                },
            };

            let response = await ApiRequest(object);
            setLoading(false);

            if (response.flag === false) {
                setError(response.message);
            }

            temp = row_data.leave_type.map((item) => {
                if (item.leave_id === leave_data.leave_id)
                    return { ...item, comment: input_data };
                else return item;
            });
        }
        let data = mainTable.map((item) =>
            item.id === row_data.id ? { ...item, leave_type: temp } : item
        );
        setMainTable(data);
    };

    /**
     * calculate
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const calculate = async () => {
        let err = [];
        setError([]);
        setSuccess([]);

        if (!checkNullOrBlank(month)) {
            err.push(
                t(message.JSE019).replace("%s", t("month to calculate salary"))
            );
        }

        if (!checkNullOrBlank(ex)) {
            err.push(t(message.JSE005).replace("%s", t("Exchange Rate")));
        } else {
            if (!validateNumberOnly(ex)) {
                err.push(t(message.JSE013).replace("%s", t("Exchange Rate")));
            }
        }

        // if stored error is exist, show error message
        if (err.length > 0) {
            setError(err);
        }
        // if ok, calculate salary for chosen month
        else {
            setLoading(true);
            setSaveNext({
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
                calculate_month: Moment(month).format("YYYY-MM"),
                exchange_rate: ex,
                day_range: dayRange,
                department_id: deptID,
            });
            let obj = {
                url: `api/salary-calculate1/calculate-Salary-Data`,
                method: "post",
                params: {
                    company_id,
                    login_id,
                    position_rank,
                    calculate_month: Moment(month).format("YYYY-MM"),
                    exchange_rate: ex,
                    day_range: dayRange,
                    department_id: deptID,
                    employee_id: employeeID,
                    employee_code: employeeCode,
                    employee_name: employeeName,
                },
            };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setAutoFile(response.data.data.auto_file);
                setMainTable([]);
            } else {
                setCompanyLeave(response.data.data.company_leave);
                setAllLeave(response.data.data.all_leave_count);
                setMainTable(response.data.data.calculate_data);
                setAutoFile(response.data.auto_file);
            }
        }
    };

    /**
     * export button
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const click_export = async () => {
        setLoading(true);
        setError([]);
        setSuccess([]);
        let obj = {
            method: "post",
            url: "api/salary-calculate1/export-Salary-Data",
            params: { login_id, company_id, position_rank },
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
    };

    /**
     * export data
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @modified  14/08/2021 (D/M/Y) ATM
     * @param
     * @return
     */
    const saveAndNext = async () => {
        /*localStorage.setItem('SALARY1_DATA', JSON.stringify(saveNext));
        let customer_name = window.location.href.split("/")[3];
        history.push(`/${customer_name}/hr/salary-calculation/salary-calculation2`);*/

        let obj = {
            url: "api/salary-calculate1/save-Salary-Data",
            method: "post",
            params: {
                login_id: login_id,
                company_id: company_id,
                position_rank: position_rank,
                employee_id: employeeID,
                employee_name: employeeName,
                employee_code: employeeCode,
                calculate_month: Moment(month).format("YYYY-MM"),
                exchange_rate: ex,
                day_range: dayRange,
                department_id: deptID,
                department_name: "",
            },
        };

        let response = await ApiRequest(obj);

        if (response.flag == false) {
            setSuccess([]);
            setError(response.message);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            if (response.data.status == "OK") {
                localStorage.setItem("SALARY1_DATA", JSON.stringify(saveNext));
                let customer_name = window.location.href.split("/")[3];
                history.push(
                    `/${customer_name}/hr/salary-calculation/salary-calculation-step2`
                );
            } else {
                setError([response.data.message]);
            }
        }
    };

    /**
     * run auto file
     *
     * @author  Nay Zaw Linn
     * @create  29/06/2021 (D/M/Y)
     * @param
     * @return
     */
    const runAutoFile = async () => {
        setError([]);
        setSuccess([]);
        setLoading(true);
        let obj = {
            url: "api/salary-calculate1/run-auto-file",
            method: "get",
            params: {
                company_id,
                login_id,
            },
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setAutoFile(response.data.auto_file);
            setMainTable([]);
        } else {
            setAutoFile(response.data.auto_file);
            setSuccess([response.data.message]);
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
                deleteOK={deleteOK}
            />
            <FormData
                changeAutocomplete={changeAutocomplete}
                selectAutocomplete={selectAutocomplete}
                empID={employeeID}
                empName={employeeName}
                empCode={employeeCode}
                idArr={idArr}
                nameArr={nameArr}
                codeArr={codeArr}
                month={month}
                changeMonth={(i) => setMonth(ChangeDate(i))}
                ex={ex}
                changeEX={(i) => setEX(i.target.value)}
                dayRangeArr={dayRangeArr}
                dayRange={dayRange}
                changeDayRange={(i) => setDayRange(i.target.value)}
                deptArr={deptArr}
                deptID={deptID}
                changeDept={(i) => setDeptID(i.target.value)}
                rowCount={rowCount}
                mainTable={mainTable}
                companyLeave={companyLeave}
                allLeave={allLeave}
                autoFile={autoFile}
                runAutoFile={runAutoFile}
                calculate={calculate}
                delete={click_delete}
                changeLeaveAdj={change_leave_adjustment}
                disableAutocomplete={disableAutocomplete}
                export={click_export}
                saveAndNext={saveAndNext}
            />
        </>
    );
}

export default withTranslation()(LegacyWelcomeClass);
