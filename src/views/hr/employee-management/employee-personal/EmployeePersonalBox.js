import { CCol, CFormGroup, CInputRadio, CLabel, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from '../../hr-common/datepicker/DatePicker';

const EmployeePersonalBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {
                props.detailAPI &&
                props.detailAPI.map((data, index) => {
                    return (<Fragment key={index}>
                        <CRow lg="12">
                            <CCol lg="5 mb-4">
                                <label id="lbStatus" className="required">{t('Employee ID')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtEmployeeID" fullWidth value={data.employee_id} disabled />
                                </div>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5 mb-4" >
                                <label id="lbMaritalStatus">{t('Employee Code')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtEmployeeCode" fullWidth value={data.emp_code} disabled />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5 mb-4" >
                                <label id="lbGender" className="required">{t('Employee Name')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtEmployeeName" fullWidth value={data.emp_name ? data.emp_name : ""} disabled />
                                </div>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5 mb-4">
                                <label id="lbEmail" className="required">{t('Employee Name (MM)')}</label>
                                <div className="input-emp-list">
                                    <TextField id="txtEMployeeNameMM" fullWidth value={data.emp_name_mm ? data.emp_name_mm : ""} disabled />
                                </div>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4">
                                <CLabel className="required">{t('Joined Date')}</CLabel>
                                <DatePicker id="calJoinedDate" value={props.selectedFromDate} change={props.handleFromDateChange} />
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5">
                                <label id="radEmployeeType" className="required">{t('Employee Type')}</label>
                                <CRow className="panel-border">
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }} >
                                                <CLabel className="form-check-label" variant="checkbox">{t('Permanent')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "43px" }} >
                                                    <CInputRadio type="radio" name="employeeType" value={1} onChange={props.chooseEmployeeType} checked={props.employeeType === 1} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }} >
                                                <CLabel className="form-check-label" variant="checkbox">{t('Part time')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "43px" }} >
                                                    <CInputRadio type="radio" name="employeeType" value={2} onChange={props.chooseEmployeeType} checked={props.employeeType === 2} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }} >
                                                <CLabel className="form-check-label" variant="checkbox">{t('Contract')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "43px" }} >
                                                    <CInputRadio type="radio" name="employeeType" value={3} onChange={props.chooseEmployeeType} checked={props.employeeType === 3} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>&nbsp;
                                    <div className="item-select" >
                                        <label className="card ml-3" style={{ padding: "10px", marginLeft: "5px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }} >
                                                <CLabel className="form-check-label" variant="checkbox">{t('Indirec/Driver')}</CLabel>
                                                <div className="float-right" style={{ marginLeft: "43px" }} >
                                                    <CInputRadio type="radio" name="employeeType" value={4} onChange={props.chooseEmployeeType} checked={props.employeeType === 4} className="form-check-input"
                                                    />
                                                </div>
                                            </CFormGroup>
                                        </label>
                                    </div>
                                </CRow>
                            </CCol>
                        </CRow>
                    </Fragment>)
                })}
        </>
    )

}
export default EmployeePersonalBox;