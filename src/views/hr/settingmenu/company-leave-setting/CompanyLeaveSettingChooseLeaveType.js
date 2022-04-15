/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CompanyLeavaeSettingInfoLeaveChooseLeaveType from './CompanyLeavaeSettingInfoLeaveChooseLeaveType';
import NextCompanyLeavaeSetting from './NextCompanyLeavaeSetting';
import CompanyLeaveSettingChooseLeaveTypeOption from './CompanyLeaveSettingChooseLeaveTypeOption';
import CompanyLeavaeSettingShowPageChooseLeaveType from './CompanyLeavaeSettingShowPageChooseLeaveType';
const CompanyLeaveSettingChooseLeaveType = (props) => {
    let {
        leaveType,
        convertLeaveNameToColor,
        switchCarry,
        carryOption,
        nextEvent,
        switchChooseLeaveType,
        chooseLeaveType,
        totalLeaveType,
        pageLeaveType,
        durationOK,
        durationModalBox,
        durationClose,
        showDurationForm,
        duration,
        selectDuration,
        defaultValueDuration,
        leaveAssignFlag
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
            <h2 id="lblChooseLeaveTypeforyou" style={{ textAlign: 'center', marginBottom: '10px',fontWeight:"bold" }}>
                {t('Choose Leave Type for you')}
            </h2>
            {/* show table info leave type */}
            <CompanyLeavaeSettingInfoLeaveChooseLeaveType
                convertLeaveNameToColor={convertLeaveNameToColor}
                leaveType={leaveType}
                durationOK={durationOK}
                durationModalBox={durationModalBox}
                durationClose={durationClose}
                showDurationForm={showDurationForm}
                duration={duration}
                selectDuration={selectDuration}
                defaultValueDuration={defaultValueDuration}
                chooseLeaveType={chooseLeaveType}
                leaveAssignFlag={leaveAssignFlag}
            ></CompanyLeavaeSettingInfoLeaveChooseLeaveType>
            <div>
                {/* show setting for leave type */}
                <CompanyLeaveSettingChooseLeaveTypeOption
                    chooseLeaveType={chooseLeaveType}
                    switchChooseLeaveType={switchChooseLeaveType}
                    switchCarry={switchCarry}
                    carryOption={carryOption}
                    leaveAssignFlag={leaveAssignFlag}
                ></CompanyLeaveSettingChooseLeaveTypeOption>
                {/* show button next leave type */}
                <NextCompanyLeavaeSetting
                    nextEvent={nextEvent}
                ></NextCompanyLeavaeSetting>
            </div>
            {/* show current page and total page leave type */}
            <CompanyLeavaeSettingShowPageChooseLeaveType
                pageLeaveType={pageLeaveType}
                totalLeaveType={totalLeaveType}
            ></CompanyLeavaeSettingShowPageChooseLeaveType>
        </>
    );
};
export default CompanyLeaveSettingChooseLeaveType;
