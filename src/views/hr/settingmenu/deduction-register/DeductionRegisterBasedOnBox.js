/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import {
    CCard,
    CCol,
    CRow,
    CImg,
    CLabel,
    CFormGroup,
    CInputRadio,
    CButtonGroup,
    CButton,
    CInput
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';

const DeductionRegisterBasedOnBox = props => {
    let {
        basedOnMethod,
        basicSalaryChange,
        basedOn,
        fixedAmount,
        fixedAmountChange,
        hideCurrencie,
        allCurrency,
        flagHiden,
        currenceChoose,
        getCurrenceChoose,
        calCulateBaseOnMethodAPIBasic,
        chooseBasicMethod,
        selectBasicMethod,
        basicMethodValue,
        getBasicMethodValue,
        multipleBy,
        multipleByChange,
        addedChange,
        addedBy,
        calCulateBaseOnMethodAPITotal,
        totalMethodValue,
        getTotalMethodValue,
        selectTotalMethod,
        chooseTotalMethod,
        typeDeduction
    } = props;

    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {typeDeduction == "1" &&
            <>
                <div className="deduct-period-box">
                    <CRow className="">
                        <CCol lg="6">
                            <div>
                                <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
                                <CLabel style={{ fontWeight: "bold" }} id="lbDeductionBasedOn" className="title-lbl" >
                                    {t('Deduction Based On')}<span className="required"></span></CLabel>
                            </div>
                        </CCol>
                        <CCol lg="6">
                            <CCard className="deduct-period-box-card">
                                <CButtonGroup >
                                    {basedOnMethod.length > 0 &&
                                        basedOnMethod.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <CButton disabled={flagHiden == 1} onClick={basicSalaryChange}
                                                        id={`btnDeductionBasedOn[${item.id}]`} value={item.id} className={basedOn === item.id ? "btn-active" : ""}>{item.description}</CButton>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </CButtonGroup>
                            </CCard>
                        </CCol>
                    </CRow>
                </div>
                <CCard className="card-deduction-type">
                    {basedOn == 3 && basedOnMethod.length > 0 &&
                        <>
                            <CRow md="3" style={{ marginLeft: "30px", padding: "10px" }}>
                                <CLabel name="lbAmount">{t("Amount")}:<span className="required"></span></CLabel>
                                <TextField disabled={flagHiden == 1} id="txtEnterAmount" style={{ marginBottom: "10px", marginTop: "-5px", marginLeft: "10px", fontSize: "15px" }}
                                    className="numberleft custom_autofill_background" inputProps={{ maxLength: 11 }} value={fixedAmount ? fixedAmount : ""}
                                    placeholder="Enter Amount" onChange={fixedAmountChange} />
                            </CRow>
                            {hideCurrencie &&
                                <CRow md="8">
                                    <CCard style={{ paddingTop: "20px", minWidth: "290px", marginLeft: "35px", width: "57%" }}>
                                        <CRow md="3" style={{ marginLeft: "20px" }}>
                                            <div className="margin-payment" style={{ color: "#00008B", margin: "-3px", fontSize: "18px" }}>{t("$")}</div>
                                            <div id="lbChooseCurrency" style={{ marginBottom: "10px" }} className="margin-payment">{t("Choose Currency")}:<span className="required"></span></div>
                                            <CRow className="panel-border-currency" style={{ paddingBottom: "10px" }}>
                                                {allCurrency.length > 0 &&
                                                    allCurrency.map((item, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <div className="item-select" >
                                                                    <label className="card" style={{ padding: "10px" }}>
                                                                        <CFormGroup variant="custom-radio">
                                                                            <CLabel className="form-check-label" variant="checkbox" htmlFor={`rdoChooseCurrency[${item.id}]`}>{item.currency_desc}</CLabel>
                                                                            <div className="float-right" style={{ marginLeft: "50px" }} >
                                                                                <CInputRadio style={{ cursor: "pointer" }} disabled={flagHiden == 1} checked={currenceChoose == item.id}
                                                                                    onChange={getCurrenceChoose} className="form-check-input" id={`rdoChooseCurrency[${item.id}]`} value={item.id} />
                                                                            </div>
                                                                        </CFormGroup>
                                                                    </label>
                                                                </div>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </CRow>
                                        </CRow>
                                    </CCard>
                                </CRow>
                            }
                        </>
                    }
                    {basedOn == 2 && basedOnMethod.length > 0 &&
                        <>
                            <CCol style={{ paddingTop: "20px" }}>
                                {calCulateBaseOnMethodAPIBasic.length > 0 &&
                                    calCulateBaseOnMethodAPIBasic.map((item, index) => {
                                        return (<Fragment key={index}>
                                            <CRow className="checkbox-lst">
                                                <CCol>
                                                    <CFormGroup variant="checkbox" className="checkbox" style={{ paddingLeft: "0.65rem" }}>
                                                        <CRow>
                                                            <CCol>
                                                                <CRow className="lst-cal-method">
                                                                    <div>
                                                                        <CInputRadio
                                                                            style={{ cursor: "pointer" }}
                                                                            disabled={flagHiden == 1}
                                                                            name="selectTotal"
                                                                            id={`rdoDeductionBasedOn[${item.id}]`}
                                                                            onChange={chooseBasicMethod}
                                                                            checked={selectBasicMethod == item.id}
                                                                            value={item.id} />
                                                                    </div>
                                                                    <div>
                                                                        <CLabel variant="checkbox" className="form-check-label"
                                                                            htmlFor={`rdoDeductionBasedOn[${item.id}]`}
                                                                        >{item.description}</CLabel>
                                                                    </div>
                                                                    {
                                                                        item.id === 8 &&
                                                                        <TextField
                                                                            style={{ width: "auto", height: "auto", marginTop: "-3px" }}
                                                                            autoFocus={selectBasicMethod === 8}
                                                                            inputProps={{ maxLength: 3 }}
                                                                            id="txtDivisionHour"
                                                                            placeholder={t('Enter Division Hour')}
                                                                            value={basicMethodValue ? basicMethodValue : ""}
                                                                            onChange={getBasicMethodValue}
                                                                            className="bamawl-input custom_autofill_background"
                                                                        >
                                                                        </TextField>
                                                                    }
                                                                </CRow>
                                                            </CCol>
                                                            <CCol md="7" className="lst-cal-method">
                                                                {item.description != "Fixed Amount" && item.id != 12 &&
                                                                    <div id="lbOneHour"> {t("(one hour)")}</div>
                                                                }
                                                            </CCol>
                                                        </CRow>
                                                    </CFormGroup>
                                                </CCol>
                                            </CRow>
                                        </Fragment>)
                                    })
                                }
                            </CCol>
                            <CRow style={{ marginLeft: "23px" }}>
                                <CCol>
                                    <CRow style={{ marginBlock: "22px" }}>
                                        <div className="input-lbl">
                                            <CLabel>{t("Multiply By")}<span className="required"></span></CLabel>
                                            <TextField disabled={flagHiden == 1} id="txtMultiplyBy"
                                                className="text-field ultiply-added numberleft custom_autofill_background" onChange={multipleByChange}
                                                value={multipleBy ? multipleBy : ""} inputProps={{ maxLength: 10 }} />
                                        </div>
                                        <div className="input-lbl">
                                            <CLabel style={{ marginLeft: "14px" }}>{t("Added By")}<span className="required"></span></CLabel>
                                            <TextField disabled={flagHiden == 1} id="txtAddedBy"
                                                className="text-field ultiply-added numberleft custom_autofill_background" onChange={addedChange}
                                                value={addedBy ? addedBy : ""} inputProps={{ maxLength: 10 }} />
                                        </div>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </>
                    }
                    {basedOn == 1 && basedOnMethod.length > 0 &&
                        <>
                            <CCol style={{ paddingTop: "20px" }}>
                                {calCulateBaseOnMethodAPITotal.length > 0 &&
                                    calCulateBaseOnMethodAPITotal.map((item, index) => {
                                        return (<Fragment key={index}>
                                            <CFormGroup variant="checkbox" className="checkbox" style={{ paddingLeft: "0.65rem" }}>
                                                <CRow>
                                                    <CCol>
                                                        <CRow className="lst-cal-method">
                                                            <div>
                                                                <CInputRadio
                                                                    style={{ cursor: "pointer" }}
                                                                    disabled={flagHiden == 1}
                                                                    name="selectTotal"
                                                                    id={`rdoDeductionBasedOn[${item.id}]`}
                                                                    onChange={chooseTotalMethod}
                                                                    checked={selectTotalMethod == item.id}
                                                                    value={item.id} />
                                                            </div>
                                                            <div>
                                                                <CLabel variant="checkbox" className="form-check-label"
                                                                    htmlFor={`rdoDeductionBasedOn[${item.id}]`}>{item.description}</CLabel>
                                                            </div>
                                                            {
                                                                item.id === 2 &&
                                                                <TextField
                                                                    style={{ width: "auto", height: "auto", marginTop: "-3px" }}
                                                                    autoFocus={selectTotalMethod === 2}
                                                                    inputProps={{ maxLength: 3 }}
                                                                    id="txtDivisionHour"
                                                                    placeholder={t('Enter Division Hour')}
                                                                    value={totalMethodValue ? totalMethodValue : ""}
                                                                    onChange={getTotalMethodValue}
                                                                    className="bamawl-input custom_autofill_background"
                                                                >
                                                                </TextField>
                                                            }
                                                        </CRow>
                                                    </CCol>
                                                    <CCol md="7" className="lst-cal-method">
                                                        {item.description != "Fixed Amount" && item.id != 6 &&
                                                            <div id="lbOneHour" > {t("(one hour)")}</div>
                                                        }
                                                    </CCol>
                                                </CRow>
                                            </CFormGroup>
                                        </Fragment>)
                                    })
                                }
                            </CCol>
                            <CRow style={{ marginLeft: "23px" }}>
                                <CCol>
                                    <CRow style={{ marginBlock: "22px" }}>
                                        <div className="input-lbl">
                                            <CLabel>{t("Multiply By")}<span className="required"></span></CLabel>
                                            <TextField disabled={flagHiden == 1} id="txtMultiplyBy"
                                                className="text-field ultiply-added numberleft custom_autofill_background" onChange={multipleByChange}
                                                value={multipleBy ? multipleBy : ""} inputProps={{ maxLength: 10 }} />
                                        </div>
                                        <div className="input-lbl">
                                            <CLabel style={{ marginLeft: "14px" }}>{t("Added By")}<span className="required"></span></CLabel>
                                            <TextField disabled={flagHiden == 1} id="txtAddedBy"
                                                className="text-field ultiply-added numberleft custom_autofill_background" onChange={addedChange}
                                                value={addedBy ? addedBy : ""} inputProps={{ maxLength: 10 }} />
                                        </div>
                                    </CRow>
                                </CCol>
                            </CRow>
                        </>
                    }
                </CCard>
            </>
        }
    </>
    );
}
export default DeductionRegisterBasedOnBox;
