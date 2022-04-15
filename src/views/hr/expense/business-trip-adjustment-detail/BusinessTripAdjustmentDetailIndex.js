/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { withTranslation } from 'react-i18next';

import BusinessTripAdjustmentDetailApprover from './BusinessTripAdjustmentDetailApprover';
import BusinessTripAdjustmentDetailTable from './BusinessTripAdjustmentDetailTable';
import BusinessTripAdjustmentDetailInit from './BusinessTripAdjustmentDetailInit';
import BusinessTripAdjustmentDetailButton from './BusinessTripAdjustmentDetailButton';
import AdjustmentBudget from './AdjustmentBudget';

import { useHistory } from 'react-router-dom';
import { checkMaxLength, isEmpty } from '../../hr-common/common-validation/CommonValidation';
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import apiPath from "../../../brycen-common/api-path/ApiPath";

function LegacyWelcomeClass({ t }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const history = useHistory(); // For edit link

  const [mainData, setMainData] = useState();
  const [inforData, setInforData] = useState("");
  const [adjustmentBudget, setAdjustmentBudget] = useState();
  const [flagHistory, setFlagHistory] = useState(true);
  const [flagDashBoard, setDashBoard] = useState(false);

  const [mainTable, setMainTable] = useState([]); // for main table
  const [dataAllwance, setDataAllwance] = useState([]);
  const [dataOther, setDataOther] = useState([]);
  const [dataAirTicket, setDataAirTicket] = useState([]);
  const [dataTransport, setDataTransport] = useState([]);
  const [dataAccom, setDataAccom] = useState([]);
  const [advanceFlag, setAdvanceFlag] = useState("");
  const [advanceAdditional, setAdvanceAdditional] = useState("");

  const [errorModal, setErrorModal] = useState([]);
  const [reason, setReason] = useState("");// for reason
  const [modalReject, setModalReject] = useState(false);// for show /hide modal reason
  const [businessId, setBusinessId] = useState(""); // business trip id
  const [confirmModalBox, setConfirmModalBox] = useState(false);
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [idData, setIdData] = useState('');

  useEffect(() => {
    setLoading(true);
    loadCurrency();

    let detailID = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS")); // return data from businesstrip list Form
    let detailIDHistory = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_HISTORY")); // return data from businesstrip list Form
    let detailIDDashBoard = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_DASHBOARD")); // return data from DashBoard
    let infoData = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS"));

    setInforData(infoData);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.body.style.overflow = "auto";

    if (detailID) {
      getInitDetail(detailID);
      setBusinessId(detailID);
      setIdData(detailID);
    }
    else if (detailIDHistory) {
      getInitDetailHistory(detailIDHistory);
      setBusinessId(detailIDHistory);
      setFlagHistory(false);
      setIdData(detailIDHistory);
    }
    else {
      getInitDetail(detailIDDashBoard);
      setBusinessId(detailIDDashBoard);
      setDashBoard(true);
      setIdData(detailIDHistory);
    }

  }, []);
  useEffect(() => {
    if (isEmpty(error) || isEmpty(success))
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [error, success])

  /** start API for Currency Methods */
  const [allCurrency, setAllCurrency] = useState([]);
  const loadCurrency = async () => {
    setLoading(true);
    let url = `${apiPath.businessTripAdjustmentRequestGetCurrency}`;
    let obj = {
      package_name: 'hr',
      url: url,
      method: 'get'
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    response.flag === false ? setError(response.message) : setAllCurrency(response.data.data);
  }
  /** end API for Currency Methods */

  let getInitDetailHistory = async (idData) => {
    setLoading(true);
    let request = {
      company_id: apiPath.companyID,
      language: apiPath.lang,
      login_id: apiPath.loginEmp,
      business_trip_adjustment_history_id: idData,
    }
    let obj = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentGetDetailHistory,
      method: "post",
      params: request,
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response?.flag === false) {
      setError(response.message);
    } else {
      if (response.data?.data) {
        let data = response.data.data;
        setMainData(data);
        // setDataOther(data.orther_list);
        // setDataAirTicket(data.air_ticket_list);
        // setDataTransport(data.transporation_list);
        // setDataAccom(data.accomodation_list);
        // setDataAllwance(data.daily_allowance_list);
        sortData(data.air_ticket_list, data.accomodation_list, data.transporation_list, data.daily_allowance_list, data.orther_list);
        setAdjustmentBudget(data.adjustment_budget);
        setMainTable(data.business_trip_approver);
      }
    }
  }

  let getInitDetail = async (idData) => {
    setLoading(true);
    let request = {
      company_id: apiPath.companyID,
      language: apiPath.lang,
      login_id: apiPath.loginEmp,
      business_trip_id: idData,
    }
    let obj = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentGetDetail,
      method: "post",
      params: request,
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response?.flag === false) {
      setError(response.message);
    } else {
      if (response.data?.data) {
        let data = response.data.data;
        setMainData(data);
        // setDataOther(data.orther_list);
        // setDataAirTicket(data.air_ticket_list);
        // setDataTransport(data.transporation_list);
        // setDataAccom(data.accomodation_list);
        // setDataAllwance(data.daily_allowance_list);
        sortData(data.air_ticket_list, data.accomodation_list, data.transporation_list, data.daily_allowance_list, data.orther_list);
        setAdjustmentBudget(data.adjustment_budget);
        setAdvanceFlag(data.advance_flag);
        setAdvanceAdditional(data.businesstrip_advance_additional);
        setMainTable(data.business_trip_approver);
      }
    }
  }

  const confirmBusiness = () => {
    setType('confirm');
    setContent(<span>Are you sure want to confirm?<br />After click OK button, you cannot edit anything!</span>);
    setConfirmModalBox(!confirmModalBox);
    setError("");
  }

  let downloadFile = async (e, obj, is_detail, fileName) => {
    setLoading(true);
    let request = {
      company_id: apiPath.companyID,
      is_detail,
      login_id: apiPath.loginEmp,
      language: apiPath.language,
      file_id: Number(obj.file_id),
      is_adjustment: true
    }
    let params = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentDetailDownload,
      method: 'post',
      params: request,
      type: "blob",
    }
    let response = await ApiRequest(params);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    }
    else {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();
    }
  }

  let sortDataCategory = (dataCategory, setDataCategory) => {
    if (dataCategory?.info)
      dataCategory.info.sort((a, b) => {
        if (a.budget_cost && !b.budget_cost) return -1;
        else if (a.budget_cost && b.budget_cost) return 0;
        else return 1;
      })
    setDataCategory(dataCategory);
  }
  let sortData = (data1, data2, data3, data4, data5) => {
    sortDataCategory(data2, setDataAccom);
    sortDataCategory(data1, setDataAirTicket);
    sortDataCategory(data4, setDataAllwance);
    sortDataCategory(data5, setDataOther);
    sortDataCategory(data3, setDataTransport);
  }

  /** Export file PDF */
  const btnDownload = async (e) => {
    setLoading(true);
    const request = {
      business_trip_id: businessId,
      login_id: apiPath.loginEmp,
      company_id: apiPath.companyID,
      language: apiPath.lang
    }
    let obj = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentDetailExport,
      method: 'post',
      params: request,
      type: "blob",
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response?.flag === false) {
      setError(response?.message);
    }
    else {
      const isReturnFile = response?.headers["content-disposition"];
      if (isReturnFile) {
        let fileName = response.headers["content-disposition"].split("filename=")[1];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName.replace("\"", "").replace("\"", ""));
        document.body.appendChild(link);
        link.click();
      }
      else {
        setError([response?.data?.message]);
        setSuccess([]);
      }
    }
  }

  const rejectOK = async () => {
    let arMess = []
    if (isEmpty(reason.trim())) {
      let errMsg = t('JSE124').replace('%s', t('Reason'));
      arMess.push(errMsg);
    }
    else if (!checkMaxLength(reason, 500)) {
      let errMsg = t('JSE123').replace('%s', t('Reason')).replace('%s', 500);
      arMess.push(errMsg);
    }

    if (arMess.length > 0) {
      setErrorModal(arMess);
    }
    else {
      setError([]);
      setSuccess("");
      setModalReject(!modalReject);
      setLoading(true);
      let request = {
        login_id: apiPath.loginEmp,
        business_trip_ids: [businessId],
        company_id: apiPath.companyID,
        denied_reason: reason,
        is_adjustment: true,
        language: apiPath.lang
      }
      let obj = {
        package_name: 'hr',
        url: apiPath.businessTripAdjustmentDetailReject,
        method: 'post',
        params: request
      }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response?.message);
        setSuccess("");
      } else {
        setSuccess([response?.data?.message]);
        setError([]);
        getInitDetail(idData);
      }
    }
  }

  /**Confirm BusinessTripDetail */
  const confirmOK = async () => {
    setLoading(true);
    setConfirmModalBox(!confirmModalBox)
    let request = {
      business_trip_ids: [businessId],
      is_adjustment: true
    }
    let obj = {
      package_name: 'hr',
      url: apiPath.businessTripAdjustmentDetailConfirm,
      method: 'post',
      params: request
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response?.message);
      setSuccess("");
    } else {
      setSuccess([response?.data?.message]);
      setError([]);
      getInitDetail(idData);
    }
  }

  const changeReason = (e) => {
    setReason(e.target.value)
  }

  const closeModalReject = () => {
    setModalReject(!modalReject);
    setErrorModal("");
  }

  const confirmReason = (e) => {
    setError([]);
    setSuccess("");
    setModalReject(!modalReject);
    setReason("");
  }

  let removeMessageError = () => {
    setError([]);
  }

  const previousList = () => {
    sessionStorage.setItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS_PREVIOUS", 1);
    sessionStorage.setItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS", JSON.stringify(inforData));

    sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS");
    sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_HISTORY");
    sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS_DASHBOARD");

    if (flagDashBoard) {
      history.push("./dashboard");
    }
    else history.push("./business-trip-list");
  }

  return (
    <CRow className="business-trip-adjustment-request">
      <CCol>
        <Loading start={loading} />
        <Message error={error} success={success} />
        <CCard className="">
          <CCardHeader>
            <h5 id='lblBusinessTripAdjustmentDetail'>{t('Business Trip Adjustment Detail')}</h5>
          </CCardHeader>
          <CCardBody>
            <div className="clearfix">
              <div className="float-right ">
                <CButton
                  autoFocus={true}
                  onClick={previousList}
                  style={{ backgroundColor: "#F4F6FD" }}>
                  <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                  {t("Previous")}
                </CButton>
              </div>
            </div>
            <br />
            <BusinessTripAdjustmentDetailInit
              mainData={mainData}
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <BusinessTripAdjustmentDetailTable
              allCurrency={allCurrency}
              data={dataAirTicket}
              nameTable="Air Ticket"
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <BusinessTripAdjustmentDetailTable
              allCurrency={allCurrency}
              data={dataAccom}
              nameTable="Accommodation"
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <BusinessTripAdjustmentDetailTable
              allCurrency={allCurrency}
              data={dataTransport}
              nameTable="Transportation"
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <BusinessTripAdjustmentDetailTable
              allCurrency={allCurrency}
              data={dataAllwance}
              nameTable="Daily Allowance"
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <BusinessTripAdjustmentDetailTable
              allCurrency={allCurrency}
              data={dataOther}
              nameTable="Other"
              downloadFile={downloadFile}
              flagHistory={flagHistory}
            />
            <AdjustmentBudget
              adjustmentBudget={adjustmentBudget}
              dataAccom={dataAccom}
              dataAllwance={dataAllwance}
              dataAirTicket={dataAirTicket}
              dataTransport={dataTransport}
              dataOther={dataOther}
              allCurrency={allCurrency}
              advanceFlag={advanceFlag}
              advanceAdditional={advanceAdditional}
            />
            <BusinessTripAdjustmentDetailApprover
              mainData={mainData}
              mainTable={mainTable}
            />
            <BusinessTripAdjustmentDetailButton
              confirmBusiness={confirmBusiness}
              confirmReason={confirmReason}
              downloadBusiness={btnDownload}
              mainData={mainData}
              flagHistory={flagHistory}
            />
            <ModalReject
              removeMessage={removeMessageError}
              errorModal={errorModal}
              changeReason={changeReason}
              reason={reason}
              RejectOK={rejectOK}
              closeModalReject={closeModalReject}
              modalReject={modalReject}
            />
            <Confirmation
              content={content}
              okButton={t('Ok')}
              cancelButton={t('Cancel')}
              type={type}
              show={confirmModalBox}
              cancel={() => setConfirmModalBox(!confirmModalBox)}
              confirmOK={confirmOK}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BusinessTripAdjustmentRequestIndex() { return (<Welcome />) }
