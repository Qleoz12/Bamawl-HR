import React ,{ useState, useEffect} from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CButton} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import BusinessTripDetailInfo from './BusinessTripDetailInfo';
import BusinessTripDetailTable from './BusinessTripDetailTable';
import BusinessTripDetailButton from './BusinessTripDetailButton';
import BusinessTripDetailApprover from './BusinessTripDetailApprover';
import Message from '../../../brycen-common/message/Message';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import linkAPI from '../../../brycen-common/api-path/ApiPath';
import { useHistory } from "react-router-dom";
import ModalReject from '../../hr-common/modal-reject/ModalReject';
// import RejectModal from '../../hr-common/reject-modal/RejectModal';
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import {
  checkNullOrBlank,checkMaxLength
 } from "../../../hr/hr-common/common-validation/CommonValidation"; // Common validation function

function LegacyWelcomeClass({ t}) {
  const [mainTable, setMainTable]                        = useState("");
  const [airTicket, setAirTicket]                        = useState([]);
  const [accommodation, setAccommodation]                = useState([]);
  const [transportation, setTransportation]              = useState([]);
  const [dailyAllowance, setDailyAllowance]              = useState([]);
  const [businessTrip, setBusiness]                      = useState("");
  const [other, setOther]                                = useState([]);
  const [subTotalTicket, setSubTotalTicket]              = useState([]);
  const [subTotalAcc, setSubTotalAcc]                    = useState([]);
  const [subTotalTran, setSubTotalTran]                  = useState([]);
  const [subTotalDaily, setSubTotalDaily]                = useState([]);
  const [subTotalOther, setSubTotalOther]                = useState([]);
  const [bugetTotal, setBugetTotal]                      = useState([]);
  const [totalAdvance, setTotaladvance]                  = useState([]);
  const [advanceFlag, setAdvanceFlag]                    = useState("");
  const [error, setError]                                = useState([]);
  const [errorModal, setErrorModal]                      = useState([]);
  const [success, setSuccess]                            = useState("");
  const [modalReject, setModalReject]                    = useState(false);// for show /hide modal reason
  const [reason, setReason]                              = useState("");// for reason
  const history                                          = useHistory(""); // For edit link
  const [currencies, setCurrencies]                      = useState(""); //Currencies
  const [currenciesAll, setCurrenciesAll]                = useState(""); //Currencies
  const [businessId,setBusinessId]                       = useState(""); // businesstrip id
  const [flagPrev,setFlag]                               = useState(false); // for previous list or dashboard
  const [confirmModalBox, setConfirmModalBox]            = useState(false);
  const [department, setDepartment]                      = useState([]);
  const [currencyID, setCurrencyID]                      = useState([]);
  const [loading, setLoading]                            = useState(false);
  const [content, setContent]                            = useState('');
  const [type, setType]                                  = useState('');
  const [checkBorder, setCheckBorder]                    = useState(0);

  /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
   useEffect(() => {
    if (error.length > 0 || success.length > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    }, [error, success]);

    /**
    * Page Load
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
  useEffect(() => {
    let detailID = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS")); // return data from businesstrip list Form
    let detailIDDB = JSON.parse(sessionStorage.getItem("RETURN_BUSINESS_TRIP_ID_DETAILS_DETAILS_DASHBOARD")); // return data from businesstrip list Form
    if(detailID){
        setBusinessId(detailID);
        loadBusiness(detailID);
        loadCurency();
        loadDept();
    }
    else if(detailIDDB){
        setFlag(true);
        setBusinessId(detailIDDB);
        loadBusiness(detailIDDB);
        loadCurency();
        loadDept();
    }
    else{
        history.push("../expense/business-trip-list");
    }
  }, []);

    /**
    * Load currency
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadCurency = async () => {
    let params = {
        company_id: linkAPI.companyID,
        language: linkAPI.lang
    };
    let obj = {
        package_name: 'hr',
        url: linkAPI.businessTripRequestGetCurrency,
        method: 'get',
        params
    };
    let response = await ApiRequest(obj);
    if (response.flag === false) {
    } else {
        let data = response.data.data;
        let currency=data.filter((i) =>i.expense_flag ==1);
        setCurrencies(currency);
        setCurrenciesAll(data);
    }
  };

  /**
    * Load Department
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
   const loadDept = async () => {
    let data = {
        package_name: 'erp',
        url: linkAPI.ERPGetAllDepartment,
        method: 'get',
      }
      let response = await ApiRequest(data);
      response.flag === false ? setDepartment([]) : setDepartment(response.data.data);
};

   /**
    * Load BusinessTripDetail
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const loadBusiness = async (businessTripId=businessId)=>{
    setLoading(true);
    let url = `${linkAPI.BusinessTripDetail}/${businessTripId}?company_id=${linkAPI.companyID}&login_id=${linkAPI.loginEmp}&language=${linkAPI.lang}`;
    let obj = {
         package_name: 'hr',
          url: url,
          method: 'get'
    };
    let response = await ApiRequest(obj);
    if(response.flag === false )
        setError(response.message)
    else{
        let data = response.data.data;
        setMainTable(data);
        setBusiness(data.business_trip_detail);
        setAirTicket(data.business_trip_detail.air_ticket);
        setAccommodation(data.business_trip_detail.accommodation);
        setTransportation(data.business_trip_detail.transportation);
        setDailyAllowance(data.business_trip_detail.daily_allowance);
        setOther(data.business_trip_detail.other);
        setSubTotalTicket(data.sub_total.filter(i=>i.business_trip_category_id==1));
        setSubTotalAcc(data.sub_total.filter(i=>i.business_trip_category_id==2));
        setSubTotalTran(data.sub_total.filter(i=>i.business_trip_category_id==3));
        setSubTotalDaily(data.sub_total.filter(i=>i.business_trip_category_id==4));
        setSubTotalOther(data.sub_total.filter(i=>i.business_trip_category_id==5));
        setBugetTotal(data.budget_total_amount);
        setTotaladvance(data.business_trip_advance);
        setAdvanceFlag(parseInt(data.advance_flag));
        let currenes=[];
        data.business_trip_advance.map((i)=>{
            let curren=i.currency_id;
            currenes.push(curren);
        });
        setCurrencyID(currenes);
    }
    setLoading(false);
  };

   const confirmBusiness=()=>{
    setContent(t('Are you sure want to confirm?')); setType('confirm');
    setConfirmModalBox(!confirmModalBox);
   }
   const cancelClick=()=>{
    setConfirmModalBox(!confirmModalBox);
   }

    /**
    * Confirm BusinessTripDetail
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const confirmOK= async()=>{
       setConfirmModalBox(!confirmModalBox);
       setLoading(true);
        let params = {
            login_id:linkAPI.loginEmp,
            business_trip_ids:[businessId],
            company_id:linkAPI.companyID,
            is_adjustment: false
        }
        let url = `${linkAPI.BusinessTripListConfirm}`;
        let obj = {
            package_name: 'hr',
            url: url,
            method: 'post',
            params
         };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false ) setError(response.message)
        else{
            setSuccess([response.data.message]);
            loadBusiness(businessId);
        }
   }

   /**
    * Download BusinessTripDetail
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */

  const downloadBusiness = async(e) => {
    setLoading(true);
    let params = {
        business_trip_id:businessId,
        login_id:linkAPI.loginEmp,
        company_id: linkAPI.companyID,
        language: linkAPI.lang
    };
    let obj = {
        package_name: 'hr',
        url: linkAPI.BusinessTripDetailExport,
        method: 'post',
        params,
        type: "blob",
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setSuccess([]);
        response.message && setError(response.message);
    } else {
        const contentType = response.headers["content-disposition"];
        if (contentType) {
            let fileName = response.headers["content-disposition"].split("filename=")[1];
            const modifyFileName = fileName.slice(1, fileName.length - 1);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", modifyFileName);
            document.body.appendChild(link);
            link.click();
        }
        else{
            let status = JSON.parse(Buffer.from(response.data).toString('utf8'));
            setSuccess('');
            setError([status.message]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
}

    const changeReason=(e)=>{
        setReason(e.target.value)
    }

 /**
    * Reject BusinessTripDetail
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
  const rejectOK =async()=>{
    let arMess=[];
    if (!checkNullOrBlank(reason.trim())) {
        let errMsg = t('JSE124').replace('%s', t('Reason Title'));
        arMess.push(errMsg);
    }
    else if (!checkMaxLength(reason, 500)) {
        let errMsg=t('JSE123').replace('%s', t('Reason')).replace('%s', 500);
        arMess.push(errMsg);
     }
    if (arMess.length > 0) {
         setErrorModal(arMess);
    }
    else{
        setError([]);
        setSuccess("");
        setModalReject(!modalReject);
        setLoading(true);
        let params = {
            login_id:linkAPI.loginEmp,
            business_trip_ids:[businessId],
            company_id:linkAPI.companyID,
            denied_reason : reason,
            is_adjustment: false
        }
        let url = `${linkAPI.BusinessTripListReject}`;
        let obj = {
            package_name: 'hr',
            url: url,
            method: 'post',
            params
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false ) setError(response.message)
        else{
            setSuccess([response.data.message]);
            loadBusiness(businessId);
        }
    }
}

/**
    * Export Expense Other Attachement File
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
const exportFile = async (e,fileName) => {
    setLoading(true);
    let params = {
        company_id: linkAPI.companyID,
        file_id: e.id,
        login_id: linkAPI.loginEmp,
    };
    let obj = {
        package_name: 'hr',
        url: linkAPI.BusinessTripDetailExportFile,
        method: 'post',
        params,
        type: "blob",
    };
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
        setSuccess([]);
        response.message && setError(response.message);
    } else {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName.split("/")[fileName?.split("/").length-1]); //or any other extension
        document.body.appendChild(link);
        link.click();
    };
}

    /**
    * Export File Attachement
    *
    * @author  nt_linh
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const exportFileDetail = async(e,fileName) => {
        setLoading(true);
        let params = {
            company_id: linkAPI.companyID,
            file_id: e.id,
            login_id: linkAPI.loginEmp,
        };
        let obj = {
            package_name: 'hr',
            url: linkAPI.BusinessTripDetailExportFileDetail,
            method: 'post',
            params,
            type: "blob",
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setSuccess([]);
            response.message && setError(response.message);
        } else {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName.split("/")[fileName?.split("/").length-1]); //or any other extension
            document.body.appendChild(link);
            link.click();
        };
    }

  const confirmReason = (e) => {
      setError([]);
      setSuccess("");
      setModalReject(!modalReject);
      setReason("");
  }

  const closeModalReject = () => {
      setModalReject(!modalReject);
      setErrorModal("");
  }
  const previous=()=>{
    if(flagPrev){
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_ID_DETAILS_DETAILS_DASHBOARD");
        history.push("./dashboard");
    }
    else{
        sessionStorage.removeItem("RETURN_BUSINESS_TRIP_LIST_ID_DETAILS");
        sessionStorage.setItem("RETURN_BUSINESS_TRIP_LIST_INFO_DETAILS_PREVIOUS", 1);
        history.push("./business-trip-list");
    }
  }

  return (
    <CRow>
        <CCol>
            <Loading start={loading} />
            <Message success={success} error={error} />
            <CCard className="business-trip-detail">
                <CCardHeader>
                    <h5 id='lblBusinessTripRequestDetail'>{t('Business Trip Request Detail')}</h5>
                </CCardHeader>
                <CCardBody>
                    <div className="clearfix">
                        <div className="float-right ">
                            <CButton id="btnPrevious"
                                onClick={previous}
                                style={{ backgroundColor: "#F4F6FD" }}>
                                <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                                {t("Previous")}
                            </CButton>
                        </div>
                    </div>
                    <br/>
                    <BusinessTripDetailInfo
                        mainTable={mainTable}
                        department={department}
                        exportFile={exportFile}
                    />
                    <BusinessTripDetailTable
                        mainTable={mainTable}
                        currencies={currencies}
                        businessTrip={businessTrip}
                        currenciesAll={currenciesAll}
                        airTicket={airTicket}
                        accommodation={accommodation}
                        other={other}
                        dailyAllowance={dailyAllowance}
                        transportation={transportation}
                        subTotalTicket={subTotalTicket}
                        subTotalAcc={subTotalAcc}
                        subTotalTran={subTotalTran}
                        subTotalDaily={subTotalDaily}
                        subTotalOther={subTotalOther}
                        bugetTotal={bugetTotal}
                        totalAdvance={totalAdvance}
                        advanceFlag={advanceFlag}
                        currencyID={currencyID}
                        exportFile={exportFileDetail}
                        setCheckBorder={setCheckBorder}
                        checkBorder={checkBorder}
                    />
                    <BusinessTripDetailApprover
                        mainTable={mainTable}
                    />
                    <BusinessTripDetailButton
                        confirmReason={confirmReason}
                        mainTable={mainTable}
                        downloadBusiness={downloadBusiness}
                        confirmBusiness={confirmBusiness}
                    />
                    <ModalReject
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
                        cancel={cancelClick}

                        confirmModalBox={confirmModalBox}
                        confirmToggleAlert={confirmBusiness}
                        confirmOK={confirmOK}
                    />
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function BusinessTripDetail() { return ( <Welcome />) }
