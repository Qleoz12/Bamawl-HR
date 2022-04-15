import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SaveEmployeePersonal = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow className="" lg="12" >
            <CCol className="inline-salary" style={{ textAlign: "center" }}>
                <CButton id="btnSave" className="form-btn mr-5" onClick={props.saveData} >{t('Save')}</CButton>
                {props.viewPermissionAPI !== 0 && <>
                    <CButton id="btnPrev" className="employee-personal-btn mr-2" onClick={props.prevEmployee} ><i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>  {t('Prev')}</CButton>
                    <CButton id="btnNext" className="employee-personal-btn" onClick={props.nextEmployee} >{t('Next')}  <i className="fa fa-step-forward" aria-hidden="true" style={{ color: "#76cc39" }}></i></CButton>
                </>
                }
            </CCol>
        </CRow>
    </>);
}
export default SaveEmployeePersonal;