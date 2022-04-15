import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'react-autocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import CommonAutocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const ApproverSearch=props=> {
    const{t} = useTranslation();
    return (<>
            { props.showSearchApp === true && <>
            <CRow lg="12" style={{margin:'20px 0px 0px 3px'}}> 
                <CLabel className="required">{t('Approver')}</CLabel>
            </CRow>
            <CRow lg="12">
                <CCol lg="4">
                    <CSelect onChange={props.approverChange} onClick={props.getApplicant} value={props.approverState} disabled={props.disableApprover && "disabled"} className="bamawl-select" custom>
                        <option key="" value="">---{t('Select Approver')}---</option>
                        {props.approverData.length >0 &&
                            props.approverData.map(i => {
                                return( <option key={i.id} value={i.id}>{ i.name }</option>
                                )
                            })
                        }
                        
                    </CSelect>
                </CCol>
                <CCol lg="2">
                    <CButton className="form-btn" onClick={props.searchApprover} disabled={props.disableApprover} >{t('Search')}</CButton>
                </CCol>
            </CRow><br/>
        </>}
    </>
    );
}
export default ApproverSearch;