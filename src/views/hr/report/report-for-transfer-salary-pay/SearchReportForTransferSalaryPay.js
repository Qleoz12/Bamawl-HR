import { CCard, CCol, CImg, CRow, CButton } from '@coreui/react';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const SearchReportForTransferSalaryPay = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {/* {
      props.currencySetting.map((i, index) => {
        return (<Fragment key={index}> */}

        <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
        <label id="lbPaymentMonth" className="ml-3 mt-2" style={{ fontWeight: "bold" }}>{t("Payment Month")}<span style={{ color: "red" }}>*</span></label>
        <CCard className="salary-transfer-setting-containt" style={{ backgroundColor: "#fafbfc" }}>
            <div>
                <CCol lg="3" className="" >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="datePaymentMonth"
                            className="report-css"
                            format="yyyy-MM"
                            views={["year", "month"]}
                            openTo="month"
                            value={props.selectedDate}
                            onChange={props.handleDateChange}
                            // cancelLabel={false}
                            // okLabel={false}
                            // autoOk={true}
                            clearable={true}
                            InputProps={{ readOnly: true }}
                            disabled={props.disabled}
                        />
                    </MuiPickersUtilsProvider>
                </CCol>
            </div>
        </CCard>

        <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
        <label id="lbCurrency" className="ml-3 mt-2" style={{ fontWeight: "bold" }}>{t("Currency")}<span style={{ color: "red" }}>*</span></label>
        <CCard className="salary-transfer-setting-containt" style={{ backgroundColor: "#fafbfc" }}>
            <CRow>
                {props.currencyAPI.map((item, index) => {
                    return (
                        <CCol key={index} sm='12' md='2' className='radio-setting-small' >
                            <label id="lbCurrency">
                                {item.currency_desc}
                                <input
                                    onChange={props.currencyChange}
                                    type="radio"
                                    name={"Currency"}
                                    value={item.id}
                                    checked={item.id == props.currencyState}
                                    id="radCurrency"
                                />
                            </label>
                        </CCol>
                    )
                })}
            </CRow>
        </CCard>

        <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
        <label id="lbPaymentName" className="ml-3 mt-2" style={{ fontWeight: "bold" }}>{t("Payment Name")}<span style={{ color: "red" }}>*</span></label>
        <CCard className="salary-transfer-setting-containt" style={{ backgroundColor: "#fafbfc" }}>
            <CRow>
                {props.paymentNameAPI.map((i, index) => {
                    return (
                        <CCol key={index} sm='12' md='2' className='radio-setting' >
                            <label id="lbPaymentName">
                                {i.bank_name}
                                <input
                                    onChange={props.paymentNameChange}
                                    type="radio"
                                    // name={"Category" + i.currency_desc}
                                    name={"PaymentName"}
                                    value={i.id}
                                    id="radPaymentName"
                                />
                            </label>
                        </CCol>
                    )
                })}
            </CRow>
        </CCard>

        <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
        <label id="lbPaymentType" className="ml-3 mt-2" style={{ fontWeight: "bold" }}>{t("Payment Type")}<span style={{ color: "red" }}>*</span></label>
        <CCard className="salary-transfer-setting-containt" style={{ backgroundColor: "#fafbfc" }}>
            <CRow>
                <CCol sm='12' md='2' className='radio-setting-small' >
                    <label id="lbPaymentType">
                        {t("Salary")}
                        <input
                            onChange={props.paymentTypeChange}
                            type="radio"
                            // name={"Category" + i.currency_desc}
                            name={"PaymentType"}
                            value={1}
                            defaultChecked
                            // checked={props.paymentTypeState === 1}
                            id="radSalary"
                        />
                    </label>
                </CCol>
                <CCol sm='12' md='2' className='radio-setting-small'>
                    <label >
                        {t('Bonus')}
                        <input
                            onChange={props.paymentTypeChange}
                            type="radio"
                            // name={"Category" + i.currency_desc}
                            name={"PaymentType"}
                            value={2}
                            // checked={props.paymentTypeState === 2}
                            id="radBonus"
                        />
                    </label>
                </CCol>
            </CRow>
        </CCard>
        {/* </Fragment>
        );
      })
    } */}
        <br></br>
        <CRow lg="12">
            <CCol className="t-align-center">
                <CButton id="btnSearch" onClick={props.searchClick} className="form-btn">{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );

}

export default SearchReportForTransferSalaryPay;