/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';

const ExpenseDetailBudgetTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <h6 className="" style={{ fontWeight: "bold" }}>{t('Budget')}</h6>
        <CCard className='card-form card-bonus table-panel mt-2' style={{ borderRadius: ".5rem", backgroundColor: "#e7ebeeba" }}>
            <CCard className='card-table table-panel mt-2 mb-2' style={{ border: "1px solid #d8dbe0" }}>
                <CRow id="table">
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th width="500px" className="basicSalaryList tableTh" rowSpan="3">

                                        </th>
                                        <th width="" colSpan={props.budgetTotal.length} scope="colgroup" className="basicSalaryList tableTh textAlignCenter">
                                            <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                            {t('Total')}
                                        </th>
                                    </tr>
                                    <tr width="100%">
                                        {props.budgetTotal.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <th colSpan="1" width="300px" scope="colgroup" className="basicSalaryList year-month textAlignLeft no-border-radius" >
                                                        {props.currency.map((sec, idx) => {
                                                            return (<Fragment key={idx}>
                                                                {parseInt(sec.id) === parseInt(i.currency_id) ? sec.currency_desc : null}
                                                            </Fragment>
                                                            )
                                                        })}
                                                    </th>
                                                </Fragment>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                {
                                    !isEmpty(props.budgetTotal) && <>
                                        <tbody>
                                            <tr width="100%">
                                                <td id="tblBugetTotal" width="" className="td-no textAlignLeft col-color-blue" >
                                                    <label>{t('Budget Total')}</label>
                                                </td>
                                                {props.budgetTotal.map((i, index) => {
                                                    return (<Fragment key={index}>
                                                        <td width="" className="td-emp-id textAlignRight" >
                                                        {parseFloat(i.amount)}
                                                        </td>
                                                    </Fragment>)
                                                })}
                                            </tr>
                                            <tr width="100%">
                                                <td id="tblTotal" width="" className="td-no textAlignLeft col-color-blue" >
                                                    {t('Total (Admin Arrange Amount Not Include)')}
                                                </td>
                                                {props.budgetNotInclude.map((i, index) => {
                                                    return (<Fragment key={index}>
                                                        <td width="" className="td-emp-id textAlignRight" >
                                                            {parseFloat(i.amount)}
                                                        </td>
                                                    </Fragment>)
                                                })}
                                            </tr>
                                            {props.paymentFlag === 2 ?
                                                (() => {
                                                    switch (props.advanceFlag) {
                                                        case 1: return (<tr width="100%">
                                                            <td id="tblAdvangeMoney" width="" className="td-no textAlignLeft col-color-blue" >
                                                                {t('Advance money')}
                                                            </td>
                                                            {props.advanceMoney.map((i, index) => {
                                                                return (<Fragment key={index}>
                                                                    <td width="" className="td-emp-id textAlignRight" >
                                                                        {parseFloat(i.amount)}
                                                                    </td>
                                                                </Fragment>)
                                                            })}
                                                        </tr>);
                                                        case 2: return (
                                                            <tr width="100%">
                                                                <td id="tblAdvangeMoney" width="" className="td-no textAlignLeft col-color-blue" >
                                                                    {t('Advance money')}<br />
                                                                    '{props.expenseAdvance}{t("% Additional for target items'")}
                                                                </td>
                                                                {props.advanceMoney.map((i, index) => {
                                                                    return (<Fragment key={index}>
                                                                        <td width="" className="td-emp-id textAlignRight" >
                                                                            {parseFloat(i.amount)}
                                                                        </td>
                                                                    </Fragment>)
                                                                })}
                                                            </tr>
                                                        );
                                                        case 3: return (
                                                            <tr width="100%">
                                                                <td id="tblAdvangeMoney" width="" className="td-no textAlignLeft col-color-blue" >
                                                                    {t('Advance money')}<br />
                                                                    {t("'Specified Amount'")}
                                                                </td>
                                                                {props.advanceMoney.map((i, index) => {
                                                                    return (<Fragment key={index}>
                                                                        <td width="" className="td-emp-id textAlignRight" >
                                                                            {parseFloat(i.amount)}
                                                                        </td>
                                                                    </Fragment>)
                                                                })}
                                                            </tr>
                                                        );
                                                    }
                                                })()
                                                :
                                                <tr width="100%">
                                                    <td id="tblCash" width="" className="td-no textAlignLeft col-color-blue" >
                                                        {t('Cash')}
                                                    </td>
                                                    {props.budgetNotInclude.map((i, index) => {
                                                        return (<Fragment key={index}>
                                                            <td width="" className="td-emp-id textAlignRight" >
                                                                {parseFloat(i.amount)}
                                                            </td>
                                                        </Fragment>)
                                                    })}
                                                </tr>
                                            }
                                        </tbody>
                                    </>
                                }
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
        </CCard>
    </>
    );
}
export default ExpenseDetailBudgetTable;
