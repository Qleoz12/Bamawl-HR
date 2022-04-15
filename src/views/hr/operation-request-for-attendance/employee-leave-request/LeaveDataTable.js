import React from 'react';
import $ from 'jquery';
import {CCard, CCol, CRow, CImg, CButton, CInput,CInputFile,CLabel,CTooltip} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const LeaveDataTable=props=> {
    const{t} = useTranslation();
    const [reason , setReason]  = useState('');
    let allReasonSet =(e)=>{
        setReason(e.target.value);
    }
    let res = $("#sub-reason");
    res.keyup(function(){
        $('#all-reason').val("");
        setReason('');
    });

    return (<>
        {
            props.leaveDataTable.length > 0  &&
            <div className="" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',margin:"0px 10px 30px"}}>
            <CCard className='table-panel' style={{padding:"15px 15px 0px"}} >
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
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                            { t('Employee Code') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                            { t('Leave Day') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7.5rem'}} >
                                            { t('Leave Date') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '15rem'}} >
                                            { t('Leave Type') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '5rem'}}>
                                            {t('Full Day')}
                                            <input type="checkbox" id="all-fullday" value="allcheck-full" checked={props.fullCheck === true} onChange={props.fulldayChange} />
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '7.5rem'}}>
                                            {t('Before Break')}
                                            <input type="checkbox" id="all-before" value="allcheck-before" checked={props.beforeCheck === true} onChange={props.beforeChange} />
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '7rem'}}>
                                            {t('After Break')}   
                                            <input type="checkbox" id="all-after" value="allcheck-after" checked={props.afterCheck === true} onChange={props.afterChange} />
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}}>
                                            {t('Reason')}
                                            <CRow lg="12">
                                                <CInput type="text" style={{width: "130px",marginLeft:'10px'}} id="all-reason" onChange={allReasonSet} />
                                                <CButton className="set-btn" onClick={props.setBtn.bind(this,reason)}>{t('Set')}</CButton>
                                            </CRow>
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7rem'}} >
                                            { t('Remove') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '18rem'}} >
                                            { t('File Upload') }
                                        </th>
                                    </tr>
                                    }
                                </thead>
                                <tbody >
                                {
                                    props.leaveDataTable.length > 0  &&
                                    props.leaveDataTable.map((i,index) => {
                                        let tmp_length = props.leaveTableLength.filter(k => {
                                            if(i.employee_id == k.employee_id){
                                                return k;
                                            }
                                        })
                                        return(<>
                                            <tr key={index} > 
                                                <td className="td-no" style={{textAlign:"right"}}>
                                                    {i.employee_id}
                                                </td>
                                                <td style={{textAlign:"right"}}>
                                                    {i.employee_code}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#E5F6F5'}}>
                                                    {i.day}
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    {i.leave_date}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}} rowSpan={i.length}>
                                                    {i.leave_type_name}
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <input type="radio" id="sub-all" checked={i.full_day === true} onChange={props.subFullChange.bind(this,i)} />
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <input type="radio" id="sub-before" checked={i.before_break === true} onChange={props.subBeforeChange.bind(this,i)} />
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <input type="radio" id="sub-after" checked={i.after_break === true} onChange={props.subAfterChange.bind(this,i)} />
                                                </td>
                                                <td style={{textAlign:"center"}}>
                                                    <CInput type="text" style={{width:'170px', height:'32px'}} id="sub-reason" value={i.reason} onChange={(e)=>props.subReasonChange(i.employee_id,i.leave_date,e)} />
                                                </td>
                                                <td>
                                                    <CImg
                                                        src={'/avatars/remove.png'} 
                                                        className="icon-clt" 
                                                        alt="remove" 
                                                        onClick={props.deleteLeaveDay.bind(this,i)}
                                                    />
                                                </td>  
                                                { index == tmp_length[0]["begin_spin"]  && <>
                                                <td style={{textAlign:"center"}} rowSpan={tmp_length[0]["spin_count"]} >
                                                    <CInputFile id="importExcel" accept=".jpeg,.png,.jpg,.pdf" className="hide" multiple onChange={props.importFile} onClick={props.clearFile} required/>
                                                    <CLabel htmlFor="importExcel" className=" pointer" style={{textAlign:"center"}} onClick={props.txtFile.bind(this,i)}>
                                                        <CImg src="/avatars/attach.png" className="upload-image pointer" block/>
                                                    </CLabel>
                                                    {i.attach_files.length > 0 &&
                                                        <table style={{border:"none"}}>
                                                            <tbody>
                                                                {
                                                                    i.attach_files.map((k,index) => {
                                                                        return(
                                                                            <tr key={index} >
                                                                                <td>{k.name}</td>
                                                                                <td>
                                                                                    <CTooltip content={t('Delete')}>
                                                                                        <CImg style={{width:"10px",height:"10px"}}
                                                                                            src={'/avatars/red_cross.png'} 
                                                                                            className="" 
                                                                                            alt="delete" 
                                                                                            onClick={()=>props.removeFile(i,index)}
                                                                                        />
                                                                                    </CTooltip>
                                                                                </td>
                                                                            </tr>
                                                                         )
                                                                    })
                                                                }   
                                                            </tbody>
                                                        </table>
                                                        }
                                                </td>
                                                </>} 
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
                <CRow id="table" style={{marginTop:"20px"}}>
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {
                                    <tr>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '7.5rem'}} >
                                            { t('Employee ID') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                            { t('Employee Code') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                            { t('Leave Type') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '13rem'}} >
                                            { t('Last  Year Remaining Balanace') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '13rem'}} >
                                            { t('Current Year Remaining Balanace') }
                                        </th>
                                        <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '13rem'}} >
                                            { t('Next Year Remaining Balanace') }
                                        </th>
                                    </tr>
                                    }
                                </thead>
                                <tbody >
                                {
                                    props.leaveDataTable != ""  &&
                                    props.remainDayTable.map((i,index) => {
                                        return(
                                        <tr key={index}> 
                                            <td className="td-no" style={{textAlign:"right"}}>
                                                {i.employee_id}
                                            </td>
                                            <td style={{textAlign:"right"}}>
                                                {i.employee_code}
                                            </td>
                                            <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}}>
                                                {i.leave_name}
                                            </td>
                                            <td style={{textAlign:"left",backgroundColor:'#E5F6F5'}}>
                                                {i.prev_remain_day}
                                            </td>
                                            <td style={{textAlign:"left",backgroundColor:'#D6F7DF'}}>
                                                {i.cur_remain_day}
                                            </td>
                                            <td style={{textAlign:"left",backgroundColor:'#E5F6F5'}}>
                                                {i.next_remain_day}
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
        }
    </>
    );
}
export default LeaveDataTable;