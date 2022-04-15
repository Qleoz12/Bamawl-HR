import { CCol, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailPersonalDetailsBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            {t('Personal Details')}</h5>
                    </CRow>
                    <CRow lg="12" className="mt-3 mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbNRCNumber">
                                        {t('NRC Number')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtNRCNumber"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.nrcNumber}
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
                                        id="lbPassportNumber">
                                        {t('Passport Number')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtPassportNumber"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.passportNumber}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbGender">
                                        {t('Gender')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtGender"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.gender}
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
                                        id="lbDOB">
                                        {t('Date Of Birth')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtDOB"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.dob}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbMaritalStatus">
                                        {t('Marital Status')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtMaritalStatus"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.maritalStatus}
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
                                        id="lbSSBAccountNumber">
                                        {t('SSB Account Number')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtSSBAccountNumber"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.ssbAccountNumber}
                                        disabled
                                    />
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                    { props.detailData.bank_account_numbers && props.detailData.bank_account_numbers.length > 0 && (
                        <CRow lg="12" className="mb-lg-2">
                            {props.detailData.bank_account_numbers.map((i, index) => {
                                return (
                                    <Fragment key={index}>
                                        <CCol lg="5">
                                            <div className="mb-2">
                                                <div>
                                                    <label
                                                        className="emp-info-detail-label-disable font-weight-bold"
                                                        id={"lbBankAccountNumber" + i.currency_desc + index}
                                                    >
                                                        {('Bank Account Number (' + i.currency_desc + ')')}
                                                    </label>
                                                </div>
                                                <div >
                                                    <TextField
                                                        id={"txtBankAccountNumber" + i.currency_desc + index}
                                                        className="input-emp-info-detail-disable"
                                                        fullWidth
                                                        value={i.acc_number}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </CCol>
                                        {index % 2 === 0 && (
                                            <CCol lg="2">
                                                <div className="line"></div>
                                            </CCol>
                                        )
                                        }
                                    </Fragment>
                                )
                            })}
                        </CRow>
                    )}
                </Fragment>
            )}

        </>
    )
}
export default EmployeeInfoDetailPersonalDetailsBox;