/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CLabel, CCollapse, CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const PayrollCaculationMethodSetupSetupPayroll = props => {
    let {
        mainTable,
        collapsePayroll,
        allCurrency,
        calculateMethodID,
        handleCalculateMethodChange,
        calCulateBaseOnMethodAPI,
        currencyID,
        handleChangeCurrency,
        handleChangeCollapsePayroll,
        fDivisor,
        handleChangeFDivisor,
        editData,
        elementFocus
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (
        mainTable.length > 0 && <>
            <CRow lg="12" >
                <CCol lg="5">
                    <div className="d-flex">
                        <CImg src={'avatars/list.png'} className="mt-1" alt="titleicon" style={{ width: '5px', height: '12px' }} />
                        <details onClick={handleChangeCollapsePayroll} open={editData !== null}>
                            <summary id="lbPayrollCalculationMethod" className="required ml-2 font-weight-bold">{t('Payroll Calculation Method')}</summary>
                        </details>
                    </div>
                </CCol>
            </CRow><br />
            <CCollapse show={collapsePayroll}>
                <CRow lg="12" >
                    <CCol lg="12">
                        <div className="content-secondary pt-3 pb-3 mb-4 ml-5">
                            <CRow className="pt-2 pl-4 pr-4">
                                <CCol sm="12">
                                    <h5 id="lbSetupPayrollMethod" style={{ color: "#1107b6" }}>{t('Setup Payroll Method')}</h5>
                                </CCol>
                            </CRow>
                            <CRow className="pl-4 pr-4">
                                <CCol lg="3" className="mb-2 mt-3">
                                    <CImg className="mr-2" src={'avatars/paymenttype.png'} alt="remove" height={20} />
                                    <CLabel id="lbPaymentType">{t('Payment Type')}</CLabel>
                                </CCol>
                                <CCol >
                                    <div className="mt-2">
                                        <RadioGroup row aria-label="currency" value={currencyID} onChange={handleChangeCurrency}>
                                            {allCurrency &&
                                                allCurrency.map((currency, idx) => {
                                                    return (
                                                        <div key={idx} className="d-flex mr-4" >
                                                            <FormControlLabel className="radItem" key={idx} value={currency.id}
                                                                label={currency.currency_desc}
                                                                control={<Radio size="small" />}
                                                                labelPlacement="start"
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </div>
                                </CCol>
                            </CRow>
                            <hr />
                            <CRow className="pl-4 pr-4 PayrollCaculationMethodSetup-background">
                                <CCol>
                                    <RadioGroup aria-label="calculateMethod" value={calculateMethodID} onChange={handleCalculateMethodChange}>
                                        {calCulateBaseOnMethodAPI &&
                                            calCulateBaseOnMethodAPI.map((item, idx) => {
                                                return (
                                                    <div key={idx} className="d-flex flex-wrap">
                                                        <FormControlLabel className="mr-0 radItem" key={idx} value={item.id} control={<Radio size="small" />} label={item.description} />
                                                        {
                                                            item.id === 2 &&
                                                            <div style={{ width: "auto" }} className="autocomplete-wrapper  background-gray">
                                                                <input
                                                                    maxLength="3"
                                                                    id="txtDivisionHour"
                                                                    placeholder={t('Enter Division Hour')}
                                                                    value={fDivisor}
                                                                    onChange={handleChangeFDivisor}
                                                                    className="bamawl-input"
                                                                    ref={elementFocus}
                                                                    >
                                                                </input>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </RadioGroup>
                                </CCol>
                            </CRow>
                        </div>
                    </CCol>
                </CRow>
            </CCollapse>
        </>
    )
}

export default PayrollCaculationMethodSetupSetupPayroll;