import { CCol, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailDepartmentRoleBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            {t('Department & Role')}</h5>
                    </CRow>
                    {props.dep_position && props.dep_position.length > 0 && (
                        <CRow lg="12" className="mt-3 mb-lg-2">
                            <CCol lg="5">
                                <div className="mb-2">
                                    <div>
                                        <label
                                            className="emp-info-detail-label-disable font-weight-bold"
                                            id="lbDepartment">
                                            {t('Department')}
                                        </label>
                                    </div>
                                    {props.dep_position.map((i, index) => {
                                        return (
                                            <div key={index} className={index > 0 ? "mt-2" : ""}>
                                                <TextField
                                                    id={"txtDepartment" + i.departments.department_name}
                                                    className="input-emp-info-detail-disable"
                                                    fullWidth
                                                    value={i.departments.department_name}
                                                    disabled
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol lg="5">
                                <div className="mb-2">
                                    <div>
                                        <label
                                            className="emp-info-detail-label-disable font-weight-bold"
                                            id="lbPosition"
                                        >
                                            {t('Position')}
                                        </label>
                                    </div>
                                    {props.dep_position.map((i, index) => {
                                        return (
                                            <div key={index} className={index > 0 ? "mt-2" : ""}>
                                                <TextField
                                                    id={"txtPosition" + i.positions.position_name}
                                                    className="input-emp-info-detail-disable"
                                                    fullWidth
                                                    value={i.positions.position_name}
                                                    disabled
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            </CCol>
                        </CRow>
                    )}

                    <CRow lg="12" className="mt-3 mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbEligible">
                                        {t('Eligible Or Non-Eligible')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtEligible"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.eligible}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                </Fragment>
            )}
        </>
    )
}
export default EmployeeInfoDetailDepartmentRoleBox;