/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CFormGroup, CButton,CInputRadio, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Method from '../../hr-common/method/Method';

/**
 * @author Zin Min Myat
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const YearlyBonusRegistrationMethod=props=> {
    const{t} = useTranslation();
    return (<>
        {
        props.mainTable != ""  &&
            <>
        <CCol lg="3" className="mt-5">
            <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
            <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Method')}</CLabel>
        </CCol>  
        
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-3'>
                    <CRow>
                            <CCol lg="2" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}>
                                <CLabel style={{marginTop: "5px",marginLeft: "10px"}} htmlFor="total_salary" onChange={props.totalFun} >{t('Total Salary')}</CLabel>
                                <CInputRadio id="total_salary" name="method" style={{right: "10px", marginTop: "8px"}} checked={props.methodMode == 1} onChange={props.totalFun} />
                            </CCol>
                            <CCol lg="3" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}> 
                                <CRow>
                                    <CInput type="text" style={{width: "50px",marginLeft: "25px"}} onChange={props.totalTextChange} value={props.totalText}/>
                                    <CLabel style={{marginTop: "5px", marginLeft: "20px"}} htmlFor="percent_of_total_salary" onChange={props.perTotalFun} >{t('% of Total Salary')}</CLabel>
                                    <CInputRadio id="percent_of_total_salary" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.perTotalFun} checked={props.methodMode == 3}  />
                                </CRow>
                                
                            </CCol>
                            <CCol lg="4" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}> 
                                <CLabel style={{marginTop: "5px",marginLeft: "10px"}} htmlFor="total_salary_working_month" onChange={props.totalWorking}>{t('Total Salary * Working Month / 12')}</CLabel>
                                <CInputRadio id="total_salary_working_month" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.totalWorking} checked={props.methodMode == 5}/>
                            </CCol>
                        
                    </CRow>
                    <CRow className="mt-2"> 
                            <CCol lg="2" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}>
                                <CLabel style={{marginTop: "5px",marginLeft: "10px"}} htmlFor="basic_salary" onChange={props.basicFun}>{t('Basic Salary')}</CLabel>
                                <CInputRadio id="basic_salary" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.basicFun} checked={props.methodMode == 2}/>
                            </CCol>
                            <CCol lg="3" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}> 
                                <CRow>
                                    <CInput type="text" style={{width: "50px",marginLeft: "25px"}} onChange={props.basicTextChange} value={props.basicText}/>
                                    <CLabel style={{marginTop: "5px", marginLeft: "20px"}} htmlFor="percent_of_basic_salary" onChange={props.perBasicFun}>{t('% of Basic Salary')}</CLabel>
                                    <CInputRadio id="percent_of_basic_salary" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.perBasicFun} checked={props.methodMode == 4}/>
                                </CRow>
                                
                            </CCol>
                            <CCol lg="4" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}> 
                                <CLabel style={{marginTop: "5px",marginLeft: "10px"}} htmlFor="basic_salary_working_month" onChange={props.basicWoking}>{t('Basic Salary * Working Month / 12')}</CLabel>
                                <CInputRadio id="basic_salary_working_month" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.basicWoking} checked={props.methodMode == 6}/>
                            </CCol>
                        
                    </CRow>
                    <CRow className="mt-2"> 
                            <CCol lg="4" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}>
                                <CRow>
                                    <CInput type="text" style={{width: "120px",marginLeft: "25px"}} onChange={props.fixedTextChange} value={props.fixedText}/>
                                    <CLabel className="required" style={{marginTop: "5px", marginLeft: "20px"}} htmlFor="fixed_amount" onChange={props.fixedAmount}>{t('Fixed Amount')}</CLabel>
                                    <CInputRadio id="fixed_amount" name="method" style={{right: "10px", marginTop: "8px"}} onChange={props.fixedAmount} checked={props.methodMode == 7}/>
                                </CRow>
                               
                            </CCol>
                            <CCol lg="2" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}> 
                                <CRow>
                                    <CLabel className="required" style={{marginTop: "5px", marginLeft: "25px"}} htmlFor="uesr_defined" onChange={props.userDefined}>{t('User Defined')}</CLabel>
                                    <CInputRadio id="uesr_defined" name="method" checked={props.methodMode == 8} style={{right: "10px", marginTop: "8px"}} onChange={props.userDefined}/>
                                </CRow>
                            </CCol>
                    </CRow>
                    {props.methodMode > 6 && props.currencyData != ""  &&
                        <CRow className="mt-2"> 
                            <CCol lg={props.currencyData.length+1} style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px', marginLeft: "20px",marginRight: "20px",paddingBottom: "10px",paddingTop: "10px",paddingLeft: "0px", marginTop: "10px"}}>
                                <CRow>
                                    {
                                        props.currencyData.map((i,index) => {
                                        return(
                                                <div  style={{marginTop: "5px", marginLeft: "30px"}} key={index}>
                                                    <CLabel htmlFor={i.currency_desc} onChange={props.currencyChange}>{i.currency_desc}</CLabel>
                                                    <CInputRadio id={i.currency_desc} name="currency" style={{ marginTop: "4px", marginLeft: "10px"}} value={i.id} onChange={props.currencyChange} checked={props.currency == i.id}  />
                                                    <span style={{marginLeft: "2em"}}></span>
                                                </div>
                                            
                                            )
                                        })
                                    }  
                                </CRow> 
                            </CCol>
                        </CRow>
                    }
                    
                </CCard>
                
            </div>
            </>
        }
    </>
    );
}
export default YearlyBonusRegistrationMethod;
