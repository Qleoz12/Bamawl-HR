import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CSelect,CCard} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 
const ApproverModal = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal  size="xl" centered closeOnBackdrop={false} show={props.approverModalShow}>
                <CModalHeader><h5>{t('Approvers List By Position')}</h5></CModalHeader>
                <CModalBody>
                <CRow id="approver-modal">
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
                                    <CLabel htmlFor="app_id" className="required">{t('Employee ID')}</CLabel>
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
                            <div className="table-responsive">
                                <table className=" table forget-card-entry-approver-modal" >
                                    <thead>
                                        <tr width="100%">
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>
                                                <input type="checkbox" value="all-check" checked={props.appAllCheck === true} onChange={props.allCheckBoxChange} />
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Approver ID')}</th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Approver Code')}</th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Approver Name')}</th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Approver Email')}</th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Department')}</th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}}>{t('Position')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map( (i,index) => {
                                                return(
                                                    <tr className="" key={index}>
                                                        <td className="td-no" style={{textAlign:"center"}}>
                                                            <input type="checkbox" checked={i.is_checked === true} onChange={props.subCheckboxChange} value={i.approver_id} />
                                                        </td>
                                                        <td style={{textAlign:"right"}}>
                                                            {i.approver_id}
                                                        </td>
                                                        <td style={{textAlign:"right"}}>
                                                            {i.approver_code}
                                                        </td>
                                                        <td style={{textAlign:"left",backgroundColor:'#D6F883'}}>
                                                            {i.approver_name}
                                                        </td>
                                                        <td style={{textAlign:"left",backgroundColor:'#D6F7DF'}}>
                                                            {i.email}
                                                        </td>
                                                        <td style={{textAlign:"left",backgroundColor:'#FADEE6'}}>
                                                            {i.department}
                                                        </td>
                                                        <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}}>
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