/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import { CCard, CCol, CRow, CImg, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Moment from "moment";
const PayrollCalculationListTable = props => {
    let {
        mainTable,
        rowCount,
        editData,
        removeRow
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            mainTable.length > 0 &&
            <CCard className='table-panel box box-white'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            {
                                !editData &&
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">
                                        <p id="lbTotalRows">
                                            {t('Total Rows').replace('%s',rowCount)}
                                        </p>
                                    </div>
                                </CRow>
                            }
                        </CCol>
                        <div className={'table-responsive'}>
                            <table className="table purchase-order-list " aria-label="simple table">
                                <thead id="thead-id">
                                    {
                                        <tr width="100%">
                                            <th id="tblNo" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('No')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeID" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('Employee ID')}
                                                </div>
                                            </th>
                                            <th id="tblEmplyeeCode" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('Employee Code')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeName" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('Employee Name')}
                                                </div>
                                            </th>
                                            <th id="tblDepartment" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('Department Name')}
                                                </div>
                                            </th>
                                            <th id="tblHoinDate" width="" className="text-left">
                                                <div className="d-flex align-items-baseline text-nowrap">
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                    {t('Joined Date')}
                                                </div>
                                            </th>
                                            {!editData &&
                                                <th id="tblRemove" width="">
                                                    <div className="d-flex align-items-baseline text-nowrap">
                                                        <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                        {t('Remove')}
                                                    </div>
                                                </th>
                                            }
                                        </tr>
                                    }
                                </thead>
                                <tbody >
                                    {
                                        mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                {i.departments.map((sec, idx) => {
                                                    return (
                                                        <tr key={idx} width="100%">
                                                            {idx === 0 && <>
                                                                <td width="" className={index==mainTable.length-1?"td-no text-right border-bottom-left-radius":"td-no text-right"} rowSpan={i.departments.length}>
                                                                    {index + 1}
                                                                </td>
                                                                <td width="" className="td-emp-id text-right" rowSpan={i.departments.length}>
                                                                    {i.employee_id}
                                                                </td>
                                                                <td width="" className="td-emp-code text-left" rowSpan={i.departments.length}>
                                                                    {i.employee_code}
                                                                </td>
                                                                <td width="" className="td-emp-name td-green text-left" rowSpan={i.departments.length}>
                                                                    {i.employee_name}
                                                                </td>
                                                            </>
                                                            }
                                                            <td width="" className="td-dept td-pink text-left no-border-radius" >
                                                                {sec.department_name}
                                                            </td>
                                                            {idx === 0 && <>
                                                                <td width="" className="td-joined-date" rowSpan={i.departments.length}>
                                                                    {Moment(i.joined_date).format('YYYY-MM-DD')}
                                                                </td>
                                                                { !editData &&
                                                                    <td width="" id="removeData" className={index==mainTable.length-1?"border-bottom-right-radius":""} rowSpan={i.departments.length}>
                                                                        <input type="image" src="avatars/remove.png" className="icon-clt" alt="remove" onClick={removeRow.bind(this, i)}></input>
                                                                    </td>
                                                                }
                                                            </>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                                }
                                            </Fragment>
                                            )
                                        })}
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
export default PayrollCalculationListTable;
