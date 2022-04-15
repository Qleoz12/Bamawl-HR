/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CTooltip, CCol, CRow, CImg, CFormGroup, CButton, CInput} from '@coreui/react';
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
const ApproverTable=props=> {
    const{t} = useTranslation();
    return (<>
        {
            props.data != ""  && !props.positionRank.includes(0) &&
            <>

            <div className="mt-2" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-1'>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{t("Total Rows").replace('%s', props.data.length)}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive tableFixHead">
                                <table className=" table forget-card-entry-approver-table">
                                    <thead className="">
                                        <tr>
                                            
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee ID') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Approver ID') }
                                            </th>
                                            <th width="200px" className="center" style={{textAlign:'left'}} >
                                                { t('Approver Name') }
                                            </th>
                                            <th width="200px" className="center" style={{textAlign:'left'}} >
                                                { t('Email') }
                                            </th>
                                        
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Department') }
                                            </th>
                                            <th width="170px" className="center" style={{textAlign:'left'}} >
                                                { t('Position') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Delete') }
                                            </th>
                                          
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map((i,index) => {
                                            return(
                                                    <tr width="100%" key={index} className="">
                                                        
                                                        <td className="td-num" width="">
                                                            {i.applicant_id}
                                                        </td>
                                                        <td className="td-num right" width="" style={{background: "#d6f8b3"}}>
                                                            {i.approver_id}
                                                        </td>
                                                        <td className="td-num right" width="">
                                                            {i.approver_name}
                                                        </td>
                                                        <td className="td-num center" width="" style={{background: "#d6f7df"}}>
                                                            {i.email}
                                                        </td>
                                                        <td className="td-num right" width="" >
                                                            {i.department}
                                                        </td>
                                                        <td className="td-num center" width="" >
                                                            {i.position}
                                                        </td>
                                                        <td className="td-num center" width="">
                                                            <CTooltip content={t('Delete')}>
                                                                <CImg 
                                                                    id = {i.id}
                                                                    src={'/avatars/remove.png'} 
                                                                    className="icon-clt " 
                                                                    alt="delete" 
                                                                    onClick={()=>props.deleteBtn(i.applicant_id,i.approver_id)}
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
                </CCard>
                
            </div>
            </>
        }
        {
            ((props.data.length > 0) || (props.settingTableData.length>0  && props.positionRank.includes(0))) &&
            <CRow alignHorizontal="center" className="mt-3">
                <CButton  className="form-btn" onClick={props.saveBtn}>{t('Save')}</CButton>
            </CRow>
        }
    </>
    );
}
export default ApproverTable;
