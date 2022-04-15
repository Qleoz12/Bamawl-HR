import React, { useCallback } from "react";
import {
    CCol,
    CRow,
    CCard,
    CImg,
    CLabel
} from "@coreui/react";
import { useTranslation } from "react-i18next";

const AdjustmentBudget = (props) => {
    const { t } = useTranslation();
    let { dataAllwance,
        subTotalAllwance,
        multiFileOtherAttachement,
        handleFileOtherAttachement,
        removeFileOtherAttachement,
        dataAccom,
        dataAirTicket,
        dataTransport,
        dataOther,
        subTotalAccom,
        subTotalAirTicket,
        subTotalOther,
        subTotalTransport,
        budgetTotal,
        tripAdvance,
        advanceFlag,
        advanceAdditional,
        numCurrencies,
        allCurrency,
        flagAdmin,
        actualTotal,
        actualNoAdmin,
    } = props;

    return (
        <>
            <CRow lg="12" >
                <CCol className="pb-2">
                    <CLabel id="lbAttachmentCardDetail">
                        {t('Business Trip Other Attachement')}
                    </CLabel>
                    <div className="pt-lg-4">
                        <i className="fas fa-paperclip"></i>
                        <label className="expense-request-attachment-file-label" >{t('Drag & Drop files to attach or')}
                        </label>
                        &nbsp;
                        <a id="btnImportAdjustment" className="expense-request-attachment-file-browser" tabIndex={0}>
                            {t('Browse')}
                        </a>
                        <input
                            value=""
                            type="file"
                            htmlFor="btnImportAdjustment"
                            style={{ opacity: "0", position: "absolute", left: "12px", zindex: "9999999" }}
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png,.PDF,.JPG,.JPEG,.PNG"
                            onChange={handleFileOtherAttachement}
                        />
                        <div style={{}} >
                            {
                                props.multiFileOtherAttachement.map((ele, index) => {
                                    let file_name = ele.business_trip_document_name;
                                    if (file_name.length > 21) {
                                        file_name = file_name.substring(0, 9).concat("...")
                                            .concat(file_name.substring(file_name.length - 10, file_name.length));
                                    }
                                    return (
                                        <span key={index}>
                                            <i className="fas fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{file_name}&nbsp;
                                            <i className="fa fa-times" style={{ cursor: "pointer" }} onClick={() => removeFileOtherAttachement(index)} ></i>
                                            &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </CCol>
            </CRow>
            <br />
            <CRow lg="12" >
                <CCol className="pb-2">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="title-icon" />
                    <CLabel style={{ fontWeight: "bold" }}
                        className="title-lbl">{t("Adjustment Budget (checkbox means that you will get xx% extra additional for target items)").replace('xx',advanceAdditional)}</CLabel>
                </CCol>
            </CRow>
            <br />

            <CRow>
                <CCol lg="12" className="">
                    <CCard className='expense-request-card-detail card-bonus table-panel mt-2' style={{ backgroundColor: "#fafbfc" }}>
                        <CCard className="expense-request-card-detail table-panel ">
                            <CRow id="table">
                                <CCol lg="12">
                                    <CCol lg="12">
                                        <CRow alignHorizontal="end">
                                        </CRow>
                                    </CCol>
                                    <div className="table-responsive">
                                        <table
                                            id="tbSubAllowanceRegisterList"
                                            className="table purchase-order-list"
                                            aria-label="simple table"
                                        >
                                            <thead id="thead-id">
                                                <tr width="100%">
                                                    <th className="text-left text-nowrap" colSpan="2" rowSpan="2"></th>
                                                    <th style={{ borderBottom: "1px solid #E3E5F1", textAlign: "center", whiteSpace: "nowrap" }} id="tblEstimatedTotal" colSpan={numCurrencies} disabled>
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="imgTitle"
                                                            alt="no"
                                                        />
                                                        {t("Estimated Total")}
                                                    </th>
                                                    <th style={{ borderBottom: "1px solid #E3E5F1", textAlign: "center", whiteSpace: "nowrap" }} id="tblActualTotal" colSpan={numCurrencies} disabled>
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="imgTitle"
                                                            alt="no"
                                                        />
                                                        {t("Actual Total")}
                                                    </th>
                                                </tr>
                                                <tr style={{ background: "#d8dbe0" }}>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <th key={index} className="text-center responsive-tableTh no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                                    <CImg
                                                                        src={"avatars/titleicon.png"}
                                                                        className="imgTitle"
                                                                        alt="no"
                                                                    />
                                                                    {ele.currency_desc}
                                                                </th>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <th key={index} className="text-center responsive-tableTh no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                                    <CImg
                                                                        src={"avatars/titleicon.png"}
                                                                        className="imgTitle"
                                                                        alt="no"
                                                                    />
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
                                                        <input
                                                            style={{ cursor: "not-allowed" }}
                                                            type="checkbox"
                                                            disabled
                                                            checked={dataAirTicket.additional_advance_item == 1 ? true : false}
                                                        />
                                                    </td>
                                                    <td id="lblAirTicket" className="col-color-blue" style={{ textAlign: "left" }}>{t("Air Ticket")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright ">
                                                                    {dataAirTicket.budget_cost && dataAirTicket.budget_cost[index] ? dataAirTicket.budget_cost[index].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {subTotalAirTicket[index] && subTotalAirTicket[index].sub_total ? parseFloat(subTotalAirTicket[index].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                                        <input
                                                            style={{ cursor: "not-allowed" }}
                                                            type="checkbox"
                                                            disabled
                                                            checked={dataAccom.additional_advance_item == 1 ? true : false}
                                                        />
                                                    </td>
                                                    <td id="lblAccomodation" className="col-color-blue" style={{ textAlign: "left" }}>{t("Accomodation")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {dataAccom.budget_cost && dataAccom.budget_cost[index] ? dataAccom.budget_cost[index].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {subTotalAccom[index] && subTotalAccom[index].sub_total ? parseFloat(subTotalAccom[index].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                                        <input
                                                            style={{ cursor: "not-allowed" }}
                                                            type="checkbox"
                                                            disabled
                                                            checked={dataTransport.additional_advance_item == 1 ? true : false}
                                                        />
                                                    </td>
                                                    <td id="lblTransportation" className="col-color-blue" style={{ textAlign: "left" }}>{t("Transportation")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {dataTransport.budget_cost && dataTransport.budget_cost[index] ? dataTransport.budget_cost[index].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {subTotalTransport[index] && subTotalTransport[index].sub_total ? parseFloat(subTotalTransport[index].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                                        <input
                                                            style={{ cursor: "not-allowed" }}
                                                            type="checkbox"
                                                            disabled
                                                            checked={dataAllwance.additional_advance_item == 1 ? true : false}
                                                        />
                                                    </td>
                                                    <td id="lblDailyAllowance" className="col-color-blue" style={{ textAlign: "left" }}>{t("Daily Allowance")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {dataAllwance.budget_cost && dataAllwance.budget_cost[index] ? dataAllwance.budget_cost[index].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {subTotalAllwance[index] && subTotalAllwance[index].sub_total ? parseFloat(subTotalAllwance[index].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}>
                                                        <input
                                                            style={{ cursor: "not-allowed" }}
                                                            type="checkbox"
                                                            disabled
                                                            checked={dataOther.additional_advance_item == 1 ? true : false}
                                                        />
                                                    </td>
                                                    <td id="lblOther" className="col-color-blue" style={{ textAlign: "left" }}>{t("Other")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {dataOther.budget_cost && dataOther.budget_cost[index] ? dataOther.budget_cost[index].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {subTotalOther[index] && subTotalOther[index].sub_total ? parseFloat(subTotalOther[index].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>

                                                <tr width="100%">
                                                    <td className="td-num border-right-0 col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}></td>
                                                    <td className="col-color-blue" id="lblBudgetTotal" style={{ textAlign: "left" }}>{t("Budget Total")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {budgetTotal[index] && budgetTotal[index].budget_total ? budgetTotal[index].budget_total.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {
                                                                        parseFloat(flagAdmin == false ? actualTotal[index] && actualTotal[index].budget_total ? parseFloat(actualTotal[index].budget_total) : 0 :
                                                                            (subTotalAirTicket[index] ? parseFloat(subTotalAirTicket[index].sub_total) : 0)
                                                                            + (subTotalAccom[index] ? parseFloat(subTotalAccom[index].sub_total) : 0)
                                                                            + (subTotalTransport[index] ? parseFloat(subTotalTransport[index].sub_total) : 0)
                                                                            + (subTotalAllwance[index] ? parseFloat(subTotalAllwance[index].sub_total) : 0)
                                                                            + (subTotalOther[index] ? parseFloat(subTotalOther[index].sub_total) : 0)).toFixed(2)
                                                                    }
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num border-right-0 col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}></td>
                                                    <td className="col-color-blue" id="lblTotal (Admin Arrange Amount Not Include)" style={{ textAlign: "left" }}>{t("Total (Admin Arrange Amount Not Include)")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {budgetTotal[index] && budgetTotal[index].total_not_include_admin_arrange ? budgetTotal[index].total_not_include_admin_arrange.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {
                                                                        parseFloat(flagAdmin == false ? actualTotal[index] && actualTotal[index].total_not_include_admin_arrange ? parseFloat(actualTotal[index].total_not_include_admin_arrange) : parseFloat(0).toFixed(2) :
                                                                            actualNoAdmin[index]?.total_not_include_admin_arrange).toFixed(2)
                                                                    }
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num border-right-0 col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "left" }}></td>
                                                    {
                                                        (() => {
                                                            switch (advanceFlag) {
                                                                case 1: return (
                                                                    <td id="lblAdvanceMoney" className="col-color-blue" style={{ textAlign: "left" }}>
                                                                        {t('Advance money')}<span className="required"></span>
                                                                    </td>
                                                                );
                                                                case 2: return (
                                                                    <td id="lblAdvanceMoney" className="col-color-blue" style={{ textAlign: "left" }}>
                                                                        {t('Advance money')}<span className="required"></span><br />
                                                                        '{advanceAdditional}{t("% Additional for target items'")}
                                                                    </td>
                                                                );
                                                                case 3: return (
                                                                    <td id="lblAdvanceMoney" className="col-color-blue" style={{ textAlign: "left" }}>
                                                                        {t('Advance money')}<span className="required"></span><br />
                                                                        {t("'Specified Amount'")}
                                                                    </td>
                                                                );
                                                            }
                                                        })()
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                    {tripAdvance[index] && tripAdvance[index].advance_amount ? tripAdvance[index].advance_amount.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {tripAdvance[index] && tripAdvance[index].advance_amount ? tripAdvance[index].advance_amount.toFixed(2) : parseFloat(0).toFixed(2)}
                                                                </td>

                                                            )
                                                        })
                                                    }
                                                </tr>
                                                <tr width="100%">
                                                    <td className="td-num border-right-0 col-color-blue" style={{ borderLeft: "3px solid #858BC3", textAlign: "center" }}></td>
                                                    <td id="lblAdjustmentTotal" className="col-color-blue" style={{ textAlign: "left" }}>{t("Adjustment Total")}</td>
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td key={index} className="textright">
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        allCurrency.map((ele, index) => {
                                                            return (ele.expense_flag === 1 &&
                                                                <td className="textright" key={index}>
                                                                    {
                                                                        parseFloat((flagAdmin == false ? (actualTotal[index] && actualTotal[index].total_not_include_admin_arrange ?
                                                                            parseFloat(actualTotal[index].total_not_include_admin_arrange) : parseFloat(0).toFixed(2)) :
                                                                            actualNoAdmin[index]?.total_not_include_admin_arrange)
                                                                            -
                                                                            (tripAdvance[index] && parseFloat(tripAdvance[index].advance_amount) ? parseFloat(tripAdvance[index].advance_amount) : 0)).toFixed(2)
                                                                    }
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
                    </CCard>
                </CCol>
            </CRow>
        </>
    );
};
export default AdjustmentBudget;
