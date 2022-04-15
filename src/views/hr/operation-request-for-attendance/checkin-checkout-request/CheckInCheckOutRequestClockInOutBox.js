import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const CheckInCheckOutRequestClockInOutBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <> {((props.mainTable && props.mainTable.length > 0) || (props.rank == true)) && (
            <Fragment>
                <CRow lg="12">
                    <CCol className="t-align-center" >
                        <CButton
                            id="btnClockIn"
                            className="checkIO-request-btn-clock-in mr-lg-4 m-1 btn-success"
                            onClick={props.beforeClockIn}
                            disabled={props.loading}
                        >{t('Clock IN')}</CButton>
                        <CButton
                            id="btnClockOut"
                            className="checkIO-request-btn-clock-out ml-lg-4 m-1 btn-danger"
                            onClick={props.beforeClockOut}
                            disabled={props.loading}
                        >{t('Clock OUT')}</CButton>
                    </CCol>
                </CRow><br />
            </Fragment>
        )}

        </>
    )
}
export default CheckInCheckOutRequestClockInOutBox;