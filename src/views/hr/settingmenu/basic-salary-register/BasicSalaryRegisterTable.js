/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const BasicSalaryRegisterTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {/* Employee List Table Start */}
    {!isEmpty(props.mainTable) && (
      <CCard className="table-panel" style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div className="row-count-msg" hidden={props.editData != ""}>{t('Total Rows').replace('%s', props.rowCount)}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table">
                <thead id="thead-id">
                  <tr width="100%">
                    <th id="tblNo" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("No")}
                    </th>
                    <th id="tblEmplyeeID" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("Employee ID")}
                    </th>
                    <th id="tblEmplyeeCode" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("Employee Code")}
                    </th>
                    <th id="tblEmplyeeName" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("Employee Name")}
                    </th>
                    <th id="tblDepartment" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("Department Name")}
                    </th>
                    <th id="tblHoinDate" width="" className="basicSalaryList tableTh">
                      <CImg
                        src={"avatars/titleicon.png"}
                        className="basicSalaryList imgList"
                        alt="titleicon"
                      />
                      {t("Join Date")}
                    </th>

                    {props.editData == "" && (
                      <>
                        <th id="tblRemove" width="" id="removeData" className="basicSalaryList tableTh">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="basicSalaryList imgList"
                            alt="titleicon"
                          />

                          {t("Remove")}
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {props.mainTable !== "" &&
                    props.mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        {i.departments.map((sec, idx) => {
                          return (<Fragment key={idx}>
                            <tr width="100%">
                              {idx === 0 && <>
                                <td
                                  width=""
                                  className={props.mainTable.length-1 === index ? "td-no textAlignRight border-bottom-left-radius" : "td-no textAlignRight"} rowSpan={i.departments.length}>
                                  {index + 1}
                                </td>
                                <td
                                  width=""
                                  className="td-emp-id textAlignRight" rowSpan={i.departments.length}>
                                  {i.employee_id}
                                </td>
                                <td
                                  width=""
                                  className="td-emp-code textAlignLeft" rowSpan={i.departments.length}>
                                  {i.employee_code}
                                </td>
                                <td
                                  width=""
                                  className="td-emp-name td-green textAlignLeft" rowSpan={i.departments.length}>
                                  {i.employee_name}
                                </td>
                              </>}
                              <td
                                width=""
                                className="td-dept td-pink textAlignLeft no-border-radius">
                                {sec.department_name}
                              </td>
                              {idx === 0 && <>
                                <td
                                  width=""
                                  className="td-joined-date" rowSpan={i.departments.length}
                                >
                                  {i.joined_date.substring(0, 10)}
                                </td>
                                {props.editData == "" && (
                                  <td
                                    width=""
                                    id="removeData"
                                    className={props.mainTable.length-1 === index ? "border-bottom-right-radius" : ""}
                                    rowSpan={i.departments.length}
                                  >
                                    <input
                                      type="image"
                                      id="tblEdit"
                                      src={"avatars/remove.png"}
                                      className="icon-clt"
                                      alt="remove"
                                      onClick={props.removeRow.bind(this, i)}
                                    />
                                  </td>
                                )}
                              </>
                              }
                            </tr>
                          </Fragment>)
                        })}
                      </Fragment>)
                    })}
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
      </CCard>
    )}
    <br />

    {/* Employee List Table End */}
  </>
  );
}
export default BasicSalaryRegisterTable;
