/* eslint-disable no-use-before-define */
import React from "react";
import { CCard, CTooltip, CCol, CRow, CImg } from "@coreui/react";
import { useTranslation } from "react-i18next";

/**
 * @author Zin Min Myat
 * @create 18/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const ApproverTable = (props) => {
  const { t } = useTranslation();

  return (
    <>
      {
        <>
          {props.data.length > 0 && (
            <>
              <div
                className="mt-2 ml-5"
                style={{
                  backgroundColor: "#FCFCFC",
                  border: "1px solid #E6E6E6",
                  borderRadius: "10px",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              >
                <CCard className="table-panel mt-4 table-background-color">
                  <CRow id="table">
                    <CCol lg="12">
                      <div className="table-responsive tableFixHead">
                        <table className=" table after-overtime-request-approver-table">
                          <thead className="">
                            <tr>
                              <th
                                className="center"
                                style={{
                                  minWidth: "4.375rem",
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
                                className="center"
                                style={{
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
                                className="center"
                                style={{
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
                                className="center"
                                style={{
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
                                className="center"
                                style={{
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
                                className="center"
                                style={{
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
                                className="center"
                                style={{
                                  minWidth: "12.5rem",
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
                              <th
                                className="center"
                                style={{
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
                                  {t("Delete")}
                                </div>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="">
                            {
                              props.data.map((i, index) => {
                                return (
                                  <tr key={index} className="">
                                    <td
                                      className="td-num"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      {index + 1}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      {i.approver_id}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      {i.approver_code}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      {i.approver_name}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      {i.email}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                        background: "#d6f8b3",
                                      }}
                                    >
                                      {i.department}
                                    </td>
                                    <td
                                      className="td-num left"
                                      style={{
                                        maxWidth: "50px",
                                        background: "#fadee6",
                                      }}
                                    >
                                      {i.position}
                                    </td>
                                    <td
                                      className="td-num center"
                                      style={{
                                        maxWidth: "50px",
                                      }}
                                    >
                                      <CTooltip content={t("Delete")}>
                                        <CImg
                                          data-id={i.approver_id}
                                          src={"/avatars/remove.png"}
                                          className="icon-clt "
                                          alt="delete"
                                          onClick={props.deleteApprover}
                                        />
                                      </CTooltip>
                                    </td>
                                  </tr>
                                );
                              })
                              // return(
                              // key={index}

                              // )
                              // })
                            }
                          </tbody>
                        </table>
                      </div>
                    </CCol>
                  </CRow>
                </CCard>
              </div>
            </>
          )}
        </>
      }
    </>
  );
};
export default ApproverTable;
