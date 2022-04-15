/**
 * Employee Assign Department and Position Form
 * @author Aye Min Aung
 * @create
*/

import React from "react";
import {
  CFormGroup, CButton, CCard, CCardBody, CCol, CInput, CLabel, CRow, CCardHeader
} from "@coreui/react";

const ComponentSearch = (props) => {

  return (
    <CCard className=" border-radius border-0">
      <CCardHeader className="c-h-l c-h-b b">
        <CLabel> {props.t("Choose Employee to assign")} </CLabel>
      </CCardHeader>
      <CCardBody className="c-h-l">
        <CRow>
          <CCol xs="12" md="2">
            <CLabel>
              {props.t("Employee ID")}
              <span className="red-star"> * </span>
            </CLabel>
          </CCol>
          <CCol xs="12" md="3">
            <CInput
              className="t-b-color mb-2"
              id="emp_id"
              placeholder=""
              onChange={(e) => {
                props.setEmpId(e.target.value);
                props.setDept("");
                props.setPost("");
                props.setEmpName("");
                props.setSelectedDep("");
                props.setSelectedPos("");
              }}
            />
          </CCol>
          <CFormGroup className="mt-0">
            <CCol className="text-center" xs="12" md="2">
              <CButton className="form-btn" type="submit" onClick={props.searchEmpData}>
                {props.t("Search")}
              </CButton>
            </CCol>
          </CFormGroup>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default ComponentSearch;