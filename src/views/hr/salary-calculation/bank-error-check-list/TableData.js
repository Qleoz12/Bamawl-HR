import React from 'react';
import {
  CCard,
  CCol,
  CRow,
  CImg,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

/**
 * @author Su Pyae Maung
 * @create 18/06/2021
 * @param  {*} props
 * @returns output shown in web page
 */
 const TableData = props => {
    const{t} = useTranslation();
    return (<>
            {props.mainTable != ""  &&
            <CCard className='table-panel' style={{border:'1px solid #E6E6E6',borderRadius:'10px',paddingTop:"15px"}}>
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
                                <th style={{minWidth: '3.5rem'}}>
                                    { t('No') }
                                </th>
                                <th style={{minWidth: '15rem'}}>
                                    { t('Date') }
                                </th>
                                <th style={{minWidth: '10rem'}}>
                                    { t('Salary') }
                                </th>
                                <th style={{minWidth: '10rem'}}>
                                    { t('Bank Name') }
                                </th>
                                <th style={{minWidth: '7rem'}}>
                                    { t('Currency') }
                                </th>
                                <th style={{minWidth: '15rem'}}>
                                    { t('Bank Account') }
                                </th>
                                <th style={{minWidth: '7.5rem'}}> 
                                    { t('Employee ID') }
                                </th>
                                <th style={{minWidth: '10rem'}}>
                                    { t('Employee Code') }
                                </th>
                                <th style={{minWidth: '10rem'}}>
                                    { t('Employee Name') }
                                </th>
                                <th style={{minWidth: '15rem'}}>
                                    { t('Expection') }
                                </th>
                            </tr>
                            }
                            </thead>
                            <tbody >
                            {
                            props.mainTable != ""  &&
                            props.mainTable.map((i,index) => {
                                return(
                                <tr key={index}>
                                    <td className="td-no" style={{textAlign:"center"}}>
                                        {index+1}
                                    </td>
                                    <td style={{textAlign:"center",wordBreak:"break-all"}}>
                                        {i.date}
                                    </td>
                                    <td className="bg-green" >
                                        {i.salary}
                                    </td>
                                    <td >
                                        {i.bank_name}
                                    </td>
                                    <td >
                                        {i.currency}
                                    </td>
                                    <td className="bg-pink" >
                                        {i.bank_account}
                                    </td>
                                    <td style={{textAlign:"right"}}>
                                        {i.employee_id}
                                    </td>
                                    <td style={{textAlign:"left"}}>
                                        {i.employee_code}
                                    </td>
                                    <td style={{textAlign:"left"}}>
                                        {i.employee_name}
                                    </td>
                                    <td style={{color:"red"}}>
                                        {i.excreption}
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
            }
            </>
        );  
}
export default TableData;