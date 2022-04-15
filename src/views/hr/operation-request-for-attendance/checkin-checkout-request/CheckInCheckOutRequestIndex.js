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
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlankString } from '../../../hr/hr-common/common-validation/CommonValidation';
import CheckInCheckOutRequestApproverDataBox from './CheckInCheckOutRequestApproverDataBox';
import CheckInCheckOutRequestClockInOutBox from './CheckInCheckOutRequestClockInOutBox';
import CheckInCheckOutRequestInformationRequestBox from './CheckInCheckOutRequestInformationRequestBox';
import CheckInCheckOutRequestSearchApproverBox from './CheckInCheckOutRequestSearchApproverBox';
import CheckInCheckOutRequestSearchApproverModalBox from './CheckInCheckOutRequestSearchApproverModalBox';

function LegacyWelcomeClass({ t, i18n }) {

  const [error, setError] = useState([]);
  const [success, setSuccess] = useState([]);

  const [popupError, setPopupError] = useState("");

  const [approverState, setApproverState] = useState("");
  const [approverData, setApproverData] = useState([]);

  const [empId, setEmpId] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [empName, setEmpName] = useState("");
  const [rank, setRank] = useState(false);

  const [departmentState, setDepartmentState] = useState("");
  const [positionState, setPositionState] = useState("");

  const date = Moment(new Date).format("YYYY-MM-DD, HH:mm:ss");
  const [allowCondition, setAllowCondition] = useState(false);


  const [approverModalBox, setApproverModalBox] = useState(false);

  const [mainTable, setMainTable] = useState([]); // for main table
  const [mainTableModal, setMainTableModal] = useState([]); // for main table
  const [rowCount, setRowCount] = useState(0);    // for row count

  const [rowCountApproverData, setRowCountApproverData] = useState(0);    // for row count

  const typingTimeoutRef = useRef(null);    // keep value time out 

  const [loading, setLoading] = useState(false);

  const [approverSetting, setApproverSetting] = useState("");

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
      let secTimer = setInterval( () => {
        setDt(new Date().toLocaleString())
      },1000)
  
      return () => clearInterval(secTimer);
  }, []);

  /** Start Form Load */
  useEffect(() => {
    setLoading(true);
    ApiViewPermission.loadViewPermission();
    getEmpDetailAPI();
    loadApprover();
  }, [getEmpDetailAPI, loadApprover]);
  /** End Form Load */

  /* Remove Message Start */
  const removeMessagePopup = () => {
    setPopupError("");
  }
  /* Remove Message End */

  /* Fake Approver */
  const loadApprover = async () => {
    let params = {
      company_id: ApiPath.companyID,
      employee_id: ApiPath.loginEmp,
      device_flag: 1
    }
    let data = {
      package_name: 'erp',
      url: ApiPath.ERPApproverList,
      method: 'post',
      params
    }
    let response = await ApiRequest(data);
    response.flag === false ? setError([]) : setApproverData(response.data.data);
  }
  /* Fake Approver */


  /* Get Emp Detail API Start */
  const getEmpDetailAPI = async () => {
    setLoading(true);
    let obj = {
      package_name: 'hr',
      url: ApiPath.CheckInCheckOutRequestGetDetailEmp + ApiPath.loginEmp + "?company_id=" + ApiPath.companyID + "&language=" + ApiPath.lang,
      method: 'get'
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message)
    }
    else {
      setEmpId(response.data.data.employee_id ? response.data.data.employee_id : "");
      setEmpCode(response.data.data.code ? response.data.data.code : "");
      setEmpName(response.data.data.name_eng ? response.data.data.name_eng : "");
      setRank(response.data.data.has_rank_zero);
      setApproverSetting(response.data.data.approver_setting);
      if ([2,3,4,5].includes(response.data.data.approver_setting) && !response.data.data.has_rank_zero) {
        loadApproverDataAPI();
      }
    }
  }
  /* Get Emp Detail API End */

  /* Load Approver Data API Start */
  const loadApproverDataAPI = async () => {
    setLoading(true)
    let params = {
      company_id: ApiPath.companyID,
      employee_id: ApiPath.loginEmp,
    }
    let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutRequestLoadApproverData, method: 'post', params }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError([])
      setMainTable([]);
    }
    else {
      setRowCountApproverData(response.data.row_count);
      setMainTable(response.data.data);
      setError([]);
      setSuccess([]);
    }
  }
  /* Load Approver Data API End */

  /* Search Approver API Start */
  const searchApproverAPI = async () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (validateSearch()) {
      typingTimeoutRef.current = setTimeout(async () => {
        setLoading(true)
        let params = {
          company_id: ApiPath.companyID,
          employee_id: ApiPath.loginEmp,
          language: ApiPath.lang,
          position_id: positionState,
          department_id: departmentState
        }
        let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutRequestSearch, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setError("")
          setMainTableModal([]);
          openApproverModal();
        }
        else {
          setRowCount(t('Total Rows').replace('%s', response.data.row_count));
          setMainTableModal(response.data.data);
          setError([]);
          setSuccess([]);
          openApproverModal();
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* Search Approver API End */

  /* Clock In API Start */
  const beforeClockIn = () => {
    window.navigator.geolocation.getCurrentPosition(saveLocationClockIn, errorLocationClockIn)
  }

  const saveLocationClockIn = (position) => {
    clockInAPI(position.coords.latitude, position.coords.longitude)
  }

  const errorLocationClockIn = () => {
    clockInAPI(null, null)
  }

  const clockInAPI = (lat, long) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (validateClockInClockOut()) {
      let approver = [];
      mainTable.map(item => approver.push(item.approver_id));
      typingTimeoutRef.current = setTimeout(async () => {
        setLoading(true)
        let params = {
          company_id: ApiPath.companyID,
          login_id: ApiPath.loginEmp,
          date: Moment(new Date).format("YYYY-MM-DD, HH:mm:ss"),
          lat: lat !== null ? lat.toString() : null,
          long: long !== null ? long.toString() : null,
          approver_id: approver,
          created_emp: ApiPath.createdEmp,
          updated_emp: ApiPath.updatedEmp,
          language: ApiPath.lang,
          status: "IN",
          allow_as_leave_or_business: allowCondition
        }
        let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutRequestClockInOut, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setError(response.message);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
          setSuccess([response.data.message]);
          setError([]);
          resetForm();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* Clock In API End */

  /* Clock Out API Start */
  const beforeClockOut = () => {
    window.navigator.geolocation.getCurrentPosition(saveLocationClockOut, errorLocationClockOut)
  }
  const saveLocationClockOut = (position) => {
    clockOutAPI(position.coords.latitude, position.coords.longitude)
  }

  const errorLocationClockOut = () => {
    clockOutAPI(null, null)
  }

  const clockOutAPI = (lat, long) => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (validateClockInClockOut()) {
      let approver = [];
      mainTable.map(item => approver.push(item.approver_id));
      typingTimeoutRef.current = setTimeout(async () => {
        setLoading(true)
        let params = {
          company_id: ApiPath.companyID,
          login_id: ApiPath.loginEmp,
          date: Moment(new Date).format("YYYY-MM-DD, HH:mm:ss"),
          lat: lat !== null ? lat.toString() : null,
          long: long !== null ? long.toString() : null,
          approver_id: approver,
          created_emp: ApiPath.createdEmp,
          updated_emp: ApiPath.updatedEmp,
          language: ApiPath.lang,
          status: "OUT",
          allow_as_leave_or_business: allowCondition
        }
        let obj = { package_name: 'hr', url: ApiPath.CheckInCheckOutRequestClockInOut, method: 'post', params }
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
          setError(response.message);
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
        else {
          setSuccess([response.data.message]);
          setError([]);
          resetForm();
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  /* Clock Out API End */

  /* Reset Form Start */
  const resetForm = () => {
    setAllowCondition(false);
    setApproverState("");
    if (approverSetting == 1) {
      setMainTable([])
    } else {
      setTimeout(function () { getEmpDetailAPI(); }, 1000);
    }
  }
  /* Reset Form Start */

  /* Validate Search Approver Start */
  const validateSearch = () => {
    setError([]);
    setSuccess([]);
    let allError = [];
    if (!checkNullOrBlankString(approverState)) {
      let errMsg = t("JSE001").replace("%s", t("Approver"))
      allError.push(errMsg);
    } else return true;
    setError(allError);
  }
  /* Validate Search Approver End */

  /* Validate Clock In Clock Out Start */
  const validateClockInClockOut = () => {
    let check = true;
    setSuccess([]);
    setError([]);
    let allError = [];
    if (!mainTable || mainTable.length <= 0) {
      let errMsg = t("JSE001").replace("%s", t("Approver Data"))
      allError.push(errMsg);
      check = false;
    } else {
      let checkApprover = mainTable.filter(item => item.approver_or_checker == 1);
      if (checkApprover.length <= 0) {
        check = false;
        let errMsg =t('JSE177');
        allError.push(errMsg);
      }
    }
    if (rank) {
      check = true;
    }
    if (check)
      return true;
    else setError(allError);
  }


  /* Validate Clock In Clock Out End */

  /* Approver Modal Box Start */
  const openApproverModal = () => {
    setApproverModalBox(!approverModalBox);
  }

  const closeApproverModal = () => {
    setApproverModalBox(!approverModalBox);
    setCheckBoxIdList([])
    setMainTableModal([]);
    setAllCheck(false);
    setPopupError([]);
  }
  /* Approver Modal Box End */

  /* Approver Change Start */
  const approverChange = (e) => {
    if (e.target[e.target.selectedIndex].getAttribute("position")) {
      setPositionState(e.target[e.target.selectedIndex].getAttribute("position"));
      setDepartmentState("");
      setApproverState("pos" + e.target[e.target.selectedIndex].getAttribute("position"));
    } else if (e.target[e.target.selectedIndex].getAttribute("department")) {
      setDepartmentState(e.target[e.target.selectedIndex].getAttribute("department"));
      setPositionState("");
      setApproverState("dep" + e.target[e.target.selectedIndex].getAttribute("department"));
    } else {
      setApproverState(e.target[e.target.selectedIndex].value);
      setDepartmentState("");
      setPositionState("");
    }
  }
  /* Approver Change End */

  /* Allow Condition Change Start */
  const allowConditionChange = (e) => {
    setAllowCondition(e.target.checked);
  }
  /* Allow Condition Change End */

  /* START CHECKBOX ACTION */
  const [AllCheck, setAllCheck] = useState(false);      // For select checkbox all or not
  const [checkBoxIdList, setCheckBoxIdList] = useState(''); // For delete data list
  const change_checkbox = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let data;
    let id_list = [];

    if (value === "all-check") {
      data = mainTableModal.map(item => ({ ...item, is_checked: checked }));
    } else {
      data = mainTableModal.map(item =>
        parseInt(item.approver_id) === parseInt(value) ? { ...item, is_checked: checked } : item
      )
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked) {
        id_list.push(data[i].approver_id);
      }
    }
    setCheckBoxIdList(id_list);

    setAllCheck(data.every(item => item.is_checked));
    setMainTableModal(data);
  }
  /* END CHECKBOX ACTION */

  /* Add Approver Start */
  const addApprover = () => {
    let errMsgAll = [];
    if (checkBoxIdList.length === 0) {
      const errorMsg = t('JSE056').replace('%s', t('Approver'));
      errMsgAll.push(errorMsg);
    } else {
      if (!mainTable.some(value => checkBoxIdList.includes(value.approver_id))) {
        mainTableModal.map(value => {
          if (checkBoxIdList.includes(value.approver_id)) {
            setMainTable(mainTable => [...mainTable, value]);
          }
        })
      }
      else {
        mainTable.map(value => {
          if (checkBoxIdList.includes(value.approver_id)) {
            const errorMsg = t('JSE140').replace('%s', value.approver_id);
            errMsgAll.push(errorMsg);
          }
        })
      }
    }
    if (errMsgAll.length > 0) {
      setPopupError(errMsgAll);
    }
    else {
      setRowCountApproverData(rowCountApproverData+checkBoxIdList.length);
      closeApproverModal();
    }
  }
  /* Add Approver End */

  /* Delete Approver Start */
  const deleteApprover = (e) => {
    let result_data = []; // to remove data by click icon
    result_data = mainTable.filter((main) => main.approver_id != e["approver_id"]);
    setRowCountApproverData(result_data.length);
    setMainTable(result_data);
  }
  /* Delete Approver End */

  return (
    <>
      <CRow>
        <CCol xs="12">
          <Loading start={loading} />
          <Message success={success} error={error} />

          <CCard>
            <CCardHeader className="pb-0">
              <h5 id="cardTitle"><CLabel>{t('Check In Check Out Request')}</CLabel></h5>
            </CCardHeader>
            <CCardBody>
              <CheckInCheckOutRequestInformationRequestBox
                empId={empId}
                empCode={empCode}
                empName={empName}
                date={date}

                allowConditionChange={allowConditionChange}
                allowCondition={allowCondition}
              />
              <CheckInCheckOutRequestSearchApproverBox
                loadApprover={loadApprover}
                openApproverModal={openApproverModal}

                approverChange={approverChange}

                approverState={approverState}
                positionState={positionState}
                departmentState={departmentState}

                approverData={approverData}
                searchApproverAPI={searchApproverAPI}

                rank={rank}
                approverSetting={approverSetting}

                loading={loading}
              />
              <CheckInCheckOutRequestApproverDataBox
                mainTable={mainTable}
                deleteApprover={deleteApprover}
                loading={loading}
                empId={empId}
                rowCountApproverData={rowCountApproverData}
              />
              <CheckInCheckOutRequestClockInOutBox
                mainTable={mainTable}
                rank={rank}
                beforeClockIn={beforeClockIn}
                beforeClockOut={beforeClockOut}
                loading={loading}
              />
              <CheckInCheckOutRequestSearchApproverModalBox
                empId={empId}
                empCode={empCode}
                empName={empName}

                rowCount={rowCount}

                approverModalBox={approverModalBox}
                closeApproverModal={closeApproverModal}

                mainTableModal={mainTableModal}

                AllCheck={AllCheck}
                change_checkbox={change_checkbox}

                addApprover={addApprover}

                popupError={popupError}
                removeMessagePopup={removeMessagePopup}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function CheckInCheckOutRequestIndex() {
  return (
    <Welcome />
  )
}