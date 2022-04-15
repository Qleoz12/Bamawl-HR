import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CModalHeader, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { TextField } from "@material-ui/core";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAdjustmentRequestModalApprover = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {approverModalBox,
        closeApproverModal,
        popupError,
        totalRow,
        allCheck,
        changeCheckbox,
        addApprover
    }=props
    return (
        <>
            {props.approverModalBox === true && (
                <div>
                    <CModal
                        size="xl"
                        centered
                        closeOnBackdrop={false}
                        className="addModal"
                        htmlFor="addBtn"
                        show={approverModalBox}
                        onClose={closeApproverModal}
                    >
                        <CModalHeader>
                            <h5 id="lblApproverList">{t('Approver List')}</h5>
                        </CModalHeader>
                        <CModalBody>
                            {popupError && popupError.length > 0 &&
                                <CCard className="custom-card emp-list-card-border error p-2  mb-3" style={{backgroundColor:"#e55353"}}>
                                    {
                                        popupError.map((data, index) => {
                                            return (
                                                <div key={index} className="msg pl-2">
                                                    {data}
                                                </div>
                                            )
                                        })}
                                </CCard>
                            }
                            <CCard style={{padding:"0"}}>
                                <CCardBody>
                                    <CRow lg="12">
                                        <CCol lg="4" className="verticle-line mb-4" >
                                            <label className="required" id="lbEmployeeIDModal">{t('Employee ID')}
                                            </label>
                                            <div className="expense-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeIDModal"
                                                    value={props.empID}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                        <CCol lg="4" className="verticle-line mb-4" >
                                            <label id="lbEmployeeCodeModal">{t('Employee Code')}</label>
                                            <div className="expense-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeCodeModal"
                                                    value={props.empCode}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                        <CCol lg="4" className="mb-4">
                                            <label id="lbEmployeeNameModal">{t('Employee Name')}</label>
                                            <div className="expense-checkIO-request">
                                                <TextField
                                                    id="txtEmployeeNameModal"
                                                    value={props.empName}
                                                    fullWidth
                                                    disabled
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                    {props.mainTableModal.length>0 && (<>
                                        <CRow id="table">
                                            <CCol lg="12">
                                                <CCol lg="12">
                                                    <CRow alignHorizontal="end">
                                                        <div className="row-count-msg" id="lblTotalRows">
                                                            {totalRow}
                                                        </div>
                                                    </CRow>
                                                </CCol>
                                                <div className="table-responsive">
                                                    <table
                                                        className="table purchase-order-list table-striped"
                                                        aria-label="simple table"
                                                        id="tbApproverModal"
                                                    >
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                    <th
                                                                        id="chkApprover"
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
                                                                    id="lblEmployeeIDModal"
                                                                    className="text-nowrap text-left"
                                                                >
                                                                    <CImg
                                                                        className="mr-2 imgTitle"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeCodeApproverModal" className="text-left text-nowrap">
                                                                    <CImg
                                                                        className="mr-2 expense-request-img-table"
                                                                        src="avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Code")}
                                                                </th>
                                                                <th
                                                                    id="lblEmployeeNameModal"
                                                                    className="text-nowrap text-left"
                                                                >
                                                                    <CImg
                                                                        className="mr-2 imgTitle"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th
                                                                    id="lblEmployeeEmailModal"
                                                                    className="text-nowrap text-left"
                                                                >
                                                                    <CImg
                                                                        className="mr-2 imgTitle"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Email")}
                                                                </th>
                                                                <th
                                                                    id="lblDepartmentModal"
                                                                    className="text-nowrap text-left"
                                                                >
                                                                <CImg
                                                                        className="mr-2 imgTitle"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Department")}
                                                                </th>
                                                                <th
                                                                    id="lblPositionModal"
                                                                    className="text-nowrap text-left"
                                                                >
                                                                    <CImg
                                                                        className="mr-2 imgTitle"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Position")}
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                        {  props.mainTableModal.map((i, index) => {
                                                                    return (
                                                                        <Fragment key={index}>
                                                                            {/* {i.employee_has_dept_position.map((sec, idx) => {
                                                                                return ( */}
                                                                                    <tr width="100%">
                                                                                        {/* {idx === 0 && <> */}
                                                                                            <td id="tblCheckBoxModal" className={props.mainTableModal.length-1 === index ? "border-bottom-left-radius text-center":"text-center"}
                                                                                                 style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                                <input type="checkbox"
                                                                                                    value={i.approver_id}
                                                                                                    id={i.approver_id}
                                                                                                    checked={i.is_checked === true}
                                                                                                    onChange={props.changeCheckbox}
                                                                                                />
                                                                                            </td>
                                                                                            <td id="tblEmployeeIDModal"  className="text-right"
                                                                                                >
                                                                                                {i.approver_id}
                                                                                            </td>
                                                                                            <td id="tblEmployeeCodeApproverModal" width="" className="text-right text-nowrap td-orange"
                                                                                            >
                                                                                                {i.approver_code}
                                                                                            </td>
                                                                                            <td id="tblEmployeeNameModal" className="text-left"
                                                                                                >
                                                                                                {i.approver_name}
                                                                                            </td>
                                                                                            <td id="tblEmployeeEmailModal" className="text-left">
                                                                                                {i.email}
                                                                                            </td>
                                                                                        {/* </>
                                                                                        } */}
                                                                                        <td id="tblDepartmentModal" className="text-left td-orange">
                                                                                            {i.department}
                                                                                        </td>
                                                                                        <td id="tblPositionModal"  className={props.mainTableModal.length-1==index ? "border-bottom-right-radius text-left" : "text-left no-border-radius" } >
                                                                                            {i.position}
                                                                                        </td>
                                                                                    </tr>
                                                                                {/* )
                                                                            })
                                                                            } */}
                                                                        </Fragment>
                                                                    )
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CRow>
                                    </> )}
                                    <CRow lg="12" className="mt-3">
                                        <CCol className="text-center">
                                            <CButton
                                                className="form-btn mr-3"
                                                id='btnAddModal'
                                                onClick={addApprover}
                                            >{t('Add')}
                                            </CButton>
                                            <CButton
                                                className="form-btn ml-3"
                                                id='btnCloseModal'
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
export default ExpenseAdjustmentRequestModalApprover;
