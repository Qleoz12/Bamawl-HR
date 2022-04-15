import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CSelect, CButton, CTextarea } from '@coreui/react';
import Currency from '../../hr-common/currency/Currency';
import Method from '../../hr-common/method/Method';
import HeaderSetting from './HeaderSetting';
import Table from './PaymentNameTable';

const FormData = props => {

    const {t} = useTranslation();
    const [prority_array, setPriorityArray] = useState(['',1,2,3,4,5,6,7,8,9,10]);

    return(<>
        <CCard>
            <CCardHeader><h5>{t('Payment Name Register')}</h5></CCardHeader>
            <CCardBody>
                <CForm>
                    { /* Payment Bank Name */ }
                    <CRow lg="12" className="">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel className="required middle ml-2">{t('Payment/Bank Name')}</CLabel>
                        </CCol>
                        <CCol lg="3" className="ml-2">
                            <CInput className="bamawl-input" type="text" value={props.paybankName} onChange={props.changePayBankName} />
                        </CCol>
                    </CRow>

                    { /* Currency */ }
                    <CRow lg="12" className="mt-4 mb-4">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel className="required mt-2 ml-2">{t('Currency')}</CLabel>
                        </CCol>
                        <CCol lg="9">
                            <div className="ml-2 mt-3">
                                <Currency data={props.currencyData} change={props.changeCurrency} for={props.currencyFor} />
                            </div>
                        </CCol>
                    </CRow>

                    { /* Contact */ }
                    <CRow lg="12" className="mb-2">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Contact')}</CLabel>
                        </CCol>
                    </CRow>
                    <div className="mb-5" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px',marginBottom:'10px'}}>
                        <CRow lg="12" style={{margin:"25px 20px 15px 20px"}}>
                            <CCol lg="2" className="middle">
                                <CLabel>{t('Address')}</CLabel>
                            </CCol>
                            <CCol lg="3" className="mb-2">
                                <CTextarea rows="1" className="bamawl-input" value={props.address} onChange={props.changeAddress} />
                            </CCol>
                            <CCol lg="1" style={{borderRight:"1px solid #E3E5F1"}}></CCol>
                            <CCol lg="2" className="middle">
                                <CLabel>{t('Phone')}</CLabel>
                            </CCol>
                            <CCol lg="3" className="mb-2">
                                <CInput type="text" className="bamawl-input" value={props.phone} onChange={props.changePhone} />
                            </CCol>
                        </CRow>
                    </div>

                    { /* Priority */ }
                    <CRow lg="12" className="mb-5">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel className="required middle ml-2">{t('Priority')}</CLabel>
                        </CCol>
                        <CCol lg="3" className="ml-2">
                            <CSelect className="bamawl-select" custom value={props.priority} onChange={props.changePriority}>
                                {
                                    prority_array.map( i => {
                                        return( <option key={ i } value={ i }> { i } </option> )
                                    } )
                                }
                            </CSelect>
                        </CCol>
                    </CRow>

                    { /* Transfer method */ }
                    <CRow className="mb-4">
                        <CCol lg="3">
                            <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                            <CLabel className='required ml-2'>{t('Transfer Method')}</CLabel>
                        </CCol>
                        <CCol lg="9">
                            <div className="ml-4">
                                <Method label1={props.label1} label2={props.label2} checked={props.methodCheck} change={props.changeMethod} value={props.transferMethod} method={props.method} />
                            </div>
                        </CCol>
                    </CRow>

                    { /* System Direct Header Setting */ }
                    <HeaderSetting label={props.directLabel} value={props.directTextbox} data={props.systemDirect} change={props.changeDirectTextbox} add={props.clickDirectTextbox} remove={props.directDeleteChanged} />

                    { /* Manual Download Header Setting */ }
                    <HeaderSetting label={props.manualLabel} value={props.downloadTextbox} data={props.manualDownload} change={props.changeDownloadTextbox} add={props.addManualDownload} remove={props.downloadDeleteChanged} />

                    <CRow alignHorizontal="center" className="mt-5 mb-4">
                        <CButton className="form-btn" onClick={props.saveData}>Save</CButton>
                    </CRow>

                    <Table data={props.mainTable} rowCount={props.rowCount} allChecked={props.allChecked} checkboxChanged={props.checkboxChanged} edit={props.editData} delete={props.deleteData}/>

                </CForm>
            </CCardBody>
        </CCard>
    </>)
}

export default FormData
