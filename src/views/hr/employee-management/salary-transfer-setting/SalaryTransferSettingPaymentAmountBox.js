import { CCard, CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SalaryTransferSettingPaymentAmountBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      props.currencySetting.map((i, index) => {
        return (<Fragment key={index}>
          <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
          <label id="lbCurrency" className="ml-3 mt-2">{t("Currency")} {i.currency_desc}<span style={{ color: "red" }}>*</span></label>
          <CCard className="salary-transfer-setting-containt" style={{ backgroundColor: "#fafbfc" }}>
            <CRow>
              <CCol lg="2" style={{ minWidth: "165px", whiteSpace: "nowrap" }}>

                <CImg
                  src={"avatars/usdIcon.png"}
                  className="currency-icon mb-1"
                  alt="currencyicon"
                />
                <label id="lbAmountType" className="ml-1">
                  {t('Choose Amount Type')}
                </label>

              </CCol>
              <CCol lg='10'>
                {props.showAmount == true ?
                  <CRow>
                    <CCol sm='12' md='2' className='radio-setting' >
                      <label id="lbPercentage">
                        {t("Percentage(%)")}
                        <input
                          onChange={props.paymentTypeChange.bind(this, index)}
                          type="radio"
                          name={"Category" + i.currency_desc}
                          value={1}
                          checked={props.paymentTypeState[index] === 1}
                          id="radPercent"
                        />
                      </label>
                    </CCol>
                    <CCol sm='12' md='2' className='radio-setting'>
                      <label >
                        {t('Amount')}
                        <input
                          onChange={props.paymentTypeChange.bind(this, index)}
                          type="radio"
                          name={"Category" + i.currency_desc}
                          value={2}
                          checked={props.paymentTypeState[index] === 2}
                          id="radAmount"
                        />
                      </label>
                    </CCol>
                  </CRow> :
                  <CRow>
                    <CCol sm='12' md='2' className='radio-setting' >
                      <label id="lbPercentage">
                        {t("Percentage(%)")}
                        <input
                          // onChange={props.paymentTypeChange.bind(this, index)}
                          className="not-allowed"
                          readOnly
                          type="radio"
                          name={"Category" + i.currency_desc}
                          value={1}
                          checked={true}
                          id="radPercent"
                          autoFocus
                        />
                      </label>
                    </CCol>
                    <CCol sm='12' md='2' className='radio-setting'>
                      <label id="lbAmount" >
                        {t('Amount')}
                        <input
                          // onChange={props.paymentTypeChange.bind(this, index)}
                          className="not-allowed"
                          readOnly
                          type="radio"
                          name={"Category" + i.currency_desc}
                          value={2}
                          checked={false}
                          id="radAmount"
                        />
                      </label>
                    </CCol>
                  </CRow>
                }
              </CCol>
            </CRow>
            <CCard className="salary-transfer-setting-containt mt-3" style={{ backgroundColor: "white" }}>
              <CRow lg="12" className="mb-3 ml-2" style={{ backgroundColor: "white" }}>
                <div className="table-responsive">
                  <table id="table" style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th></th>
                        <th id="lbAccountNumber">{t("Account Number")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        i.priority_list.map((sec, idx) => {
                          return (
                            <tr key={idx}>
                              <td style={{ minWidth: "200px", whiteSpace: "nowrap" }}>{sec.bank_name}({sec.priority_name})</td>
                              <td style={{ width: "30%" }}>{sec.acc_number}</td>
                              {props.showAmount == true ?
                                props.paymentTypeState[index] === 2 ?
                                  <td style={{ width: "50%" }}> <TextField
                                    type="text"
                                    maxLength={props.paymentTypeState[index] === 1 ? 3 : undefined}
                                    id={i.currency_desc + idx}
                                    value={i.priority_list.length > 1 && idx == i.priority_list.length - 1 ? props.fixedAmount[i.currency_desc + idx] = 0 : i.priority_list.length === 1 ? props.fixedAmount[i.currency_desc + idx] = 0 : props.fixedAmount[i.currency_desc + idx]}
                                    disabled={i.priority_list.length > 1 && idx == i.priority_list.length - 1 ? true : i.priority_list.length === 1 ? true : false}
                                    onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                                    className="salary-color bamawl-input media-center"
                                    placeholder={t("Enter Amount")}
                                  /></td> :
                                  props.paymentTypeState[index] === 1 ?
                                    <td style={{ width: "50%" }}> <TextField
                                      type="text"
                                      maxLength={props.paymentTypeState[index] === 1 ? 3 : undefined}
                                      id={i.currency_desc + idx}
                                      value={i.priority_list.length === 1 ? props.fixedAmount[i.currency_desc + idx] = 100 : props.fixedAmount[i.currency_desc + idx]}
                                      disabled={i.priority_list.length === 1 ? true : false}
                                      onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                                      className="salary-color bamawl-input media-center"
                                      placeholder={t("Enter Amount")}
                                    /></td>
                                    :
                                    <td style={{ width: "50%" }}> <TextField
                                      type="text"
                                      maxLength={props.paymentTypeState[index] === 1 ? 3 : undefined}
                                      id={i.currency_desc + idx}
                                      value={props.fixedAmount[i.currency_desc + idx] ? props.fixedAmount[i.currency_desc + idx] || "" : props.fixedAmount[i.currency_desc + idx]}
                                      onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                                      className="salary-color bamawl-input media-center"
                                      placeholder={t("Enter Amount")}
                                    /></td> :
                                <td style={{ width: "50%" }}> <TextField
                                  type="text"
                                  id={i.currency_desc + idx}
                                  value={props.detailData.toString() ? props.fixedAmount[i.currency_desc + idx] : ""}
                                  disabled
                                  className="salary-color bamawl-input media-center"
                                  placeholder={t("Enter Amount")}
                                /></td>
                              }
                            </tr>
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </CRow>
            </CCard>
          </CCard>
        </Fragment>
        );
      })
    }
  </>
  );

}

export default SalaryTransferSettingPaymentAmountBox;