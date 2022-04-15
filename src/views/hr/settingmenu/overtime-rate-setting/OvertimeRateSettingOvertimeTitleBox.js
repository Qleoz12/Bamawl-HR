/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CImg, CLabel, CInput } from '@coreui/react';
import { TextField } from '@material-ui/core';

const OvertimeRateSettingOvertimeTitleBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol className="">
            <CRow lg="12">
                <div style={{ marginLeft: "15px" }}>
                    <CImg src={'avatars/list.png'} className="avatar-list" alt="titleicon" />
                    <CLabel id='lbOvertimeTitle' className="title-lbl required">{t('Overtime Title')}</CLabel>
                </div>
                <div style={{ marginLeft: "15px", marginTop: "-7px", width: "20%" }}>
                    <TextField disabled={props.usedFlag == 1} id='txtOvertimeTitle' value={props.overtimeTitle} onChange={props.overtimeTitleChange}></TextField>
                </div>
            </CRow>
        </CCol>
        <br />
    </>
    );
}
export default OvertimeRateSettingOvertimeTitleBox;