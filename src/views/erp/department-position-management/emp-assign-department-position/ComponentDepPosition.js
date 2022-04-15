/**
 * Employee Assign Department and Position Form
 * @author Aye Min Aung
 * @create
*/

import React from "react";
import {
  CTooltip, CButton, CCard, CCardBody, CCol, CForm, CInput, CLabel,
  CRow, CCardHeader, CSelect,
} from "@coreui/react";

const ComponentDepPosition = (props) => {

  return (
    <>
      {props.empName !== "" && (
        <CCard className="margin-top border-radius border-0">
          <CCardHeader className="c-h-l c-h-b">
            <CLabel> {props.t("Department and Position Registration")} </CLabel>
          </CCardHeader>
          <CCardBody className="c-h-l">
            <CRow>
              <CCol xs="12" md="2">
                <CLabel> {props.t("Registered Name")} </CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CInput
                  className="t-b-color "
                  id="empName_id"
                  placeholder=""
                  defaultValue={props.empName}
                  disabled
                />
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol xs="12" md="2">
                <CLabel> {props.t("Department Name")} </CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect
                  className="my-select"
                  name="dep_name"
                  id="dep_id"
                  value={props.selectedDep}
                  onChange={props.deptChange}
                >
                  <option select="true" value={props.const_value}>
                    {props.t("Choose Department Name")}
                  </option>

                  {props.dept.length > 0 &&
                    props.dept.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.department_name}
                      </option>
                    ))}
                </CSelect>
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol xs="12" md="2">
                <CLabel> {props.t("Choose Position Name")} </CLabel>
              </CCol>
              <CCol xs="12" md="3">
                <CSelect
                  className="my-select"
                  name="pos_name"
                  id="pos_id"
                  value={props.selectedPos}
                  onChange={(e) => {
                    props.setSelectedPos(e.target.value);
                  }}
                >
                  <option select="true" value={props.const_value}>
                    {props.t("Choose Position Name")}
                  </option>

                  {props.post.length > 0 &&
                    props.post.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.position_name}
                      </option>
                    ))}
                </CSelect>
              </CCol>
            </CRow>
            
            {
              props.loginPermission.includes("Save") &&            
              <CRow className="mt-2 addDep-btn">
                <CCol xs="12" md="5" className="text-center">
                  <CButton className="form-btn" onClick={props.addDepPost}>
                    {props.t("Add Dept & Position")}
                  </CButton>
                </CCol>
              </CRow>
            }

            {props.empTable.length > 0 && (
              <CForm className="mt-4">
                <CRow xs="12">
                  <CCol>
                    <div className="table-responsive">
                      <table
                        className="table1 user-list-table1"
                        id="user-list-table"
                      >
                        <thead id="thead-id">
                          <tr>
                            <th>{props.t("No")}</th>
                            <th>{props.t("Department Name")}</th>
                            <th>{props.t("Position Name")}</th>
                            <th>{props.t("Action")}</th>
                          </tr>
                        </thead>

                        <tbody>
                          {props.empTable.map(({ department, position }, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{department.department_name}</td>
                                <td>{position.position_name}</td>

                                <td className="user-list-table del-txt" id="delete-btn"
                                 width="150px">
                                  {
                                    props.loginPermission.includes("Delete") &&
                                    <CTooltip content={props.t("Delete")}>
                                      <CButton size="sm" className="delete-btn"
                                        onClick={() => {
                                          props.setDelPosId(position.id);
                                          props.setDelDepId(department.id);
                                          props.deleteDepPos();
                                        }}
                                      >
                                        <img alt="delete" className="span-icon"
                                         src="/image/delete.png" width="15px" />
                                      </CButton>
                                    </CTooltip>
                                  }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      <br />
                    </div>
                  </CCol>
                </CRow>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default ComponentDepPosition