/* eslint-disable no-use-before-define */
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLabel,
  CRow
} from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
//import FormControl from 'react-bootstrap/FormControl';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlank, checkNullOrBlankRadio, isEmpty, validateSpecialCharacterT } from '../../hr-common/common-validation/CommonValidation';
import RoleAndPermissionRegistrationDashboardBox from './RoleAndPermissionRegistrationDashBoardBox';
import RoleAndPermissionRegistrationTable from './RoleAndPermissionRegistrationTable';
import SearchRoleAndPermissionRegistration from './SearchRoleAndPermissionRegistration';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");

  const [loading, setLoading]     = useState(false);
  const [roleState, setRoleState] = useState(""); // for show role name
  const [menuNameState, setMenuNameState] = useState("");
  const [seletedMenuNameData, setSelectedMenuNameData] = useState("");
  const [subMenuNameState, setSubMenuNameState] = useState("");
  const [seletedSubMenuNameData, setSelectedSubMenuNameData] = useState("");
  const [selectedRoleData, setSelectedRoleData] = useState(""); // for selected role id
  const [selectedRoleNameData, setSelectedRoleNameData] = useState(""); // for selected role name
  const [saveModalBox, setSaveModalBox] = useState(false); // for save button confirmation

  const [mainTable, setMainTable] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(""); // for row count
  const [employeeName, setEmployeeName] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [employeeID, setEmployeeID] = useState('');


  const [radioCheck, setRadioCheck] = useState(0);
  const [viewCheck, setViewCheck] = useState(0);
  const [originTable, setOriginTable] = useState([]);
  const [headTable, setHeadTable] = useState([]);
  const [content, setContent]  = useState('');
  const [type, setType] = useState('');
  /** Start Form Load */
  useEffect(() => {
    if (error.length > 0 || success.length > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
}, [error, success]);

  useEffect(() => {
    setLoading(true);
    ApiViewPermission.loadViewPermission();
    loadSubMenuName();
    loadMenuName();
    loadRoleName();
    // }, [loadRole, loadDept, loadEmp, loadOTName]);
  }, []);
  /** End Form Load */

  /* CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);
  const [deleteIdList, setDeleteIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let id = i.target.id;
    let data = [];
    let id_list = [];
    if (value === "all-check") {
      data = mainTable.map(item => (
        {
          ...item, ['action']: item.action.map((item2) => {
            if (item2.action_value === null) {
              return { ...item2, action_value: null }
            }
            return { ...item2, action_value: checked }
          })
        }));

    }
    else {
      let newID = id.toString().split("_")[1];
      data = mainTable.map((item, index) => (
        index == newID ? {
          ...item, ['action']: item.action.map((item2) => {
            if (item2.action_value === null) {
              return { ...item2, action_value: null }
            }
            return { ...item2, action_value: checked }
          })
        } : item))
    }

    setDeleteIdList(id_list);
    setMainTable(data);
    let getHeader = headTable.map(sec => sec)
    for (let i = 0; i < getHeader.length; i++) {
      let element = getHeader[i];
      let getAllAction = data.every(item =>
        item.action[i].action_name === element ? (item.action[i].action_value === null ? true : item.action[i].action_value) : {...item}
      );
      setAllCheck(getAllAction);
      if (getAllAction === false) {
        break;
      }
    }
  }
  //Check box of View
  const change_checkbox_data = (i) => {

    let value = i.target.value;
    let checked = i.target.checked;
    let id = i.target.id;
    let data = [];
    let permission = headTable.filter(sec => sec === value);
    let a = permission.toString()
    // Check ALL Permission in Header   
    if (value === a) {
      data = mainTable.map(item => (
        {
          ...item, ['action']: item.action.map((item2) => {
            if (item2.action_name === value) {
              if (item2.action_value === null) {
                return { ...item2, action_value: null }
              }
              return { ...item2, action_value: checked }
            } else {
              return { ...item2 }
            }
          })
        }));
    }
    // Check Value Permission in item
    else {
      let newID = id.toString().split("_")[1];
      let newVal = id.toString().split("_")[0];
      data = mainTable.map((item, index) =>
        index == newID ? {
          ...item, ['action']: item.action.map((item2) => {
            if (item2.action_name === newVal) {
              return { ...item2, action_value: checked }
            } else {
              return { ...item2 }
            }
          })
        } : item
      )
    }
    setMainTable(data);
    // Check ALL
    let getHeader = headTable.map(sec => sec)
    for (let i = 0; i < getHeader.length; i++) {
      let element = getHeader[i];
      let getAllAction = data.every(item =>
        item.action[i].action_name === element ? (item.action[i].action_value === null ? true : item.action[i].action_value) : { ...item }
      );
      setAllCheck(getAllAction);
      if (getAllAction === false) {
        break;
      }
    }
  }
  // Check box of Save
  // Refresh page with empty value
  let refresh = () => {
    window.location.reload(false);
  }

  /** start API for name menu */
  const [menuNameAPI, setMenuNameAPI] = useState([]);
  const loadMenuName = async() => {
    setLoading(false);
    let url = `${ApiPath.roleAndPerrmissionRegistrationMenuName}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
    let obj = { package_name : 'hr', url: url, method: 'get' };
    let response = await ApiRequest(obj);
    response.flag === false ? setMenuNameAPI([]) : setMenuNameAPI(response.data.data);
  };

  let menuNameChange = (e) => {
    setMenuNameState(e.target.value);
  }
  /** end API for name menu */

  /** start API for sub menu name */
  const [subMenuNameAPI, setSubMenuNameAPI] = useState([]);
  const loadSubMenuName = async() => {
    setLoading(false);
    let url = `${ApiPath.roleAndPerrmissionRegistrationSubMenuName}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
    let obj = { package_name : 'hr', url: url, method: 'get' };
    let response = await ApiRequest(obj);
    response.flag === false ? setSubMenuNameAPI([]) : setSubMenuNameAPI(response.data.data);
  };

  let subMenuNameChange = (e) => {
    setSubMenuNameState(e.target.value);
  }
  /** end API for sub menu name */

  /** start API for Role Name */
  const [roleAPI, setRoleAPI] = useState([]);
  const loadRoleName = async() => {
    setLoading(false);
    let url = `${ApiPath.adminLevels}?company_id=${ApiPath.companyID}`;
    let obj = { package_name : 'hr', url: url, method: 'get' };
    let response = await ApiRequest(obj);
    response.flag === false ? setRoleAPI([]) : setRoleAPI(response.data.data);
  };

  let RoleNameChange = (e) => {
  
      setSelectedRoleNameData(e.currentTarget.value);
    
  }
  /** end API for Role name */

  /* DELETE OVERTIME MODAL BOX */
  const [deleteModalBox, setDeleteModalBox] = useState(false); // Delete confirm box show or hide

  const deleteClick = () => {
        setContent(t('Are you sure want to delete?')); setType('delete');
        setDeleteModalBox(!deleteModalBox);
        setError("");
}

  const deleteOK = async() => {
    setDeleteModalBox(!deleteModalBox); 
        setLoading(true);
        let url = `${ApiPath.roleAndPerrmissionRegistrationDelete}${selectedRoleNameData}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}&language=${ApiPath.lang}`;
        let obj = { package_name : 'hr', url: url, method: 'delete' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
        } else {
            setSuccess([response.data.message]);
            setTimeout(function () {
              refresh(true)
            },2500);
        }
  }

  // handle change Radio button
  let handleRadioChange = (event) => {
    setRadioCheck(parseInt(event.currentTarget.id));
  }

  let handleViewChange = (e) => {
    setViewCheck(parseInt(e.currentTarget.id));
  }


  /** Start Search Function */
  const searchClick = () => {
    let arrMsg = [];
    setError([]);
    setSuccess('');
    //validation start
    if (!checkNullOrBlank(selectedRoleNameData)) {
      const errMsg = t("JSE001").replace("%s", t("Role Name"));
      arrMsg.push(errMsg);
    }
    if (arrMsg.length > 0) {
      setError([...arrMsg]);
      setSuccess("");
      setMainTable([]);
    } else {
      searchAPI(true);
    }
}

  const searchAPI = async (searchFlag = false) => {
      let roleAndPermissionData = {
        "admin_level_name": selectedRoleNameData,
        "sub_menu": subMenuNameState,
        "menu_id": menuNameState,
        "company_id": ApiPath.companyID,
        "language": ApiPath.lang,
        "login_id": ApiPath.loginEmp
      }
      if (searchFlag === true) {
        setMainTable(roleAndPermissionData);
      } else {
        roleAndPermissionData = mainTable;
      }
      setLoading(true);
      let params = {
        ...roleAndPermissionData
      }
      let obj = { package_name : 'hr', url: ApiPath.roleAndPerrmissionRegistrationSearch, method: 'post', params };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        setSuccess("");
        setMainTable([]);
      }
      else {
        setRowCount(response.data.row_count);
        setHeadTable(response.data.data.display_names);
        setMainTable(response.data.data.permissions);
        setOriginTable(response.data.data.permissions);
        setRadioCheck(response.data.data.dashboard_permission);
        setViewCheck(response.data.data.view_permission);
        for (let i = 0; i < response.data.data.display_names.length; i++) {
          let element = response.data.data.display_names[i];
          let getAllAction = response.data.data.permissions.every(item =>
            item.action[i].action_name === element ? (item.action[i].action_value === null ? true : item.action[i].action_value) : { ...item }
          );
          setAllCheck(getAllAction);
          if (getAllAction === false) {
            break;
          }
        }
        setError([]);
        setSuccess("");
      }
  }
  /** End Search Function */

  /** Start Save/Update function */
  const closeSaveAlert = () => {
    setSaveModalBox(!saveModalBox);
  }

  let saveData = () => {

    let errMsgAll = [];
    setError([]);
    setSuccess("");

    let role_data = [];
    // compare 2 table array and fill newest changed value
    mainTable.forEach((main, index) => {
      let table = main;
      let origin = originTable[index];
      if (JSON.stringify(table.action) !== JSON.stringify(origin.action)) {
        main = { ...main, is_change: true };
        role_data.push(main);
      }
    })
    let result = role_data.map(item => item.action.filter(val => val.action_value != null))
    let resultTable = role_data.map((item, index) => ({...item, action : result[index]}))
    if (!validateSpecialCharacterT(selectedRoleNameData)) {
      const errMsg = t("JSE148").replace("%s", t(" Role name"));
      errMsgAll.push(errMsg);
    }
    if (!checkNullOrBlankRadio(radioCheck)) {
      const errMsg = t("JSE001").replace("%s", t(" dashboard permission"));
      errMsgAll.push(errMsg);
    }
    if (!checkNullOrBlankRadio(viewCheck)) {
      const errMsg = t("JSE001").replace("%s", t(" view permission"));
      errMsgAll.push(errMsg);
    }
    if (isEmpty(resultTable)) {
      const errMsg = t("JSE129").replace("%s", t("Role And Permission Registration"));
      errMsgAll.push(errMsg);
    }
    if (errMsgAll.length > 0) {
      setError([...errMsgAll]);
      setSuccess("");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setContent(t('Are you sure want to save?')); setType('save');
      setSaveModalBox(!saveModalBox);
      setError([]);
      setSuccess("");
    }
  }
  const saveOK = async() => {
    setSaveModalBox(!saveModalBox);
    let role_data = [];
    // compare 2 table array and fill newest changed value
    mainTable.forEach((main, index) => {
      let table = main;
      let origin = originTable[index];
      if (JSON.stringify(table.action) !== JSON.stringify(origin.action)) {
        main = { ...main, is_change: true };
        role_data.push(main);
      }
    })
    let result = role_data.map(item => item.action.filter(val => val.action_value != null))
    let resultTable = role_data.map((item, index) => ({...item, action : result[index]}))

    let SaveRoleAndPermission = {
      "admin_level_name": selectedRoleNameData,
      "dashboard_permission": radioCheck,
      "view_permission": viewCheck,
      "login_id": ApiPath.loginEmp,
      "permissions": resultTable,
      "company_id": ApiPath.companyID,
      "language": ApiPath.lang
    }
    setLoading(true);
    let params = {
      ...SaveRoleAndPermission
    }
    let obj = { package_name : 'hr', url: ApiPath.roleAndPerrmissionRegistrationSave, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setSaveModalBox(!saveModalBox);
      setError(response.message);
      setSuccess("");
    }
    else {
      setError([]);
          setSuccess([response.data.message]);
            setMenuNameState("");
            setSubMenuNameState("");
    }
  }
  /** End Save/Update Function */

  const cancelClick = () => {
    setDeleteModalBox(false);
    setSaveModalBox(false);
  }
  return (
    <CRow>
      <CCol xs="12">
      <Message success={success} error={error} />
        <CCard>
          <CCardHeader>
            <h5><CLabel className = "mt-0">{t('Role And Permission Registration')}</CLabel></h5>
          </CCardHeader>
          <CCardBody>
            <Loading start={loading} />
            <SearchRoleAndPermissionRegistration
              subMenuNameAPI={subMenuNameAPI}
              roleAPI={roleAPI}
              setMenuNameState={setMenuNameState}
              menuNameAPI={menuNameAPI}
              searchClick={searchClick}
              menuNameState={menuNameState}
              menuNameChange={menuNameChange}
              subMenuNameChange={subMenuNameChange}
              isEmpty={isEmpty}
              setSelectedMenuNameData={setSelectedMenuNameData}
              setSubMenuNameState={setSubMenuNameState}
              subMenuNameState={subMenuNameState}
              setSelectedSubMenuNameData={setSelectedSubMenuNameData}
              setRoleState={setRoleState}
              setSelectedRoleData={setSelectedRoleData}
              selectedRoleNameData={selectedRoleNameData}
              RoleNameChange={RoleNameChange}
              setSelectedRoleNameData={setSelectedRoleNameData} />

            {/*  Role And Permission Registration Table Start */}
            <RoleAndPermissionRegistrationTable
              mainTable={mainTable}
              rowCount={rowCount}
              AllCheck={AllCheck}
              headTable={headTable}
              saveData={saveData}
              change_checkbox_data={change_checkbox_data}
              deleteClick={deleteClick}
              change_checkbox={change_checkbox}
              isEmpty={isEmpty}
              checkNullOrBlank={checkNullOrBlank} />
            <br />
            {/* Role And Permission Registration Table End */}
            <Confirmation
              show={deleteModalBox || saveModalBox}
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              deleteModalBox={deleteModalBox}
              cancel={cancelClick}
              deleteOK={deleteOK}
              saveOK={saveOK}
              closeSaveAlert={closeSaveAlert}
              saveModalBox={saveModalBox}/>
            {/* Permission to see This Request Radio Button start */}
            <RoleAndPermissionRegistrationDashboardBox
              mainTable={mainTable}
              handleRadioChange={handleRadioChange}
              handleViewChange={handleViewChange}
              radioCheck={radioCheck}
              viewCheck={viewCheck} />
            {/* Permission to see This Request Radio Button end */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function RoleAndPermissionRegistration() {
  return <Welcome />
}
