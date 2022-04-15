/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BusinessTripAdjustmentRequestSave=props=> {
    let {
        requestData
    } = props;
    
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow lg="12">
            <CCol style={{textAlign:"center"}}>
                <CButton id="btnRequest" className="form-btn" onClick={requestData}>{t('Request')}</CButton>
            </CCol>
        </CRow>
    </>
    );
}
export default BusinessTripAdjustmentRequestSave;