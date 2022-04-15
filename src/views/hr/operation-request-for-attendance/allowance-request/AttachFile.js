/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CInputFile, CTooltip, CInput,CFormGroup} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
/**
 * @author Zin Min Myat
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const AttachFile=props=> {
    const{t} = useTranslation();
    return (<>
        {
            <>
            <CRow lg="12">
                <CCol lg="3" className="mt-5">
                    <CImg src={'/avatars/list.png'} className="" alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
                    <CLabel style={{fontWeight:'bold',marginLeft:"10px"}}>{t('Attach File')}</CLabel>
                </CCol>  
            </CRow>
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-3' style={{backgroundColor: "rgb(252, 252, 252)",border: "rgb(252, 252, 252)"}}>
                    
                    <CRow alignHorizontal="start" lg="12">
                        <CLabel htmlFor="importExcel" className=" pointer">
                            <CRow lg="12">
                                <CImg src="/avatars/attach.png" className="excel-image pointer" style={{marginTop: "0px"}} block/>
                                <p htmlFor="importExcel" className="pointer m-left-10 m-top-5 italic" style={{color: "#bfbfbf"}}>{t('Drag & Drop files to attach or')}&nbsp;</p><p htmlFor="importExcel" className="pointer m-top-5" style={{color: "#7c83c0"}}>{t('Browse')}</p>
                            </CRow>
                            
                        </CLabel>
                        <CInputFile id="importExcel" accept=".jpeg,.png,.jpg,.pdf" className="hide" multiple onChange={props.onChange} onClick={props.onClick} required/>
                    </CRow>
                
                    {props.ExcFileName.length > 0 &&
                            <div className="" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                                <CCard className='table-panel mt-4'>
                                    <CRow id="table">
                                        <CCol lg="12">
                                            <div className="table-responsive tableFixHead">
                                                <table className=" table allowance-request-attach-file-table">
                                                    <thead className="">
                                                        <tr>
                                                            
                                                            <th width="5px" className="center" style={{textAlign:'left'}} >
                                                                { t('No') }
                                                            </th>
                                                            <th width="250px" className="center" style={{textAlign:'left'}} >
                                                                { t('Name') }
                                                            </th>
                                                            <th width="10px" className="center" style={{textAlign:'left'}} >
                                                                { t('Delete') }
                                                            </th>
                                                        
                                                        </tr>
                                                    </thead>

                                                    <tbody className="">
                                                        {
                                                            props.ExcFileName.map((i,index) => {
                                                            return(
                                                                    <tr width="100%" key={index} className="">
                                                                        
                                                                        <td className="td-num" width="10px">
                                                                            {index+1}
                                                                        </td>
                                                                        <td className="td-num left" width="100px" style={{background: "#d6f8b3"}}>
                                                                            {i}
                                                                        </td>
                                                                        <td className="td-num center" width="50px">
                                                                            <CTooltip content={t('Delete')}>
                                                                                <CImg 
                                                                                    src={'/avatars/remove.png'} 
                                                                                    className="icon-clt " 
                                                                                    alt="delete" 
                                                                                    onClick={()=>props.removeFile(i)}
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
                        }
                </CCard>
            </div>




















            </>
        }
    </>
    );
}
export default AttachFile;
