import React from 'react';
import {CButton,CCol,CRow} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 07/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SaveData = props => {
    const{t} = useTranslation();
    return (<>
        {props.calculateCheck === true &&
            props.mainTable != ""  &&
            <CRow alignHorizontal="center" style={{marginTop:"40px"}} >
                <CButton className="form-btn" onClick={props.saveAllData} >{t('Save')}</CButton>
                <CButton className="form-btn" style={{marginLeft:"20px"}} onClick={props.cancelAllData} >{t('Cancel')}</CButton>
            </CRow>
        }
        {props.calculateCheck === false &&
            <CRow alignHorizontal="center" style={{marginTop:"40px"}} >
                <CButton className="form-btn" onClick={props.saveAllData} >{t('Save')}</CButton>
                <CButton className="form-btn" style={{marginLeft:"20px"}} onClick={props.cancelAllData} >{t('Cancel')}</CButton>
            </CRow>
        }
        </>
    );  
}
export default SaveData;