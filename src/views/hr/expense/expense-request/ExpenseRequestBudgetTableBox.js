import { CCard, CCol, CImg, CLabel, CRow } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExpenseRequestBudgetTableBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (
        <>{props.totalCurrency && props.totalCurrency.length > 0 && (
            <Fragment>
                <CRow lg="12">
                    <CCol className="expense-info-des">
                        <CLabel className="text-nowrap" id="lbEstimatedBudget">
                            {t('Estimated Budget')}
                        </CLabel>
                        <div >
                            {props.prepaidVoucher === true && props.additionRadio === true && (
                                <label className="pl-lg-5 pl-md-5 font-weight-normal">{t("(If you select the checkbox, you will get xx% extra additional for target items)")}</label>
                            )}
                            {props.noNeed === true && (
                                <label className="pl-lg-5 pl-md-5 font-weight-normal">{t("(If you don't want to advance money, Advance Money show 0)")}</label>
                            )}
                            {props.need === true && props.additionRadio === false && props.amountRadio === true && (
                                <label className="pl-lg-5 pl-md-5 font-weight-normal">{t("(If user choose the specified amount, user can change the advance amount)")}</label>
                            )}
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol lg="12">
                        <CCard className='expense-request-card-detail card-bonus table-panel mt-2' style={{ backgroundColor: "#fafbfc" }}>
                            <CCard className="expense-request-card-detail table-panel ">
                                <div className="table-responsive pt-4 ">
                                    <table className="table">
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th width="" className="text-nowrap" rowSpan="2"></th>
                                                <th
                                                    id="tblTotalEstimatedBudget" width=""
                                                    className="text-nowrap"
                                                    colSpan={props.totalCurrency.length +1}
                                                    style={{ borderBottom: "1px solid #fff" }}>
                                                    <CImg
                                                        className="mr-2 expense-request-title-icon-img-col-table"
                                                        src="avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Total")}
                                                </th>
                                            </tr>
                                            <tr width="100%">
                                                {props.totalCurrency.map((i, index) => {
                                                    return (
                                                        <th key={index} width="" className="text-nowrap text-left no-border-radius">
                                                            <CImg
                                                                className="mr-2 expense-request-title-icon-img-col-table"
                                                                src="avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {i.currency_desc}
                                                        </th>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    id="tbrBudgetTotalEstimatedBudget"
                                                    width=""
                                                    className="text-nowrap text-left td-no font-weight-bold col-color-blue"
                                                >
                                                    {t("Budget Total")}
                                                </td>
                                                {props.totalCurrency.map((i, index) => {
                                                    return (
                                                        <td key={index} width="" className="text-nowrap text-right" >
                                                            {i.total_currency}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                <td
                                                    id="tbrAdvanceMoneyAdditionEstimatedBudget"
                                                    width=""
                                                    className="text-nowrap td-no text-left col-color-blue"
                                                >
                                                    {t("Total (Admin Arrange Amount Not Include)")}
                                                </td>
                                                {props.totalCurrencyNotInclude.map((i, index) => {
                                                    return (
                                                        <td key={index} width="" className="text-nowrap text-right" >
                                                            {i.total_currency_not}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                            <tr>
                                                {props.cashVoucher === true && (
                                                    <Fragment>
                                                        <td width="" className="text-nowrap text-left col-color-blue td-no">
                                                            {t("Cash")}
                                                        </td>
                                                        {props.totalCurrencyNotInclude.map((i, index) => {
                                                            return (
                                                                <td key={index} width="" className="text-nowrap text-right" >
                                                                    {i.total_currency_not}
                                                                </td>
                                                            )
                                                        })}
                                                    </Fragment>
                                                )}
                                                {props.prepaidVoucher === true && props.additionRadio === true && (
                                                    <Fragment>
                                                        <td width="" className="text-nowrap col-color-blue text-left td-no">
                                                            <div style={{ display: "grid" }}>
                                                                <label className='required font-weight-normal'>{t("Advanced Money")}</label>
                                                                <label className="font-weight-normal">'{props.additionData}{t("% Additional for target items")}'</label>
                                                            </div>

                                                        </td>
                                                        {props.totalCurrencyAddition.map((i, index) => {
                                                            return (
                                                                <td key={index} width="" className="text-nowrap text-right" >
                                                                    {i.total_currency_add}
                                                                </td>
                                                            )
                                                        })}
                                                    </Fragment>
                                                )}
                                                {props.noNeed === true && (
                                                    <Fragment>
                                                        <td width="" className="text-nowrap col-color-blue text-left td-no required">
                                                            {t("Advanced Money")}
                                                        </td>
                                                        {props.totalCurrency.map((i, index) => {
                                                            return (
                                                                <td key={index} width="" className="text-nowrap text-right" >
                                                                    0
                                                                </td>
                                                            )
                                                        })}
                                                    </Fragment>
                                                )}
                                                {props.need === true && props.additionRadio === false && props.amountRadio === true && (
                                                    <Fragment>
                                                        <td width="" className="text-nowrap col-color-blue td-no text-left">
                                                            <div style={{ display: "grid" }}>
                                                                <label className='required font-weight-normal'>{t("Advanced Money")}</label>
                                                                <label className="font-weight-normal">'{t("Specified Amount")}'</label>
                                                            </div>
                                                        </td>
                                                        {props.totalCurrencyAmount.map((i, index) => {
                                                            return(
                                                                <td key={index} width="" className="text-nowrap" >
                                                                    <input value={props.amountBudgetState[index]} 
                                                                    onChange={(e) => props.changeAmountBudget(e,i.currency_id_amount,index)} 
                                                                    className="form-control text-right" />
                                                                </td>
                                                            )
                                                        })}
                                                    </Fragment>
                                                )}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CCard>
                        </CCard>
                    </CCol>
                </CRow>
            </Fragment>
        )}
        </>
    )
}
export default ExpenseRequestBudgetTableBox