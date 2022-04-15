/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
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

const DeductionRegisterNameBox=props=> {
    let {
        deductionName,
        deductionNameChange,
        flagHiden,
    } = props;

    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {
            <>
            <CCol lg="12">
                <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                <CLabel style={{ fontWeight: "bold" }} id="lbDeductionName" className="title-lbl">{t('Deduction Name')}<span className="required"></span></CLabel>
            </CCol>
            <CCard className="cards">
                <CRow style={{marginLeft:"10px", marginRight:"10px", marginTop:"40px"}}>
                    <CCol lg="2">
                        <CFormGroup className="max_width_col">
                            <TextField  className="custom_autofill_background custom-width" disabled={flagHiden == 1} autoFocus value={deductionName} id="txtDeductionName" onChange={deductionNameChange}/>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CCard>
            </>
        }
    </>
    );
}
export default DeductionRegisterNameBox;
