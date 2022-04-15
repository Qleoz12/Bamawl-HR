import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar,CModalHeader,CCol,CLabel,CTextarea,CCard, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 
const ApproverModal = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal  size="lg" centered closeOnBackdrop={false} show={props.modalShow}>
                <CModalHeader><h5>{t('Deny Reason')}</h5></CModalHeader>
                <CModalBody>
                <CRow id="approver-modal">
                        <CCol lg="12">
                        {
                            props.modalError.length >0 &&
                            <CCard className="custom-card error p-3 mb-3">
                                {
                                    props.modalError.map((data, index) => {
                                        return(
                                            <div key={index} >{ data }</div>
                                        )
                                    })
                                }
                            </CCard>
                        }
                        <CRow lg="12" style={{marginBottom:'10px'}} className="mt-3">
                            <CCol lg="2"></CCol>
                            <CCol lg="2" ><CLabel htmlFor="reason" className="required">{t('Reason')}</CLabel></CCol>
                            <CCol lg="6">
                                <CTextarea name="reason" id="reason" rows="3" placeholder="Remark" value={props.remark} onChange={props.textAreaChange} />
                            </CCol>
                        </CRow>
                          
                        </CCol> 
                    </CRow>
                    <CButtonToolbar className="confirm-body" justify="center">
                        <CButton className="confirm-btn" onClick={props.saveBtn}>{t('Save')}</CButton>
                        <CButton className="confirm-btn" onClick={props.closeBtn}>{t('Close')}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        </>
    )
}
export default ApproverModal