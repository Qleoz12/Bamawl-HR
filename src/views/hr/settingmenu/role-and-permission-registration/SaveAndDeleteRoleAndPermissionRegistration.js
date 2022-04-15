import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';


const SaveAndDeleteRoleAndPermissionRegistration = props => {

    const { t } = useTranslation();
    useEffect(() => {
    });
    return (<>
        <CRow className="pb-3 mt-3" lg="12">
            <CCol className="t-align-center">
                <CButton className="form-btn" onClick={props.saveData}>{t('Save')}</CButton>
                <CButton className="form-btn ml-2" onClick={props.deleteClick} >{t('Delete')}</CButton>
            </CCol>
        </CRow>
    </>
    );
}
export default SaveAndDeleteRoleAndPermissionRegistration;