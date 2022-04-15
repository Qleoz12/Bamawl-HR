import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExportEmployeeList = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12">
                <CCol className="emp-list-btnExport-col">
                    <CButton id="btnExportCSV" className="form-btn" onClick={props.exportAPI}>{t('Export CSV')}</CButton>
                </CCol>
            </CRow><br />
        </>
    )

}
export default ExportEmployeeList;