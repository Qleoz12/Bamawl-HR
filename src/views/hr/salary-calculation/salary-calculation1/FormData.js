import React, { useState, useEffect } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CImg, CLabel, CForm, CInput, CSelect, CTextarea, CModal, CModalHeader, CModalBody } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import Method from '../../hr-common/method/Method';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import CIcon from '@coreui/icons-react';
import SalaryCalculateTable from './SalaryCalculateTable';

const FormData = props => {

    const {t} = useTranslation();

    return(<>
        <CCard>
            <CCardHeader><h5><CLabel className="m-0">{t('Calculate Salary Step 1')}</CLabel></h5></CCardHeader>
            <CCardBody>
                {
                    // Autocomplete
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
                }

                {
                    // Month and Exchange Rate
                    <CRow>
                        <CCol lg="5" className="mb-4">
                            <CLabel className="required">{t('Choose month to calculate salary')}</CLabel>
                            <DatePicker value={props.month} change={props.changeMonth} format='month' />
                        </CCol>
                        <CCol lg="2">
                            <div className="line"></div>
                        </CCol>
                        <CCol lg="5" className="mb-4">
                            <CLabel className="required">{t('Exchange Rate')}</CLabel>
                            <CInput className="bamawl-input" value={props.ex} placeholder="1500" onChange={props.changeEX} />
                            <div className="float-right mt-1" style={{ color: 'red', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                <CIcon name="cil-warning" size="sm" /><span className="ml-1">{t('Must be MMK for $1 (USD)')}</span>
                            </div>
                        </CCol>
                    </CRow>
                }

                {
                    // Day Range and Department Name
                    <CRow className="mb-4">
                        <CCol lg="5" className="mb-4">
                            <CLabel>{t('Day Range')}</CLabel>
                            <CSelect className="bamawl-select" onChange={props.changeDayRange} custom>
                                <option key="" value="">---{t('Select Day Range')}---</option>
                                {
                                    props.dayRangeArr.map( (i,index) => {
                                        return( <option key={index} value={i}> {i} </option> )
                                    } )
                                }
                            </CSelect>
                        </CCol>
                        <CCol lg="2">
                            <div className="line"></div>
                        </CCol>
                        <CCol lg="5" >
                            <CLabel>{t('Department Name')}</CLabel>
                            <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                                <option key="" value="">---{t('Select Department')}---</option>
                                {
                                    props.deptArr.map( i => {
                                        return( <option key={ i.id } value={ i.id }> { i.department_name } </option> )
                                    } )
                                }
                            </CSelect>
                        </CCol>
                    </CRow>
                }

                {
                    props.autoFile === false &&
                    <CRow alignHorizontal="center" className="mt-4 mb-2">
                        <CButton className="form-btn m-2" onClick={props.calculate}>{t('Calculate')}</CButton>
                        <CButton className="form-btn m-2" onClick={props.delete}>{t('Delete')}</CButton>
                    </CRow>
                }

                {
                    props.autoFile === true &&
                    <CRow alignHorizontal="center" className="mt-4 mb-2">
                        <CButton className="form-btn" onClick={props.runAutoFile}>{t('Run Auto File')}</CButton>
                    </CRow>
                }

                <SalaryCalculateTable
                    data={props.mainTable}
                    leave={props.companyLeave}
                    allLeave={props.allLeave}
                    changeLeave={props.changeLeaveAdj}
                    rowCount={props.rowCount}
                    saveAndNext={props.saveAndNext}
                    autoFile={props.autoFile}
                    export={props.export}
                />

            </CCardBody>
        </CCard>
    </>)
}

export default FormData
