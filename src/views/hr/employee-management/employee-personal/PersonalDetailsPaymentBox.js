import { CCol, CFormGroup, CInputRadio, CLabel, CRow, CSelect } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

const PersonalDetailsPaymentBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>

            <CRow lg="12">
                <CCol lg="5" sm="5" xs="5" className="mb-4" >
                    <label id="lblPaymentName">{t('Payment Name')}</label>
                    <CSelect id="dropPaymentName" className="bamawl-select" bank_name={props.bankState.bank_name ? props.bankState.bank_name : ""} value={props.bankState.id ? props.bankState.id : ""} onChange={props.bankChange} custom>
                        <option key="" value="">{t('---Select Payment Name---')}</option>
                        {
                            props.bankAPI.bank_info &&
                            props.bankAPI.bank_info.map((data, index) => {
                                return (
                                    <option bank_name={data.bank_name} key={index} value={data.id}>{data.bank_name}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="7" sm="7" xs="7" className="pl-0 " >
                    <div className="input-emp-list" style={{ display: "flex", marginTop: "30px" }}>
                        <input
                            type="image"
                            src={'avatars/Add Working Day and Shift.png'}
                            style={{ width: '30px', cursor: "pointer" }}
                            onClick={props.RegisterAccount}
                        />
                        <div style={{ marginTop: "5px", marginLeft: "10px" }}>{t('Account Register')}</div>
                    </div>
                </CCol>
            </CRow>
            {props.bankState.id &&
                <CRow lg="12">
                    <CCol lg="6" className="mb-4" >
                        <CRow className="panel-border">
                            {props.currencyAPI &&
                                props.currencyAPI.map((data, i) => {
                                    return (
                                        props.currencyByBankId.map((item, index) => {
                                            if (data.id === item) {
                                                return (<Fragment key={index}>
                                                    <div className="item-select" style={{ display: props.checkbank ? "" : "none" }}>
                                                        <label className="card ml-3" style={{ padding: "10px", backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                                            <CFormGroup variant="custom-radio" style={{ paddingLeft: "0.5rem" }}>
                                                                <CLabel className="form-check-label" variant="checkbox">{data.currency_desc}</CLabel>
                                                                <div className="float-right" style={{ marginLeft: "50px" }} >
                                                                    <CInputRadio type="radio" id={data.id} name="currency"
                                                                        onChange={props.chooseCurrency}
                                                                        value={data.currency_desc} className="form-check-input"
                                                                        defaultChecked={index === 0}
                                                                    />
                                                                </div>
                                                            </CFormGroup>
                                                        </label>
                                                    </div>
                                                    &nbsp;
                                                </Fragment>)
                                            }
                                        })
                                    )
                                })
                            }
                        </CRow>
                    </CCol>
                </CRow>
            }
        </>
    )
}
export default PersonalDetailsPaymentBox;