/* eslint-disable eqeqeq */
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCol, CRow, CImg, CLabel, CFormGroup, CInputCheckbox } from '@coreui/react';

const OvertimeRateSettingShiftNameBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol className="overtime-rate">
            <CImg src={'avatars/list.png'} className="avatar-list" alt="titleicon" />
            <CLabel id='lbShiftName' className="title-lbl required">{t('Shift Name')}</CLabel>
        </CCol>
        <CCard className="panel overtime-rate">
            <CRow className="" style={{marginTop: "25px"}}>
                {
                    props.shiftName.length > 0 &&
                    props.shiftName.map((item, index) => {
                        return (
                            <Fragment key={index}>
                                <div className="item-select" >
                                    <label className="card" style={{ padding: "10px", width: "250px"}}>
                                        <CFormGroup variant="checkbox" className="checkbox">
                                            <CLabel style={{ minWidth: "110px", fontWeight: "normal", marginRight: "10px" }} variant="checkbox" className="form-check-label" htmlFor={`chkShift[${item.id}]`} >
                                                {/* {item.sn_name} */}
                                                {item.sn_name.length > 25 ? item.sn_name.substring(0, 25) + "..." : item.sn_name}
                                            </CLabel>
                                            <div className="float-right" style={{ marginLeft: "-10px" }}>
                                                {props.editData == "" &&
                                                    <CInputCheckbox id={`chkShift[${item.id}]`} disabled={props.editData != "" || props.usedFlag == 1} onChange={props.chooseShiftName} checked={(props.selectShiftName.length != 0) ? item.is_checked == true : false} value={item.id} />
                                                }
                                                {props.editData != "" &&
                                                    <CInputCheckbox id={`chkShift[${item.id}]`} disabled={props.editData != "" || props.usedFlag == 1} onChange={props.chooseShiftName} checked={item.id == props.selectShiftName} value={item.id} />
                                                }
                                            </div>
                                        </CFormGroup>
                                    </label>
                                </div>
                            </Fragment>
                        )
                    })
                }
            </CRow>
        </CCard>
        <br />
    </>
    );
}
export default OvertimeRateSettingShiftNameBox;