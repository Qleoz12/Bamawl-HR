import { CCol, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SalaryTransferSettingEmployeeBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable.map((i, index) => {
                return (<Fragment key={index}>
                    <CRow lg="12" style={{ marginBottom: '10px' }}>
                        <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                            <label id="lbEmployeeId" className="ml-3">{t('Employee ID')}</label><br />
                            <div id="txtEmployeeId" className="autocomplete-wrapper ml-3" style={{ display: "grid" }}>
                                {i.employee_id}
                            </div>
                        </CCol>
                        <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
                            <label id="lbEmployeeCode" className="ml-3">{t('Employee Code')}</label><br />
                            <div id="txtEmployeeCode" className="autocomplete-wrapper ml-3" style={{ display: "grid" }}>
                                {i.emp_code}
                            </div>
                        </CCol>
                        <CCol lg="4">
                            <label id="lbEmployeeName" className="ml-3">{t('Employee Name')}</label><br />
                            <div id="txtEmployeeName" className="autocomplete-wrapper ml-3" style={{ display: "grid" }}>
                                {i.emp_name}
                            </div>
                        </CCol>
                    </CRow>
                </Fragment>
                );
            })
        }
    </>
    );
}
export default SalaryTransferSettingEmployeeBox;