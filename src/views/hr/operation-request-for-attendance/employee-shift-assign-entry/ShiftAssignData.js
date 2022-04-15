import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 24/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const ShiftAssignData=props=> {
    const{t} = useTranslation();
    return (<> 
        <CRow lg="12" style={{margin:'2px'}}>
            <CCol lg="4">
                    <CLabel className="required">{t('Shift Name')}</CLabel>
                    <CSelect onChange={props.shiftChange} value={props.shiftName} className="bamawl-select" custom >
                        <option key="" value="">{t('Select Shift Name')}</option>
                            {props.shiftNameAPI != "" &&
                                props.shiftNameAPI.map((shift,index)=>{
                                    return(
                                        <option key={index} value={shift.id}>{shift.sn_name}</option>
                                    )
                                })
                            }
                    </CSelect>
            </CCol>
        </CRow><br/>
        <CRow lg="12" style={{margin:'2px'}}>
            <CCol>
                <CImg id="shitAdd" src={'/avatars/Add Allowance .png'} style={{width:"30px", height:"30px",cursor:"pointer"}} alt="puls icon" onClick={props.addShiftData} />
                <CLabel htmlFor="shitAdd" style={{marginLeft:"10px"}}>{t('Shift Assign Date List')}</CLabel>
            </CCol>
        </CRow>
        {props.shiftAssignTable.length > 0  && 
            <>
            <div style={{backgroundColor:'#FAFBFC',border:'1px solid #E6E6E6',borderRadius:'3px',margin:"20px"}}>
                <CCard className='table-panel' style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"15px",paddingTop:"15px"}}>
                    <CRow id="table">
                            <CCol lg="12">
                            <div className="table-responsive" >
                                <table className="table">
                                    <thead>
                                        {
                                        <tr>
                                            <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '3.5rem'}} >
                                                { t('No') }
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                { t('Shift Assign Day') }
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '10rem'}} >
                                                { t('Shift Assign Date') }
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle',minWidth: '5rem'}} >
                                                { t('Remove') }
                                            </th>
                                        </tr>
                                        }
                                    </thead>
                                    <tbody >
                                    {
                                        props.shiftAssignTable.length > 0  &&
                                        props.shiftAssignTable.map((i,index) => {
                                            return(
                                            <tr key={index}> 
                                                <td className="td-no" style={{textAlign:"center"}}>
                                                    {index+1}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#E5F6F5'}}>
                                                    {i.name}
                                                </td>
                                                <td style={{textAlign:"center",backgroundColor:'#F7DAF7'}}>
                                                    {i.date}
                                                </td>
                                                <td>
                                                    <CImg 
                                                        src={'/avatars/remove.png'} 
                                                        className="icon-clt" 
                                                        alt="remove" 
                                                       onClick={()=>props.removeShift(i.id)}
                                                    />
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
        <CRow alignHorizontal="center">
            {props.shiftAssignTable.length > 0  &&
                <CButton className="form-btn" onClick={props.saveData}>{t('Save')}</CButton> 
            }
        </CRow><br/>
    </>
    );
}
export default ShiftAssignData;