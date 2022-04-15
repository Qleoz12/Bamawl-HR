import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRow, CCol, CImg, CButton } from '@coreui/react';

const Table = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0 &&
            <div style={{backgroundColor:'#FCFCFC',border:'1px solid #E6E6E6',borderRadius:'20px'}}>
                <CRow className="mt-4 mb-4 ml-1 mr-1">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive" id="topToBottom">
                            <table className="table" aria-label="simple table">
                                <thead>
                                    <tr width="100%">
                                        <th>
                                            <input type="checkbox" value="allcheck" checked={props.allChecked} onChange={props.change} />
                                        </th>
                                        <th>
                                            { t('No') }
                                        </th>
                                        <th>
                                            { t('Employee ID') }
                                        </th>
                                        <th>
                                            { t('Employee Code') }
                                        </th>
                                        <th>
                                            { t('Employee Name') }
                                        </th>
                                        <th>
                                            { t('Delete Time') }
                                        </th>
                                        <th>
                                            { t('Status') }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no">
                                                        <input type="checkbox"
                                                            value={i.attendance_id}
                                                            checked={i.is_checked}
                                                            onChange={props.change}
                                                        />
                                                    </td>
                                                    <td style={{textAlign:"center"}}>
                                                        {index+1}
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
                                                    <td style={{textAlign:"center"}}>
                                                        {i.delete_time}
                                                    </td>
                                                    <td className="td-blue" style={{textAlign:"left"}}>
                                                        {i.status}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <CRow alignHorizontal="center" className="mt-4 mb-2">
                            <CButton className="form-btn" onClick={props.delete}>{t('Delete')}</CButton>
                        </CRow>
                    </CCol>
                </CRow>
            </div>
        }
    </>)
}

export default Table
