import {
    CCard,
    CCol,
    CImg,
    CPagination,
    CRow
} from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ListTableBonusRateList = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.mainTable && props.mainTable.length > 0 && (
                <CCard className="table-panel bonus-rate-list-card-border">
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
                                            <th id="tblNo" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="titleicon"
                                                />
                                                {t("No")}
                                            </th>
                                            <th id="tblBonusTitle" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="bonusTitle"
                                                />
                                                {t("Bonus Title")}
                                            </th>
                                            <th id="tblYearMonth" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="year-month"
                                                />
                                                {t("Year-Month")}
                                            </th>
                                            <th id="tblLimit" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="limit"
                                                />
                                                {t("Limit")}
                                            </th>
                                            <th id="tblMethod" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="method"
                                                />
                                                {t("Method")}
                                            </th>
                                            {/* <th id="tblIncludeSalary" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="include-salary"
                                                />
                                                {t("Include Basic salary or Total salary or not")}
                                            </th> */}
                                            <th id="tblIncludeTax" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="include-tax"
                                                />
                                                {t("Include Tax")}
                                            </th>
                                            <th id="tblEdit" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="edit"
                                                />
                                                {t("Edit")}
                                            </th>
                                            <th id="tblDelete" width="" className="bonus-rate-list-tableTh">
                                                <CImg
                                                    className="mr-2 bonus-rate-list-title-icon-img-col-table"
                                                    src="avatars/titleicon.png"
                                                    alt="titleicon"
                                                />
                                                {t("Delete")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.mainTable.map((i, index) => {
                                            return (
                                                <tr key={index} width="100%">
                                                    <td id="tblNo" width="" className="td-no text-right">
                                                        {index + (props.currentPage - 1) * props.perPage + 1}
                                                    </td>
                                                    <td id="tblBonusTitle" width="" className="td-emp-id text-left text-nowrap">
                                                        {i.bonus_title}
                                                    </td>
                                                    <td
                                                        id="tblYearMonth"
                                                        width=""
                                                        className="td-year-month td-green text-left text-nowrap"
                                                    >
                                                        {i.bonus_year !== "" ?
                                                            ((i.bonus_year <= 1) ? i.bonus_year + " " + t("year") : i.bonus_year + " " + t("years"))
                                                            : ""}
                                                        &nbsp;
                                                        {i.bonus_month !== "" ?
                                                            ((i.bonus_month <= 1) ? i.bonus_month + " " + t("month") : i.bonus_month + " " + t("months"))
                                                            : ""}
                                                    </td>
                                                    <td id="tblLimit" width="" className="td-limit text-left text-nowrap">
                                                        {props.getLimitData(i.bonus_limit)}
                                                    </td>
                                                    <td
                                                        id="tblMethod"
                                                        width=""
                                                        className="td-method td-orange text-left text-nowrap"
                                                    >
                                                        {props.getMethodData(i.method_id)}
                                                    </td>
                                                    {/* <td
                                                        id="tblIncludeSalary"
                                                        width=""
                                                        className="td-include-salary td-blue text-left text-nowrap"
                                                    >
                                                        {props.getIncludeData(i.include_basic_salary, i.include_total_salary)}
                                                    </td> */}
                                                    <td id="tblIncludeTax" width="" className="td-include-tax text-center">
                                                        {i.include_tax &&
                                                            <CImg
                                                                src={"avatars/Include Tax.png"}
                                                                className="bonus-rate-list-include-tax-img"
                                                                alt="includeTax"
                                                            />
                                                        }
                                                        {
                                                            !i.include_tax &&
                                                            <CImg
                                                                src={"avatars/decrease.png"}
                                                                className="bonus-rate-list-include-tax-img"
                                                                alt="includeTax"
                                                            />
                                                        }
                                                    </td>
                                                    <td width="" id="tblEdit" className="td-joined-date">
                                                        <input
                                                            type="image"
                                                            src={"avatars/edit.png"}
                                                            className="icon-clt bonus-rate-list-edit-img"
                                                            alt="edit"
                                                            onClick={props.editToggleAlert.bind(this, i)}
                                                        />
                                                    </td>
                                                    <td width="" id="tblDelete" className="">
                                                        <input
                                                            type="image"
                                                            src={"avatars/remove.png"}
                                                            className="icon-clt bonus-rate-list-delete-img"
                                                            alt="delete"
                                                            onClick={props.deleteToggleAlert.bind(this, i)}
                                                        />
                                                    </td>
                                                </tr>
                                            );
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
                </CCard>
            )}
            <br />
        </>
    );
};
export default ListTableBonusRateList;
