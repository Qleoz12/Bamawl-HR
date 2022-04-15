/* eslint-disable no-use-before-define */
import React, {  useEffect } from "react";
import { CCard,CCol, CRow, CImg, } from "@coreui/react";
import { useTranslation } from "react-i18next";
import EmployeeShiftAssignListPagination from "./EmployeeShiftAssignListPagination";
import DeleteExportEmployeeShiftAssignList from "./DeleteExportEmployeeShiftAssignList"
const EmployeeShiftAssignListTable = (props) => {
    let {
        totalRow,
        listEmployeeShiftAssign,
        allCheck,
        changeCheckbox,
        defaultPerPage,
        changePage,
        currentPage,
        totalPage,
        deleteClick,
        exportClick,
        checkShowCheckbox
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    //convert id Allowance Category and Allowance Type to name
    const convertToDay = (dateString) => {
        let date=new Date(dateString);
        switch (date.getDay()) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "";
        }
    };
    return (
        <>
        {
            listEmployeeShiftAssign.length>0&&(
            <CCard className="table-panel box box-white" style={{ width: "100%" }}>
                <CRow id="table" style={{paddingTop:"10px"}}>
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg" id="lblTotalRows">
                                    {t('Total Rows').replace('%s',totalRow)}
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
                                            <th
                                                id="tblCheckBox"
                                                width="10px"
                                                className="text-left text-nowrap"
                                            >
                                            <input
                                                style={{marginLeft:"3px"}}
                                                type="checkbox"
                                                value="all-check"
                                                checked={allCheck === true}
                                                disabled={checkShowCheckbox}
                                                onChange={changeCheckbox}
                                                />
                                            </th>
                                        <th
                                            id="tblAssignDate"
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
                                            {t("Shift Name")}
                                        </th>
                                        <th
                                            id="tblAssignDate"
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
                                            {t("Assign Date")}
                                        </th>
                                        <th
                                            id="tblAssignDay"
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
                                            {t("Assign Day")}
                                        </th>
                                        <th
                                            id="tblEmployeeID"
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
                                            {t("Employee ID")}
                                        </th>
                                        <th
                                            id="tblEmployeeName"
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
                                            {t("Employee Name")}
                                        </th>
                                        <th
                                            id="tblEmployeeCode"
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
                                            {t("Employee Code")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    listEmployeeShiftAssign.map((i, index) => {
                                        return (
                                            <tr width="100%" key={index}>
                                                        <td
                                                            className="td-num text-center text-wrap"
                                                            style={{
                                                                borderLeft: "3px solid #858BC3",
                                                            }}
                                                        >{
                                                            i.shift_chk==0&&(
                                                                <input
                                                                type="checkbox"
                                                                value={i.id}
                                                                id={i.id}
                                                                checked={i.is_checked === true}
                                                                onChange={changeCheckbox}
                                                            />
                                                            )
                                                        }
                                                            
                                                        </td>
                                                <td
                                                    className="text-left text-wrap"
                                                >
                                                    {i.sn_name}
                                                </td>
                                                <td
                                                    className="text-center td-overtime-type text-wrap"
                                                >
                                                    {i.assign_date.split(" ")[0]}
                                                </td>
                                                <td
                                                    className="text-left td-overtime-type text-wrap"
                                                >
                                                    {convertToDay(i.assign_date)}
                                                </td>
                                                <td
                                                    className="text-right text-wrap"
                                                >
                                                    {i.employee_id}
                                                </td>
                                                <td
                                                    className="td-overtime-title text-left text-wrap"
                                                >
                                                    {i.employee_name}
                                                </td>
                                                <td
                                                    className="td-overtime-title text-left text-wrap"
                                                >
                                                    {i.code}
                                                </td>
                                            </tr>
                                        )})
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
                <CRow>
                    <EmployeeShiftAssignListPagination
                        defaultPerPage={defaultPerPage}
                        changePage={changePage}
                        currentPage={currentPage}
                        totalPage={totalPage}
                        totalRow={totalRow}
                    ></EmployeeShiftAssignListPagination>
                </CRow>
                <DeleteExportEmployeeShiftAssignList
                            deleteClick={deleteClick}
                            exportClick={exportClick}
                ></DeleteExportEmployeeShiftAssignList>
            </CCard>
            )
        }
        </>
    );
};
export default EmployeeShiftAssignListTable;
