import { CButton, CCard, CCol, CImg, CInput, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import SaveSalaryTransferSettingByGroup from './SaveSalaryTransferSettingByGroup';

const SalaryTransferSettingByGroupCurrencyBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      props.mainCurrency === true &&
      <div>
        {
          props.currencySetting.map((i, index) => {
            return (<Fragment key={index}>
              <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
              <label className="ml-3 mt-2">Currency {i.currency_desc}<span style={{ color: "red" }}>*</span></label>
              <CCard className="salary-transfer-setting-by-group-radio-containt" style={{ backgroundColor: "#fafbfc" }}>
                <CRow>
                  <CCol lg="2"  >
                    <label className="ml-4">
                      {t('Choose Amount Type')}
                    </label>
                  </CCol>
                  <CCol lg='10'>
                    <CRow>
                      <CCol sm='12' md='2' className='radio' >
                        <label>
                          {t("Percentage(%)")}
                          <input
                            onChange={props.paymentTypeChange.bind(this, index)}
                            type="radio"
                            name={"Category"+i.currency_desc}
                            value={1}
                            checked = {props.paymentTypeState[index] === 1 || ''}
                            id="radPercent"
                            />
                        </label>
                      </CCol>
                      <CCol sm='12' md='2' className='radio'>
                        <label >
                          {t('Amount')}
                          <input
                            onChange={props.paymentTypeChange.bind(this, index)}
                            type="radio"
                            name={"Category"+i.currency_desc}
                            value={2}
                            checked = {props.paymentTypeState[index] === 2 || ''}
                            id="radAmount"
                          />
                        </label>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <CRow lg="12" className=" mt-3 mb-3 ml-2" >
                  {
                    i.priority_list.map((sec, idx) => {
                      return (
                        <CCol lg="3" key={idx} style={{ borderRight: "1px solid #E3E5F1" }}>
                          <label className="mt-2">{sec.bank_name}({sec.priority_name})</label>
                          <br></br>
                          {props.paymentTypeState[index] === 2 ?
                          <TextField
                            id={i.currency_desc + idx}
                            value={i.priority_list.length > 1 && idx == i.priority_list.length - 1 ? props.fixedAmount[i.currency_desc + idx] = 0 : i.priority_list.length === 1 ? props.fixedAmount[i.currency_desc + idx] = 0 : props.fixedAmount[i.currency_desc + idx] !== "" ? (props.fixedAmount[i.currency_desc + idx] !== 0 ? props.fixedAmount[i.currency_desc + idx] || "" : 0) : "" }
                            disabled = {i.priority_list.length > 1 && idx == i.priority_list.length - 1 ? true : i.priority_list.length === 1 ? true : false}
                            onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                            margin="normal"
                            aria-label="Close"
                            className="salary-transfer-group bamawl-input"
                            style={{ marginTop: '3px', width: "95%" }}
                          />
                        : props.paymentTypeState[index] === 1 ? 
                        <TextField
                        id={i.currency_desc + idx}
                        value={i.priority_list.length === 1 ? props.fixedAmount[i.currency_desc + idx] = 100: props.fixedAmount[i.currency_desc + idx] !== "" ? (props.fixedAmount[i.currency_desc + idx] !== 0 ? props.fixedAmount[i.currency_desc + idx] || "" : 0) : ""}
                        disabled = {i.priority_list.length === 1 ? true : false}
                        onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                        margin="normal"
                        aria-label="Close"
                        className="salary-transfer-group bamawl-input"
                        style={{ marginTop: '3px', width: "95%" }}
                      /> : 
                       <TextField
                            id={i.currency_desc + idx}
                            value={props.fixedAmount[i.currency_desc + idx] !== "" ? (props.fixedAmount[i.currency_desc + idx] !== 0 ? props.fixedAmount[i.currency_desc + idx] || "" : 0) : ""}
                            onChange={props.fixedAmountChange.bind(this, i.currency_desc + idx, idx)}
                            margin="normal"
                            aria-label="Close"
                            className="salary-transfer-group bamawl-input"
                            style={{ marginTop: '3px', width: "95%" }}
                          />
                        }
                        </CCol>
                      );
                    })
                  }
                </CRow>

              </CCard>
            </Fragment>
            );
          })
        }

        <SaveSalaryTransferSettingByGroup saveData = {props.saveData} />
      </div>
    }
  </>
  );
}

export default SalaryTransferSettingByGroupCurrencyBox;
