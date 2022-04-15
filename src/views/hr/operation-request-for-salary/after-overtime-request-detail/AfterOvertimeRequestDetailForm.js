/* eslint-disable no-use-before-define */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CImg, CButton, CLabel, CTextarea, CCard, CCardHeader, CCardBody, CInput, CLink} from '@coreui/react';
import ApproverTable from '../../hr-common/approver-table/ApproverTable';

/**
 * @author Aye Thiri Mon
 * @create 01/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
export default FormData=props=> {
    const{t} = useTranslation();
    return (
      <>
        <CCard className="disabled-form">
            <CCardHeader className="pb-3">
                <h5 className="mt-2 float-left">{t('Overtime Amount Detail Information')}</h5>
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
                        <CInput className="bamawl-input" defaultValue={props.empID} disabled/>
                    </CCol>

                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee Code')}</CLabel>
                        <CInput className="bamawl-input" defaultValue={props.empCode} disabled/>
                    </CCol>

                    <CCol className="mb-4" lg="4">
                        <CLabel>{t('Employee Name')}</CLabel>
                        <CInput className="bamawl-input" defaultValue={props.empName} disabled/>
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
                <CRow lg="12" className="mb-2 mt-3">
                    <CCol lg="3">
                        <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <h6 className="ml-2 middle">{t('Overtime Data')}</h6>
                    </CCol>
                </CRow>
                <div className="box box-grey mb-5">
                    <div className="ml-5 mr-5 mt-4 mb-4">
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Shift Name')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.shift_name} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Overtime Rate Name')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.overtime_rate_name} disabled/>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Overtime Date')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.overtime_date} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Overtime Status')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.overtime_status} disabled/>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Overtime Hour')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.overtime_hour} disabled/>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="mb-4" lg="5">
                                <CLabel>{t('Remark')}</CLabel>
                                <CInput className="bamawl-input" value={props.overtimeData.remark} disabled/>
                            </CCol>
                        </CRow>
                    </div>
                </div>
                {
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
                            <div className="ml-4 mr-4">
                                <ApproverTable data={props.approverData} />
                            </div>
                        </div>
                    </div>
                    </>
                }
                {props.confirmRejectShow === true &&
                    <CRow alignHorizontal="center" className="mt-5 mb-3">
                        <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                        <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                    </CRow>
                }
            </CCardBody>
        </CCard>
      </>
    );
}
