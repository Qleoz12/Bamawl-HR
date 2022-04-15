/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCard, CCol, CRow, CImg } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const EmployeeOvertimeRegistrationOvertimeTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        overtimeTable,
        selectedOTData,
    } = props

    return (<>
        {
            !isEmpty(overtimeTable) && selectedOTData != "" &&
            <CCard className='table-panel'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div id="lblTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", overtimeTable.length)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th width=""  >
                                            <div id="tblNo" className="text-nowrap text-left align-middle" style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('No')}
                                            </div>
                                        </th>
                                        <th id="tblOvertimeTitle" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Overtime')}
                                            </div>
                                        </th>
                                        <th id="tblShiftName" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Shift Name')}
                                            </div>
                                        </th>
                                        <th id="tblOTType" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('OT Type')}
                                            </div>
                                        </th>
                                        <th id="tblBasedOn" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Based On')}
                                            </div>
                                        </th>
                                        <th id="tblMethod" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Method')}
                                            </div>
                                        </th>
                                        <th id="tblMultiplyRate" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Mulitiply Rate')}
                                            </div>
                                        </th>
                                        <th id="tblExtraAddition" className="text-nowrap text-left align-middle"  >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                {t('Extra Addition')}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        overtimeTable.map((i, index) => {
                                            return (
                                                <tr key={index} width="100%">
                                                    <td width="" className="td-no" style={{ textAlign: "right" }}>
                                                        {index + 1}
                                                    </td>
                                                    <td width="auto" className="" style={{ textAlign: "left", maxWidth: "300px" }}>
                                                        {i.overtime_name}
                                                    </td>
                                                    <td width="auto" className=" td-green" style={{ textAlign: "left" }}>
                                                        {i.sn_name}
                                                    </td>
                                                    <td width="10%" className="td-pink" style={{ textAlign: "left" }}>
                                                        {i.setting_type}
                                                    </td>
                                                    <td width="20%" className="" style={{ textAlign: "left" }}>
                                                        {i.calculate_methods}
                                                    </td>
                                                    <td width="15%" className=" td-blue" style={{ textAlign: "left" }}>
                                                        {i.based_on_salary}
                                                    </td>
                                                    <td width="10%" className="" style={{ textAlign: "right" }}>
                                                        {i.m_factor}
                                                    </td>
                                                    <td width="10%" className="" style={{ textAlign: "right" }}>
                                                        {i.e_addition}
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
export default EmployeeOvertimeRegistrationOvertimeTable;
