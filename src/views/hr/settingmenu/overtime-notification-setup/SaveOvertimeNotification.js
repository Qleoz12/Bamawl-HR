/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const SaveOvertimeNotification=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {props.mainTable != ""  &&
            <CRow className="" lg="12">
                <CCol style={{textAlign:"center"}}>
                    <CButton id="btnSave" className="form-btn" onClick={props.saveData}>{t('Save')}</CButton>
                    <CButton id="btnCancel" className="form-btn" style={{marginLeft:"20px"}} onClick={props.cancelData}>{t('Cancel')}</CButton>
                </CCol>   
            </CRow>
        }
    </>
    );
}
export default SaveOvertimeNotification;