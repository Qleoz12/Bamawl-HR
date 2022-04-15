import React from 'react';
import {CCard, CCol, CRow, CImg,CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableListData=props=> {
    const{t} = useTranslation();
    return (<>
        {
        props.mainTable.length > 0 &&
        <div style={{border:'1px solid #E6E6E6',borderRadius:'10px',padding:"15px 5px",marginTop:"25px"}}>
            <CCard className='table-panel'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{t('Total Rows: ')}{props.rowCount}{t(' Row(s)')}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {
                                    <tr>
                                        <th style={{textAlign:'center',minWidth: '3.5rem'}}>
                                            <input type="checkbox" value="all-check" checked={props.AllCheck === true} onChange={props.change_checkbox} />
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
                                        { t('Position Name') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                        { t('Posted Date') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '15rem'}} >
                                        { t('Title') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                        { t('Start Date') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '10rem'}} >
                                        { t('Last Date') }
                                        </th>
                                        <th style={{textAlign:'center',minWidth: '5rem'}} >
                                        { t('Edit') }
                                        </th>
                                    </tr>
                                    }
                                </thead>
                                <tbody >
                                {
                                    props.mainTable.length > 0  &&
                                    props.mainTable.map((i,index) => {
                                        let post_date = i.updated_at.slice(0,10);
                                        let from_date = i.announcement_from_date.slice(0,10);
                                        let last_date = i.announcement_to_date.slice(0,10);
                                        let flag = "";
                                        if(props.currentDate > last_date){
                                            flag = true;
                                        }else{
                                            flag = false;
                                        }
                                        let idArr = [];let codeArr = [];let nameArr = [];
                                        let deptArr = [];let posArr = [];
                                        i.announcement_employee.map((j,idx)=>{
                                            idArr.push(j.employee_id);
                                            codeArr.push(j.code);
                                            nameArr.push(j.name);
                                            deptArr.push(j.department_name);
                                            posArr.push(j.position_name); 
                                        })
                                        let department = deptArr.toString();
                                        return(<>
                                            <tr key={index}>
                                                { flag == true &&
                                                    <td className="td-no" style={{textAlign:"center"}} >
                                                        <input type="checkbox" disabled />
                                                    </td> 
                                                }
                                                {flag == false &&
                                                    <td className="td-no" style={{textAlign:"center"}} >
                                                        <input type="checkbox" value={i.id} id={i.id} checked={i.is_checked === true} onChange={props.change_checkbox} />
                                                    </td>
                                                }
                                                <td style={{textAlign:"right"}}>
                                                    {idArr}
                                                </td>
                                                <td style={{textAlign:"left"}}>
                                                    {codeArr}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#D6F883'}}>
                                                    {nameArr}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#FADEE6', wordBreak: "break-all" }}>
                                                    {department}
                                                </td>
                                                <td style={{textAlign:"left",backgroundColor:'#FEF3D4'}}>
                                                    {posArr}
                                                </td>
                                                <td style={{textAlign:"center",backgroundColor:'#F7DAF7'}} >
                                                    {post_date}
                                                </td>
                                                <td style={{textAlign:"left"}} >
                                                    {i.announcement_title}
                                                </td>
                                                <td style={{textAlign:"center",backgroundColor:'#FEF3D4'}}>
                                                    {from_date}
                                                </td>
                                                <td style={{textAlign:"center",backgroundColor:'#F7DAF7'}} >
                                                    {last_date}
                                                </td>
                                                { flag == true && 
                                                <td>-</td>
                                                }  
                                                { flag == false &&
                                                    <td>
                                                    <CImg 
                                                        // id = {i.id}
                                                        // value={i.id}
                                                        src={'/avatars/edit.png'} 
                                                        className="icon-clt" 
                                                        alt="edit" 
                                                        onClick={props.edit.bind(this,i.id)}
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
            <CRow alignHorizontal="center">
            { props.deleteShow == true && <>
                <CButton className="form-btn" id='deleteBtn' name='deleteBtn' onClick={props.deleteToggleAlert}>
                    {t('Delete')}
                </CButton>
            </>}
            </CRow>
        </div>
        }
    </>
    );
}
export default TableListData;