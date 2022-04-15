/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from "react";
import { CCard, CCol, CRow, CImg, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";
import SummarizeTotalAmountPreparePagination from "./SummarizeTotalAmountPreparePagination";
import { isEmpty } from "../../hr-common/common-validation/CommonValidation";
const SummarizeTotalAmountPrepareTable = (props) => {
    let {
        totalRow,
        listSummarizeTotalAmount,
        allCheck,
        currency,
        defaultPerPage,
        changePage,
        currentPage,
        totalPage,
        change_checkbox,
        saveData
    } = props;
    const { t } = useTranslation();
    useEffect(() => { });
    return (
        <>
            {
                listSummarizeTotalAmount.length > 0 &&
                <>
                    <CCard className="table-panel" style={{ width: "100%" }}>
                        <CRow id="table" style={{ paddingTop: "10px" }}>
                            <CCol lg="12">
                                <CCol lg="12">
                                    <CRow alignHorizontal="end">
                                        <div className="row-count-msg" id="lblTotalRow">
                                            {/* Total Rows: {totalRow} row(s) */}
                                            {t('Total Rows').replace("%s", totalRow)}
                                        </div>
                                    </CRow>
                                </CCol>
                                <div className="table-responsive">
                                    <table
                                        className="table purchase-order-list table-striped"
                                        aria-label="simple table"
                                        id="tblSummarizeTotalAmountPrepareTable"
                                    >
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th id="chkboxCheckAll" width="10px" className="text-left text-nowrap align-middle" rowSpan="2">
                                                    <input
                                                        style={{ marginLeft: "3px" }}
                                                        type="checkbox"
                                                        value="all-check"
                                                        checked={allCheck === true}
                                                        onChange={change_checkbox}
                                                    />
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
                                                <th id="tblAmount" className="text-nowrap" colSpan={currency.length} style={{ borderBottom: "1px solid #FFFFFF" }}>
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
                                                <th id="tblTotalAmount" className="text-nowrap" colSpan={currency.length} style={{ borderBottom: "1px solid #FFFFFF" }}>
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
                                                            <tr width="100%">
                                                                <td className="" style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: "#f1f3f8" }}>
                                                                    {
                                                                        <input
                                                                            type="checkbox"
                                                                            value={i.idx}
                                                                            id={i.idx}
                                                                            checked={i.is_checked === true}
                                                                            onChange={change_checkbox}
                                                                        />
                                                                    }
                                                                </td>
                                                                <td className="" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} >
                                                                    {((currentPage - 1) * defaultPerPage) + index + 1}
                                                                </td>
                                                                {
                                                                    !isEmpty(i.cnt) &&
                                                                    <>
                                                                        <td width="" className="" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.cnt} >
                                                                            {i.employee_id}
                                                                        </td>
                                                                        <td width="" className="" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }} rowSpan={i.cnt}>
                                                                            {i.employee_code}
                                                                        </td>
                                                                        <td width="" className="" style={{ textAlign: "left", maxWidth: "200px", backgroundColor: "#f1f3f8" }} rowSpan={i.cnt}>
                                                                            {i.employee_name}
                                                                        </td>
                                                                    </>
                                                                }
                                                                <td width="" className="" style={{ textAlign: "left", maxWidth: "200px", backgroundColor: "#f1f3f8" }}>
                                                                    {i.expense_department_name}
                                                                </td>
                                                                <td width="" className="" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }}>
                                                                    {i.applied_date}
                                                                </td>
                                                                <td width="" className="" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }}>
                                                                    {i.due_date}
                                                                </td>
                                                                <td width="" className="" style={{ textAlign: "left", backgroundColor: "#f1f3f8" }}>
                                                                    {i.amount_type_name}
                                                                </td>
                                                                {
                                                                    i.amount.map((amount, temp) => {
                                                                        return (<Fragment key={temp}>
                                                                            <td className="no-border-radius " style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} >
                                                                                {Number(amount.cost)}
                                                                            </td>
                                                                        </Fragment>)
                                                                    })
                                                                }
                                                                {
                                                                    !isEmpty(i.cnt) && !isEmpty(i.total) &&
                                                                    i.total.map((amt, temp) => {
                                                                        return (<Fragment key={temp}>
                                                                            <td className="no-border-radius" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.cnt} >
                                                                                {isEmpty(amt.total_amount) ? 0 : Math.round(amt.total_amount * 100) / 100}
                                                                            </td>
                                                                        </Fragment>)
                                                                    })
                                                                }
                                                                {
                                                                    !isEmpty(i.cnt) && isEmpty(i.total) &&
                                                                    <>
                                                                        {
                                                                            currency.map((cur, idx) => {
                                                                                return (<Fragment key={idx}>
                                                                                    <td className= "no-border-radius" style={{ textAlign: "right", backgroundColor: "#f1f3f8" }} rowSpan={i.cnt} >
                                                                                        {0}
                                                                                    </td>
                                                                                </Fragment>)
                                                                            })
                                                                        }
                                                                    </>
                                                                }
                                                            </tr>
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
                            <SummarizeTotalAmountPreparePagination
                                defaultPerPage={defaultPerPage}
                                changePage={changePage}
                                currentPage={currentPage}
                                totalPage={totalPage}
                                totalRow={totalRow}
                            ></SummarizeTotalAmountPreparePagination>
                        </CRow>
                    </CCard>
                    <CRow lg="12" >
                        <CCol style={{ textAlign: "center", marginTop: "15px", marginLeft: "25px" }}>
                            <CButton className="form-btn" id='btnPrepareConfirm' onClick={saveData}>{t('Prepare Confirm')}</CButton>
                        </CCol>
                    </CRow>
                </>
            }

        </>
    );
};
export default SummarizeTotalAmountPrepareTable;
