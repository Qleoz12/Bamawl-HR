/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CRow, CButton } from "@coreui/react";
const NextCompanyLeavaeSetting = (props) => {
    let { nextEvent } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
            <div style={{display:'flex', justifyContent:'center',gap: "30px"}}>
            <CRow
                style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div>
                    <CButton className="form-btn" id="btnNext" onClick={nextEvent}>
                        {t("Next")}
                    </CButton>
                </div>
            </CRow>
            </div>
        </>
    );
};
export default NextCompanyLeavaeSetting;
