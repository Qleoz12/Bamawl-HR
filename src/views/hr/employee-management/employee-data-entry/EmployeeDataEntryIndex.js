/**
* Employee Data Entry
*
* @author  ht_nguyen
* @create  08/07/2021 (D/M/Y)
* @param
* @return
*/

import React, { useState, useEffect } from "react";
import { CCol, CRow, CCard, CCardHeader, CCardBody } from "@coreui/react";
import { useTranslation, withTranslation } from 'react-i18next';
import SearchEmployeeDataEntry from "./SearchEmployeeDataEntry";
import ResultTable from "./EmployeeDataEntryResultTable";
import PersonalDataEntry from "./EmployeeDataEntryPersonalDataEntry";
import FamilyDataEntry from "./EmployeeDataEntryFamilyDataEntry";
import SalaryDataEntry from "./EmployeeDataEntrySalaryDataEntry";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyEmployeeDataEntryIndex() {
    const { t } = useTranslation();
    const [error, setError]                       = useState([]);
    const [success, setSuccess]                   = useState([]);
    const [loading, setLoading]                   = useState(false);                     // for selected employee name
    const [departmentAPI, setDepartmentAPI]       = useState([]);                       // For Dept API
    const [deptState, setDeptState]               = useState("");                       // for show department name
    const [mainTable, setMainTable]               = useState([]);                       // for table row data
    const [rowCount, setRowCount]                 = useState('');                       // for selected sub allowance title
    const [currentPage, setActivePage]            = useState(1);                        // for Pagination
    const [totalPage, setTotalPage]               = useState(1);                        // keep value time out when rerender
    const [formSearchState, setFormSearchState]   = useState(null);                     // keep form search when click button search
    const [clearData, setClearData]               = useState('');
    const [idArr, setIdArr]                       = useState([]);
    const [nameArr, setNameArr]                   = useState([]);
    const [codeArr, setCodeArr]                   = useState([]);
    const [employeeName, setEmployeeName]         = useState('');
    const [employeeCode, setEmployeeCode]         = useState('');
    const [employeeID, setEmployeeID]             = useState('');
    const [viewPermissionAPI, setViewPermissionAPI]             = useState(ViewPermision.ALL) // for view permission


    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
    * @create  27/07/2021 (D/M/Y)
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
    * @create  27/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (clearData !== '') {
            setIdArr([]); setNameArr([]); setCodeArr([]);
        }
    }, [clearData]);

    //#region Formload
    useEffect(() => {
        loadDept();
        loadViewPermission();
    }, []);
    //#endregion
    /**
    * Load view permission user login
    *
    * @author  lq_don
    * @create  19/08/2021 (D/M/Y)
    * @param
    * @return
    */
     const loadViewPermission = async  () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setViewPermissionAPI(Number(response.data.view_permission));
            if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
                setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
                setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
                setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
            }      
        }
    }
    //#region Department Name API
    const loadDept = async () => {
        let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
    }

    let deptChange = (e) => {
        setDeptState(e.target.value);
    };
    //#endregion

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

    //#region Search Function
    const clickSearch = () => {
        setSuccess([]);
        setError([]);
        setMainTable([]);
        setRowCount('');

        let formSearch = {
            company_id: ApiPath.companyID,
            language: ApiPath.lang,
            employee_id: employeeID === '' ? null : employeeID,
            employee_code: employeeCode === '' ? null : employeeCode,
            employee_name: employeeName === '' ? null : employeeName,
            department_id: deptState === '' ? null : deptState,
        };
        let dataSearch = {
            ...formSearch,
            page: 1,
            per_page: ApiPath.defaultPerPage,
        };

        setFormSearchState(formSearch);
        searchAPI(dataSearch);
    };

    const searchAPI = async (dataToSearch) => {
        setLoading(true);
        let obj = {package_name: 'hr', url: ApiPath.EmployeeDataEntrySearch, method: 'post', params: dataToSearch };
        let response = await ApiRequest(obj);
        setLoading(false);
        if(response.flag === false){
            setError(response.message);
        }else{
            if (
                response.data?.message
                || response.data?.current_page
                || response.data?.total
                || response.data?.last_page
            ) {
                setMainTable(response.data.data);
                setActivePage(response.data.current_page);
                setRowCount(response.data.total);
                setTotalPage(response.data.last_page);
            } else {
                alert("Wrong attribute from API when success");
            };
        }
    };
    //#endregion

    //#region Validation
    const validateSearch = (dataToSearch) => {
        let errState = [];
        return { isPass: errState.length === 0, errState: errState };
    };

    const validateFile = (fileToValidate) => {
        const file = fileToValidate;
        //validate file name and file format
        const regex = /^([a-zA-Z0-9()\s_\\.\-:])+(.xls|.xlsx)$/;
        if (typeof (file) !== 'object' || !regex.test(file.name.toLowerCase())) {
            return false;
        };
        //validate null file
        if (file.size === 0) {
            return false;
        };
        // if pass all cases, return true;
        return true;
    };
    //#endregion

    //#region Pagination function
    let changePage = newPage => {
        setError([]);
        setSuccess([]);
        let { isPass, errState } = validateSearch(formSearchState);
        if (isPass) {
            const dataToSearch = {
                ...formSearchState,
                page: newPage,
                defaultPerPage: ApiPath.defaultPerPage,
            };
            searchAPI(dataToSearch);
        }else {
            setSuccess([]);
            let errMsg = [];
            errState.forEach(element => {
                errMsg.push(t('JSE009').replace("%s", t(element)));
            });
            setError(errMsg);
        };
    };
    //#endregion

    //#region Download File Function
    const handleDownload = (e) => {
        setError([]);
        setSuccess('');
        let caseDownload = e.target.id;
        let params = {
            "company_id": ApiPath.companyID,
            "language": ApiPath.lang,
            "employee_id": employeeID,
            "employee_code": employeeCode,
            "employee_name": employeeName,
            "department_id": deptState,
            "created_emp": ApiPath.createdEmp,
        };
        switch (caseDownload) {
            case "btnFormatDownloadPDE":
                let urlToDownloadPDE = getFullLinkDownload(ApiPath.EmployeeDataEntryExportPersonalDataEntry, params);
                axiosDownloadFile(urlToDownloadPDE);
                break;
            case "btnFormatDownloadFDE":
                let urlDownloadFDE = getFullLinkDownload(ApiPath.EmployeeDataEntryExportFamilyDataEntry, params);
                axiosDownloadFile(urlDownloadFDE);
                break;
            case "btnFormatDownloadSDE":
                let leturlDownloadSDE = getFullLinkDownload(ApiPath.EmployeeDataEntryExportSalaryDataEntry, params);
                axiosDownloadFile(leturlDownloadSDE);
                break;
            default:
                break;
        };
    };

    const getFullLinkDownload = (url, params) => {
        return `${url}`
            + `?company_id=${ApiPath.companyID}`
            + `&language=${ApiPath.lang}`
            + `&employee_id=${params.employee_id}`
            + `&employee_code=${params.employee_code}`
            + `&employee_name=${params.employee_name}`
            + `&department_id=${params.department_id}`
            + `&created_emp=${params.created_emp}`;
    };

    const axiosDownloadFile = async (urlToDownload) => {
        setLoading(true);
        let obj = { package_name: 'hr', url: urlToDownload, method: 'get', type: "blob" };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
        } else {
            let fileName = response.headers["content-disposition"].split('filename=')[1];
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        }
    };
    //#endregion

    //#region Import File Function
    const handleImport = (e) => {
        setSuccess([]);
        setError([]);
        let caseImport = e.target.id;
        let file = e.target.files[0];
        let isFileOK = validateFile(file);
        if (!isFileOK) {
            setError([t('JSE037')]);
            return;
        };
        let formData = new FormData();
        formData.append('company_id', ApiPath.companyID);
        formData.append('file', file);
        formData.append('created_emp', ApiPath.createdEmp);
        formData.append('updated_emp', ApiPath.updatedEmp);
        formData.append('language', ApiPath.lang);

        switch (caseImport) {
            case "btnImportPDE":
                axiousUploadFile(ApiPath.EmployeeDataEntryImportPersonalDataEntry, formData);
                break;
            case "btnImportFDE":
                axiousUploadFile(ApiPath.EmployeeDataEntryImportFamilyDataEntry, formData);
                break;
            case "btnImportSDE":
                axiousUploadFile(ApiPath.EmployeeDataEntryImportSalaryDataEntry, formData);
                break;
            default:
                break;
        };
        e.target.value = "";  //reset input file
    };

    const axiousUploadFile = async (url, formData) => {
        setLoading(true);
        let obj = {package_name: 'hr', url:url, method: 'post',  params: formData };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            setError(response.message);
        } else {
            setSuccess([response.data.message]);
        }
    };

    // for space or enter when focus
    const onUploadFileLabelPress = (evt) => {
        let keyCode = evt.which || evt.keyCode;
        if (keyCode === 13 || keyCode === 32) {
            evt.target.click();
        };
    };
    //#endregion

    return (
        <CRow className="employee-data-entry">
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5 id="pageTitle">{t('Employee Data Entry')}</h5>
                    </CCardHeader>
                    <CCardBody>
                        <SearchEmployeeDataEntry
                            empId={employeeID}
                            empCode={employeeCode}
                            empName={employeeName}
                            changeAutocomplete={changeAutocomplete}
                            selectAutocomplete={selectAutocomplete}
                            idArr={idArr}
                            nameArr={nameArr}
                            codeArr={codeArr}
                            deptChange={deptChange}
                            deptState={deptState}
                            departmentAPI={departmentAPI}
                            search={clickSearch}
                            viewPermissionAPI={viewPermissionAPI}
                            ViewPermision={ViewPermision}
                        />
                        <br />
                        <ResultTable
                            rowCount={rowCount}
                            mainTable={mainTable}
                            changePage={changePage}
                            defaultPerPage={ApiPath.defaultPerPage}
                            currentPage={currentPage}
                            totalPage={totalPage}
                        />
                        {
                            mainTable && mainTable.length > 0 &&
                            <>
                                <PersonalDataEntry
                                    handleDownload={handleDownload}
                                    handleImport={handleImport}
                                    onUploadFileLabelPress={onUploadFileLabelPress} />
                                <br />
                                <FamilyDataEntry
                                    handleDownload={handleDownload}
                                    handleImport={handleImport}
                                    onUploadFileLabelPress={onUploadFileLabelPress} />
                                <br />
                                <SalaryDataEntry
                                    handleDownload={handleDownload}
                                    handleImport={handleImport}
                                    onUploadFileLabelPress={onUploadFileLabelPress} />
                            </>
                        }
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
};
const TranslateEmployeeDataEntry = withTranslation()(LegacyEmployeeDataEntryIndex);
export default function EmployeeDataEntryIndex() {
    return (
        <TranslateEmployeeDataEntry />
    )
};