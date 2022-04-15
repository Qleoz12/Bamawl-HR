import React from 'react';
import {CCol,CRow,CButton,CImg,CCard,CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 
 * @param  {*} props
 * @returns output shown in web page
 */
const ApproverTable=props=> {
    const{t} = useTranslation();
    return (<>
        {!props.positionRank.includes(0) &&  props.approverTable.length > 0 && <>
        <CRow lg="12">
            <CCol lg="3">
                <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                <CLabel style={{marginLeft:"10px"}} >{t('Approver Data')}</CLabel>
            </CCol>
        </CRow>
        </>}
        {!props.positionRank.includes(0) &&  props.approverTable.length > 0 && <>
        <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',margin:"10px"}}>
            <CCard className='table-panel' style={{padding:"15px 15px 0px"}}>
                <CRow id="table">
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {
                                    <tr>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7.5rem'}} >
                                            { t('Employee ID') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7.5rem'}} >
                                            { t('Approver ID') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                            { t('Approver Name') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '13rem'}} >
                                            { t('Email') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '15rem'}} >
                                            { t('Department') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '13rem'}} >
                                            { t('Position') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '5rem'}} >
                                            { t('Remove') }
                                        </th>
                                    </tr>
                                    }
                                </thead>
                                <tbody >
                                {
                                    props.approverTable.length > 0  &&
                                    props.approverTable.map((i,index) => {
                                        return(<>
                                            <tr key={index}> 
                                                <td className="td-no" style={{textAlign:"right"}}>
                                                    {i.applicant_id}
                                                </td>
                                                <td style={{textAlign:"right"}}>
                                                    {i.approver_id}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#D6F883'}}>
                                                    {i.approver_name}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#D6F7DF'}}>
                                                    {i.email}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#FADEE6'}}>
                                                    {i.department}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}}>
                                                    {i.position}
                                                </td>
                                                <td>
                                                    <CImg 
                                                        // id = {i.id}
                                                        //value={i.id}
                                                        src={'/avatars/remove.png'} 
                                                        className="icon-clt" 
                                                        alt="remove" 
                                                        onClick={props.deleteApprover.bind(this,i)}
                                                        // onClick={()=>props.deleteApprover(j.applicant_id,j.approver_id)}
                                                    />
                                                </td>
                                            </tr>
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
        {((props.approverTable.length > 0) || (props.approverTable.length==0 && props.leaveDataTable.length>0  && props.positionRank.includes(0))) &&
        <> 
            <CRow alignHorizontal="center" style={{marginTop:"30px"}} >
                <CButton className="form-btn" onClick={props.saveData} >{t('Save')}</CButton> 
            </CRow>
        </>}
    </>
    );
}
export default ApproverTable;