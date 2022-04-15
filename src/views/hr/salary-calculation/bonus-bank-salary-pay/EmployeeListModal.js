import React from "react";
import {
  CRow,
  CButton,
  CModal,
  CModalBody,
  CButtonToolbar,
  CModalHeader,
  CCol,
  CLabel,
  CSelect,
  CCard,
  CImg,
} from "@coreui/react";
import { useTranslation } from "react-i18next";
import Autocomplete from "../../../brycen-common/autocomplete/CommonAutocomplete";

const EmployeeListModal = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <CModal
        size="xl"
        centered
        closeOnBackdrop={false}
        show={props.empListModalShow}
        onClose={props.closeBtn}
      >
        <CModalHeader closeButton>
          <h5>{t("Employee List")}</h5>
        </CModalHeader>
        <CModalBody>
          {props.showEmployeeAddError && (
            <CRow>
              <CCol
                lg="12"
                style={{
                  textAlign: "center",
                }}
              >
                <CCard className="custom-card error p-3 mb-3">
                  <div style={{ textAlign: "left" }}>
                    {props.employeeAddErrorMessage}
                  </div>
                </CCard>
              </CCol>
            </CRow>
          )}
          <CRow>
            <CCol lg="12">
              {props.empModalError.length > 0 && (
                <CCard className="custom-card error p-3 mb-3">
                  {props.empModalError.map((data, index) => {
                    return <div key={index}>{data}</div>;
                  })}
                </CCard>
              )}
            </CCol>
          </CRow>
          <CRow lg="12" style={{ marginBottom: "20px", marginLeft: "20px" }}>
            <CCol lg="4" style={{ paddingRight: "50px", marginRight: "-50px" }}>
              <CLabel htmlFor="emp_id" className="">
                {t("Employee ID")}
              </CLabel>
              <Autocomplete
                onChange={(i) => props.changeAutocomplete("id", i)}
                onSelect={props.selectAutocomplete}
                items={props.empIDData}
                name={props.empID}
              />
            </CCol>
            <CCol
              lg="1"
              style={{
                borderRight: "1px solid #E3E5F1",
                maxWidth: "1px",
                marginRight: "20px",
              }}
            ></CCol>
            <CCol lg="4" style={{ paddingRight: "50px", marginRight: "-50px" }}>
              <CLabel>{t("Employee Code")}</CLabel>
              <Autocomplete
                onChange={(i) => props.changeAutocomplete("code", i)}
                onSelect={props.selectAutocomplete}
                items={props.empCodeData}
                name={props.empCode}
              />
            </CCol>
            <CCol
              lg="1"
              style={{
                borderRight: "1px solid #E3E5F1",
                maxWidth: "1px",
                marginRight: "20px",
              }}
            ></CCol>
            <CCol lg="4" style={{ paddingRight: "50px", marginRight: "-50px" }}>
              <CLabel htmlFor="emp_name">{t("Employee Name")}</CLabel>
              <Autocomplete
                onChange={(i) => props.changeAutocomplete("name", i)}
                onSelect={props.selectAutocomplete}
                items={props.empNameData}
                name={props.empName}
              />
            </CCol>
          </CRow>
          <CRow
            id="employee-list-modal"
            className="mt-5"
            style={{ marginLeft: "20px" }}
          >
            <CCol lg="4">
              <CLabel>{t("Department Name")}</CLabel>
              <br />
              <CSelect
                onChange={props.deptChange}
                value={props.deptState}
                className="bamawl-select"
                custom
              >
                <option key="" value="">
                  {t("---Select Department---")}
                </option>
                {props.departmentAPI != "" &&
                  props.departmentAPI.map((dept, index) => {
                    return (
                      <option key={index} value={dept.id}>
                        {dept.department_name}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
            <CCol
              lg="2"
              style={{
                borderRight: "1px solid #E3E5F1",
                maxWidth: "1px",
                marginLeft: "110px",
                marginRight: "140px",
              }}
            ></CCol>
            <CCol lg="4">
              <CLabel htmlFor="positionname">{t("Position Name")}</CLabel>
              <CSelect
                onChange={props.roleChange}
                value={props.roleState}
                className="bamawl-select"
                custom
              >
                <option key="" value="">
                  {t("---Select Position Name---")}
                </option>
                {props.roleAPI != "" &&
                  props.roleAPI.map((role, index) => {
                    return (
                      <option key={index} value={role.id}>
                        {role.position_name}
                      </option>
                    );
                  })}
              </CSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4" alignHorizontal="center">
            <CButton className="confirm-btn" onClick={props.searchBtn}>
              {t("Search")}
            </CButton>
          </CRow>
          <CRow id="employee-list-modal">
            <CCol lg="12">
              {props.data.length > 0 && (
                <div
                  className=""
                  style={{
                    backgroundColor: "#FCFCFC",
                    border: "1px solid #E6E6E6",
                    borderRadius: "10px",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  <CCard className="table-panel mt-3">
                    <CRow>
                      <CCol
                        lg="6"
                        className="row-count-msg"
                        style={{ textAlign: "right" }}
                      ></CCol>
                      <CCol
                        lg="6"
                        className="row-count-msg"
                        style={{ textAlign: "right" }}
                      >
                        <CLabel>
                          {t("Total Rows").replace("%s", props.data.length)}
                        </CLabel>
                      </CCol>
                    </CRow>
                    <CRow id="table">
                      <CCol lg="12">
                        <div className="table-responsive tableFixHead">
                          <table className=" table forget-card-entry-employee-list-modal">
                            <thead className="">
                              <tr>
                                <th
                                  width="20px"
                                  className="center"
                                  style={{ verticalAlign: "middle" }}
                                >
                                  <input
                                    type="checkbox"
                                    value="all-check"
                                    checked={props.empAllCheck === true}
                                    onChange={props.allCheckBoxChange}
                                  />
                                </th>
                                <th
                                  width="140px"
                                  className="center"
                                  style={{
                                    verticalAlign: "middle",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CImg
                                        src={"/avatars/list.png"}
                                        className=""
                                        alt="titleicon"
                                        style={{
                                          width: "5px",
                                          height: "12px",
                                          marginBottom: "2px",
                                          marginRight: "5px",
                                        }}
                                      />
                                    </div>
                                    {t("Employee ID")}
                                  </div>
                                </th>
                                <th
                                  width="200px"
                                  className="center"
                                  style={{
                                    verticalAlign: "middle",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CImg
                                        src={"/avatars/list.png"}
                                        className=""
                                        alt="titleicon"
                                        style={{
                                          width: "5px",
                                          height: "12px",
                                          marginBottom: "2px",
                                          marginRight: "5px",
                                        }}
                                      />
                                    </div>
                                    {t("Employee Code")}
                                  </div>
                                </th>
                                <th
                                  width="200px"
                                  className="center"
                                  style={{
                                    verticalAlign: "middle",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CImg
                                        src={"/avatars/list.png"}
                                        className=""
                                        alt="titleicon"
                                        style={{
                                          width: "5px",
                                          height: "12px",
                                          marginBottom: "2px",
                                          marginRight: "5px",
                                        }}
                                      />
                                    </div>
                                    {t("Employee Name")}
                                  </div>
                                </th>
                                <th
                                  width="300px"
                                  className="center"
                                  style={{
                                    verticalAlign: "middle",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <CImg
                                        src={"/avatars/list.png"}
                                        className=""
                                        alt="titleicon"
                                        style={{
                                          width: "5px",
                                          height: "12px",
                                          marginBottom: "2px",
                                          marginRight: "5px",
                                        }}
                                      />
                                    </div>
                                    {t("Total Bonus Amount")}
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="">
                              {props.data.map((i, index) => {
                                return (
                                  <tr className="" key={index}>
                                    <td
                                      width="20px"
                                      className="break-word"
                                      style={{
                                        borderLeft: "3px solid #858BC3",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={i.is_checked === true}
                                        onChange={props.subCheckboxChange}
                                        value={i.employee_id}
                                      />
                                    </td>
                                    <td
                                      width="140px"
                                      className="break-word left"
                                    >
                                      {i.employee_id}
                                    </td>
                                    <td
                                      width="200px"
                                      className="break-word left"
                                    >
                                      {i.employee_code}
                                    </td>
                                    <td
                                      width="200px"
                                      className="break-word left"
                                    >
                                      {i.employee_name}
                                    </td>
                                    <td
                                      width="200px"
                                      className="break-word left td-pink"
                                    >
                                      {i.total_amount}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </CCol>
                    </CRow>
                  </CCard>
                  <br />
                </div>
              )}
            </CCol>
          </CRow>
          {props.data.length > 0 && (
            <CButtonToolbar className="confirm-body" justify="center">
              <CButton className="confirm-btn" onClick={props.addBtn}>
                {t("Add")}
              </CButton>
              <CButton className="confirm-btn" onClick={props.closeBtn}>
                {t("Close")}
              </CButton>
            </CButtonToolbar>
          )}
        </CModalBody>
      </CModal>
    </>
  );
};
export default EmployeeListModal;
