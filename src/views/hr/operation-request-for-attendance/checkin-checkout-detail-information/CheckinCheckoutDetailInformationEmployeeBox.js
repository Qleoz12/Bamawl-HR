import { CCol, CInput, CLabel, CRow } from '@coreui/react';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const CheckinCheckoutDetailInformationEmployeeBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable.map((i, index) => {
                return (<Fragment key={index}>
                     <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1", color: "#ababab" }}>
                                <label id="lbEmployeeId" className="">{t('Employee ID')}</label><br />
                                <CInput id="txtEmployeeId" className="bamawl-input" value={i.employee_id} disabled />
                            </CCol>
                            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1", color: "#ababab" }}>
                                <label id="lbEmployeeCode" className="">{t('Employee Code')}</label><br />
                                <CInput id="txtEmployeeCode" className="bamawl-input" value={i.code ? i.code : ""} disabled />
                            </CCol>
                            <CCol lg="4" style={{ color: "#ababab" }}>
                                <label id="lbEmployeeName" className="">{t('Employee Name')}</label><br />
                                <CInput id="txtEmployeeName" className="bamawl-input" value={i.name} disabled />
                            </CCol>
                        </CRow>
                    <CRow lg="12" style={{ marginBottom: '10px' }}>
                            <CCol lg="5" style={{ color: "#ababab" }}>
                                <label id="lbDepartment" className="">{t('Department')}</label><br />
                                {i.employee_has_dept_position.map((sec, idx) => {
                                    return (<Fragment key={idx}>
                                        <CInput id="txtDepartment" className="bamawl-input" value={sec.departments.department_name} disabled />
                                    </Fragment>);
                                })
                            }
                        </CCol>
                        <CCol lg="1" className="verticle-line" />
                        <CCol lg="1" />
                        <CCol lg="5" style={{ color: "#ababab" }}>
                            <label className="">{t('Position')}</label><br />
                            {i.employee_has_dept_position.map((sec, idx) => {
                                return (<Fragment key={idx}>
                                    <CInput className="bamawl-input" value={sec.positions.position_name} disabled />
                                </Fragment>);
                            })
                            }
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{ marginBottom: '10px' }}>
                        <CCol lg="5" className="" style={{ color: "#ababab" }}>
                            <CLabel id="lbAttendanceTime" className="">{t('Attendance Time')}</CLabel>
                            <CInput id="txtAttendanceTime" className="bamawl-input" value={i.attendance_time} disabled />
                        </CCol>
                        <CCol lg="1" className="verticle-line" />
                        <CCol lg="1" />
                        <CCol lg="5" style={{ color: "#ababab" }}>
                            <label id="lbStatus" className="">{t('Attendance Status')}</label><br />
                            <CInput id="txtStatus" className="bamawl-input" value={i.status} disabled />
                        </CCol>
                    </CRow>
                </Fragment>
                );
            })
        }
    </>
    );
}
export default CheckinCheckoutDetailInformationEmployeeBox;