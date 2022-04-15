/* eslint-disable no-use-before-define */
import React from 'react';
import { CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BusinessTripAdjustmentDetailButton = props => {
    let {
        confirmBusiness,
        confirmReason,
        downloadBusiness,
        mainData,
        flagHistory,
    } = props;

    const { t } = useTranslation();

    return (
        <CRow lg="12" style={{ justifyContent: "center" }}>
            {
                flagHistory &&
                <>
                    {
                        mainData?.can_confirm &&
                        <>
                            <CButton id="btnRequest" className="form-btn" style={{ marginRight: "50px" }} onClick={confirmBusiness}>{t('Confirm')}</CButton>
                            <CButton id="btnRequest" className="form-btn" style={{ marginRight: "50px" }} onClick={confirmReason}>{t('Reject')}</CButton>
                        </>
                    }
                    <CButton id="btnRequest" className="form-btn" onClick={downloadBusiness}>{t('Download')}</CButton>
                </>
            }
        </CRow>
    );
}
export default BusinessTripAdjustmentDetailButton;