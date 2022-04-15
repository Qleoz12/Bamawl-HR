import { CCard, CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailLeaveBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && props.detailData.leaves.length > 0 && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            <CImg className="emp-info-detail-img-sub" src="avatars/list.png" alt="list" />
                            {t('Leave')}</h5>
                    </CRow>
                    <div>
                        <CCard className="table-panel emp-info-detail-card ">
                            {props.detailData.leaves.map((i, index) => {
                                return (
                                    <CRow key={index} lg="12" className="mt-3 mb-lg-2">
                                        <CCol lg="4" className="px-lg-5">
                                            <div className="mb-2">
                                                <div>
                                                    <label
                                                        style={{ whiteSpace: 'nowrap' }}
                                                        className="font-weight-bold"
                                                        id={"lb" + i.leave_name + "StartDate"}
                                                    >
                                                        {i.leave_name + " " + t('Start Date')}
                                                    </label>
                                                </div>
                                                <div>
                                                    <TextField
                                                        id={"txt" + i.leave_name + "StartDate"}
                                                        className="input-emp-info-detail"
                                                        fullWidth
                                                        value={i.start_date}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol lg="2">
                                            <div className="line"></div>
                                        </CCol>
                                        <CCol lg="4" className="pl-lg-5">
                                            <div className="mb-2">
                                                <div>
                                                    <label
                                                        style={{ whiteSpace: 'nowrap' }}
                                                        className="font-weight-bold"
                                                        id={"lb" + i.leave_name + "EndDate"}
                                                    >
                                                        {i.leave_name + " " + t('End Date')}
                                                    </label>
                                                </div>
                                                <div>
                                                    <TextField
                                                        id={"txt" + i.leave_name + "EndDate"}
                                                        className="input-emp-info-detail"
                                                        fullWidth
                                                        value={i.end_date}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </CCol>
                                        <CCol lg="2" className="align-self-center pt-3 pl-0">
                                            <div className="mb-2 mt-lg-4 pl-3">
                                                <div>
                                                    <label
                                                        id="lbRemainDay"
                                                    >
                                                        {t('Remain Day') + " " + i.remain_day}
                                                    </label>
                                                </div>
                                            </div>
                                        </CCol>
                                    </CRow>
                                )
                            })}
                        </CCard>
                    </div>
                </Fragment>
            )}
        </>
    )

}
export default EmployeeInfoDetailLeaveBox;