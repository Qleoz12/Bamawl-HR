/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {CModal,CSelect, CModalBody, CButtonToolbar, CRow, CButton,CLabel} from "@coreui/react";
const CompanyLeavaeSettingInfoLeaveChooseLeaveType = (props) => {
    let {  
            convertLeaveNameToColor,
            leaveType,
            durationOK,
            durationModalBox,
            durationClose,
            showDurationForm,
            duration,
            selectDuration,
            defaultValueDuration,
            chooseLeaveType,
            leaveAssignFlag
        } = props;
    const { t } = useTranslation();
    useEffect(() => {});
        //convert payment deduction
        const convertPaymentDeduction = (id) => {
            switch (id) {
                case 1:
                    return "Paid";
                case 2:
                    return "No Paid";
                default:
                    return "";
            }
        };
        //convert Payment Calculate Based On
        const convertPaymentCalculateBasedOn = (id) => {
            switch (id) {
                case 1:
                    return "TotalSalary";
                case 2:
                    return "BasicSalary";
                case 3:
                    return "FixedAmount";
                default:
                    return "";
            }
        };
        //months for dropdown duration
    const months=[0,1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <>
            <div className="leave-name-data">
                <div className="grid-row">
                    <div style={{ display: "flex", alignItems: "center" }} className="left">
                    <h4 id="lblLeaveName" style={{fontWeight:'bold'}}>{t('Leave Name')}</h4>
                    </div>
                    <div className="right-col">
                        <div
                            id="lblLeaveName"
                            title={leaveType.leave_name}
                            className="lable-leave-name"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "ad"
                            }}
                        >
                            {leaveType.leave_name}
                        </div>
                    </div>
                </div>
                <div
                    className="grid-row"
                    style={{
                        borderBottom: "1px solid #d8dbe0",
                        marginBottom: "5px",
                    }}
                ></div>
                <div>
                    <div className="grid-row">
                        <div className="left">
                            <h5 id="lblTotalMaximumAllowedDays">{t('Total Maximum Allowed Days')}</h5>
                        </div>
                        <div
                            className="right-col right right-top"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "1c",
                            }}
                        >
                            <h5>{leaveType.total_max_day}</h5>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="left">
                            <h5 id="lblMaximumCarryAllowedDays">{t("Maximum Carry Allowed Days")}</h5>
                        </div>
                        <div
                            className="right-col right"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "1c",
                            }}
                        >
                            <h5>{leaveType.max_carry_day}</h5>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="left">
                            <h5 id="lblOneTim MaximumAllowedDays">{t('One Time Maximum Allowed Days')}</h5>
                        </div>
                        <div
                            className="right-col right"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "1c",
                            }}
                        >
                            <h5>{leaveType.onetime_max_day}</h5>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="left">
                            <h5 id="lblPaymentCalculateBasedOn">{t('Payment Calculate Based On')}</h5>
                        </div>
                        <div
                            className="right-col right"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "1c",
                            }}
                        >
                            <h5>{convertPaymentDeduction(leaveType.payment_deduction_flag)}/{convertPaymentCalculateBasedOn(leaveType.payment_calculate_based_on)}</h5>
                        </div>
                    </div>
                    <div className="grid-row">
                        <div className="left">
                            <h5 id="lblDuration">{t('Duration (Month)')}<CLabel style={{marginBottom:"0px"}} className="text-danger">{chooseLeaveType == 1?"*":""}</CLabel></h5>
                        </div>
                        <div
                            className="right-col right right-bottom"
                            style={{
                                backgroundColor: convertLeaveNameToColor(leaveType.leave_name) + "1c",
                                display:'flex',
                                justifyContent:'left',
                                alignItems:'center'
                            }}
                        >   <h5 style={{marginBottom:"0px",marginRight:duration !== ""?'10px':''}}>{duration}</h5>
                            <input autoFocus={true} type='image' alt="duration"  style={{width: "30px", cursor: leaveAssignFlag ? "not-allowed" : "pointer"}} src={"avatars/Add Working Day and Shift.png"}  onClick={showDurationForm}
                        ></input>
                        </div>
                    </div>
                </div>
            </div>
            {
                durationModalBox == true&&(
                <CModal centered closeOnBackdrop={false} className='Modal' htmlFor='dropBtn' show={durationModalBox} onClose={durationClose} >
                <CModalBody >
                    <CRow className="confirm-header" alignHorizontal="center">
                                <CSelect autoFocus={true} className="wrap select bamawl-select" style={{ width: '200px',marginBottom:"20px"}} onChange={selectDuration} value={defaultValueDuration} custom >
                                    <option key="" value="">
                                    ---{t("Select Duration")}---
                                    </option>
                                    {
                                    months.map((month, index) => {
                                        return(
                                            <option key={index} value={month}>{month}</option>
                                        )
                                    })
                                    }
                                </CSelect>
                    </CRow>
                    <CButtonToolbar className="confirm-body" justify="center">
                        <CButton className="confirm-btn" active onClick={durationOK}>{t('Ok')}</CButton> 
                        <CButton className="confirm-btn" onClick={durationClose}>{t('Close')}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
                )
            }
            
        </>
    );
};
export default CompanyLeavaeSettingInfoLeaveChooseLeaveType;
