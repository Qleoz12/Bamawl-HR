import React, { useState, useEffect } from 'react';
import { CFormGroup, CLink, CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ApproverTable from '../../hr-common/approver-table/ApproverTable';
import LeaveTable from './LeaveTable';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader className="pb-3">
                <h5 className="mt-2 float-left"><CLabel className="m-0">{t('Employee Leave Detail Information')}</CLabel></h5>
                <CButton className="btn-prev" onClick={props.back}>
                    <span className="mr-2">
                        <img className="icon-prev" src='/image/previous.png' />
                    </span>
                    {t('Previous')}
                </CButton>
            </CCardHeader>
            <CCardBody className="disabled-form">
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
                            props.depName.length > 0 &&
                            props.depName.map((i,index) => {
                                return(
                                    <CRow key={index}>
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
                                props.posName.length > 0 &&
                                props.posName.map((i,index) => {
                                    return(
                                        <CRow key={index}>
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
                    // Leave Request Detail Data
                }
                <CRow lg="12" className="mb-2 mt-3">
                    <CCol lg="3">
                        <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <CLabel><h6 className="ml-2">{t('Leave Request Detail Data')}</h6></CLabel>
                    </CCol>
                </CRow>
                <div className="box box-grey mb-5">
                    <div className="ml-5 mr-5 mt-4 mb-4">
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Leave Type')}</CLabel>
                                <CInput className="bamawl-input" value={props.leaveType} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Remained Leave Day')}</CLabel>
                                <CInput className="bamawl-input" value={props.leaveDay} disabled/>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Total Day')}</CLabel>
                                <CInput className="bamawl-input" value={props.totalDay} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol lg="5">
                                <CLabel>{t('Reason')}</CLabel>
                                <CTextarea rows="1" className="bamawl-input" value={props.leaveReason} disabled/>
                            </CCol>
                        </CRow>

                        {
                            props.attachFile.length > 0 &&
                            <CFormGroup>
                                <CLabel>{t('Download')}</CLabel>
                                <CCol lg="12">
                                    {
                                        props.attachFile.map((item,index) => {
                                            return(
                                                <CRow key={index}>
                                                    <CLink onClick={()=>props.download(item)}>
                                                        <span className="mr-1">
                                                            <img className="icon-download" src='/image/download.png' />
                                                        </span>
                                                        <CLabel className="cursor-pointer" style={{ fontWeight: 'normal' }}>{item.attach_file_name}</CLabel>
                                                    </CLink>
                                                </CRow>
                                            )
                                        })
                                    }
                                </CCol>
                            </CFormGroup>
                        }


                        {
                            props.leaveData.length > 0 &&
                            <div className="box box-white mb-5">
                                <div className="m-4">
                                    <LeaveTable data={props.leaveData} />
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {
                    // Approver
                    props.approverData.length > 0 &&
                    <>
                    <CRow lg="12" className="mb-2">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel><h6 className="ml-2">{t('Approver')}</h6></CLabel>
                        </CCol>
                    </CRow>
                    <div className="box box-grey">
                        <div className="box box-white mt-5 mr-4 ml-4 mb-5">
                            <div className="ml-4 mr-4">
                                <ApproverTable data={props.approverData} />
                            </div>
                        </div>
                    </div>
                    </>
                }

                {
                    props.confirmRejBtn === true &&
                    <CRow alignHorizontal="center" className="mt-5 mb-3">
                        <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                        <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                    </CRow>
                }

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
