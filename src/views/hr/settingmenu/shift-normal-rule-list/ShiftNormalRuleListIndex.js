import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    CCard,
    CContainer,
    CCardHeader,
    CCardBody,
    CRow,
    CCol
} from "@coreui/react";
import { withTranslation } from 'react-i18next';
import { isEmpty } from "../../../hr/hr-common/common-validation/CommonValidation";
import message from '../../../../common-message/commonMessage';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import ShiftNormalRuleListResult from "./ShiftNormalRuleListResult";
import Message from '../../../brycen-common/message/Message';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Loading from '../../../brycen-common/loading/Loading';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyShiftNormalRuleList({ t }) {


    const [error, setError]                       = useState([]);       // For error message
    const [success, setSuccess]                   = useState('');       // For success message

    const [listTable, setListTable]               = useState('');       // For Shift rule list data
    const [content, setContent]                   = useState('');       // For Confirmation content
    const [type, setType]                         = useState('');       // For Confirmation type
    const [showHideModalBox, setshowHideModalBox] = useState(false);    // For show/ hide modal box confirmation
    const [deleteID, setDeleteID]                 = useState('');       // Params of delete API
    const [editID, setEditID]                     = useState('');       // Params of edit API
    const history                                 = useHistory();       // For redirect to shift-normal-rule-register
    const [loading, setLoading]                   = useState(false);    // For skeleton when call api

    /**
    * Page load
    *
    * @author  ht_nguyen
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadData();        
    }, []);

    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  ht_nguyen
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
    * Get Shift Rule data
    *
    * @author  ht_nguyen
    * @create  16/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadData = async () => {
        const urlToSend =
            `${ApiPath.ShiftNormalRuleListGetData}` +
            `?company_id=${ApiPath.companyID}` +
            `&language=${ApiPath.lang}`;
        let obj = {
            package_name: 'hr',
            url: urlToSend,
            method: 'get',
        };        
        let response = await ApiRequest(obj);
        setLoading(false);

        response.flag === false ? setError(response.message) : setListTable(response.data.data);
    };




    /**
     * Redirect to Shift Normal Rule Register screen to edit.
     * Show popup Yes/No confirm.
     * IF choosen No => do nothing.
     * IF choosen Yes => redirect.
     * @author  ht_nguyen
     * @create  19/07/2021 (D/M/Y)
     * @param   id This is the id of the item to be edited
     * @return
     */
    const editToggleAlert = (id) => {
        setEditID(id);
        setContent(t('Are you sure want to edit?'));
        setType('edit');
        setshowHideModalBox(!showHideModalBox);
    };

    const editOK = () => {
        if (isValidate(editID)) {
            sessionStorage.setItem('RETURN_SNRR_DATA', JSON.stringify(editID));
            history.push("./shift-normal-rule-register");
        } else {
            let errMsg = t(message.JSE009).replace("%s", t("Shift Name"));
            setError([errMsg]);
        };
    };


    /**
     * Delete Shift Normal Rule List.
     * Show popup Yes/No confirm.
     * IF choosen No => do nothing.
     * IF choosen Yes => call API.
     * @author  ht_nguyen
     * @create  19/07/2021 (D/M/Y)
     * @param   id This is the id of the item to be deleted
     * @return
     */

    const deleteToggleAlert = (id) => {
        setDeleteID(id);
        setContent(t('Are you sure want to delete?')); setType('delete');
        setshowHideModalBox(!showHideModalBox);
        setError("");
    };

    const deleteOK = async () => {
        setshowHideModalBox(!showHideModalBox);
        if (!isValidate(deleteID)) {
            let errMsg = t(message.JSE009).replace("%s", t("Shift Name"));
            setError([errMsg]);
            return;
        };

        if (!isEmpty(deleteID)) {
            const url =
                `${ApiPath.ShiftNormalRuleListDelete}${deleteID}` +
                `?company_id=${ApiPath.companyID}` +
                `&language=${ApiPath.lang}`;
            const obj = {
                package_name: 'hr',
                url: url,
                method: 'delete',
            };

            setLoading(true);
            let response = await ApiRequest(obj);
            setLoading(false);

            if (response.flag === false) {
                setError(response.message);
            } else {
                setSuccess([response.data.message]);
                loadData();
            };

        } else {
            setSuccess('');
            let errorMsg = t(message.JSE004);
            setError([errorMsg]);
        };
    };


    /** Start validate before edit / delete */
    const isValidate = (employeeID) => {
        const listValidEmployeeID = listTable.map(i => i.id)
        return listValidEmployeeID.includes(employeeID)
    };
    /** End validate before edit / delete */



    return (
        <CRow className="shift-normal-rule-list">
            <CCol lg="12">
            <Loading start={loading} />
            <Message success={success} error={error} />
            <Confirmation
                content={content}
                okButton={t('Ok')}
                cancelButton={t('Cancel')}
                type={type}
                show={showHideModalBox}
                cancel={() => setshowHideModalBox(!showHideModalBox)}
                deleteOK={deleteOK}
                editOK={editOK}
            />
            <CCard>
                <CCardHeader><h5 id='pageTitle'><label>{t('Shift Rule List')}</label></h5></CCardHeader>
                <CCardBody>
                    {
                        listTable !== '' &&
                        <ShiftNormalRuleListResult
                            listTable={listTable}
                            editToggleAlert={editToggleAlert}
                            deleteToggleAlert={deleteToggleAlert}
                        />
                    }

                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
    )
}


const RuleList = withTranslation()(LegacyShiftNormalRuleList)
export default function ShiftNormalRuleList() {
    return (
        <RuleList />
    )
};