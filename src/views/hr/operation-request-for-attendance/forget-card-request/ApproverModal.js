import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CSelect,CCard} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 
const ApproverModal = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal  size="xl" centered closeOnBackdrop={false} show={props.approverModalShow} id="approver-modal">
                <CModalHeader><h5>{t('Approvers List By Position')}</h5></CModalHeader>
                <CModalBody>
                <CRow >
                        <CCol lg="12">
                        {
                            props.appModalError.length >0 &&
                            <CCard className="custom-card error p-3 mb-3">
                                {
                                    props.appModalError.map((data, index) => {
                                        return(
                                            <div key={index} >{ data }</div>
                                        )
                                    })
                                }
                            </CCard>
                        }
                        <CRow lg="12" style={{marginBottom:'10px'}}>
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}> 
                                    <CLabel htmlFor="app_id" className="">{t('Employee ID')}</CLabel>
                                    <Autocomplete onChange={(i) =>props.changeAutocomplete('id', i)} onSelect={props.selectAutocomplete} items={props.appIDData} name={props.appID} />
                            </CCol>
                            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
                                    <CLabel htmlFor="app_code">{t('Employee Code')}</CLabel>
                                    <Autocomplete onChange={(i) =>props.changeAutocomplete('code', i)} onSelect={props.selectAutocomplete} items={props.appCodeData} name={props.appCode} />
                            </CCol>
                            <CCol lg="4">
                                    <CLabel htmlFor="app_name">{t('Employee Name')}</CLabel>
                                    <Autocomplete onChange={(i) =>props.changeAutocomplete('name', i)} onSelect={props.selectAutocomplete} items={props.appNameData} name={props.appName} />
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
                                <table className=" table forget-card-entry-approver-modal" >
                                    <thead className="">
                                        <tr>
                                            <th width="10px" className="center"  style={{verticalAlign: "middle"}}>
                                                <input type="checkbox" value="all-check" checked={props.appAllCheck === true} onChange={props.allCheckBoxChange} />
                                            </th>
                                            <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Employee ID')}</th>
                                            <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Employee Code')}</th>
                                            <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Employee Name')}</th>
                                            <th width="200px" className="center" style={{verticalAlign: "middle"}}>{t('Employee Email')}</th>
                                            <th width="200px" className="center" style={{verticalAlign: "middle"}}>{t('Department')}</th>
                                            <th width="150px" className="center" style={{verticalAlign: "middle"}}>{t('Position')}</th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map( (i,index) => {
                                                return(
                                                    <tr className="" key={index}>
                                                        <td  width="10px" className="break-word">
                                                            <input type="checkbox" checked={i.is_checked === true} onChange={props.subCheckboxChange} value={i.approver_id} />
                                                        </td>
                                                        <td width="150px" className="break-word right">
                                                            {i.approver_id}
                                                        </td>
                                                        <td width="150px" className="break-word left" style={{background: "#fef3d4"}}>
                                                            {i.approver_code}
                                                        </td>
                                                        <td  width="150px" className="break-word left">
                                                            {i.approver_name}
                                                        </td>
                                                        <td width="200px" className="break-word right">
                                                            {i.email}
                                                        </td>
                                                        <td width="200px" className="break-word left" style={{background: "#fef3d4"}}>
                                                            {i.department}
                                                        </td>
                                                        <td  width="150px" className="break-word left">
                                                            {i.position}
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
export default ApproverModal