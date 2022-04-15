import { CCol, CRow, CTextarea } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailEducationBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            {t('Education')}</h5>
                    </CRow>
                    <CRow lg="12" className="mt-3 mb-lg-2">
                        <CCol lg="5">
                            <div className="mb-2">
                                <div>
                                    <label
                                        className="emp-info-detail-label-disable font-weight-bold"
                                        id="lbEducation">
                                        {t('Education')}
                                    </label>
                                </div>
                                <div>
                                    <TextField
                                        id="txtEducation"
                                        className="input-emp-info-detail-disable"
                                        fullWidth
                                        value={props.education}
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
                                        id="lbQualificationEducation">
                                        {t('Other Qualification and Education')}
                                    </label>
                                </div>
                                <div>
                                    <CTextarea
                                        id="txtQualificationEducation"
                                        className="input-emp-info-detail-disable emp-info-detail-text-area"
                                        value={props.qualificationEducation}
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
export default EmployeeInfoDetailEducationBox