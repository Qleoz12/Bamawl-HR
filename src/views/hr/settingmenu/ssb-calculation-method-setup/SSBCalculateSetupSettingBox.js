/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import { CCard, CCol, CRow, CImg, CLabel, CSwitch, CCollapse, CCardBody, CCardHeader, CButtonGroup, CButton, CCardFooter } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';

const SSBCalculateSetupSettingBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    
    let {
        accordionChange,
        accordion,
        paidChange,
        paid,
        mainTable,
        basedOnMethod,
        basedOn,
        basicSalaryChange,
        fixedAmount,
        fixedAmountChane,
        rate,
        rateChange
    } = props

    return (<>
        {
            mainTable != "" &&
            <>
                <CRow lg="12">
                    <CCol lg="4">
                        <div onClick={accordionChange}>
                            <CImg src={"avatars/list.png"} className="" alt="titleicon" style={{ width: "5px", height: "12px", marginBottom: "2px" }} />
                            {!accordion && <i style={{ color: "#ebedef" }} className="fa fa-caret-right fa-lg ml-2 mr-2"></i>}
                            {accordion && <i style={{ color: "#ebedef" }} className="fa fa-caret-down fa-lg ml-2"></i>}
                            <CLabel
                                id="lblSSBCaculationMethod"
                                style={{ marginLeft: "10px", fontSize: "16px" }}>
                                {t("SSB Calculation Method")}
                                <span className="required"></span>
                            </CLabel>
                        </div>
                    </CCol>
                    {accordion &&
                        <CCol lg="8">
                            <CRow alignHorizontal="end" style={{ paddingRight: "15px" }} >
                                <CLabel id="lblPaid" style={{ paddingRight: "20px" }}>
                                    {t("Paid")}
                                </CLabel>
                                <div className={'switch_paids'}>
                                    <CSwitch id="swSSBPaidMethod" value={paid} onChange={paidChange} checked={paid ? paid : ""}
                                        className={'mx-1 c-switch-sm'} shape={'pill'} labelOn={'Yes'} labelOff={'No'} />
                                </div>
                            </CRow>
                        </CCol>
                    }
                </CRow>
                <br />
            </>
        }
        {
            paid && mainTable != "" && (
            <CCollapse show={accordion} >
                <CCard style={{ backgroundColor: "#ebedef"}} className="table-panel">
                    <CCardHeader style={{ backgroundColor: "#ebedef" }}>
                        <CCol lg="3">
                            <CLabel col="3" style={{ fontSize: "15px", color: "#575FAE", marginLeft: "-18px", top: "-18px" }}>
                                {t("SSB Paid")}
                            </CLabel>
                        </CCol>
                    </CCardHeader>

                    <CCardBody style={{ margin: "auto", paddingTop: "36px" }}>
                        <CRow className="row-center">
                            <CLabel id="lblSSBBasedOn" style={{ fontWeight: "bolder", fontSize: "15px" }}>{t("SSB Based On")}</CLabel>
                        </CRow>
                        <CRow className="row-center">
                            <CCard style={{ padding: "5px" }} >
                                <CButtonGroup >
                                    {
                                        basedOnMethod.map((item, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <CButton onClick={basicSalaryChange} id={`btn${item.description.replace(" ","")}`}
                                                        value={item.id} className={basedOn === item.id ? "btn-active" : ""}>{item.description}</CButton>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </CButtonGroup>
                            </CCard>
                        </CRow>
                        {basedOn == 3 &&
                            <>
                                <CRow style={{ justifyContent: "center", paddingBottom: "5px" }} >
                                    <div style={{ width: "45%" }}><CLabel id="lblSSBPaidFixedAmount">{t("SSB Paid Fixed Amount")}:</CLabel></div>
                                    <div><TextField id="txtAmount" style={{ marginTop: "-5px" }} value={fixedAmount} className={'numberleft custom_backgrond'} ctype="tel" placeholder="Enter Amount" onChange={fixedAmountChane} /></div>
                                </CRow>
                                <CLabel id="lblNoticesAmout" className="" style={{ fontSize: "11px", color: "red" }}>{t("***SSB Based On Calculate over Total Income (maxium 300000MMK)**")}</CLabel>
                            </>
                        }
                    </CCardBody>

                    <CCardFooter style={{ backgroundColor: "#ebedef" }}>
                        <CRow className="row-center">
                            <CLabel id="lblSSBPaidMethod" style={{ fontWeight: "bolder", fontSize: "15px" }} >{t("SSB Paid Method")}</CLabel>
                        </CRow>
                        <CRow className="row-center">
                            <label id="lblSSBPaidMethodSWLeft" className={rate === true ? "opacity-lable" : "border-lable"}>{t("Employer 5% and Employee 0%")}</label>
                            <div className={'switch_paid'}>
                                <CSwitch onChange={rateChange} value={rate} checked={rate ? rate : ""} className={'mx-1 c-switch-sm mr-rate rate-method'} shape={'pill'} />
                            </div>
                            <label id="lblSSBPaidMethodSWRight" className={rate === true ? "border-lable" : "opacity-lable"}>{t("Employer 3% and Employee 2%")}</label>
                        </CRow>
                    </CCardFooter>
                </CCard>
            </CCollapse>
        )}
    </>
    );
}
export default SSBCalculateSetupSettingBox;
