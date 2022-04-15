import { CButton, CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SearchEmployeeList = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12">
                <CCol className="emp-list-btnSearch-col">
                    <CButton id="btnSearch" className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
                </CCol>
            </CRow><br />
        </>
    )

}
export default SearchEmployeeList;