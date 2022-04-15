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
const PayrollCalculationMethod=props=> {
    const{t} = useTranslation();
    return (<>
            <CRow className="" lg="12">
                <CCol lg="9">
                    <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    {props.payrollShow == false && <CImg src={'/avatars/caret-right.png'} alt="caret-right" style={{width:'25px',height:'20px',opacity:'0.5'}} /> }
                    {props.payrollShow == true && <CImg src={'/avatars/caret-down.png'} alt="caret-down" style={{width:'20px',height:'25px',opacity:'0.5'}} /> }
                    <CLabel className="required">{t('Payroll Caculation Method')}</CLabel>
                </CCol> 
                <CCol>
                    <CButtonGroup style={{margin:'0px 0px 10px 25px',background:"#FFFFFF",border:"1px solid #E8E8E8",borderRadius:"7px"}}>
                        <CButton value="1" className="payrollbtn payall" checked={props.payRoll == "1"} onClick={props.payRollAllChange}  >{t('All')}</CButton>
                        <CButton value="2" className="payrollbtn paychoose" checked={props.payRoll == "2"} onClick={props.payRollChooseChange}  >{t('Choose Employee')}</CButton>
                    </CButtonGroup>
                </CCol>   
                </CRow> 
                    {props.payrollShow == true && 
                    <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                        <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                            <CCol lg="3">
                                <CLabel style={{color:'#7A78BC'}}>{t('Setup Payroll Method')}</CLabel>
                            </CCol>
                        </CRow>
                        <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                            <CCol lg="2">
                                <CImg src={'/avatars/Payment Type.png'} alt="payment" style={{width:'17px',height:'15px',marginRight:"5px"}} />
                                <CLabel>{t('Currency')}</CLabel>
                            </CCol>
                            <CCol lg="10">
                                <div className="">
                                    <Currency data={props.currencyData} checked={props.is_checked == true } change={props.payrollTypeChange} for={props.forPayroll} />
                                </div>
                            </CCol>
                        </CRow>
                        <hr/>
                        {props.payrollCalMethod != "" && 
                            props.payrollCalMethod.map((paycal,index)=>{ 
                                let payroll_cal = "paycal"+paycal.id;
                                return(
                                    <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                                        <CInputRadio key={index} id={payroll_cal} value={paycal.id} checked={props.payrollMethod == paycal.id} onChange={props.payrollMethodChange} style={{marginLeft:'20px',marginTop: "8px"}}/>
                                        <CLabel style={{marginLeft:'38px',marginTop: "5px"}} htmlFor={payroll_cal} >{paycal.description}</CLabel>
                                        {paycal.id == 2 && 
                                            <CCol>
                                                <CInput type="text" value={props.payrollTextboxOne} onChange={props.textboxOneValue} style={{position:"absolute",height:"28px",width:"20%"}} />
                                            </CCol>
                                        }
                                        {paycal.id == 8 && 
                                            <CCol>
                                                <CInput type="text" value={props.payrollTextboxTwo} onChange={props.textboxTwoValue} style={{position:"absolute",height:"28px",width:"20%"}} />
                                            </CCol>
                                        }
                                    </CRow>
                                ) 
                            })
                        }<br></br>
                    </div>
                }<br></br>
            </>
        );  
}
export default PayrollCalculationMethod;