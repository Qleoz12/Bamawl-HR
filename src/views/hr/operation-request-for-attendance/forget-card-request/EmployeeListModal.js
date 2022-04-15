import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CSelect,CCard} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 
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
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                                <CLabel htmlFor="emp_id" className="">{t('Employee ID')}</CLabel>
                                <Autocomplete onChange={(i) =>props.changeAutocomplete('id', i)} onSelect={props.selectAutocomplete} items={props.empIDData} name={props.empID} />
                        </CCol>
                        <CCol lg="6">
                                <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
                                <Autocomplete onChange={(i) =>props.changeAutocomplete('name', i)} onSelect={props.selectAutocomplete} items={props.empNameData} name={props.empName} />
                        </CCol>
                    </CRow>
                    <CRow lg="12" className="mt-4" style={{marginBottom:'10px'}}>
                        <CCol lg="6" style={{borderRight:"1px solid #E3E5F1"}}>
                            <CLabel htmlFor="department">{t('Department')}</CLabel>
                                <CSelect className="bamawl-select" custom  id="department" onChange={props.departmentChange}>
                                <option key="" value="">---Select---</option>
                                {
                                    props.departmentData.length >0 &&
                                        props.departmentData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.department_name }</option>)})
                                }
                            </CSelect>
                        </CCol>
                        <CCol lg="6">
                            <CLabel htmlFor="position">{t('Position')}</CLabel>
                                <CSelect  className="bamawl-select" custom   id="position" onChange={props.positionChange}>
                                <option key="" value="">---Select---</option>
                                {
                                    props.positionData.length >0 &&
                                        props.positionData.map(i => {
                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.position_name }</option>)})
                                }
                            </CSelect>
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
                            <div className="table-responsive tableFixHead">
                                <table className=" table forget-card-entry-employee-list-modal" >
                                    <thead className="">
                                        <tr>
                                        <th width="10px" className="center"  style={{verticalAlign: "middle"}}>
                                            <input type="checkbox" value="all-check" checked={props.empAllCheck === true} onChange={props.allCheckBoxChange} />
                                        </th>
                                        <th width="120px" className="center" style={{verticalAlign: "middle"}}>{t('Employee ID')}</th>
                                        <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Code')}</th>
                                        <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Name')}</th>
                                        <th width="200px" className="center" style={{verticalAlign: "middle"}}>{t('Email')}</th>
                                       
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map( (i,index) => {
                                                return(
                                                    <tr className="" key={index}>
                                                        <td  width="10px" className="break-word">
                                                            <input type="checkbox" checked={i.is_checked === true} onChange={props.subCheckboxChange} value={i.employee_id} />
                                                        </td>
                                                        <td width="120px" className="break-word right">
                                                            {i.employee_id}
                                                        </td>
                                                        <td width="150px" className="break-word right">
                                                            {i.employee_code}
                                                        </td>
                                                        <td width="150px" className="break-word left" style={{background: "#fef3d4"}}>
                                                            {i.employee_name}
                                                        </td>
                                                        <td  width="200px" className="break-word left">
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