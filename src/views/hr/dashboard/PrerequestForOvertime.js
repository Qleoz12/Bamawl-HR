/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CLink, CButton, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
/**
 * @author Zin Min Myat
 * @create 18/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const PrerequestForOvertime=props=> {
    const{t} = useTranslation();

    return (<>
        {
            props.data.length > 0  &&
            <>
            
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="start">
                                    {props.upDown == true &&
                                        <CImg src={'/avatars/group_8225.png'} width="17px" height="17px"  onClick={props.upDownBtn} className="pointer image-radius"/>
                                    }
                                    {props.upDown == false &&
                                        <CImg src={'/avatars/group_8016.png'} width="17px" height="17px"  onClick={props.upDownBtn} className="pointer image-radius"/>
                                    }
                                    <CImg className="m-left-19" src={'/avatars/icon_awesome_star6.png'} width="17px" height="17px" /><p className="m-left-10" style={{fontWeight: "bold",fontSize: "13px"}}>{t('Prerequest For Overtime')}</p>
                                </CRow>
                            </CCol>
                            
                            {
                                props.upDown == true &&
                                <>
                                <CCol lg="12">
                                    <CRow alignHorizontal="end">
                                        <div className="row-count-msg">{t("Total Rows").replace('%s', props.data.length)}</div>
                                    </CRow>
                                </CCol>
                                <div style={{marginLeft: "38px"}}>
                                    <div className="table-responsive tableFixHead" >
                                        <table className=" table prerequest-for-overtime" id="prerequest_for_overtime">
                                            <thead className="">
                                                <tr>
                                                    <th width="50px" className="center" style={{textAlign:'left'}} >
                                                        { t('No') }
                                                    </th>
                                                    <th width="250px" className="center" style={{textAlign:'left'}} >
                                                        { t('OT Date Time') }
                                                    </th>
                                                    <th width="100px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee ID') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee Name') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Request OT') }
                                                    </th>
                                                    <th width="100px" className="center" style={{textAlign:'left'}} >
                                                        { t('Status') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Amount') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Description') }
                                                    </th>
                                                    <th width="400px" colSpan="4" className="center" style={{textAlign:'left'}} >
                                                        { t('Action') }
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="">
                                                {
                                                    props.data.map((i,index) => {
                                                    return(
                                                            <tr width="100%" key={index} className="">
                                                                <td className="td-num" width="50px">
                                                                    {index+1}
                                                                </td>
                                                                <td className="td-num" width="250px" style={{backgroundColor: "#f7daf7"}}>
                                                                    {i.ot_date_time}
                                                                </td> 
                                                                <td className="td-num" width="100px" >
                                                                    {i.employee_id}
                                                                </td>
                                                                <td className="td-num" width="150px" >
                                                                    {i.employee_name}
                                                                </td>
                                                                <td className="td-num" width="150px" >
                                                                    {i.request_ot}
                                                                </td>
                                                                <td className="td-num" width="100px" style={{backgroundColor: "#d6f7df"}}>
                                                                    {i.status}
                                                                </td>
                                                                <td className="td-num" width="150px" >
                                                                    {i.amount}
                                                                </td>
                                                                <td className="td-num" width="150px" style={{backgroundColor: "#d6f8b3"}}>
                                                                    {i.description}
                                                                </td> 
                                                                <td className="td-num" width="100px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <CLink onClick={()=>props.confirmBtn(i.pre_request_overtime_id,"pre-request-overtime")} >{t('Confirm')}</CLink>
                                                                </td>
                                                                <td className="td-num" width="100px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <CLink onClick={()=>props.rejectBtn(i.pre_request_overtime_id,"pre-request-overtime")} >{t('Reject')}</CLink>
                                                                </td>
                                                                <td className="td-num" width="100px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <CLink onClick={()=>props.detailBtn(i.pre_request_overtime_id,"pre-request-overtime")} >{t('Detail')}</CLink>
                                                                </td>
                                                                <td className="td-num" width="100px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <CLink onClick={()=>props.clickHereBtn(i.pre_request_overtime_id,"pre-request-overtime")} >{t('Click Here')}</CLink>
                                                                </td>
                                                            
                                                            </tr>
                                                    )
                                                    })
                                                }   
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </>
                            }
                        </CCol>
                    </CRow><br/>
            </>
        }
    </>
    );
}
export default PrerequestForOvertime;
