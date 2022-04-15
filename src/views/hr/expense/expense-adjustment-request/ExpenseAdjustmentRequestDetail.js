import { CCol, CLabel, CRow} from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from '../../hr-common/datepicker/DatePicker';

const ExpenseAdjustmentRequestDetail = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let {
        employeeID,
        employeeCode,
        employeeName,
        department,
        position,
        expenseDepartmentAPI,
        poNo,
        subject,
        expenseDepartment,
        exchangeRate,
        handleExChangeRate,
        vendorCompany,
        handleVendorCompany,
        vendorName,
        handleVendorName,
        phoneEmail,
        handlePhoneEmail,
        appliedDate,
        dueDate,
        handleDueDateChange,
        approveFlag,
        requestDate
    }=props
    let exdpt="";
    let exDepartment=(value)=>{
        expenseDepartmentAPI.map((i)=>{
            if( i.id == value)
              exdpt=i.department_name;
        })
        return exdpt;
     }
    return (
        <>
            <CRow lg="12">
                <CCol className="mb-4 verticle-line disabled-form" lg="4">
                    <CLabel id="lblEmployeeID" className="required" >{t('Employee ID')}</CLabel>
                    <TextField id="txtEmployeeID" value={employeeID} disabled={true}></TextField>
                </CCol>
                <CCol className="mb-4 verticle-line disabled-form" lg="4">
                    <CLabel id="lblEmployeeCode">{t('Employee Code')}</CLabel>
                    <TextField id="txtEmployeeCode" value={employeeCode} disabled={true}></TextField>
                </CCol>
                <CCol className="mb-4 disabled-form" lg="4">
                    <CLabel id="lblEmployeeName" >{t('Employee Name')}</CLabel>
                    <TextField id="txtEmployeeName" value={employeeName} disabled={true}></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol className="disabled-form" lg="5">
                    <CLabel id="lblDepartment" className="required">
                        {t('Department')}
                    </CLabel>
                    <TextField id="txtDepartment" value={department} disabled={true}></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol className="disabled-form" lg="5">
                    <CLabel id="lblPosition" className="required">
                        {t('Position')}
                    </CLabel>
                    <TextField id="txtPosition" value={position} disabled={true}></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol className="disabled-form" lg="5">
                    <CLabel id="lblExpenseDepartment">
                        {t('Expense Department')}
                    </CLabel>
                    <TextField id="txtExpenseDepartment" value={exDepartment(expenseDepartment)} disabled={true} ></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol className="disabled-form" lg="5">
                    <CLabel id="lblPONo">
                        {t('P.O No')}
                    </CLabel>
                    <TextField id="txtPONo" value={poNo || ""} disabled={true} ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4 expense-request-text-field">
                <CCol lg="5">
                    <CLabel id="lblVendorCompany">
                        {t('Vendor Company')}
                    </CLabel>
                    <TextField id="txtVendorCompany" value={vendorCompany ||""} onChange={handleVendorCompany} maxLength={500} autoFocus  ></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblVendorName">
                        {t('Vendor Name')}
                    </CLabel>
                    <TextField id="txtVendorName" value={vendorName ||""} onChange={handleVendorName} maxLength={500}></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4 expense-request-text-field">
                <CCol lg="5">
                    <CLabel id="lblExchangeRate" className="required">
                        {t('Exchange Rate')}
                    </CLabel>
                    <TextField id="txtExchangeRate" value={exchangeRate} onChange={handleExChangeRate}></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblPhoneEmail">
                        {t('Phone/Email')}
                    </CLabel>
                    <TextField id="txtPhoneEmail" value={phoneEmail || ""} onChange={handlePhoneEmail} maxLength={30} ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol className="mb-4 disabled-form" lg="12">
                    <CLabel id="lblSubject" className="required">
                        {t('Subject')}
                    </CLabel>
                    <TextField id="txtSubject" value={subject} disabled={true} ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol className="disabled-form" lg="5" >
                    <CLabel className="required">
                        {t('Applied Date')}
                    </CLabel>
                    <DatePicker id="txtAppliedDate" value={approveFlag ==2 ?appliedDate: requestDate} disabled={true} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5" className="column-right">
                    <CLabel className="required">
                        {t('Due Date')}
                    </CLabel>
                    <DatePicker id="txtDueDate" value={dueDate} change={handleDueDateChange} />
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseAdjustmentRequestDetail;
