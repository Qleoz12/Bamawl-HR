/* eslint-disable no-use-before-define */
import React from 'react';
import {CCard, CLabel, CCol, CRow, CImg, CFormGroup, CButton, CInput} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
/**
 * @author Zin Min Myat
 * @create 11/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const EmployeeListTable=props=> {
    const{t} = useTranslation();
    return (<>
        {
            props.data != ""  &&
            <>

            <div className="mt-5" style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'10px',marginLeft:'10px',marginRight:'10px'}}>
                <CCard className='table-panel mt-3'>
                    <CRow id="table">
                        <CCol lg="12">
                            <div className="table-responsive tableFixHead">
                                <table className=" table forget-card-entry-employee-list-table">
                                    <thead className="">
                                        <tr>
                                            
                                            <th width="10px" className="center" style={{textAlign:'left'}} >
                                                { t('No') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee ID') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee Code') }
                                            </th>
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee Name') }
                                            </th>
                                            <th width="150px" className="center" style={{textAlign:'left'}} >
                                                { t('Department') }
                                            </th>
                                        
                                            <th width="100px" className="center" style={{textAlign:'left'}} >
                                                { t('Employee Email') }
                                            </th>
                                            <th width="50px" className="center" style={{textAlign:'left'}} >
                                                { t('Delete') }
                                            </th>
                                          
                                        </tr>
                                    </thead>

                                    <tbody className="">
                                        {
                                            props.data.map((i,index) => {
                                            return(
                                                    <tr width="100%" key={index} className="">
                                                        
                                                        <td className="td-num" width="10px">
                                                            {index+1}
                                                        </td>
                                                        <td className="td-num right" width="100px" style={{background: "#d6f8b3"}}>
                                                            {i.employee_id}
                                                        </td>
                                                        <td className="td-num right" width="100px" style={{background: "#d6f8b3"}}>
                                                            {i.employee_code}
                                                        </td>
                                                        <td className="td-num right" width="100px">
                                                            {i.employee_name}
                                                        </td>
                                                        <td className="td-num left" width="150px" style={{background: "#d6f7df"}}>
                                                            {i.department_name}
                                                        </td>
                                                       
                                                        <td className="td-num right" width="100px" >
                                                        {i.email}
                                                        </td>
                                                        <td className="td-num center" width="50px">
                                                            <CImg 
                                                                id = {i.id}
                                                                src={'/avatars/remove.png'} 
                                                                className="icon-clt " 
                                                                alt="delete" 
                                                                onClick={props.deleteBtn.bind(this,i.employee_id)}
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
    </>
    );
}
export default EmployeeListTable;
