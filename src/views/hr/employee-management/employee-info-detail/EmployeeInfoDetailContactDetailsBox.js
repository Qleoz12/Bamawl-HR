import { CCol, CRow, CTextarea } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailContactDetailsBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            {t('Contact Details')}</h5>
                    </CRow>
                    <CRow lg="12" className="mt-3 mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbAddress">
                                        {t('Address')}
                                    </label>
                                </div>
                                <div>
                                    <CTextarea
                                        id="txtAddress"
                                        className="input-emp-info-detail-disable emp-info-detail-text-area"
                                        value={props.address}
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
                                        id="lbPhoneNumber">
                                        {t('Phone Number')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtPhoneNumber"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.phoneNumber}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mt-3 mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbEmailAddress">
                                        {t('Email Address')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtEmailAddress"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.emailAddress}
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
export default EmployeeInfoDetailContactDetailsBox;