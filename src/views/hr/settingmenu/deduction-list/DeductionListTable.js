import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React from 'react'
import { useTranslation } from 'react-i18next'

const DeductionListTable = props => {
  const { t } = useTranslation();
  let {
    mainTable,
    rowCount,
    AllCheck,
    change_checkbox,
    editToggleAlert,
    currentPage,
    totalPage,
    perPage,
    pageChange,
  } = props;

  return (
    <>
      {
        mainTable != "" && rowCount > 0 &&
        <CCard className='table-panel' >
          <CRow id="table">
            <CCol lg="12">
              <CCol lg="12">
                <CRow alignHorizontal="end">
                  <div className="row-count-msg">{t('Total Rows').replace("%s", rowCount)}</div>
                </CRow>
              </CCol>
              <div className="table-responsive">
                <table className="table purchase-order-list" aria-label="simple table">
                  <thead id="thead-id">
                    {
                      mainTable !== "" &&
                      <tr width="100%">
                        <th className="text-nowrap text-left align-middle" style={{ textAlign: 'center' }}>
                          <input type="checkbox"
                            value="all-check"
                            checked={AllCheck === true}
                            onChange={change_checkbox} />
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('No')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Name')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Category')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Type')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-center align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Count')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Period')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Deduction Based On')}
                          </div>
                        </th>
                        <th width="" className="text-nowrap text-left align-middle">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Edit')}
                          </div>
                        </th>
                      </tr>
                    }
                  </thead>
                  <tbody >
                    {
                      mainTable !== "" &&
                      mainTable?.map((i, index) => {
                        return (
                          <tr key={index}>
                            <td className="td-num" style={{ borderLeft: '3px solid #858BC3', textAlign: "center" }}>
                              <input type="checkbox"
                                style={{ marginLeft: "-3px" }}
                                value={i.id}
                                id={i.id}
                                checked={i.is_checked === true}
                                onChange={change_checkbox}
                              />
                            </td>
                            <td className="td-num" style={{ textAlign: "right" }} >
                              {((currentPage - 1) * perPage) + index + 1}
                            </td>
                            <td width="" className="td-green" style={{ textAlign: "left", maxWidth: "300px" }}>
                              {i.deduction_name}
                            </td>
                            <td width="" className="td-pink" style={{ textAlign: "left" }}>
                              {i.description}
                            </td>
                            <td width="" style={{ textAlign: "left" }}>
                              {i.deduction_type}
                            </td>
                            <td width="" style={{ textAlign: "right" }}>
                              {i.deduction_count}
                            </td>
                            <td width="" style={{ textAlign: "left" }}>
                              {i.deduction_period}
                            </td>
                            <td width="" className="td-orange" style={{ textAlign: "left" }} >
                              {i.based_on_method_name}
                            </td>
                            <td width="" className={mainTable.length - 1 === index ? "border-bottom-right-radius" : "td-role-name"}>
                              <input
                                type="image"
                                id={i.id}
                                src={'avatars/edit.png'}
                                className="icon-clt"
                                alt="edit"
                                onClick={editToggleAlert.bind(this, i)}
                              />
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
      }
    </>
  )
}

export default DeductionListTable
