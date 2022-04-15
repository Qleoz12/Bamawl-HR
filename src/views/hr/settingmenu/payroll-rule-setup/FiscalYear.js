import React from 'react';
import {CButton,CButtonGroup,CCol,CRow,CImg,CLabel,CFormGroup,CInputRadio,CInputCheckbox} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';
import Currency from '../../hr-common/currency/Currency';

/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const FiscalYear = props => {
    const{t} = useTranslation();
    return (<>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px',marginLeft:"10px"}}>
                    <CCol>
                        <CLabel style={{color:'#7A78BC'}}>{t('Fiscal Year')}</CLabel>
                    </CCol>
                </CRow> 
                <CRow lg="12">
                    <CFormGroup row style={{margin:"0px 20px 10px"}}>
                        <CFormGroup style={{margin:"10px 20px",width:"150px"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                <CImg src={'/avatars/month.png'} style={{margin:'0px 10px 5px 0px',width:"15px",height:"15px"}} alt="start month" />
                                <CLabel style={{margin:"5px 0px"}}>{t('Start Month')}</CLabel>
                                <Grid container>
                                    <DatePicker
                                        openTo="month"
                                        views={["month"]}
                                        id="date-picker-dialog"
                                        placeholder={t("Start Month")}
                                        format="MMM"
                                        value={props.startMonth}
                                        key={props.startMonth}
                                        onChange={props.startMonthChange}
                                        cancelLabel={false}
                                        okLabel={false}
                                        autoOk={true}
                                        clearable={true}
                                        InputProps={{ readOnly: true }}
                                    />
                                    {/* <CImg src={'../image/cross.png'} style={{position:"absolute",margin:"8px 0px 0px 120px"}} className="date-icon" alt="cross" onClick={props.removeStartMonth} /> */}
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </CFormGroup>
                        <br/>
                        <CFormGroup style={{margin:"10px 0px",borderRight:"1px solid #E3E5F1"}}/>
                        <CFormGroup style={{margin:"10px 20px",width:"150px"}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CImg src={'/avatars/end month.png'} style={{margin:'0px 10px 5px 0px',width:"15px",height:"15px"}} alt="end month" />
                                <CLabel style={{margin:"5px 0px"}}>{t('End Month')}</CLabel>
                                <Grid container >
                                    <DatePicker
                                        openTo="month"
                                        views={["month"]}
                                        id="date-picker-dialog"
                                        placeholder={t("End Month")}
                                        format="MMM"
                                        value={props.endMonth}
                                        key={props.endMonth}
                                        onChange={props.endMonthChange}
                                        cancelLabel={false}
                                        okLabel={false}
                                        autoOk={true}
                                        clearable={true}
                                        InputProps={{ readOnly: true }}
                                    />
                                    {/* <CImg src={'../image/cross.png'} style={{position:"absolute",margin:"8px 0px 0px 120px"}} className="date-icon" alt="cross" onClick={props.removeEndMonth} /> */}
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </CFormGroup>
                        <br/>
                    </CFormGroup>
                </CRow><br/>
                <CRow lg="12" style={{margin:"10px 0px 0px 10px"}}>
                    <CCol lg="3">
                        <CImg src={'/avatars/to.png'} style={{margin:"0px 10px 5px 0px",width:"15px",height:"15px"}} alt="leave rule" />
                        <CLabel style={{color:'#7A78BC', margin:"0px 0px 15px 0px"}}>{t('Leave Rule')}</CLabel>
                    </CCol>
                    <CCol lg="2"> 
                        <CLabel id='salary_defined'>{t('System Defined')}</CLabel>
                    </CCol>
                    <CCol lg="1"> 
                        <div className='shift-name-divC'>
                            <div className="toggle-switch">
                                <input
                                    type="checkbox"
                                    className="toggle-switch-checkbox"
                                    id='LeaveRules'
                                    value={props.leaveruleSwitch}
                                    checked={props.leaveruleSwitch.isChecked}
                                    onChange={props.leaveruleChecked.bind(this)} 
                                />
                                <label className="toggle-switch-label" htmlFor='LeaveRules'>
                                    <span className='toggle-switch-inner-1'/>
                                    <span className="toggle-switch-switch"/>
                                </label>
                            </div>
                        </div>
                    </CCol>
                    <CCol lg="2">
                        <CLabel id='salary_defined'>{t('User Defined')}</CLabel>
                    </CCol>
                </CRow><br/>
                <CRow lg="12" style={{marginTop:'10px',marginLeft:"10px"}}>
                    <CCol lg="3">
                        <CImg src={'/avatars/dollar.png'} style={{margin:'0px 10px 5px 0px',width:"15px",height:"15px"}} alt="dollar" />
                        <CLabel style={{color:'#7A78BC',margin:'0px 0px 15px 0px'}}>{t('Choose Bank')}</CLabel>
                    </CCol>
                    {props.chooseBank != "" && 
                        props.chooseBank.map((bank,index)=>{ 
                            return(
                                <CCol lg="2">
                                    <span >{bank.bank_name}</span>
                                    <CInputCheckbox key={index} value={bank.id} id={"bank"+ bank.id} checked={bank.is_checked == true} onChange={props.selectBankChange} style={{marginLeft:'5px'}}/>
                                </CCol>
                            ) 
                        })
                    }
                </CRow><br/>
            </div>
            <br></br>
            </>
        );  
}
export default FiscalYear;