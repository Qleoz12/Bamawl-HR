import { CCol, CRow, CTextarea } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const EducationBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12">
                <h5 className="pl-3 font-weight-bold mb-4" style={{ color: "#4E57AA" }}>
                    {t('Education')}</h5>
            </CRow>
            <CRow lg="12">
                <CCol lg="5" className="mb-4" >
                    <label id="lbStatus">{t('Education')}</label>
                    <div className="input-emp-list">
                        <CTextarea id="txtEducation" className="textbox-lines" maxLength="100" onChange={props.changeEducation} id="txtEducation" rows="2" style={{ color: "currentColor" }} value={props.education ? props.education : ""}></CTextarea>
                    </div>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5">
                    <label id="lbMaritalStatus">{t('Other Qualification And Education')}</label>
                    <div className="input-emp-list">
                        <CTextarea id="txtOtherQualificationAndEducation" className="textbox-lines" maxLength="500" onChange={props.changeQualification} id="txtOtherQualificationAndEducation" rows="2" style={{ color: "currentColor" }} value={props.qualification ? props.qualification : ""}></CTextarea>
                    </div>
                </CCol>
            </CRow>
        </>
    )

}
export default EducationBox;