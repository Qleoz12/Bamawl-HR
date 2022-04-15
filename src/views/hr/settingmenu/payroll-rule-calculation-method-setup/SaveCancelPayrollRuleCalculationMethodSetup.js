/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const SaveCancelPayrollRuleCalculationMethodSetup = props => {
    let {
        mainTable,
        saveData,
        cancelData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (
        mainTable.length > 0 && <>
            <CRow lg="12">
                <CCol className="text-center">
                    <CButton id="btnSave" className="form-btn mr-2" onClick={saveData}>{t('Save')}</CButton>
                    <CButton id="btnCancel" className="form-btn" onClick={cancelData} >{t('Cancel')}</CButton>
                </CCol>
            </CRow>
        </>
    );
}
export default SaveCancelPayrollRuleCalculationMethodSetup;