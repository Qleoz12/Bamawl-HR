import React from 'react';

import { useTranslation } from 'react-i18next';
import {
    CButton,
} from "@coreui/react";

const SaveAndCancelAllowanceRegister = props => {
    const { t } = useTranslation();
    let {
        saveAlert,
        handleClear,
        disableSave
    } = props;
    return (
        <>
            <div style={{
                display: "flex", justifyContent: "center", gap: "20px"
            }}>
                <CButton
                    id='btnSave'
                    className="form-btn"
                    onClick={saveAlert}
                    disabled={disableSave}
                >
                    {t("Save")}
                </CButton>
                <CButton
                    id='btnCancel'
                    className="form-btn"
                    onClick={handleClear}
                >
                    {t("Cancel")}
                </CButton>
            </div>
        </>
    )
}

export default SaveAndCancelAllowanceRegister;