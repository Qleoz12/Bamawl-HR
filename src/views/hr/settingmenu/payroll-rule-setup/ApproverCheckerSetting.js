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
const ApproverCheckerSetting = props => {
    const{t} = useTranslation();
    return (<>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'20px',marginRight:'10px',marginBottom:'10px'}}>
                <CRow lg="12" style={{marginTop:'5px',marginBottom:'5px'}}>
                    <CCol>
                        <CLabel style={{color:'#7A78BC',marginLeft:'20px',fontWeight:'bold'}}>{t('Approver Setting')}</CLabel>
                    </CCol>
                </CRow> 
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                    <CInputRadio value="1" name="approverSetting" checked={props.approverSetting == "1"} onChange={props.approverSettingChange} style={{marginLeft:'20px'}} onClick={() => props.setShowAppChk(false)} /><span style={{marginLeft:'38px'}}>{t('Able to choose upper position')}</span>
                </CRow>
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                    <CInputRadio value="2" name="approverSetting" checked={props.approverSetting == "2" } onChange={props.approverSettingChange} style={{marginLeft:'20px'}} onClick={() => props.setShowAppChk(true)} /><span style={{marginLeft:'38px'}}>{t('Approver and Checker')}</span>
                </CRow>
                {props.showAppChk == true && 
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                    <CLabel style={{marginLeft:"40px"}} className="required">{t('Maximum Approver')}</CLabel>
                    <CInput value={props.maxApprover} style={{width:"100px",height:"30px",marginLeft:"20px",backgroundColor:"#F0F3FD"}} disabled/>
                    <CImg src={'/avatars/increase.png'} className="" alt="plusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'10px'}} onClick={props.plusApprover} />
                    <CImg src={'/avatars/decrease.png'} className="" alt="minusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'5px'}} onClick={props.minusApprover} />

                    <CLabel style={{marginLeft:"40px"}} className="required">Maximum<br></br> Acknowledged By</CLabel>
                    <CInput value={props.maxChecker} style={{width:"100px",height:"30px",marginLeft:"30px",backgroundColor:"#F0F3FD"}} disabled/>
                    <CImg src={'/avatars/increase.png'} className="" alt="plusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'10px'}} onClick={props.plusChecker} />
                    <CImg src={'/avatars/decrease.png'} className="" alt="minusicon" style={{width:'15px',height:'15px',marginTop:"7px",marginLeft:'5px'}} onClick={props.minusChecker} />
                </CRow>
                }
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                    <CInputRadio value="3" name="approverSetting" checked={props.approverSetting == "3"} onChange={props.approverSettingChange} style={{marginLeft:'20px'}} onClick={() => props.setShowAppChk(false)} /><span style={{marginLeft:'38px'}}>{t('Auto Request')}</span>
                </CRow>
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'5px'}}>
                    <CInputRadio value="4" name="approverSetting" checked={props.approverSetting == "4"} onChange={props.approverSettingChange} style={{marginLeft:'20px'}} onClick={() => props.setShowAppChk(false)} /><span style={{marginLeft:'38px'}}>{t('Default Approver and choose more approver')}</span>
                </CRow>
                <CRow lg="12" style={{marginLeft:'5px',marginBottom:'10px'}}>
                    <CInputRadio value="5" name="approverSetting" checked={props.approverSetting == "5"} onChange={props.approverSettingChange} style={{marginLeft:'20px'}} onClick={() => props.setShowAppChk(false)} /><span style={{marginLeft:'38px'}}>{t('Default department and choose more approver')}</span>
                </CRow>
            </div><br/>
            </>
        );  
}
export default ApproverCheckerSetting;