import { CButton, CButtonToolbar, CCol, CModal, CModalBody, CModalHeader, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Message from '../../../brycen-common/message/Message';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const EmployeeListResignationBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (<>
        {props.resignModalBox === true &&
            <div>
                <CModal size="lg"
                    centered closeOnBackdrop={false}
                    show={props.resignModalBox}
                >
                    <CModalHeader>
                        <h4 className="font-weight-bold">{t('Un/Resignation')}</h4>
                    </CModalHeader>
                    <CModalBody>
                        <Message success={[]} error={props.popupError} />
                        <CRow lg="12">
                            <CCol lg="6" sm='12' style={{ display: "flex" }}>
                                <label className="font-weight-bold emp-list-label-popup"
                                    id="lbEmployeeIDPB">{t('Employee ID')}</label>
                                <TextField className="my-1 not-allowed" type="text" value={props.resignState.employee_id} disabled />
                            </CCol>
                            <CCol lg="6" sm='12' style={{ display: "flex" }}>
                                <label className="font-weight-bold emp-list-label-popup"
                                    id="lbEmployeeNamePB">{t('Employee Name')}</label>
                                <TextField className="my-1 not-allowed" type="text" value={props.resignState.employee_name} disabled />
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="6"
                                className={props.resignState.resigned_flag === 0 ?
                                    "emp-list-dpk" : "emp-list-dpk emp-list-input-dpk"}
                                style={{ display: "flex" }}>
                                <label className="font-weight-bold emp-list-label-popup"
                                    id="lbResignDatePB">{t('Resign Date')}
                                    {props.resignState.resigned_flag === 1 && (
                                        <span className="emp-list-label-require">*</span>
                                    )}
                                </label>
                                <DatePicker
                                    id="datepickerResignDatePB"
                                    value={props.selectedResignDate}
                                    change={props.handleResignChange}
                                    disabled={props.resignState.resigned_flag === 0}
                                />
                            </CCol>
                            <CCol lg="6"
                                className={props.resignState.resigned_flag !== 0 ?
                                    "emp-list-dpk" : "emp-list-dpk emp-list-input-dpk"}
                                style={{ display: "flex" }}>
                                <label className="font-weight-bold emp-list-label-popup"
                                    id="lbJoinDatePB">{t('Join Date')}
                                    {props.resignState.resigned_flag === 0 && (
                                        <span className="emp-list-label-require">*</span>
                                    )}</label>
                                <DatePicker
                                    id="datepickerJoinDatePB"
                                    value={props.selectedJoinDate}
                                    change={props.handleJoinDate}
                                    disabled={props.resignState.resigned_flag !== 0}
                                />
                            </CCol>
                        </CRow>
                        <CButtonToolbar className="confirm-body mt-3" justify="center">
                            <CButton id="btnDone" className="m-1 mr-lg-3 form-btn" active onClick={props.resignAPI} >{t('Done')}</CButton>
                            <CButton id="btnClose" className="m-1 ml-lg-3 form-btn" active onClick={props.closeResign} >{t('Close')}</CButton>
                        </CButtonToolbar>
                    </CModalBody>
                </CModal>
            </div>
        }
    </>)
}
export default EmployeeListResignationBox;