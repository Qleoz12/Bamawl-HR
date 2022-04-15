import { CCard, CCol, CImg, CPagination, CRow } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExportEmployeeList from "./ExportEmployeeList";

const EmployeeListTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (<>
        {props.mainTable && props.mainTable.length > 0 && (
            <CCard className="table-panel emp-list-card-border-color">
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12" className="mt-2">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="tblNo" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Employee ID")}
                                        </th>
                                        <th id="tblBonusTitle" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Employee Name")}
                                        </th>
                                        <th id="tblYearMonth" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Email")}
                                        </th>
                                        <th id="tblLimit" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Start Working Date")}
                                        </th>
                                        <th id="tblMethod" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Resign Date")}
                                        </th>
                                        <th id="tblIncludeSalary" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Phone")}
                                        </th>
                                        <th id="tblIncludeTax" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Eligible")}
                                        </th>
                                        <th id="tblEdit" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Role")}
                                        </th>
                                        <th id="tblDelete" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Detail")}
                                        </th>
                                        <th id="tblDelete" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Resign")}
                                        </th>
                                        <th id="tblDelete" width="" className="responsive-tableTh">
                                            <CImg
                                                className="mr-2 emp-list-title-icon-img-col-table"
                                                src="avatars/titleicon.png"
                                                alt="titleicon"
                                            />
                                            {t("Edit")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.mainTable.map((i, index) => {
                                        return (
                                            <tr key={index} width="100%">
                                                <td id="tblEmployeeID" width="" className="td-no text-right text-nowrap">
                                                    {i.employee_id}
                                                </td>
                                                <td id="tblEmployeeName" width="" className="td-green text-left text-nowrap">
                                                    {i.employee_name}
                                                </td>
                                                <td id="tblEmail" width="" className="td-pink text-left text-nowrap">
                                                    {i.email}
                                                </td>
                                                <td
                                                    id="tblStartWorkingDate" width="" className="text-center text-nowrap">
                                                    {i.join_date}
                                                </td>
                                                <td id="tblResignDate" width="" className="text-center text-nowrap">
                                                    {i.resigned_date}
                                                </td>
                                                <td id="tblPhone" width="" className="td-orange text-right text-nowrap">
                                                    {i.phone}
                                                </td>
                                                <td id="tblEligible" width="" className="td-include-tax text-left text-nowrap">
                                                    {i.eligible_noneligible !== null ?
                                                        props.getEligibleData(i.eligible_noneligible) :
                                                        ""}
                                                </td>
                                                <td id="tblRole" width="" className="td-include-tax text-left text-nowrap">
                                                    {i.admin_level_name}
                                                </td>
                                                {i.is_new === false && (
                                                    <Fragment>
                                                        <td id="tblDetails" width="" className="text-center">
                                                            <input
                                                                type="image"
                                                                src={"avatars/detail-user.png"}
                                                                className="icon-clt epm-list-img"
                                                                alt="detail"
                                                                onClick={props.getDetails.bind(this, i)}
                                                            />
                                                        </td>
                                                        <td width="" id="tblResign" className="text-center">
                                                            <input
                                                                type="image"
                                                                src={"avatars/resign-user.png"}
                                                                className={i.resigned_flag === 1 ?
                                                                    "icon-clt epm-list-img " : "icon-clt epm-list-img epm-list-icon-resign"}
                                                                alt="resign"
                                                                onClick={props.changeResign.bind(this, i)}
                                                            />
                                                        </td>
                                                    </Fragment>
                                                )}
                                                {i.is_new === true && (
                                                    <Fragment>
                                                        <td id="tblDetails" width="" className="text-center">
                                                        </td>
                                                        <td width="" id="tblResign" className="text-center">
                                                        </td>
                                                    </Fragment>
                                                )}
                                                <td width="" id="tblEdit" className="text-center">
                                                    {((i.resigned_flag === 1 && i.is_new === false) || i.is_new === true) &&
                                                        (<input
                                                            type="image"
                                                            src={"avatars/edit-user.png"}
                                                            className="icon-clt epm-list-img"
                                                            alt="edit"
                                                            onClick={props.editToggleAlert.bind(this, i)}
                                                        />)
                                                    }
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
                
                <ExportEmployeeList exportAPI={props.exportAPI} />
            </CCard>
        )}
        <br />

    </>)

}
export default EmployeeListTable;
