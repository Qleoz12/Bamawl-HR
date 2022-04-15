import React from 'react';
import {CButton,CButtonGroup,CCol,CRow,CImg,CLabel,CFormGroup,CInputRadio,CInput} from '@coreui/react';
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
const SetupRules = props => {
    const{t} = useTranslation();
    return (<>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                <CRow lg="12" style={{marginTop:'10px'}}>
                    <CCol style={{marginLeft:'20px'}}>
                        <label style={{color:'#7A78BC',fontWeight:'bold'}}>{t('Do you want to calculate with last month LEAVE days in salary calculation?')}</label>
                    </CCol>
                    <CCol> 
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id='CalculateLeaveDays'
                                value={props.leavedaySwitch}
                                checked={props.leavedaySwitch.isChecked}
                                onChange={props.leavedayChecked.bind(this)}
                            />
                            <label className="toggle-switch-label" htmlFor='CalculateLeaveDays'>
                                <span className='toggle-switch-inner-2'/>
                                <span className="toggle-switch-switch"/>
                            </label>
                        </div>
                    </CCol>
                </CRow><br></br>
                <CRow lg="12" style={{marginTop:'10px'}}>
                    <CCol style={{marginLeft:'20px'}}>
                        <label style={{color:'#7A78BC',fontWeight:'bold'}}>{t('Do you want to calculate with last month Overtime amount in salary calculation?')}</label>
                    </CCol>
                    <CCol> 
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id='OvertimeAmount'
                                value={props.overtimeamtSwitch}
                                checked={props.overtimeamtSwitch.isChecked}
                                onChange={props.overtimeamtChecked.bind(this)}
                            />
                            <label className="toggle-switch-label" htmlFor='OvertimeAmount'>
                                <span className='toggle-switch-inner-2'/>
                                <span className="toggle-switch-switch"/>
                            </label>
                        </div>
                    </CCol>
                </CRow><br></br>
                <CRow lg="12" style={{marginTop:'10px'}}>
                    <CCol style={{marginLeft:'20px'}}>
                        <label style={{color:'#7A78BC',fontWeight:'bold'}}>{t('Regard as unpaid leave when there is no IN/OUT time as shift assigned dates and Attendence Request or Leave Request are still pending')}</label>
                    </CCol>
                    <CCol>  
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id='UnpaidLeave'
                                value={props.unpaidleaveSwitch}
                                checked={props.unpaidleaveSwitch.isChecked}
                                onChange={props.unpaidleaveChecked.bind(this)} 
                            />
                            <label className="toggle-switch-label" htmlFor='UnpaidLeave'>
                                <span className='toggle-switch-inner-2'/>
                                <span className="toggle-switch-switch"/>
                            </label>
                        </div>
                    </CCol>
                </CRow><br></br>
                <CRow lg="12" style={{marginTop:'10px'}}>
                    <CCol style={{marginLeft:'20px'}}>
                        <CLabel style={{color:'#7A78BC'}}>{t('Do you want to use announcement?')}</CLabel>
                    </CCol>
                    <CCol> 
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                className="toggle-switch-checkbox"
                                id='Announcement'
                                value={props.announcementSwitch}
                                checked={props.announcementSwitch.isChecked}
                                onChange={props.announcementChecked.bind(this)}
                            />
                            <label className="toggle-switch-label" htmlFor='Announcement'>
                                <span className='toggle-switch-inner-2'/>
                                <span className="toggle-switch-switch"/>
                            </label>
                        </div>
                    </CCol>
                </CRow><br></br>
                <CRow lg="12" style={{marginTop:'10px'}}>
                    <CLabel style={{color:'#7A78BC',marginLeft:"35px"}}>{t('Number of rows for each section in Dashboard')}</CLabel>
                    <CInput value={props.maxrowCount} style={{width:"100px",height:"30px",marginLeft:"20px",backgroundColor:"#F0F3FD"}} disabled/>
                    <CImg src={'/avatars/increase.png'} className="" alt="plusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'10px'}} onClick={props.plusRows} />
                    <CImg src={'/avatars/decrease.png'} className="" alt="minusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'5px'}} onClick={props.minusRows} />
                </CRow><br></br>
            </div>
            <br></br>
            </>
        );  
}
export default SetupRules;