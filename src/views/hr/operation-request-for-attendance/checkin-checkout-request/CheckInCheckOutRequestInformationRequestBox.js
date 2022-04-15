import { CCol, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const CheckInCheckOutRequestInformationRequestBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>

            <CRow lg="12">
                <CCol xl="4" lg="3"></CCol>
                <CCol xl="4" lg="6" >
                    <div className="mb-5">
                        <div>
                            <label id="lbEmployeeID">{t('Employee ID')}
                                <span className="checkIO-request-label-require">*</span>
                            </label>
                        </div>
                        <div>
                            <TextField
                                id="txtEmployeeID"
                                className="input-checkIO-request"
                                fullWidth
                                value={props.empId}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div>
                            <label 
                                className="checkIO-request-label-disable" 
                                id="lbEmployeeCode">
                                    {t('Employee Code')}
                            </label>
                        </div>
                        <div>
                            <TextField
                                id="txtEmployeeCode"
                                className="input-checkIO-request"
                                value={props.empCode}
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <div>
                            <label 
                                className="checkIO-request-label-disable"  
                                id="lbEmployeeName">
                                    {t('Employee Name')}
                            </label>
                        </div>
                        <div>
                            <TextField
                                id="txtEmployeeName"
                                className="input-checkIO-request"
                                value={props.empName}
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div>
                            <label id="lbDate">{t('Date')}
                                <span className="checkIO-request-label-require">*</span>
                            </label>
                        </div>
                        <div>
                            <TextField
                                id="txtDate"
                                className="input-checkIO-request"
                                value={props.date}
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    <div className="" style={{ display: "flex" }}>
                        <div>
                            <label id="lbAllowCondition" className="font-weight-bold wrap-text checkIO-request-allow-label">
                                <input
                                    id="chkAllowCondition"
                                    type="checkbox" className="mr-1"
                                    checked={props.allowCondition}
                                    onChange={props.allowConditionChange}
                                    autoFocus={true}
                                />
                                {t('Allow if the date has been requested as leave or business trip')}
                            </label>
                        </div>
                    </div>
                </CCol>
                <CCol xl="4" lg="6"></CCol>
            </CRow>
        </>
    )
}
export default CheckInCheckOutRequestInformationRequestBox;