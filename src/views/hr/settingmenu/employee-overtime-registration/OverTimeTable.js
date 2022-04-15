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
 * @create 11/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const OverTimeTable=props=> {
    const{t} = useTranslation();
    return (<>
        {
            // props.data != ""  &&
            <>
                    <CCard className='table-panel'>
                        <CRow id="table">
                            <CCol lg="12">
                                <CCol lg="12">
                                    <CRow alignHorizontal="end">
                                        <div className="row-count-msg">{t('Total Rows')}: {props.data.length} {t('row(s)')}</div>
                                    </CRow>
                                </CCol>
                                <div className="table-responsive">
                                    <table className="table employee-overtime-registration-overtime-tabel">
                                        <thead id="thead-id">
                                                <tr width="100%">
                                                    <th width="10px" className="center" style={{textAlign:'left'}} >
                                                        { t('No') }
                                                    </th>
                                                    <th width="130px" className="center" style={{textAlign:'left'}} >
                                                        { t('Overtime') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Shift Name') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('OT Type') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Based On') }
                                                    </th>
                                                    <th width="400px" className="center" style={{textAlign:'left'}} >
                                                        { t('Method') }
                                                    </th>
                                                    <th width="100px" className="center" style={{textAlign:'left'}} >
                                                        { t('Multiply Rate') }
                                                    </th>
                                                    <th width="100px" className="center" style={{textAlign:'left'}} >
                                                        { t('Extra Addition') }
                                                    </th>
                                                </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                props.data.map((i,index) => {
                                                    let factor = (i.m_factor == null)? 0 : i.m_factor;
                                                    let addition = (i.e_addition == null)? 0 : i.e_addition;

                                                return(
                                                        <tr width="100%" key={index} className="">
                                                            
                                                            <td className="td-num" width="10px">
                                                                {index + 1}
                                                            </td>
                                                            <td className="td-num right" width="130px" >
                                                                {i.overtime_name}
                                                            </td>
                                                            <td className="td-num right" width="150px" style={{background: "#d6f8b3"}}>
                                                                {i.sn_name}
                                                            </td>
                                                            {i.setting_type == 1 &&
                                                                <td className="td-num left" width="150px"  style={{background: "#fadee6"}}>
                                                                    {t('Auto')}
                                                                </td>
                                                            }
                                                            {i.setting_type == 2 &&
                                                                <td className="td-num left" width="150px"  style={{background: "#fadee6"}}>
                                                                    {t('User Defined')}
                                                                </td>
                                                            }
                                                            <td className="td-num right" width="150px" >
                                                                {i.calculate_methods}
                                                            </td>
                                                            <td className="td-num right" width="400px" style={{background: "#d6f7df"}}>
                                                                {i.based_on_salary}
                                                            </td>
                                                            <td className="td-num center" width="100px" >
                                                                {factor}
                                                            </td>
                                                        
                                                            <td className="td-num center" width="100px" >
                                                                {addition}
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
                    </CCard>
            </>
        }
    </>
    );
}
export default OverTimeTable;
