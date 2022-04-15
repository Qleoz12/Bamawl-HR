import { CButton,CRow } from "@coreui/react";
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";



const PreviousCheckinCheckoutDetailInformation = props => {
    const history = useHistory();
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
    <CRow className="d-flex flex-row-reverse mr-2">
    <CButton type="button"
            className=""
            onClick={props.changePrevious}
            style={{ backgroundColor: "#F4F6FD" }}>
            <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
            {t("Previous")}
        </CButton>
    </CRow>
        
    </>);
}
export default PreviousCheckinCheckoutDetailInformation;
