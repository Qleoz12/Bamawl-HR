import { CCol, CRow, CSelect } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const EmployeeListSearchPersonalDetailsBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12" className="my-4">
                <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                    {t('Personal Details')}</h5>
            </CRow>
            <CRow lg="12" className="mb-4 mt-3">
                <CCol lg="5" className="py-1" >
                    <label id="lbStatus">{t('Status')}</label>
                    <CSelect id="dropStatus"
                        className="bamawl-select"
                        value={props.statusState}
                        onChange={props.statusChange}
                        custom>
                        <option key="" value="">{t('All')}</option>
                        <option key="1" value="1">{t('Employ')}</option>
                        <option key="2" value="0">{t('Resign')}</option>
                    </CSelect>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className=" py-1" >
                    <label id="lbMaritalStatus">{t('Marital Status')}</label>
                    <CSelect id="dropMaritalStatus"
                        className="bamawl-select"
                        value={props.maritalStatusState}
                        onChange={props.maritalStatusChange}
                        custom>
                        <option key="" value="">{t('All')}</option>
                        <option key="1" value="1">{t('Single')}</option>
                        <option key="2" value="2">{t('Married')}</option>
                        <option key="3" value="3">{t('Divorce')}</option>

                    </CSelect>
                </CCol>
            </CRow>
            <CRow lg="12" className="my-4">
                <CCol lg="5" className="py-1" >
                    <label id="lbGender">{t('Gender')}</label>
                    <CSelect id="dropGender"
                        className="bamawl-select"
                        value={props.genderState}
                        onChange={props.genderChange}
                        custom>
                        <option key="" value="">{t('All')}</option>
                        <option key="1" value="M">{t('Male')}</option>
                        <option key="2" value="F">{t('Female')}</option>
                    </CSelect>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="py-1 emp-list-input" >
                    <label id="lbEmail">{t('Email')}</label>
                    <div className="input-emp-list">
                        <TextField value={props.emailState} onChange={props.emailChange} id="txtEmail" fullWidth />
                    </div>
                </CCol>
            </CRow>

        </>
    )

}
export default EmployeeListSearchPersonalDetailsBox;