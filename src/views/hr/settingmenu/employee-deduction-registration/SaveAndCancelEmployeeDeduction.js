/* eslint-disable eqeqeq */
import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CButton} from '@coreui/react';
/**
 * SaveAndCancelEmployeeDeduction
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const SaveAndCancelEmployeeDeduction=props=> {
    let {
        saveData,
        cancelData,
        calMethod,
        mainTable
    } = props;
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
    { calMethod === true &&
        mainTable.length > 0 && 
        <CRow lg="12" className="overtime-rate" >
            <CCol style={{textAlign:"center", marginTop: "15px"}}>
                <CButton className="form-btn" id='btnSave' onClick={saveData}>{t('Save')}</CButton>
                <CButton className="form-btn" id='btnCancel' style={{marginLeft:"20px"}} onClick={cancelData}>{t('Cancel')}</CButton>
            </CCol> 
        </CRow>
    }
    {calMethod === false &&
        <CRow lg="12" className="overtime-rate" >
            <CCol style={{textAlign:"center", marginTop: "15px"}}>
                <CButton className="form-btn" id='btnSave' onClick={saveData}>{t('Save')}</CButton>
                <CButton className="form-btn" id='btnCancel' style={{marginLeft:"20px"}} onClick={cancelData}>{t('Cancel')}</CButton>
            </CCol> 
        </CRow>
    }
    </>
    );
}
export default SaveAndCancelEmployeeDeduction;