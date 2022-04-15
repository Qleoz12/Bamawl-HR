import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Message from '../../../brycen-common/message/Message';
const ApproverListConfirmation = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {
        popupError,
        approverModalBox,
        closeApproverModal,
        employeeID,
        employeeCode,
        employeeName,
        mainTableModal,
        rowCount,
        AllCheck,
        change_checkbox,
        addApprover,
    } = props;
    return (
        <>
            {approverModalBox === true && (
                <div>
                    <CModal size="xl"  centered closeOnBackdrop={false} show={approverModalBox} onClose={closeApproverModal}>
                        <CModalHeader>
                            <h5>{t('Approver List By Position')}</h5>
                        </CModalHeader>
                        <CModalBody>
                            {popupError && popupError.length > 0 &&
                                <Message error={popupError} success={[]} ></Message>
                            }
                            <CCard className="box box-white">
                                <CCardBody>
                                    <CRow lg="12">
                                        <CCol lg="4" className="checkIO-request-vertical-border" >
                                            <label id="lbEmployeeIDModal">{t('Employee ID')}
                                                <span className="checkIO-request-label-require">*</span>
                                            </label>
                                            <div className="input-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeIDModal"
                                                    value={employeeID}
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
                                                    value={employeeCode}
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
                                                    value={employeeName}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                    {mainTableModal && mainTableModal.length > 0 && (
                                        <CRow id="table" className="mt-3">
                                            <CCol lg="12">
                                                <div className="row-count-msg" style={{ float: "right" }}>{rowCount}</div>
                                                <div className="table-responsive">
                                                    <table className="table ">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblCheckBoxModal" width=""
                                                                    className="text-center checkIO-request-vertical-line-checkbox-thead responsive-tableTh">
                                                                    <input type="checkbox"
                                                                        value="all-check"
                                                                        checked={AllCheck === true}
                                                                        onChange={change_checkbox}
                                                                    />
                                                                </th>
                                                                <th id="tblEmployeeIDModal" width="" className="responsive-tableTh">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeCodeModal" width="" className="responsive-tableTh">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Code")}
                                                                </th>
                                                                <th id="tblEmployeeNameModal" width="" className="responsive-tableTh">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblEmployeeEmailModal" width="" className="responsive-tableTh">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Email")}
                                                                </th>
                                                                <th id="tblDepartmentModal" width="" className="responsive-tableTh">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Department")}
                                                                </th>
                                                                <th id="tblPositionModal" width="" className="responsive-tableTh">
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
                                                            {mainTableModal.map((i, index) => {
                                                                return (
                                                                    <Fragment key={index}>
                                                                        <tr width="100%" >
                                                                                <td id="tblCheckBoxModal" className={props.mainTableModal.length-1 === index ? "border-bottom-left-radius text-center": "text-center"}
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                    <input type="checkbox"
                                                                                        value={i.approver_id}
                                                                                        id={i.approver_id}
                                                                                        checked={i.is_checked === true}
                                                                                        onChange={change_checkbox}
                                                                                    />
                                                                                </td>
                                                                                <td id="tblEmployeeIDModal" width="" className="text-right"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    >
                                                                                    {i.approver_id}
                                                                                </td>
                                                                                <td id="tblEmployeeCodeModal" width="" className="text-right"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    >
                                                                                    {i.approver_code}
                                                                                </td>
                                                                                <td id="tblEmployeeNameModal" width="" className="text-left"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    >
                                                                                    {i.approver_name}
                                                                                </td>
                                                                                <td id="tblEmployeeEmailModal" width="" className="text-left"
                                                                                    style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                                    >
                                                                                    {i.email}
                                                                                </td>
                                                                            <td id="tblDepartmentModal" width="" className="td-blue-customer text-left no-border-radius">
                                                                                {i.department}
                                                                            </td>
                                                                            <td id="tblPositionModal" width="" className={mainTableModal.length-1==index? "border-bottom-right-radius td-blue-customer text-left" : "td-blue-customer text-left" }>
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
                                                className="form-btn mr-3"
                                                id='btnAddModal'
                                                name='btnAddModal'
                                                onClick={addApprover}
                                            >{t('Add')}
                                            </CButton>
                                            <CButton
                                                className="form-btn ml-3"
                                                id='btnCloseModal'
                                                name='btnCloseModal'
                                                onClick={closeApproverModal}
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
export default ApproverListConfirmation;
