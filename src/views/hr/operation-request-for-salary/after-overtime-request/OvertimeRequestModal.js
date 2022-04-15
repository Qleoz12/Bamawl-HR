/* eslint-disable no-use-before-define */
import React from "react";
import {
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CTextarea,
  CLabel,
  CCard,
} from "@coreui/react";
import { Markup } from "interweave";
import { useTranslation } from "react-i18next";
/**
 * @author Aung Khant Kyaw
 * @create 03/08/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const OvertimeRequestModal = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <CModal
        centered
        closeOnBackdrop={false}
        className="editModal"
        show={props.overtimeReasonShow}
        size="lg"
      >
        <CModalHeader>
          <h5>{t("Overtime Request Reason")}</h5>
        </CModalHeader>
        <CModalBody>
          {props.approverErrorMessage && (
            <CRow>
              <CCol
                lg="12"
                style={{
                  textAlign: "center",
                }}
              >
                <CCard className="custom-card error p-3 mb-3">
                  <div>
                    <Markup content={"Please Select Approver"} />
                  </div>
                </CCard>
              </CCol>
            </CRow>
          )}
          <CRow className="confirm-header">
            <CCol
              lg="3"
              style={{
                textAlign: "right",
              }}
            >
              <CLabel className="required middle">
                {t("Overtime Remark")}
              </CLabel>
            </CCol>
            <CCol lg="5">
              <CTextarea
                rows="1"
                className="bamawl-input"
                placeholder={t("Remark")}
                value={props.overtimeRemark}
                onChange={(event) =>
                  props.overtimeRemarkChange(event.target.value)
                }
                style={{
                  height: "60px",
                }}
              />
              {props.remarkErrorMessage !== "" && (
                <p
                  style={{
                    margin: "0",
                    color: "red",
                  }}
                >
                  {t(props.remarkErrorMessage)}
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4" alignHorizontal="center">
            <CButton
              className="confirm-btn"
              onClick={props.saveOvertimeRequest}
            >
              {t("Save")}
            </CButton>
            <CButton
              className="confirm-btn"
              onClick={props.closeOvertimeRequest}
            >
              {t("Close")}
            </CButton>
          </CRow>
        </CModalBody>
      </CModal>
    </>
  );
};
export default OvertimeRequestModal;
