/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import CompanyLeaveSettingLabelLeaveConfirmLeaveType from './CompanyLeaveSettingLabelLeaveConfirmLeaveType';
import CompanyLeaveSettingAutoSetting from './CompanyLeaveSettingAutoSetting';
import SaveBackCompanyLeaveSetting from './SaveBackCompanyLeaveSetting';
const CompanyLeaveSettingConfirmLeaveType = (props) => {
    let {
        convertLeaveNameToColor,
        settingAuto,
        switchLeaveSetting,
        selectHourlyOrHalfDeduct,
        hourlyOrHalfDeduct,
        formInsertCompanyLeave,
        showScreenChooseLeaveType,
        joinOrFiscal,
        switchJoinOrFiscal,
        leaveTypesConfirm,
        fisCalYearStartMonth,
        fisCalYearEndMonth
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
            <h2 id="lblConfirmLeaveTypeyouselected" style={{ textAlign: 'center', marginBottom: '20px',fontWeight:"bold" }}>
                {t('Confirm Leave Type you selected')}
            </h2>
            {/* show lable leave type */}
            <CompanyLeaveSettingLabelLeaveConfirmLeaveType
                leaveTypesConfirm={leaveTypesConfirm} 
                convertLeaveNameToColor={convertLeaveNameToColor}
                ></CompanyLeaveSettingLabelLeaveConfirmLeaveType>
                {/* show setting */}
            <CompanyLeaveSettingAutoSetting
                settingAuto={settingAuto}
                switchLeaveSetting={switchLeaveSetting}
                joinOrFiscal={joinOrFiscal}
                switchJoinOrFiscal={switchJoinOrFiscal}
                selectHourlyOrHalfDeduct={selectHourlyOrHalfDeduct}
                hourlyOrHalfDeduct={hourlyOrHalfDeduct}
                fisCalYearStartMonth={fisCalYearStartMonth}
                fisCalYearEndMonth={fisCalYearEndMonth}
            ></CompanyLeaveSettingAutoSetting>
            {/* show button save and back  */}
            <SaveBackCompanyLeaveSetting
                showScreenChooseLeaveType={showScreenChooseLeaveType}
                formInsertCompanyLeave={formInsertCompanyLeave}
            ></SaveBackCompanyLeaveSetting>          
        </>
    );
};
export default CompanyLeaveSettingConfirmLeaveType;
