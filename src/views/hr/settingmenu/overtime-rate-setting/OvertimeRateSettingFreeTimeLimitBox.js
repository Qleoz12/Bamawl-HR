/* eslint-disable eqeqeq */
import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {CCol, CRow, CImg, CLabel} from '@coreui/react';
import TimePicker from '../../hr-common/time-picker/Timepicker';

const OvertimeRateSettingFreeTimeLimitBox=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CCol className="overtime-rate">
            <CRow>
                <CCol className="input-lbl">
                    <CRow style={{marginLeft:"0px"}}>
                        <CImg src={'avatars/list.png'} className="avatar-list" alt="titleicon" style={{marginTop:"5px"}}/>
                        <CLabel id='lbFreeTimeLimit' className="title-lbl">{t('Free Time Limit')}</CLabel>
                        <div style={{marginLeft:"5%", marginRight:"20px", marginTop:"-6px"}}>
                            <TimePicker
                                disabled={props.usedFlag == 1}
                                id='txtFreeTimeLimit'
                                value={props.freeTimeLimit}
                                onChangeTime={props.freeTimeLimitChange}>
                            </TimePicker>
                        </div>
                        <CImg src={'avatars/Monthly Time Limit.png'} alt="titleicon" style={{width:'30px',height:'30px',marginTop:'-4px'}}/>
                    </CRow>
                </CCol>
            </CRow>
        </CCol>
        <br/>
    </>
    );
}
export default OvertimeRateSettingFreeTimeLimitBox;