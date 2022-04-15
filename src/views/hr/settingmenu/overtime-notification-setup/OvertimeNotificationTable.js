/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import { CCard, CCol, CRow, CImg } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const OvertimeNotificationTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainTable != "" &&
            <CCard className='table-panel'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div id="lbTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", props.rowCount)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="tblNo" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('No')}
                                        </th>
                                        <th id="tblEmplyeeID" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('Employee ID')}
                                        </th>
                                        <th id="tblEmployeeCode" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('Employee Code')}
                                        </th>
                                        <th id="tblEmployeeName" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('Employee Name')}
                                        </th>
                                        <th id="tblDepartment" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('Department Name')}
                                        </th>
                                        <th id="tblJoinDate" width="" className="text-nowrap text-left align-middle" >
                                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                            {t('Joined Date')}
                                        </th>
                                        {props.editData == "" &&
                                            <th width="" id="removeData" className="text-nowrap text-left align-middle">
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                {t('Remove')}
                                            </th>
                                        }
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                <>
                                                    {i.departments.map((sec, idx) => {
                                                        return (<Fragment key={idx}>
                                                            <tr key={index} width="100%">
                                                                {idx == 0 && <>
                                                                    <td width="" className={props.mainTable.length - 1 === index
                                                                        ? "td-num td-no text-right border-bottom-left-radius" : "td-num td-no text-right"} style={{ textAlign: "right" }} rowSpan={i.departments.length}>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td width="" className="td-emp-id" style={{ textAlign: "right" }} rowSpan={i.departments.length}>
                                                                        {i.employee_id}
                                                                    </td>
                                                                    <td width="" className="td-emp-code" style={{ textAlign: "left" }} rowSpan={i.departments.length}>
                                                                        {i.employee_code}
                                                                    </td>
                                                                    <td width="" className="td-emp-name td-green" style={{ textAlign: "left", maxWidth: "300px" }} rowSpan={i.departments.length}>
                                                                        {i.employee_name}
                                                                    </td>
                                                                </>
                                                                }
                                                                <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left" }}>
                                                                    {sec.department_name}
                                                                </td>

                                                                {idx == 0 && <>
                                                                    <td width="" className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} rowSpan={i.departments.length}>
                                                                        {i.joined_date.substring(0, 10)}
                                                                    </td>
                                                                    {props.editData == "" &&
                                                                        <td width="" id="removeData" className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} rowSpan={i.departments.length}>
                                                                            <input
                                                                                type="image"
                                                                                id="lblRemove"
                                                                                src={'avatars/remove.png'}
                                                                                className="icon-clt"
                                                                                alt="remove"
                                                                                onClick={props.removeRow.bind(this, i)}
                                                                            />
                                                                        </td>
                                                                    }
                                                                </>
                                                                }
                                                            </tr>
                                                        </Fragment>
                                                        )
                                                    })
                                                    }
                                                </>
                                            </Fragment>
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
export default OvertimeNotificationTable;
