/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
  } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
/**
 * EmployeeDeductionCountForBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const EmployeeDeductionCountForBox=props=> {
    let {
        countDeduction,
        countDeductionChange,
    } = props;
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        { 
            <>
            <CCol lg="12">
                <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                <CLabel style={{ fontWeight: "bold" }} id="lbCount" className="title-lbl">{t('Count')}</CLabel>
            </CCol>
                  
            <CCard className="panel-employee-deduction" style={{ height: "75px" }}>
                <CRow className="margin-card" style={{ marginTop: "25px", marginLeft: "0px" }}>
                    <CCol lg="2" className="max_width_col">
                        <TextField  id="txtCount" disabled={true} maxLength="10" value={countDeduction ? countDeduction : ""} onChange={countDeductionChange} />
                    </CCol>
                </CRow>
            </CCard>
            </>
        }
    
    </>
    );
}
export default EmployeeDeductionCountForBox;
