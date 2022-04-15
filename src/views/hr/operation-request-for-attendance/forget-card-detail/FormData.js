import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ApproverTable from '../../hr-common/approver-table/ApproverTable';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard className="disabled-form">
            <CCardHeader className="pb-3">
                <h5 className="mt-2 float-left">{t('Forget Card Detail Information')}</h5>
                <CButton className="btn-prev" onClick={props.previous}>
                    <span className="mr-2">
                        <img className="icon-prev" src='/image/previous.png' />
                    </span>
                    {t('Previous')}
                </CButton>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee ID')}</CLabel>
                        <CInput className="bamawl-input" value={props.empID} disabled/>
                    </CCol>

                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee Code')}</CLabel>
                        <CInput className="bamawl-input" value={props.empCode} disabled/>
                    </CCol>

                    <CCol className="mb-4" lg="4">
                        <CLabel>{t('Employee Name')}</CLabel>
                        <CInput className="bamawl-input" value={props.empName} disabled/>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Department Name')}</CLabel>
                        <CInput className="bamawl-input" value={props.depName} disabled/>
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Position Name')}</CLabel>
                        <CInput className="bamawl-input" value={props.posName} disabled/>
                    </CCol>
                </CRow>
                {
                    // Forget Card Data
                }
                <CRow lg="12" className="mb-2 mt-3">
                    <CCol lg="3">
                        <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <h6 className="ml-2">{t('Forget Card Data')}</h6>
                    </CCol>
                </CRow>
                <div className="box box-grey mb-5">
                    <div className="ml-5 mr-5 mt-4 mb-4">
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Attendance Date')}</CLabel>
                                <CInput className="bamawl-input" value={props.attenDate} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Attendance Time')}</CLabel>
                                <CInput className="bamawl-input" value={props.attenTime} disabled/>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Attendance Status')}</CLabel>
                                <CInput className="bamawl-input" value={props.attenStatus} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol lg="5">
                                <CLabel>{t('Description')}</CLabel>
                                <CTextarea className="bamawl-input" rows="1" value={props.attenDesc} disabled/>
                            </CCol>
                        </CRow>
                    </div>
                </div>
                {
                    // Approver
                    props.approverData.length > 0 &&
                    <>
                    <CRow lg="12" className="mb-2">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <h6 className="ml-2">{t('Approver')}</h6>
                        </CCol>
                    </CRow>
                    <div className="box box-grey">
                        <div className="box box-white mt-5 mr-4 ml-4 mb-5">
                            <div className="m-4">
                                <ApproverTable data={props.approverData} />
                            </div>
                        </div>
                    </div>
                    </>
                }

                {
                    props.flag === true &&
                    <CRow alignHorizontal="center" className="mt-5 mb-4">
                        <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                        <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                    </CRow>
                }

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
