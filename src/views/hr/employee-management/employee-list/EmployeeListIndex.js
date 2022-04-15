/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import Moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import ViewPermission from '../../../brycen-common/constant/ViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import EmployeeListResignationBox from './EmployeeListResignationBox';
import EmployeeListSearchBox from './EmployeeListSearchBox';
import EmployeeListTable from './EmployeeListTable';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {


  const [permission, setPermission] = useState(ViewPermission.All) // for view permission

  const history = useHistory(); // For edit link

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const [popupError, setPopupError] = useState([]);

  const [clearData, setClearData] = useState('');
  const [idArr, setIdArr] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [codeArr, setCodeArr] = useState([]);
  const [employeeID, setEmployeeID] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeName, setEmployeeName] = useState('');

  const [deptState, setDeptState] = useState(""); // for show department name
  const [roleState, setRoleState] = useState(""); // for show role name

  const [eligibleState, setEligibleState] = useState("");
  const [eligibleData, setEligibleData] = useState([]);

  const [statusState, setStatusState] = useState("");
  const [maritalStatusState, setMaritalStatusState] = useState("");
  const [genderState, setGenderState] = useState("");
  const [emailState, setEmailState] = useState("");

  const [resignState, setResignState] = useState("");

  const [selectedFromDate, setSelectedFromDate] = useState(null); // For Joined Start Date
  const [selectedToDate, setSelectedToDate] = useState(null);     // For Joined End Date

  const [selectedResignDate, setSelectedResignDate] = useState(null);
  const [selectedJoinDate, setSelectedJoinDate] = useState(null);

  const [resignModalBox, setResignModalBox] = useState(false);

  const [mainTable, setMainTable] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(1);    // for row count

  const [currentPage, setActivePage] = useState(1)  // for Pagination
  const [totalPage, setTotalPage] = useState(1)     // for Pagination
  const [perPage, setPerPage] = useState(1)         // for Pagination

  const typingTimeoutRef = useRef(null);    // keep value time out 
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [type, setType] = useState('');

  /** Start Form Load */
  useEffect(() => {
    setLoading(true);
    loadViewPermission();
    loadDept();
    loadRole();
    loadEligibleData();
    if (sessionStorage.getItem('RETURN_EMP_LIST_ID_EDIT'))
    sessionStorage.removeItem('RETURN_EMP_LIST_ID_EDIT');
  }, [loadRole, loadDept, loadViewPermission]);
  /** End Form Load */

  /* GET VIEW PERMISSION */
  const loadViewPermission = async () => {
    let params = {
      login_employee_id: ApiPath.loginEmp
    }
    let obj = { package_name: 'hr', url: ApiPath.employeeByViewPermission, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag !== false) {
      setPermission(parseInt(response.data.view_permission));
      if (parseInt(response.data.view_permission) === ViewPermission.ONLY_ME) {
        setEmployeeID(response.data.data[ApiPath.loginEmp].employee_id)
        setEmployeeCode(response.data.data[ApiPath.loginEmp].code)
        setEmployeeName(response.data.data[ApiPath.loginEmp].name_eng)
      }
    }
  };

  /**
    * If error state or success state is changed, scroll automatically to top
  */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [error, success]);

  /**
     * If clearData is changed, remove array in autocomplete
  */
  useEffect(() => {
    if (clearData !== '') {
      setIdArr([]); setNameArr([]); setCodeArr([]);
    }
  }, [clearData]);

  /* Get Employee Autocomplete  Start*/
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

  /* Get Employee Autocomplete  End*/

  /* START GET DEPARTMENT SELECT BOX */
  const [departmentAPI, setDepartmentAPI] = useState([]);
  const loadDept = async () => {
    let obj = { package_name: 'erp', url: ApiPath.ERPGetAllDepartment, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setError([]) : setDepartmentAPI(response.data.data);
  };
  /* END GET DEPARTMENT SELECT BOX */

  /* START GET ROLE NAME SELECT BOX */
  const [roleAPI, setRoleAPI] = useState([]);
  const loadRole = async () => {
    let obj = { package_name: 'hr', url: ApiPath.adminLevels + "?company_id=" + ApiPath.companyID, method: 'get' };
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setError([]) : setRoleAPI(response.data.data);
  };
  /* END GET ROLE NAME SELECT BOX */

  const loadEligibleData = () => {
    let data = [
      {
        id: 1,
        value: t("Eligible")
      },
      {
        id: 2,
        value: t("Non-Eligible")
      }
    ]
    setEligibleData(data);
  }

  const getEligibleData = (id) => {
    return eligibleData.find(element => element.id === parseInt(id)).value;
  }

  /* Start Get Data Form Search */
  let deptChange = (e) => {
    setDeptState(e.target.value);
  }
  let roleChange = (e) => {
    setRoleState(e.target.value);
  }
  let eligibleChange = (e) => {
    setEligibleState(e.target.value);
  }

  let statusChange = (e) => {
    setStatusState(e.target.value);
  }
  let maritalStatusChange = (e) => {
    setMaritalStatusState(e.target.value);
  }
  let genderChange = (e) => {
    setGenderState(e.target.value);
  }
  let emailChange = (e) => {
    setEmailState(e.target.value);
  }
  /* End Get Data Form Search */

  /* EDIT  MODAL BOX */
  const [editModalBox, setEditModalBox] = useState(false); // Edit confirm box show or hide
  const [editID, setEditID] = useState('');
  const [editIDIsNew, setEditIDIsNew] = useState('');
  const editToggleAlert = (e) => {
    setContent(t('Are you sure want to edit?'));
    setType('edit');
    setEditID(e['employee_id']);
    setEditIDIsNew(e['is_new']);
    setEditModalBox(!editModalBox);
  }
  const editOK = () => {
    setEditModalBox(!editModalBox);
    editRow(editID, editIDIsNew);
  }

  /** Start edit link next page */
  const editRow = (id, is_new) => {
    let param = { 'id': id, 'is_new': is_new }
    sessionStorage.setItem('RETURN_EMP_LIST_ID_EDIT', JSON.stringify(param));
    history.push("../employee-management/employee-personal");
  }
  /** End edit link next page */

  /** Start edit link next page */
  const getDetails = (e) => {
    sessionStorage.setItem('RETURN_EMP_LIST_ID_DETAILS', JSON.stringify(e['employee_id']));
    history.push("../profile/employee-information-detail");
  }
  /** End edit link next page */

  /* Start Search Function */
  const [requestState, setRequestState] = useState();
  const fnSearch = async () => {
    setError([]);
    setSuccess([]);
    let fromDate = null;
    let toDate = null;
    if (selectedFromDate != null) {
      fromDate = Moment(selectedFromDate).format('YYYY-MM-DD');
    } else {
      fromDate = selectedFromDate;
    }
    if (selectedToDate != null) {
      toDate = Moment(selectedToDate).format('YYYY-MM-DD');
    } else {
      toDate = selectedToDate;
    }
    if (fromDate != null && toDate == null) {
      let errMsg = t('JSE001').replace('%s', t('Joined Date (To)'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (toDate != null && fromDate == null) {
      let errMsg = t('JSE001').replace('%s', t('Joined Date (From)'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (fromDate > toDate) {
      let errMsg = t('JSE007').replace('%s', t('Joined Date (To)')).replace('%s', t('Joined Date (From)'));
      setError([errMsg]);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    else {
      const request = {
        language: ApiPath.lang,
        company_id: ApiPath.companyID,
        employee_id: employeeID,
        employee_code: employeeCode,
        employee_name: employeeName,
        department_id: deptState,
        eligible: eligibleState,
        from_date: fromDate,
        to_date: toDate,
        role_id: roleState,
        status: statusState,
        marital_status: maritalStatusState,
        gender: genderState,
        email: emailState
      }
      setRequestState(request);
      searchAPI(request);
    }
  }



  const searchAPI = async (request, page) => {
    page = parseInt(page) ? page : 1;
    setActivePage(page);
    request = { ...request, page: page }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      let params = request
      let obj = { package_name: 'hr', url: ApiPath.EmployeeListSearch, method: 'post', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message)
        setSuccess([]);
        setMainTable([]);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } else {
        setRowCount(t('Total Rows').replace('%s', response.data.total));
        setMainTable(response.data.data);
        setTotalPage(response.data.last_page);
        setPerPage(parseInt(response.data.per_page));
        setError([]);
        setSuccess([]);
      }
    }, 300);
  }

  /* End Search Function */

  /* Page active */
  async function pagination(i) {
    await searchAPI(requestState, i);
    setActivePage(i)
  }

  /* Start Resign Function */
  const resignAPI = async () => {
    if (resignState.resigned_flag === 1) {
      setPopupError([]);
      let resignDate = null;
      let joinDate = null;
      if (selectedResignDate != null) {
        resignDate = Moment(selectedResignDate).format('YYYY-MM-DD');
      } else {
        resignDate = selectedResignDate;
      }

      if (selectedJoinDate != null) {
        joinDate = Moment(selectedJoinDate).format('YYYY-MM-DD');
      } else {
        joinDate = selectedJoinDate;
      }

      if (resignDate != null && joinDate == null) {
        let errMsg = t('JSE001').replace('%s', t('Join Date'));
        setPopupError([errMsg]);
      } else if (joinDate != null && resignDate == null) {
        let errMsg = t('JSE001').replace('%s', t('Resign Date'));
        setPopupError([errMsg]);
      } else if (joinDate == null && resignDate == null) {
        let errMsg1 = t('JSE001').replace('%s', t('Join Date'));
        let errMsg2 = t('JSE001').replace('%s', t('Resign Date'));
        setPopupError([errMsg1, errMsg2]);
      } else if (resignDate < joinDate) {
        let errMsg = t('JSE007').replace('%s', t('Resign Date')).replace('%s', t('Join Date'));
        setPopupError([errMsg]);
      } else {
        const request = {
          company_id: ApiPath.companyID,
          language: ApiPath.lang,
          employee_id: resignState.employee_id,
          joined_date: joinDate,
          resigned_date: resignDate,
          device_flag: 1,
          login_id: ApiPath.loginEmp
        }
        setLoading(true);
        let params = request
        let obj = { package_name: 'hr', url: ApiPath.EmployeeListResign, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setPopupError(response.message)
        } else {
          closeResign();
          setError([]);
          setSuccess([response.data.message]);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(function () {
            searchAPI(requestState);
          }, 2500);
        }
      }
    }
    else if (resignState.resigned_flag === 0) {
      setPopupError([]);
      let resignDate = null;
      let joinDate = null;
      if (selectedResignDate != null) {
        resignDate = Moment(selectedResignDate).format('YYYY-MM-DD');
      } else {
        resignDate = selectedResignDate;
      }

      if (selectedJoinDate != null) {
        joinDate = Moment(selectedJoinDate).format('YYYY-MM-DD');
      } else {
        joinDate = selectedJoinDate;
      }

      if (joinDate == null) {
        let errMsg = t('JSE001').replace('%s', t('Join Date'));
        setPopupError([errMsg]);
      }
      else if (resignDate > joinDate) {
        let errMsg = t('JSE007').replace('%s', t('Join Date')).replace('%s', t('Resign Date'));
        setPopupError([errMsg]);
      }
      else {
        const request = {
          company_id: ApiPath.companyID,
          language: ApiPath.lang,
          employee_id: resignState.employee_id,
          joined_date: joinDate,
          device_flag: 1,
          login_id: ApiPath.loginEmp
        }
        setLoading(true);
        let params = request
        let obj = { package_name: 'hr', url: ApiPath.EmployeeListResign, method: 'post', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setPopupError(response.message)
        } else {
          closeResign();
          setError([]);
          setSuccess([response.data.message]);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(function () {
            searchAPI(requestState);
          }, 2500);
        }
      }
    }

  }
  /* End Resign Function */

  /* Start Export Function */
  const exportAPI = () => {
    const request = {
      language: ApiPath.lang,
      company_id: ApiPath.companyID,
      employee_id: requestState.employee_id,
      employee_code: requestState.employee_code,
      employee_name: requestState.employee_name,
      department_id: requestState.department_id,
      eligible: requestState.eligible,
      from_date: requestState.from_date,
      to_date: requestState.to_date,
      role_id: requestState.role_id,
      status: requestState.status,
      marital_status: requestState.marital_status,
      gender: requestState.gender,
      email: requestState.email,
      device_flag: 1,
      login_id: ApiPath.loginEmp
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      let params = request
      let obj = { package_name: 'hr', url: ApiPath.EmployeeListExport, method: 'post', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message)
      } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ExportEmployeePersonalDataList.csv'); //or any other extension
        document.body.appendChild(link);
        link.click();
      }
    }, 300);
  }

  /* End Export Function */

  /** Start Date In FormSearch */
  let handleFromDateChange = (e) => {
    setSelectedFromDate(e);
  };
  let handleToDateChange = (e) => {
    setSelectedToDate(e);
  };
  let removeFromDate = () => {
    setSelectedFromDate(null);
  }
  let removeToDate = () => {
    setSelectedToDate(null);
  }
  /** End Date In FormSearch */

  /** Start Date In Popup */
  let handleResignChange = (e) => {
    setSelectedResignDate(e);
  };
  let handleJoinDate = (e) => {
    setSelectedJoinDate(e);
  };
  let removeResignChange = () => {
    setSelectedResignDate(null);
  }
  let removeJoinDate = () => {
    setSelectedJoinDate(null);
  }
  /** End Date In Popup */

  const changeResign = (i) => {
    setResignState(i);
    setSelectedJoinDate(i.join_date);
    setSelectedResignDate(i.resigned_date);
    setResignModalBox(!resignModalBox);
  }

  const closeResign = () => {
    setPopupError([]);
    setSelectedJoinDate(null);
    setSelectedResignDate(null)
    setResignModalBox(!resignModalBox);
  }

  const removeMessagePopup = () => {
    setPopupError("");
  }

  return (
    <CRow>
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />

        <CCard>
          <CCardHeader className="pb-0">
            <h5 className="" id="cardTitle"><CLabel>{t('Employee List')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <EmployeeListSearchBox
              idArr={idArr}
              nameArr={nameArr}
              codeArr={codeArr}
              empID={employeeID}
              empCode={employeeCode}
              empName={employeeName}
              changeAutocomplete={changeAutocomplete}
              selectAutocomplete={selectAutocomplete}

              selectedFromDate={selectedFromDate}
              handleFromDateChange={handleFromDateChange}
              selectedToDate={selectedToDate}
              handleToDateChange={handleToDateChange}
              removeFromDate={removeFromDate}
              removeToDate={removeToDate}

              roleAPI={roleAPI}
              roleState={roleState}
              roleChange={roleChange}

              departmentAPI={departmentAPI}
              deptState={deptState}
              deptChange={deptChange}

              eligibleData={eligibleData}
              eligibleState={eligibleState}
              eligibleChange={eligibleChange}

              statusState={statusState}
              statusChange={statusChange}

              maritalStatusState={maritalStatusState}
              maritalStatusChange={maritalStatusChange}

              genderState={genderState}
              genderChange={genderChange}

              emailState={emailState}
              emailChange={emailChange}

              searchAPI={() => fnSearch()}

              permission={permission}
              ViewPermission={ViewPermission}
            />
            <EmployeeListTable
              rowCount={rowCount}
              changeResign={changeResign}
              mainTable={mainTable}
              editToggleAlert={editToggleAlert}
              getDetails={getDetails}

              getEligibleData={getEligibleData}

              totalPage={totalPage}
              currentPage={currentPage}
              pagination={pagination}

              exportAPI={exportAPI}

            />
            <EmployeeListResignationBox
              resignModalBox={resignModalBox}
              closeResign={closeResign}

              selectedResignDate={selectedResignDate}
              selectedJoinDate={selectedJoinDate}

              handleResignChange={handleResignChange}
              handleJoinDate={handleJoinDate}

              removeResignChange={removeResignChange}
              removeJoinDate={removeJoinDate}

              resignState={resignState}

              popupError={popupError}
              removeMessagePopup={removeMessagePopup}

              resignAPI={resignAPI}
            />
            <Confirmation
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              show={editModalBox}
              cancel={() => setEditModalBox(!editModalBox)}
              editOK={editOK}
            />

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeListIndex() {
  return (
    <Welcome />
  )
}