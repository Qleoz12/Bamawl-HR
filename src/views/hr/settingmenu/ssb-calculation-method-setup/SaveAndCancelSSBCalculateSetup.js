/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const SaveAndCancelSSBCalculateSetup = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        cancelData,
        saveData,
        mainTable
    } = props

    return (<>
        {mainTable != "" &&
            <CRow className="" lg="12">
                <CCol style={{ textAlign: "center" }}>
                    <CButton id="btnSave" className="form-btn" onClick={saveData}>{t('Save')}</CButton>
                    <CButton id="btnCancel" className="form-btn" style={{ marginLeft: "20px" }} onClick={cancelData}>{t('Cancel')}</CButton>
                </CCol>
            </CRow>
        }
    </>
    );
}
export default SaveAndCancelSSBCalculateSetup;