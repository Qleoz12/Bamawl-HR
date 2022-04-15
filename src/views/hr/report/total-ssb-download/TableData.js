import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard,CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
/**
 * @author Su Pyae Maung
 * @create 14/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableData=props=> {
    const{t} = useTranslation();
    return (<>
        {props.totalSSBTable.length > 0  && <>
            <div style={{border:'1px solid #E6E6E6',borderRadius:'10px',paddingTop:"10px",marginTop:"25px"}}>
                <CRow style={{marginLeft:"15px"}} >
                    <div className="row-count-msg">{t('Total Rows: ')}{props.rowCount}{t(' Row(s)')}</div>
                </CRow>
                <CCard className='table-panel'>
                    <CRow id="table">
                            <CCol lg="12">
                            <div className="table-responsive" >
                                <table className="table">
                                    <thead>
                                    {<>
                                        <tr>
                                            <th rowSpan="3" className="table-header" style={{minWidth: '5rem'}}>
                                                { t('Sr No') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{minWidth: '10rem'}}>
                                                { t('Insurance Name') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{minWidth: '15rem'}}>
                                                { t('SSB NO') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{minWidth: '7rem'}}>
                                                { t('Payment') }
                                            </th>
                                            <th colSpan="2" className="table-header" style={{minWidth: '20rem'}}>
                                                { t('Health and Social Care Insurance System') }
                                            </th>
                                            <th className="table-header" style={{minWidth: '13rem'}}>
                                                { t('Employment Injury Benefit Insurance System') }
                                            </th>
                                            <th colSpan="3" className="table-header" style={{minWidth: '30rem'}}>
                                                { t('Total') }
                                            </th>
                                        </tr>
                                        <tr>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Employer</th>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Employee</th>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Employer</th>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Employer</th>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Employee</th>
                                            <th rowSpan="2" className="table-header top-border" style={{minWidth: '10rem'}}>Total</th>
                                        </tr>
                                    </>}
                                    </thead>
                                    <tbody >
                                    {
                                        props.totalSSBTable.length > 0  &&
                                        props.totalSSBTable.map((i,index) => {
                                            return(
                                            <tr key={index}> 
                                                <td>{ index+1 }</td>
                                                <td>{ i.employee_name }</td>
                                                <td>{ i.ssb_no }</td>
                                                <td>{ i.payment }</td>
                                                <td>{ i.employerHealthSsb }</td>
                                                <td>{ i.employeeHealthSsb }</td>
                                                <td>{ i.employerInjurySsb }</td>
                                                <td>{ i.employerTotalSsb }</td>
                                                <td>{ i.employeeTotalSsb }</td>
                                                <td>{ i.SsbTotalAmount }</td>
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
                <CRow alignHorizontal="center">
                    <CButton className="form-btn" onClick={props.exportExcel}>
                        <i className="fas fa-download icon-btn"></i> &nbsp;{t('Export Excel')}
                    </CButton>
                </CRow><br/>
            </div>
        </>}
    </>
    );
}
export default TableData;