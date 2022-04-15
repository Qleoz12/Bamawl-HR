import { CCard, CCardHeader, CCol, CImg, CInput, CLabel, CRow, CSwitch } from '@coreui/react';
import { TextField } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PerfectAttendanceSetupBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>

    {props.mainTable && props.mainTable.length > 0 && (<>
      <CRow lg="12">
        <CCol sm="10" md="10" xs="8" lg="11">
          <CImg src={"avatars/list.png"} className="title-Icon" alt="titleicon" />
          <label id="lbPerfectAttendanceSetup" className="ml-2 mt-2">
            {t("Perfect Attendance Setup")}
          </label>
        </CCol>
      </CRow>
      <CCard className="table-panel mt-2" style={{ backgroundColor: "#fafbfc" }}  >
        <CCardHeader style={{ backgroundColor: "#fafbfc" }}>
          <CLabel id="lbPerfectAttendance"
            className="perfect_attendance_setup lbPerfectAttendance">
            {t("Perfect Attendance")}
          </CLabel>
          <CRow lg="12" className="mt-2 mb-3 ml-2 mr-2">
            <CCol xs="12" lg="4">
              <CImg
                src={"avatars/paymenttype.png"}
                className="payment-icon"
                alt="titleicon"
              />
              <CLabel id="lbPaymentType" className="margin-left10">
                {t("Payment Type")}<span style={{ color: "red" }}>*</span>
              </CLabel>
            </CCol>
            {props.curencyAPI &&
              props.curencyAPI.map((data) => {
                return (
                  <CCol xs="5" lg="2" className="mt-1" style={{  display: 'flex', flexWrap: 'none' }} key={data.id}>
                    <CLabel className="margin-right10">
                      {data.currency_desc}
                    </CLabel>
                      <input
                        id={data.id}
                        key={data.id}
                        className={'mx-1 mt-1'}
                        type="radio"
                        name="radItem"
                        onChange={props.selectedCurrentcisChange}
                        value={data.id}
                        checked={props.selectedCurrentcies == data.id}
                      />

                  </CCol>
                )
              })}
          </CRow>
        </CCardHeader>
        <br></br>
        <CRow>
          <CCol lg='6' className="media-center" style={{ textAlign : "right" }}>
            <CLabel id="lbPaymentAttendanceAmount" className="ml-2 mt-2">
              {t("Perfect Attendance Amount")}<span style={{ color: "red" }}>*</span>
            </CLabel>
            </CCol>
            <CCol lg='6' className="t-align-left">
            <TextField
              value={props.fixedAmount}
              onChange={props.fixedAmountChange}
              id="txtAmount"
              className="perfect-attendant-setup media-center"
              placeholder={t("Enter Amount")}
              style ={{ width : "200px" }}
            ></TextField>
          </CCol>
        </CRow>
        <br></br>
      </CCard>
    </>)}
  </>
  );
}
export default PerfectAttendanceSetupBox;