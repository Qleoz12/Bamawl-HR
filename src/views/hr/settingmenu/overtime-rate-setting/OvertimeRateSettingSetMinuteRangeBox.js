/* eslint-disable eqeqeq */
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCol, CRow, CImg, CLabel, CSwitch } from '@coreui/react';

const OvertimeRateSettingSetMinuteRangeBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol className="overtime-rate">
            <CRow>
                <CCol>
                    <CRow style={{ marginLeft: "0px" }}>
                        <CImg src={'avatars/list.png'} className="avatar-list" alt="titleicon" style={{ marginTop: "5px" }} />
                        <CLabel id='swSetMinuteRange' className="title-lbl">{t('Set Minute Range')}</CLabel>
                        <div style={{ marginLeft: "30px", marginRight: "20px" }} className={'switch_paid'}>
                            <CSwitch disabled={props.usedFlag == 1} value={props.minuteRangeChange} onChange={props.getMinuteRangeChange}
                                onClick={props.searchMinuteRange} checked={props.minuteRangeChange ? props.minuteRangeChange : ""} name="swSetMinuteRange" className={'mx-1 c-switch-sm switch-minute-range'} shape={'pill'} />
                        </div>
                    </CRow>
                </CCol>
            </CRow>
        </CCol>
        <br />
        {
            props.minuteRangeChange && props.minuteRangeTable.length > 0 &&
            <CCol className="overtime-rate">
                <CCard className='table-panel rate-table'>
                    <CRow id="table">
                        <CCol>
                            <div className="table-responsive">
                                <table className="table" style={{ minWidth: "unset" }}>
                                    <thead id="thead-id">
                                        <tr width="100%">
                                            <th id="tblNo" width="" className="text-nowrap text-left align-middle">
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                {t('No')}
                                            </th>
                                            <th id="tblMinuteFrom-MinuteTo" width="" className="text-nowrap text-left align-middle">
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                {t('Minute From ~ Minute To')}
                                            </th>
                                            <th id="tblRate" width="" className="text-nowrap text-left align-middle">
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="titleicon" />
                                                {t('Rate')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.minuteRangeTable.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    <tr key={index} width="100%">
                                                        <td width="" className="td-no" style={{ textAlign: "right" }}>
                                                            {index + 1}
                                                        </td>
                                                        <td width="" className="td-orange" style={{ textAlign: "center" }}>
                                                            {i.minute_from}~{i.minute_to}
                                                        </td>
                                                        <td width="" className="td-green" style={{ textAlign: "center" }}>
                                                            {i.rate}
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </CCard>
            </CCol>
        }
        <CCol className="overtime-rate">
            <CRow justify="center">
                <CLabel className="title-lbl" style={{ marginLeft: "30px" }}>{t('Do you want to pay with salary')}</CLabel>
                <div style={{ marginLeft: "3%" }} className={'switch_paid'}>
                    <CSwitch
                        disabled={props.usedFlag == 1}
                        value={props.payWithSalary} onChange={props.getPayWithSalary}
                        checked={props.payWithSalary ? props.payWithSalary : ""} className={'mx-1 c-switch-sm switch-pay-with-salary'}
                        shape={'pill'} labelOn={'Yes'} labelOff={'No'} id="swPayWithSalary" />
                </div>
            </CRow>
        </CCol>
        <br />
    </>
    );
}
export default OvertimeRateSettingSetMinuteRangeBox;