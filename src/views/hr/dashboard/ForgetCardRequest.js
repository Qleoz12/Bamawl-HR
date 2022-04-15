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
const ForgetCardRequest=props=> {
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
                                        <CImg src={'/avatars/group_8014.png'} width="17px" height="17px"  onClick={props.upDownBtn}  className="pointer image-radius"/>
                                    }
                                    {props.upDown == false &&
                                        <CImg src={'/avatars/group_8227.png'} width="17px" height="17px"  onClick={props.upDownBtn}  className="pointer image-radius"/>
                                    }
                                    <CImg className="m-left-19" src={'/avatars/icon_awesome_star1.png'} width="17px" height="17px" /><p className="m-left-10" style={{fontWeight: "bold",fontSize: "13px"}}>{t('Forget Card Request')}</p>
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
                                        <table className=" table forget-card-request" id="forget_card_request">
                                            <thead className="">
                                                <tr>
                                                    <th width="50px" className="center" style={{textAlign:'left'}} >
                                                        { t('No') }
                                                    </th>
                                                    <th width="170px" className="center" style={{textAlign:'left'}} >
                                                        { t('Forget Card Date') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee ID') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee Name') }
                                                    </th>
                                                    <th width="150px" className="center" style={{textAlign:'left'}} >
                                                        { t('Status') }
                                                    </th>
                                                    <th width="520px" colSpan="4" className="center" style={{textAlign:'left'}} >
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
                                                                <td className="td-num" width="170px" style={{backgroundColor: "#f7daf7"}}>
                                                                    {i.forget_card_date}
                                                                </td>
                                                                <td className="td-num" width="150px" >
                                                                    {i.employee_id}
                                                                </td>
                                                                <td className="td-num" width="150px" >
                                                                    {i.employee_name}
                                                                </td>
                                                                <td className="td-num" width="150px" style={{backgroundColor: "#d6f7df"}}>
                                                                    {i.forget_card_status}
                                                                </td> 
                                                                {   i.btn_flag == true &&
                                                                    <>
                                                                        <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                            <nav className="link-effect-2 pointer">
                                                                                <a onClick={()=>props.confirmBtn(i.forget_card_id,"forget-card-request")}><span data-hover={t('Confirm')}>{t('Confirm')}</span></a> 
                                                                            </nav>
                                                                        </td>
                                                                        <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                            <nav className="link-effect-2 pointer">
                                                                                <a onClick={()=>props.rejectBtn(i.forget_card_id,"forget-card-request")}><span data-hover={t('Reject')}>{t('Reject')}</span></a> 
                                                                            </nav>
                                                                        </td>
                                                                        
                                                                    </>
                                                                }
                                                                {   i.btn_flag == false &&
                                                                    <>
                                                                        <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                            <CLink style={{color: "gray"}} className="not-allow">{t('Confirm')}</CLink>
                                                                        </td>
                                                                        <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                            <CLink style={{color: "gray"}} className="not-allow">{t('Reject')}</CLink>
                                                                        </td>
                                                                    </>
                                                                }
                                                                <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <nav className="link-effect-2 pointer">
                                                                        <a onClick={()=>props.detailBtn(i,"forget-card-request")}><span data-hover={t('Detail')}>{t('Detail')}</span></a> 
                                                                    </nav>
                                                                </td>
                                                                <td className="td-num" width="130px" style={{backgroundColor: "#f6f1f5"}}>
                                                                    <nav className="link-effect-2 pointer">
                                                                        <a onClick={()=>props.clickHereBtn(i,"forget-card-request")}  ><span data-hover={t('Click Here')}>{t('Click Here')}</span></a> 
                                                                    </nav>
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
export default ForgetCardRequest;
