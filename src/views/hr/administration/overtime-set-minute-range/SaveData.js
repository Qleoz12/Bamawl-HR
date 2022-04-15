import React from 'react';
import {
  CCol,
  CRow,
  CImg,
  CLabel,
  CButton,CSelect, CInput
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
 const SaveData = props => {
    const{t} = useTranslation();
    return (<>
            <CRow className='OT-set-minute-range-row'>
                <CCol lg='2'>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Company Name')}</CLabel>
                </CCol>
                <CCol lg='4'>
                    <CSelect onChange={props.companyNameChange} value={props.companyName} className="bamawl-select" custom>
                        <option key="" value="">{t('---Select Company Name---')}</option>
                        {props.companyNameAPI!= "" &&
                            props.companyNameAPI.map((comp,index)=>{
                            return(
                                <option key={index} value={comp.id}>{comp.name}</option>
                            )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <CRow className='OT-set-minute-range-row'>
                <CCol lg='2'>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Minute From')}</CLabel>
                </CCol>
                <CCol lg='4' className="verticle-line">
                    <CInput type="text" className="bamawl-input" value={props.minuteFrom} onChange={props.minuteFromChange} placeholder={t('Type Minute')} />
                </CCol>
                <CCol lg='2'>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required">{t('Minute To')}</CLabel>
                </CCol>
                <CCol lg='4'>
                    <CInput type="text" className="bamawl-input" value={props.minuteTo} onChange={props.minuteToChange} placeholder={t('Type Minute')} />
                </CCol>
                </CRow>
                <CRow className='OT-set-minute-range-row'>
                <CCol lg='2'>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Rate')}</CLabel>
                </CCol>
                <CCol lg='4'>
                    <CInput type="text" className="bamawl-input" value={props.rate} onChange={props.rateChange} placeholder={t('Type Minute')} />
                </CCol>
            </CRow><br/>
            <CRow alignHorizontal="center">
                <CButton className="form-btn" onClick={props.saveData}>{t('Save')}</CButton> 
            </CRow><br/>
            </>
        );  
}
export default SaveData;