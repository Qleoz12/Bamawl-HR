import React, { useEffect } from 'react';
import { CCol, CRow, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const BusinessTripAdjustmentRequestInit = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        department,
        empId,
        empCode,
        empName,
        position,
        exchangeRate,
        destination,
        tripType,
        purpose,
        dueDate,
        requestedDate,
        periodFrom,
        periodTo,
        expenseDepartment,
        handleToDateChange,
        handleDueDate,
        exchangeRateChange,
        destinationChange,
        purposeChange
    } = props

    return (<>
        <CRow lg="12">
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel id="lblEmployeeID" className="required expense-request-label-disable" >{t('Employee ID')}</CLabel>
                <TextField id="txtEmployeeID" value={empId} disabled></TextField>
            </CCol>
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel id="lblEmployeeCode" className="expense-request-label-disable">{t('Employee Code')}</CLabel>
                <TextField id="txtEmployeeCode" value={empCode} disabled></TextField>
            </CCol>
            <CCol lg="4" className="mb-4">
                <CLabel id="lblEmployeeName" className="expense-request-label-disable">{t('Employee Name')}</CLabel>
                <TextField id="txtEmployeeName" value={empName} disabled></TextField>
            </CCol>
        </CRow>
        <CRow lg="12">
            <CCol lg="5" className="mb-4" >
                <CLabel className="required expense-request-label-disable" id="BusinessTripPeriodlblFromDate">
                    {t('Business Trip Period (From Date)')}
                </CLabel>
                <DatePicker className="backgroundate" disabled value={periodFrom} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel className="required" id="lblBusinessTripPeriodlblFromDate">
                    {t('Business Trip Period (To Date)')}
                </CLabel>
                <DatePicker className="backgroundate" value={periodTo} change={handleToDateChange} />
            </CCol>
        </CRow>
        <CRow lg="12" >
            <CCol lg="5" className="mb-4">
                <CLabel id="lblExpenseDepartment" className="required expense-request-label-disable">{t("Expense Department")}</CLabel>
                <TextField id="txtExpenseDepartment" value={expenseDepartment ? expenseDepartment : ""} disabled ></TextField>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDepartment" className="expense-request-label-disable">
                    {t('Department')}
                </CLabel>
                <TextField id="txtDepartment" value={department ? department : ""} disabled ></TextField>
            </CCol>
        </CRow>
        <CRow lg="12">
            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                <CLabel id="lblDestination" className="required">
                    {t('Destination')}
                </CLabel>
                <TextField id="txtDestination" value={destination ? destination : ""} onChange={destinationChange} ></TextField>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                <CLabel id="lblPosition" className="expense-request-label-disable">
                    {t('Position')}
                </CLabel>
                <TextField id="txtPosition" value={position ? position : ""} disabled ></TextField>
            </CCol>
        </CRow>
        <CRow lg="12">
            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                <CLabel id="lblTripType" className="expense-request-label-disable">
                    {t('Trip Type')}
                </CLabel>
                <TextField id="dropTripType" disabled value={tripType} ></TextField>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" style={{ marginBottom: "20px" }}>
                <CLabel id="lblExchangeRate" className="required">
                    {t('Exchange Rate')}
                </CLabel>
                <TextField id="txtExchangeRate" value={exchangeRate ? exchangeRate : ""} onChange={exchangeRateChange} ></TextField>
            </CCol>
        </CRow>
        <CRow lg="12">
            <CCol className="" lg="12" style={{ marginBottom: "20px" }}>
                <CLabel id="lblPurpose" className="required">
                    {t('Purpose')}
                </CLabel>
                <TextField id="txtPurpose" value={purpose ? purpose : ""} onChange={purposeChange} ></TextField>
            </CCol>
        </CRow>
        <CRow lg="12">
            <CCol lg="5" className="mb-4">
                <CLabel id="lblAppliedDate" className="required expense-request-label-disable">{t("Applied Date")}</CLabel>
                <DatePicker className="backgroundate" value={requestedDate} disabled />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDueDate" className="required">{t("Due Date")}</CLabel>
                <DatePicker className="backgroundate" value={dueDate} change={handleDueDate} />
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol className="">
                <label id="lblPurpose" style={{ color: "red" }} >{`#${t('Arrange By Admin')} :${t('You cannot get this amount because of admin or company arrange/buy for you.')}`}</label><br />
            </CCol>
        </CRow>
    </>
    );
}
export default BusinessTripAdjustmentRequestInit;