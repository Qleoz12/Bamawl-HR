import React from 'react';
import {CCol,CRow,CImg,CLabel,CSelect,CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';
// import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

/**
 * @author Su Pyae Maung
 * @create 14/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const FormData = props => {
    const{t} = useTranslation();
    return (<>
        <CRow lg="12" style={{paddingBottom:'10px'}}>
          <CCol lg="5">
            <CLabel>{t('Choose Month to Calculate Salary')}</CLabel><br/>
            <div style={{background:"#F7F7F7"}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                  id="date-picker-dialog" placeholder={t("YYYY-MM")} format="yyyy-MMM" views={["month"]}
                  value={props.selectDate} key={props.selectDate} 
                  clearable={true} InputProps={{ readOnly: true }} disabled
              />
            </MuiPickersUtilsProvider>
            </div>
          </CCol>
          <CCol lg="1" className="verticle-line"/>
          <CCol lg="1"/>
          <CCol lg="5"> 
            <CLabel>{t('Department Name')}</CLabel><br/>
            <CSelect onChange={props.deptChange} value={props.deptState} className="bamawl-select" custom>
              <option key="" value="">---{t('Select Department')}---</option>
              {props.departmentAPI != "" &&
                props.departmentAPI.map((dept,index)=>{
                  return(
                    <option key={index} value={dept.id}>{dept.department_name}</option>
                  )
                })
              }
            </CSelect>
          </CCol>
        </CRow>
        <CRow alignHorizontal="center" style={{marginTop:"40px"}} >
          <CButton className="form-btn" onClick={props.searchData} >{t('Search')}</CButton>
        </CRow>
        {props.noData != ""  && <>
          <CRow lg="12" style={{margin:"5px 0px 0px"}} >
            <CLabel style={{color:"red"}}>※{props.noData}</CLabel>
          </CRow>
        </>}
    </>
    );  
}
export default FormData;