/* eslint-disable no-use-before-define */
import { CCard, CCardBody, CCardText, CCol, CContainer, CFormGroup, CImg, CInputRadio, CLabel, CRow, CSwitch } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
/**
 * EmployeeDeductionPeriodBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const EmployeeDeductionPeriodBox = props => {
  let {
    periodDeduction,
    periodDeductionChange,
    calMethod,
    calMethodChange,
    viewPermissionAPI
  } = props;

  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    <CRow>
      <CCol lg="6">
        <CCardText style={{ marginLeft: "17px", marginBottom: "0px" }}>
          <CImg
            src={"avatars/list.png"}
            className="title-Icon"
            alt="titleicon"
          />
          <CLabel style={{ fontWeight: "bold" }} id="lbDeductionPeriod" className="ml-3 mt-2">{t("Deduction Period")}</CLabel>
        </CCardText>
        <CCard className="panel-employee-deduction">
          <CRow className="panel-border" style={{ marginLeft: "0px" }}>
            <div className="item-select" style={{ paddingBottom: "15px" }}>
              <label className="card" style={{ padding: "10px", marginTop: "-5px" }}>
                <CFormGroup variant="custom-radio">
                  <CLabel className="form-check-label" variant="checkbox" htmlFor="2" >{t("Every Month")}</CLabel>
                  <div className="float-right" style={{ marginLeft: "50px" }} >
                    <CInputRadio
                      defaultChecked
                      onChange={periodDeductionChange}
                      className="form-check-input"
                      id="chkEveryMonth"
                      value="2" />
                  </div>
                </CFormGroup>
              </label>
            </div>
          </CRow>
        </CCard>
      </CCol>
      <CCol lg="6">
        <CCardText style={{ marginLeft: "20px", marginBottom: "0px" }} >
          <CImg
            src={"avatars/list.png"}
            className="title-Icon"
            alt="titleicon"
          />
          <CLabel style={{ fontWeight: "bold" }} id="lbDeductionCalculateMethodFor" className="ml-3 mt-2">{t("Deduction Calculate Method For")}</CLabel>
        </CCardText>
        <CCard className="panel-employee-deduction" style={{ height: "85px" }}>
          <CCardBody>
            <CCol>
              <CRow justify="center">
                <label style={{ marginTop: "13px" }} id='lbAll' className={calMethod === true ? "opacity-lable" : "border-lable"}>{t("All")}</label>
                <div style={{ marginLeft: "20px", marginTop: "10px" }} className={'switch_paid'}>
                  <CSwitch id='swDeductionCalculateMethodFor'
                    value={calMethod}
                    disabled={viewPermissionAPI === 0 || viewPermissionAPI === 2 ? true : false}
                    onChange={calMethodChange}
                    checked={calMethod ? calMethod : ""}
                    className={'mx-1 c-switch-sm switch-mmk-usd'} shape={'pill'} />
                </div>
                <label id='lbIndividual' style={{ marginLeft: "15px", marginTop: "13px" }} className={calMethod === true ? "border-lable" : "opacity-lable"}>{t("Individual")}</label>
              </CRow>
            </CCol>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </>
  );
}
export default EmployeeDeductionPeriodBox;
