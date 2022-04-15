import React from 'react';
import {CCard, CCol, CRow, CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 07/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableData=props=> {
    const{t} = useTranslation();
    return (<>
        {props.calculateCheck === true &&
            props.mainTable.length > 0  &&
            <CCard className='table-panel'style={{border:'1px solid #E6E6E6',borderRadius:'10px',margin:"10px 0px 0px",padding:"10px"}}>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{t("Total Rows").replace('%s', props.rowCount)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {
                                    <tr>
                                        <th style={{textAlign:'center',minWidth: '3.5rem'}} >
                                            { t('No') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '7.5rem'}} >
                                            { t('Employee ID') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                            { t('Employee Code') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                            { t('Employee Name') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '15rem'}} >
                                            { t('Department Name') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                            { t('Joined Date') }
                                        </th>
                                        {(props.editID === "" || props.editID === null) && 
                                            <th style={{textAlign:'center',minWidth: '5rem'}}>
                                                { t('Remove') }
                                            </th>
                                        }
                                    </tr>
                                    }
                                </thead>
                                <tbody>
                                {
                                    props.mainTable.length > 0  &&
                                    props.mainTable.map((i,index) => {
                                        let deptArr = [];
                                        i.departments.map((j,idx)=>{
                                            deptArr.push(j.department_name);
                                        })
                                        let department = deptArr.toString();
                                        return(<>
                                            <tr key={index} >
                                                <td className="td-no" style={{textAlign:"center"}} >
                                                    {index+1}
                                                </td> 
                                                <td style={{textAlign:"right"}} >
                                                    {i.employee_id}
                                                </td>
                                                <td className="bg-blue" style={{textAlign:"left"}} >
                                                    {i.employee_code}
                                                </td>
                                                <td className="bg-peach" style={{textAlign:"left"}} >
                                                    {i.employee_name}
                                                </td>
                                                <td style={{textAlign:"left"}}>
                                                    {department}
                                                </td>
                                                <td className="bg-pink" style={{textAlign:"center"}} >
                                                    {i.join_date}
                                                </td>
                                                {(props.editID === "" || props.editID === null) && 
                                                <td >
                                                    <CImg 
                                                        // id = {i.employee_id}
                                                        // value={i.employee_id}
                                                        src={'/avatars/remove.png'} 
                                                        className="icon-clt" 
                                                        alt="remove" 
                                                        onClick={()=>props.remove(i.employee_id)}
                                                    />
                                                </td>
                                                }
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
        }
    </>
    );
}
export default TableData;