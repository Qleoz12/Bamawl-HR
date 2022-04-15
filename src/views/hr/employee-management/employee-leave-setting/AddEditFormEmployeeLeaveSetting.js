/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { CCol, CLabel, CRow, CSelect } from "@coreui/react";
import { useTranslation } from "react-i18next";
import {  TextField } from "@material-ui/core";
import DatePicker from './../../hr-common/datepicker/DatePicker';
const AddEditFormEmployeeLeaveSetting = (props) => {
    let {
        listLeaveType,
        selectLeaveType,
        leaveTypeId,
        totalLeaveType,
        startDate,
        endDate,
        remainDay,
        selectStartDate,
        selectEndDate,
        changeRemainDay,
        checkAutoSetting,
        SettingAuto,
        checkDetailEdit,
        DetailEdit
    } = props;
    const { t } = useTranslation();
    useEffect(() => { });
    return (
        checkDetailEdit == DetailEdit.EDIT && (
            <>
                <CRow lg="12" className="mb-4">
                    <CCol lg="5">
                        <CLabel id="lblLeaveType">
                            {t('Leave Type')}<span className="text-danger">*</span>
                        </CLabel>
                        <br />

                        <CSelect id="dropLeaveType" autoFocus className="bamawl-select" value={leaveTypeId} onChange={selectLeaveType} custom>
                            <option key="" value="">---{t("Select Leave Type")}---</option>
                            {
                                listLeaveType.map((leaveType,index) => {
                                    return (<option key={index} value={leaveType.leave_type_id}> {leaveType.leave_name} </option>)
                                })
                            }
                        </CSelect>

                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5">
                        <div className="total-leave-day column column-right">
                            <CLabel id="lblTotalLeaveDay">{t("Total Leave Day")}</CLabel>
                            <br />
                            <TextField disabled value={totalLeaveType} id="standard-basic txtTotalLeaveDate" />
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mb-4">
                    <CCol lg="5">
                        <CLabel id="lblStartDay">
                            {t('Start Date')}<span className="text-danger">*</span>
                        </CLabel>
                        <br />
                        <DatePicker id="dropStartDate" value={startDate} change={selectStartDate} />
                    </CCol>
                    <CCol lg="1" className="verticle-line"/>
                    <CCol lg="1"/>
                    <CCol lg="5" className="column-right">
                        <div className="end-date column column-right">
                            <CLabel id="lblEndDate">
                                {t('End Date')}<span className="text-danger">*</span>
                            </CLabel>
                            <br />
                            <DatePicker id="dropEndDate" value={endDate} change={selectEndDate} />
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12"  className="mb-4 expense-request-text-field">
                    <CCol lg="5">
                        <CLabel id="lblRemainLeave">
                            {t('Remain Leave')}<span className="text-danger">*</span>
                        </CLabel>
                        <br />
                        <TextField
                            value={remainDay} onChange={changeRemainDay} 
                            className="remain-leave column" style={{ width: "80%" }} id="standard-basic txtremainDay" />
                    </CCol>
                </CRow>
            </>
        )

    );
};
export default AddEditFormEmployeeLeaveSetting;
