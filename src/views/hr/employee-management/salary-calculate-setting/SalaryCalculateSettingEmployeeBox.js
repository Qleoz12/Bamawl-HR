import { CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SalaryCalculateSettingEmployeeBox = props => {
    let { employeeID, employeeCode, employeeName} = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" style={{ marginBottom: '10px' }}>
            <CCol lg="4" className="border-right pl-0">
                <label id="lbEmployeeID" className="ml-3" >{t('Employee ID')}</label><br />
                <div className="text-muted ml-3">
                    {employeeID}
                </div>
            </CCol>
            <CCol lg="4" className="border-right pl-0">
                <label id="lbEmployeeCode" className="ml-3">{t('Employee Code')}</label><br />
                <div className="text-muted ml-3">
                    {employeeCode}
                </div>
            </CCol>
            <CCol lg="4" className="pl-0">
                <label id="lbEmployeeName" className="ml-3">{t('Employee Name')}</label><br />
                <div className="text-muted ml-3">
                    {employeeName}
                </div>
            </CCol>
        </CRow>
        <br/>
    </>
    );
}
export default SalaryCalculateSettingEmployeeBox;