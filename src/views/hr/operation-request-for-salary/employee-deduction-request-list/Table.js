/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CPagination, CCol, CRow, CImg, CTooltip, CButton, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
/**
 * @author Zin Min Myat
 * @create 18/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const Table=props=> {
    const{t} = useTranslation();
    return (<>
        {
            props.data.length>0  &&
            <>

            <div className="mt-5" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-1'>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{t("Total Rows").replace('%s', props.total)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive tableFixHead">
                                <table className=" table deduction-request-list">
                                    <thead className="">
                                        <tr>
                                            <th width="10px" className="center"  style={{verticalAlign: "middle"}}>
                                                <input type="checkbox" value="all-check" checked={props.allCheck === true} onChange={props.allCheckBoxChange} />
                                            </th>
                                            <th width="50px" className="center" style={{textAlign:'left'}} >
                                                { t('No') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee ID') }
                                            </th>
                                            <th width="120px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee Code') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee Name') }
                                            </th>
                                            <th width="350px" className="center" style={{textAlign:'left'}} >
                                                { t('Department') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Joined Date') }
                                            </th>
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Deduction Name') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Deduction Category') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Deduction Type') }
                                            </th>
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Deduction Based On') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Deduction Date') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Edit') }
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map((i,index) => {
                                            return(
                                                    <tr width="100%" key={index} className="">
                                                          
                                                        <td className="td-num" width="">
                                                            <input type="checkbox" onChange={props.subCheckboxChange} checked={i.is_checked == true} value={i.id} />
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {index+1}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.employee_id}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.employee_code} 
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.employee_name}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.departments.map((dep,idx)=>{
                                                                return(
                                                                    <CRow key={idx} alignHorizontal="center">
                                                                        {dep.department_name}<br/>
                                                                    </CRow>
                                                                )
                                                            })}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.join_date}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.deduction_name}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.deduction_category}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.deduction_type}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.deduction_base_on}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.deduction_date} 
                                                        </td>
                                                        <td className="td-num center" width="50px">
                                                            <CTooltip content={t('Edit')}>
                                                                <CImg 
                                                                    id = ""
                                                                    src={'/avatars/edit.png'} 
                                                                    className="icon-clt " 
                                                                    alt="delete" 
                                                                    onClick={props.editBtn.bind(this,i.id)}
                                                                />
                                                            </CTooltip>
                                                            
                                                        </td>
                                                      
                                                    </tr>
                                            )
                                            })
                                        } 
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                    {props.total > 20 &&
                        <CRow alignHorizontal="center" className="mt-3">
                            <CPagination
                                activePage={props.currentPage}
                                pages={props.lastPage}
                                dots={false}
                                arrows={false}
                                align="center"
                                firstButton="First page"
                                lastButton="Last page"
                                onActivePageChange={ (i) => props.setActivePage(i) }
                            ></CPagination>
                        </CRow>
                    }
                    
                  
                </CCard>
                
            </div>
            <CRow alignHorizontal="center" className="mt-3">
                <CButton  className="form-btn" onClick={props.deleteBtn}>{t('Delete')}</CButton>
            </CRow>
            </>
        }
    </>
    );
}
export default Table;
