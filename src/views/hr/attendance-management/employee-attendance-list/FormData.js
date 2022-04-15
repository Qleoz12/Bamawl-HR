/* eslint-disable no-use-before-define */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CButton, CFormGroup, CLabel, CSelect} from '@coreui/react';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import CommonDatePicker from '../../hr-common/datepicker/DatePicker';

/**
 * @author Aye Thiri Mon
 * @create 01/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
export default FormData=props=> {
    const{t} = useTranslation();
    return (
      <>
        <CRow lg="12" style={{marginBottom:'10px'}}>
          <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
            <CLabel htmlFor="emp_id" className="">{t('Employee ID')}</CLabel>
            <Autocomplete onChange={(i) =>props.changeAutocomplete('id', i)} onSelect={props.selectAutocomplete} items={props.empIDData} name={props.empID} />
          </CCol>
          <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
            <CLabel htmlFor="emp_code">{t('Employee Code')}</CLabel>
            <Autocomplete onChange={(i) =>props.changeAutocomplete('code', i)} onSelect={props.selectAutocomplete} items={props.empCodeData} name={props.empCode} />
          </CCol>
          <CCol lg="4">
            <CLabel htmlFor="emp_name">{t('Employee Name')}</CLabel>
            <Autocomplete onChange={(i) =>props.changeAutocomplete('name', i)} onSelect={props.selectAutocomplete} items={props.empNameData} name={props.empName} />
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol lg='5'>
            <CLabel>{t('From Date')}</CLabel>
            <span className="required"/>
            <CFormGroup className=''>
              <CommonDatePicker value={props.selectedFromDate} change={props.handleFromDateChange} placeholder={t('From Date')}/>
            </CFormGroup>
          </CCol>
          <CCol lg='1' style={{borderRight:"1px solid #E1E5F1"}}></CCol>
          <CCol lg='1'></CCol>
          <CCol lg='5'>
            <CLabel className=''>{t('To Date')}</CLabel>
            <span className="required"/>
            <CFormGroup className=' '>
              <CommonDatePicker value={props.selectedToDate} change={props.handleToDateChange} placeholder={t('To Date')}/>
            </CFormGroup>
          </CCol>
        </CRow>
        <CRow className="mt-4">
          <CCol lg='5'>
            <CLabel>{t('Department Name')}</CLabel><br/>
            <CFormGroup className=''>
              <CSelect className="bamawl-select" onChange={props.deptChange} value={props.deptState} custom>
                  <option key="" value="">{t('---Select Department---')}</option>
                  {props.departmentAPI != "" &&
                    props.departmentAPI.map((dept,index)=>{
                      return(
                        <option key={index} value={dept.id}>{dept.department_name}</option>
                      )
                    })
                  }
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>   
        <CRow style={{display: 'flex', marginTop: '15px', marginBottom: '20px'}} className="" lg="12">
          <CCol style={{textAlign:"center"}}>
            <CButton className="form-btn" onClick={props.ExportData}>{t('Export')}</CButton>
          </CCol>   
        </CRow>
      </>
    );
}
