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
const SelectBonusMethod=props=> {
    const{t} = useTranslation();
    return (<>
        {
        props.mainTable != ""  &&
            <>
        <CCol lg="3" className="mt-5">
            <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
            <CLabel className="required" style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Select Bonus Method')}</CLabel>
        </CCol>  
        
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                    <CRow lg="12" style={{margin:"25px 0px 15px 20px"}}>
                        <CCol lg="3">
                            <CImg src={'/avatars/bonus_salary.png'} alt="titleicon" style={{width:'15px',height:'20px',marginBottom:'2px'}}/>
                            <CLabel className="ml-2">{t('Bonus Salary')}</CLabel>
                        </CCol>
                        <CCol className="ml-2">
                            <Method label1={props.label1} label2={props.label2} checked={props.salaryMode == "0"} change={props.bonusMethodChange} value={props.salaryMode} method="bonus_method" />
                        </CCol>
                    </CRow>
            </div>
            <CRow alignHorizontal="center" className="mt-4">
                <CButton  className="form-btn" onClick={props.saveBtn}>{t('Save')}</CButton>
            </CRow>
            </>
        }
    </>
    );
}
export default SelectBonusMethod;
