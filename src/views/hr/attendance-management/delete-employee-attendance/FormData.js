import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import Method from '../../hr-common/method/Method';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Table from './Table';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Delete Employee Attendance')}</CLabel></h5></CCardHeader>
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

                { /* From Date To Date */ }
                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel className="required">{t('From Date')}</CLabel>
                        <DatePicker value={props.fromDate} change={props.changeFromDate} />
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel className="required">{t('To Date')}</CLabel>
                        <DatePicker fromDate={props.fromDate} value={props.toDate} change={props.changeToDate} />
                    </CCol>
                </CRow>

                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Department')}</CLabel>
                        <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                            <option key="" value="">---Select Department---</option>
                            {
                                props.deptArr.map( i => {
                                    return( <option key={ i.id } value={ i.id }> { i.department_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Position')}</CLabel>
                        <CSelect className="bamawl-select" value={props.posID} onChange={props.changePos} custom>
                            <option key="" value="">---Select Position---</option>
                            {
                                props.posArr.map( i => {
                                    return( <option key={ i.id } value={ i.id }> { i.position_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>

                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Status')}</CLabel>
                        <CSelect className="bamawl-select" value={props.status} onChange={props.changeStatus} custom>
                            <option key="" value="">---Select Status---</option>
                            {
                                props.statusArr.map( i => {
                                    return( <option key={ i.id } value={ i.status_name }> { i.status_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>


                <CRow alignHorizontal="center" className="mt-4 mb-4">
                    <CButton className="form-btn" onClick={props.search}>{t('Search')}</CButton>
                </CRow>

                {props.noData != ""  && <>
                <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
                    <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                </CRow><br/>
                </>}
                <Table data={props.tableData} rowCount={props.rowCount} allChecked={props.allChecked} change={props.checkboxChanged} delete={props.checkboxDelete} />
            </CCardBody>
        </CCard>
    </>)
}

export default FormData
