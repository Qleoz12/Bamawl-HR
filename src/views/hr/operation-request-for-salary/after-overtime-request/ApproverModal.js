/* eslint-disable no-use-before-define */
import React from "react";
import {
  CCard,
  CCol,
  CRow,
  CImg,
  CButton,
  CLabel,
  CInput,
  CButtonToolbar,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";
import { useTranslation } from "react-i18next";
/**
 * @author Aung Khant Kyaw
 * @create 03/08/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const ApproverModal = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <CModal
        centered
        closeOnBackdrop={false}
        className="editModal"
        show={props.showApproverList}
        size="xl"
      >
        <CModalHeader>
          <h5>{t("Approvers List By Position")}</h5>
        </CModalHeader>
        <CModalBody>
          {props.showApproverAddError && (
            <CRow>
              <CCol
                lg="12"
                style={{
                  textAlign: "center",
                }}
              >
                <CCard className="custom-card error p-3 mb-3">
                  <div style={{ textAlign: "left" }}>
                    {props.approverAddErrorMessage}
                  </div>
                </CCard>
              </CCol>
            </CRow>
          )}
          <CRow lg="12" style={{ marginBottom: "10px" }}>
            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
              <CLabel htmlFor="app_id" className="">
                {t("Employee ID")}
              </CLabel>
              <CInput
                type="text"
                className="bamawl-input"
                value={props.empID}
                disabled
              />
            </CCol>
            <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
              <CLabel htmlFor="app_code">{t("Employee Code")}</CLabel>
              <CInput
                type="text"
                className="bamawl-input"
                value={props.empCode}
                disabled
              />
            </CCol>
            <CCol lg="4">
              <CLabel htmlFor="app_name">{t("Employee Name")}</CLabel>
              <CInput
                type="text"
                className="bamawl-input"
                value={props.empName}
                disabled
              />
            </CCol>
          </CRow>
          <CButtonToolbar className="confirm-body" justify="center">
            <CButton className="confirm-btn" onClick={props.getApproverList}>
              {t("Search")}
            </CButton>

            {props.approverResultList.length == 0 && (
              <CButton
                className="confirm-btn"
                onClick={props.closeApproverList}
              >
                {t("Close")}
              </CButton>
            )}
          </CButtonToolbar>
          {props.approverResultList.length > 0 && (
            <CCard
              className="table-panel mt-4 table-background-color"
              style={{
                border: "1px solid #e6e6e6",
                paddingTop: "3rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              <CRow id="table">
                <CCol
                  lg="12"
                  style={{
                    marginRight: "-6.25rem",
                  }}
                >
                  <div className="table-responsive tableFixHead">
                    <table className=" table after-overtime-request-approver-table">
                      <thead className="">
                        <tr>
                          <th
                            className="left"
                            style={{
                              paddingRight: "0rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="checkbox"
                                value="all-check"
                                checked={props.allCheck}
                                onChange={props.handleAllCheck}
                              />
                            </div>
                          </th>
                          <th
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "9.375rem",
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
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "9.375rem",
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
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "9.375rem",
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
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "18.75rem",
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
                              {t("Employee Email")}
                            </div>
                          </th>
                          <th
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "9.375rem",
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
                              {t("Department")}
                            </div>
                          </th>
                          <th
                            className="left"
                            style={{
                              paddingRight: "0rem",
                              minWidth: "9.375rem",
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
                              {t("Position")}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {props.approverResultList.map((i, index) => {
                          return (
                            <tr key={index} className="">
                              <td className="td-num">
                                <input
                                  type="checkbox"
                                  value={index}
                                  id={index}
                                  checked={i.is_checked}
                                  onChange={() =>
                                    props.handleApproverCheck(i.approver_id)
                                  }
                                />
                              </td>
                              <td className="td-num left">{i.approver_id}</td>
                              <td className="td-num left">{i.approver_code}</td>
                              <td className="td-num left">{i.approver_name}</td>
                              <td className="td-num left">{i.email}</td>
                              <td
                                className="td-num left"
                                style={{
                                  background: "#d6f8b3",
                                }}
                              >
                                {i.department}
                              </td>
                              <td
                                className="td-num left"
                                style={{
                                  background: "#fadee6",
                                }}
                              >
                                {i.position}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CCol>
              </CRow>
              <CRow className="mt-4" alignHorizontal="center">
                <CButton className="confirm-btn" onClick={props.addApprover}>
                  {t("Add")}
                </CButton>
                <CButton
                  className="confirm-btn"
                  onClick={props.closeApproverList}
                >
                  {t("Close")}
                </CButton>
              </CRow>
            </CCard>
          )}
        </CModalBody>
      </CModal>
    </>
  );
};
export default ApproverModal;
