import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const IndividualWorkingHourCheckTable = props => {
  let {
    mainTable
  } = props;
  const { t } = useTranslation();

  return (
    <>
      {
        mainTable != "" &&
        <CCard className='table-panel'>
          <CRow id="table">
            <CCol lg="12">
              <div className="table-responsive">
                <table className="table purchase-order-list" aria-label="simple table">
                  <thead id="thead-id">
                    <tr width="100%">
                      <th id="tblEmployeeID" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Employee ID')}
                      </th>
                      <th id="tblEmployeeCode" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }} rowSpan="2">
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Employee Code')}
                      </th>
                      <th id="tblEmployeeName" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Employee Name')}
                      </th>
                      <th id="tblTotalWorkingDay" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Total Working Day')}
                      </th>
                      <th id="tblTotalAttendanceDay" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Total Attendance Day')}
                      </th>
                      <th id="tblTotalWorkingHours" width="" className="basicSalaryList tableTh" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Total Working Hours')}
                      </th>
                      <th id="tblTotalAttendanceHours" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Total Attendance Hours')}
                      </th>
                      <th id="tblConfirmedOTHours" className="basicSalaryList tableTh" width="" style={{ textAlign: 'left', verticalAlign: "middle" }}>
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date"/>
                        {t('Confirmed OT Hours')}
                      </th>
                    </tr>
                  </thead>
                  <tbody >
                  {
                    props.mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        <tr  width="100%">
                          <td width=""  style={{backgroundColor:'#F1F3F8', textAlign: "right" }}>
                            {i.employee_id}
                          </td>
                          <td width=""  style={{backgroundColor:'#F1F3F8', textAlign: "left" }}>
                            {i.employee_code}
                          </td>
                          <td width=""  style={{maxWidth: "250px", backgroundColor:'#F1F3F8', textAlign: "left" }}>
                            {i.employee_name}
                          </td>
                          <td width="" className="td-green" style={{ textAlign: "right" }}>
                            {i.total_working_day == null ? "-" : i.total_working_day}
                          </td>
                          <td width="" className="td-pink" style={{ textAlign: "right" }}>
                            {i.total_attendance_days == null ? "-" : i.total_attendance_days}
                          </td>
                          <td width="" className="td-orange" style={{ textAlign: "center" }}>
                            {i.total_working_hours == null ? "-" : i.total_working_hours}
                          </td>
                          <td width="" className="td-blue" style={{ textAlign: "center" }}>
                            {i.total_attendance_hours == null ? "-" : i.total_attendance_hours}
                          </td>
                          <td width="" style={{backgroundColor:'#F1F3F8', textAlign: "center" }}>
                            {i.total_confirmed_overtime_hours == null ? "-" : i.total_confirmed_overtime_hours}
                          </td>
                        </tr>
                      </Fragment>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CCol>
          </CRow><br />
        </CCard>
      }
    </>
  )
}

export default IndividualWorkingHourCheckTable
