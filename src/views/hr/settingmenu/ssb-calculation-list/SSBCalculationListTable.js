/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCard, CCol, CRow, CImg, CButton, CPagination } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Fragment } from 'react';

const SSBCalculationListTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  let {
    AllCheck,
    mainTable,
    change_checkbox,
    totalPage,
    pageChange,
    rowCount,
    currentPage,
    editToggleAlert,
    perPage,
    deleteToggleAlert
  } = props

  return (<>

    {
      mainTable != "" &&
      <CCard className='table-panel'>
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div id="lbTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", rowCount)}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  {
                    <tr width="100%">
                      <th width="" className="" style={{ textAlign: 'center', verticalAlign: "middle" }}>
                        <input name="chkboxCheckAll" type="checkbox"
                          id="chkboxCheckAll"
                          value="all-check"
                          checked={AllCheck === true}
                          onChange={change_checkbox}
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
                      <th id="tblMethods" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Methods')}
                        </div>
                      </th>
                      <th id="btnEdit" className="text-nowrap text-left align-middle" >
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
                    mainTable.map((i, index) => {
                      return (<Fragment key={index}>
                        <>
                          {
                            i.department.map((sec, idx) => {
                              return (<Fragment key={idx}>
                                <tr width="100%">
                                  {idx == 0 &&
                                    <>
                                      <td className={mainTable.length - 1 === index
                                        ? "td-num td-no text-center border-bottom-left-radius" : "td-num td-no text-center"}
                                        rowSpan={i.department.length}
                                      >
                                        <input type="checkbox"
                                          value={i.id}
                                          id={i.id}
                                          checked={i.is_checked === true}
                                          onChange={change_checkbox}
                                          style={{ cursor: "pointer" }}
                                        />
                                      </td>
                                      <td className="td-num" style={{ textAlign: "right" }} rowSpan={i.department.length} >
                                        {((currentPage - 1) * perPage) + index + 1}
                                      </td>
                                      <td width="" className="td-emp-id" style={{ textAlign: "right" }} rowSpan={i.department.length}>
                                        {i.employee_id}
                                      </td>
                                      <td width="" className="td-emp-code" style={{ textAlign: "left" }} rowSpan={i.department.length}>
                                        {i.employee_code}
                                      </td>
                                      <td width="" className="td-emp-name" style={{ textAlign: "left", maxWidth: "300px" }} rowSpan={i.department.length}>
                                        {i.employee_name}
                                      </td>
                                    </>
                                  }
                                  <td id="tblDepartment" width="" className="td-dept td-pink text-left no-border-radius">
                                    {sec.department_name}
                                  </td>
                                  {idx == 0 && <>
                                    <td width="" className="td-joined-date" rowSpan={i.department.length}>
                                      {i.joined_date}
                                    </td>
                                    <td width="" className="td-overtime-title" rowSpan={i.department.length} style={{ textAlign: "left" }}>
                                      {i.method}
                                    </td>
                                    <td className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"}
                                     rowSpan={i.department.length}>
                                      <input
                                        type="image"
                                        id="tblEdit"
                                        src={'avatars/edit.png'}
                                        className="icon-clt"
                                        alt="edit"
                                        onClick={editToggleAlert.bind(this, i)}
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
                    })}
                </tbody>
              </table>
              {
                mainTable != "" && totalPage > 1 &&
                <CPagination
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton="First page"
                  lastButton="Last page"
                  activePage={currentPage}
                  pages={totalPage}
                  onActivePageChange={(i) => pageChange(i)}
                />
              }
            </div>
          </CCol>
        </CRow><br />
        <CRow lg="12">
          <CCol style={{ textAlign: "center" }}>
            {
              mainTable != "" &&
              <CButton className="form-btn mb-3" id='btnDelete' name='btnDelete' onClick={deleteToggleAlert}>
                {t('Delete')}
              </CButton>
            }
          </CCol>
        </CRow>
      </CCard>
    }
  </>
  );
}
export default SSBCalculationListTable;
