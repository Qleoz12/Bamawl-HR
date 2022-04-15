import React, { useEffect } from 'react';
import {
  CCard,
  CCol,
  CRow,
  CImg,
  CLabel,
  CButton,
  CButtonGroup,
  CCardHeader,
  CInput,
  CSwitch,
  CCardBody
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';

const DeductionRegisterPeriodBox = props => {
  const { t } = useTranslation();
  let {
    selectDeductionName,
    typeDeduction,
    month,
    deduction_period, setDeduction_Period,
    periodMethod,
    deductForEqual,
    deductForEveryMonth,
    changeDeduct,
    changeMonth,
    changePeriod,
    changePeriodMethod,
    changeDeductionValueEqual,
    changeDeductionValueEveryMonth,
    monthTable,
    flagHiden
  } = props;

  useEffect(() => {
    if (selectDeductionName != 3) setDeduction_Period(2);
  });

  return (
    <div className="deduct-period-box">
      <CRow className="">
        <CCol lg="6">
          <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list"  />
          <CLabel style={{ fontWeight: "bold" }} name="lbDeductionPeriod" className="title-lbl">{t('Deduction Period')}<span className="required"></span></CLabel>
        </CCol>
        <CCol lg="6">
          <CCard className="deduct-period-box-card ">
            <CButtonGroup >
              <CButton disabled={selectDeductionName != 3} hidden={selectDeductionName != 3} onClick={changePeriod}
                id="btnCustomized" disabled={flagHiden == 1} value={1} className={deduction_period == 1 ? "btn-active" : ""}>{t('Customized')}</CButton>
              <CButton disabled={false} onClick={changePeriod} style={{ marginLeft: "5px" }}
                id="btnEveryMonth" disabled={flagHiden == 1} value={2} className={selectDeductionName != 3 ? "btn-active" : deduction_period == 2 ? "btn-active" : ""}>{t('Every Month')}</CButton>
            </CButtonGroup>
          </CCard>
        </CCol>
      </CRow>
      <CCard className={deduction_period == 2 ? "panel-1 " : "panel"} >

        <CCardHeader className={deduction_period == 1 ? "" : "border-1"} style={{ marginTop: "28px" }}>
          {
            deduction_period == 1 &&
            <>
              <CImg src={'avatars/from.png'} className="date-icon" alt="from date" />
              <label name="lbMonth" style={{ margin: "6px 30px" }}>{t('Month')}<span className="required"></span></label>
              <TextField className="custom_autofill_background" id="txtMonth" disabled={flagHiden == 1} value={month} onChange={changeMonth}></TextField>
            </>
          }
          {
            deduction_period == 2 &&
            <>
              {selectDeductionName != 3 && typeDeduction == 2 && <label className="mr-5">{t('Amount')}<span className="required"></span></label>}
              {typeDeduction == 1 && <TextField className="custom_autofill_background" inputProps={{ maxLength: 3 }} id="txtDeductionInstallment" disabled={flagHiden == 1} style={{ marginTop: "-7px" }} value={deductForEveryMonth} placeholder={selectDeductionName != 3 && typeDeduction == 2 ? t('Enter Amount') : "Enter Installment"} onChange={changeDeductionValueEveryMonth} ></TextField>}
              {typeDeduction == 2 && <TextField className="custom_autofill_background" inputProps={{ maxLength: 10 }} id="txtDeductionInstallment" disabled={flagHiden == 1} style={{ marginTop: "-7px" }} value={deductForEveryMonth} placeholder={selectDeductionName != 3 && typeDeduction == 2 ? t('Enter Amount') : "Enter Installment"} onChange={changeDeductionValueEveryMonth} ></TextField>}
              {typeDeduction == 1 ? "%" : ""}
            </>
          }
        </CCardHeader>

        {
          deduction_period == 1 &&
          <CCardBody className="panel-border card-period" style={{ width: "500px" }}>
            <CRow>
              <label name="lbCustomizedAmount" style={{ marginLeft: "5%" }} className={periodMethod === true ? "opacity-lable" : "border-lable"}>
                {typeDeduction == 1 ? t('Customized Percentage') : t('Customized Amount')}
              </label>
              <div style={{ marginLeft: "32px" }} className={'switch_paid'}>
                <CSwitch disabled={flagHiden == 1} id='swItem' value={periodMethod} onChange={changePeriodMethod} checked={periodMethod ? periodMethod : ""} className={'mx-1 c-switch-sm switch-mmk-usd'} shape={'pill'} />
              </div>
              <label name="lbEqualAmount" style={{ marginLeft: "32px" }} className={periodMethod === true ? "border-lable" : "opacity-lable"}>
                {typeDeduction == 1 ? t('Equal Percentage') : t('Equal Amount')}
              </label>
            </CRow>
            <br />
            <CRow style={{ justifyContent: "center" }}>
              <div className="">
                {
                  periodMethod === false && month > 0 &&
                  <table className="table purchase-order-list " style={{ background: "#FFF", border: "unset", minWidth: "unset"}} aria-label="simple table">
                    <thead id="thead-id">
                      <tr>
                        <th width="170px" style={{ textAlign: 'left' }} >
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Month')}
                          </div>
                        </th>
                        <th width="120px" style={{ textAlign: 'left' }} >
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduct')}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        monthTable.map((i, index) => {
                          return (index < month &&
                            <tr key={index}>
                              <td className="td-num" style={{ textAlign: "center", width: "170px", border: "1px solid #ebedef" }}>
                                {i.month}
                              </td>
                              <td className="td-num" style={{ textAlign: "right", width: "120px", background: "#a9f599" }} >
                              {typeDeduction == 1 && <CInput maxLength="3" id="txtDeductionInstallment" className="custom_autofill_while" disabled={flagHiden == 1} value={i.deduction} name={i.month} onChange={changeDeduct} />}
                              {typeDeduction == 2 && <CInput maxLength="10" id="txtDeductionInstallment" className="custom_autofill_while" disabled={flagHiden == 1} value={i.deduction} name={i.month} onChange={changeDeduct} />}
                              </td>
                              <td style={{ fontStyle: "italic" }}>{typeDeduction == 1 ? "%" : "Amount"}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                }
                {
                  periodMethod === true &&
                  <>
                  { typeDeduction == 1 &&
                    <TextField id="txtDeductionInstallment" placeholder="Enter Installment" className="custom_autofill_while" inputProps={{ maxLength: 3 }} disabled={flagHiden == 1} value={deductForEqual} onChange={changeDeductionValueEqual} ></TextField>
                  }
                  { typeDeduction == 2 &&
                    <TextField id="txtDeductionInstallment" placeholder="Enter Installment" inputProps={{ maxLength: 10 }} disabled={flagHiden == 1} value={deductForEqual} onChange={changeDeductionValueEqual} ></TextField>
                  }
                  {typeDeduction == 1 ? "%" : ""}
                  </>
                }
              </div>
            </CRow>
          </CCardBody>
        }
      </CCard>
    </div>
  )
}

export default DeductionRegisterPeriodBox
