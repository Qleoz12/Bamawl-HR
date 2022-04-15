import React ,{ useState, useEffect, useRef} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import Moment from 'moment';
import SearchCalculationList from './SearchPayrollCalculationList';
import CalculationListTable from './PayrollCalculationListTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Message from '../../../brycen-common/message/Message';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from "../../../brycen-common/loading/Loading";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';

// use hoc for functional based components
function LegacyWelcomeClass({ t}) {
  const history                                 = useHistory();   // For edit link
  const [error,setError]                        = useState([]);   // For Error Message
  const [success,setSuccess]                    = useState("");   // For Success Message
  const [departmentAPI, setDepartmentAPI]       = useState([]);   // For Dept API
  const [roleAPI, setRoleAPI]                   = useState([]);   // ForviewPermissionAPI
  const [viewPermissionAPI, setViewPermissionAPI] = useState([]);   // For Role API
  const [methodAPI, setMethodAPI]               = useState([]);   // For methods API
  const [empId, setEmpId]                       = useState('');   // For employee id dropdown toggle
  const [empCode, setEmpCode]                   = useState('');   // For employee code dropdown toggle
  const [empName, setEmpName]                   = useState('');   // For employee name dropdown toggle
  const [deptState, setDeptState]               = useState('');   // For department dropdown toggle
  const [roleState, setRoleState]               = useState('');   // For role dropdown toggle
  const [methodState, setmethodState]           = useState('');   // For method name dropdown toggle
  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate]     = useState(null); // For Joined End Date
  const [mainTable, setMainTable]               = useState([]);   // For Main Table
  const [rowCount , setRowCount]                = useState();     // For row count
  const [allCheck, setAllCheck]                 = useState(false);// For select checkbox all or not
  const [deleteIdList, setDeleteIdList]         = useState('');   // For delete data list
  const [deleteModalBox, setDeleteModalBox]     = useState(false);// Delete confirm box show or hide
  const [editModalBox, setEditModalBox]         = useState(false);// Edit confirm box show or hide
  const [editID, setEditID]                     = useState('');   // For Edit ID
  const [currentPage, setActivePage]            = useState(1);    // for Pagination
  const [totalPage, setTotalPage]               = useState(1);    // for Pagination
  const defaultPerPage                          = ApiPath.defaultPerPage;
  const typingTimeoutRef                        = useRef(null);    // keep value time out when rerender
  const [formSearchState, setFormSearchState]   = useState(null);  // keep form search when click button search
  const [clearData, setClearData]               = useState('');
  const [idArr, setIdArr]                       = useState([]); //for show array id
  const [nameArr, setNameArr]                   = useState([]); //for show array name
  const [codeArr, setCodeArr]                   = useState([]); //for show array code
  const [loading, setLoading]                   = useState(false);
  const [content, setContent]                   = useState('');
  const [type, setType]                         = useState('');
  /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  nt_linh
    * @create  29/07/2021 (D/M/Y)
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
    * @author  nt_linh
    * @create  29/07/2021 (D/M/Y)
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
    * @author  nt_linh
    * @create  29/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    setLoading(true);
    loadRole();
    loadDept();
    loadMethod();
    loadViewPermission();
  }, []);

  /* GET VIEW PERMISSION */
  const loadViewPermission = async () => {
    let response = await ApiViewPermission.loadViewPermission();
    setLoading(false);
    if (response.flag !== false) {
        setViewPermissionAPI(response.data.view_permission);
        if(parseInt(response.data.view_permission)===ViewPermision.ONLY_ME){
          setEmpId(response.data.data[ApiPath.loginEmp].employee_id)
          setEmpCode(response.data.data[ApiPath.loginEmp].code)
          setEmpName(response.data.data[ApiPath.loginEmp].name_eng)
        }
    }
  };

  /* GET ROLE SELECT BOX */
  const loadRole = async() => {
    let params = {
        company_id: ApiPath.companyID,
      }
    let data = {
        package_name: 'hr',
        url: ApiPath.adminLevels,
        method: 'get',
        params
      }
    let response = await ApiRequest(data);
    setLoading(false);
    response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
  };
  let roleChange = (e) =>{
    setRoleState(e.target.value);
  }

  /* GET DEPARTMENT SELECT BOX */
  const loadDept = async () => {
    let obj = {
        package_name: 'erp',
        url: ApiPath.ERPGetAllDepartment,
        method: 'get'
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setDepartmentAPI([]) : setDepartmentAPI(response.data.data);
  };

  let deptChange = (e) =>{
    setDeptState(e.target.value);
  }

  /* GET Method NAME SELECT BOX */
  const loadMethod = async() => {
    let obj = {
        package_name: 'hr',
        url: ApiPath.PayrollCalculationListGetMethods,
        method: 'get'
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setMethodAPI([]) : setMethodAPI(response.data.data);
  };

   /**
    * change autocomplete
    *
    * @author  nt_linh
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const changeAutocomplete = async (type, i) => {
        setError([]); setSuccess([]); setClearData('');

        // type is id, show name in Employee ID and clear remain input
        if (type === 'id') {
            setEmpId(i.target.value); setEmpCode(''); setEmpName('');
        }
        // type is code, show name in Employee Code and clear remain input
        else if (type === 'code') {
            setEmpId(''); setEmpCode(i.target.value); setEmpName('');
        }
        // type is name, show name in Employee Name and clear remain input
        else {
            setEmpId(''); setEmpCode(''); setEmpName(i.target.value);
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
    * @author  nt_linh
    * @create  30/07/2021 (D/M/Y)
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
            setEmpId(response.data.data[0].employee_id);
            setEmpName(response.data.data[0].name);
            setEmpCode(response.data.data[0].employee_code);
        }
    }

  let methodChange = (e) =>{
    setmethodState(e.target.value);
  }

  const clearAllBeforeSearch = () => {
    setError([]);
    setSuccess("");
  }

  const searchListTable = () => {
    clearAllBeforeSearch();
    let fromDate = null;
    let toDate = null;
    if(selectedFromDate != null){
      fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
    }
    if(selectedToDate != null){
      toDate = Moment(selectedToDate).format('YYYY-MM-DD');
    }
    if(fromDate != null && toDate == null){
      let errMsg = t('JSE001').replace('%s',t('To Date'));
      setError([errMsg]);
    }else if(toDate != null && fromDate == null){
      let errMsg = t('JSE001').replace('%s',t('From Date'));
      setError([errMsg]);
    }else if(fromDate > toDate){
      let errMsg = t('JSE002').replace('%s',t('From Date')).replace('%s',t('To Date'));
      setError([errMsg]);
    }else{
      const requestFormSearch = {
        "department_id": deptState,
        "admin_level_id": roleState,
        "joined_date_from": fromDate,
        "joined_date_to": toDate,
        "employee_id": empId,
        "emp_name": empName,
        "emp_code": empCode,
        "calculate_method_id": methodState,
        "company_id": ApiPath.companyID,
        "language": ApiPath.lang
      }
      setFormSearchState(requestFormSearch);
      searchAPI(1, defaultPerPage, requestFormSearch, true);
    }
  }

  const searchAPI = async(page = 1, perPage = 20, formSearch = null, messageSuccess = true) => {
    setLoading(true);
    const params = {
        ...formSearch, page,
        per_page: perPage
      }
    let obj = { package_name: 'hr',
        url: ApiPath.PayrollCalculationListGetSearch,
        method: 'post',
        params
     };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setRowCount("");
        messageSuccess && setError(response.message);
        messageSuccess && setSuccess("");
        setMainTable([]);
    } else {
        setRowCount(response.data.total);
        setMainTable(response.data.data);
        setTotalPage(response.data?.last_page);
        setActivePage(page);
        setAllCheck(false);
        setError("");
        setDeleteIdList('');
        messageSuccess && setSuccess("");
    };
  };

  /* CHECKBOX ACTION */
  const changeCheckbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let idList = [];

    if (value === "all-check") {
      data = mainTable.map((item) => ({ ...item, is_checked: checked }));
    } else {
      data = mainTable.map((item) =>
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

    setAllCheck(data.every((item) => item.is_checked));
    setMainTable(data);
  };

  /* Show dropdown toggle */

  const theChosenJoinStartDate = () => {
    const chosenJoinedDate = selectedFromDate;
    if (chosenJoinedDate != null) {
      return chosenJoinedDate ? t("From") + ": " + Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(chosenJoinedDate) : t("From Date");
    } else {
      return chosenJoinedDate ? t("From") + ": " + Intl.DateTimeFormat(): t("From Date");
    }
  };
  const theChosenJoinEndDate = () => {
    const chosenJoinedDate = selectedToDate;
    if (chosenJoinedDate != null) {
      return chosenJoinedDate ? t("To") +": " + Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(chosenJoinedDate): t("To Date");
    } else {
      return chosenJoinedDate ? t("To") + ": " + Intl.DateTimeFormat(): t("To Date");
    }
  };
  let handleFromDateChange = (e) => {
    setSelectedFromDate(e);
  };
  let handleToDateChange = (e) => {
    setSelectedToDate(e);
  };
  let removeFromDate = () => {
    setSelectedFromDate(null);
  };
  let removeToDate = () => {
    setSelectedToDate(null);
  };

  /* DELETE method MODAL BOX */
  const deleteToggleAlert =  () => {
    if(isEmpty(deleteIdList)){
      setSuccess("");
      let errorMsg = t('JSE004');
      setError([errorMsg]);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    else{
      setDeleteModalBox(!deleteModalBox);
      setContent(t('Are you sure want to delete?')); setType('delete');
      setError("");
    }
  };
  const deleteOK = async () => {
    setDeleteModalBox(!deleteModalBox);
    setLoading(true);
    if (!isEmpty(deleteIdList)) {
        let obj = { package_name: 'hr', url: `${ApiPath.PayrollCalculationListDelete}${deleteIdList}?language=${ApiPath.lang}`, method: 'delete' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess("");
            let errorMsg = response.message;
            setError(errorMsg);
        } else {
            let successMsg = response.data.message;;
            setSuccess([successMsg]);
            setError("");
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            setTimeout(function () {
              searchAPI(allCheck && currentPage === totalPage ? currentPage -1 : currentPage, defaultPerPage, formSearchState, false);
            }, 500);
        };
    }

  };

  /* EDIT method MODAL BOX */
  const editToggleAlert = (e) => {
    setError("");
    setSuccess("");
    setEditID(e["id"]);
    setContent(t('Are you sure want to edit?')); setType('edit');
    setEditModalBox(!editModalBox);
  };

  const cancelClick = () => {
    setEditID("");
    setEditModalBox(false);
    setDeleteModalBox(false);
  }

  const editOK = () => {
    setEditModalBox(!editModalBox);
    editRow(editID);
  };
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    sessionStorage.setItem("RETURN_PRCMS_DATA", JSON.stringify(id));
    history.push("./payroll-calculation-method-setup");
  };

  let changePage = newPage => {
    searchAPI(newPage, defaultPerPage, formSearchState, true);
  }

  let searchList = () => {
    searchListTable();
  }

  return (
    <CRow>
      <CCol xs="12">
      <Loading start={loading} />
        <Message success={success} error={error} />
        <CCard>
            <CCardHeader>
              <h5><label>{t('Payroll Calculation List')}</label></h5>
            </CCardHeader>
            <CCardBody className="payrollRuleCalculationList">
                <SearchCalculationList
                    viewPermissionAPI={viewPermissionAPI}
                    idArr={idArr}
                    employeeID={empId}
                    codeArr={codeArr}
                    employeeCode={empCode}
                    nameArr={nameArr}
                    employeeName={empName}
                    changeAutocomplete={changeAutocomplete}
                    selectAutocomplete={selectAutocomplete}
                    departmentAPI={departmentAPI}
                    deptState={deptState}
                    deptChange={deptChange}
                    roleAPI={roleAPI}
                    roleState={roleState}
                    roleChange={roleChange}
                    methodAPI={methodAPI}
                    methodState={methodState}
                    methodChange={methodChange}
                    theChosenJoinStartDate={theChosenJoinStartDate}
                    theChosenJoinEndDate={theChosenJoinEndDate}
                    selectedFromDate={selectedFromDate}
                    handleFromDateChange={handleFromDateChange}
                    selectedToDate={selectedToDate}
                    handleToDateChange={handleToDateChange}
                    removeFromDate={removeFromDate}
                    removeToDate={removeToDate}
                    searchList={searchList}
                />
                <CalculationListTable
                    mainTable={mainTable}
                    rowCount={rowCount}
                    AllCheck={allCheck}
                    changeCheckbox={changeCheckbox}
                    editToggleAlert={editToggleAlert}
                    currentPage={currentPage}
                    defaultPerPage={defaultPerPage}
                    totalPage={totalPage}
                    changePage={changePage}
                    deleteToggleAlert={deleteToggleAlert}
                />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    show={editModalBox || deleteModalBox}
                    type={type}
                    cancel={cancelClick}

                    deleteModalBox={deleteModalBox}
                    deleteToggleAlert={deleteToggleAlert}
                    deleteOK={deleteOK}
                    editModalBox={editModalBox}
                    editOK={editOK}
                    />
            </CCardBody>
        </CCard>
      </CCol>
    </CRow>
);
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function PayrollCalculationList() {
  return (
    <Welcome />
  )
}
