import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard,CInputFile } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from 'react-autocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import CommonAutocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import $ from 'jquery';
/**
 * @author Su Pyae Maung
 * @create 24/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const EmployeeListData=props=> {
    const{t} = useTranslation();
    const inputFile =()=>{
        $( "#importExcel" ).click();
    }
    return (<>
            <div style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"10px"}}>
                <CRow lg="12" style={{margin:'10px'}}>
                    <CCol>
                        <CImg src={'/avatars/Add Allowance .png'} style={{width:"30px", height:"30px",cursor:"pointer"}} alt="puls icon" onClick={props.empListModel} />
                        <CLabel style={{marginLeft:"10px"}} className="required">{t('Employee List')}</CLabel>
                    </CCol>
                </CRow>
                {props.empDataTable != ""  && 
                <>
                <div style={{backgroundColor:'#FAFBFC',border:'1px solid #E6E6E6',borderRadius:'3px',margin:"20px"}}>
                    <CCard className='table-panel' style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"15px",paddingTop:"15px"}}>
                        <CRow id="table">
                             <CCol lg="12">
                                <div className="table-responsive" >
                                    <table className="table">
                                        <thead>
                                            {
                                            <tr>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '3.5rem'}} >
                                                    { t('No') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                    { t('Employee ID') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                    { t('Employee Code') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                    { t('Employee Name') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                    { t('NRC No') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '15rem'}} >
                                                    { t('Department') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '15rem'}} >
                                                    { t('Position') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                    { t('Address') }
                                                </th>
                                                <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7rem'}} >
                                                    { t('Remove') }
                                                </th>
                                            </tr>
                                            }
                                        </thead>
                                        <tbody >
                                        {
                                            props.empDataTable != ""  &&
                                            props.empDataTable.map((i,index) => {
                                                return(<>
                                                    {i.employee_has_dept_position.map((j,idx)=>{
                                                        return(
                                                            <tr key={index}>
                                                                {idx == 0 && <> 
                                                                    <td className="td-no" style={{textAlign:"right"}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {index+1}
                                                                    </td>
                                                                    <td style={{textAlign:"right"}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {i.employee_id}
                                                                    </td>
                                                                    <td style={{textAlign:"right"}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {i.code}
                                                                    </td>
                                                                    <td style={{textAlign:"left",backgroundColor:'#D6F883'}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {i.name_eng}
                                                                    </td>
                                                                    <td style={{textAlign:"left",backgroundColor:'#FADEE6'}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {i.nrc}
                                                                    </td>
                                                                </>}
                                                                <td style={{textAlign:"left",backgroundColor:'#FADEE6'}}>
                                                                    {j.departments.department_name}
                                                                </td>
                                                                <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}}>
                                                                    {j.positions.position_name}
                                                                </td>
                                                                {idx == 0 && <> 
                                                                    <td style={{textAlign:"left",backgroundColor:'#D6F883'}} rowSpan={i.employee_has_dept_position.length}>
                                                                        {i.address.city}, {i.address.township}
                                                                    </td>
                                                                    <td rowSpan={i.employee_has_dept_position.length}>
                                                                        <CImg 
                                                                            id = {i.id}
                                                                            value={i.id}
                                                                            src={'/avatars/remove.png'} 
                                                                            className="icon-clt" 
                                                                            alt="remove" 
                                                                            onClick={()=>props.removeEmp(i.employee_id)}
                                                                        />
                                                                    </td>
                                                                </>}
                                                            </tr>
                                                        )
                                                    })}
                                                </>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </CCol>
                        </CRow>
                    </CCard>
                </div>
                </>
                }
                <CRow lg="12" style={{margin:'10px'}}>
                    <CCol lg="5">
                        <CLabel className="required">{t('Shift Assign Date(From)')}</CLabel><br/>
                        <DatePicker value={props.selectedFromDate} change={props.changeFromDate} />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <CLabel className="required">{t('Shift Assign Date(To)')}</CLabel><br/>
                        <DatePicker value={props.selectedToDate} change={props.changeToDate} />
                    </CCol>
                </CRow><br/>
                <CRow alignHorizontal="center">
                    <CButton className="form-btn" onClick={props.excelDownload}>
                        <i className="fas fa-download icon-btn"></i> &nbsp;{t('Download Format')}
                    </CButton>
                    <CButton htmlFor="importExcel" className="form-btn" style={{marginLeft:"15px"}} onClick={inputFile}>{t('Import')}</CButton>
                    <CInputFile id="importExcel" name="importExcel" className="hide" multiple onChange={props.importFile} onClick={props.clearFile} required/>                    
                </CRow><br/>
            </div>
            <br/>
    </>
    );
}
export default EmployeeListData;