import React from 'react';
import {CCol,CRow,CImg,CLabel,CFormGroup} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';
import Method from '../../hr-common/method/Method';
/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SalaryCalculateDayRange = props => {
    const{t} = useTranslation();
    return (<>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    {props.dayShow == false && <CImg src={'/avatars/caret-right.png'} className="" alt="titleicon" style={{width:'25px',height:'20px',opacity:'0.5'}} onClick={() => props.setDayShow(!props.dayShow)}/> }
                    {props.dayShow == true && <CImg src={'/avatars/caret-down.png'} className="" alt="titleicon" style={{width:'20px',height:'25px',opacity:'0.5'}} onClick={() => props.setDayShow(!props.dayShow)}/> }
                    <CLabel className="required">{t('Salary Calculate Day Range(Days)')}</CLabel>
                </CCol>     
            </CRow> 
            {props.dayShow == true && 
            <div>
                <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                    <CRow lg="12" style={{margin:'8px 0px 8px 35px'}}>
                        <Method label1={props.firstlastDay} label2={props.manualDay} checked={props.dayrangeSwitch}
                         change={props.dayrangeChecked} value={props.dayrangeSwitch} method={props.forFirstLast}
                        />
                    </CRow> 
                    {props.showCalendar == true && 
                        <CRow lg="12">
                            <CCol lg="2"></CCol>
                            <CFormGroup row style={{margin:"0px 50px 10px",backgroundColor:'#FFFFFF',border:'1px solid #E6E6E6',borderRadius:"15px"}}>
                                <CFormGroup style={{margin:"10px 20px",width:"60px"}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                        <CIcon name="cil-calendar" style={{marginLeft:"25px",color:'#7A78BC',width:"15px",height:"15px"}}/>
                                        <br/><CLabel style={{marginLeft:"20px"}}>{t('From')}</CLabel>
                                        <DatePicker
                                            id="date-picker-dialog" placeholder={t("Date")} format="dd"
                                            value={props.selectedFromDate} key={props.selectedFromDate} onChange={props.handleFromDateChange}
                                            cancelLabel={false} okLabel={false} autoOk={true} clearable={true} InputProps={{ readOnly: true }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </CFormGroup><br/>
                                <CFormGroup style={{margin:"10px 0px",borderRight:"1px solid #E3E5F1"}}/>
                                <CFormGroup style={{margin:"10px 20px",width:"60px"}}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <CIcon name="cil-calendar" style={{marginLeft:"25px",color:'#7A78BC',width:"15px",height:"15px"}}/>
                                        <br/><CLabel style={{marginLeft:"25px"}}>{t('To')}</CLabel>
                                        <DatePicker
                                            id="date-picker-dialog" placeholder={t("Date")} format="dd"
                                            value={props.selectedToDate} key={props.selectedToDate} onChange={props.handleToDateChange}
                                            cancelLabel={false} okLabel={false} autoOk={true} clearable={true} InputProps={{ readOnly: true }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </CFormGroup><br/>
                            </CFormGroup>
                        </CRow>
                    }
                </div> 
                <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                    <CRow lg="12" style={{margin:"25px 0px 0px"}}>
                        <CCol lg="2">
                            <CLabel>{t('Bank Payment Date')}</CLabel>
                        </CCol>
                        <CCol lg="2">
                            <CFormGroup style={{width:"100px"}}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        id="date-picker-dialog" placeholder={t("Date")} format="dd"
                                        value={props.payDate} key={props.payDate} onChange={props.payDateChange}
                                        cancelLabel={false} okLabel={false} autoOk={true} clearable={true} InputProps={{ readOnly: true }}
                                    />
                                </MuiPickersUtilsProvider>
                            </CFormGroup>
                        </CCol>
                        <CCol lg="1"></CCol>
                        <CCol lg="3">
                            <CLabel className="required">{t('Creation of Basic Salary')}</CLabel>
                        </CCol>
                        <CCol style={{marginLeft:"15px"}}>
                            <Method label1={props.experience} label2={props.manual} checked={props.basicsalarySwitch} change={props.basicsalaryChecked} value={props.basicsalarySwitch} method={props.forBasicSalary} />
                        </CCol>
                    </CRow>
                </div> 
            </div>
            }<br></br>
            </>
        );  
}
export default SalaryCalculateDayRange;