import React, { useEffect } from "react";
import { CCol, CRow,} from "@coreui/react";
import {  TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import DatePicker from '../../hr-common/datepicker/DatePicker';
const CommonExpenseAjustmentDetail = (props) => {
    const { t } = useTranslation();
    let {
        expenseAjustmentDetailInfo
    } = props;
    useEffect(() => {});

    return (
        <>
            <CRow lg="12"  >
                <CCol lg="4"   style={{ borderRight: "1px solid #E3E5F1"}} className="mb-4">
                    <label id="lblEmployeeID" className="required label-disable">{t("Employee ID")}</label>
                    <br />
                    <TextField id="txtemployeeID" value={expenseAjustmentDetailInfo.demployee_ID||''} disabled></TextField>
                </CCol>
                <CCol lg="4"   style={{ borderRight: "1px solid #E3E5F1"}} className="mb-4">
                    <label id="lblEmployeeCode" className="label-disable">{t("Employee Code")}</label>
                    <br />
                    <TextField id="txtEmployeeCode" value={expenseAjustmentDetailInfo.employee_Code||''} disabled></TextField>
                </CCol>
                <CCol lg="4"   className="mb-4">
                    <label id="lblEmployeeName" className="label-disable">{t("Employee Name")}</label>
                    <br />
                    <TextField id="txtEmployeeName" value={expenseAjustmentDetailInfo.employee_Name||''} disabled></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <label id="lblDepartment" className="required label-disable">{t("Department")}</label>
                    <br />
                    <TextField value={expenseAjustmentDetailInfo.department||''} id="txtDepartment"  disabled />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lbPosition" className="required label-disable">{t("Position")}</label>
                    <br />
                    <TextField id="txtPosition" value={expenseAjustmentDetailInfo.position||''}  disabled />
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4" >
                <CCol lg="5">
                    <label id="lblEmployeeID" className="label-disable">{t("Expense Department")}</label>
                    <br />
                    <TextField id="txtExpenseDepartment" value={expenseAjustmentDetailInfo.expense_Department||''} disabled></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lblpono" className="label-disable" >
                        {t("P.O No")}
                    </label>
                    <br />
                    <TextField id="txtPoNo" value={expenseAjustmentDetailInfo.poNumber||''} disabled></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4" >
                <CCol lg="5">
                    <label id="lblVenderCompany" className="label-disable">{t("Vendor Company")}</label>
                    <br />
                    <TextField id="txtVenderCompany" value={expenseAjustmentDetailInfo.vender_Company||''} disabled></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lblVendorName"  className="label-disable">{t("Vendor Name")}</label>
                    <br />
                    <TextField value={expenseAjustmentDetailInfo.vender_Name||''} id="txtVenderName" disabled></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4" >
                <CCol lg="5">
                    <label id="lblExchangeRate" className="required label-disable">
                        {t("Exchange Rate")}
                    </label>
                    <br />
                    <TextField disabled id="txtExchangeRate"  value={expenseAjustmentDetailInfo.exchange_Rate||''}  />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lblPhoneEmail" className="label-disable">{t("Phone/Email")}</label>
                    <br />
                    <TextField id="txtPhoneEmail" value={expenseAjustmentDetailInfo.phone_Email||''} disabled></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="12">
                    <label id="lblSubject" className="required label-disable">{t("Subject")}</label>
                    <br />
                    <TextField
                        id="txtSubject"
                        value={expenseAjustmentDetailInfo.subject||''}
                        className="form-control"
                        rows="3"
                        disabled
                    ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <label id="lblAppliedDate" className="required label-disable">{t("Applied Date")}</label>
                    <DatePicker id="txtAppliedDate" value={expenseAjustmentDetailInfo.applied_Date} disabled={true}/>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lblDueDate" className="required label-disable">{t("Due Date")}</label>
                    <DatePicker id="txtDueDate" value={expenseAjustmentDetailInfo.due_Date} disabled={true} />
                </CCol>
            </CRow>
        </>
    );
};
export default CommonExpenseAjustmentDetail;
