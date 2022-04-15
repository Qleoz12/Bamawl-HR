import React from 'react';
import { CCol, CRow, CCard, CCardHeader, CButtonToolbar, CCardBody, CImg, CLabel, CFormGroup, CButton, CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import CommonDatePicker from '../../hr-common/datepicker/DatePicker';
import EmployeeListModal from './EmployeeListModal';
import EmployeeListTable from './EmployeeListTable';

const FormData = props => {
    const {t} = useTranslation();
    return(<>
        <CCardHeader><h5><CLabel className="m-0">{t('Mail Send For Pay Slip')}</CLabel></h5></CCardHeader>
          <CCardBody>
            <CRow lg="12">
              <CCol lg="6">
                <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px' }}/>
                <CLabel className='ml-2 middle'>{t('View Employee Data for Pay Slip')}</CLabel>
              </CCol>
            </CRow>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px',marginBottom:'30px'}}>
              <CRow lg="12" style={{margin:"20px 0px 10px 10px"}} >
                <CCol lg='6'>
                  <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px' }}/>
                  <CLabel className='ml-2 middle'>{t('Payment Month')}</CLabel>
                  <span className="required"/>
                </CCol>
              </CRow>
              <CRow lg="12" className="middle payslip-mail-div-box" >
                <CCol lg="4" className="mr-5">
                  <CFormGroup className=''>
                    <CommonDatePicker value={props.selectedPaymentMonth} change={props.handlePaymentMonthChange} format={"month"} views={"month"} />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow lg="12" style={{margin:"20px 0px 10px 30px"}}>
                <CButton size="sm" className="" onClick={props.empListPlusBtn} >
                  <img width="34px" src="/avatars/Add Allowance .png" />
                </CButton>
                <b style={{paddingTop: '12px'}}>{t('Employee List')}</b>
              </CRow>
              <EmployeeListTable  data={props.addEmpListData} deleteBtn={props.empListTableDeleteBtn} />
              <CRow lg="12" style={{margin:"20px 0px 10px 10px"}} >
                <CCol lg='6'>
                  <CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px' }}/>
                  <CLabel className='ml-2 middle'>{t('Payment Transfer Report')}</CLabel>
                  <span className="required"/>
                </CCol>
              </CRow>
              <CRow lg="12" className="payslip-mail-div-box" >
                <CCol lg="6" className="mr-5" style={{marginBottom: '20px'}}>
                    <CLabel className={`toggle-yes-${props.toggleCheck ? 'in-active' : 'active'}`} style={{margin:"0px 10px 0px 5px"}} >{t('Yes')}</CLabel>
                    <div className="toggle-switch" style={{marginLeft:"10px"}}>
                      <CInput type="checkbox" className={`toggle-switch-checkbox`} id={'pay'} checked={props.toggleCheck === true} onChange={props.checkBoxChange} />
                      <CLabel className="toggle-switch-label" htmlFor={'pay'}>
                        <span className='toggle-switch-inner-5'/>
                        <span className="toggle-switch-switch"/>
                      </CLabel>
                    </div>
                    <CLabel className={`toggle-no-${props.toggleCheck ? 'active' : 'in-active'}`} style={{margin:"0px 10px 0px 10px"}}>{t('No')}</CLabel>
                </CCol>
              </CRow>
            </div>
            <CButtonToolbar className="confirm-body" justify="center">
              <CButton className="admin-btn form-btn" onClick={props.sentMail} >{t('Mail Sent')}</CButton>
              <CButton className="confirm-btn form-btn" onClick={props.download} >
                <i className="fas fa-download icon-btn"></i> &nbsp;{t('Excel Download')}
              </CButton>
            </CButtonToolbar>
            <EmployeeListModal 
            empID={props.empID} empIDData={props.empIDData}
            empCode={props.empCode} empCodeData={props.empCodeData}
            empName={props.empName} empNameData={props.empNameData} 
            changeAutocomplete={props.changeAutocomplete}  selectAutocomplete={props.selectAutocomplete}
            addBtn={props.addBtn} closeBtn={props.empListModalClose} 
            empListModalShow={props.empListModalShow} empModalError={props.empModalError} data={props.empListModalData} 
            empAllCheck={props.empAllCheck} allCheckBoxChange={props.allCheckBoxChange} subCheckboxChange={props.subCheckboxChange}
            deptState={props.deptState} deptChange={props.deptChange} departmentAPI={props.departmentAPI}
            posState={props.posState} positionChange={props.positionChange} positionAPI={props.positionAPI}
            searchBtn={props.searchBtn} 
            />
          </CCardBody>
    </>)
}

export default FormData
