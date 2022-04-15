import { CCol, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailGeneralInfoBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>  {props.detailData && (
            <Fragment>
                <CRow lg="12" className="mb-lg-2">
                    <CCol lg="5">
                        <div className="mb-2">
                            <div>
                                <label
                                    className="emp-info-detail-label-disable font-weight-bold"
                                    id="lbEmployeeID">
                                    {t('Employee ID')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtEmployeeID"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.empId}
                                    disabled
                                />
                            </div>
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
                                    id="lbEmployeeCode">
                                    {t('Employee Code')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtEmployeeCode"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.empCode}
                                    disabled
                                />
                            </div>
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mb-lg-2 ">
                    <CCol lg="5">
                        <div className="mb-2">
                            <div>
                                <label
                                    className="emp-info-detail-label-disable font-weight-bold"
                                    id="lbEmployeeName">
                                    {t('Employee Name')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtEmployeeName"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.empName}
                                    disabled
                                />
                            </div>
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
                                    id="lbEmployeeNameMM">
                                    {t('Employee Name (MM)')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtEmployeeNameMM"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.empNameMM}
                                    disabled
                                />
                            </div>
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mb-lg-2 ">
                    <CCol lg="5">
                        <div className="mb-2">
                            <div>
                                <label
                                    className="emp-info-detail-label-disable font-weight-bold"
                                    id="lbEmployeeType">
                                    {t('Employee Type')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtEmployeeType"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.empType}
                                    disabled
                                />
                            </div>
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
                                    id="lbJoinedDate">
                                    {t('Joined Date')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtJoinedDate"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.joinedDate}
                                    disabled
                                />
                            </div>
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mb-lg-2 ">
                    <CCol lg="5">
                        <div className="mb-2">
                            <div>
                                <label
                                    className="emp-info-detail-label-disable font-weight-bold"
                                    id="lbContractStartDate">
                                    {t('Contract Start Date')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtContractStartDate"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.contractStartDate}
                                    disabled
                                />
                            </div>
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
                                    id="lbContractEndDate">
                                    {t('Contract End Date')}
                                </label>
                            </div>
                            <div>
                                <TextField
                                    id="txtContractEndDate"
                                    className="input-emp-info-detail-disable"
                                    fullWidth
                                    value={props.contractEndDate}
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
export default EmployeeInfoDetailGeneralInfoBox;