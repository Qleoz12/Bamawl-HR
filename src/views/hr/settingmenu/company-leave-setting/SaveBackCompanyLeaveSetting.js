/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    CRow,
    CButton,
} from '@coreui/react';
const SaveBackCompanyLeaveSetting = (props) => {
    let {
        showScreenChooseLeaveType,
        formInsertCompanyLeave
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>   
        <CRow
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <CButton
                    id="btnBack"
                    className="form-btn"
                    style={{ marginRight: '20px' }}
                    onClick={showScreenChooseLeaveType}
                >
                    {t('Back')}
                </CButton>
                <CButton
                    id="btnSave"
                    className="form-btn" 
                    onClick={formInsertCompanyLeave}>
                    {t('Save')}
                </CButton>
            </CRow>  
        </>
    );
};
export default SaveBackCompanyLeaveSetting;

