import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RequestExpenseRequest = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <> {((props.mainTable && props.mainTable.length > 0) || (props.positionRank == true)) && (
            <CRow lg="12" xs="4">
                <CCol style={{ textAlign: "center" }}>
                    <CButton
                        id="btnRequest"
                        className="form-btn"
                        onClick={props.requestToggleAlert}>
                        {t('Request')}</CButton>
                </CCol>
            </CRow>
        )}
        </>
    )
}
export default RequestExpenseRequest