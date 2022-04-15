/* eslint-disable no-use-before-define */
import React, {  useEffect } from "react";
import { CCard,CCol, CRow, CImg, } from "@coreui/react";
import { useTranslation } from "react-i18next";

const BonusPayslipMailSentTableModal = (props) => {
    let {
        allCheck,
        changeCheckbox,
        listEmployeeModal,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
        {
            listEmployeeModal.length>0&&(
                <div className="table-panel card-table " style={{ width: "100%",padding:"15px 15px" }}>
                    <CRow id="table" style={{paddingTop:"10px"}}>
                        <CCol lg="12">
                            <div className="table-responsive">
                                <table
                                    className="table purchase-order-list table-striped"
                                    aria-label="simple table"
                                    id="tbEmployeeSelectList"
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
                                                onChange={changeCheckbox}
                                                />
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
                                                id="tblEmail"
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
                                                {t("Email")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                        listEmployeeModal.map((i, index) => {
                                            return (
                                                <tr width="100%" key={index}>
                                                    <td
                                                        className="td-num text-center"
                                                        style={{
                                                            borderLeft: "3px solid #858BC3",
                                                        }}
                                                    >
                                                        {
                                                            i.is_exist!=true&&(
                                                                <input
                                                                    type="checkbox"
                                                                    value={i.employee_id}
                                                                    id={i.employee_id}
                                                                    checked={i.is_checked === true}
                                                                    onChange={changeCheckbox}
                                                                />
                                                            )
                                                        }
                                                    </td>
                                                    <td
                                                        className="text-right text-wrap"
                                                    >
                                                        {i.employee_id}
                                                    </td>
                                                    <td
                                                        className="text-left text-wrap"
                                                    >
                                                        {i.code}
                                                    </td>
                                                    <td
                                                        className="text-left text-wrap"
                                                    >
                                                        {i.employee_name}
                                                    </td>
                                                    <td
                                                        className="text-left td-email text-wrap"
                                                    >
                                                        {i.email}
                                                    </td>
                                                </tr>
                                             )})
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </div>
            )
        }
        </>
    );
};
export default BonusPayslipMailSentTableModal;
