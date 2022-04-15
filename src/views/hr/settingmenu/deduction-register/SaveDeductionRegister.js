/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const SaveDeductionRegister=props=> {
    let {
        saveData
    } = props;
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow lg="12">
            <CCol style={{textAlign:"center"}}>
                <CButton  id="btnSave" className="form-btn" onClick={saveData}>{t('Save')}</CButton>
            </CCol>
        </CRow>
    </>
    );
}
export default SaveDeductionRegister;