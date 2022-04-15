import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AddAndCloseSalaryTransferSettingByGroup = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable != "" &&
            <CRow className="" lg="12">
                <CCol style={{ textAlign: "center" }}>
                    <CButton className="salary-transfer-setting-by-group-salary-btn mr-4" onClick={props.currencyList}>{t('Add')}</CButton>
                    <CButton className="salary-transfer-setting-by-group-salary-btn" onClick={props.cancelData}>{t('Close')}</CButton>
                </CCol>
            </CRow>
        }
    </>)
        ;

}
export default AddAndCloseSalaryTransferSettingByGroup;