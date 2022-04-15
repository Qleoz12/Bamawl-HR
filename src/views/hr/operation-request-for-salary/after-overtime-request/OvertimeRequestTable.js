/* eslint-disable no-use-before-define */
import React from "react";
import { CCard, CCol, CRow, CImg, CLabel } from "@coreui/react";
import { useTranslation } from "react-i18next";
/**
 * @author Aung Khant Kyaw
 * @create 30/07/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const OvertimeRequestTable = (props) => {
  const { t } = useTranslation();
  return (
    <>
      {
        <>
          <div
            className="mt-2 ml-1"
            style={{
              backgroundColor: "#FCFCFC",
              border: "1px solid #E6E6E6",
              borderRadius: "10px",
            }}
          >
            <CCard className="table-panel mt-4 table-background-color">
              <CRow id="table">
                <CCol lg="12">
                  <CLabel
                    className="middle label-green"
                    style={{
                      textAlign: "right",
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "0.9rem",
                      fontWeight: "normal",
                      color: "green",
                    }}
                  >
                    {t("Total Rows").replace("%s", props.data.length)}
                  </CLabel>
                  <div className="table-responsive tableFixHead">
                    <table className=" table after-overtime-request-approver-table">
                      <thead className="">
                        <tr>
                          <th
                            style={{
                              textAlign: "left",
                              paddingLeft: "0.5rem",
                              paddingRight: "0rem",
                              minWidth: "3.125rem",
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
                              {t("No")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "6.25rem",
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
                              {t("Date")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              paddingLeft: "0.5rem",
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
                            style={{
                              textAlign: "left",
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
                            style={{
                              textAlign: "left",
                              wordBreak: "break-word",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                minWidth: "9.375rem",
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
                            style={{
                              textAlign: "left",
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
                              {t("Shift Name")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "10.625rem",
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
                              {t("Start Working Time")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "10.625rem",
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
                              {t("End Working Time")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "10.625rem",
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
                              {t("Extra Working Time")}
                            </div>
                          </th>
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "10.625rem",
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
                              {t("Real Overtime Hour")}
                            </div>
                          </th>
                          {props.currency.map((i) => {
                            return (
                              <th
                                style={{
                                  textAlign: "left",
                                  minWidth: "11.875rem",
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
                                  {t(
                                    "Overtime Amount " +
                                      i.currency_desc.toUpperCase()
                                  )}
                                </div>
                              </th>
                            );
                          })}
                          <th
                            style={{
                              textAlign: "left",
                              minWidth: "6.25rem",
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
                              {t("Action")}
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {props.data.map((rowData, index) => {
                          return (
                            <tr key={index} className="">
                              <td className="td-num">{rowData.Id}</td>
                              <td className="td-num left">
                                {rowData.overtime_date}
                              </td>
                              <td className="td-num left">
                                {rowData.employee_id}
                              </td>
                              <td className="td-num left">
                                {rowData.employee_code}
                              </td>
                              <td className="td-num left">
                                {rowData.employee_name}
                              </td>
                              <td className="td-num td-pink left">
                                {rowData.shift_name}
                              </td>
                              <td className="td-num td-orange left">
                                {rowData.start_working_time}
                              </td>
                              <td className="td-num td-orange left">
                                {rowData.end_working_time}
                              </td>
                              <td className="td-num td-orange left">
                                {rowData.extra_working_time}
                              </td>
                              <td className="td-num td-green left">
                                {rowData.real_ot_hour}
                              </td>
                              {rowData.overtime_amount.map((amount) => {
                                return (
                                  <td
                                    className="td-num left"
                                    style={{ background: "#e4f8f8" }}
                                  >
                                    {amount}
                                  </td>
                                );
                              })}
                              <td className="td-num center">
                                {rowData.action === "request" ? (
                                  <a
                                    href="/#"
                                    className="text-color-red"
                                    data-id={rowData.Id}
                                    onClick={props.requestOT}
                                  >
                                    {t("Request")}
                                  </a>
                                ) : (
                                  <a className="text-color-red">
                                    {t("Pending")}
                                  </a>
                                )}
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
          </div>
        </>
      }
    </>
  );
};
export default OvertimeRequestTable;
