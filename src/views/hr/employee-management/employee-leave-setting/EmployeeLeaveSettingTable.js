/* eslint-disable no-use-before-define */
import React, {  useEffect } from "react";
import { CCard,CCol, CRow, CImg, } from "@coreui/react";
import { useTranslation } from "react-i18next";
const EmployeeLeaveSettingTable = (props) => {
    let {
        listEmployeeLeaveSetting,
        totalEmployeeLeaveSetting,
        showModelDelete,
        clickEdit,
        checkDetailEdit,
        DetailEdit
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    //convert id Allowance Category and Allowance Type to name
    const convertStatusYear = (id) => {
        switch (id) {
            case 0:
                return "Last Year";
            case 1:
                return "Current Year";
            case 2:
                return "Next Year";
            default:
                return "";
        }
    };
    return (
        <>
        {
            listEmployeeLeaveSetting.length>0&&(
            <CCard className="table-panel box box-white" style={{ width: "100%" }}>
                <CRow id="table" style={{paddingTop:"10px"}}>
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg" id="lblTotalRows">
                                   {t('Total Rows').replace('%s',totalEmployeeLeaveSetting)}
                                </div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table
                                className="table purchase-order-list table-striped"
                                aria-label="simple table"
                                id="tblAllowance"
                            >
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th
                                            id="tblLeaveType"
                                            className="text-left text-nowrap"
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
                                            {t("Leave Type")}
                                        </th>
                                        <th
                                            id="tblStartDate"
                                            className="text-left text-nowrap"
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
                                            {t("Start Date")}
                                        </th>
                                        <th
                                            id="tblEndDate"
                                            className="text-left text-nowrap"
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
                                            {t("End Date")}
                                        </th>
                                        <th
                                            id="tblTotalLeaveDate"
                                            className="text-nowrap text-left"
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
                                            {t("Total Leave Date")}
                                        </th>
                                        <th
                                            id="tblMaximumCarryAllowedDays"
                                            className="text-nowrap text-left"
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
                                            {t("Maximum Carry Allowed Days")}
                                        </th>
                                        <th
                                            id="tblRemainLeaveDay"
                                            className="text-nowrap text-left"
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
                                            {t("Remain Leave Day")}
                                        </th>
                                        <th
                                            id="tblYear"
                                            className="text-nowrap text-left"
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
                                            {t("Year")}
                                        </th>
                                        {
                                            checkDetailEdit==DetailEdit.EDIT&&(
                                                <>
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
                                                        </>
                                                    )
                                                }
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    listEmployeeLeaveSetting.map((i, index) => {
                                        return (
                                            <tr width="100%" key={index}>
                                                    <td
                                                        className="td-num text-left"
                                                        style={{
                                                            borderLeft: "3px solid #858BC3",
                                                        }}
                                                    >
                                                        {i.leave_name}
                                                    </td>

                                                    <td
                                                        className="td-emp-name text-center"
                                                        style={{ textAlign: "center"}}
                                                    >
                                                        {i.start_date.split(" ")[0]}
                                                    </td>
                                                <td
                                                    className="td-dept td-pink text-center"
                                                >
                                                    {i.end_date.split(" ")[0]}
                                                </td>
                                                <td
                                                    className="text-right"
                                                >
                                                    {i.total_max_day}
                                                </td>
                                                <td
                                                    className="text-right"
                                                >
                                                    {i.max_carry_day}
                                                </td>
                                                <td
                                                    className="td-overtime-title text-right"
                                                >
                                                    {i.remain_day}
                                                </td>
                                                <td
                                                    width=""
                                                    style={{fontWeight:'bold' }}
                                                    className="td-dept td-pink text-left"
                                                >
                                                    {convertStatusYear(i.year_status)}
                                                </td>
                                                {
                                                    checkDetailEdit==DetailEdit.EDIT&&
                                                    (
                                                        <>
                                                        <td width="20px" className="">
                                                            <input
                                                                type="image"
                                                                src={"avatars/edit.png"}
                                                                onClick={clickEdit.bind(this, i)}
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
                                                        </>
                                                    )

                                                }
                                            </tr>
                                        )})
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
            )
        }
        
        </>
    );
};
export default EmployeeLeaveSettingTable;
