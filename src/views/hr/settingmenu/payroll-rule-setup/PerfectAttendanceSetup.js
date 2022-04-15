import React from 'react';
import {CButton,CButtonGroup,CCol,CRow,CImg,CLabel,CInputRadio,CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Currency from '../../hr-common/currency/Currency';
/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const PerfectAttendanceSetup = props => {
    const{t} = useTranslation();
    return (<>
            <CRow lg="12">
                <CCol lg="9">
                    <CImg src={'/avatars/list.png'} alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    {props.perfectShow == false && props.perfectPayShow == false &&
                        <CImg src={'/avatars/caret-right.png'} alt="caret-down" style={{width:'25px',height:'20px',opacity:'0.5'}} />
                    }
                    {props.perfectShow == true && props.perfectPayShow == true &&
                        <CImg src={'/avatars/caret-down.png'} alt="caret-down" style={{width:'20px',height:'25px',opacity:'0.5'}} />
                    }
                    {props.perfectShow == true && props.perfectPayShow == false &&
                        <CImg src={'/avatars/caret-right.png'} alt="caret-right" style={{width:'25px',height:'20px',opacity:'0.5'}} />
                    }
                    {props.perfectShow == false && props.perfectPayShow == true &&
                        <CImg src={'/avatars/caret-right.png'} alt="caret-down" style={{width:'20px',height:'25px',opacity:'0.5'}} />
                    }
                    <CLabel className="required">{t('Perfect Attendance Setup')}</CLabel>
                </CCol> 
                <CCol style={{margin:'0px 15px 10px 105px'}}> 
                    <div>
                        <label style={{marginRight:'10px'}}>{t('Paid')}</label>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id='PerfectAttPaidOrNot'
                                value={props.perfectpaidSwitch}
                                checked={props.perfectpaidSwitch.isChecked}
                                onChange={props.perfectpaidChecked.bind(this)}
                            />
                            <label className="toggle-switch-label" htmlFor='PerfectAttPaidOrNot' style={{margin:"0px 0px 4px"}}>
                                <span className='toggle-switch-inner-2'/>
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
                        <CButton value="1" className="perfectbtn perfectall" onClick={props.perfectPayAllChange} >{t('All')}</CButton>
                        <CButton value="2" className="perfectbtn perfectchoose" onClick={props.perfectPayChooseChange} >{t('Choose Employee')}</CButton>
                    </CButtonGroup>
                </CCol>   
                </CRow> 
                    {props.perfectShow == true && props.perfectPayShow == true &&
                    <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px',marginTop:"5px"}}>
                        <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                            <CCol lg="3">
                                <CLabel style={{color:'#7A78BC'}}>{t('Perfect Attendance Paid')}</CLabel>
                            </CCol>
                        </CRow> 
                        <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                            <CCol lg="3">
                                <CImg src={'/avatars/Payment Type.png'} alt="payment" style={{width:'17px',height:'15px',marginRight:"5px"}} />
                                <CLabel>{t('Currency')}</CLabel>
                            </CCol>
                            {props.currencyPerfect != "" && 
                                props.currencyPerfect.map((perfect,index)=>{ 
                                    let forPerfect = "per"+perfect.id;
                                    return(
                                        <CRow lg="12">
                                            <CCol lg="1">
                                                <CInputRadio key={index} id={forPerfect} value={perfect.id} checked={props.perfectType == perfect.id} onChange={props.perfectTypeChange} style={{marginLeft:'15px',marginTop: "8px"}}/>
                                                <CLabel style={{marginLeft:'38px',marginTop: "5px"}} htmlFor={forPerfect} >{perfect.currency_desc}</CLabel>
                                            </CCol>
                                        </CRow>
                                    ) 
                                })
                            }
                        </CRow>
                        <hr/> 
                        <CRow lg="12" style={{margin:"15px 0px 10px 50px"}}>
                            <CCol lg="4"></CCol>
                            <CLabel>{t('Perfect Attendance Amount')}:</CLabel>
                            <CCol style={{textAlign:"center"}}>
                                <CInput type="text" value={props.perfectAmount} onChange={props.perfectAmountValue} style={{position:"absolute",height:"28px",width:"100px"}} />
                            </CCol>
                        </CRow>
                        {/* <CRow lg="12" style={{marginTop:"10px",marginBottom:"10px"}}>
                            <CCol style={{textAlign:"center"}}>
                                <CLabel>{t('Perfect Attendance Amount')}:</CLabel>
                                <input type="text" value={props.perfectAmount} onChange={props.perfectAmountValue} style={{marginLeft:"10px",width:"150px",height:"30px",backgroundColor:"#F0F3FD",border:"1px solid #E8E8E8",borderRadius:"5px"}} />
                            </CCol>
                        </CRow> */}
                    </div>
                }<br></br>
            </>
        );  
}
export default PerfectAttendanceSetup;