/**
* Employee Allowance List
*
* @author  ht_nguyen
* @create  03/08/2021 (D/M/Y)
* @param
* @return
*/
import React, { useEffect, useState, useRef } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CRow,
    CCol
} from "@coreui/react";
import { withTranslation } from 'react-i18next';
import SearchEmployeeAllowanceList from "./SeachEmployeeAllowanceList";
import Moment from 'moment';
import EmployeeAllowanceListTable from "./EmployeeAllowanceListTable";
import { useHistory } from "react-router-dom";
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import { isEmpty } from "../../../hr/hr-common/common-validation/CommonValidation";
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';

function LegacyEmployeeAllowanceList({ t, i18n }) {

    const cardTitle = t('Employee Allowance List');

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState([]);

    const [deptState, setDeptState]                 = useState('');                 // for selected department value . int
    const [roleState, setRoleState]                 = useState('');                 // for selected role value. int
    const [selectedFromDate, setSelectedFromDate]   = useState(null);               // for seleted from date: datetime format
    const [selectedToDate, setSelectedToDate]       = useState(null);               // for seleceted to date: datetime format
    const [allowanceState, setAllowanceState]       = useState("");                 // for selected allowance title, int
    const [subAllowanceState, setSubAllowanceState] = useState("");
    const [mainTable, setMainTable]                 = useState([]);                  // for table row data
    const [rowCount, setRowCount]                   = useState('');                  // for selected sub allowance title, int
    const [currentPage, setActivePage]              = useState(1);                  // for Pagination
    const [totalPage, setTotalPage]                 = useState(1);                  // for Pagination
    const defaultPerPage                            = 20;
    const typingTimeoutRef                          = useRef(null);                 // keep value time out when rerender
    const [formSearchState, setFormSearchState]     = useState(null);               // keep form search when click button search
    const [loading,setLoading]                      = useState(false);              //for loading page
    const [content, setContent]                     = useState('');                 // for content
    const [type, setType]                           = useState('');                  // for type
    const [clearData, setClearData]                 = useState('');                 // for clear data
    const [idArr, setIdArr]                         = useState([]);                 // for array id
    const [nameArr, setNameArr]                     = useState([]);                  // for array name
    const [codeArr, setCodeArr]                     = useState([]);                  // for array code
    const [employeeName, setEmployeeName]           = useState('');                  // for employee name
    const [employeeCode, setEmployeeCode]           = useState('');                  // for employee code
    const [employeeID, setEmployeeID]               = useState('');                  //for employee id
    const [showModal, setShowModal]                 = useState(false);               // for show and hide modal
    const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For View_Permission API

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  lq_don
    * @create  03/08/2021 (D/M/Y)
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
    * @author  lq_don
    * @create  03/08/2021 (D/M/Y)
    * @param
    * @return
    */
        useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);
    /** Form load start */
    useEffect(() => {
        setLoading(true);
        loadViewPermission();
        loadDept();
        loadRole();
        loadAllowance();
    }, [])

    /** Form load start */
    const loadViewPermission = async () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(response.data.view_permission);
            if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
            }
        }
    };

    /** Start Deparment Name API */
    const [departmentAPI, setDepartmentAPI] = useState([]);
    const loadDept = async() => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    };

    function deptChange(e) {
        setDeptState(e.target.value);
    }
    /** End Deparment Name API */

    /** Start Role API */
    const [roleAPI, setRoleAPI] = useState([]);
    const loadRole = async() => {
        let obj = { package_name: 'hr', url: `${ApiPath.adminLevels}?company_id=${ApiPath.companyID}`, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
    };
    function roleChange(e) {
        setRoleState(e.target.value);
    }

    /** End Role API */
    let handleFromDateChange = (e) => {
        setSelectedFromDate(e);
    };
    let handleToDateChange = (e) => {
        setSelectedToDate(e);
    };
    /**
    * change autocomplete
    *
    * @author  lq_don
    * @create  03/09/2021 (D/M/Y)
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
    * @create  03/08/2021 (D/M/Y)
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
    /** End get Date value function */

    /** Start get allowance API an value function*/
    const [allowanceAPI, setAllowanceAPI] = useState([]);
    const loadAllowance = async() => {
        let obj = { package_name: 'hr', url: `${ApiPath.EmployeeAllowanceRegistrationGetAllowace}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`, method: 'get' };
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setAllowanceAPI([]) : setAllowanceAPI(response.data.data);

    }
    function onAllowanceTitleChange(e) {
        setAllowanceState(e.target.value)
    }
    /** End get allowance API and value function*/


    const changeAllowance=async(allowanceId)=>{
        let obj = { package_name: 'hr', url: `${ApiPath.EmployeeAllowanceRegistrationChangeAllowance}${allowanceId}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`, method: 'get' };
        let response = await ApiRequest(obj);
        if(response.flag === false){
        }else{
            let data = response.data.data;
            setSubAllowanceState('');
            data && setSubAllowanceAPI(data.filter(item => item.sub_allowance_name !== null));
        }
    }
    /** Start get Sub Allowance API  */
    const [subAllowanceAPI, setSubAllowanceAPI] = useState([]);
    useEffect(() => {

        const allowanceId = allowanceState;
        setSubAllowanceAPI([]);
        setSubAllowanceState('');
        if (allowanceId !== "") {
            changeAllowance(allowanceId);
        }
    }, [allowanceState])


    function onSubAllowanceTitleChange(e) {
        setSubAllowanceState(e.target.value);
    }
    /** End get Sub Allowance API  */

    /** Click Search function Start */
    // for show caption of table

    function clearAllBeforeSearch(){
        setError([]);
        setSuccess([]);
    }

    //Click Search
    function searchListTable() {
        clearAllBeforeSearch();
        let fromDate = null;
        let toDate = null;
        if (selectedFromDate != null) {
            fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
        }
        if (selectedToDate != null) {
            toDate = Moment(selectedToDate).format('YYYY-MM-DD');
        }
        if (fromDate != null && toDate == null) {
            let errMsg = t('JSE001').replace('%s', t('To Date'));
            setError([errMsg]);
        } else if (toDate != null && fromDate == null) {
            let errMsg = t('JSE001').replace('%s', t('From Date'));
            setError([errMsg]);
        } else if (fromDate > toDate) {
            let errMsg = t('JSE002').replace('%s', t('From Date')).replace('%s', t('To Date'));
            setError([errMsg]);
        } else {
            const requestFormSearch = {
                admin_level_id: roleState,
                employee_id: employeeID,
                emp_name: employeeName,
                emp_code: employeeCode,
                sub_allowance_id: subAllowanceState,
                department_id: deptState,
                joined_date_from: fromDate,
                joined_date_to: toDate,
                allowance_id: allowanceState,
                company_id: ApiPath.companyID,
                language: ApiPath.lang
            }
            setFormSearchState(requestFormSearch);
            searchAPI(1, defaultPerPage, requestFormSearch, true);
        }
    }
    /** Click Search function End */

    // call API search
    const searchAPI= async(page = 1, perPage = 20, formSearch = null, messageSuccess = true)=>{
        let obj = {
            package_name: 'hr',
            url: ApiPath.EmployeeAllowanceListSearch,
            method: 'post',
            params: { ...formSearch,page,per_page: perPage}
        }
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            messageSuccess && response.data.message && setError([response.data.message]);
            setRowCount("");
            messageSuccess && setSuccess([]);
            setMainTable([]);
            setError(response.message);
        } else {
            setMainTable(response.data.data);
            setRowCount(response.data.total);
            setTotalPage(response.data.last_page);
            setActivePage(page);
            setAllCheck(false);
            setDeleteIDList('');
            messageSuccess && setError([]);
            messageSuccess && setSuccess([]);
        }
    }


    /** Check boxes of table function Start */
    function handleTblCheckboxes(e) {
        let value = e.target.value;
        let checked = e.target.checked;
        let data;
        let id_list = [];
        if (value === 'all-check') {
            data = mainTable.map(item => ({ ...item, isChecked: checked }));
        } else {
            data = mainTable.map(item =>
                item.id === parseInt(value) ? { ...item, isChecked: checked } : item
            );
        }
        for (let i = 0; i < data.length; i++) {
            if (data[i].isChecked) {
                id_list.push(data[i].id);
            }
        }
        let x = id_list.toString();
        setDeleteIDList(x);
        setAllCheck(data.every(item => item.isChecked));
        setMainTable(data);
    }
    /** Check boxes of table function End */


    /** Click Edit function Start */
    const [editModalBox, setEditModalBox] = useState(false);
    const [editID, setEditID] = useState('');
    const history = useHistory();
    const editToggleAlert = (e) => {
        setEditID(parseInt(e.target.id));
        setShowModal(!showModal);
        setContent(t('Are you sure want to edit?')); setType('edit');
    }
    const editOnClose = () => {
        setEditID('');
        setEditModalBox(!editModalBox);
    }
    const editOK = () => {
        setShowModal(!showModal);
        editRow(editID);
    }
    // link to next page

    const editRow = (id) => {
        const listValidId = mainTable.map(i => i.id);
        let isValid = listValidId.includes(id);
        if (isValid) {
            sessionStorage.setItem('RETURN_EAR_DATA', JSON.stringify(id));
            history.push("./employee-allowance-registration");
        } else {
            let errMsg = t('JSE009').replace("%s", t("Employee Id"));
            setError([errMsg]);
        }

    }
    /** Click Edit function End */

    /** Click Delete function Start */
    const [deleteModalBox, setDeleteModalBox] = useState(false);
    const [deleteIDList, setDeleteIDList] = useState('');
    const [allCheck, setAllCheck] = useState('');

    function cancelModel() {
        if(type!='edit'){
            if (!isEmpty(deleteIDList)) {
                if(showModal==false)
                {
                    setContent(t('Are you sure want to delete?')); setType('delete');
                    setShowModal(!showModal);
                }else{
                    setShowModal(!showModal);
                }
            } else {
                showErrWhenEmptyIDtoDelete();
            }
        }else{
            setEditID('');
            setShowModal(!showModal);
            setType('');
        }
    }
    const deleteOK=async()=> {
        setShowModal(!showModal);
        if (!isEmpty(deleteIDList)) {
            let url = `${ApiPath.EmployeeAllowanceListDelete}${deleteIDList}&language=${ApiPath.lang}`;
            let obj = { package_name: 'hr', url: url, method: 'delete' };
            setLoading(true);
            let response = await ApiRequest(obj);
            if(response.flag === false){
                console.log(response.message);
                setSuccess([]);
                let errorMsg = response.message;
                errorMsg && setError(errorMsg);
            }else{
                let successMsg = response.data.message;
                successMsg && setSuccess([successMsg]);
                setError([]);
                setTimeout(function () {
                searchAPI(allCheck && currentPage === totalPage ? currentPage - 1 : currentPage, defaultPerPage, formSearchState, false);
                }, 500);
            }
            setLoading(false);
        } else {
            showErrWhenEmptyIDtoDelete();
        }
    }
    function showErrWhenEmptyIDtoDelete() {
        setSuccess([]);
        let errorMsg = t('JSE004');
        setError([errorMsg]);
    }
    /** Click Delete function End */

    let changePage = newPage => {
        searchAPI(newPage, defaultPerPage, formSearchState, true);
    }
    return (
        <CRow className="employee-allowance-list">
            <CCol xs="12">
            <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={showModal}
                    cancel={cancelModel}
                    deleteOK={deleteOK}
                    editOK={editOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5><label>{cardTitle}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchEmployeeAllowanceList
                            employeeID={employeeID}
                            employeeCode={employeeCode}
                            employeeName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            deptChange={deptChange}
                            deptState={deptState}
                            departmentAPI={departmentAPI}
                            roleChange={roleChange}
                            roleState={roleState}
                            roleAPI={roleAPI}
                            allowanceState={allowanceState}
                            allowanceAPI={allowanceAPI}
                            onAllowanceTitleChange={onAllowanceTitleChange}
                            subAllowanceState={subAllowanceState}
                            subAllowanceAPI={subAllowanceAPI}
                            onSubAllowanceTitleChange={onSubAllowanceTitleChange}
                            searchAPI={searchListTable}
                            selectedFromDate={selectedFromDate}
                            handleFromDateChange={handleFromDateChange}
                            selectedToDate={selectedToDate}
                            handleToDateChange={handleToDateChange}
                            viewPermissionAPI={viewPermissionAPI}
                            ViewPermision={ViewPermision}
                        />
                    </CCardBody>
                    <CCardBody>
                        <EmployeeAllowanceListTable
                            ViewPermision={ViewPermision}
                            viewPermissionAPI={viewPermissionAPI}
                            mainTable={mainTable}
                            rowCount={rowCount}
                            handleTblCheckboxes={handleTblCheckboxes}
                            editToggleAlert={editToggleAlert}
                            cancelModel={cancelModel}
                            currentPage={currentPage}
                            defaultPerPage={defaultPerPage}
                            allCheck={allCheck}
                            totalPage={totalPage}
                            changePage={changePage}
                        />
                    </CCardBody>
                </CCard>

            </CCol>
        </CRow>
    )
}

const EmpList = withTranslation()(LegacyEmployeeAllowanceList);

export default function EmployeeAllowanceList() {
    return (
        <EmpList />
    )
};

