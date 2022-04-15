/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CPagination, CCol, CRow, CImg, CTooltip, CButton, CInput, CLabel} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import $ from 'jquery'
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
            <div className="mt-5" style={{border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-1' style={{paddingTop: "20px",paddingLeft: "25px",paddingRight: "25px"}}>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="start" className="show-delete-card" style={{marginBottom: "-21px"}}>
                                    <input type="checkbox" className="ml-4" id="show_delete_button" style={{marginTop: "9px"}} checked={props.showDelete == true} onChange={props.showDeleteChange} />
                                    <CLabel className="ml-2" style={{marginTop: "6px"}} htmlFor="show_delete_button">Show Delete Button</CLabel>
                                </CRow>
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{t("Total Rows").replace('%s', props.total)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive tableFixHead" style={{borderTopLeftRadius: "0px"}}>
                                <table className=" table after-overtime-request-list" id="after-overtime-request-list" style={{borderTopLeftRadius: "unset",background: "#b1aaf6"}}>
                                    <thead className="">
                                        <tr>
                                            <th width="10px" className="center"  style={{verticalAlign: "middle",borderTopLeftRadius: "0px"}}>
                                                <input type="checkbox" value="all-check" checked={props.allCheck === true} onChange={props.allCheckBoxChange}/>
                                            </th>
                                            <th width="50px" className="center" style={{textAlign:'left'}} >
                                                { t('No') }
                                            </th>
                                            <th width="100px" className="center break-word" style={{textAlign:'left'}} >
                                                { t('Employee ID') }
                                            </th>
                                            <th width="120px" className="center break-word" style={{textAlign:'left'}} >
                                                { t('Employee Code') }
                                            </th>
                                            <th width="150px" className="center break-word" style={{textAlign:'left'}} >
                                                { t('Employee Name') }
                                            </th>
                                            <th width="130px" className="center break-word" style={{textAlign:'left'}} >
                                                { t('Overtime Date') }
                                            </th>
                                            <th width="100px" className="center break-word" style={{textAlign:'left'}} >
                                                { t('Overtime Time') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('SN') }
                                            </th>
                                            <th width="130px" className="center" style={{textAlign:'left'}} >
                                                { t('Status') }
                                            </th>
                                            {props.currency.length > 0 && props.showAmount == true &&
                                                props.currency.map((cur,idx)=>{
                                                    return(
                                                            <th width="130px" key={idx} className="center" style={{textAlign:'left'}} >
                                                                { t('Amount ') }{cur.currency_desc}
                                                            </th>
                                                    )
                                                })
                                                
                                            }
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Remark') }
                                            </th>
                                            <th width="120px" className="center" style={{textAlign:'left'}} >
                                                { t('Detail') }
                                            </th>
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Approver Status') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Denied Reason') }
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map((i,index) => {
                                               
                                            return(
                                             
                                                    <tr width="100%" key={index}  className="">
                                                        <td className="td-num" width="">
                                                            {props.showDelete == false && i.checkbox == true &&
                                                                <input type="checkbox" onChange={props.subCheckboxChange} checked={i.checkbox_checked == true} value={i.employee_overtime_id} />
                                                            }
                                                            {props.showDelete == true && i.delete_checkbox == true &&
                                                                <input type="checkbox" onChange={props.subCheckboxChange} checked={i.delete_checkbox_checked == true} value={i.employee_overtime_id} />
                                                            }
                                                            
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
                                                            {i.overtime_date}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.overtime_time}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.shift_name}
                                                        </td>
                                                        <td className="td-num" width="">
                                                            {i.status}
                                                        </td>
                                                        {props.showAmount == true &&
                                                            i.currency_amount.map((c,idx)=>{
                                                            return(
                                                                    <td className="td-num" key={idx} width="">
                                                                        {c}
                                                                    </td>
                                                                )
                                                            })
                                                        }
                                                        <td className="td-num" width="">
                                                            {i.remark}
                                                        </td>
                                                        <td className="td-num center" width="50px">
                                                            <CTooltip content={t('Detail')}>
                                                                <CImg 
                                                                    id = ""
                                                                    src={'/avatars/detail.png'} 
                                                                    className="icon-clt " 
                                                                    alt="detail" 
                                                                    onClick={props.detailChange.bind(this,i.employee_overtime_id)}
                                                                />
                                                            </CTooltip>
                                                            
                                                        </td>
                                                        {i.approver_status == "Overdue" &&
                                                            <td className="td-num" width="" style={{color: "red"}}>
                                                                {i.approver_status}
                                                            </td>
                                                        }
                                                        {i.approver_status != "Overdue" &&
                                                            <td className="td-num" width="">
                                                                {i.approver_status}
                                                            </td>
                                                        }
                                                        <td className="td-num" width="">
                                                            {i.denied_reason}
                                                        </td>
                                                       
                                                    </tr>
                                                    
                                                    
                                            )
                                        })} 
                                            {props.totalOvertimeAmount.currency_amount !== undefined &&
                                                <tr style={{background: "#f6f1f5"}} key="01">
                                                    <td colSpan="5" style={{borderRight: "unset"}}>
                                                        <CLabel>{t('Overtime Time Total')}: &nbsp; {props.totalOvertimeAmount.total_time}</CLabel>
                                                    </td>
                                                    <td colSpan="5" style={{borderRight: "unset"}}>
                                                        <CLabel>{t('Overtime Time Total(MMK)')}: &nbsp; {props.totalOvertimeAmount.currency_amount[0]}</CLabel>
                                                    </td>
                                                    <td colSpan="5">
                                                        <CLabel>{t('Overtime Time Total(USD)')}: &nbsp; {props.totalOvertimeAmount.currency_amount[1]}</CLabel>
                                                    </td>
                                                </tr>
                                            }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </CCard>
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
               
            </div>
            <CRow alignHorizontal="center" className="mt-5"> 
                {props.showDelete == false &&
                    <>  { props.confirmRejectShow == true &&
                            <>
                                <CButton  className="form-btn ml-2" onClick={props.confirmBtn}>{t('Confirm')}</CButton>
                                <CButton  className="form-btn ml-2" onClick={props.rejectBtn}>{t('Reject')}</CButton>
                            </>
                        }
                        <CButton  className="form-btn ml-2" onClick={props.exportBtn}>{t('Export')}</CButton>
                    </>
                }
                {props.showDelete == true &&
                    <CButton  className="form-btn ml-2" onClick={props.deleteBtn}>{t('Delete')}</CButton>
                }
                

            </CRow>
           
            </>
            
        }
    </>
    );
}
export default Table;
