import { CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeLeaveSettingEmployeeBox = props => {
    let {
        employeeData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" style={{ marginBottom: '30px' }}>
            <CCol lg="4" className="verticle-line">
                <label >{t('Employee ID')}</label><br />
                <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }} >
                    {employeeData.employee_id}
                </div>
            </CCol>
            <CCol lg="4" className="verticle-line">
                <label >{t('Employee Code')}</label><br />
                <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }} >
                    {employeeData.emp_code}
                </div>
            </CCol>
            <CCol lg="4" >
                <label >{t('Employee Name')}</label><br />
                <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }} >
                    {employeeData.emp_name}
                </div>
            </CCol>
        </CRow>
    </>
    );
}
export default EmployeeLeaveSettingEmployeeBox;
