import React, { Fragment, useEffect } from "react";
import { CCard, CCol, CImg, CLabel, CRow } from "@coreui/react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequestBudgetTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {acceptCurrencyData,
        advanceFlag,
        advanceAdditional,
        budgetTotal,
        estimatedTotalNotAdmin,
        actualTotalNotAdmin,
        subTotal,
        actualAdvanceAmount,
        estimatedAdvanceAmount
    }=props
    return (
        <>
            <CRow lg="12">
                <CCol className="mb-3" lg="5">
                    <CLabel id="lblAdjustmentBudget ">
                        {t('Adjustment Budget ')}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow>
                <CCol lg="12">
                    <CCard className='card card-bonus table-panel mt-2'>
                        <CCard className="card table-panel ">
                            <div className="table-responsive pt-4 no-border-header">
                                <table className="table">
                                    <thead id="thead-id">
                                        <tr width="100%">
                                                <th  className="text-nowrap" rowSpan="2"></th>
                                                <th
                                                    id="tblEstimatedTotal"
                                                    className="text-nowrap"
                                                    colSpan={acceptCurrencyData.length}
                                                    style={{ borderBottom: "2px solid #fff" }}>
                                                    <CImg
                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Estimated Total")}
                                                </th>
                                                <th
                                                    id="tblActualTotal"
                                                    className="text-nowrap"
                                                    colSpan={acceptCurrencyData.length}
                                                    style={{ borderBottom: "2px solid #fff" }}>
                                                    <CImg
                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Actual Total")}
                                                </th>
                                            </tr>
                                        <tr width="100%">
                                         {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <th  className="text-nowrap text-left">
                                                            {i.currency_name}
                                                        </th>
                                                    </Fragment>
                                            )})}
                                         {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <th  className="text-nowrap text-left">
                                                            {i.currency_name}
                                                        </th>
                                                    </Fragment>
                                            )})}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td
                                                id="tblBudgetTotal"
                                                className="text-nowrap col-color-blue text-left"
                                                style={{ borderLeft: "3px solid #B1AAF6" }}>
                                                {t("Budget Total")}
                                            </td>
                                            {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                        {parseFloat(budgetTotal&& (budgetTotal?.find(item => item.currency_id == i.id)?.amount || 0))}
                                                        </td>
                                                    </Fragment>
                                            )})}
                                           {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                        {parseFloat(subTotal.find(item => item.currency_id == i.id) ? parseFloat(subTotal.find(item => item.currency_id == i.id).amount).toFixed(2) : 0)}
                                                        </td>
                                                    </Fragment>
                                            )})}
                                        </tr>
                                        <tr>
                                            <td
                                                id="tblTotalAdmin"
                                                className="text-nowrap col-color-blue text-left"
                                                style={{ borderLeft: "3px solid #B1AAF6" }}>
                                                {t("Total (Admin Arrange Amount Not Include)")}
                                            </td>
                                            {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                            {parseFloat(estimatedTotalNotAdmin && (estimatedTotalNotAdmin?.find(item => item.currency_id == i.id)?.amount || 0))}
                                                        </td>
                                                    </Fragment>
                                            )})}
                                           {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                let result=parseFloat(actualTotalNotAdmin && (actualTotalNotAdmin?.find(item => item.currency_id == i.id)?.amount || 0))
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                            {/* {parseFloat( actualTotalNotAdmin && (actualTotalNotAdmin?.find(item => item.currency_id == i.id)?.amount || 0))} */}
                                                            {Math.round(result*100)/100}
                                                        </td>
                                                    </Fragment>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                             <td
                                                id="tblAdvanceMoney"
                                                name="tblAdditional"
                                                className="text-nowrap col-color-blue text-left"
                                                style={{ borderLeft: "3px solid #B1AAF6" }}>
                                                {t("Advance Money")}<br/>
                                                {advanceFlag == 2 ? advanceAdditional +t("% Additional for target items"):
                                                advanceFlag == 3 ? t("Specified Amount"):""}
                                            </td>
                                            {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                        {parseFloat(estimatedAdvanceAmount&& (estimatedAdvanceAmount?.find(item => item.currency_id == i.id)?.amount)) ||0}
                                                        </td>
                                                    </Fragment>
                                            )})}
                                            {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                        { parseFloat(actualAdvanceAmount&& (actualAdvanceAmount?.find(item => item.currency_id == i.id)?.amount ))|| 0}
                                                        </td>
                                                    </Fragment>
                                            )})}
                                        </tr>
                                        <tr>
                                             <td
                                                id="tblAdjustmentTotal"
                                                className="text-nowrap col-color-blue text-left"
                                                style={{ borderLeft: "3px solid #B1AAF6" }}>
                                                {t("Adjustment Total ")}
                                            </td>
                                            {acceptCurrencyData.length>0&&
                                            acceptCurrencyData.map((i, index) => {
                                                return(
                                                    <Fragment key={index}>
                                                        <td className="text-nowrap text-right td-gray">
                                                        </td>
                                                    </Fragment>
                                            )})}
                                            {
                                                acceptCurrencyData.map((i, index) => {
                                                    let result=(parseFloat(actualTotalNotAdmin && (actualTotalNotAdmin?.find(item => item.currency_id == i.id)?.amount)||0)
                                                                -parseFloat(actualAdvanceAmount&& (actualAdvanceAmount?.find(item => item.currency_id == i.id)?.amount))||0)
                                                    return (

                                                        <td className="text-nowrap text-right td-gray" key={index}>
                                                            {
                                                                Math.round(result*100)/100|| Math.round(actualTotalNotAdmin?.find(item => item.currency_id == i.id)?.amount *100)/100
                                                            }
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </CCard>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseAdjustmentRequestBudgetTable
