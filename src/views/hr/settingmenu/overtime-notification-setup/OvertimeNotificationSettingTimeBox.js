/* eslint-disable no-use-before-define */
import React ,{Fragment, useEffect} from 'react';
import {CCol, CRow, CImg, CLabel} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import TimePicker2 from '../../hr-common/time-picker/Timepicker2';

const OvertimeNotificationSettingTimeBox=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        { 
        props.mainTable != ""  &&
        <>
            <CRow>
                <CCol xl="12" className="d-inline-flex">
                    <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" />
                    <CLabel id="lbMonthlyTimeLimit" className="title-lbl required">{t('Monthly Time Limit')}</CLabel>
                    <CImg src={'avatars/Monthly Time Limit.png'} className="mb-3 img-timepicker" alt="titleicon"/>
                    <div className="customTimePicker"><TimePicker2 name="txtMonthlyTimeLimit" id="txtMonthlyTimeLimit" value={props.monthlyTimeLimit} onChangeTime={props.monthlyTimeLimitChange}></TimePicker2></div>
                </CCol>
            </CRow>
            <br/>
            <CRow>
                <CCol xl="12" className="d-inline-flex">
                    <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"/>
                    <CLabel id="lbWeeklyTimeLimit" className="title-lbl required" >{t('Weekly Time Limit')}</CLabel>
                    <CImg src={'avatars/Weekly Time Limit.png'} className="mb-3 img-timepicker2" alt="titleicon"/> 
                    <div className="customTimePicker"><TimePicker2 name="txtWeeklyTimeLimit" id="txtWeeklyTimeLimit" value={props.weeklyTimeLimit} onChangeTime={props.weeklyTimeLimitChange}></TimePicker2></div>
                </CCol>
            </CRow>
            <br/>
            <CRow>
                <CCol xl="12" className="d-inline-flex">
                    <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"/>
                    <CLabel id="lbOvertimeLimit" className="title-lbl">{t('Overtime Pay Limit')}</CLabel>
                    <CImg src={'avatars/Weekly Time Limit.png'} style={{ marginLeft: "50px" }} className="mb-3 img-timepicker" alt="titleicon"/>
                    <div className="customTimePicker"><TimePicker2 name="txtOvertimeLimit" id="txtOvertimeLimit" value={props.overTimeLimit} onChangeTime={props.overTimeLimitChange}></TimePicker2></div>
                </CCol>
            </CRow>
        </>
        }
    </>
    );
}
export default OvertimeNotificationSettingTimeBox;
