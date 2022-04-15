import React from 'react';
import {
  CCol,
  CRow,
  CImg,
  CLabel,
  CButton,CSelect, CInput,CInputRadio
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

/**
 * @author Su Pyae Maung
 * @create 18/06/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SearchData = props => {
    const{t} = useTranslation();
    return (<>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Payment Transfer Method')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                {props.bankAPI != "" && 
                    props.bankAPI.map((bank,index)=>{ 
                    let pay_method = "method"+bank.id;
                        return(<>
                        <CCol lg='2' className="bank_errlist_inner">
                            <CLabel htmlFor={pay_method} >{bank.bank_name}</CLabel>
                            <CInputRadio className="bank_errlist_radio"
                                key={index}
                                id={pay_method}
                                // value={bank.id}
                                checked={props.bankID == bank.id}
                                onChange={()=>props.bankChange(bank.id,bank.bank_name)}
                            ></CInputRadio>
                        </CCol>
                        </>) 
                    })
                }
            </CRow>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Currency')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                {props.currencyAPI != "" && 
                    props.currencyAPI.map((cur,index)=>{ 
                    let currency = "cur"+cur.id;
                        return(<>
                        <CCol lg='1' className="bank_errlist_inner">
                            <CLabel htmlFor={currency}>{cur.currency_desc}</CLabel>
                            <CInputRadio className="bank_errlist_radio"
                                key={index}
                                id={currency}
                                // value={cur.id}
                                checked={props.currency == cur.id}
                                onChange={()=>props.currencyChange(cur.id, cur.currency_name, cur.currency_desc)}
                            ></CInputRadio>
                        </CCol>
                        </>) 
                    })
                }
            </CRow><br/>
            <CRow alignHorizontal="center">
                <CButton className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton> 
            </CRow>
            {props.noData != ""  && <>
                <CRow lg="12" style={{margin:"10px 0px"}}>
                    <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
                </CRow><br/>
            </>}
            </>
        );  
}
export default SearchData;