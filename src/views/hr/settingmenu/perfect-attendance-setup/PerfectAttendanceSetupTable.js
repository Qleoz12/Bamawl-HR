import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';


const PerfectAttendanceSetupTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {/* Employee List Table Start */}
    { props.mainTable && props.mainTable != "" &&
      <CCard className="table-panel" style = {{ border : "1px solid #d8dbe0" }}>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div className="row-count-msg" hidden={props.editData && props.editData != ""}>{t("Total Rows").replace('%s', (props.rowCount != 0 ? props.rowCount : 0))}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table">
                <thead id="thead-id">
                  <tr width="100%">
                    <th id="tblNo" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("No")}
                    </th>
                    <th id="tblEmplyeeID" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("Employee ID")}
                    </th>
                    <th id="tblEmplyeeCode" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("Employee Code")}
                    </th>
                    <th id="tblEmplyeeName" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("Employee Name")}
                    </th>
                    <th id="tblDepartment" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("Department Name")}
                    </th>
                    <th id="tblJoinDate" width="" className="responsive-tableTh">
                      <CImg
                        src={'avatars/titleicon.png'}
                        className="column-table"
                        alt="titleicon"
                      />
                      {t("Join Date")}
                    </th>
                    {props.editData && props.editData == "" &&
                      <th id="tblRemove" width="" className="responsive-tableTh">
                        <CImg
                          src={'avatars/titleicon.png'}
                          className="column-table"
                          alt="titleicon"
                        />
                        {t("Remove")}
                      </th>
                    }
                  </tr>
                </thead>
                <tbody>
                  {
                    props.mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        {i.departments.map((sec, idx) => {
                          return (
                            <tr key={idx} width="100%">
                              {idx == 0 &&
                                <>
                                  <td
                                    width=""
                                    className={props.mainTable.length - 1 === index ? "td-no t-align-right" : "td-no t-align-right"}
                                    rowSpan={i.departments.length}
                                  >
                                    {index + 1}
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-id t-align-right"
                                    rowSpan={i.departments.length}
                                  >
                                    {i.employee_id}
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-code t-align-left"
                                    rowSpan={i.departments.length}
                                  >
                                    {i.employee_code}
                                  </td>
                                  <td
                                    width=""
                                    className="td-emp-name td-green t-align-left"
                                    rowSpan={i.departments.length}
                                  >
                                    {i.employee_name}
                                  </td>
                                </>
                              }
                              <td
                                width=""
                                className="td-dept td-pink t-align-left no-border-radius"

                              >
                                {sec.department_name}
                              </td>
                              {idx == 0 &&
                                <>
                                  <td
                                    width=""
                                    className={!isEmpty(props.editData) ? "td-joined-date border-bottom-right-radius" : "td-joined-date no-border-radius"}
                                    rowSpan={i.departments.length}
                                  >
                                    {i.joined_date.substring(0, 10)}
                                  </td>
                                  {props.editData && props.editData == "" &&
                                    <td
                                      width=""
                                      id="removeData"
                                      className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : ""}
                                      rowSpan={i.departments.length}
                                    >
                                      <CImg
                                        src={"avatars/remove.png"}
                                        className="icon-clt"
                                        alt="remove"
                                        onClick={props.removeRow.bind(this, i)}
                                      />
                                    </td>
                                  }
                                </>}
                            </tr>
                          )
                        })}
                      </Fragment>);
                    })}
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
      </CCard>
    }
    <br />
    {/* Employee List Table End */}
  </>
  );
}

export default PerfectAttendanceSetupTable;