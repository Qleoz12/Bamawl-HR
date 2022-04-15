/* eslint-disable no-use-before-define */
import React, { useEffect, Fragment } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';

const ConfigTotalLeave = props => {
    let {
        mainTable,
        totalLeave
    } = props;

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        { 
            totalLeave != "" &&
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                    <CLabel id="lbTotalTakenLeave" className="title-lbl" style={{ marginLeft: "11px" }}>{t('Total Taken Leave')}</CLabel>
                </CCol>
                <CCard className="cards">
                    <CRow lg="12" className="mb-4 mt-3">
                        {totalLeave.length > 0 &&
                            totalLeave.map((item,index) => {
                                return (<Fragment key={index}>
                                    <CCol lg="6" className="total-leave" >
                                        <label id={item.leave_name}>{item.leave_name}</label>
                                        <div className="input-emp-list">
                                            <TextField value={item.taken_day} fullWidth disabled/>
                                        </div>
                                    </CCol> 
                                </Fragment>)
                            })
                        }
                    </CRow>
                </CCard>

                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                    <CLabel id="lbTotalRemainLeave" className="title-lbl" style={{ marginLeft: "11px" }}>{t('Total Remain Leave')}</CLabel>
                </CCol>
                <CCard className="cards">
                    <CRow lg="12" className="mb-4 mt-3">
                        {totalLeave.length > 0 &&
                            totalLeave.map((item,index) => {
                                return (<Fragment key={index}>
                                    <CCol lg="6" className="total-leave" >
                                        <label id={item.leave_name} style = {{ marginBottom: "5px", marginTop: "15px"}}>{item.leave_name}</label>
                                        <div className="input-emp-list">
                                            <TextField value={item.remain_day} fullWidth disabled/>
                                        </div>
                                    </CCol> 
                                </Fragment>)
                            })
                        }
                    </CRow>
                </CCard>
            </>
        }
        {
            mainTable != "" && totalLeave == "" &&
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                    <CLabel id="lbTotalTakenLeave" className="title-lbl" style={{ marginLeft: "11px" }}>{t('Total Taken Leave')}</CLabel>
                </CCol>
                <CCard className="cards">
                    <CRow lg="12" className="mb-4 mt-3">
                        <CLabel style={{ marginLeft: "30px", marginBottom: "-10px" }}>{t('There is no leave for this employee!')}</CLabel>
                    </CRow>
                </CCard>
            </>
        }
    </>
    );
}
export default ConfigTotalLeave;
