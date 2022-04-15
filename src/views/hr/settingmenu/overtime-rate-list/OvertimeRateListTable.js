import { CCard, CCol, CImg, CPagination, CRow } from '@coreui/react';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const OvertimeRateListTable = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {
      props.mainTable != "" &&
      <CCard className='table-panel ratelist'>
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
                    props.mainTable !== "" &&
                    <tr width="100%">
                      <th id="tblNo" className="text-nowrap text-left align-middle" >
                        <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                        {t('No')}
                      </th>
                      <th id="tblOvertimeTitle" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Overtime Title')}
                        </div>
                      </th>
                      <th id="tblShiftName" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('Shift Name')}
                        </div>
                      </th>
                      <th id="tblOTType" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                          {t('OT Type')}
                        </div>
                      </th>
                      <th id="tblEdit" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" style={{ cursor: "pointer" }} />
                          {t('Edit')}
                        </div>
                      </th>
                      <th id="tblRemove" className="text-nowrap text-left align-middle" >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" style={{ cursor: "pointer" }} />
                          {t('Remove')}
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
                        <tr key={index}>
                          <td className="td-num" style={{ textAlign: "right" }} >
                            {((props.currentPage - 1) * props.defaultPerPage) + index + 1}
                          </td>
                          <td width="" className="" style={{ textAlign: "left", maxWidth: "300px" }}>
                            {i.overtime_name}
                          </td>
                          <td width="" className="td-green" style={{ textAlign: "left", maxWidth: "300px" }}>
                            {i.sn_name}
                          </td>
                          <td width="" className="td-pink" style={{ textAlign: "left" }}>
                            {i.setting_type}
                          </td>
                          <td width="" className="">
                            <input
                              type="image"
                              id={i.id}
                              name="tblEdit"
                              src={'avatars/edit.png'}
                              className="icon-clt"
                              alt="edit"
                              style={{ cursor: "pointer" }}
                              onClick={props.editToggleAlert.bind(this, i)}
                            />
                          </td>
                          <td width="" className="">
                            <input
                              type="image"
                              id={i.id}
                              name="tblRemove"
                              src={'avatars/remove.png'}
                              className="icon-clt"
                              alt="remove"
                              style={{ cursor: "pointer" }}
                              onClick={props.deleteToggleAlert.bind(this, i)}
                            />
                          </td>
                        </tr>
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
                  onActivePageChange={(i) => props.pageChange(i)}
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

export default OvertimeRateListTable;