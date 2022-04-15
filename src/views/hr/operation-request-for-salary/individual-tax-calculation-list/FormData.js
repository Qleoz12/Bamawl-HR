import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CImg,
  CLabel,
  CInput,
  CSelect,
} from "@coreui/react";
import { useTranslation } from "react-i18next";
import DatePicker from "../../hr-common/datepicker/DatePicker";
import Autocomplete from "../../../brycen-common/autocomplete/CommonAutocomplete";

const FormData = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <CCard>
        <CCardHeader>
          <h5>
            <CLabel className="m-0">
              {t("Individual Tax Calculation List")}
            </CLabel>
          </h5>
        </CCardHeader>
        <CCardBody>
          {
            // Autocomplete
            <CRow>
              <CCol className="mb-4 verticle-line" lg="4">
                <CLabel>{t("Employee ID")}</CLabel>
                {props.disableAutocomplete && (
                  <Autocomplete
                    onChange={(i) => props.changeAutocomplete("id", i)}
                    onSelect={props.selectAutocomplete}
                    items={props.idArr}
                    name={props.empID}
                  />
                )}
                {!props.disableAutocomplete && (
                  <CInput
                    value={props.empID}
                    className="bamawl-input"
                    disabled
                  />
                )}
              </CCol>

              <CCol className="mb-4 verticle-line" lg="4">
                <CLabel>{t("Employee Code")}</CLabel>
                {props.disableAutocomplete && (
                  <Autocomplete
                    onChange={(i) => props.changeAutocomplete("code", i)}
                    onSelect={props.selectAutocomplete}
                    items={props.codeArr}
                    name={props.empCode}
                  />
                )}
                {!props.disableAutocomplete && (
                  <CInput
                    value={props.empCode}
                    className="bamawl-input"
                    disabled
                  />
                )}
              </CCol>

              <CCol className="mb-4" lg="4">
                <CLabel>{t("Employee Name")}</CLabel>
                {props.disableAutocomplete && (
                  <Autocomplete
                    onChange={(i) => props.changeAutocomplete("name", i)}
                    onSelect={props.selectAutocomplete}
                    items={props.nameArr}
                    name={props.empName}
                  />
                )}
                {!props.disableAutocomplete && (
                  <CInput
                    value={props.empName}
                    className="bamawl-input"
                    disabled
                  />
                )}
              </CCol>
            </CRow>
          }

          {/* Month and Department */}
          <CRow>
            <CCol lg="5" className="mb-4">
              <CLabel className="required">{t("Search Month")}</CLabel>
              <DatePicker
                value={props.month}
                change={props.changeMonth}
                format="month"
              />
            </CCol>
            <CCol lg="2">
              <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
              <CLabel>{t("Department Name")}</CLabel>
              <CSelect
                className="bamawl-select"
                value={props.deptID}
                onChange={props.changeDept}
                custom
              >
                <option key="" value="">
                  ---{t("Select Department")}---
                </option>
                {props.deptArr.map((i) => {
                  return (
                    <option key={i.id} value={i.id}>
                      {" "}
                      {i.department_name}{" "}
                    </option>
                  );
                })}
              </CSelect>
            </CCol>
          </CRow>

          <CRow alignHorizontal="center" className="mt-4 mb-3">
            <CButton className="form-btn" onClick={props.download}>
              <i className="fas fa-download icon-btn"></i> &nbsp;
              {props.view === "1" ? t("Excel Download") : t("PDF Download")}
            </CButton>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  );
};

export default FormData;
