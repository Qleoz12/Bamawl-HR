import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequest = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12" >
                <CCol className="inline-salary text-center">
                    <CButton id="btnRequest" className="form-btn mr-5" onClick={props.saveData}>{t('Request')}</CButton>
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseAdjustmentRequest
