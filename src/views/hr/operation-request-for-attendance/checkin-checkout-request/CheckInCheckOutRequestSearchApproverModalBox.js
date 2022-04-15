import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Message from '../../../brycen-common/message/Message';

const CheckInCheckOutRequestSearchApproverModalBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.approverModalBox === true && (
                <div className="checkIO-request-approver-modal">
                    <CModal
                        size="xl"
                        centered
                        closeOnBackdrop={false}
                        className="addModal"
                        htmlFor="addBtn"
                        show={props.approverModalBox}
                    >
                        <CModalHeader>
                            <h5>{t('Approver List By Position')}</h5>
                        </CModalHeader>
                        <CModalBody>
                            <Message success={[]} error={props.popupError} />
                            <CCard>
                                <CCardBody>
                                    <CRow lg="12">
                                        <CCol lg="4" className="checkIO-request-vertical-border" >
                                            <label className="required" id="lbEmployeeIDModal">{t('Employee ID')}</label>
                                            <div className="input-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeIDModal"
                                                    value={props.empId}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                        <CCol lg="4" className="checkIO-request-vertical-border" >
                                            <label id="lbEmployeeCodeModal">{t('Employee Code')}</label>
                                            <div className="input-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeCodeModal"
                                                    value={props.empCode}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                        <CCol lg="4">
                                            <label id="lbEmployeeNameModal">{t('Employee Name')}</label>
                                            <div className="input-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeNameModal"
                                                    value={props.empName}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                    {props.mainTableModal && props.mainTableModal.length > 0 && (
                                        <CRow id="table" className="mt-3">
                                            <CCol lg="12">
                                                <div className="row-count-msg" style={{ float: "right" }}>{props.rowCount}</div>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblCheckBoxModal" width=""
                                                                    className="text-center checkIO-request-vertical-line-checkbox-thead text-nowrap">
                                                                    <input type="checkbox"
                                                                        value="all-check"
                                                                        checked={props.AllCheck === true}
                                                                        onChange={props.change_checkbox}
                                                                    />
                                                                </th>
                                                                <th id="tblEmployeeIDModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeCodeModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Code")}
                                                                </th>
                                                                <th id="tblEmployeeNameModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblEmployeeEmailModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Email")}
                                                                </th>
                                                                <th id="tblDepartmentModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Department")}
                                                                </th>
                                                                <th id="tblPositionModal" width="" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Position")}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {props.mainTableModal.map((i, index) => {
                                                                return (
                                                                    <Fragment key={index}>
                                                                        <tr width="100%">
                                                                            <td id="tblCheckBoxModal"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                className={props.mainTableModal.length - 1 === index
                                                                                    ? "text-center td-no border-bottom-left-radius text-nowrap"
                                                                                    : "text-center td-no text-nowrap"}
                                                                            >
                                                                                <input type="checkbox"
                                                                                    value={i.approver_id}
                                                                                    id={i.approver_id}
                                                                                    checked={i.is_checked === true}
                                                                                    onChange={props.change_checkbox}
                                                                                />
                                                                            </td>
                                                                            <td id="tblEmployeeIDModal" width="" className="text-right text-nowrap"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                >
                                                                                {i.approver_id}
                                                                            </td>
                                                                            <td id="tblEmployeeCodeModal" width="" className="text-left text-nowrap"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                >
                                                                                {i.approver_code}
                                                                            </td>
                                                                            <td id="tblEmployeeNameModal" width="" className="text-left text-nowrap"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                >
                                                                                {i.approver_name}
                                                                            </td>
                                                                            <td id="tblEmployeeEmailModal" width="" className="text-left text-nowrap"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                >
                                                                                {i.email}
                                                                            </td>

                                                                            <td id="tblDepartmentModal" width="" className="td-pink text-left no-border-radius text-nowrap">
                                                                                {i.department}
                                                                            </td>
                                                                            <td id="tblPositionModal" width=""
                                                                                className={props.mainTableModal.length - 1 === index
                                                                                    ? "td-orange text-left border-bottom-right-radius text-nowrap"
                                                                                    : "td-orange text-left text-nowrap"}
                                                                            >
                                                                                {i.position}
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
                                    )}
                                    <CRow lg="12" className="mt-3">
                                        <CCol style={{ textAlign: "center" }}>
                                            <CButton
                                                className="form-btn mr-lg-3 m-1"
                                                id='btnAddModal'
                                                name='btnAddModal'
                                                onClick={props.addApprover}
                                            >{t('Add')}
                                            </CButton>
                                            <CButton
                                                className="form-btn ml-lg-3 m-1"
                                                id='btnCloseModal'
                                                name='btnCloseModal'
                                                onClick={props.closeApproverModal}
                                            >{t('Close')}
                                            </CButton>
                                        </CCol>
                                    </CRow>

                                </CCardBody>
                            </CCard>

                        </CModalBody>
                    </CModal>
                </div>
            )}
        </>
    )
}
export default CheckInCheckOutRequestSearchApproverModalBox;