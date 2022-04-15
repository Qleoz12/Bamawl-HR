/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import { CCard, CCol, CRow, CImg, CPagination, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const OvertimeListTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        mainTable,
        rowCount,
        AllCheck,
        change_checkbox,
        editToggleAlert,
        totalPage,
        currentPage,
        perPage,
        deleteToggleAlert,
        pageChange
    } = props

    return (<>
        {
            mainTable != "" &&
            <CCard className='table-panel'>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div id="lbTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", rowCount)}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    {
                                        <tr width="100%">
                                            <th style={{ textAlign: 'center', verticalAlign: "middle" }}>
                                                <input name="chkboxCheckAll" type="checkbox" value="all-check" checked={AllCheck === true} onChange={change_checkbox} style={{ cursor: "pointer" }} />
                                            </th>
                                            <th id="tblNo" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('No')}
                                                </div>
                                            </th>
                                            <th id="tblEmplyeeID" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Employee ID')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeCode" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Employee Code')}
                                                </div>
                                            </th>
                                            <th id="tblEmployeeName" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Employee Name')}
                                                </div>
                                            </th>
                                            <th id="tblDepartment" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Department Name')}
                                                </div>
                                            </th>
                                            <th id="tblJoinDate" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Joined Date')}
                                                </div>
                                            </th>
                                            <th id="tblOvertimeTitle" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Overtime Title')}
                                                </div>
                                            </th>
                                            <th id="tblOTType" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('OT Type')}
                                                </div>
                                            </th>
                                            <th id="tblOTRateperhour" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('OT Rate per hour')}
                                                </div>
                                            </th>
                                            <th id="tblEdit" className="text-nowrap text-left align-middle" >
                                                <div style={{ display: "flex", alignItems: "center" }}>
                                                    <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                                                    {t('Edit')}
                                                </div>
                                            </th>
                                        </tr>
                                    }
                                </thead>
                                <tbody >
                                    {
                                        mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                <>
                                                    {
                                                        i.department.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                <tr width="100%">
                                                                    {idx == 0 &&
                                                                        <>
                                                                            <td className={mainTable.length - 1 === index
                                                                                ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.department.length}>
                                                                                <input type="checkbox"
                                                                                    value={i.id}
                                                                                    id={i.id}
                                                                                    checked={i.is_checked === true}
                                                                                    onChange={change_checkbox}
                                                                                    style={{ cursor: "pointer" }}
                                                                                />
                                                                            </td>
                                                                            <td className="td-num" style={{ textAlign: "right", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.department.length} >
                                                                                {((currentPage - 1) * perPage) + index + 1}
                                                                            </td>
                                                                            <td width="" className="td-emp-id" style={{ textAlign: "right", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }} rowSpan={i.department.length}>
                                                                                {i.employee_id}
                                                                            </td>
                                                                            <td width="" className="td-emp-code" style={{ textAlign: "left", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }} rowSpan={i.department.length}>
                                                                                {i.employee_code}
                                                                            </td>
                                                                            <td width="" className="td-emp-name" style={{ textAlign: "left", maxWidth: "200px" }} rowSpan={i.department.length}>
                                                                                {i.employee_name}
                                                                            </td>
                                                                        </>
                                                                    }
                                                                    <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left" }}>
                                                                        {sec.department_name}
                                                                    </td>
                                                                    {idx == 0 && <>
                                                                        <td width="" className="td-joined-date" style={{backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }} rowSpan={i.department.length}>
                                                                            {i.joined_date}
                                                                        </td>
                                                                        <td width="" className="td-overtime-title" style={{ textAlign: "left", maxWidth: "200px" }} rowSpan={i.department.length}>
                                                                            {i.overtime_name}
                                                                        </td>
                                                                        <td width="" className="td-overtime-type" style={{ textAlign: "left" }} rowSpan={i.department.length}>
                                                                            {i.ot_type}
                                                                        </td>
                                                                        <td width="" className="no-border-radius" style={{ textAlign: "right", padding: "0px", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }} rowSpan={i.department.length}>
                                                                            {/* {i.ot_rate} */}
                                                                            <table>
                                                                                <tbody>
                                                                                    {
                                                                                        i.ot_rate.map((ot, temp) => {
                                                                                            return (<Fragment key={temp}>
                                                                                                <tr>
                                                                                                    <td style={{ textAlign: "left", border: "none", backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'}} >
                                                                                                        {ot}
                                                                                                    </td>
                                                                                                </tr>
                                                                                            </Fragment>)
                                                                                        })
                                                                                    }
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                        <td width="" className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} style={{backgroundColor: index%2 ? '#F1F3F8' : '#FFFFFF'  }} rowSpan={i.department.length}>
                                                                            <input
                                                                                type="image"
                                                                                id="tblEdit"
                                                                                src={'avatars/edit.png'}
                                                                                className="icon-clt"
                                                                                alt="edit"
                                                                                onClick={editToggleAlert.bind(this, i)}
                                                                            />
                                                                        </td>
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
                                        })}
                                </tbody>
                            </table>
                            {
                                mainTable != "" && totalPage > 1 &&
                                <CPagination
                                    dots={false}
                                    arrows={false}
                                    align="center"
                                    firstButton="First page"
                                    lastButton="Last page"
                                    activePage={currentPage}
                                    pages={totalPage}
                                    onActivePageChange={(i) => pageChange(i)}
                                />
                            }
                        </div>
                    </CCol>
                </CRow><br />
                <CRow lg="12">
                    <CCol style={{ textAlign: "center", marginBottom: "20px" }}>
                        {mainTable != "" &&
                            <CButton className="form-btn" id='btnDelete' name='btnDelete' onClick={deleteToggleAlert}>
                                {t('Delete')}
                            </CButton>
                        }
                    </CCol>
                </CRow>
            </CCard>
        }
    </>
    );
}
export default OvertimeListTable;
