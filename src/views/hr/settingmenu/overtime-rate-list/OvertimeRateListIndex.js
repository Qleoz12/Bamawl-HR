/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import SearchOvertimeRateList from './SearchOvertimeRateList';
import OvertimeRateListTable from './OvertimeRateListTable';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';

function LegacyWelcomeClass({ t }) {
  const defaultPerPage = ApiPath.defaultPerPage;//default page
  const [loading, setLoading] = useState(false);
  const history = useHistory();     // For edit link
  const [rowCount, setRowCount] = useState();       // For Row Count
  const [mainTable, setMainTable] = useState([]);     // For Main Table
  const [error, setError] = useState([]);     // For Error Message
  const [success, setSuccess] = useState('');     // For Success Message
  const [checkShiftName, setCheckShiftName] = useState();      // For Select Shift Name
  const [selectOvertimeTitle, setSelectOvertimeTitle] = useState();       // For Select Overtime Title
  const [currentPage, setCurrentPage] = useState(1);      // For Current Page
  const [totalPage, setTotalPage] = useState(0);      // For Total Page
  const [shiftNameAPI, setShiftNameAPI] = useState([]);
  const [overtimeNameAPI, setOvertimeNameAPI] = useState([]);
  const [formSearchState, setFormSearchState] = useState(null); // keep form search when click button search
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);// For show/hide confirmation box
  const [type, setType] = useState('');

  // Loaded initially
  useEffect(() => {
    setLoading(true);
    ApiViewPermission.loadViewPermission();
    loadShiftName();
    loadOvertime();
  }, []);

  /**
* Load Shift name
*
* @author  c_dinh
* @create  29/07/2021 (D/M/Y)
* @param
* @return
*/
  const loadShiftName = async () => {
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    };
    let obj = { package_name: 'hr', url: ApiPath.overtimeRateGetShiftNormalRules, method: 'post', params };
    let response = await ApiRequest(obj);
    response.flag === false ? setShiftNameAPI([]) : setShiftNameAPI(response.data.data);
    setLoading(false);
  }
  /**
* Load Over Time
*
* @author  c_dinh
* @create  29/07/2021 (D/M/Y)
* @param
* @return
*/
  const loadOvertime = async () => {
    let params = {
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    };
    let obj = { package_name: 'hr', url: ApiPath.overtimeRateGetOTName, method: 'post', params };
    let response = await ApiRequest(obj);
    response.flag === false ? setOvertimeNameAPI([]) : setOvertimeNameAPI(response.data.data);
    setLoading(false);
  }
  //click search

  const searchClick = () => {
    let msgError = [];
    setError([]);
    setSuccess([]);
    if (isEmpty(checkShiftName)) {
      msgError.push(t("JSE126").replace("%s", t("Shift Name")));
    }
    if (isEmpty(selectOvertimeTitle)) {
      msgError.push(t("JSE126").replace("%s", t("Overtime Title")));
    }
    if (msgError.length > 0) {
      setError(msgError);
      setMainTable([]);
      setSuccess([]);
    } else {
      const requestFormSearch = {
        company_id: ApiPath.companyID,
        shift_normal_rule_id: checkShiftName,
        overtime_name: selectOvertimeTitle,
        login_id: ApiPath.loginEmp,
        language: ApiPath.lang
      }
      setFormSearchState(requestFormSearch);
      searchOvertimeRateList(1, defaultPerPage, requestFormSearch);
      setCurrentPage(1);
    }
  }
  const searchOvertimeRateList = async (page = 1, pageSize = 20, formSearch = null, searchFlag = true) => {
    setLoading(true);
    let params = {
      ...formSearch,
      page,
      per_page: pageSize
    }
    let obj = { package_name: 'hr', url: ApiPath.overtimeRateListSearch, method: 'post', params };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      searchFlag && setError(response.message);
      setMainTable([]);
      setRowCount(0);
    }
    else {
      let res = response.data.overtime_rate_settings_list
      let data = res.data;
      data = data.map(ele => ({ ...ele, setting_type: (ele.setting_type === 1 ? "Auto Setting" : "User Manual") }))
      setRowCount(res.total);
      setMainTable(data);
      setCurrentPage(res.current_page);
      setTotalPage(res.last_page);
    }
  }
  const pageChange = (newPage) => {
    setCurrentPage(newPage);
    setError('');
    setSuccess('');
    searchOvertimeRateList(newPage, defaultPerPage, formSearchState, true);
  }

  /** start API for Shift Name */

  /** end API for Shift Name */
  let overtimeTitleChange = (e) => {
    setSelectOvertimeTitle(e.target.value);
  }

  let chooseShiftName = (i) => {
    let value = i.target.value;
    let checked = i.target.checked;
    let list_shift_name = [];
    let data;
    data = shiftNameAPI.map(item =>
      item.id == value ? { ...item, is_checked: checked } : item
    );
    for (let i = 0; i < data.length; i++) {
      if (data[i].is_checked === true) {
        list_shift_name.push(data[i].id);
      }
    }
    setShiftNameAPI(data);
    setCheckShiftName(list_shift_name);
  }

  /* DELETE OVERTIME MODAL BOX */
  const [deleteID, setDeleteID] = useState('');
  const deleteToggleAlert = (e) => {
    setDeleteID(e.id);
    setShow(!show); setContent(t('Are you sure want to delete?')); setType('delete');
    setError("");
  }
  /* DELETE OK */
  const deleteOK = async () => {
    setShow(!show);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (!isEmpty(deleteID)) {
      setLoading(true);
      let url = `${ApiPath.overtimeRateListDelete}${deleteID}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
      let obj = { package_name: 'hr', url: url, method: 'delete' };
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        setSuccess('');
        let pageCheck = currentPage == 1 && mainTable.length == 1 ? currentPage : (mainTable.length % defaultPerPage == 1 ? currentPage - 1 : currentPage);
        setCurrentPage(pageCheck);
        searchOvertimeRateList(pageCheck, defaultPerPage, formSearchState, false);
      } else {
        setSuccess([response.data.message]);
        setTimeout(function () {
          let pageCheck = currentPage == 1 && mainTable.length == 1 ? currentPage : (mainTable.length % defaultPerPage == 1 ? currentPage - 1 : currentPage);
          setCurrentPage(pageCheck);
          searchOvertimeRateList(pageCheck, defaultPerPage, formSearchState, false);
        }, 300);
        loadOvertime();
      }
    }
  }
  /* END DELETE*/

  const [editID, setEditID] = useState('');
  const editToggleAlert = (e) => {
    setEditID(e['id']);
    setShow(!show); setContent(t('Are you sure want to edit?')); setType('edit');
  }
  const editOK = () => {
    setShow(!show);
    editRow(editID);
  }
  /* EDIT LINK TO NEXT PAGE */
  const editRow = (id) => {
    localStorage.setItem('RETURN_OT_RATE_DATA', JSON.stringify(id));
    history.push("./overtime-rate-setting");
  }

  return (
    <CRow className="overtime-rate-list">
      <CCol xs="12">
        <Loading start={loading} />
        <Message success={success} error={error} />
        <Confirmation
          content={content} okButton={t('Ok')} cancelButton={t('Cancel')} type={type} show={show}
          cancel={() => setShow(!show)} deleteOK={deleteOK} editOK={editOK}
        />
        <CCard>
          <CCardHeader>
            <h5>{t('Overtime Rate List')}</h5>
          </CCardHeader>
          <CCardBody>
            <SearchOvertimeRateList
              shiftName={shiftNameAPI} chooseShiftName={chooseShiftName} selectShiftName={checkShiftName}
              otTitleChange={overtimeTitleChange} OTData={selectOvertimeTitle} OTNameAPI={overtimeNameAPI}
              searchClick={searchClick} />
            <OvertimeRateListTable rowCount={rowCount} mainTable={mainTable}
              editToggleAlert={editToggleAlert} deleteToggleAlert={deleteToggleAlert}
              totalPage={totalPage} currentPage={currentPage} defaultPerPage={defaultPerPage} pageChange={pageChange} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function OvertimeRateList() {
  return (
    <Welcome />
  )
}