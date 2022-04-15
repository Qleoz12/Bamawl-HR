/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
    CButton,
    CButtonGroup,
    CInputRadio,
    CFormGroup
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeductionRegisterTypeBox = props => {
    let {
        chooseDeductionType,
        typeDeduction,
        flagHiden,
        selectDeductionName,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {selectDeductionName != "" &&
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                    <CLabel style={{ fontWeight: "bold" }} id="lbDeductionType" className="title-lbl">{t('Deduction Type')}<span className="required"></span></CLabel>
                </CCol>
                {
                    <CCard className="panel">
                        <CRow className="panel-border">
                            <div className="item-select" >
                                <label className="card" style={{ padding: "10px" }}>
                                    <CFormGroup style={{ margin: "0px" }}>
                                        <CLabel className="form-check-label" variant="checkbox" htmlFor="1" >{t("Percentage (%)")}</CLabel>
                                        <div className="float-right" style={{ marginLeft: "50px" }} >
                                            <CInputRadio
                                                style={{ cursor: "pointer" }}
                                                name="Deduction Type"
                                                disabled={flagHiden == 1}
                                                checked={typeDeduction == "1"}
                                                onChange={chooseDeductionType}
                                                className="form-check-input"
                                                id="1"
                                                value="1" />
                                        </div>
                                    </CFormGroup>
                                </label>
                            </div>
                            <div className="item-select" >
                                <label className="card" style={{ padding: "10px" }}>
                                    <CFormGroup style={{ margin: "0px" }}>
                                        <CLabel className="form-check-label" variant="checkbox" htmlFor="2">{t("Amount")}</CLabel>
                                        <div className="float-right" style={{ marginLeft: "50px" }} >
                                            <CInputRadio
                                                style={{ cursor: "pointer" }}
                                                name="Deduction Type"
                                                disabled={flagHiden == 1}
                                                checked={typeDeduction == "2"}
                                                onChange={chooseDeductionType}
                                                className="form-check-input"
                                                id="2"
                                                value="2" />
                                        </div>
                                    </CFormGroup>
                                </label>
                            </div>
                        </CRow>

                    </CCard>
                }
            </>
        }
    </>
    );
}
export default DeductionRegisterTypeBox;
