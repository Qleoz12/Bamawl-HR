import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CSelect,CCard,CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 

const EmpListModal = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal size="xl" centered closeOnBackdrop={false} show={props.modalBoxShow}>
                <CModalHeader><h5>{t('Employee List')}</h5></CModalHeader>
                <CModalBody>
                <CRow id="approver-modal">
                        <CCol lg="12">
                        {
                            props.modalBoxError.length >0 &&
                            <CCard className="custom-card error p-3 mb-3">
                                {
                                    props.modalBoxError.map((data, index) => {
                                        return(
                                            <div key={index} >{ data }</div>
                                        )
                                    })
                                }
                            </CCard>
                        }
                        <CRow lg="12" style={{marginBottom:'10px'}}>
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="app_id">{t('Employee ID')}</CLabel>
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
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="app_name">{t('Employee Code')}</CLabel>
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
                                    <CInput value={props.empName} className="bamawl-input" disabled />
                                }
                            </CCol>
                            <CCol lg="4">
                                <CLabel htmlFor="app_name">{t('Employee Name')}</CLabel>
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
                        <CRow lg="12" style={{marginBottom:'10px',marginTop:"30px"}}>
                            <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel>{t('Deparment')}</CLabel>
                                    <CSelect onChange={props.deptChange} value={props.deptState} className="bamawl-select" custom>
                                        <option key="" value="">---{t('Select Department')}---</option>
                                            {props.departmentAPI != "" &&
                                                props.departmentAPI.map((dept,index)=>{
                                                    return(
                                                        <option key={index} value={dept.id}>{dept.department_name}</option>
                                                    )
                                                })
                                            }
                                    </CSelect>
                            </CCol>
                            <CCol lg="6">
                                    <CLabel>{t('Position')}</CLabel>
                                    <CSelect onChange={props.positionChange} value={props.positionState} className="bamawl-select" custom>
                                        <option key="" value="">---{t('Select Position')}---</option>
                                            {props.positionAPI != "" &&
                                                props.positionAPI.map((pos,index)=>{
                                                    return(
                                                        <option key={index} value={pos.id}>{pos.position_name}</option>
                                                    )
                                                })
                                            }
                                    </CSelect>
                            </CCol>
                        </CRow><br/>
                        <CButtonToolbar className="confirm-body" justify="center">
                            <CButton className="form-btn" onClick={props.searchBtn}>{t('Search')}</CButton>
                            {props.data.length == 0 && 
                                <CButton className="form-btn" style={{marginLeft:"15px"}} onClick={props.closeBtn}>{t('Close')}</CButton>
                            }
                        </CButtonToolbar><br/>
                        {
                            props.data.length >0 &&
                            <CCard className='table-panel' style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"5px",paddingTop:"15px"}}>
                                <CRow style={{margin:"0px 0px 5px 7px"}} >
                                    <div className="row-count-msg">{t('Total Rows:')}{props.rowCount}{t('Row(s)')}</div>
                                </CRow>
                                <div className="table-responsive" >
                                    <table className="table" >
                                        <thead>
                                            <tr>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '3.5rem'}}>
                                                    <input type="checkbox" value="all-check" checked={props.empAllCheck === true} onChange={props.allCheckBoxChange} />
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}}>{t('Employee ID')}</th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}}>{t('Employee Code')}</th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}}>{t('Employee Name')}</th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '15rem'}}>{t('Email')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                props.data.map( (i,index) => {
                                                    return(
                                                        <tr className="" key={index}>
                                                            <td className="td-no" style={{textAlign:"center"}}>
                                                                <input type="checkbox" checked={i.is_checked === true} onChange={props.subCheckboxChange} value={i.employee_id} />
                                                            </td>
                                                            <td style={{textAlign:"right"}}>
                                                                {i.employee_id}
                                                            </td>
                                                            <td style={{textAlign:"right"}}>
                                                                {i.code}
                                                            </td>
                                                            <td style={{textAlign:"left",backgroundColor:'#D6F883'}}>
                                                                {i.name_eng}
                                                            </td>
                                                            <td style={{textAlign:"left",backgroundColor:'#D6F7DF'}}>
                                                                {i.email}
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    <br/>
                                </div>
                            </CCard>
                        }                   
                        </CCol>
                    </CRow><br/>
                    {
                        props.data.length >0 &&
                        <CButtonToolbar className="confirm-body" justify="center">
                            <CButton className="form-btn" onClick={props.addBtn}>{t('Add')}</CButton>
                            <CButton className="form-btn" style={{marginLeft:"15px"}} onClick={props.closeBtn}>{t('Close')}</CButton>
                        </CButtonToolbar>
                    }
                </CModalBody>
            </CModal>
        </>
    )
}
export default EmpListModal