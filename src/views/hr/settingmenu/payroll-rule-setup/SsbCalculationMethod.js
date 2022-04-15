import React from 'react';
import {CButton,CButtonGroup,CCol,CRow,CImg,CLabel,CFormText,CInput,CInputRadio} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Currency from '../../hr-common/currency/Currency';
import Method from '../../hr-common/method/Method';
/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SsbCalculationMethod = props => {
    const{t} = useTranslation();
    return (<>
            <CRow lg="12">
                <CCol lg="9">
                    <CImg src={'/avatars/list.png'} alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    {props.ssbShow == false && props.ssbpayShow == false &&
                        <CImg src={'/avatars/caret-right.png'} alt="caret-right" style={{width:'25px',height:'20px',opacity:'0.5'}} />
                    }
                    {props.ssbShow == true && props.ssbpayShow == true && 
                        <CImg src={'/avatars/caret-down.png'} alt="caret-down" style={{width:'20px',height:'25px',opacity:'0.5'}} /> 
                    }
                    {props.ssbShow == true && props.ssbpayShow == false &&
                        <CImg src={'/avatars/caret-right.png'} alt="caret-right" style={{width:'25px',height:'20px',opacity:'0.5'}} />
                    }
                    {props.ssbShow == false && props.ssbpayShow == true &&  
                        <CImg src={'/avatars/caret-right.png'} alt="caret-down" style={{width:'20px',height:'25px',opacity:'0.5'}} />
                    }
                    <CLabel style={{fontWeight:'bold'}} className="required">{t('SSB Calculation Method')}</CLabel>
                </CCol> 
                <CCol style={{margin:'0px 15px 10px 105px'}}> 
                    <div>
                        <label style={{marginRight:'10px'}}>{t('Paid')}</label>
                        <div className="toggle-switch">
                            <input type="checkbox" className="toggle-switch-checkbox" id='SSBPaidOrNot' checked={props.ssbpaidSwitch.isChecked} onChange={props.ssbpaidChecked.bind(this)} />
                            <label className="toggle-switch-label" htmlFor='SSBPaidOrNot' style={{margin:"0px 0px 4px"}} >
                                <span className='toggle-switch-inner-3'/>
                                <span className="toggle-switch-switch"/>
                            </label>
                        </div>
                    </div>
                </CCol>
            </CRow> 
            <CRow lg="12">
                <CCol lg="9"></CCol> 
                <CCol>
                    <CButtonGroup style={{margin:'0px 0px 10px 25px',background:"#FFFFFF",border:"1px solid #E8E8E8",borderRadius:"7px"}}>
                        <CButton value="1" className="ssbbtn ssball" checked={props.ssbPay == "1"} onClick={props.ssbPayAllChange} >{t('All')}</CButton>
                        <CButton value="2" className="ssbbtn ssbchoose" checked={props.ssbPay == "2"} onClick={props.ssbPayChooseChange} >{t('Choose Employee')}</CButton>
                    </CButtonGroup>
                </CCol>   
            </CRow> 
            {props.ssbShow == true && props.ssbpayShow == true &&
                <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px',marginTop:"5px"}}>
                    <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                        <CCol lg="3">
                            <CLabel style={{color:'#7A78BC'}}>{t('SSB Paid')}</CLabel>
                        </CCol>
                    </CRow>  
                    {props.ssbBased == 3 &&  
                        <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                            <CCol lg="3">
                                <CImg src={'/avatars/Payment Type.png'} alt="payment" style={{width:'17px',height:'15px',marginRight:"5px"}} />
                                <CLabel>{t('Currency')}</CLabel>
                            </CCol>
                            {props.currencySsb != "" && 
                                props.currencySsb.map((ssbpay,index)=>{ 
                                    let forSSB = "ssb"+ssbpay.id;
                                    return(
                                        <CRow lg="12">
                                            <CCol lg="1">
                                                <CInputRadio key={index} id={forSSB} value={ssbpay.id} checked={props.ssbpayType == ssbpay.id} onChange={props.ssbpayTypeChange} style={{marginLeft:'15px',marginTop: "8px"}}/>
                                                <CLabel style={{marginLeft:'38px',marginTop: "5px"}} htmlFor={forSSB} >{ssbpay.currency_desc}</CLabel>
                                            </CCol>
                                        </CRow>
                                    ) 
                                })
                            }
                        </CRow>
                    }
                    <hr/>
                    <div>
                        <CRow lg="12">
                            <CCol lg="5"></CCol>
                            <CCol><CLabel style={{fontWeight:"bold",marginLeft:"20px"}}>{t('SSB Based On')}</CLabel></CCol>  
                        </CRow>
                        <CRow lg="12" style={{marginBottom:"10px"}}>
                            <CCol style={{textAlign:"center"}}>
                                <CButtonGroup style={{background:"#FFFFFF",border:"1px solid #E8E8E8",borderRadius:"5px"}}>
                                    <CButton value="2" className="ssbbasic" checked={props.ssbBased == "2"} onClick={props.ssbBasicChange} >{t('Basic Salary')}</CButton>
                                    <CButton value="1" className="ssbtotal" checked={props.ssbBased == "1"} onClick={props.ssbTotalChange} >{t('Total Income')}</CButton>
                                    <CButton value="3" className="ssbfixed" checked={props.ssbBased == "3"} onClick={props.ssbFixedChange} >{t('Fixed Amount')}</CButton>
                                </CButtonGroup>
                            </CCol>
                        </CRow>
                        {props.showFixedamt == true && 
                            <CRow lg="12" style={{marginTop:"15px",marginLeft:"50px"}}>
                                <CCol lg="4"></CCol>
                                <CLabel>{t('SSB Paid Fixed Amount')}:</CLabel>
                                <CCol style={{textAlign:"center"}}>
                                    <CInput type="text" value={props.fixedAmount} onChange={props.fixedAmountValue} style={{position:"absolute",height:"28px",width:"100px"}} />
                                </CCol>
                            </CRow>
                        }
                        <CRow lg="12" style={{marginTop:"10px"}}>
                            <CCol style={{textAlign:"center"}}>
                                <CFormText><span style={{color:"red"}}>{t('***SSB Based On Calculate Over Total Income(maximum 300000MMK)***')}</span></CFormText>
                            </CCol>
                        </CRow><hr/>
                        <CRow lg="12" style={{marginTop:"10px"}}>
                            <CCol lg="5"></CCol>
                            <CCol>
                                <CLabel style={{fontWeight:"bold",marginLeft:"20px"}}>{t('SSB Paid Method')}</CLabel>
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{margin:'8px 0px'}}>
                            <CCol lg="3"></CCol>
                            <CCol>
                                <Method label1={props.ssbM1} label2={props.ssbM2} checked={props.ssbpaidmethodSwitch} change={props.ssbpaidmethodChecked} value={props.ssbpaidmethodSwitch} method={props.forSsbPaid} />
                            </CCol>
                        </CRow>
                    </div>
                </div>
            }<br></br>
            </>
        );  
}
export default SsbCalculationMethod;