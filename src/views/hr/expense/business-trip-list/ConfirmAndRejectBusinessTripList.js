/* eslint-disable no-use-before-define */
import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const ConfirmAndRejectBusinessTripList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                {!isEmpty(props.mainTable) && props.checkHidden &&
                    <>
                        <CButton className="form-btn" id='btnConfirm' name='btnConfirm' onClick={props.confirmToggleAlert}>
                            {t('Confirm')}
                        </CButton>
                        <CButton className="form-btn" id='btnReject' name='btnReject' onClick={props.openModalReject} style={{ margin: "15px" }}>
                            {t('Reject')}
                        </CButton>
                    </>}
            </CCol>
        </CRow>
    </>
    );
}
export default ConfirmAndRejectBusinessTripList;