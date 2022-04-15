/* eslint-disable no-use-before-define */
import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';

const ConfirmAndRejectExpenseList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                {!isEmpty(props.mainTable) && props.checkHidden &&
                    <>
                        <CButton className="form-btn" id='btnConfirm' name='btnConfirm' onClick={props.confirmToggleAlert} style={{ margin: "20px" }}>
                            {t('Confirm')}
                        </CButton>
                        <CButton className="form-btn" id='btnReject' name='btnReject' onClick={props.openModalReject}>
                            {t('Reject')}
                        </CButton>
                    </>}
            </CCol>
        </CRow>
    </>
    );
}
export default ConfirmAndRejectExpenseList;