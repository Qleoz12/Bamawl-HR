import React, { useState, useEffect } from 'react';
import { CLink, CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import ApproverTable from '../../hr-common/approver-table/ApproverTable';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import Table from './Table';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader>
                <h5><CLabel className="m-0">{t('Allowance Request List')}</CLabel></h5>
            </CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee ID')}</CLabel>
                            {
                                props.disableAutocomplete &&
                                <Autocomplete
                                    onChange={(i) => props.changeAutocomplete('id', i)}
                                    onSelect={props.selectAutocomplete}
                                    items={props.idArr}
                                    name={props.empID}
                                />
                            }
                            {
                                !props.disableAutocomplete &&
                                <CInput value={props.empID} className="bamawl-input" disabled />
                            }
                    </CCol>

                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee Code')}</CLabel>
                            {
                                props.disableAutocomplete &&
                                <Autocomplete
                                    onChange={(i) => props.changeAutocomplete('code', i)}
                                    onSelect={props.selectAutocomplete}
                                    items={props.codeArr}
                                    name={props.empCode}
                                />
                            }
                            {
                                !props.disableAutocomplete &&
                                <CInput value={props.empCode} className="bamawl-input" disabled />
                            }
                    </CCol>

                    <CCol className="mb-4" lg="4">
                        <CLabel>{t('Employee Name')}</CLabel>
                            {
                                props.disableAutocomplete &&
                                <Autocomplete
                                    onChange={(i) => props.changeAutocomplete('name', i)}
                                    onSelect={props.selectAutocomplete}
                                    items={props.nameArr}
                                    name={props.empName}
                                />
                            }
                            {
                                !props.disableAutocomplete &&
                                <CInput value={props.empName} className="bamawl-input" disabled />
                            }
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel className="required">{t('Start Date')}</CLabel>
                        <DatePicker value={props.startDate} change={props.changeStartDate} />
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel className="required">{t('End Date')}</CLabel>
                        <DatePicker fromDate={props.startDate} value={props.endDate} change={props.changeEndDate} />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Allowance Name')}</CLabel>
                        <CSelect className="bamawl-select" value={props.allowanceID} onChange={props.changeAllowance} custom>
                            <option key="" value="">---{t('Select Allowance')}---</option>
                            {
                                props.allowance.length >0 &&
                                    props.allowance.map((i,index) => {
                                        return( 
                                            i.suballowances.map((a,ind) =>{
                                                return( <option key={ind} name={a.id} value={a.id}>{a.others_allowance}</option>)
                                            })
                                        )
                                    })
                            }
                        </CSelect>
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Department Name')}</CLabel>
                        <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                            <option key="" value="">---{t('Select Department')}---</option>
                            {
                                props.deptArr.map( (i,index) => {
                                    return( <option key={ index } value={ i.id }> { i.department_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Approver Status')}</CLabel>
                        <CSelect className="bamawl-select" value={props.appStatus} onChange={props.changeAppStatus} custom>
                            <option key="" value="">---{t('Select Approver Status')}---</option>
                            {
                                props.appStatusArr.map( i => {
                                    return( <option key={ i.id } value={ i.id }> { i.approver_status_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>

                <CRow alignHorizontal="center" className="mt-3 mb-4">
                    <CButton className="form-btn" onClick={props.search}>{t('Search')}</CButton>
                </CRow>
                {props.noData != ""  && <>
                    <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
                        <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                    </CRow><br/>
                </>}          
                {
                    props.tableData.length > 0 &&
                    <Table
                        data={props.tableData}
                        rowCount={props.rowCount}
                        total={props.total}
                        currentPage={props.currentPage}
                        changePaginate={props.changePaginate}
                        lastPage={props.lastPage}
                        allChecked={props.allChecked}
                        changeCheckbox={props.checkboxChanged}
                        changeShowDeleteButton={props.changeShowDeleteButton}
                        flag={props.deleteFlag}
                        confirm={props.confirm}
                        delete={props.delete}
                        reject={props.reject}
                        detail={props.detail}
                        showConfirmReject={props.showConfirmReject}
                    />
                }
            </CCardBody>
        </CCard>
    </>)
}

export default FormData
