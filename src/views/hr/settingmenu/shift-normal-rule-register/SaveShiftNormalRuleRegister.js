import {
    CCol, CRow, CButton
} from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SaveShiftNormalRuleRegister = props => {
    let {
        saveData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (
        <>
            <CRow lg="12">
                <CCol className="text-center">
                    <CButton id="btnSave" className="form-btn mr-2" onClick={saveData}>{t('Save')}</CButton>
                </CCol>
            </CRow><br />
        </>
    )
}

export default SaveShiftNormalRuleRegister;