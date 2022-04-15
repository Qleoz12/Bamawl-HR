/* eslint-disable no-use-before-define */
import { CCol, CImg, CLabel, CRow } from '@coreui/react';
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';

const BasicSalaryRegisterAmountBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {!isEmpty(props.mainTable) &&
      <CRow lg="12">
        <CCol lg="4" style={{ marginTop: "20px" }}>
          <div className="flex" style={{ marginTop: "-9px" }}>
            <CImg
              src={"avatars/list.png"}
              className="basicSalaryList titleIcon"
              alt="titleicon"
            />
            <CLabel id="lbAmount" className="ml-2 mt-2 required">{t("Amount")}</CLabel>
            <TextField className="salary-background-color-amount input-basic-salary-register basic-salary-register-text-field-placeholder" style={{ marginLeft: "15px" }}
              value={props.fixedAmount}
              style={{ minWidth: "120px", maxWidth: "200px", marginLeft: "10px" }}
              onChange={props.fixedAmountChane}
              id="txtAmount"
              margin="normal"
              placeholder={t("Type Amount")}
            ></TextField>
          </div>
        </CCol>
        <CCol lg="8" style={{ marginTop: "20px" }}>
          <CRow lg="12">
            <CCol md="3" lg="5" xl="2" className="flex"><div lg="2" className="flex">
              <CImg
                src={"avatars/paymenttype.png"}
                className="basicSalaryList payment"
                alt="payment type"
              />
              <div id="lbPaymentType" className="required mx-2 margin-left10"><label>{t("Payment type")}</label></div>
            </div>
            </CCol>
            <CCol md="6" lg="7" xl="8" className="flex">
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {props.curencyAPI &&
                  props.curencyAPI.map((data) => {
                    return (
                      <Fragment key={data.id}>
                        {data.currency_desc}
                        <div className={data.id == 1 ? "switch-mmk" : "switch-usd"} style={{ marginRight: "20px" }}>
                          <input
                            id={data.id}
                            key={data.id}
                            className={'mx-2'}
                            type="radio"
                            name="swItem"
                            //checked={props.selectedCurrentcies == data.id}
                            onChange={props.selectedCurrentcisChange}
                            value={data.id}
                            checked={props.selectedCurrentcies == data.id}
                          />
                        </div>
                      </Fragment>
                    )
                  })}
              </div>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    }
    <br />
  </>
  );
}
export default BasicSalaryRegisterAmountBox;