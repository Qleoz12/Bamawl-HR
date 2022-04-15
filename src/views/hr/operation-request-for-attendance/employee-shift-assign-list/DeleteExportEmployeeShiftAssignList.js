/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { CRow, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";
const DeleteExportEmployeeShiftAssignList = (props) => {
    let {
        deleteClick,
        exportClick
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
                            id="btnDelete"
                            className="form-btn"
                            style={{ marginRight: '20px' }}
                            onClick={deleteClick}
                        >
                            {t('Delete')}
                        </CButton>
                            <CButton
                            id="btnExport"
                            className="form-btn" 
                            onClick={exportClick}>
                            {t('Export')}
                            </CButton>
                </CRow>  
                </>
            )
};
export default DeleteExportEmployeeShiftAssignList;
