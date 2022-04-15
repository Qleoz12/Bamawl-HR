/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    CLabel
} from '@coreui/react';
const CompanyLeaveSettingLabelLeaveConfirmLeaveType = (props) => {
    let {
        convertLeaveNameToColor,
        leaveTypesConfirm
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>   
        <div className="title-leave d-flex justify-content-center flex-wrap" style={{gap:'10px'}}>
                {leaveTypesConfirm.map((leave, index) => {
                    if(leave.choose_leave_type == 1 && leave.leave_assign_flag == 0){
                        return (
                            <div key={index}>
                                <CLabel
                                    title={leave.leave_name}
                                    id={leave.leave_type_id}
                                    style={{
                                        backgroundColor:
                                            convertLeaveNameToColor(leave.leave_name) + 'ad',
                                    }}
                                    size="lg"
                                >
                                    {leave.leave_name}
                                </CLabel>
                            </div>
                        );
                    }
                    
                })}
            </div>
        </>
    );
};
export default CompanyLeaveSettingLabelLeaveConfirmLeaveType;
