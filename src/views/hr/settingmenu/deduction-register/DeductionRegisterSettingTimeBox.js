/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import TimePicker from '../../hr-common/time-picker/Timepicker';

const DeductionRegisterSettingTimeBox = props => {
    let {
        lateTime,
        limitTime,
        flagHiden,
        selectDeductionName,
        lateTimeChange,
        limitTimeChange
    } = props;

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        { 
            selectDeductionName != "3" &&
            <CRow>
                {
                    <>
                        <CCol xs="12" sm="6" md="6">
                            <CCol>
                                <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list"  />
                                <CLabel style={{ fontWeight: "bold" }} id="lbReliefTimeforLate" className="title-lbl">{t('Relief Time for Late')}</CLabel>
                            </CCol>
                            <CCard className="cards">
                                <CRow className="margin-card" style={{ height: "auto" }}>
                                    <CImg src={'avatars/Weekly Time Limit.png'} alt="titleicon" height={17} className="img-timepicker" />
                                    <div className="customTimePicker"><TimePicker name="lateTime" disabled={flagHiden == 1} value={lateTime} onChangeTime={lateTimeChange}></TimePicker></div>
                                </CRow>
                            </CCard>
                        </CCol>
                        <CCol xs="12" sm="6" md="6" lg="6">
                            <CCol>
                                <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list"/>
                                <CLabel style={{ fontWeight: "bold" }} id="lbDeductionTimeLimit" className="title-lbl">{t('Deduction Time Limit')}<span className="required"></span></CLabel>
                            </CCol>
                            <CCard className="cards">
                                <CRow className="margin-card" style={{ height: "auto" }}>
                                    <CImg src={'avatars/Monthly Time Limit.png'} alt="titleicon" height={17} className="img-timepicker" />
                                    <div className="customTimePicker"><TimePicker disabled={flagHiden == 1} name="limitTime" value={limitTime} onChangeTime={limitTimeChange}></TimePicker></div>
                                    <CLabel className="lbl-timepicker custom-font">(<i className="fas fa-star color-star fa-xs"></i>{t("Minute Range)")}</CLabel>
                                </CRow>
                            </CCard>
                        </CCol>
                    </>
                }

            </CRow>
        }
    </>
    );
}
export default DeductionRegisterSettingTimeBox;
