import React, { useState, useEffect } from 'react';
import { CLink, CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ApproverTable from '../../hr-common/approver-table/ApproverTable';
import AttachFileTable from './AttachFileTable';

const FormData = props => {

    const {t} = useTranslation();

    let route = "";
    props.attendance == 1 ? route = '/avatars/true.png' : route = '/avatars/false.png'

    return(<>
        <CCard className="disabled-form">
            <CCardHeader className="pb-3">
                <h5 className="mt-2 float-left"><CLabel className="m-0">{t('Allowance Request Detail Information')}</CLabel></h5>
                <CButton className="btn-prev" onClick={props.previous}>
                    <span className="mr-2">
                        <CImg className="icon-prev" src='/image/previous.png' />
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
                        {
                            props.dept.length > 0 &&
                            props.dept.map((i,index) => {
                                return(
                                    <CRow>
                                        <CCol>
                                            <CInput className="bamawl-input" value={i.department_name} disabled/>
                                        </CCol>
                                    </CRow>
                                )
                            })
                        }
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Position Name')}</CLabel>
                            {
                                props.pos.length > 0 &&
                                props.pos.map((i,index) => {
                                    return(
                                        <CRow>
                                            <CCol>
                                                <CInput className="bamawl-input" value={i.position_name} disabled/>
                                            </CCol>
                                        </CRow>
                                    )
                                })
                            }
                    </CCol>
                </CRow>

                {
                    // Allowance Request Detail Data
                }
                <CRow lg="12" className="mb-2 mt-3">
                    <CCol lg="3">
                        <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <CLabel><h6 className="ml-2">{t('Allowance Request Detail Data')}</h6></CLabel>
                    </CCol>
                </CRow>
                <div className="box box-grey mb-5">
                    <div className="ml-5 mr-5 mt-4 mb-4">
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('From Date')}</CLabel>
                                <CInput className="bamawl-input" value={props.fromDate} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('To Date')}</CLabel>
                                <CInput className="bamawl-input" value={props.toDate} disabled/>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Days')}</CLabel>
                                <CInput className="bamawl-input" value={props.days} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol lg="5">
                                <CLabel>{t('Allowance Payment')}</CLabel>
                                <CRow className="middle">
                                    <CCol lg="12">
                                        <CLabel>{t('Pay allowance')}</CLabel>
                                        <div className="toggle-switch ml-3">
                                            <CInput
                                                disabled
                                                type="checkbox"
                                                className="toggle-switch-checkbox"
                                                checked={props.payAllowance}
                                            />
                                            <CLabel className="toggle-switch-label">
                                                <span className='toggle-switch-inner-4'/>
                                                <span className="toggle-switch-switch"/>
                                            </CLabel>
                                        </div>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Amount')}</CLabel>
                                <CInput className="bamawl-input" value={props.amount} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Description')}</CLabel>
                                <CInput className="bamawl-input" value={props.desc} disabled/>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol>
                                <CLabel>{t('Request for Attendance')}</CLabel>
                                <span>
                                    <CImg width="23px" className="ml-3" src={route} />
                                </span>
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
                        <div className="box box-white mt-5 mr-4 ml-4 mb-4">
                            <div className="ml-4 mr-4">
                                <ApproverTable data={props.approverData} />
                            </div>
                        </div>
                        {
                            props.flag === true &&
                            <CRow alignHorizontal="center" className="mb-4">
                                <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                                <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                            </CRow>
                        }
                    </div>
                    </>
                }
                {
                    // Attach file
                    props.fileData.length > 0 &&
                    <>
                        <CRow lg="12" className="mt-5 mb-2">
                            <CCol lg="3">
                                <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                                <h6 className="ml-2">{t('Attatch File')}</h6>
                            </CCol>
                        </CRow>
                        <div className="box box-grey">
                            <div className="box box-white mt-5 mr-4 ml-4 mb-4">
                                <div className="ml-4 mr-4">
                                    <AttachFileTable data={props.fileData} download={props.download} />
                                </div>
                            </div>
                        </div>
                    </>
                }

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
