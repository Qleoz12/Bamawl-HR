import { CButton, CCard, CCol, CImg, CLabel, CRow, CSelect } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ApproverListModalExpenseRequestBox from "./ApproverListModalExpenseRequestBox";

const ExpenseRequestApproverTableBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {
                (props.mainTable && props.mainTable.length > 0)
                && (props.approverSetting == 2 || props.approverSetting == 3)
                && props.positionRank == false && (
                    <CRow lg="12">
                        <CCol lg="5" style={{ marginBottom: "10px" }}>
                            <CLabel id="lbApprover">
                                {t("Approver")}
                            </CLabel>
                        </CCol>
                    </CRow>
                )
            }
            {
                (props.approverSetting == 1 || props.approverSetting == 4 || props.approverSetting == 5) && props.positionRank == false && (
                    <Fragment>
                        <CRow lg="12">
                            <CCol lg="5" style={{ marginBottom: "10px" }}>
                                <CLabel id="lbApprover">
                                    {t("Approver")}
                                </CLabel>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol>
                                <CCard className="expense-request-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                                    <CRow lg="12">
                                        <CCol className="pl-lg-5" lg="5" style={{ marginBottom: "10px" }}>
                                            <CLabel className="required" id="lbApproverCard">
                                                {t("Approver")}
                                            </CLabel>
                                        </CCol>
                                    </CRow>
                                    <CRow lg="12" className="move_from_bottom expense-request-approver-search">
                                        <CCol className="pl-lg-5 expense-request-approver-search-item" lg="4" xs="7">
                                            <CSelect id="dropApprover" className="bamawl-select"
                                                value={props.approverState} onChange={props.approverChange} custom>
                                                <option key="" value="">{t('---Select Approvers---')}</option>
                                                {props.approverData && props.approverData.position && props.approverData.position.map((item, index) => {
                                                    return (
                                                        <option key={index} value={"pos" + item.id} position={item.id}>
                                                            {item.position_name}
                                                        </option>
                                                    )
                                                })}
                                                {props.approverData && props.approverData.department && props.approverData.department.map((item, index) => {
                                                    return (
                                                        <option key={index} value={"dep" + item.id} department={item.id}>
                                                            {item.department_name}
                                                        </option>
                                                    )
                                                })}
                                            </CSelect>
                                        </CCol>
                                        <CCol lg="2" xs="5" >
                                            <CButton id="btnSearchApprover" className="form-btn" onClick={props.searchApproverAPI} >{t('Search')}</CButton>
                                        </CCol>
                                    </CRow>
                                </CCard>
                            </CCol>
                        </CRow>
                    </Fragment>
                )}
            <ApproverListModalExpenseRequestBox
                empID={props.empID}
                empCode={props.empCode}
                empName={props.empName}
                approverModalBox={props.approverModalBox}
                closeApproverModal={props.closeApproverModal}
                mainTableModal={props.mainTableModal}
                change_checkbox={props.change_checkbox}
                AllCheck={props.AllCheck}
                addApprover={props.addApprover}
                popupError={props.popupError}
                removeMessagePopup={props.removeMessagePopup}
                rowCount={props.rowCount}
            />
            <CRow lg="12">
                <CCol>
                    {props.mainTable && props.mainTable.length > 0 && (
                        <CCard className="expense-request-card-detail">
                            <CRow id="table" className="mt-3">
                                <CCol lg="12">
                                    <div className="row-count-msg" style={{ float: "right" }}>{t('Total Rows').replace('%s',props.rowCountApproverData)}</div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead id="thead-id">
                                                <tr width="100%">
                                                    <th id="tblEmployeeID" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Employee ID")}
                                                    </th>
                                                    <th id="tblApproverID" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Approver ID")}
                                                    </th>
                                                    <th id="tblApproverName" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Approver Name")}
                                                    </th>
                                                    <th id="tblEmailApprover" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Email")}
                                                    </th>
                                                    <th id="tblDepartmentApprover" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Department")}
                                                    </th>
                                                    <th id="tblPositionApprover" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("Position")}
                                                    </th>
                                                    <th id="tblDeleteApprover" width="" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 expense-request-img-table"
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
                                                        <Fragment key={index}>
                                                            <tr width="100%">
                                                                <td id="tblEmployeeID" width=""
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "text-right border-bottom-left-radius text-nowrap" : "text-right text-nowrap"}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    {props.empID}
                                                                </td>
                                                                <td id="tblApproverID" width="" className="text-right td-green text-nowrap"
                                                                >
                                                                    {i.approver_id}
                                                                </td>
                                                                <td id="tblApproverName" width="" className="text-left text-nowrap"
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    {i.approver_name}
                                                                </td>
                                                                <td id="tblEmailApprover" width="" className="text-left text-nowrap"
                                                                    style={{background: "#d6f7df"}}
                                                                >
                                                                    {i.email}
                                                                </td>

                                                                <td id="tblDepartmentApprover" width="" className="text-left text-nowrap no-border-radius">
                                                                    {i.department}
                                                                </td>
                                                                <td id="tblPositionApprover" width="" className="text-left text-nowrap no-border-radius">
                                                                    {i.position}
                                                                </td>

                                                                <td id="tblDeleteApprover" width=""
                                                                    className={props.mainTable.length - 1 === index
                                                                        ? "text-center align-self-center border-bottom-right-radius"
                                                                        : "text-center align-self-center"}
                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                >
                                                                    <input
                                                                        type="image"
                                                                        src={"avatars/remove.png"}
                                                                        className="icon-clt expense-request-delete-img "
                                                                        alt="delete"
                                                                        onClick={props.deleteApprover.bind(this, i)}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </Fragment>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </CCol>
                            </CRow>
                        </CCard>
                    )}
                </CCol>
            </CRow>
        </>
    )

}
export default ExpenseRequestApproverTableBox;
