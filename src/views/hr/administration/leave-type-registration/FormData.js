/* eslint-disable no-use-before-define */
import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton, CFormGroup, CLabel, CImg, CSelect} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete'
import Dropdown from 'react-bootstrap/Dropdown';
import CommonDatePicker from '../../hr-common/datepicker/DatePicker';
// import EmployeeLeaveListTable from './EmployeeLeaveListTable';

/**
 * @author Aye Thiri Mon
 * @create 11/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const EmployeeLeaveListSearch=props=> {
  const{t} = useTranslation();
 
  return (<>
          <CCard>
          <CCardHeader><h5>{t('Employee Leave Request')}</h5></CCardHeader>
          <CCardBody>
          <CRow lg="12" style={{marginBottom:'10px'}}>
            <CCol lg="4" style={{borderRight:"1px solid #E3E5F1"}}>
              <CLabel htmlFor="emp_id" className="required">{t('Employee ID')}</CLabel>
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
              <CLabel>{t('Leave Type')}</CLabel>
              <CFormGroup className=''>
                <CSelect className="bamawl-select" onChange={props.leaveTypeChange} value={props.leaveTypeState} custom>
                  <option key="" value="">{t('---Select Leave Type---')}</option>
                  {props.leaveTypeAPI != "" &&
                    props.leaveTypeAPI.map((leaveType,index)=>{
                      return(
                        <option key={index} value={leaveType.leave_id}>{leaveType.leave_name}</option>
                      )
                    })
                  }
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol lg='1' style={{borderRight:"1px solid #E1E5F1"}}></CCol>
            <CCol lg='1'></CCol>
            <CCol lg='5'>
              <CLabel className=' '>{t('Leave Status')}</CLabel>
              <CFormGroup className=' '>
                <CSelect className="bamawl-select" onChange={props.leaveStatusChange} value={props.leaveStatusState} custom>
                  <option key="" value="1">{t('---Select Leave Status---')}</option>
                  {props.leaveStatusAPI != "" &&
                    props.leaveStatusAPI.map((leaveStatus,index)=>{
                      return(
                        <option key={index} value={leaveStatus.id}>{leaveStatus.approver_status_name}</option>
                      )
                    })
                  }
                </CSelect>
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
              <CButton className="form-btn" onClick={props.searchData}>{t('Search')}</CButton>
            </CCol>   
          </CRow>
          <CRow style={{display:'flex'}}>
            <CCol xs="12" md="12" className="mb-12">
              {/* <EmployeeLeaveListTable 
              showDelete={props.showDelete} 
              setShowDelete={props.setShowDelete} 
              change_checkbox={props.change_checkbox} 
              AllCheck={props.AllCheck} 
              rowCount={props.rowCount} 
              AllDeleteCheck={props.AllDeleteCheck} 
              mainTable={props.mainTable} 
              change_del_checkbox={props.change_del_checkbox}
              AllDelCheck={props.AllDelCheck}
              detail={props.detail}
              confirmData={props.confirmData}
              rejectData={props.rejectData}
              deleteData={props.deleteData}
              changeDeleteCheckbox={props.changeDeleteCheckbox}
              setActivePage={props.setActivePage}
              currentPage={props.currentPage}
              lastPage={props.lastPage}
              /> */}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
    );
}
export default EmployeeLeaveListSearch;