/* eslint-disable no-use-before-define */
import { CCard, CCol, CPagination, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import DeletePerfectAttendanceSetupList from './DeletePerfectAttendanceSetupList';

const PerfectAttendanceSetupListTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            !isEmpty(props.mainTable) &&
            <CCard className='table-panel' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th width="" className="basicSalaryList tableTh t-align-center" >
                                            <input type="checkbox"
                                                value="all-check"
                                                checked={props.AllCheck === true}
                                                onChange={props.change_checkbox} />
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('No')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Employee ID')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Employee Code')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Employee Name')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Department')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Joined Date')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Amount')}
                                        </th>
                                        <th width="" className="basicSalaryList tableTh" >
                                            <img src={'avatars/titleicon.png'}
                                                className="column-table"
                                                alt="titleicon"
                                            />
                                            {t('Edit')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable && props.mainTable !== "" &&
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                {i.departments.map((sec, idx) => {
                                                    return (<Fragment key={idx}>
                                                        <tr width="100%">
                                                            {idx === 0 && <>
                                                                <td width="" className={props.mainTable.length - 1 === index ? "td-no t-align-center border-bottom-left-radius" : "td-no t-align-center"} rowSpan={i.departments.length}>
                                                                    <input type="checkbox"
                                                                        value={i.id}
                                                                        id={i.id}
                                                                        checked={i.is_checked === true}
                                                                        onChange={props.change_checkbox}
                                                                    />
                                                                </td>
                                                                <td width="" className="td-num textAlignRight" rowSpan={i.departments.length}>
                                                                    {(props.currentPage - 1) * props.perPage + index + 1}
                                                                </td>
                                                                <td width="" className="td-emp-id textAlignRight" rowSpan={i.departments.length}>
                                                                    {i.employee_id}
                                                                </td>
                                                                <td width="" className="td-emp-code t-align-left" rowSpan={i.departments.length}>
                                                                    {i.employee_code}
                                                                </td>
                                                                <td width="" className="td-emp-name td-green t-align-left" rowSpan={i.departments.length}>
                                                                    {i.employee_name}
                                                                </td>
                                                            </>
                                                            }
                                                            <td width="" className="td-dept td-pink t-align-left no-border-radius">
                                                                {sec.department_name}

                                                            </td>
                                                            {idx === 0 && <>
                                                                <td width="" className="td-joined-date" rowSpan={i.departments.length}>
                                                                    {i.joined_date ? i.joined_date.substring(0, 10) : ""}
                                                                </td>
                                                                <td width="" className="td-amount td-blue textAlignLeft" rowSpan={i.departments.length}>
                                                                    {i.perfect_attendance_amount}{i.currency_desc}
                                                                </td>
                                                                <td width="" id="editData" className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : ""} rowSpan={i.departments.length}>
                                                                    <input
                                                                        type="image"
                                                                        id="tblEdit"
                                                                        src={'avatars/edit.png'}
                                                                        className="icon-clt ava-edit"
                                                                        alt="edit"
                                                                        onClick={props.editToggleAlert.bind(this, i)}
                                                                    />
                                                                </td>
                                                            </>}
                                                        </tr>
                                                    </Fragment>)
                                                })}
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
                <DeletePerfectAttendanceSetupList
                    mainTable={props.mainTable} deleteToggleAlert={props.deleteToggleAlert} />
            </CCard>

        }<br />
    </>
    );
}
export default PerfectAttendanceSetupListTable;
