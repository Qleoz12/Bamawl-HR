import { CCol, CLabel, CRow, CSelect } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const ExpenseRequestGeneralInfoBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (
        <>
            <CRow lg="12" className="move_from_bottom">
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeID" className="required" >{t('Employee ID')}</CLabel>
                    <div className=" expense-autocomplete">
                        <Autocomplete
                            disabled={!props.permission}
                            id="txtEmployeeID"
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.idArr}
                            name={props.empID}
                            autoFocus = {true}
                        />
                    </div>
                </CCol>
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                    <div className="expense-autocomplete">
                        <Autocomplete
                            id="txtEmployeeCode"
                            disabled={!props.permission}
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.codeArr}
                            name={props.empCode}
                        />
                    </div>
                </CCol>
                <CCol className="mb-4" lg="4">
                    <CLabel id="lbEmployeeName" >{t('Employee Name')}</CLabel>
                    <div className="expense-autocomplete">
                        <Autocomplete
                            id="txtEmployeeName"
                            disabled={!props.permission}
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.nameArr}
                            name={props.empName}
                        />
                    </div>
                </CCol>
            </CRow>

            <CRow lg="12">
                <CCol  lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbDepartment" className="required expense-request-label-disable">
                        {t('Department')}
                    </CLabel>
                    <TextField className="expense-request-text-field" id="txtDepartment" value={props.departmentName} fullWidth disabled></TextField>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol  lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbPosition" className="required expense-request-label-disable">
                        {t('Position')}
                    </CLabel>
                    <TextField className="expense-request-text-field" id="txtPosition" value={props.positionName} fullWidth disabled></TextField>
                </CCol>
            </CRow>


            <CRow lg="12">
                <CCol  lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbExpenseDepartment">
                        {t('Expense Department')}
                    </CLabel>
                    <CSelect id="dropExpenseDepartment" className="bamawl-select" value={props.expenseDepartment} onChange={props.changeExpenseDepartment} custom>
                        <option key="" value="">{t('---Select Expense Department---')}</option>
                        {
                            props.expenseDepartmentData && props.expenseDepartmentData.length > 0 &&
                            props.expenseDepartmentData.map((data, index) => {
                                return (
                                    <option key={index} value={data.id}>{data.department_name}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol className=" expense-request-text-field" lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbPONo">
                        {t('P.O No')}
                    </CLabel>
                    <TextField id="txtPONo" value={props.poNumber} onChange={props.changePONumber} fullWidth></TextField>
                </CCol>
            </CRow>

            <CRow lg="12">
                <CCol className=" expense-request-text-field" lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbVendorCompany">
                        {t('Vendor Company')}
                    </CLabel>
                    <TextField id="txtVendorCompany" value={props.vendorCompany} onChange={props.changeVendorCompany} fullWidth></TextField>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol className=" expense-request-text-field" lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbVendorName">
                        {t('Vendor Name')}
                    </CLabel>
                    <TextField id="txtVendorName" value={props.vendorName} onChange={props.changeVendorName} fullWidth></TextField>
                </CCol>
            </CRow>

            <CRow lg="12">
                <CCol className=" expense-request-text-field" lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbExchangeRate" className="required">
                        {t('Exchange Rate')}
                    </CLabel>
                    <TextField id="txtExchangeRate" value={props.exChangeRate} onChange={props.changeExchangeRate} fullWidth></TextField>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol className=" expense-request-text-field" lg="5" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbPhoneEmail">
                        {t('Phone/Email')}
                    </CLabel>
                    <TextField id="txtPhoneEmail" value={props.phoneEmail} onChange={props.changePhoneEmail} fullWidth></TextField>
                </CCol>
            </CRow>

            <CRow lg="12">
                <CCol className=" expense-request-text-field" lg="12" style={{ marginBottom: "20px" }}>
                    <CLabel id="lbSubject" className="required">
                        {t('Subject')}
                    </CLabel>
                    <TextField id="txtSubject" value={props.subject} onChange={props.changeSubject} fullWidth></TextField>
                </CCol>
            </CRow>

            <CRow lg="12">
                <CCol  lg="5" style={{ marginBottom: "20px" }}>
                    <div className="to-date column column-right">
                        <CLabel className="required">
                            {t('Applied Date')}
                        </CLabel>
                        <br />
                        <DatePicker
                            id="dpkAppliedDate"
                            value={props.appliedDate}
                            change={props.handleAppliedDateChange}
                            disabled
                        />
                    </div>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="column-right" style={{ marginBottom: "20px" }}>
                    <div className="to-date column column-right" >
                        <CLabel className="required">
                            {t('Due Date')}
                        </CLabel>
                        <br />
                        <DatePicker 
                        id="dpkDueDate"
                        value={props.dueDate} 
                        change={props.handleDueDateChange} />
                    </div>
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseRequestGeneralInfoBox;