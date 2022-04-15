/* eslint-disable no-use-before-define */
import React,{useState} from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CFormGroup, CButton, CInput,CSelect} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import $ from 'jquery'
/**
 * @author Zin Min Myat
 * @create 12/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const SettingTable=props=> {
    const [description, setDescription ] = useState(""); 
    const{t} = useTranslation();

    let allDescriptionChange=(e)=>{
        setDescription(e.target.value);
    }

    let des = $('#sub-description');
    des.keyup(function() {
        $('#all-description').val("");
        setDescription('');
        
    });
    return (<>
   
        {
            props.data.length >0  &&
            <>
            
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}} className="mt-5">
                <CCard className='table-panel '>
                    <CRow id="table">
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <CImg src="/avatars/red_clock.png" width="13px" height="13px" draggable={false} style={{marginTop: "5px",marginRight: "3px"}} /><div style={{color: "red",fontSize: "11px",fontWeight: "bold", marginTop: "3px"}}>{t('24-Hour format')}</div>
                                </CRow>
                            </CCol>
                            <div className="table-responsive mt-3 tableFixHead">
                                <table className=" table forget-card-entry-setting-table">
                                    <thead className="">
                                        <tr>
                                            <th width="10px" style={{textAlign:'left'}} className="left">
                                                <input type="checkbox" value="all-check" checked={props.settingAllCheck === true} onChange={props.settingAllCheckChange} />
                                            </th>
                                            <th width="120px" style={{textAlign:'left'}} className="left">
                                                { t('Employee ID') }
                                            </th>
                                            <th width="120px" style={{textAlign:'left'}} className="left">
                                                { t('Date') }
                                            </th>
                                            <th width="150px" style={{textAlign:'left'}} className="left">
                                                { t('In or Out Status') }
                                                <CSelect  className="select " custom  id="in-out-status" value={props.inOutStatus} onChange={props.inOutAllChange} >
                                                    <option key="" value="">---Select---</option>
                                                    {
                                                        props.inOutStatusData.length >0 &&
                                                            props.inOutStatusData.map(i => {
                                                                return( <option key={i.id} name={i.id} value={i.id}>{ i.name }</option>)})
                                                    }
                                                </CSelect>
                                            </th>
                                            <th width="163px" style={{textAlign:'left'}} className="left">
                                                <CRow lg="12" style={{marginLeft: "-.4em"}}>{ t('In Time') }</CRow>
                                                <CRow lg="12">
                                                    {props.inOutStatus != 2 &&
                                                        <>
                                                            <CSelect  className="select" custom style={{width: "65px",marginLeft: "9px"}} id="in-hr" value={props.inHr} onChange={props.allInHrChange}>
                                                                <option key="" value="">hr</option>
                                                                {
                                                                    props.inHrData.length >0 &&
                                                                        props.inHrData.map(i => {
                                                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                }
                                                            </CSelect>
                                                    
                                                    
                                                            <CSelect  className="select" custom style={{width: "70px", marginLeft: "5px"}} id="in-min" value={props.inMin} onChange={props.allInMinChange}>
                                                                <option key="" value="">min</option>
                                                                {
                                                                    props.inMinData.length >0 &&
                                                                        props.inMinData.map(i => {
                                                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                }
                                                            </CSelect>
                                                        </>
                                                    }
                                                    {props.inOutStatus == 2 &&
                                                        <>
                                                            <CSelect  className="select" custom style={{width: "65px",marginLeft: "9px"}} id="in-hr" value={props.inHr} onChange={props.allInHrChange} disabled>
                                                                <option key="" value="">hr</option>
                                                            </CSelect>
                                                            <CSelect  className="select" custom style={{width: "70px", marginLeft: "5px"}} id="in-min" value={props.inMin} onChange={props.allInMinChange} disabled>
                                                                <option key="" value="">min</option>
                                                            </CSelect>
                                                        </>
                                                    }
                                                        
                                                </CRow>
                                            </th>
                                            <th width="163px" style={{textAlign:'left'}} className="left">
                                                <CRow style={{marginLeft: "-.4em"}}>{ t('Out Time') }</CRow> 
                                                <CRow lg="12">
                                                    {props.inOutStatus != 1 &&
                                                        <>
                                                            <CSelect  className="select" custom style={{width: "65px",marginLeft: "9px"}} id="out-hr" value={props.outHr} onChange={props.allOutHrChange}>
                                                                <option key="" value="">hr</option>
                                                                {
                                                                    props.outHrData.length >0 &&
                                                                        props.outHrData.map(i => {
                                                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                }
                                                            </CSelect>
                                                    
                                                    
                                                            <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} id="out-min" value={props.outMin} onChange={props.allOutMinChange}>
                                                                <option key="" value="">min</option>
                                                                {
                                                                    props.outMinData.length >0 &&
                                                                        props.outMinData.map(i => {
                                                                            return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                }
                                                            </CSelect>
                                                        </>
                                                    }
                                                    {props.inOutStatus == 1 &&
                                                        <>
                                                            <CSelect  className="select" custom style={{width: "65px",marginLeft: "9px"}} id="out-hr" value={props.outHr} onChange={props.allOutHrChange} disabled>
                                                                <option key="" value="">hr</option>
                                                            </CSelect>
                                                            <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} id="out-min" value={props.outMin} onChange={props.allOutMinChange} disabled>
                                                                <option key="" value="">min</option>
                                                            </CSelect>
                                                        </>
                                                    }
                                                    
                                                </CRow>
                                            </th>
                                            <th width="220px" style={{textAlign:'left'}} className="left">
                                                <CRow style={{marginLeft: "1px"}}>{ t('Description') }</CRow> 
                                                <CRow lg="12">
                                                    <CInput type="text" className="description-text" id="all-description"  onChange={allDescriptionChange} />
                                                    <CButton className="set-btn"  onClick={props.setBtn.bind(this,description)}>{t('Set')}</CButton>
                                                </CRow>
                                                
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                    {
                                        props.data.map((i,index) => {
                                        return(
                                                <tr width="100%" key={index} className="">
                                                    <td className="td-num" width="10px" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}} >
                                                        <input type="checkbox" checked={i.is_checked === true} onChange={()=>props.settingSubCheckChange(i.date,i.employee_id)} value={i.employee_id} />
                                                    </td>  
                                                    <td className="td-num right" width="120px">
                                                        {i.employee_id}
                                                    </td>
                                                    <td className="td-num right" width="120px" style={{background: "#d6f8b3"}}>
                                                        {i.date}
                                                    </td>
                                                    <td className="td-num center" width="150px">
                                                        <CSelect  className="select" custom id="in-out-status" value={i.in_out_status} onChange={(e)=>props.subInOutChange(i.employee_id,i.date,e)}>
                                                            <option key="" value="">---Select---</option>
                                                            {
                                                                props.inOutStatusData.length >0 &&
                                                                    props.inOutStatusData.map(i => {
                                                                        return( <option key={i.id} name={i.id} value={i.id}>{ i.name }</option>)})
                                                            }
                                                        </CSelect>
                                                    </td>
                                                
                                                    <td className="td-num center" width="163px" style={{background: "#fef3d4"}}>
                                                        <CRow lg="12">
                                                            {i.in_out_status != 2 &&
                                                                <>
                                                                    <CSelect  className="select" custom value={i.in_hr} style={{width: "65px",marginLeft: "9px"}} onChange={(e)=>props.subInHrChange(i.employee_id,i.date,e)}>
                                                                        <option key="" value="">hr</option>
                                                                        {
                                                                            props.inHrData.length >0 &&
                                                                                props.inHrData.map(i => {
                                                                                    return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                        }
                                                                    </CSelect>
                                                        
                                                        
                                                                    <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} value={i.in_min} onChange={(e)=>props.subInMinChange(i.employee_id,i.date,e)}>
                                                                        <option key="" value="">min</option>
                                                                        {
                                                                            props.inMinData.length >0 &&
                                                                                props.inMinData.map(i => {
                                                                                    return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                        }
                                                                    </CSelect>
                                                                </>
                                                            }
                                                            {i.in_out_status == 2 &&
                                                                <>
                                                                    <CSelect  className="select" custom value={i.in_hr} style={{width: "65px",marginLeft: "9px"}} onChange={(e)=>props.subInHrChange(i.employee_id,i.date,e)} disabled>
                                                                        <option key="" value="">hr</option>
                                                                    </CSelect>
                                                        
                                                        
                                                                    <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} value={i.in_min} onChange={(e)=>props.subInMinChange(i.employee_id,i.date,e)} disabled>
                                                                        <option key="" value="">min</option>
                                                                    </CSelect>
                                                                </>
                                                            }
                                                               
                                                        </CRow>
                                                    </td>
                                                    <td className="td-num center" width="163px" style={{background: "#d6f7df"}}>
                                                        <CRow lg="12">
                                                            {i.in_out_status != 1 &&
                                                                <>
                                                                    <CSelect  className="select" custom  style={{width: "65px",marginLeft: "9px"}} value={i.out_hr} onChange={(e)=>props.subOutHrChange(i.employee_id,i.date,e)}>
                                                                        <option key="" value="">hr</option>
                                                                        {
                                                                            props.outHrData.length >0 &&
                                                                                props.outHrData.map(i => {
                                                                                    return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                        }
                                                                    </CSelect>
                                                            
                                                            
                                                                    <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} value={i.out_min} onChange={(e)=>props.subOutMinChange(i.employee_id,i.date,e)}>
                                                                        <option key="" value="">min</option>
                                                                        {
                                                                            props.outMinData.length >0 &&
                                                                                props.outMinData.map(i => {
                                                                                    return( <option key={i.id} name={i.id} value={i.id}>{ i.id }</option>)})
                                                                        }
                                                                    </CSelect>
                                                                </>
                                                            }
                                                            {i.in_out_status == 1 &&
                                                                <>
                                                                    <CSelect  className="select" custom  style={{width: "65px",marginLeft: "9px"}} value={i.out_hr} onChange={(e)=>props.subOutHrChange(i.employee_id,i.date,e)} disabled>
                                                                        <option key="" value="">hr</option>
                                                                    </CSelect>
                                                                    <CSelect  className="select" custom  style={{width: "70px", marginLeft: "5px"}} value={i.out_min} onChange={(e)=>props.subOutMinChange(i.employee_id,i.date,e)} disabled>
                                                                        <option key="" value="">min</option>
                                                                    </CSelect>
                                                                </>
                                                            }
                                                            
                                                        </CRow>
                                                    </td>
                                                    <td className="td-num right" width="220px">
                                                        <CInput type="text" style={{width: "200px"}} id="sub-description" value={i.description} onChange={(e)=>props.subDescriptionChange(i.employee_id,i.date,e)}/>
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
    </>
    );
}
export default SettingTable;
