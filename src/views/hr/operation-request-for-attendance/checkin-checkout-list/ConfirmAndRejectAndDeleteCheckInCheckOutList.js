/* eslint-disable no-use-before-define */
import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const ConfirmAndRejectAndDeleteCheckInCheckOutList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });    

    return (<>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                {!isEmpty(props.mainTable) &&
                    <>
                        <CButton className="form-btn" id='btnDelete' name='btnDelete' onClick={props.deleteToggleAlert} style={{ display: props.showCheckDelete && props.showDelete ? "inline" : "none", margin: "15px" }}>
                            {t('Delete')}
                        </CButton>
                        {props.showConfirm && <>
                            <CButton className="form-btn" id='btnConfirm' name='btnConfirm' onClick={props.confirmToggleAlert} style={{ display: props.showDelete ? "none" : "inline" }}>
                                {t('Confirm')}
                            </CButton>
                            <CButton className="form-btn" id='btnReject' name='btnReject' onClick={props.openModalReject} style={{ display: props.showDelete ? "none" : "inline", margin: "15px" }}>
                                {t('Reject')}
                            </CButton>
                        </>}
                    </>}
            </CCol>
        </CRow>
    </>
    );
}
export default ConfirmAndRejectAndDeleteCheckInCheckOutList;