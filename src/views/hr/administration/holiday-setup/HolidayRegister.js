/* eslint-disable no-use-before-define */
import React from 'react';
import {CCol, CRow, CButton, CFormGroup, CLabel, CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import CIcon from '@coreui/icons-react';
import CommonDatePicker from '../../hr-common/datepicker/DatePicker';

/**
 * @author Aye Thiri Mon
 * @create 28/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const HolidayRegister=props=> {
    const{t} = useTranslation();
    return (<>
        <CRow style={{display: 'flex'}}>
          <CCol lg='6'>
            <CImg src={'/avatars/list.png'} className="titleicon" alt="titleicon" style={{marginLeft:'5px', marginRight: '10px', marginBottom: '5px'}}/>
            <CLabel>{t('Holiday Description')}</CLabel>
            <span className="required"/>
          </CCol>
        </CRow>
        <CRow style={{display: 'flex'}}>
          <CCol lg='6' className="">
            <div className='ml-3'>
              <TextField
                value={props.holidayDescription}
                placeholder={t('Enter Holiday Description')}
                onChange={props.holidayDescriptionChange}
              />
            </div>
          </CCol>
        </CRow>
        <CRow lg="12" className="mt-5">
          <CCol lg='6'  className="" style={{borderRight:"1px solid #E3E5F1"}}>
            <div className='ml-3'>
              <CLabel>{t('From Date')}</CLabel>
              <span className="required"/>
              <CFormGroup>
                <CommonDatePicker value={props.selectedFromDate} change={props.handleFromDateChange} placeholder={t('From Date')}/>
              </CFormGroup>
            </div>
          </CCol>
          <CCol lg='6'  className="">
            <div>
              <CLabel>{t('To Date')}</CLabel>
              <span className="required"/>
              <CFormGroup>
                <CommonDatePicker value={props.selectedToDate} change={props.handleToDateChange} placeholder={t('To Date')}/>
              </CFormGroup>
            </div>
          </CCol>
        </CRow>
        {/* Save/Cancel Buttom Start */}         
        <CRow style={{display: 'flex', marginTop: '15px', marginBottom: '10px'}} className="" lg="12">
          <CCol style={{textAlign:"center"}}>
            <CButton className="form-btn" onClick={props.saveAllData}>Save</CButton>
          </CCol>   
        </CRow>
        {/* Save/Cancel Buttom End */}
    </>
    );
}
export default HolidayRegister;