import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
// import Autocomplete from 'react-autocomplete';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SearchData=props=> {
    const{t} = useTranslation();
    return (<>
            <CRow lg="12" style={{marginBottom:'30px'}}>
                <CCol lg="4" className="verticle-line">
                    <CLabel>{t('Employee ID')}</CLabel><br/>
                    {
                        props.disableAutocomplete &&
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.autocompleteID}
                            name={props.empId}
                        />
                    }
                    {
                        !props.disableAutocomplete &&
                        <CInput value={props.empId} className="bamawl-input" disabled />
                    }
                </CCol>
                <CCol lg="4" className="verticle-line">
                    <CLabel>{t('Employee Code')}</CLabel><br/>
                    {
                        props.disableAutocomplete &&
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.autocompleteCode}
                            name={props.empCode}
                        />
                    }
                    {
                        !props.disableAutocomplete &&
                        <CInput value={props.empCode} className="bamawl-input" disabled />
                    }
                </CCol>
                <CCol lg="4">
                    <CLabel>{t('Employee Name')}</CLabel><br/>
                    {
                        props.disableAutocomplete &&
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.autocompleteName}
                            name={props.empName}
                        />
                    }
                    {
                        !props.disableAutocomplete &&
                        <CInput value={props.empName} className="bamawl-input" disabled />
                    }
                </CCol>
            </CRow>
            <CRow lg="12" style={{paddingBottom:'30px'}}>
                <CCol lg="4" className="verticle-line">
                    <CLabel className="required">{t('From Date')}</CLabel><br/>
                    <DatePicker value={props.selectedFromDate} change={props.changeFromDate} />
                </CCol>
                <CCol lg="4" className="verticle-line">
                    <CLabel className="required">{t('To Date')}</CLabel><br/>
                    <DatePicker value={props.selectedToDate} change={props.changeToDate} />
                </CCol>
                <CCol lg="4">
                    <CLabel>{t('Department Name')}</CLabel><br/>
                    <CSelect onChange={props.deptChange} value={props.deptState} className="bamawl-select" custom>
                        <option key="" value="">{t('Select Department')}</option>
                        {props.departmentAPI != "" &&
                            props.departmentAPI.map((dept,index)=>{
                                return(
                                    <option key={index} value={dept.id}>{dept.department_name}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <CRow lg="12" style={{paddingBottom:'10px'}}>
                <CCol lg="5">
                    <CLabel>{t('Position Name')}</CLabel><br/>
                    <CSelect onChange={props.positionChange} value={props.positionState} className="bamawl-select" custom>
                        <option key="" value="">{t('Select Position')}</option>
                        {props.positionAPI != "" &&
                            props.positionAPI.map((pos,index)=>{
                                return(
                                    <option key={index} value={pos.id}>{pos.position_name}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <br/>
            <CRow alignHorizontal="center">
                <CButton className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton> 
            </CRow>
            {props.noData != ""  && <>
                <CRow lg="12" style={{margin:"5px 0px 0px 5px"}}>
                    <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                </CRow><br/>
            </>}
        </>
    );
}
export default SearchData;