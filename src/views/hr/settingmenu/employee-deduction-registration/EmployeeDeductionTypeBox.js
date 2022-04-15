/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
    CInput
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * EmployeeDeductionTypeBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const EmployeeDeductionTypeBox = props => {
    let {
        typeDeduction,
        lableDeductionType
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            <>
                <CCol lg="12">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list"  />
                    <CLabel style={{ fontWeight: "bold" }} id="lbDeductionType" className="title-lbl">{t('Deduction Type')}</CLabel>
                </CCol>
                <CCard className="panel-employee-deduction" style={{ height: "75px" }}>
                    <CRow className="margin-card" style={{ marginTop: "20px" }}>
                        <CCol lg="1" style={{ border: "2px solid #98cc54", borderRadius: "8px", width: "8%", padding: "3px", minWidth: "122px"}}>
                            <CLabel style={{ color: "#98cc54", fontWeight:"bold", margin:"2px 0px 0px 15px" }} id='lblLableDeductionType' className="title-lbl">{lableDeductionType}</CLabel>
                        </CCol>
                        <CCol lg="2" style={{ marginLeft: "15px",borderRadius: "8px", maxWidth: "172px" }}>
                            <CInput
                                disabled={true}
                                style={{ borderRadius: "8px" }}
                                id='txtDeductionType'
                                value={typeDeduction}
                            />
                        </CCol>
                    </CRow>
                </CCard>

            </>
        }
    </>
    );
}
export default EmployeeDeductionTypeBox;
