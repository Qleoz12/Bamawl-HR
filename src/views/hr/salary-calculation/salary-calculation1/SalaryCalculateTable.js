import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRow, CCol, CImg, CButton, CInput } from '@coreui/react';

const SalaryCalculateTable = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0 &&
            <div className="mt-4" style={{border:'1px solid #E6E6E6',borderRadius:'20px'}}>
                <CRow className="mt-5 mb-4 ml-2 mr-2">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th rowSpan="3" style={{ minWidth: '7.5rem' }}>
                                            { t('Employee ID') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Employee Code') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Employee Name') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '13.75rem' }}>
                                            { t('Position') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Total Working Day') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Total Attendance Day') }
                                        </th>
                                        <th colSpan={props.allLeave}>{ t('All Leave') }</th>
                                        <th colSpan="3">{ t('Overtime') }</th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Late Early Day') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Late Early Time') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Deduct Late Early Day') }
                                        </th>
                                        <th rowSpan="3" style={{ minWidth: '9.375rem' }}>
                                            { t('Deduct Late Early Time') }
                                        </th>
                                    </tr>
                                    <tr>
                                        {
                                            props.leave.map((item, index) => {
                                                return(
                                                    <th key={index} colSpan={item.total_column} className="top-border">{ t(item.leave_name) }</th>
                                                )
                                            })
                                        }

                                        <th rowSpan="2" className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Working Day OT') }</th>
                                        <th rowSpan="2" className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Holiday OT') }</th>
                                        <th rowSpan="2" className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Total OT Hour') }</th>
                                    </tr>
                                    <tr>
                                        {
                                            props.leave.map((item, index) => {
                                                return(<>
                                                    {
                                                        parseInt(item.total_column) === 5 &&
                                                        <>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Taken(days)') }</th>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Remain Day') }</th>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Leave Adjustment') }</th>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Comment') }</th>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Total Remain Day') }</th>
                                                        </>
                                                    }
                                                    {
                                                        parseInt(item.total_column) === 2 &&
                                                        <>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Taken(days)') }</th>
                                                            <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Remain Day') }</th>
                                                        </>
                                                    }
                                                    {
                                                        parseInt(item.total_column) === 1 &&
                                                        <th className="top-border" style={{ minWidth: '9.375rem' }}>{ t('Taken(days)') }</th>
                                                    }
                                                </>)
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no text-right" style={{ minWidth: '100px' }}>
                                                        {i.employee_id}
                                                    </td>
                                                    <td className="text-left" style={{ minWidth: '110px' }}>
                                                        {i.employee_code}
                                                    </td>
                                                    <td className="text-left" style={{ minWidth: '110px' }}>
                                                        {i.employee_name}
                                                    </td>
                                                    <td className="text-left bg-peach" style={{ minWidth: '110px' }}>
                                                        {i.position}
                                                    </td>
                                                    <td className="text-right bg-blue" style={{ minWidth: '110px' }}>
                                                        {i.total_working_day}
                                                    </td>
                                                    <td className="text-right bg-pink" style={{ minWidth: '110px' }}>
                                                        {i.total_attendance_day}
                                                    </td>

                                                    {
                                                        i.leave_type.map((ii,index2) => {
                                                            return(<>
                                                                {
                                                                    parseInt(ii.total_column) === 5 &&
                                                                    <>
                                                                        <td className="text-right">
                                                                            {ii.taken_day}
                                                                        </td>
                                                                        <td className="text-right">
                                                                            {ii.remain_day}
                                                                        </td>
                                                                        {
                                                                            i.check_disable === false &&
                                                                            <>
                                                                                <td className="text-center">
                                                                                    <CInput size="sm" type="number" value={ii.leave_adjustment} onChange={e=>props.changeLeave('leave_adjustment', i, ii, e)} />
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    <CInput size="sm" value={ii.comment} onChange={e=>props.changeLeave('comment', i, ii, e)} />
                                                                                </td>
                                                                            </>
                                                                        }
                                                                        {
                                                                            i.check_disable === true &&
                                                                            <>
                                                                                <td className="text-center">
                                                                                    <CInput className="bg-for-disabled" size="sm" value="" disabled/>
                                                                                </td>
                                                                                <td className="text-center">
                                                                                    <CInput className="bg-for-disabled" size="sm" value="" disabled/>
                                                                                </td>
                                                                            </>
                                                                        }
                                                                        <td className="text-right bg-blue">
                                                                            {ii.total_remain_day}
                                                                        </td>
                                                                    </>
                                                                }

                                                                {
                                                                    parseInt(ii.total_column) === 2 &&
                                                                    <>
                                                                        <td className="text-right">
                                                                            {ii.taken_day}
                                                                        </td>
                                                                        <td className="text-right">
                                                                            {ii.remain_day}
                                                                        </td>
                                                                    </>
                                                                }

                                                                {
                                                                    parseInt(ii.total_column) === 1 &&
                                                                    <td className="text-right">
                                                                        {ii.taken_day}
                                                                    </td>
                                                                }
                                                            </>)
                                                        })
                                                    }
                                                    <td className="text-right">
                                                        {i.overtime_Working_day_hour}
                                                    </td>
                                                    <td className="text-right">
                                                        {i.overtime_Holiday_hour}
                                                    </td>
                                                    <td className="text-right bg-blue">
                                                        {i.overtime_Total_hour}
                                                    </td>
                                                    <td className="text-right bg-blue">
                                                        {i.late_early}
                                                    </td>
                                                    <td className="text-right bg-blue">
                                                        {i.late_early_time}
                                                    </td>
                                                    <td className="text-right bg-blue">
                                                        {i.deduct_late_early}
                                                    </td>
                                                    <td className="text-right bg-blue">
                                                        {i.deduct_late_early_time}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>


                        <CRow alignHorizontal="center" className="mt-4 mb-2">
                            <CButton className="form-btn m-2" onClick={props.export}>{t('Export')}</CButton>
                            <CButton className="form-btn m-2" onClick={props.saveAndNext}>{t('Save & Next')}</CButton>
                        </CRow>

                    </CCol>
                </CRow>
            </div>
        }
    </>)
}

export default SalaryCalculateTable
