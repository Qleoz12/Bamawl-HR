import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
// import CommonAutocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const AddLeaveDaySetting=props=> {
    const{t} = useTranslation();
    return (<>
            <CRow lg="12" style={{marginBottom:'10px'}}>
                <CCol lg="4" className="verticle-line">
                    <CLabel className="required">{t('Employee ID')}</CLabel><br/>
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
            </CRow><br/>
            <CRow lg="12">
                <CCol lg="3">
                    <CImg src={'/avatars/list.png'} alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    <CLabel style={{marginLeft:"10px"}} className="middle" >{t('Leave Type Setting')}</CLabel>
                </CCol>
            </CRow>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',margin:"10px"}}>
                <CRow lg="12" style={{margin:'10px'}}>
                    <CCol lg="5">
                        <CLabel className="required">{t('Leave Type')}</CLabel><br/>
                        <CSelect onChange={props.leaveChange} value={props.leaveState} className="bamawl-select" custom>
                            <option key="" value="">{t('Select Leave Type')}</option>
                            {props.leavetypeAPI != "" &&
                                props.leavetypeAPI.map((lev,index)=>{
                                    return(
                                        <option key={index} value={lev.id}>{lev.name}</option>
                                    )
                                })
                            }
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow lg="12" style={{margin:'10px'}}>
                    <CCol lg="5">
                        {props.levType == true && <>
                            <CLabel className="required">{t('Works Off Days')}</CLabel><br/>
                        </>}
                        {props.leaveName == false && <>
                            <CLabel className="required">{t('Leave Date(From)')}</CLabel><br/>
                        </>}
                        <DatePicker value={props.selectedFromDate} change={props.changeFromDate} />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        {props.leaveName == 'CompLev' && <>
                            <CLabel className="required">{t('Compensatory Time Off Day')}</CLabel><br/>
                        </>}
                        {props.leaveName == 'OFFINLev' && <>
                            <CLabel className="required">{t('Off In Lieu Off Day')}</CLabel><br/>
                        </>}
                        {props.leaveName == 'PHINLev' && <>
                            <CLabel className="required">{t('PH In Lieu Off Day')}</CLabel><br/>
                        </>}
                        {props.leaveName == false && <>
                            <CLabel className="required">{t('Leave Date(To)')}</CLabel><br/>
                        </>}
                        <DatePicker value={props.selectedToDate} change={props.changeToDate} />
                    </CCol>
                </CRow><br/>
                <CRow alignHorizontal="center">
                    <CButton className="form-btn" onClick={props.addAPI}>{t('Add')}</CButton> 
                </CRow><br/>
            </div>
            <br/>
    </>
    );
}
export default AddLeaveDaySetting;