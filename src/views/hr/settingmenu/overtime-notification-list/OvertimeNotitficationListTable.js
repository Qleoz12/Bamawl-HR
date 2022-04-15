/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCard, CCol, CRow, CImg, CPagination } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Fragment } from 'react';

const OvertimeNotitficationListTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      props.mainTable != "" &&
      <CCard className='table-panel'>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div id="lbTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", props.rowCount)}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  {
                    <tr width="100%">
                      <th width="" className="" style={{ textAlign: 'center', verticalAlign: "middle" }}>
                        <input type="checkbox"
                          id="chkboxCheckAll"
                          name="chkboxCheckAll"
                          value="all-check"
                          checked={props.AllCheck === true}
                          onChange={props.change_checkbox}
                          style={{ cursor: "pointer" }} />
                      </th>
                      <th id="tblNo" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('No')}
                        </div>
                      </th>
                      <th id="tblEmplyeeID" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Employee ID')}
                        </div>
                      </th>
                      <th id="tblEmployeeCode" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Employee Code')}
                        </div>
                      </th>
                      <th id="tblEmployeeName" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Employee Name')}
                        </div>
                      </th>
                      <th id="tblDepartment" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Department Name')}
                        </div>
                      </th>
                      <th id="tblJoinDate" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Joined Date')}
                        </div>
                      </th>
                      <th id="tblWeeklyTimeLimit" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Weekly Time Limit')}
                        </div>
                      </th>
                      <th id="tblMonthlyTimeLimit" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Monthly Time Limit')}
                        </div>
                      </th>
                      <th id="tblOvertimeLimit" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Overtime Limit')}
                        </div>
                      </th>
                      <th id="tblEdit" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Edit')}
                        </div>
                      </th>
                    </tr>
                  }
                </thead>
                <tbody >
                  {
                    props.mainTable !== "" &&
                    props.mainTable.map((i, index) => {
                      return (
                        <Fragment key={index}>
                          <>
                            {
                              i.departments.map((sec, idx) => {
                                return (
                                  <Fragment key={idx}>
                                    <tr width="100%">
                                      {idx == 0 &&
                                        <>
                                          <td className={props.mainTable.length - 1 === index
                                            ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"} style={{ borderLeft: '3px solid #858BC3', textAlign: "center" }} rowSpan={i.departments.length}>
                                            <input type="checkbox"
                                              value={i.id}
                                              id={i.id}
                                              checked={i.is_checked === true}
                                              onChange={props.change_checkbox}
                                              style={{ cursor: "pointer" }}
                                            />
                                          </td>
                                          <td className="td-num" style={{ textAlign: "right" }} rowSpan={i.departments.length} >
                                            {((props.currentPage - 1) * props.perPage) + index + 1}
                                          </td>
                                          <td width="" className="td-emp-id" style={{ textAlign: "right" }} rowSpan={i.departments.length}>
                                            {i.employee_id}
                                          </td>
                                          <td width="" className="td-emp-code" style={{ textAlign: "left" }} rowSpan={i.departments.length}>
                                            {i.employee_code}
                                          </td>
                                          <td width="" className="td-emp-name" style={{ textAlign: "left", maxWidth: "200px" }} rowSpan={i.departments.length}>
                                            {i.employee_name}
                                          </td>
                                        </>
                                      }
                                      <td width="" className="td-dept td-pink no-border-radius" style={{ textAlign: "left" }}>
                                        {sec.department_name}
                                      </td>
                                      {idx == 0 && <>
                                        <td width="" className="td-joined-date" rowSpan={i.departments.length}>
                                          {i.joined_date.substring(0, 10)}
                                        </td>
                                        <td width="" className="td-overtime-title" rowSpan={i.departments.length}>
                                          {i.weekly_time_limit}
                                        </td>
                                        <td width="" className="" rowSpan={i.departments.length} >
                                          {i.monthly_time_limit}
                                        </td>
                                        <td width="" className="" rowSpan={i.departments.length}>
                                          {i.overtime_limit}
                                        </td>
                                        <td width="" className={props.mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} rowSpan={i.departments.length}>
                                          <input
                                            type="image"
                                            id="tblEdit"
                                            name="tblEdit"
                                            src={'avatars/edit.png'}
                                            className="icon-clt"
                                            alt="edit"
                                            onClick={props.editToggleAlert.bind(this, i)}
                                          />
                                        </td>
                                      </>
                                      }
                                    </tr>
                                  </Fragment>
                                )
                              })
                            }
                          </>
                        </Fragment>
                      )
                    })
                  }
                </tbody>
              </table>
              {
                props.mainTable != "" && props.totalPage > 1 &&
                <CPagination
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton="First page"
                  lastButton="Last page"
                  activePage={props.currentPage}
                  pages={props.totalPage}
                  onActivePageChange={(i) => props.changePage(i)}
                />
              }
            </div>
          </CCol>
        </CRow><br />
      </CCard>
    }
  </>
  );
}
export default OvertimeNotitficationListTable;
