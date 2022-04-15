/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import DeleteBasicSalaryList from './DeleteBasicSalaryList';

const BasicSalaryListTable = props => {
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
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    {
                                        props.mainTable !== "" &&
                                        <tr width="100%">
                                            <th width="" className="basicSalaryList theadcheckbox" rowSpan="2" >
                                                <input type="checkbox"
                                                    value="all-check"
                                                    checked={props.AllCheck === true}
                                                    onChange={props.change_checkbox} />
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
                                                {t('Employee Code')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee Name')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Department Name')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Joined Date')}
                                            </th>

                                            <th colSpan="2" scope="colgroup" className="textAlignCenter">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('From')}
                                            </th>
                                            <th colSpan="2" scope="colgroup" className="textAlignCenter">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('To')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Amount')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Edit')}
                                            </th>
                                        </tr>

                                    }
                                    <tr width="100%">
                                        <th className="basicSalaryList year-month no-border-radius">
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Year')}
                                        </th>
                                        <th className="basicSalaryList year-month">
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Month')}
                                        </th>
                                        <th className="basicSalaryList year-month">
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Year')}
                                        </th>
                                        <th className="basicSalaryList year-month no-border-radius">
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Month')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable !== "" &&
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                {i.departments.map((sec, idx) => {
                                                    return (<Fragment key={idx}>
                                                        <tr width="100%">
                                                            {idx === 0 && <>
                                                                <td className={props.mainTable.length - 1 === index ? "td-num basicSalaryList tbodyCheckbox border-bottom-left-radius" : "td-num basicSalaryList tbodyCheckbox"} rowSpan={i.departments.length}>
                                                                    <input type="checkbox"
                                                                        value={i.basic_salary_id}
                                                                        id={i.id}
                                                                        checked={i.is_checked === true}
                                                                        onChange={props.change_checkbox}
                                                                    />
                                                                </td>
                                                                <td className="td-num textAlignRight" rowSpan={i.departments.length}>
                                                                    {(props.currentPage - 1) * props.perPage + index + 1}
                                                                </td>
                                                                <td width="" className="td-emp-id textAlignRight" rowSpan={i.departments.length}>
                                                                    {i.employee_id}
                                                                </td>
                                                                <td width="" className="td-emp-code textAlignLeft" rowSpan={i.departments.length}>
                                                                    {i.employee_code}
                                                                </td>
                                                                <td width="" className="td-emp-name textAlignLeft" rowSpan={i.departments.length}>
                                                                    {i.employee_name}
                                                                </td>
                                                            </>
                                                            }
                                                            <td width="" className="td-dept td-pink textAlignLeft no-border-radius">
                                                                {sec.department_name}
                                                            </td>
                                                            {idx === 0 && <>
                                                                <td width="" className="td-joined-date" rowSpan={i.departments.length}>
                                                                    {i.joined_date.substring(0, 10)}
                                                                </td>
                                                                <td width="" className="td-overtime-title" rowSpan={i.departments.length}>
                                                                    {i.exp_year_from}
                                                                </td>
                                                                <td width="" className="td-overtime-title" rowSpan={i.departments.length}>
                                                                    {i.exp_month_from}
                                                                </td>
                                                                <td width="" className="td-overtime-type" rowSpan={i.departments.length}>
                                                                    {i.exp_year_to}
                                                                </td>
                                                                <td width="" className="td-overtime-type" rowSpan={i.departments.length}>
                                                                    {i.exp_month_to}
                                                                </td>
                                                                <td width="" rowSpan={i.departments.length} className="textAlignLeft">
                                                                    {i.basic_amount}{i.currency_desc}
                                                                </td>
                                                                <td width="" rowSpan={i.departments.length} className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : ""}>
                                                                    <input
                                                                        type="image"
                                                                        id="tblEdit"
                                                                        src={'avatars/edit.png'}
                                                                        className="icon-clt"
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
                <DeleteBasicSalaryList
                    mainTable={props.mainTable} deleteToggleAlert={props.deleteToggleAlert} />
            </CCard>
        }
    </>
    );
}
export default BasicSalaryListTable;
