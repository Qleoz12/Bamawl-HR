/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg,CSelect, CFormGroup, CButton, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
/**
 * @author Zin Min Myat
 * @create 25/06/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const Form=props=> {
    const{t} = useTranslation();
    return (
        <>
            <CRow lg="12" style={{marginBottom:'10px'}}>
                {props.viewPermission > 0 &&
                    <>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}> 
                                <CLabel htmlFor="emp_id" className="">{t('Employee ID')}</CLabel>
                                <Autocomplete onChange={(i) =>props.changeAutocomplete('id', i)} onSelect={props.selectAutocomplete} items={props.empIDData} name={props.empID} />
                        </CCol>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                <Autocomplete onChange={(i) =>props.changeAutocomplete('code', i)} onSelect={props.selectAutocomplete} items={props.empCodeData} name={props.empCode} />
                        </CCol>
                        <CCol lg="4">
                                <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                <Autocomplete onChange={(i) =>props.changeAutocomplete('name', i)} onSelect={props.selectAutocomplete} items={props.empNameData} name={props.empName} />
                        </CCol>
                    </>
                }
                {props.viewPermission  < 1 &&
                    <>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}> 
                                <CLabel htmlFor="emp_id" className="">{t('Employee ID')}</CLabel>
                                <CInput type="text" value={props.employeeID} className="bamawl-input" readOnly  />
                        </CCol>
                        <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
                                <CInput type="text" value={props.employeeCode} className="bamawl-input" readOnly />
                        </CCol>
                        <CCol lg="4">
                                <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                <CInput type="text" value={props.employeeName} className="bamawl-input" readOnly />
                        </CCol>
                    </>
                }
                
            </CRow>
            <CRow lg="12" style={{marginBottom:'10px'}} className="mt-4">
                {props.viewPermission > 0 &&
                    <CCol lg="4">
                            <CLabel htmlFor="department_name">{t('Department Name')}</CLabel>
                            <CSelect  className="bamawl-select" custom  id="department_name" value={props.department} onChange={props.departmentChange}>
                                <option key="" value="">---Select---</option>
                                {
                                    props.departmentData.length > 0 &&
                                    props.departmentData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.department_name }</option>)})
                                }
                            </CSelect>
                    </CCol>
                }
                {props.viewPermission < 1 &&
                    <CCol lg="4">
                            <CLabel htmlFor="department_name">{t('Department Name')}</CLabel>
                            <CInput type="text" value={props.departmentName} className="bamawl-input" readOnly />
                    </CCol>
                }
            </CRow>
            <CRow alignHorizontal="center" className="mt-3">
                {props.viewPermission > 0 &&
                    <CButton  className="form-btn" onClick={props.searchBtn}>{t('Search')}</CButton>
                }
                {props.viewPermission <1 &&
                    <CButton  className="form-btn" disabled>{t('Search')}</CButton>
                }

            </CRow>
        </>
    );
}
export default Form;
