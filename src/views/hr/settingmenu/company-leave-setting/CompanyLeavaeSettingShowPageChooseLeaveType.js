/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    CImg
} from '@coreui/react';
const CompanyLeavaeSettingShowPageChooseLeaveType = (props) => {
    let {
        pageLeaveType,totalLeaveType
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>
            <div className="box-paging" style={{ padding: '10px 20px' }}>
                <CImg src={'avatars/list.png'} width="8px" />
                <span style={{ marginLeft: '10px' }}><span style={{fontWeight:"bold"}}>{pageLeaveType+'-'+totalLeaveType}</span> {t('Leave Types')}</span>
            </div>
        </>
    );
};
export default CompanyLeavaeSettingShowPageChooseLeaveType;
