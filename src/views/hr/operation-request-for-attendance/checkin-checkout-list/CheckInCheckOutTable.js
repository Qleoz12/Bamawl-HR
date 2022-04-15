/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CLabel, CPagination, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import ConfirmAndRejectAndDeleteCheckInCheckOutList from './ConfirmAndRejectAndDeleteCheckInCheckOutList';

const CheckInCheckOutTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            !isEmpty(props.mainTable) &&
            <CCard className='table-panel mt-2' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                <CRow id="table" className="m-3">
                    <CCol lg="12">
                        <CCol lg="12" style={{ marginBottom: "5px" }}>
                            <CRow alignHorizontal="start">
                                <div style={{ position: 'absolute', userSelect: 'none' }}>
                                    <label style={{ cursor: 'pointer' }}>
                                        <input id="chkShowButtonDelete" type="checkbox" style={{ marginRight: "5px" }} checked={props.showDelete} onChange={props.showButtonDelete} />
                                        {t('Show Delete Button')}
                                    </label>
                                </div>
                            </CRow>
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    {
                                        props.mainTable !== "" &&
                                        <tr width="100%">
                                            <th width="" className="basicSalaryList theadcheckbox" rowSpan="2" >
                                                <input type="checkbox"
                                                    value="all-check"
                                                    checked={props.AllCheck === true}
                                                    onChange={props.changeCheckbox} />
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('No')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee ID')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee Name')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Date')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Status')}
                                            </th>
                                            <th width="" colSpan="2" scope="colgroup" className="basicSalaryList tableTh textAlignCenter" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Detail')}
                                            </th>

                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Approver Status')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Denied Reason')}
                                            </th>

                                        </tr>
                                    }
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable !== "" &&
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                <tr width="100%">
                                                    <td className="td-num basicSalaryList tbodyCheckbox" >
                                                        {!props.showDelete ? i.confirm_checkbox &&
                                                            <input type="checkbox"
                                                                value={i.employee_attendance_id}
                                                                id={i.id}
                                                                checked={i.is_checked === true}
                                                                onChange={props.changeCheckbox}
                                                            /> : i.delete_checkbox &&
                                                        <input type="checkbox"
                                                            value={i.employee_attendance_id}
                                                            id={i.id}
                                                            checked={i.is_checked === true}
                                                            onChange={props.changeCheckbox}
                                                        />
                                                        }
                                                    </td>
                                                    <td className="td-num textAlignRight" >
                                                        {(props.currentPage - 1) * props.perPage + index + 1}
                                                    </td>
                                                    <td width="" className="td-emp-id textAlignRight" >
                                                        {i.employee_id}
                                                    </td>
                                                    <td width="" className="td-emp-code td-overtime-type t-align-left" >
                                                        {i.employee_name}
                                                    </td>
                                                    <td width="" className="textAlignCenter" >
                                                        {i.attendance_time}
                                                    </td>
                                                    <td width="" className="textAlignLeft" >
                                                        {i.status}
                                                    </td>
                                                    <td width="" className="textAlignCenter" >
                                                        <span style={{ color: "red" }}>{i.calculateday === 0 ? t("Over Due") : "-"}</span>
                                                    </td>
                                                    <td width="" >
                                                        <input
                                                            type="image"
                                                            id="tblDetail"
                                                            src={'avatars/detail-user.png'}
                                                            className="icon-clt epm-list-img"
                                                            alt="detail"
                                                            onClick={props.getDetails.bind(this, i)}
                                                        />
                                                    </td>
                                                    <td width="" className="textAlignLeft" >
                                                        {(() => {
                                                            switch (parseInt(i.approve_flag)) {
                                                                case 1: return t("Pending");
                                                                case 2: return t("Confirmed");
                                                                case 3: return t("Rejected");
                                                            }
                                                        })()}
                                                    </td>
                                                    <td width="" className="textAlignLeft" >
                                                        {i.denied_reason}
                                                    </td>
                                                </tr>
                                            </Fragment>)
                                        })}
                                </tbody>
                            </table>

                        </div>
                    </CCol>
                </CRow>
                {props.mainTable != "" && props.totalPage > 1 &&
                    <CRow alignHorizontal="center" className="mt-3">
                        <CPagination
                            activePage={props.currentPage}
                            pages={props.totalPage}
                            dots={false}
                            arrows={false}
                            align="center"
                            firstButton="First page"
                            lastButton="Last page"
                            onActivePageChange={(i) => props.pagination(i)}
                        ></CPagination>
                    </CRow>
                }
                <ConfirmAndRejectAndDeleteCheckInCheckOutList
                    mainTable={props.mainTable} deleteToggleAlert={props.deleteToggleAlert}
                    confirmToggleAlert={props.confirmToggleAlert} showConfirm={props.showConfirm}
                    showDelete={props.showDelete} modalReject={props.modalReject}
                    openModalReject={props.openModalReject} showCheckDelete={props.showCheckDelete} />
            </CCard>
        }
    </>
    );
}
export default CheckInCheckOutTable;
