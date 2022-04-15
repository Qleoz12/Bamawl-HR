/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CCard, CCol, CRow, CImg} from "@coreui/react";
import AllowanceListPagination from "./AllowanceListPagination";
const AllowanceListTable = (props) => {
    let {
        countRecord,
        dataTableAPI,
        currentPage,
        defaultPerPage,
        showModelEdit,
        showModelDelete,
        changePage,
        totalPage,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    //convert id Allowance Category and Allowance Type to name
    const convertAllowanceCategory = (id) => {
        switch (id) {
            case 1:
                return "Experience";
            case 2:
                return "Qualification";
            case 3:
                return "Other";
            default:
                return "";
        }
    };
    const convertAllowanceType = (id) => {
        switch (id) {
            case 1:
                return "Monthly";
            case 2:
                return "Daily";
            case 3:
                return "One Time";
            case 4:
                return "Others";
            default:
                return "";
        }
    };
    return (
        <>
            {dataTableAPI != "" && (
                <CRow style={{ justifyContent: "center"}} className="mt-4">
                    <CCol lg="12">
                    <CCard className="table-panel box box-white" style={{ width: "100%" }}>
                        <CRow id="table">
                            <CCol lg="12">
                                <CCol lg="12">
                                    <CRow alignHorizontal="end">
                                        {dataTableAPI != "" && (
                                            <div className="row-count-msg" id="lblTotalRows">{t('Total Rows').replace('%s',countRecord)}</div>
                                        )}
                                    </CRow>
                                </CCol>
                                <div className="table-responsive">
                                    <table
                                        className="table purchase-order-list table-striped"
                                        aria-label="simple table"
                                        id="tblAllowance"
                                    >
                                        {dataTableAPI != "" && (
                                            <thead id="thead-id">
                                                <tr width="100%">
                                                    <th
                                                        id="tblNo"
                                                        width="20px"
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
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
                                                    <th
                                                        id="tblAllowanceTitle"
                                                        width=""
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="list-icon"
                                                            width="6px"
                                                            style={{
                                                                marginRight: "10px",
                                                                marginBottom: "6px",
                                                            }}
                                                        />
                                                        {t("Allowance Title")}
                                                    </th>
                                                    <th
                                                        id="tblAllowanceCategory"
                                                        width=""
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="list-icon"
                                                            width="6px"
                                                            style={{
                                                                marginRight: "10px",
                                                                marginBottom: "6px",
                                                            }}
                                                        />
                                                        {t("Allowance Category")}
                                                    </th>
                                                    <th
                                                        id="tblAllowanceType"
                                                        width=""
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="list-icon"
                                                            width="6px"
                                                            style={{
                                                                marginRight: "10px",
                                                                marginBottom: "6px",
                                                            }}
                                                        />
                                                        {t("Allowance Type")}
                                                    </th>
                                                    <th
                                                        id="tblEdit"
                                                        width=""
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="list-icon"
                                                            width="6px"
                                                            style={{
                                                                marginRight: "10px",
                                                                marginBottom: "6px",
                                                            }}
                                                        />
                                                        {t("Edit")}
                                                    </th>
                                                    <th
                                                        id="tblRemove"
                                                        width=""
                                                        style={{
                                                            textAlign: "left",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        <CImg
                                                            src={"avatars/titleicon.png"}
                                                            className="list-icon"
                                                            width="6px"
                                                            style={{
                                                                marginRight: "10px",
                                                                marginBottom: "6px",
                                                            }}
                                                        />
                                                        {t("Remove")}
                                                    </th>
                                                </tr>
                                            </thead>
                                        )}
                                        <tbody>
                                            {dataTableAPI != "" &&
                                                dataTableAPI.map((i, index) => {
                                                    return (
                                                        <tr width="100%" key={index} className={dataTableAPI.length-1 === index ? "border-bottom-right-radius" : ""}>
                                                            <>
                                                                <td
                                                                    className="td-num"
                                                                    style={{
                                                                        borderLeft: "3px solid #858BC3",
                                                                        textAlign: "right",
                                                                    }}
                                                                >
                                                                    {(currentPage - 1) * defaultPerPage + index + 1}
                                                                </td>

                                                                <td
                                                                    width=""
                                                                    className="td-emp-name"
                                                                    style={{ textAlign: "left",overflowWrap:'anywhere' }}
                                                                >
                                                                    {i.allowance_name}
                                                                </td>
                                                            </>
                                                            <td
                                                                width=""
                                                                className="td-dept td-pink"
                                                                style={{ textAlign: "left" }}
                                                            >
                                                                {convertAllowanceCategory(i.allowance_category)}
                                                            </td>
                                                            <td
                                                                width=""
                                                                style={{ textAlign: "left" }}
                                                                className="td-overtime-type"
                                                            >
                                                                {convertAllowanceType(i.allowance_type)}
                                                            </td>
                                                            <td width="20px" className="">
                                                                <input
                                                                    type="image"
                                                                    src={"avatars/edit.png"}
                                                                    onClick={showModelEdit.bind(this, i)}
                                                                    className="icon-clt"
                                                                    alt="edit"
                                                                    id={i.id}
                                                                />
                                                            </td>
                                                            <td width="20px" className="">
                                                                <input
                                                                    type="image"
                                                                    src={"avatars/remove.png"}
                                                                    onClick={showModelDelete.bind(this, i)}
                                                                    className="icon-clt"
                                                                    alt="remove"
                                                                    id={i.id}
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
                        <CRow>
                            <AllowanceListPagination
                            defaultPerPage={defaultPerPage}
                                changePage={changePage}
                                currentPage={currentPage}
                                totalPage={totalPage}
                                countRecord={countRecord}
                            ></AllowanceListPagination>
                        </CRow>
                        <br />
                    </CCard>
                    </CCol>
                </CRow>
            )}
        </>
    );
};
export default AllowanceListTable;
