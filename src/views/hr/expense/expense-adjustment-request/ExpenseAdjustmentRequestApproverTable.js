import {  CCard, CCol, CImg, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequestApproverTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            { props.checkPosition==false &&(<>
            <CRow lg="12">
                <CCol>
                    <CCard className="card">
                        <CRow id="table" className="mt-3">
                            <CCol lg="12">
                                <div className="table-responsive no-border-header">
                                    <table className="table">
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th id="tblNo"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Employee ID")}
                                                </th>
                                                <th id="tblEmployeeID"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Approver ID")}
                                                </th>
                                                <th id="tblEmployeeName"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Approver Name")}
                                                </th>
                                                <th id="tblEmail"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Email")}
                                                </th>
                                                <th id="tblDepartment"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Department")}
                                                </th>
                                                <th id="tblPosition"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Position")}
                                                </th>
                                                <th id="tblDelete"  className="responsive-tableTh">
                                                    <CImg
                                                        className="mr-2 imgTitle"
                                                        src="/avatars/titleicon.png"
                                                        alt="titleicon"
                                                    />
                                                    {t("Delete")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {props.mainTable?.map((i, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        {
                                                            <tr width="100%">
                                                                <td className={props.mainTable.length-1 === index ? "border-bottom-left-radius text-right" : "text-right"}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF'}}
                                                                    >
                                                                    {props.employeeID}
                                                                </td>
                                                                <td className="text-right td-green"
                                                                    >
                                                                    { i.approver_id}
                                                                </td>
                                                                <td className="text-left" style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                    >
                                                                    { i.approver_name}
                                                                </td>
                                                                <td className="text-left col-color-blue"
                                                                    >
                                                                    {i.email}
                                                                </td>
                                                                <td className="text-left no-border-radius">
                                                                    {i.department}
                                                                </td>
                                                                <td className="text-left no-border-radius">
                                                                    {i.position}
                                                                </td>
                                                                <td className={props.mainTable.length-1 === index ? "border-bottom-right-radius td-include-tax text-center align-self-center" :"td-include-tax text-center align-self-center td-gray"}
                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                                    <input
                                                                        className="icon-clt"
                                                                        type="image"
                                                                        src={"avatars/remove.png"}
                                                                        alt="delete"
                                                                        onClick={props.deleteApprover.bind(this, i)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        }
                                                    </Fragment>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </CCol>
                        </CRow>
                    </CCard>
                </CCol>
            </CRow>
            </>)}
        </>
    )

}
export default ExpenseAdjustmentRequestApproverTable;
