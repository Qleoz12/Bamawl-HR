import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import Method from '../../hr-common/method/Method';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import YearlyBonusListTable from './YearlyBonusListTable';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Yearly Bonus Registration List')}</CLabel></h5></CCardHeader>
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

                <CRow className="mb-4">
                    <CCol lg="5" >
                        <CLabel>{t('Department Name')}</CLabel>
                        <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                            <option key="" value="">---Select Department---</option>
                            {
                                props.deptArr.map( i => {
                                    return( <option key={ i.id } value={ i.id }> { i.department_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>

                { /* Select Bonus method */ }
                <CRow className="mt-5 mb-2">
                    <CCol lg="3">
                        <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                        <CLabel className='required ml-2'>{t('Select Bonus Method')}</CLabel>
                    </CCol>
                </CRow>
                <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px',marginBottom:'60px'}}>
                    <CRow lg="12" style={{margin:"25px 0px 15px 20px"}}>
                        <CCol lg="3" xs="4">
                            <CImg src='/image/dollor.png' alt="dolloricon" style={{width:'11px',height:'14px',marginBottom:'2px'}}/>
                            <CLabel className="ml-2">{t('Bonus Salary')}</CLabel>
                        </CCol>
                        <CCol className="ml-2">
                            <Method label1={props.label1} label2={props.label2} checked={props.methodCheck} change={props.changeMethod} value={props.transferMethod} method={props.method} />
                        </CCol>
                    </CRow>
                </div>

                <CRow alignHorizontal="center" className="mt-5 mb-5">
                    <CButton className="form-btn" onClick={()=>props.search(false)}>{t('Search')}</CButton>
                </CRow>
                {props.noData != ""  && <>
                    <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
                    <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                    </CRow><br/>
                </>}
                <YearlyBonusListTable data={props.mainTable} rowCount={props.rowCount} allChecked={props.allChecked} change={props.checkboxChanged} delete={props.checkboxDelete} />

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
