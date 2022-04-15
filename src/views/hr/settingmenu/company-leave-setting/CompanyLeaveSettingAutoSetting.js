/* eslint-disable no-use-before-define */
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CImg,
    CSwitch,
} from '@coreui/react';
const CompanyLeaveSettingAutoSetting = (props) => {
    let {
        settingAuto,
        switchLeaveSetting,
        joinOrFiscal,
        switchJoinOrFiscal,
        selectHourlyOrHalfDeduct,
        hourlyOrHalfDeduct,
        fisCalYearStartMonth,
        fisCalYearEndMonth
    } = props;
    const { t } = useTranslation();
    useEffect(() => {});
    return (
        <>   
        <CRow style={{ marginTop: '30px' }}>
                <CCard className="card-auto-leave-setting">
                    <CCardHeader style={{borderBottom:settingAuto != 1?"none":""}}>
                        <span style={{ marginRight: '10px' }} id="lblDoyouUseAutoLeaveSetting">
                            {t('Do you want to use Auto Leave Setting?')}
                        </span>
                        <CSwitch
                            autoFocus={true}
                            name="swAutoSetting"
                            className="mx-1 switch-include-shift c-switch-sm"
                            color="info"
                            shape="pill"
                            checked={settingAuto == 1 ? true : false}
                            onChange={switchLeaveSetting}
                        />
                    </CCardHeader>
                        {settingAuto == 1 && <CCardBody>
                            <CRow>
                                <span id="lblFiscalYear" style={{ marginRight: '10px' }}>
                                    {t('Fiscal Year')}
                                </span>
                                <CSwitch
                                    name="swJoinFiscal"
                                    className="mx-1 switch-include-shift c-switch-sm"
                                    color="success"
                                    shape="pill"
                                    checked={joinOrFiscal == 1 ? true : false}
                                    onChange={switchJoinOrFiscal}
                                />
                                <span id="lblJoinedDate" style={{ marginLeft: '10px' }}>{t('Joined Date')}</span>
                            </CRow>
                            {
                                joinOrFiscal == 0&&
                                <CRow style={{ marginTop: '25px' }}>
                                <CCol xs="6" style={{ borderRight: '1px solid #d8dbe0' }}>
                                    <CImg
                                        src={'avatars/month.png'}
                                        className="list-icon"
                                        width="15px"
                                        style={{
                                            marginRight: '10px',
                                            marginBottom: '6px',
                                        }}
                                    />
                                    <span id="tblEmployeeName">{t('Start Month')}</span>
                                    <br></br>
                                    <h5 className="text-center border-bottom"  >{fisCalYearStartMonth}</h5>
                                </CCol>
                                <CCol xs="6">
                                    <CImg
                                        src={'avatars/end month.png'}
                                        className="list-icon"
                                        width="15px"
                                        style={{
                                            marginRight: '10px',
                                            marginBottom: '6px',
                                        }}
                                    />
                                    <span id="">{t('End Month')}</span>
                                    <br></br>
                                    <h5 className="text-center border-bottom">{fisCalYearEndMonth}</h5>
                                </CCol>
                            </CRow>
                            }
                        </CCardBody>}
                </CCard>
            </CRow>
            <CRow style={{ marginTop: '20px' }}>
                <CCol lg="9">
                    <span id="lblDoyouwanttodeducthourly">
                        {t(
                            'Do you want to deduct hourly or half deduct for unpaid leave when employee takes half-day leave?'
                        )}
                    </span>
                </CCol>
                <CCol lg="3">
                    <span style={{ marginRight: '10px' }}>
                        <input
                            className="rdoHourly"
                            style={{ marginRight: '5px' }}
                            type="radio"
                            onChange={selectHourlyOrHalfDeduct}
                            id="1"
                            name="leaveTime"
                            value="hourly"
                            checked={hourlyOrHalfDeduct == 1 ? true : false}
                        />
                        {t('hourly')}
                    </span>
                    <span>
                        <input
                            className="rdoHalfHay"
                            style={{ marginRight: '5px' }}
                            type="radio"
                            onChange={selectHourlyOrHalfDeduct}
                            checked={hourlyOrHalfDeduct != 1 ? true : false}
                            id="0"
                            name="leaveTime"
                            value="half-day"
                        />
                        {t('half-day')}
                    </span>
                </CCol>
            </CRow>
        </>
    );
};
export default CompanyLeaveSettingAutoSetting;

