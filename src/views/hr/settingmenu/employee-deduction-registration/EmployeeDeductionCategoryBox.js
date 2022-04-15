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

/**
 * EmployeeDeductionCategoryBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */

const EmployeeDeductionCategoryBox=props=> {
    let {
        deductionCategoryAPI,
        chooseDeductionCategory,
        selectDeductionCategory,
    } = props;
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {
        <>
            <CCol>
                <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"  />
                <CLabel style={{ fontWeight: "bold" }} id="lbDeductionCategory" className="label">{t('Deduction Category')}</CLabel>
            </CCol>
            <CCard className="panel-employee-deduction">
                <CRow className="panel-border" style={{ marginTop: "15px", marginLeft: "0px" }}>
                {  deductionCategoryAPI.length > 0 &&
                    deductionCategoryAPI.map((item, index) => {
                    return (
                        <Fragment key={index}>
                        <div className="item-select" style={{ paddingBottom: "15px" }}>
                            <label className="card" style={{ padding: "10px" }}>
                            <CFormGroup variant="custom-radio">
                                <CLabel className="form-check-label" variant="checkbox" htmlFor={item.description}>{item.description}</CLabel>
                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                    <CInputRadio checked={selectDeductionCategory == item.id}
                                        onChange={chooseDeductionCategory} className="form-check-input" id={`rdoDecuctionCategory[${item.id}]`} value={item.id} />
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
export default EmployeeDeductionCategoryBox;
