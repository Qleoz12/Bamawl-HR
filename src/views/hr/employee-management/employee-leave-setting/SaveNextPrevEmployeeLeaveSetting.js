/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { CRow, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";
import ViewPermision from './../../../brycen-common/constant/ViewPermission';

const SaveNextPrevEmployeeLeaveSetting = (props) => {
    let {
        clickSave,
        prevEmp,
        nextEmp,
        checkDetailEdit,
        DetailEdit,
        permission
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
            checkDetailEdit==DetailEdit.EDIT&&(
                <>
                <CRow
                        style={{
                            marginBottom: "50px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <CButton
                            id="btnSave"
                            className="form-btn"
                            onClick={clickSave}
                            style={{ marginRight: "20px", marginLeft: "20px" }}
                        >
                            {t("Save")}
                        </CButton>
                        {
                            permission !== ViewPermision.ONLY_ME &&
                            <div style={{ textAlign: "center" }}>
                                <CButton id="btnPrev" onClick={prevEmp} className="form-btn-green">
                                    <i className="fas fa-step-backward" style={{ color: "#6AB51B",marginRight:"5px" }}></i>
                                    {t("Prev")}
                                </CButton>
                                <CButton id="btnNext" onClick={nextEmp} className="form-btn-green ml-2">
                                    {t("Next")}
                                    <i className="fas fa-step-forward" style={{ color: "#6AB51B",marginLeft:"5px" }}></i>
                                </CButton>
                            </div>
                        }                        
                    </CRow>
                </>
            )
        
    );
};
export default SaveNextPrevEmployeeLeaveSetting;
