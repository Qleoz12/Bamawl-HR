import { CCol, CFormGroup, CInputRadio, CLabel, CRow, CSelect } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from '../../hr-common/datepicker/DatePicker';

const EmployeePersonalDetails = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {
                props.detailAPI &&
                props.detailAPI.map((data, index) => {
                    return (<Fragment key={index}>
                        <CRow lg="12">
                            <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                                {t('Personal Details')}</h5>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4">
                                <label id="lbJoinedDateTo" className="required">{t('Gender')}</label>
                                <CRow className="panel-border">
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                <CLabel className="form-check-label" variant="checkbox">{t('Male')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                    <CInputRadio name="gender" value="M" onChange={props.chooseGender} checked={props.gender === "M"} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                <CLabel className="form-check-label" variant="checkbox">{t('Female')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                    <CInputRadio name="gender" value="F" onChange={props.chooseGender} checked={props.gender === "F"} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>
                                </CRow>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5">
                                <label id="lbJoinedDateTo">{t('Marital Status')}</label>
                                <CRow className="panel-border">
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                <CLabel className="form-check-label" variant="checkbox">{t('Single')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                    <CInputRadio name="maritalStatus" value={1} onChange={props.chooseMaritalStatus} checked={props.maritalStatus === 1} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                <CLabel className="form-check-label" variant="checkbox">{t('Married')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                    <CInputRadio name="maritalStatus" value={2} onChange={props.chooseMaritalStatus} checked={props.maritalStatus === 2} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                <CLabel className="form-check-label" variant="checkbox">{t('Divorce')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                    <CInputRadio name="maritalStatus" value={3} onChange={props.chooseMaritalStatus} checked={props.maritalStatus === 3} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4" >
                                <label id="lbStatus">{t('Passport Number')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtPassportNumber" fullWidth value={data.passport_number ? data.passport_number : ""} disabled />
                                </div>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5" className="mb-4">
                                <CLabel className="required">{t('Date Of Birth')}</CLabel>
                                <DatePicker id="calDateOfBirth" value={props.selectedToDate} change={props.handleToDateChange} />
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4" >
                                <label id="lbStatus">{t('NRC Number')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtNRCNumber" fullWidth value={data.nrc_number ? data.nrc_number : ""} disabled />
                                </div>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5" className="mb-4" >
                                <label id="lbStatus">{t('Email Address')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtEmailAddress" fullWidth value={data.email} disabled />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4" >
                                <CLabel>{t('Eligible')}</CLabel>
                                <CSelect id="dropGender" className="bamawl-select" value={props.eligible} onChange={props.chooseEligible} custom>
                                    <option value={1} >{t('Eligible')}</option>
                                    <option value={2} >{t('Non-Eligible')}</option>
                                </CSelect>
                            </CCol>
                        </CRow>
                    </Fragment>)
                })}
        </>
    )

}
export default EmployeePersonalDetails;