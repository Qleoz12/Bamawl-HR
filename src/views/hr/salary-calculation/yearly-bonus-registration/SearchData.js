/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CFormGroup, CButton, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
/**
 * @author Zin Min Myat
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SearchData=props=> {
    const{t} = useTranslation();
    return (<>
        {
            props.mainTable != ""  &&
            <>
            <CCol lg="3" className="mt-5">
                <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Search Data')}</CLabel>
            </CCol>  
            
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-3'>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{t("Total Rows").replace('%s', props.mainTable.length)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive tableFixHead">
                                <table className=" table yearly-bonus-registration">
                                    <thead className="">
                                        <tr>
                                            <th width="10px" className="" style={{textAlign:'center'}}>
                                                <input type="checkbox" value="all-check" checked={props.allCheck == true} onChange={props.allCheckBoxChange} />
                                            </th>
                                            <th width="50px" style={{textAlign:'left'}} >
                                                { t('No') }
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} >
                                                { t('Employee ID') }
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} >
                                                { t('Employee Code') }
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} >
                                                { t('Employee Name') }
                                            </th>
                                            <th width="250px" style={{textAlign:'left'}} className="td-num left">
                                                { t('Pay Date') }
                                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                    <KeyboardDatePicker
                                                        margin="normal"
                                                        id="date-picker-dialog"
                                                        className="header-date-css"
                                                        format="yyyy-MM-dd"
                                                        value={props.allDate}
                                                        onChange={props.allDateChange}
                                                        clearable={true}
                                                        InputProps={{ readOnly: true }}
                                                        
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} >
                                                { t('Total Salary') }
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} >
                                                { t('Basic Salary') }
                                            </th>
                                            <th width="200px" style={{textAlign:'left'}} >
                                                { t('Yearly Bonus Amount') }
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.mainTable != ""  &&
                                            props.mainTable.map((i,index) => {
                                            return(
                                                    <tr width="100%" key={index} className="">
                                                        <td className="td-num" width="10px" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}} >
                                                            <input type="checkbox" checked={i.is_checked == true} onChange={props.subCheckboxChange} value={i.employee_id} />
                                                        </td>  
                                                        <td className="td-num" width="10px">
                                                            {index+1}
                                                        </td>
                                                        <td className="td-num right" width="150px">
                                                        {i.employee_id}
                                                        </td>
                                                        <td className="td-num right" width="150px" style={{backgroundColor: "#d6f8b3"}}>
                                                            {i.employee_code}
                                                        </td>
                                                        <td className="td-num left" width="150px" style={{backgroundColor: "#d6f8b3"}}>
                                                            {i.employee_name}
                                                        </td>
                                                        <td className="td-num center" width="250px">
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils} style={{backgroundColor: "red"}}>
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id="date-picker-dialog"
                                                                    className="sub-date-css"
                                                                    format="yyyy-MM-dd"
                                                                    value={i.pay_date}
                                                                    onChange={(e) => props.subDateChange(i.employee_id, e)}
                                                                    clearable={true}
                                                                    InputProps={{ readOnly: true }}
                                                                   
                                                                />
                                                            </MuiPickersUtilsProvider>
                                                          
                                                        </td>
                                                        <td className="td-num right" width="150px" style={{backgroundColor: "#f7daf7"}}>
                                                        {i.total_salary}
                                                        </td>
                                                        <td className="td-num right" width="150px" style={{backgroundColor: "#f7daf7"}}>
                                                            {i.basic_salary}
                                                        </td>
                                                        <td className="td-num right" width="200px">
                                                            {props.methodMode == 8 &&
                                                                <CInput type="text" value={i.bonus_amount} onChange={props.bonusAmountChange} id={i.employee_id} />
                                                            }
                                                            {props.methodMode < 8 &&
                                                                <CInput type="text" value={i.bonus_amount} disabled />
                                                            }
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
                    <CRow alignHorizontal="center" className="mt-3">
                        <CButton  className="form-btn" onClick={props.removeBtn}>{t('Remove')}</CButton>
                    </CRow>
                </CCard>
                
            </div>
            </>
        }
    </>
    );
}
export default SearchData;
