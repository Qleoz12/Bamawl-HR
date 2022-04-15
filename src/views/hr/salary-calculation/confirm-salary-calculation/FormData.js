import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CFormGroup, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Method from '../../hr-common/method/Method';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import CIcon from '@coreui/icons-react';
import Table from './Table';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Confirm Salary Calculation')}</CLabel></h5></CCardHeader>
            <CCardBody>
                <CForm>
                    <CFormGroup>
                        <CLabel className="required">
                            <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            {t('Payment Month')}
                        </CLabel>
                        <CRow className="leave-time-count">
                            <CCol lg="3">
                                <DatePicker className="bamawl-input" value={props.payMonth} change={props.payMonthChange} format="month" />
                            </CCol>
                        </CRow>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel className="required">
                            <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            {t('Payment Type')}
                        </CLabel>
                        <CRow className="leave-time-count">
                			<CCol lg='2' className="leave-time-count-inner">
                                <span>{t('Salary')}</span>
                                <input
                					className="leave-time-count-radio"
                					type="radio"
                					name="leave-time-count"
                					value="1"
                					checked={props.payType === "1" ? true : false}
                					onChange={props.payTypeChange}
                                />
                			</CCol>
                          	<CCol lg='2' className="leave-time-count-inner">
                            	<span>{t('Bonus')}</span>
                            	<input
                                  	className="leave-time-count-radio"
                                  	type="radio"
                                  	name="leave-time-count"
                					value="2"
                					checked={props.payType === "2" ? true : false}
                                  	onChange={props.payTypeChange}
                            	/>
                          	</CCol>
                        </CRow>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>
                            <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            {t('Department')}
                        </CLabel>
                        <CRow className="leave-time-count">
                            <CCol lg="3">
                                <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                                    <option value="">---{t('Select Department')}---</option>
                                    {
        								props.deptArr.length > 0 &&
        								props.deptArr.map( i => {
        									return( <option key={ i.id } value={ i.id }> { i.department_name } </option> )
        								} )
        							}
                                </CSelect>
                            </CCol>
                        </CRow>
                    </CFormGroup>
                    {props.approverStatusShow === true &&
                        <CFormGroup>
                            <CLabel className="required">
                                <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                                {t('Approve Status')}
                            </CLabel>
                            <CRow className="leave-time-count">
                                <CCol lg="3">
                                    <CSelect className="bamawl-select" value={props.approveStatusID} onChange={props.changeApproveStatus} custom>
                                        <option value="">---{t('Select Approve Status')}---</option>
                                        <option key={ 1 } value={ 1 }> {t('Pending')}   </option>
                                        <option key={ 2 } value={ 2 }> {t('Confirmed')} </option>
                                        <option key={ 3 } value={ 3 }> {t('Rejected')}  </option>
                                    </CSelect>
                                </CCol>
                            </CRow>
                        </CFormGroup>
                    }
                    <CRow alignHorizontal="center" className="mt-4 mb-2">
                        <CButton className="form-btn" onClick={props.search}>{t('Search')}</CButton>
                    </CRow>
                    {props.noData != ""  && <>
                        <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
                        <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                        </CRow><br/>
                    </>}
                </CForm>

                <Table
                    data={props.tableData}
                    checkboxColumn={props.checkboxColumn}
                    checkApplicantApprover={props.checkApplicantApprover}
                    changeCheckbox={props.changeCheckbox}
                    allChecked={props.allChecked}
                    delete={props.delete}
                    confirm={props.confirm}
                    reject={props.reject}
                    payslipDownload={props.payslipDownload}
                    payBank={props.payBank}
                    depModal={props.depModal}

                    totalConfirmAmountShow={props.totalConfirmAmountShow}
                    currency={props.currency}
                    totalColumn={props.totalColumn}
                />

                {
                    props.totalConfirmAmountShow === true &&
                    props.totalConfirmArray.map((i,index) => {
                        return(
                            <CFormGroup>
                                <CLabel>
                                    <CImg className="mr-1" src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                                    {t(`Total Confirmed Amount ${i.currency_name}`)}
                                </CLabel>
                                <CRow className="leave-time-count">
                                    <CCol lg="12" className="p-2" style={{ border: '1px solid #e6e6e6', background: 'white', borderRadius: 9 }}>
                                        <CLabel className="m-0 ml-2">{t(`This month of total confirmed amount is ${i.currency_name} ${i.currency_value}`)}</CLabel>
                                    </CCol>
                                </CRow>
                            </CFormGroup>
                        )}
                    )
                }

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
