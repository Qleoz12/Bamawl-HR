/**
* Summarize Total Amount Prepare List
*
* @author  v_hao
* @create  2021-07-15 (YYYY-MM-DD)
* @param
* @return
*/
import React, { useState, useEffect, useRef } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { withTranslation } from "react-i18next";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlank } from "../../../hr/hr-common/common-validation/CommonValidation";
import SearchSummarizeTotalAmountPrepareList from "./SearchSummarizeTotalAmountPrepareList";
import SummarizeTotalAmountPrepareListTable from "./SummarizeTotalAmountPrepareListTable";
import DeleteSummarizeTotalAmountPrepareList from "./DeleteSummarizeTotalAmountPrepareList";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
import { useHistory } from "react-router-dom";

function LegacyWelcomeClass({ t, i18n }) {
    //create const
    const ViewPermision = {
        ALL: 1,
        ONLY_ME: 0,
        MY_DATA_MY_MEMBER: 2,
        ALL_NOT_MONEY: 3
    }
    //create useState hook
    const defaultPerPage = ApiPath.defaultPerPage;//default page
    const [error, setError] = useState([]); // for error message
    const [success, setSuccess] = useState(""); // for success message
    const [loading, setLoading] = useState(false);
    const [appliedFromDate, setAppliedFromDate] = useState(null); // for from date
    const [appliedToDate, setAppliedToDate] = useState(null); // for to date
    const [departmentID, setDepartmentID] = useState(""); // for department id
    const [expenseDepartmentID, setExpenseDepartmentID] = useState(""); // for expense department id
    const [positionID, setPositionID] = useState(""); // for position id
    const [department, setDepartment] = useState([]); // for department
    const [currency, setCurrency] = useState([]); // for currency
    const [position, setPosition] = useState([]); // for position
    const [listSummarizeTotalAmount, setListSummarizeTotalAmount] = useState([]); // for get list SummarizeTotalAmount
    const [totalRow, setTotalRow] = useState(0); // for total row list SummarizeTotalAmount
    const [allCheck, setAllCheck] = useState(false); // for all check box
    const [totalPage, setTotalPage] = useState(1) // for Pagination
    const [currentPage, setCurrentPage] = useState(1) // for Pagination
    const [permission, setPermission] = useState(ViewPermision.All) // for view permission
    const typingTimeoutRef = useRef(null); // keep value time out when rerender
    const [clearData, setClearData] = useState('');
    const [idArr, setIdArr] = useState([]);
    const [nameArr, setNameArr] = useState([]);
    const [codeArr, setCodeArr] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [employeeCode, setEmployeeCode] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState(false);// For show/hide confirmation box
    const [checkHidenchk, setCheckHidenchk] = useState([]);
    const history = useHistory(); // For edit link
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  v_hao
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
    * @author  v_hao
    * @create  20/05/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCurrency = async () => {
        let obj = { package_name: 'hr', url: ApiPath.SummarizeTotalAmountPrepareListGetCurrency, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setError(response.message) : setCurrency(response.data.data);
    };

    /**
    * Load Department
    *
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadDepartment = async () => {
        let obj = { package_name: 'erp', url: ApiPath.SummarizeTotalAmountPrepareGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setError(response.message) : setDepartment(response.data.data);
    };

    /**
    * Load Position
    *
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadPosition = async () => {
        let obj = { package_name: 'erp', url: ApiPath.SummarizeTotalAmountPrepareGetAllPosition, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setError(response.message) : setPosition(response.data.data);
    };

    /**
    * change autocomplete
    *
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
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
    * @author  v_hao
    * @create  20/07/2021 (D/M/Y)
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

    // /* CHECKBOX ACTION */
    const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
    const change_checkbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let dataDel;
        let id_list = [];
        let mainTableNew = [];

        mainTableNew = listSummarizeTotalAmount.filter(item => item.finish_flag !== 1)

        if (value === "all-check") {
            dataDel = mainTableNew.map(item => ({ ...item, is_checked: checked }));
        } else {
            dataDel = mainTableNew.map(item =>
                item.employee_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }

        if (value === "all-check") {
            data = listSummarizeTotalAmount.map(item => ({ ...item, is_checked: checked }));
        } else {
            data = listSummarizeTotalAmount.map(item =>
                item.employee_id === parseInt(value) ? { ...item, is_checked: checked } : item
            )
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true && data[i].finish_flag !== 1) {
                id_list.push(data[i].employee_id);
            }
        }

        setDeleteIdList(id_list.toString());
        //setAllCheck(dataDel.every(item => item.is_checked));
        if (mainTableNew.length > 0) setAllCheck(dataDel.every(item => item.is_checked));
        else setAllCheck(data.every(item => item.is_checked));
        setListSummarizeTotalAmount(data);
    }

    /* DELETE MODAL BOX */
    const deleteToggleAlert = () => {
        if (isEmpty(deleteIdList)) {
            setSuccess("");
            let errorMsg = t('JSE004');
            setError([errorMsg]);
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
            setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
            setError("");
        }
    }

    const deleteOK = async () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setShow(!show);
        if (!isEmpty(deleteIdList)) {
            setLoading(true);
            let url = `${ApiPath.DeleteSummarizeTotalAmountPrepareList}${deleteIdList}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
            let obj = { package_name: 'hr', url: url, method: 'delete' };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setSuccess('');
                searchSummarizeTotalAmountPrepare(currentPage, defaultPerPage, false);
            } else {
                setSuccess([response.data.message]);
                let mainTableNew = [];
                mainTableNew = listSummarizeTotalAmount.filter(item => item.finish_flag !== 1)
                
                setTimeout(function () {
                    let pageCheck = allCheck && mainTableNew.length == listSummarizeTotalAmount.length && currentPage === totalPage ? currentPage - 1 : currentPage;
                    searchSummarizeTotalAmountPrepare(pageCheck, defaultPerPage, false);
                    setCurrentPage(pageCheck);
                }, 2500);
            }
        } else {
            setSuccess('');
            let errorMsg = t("JSE162");
            setError([errorMsg]);
        }
    }

    //get summarize total amount
    const searchSummarizeTotalAmountPrepare = async (page = 1, pageSize = 20, searchFlag = true) => {
        let summarizeTotalAmount = {
            "company_id": ApiPath.companyID,
            "login_id": ApiPath.loginEmp,
            "employee_id": employeeID,
            "employee_code": employeeCode,
            "employee_name": employeeName,
            "department_id": departmentID,
            "position_id": positionID,
            "expense_department_id": expenseDepartmentID,
            "from_date": isEmpty(appliedFromDate) ? "" : formatDate(appliedFromDate),
            "to_date": isEmpty(appliedToDate) ? "" : formatDate(appliedToDate),
            "language": ApiPath.lang
        }
        setLoading(true);
        let params = {
            ...summarizeTotalAmount,
            "page": page,
            "per_page": pageSize
        }
        let obj = { package_name: 'hr', url: ApiPath.SearchSummarizeTotalAmountPrepareList, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            searchFlag && setError(response.message);
            setListSummarizeTotalAmount([]);
            setTotalRow(0);
        }
        else {
            setAllCheck(false);
            let data = response.data.data.data;
            setListSummarizeTotalAmount(data);
            let mainHidenChk = [];
            mainHidenChk = data.filter(item => item.finish_flag === 0) //show
            setCheckHidenchk(mainHidenChk);
            setTotalRow(response.data.data.total);
            setTotalPage(response.data.data?.last_page);
        }
    }

    //click search
    const searchClick = () => {
        let arrMsg = [];
        setError([]);
        setSuccess('');
        //validation start Date
        if (!checkNullOrBlank(appliedFromDate) && checkNullOrBlank(appliedToDate)) {
            let errMsg = t("JSE001").replace("%s", t("Summarize Prepare Date (From)"));
            arrMsg.push(errMsg);
        }
        //validation end Date
        if (!checkNullOrBlank(appliedToDate) && checkNullOrBlank(appliedFromDate)) {
            let errMsg = t("JSE001").replace("%s", t("Summarize Prepare Date (To)"));
            arrMsg.push(errMsg);
        }
        //validation check start date > end date
        if (checkNullOrBlank(appliedFromDate) && checkNullOrBlank(appliedToDate)) {
            if (formatDate(appliedFromDate) > formatDate(appliedToDate)) {
                let errMsg = t("JSE016").replace("%s", t("Summarize Prepare Date (From)")).replace("%s", t("Summarize Prepare Date (To)"));
                arrMsg.push(errMsg);
            }
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess("");
            setListSummarizeTotalAmount([]);
            setCheckHidenchk([]);
            setDeleteIdList([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            searchSummarizeTotalAmountPrepare(1, defaultPerPage, true);
            setCurrentPage(1);
        }
    }
    //change page
    async function changePage(newPage) {
        setAllCheck(false);
        setCheckHidenchk([]);
        setDeleteIdList([]);
        setCurrentPage(newPage);
        setError('');
        setSuccess('');
        searchSummarizeTotalAmountPrepare(newPage, defaultPerPage, false);
    }

    let removeTripAppliedFromDate = () => {
        setAppliedFromDate(null);
    }
    let removeTripAppliedToDate = () => {
        setAppliedToDate(null);
    }
    //select applied from date
    const selectAppliedFromDate = (e) => {
        setAppliedFromDate(e);
    };
    //select applied to date
    const selectAppliedToDate = (e) => {
        setAppliedToDate(e);
    };
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
        <CRow className="summarize-total-amount-prepare-list">
            <CCol lg="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
                    cancel={() => setShow(!show)} deleteOK={deleteOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblSumTotalAmountPrepareList">{t("Sum Total Amount Prepare List")}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchSummarizeTotalAmountPrepareList
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            appliedFromDate={appliedFromDate}
                            selectAppliedFromDate={selectAppliedFromDate}
                            appliedToDate={appliedToDate}
                            selectAppliedToDate={selectAppliedToDate}
                            selectDepartmentName={selectDepartmentName}
                            selectExpenseDepartmentName={selectExpenseDepartmentName}
                            selectPosition={selectPosition}
                            departmentID={departmentID}
                            expenseDepartmentID={expenseDepartmentID}
                            positionID={positionID}
                            department={department}
                            position={position}
                            searchClick={searchClick}
                            permission={permission}
                            ViewPermision={ViewPermision}
                            removeTripAppliedFromDate={removeTripAppliedFromDate}
                            removeTripAppliedToDate={removeTripAppliedToDate}
                        />
                        <SummarizeTotalAmountPrepareListTable
                            checkHidenchk={checkHidenchk}
                            currency={currency}
                            changePage={changePage}
                            totalRow={totalRow}
                            listSummarizeTotalAmount={listSummarizeTotalAmount}
                            allCheck={allCheck}
                            change_checkbox={change_checkbox}
                            defaultPerPage={defaultPerPage}
                            currentPage={currentPage}
                            totalPage={totalPage}
                        />
                        <DeleteSummarizeTotalAmountPrepareList
                            listSummarizeTotalAmount={listSummarizeTotalAmount} deleteToggleAlert={deleteToggleAlert}
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function SummarizeTotalAmountPrepareListIndex() {
    return <Welcome />;
}
