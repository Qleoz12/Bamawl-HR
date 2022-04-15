/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';
import ConfirmAndRejectExpenseList from './ConfirmAndRejectExpenseList';

const ExpenseListTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            !isEmpty(props.mainTable) &&
            <CCard className='table-panel mt-2' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
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
                                            <th width="" className="basicSalaryList theadcheckbox" rowSpan="3" >
                                                <input type="checkbox"
                                                    value="all-check"
                                                    checked={props.AllCheck === true}
                                                    onChange={props.changeCheckbox} />
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('No')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee ID')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee Code')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Employee Name')}
                                            </th>
                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Subject')}
                                            </th>
                                            <th width="" colSpan={6 + props.numCurrencies * 2} scope="colgroup" className="basicSalaryList tableTh textAlignCenter">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Expense (Budget Total)')}
                                            </th>
                                            <th width="" colSpan={6 + props.numCurrencies * 2} scope="colgroup" className="basicSalaryList tableTh textAlignCenter">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Expense Adjustment (Adjustment Total)')}
                                            </th>

                                            <th width="" className="basicSalaryList tableTh" rowSpan="3">
                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                {t('Action')}
                                            </th>
                                        </tr>
                                    }
                                    <tr width="100%">
                                        <th colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month no-border-radius" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Estimate Budget')}
                                        </th>
                                        <th colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Advance Money Or Cash')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Applied Date')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Due Date')}
                                        </th>

                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Edit')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Delete')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Detail')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Status')}
                                        </th>

                                        <th colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Actual  Total')}
                                        </th>
                                        <th colSpan={props.numCurrencies} scope="colgroup" className="basicSalaryList year-month" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Adjustment Amt')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Applied Date')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Due Date')}
                                        </th>

                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Edit')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Delete')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Detail')}
                                        </th>
                                        <th colSpan="1" scope="colgroup" className="basicSalaryList year-month no-border-radius" rowSpan="2" >
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Status')}
                                        </th>
                                    </tr>
                                    <tr width="100%">
                                        {
                                            props.currencies && props.currencies !== "" &&
                                            props.currencies.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        <th className="basicSalaryList year-month no-border-radius">
                                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                            {i.currency_desc}
                                                        </th>
                                                    }
                                                </Fragment>)
                                            })
                                        }
                                        {
                                            props.currencies && props.currencies !== "" &&
                                            props.currencies.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        <th className="basicSalaryList year-month">
                                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                            {i.currency_desc}
                                                        </th>
                                                    }
                                                </Fragment>)
                                            })
                                        }
                                        {
                                            props.currencies && props.currencies !== "" &&
                                            props.currencies.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        <th className="basicSalaryList year-month">
                                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                            {i.currency_desc}
                                                        </th>
                                                    }
                                                </Fragment>)
                                            })
                                        }
                                        {
                                            props.currencies && props.currencies !== "" &&
                                            props.currencies.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    {
                                                        <th className="basicSalaryList year-month no-border-radius">
                                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                            {i.currency_desc}
                                                        </th>
                                                    }
                                                </Fragment>)
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.mainTable && props.mainTable !== "" &&
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                <tr width="100%">
                                                    <td className="td-num basicSalaryList tbodyCheckbox" >
                                                        {!props.isAdjustment ? i.expense && i.expense.show_confirm &&
                                                            <input type="checkbox"
                                                                value={i.expense_id}
                                                                id={i.id}
                                                                checked={i.is_checked === true}
                                                                onChange={props.changeCheckbox}
                                                            /> : props.isAdjustment && i.expense_adjustment && i.expense_adjustment.show_confirm &&
                                                        <input type="checkbox"
                                                            value={i.expense_id}
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
                                                    <td width="" className="td-emp-id textAlignLeft" >
                                                        {i.employee_code}
                                                    </td>
                                                    <td width="" className="td-emp-code t-align-left" >
                                                        {i.employee_name}
                                                    </td>
                                                    <td width="" className="td-orange textAlignLeft" >
                                                        {i.subject}
                                                    </td>
                                                    {props.currencies && props.currencies.map((item, ix) => {
                                                        return (
                                                            <td key={ix} width="" className="textAlignRight td-green" >
                                                                {i.expense ? i.expense.estimate_budget && i.expense.estimate_budget.map((val, k) => {
                                                                    if (val.currency_id === item.id) {
                                                                        return (<Fragment key={k}>
                                                                            {val.value}
                                                                        </Fragment>)
                                                                    }
                                                                }) : "-"
                                                                }
                                                            </td>
                                                        )
                                                    })}
                                                    {props.currencies && props.currencies.map((item, ix) => {
                                                        return (
                                                            <td key={ix} width="" className="textAlignRight td-green" >
                                                                {i.expense ? i.expense.advance_money && i.expense.advance_money.map((val, k) => {
                                                                    if (val.currency_id === item.id) {
                                                                        return (<Fragment key={k}>
                                                                            {val.value}
                                                                        </Fragment>)
                                                                    }
                                                                }) : "-"
                                                                }
                                                            </td>
                                                        )
                                                    })}
                                                    <td width="" className="textAlignCenter td-green" >
                                                        {i.expense &&
                                                            i.expense.applied_date ?
                                                            i.expense.applied_date.substring(0, 10) : "-"}
                                                    </td>
                                                    <td width="" className="textAlignCenter td-green" style={{ whiteSpace: "nowrap" }}>
                                                        {i.expense &&
                                                            i.expense.due_date ?
                                                            i.expense.due_date.substring(0, 10) : "-"}
                                                    </td>
                                                    <td width="" className="td-green" style={{ padding: i.expense && i.expense.show_edit ? "" : "25px" }}>
                                                        {i.expense && i.expense.show_edit ?
                                                            <input
                                                                type="image"
                                                                id="tblEdit"
                                                                src={'avatars/edit.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="edit"
                                                                onClick={props.editToggleAlertExpense.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="td-green" style={{ padding: i.expense && i.expense.show_delete ? "" : "25px" }}>
                                                        {i.expense && i.expense.show_delete ?
                                                            <input
                                                                type="image"
                                                                id="tblDelete"
                                                                src={'avatars/remove.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="delete"
                                                                onClick={props.deleteToggleAlertExpense.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="td-green" style={{ padding: i.expense && i.expense.detail ? "" : "25px" }}>
                                                        {i.expense && i.expense.detail ?
                                                            <input
                                                                type="image"
                                                                id="tblDetail"
                                                                src={'avatars/detail-user.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="detail"
                                                                onClick={props.getDetailsExpense.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="textAlignLeft td-green" style={{ whiteSpace: "nowrap" }}>
                                                        {(() => {
                                                            switch (i.expense && i.expense.approve_flag) {
                                                                case 1: return t("Pending");
                                                                case 2: return t("Confirmed");
                                                                case 3: return t("Reject");
                                                                case 4: return t("Confirmed");
                                                                case 5: return t("Confirmed");
                                                                case 6: return t("Confirmed");
                                                                default: return "-";
                                                            }
                                                        })()}
                                                    </td>

                                                    {props.currencies && props.currencies.map((item, ix) => {
                                                        return (
                                                            <td key={ix} width="" className="textAlignRight td-blue" >
                                                                {i.expense_adjustment ? i.expense_adjustment.actual_total &&
                                                                    i.expense_adjustment.actual_total.map((val, k) => {
                                                                        if (val.currency_id === item.id) {
                                                                            return (<Fragment key={k}>
                                                                                {val.value ? val.value : "-"}
                                                                            </Fragment>)
                                                                        }
                                                                    }) : "-"
                                                                }
                                                            </td>
                                                        )
                                                    })}
                                                    {props.currencies && props.currencies.map((item, ix) => {
                                                        return (
                                                            <td key={ix} width="" className="textAlignRight td-blue" >
                                                                {i.expense_adjustment ? i.expense_adjustment.adjustment_amt &&
                                                                    i.expense_adjustment.adjustment_amt.map((val, k) => {
                                                                        if (val.currency_id === item.id) {
                                                                            return (<Fragment key={k}>
                                                                                {val.value ? val.value : "-"}
                                                                            </Fragment>)
                                                                        }
                                                                    }) : "-"
                                                                }
                                                            </td>
                                                        )
                                                    })}
                                                    <td width="" className="textAlignCenter td-blue" >
                                                        {i.expense_adjustment &&
                                                            i.expense_adjustment.applied_date ?
                                                            i.expense_adjustment.applied_date.substring(0, 10) : "-"}
                                                    </td>
                                                    <td width="" className="textAlignCenter td-blue" style={{ whiteSpace: "nowrap" }}>
                                                        {i.expense_adjustment &&
                                                            i.expense_adjustment.due_date ?
                                                            i.expense_adjustment.due_date.substring(0, 10) : "-"}
                                                    </td>
                                                    <td width="" className="td-blue" style={{ padding: i.expense_adjustment && i.expense_adjustment.show_edit ? "" : "25px" }}>
                                                        {i.expense_adjustment && i.expense_adjustment.show_edit ?
                                                            <input
                                                                type="image"
                                                                id="tblEdit"
                                                                src={'avatars/edit.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="edit"
                                                                onClick={props.editToggleAlertExpenseAdjustment.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="td-blue" style={{ padding: i.expense_adjustment && i.expense_adjustment.show_delete ? "" : "25px" }}>
                                                        {i.expense_adjustment && i.expense_adjustment.show_delete ?
                                                            <input
                                                                type="image"
                                                                id="tblDelete"
                                                                src={'avatars/remove.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="delete"
                                                                onClick={props.deleteToggleAlertExpenseAdjustment.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="td-blue" style={{ padding: i.expense_adjustment && i.expense_adjustment.detail ? "" : "25px" }}>
                                                        {i.expense_adjustment && i.expense_adjustment.detail ?
                                                            <input
                                                                type="image"
                                                                id="tblDetail"
                                                                src={'avatars/detail-user.png'}
                                                                className="icon-clt epm-list-img"
                                                                alt="detail"
                                                                onClick={props.getDetailsExpenseAdjusment.bind(this, i)}
                                                            /> : "-"
                                                        }
                                                    </td>
                                                    <td width="" className="textAlignLeft td-blue" style={{ whiteSpace: "nowrap" }}>
                                                        {
                                                            i.reject_history ? t("Re-Pending") : (() => {
                                                                switch (i.expense_adjustment && i.expense_adjustment.approve_flag) {
                                                                    case 4: return t("Pending");
                                                                    case 5: return t("Confirmed");
                                                                    case 6: return t("Reject");
                                                                    default: return "-";
                                                                }
                                                            })()
                                                        }
                                                    </td>
                                                    <td width="" className="textAlignLeft" >
                                                        {i.expense_adj_request ?
                                                            <a style={{ color: "#4E57AA", borderBottom: "1px solid", cursor: "pointer" }}
                                                                onClick={props.linkAdjustmentRequest.bind(this, i)}>
                                                                {t('Adjustment Request')}
                                                            </a> : i.expense_adj_request_again ?
                                                                <a style={{ color: "#4E57AA", borderBottom: "1px solid", cursor: "pointer" }}
                                                                    onClick={props.linkAdjustmentRequest.bind(this, i)}>
                                                                    {t('Adjustment Request Again')}
                                                                </a> : i.reject_history ?
                                                                    <a style={{ color: "#4E57AA", borderBottom: "1px solid", cursor: "pointer" }}
                                                                        onClick={props.openRejectHistoryModal.bind(this, i)}>
                                                                        {t('Reject History')}
                                                                    </a> : "-"
                                                        }
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
                <ConfirmAndRejectExpenseList
                    mainTable={props.mainTable}
                    confirmToggleAlert={props.confirmToggleAlert} showConfirm={props.showConfirm}
                    showDelete={props.showDelete} modalReject={props.modalReject}
                    openModalReject={props.openModalReject} showCheckDelete={props.showCheckDelete}
                    checkHidden={props.checkHidden} />
            </CCard>
        }
    </>
    );
}
export default ExpenseListTable;
