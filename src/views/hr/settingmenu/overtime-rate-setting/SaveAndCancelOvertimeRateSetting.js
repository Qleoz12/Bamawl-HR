/* eslint-disable eqeqeq */
import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CButton} from '@coreui/react';

const SaveAndCancelOvertimeRateSetting=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow lg="12" className="overtime-rate">
            <CCol style={{textAlign:"center"}}>
                <CButton className="form-btn" id='btnSave' onClick={props.saveData}>{t('Save')}</CButton>
                <CButton className="form-btn" id='btnCancel' style={{marginLeft:"20px"}} onClick={props.cancelData}>{t('Cancel')}</CButton>
            </CCol> 
        </CRow>
    </>
    );
}
export default SaveAndCancelOvertimeRateSetting;