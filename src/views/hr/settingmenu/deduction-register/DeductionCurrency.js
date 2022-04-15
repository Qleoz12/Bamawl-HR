/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
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

const DeductionCurrency = props => {
    let {
        allCurrency,
        typeDeduction,
        payment,
        getPayment,
        flagHiden,
        hideCurrencie
    } = props;

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {typeDeduction == "2" &&
            <>
                {hideCurrencie &&
                    <>
                        <CCol>
                            <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"  />
                            <CLabel id="lbCurrency" style={{ fontWeight: "bold" }} className="label">{t('Currency')}<span className="required"></span></CLabel>
                        </CCol>
                        <CCard className="panel">
                            <CRow className="panel-border">
                                {allCurrency.length > 0 &&
                                    allCurrency.map((item, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <div className="item-select" >
                                                    <label className="card" style={{ padding: "10px" }}>
                                                        <CFormGroup style={{ margin: "0px" }}>
                                                            <CLabel className="form-check-label" variant="checkbox" htmlFor={`rdoCurrency[${item.id}]`}>{item.currency_desc}</CLabel>
                                                            <div className="float-right" style={{ marginLeft: "50px" }} >
                                                                <CInputRadio disabled={flagHiden == 1} checked={payment == item.id}
                                                                    style={{ cursor: "pointer" }} name="Currency" onChange={getPayment} className="form-check-input" id={`rdoCurrency[${item.id}]`} value={item.id} />
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
        }
    </>
    );
}
export default DeductionCurrency;
