/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import {
  CCard,
  CLabel,
  CCol,
  CRow,
  CImg,
  CButton,
  CInput,
  CTooltip,
} from "@coreui/react";
import { useTranslation } from "react-i18next";
import { isEmpty } from "../../hr-common/common-validation/CommonValidation"; // Common validation function

/**
 * @author
 * @edit
 * @create 11/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const EmployeeListTable = (props) => {
  const { t } = useTranslation();
  let subAmount = 0;
  let total_current_amount = 0;

  const checkAmount = (e, data) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (isEmpty(e.target.value)) {
      alert("Data must not be empty value");
      e.target.value = e.target.dataset.amt;
    } else {
    }
    if (document.getElementById("tbody_id").rows != null) {
      for (
        let k = 0;
        k < document.getElementById("tbody_id").rows.length;
        k++
      ) {
        if (
          document.getElementById(`total_cur_amt_${data.employee_id}`) != null
        ) {
          document.getElementById(
            `total_cur_amt_${data.employee_id}`
          ).value = 0;
          let total_amount = 0;
          for (let j = 0; j < subAmount; j++) {
            console.log(
              "result test",
              parseInt(
                document.getElementById(`sub_${data.employee_id}_${j}`).value
              )
            );
            total_amount += parseInt(
              document.getElementById(`sub_${data.employee_id}_${j}`).value
            );
            document.getElementById(`total_cur_amt_${data.employee_id}`).value =
              total_amount;
          }
        }
      }
    }
  };

  return (
    <>
      {props.data != "" && (
        <>
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
                    <table className=" table forget-card-entry-employee-list-table">
                      <thead className="">
                        <tr>
                          <th
                            width="10px"
                            className="center"
                            style={{ textAlign: "left" }}
                          >
                            <input
                              type="checkbox"
                              value="all-list-check"
                              checked={props.empAllListCheck === true}
                              onChange={props.allListCheckBoxChange}
                            />
                          </th>
                          {props.addEmpListDataHeader.map((value, key) => {
                            if (
                              value === "Employee ID" ||
                              value === "Employee Code" ||
                              value === "Employee Name" ||
                              value === "Amount" ||
                              value === "Transfer Amount"
                            ) {
                              return (
                                <th
                                  style={{
                                    textAlign: "left",
                                    minWidth: "9.375rem",
                                    wordBreak: "break-word",
                                  }}
                                  key={key}
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
                                    {t(value)}
                                  </div>
                                </th>
                              );
                            } else {
                              return (
                                <th
                                  style={{
                                    textAlign: "left",
                                    minWidth: "12.5rem",
                                    wordBreak: "break-word",
                                  }}
                                  key={key}
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
                                    {t(value)}
                                  </div>
                                </th>
                              );
                            }
                          })}
                          <th
                            className="center"
                            style={{
                              textAlign: "left",
                              minWidth: "5.625rem",
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
                      <tbody className="" id="tbody_id">
                        {props.data.map((i, index) => {
                          subAmount = i.amount_data.length;
                          total_current_amount = 0;
                          return (
                            <tr width="100%" key={`sub_${i.employee_id}_${index}`} className="">
                              <td
                                width="20px"
                                className="break-word"
                                style={{ borderLeft: "3px solid #858BC3" }}
                              >
                                <input
                                  type="checkbox"
                                  checked={i.is_check === true}
                                  onChange={props.subListCheckboxChange}
                                  value={i.employee_id}
                                />
                              </td>
                              <td
                                className="td-num left"
                                width="100px"
                                style={{ background: "#d6f8b3" }}
                              >
                                {i.employee_id}
                              </td>
                              <td className="td-num left" width="100px">
                                {i.employee_code}
                              </td>
                              <td className="td-num left">{i.employee_name}</td>
                              <td
                                className="td-num left"
                                width="100px"
                                style={{ background: "#d6f7df" }}
                              >
                                {i.total_amount}
                              </td>
                              <td
                                className="td-num left"
                                width="100px"
                                style={{
                                  background: "#d6f7df",
                                  maxWidth: "100px",
                                }}
                              >
                                {i.latest_salary_calculate_month}
                              </td>
                              {i.amount_data.map((x, index) => {
                                if (isEmpty(x)) {
                                  return (
                                    <td key={`sub_${i.employee_id}_${index}`}>
                                      -
                                      <CInput
                                        id={`sub_${i.employee_id}_${index}`}
                                        type="text"
                                        className="td-input-width-auto form-control-sm"
                                        defaultValue={0}
                                        style={{ display: "none" }}
                                      />
                                    </td>
                                  );
                                } else {
                                  total_current_amount += parseInt(x.amount);
                                  return (
                                    <td
                                      key={`sub_${i.employee_id}_${index}`}
                                      className=""
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <CInput
                                          type="text"
                                          id={`sub_${i.employee_id}_${index}`}
                                          className="td-input-width-auto form-control-sm"
                                          defaultValue={x.amount}
                                          data-amt={x.amount}
                                          onChange={(e) => {
                                            checkAmount(e, i);
                                          }}
                                        />
                                        {!isEmpty(x.percent) && (
                                          <CLabel
                                            className="amount-percent"
                                            style={{ marginLeft: "1rem" }}
                                          >
                                            {x.percent}
                                          </CLabel>
                                        )}
                                      </div>
                                    </td>
                                  );
                                }
                              })}
                              <td className="td-num left" width="100px">
                                {i.transfered_amount}
                              </td>
                              <td className="td-num center" width="50px">
                                <CTooltip content={t("Delete")}>
                                  <CImg
                                    id={i.id}
                                    src={"/avatars/remove.png"}
                                    className="icon-clt "
                                    alt="delete"
                                    onClick={props.deleteBtn.bind(
                                      this,
                                      i.employee_id
                                    )}
                                  />
                                </CTooltip>
                                <CInput
                                  type="text"
                                  style={{ display: "none" }}
                                  className="td-input-width-auto form-control-sm"
                                  id={`total_${i.employee_id}`}
                                  defaultValue={i.amount_transfer}
                                />
                                <CInput
                                  type="text"
                                  style={{ display: "none" }}
                                  className="td-input-width-auto form-control-sm"
                                  id={`total_cur_amt_${i.employee_id}`}
                                  defaultValue={total_current_amount}
                                />
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
          <CRow alignHorizontal="center" className="mt-3 ml-1">
            <CButton className="confirm-btn" onClick={props.bonusBankTransfer}>
              {t("Bonus Pay to Bank")}
            </CButton>
          </CRow>
        </>
      )}
    </>
  );
};
export default EmployeeListTable;
