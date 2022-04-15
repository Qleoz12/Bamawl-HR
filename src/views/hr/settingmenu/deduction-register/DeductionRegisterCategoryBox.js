/* eslint-disable no-use-before-define */
import React ,{Fragment, useEffect} from 'react';
import {
    CCol,
    CRow,
    CImg,
    CLabel,
    CFormGroup,
    CInputRadio,
    CCard
  } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeductionRegisterCategoryBox=props=> {
    let {
        deductionNameAPI,
        chooseDeductionName,
        flagHiden,
        selectDeductionName,
    } = props;
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {
        <>
            <CCol>
                <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"  />
                <CLabel style={{ fontWeight: "bold" }} id="lbDeductionCategory" className="label">{t('Deduction Category')}<span className="required"></span></CLabel>
            </CCol>
            <CCard className="panel">
                <CRow className="panel-border">
                {  deductionNameAPI.length > 0 &&
                    deductionNameAPI.map((item, index) => {
                    return (
                        <Fragment key={index}>
                        <div className="item-select" >
                            <label className="card" style={{ padding: "10px" }}>
                            <CFormGroup style={{ margin: "0px" }}>
                                <CLabel className="form-check-label" variant="checkbox"
                                 htmlFor={`rdoDecuctionCategory[${item.id}]`}>{item.description}</CLabel>
                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                    <CInputRadio style={{ cursor: "pointer" }} disabled={flagHiden == 1} id={`rdoDecuctionCategory[${item.id}]`} name="Deduction Category" checked={selectDeductionName == item.id}
                                        onChange={chooseDeductionName} className="form-check-input" value={item.id} />
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
        </>
        }
    </>
    );
}
export default DeductionRegisterCategoryBox;
