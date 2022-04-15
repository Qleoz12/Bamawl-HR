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
const HappyBirthday=props=> {
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
                                        <CImg src={'/avatars/group_8229.png'} width="17px" height="17px"  onClick={props.upDownBtn} className="pointer image-radius"/>
                                    }
                                    {props.upDown == false &&
                                        <CImg src={'/avatars/group_8233.png'} width="17px" height="17px"  onClick={props.upDownBtn} className="pointer image-radius"/>
                                    }
                                    <CImg className="m-left-19" src={'/avatars/icon_awesome_star7.png'} width="17px" height="17px" /><p className="m-left-10" style={{fontWeight: "bold",fontSize: "13px"}}>{t('Employee Happy Birthday For This Month')}</p>
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
                                        <table className=" table happy-birthday" id="happy_birthday">
                                            <thead className="">
                                                <tr>
                                                    <th width="50px" className="center" style={{textAlign:'left'}} >
                                                        { t('No') }
                                                    </th>
                                                    <th width="250px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee ID') }
                                                    </th>
                                                    <th width="250px" className="center" style={{textAlign:'left'}} >
                                                        { t('Date Of Birth') }
                                                    </th>
                                                    <th width="250px" className="center" style={{textAlign:'left'}} >
                                                        { t('Employee Name') }
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
                                                                <td className="td-num" width="250px" >
                                                                    {i.employee_id}
                                                                </td>
                                                                <td className="td-num" width="250px" style={{backgroundColor: "#fef3d4"}}>
                                                                    {i.date_of_birth}
                                                                </td>
                                                                <td className="td-num" width="250px" >
                                                                    {i.employee_name}
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
export default HappyBirthday;
