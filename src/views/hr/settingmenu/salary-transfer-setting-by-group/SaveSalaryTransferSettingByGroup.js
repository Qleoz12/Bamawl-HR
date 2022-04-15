import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SaveSalaryTransferSettingByGroup = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow className="" lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton onClick={props.saveData} className="form-btn mr-4">{t('Save')}</CButton>
            </CCol>
        </CRow>
    </>
    );

}
export default SaveSalaryTransferSettingByGroup;