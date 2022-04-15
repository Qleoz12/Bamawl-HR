/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CRow, CSwitch } from "@coreui/react";
const CompanyLeaveSettingChooseLeaveTypeOption = (props) => {
    let { switchChooseLeaveType, switchCarry, carryOption, chooseLeaveType,leaveAssignFlag } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
            <div>
                <CRow
                    style={{
                        marginTop: "30px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className="switch-setup-choose-leave" style={{width:'230px',display:'flex',justifyContent:'space-between'}}>
                        <label id="lblChoseLeaveType" style={{ marginRight: "10px",opacity:chooseLeaveType != 1?"0.5":"" }}>{t("Choose this leave type?")}</label>
                        <CSwitch
                            name="swChooseThis"
                            onChange={switchChooseLeaveType}
                            className="mx-1 switch-include-shift c-switch-sm"
                            color="info"
                            shape="pill"
                            disabled={leaveAssignFlag}
                            checked={chooseLeaveType == 1 ? true : false}
                        />
                    </div>
                </CRow>
                <CRow
                    style={{
                        marginTop: "10px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <div className="switch-setup-choose-leave" style={{width:'230px',display:'flex',justifyContent:'space-between'}}>
                        <label id="lblDoyouCarry" style={{ marginRight: "10px",opacity:carryOption == 2?"0.5":"" }}>{t("Do you want to carry?")}</label>
                        <CSwitch
                            name="swCarry"
                            onChange={switchCarry}
                            checked={carryOption == 2 ? false : true}
                            className="mx-1 switch-include-shift c-switch-sm"
                            color="info"
                            shape="pill"
                            disabled={leaveAssignFlag}
                        />
                    </div>
                </CRow>
            </div>
        </>
    );
};
export default CompanyLeaveSettingChooseLeaveTypeOption;