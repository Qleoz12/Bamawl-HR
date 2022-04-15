/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from "react";
import { CCard, CCol, CRow, CImg, } from "@coreui/react";
import { useTranslation } from "react-i18next";
import SummarizeTotalAmountPreparePaginationList from "./SummarizeTotalAmountPreparePaginationList";
const SummarizeTotalAmountPrepareListTable = (props) => {
    let {
        totalRow,
        listSummarizeTotalAmount,
        allCheck,
        currency,
        defaultPerPage,
        changePage,
        currentPage,
        totalPage,
        // perPage,
        change_checkbox,
        checkHidenchk
    } = props;
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {listSummarizeTotalAmount && listSummarizeTotalAmount.length > 0 &&
                (
                    <CCard className="table-panel" style={{ width: "100%" }}>
                        <CRow id="table" style={{ paddingTop: "10px" }}>
                            <CCol lg="12">
                                <CCol lg="12">
                                    <CRow alignHorizontal="end">
                                        <div className="row-count-msg" id="lblTotalRows">
                                            {t('Total Rows').replace("%s", totalRow)}
                                        </div>
                                    </CRow>
                                </CCol>
                                <div className="table-responsive">
                                    <table
                                        className="table purchase-order-list table-striped"
                                        aria-label="simple table"
                                        id="tblEmployeeShiftAssignList"
                                    >
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th id="tblCheckBox" width="10px" className="text-left text-nowrap align-middle" rowSpan="2">
                                                    {checkHidenchk.length > 0 &&
                                                        <input
                                                            style={{ marginLeft: "3px" }}
                                                            type="checkbox"
                                                            value="all-check"
                                                            checked={allCheck === true}
                                                            onChange={change_checkbox}
                                                        />
                                                    }
                                                </th>
                                                <th id="tblNo" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("No")}
                                                </th>
                                                <th id="tblEmployeeID" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Employee ID")}
                                                </th>
                                                <th id="tblEmployeeCode" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Employee Code")}
                                                </th>
                                                <th id="tblEmployeeName" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Employee Name")}
                                                </th>
                                                <th id="tblExpenseDepartment" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Expense Department")}
                                                </th>
                                                <th id="tblAppliedDate" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Applied Date")}
                                                </th>
                                                <th id="tblDueDate" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Due Date")}
                                                </th>
                                                <th id="tblAmountType" className="text-nowrap text-left align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Amount Type")}
                                                </th>
                                                <th id="tblAmount" className="text-nowrap text-center" colSpan={currency.length} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Amount")}
                                                </th>
                                                <th id="tblTotalAmount" className="text-nowrap text-center" colSpan={currency.length} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="list-icon"
                                                        width="6px"
                                                        style={{
                                                            marginRight: "10px",
                                                            marginBottom: "6px",
                                                        }}
                                                    />
                                                    {t("Total Amount")}
                                                </th>
                                            </tr>
                                            <tr>
                                                {
                                                    currency.map((currency, index) => {
                                                        return (
                                                            <th key={index} id={currency.id} className="text-center responsive-tableTh no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                                <CImg
                                                                    src={"avatars/titleicon.png"}
                                                                    className="list-icon"
                                                                    width="6px"
                                                                    style={{
                                                                        marginRight: "10px",
                                                                        marginBottom: "6px",
                                                                    }}
                                                                />
                                                                {currency.currency_desc}
                                                            </th>
                                                        )
                                                    })
                                                }
                                                {
                                                    currency.map((currency, index) => {
                                                        return (
                                                            <th key={index} className="text-center responsive-tableTh no-border-radius" style={{ overflowWrap: "anywhere" }}>
                                                                <CImg
                                                                    src={"avatars/titleicon.png"}
                                                                    className="list-icon"
                                                                    width="6px"
                                                                    style={{
                                                                        marginRight: "10px",
                                                                        marginBottom: "6px",
                                                                    }}
                                                                />
                                                                {currency.currency_desc}
                                                            </th>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {
                                                listSummarizeTotalAmount.map((i, index) => {
                                                    return (<Fragment key={index}>
                                                        <>
                                                            {
                                                                i.amount_prepares.map((sec, idx) => {
                                                                    return (<Fragment key={idx}>
                                                                        <tr width="100%">
                                                                            {idx == 0 && <>
                                                                                <td className={index + 1 === listSummarizeTotalAmount.length ? "td-num border-bottom-left-radius" : "td-num"} rowSpan={i.amount_prepares.length} style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: "#f1f3f8" }}>
                                                                                    {!i.finish_flag == 1 &&
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            value={i.employee_id}
                                                                                            id={i.employee_id}
                                                                                            checked={i.is_checked === true}
                                                                                            onChange={change_checkbox}
                                                                                        />
                                                                                    }
                                                                                </td>
                                                                                <td className="td-num no-border-radius" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.amount_prepares.length}>
                                                                                    {((currentPage - 1) * defaultPerPage) + index + 1}
                                                                                </td>
                                                                                <td width="" className="td-emp-id no-border-radius" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.amount_prepares.length}>
                                                                                    {i.employee_id}
                                                                                </td>
                                                                                <td width="" className="td-emp-code no-border-radius" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }} rowSpan={i.amount_prepares.length}>
                                                                                    {i.employee_code}
                                                                                </td>
                                                                                <td width="" className="td-emp-name no-border-radius" style={{ textAlign: "left", maxWidth: "200px", backgroundColor: "#f1f3f8" }} rowSpan={i.amount_prepares.length}>
                                                                                    {i.employee_name}
                                                                                </td>
                                                                            </>
                                                                            }
                                                                            <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }}>
                                                                                {sec.expense_department_name}
                                                                            </td>
                                                                            <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "center", backgroundColor: "#f1f3f8" }}>
                                                                                {sec.applied_date}
                                                                            </td>
                                                                            <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "center", backgroundColor: "#f1f3f8" }}>
                                                                                {sec.due_date}
                                                                            </td>
                                                                            <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }}>
                                                                                {sec.amount_type}
                                                                            </td>
                                                                            {
                                                                                sec.amount.map((amount, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className="td-pink no-border-radius" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }}>
                                                                                            {amount.amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
                                                                            }
                                                                            {idx == 0 &&
                                                                                i.total_amount.map((amt, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className={index + 1 === listSummarizeTotalAmount.length && temp + 1 === i.total_amount.length ? "td-pink border-bottom-right-radius" : "td-pink"} style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.amount_prepares.length}>
                                                                                            {amt.amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
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
                                </div>
                            </CCol>
                        </CRow>
                        <CRow>
                            <SummarizeTotalAmountPreparePaginationList
                                defaultPerPage={defaultPerPage}
                                changePage={changePage}
                                currentPage={currentPage}
                                totalPage={totalPage}
                                totalRow={totalRow}
                            ></SummarizeTotalAmountPreparePaginationList>
                        </CRow>
                    </CCard>
                )
            }
        </>
    );
};
export default SummarizeTotalAmountPrepareListTable;
