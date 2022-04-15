import React from 'react';
import {CButton,CCol,CRow} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SaveData = props => {
    const{t} = useTranslation();
    return (<>
            <CRow className="" lg="12">
                <CCol style={{textAlign:"center"}}>
                    <CButton className="form-btn" onClick={props.saveAllData}>{t('Save')}</CButton>
                    <CButton className="form-btn" style={{marginLeft:"20px"}} onClick={props.cancelAllData}>{t('Cancel')}</CButton>
                </CCol>
            </CRow>
        </>
    );  
}
export default SaveData;