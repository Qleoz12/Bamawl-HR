/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
    CFormGroup,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';

const DeductionRegisterCountForBox = props => {
    let {
        countDeduction,
        countDeductionChange,
        flagHiden,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list"  />
                    <CLabel style={{ fontWeight: "bold" }} id="lbCountDeductions" className="title-lbl">{t('Deduction Count')}<span className="required"></span></CLabel>
                </CCol>
                <CCard className="cards">
                    <CRow style={{ marginLeft: "10px", marginRight: "10px", marginTop: "40px" }}>
                        <CCol lg="2">
                            <CFormGroup className="max_width_col">
                                <TextField className="custom_autofill_background" inputProps={{ maxLength: 10 }} disabled={flagHiden == 1} id="txtEnterCount" value={countDeduction ? countDeduction : ""} onChange={countDeductionChange} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CCard>
            </>
        }

    </>
    );
}
export default DeductionRegisterCountForBox;
