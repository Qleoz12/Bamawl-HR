import React, { useEffect } from "react";
import {
    CCol,
    CRow,
    CCard,
    CImg,
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const AdjustmentBudget = (props) => {
    const { t } = useTranslation();

    useEffect(() => {});

    let {
        adjustmentBudget,
        dataAccom,
        dataAllwance,
        dataAirTicket,
        dataTransport,
        dataOther,
        allCurrency,
        advanceFlag,
        advanceAdditional,
    } = props;

    return (
        <>
            <CRow className="justify-content-start">
                <CCol lg="7" md="9">
                    <label id="lblEstimatedBudget" className="font-weight-bold">
                        {t("Adjustment Budget (checkbox means that you will get xx% extra additional for target items)")}
                    </label>
                </CCol>
            </CRow>
            <CCard className="table-panel">
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table id="tbSubAllowanceRegisterList" className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th className="text-left text-nowrap" colSpan="2" rowSpan="2"></th>
                                        <th style={{ borderBottom: "2px solid #E3E5F1", textAlign: "center", whiteSpace: "nowrap" }} id="tblBudgetCost" colSpan={allCurrency?.filter(item => item.expense_flag === 1).length} disabled>
                                            <div style={{ display: "block" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                {t("Estimated Total")}
                                            </div>
                                        </th>
                                        <th style={{ borderBottom: "2px solid #E3E5F1", textAlign: "center", whiteSpace: "nowrap" }} id="tblBudgetCost" colSpan={allCurrency?.filter(item => item.expense_flag === 1).length} disabled>
                                            <div style={{ display: "block" }}>
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                                {t("Actual Total")}
                                            </div>
                                        </th>
                                    </tr>
                                    <tr style={{ background: "#d8dbe0" }} className="no-border-radius">
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <th key={index} className="textleft no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                        {ele.currency_desc}
                                                    </th>
                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <th key={index} className="textleft no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                        {ele.currency_desc}
                                                    </th>
                                                )
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr width="100%">
                                        <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                            <input style={{ cursor: "not-allowed" }} type="checkbox" disabled checked={dataAirTicket.additional_advance_item == 1 ? true : false} />
                                        </td>
                                        <td className="col-color-blue textleft">{t("Air Ticket")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index} >
                                                        {dataAirTicket.category_total_amount ? dataAirTicket.category_total_amount[index]?.budget_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataAirTicket.category_total_amount ? dataAirTicket.category_total_amount[index]?.actual_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                            <input style={{ cursor: "not-allowed" }} type="checkbox" disabled checked={dataAccom.additional_advance_item == 1 ? true : false} />
                                        </td>
                                        <td className="col-color-blue textleft">{t("Accomodation")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataAccom.category_total_amount ? dataAccom.category_total_amount[index]?.budget_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataAccom.category_total_amount ? dataAccom.category_total_amount[index]?.actual_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                            <input style={{ cursor: "not-allowed" }} type="checkbox" disabled checked={dataTransport.additional_advance_item == 1 ? true : false} />
                                        </td>
                                        <td className="col-color-blue textleft">{t("Transportation")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataTransport.category_total_amount ? dataTransport.category_total_amount[index]?.budget_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataTransport.category_total_amount ? dataTransport.category_total_amount[index]?.actual_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                            <input style={{ cursor: "not-allowed" }} type="checkbox" disabled checked={dataAllwance.additional_advance_item == 1 ? true : false} />
                                        </td>
                                        <td className="col-color-blue textleft">{t("Daily Allowance")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataAllwance.category_total_amount ? dataAllwance.category_total_amount[index]?.budget_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataAllwance.category_total_amount ? dataAllwance.category_total_amount[index]?.actual_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%" >
                                        <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                            <input style={{ cursor: "not-allowed" }} type="checkbox" disabled checked={dataOther.additional_advance_item == 1 ? true : false} />
                                        </td>
                                        <td className="col-color-blue textleft">{t("Other")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataOther.category_total_amount ? dataOther.category_total_amount[index]?.budget_cost.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {dataOther.category_total_amount ? dataOther.category_total_amount[index]?.actual_cost?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>

                                    <tr width="100%">
                                        <td className="col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }} ></td>
                                        <td className="col-color-blue textleft">{t("Budget Total")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.budget_total?.estimated_budget_total ? adjustmentBudget?.budget_total?.estimated_budget_total[index]?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.budget_total?.actual_cost ? adjustmentBudget?.budget_total?.actual_cost[index]?.sub_total : ""}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}></td>
                                        <td className="col-color-blue textleft">{t("Total (Admin Arrange Amount Not Include)")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.total_not_include_admin_arrange?.estimated_budget_total ? adjustmentBudget?.total_not_include_admin_arrange?.estimated_budget_total[index]?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.total_not_include_admin_arrange?.actual_cost[index] ? adjustmentBudget?.total_not_include_admin_arrange?.actual_cost[index]?.sub_total : ""}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }} ></td>
                                        <td className="col-color-blue textleft">
                                            {t("Advance Money")} <br /> {advanceFlag == 2 ? advanceAdditional + t("% Additional for target items") : advanceFlag == 3 ? t("Specified Amount") : ""}
                                        </td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.advance_money ? adjustmentBudget?.advance_money[index]?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.advance_money ? adjustmentBudget?.advance_money[index]?.sub_total : ""}
                                                    </td>

                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td className="col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }} ></td>
                                        <td className="col-color-blue textleft">{t("Adjustment Total")}</td>
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}> </td>
                                                )
                                            })
                                        }
                                        {
                                            allCurrency.map((ele, index) => {
                                                return (
                                                    ele.expense_flag === 1 &&
                                                    <td className="textcenter" key={index}>
                                                        {adjustmentBudget?.adjustment_total ? adjustmentBudget?.adjustment_total[index].sub_total : ""}
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
        </>
    );
};
export default AdjustmentBudget;
