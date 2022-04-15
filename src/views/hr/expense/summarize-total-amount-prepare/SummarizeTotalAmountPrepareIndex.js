/* eslint-disable eqeqeq */
/**
* Summarize Total Amount Prepare
*
* @author  c_dinh
* @create  2021-07-15 (YYYY-MM-DD)
* @param
* @return
*/
import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { withTranslation } from "react-i18next";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlank } from "../../../hr/hr-common/common-validation/CommonValidation";
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import SearchSummarizeTotalAmountPrepare from "./SearchSummarizeTotalAmountPrepare";
import SummarizeTotalAmountPrepareTable from "./SummarizeTotalAmountPrepareTable";
import ApiPath from "../../../brycen-common/api-path/ApiPath";

import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';
import { useHistory } from "react-router-dom";

function LegacyWelcomeClass({ t, i18n }) {
    //create useState hook
    const defaultPerPage = ApiPath.defaultPerPage;//default page
    const [error, setError] = useState([]); // for error message
    const [success, setSuccess] = useState(""); // for success message
    const [loading, setLoading] = useState(false);
    const [appliedFromDate, setAppliedFromDate] = useState(null); // for from date
    const [appliedToDate, setAppliedToDate] = useState(null); // for to date
    const [dueFromDate, setDueFromDate] = useState(null); // for from date
    const [dueToDate, setDueToDate] = useState(null); // for to date
    const [departmentID, setDepartmentID] = useState(""); // for department id
    const [expenseDepartmentID, setExpenseDepartmentID] = useState(""); // for expense department id
    const [positionID, setPositionID] = useState(""); // for position id
    const [department, setDepartment] = useState([]); // for department
    const [currency, setCurrency] = useState([]); // for currency
    const [position, setPosition] = useState([]); // for position
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [listSummarizeTotalAmount, setListSummarizeTotalAmount] = useState([]); // for get list SummarizeTotalAmount
    const [totalRow, setTotalRow] = useState(0); // for total row list SummarizeTotalAmount
    const [allCheck, setAllCheck] = useState(false); // for all check box
    const [totalPage, setTotalPage] = useState(1) // for Pagination
    const [currentPage, setCurrentPage] = useState(1) // for Pagination
    const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [confirmList, setConfirmList] = useState([]); // for Low Rank Emp
    const [formSearchState, setFormSearchState] = useState(null); // keep form search condition
    const history = useHistory(); // For edit link

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  c_dinh
    * @create  
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);

    /**
    * If clearData is changed, remove array in autocomplete
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    /**
    * Page Load
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadDepartment();
        loadCurrency();
        loadPosition();
    }, []);

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
            login_employee_id: ApiPath.loginEmp
        }
        let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            if (parseInt(response.data.view_permission) !== 1) {
                window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/401`;
            }
        }
    };

    /**
    * Load Currency
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
    * @param
    * @return
    */
    const loadCurrency = async () => {
        let obj = { package_name: 'hr', url: ApiPath.SummarizeTotalAmountPrepareGetCurrency, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setCurrency([]) : setCurrency(response.data.data);
    };

    /**
    * Load Department
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
    * @param
    * @return
    */
    const loadDepartment = async () => {
        let obj = { package_name: 'erp', url: ApiPath.SummarizeTotalAmountPrepareGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartment([]) : setDepartment(response.data.data);
    };

    /**
    * Load Position
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
    * @param
    * @return
    */
    const loadPosition = async () => {
        let obj = { package_name: 'erp', url: ApiPath.SummarizeTotalAmountPrepareGetAllPosition, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setPosition([]) : setPosition(response.data.data);
    };

    /**
    * change autocomplete
    *
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
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
    * @author  c_dinh
    * @create  2021-07-15 (YYYY-MM-DD)
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

    //format date yyyy-MM-dd
    const formatDate = (date) => {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    // search function
    const searchClick = () => {
        let arrMsg = [];
        setError([]);
        setSuccess('');
        //validation Applied From Date
        if (!checkNullOrBlank(appliedFromDate) && checkNullOrBlank(appliedToDate)) {
            let errMsg = t("JSE001").replace("%s", t("Applied Date (From)"));
            arrMsg.push(errMsg);
        }
        //validation Applied To Date
        if (!checkNullOrBlank(appliedToDate) && checkNullOrBlank(appliedFromDate)) {
            let errMsg = t("JSE001").replace("%s", t("Applied Date (To)"));
            arrMsg.push(errMsg);
        }
        //validation check Applied From Date > Applied To Date
        if (checkNullOrBlank(appliedFromDate) && checkNullOrBlank(appliedToDate)) {
            if (formatDate(appliedFromDate) > formatDate(appliedToDate)) {
                let errMsg = t("JSE016").replace("%s", t("Applied Date (From)")).replace("%s", t("Applied Date (To)"));
                arrMsg.push(errMsg);
            }
        }
        //validation Due From Date
        if (!checkNullOrBlank(dueFromDate) && checkNullOrBlank(dueToDate)) {
            let errMsg = t("JSE001").replace("%s", t("Due Date (From)"));
            arrMsg.push(errMsg);
        }
        //validation Due To Date
        if (!checkNullOrBlank(dueToDate) && checkNullOrBlank(dueFromDate)) {
            let errMsg = t("JSE001").replace("%s", t("Due Date (To)"));
            arrMsg.push(errMsg);
        }
        //validation check Due From Date > Due To Date
        if (checkNullOrBlank(dueFromDate) && checkNullOrBlank(dueToDate)) {
            if (formatDate(dueFromDate) > formatDate(dueToDate)) {
                let errMsg = t("JSE016").replace("%s", t("Due Date (From)")).replace("%s", t("Due Date (To)"));
                arrMsg.push(errMsg);
            }
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess("");
            setListSummarizeTotalAmount([]);
            setAllCheck(false);
            setConfirmList([]);
            setDeleteIdList('');
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            const requestFormSearch = {
                company_id: ApiPath.companyID,
                employee_id: employeeID,
                employee_code: employeeCode,
                employee_name: employeeName,
                department_id: departmentID,
                position_id: positionID,
                expense_department_id: expenseDepartmentID,
                applied_date_from: isEmpty(appliedFromDate) ? "" : formatDate(appliedFromDate),
                applied_date_to: isEmpty(appliedToDate) ? "" : formatDate(appliedToDate),
                due_date_from: isEmpty(dueFromDate) ? "" : formatDate(dueFromDate),
                due_date_to: isEmpty(dueToDate) ? "" : formatDate(dueToDate),
                login_id: ApiPath.loginEmp,
                language: ApiPath.lang
            }
            setFormSearchState(requestFormSearch);
            searchSummarizeTotalAmountPrepare(1, defaultPerPage, requestFormSearch);
            setCurrentPage(1);
        }
    }

    //get summarize total amount
    const searchSummarizeTotalAmountPrepare = async (page = 1, pageSize = 20, formSearch = null, searchFlag = true) => {
        setLoading(true);
        let params = {
            ...formSearch,
            page,
            per_page: pageSize,
        }
        let obj = { package_name: 'hr', url: ApiPath.SearchSummarizeTotalAmountPrepare, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            searchFlag && setError(response.message);
            setListSummarizeTotalAmount([]);
            setTotalRow(0);
            searchFlag && setSuccess('');
        }
        else {
            setAllCheck(false);
            let data = response.data.summarize_total_amount_prepare.data;
            for (let i = 0; i < data.length; i++) {
                if (i == 0 || data[i].employee_id != data[i - 1]?.employee_id) {
                    data[i].cnt = data.filter(item => item.employee_id == data[i].employee_id).length;
                }
                data[i].applied_date = formatDate(data[i].applied_date);
                data[i].due_date = formatDate(data[i].due_date);
                data[i].idx = i;
                for (let j = 0; j < department.length; j++) {
                    if (data[i].expense_department_id == department[j].id) {
                        data[i].expense_department_name = department[j].department_name;
                    }
                }
            }
            setListSummarizeTotalAmount(data);
            setTotalRow(response.data.summarize_total_amount_prepare.total);
            setTotalPage(response.data.summarize_total_amount_prepare?.last_page);
            searchFlag && setSuccess('');
        }
    }

    //check box action
    const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
    const change_checkbox = (n) => {
        let value = n.target.value;
        let checked = n.target.checked;
        let data;
        let id_list = [];
        let confirm_list = [];
        if (value === "all-check") {
            data = listSummarizeTotalAmount.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = listSummarizeTotalAmount.map(item =>
                item.idx === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        for (let i = 0; i < data.length; i++) {
            let temp_object = {};
            if (data[i].is_checked === true) {
                temp_object.id = data[i].id;
                temp_object.amount_type_id = data[i].amount_type_id;
            }
            if (Object.keys(temp_object).length > 0) {
                confirm_list.push(temp_object);
            }
        }
        let total = [];
        let obj = {};
        let emp_id_arr = [];
        if (value !== "all-check") {
            emp_id_arr.push(data[value].employee_id);
        }
        else {
            emp_id_arr = data.map(a => a.employee_id);
            emp_id_arr = emp_id_arr.filter(function (item, pos) {
                return emp_id_arr.indexOf(item) == pos;
            })
        }
        for (let d = 0; d < emp_id_arr.length; d++) {
            total = [];
            let temp = data.filter(item => item.employee_id == emp_id_arr[d] && item.is_checked === true);
            for (let i = 0; i < currency.length; i++) {
                obj = {};
                obj.currency_id = currency[i].id;
                obj.total_amount = 0;
                for (let j = 0; j < temp.length; j++) {
                    for (let k = 0; k < temp[j].amount.length; k++) {
                        if (currency[i].id == temp[j].amount[k].currency_id) {
                            obj.total_amount += Number(temp[j].amount[k].cost);
                        }
                    }
                }
                total.push(obj);
            }
            temp = data.filter(item => item.employee_id == emp_id_arr[d]);
            for (let i = 0; i < temp.length; i++) {
                temp[i].total = total;
            }
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true && data[i].finish_flag !== 1) {
                id_list.push(data[i].employee_id);
            }
        }
        setDeleteIdList(id_list.toString());
        setListSummarizeTotalAmount(data);
        setConfirmList(confirm_list);
        setAllCheck(data.every(item => item.is_checked));
    };

    let saveData = () => {
        if (isEmpty(deleteIdList)) {
            setSuccess('');
            let errorMsg = t("JSE160");
            setError([errorMsg]);
        } else {
            setShow(!show); setContent('Are you sure want to confirm ?'); setType('confirm');
            setError([]);
            setSuccess('');
        }
    }
    const saveOK = async () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShow(!show)

        let params = {
            "company_id": ApiPath.companyID, // login data from erp
            "prepare_confirm": confirmList,
            "login_id": ApiPath.loginEmp, // login data from erp
            "language": ApiPath.lang
        }
        setLoading(true);
        let obj = { package_name: 'hr', url: ApiPath.SummarizeTotalAmountPrepareConfirm, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess('');
            setError(response.message);
        } else {
            if (response.data.status == 'OK') {
                setSuccess([response.data.message]);
                setError('');
                setTimeout(function () {
                    let pageCheck = allCheck && currentPage === totalPage ? currentPage - 1 : currentPage;
                    searchSummarizeTotalAmountPrepare(pageCheck, defaultPerPage, formSearchState, false);
                    setCurrentPage(pageCheck);
                }, 2500);
            } else if (response.data.status == 'NG') {
                setSuccess('');
                let errorMsg = response.data.message;
                setError([errorMsg]);
                searchSummarizeTotalAmountPrepare(currentPage, defaultPerPage, formSearchState, false);
            }
        }
    }

    const changePage = (newPage) => {
        setCurrentPage(newPage);
        setAllCheck(false);
        setConfirmList([]);
        setDeleteIdList('');
        setError('');
        setSuccess('');
        searchSummarizeTotalAmountPrepare(newPage, defaultPerPage, formSearchState, true);
    }
    //change department
    const selectDepartmentName = (e) => {
        setDepartmentID(e.target.value);
    };
    //change expense department
    const selectExpenseDepartmentName = (e) => {
        setExpenseDepartmentID(e.target.value);
    };
    //change position
    const selectPosition = (e) => {
        setPositionID(e.target.value);
    };

    return (
        <CRow className="summarize-total-amount-prepare">
            <CCol lg="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} confirmOK={saveOK}
                />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblSummarizeTotalAmountPrepare">{t("Summarize Total Amount Prepare")}</h5>
                    </CCardHeader>
                    <CCardBody>
                        {/* show search summarize total amount prepare*/}
                        <SearchSummarizeTotalAmountPrepare
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            appliedFromDate={appliedFromDate}
                            appliedToDate={appliedToDate}
                            dueFromDate={dueFromDate}
                            dueToDate={dueToDate}
                            selectAppliedFromDate={i => setAppliedFromDate(ChangeDate(i))}
                            selectAppliedToDate={i => setAppliedToDate(ChangeDate(i))}
                            selectDueFromDate={i => setDueFromDate(ChangeDate(i))}
                            selectDueToDate={i => setDueToDate(ChangeDate(i))}
                            selectDepartmentName={selectDepartmentName}
                            selectExpenseDepartmentName={selectExpenseDepartmentName}
                            selectPosition={selectPosition}
                            departmentID={departmentID}
                            expenseDepartmentID={expenseDepartmentID}
                            positionID={positionID}
                            department={department}
                            position={position}
                            searchClick={searchClick}
                        />
                        <SummarizeTotalAmountPrepareTable
                            currency={currency}
                            changePage={changePage}
                            totalRow={totalRow}
                            listSummarizeTotalAmount={listSummarizeTotalAmount}
                            allCheck={allCheck}
                            change_checkbox={change_checkbox}
                            defaultPerPage={defaultPerPage}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            saveData={saveData}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function SummarizeTotalAmountPrepareIndex() {
    return <Welcome />;
}
