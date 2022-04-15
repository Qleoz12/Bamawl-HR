import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CSelect,CCard,CFormGroup} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const EmployeeListModal = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal  size="xl" centered closeOnBackdrop={false} show={props.empListModalShow}>
                <CModalHeader><h5>{t('Employee List')}</h5></CModalHeader>
                <CModalBody>
                <CRow id="employee-list-modal">
                        <CCol lg="12">
                        {
                            props.empModalError.length >0 &&
                            <CCard className="custom-card error p-3 mb-3">
                                {
                                    props.empModalError.map((data, index) => {
                                        return(
                                            <div key={index} >{ data }</div>
                                        )
                                    })
                                }
                            </CCard>
                        }
                        <CRow lg="12" style={{marginBottom:'10px'}}>
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
                        </CRow>
                        <CRow className="mt-4">
                            <CCol lg='5'>
                                <CLabel>{t('Department Name')}</CLabel><br/>
                                <CFormGroup className=''>
                                    <CSelect className="bamawl-select" onChange={props.deptChange} value={props.deptState} custom>
                                        <option key="" value="">{t('---Select Department---')}</option>
                                        {props.departmentAPI != "" &&
                                            props.departmentAPI.map((dept,index)=>{
                                            return(
                                                <option key={index} value={dept.id}>{dept.department_name}</option>
                                            )
                                            })
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol>
                            <CCol lg='5'>
                                <CLabel>{t('Position')}</CLabel><br/>
                                <CFormGroup className=''>
                                    <CSelect className="bamawl-select" onChange={props.positionChange} value={props.posState} custom>
                                        <option key="" value="">{t('---Select Position---')}</option>
                                        {props.positionAPI != "" &&
                                            props.positionAPI.map((pos,index)=>{
                                            return(
                                                <option key={index} value={pos.id}>{pos.position_name}</option>
                                            )
                                            })
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow> 
                        <CButtonToolbar className="confirm-body" justify="center">
                            <CButton className="confirm-btn" onClick={props.searchBtn}>{t('Search')}</CButton>
                            {props.data.length == 0 &&
                                <CButton className="confirm-btn" onClick={props.closeBtn}>{t('Close')}</CButton>
                            }
                        </CButtonToolbar>
                        {
                            props.data.length >0 &&
                            <div className="mt-2" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                            <CCard className='table-panel mt-3'>
                            <CRow id="table">
                            <CCol lg="12">
                                <div className="table-responsive">
                                    <table className=" table forget-card-entry-employee-list-modal" >
                                        <thead className="">
                                            <tr>
                                            <th width="10px" className=""  style={{verticalAlign: "middle"}}>
                                                <input type="checkbox" value="all-check" checked={props.empAllCheck === true} onChange={props.allCheckBoxChange} />
                                            </th>
                                            <th width="200px" className="" style={{verticalAlign: "middle"}}>{t('Employee ID')}</th>
                                            <th width="200px" className="" style={{verticalAlign: "middle"}}>{t('Employee Code')}</th>
                                            <th width="200px" className="" style={{verticalAlign: "middle"}}>{t('Employee Name')}</th>
                                            <th width="200px" className="" style={{verticalAlign: "middle"}}>{t('Email')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="">
                                            {
                                                props.data.map( (i,index) => {
                                                    return(
                                                        <tr className="" key={index}>
                                                            <td  width="10px" className="break-word" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                                                                <input type="checkbox" checked={i.is_checked === true} onChange={props.subCheckboxChange} value={i.employee_id} />
                                                            </td>
                                                            <td width="100px" className="break-word right">
                                                                {i.employee_id}
                                                            </td>
                                                            <td width="200px" className="break-word left">
                                                                {i.employee_code}
                                                            </td>
                                                            <td width="200px" className="break-word left">
                                                                {i.employee_name}
                                                            </td>
                                                            <td  width="200px" className="bg-cyan break-word left">
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
                            </CCol>
                            </CRow>
                            </CCard>
                            </div>
                        }                   
                        </CCol>
                    </CRow>
                    {
                        props.data.length >0 &&
                        <CButtonToolbar className="confirm-body" justify="center">
                            <CButton className="confirm-btn" onClick={props.addBtn}>{t('Add')}</CButton>
                            <CButton className="confirm-btn" onClick={props.closeBtn}>{t('Close')}</CButton>
                        </CButtonToolbar>
                    }
                </CModalBody>
            </CModal>
        </>
    )
}
export default EmployeeListModal
