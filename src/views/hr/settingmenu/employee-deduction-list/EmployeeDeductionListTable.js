/* eslint-disable no-use-before-define */
import React, { Fragment, useEffect } from 'react';
import { CCol, CRow, CPagination, CImg, CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const EmployeeDeductionListTable = props => {
  const { t } = useTranslation();
  let {
    deductionOptionState,
    mainTable, rowCount,
    AllCheck, change_checkbox,
    editToggleAlert,
    currentPage, totalPage, perPage, pageChange,
  } = props;
  useEffect(() => {
  });

  const getDeductionType = (value) => {
    switch (value) {
      case 1:
        return "Percentage";
      default:
        return "Amount";
    }
  }

  return (<>
    {
      mainTable != "" &&
      <CCard className='table-panel' >
        <CRow id="table">
          <CCol lg="12">
            <CCol lg="12">
              <CRow alignHorizontal="end">
                <div id="lbTotalRow" className="row-count-msg">{t('Total Rows').replace("%s", rowCount)}</div>
              </CRow>
            </CCol>
            <div className="table-responsive">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  {
                    <tr width="100%">
                      <th width="" className="" style={{ textAlign: 'center' }}>
                        <input type="checkbox"
                          value="all-check"
                          checked={AllCheck === true}
                          onChange={change_checkbox} />
                      </th>
                      <th className="text-nowrap text-left align-middle">
                        <div>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('No')}
                        </div>
                      </th>
                      {
                        deductionOptionState == 2 &&
                        <>
                          <th className="text-nowrap text-left align-middle">
                            <div>
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Employee ID')}
                            </div>
                          </th>
                          <th className="text-nowrap text-left align-middle">
                            <div>
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Employee Code')}
                            </div>
                          </th>
                          <th className="text-nowrap text-left align-middle">
                            <div>
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Employee Name')}
                            </div>
                          </th>
                          <th className="text-nowrap text-left align-middle">
                            <div>
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Department')}
                            </div>
                          </th>
                          <th className="text-nowrap text-left align-middle">
                            <div>
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Joined Date')}
                            </div>
                          </th>
                        </>
                      }
                      <th className="text-nowrap text-left align-middle">
                        <div>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Deduction Name')}
                        </div>
                      </th>
                      <th className="text-nowrap text-left align-middle">
                        <div>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Deduction Category')}
                        </div>
                      </th>
                      <th className="text-nowrap text-left align-middle">
                        <div>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Deduction Type')}
                        </div>
                      </th>
                      <th className="text-nowrap text-left align-middle">
                        <div>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Deduction Based On')}
                        </div>
                      </th>
                      <th className="text-nowrap text-left align-middle">
                        <div >
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Edit')}
                        </div>
                      </th>
                    </tr>
                  }
                </thead>
                <tbody >
                  {
                    mainTable !== "" && deductionOptionState == 1 &&
                    mainTable.map((i, index) => {
                      return (
                        <Fragment key={index}>
                          <>{
                            <tr width="100%">
                              {
                                <>
                                  <td className={mainTable.length - 1 === index
                                    ? "td-num td-no text-right border-bottom-left-radius" : "td-num td-no text-right"}
                                    style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    <input type="checkbox"
                                      value={i.id}
                                      id={i.id}
                                      checked={i.is_checked === true}
                                      onChange={change_checkbox}
                                    />
                                  </td>
                                  <td className="td-num" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    {((currentPage - 1) * perPage) + index + 1}
                                  </td>
                                  <td width="" className="td-green" style={{ textAlign: "left" }}>
                                    {i.deduction_name}
                                  </td>
                                  <td width="" className="td-pink" style={{ textAlign: "left" }}>
                                    {i.deduction_category}
                                  </td>
                                  <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    {i.deduction_type == 1 ? "Percentage" : "Amount"}
                                  </td>
                                  <td width="" className="td-orange" style={{ textAlign: "left" }}>
                                    {i.deduction_based_on}
                                  </td>
                                  <td width="" className="" style={{ textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                    <CImg
                                      id={i.id}
                                      src={'avatars/edit.png'}
                                      className="icon-clt"
                                      alt="edit"
                                      onClick={editToggleAlert.bind(this, i)}
                                    />
                                  </td>
                                </>
                              }
                            </tr>
                          }</>
                        </Fragment>
                      )
                    })
                  }
                  {
                    mainTable !== "" && deductionOptionState == 2 &&
                    mainTable.map((i, index) => {
                      return (
                        <Fragment key={index}>
                          <>{
                            i.employees.map((sec, idx) => {
                              return (
                                <Fragment key={idx}>
                                  <tr width="100%">
                                    {idx == 0 &&
                                      <>
                                        <td className={mainTable.length - 1 === index
                                          ? "td-num td-no text-right border-bottom-left-radius" : "td-num td-no text-right"}
                                          style={{ borderLeft: '3px solid #858BC3', textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employees.length}>
                                          <input type="checkbox"
                                            value={i.id}
                                            id={i.id}
                                            checked={i.is_checked === true}
                                            onChange={change_checkbox}
                                          />
                                        </td>
                                        <td className="td-num" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employees.length}>
                                          {((currentPage - 1) * perPage) + index + 1}
                                        </td>
                                      </>
                                    }
                                    {
                                      <>
                                        <td width="" className="td-emp-id no-border-radius" style={{ textAlign: "right", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                          {sec.employee_id}
                                        </td>
                                        <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                          {sec.employee_code}
                                        </td>
                                        <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                          {sec.employee_name}
                                        </td>
                                      </>
                                    }
                                    <td className="" style={{ textAlign: "left", padding: "0px", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                      <table>
                                        <tbody>
                                          {
                                            sec.department.map((dep, temp) => {
                                              return (<Fragment key={temp}>
                                                <tr>
                                                  <td className="td-pink" style={{ textAlign: "left", border: "none", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                    {dep.department_name}
                                                  </td>
                                                </tr>
                                              </Fragment>)
                                            })
                                          }
                                        </tbody>
                                      </table>
                                    </td>
                                    <td width="" className="td-pink no-border-radius" >
                                      {sec.joined_date}
                                    </td>
                                    {idx == 0 &&
                                      <>
                                        <td width="" className="td-green" style={{ textAlign: "left" }} rowSpan={i.employees.length}>
                                          {i.deduction_name}
                                        </td>
                                        <td width="" className="td-pink" style={{ textAlign: "left" }} rowSpan={i.employees.length}>
                                          {i.deduction_category}
                                        </td>
                                        <td width="" className="" style={{ textAlign: "left", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employees.length} >
                                          {i.deduction_type == 1 ? "Percentage" : "Amount"}
                                        </td>
                                        <td width="" className="td-orange" style={{ textAlign: "left" }} rowSpan={i.employees.length}>
                                          {i.deduction_based_on}
                                        </td>
                                        {
                                          <td width="" className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"} style={{ textAlign: "center", backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} rowSpan={i.employees.length}>
                                            <input
                                              type="image"
                                              id="lblRemove"
                                              src={'avatars/edit.png'}
                                              className="icon-clt"
                                              alt="edit"
                                              onClick={editToggleAlert.bind(this, { "employeeArr": i.employees, "id": i.id })}
                                            />
                                          </td>
                                        }
                                      </>
                                    }
                                  </tr>
                                </Fragment>
                              )
                            })
                          }</>
                        </Fragment>
                      )
                    })
                  }
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
      </CCard>
    }
  </>
  );
}
export default EmployeeDeductionListTable;