/**
* Employee Shift Assign List
*
* @author  lq_don
* @create  02/06/2021 (D/M/Y)
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
import EmployeeShiftAssignListTable from "./EmployeeShiftAssignListTable";
import SearchEmployeeShiftAssignList from "./SearchEmployeeShiftAssignList";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import { ChangeDate } from '../../hr-common/change-date/ChangeDate';

function LegacyWelcomeClass({ t, i18n }) {
    //create useState hook
    const defaultPerPage                                        = ApiPath.defaultPerPage;//default page
    const [error, setError]                                     = useState([]); // for error message
    const [success, setSuccess]                                 = useState([]); // for success message
    const [loading, setLoading]                                 = useState(false);
    const [fromDate, setFromDate]                               = useState(ChangeDate(new Date)); // for from date
    const [toDate, setToDate]                                   = useState(ChangeDate(new Date)); // for to date
    const [departmentID, setDepartmentID]                       = useState(""); // for department id
    const [department, setDepartment]                           = useState([]); // for department
    const [shiftNameID, setShiftNameID]                         = useState(""); // for shift name id
    const [shiftName, setShiftName]                             = useState([]); // for shift name
    const [listEmployeeShiftAssign, setListEmployeeShiftAssign] = useState([]); // for get list EmployeeShiftAssign
    const [totalRow, setTotalRow]                               = useState(0); // for total row list EmployeeShiftAssign
    const [allCheck, setAllCheck]                               = useState([]); // for all check box
    const [totalPage, setTotalPage]                             = useState(1) // for Pagination
    const [currentPage, setCurrentPage]                         = useState(1) // for Pagination
    const [deleteIdList, setDeleteIdList]                       = useState('') // for list delete id
    const [permission, setPermission]                           = useState(ViewPermision.ALL) // for view permission
    const [deleteModalBox, setDeleteModalBox]                   = useState(false); //for show hide model delete
    const [listEmployeeShiftAssignData, setListEmployeeShiftAssignData] = useState({}); //for get list EmployeeShiftAssign
    const [clearData, setClearData]                             = useState('');
    const [idArr, setIdArr]                                     = useState([]);
    const [nameArr, setNameArr]                                 = useState([]);
    const [codeArr, setCodeArr]                                 = useState([]);
    const [employeeName, setEmployeeName]                       = useState('');
    const [employeeCode, setEmployeeCode]                       = useState('');
    const [employeeID, setEmployeeID]                           = useState('');
    const [content, setContent]                                 = useState('');
    const [type, setType]                                       = useState('');
    const [checkShowCheckbox, setCheckShowCheckbox]             = useState(true);

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
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
    * @author  dh_khanh
    * @create  27/04/2021 (D/M/Y)
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
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadDepartment();
        loadShiftName();
    }, []);

    /**
    * Load view permission user login
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadViewPermission = async  () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setPermission(Number(response.data.view_permission));
            if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
            }      
        } 
    }

    /**
    * Load Department
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadDepartment = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartment([]) : setDepartment(response.data.data);
    };

    /**
    * Load Shift name
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadShiftName = async () => {
        let url = `${ApiPath.EmployeeShiftAssignListShiftName}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        response.flag === false ? setShiftName([]) : setShiftName(response.data.data);
        setLoading(false);
    }

    /**
    * change autocomplete
    *
    * @author  dh_khanh
    * @create  05/07/2021 (D/M/Y)
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
    * @author  dh_khanh
    * @create  05/07/2021 (D/M/Y)
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

    //get list employee shift assign
    const searchListEmployeeShiftAssign = async (page = 1, pageSize = 20, searchFlag = false,checkLoadPage=false) => {
        let employeeAssignData = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "employee_code": employeeCode,
            "employee_name": employeeName,
            "department_id": departmentID,
            "shift_normal_rule_id": shiftNameID,
            "from_date": formatDate(fromDate),
            "to_date": formatDate(toDate),
            "login_id": ApiPath.loginEmp
        }
        if (searchFlag === true) {
            setListEmployeeShiftAssignData(employeeAssignData);
        } else {
            employeeAssignData = listEmployeeShiftAssignData;
        }
        setLoading(true);
        let params = {
            ...employeeAssignData,
            "page": page,
            "page_size": pageSize
        }
        let obj = {package_name: 'hr', url: ApiPath.EmployeeShiftAssignListSearch, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setListEmployeeShiftAssign([]);
            setTotalRow(0);
        }
        else {
            if(!checkLoadPage)
                setError([]);
            setAllCheck(false);
            setDeleteIdList('');
            //disable checkbox all
            let deleteFlag=null;
            deleteFlag=response.data.data.find(i=>i.shift_chk==0);
            if(deleteFlag)
                setCheckShowCheckbox(false);
            else
                setCheckShowCheckbox(true);
            setListEmployeeShiftAssign(response.data.data);
            setTotalRow(response.data.total);
            setTotalPage(response.data?.last_page);
        }
    }
    //check box action
    const changeCheckbox = (i) => {
        let value = i.target.value;
        let checked = i.target.checked;
        let data;
        let idList = [];
        if (value === "all-check") {
            data = listEmployeeShiftAssign.map((item) => item.shift_chk == 0 ? { ...item, is_checked: checked } : item);
        } else {
            data = listEmployeeShiftAssign.map((item) =>
                item.id === parseInt(value) ? { ...item, is_checked: checked } : item
            );
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].is_checked === true) {
                idList.push(data[i].id);
            }
        }
        var x = idList.toString();
        setDeleteIdList(x);
        setAllCheck(data.every((item) => item.shift_chk == 0 ? item.is_checked : !allCheck));
        setListEmployeeShiftAssign(data);
    };
    //click search
    const searchClick = () => {
        setDeleteIdList('');
        let arrMsg = [];
        setError([]);
        setSuccess([]);
        //validation start Date
        if (!checkNullOrBlank(fromDate)) {
            let errMsg = t("JSE001").replace("%s", t("From Date"));
            arrMsg.push(errMsg);
        }
        //validation end Date
        if (!checkNullOrBlank(toDate)) {
            let errMsg = t("JSE001").replace("%s", t("To Date"));
            arrMsg.push(errMsg);
        }
        //validation check start date > end date
        if (checkNullOrBlank(fromDate) && checkNullOrBlank(toDate)) {
            if (formatDate(fromDate) > formatDate(toDate)) {
                let errMsg = t("JSE016").replace("%s", t("From Date")).replace("%s", t("To Date"));
                arrMsg.push(errMsg);
            }
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess([]);
        } else {
            searchListEmployeeShiftAssign(1, defaultPerPage, true);
            setCurrentPage(1);
        }
    }
    //change page
    const changePage = (newPage) => {
        setCurrentPage(newPage);
        searchListEmployeeShiftAssign(newPage, defaultPerPage);
    }
    //delete click
    const deleteClick = () => {
        if (isEmpty(deleteIdList)) {
            setSuccess([]);
            let errorMsg = t('JSE004');
            setError([errorMsg]);
        }
        else {
            setContent(t('Are you sure want to delete?')); setType('delete');
            setDeleteModalBox(!deleteModalBox);
            setError("");
        }
    }
    //export click
    const exportClick = async () => {
        setLoading(true);
        let params = {
            "company_id": listEmployeeShiftAssignData.company_id,
            "employee_id": listEmployeeShiftAssignData.employee_id,
            "employee_code": employeeCode,
            "employee_name": employeeName,
            "from_date": listEmployeeShiftAssignData.from_date,
            "to_date": listEmployeeShiftAssignData.to_date,
            "department_id": listEmployeeShiftAssignData.department_id,
            "shift_normal_rule_id": listEmployeeShiftAssignData.shift_normal_rule_id,
            "login_id": ApiPath.loginEmp,
        };
        let obj = {package_name: 'hr', url: ApiPath.EmployeeShiftAssignListExport, method: 'post', params, type: "blob" };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
        } else {
            const isReturnFile = response.headers["content-disposition"];
            if (isReturnFile) {
                let fileName = response.headers["content-disposition"].split("filename=")[1];
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", fileName);
                document.body.appendChild(link);
                link.click();
            }
            else {
                setError(response.message);
                setSuccess([]);
            }
        }
    }

    //delete data
    const deleteOK = async () => {
        setDeleteModalBox(!deleteModalBox);
        if (!isEmpty(deleteIdList)) {
            setLoading(true);
            let url = `${ApiPath.EmployeeShiftAssignList}/${deleteIdList}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
            let obj = { package_name: 'hr',url: url, method: 'delete' };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setTimeout(function () {
                    searchListEmployeeShiftAssign(1, defaultPerPage,false,true);
                    setCurrentPage(1);
                }, 300);
            } else {
                setSuccess([response.data.message]);
                setTimeout(function () {
                    let pageCheck = allCheck && currentPage === totalPage ? currentPage - 1 : currentPage;
                    searchListEmployeeShiftAssign(pageCheck, defaultPerPage);
                    setCurrentPage(pageCheck);
                }, 300);
            }
        }
    }

    //select from date
    const selectFromDate = (e) => {
        setFromDate(e);
    };
    //select to date
    const selectToDate = (e) => {
        setToDate(e);
    };
    //change shift name
    const selectShiftName = (e) => {
        setShiftNameID(e.target.value);
    };
    //change department
    const selectDepartmentName = (e) => {
        setDepartmentID(e.target.value);
    };

    return (
        <CRow className="employee-shift-assign-list">
            <CCol lg="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={deleteModalBox}
                    cancel={()=>setDeleteModalBox(!deleteModalBox)}
                    deleteOK={deleteOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblAllowanceList"><label>{t("Employee Shift Assign List")}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        {/* show search employee shift assign list*/}
                        <SearchEmployeeShiftAssignList
                            empID={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            fromDate={fromDate}
                            selectFromDate={selectFromDate}
                            toDate={toDate}
                            selectToDate={selectToDate}
                            selectDepartmentName={selectDepartmentName}
                            departmentID={departmentID}
                            department={department}
                            selectShiftName={selectShiftName}
                            shiftNameID={shiftNameID}
                            shiftName={shiftName}
                            searchClick={searchClick}
                            permission={permission}
                            ViewPermision={ViewPermision}
                        />
                        {/* show employee shift assign list */}
                        <EmployeeShiftAssignListTable
                            totalRow={totalRow}
                            listEmployeeShiftAssign={listEmployeeShiftAssign}
                            allCheck={allCheck}
                            changeCheckbox={changeCheckbox}
                            defaultPerPage={defaultPerPage}
                            changePage={changePage}
                            currentPage={currentPage}
                            totalPage={totalPage}
                            deleteClick={deleteClick}
                            exportClick={exportClick}
                            checkShowCheckbox={checkShowCheckbox}
                        />
                        {/* show model box confirm */}
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeShiftAssignListIndex() {
    return <Welcome />;
}
