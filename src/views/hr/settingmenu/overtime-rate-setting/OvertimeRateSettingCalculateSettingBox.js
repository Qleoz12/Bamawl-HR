/* eslint-disable eqeqeq */
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CImg,
    CLabel,
    CButton,
    CFormGroup,
    CInputRadio,
    CInput,
    CSwitch,
    CButtonGroup,
    CCollapse
} from '@coreui/react';
import { TextField } from '@material-ui/core';

const OvertimeRateSettingCalculateSettingBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol className="overtime-rate">
            <CRow lg="12" justify="center">
                <CCol>
                    <div onClick={props.accordionChange}>
                        <CImg src={"avatars/list.png"} className="avatar-list" alt="titleicon" />
                        {!props.accordion && <i className="fa fa-caret-right fa-lg ml-2 mr-2 card-color"></i>}
                        {props.accordion && <i className="fa fa-caret-down fa-lg ml-2 card-color"></i>}
                        <CLabel id='lbCalculateSetting' className="title-lbl required">
                            {t("Calculate Setting")}
                        </CLabel>
                    </div>
                </CCol>
                <CCollapse show={props.accordion}>
                    <CCol>
                        <CRow className="btn-setting">
                            <CCard style={{ padding: "5px" }}>
                                <CButtonGroup>
                                    <CButton disabled={props.usedFlag == 1} id='btnAutoSetting' onClick={props.caculateSettingChange} value="1" className={props.caculateSetting == 1 ? "btn-active-setting" : ""}>{t("Auto Setting")}</CButton>
                                    <CButton disabled={props.usedFlag == 1} id='btnUserManual' onClick={props.caculateSettingChange} value="2" className={props.caculateSetting == 2 ? "btn-active-setting" : ""}>{t("User Manual")}</CButton>
                                </CButtonGroup>
                            </CCard>
                        </CRow>
                    </CCol>
                </CCollapse>
            </CRow>
        </CCol>
        <CCollapse show={props.accordion}>
            {
                props.caculateSetting == 1 &&
                <CCard className="panel overtime-rate">
                    <CCardHeader className="card-background-color">
                        <CRow>
                            <CCol>
                                <CLabel col="3" className="title-cal">
                                    {t("Auto Setting")}
                                </CLabel>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CRow justify="center">
                                    <div id='lbBasedOn' className="margin-payment">{t("Based On")}</div>
                                    <label style={{ marginLeft: "3%", fontWeight: "normal" }} className={props.basedOn === true ? "opacity-lable" : "border-lable"}>{t("Basic Salary")}</label>
                                    <div style={{ marginLeft: "5px" }} className={'switch_paid'}>
                                        <CSwitch id='swItem' value={props.basedOn} disabled={props.usedFlag == 1} onChange={props.basedOnChange} checked={props.basedOn ? props.basedOn : ""} className={'mx-1 c-switch-sm switch-mmk-usd'} shape={'pill'} />
                                    </div>
                                    <label style={{ marginLeft: "5px", fontWeight: "normal" }} className={props.basedOn === true ? "border-lable" : "opacity-lable"}>{t("Total Salary")}</label>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup>
                            <CCol>
                                <CCol>
                                    {props.basedOn == true && props.caculateMethodTotal.length > 0 &&
                                        props.caculateMethodTotal.map((item, index) => {
                                            return (<Fragment key={index}>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CRow className="lst-cal-method">
                                                        <div>
                                                            <CInputRadio
                                                                disabled={props.usedFlag == 1}
                                                                name="selectTotal"
                                                                id={`rdoTotalSalary[${item.id}]`}
                                                                onChange={props.chooseTotalMethod}
                                                                value={item.id}
                                                                checked={props.selectTotalMethod == item.id}
                                                            />
                                                        </div>
                                                        <CLabel variant="checkbox" className="form-check-label" htmlFor={`rdoTotalSalary[${item.id}]`}>{item.description}</CLabel>
                                                        {
                                                            item.id == 2 &&
                                                            <div className="text-basedon">
                                                                <TextField id='txtDivisionHour' className="custom_backgrond" autoFocus={props.selectTotalMethod === 2}  placeholder="Enter Division Hour" value={props.totalMethodValue} inputProps={{ maxLength: 3 }} onChange={props.getTotalMethodValue} />
                                                            </div>
                                                        }
                                                    </CRow>
                                                </CFormGroup>
                                            </Fragment>)
                                        })
                                    }
                                    {props.basedOn == false && props.caculateMethodBasic.length > 0 &&
                                        props.caculateMethodBasic.map((item, index) => {
                                            return (<Fragment key={index}>
                                                <CFormGroup variant="checkbox" className="checkbox">
                                                    <CRow className="lst-cal-method">
                                                        <div>
                                                            <CInputRadio
                                                                disabled={props.usedFlag == 1}
                                                                name="selectBasic"
                                                                id={`rdoBasicSalary[${item.id}]`}
                                                                onChange={props.chooseBasicMethod}
                                                                value={item.id}
                                                                checked={props.selectBasicMethod == item.id}
                                                            />
                                                        </div>
                                                        <CLabel variant="checkbox" className="form-check-label" htmlFor={`rdoBasicSalary[${item.id}]`}>{item.description}</CLabel>
                                                        {
                                                            item.id == 8 &&
                                                            <div className="text-basedon">
                                                                <TextField id='txtDivisionHour' className="custom_backgrond" autoFocus ={props.selectBasicMethod == 8} placeholder="Enter Division Hour" value={props.basicMethodValue} inputProps={{ maxLength: 3 }} onChange={props.getBasicMethodValue} />
                                                            </div>
                                                        }
                                                    </CRow>
                                                </CFormGroup>
                                            </Fragment>)
                                        })
                                    }
                                </CCol>
                                <CRow style={{ marginLeft: "5%" }}>
                                    <CCol>
                                        <CRow>
                                            <div className="input-lbl">
                                                <CLabel className="required" style={{ fontWeight: 'bold' }}>{t("Multiply By")}</CLabel>
                                                <TextField disabled={props.usedFlag == 1} id='txtMultiply' className="text-field custom_backgrond" onChange={props.multiplyChange} value={props.multiplyBy ? props.multiplyBy : ""} inputProps={{ maxLength: 3 }} />
                                            </div>
                                            <div className="input-lbl">
                                                <CLabel className="required" style={{ fontWeight: 'bold', marginLeft: "30px" }}>{t("Added By")}</CLabel>
                                                <TextField disabled={props.usedFlag == 1} id='txtAddedBy' className="text-field custom_backgrond" onChange={props.addedChange} value={props.addedBy ? props.addedBy : ""} inputProps={{ maxLength: 10 }} />
                                            </div>
                                        </CRow>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CFormGroup>
                    </CCardBody>
                </CCard>
            }
            {
                props.caculateSetting == 2 &&
                <CCard className="panel overtime-rate">
                    <CCardHeader className="card-background-color">
                        <CRow>
                            <CCol>
                                <CLabel col="3" className="title-cal">
                                    {t("User Manual")}
                                </CLabel>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CRow justify="center">
                                    <CImg className="margin-payment payment-icon" src={"avatars/paymenttype.png"} alt="payment type" />
                                    <div id='lbPaymentType' className="margin-payment required">{t("Payment type")}</div>
                                    {props.currencies.length > 0 &&
                                        props.currencies.map((item, index) => {
                                            return (<Fragment key={index}>
                                                {
                                                    <>
                                                        <div style={{ marginLeft: "5%" }}>
                                                            <CInputRadio
                                                                disabled={props.usedFlag == 1}
                                                                id={`rdoPaymentType[${item.id}]`}
                                                                name="selectPayment"
                                                                onChange={props.getCurrency}
                                                                value={item.id}
                                                                checked={props.currency == item.id}
                                                            />
                                                        </div>
                                                        <CLabel variant="checkbox" className="form-check-label" htmlFor={`rdoPaymentType[${item.id}]`}>{item.currency_desc}</CLabel>
                                                    </>
                                                }
                                            </Fragment>)
                                        })
                                    }
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardHeader>
                    <CCardBody>
                        <CRow style={{ marginLeft: "5%" }}>
                            <CCol>
                                <CRow>
                                    <div className="input-lbl">
                                        <CInputRadio className="form-check-input" disabled={props.usedFlag == 1} onChange={props.chooseRate} checked={props.rate == "1"} name="amount" value="1" id="Hourly Rate" />
                                        <CLabel htmlFor={"Hourly Rate"} className="required">{t("Hourly Rate")}</CLabel>
                                        <TextField id='txtHourlyRate' className="text-field custom_backgrond" onChange={props.getHourly} disabled={props.rate != "1" || props.usedFlag == 1} value={props.rate === "1" ? (props.hourly ? props.hourly : "") : ""} inputProps={{ maxLength: 10 }} />
                                    </div>
                                    <div className="input-lbl" style={{ marginLeft: "5%" }}>
                                        <CInputRadio className="form-check-input" disabled={props.usedFlag == 1} onChange={props.chooseRate} checked={props.rate == "2"} name="amount" value="2" id="Daily Rate" />
                                        <CLabel htmlFor={"Daily Rate"} className="required">{t("Daily Rate")}</CLabel>
                                        <TextField id='txtDailyRate' className="text-field custom_backgrond" onChange={props.getDaily} disabled={props.rate != "2" || props.usedFlag == 1} value={props.rate === "2" ? (props.daily ? props.daily : "") : ""} inputProps={{ maxLength: 10 }} />
                                    </div>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            }
        </CCollapse>
        <br />
    </>
    );
}
export default OvertimeRateSettingCalculateSettingBox;