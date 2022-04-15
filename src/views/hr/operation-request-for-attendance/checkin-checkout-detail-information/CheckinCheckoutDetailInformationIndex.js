/* eslint-disable no-use-before-define */
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkMaxLength, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import CheckinCheckoutDetailInformationEmployeeBox from './CheckinCheckoutDetailInformationEmployeeBox';
import CheckinCheckoutDetailInformationMap from './CheckinCheckoutDetailInformationMap';
import CheckinCheckoutDetailInformationTable from './CheckinCheckoutDetailInformationTable';
import ConfirmAndRejectCheckinCheckoutDetailInformation from './ConfirmAndRejectCheckinCheckoutDetailInformation';
import PreviousCheckinCheckoutDetailInformation from './PreviousCheckinCheckoutDetailInformation';



// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {
    const history = useHistory(); // For edit link
    const [approverTable, setApproverTable] = useState([]); // for amount data 

    const [rowCount, setRowCount] = useState('');           // For row count
    const [mainTable, setMainTable] = useState([]);
    const [editData, setEditData] = useState([]); // for Edit data
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [google, setGoogle] = useState();
    const [canConfirm, setCanConfirm] = useState();
    const [content, setContent] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [listData , setListData] = useState();
    const [googleMapApiKey , setGoogleMapApiKey] = useState('');

    const typingTimeoutRef = useRef(null);    // keep value time out 
    // Loaded initially
    useEffect(() => {
        ApiViewPermission.loadViewPermission();
        let edit_Data = JSON.parse(sessionStorage.getItem("RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS")); // return data from Checkin Checkout List Form
        // let dash_data = JSON.parse(sessionStorage.getItem("RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS_DASHBOARD"));
        let info_Detail = JSON.parse(sessionStorage.getItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS"));
        // sessionStorage.removeItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS");
        if (edit_Data) {
            if(edit_Data.flag_data){
                let edit_id = edit_Data;
                setEditData(edit_id.employee_attendance_id);
                editIndex(edit_id.employee_attendance_id);   
                setListData(edit_Data);
            } else {
                let edit_id = edit_Data;
                setEditData(edit_id);
                editIndex(edit_id);   
                setListData(info_Detail);  
            }
            
            
        }else {
            history.push("../operation-request-for-attendance/checkin-checkout-list")
        }
    }, []);


    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);


    const removeMessage = () => {
        setError("");
        setSuccess("");
        setErrorModal("");
    }


    /** Start Save/Update function */
    const [errorModal, setErrorModal] = useState([]);
    const [confirmModalBox, setConfirmModalBox] = useState(false); // Delete confirm box show or hide
    const confirmToggleAlert = () => {
            setContent(t('Are you sure want to confirm?')); setType('confirm');
            setError([]);
            setSuccess("");
            setConfirmModalBox(!confirmModalBox);   
    }
    const confirmOK = async() => {
        setLoading(true);
        setConfirmModalBox(!confirmModalBox);
        let params = {
            company_id: ApiPath.companyID,
            login_id: ApiPath.loginEmp,
            attendance_ids: [editData]
        }
        let obj = { package_name: 'hr', url: ApiPath.CheckinCheckoutDetailInformationConfirm, method: 'post', params };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            setLoading(false);
            editIndex(editData);
        } else {
            setLoading(false);
            setError([]);
            setSuccess([response.data.message]);       
            editIndex(editData);
        }
    };
    /** End Confirm Function */

    /* Open Modal Reject */
    const [modalReject, setModalReject] = useState(false);
    const openModalReject = (e) => {
        setContent(t('Are you sure want to reject?')); setType('reject');
        setReason("");
        setError([]);
        setSuccess("");
        setModalReject(!modalReject)
    }

    const closeModalReject = () => {
        setModalReject(!modalReject);
        setErrorModal("");
    }

    const [reason, setReason] = useState("");
    let changeReason = (e) => {
        setReason(e.target.value);
    }

    /** Reject Function */
    const RejectOK = async() => {
        let params = {
            company_id: ApiPath.companyID,
            login_id: ApiPath.loginEmp,
            attendance_ids: [editData],
            denied_reason: reason,
        }
        if (isEmpty(reason)) {
            setErrorModal([t('JSE124').replace('%s', t('Reason'))]);
        }
        else if (!checkMaxLength(reason, 500)) {
            setErrorModal([t('JSE123').replace('%s', t('Reason')).replace('%s', 500)]);
        }
        else {
            setLoading(true);
            setModalReject(!modalReject);
            let obj = { package_name: 'hr', url: ApiPath.CheckinCheckoutDetailInformationReject, method: 'post', params };
            let response = await ApiRequest(obj);
            if (response.flag === false) {
                setLoading(false);
                setError(response.message);
                setSuccess("");
                editIndex(editData);
            } else {
                setLoading(false);
                setError([]);
                setSuccess([response.data.message]);
                setModalReject(!modalReject);
                editIndex(editData);
            }
        }
    };
    /** Reject Function End*/

    /** Start Detail Function */
    let editIndex = async(edit_id) => {
        setLoading(true);
        let url = `${ApiPath.CheckinCheckoutDetailInformationDetail}${edit_id}?company_id=${ApiPath.companyID}&login_id=${ApiPath.loginEmp}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if (response.flag === false) {
            setError(response.message);
            setSuccess("");
            setEditData([]);
            setMainTable([]);
            setLoading(false);
            setGoogleMapApiKey('');
        } else {         
            setLoading(false);  
            setCanConfirm(response.data.data.can_confirm);
            setApproverTable(response.data.data.approvers);
            setRowCount(t('Total Rows').replace('%s', response.data.row_count));
            setMainTable([response.data.data]);
            setGoogleMapApiKey(response.data.data.google_map_api_key);           
        }
    };

    const changePrevious = () => {
        localStorage.setItem("DETAIL_ID_RETURN",JSON.stringify(listData));
        // sessionStorage.setItem("RETURN_CHECKIN_CHECKOUT_LIST_INFO_DETAILS_PREVIOUS", 1);
        // sessionStorage.removeItem("RETURN_CHECKIN_CHECKOUT_LIST_ID_DETAILS");
        history.push("../operation-request-for-attendance/checkin-checkout-list");
    }


    return (
        <CRow>
            <CCol xs="12"  style={{display: editData ? "block" : "none"}}>
            <Loading start={loading} />
                {/* Error and success msg */}
                <Message success={success} error={error} />
                <CCard>
                    <CCardHeader>
                        <h5><CLabel className="">{t('Check In Check Out Detail Information')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        <ModalReject
                            removeMessage={removeMessage}
                            errorModal={errorModal}
                            changeReason={changeReason}
                            reason={reason}
                            RejectOK={RejectOK}
                            closeModalReject={closeModalReject}
                            modalReject={modalReject} />
                        <PreviousCheckinCheckoutDetailInformation
                        changePrevious={changePrevious} />
                        <br />
                        <CheckinCheckoutDetailInformationEmployeeBox
                            mainTable={mainTable} />
                        <br />

                        <CheckinCheckoutDetailInformationMap
                            googleMapApiKey={googleMapApiKey}
                            mainTable={mainTable}
                            google={google}
                            editData={editData} />
                        <br />
                        <br />
                        <CheckinCheckoutDetailInformationTable
                            approverTable={approverTable} />
                        <ConfirmAndRejectCheckinCheckoutDetailInformation
                            canConfirm={canConfirm}
                            confirmToggleAlert={confirmToggleAlert}
                            openModalReject={openModalReject} />
                               <Confirmation
                                content={content}
                                okButton={t('Ok')}
                                cancelButton={t('Cancel')}
                                type={type}
                                show={confirmModalBox}
                                cancel={()=>setConfirmModalBox(!confirmModalBox)}
                                confirmOK={confirmOK} />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);
export default function CheckinCheckoutDetailInformationIndex() {
    return (
        <Welcome />
    )
}