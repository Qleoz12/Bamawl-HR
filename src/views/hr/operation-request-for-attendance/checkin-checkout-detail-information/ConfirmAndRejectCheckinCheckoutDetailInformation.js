import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const ConfirmAndRejectCheckinCheckoutDetailInformation = props => {

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
    {props.canConfirm == true && 
     <CRow className="pb-3" lg="12">
     <CCol className="t-align-center">
         <CButton className="form-btn m-1" onClick={props.confirmToggleAlert}>{t('Confirm')}</CButton>
         <CButton className="form-btn ml-lg-4 m-1" onClick={props.openModalReject}>{t('Reject')}</CButton>
     </CCol>
 </CRow>
 }
       
    </>
    );

}
export default ConfirmAndRejectCheckinCheckoutDetailInformation;