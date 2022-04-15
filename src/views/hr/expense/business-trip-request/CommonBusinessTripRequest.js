import React, { useEffect } from "react";
import { CCol, CRow, CSelect,CLabel } from "@coreui/react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const CommonBusinessTripRequest = (props) => {
    const { t } = useTranslation();
    let {
        tripPeriodFromDate,
        tripPeriodToDate,
        handleTripPeriodFromDateChange,
        handleTripPeriodToDateChange,
        appliedDate,
        dueDate,
        selectAppliedDate,
        selectDueDate,
        permission,
        changeAutocomplete,
        selectAutocomplete,
        idArr,
        employeeID,
        codeArr,
        employeeCode,
        nameArr,
        employeeName,
        ViewPermision,
        changePurpose,
        changeExchangeRate,
        exchangeRate,
        changeDestination,
        destination,
        department,
        expenseDepartmentList,
        expenseDepartmentID,
        selectExpenseDepartment,
        tripTypeId,
        tripTypeList,
        changeTripType,
        position,
        purpose,
    } = props;
    useEffect(() => {});

    return (
        <>
            <CRow lg="12">
                <CCol lg="4" className="mb-4 verticle-line">
                    <CLabel id="lblEmployeeID" className="required">
                        {t('Employee ID')}
                    </CLabel>
                    <Autocomplete
                        id="txtEmployeeID"
                        onChange={(i) => changeAutocomplete('id', i)}
                        onSelect={selectAutocomplete}
                        items={idArr}
                        name={employeeID}
                        disabled={permission==ViewPermision.ONLY_ME}
                    />
                </CCol>
                <CCol lg="4" className="mb-4 verticle-line">
                    <CLabel id="lblEmployeeCode">
                         {t('Employee Code')}
                    </CLabel>
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => changeAutocomplete('code', i)}
                        onSelect={selectAutocomplete}
                        items={codeArr}
                        name={employeeCode}
                        disabled={permission==ViewPermision.ONLY_ME}
                    />
                </CCol>
                <CCol lg="4" className="mb-4">
                    <CLabel id="lblEmployeeName">
                        {t('Employee Name')}
                    </CLabel>
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={(i) => changeAutocomplete('name', i)}
                        onSelect={selectAutocomplete}
                        items={nameArr}
                        name={employeeName}
                        disabled={permission==ViewPermision.ONLY_ME}
                    />
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel className="required" id="lblFromDate">
                        {t('Business Trip Period (From Date)')}
                    </CLabel>
                    <DatePicker value={tripPeriodFromDate} id="dropFromDate" change={handleTripPeriodFromDateChange} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                        <CLabel className="required" id="lblToDate">
                            {t('Business Trip Period (To Date)')}
                        </CLabel>
                        <DatePicker id="dropToDate" value={tripPeriodToDate} change={handleTripPeriodToDateChange} />
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4" >
                <CCol lg="5">
                    <CLabel id="lblExpenseDepartment" className="required">{t("Expense Department")}</CLabel>
                    <CSelect
                        className="bamawl-select"
                        id="dropExpenseDepartment"
                        value={expenseDepartmentID} name="accept"
                        onChange={selectExpenseDepartment}
                        custom
                    >
                         <option key="" value="">---{t('Select Department')}---</option>
                        {
                        expenseDepartmentList.map((departmentItem, index) => {
                            return (
                                <option key={index} className="" value={departmentItem.id}>
                                    {departmentItem.department_name}
                                </option>
                            )
                        })}
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblDepartment" className="required label-disable">{t("Department")}</CLabel>
                    <TextField fullWidth id="txtDepartment" value={department} disabled className="bamawl-select"></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4 expense-request-text-field">
                <CCol lg="5">
                    <CLabel id="lblDestination" className="required">
                        {t("Destination")}
                    </CLabel>
                    <TextField fullWidth id="txtDestination" value={destination} onChange={changeDestination} placeholder={t('Enter Destination')} className="bamawl-select"></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblPosition" className="required label-disable">{t("Position")}</CLabel>
                    <TextField fullWidth id="txtPosition" value={position} disabled className="bamawl-select"></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel id="lblTripType" className="required">{t("Trip Type")}</CLabel>
                    <CSelect
                        className="bamawl-select"
                        id="dropTripType"
                        onChange={changeTripType}
                        value={tripTypeId}
                        custom
                    >
                        {
                        tripTypeList.map((tripType, index) => {
                            return (
                                <option key={index} className="" value={tripType.trip_type_id}>
                                    {tripType.trip_type_name}
                                </option>
                            )
                        })}
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5" className="expense-request-text-field">
                    <CLabel id="lblExchangeRate" className="required">
                        {t("Exchange Rate")}
                    </CLabel>
                    <TextField fullWidth id="txtExchangeRate" value={exchangeRate!=""?exchangeRate:""} onChange={changeExchangeRate} placeholder={t('Exchange Rate')}  className="bamawl-select" ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="expense-request-text-field">
                <CCol lg="12" className="mb-4">
                    <CLabel id="lblPurpose">{t("Purpose")}</CLabel>
                    <TextField fullWidth id="txtPurpose" value={purpose} onChange={changePurpose} placeholder={t('Enter Purpose')} className="bamawl-select" ></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5" >
                    <CLabel id="lblAppliedDate" className="required">{t("Applied Date")}</CLabel>
                    <DatePicker id="dropAppliedDate" value={appliedDate} change={selectAppliedDate} disabled={true} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblDueDate" className="required">{t("Due Date")}</CLabel>
                     <DatePicker id="dropDueDate" value={dueDate} change={selectDueDate} />
                </CCol>
            </CRow>
        </>
    );
};
export default CommonBusinessTripRequest;
