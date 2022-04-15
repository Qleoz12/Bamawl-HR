import { CButton, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';


const ConfirmAndRejectAndDownloadExpenseDetail = props => {

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {!isEmpty(props.mainTable) && <>
            <CRow className="pb-3" lg="12">
                <CCol className="t-align-center">
                    {props.canConfirm == true && <>
                        <CButton id="btnConfirm" onClick={props.confirmToggleAlert} className="form-btn mb-2">{t('Confirm')}</CButton>
                        <CButton id="btnReject" onClick={props.openModalReject} className="form-btn mx-lg-4 mb-2">{t('Reject')}</CButton>
                    </>
                    }
                    <CButton id="btnExport" onClick={props.exportFile} className="form-btn mb-2"><CImg src={'image/download.png'} alt="titleicon" width="15px" height="15px" className="mr-2"></CImg>{t('Download')}</CButton>
                </CCol>
            </CRow>

        </>}
    </>
    );

}
export default ConfirmAndRejectAndDownloadExpenseDetail;