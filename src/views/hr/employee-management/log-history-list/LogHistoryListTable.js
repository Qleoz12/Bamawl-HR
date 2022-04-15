/* eslint-disable eqeqeq */
import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const LogHistoryListTable = props => {
  const { t } = useTranslation();
  let {
    mainTable,
    totalRow,
    currentPage,
    totalPage,
    defaultPerPage,
    pageChange
  } = props
  useEffect(() => {
  });
  return (
    <>
      {
        mainTable != "" &&
        <div className="">
          <CCard className='table-panel loghistory-list'>
            <CRow id="table" className="">
              <CCol lg="12">
                <CCol lg="12">
                  <CRow alignHorizontal="end">
                    <div id="lbTotalRows" className="row-count-msg">{t('Total Rows').replace("%s", totalRow)}</div>
                  </CRow>
                </CCol>
                <div className="table-responsive">
                  <table className="table purchase-order-list" aria-label="simple table">
                    <thead id="thead-id">
                      {
                        <tr width="100%">
                          <th id="tblNo" className="td-no" >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('No')}
                            </div>
                          </th>
                          <th id="tblEmplyeeID" className="td-emp-id" >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Employee ID')}
                            </div>
                          </th>
                          <th id="tblEmployeeName" className="td-emp-name"  >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Employee Name')}
                            </div>
                          </th>
                          <th id="tblDate" className="td-date"  >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Date')}
                            </div>
                          </th>
                          <th id="tblAction" className="td-action" >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Action')}
                            </div>
                          </th>
                          <th id="tblStatus" className="td-status" >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Status')}
                            </div>
                          </th>
                          <th id="tblPlatform" className="td-platform" >
                            <div >
                              <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                              {t('Platform')}
                            </div>
                          </th>
                        </tr>
                      }
                    </thead>
                    <tbody >
                      {
                        mainTable.map((i, index) => {
                          return (
                            <tr key={index}>
                              <td className="td-no" style={{ textAlign: "right" }} >
                                {((currentPage - 1) * defaultPerPage) + index + 1}
                              </td>
                              <td className="td-emp-id" style={{ textAlign: "right" }}>
                                {i.employee_id}
                              </td>
                              <td className="td-green td-emp-name" style={{ textAlign: "left" }}>
                                {i.employee_name}
                              </td>
                              <td className="td-pink td-date" style={{ textAlign: "center" }}>
                                {i.created_at}
                              </td>
                              <td className="td-action" style={{ textAlign: "left" }}>
                                {i.description}
                              </td>
                              <td className="td-status" style={{ textAlign: "left" }}>
                                {i.op_flag}
                              </td>
                              <td className="td-platform" style={{ textAlign: "left" }}>
                                {i.device_flag}
                              </td>
                            </tr>
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
        </div>
      }
    </>
  )
}

export default LogHistoryListTable
