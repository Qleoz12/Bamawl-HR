/* eslint-disable eqeqeq */
import { CCard, CCol, CImg, CLabel, CLink, CRow } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';

const BusinessTripAdjustmentDetailTable = props => {
  const { t } = useTranslation();

  let {
    allCurrency,
    data,
    nameTable,
    flagHistory,
    downloadFile,
  } = props;

  return (
    <div className="" >
      {
        !isEmpty(data.info) &&
        <>
          <CRow lg="12">
            <CCol className="deduction">
              <CImg src={'avatars/list.png'} alt="titleicon" className="avatar-list" />
              <CLabel style={{ fontWeight: "bold" }} id="lbDeductionBasedOn" className="title-lbl" >{t(nameTable)}</CLabel>
            </CCol>
          </CRow>
          <CCard className='table-panel loghistory-list'>
            <CRow id="table" className="">
              <CCol lg="12">
                <div className="table-responsive">
                  <table className="table purchase-order-list" aria-label="simple table">
                    <thead id="thead-id">
                      <tr width="100%">
                        {
                          nameTable == "Accommodation" ?
                            <th id="tblEmplyeeID" className="no-border-radius" colSpan={2} style={{ borderBottom: "2px solid #fff" }}>
                              <div>
                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                {t('Date')}
                              </div>
                            </th> :
                            <th id="tblEmplyeeID" className="td-date no-border-radius" rowSpan={2} >
                              <div>
                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                {t('Date')}
                              </div>
                            </th>
                        }
                        <th id="tblEmployeeName" className="td-title" rowSpan={2} >
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Title')}
                          </div>
                        </th>
                        <th id="tblDate" className="td-file" rowSpan={2} >
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Attachement')}
                          </div>
                        </th>
                        <th id="tblAction" className="td-title" rowSpan={2} >
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Description')}
                          </div>
                        </th>
                        <th id="tblStatus" className="td textcenter" colSpan={6} style={{ borderBottom: "2px solid #fff" }} >
                          <div style={{display:"block"}}>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Budget Cost')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td no-border-radius textcenter" colSpan={7} style={{ borderBottom: "2px solid #fff" }} >
                          <div style={{display:"block"}}>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Actual Cost')}
                          </div>
                        </th>
                      </tr>
                      <tr width="100%">
                        {
                          nameTable == "Accommodation" &&
                          <>
                            <th className="text-nowrap no-border-radius">
                              <div>
                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                {t('Check-In')}
                              </div>
                            </th>
                            <th className="text-nowrap">
                              <div>
                                <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                                {t('Check-Out')}
                              </div>
                            </th>
                          </>
                        }
                        <th id="tblPlatform" className="td-cost text-nowrap no-border-radius">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Unit Price xQty')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Total')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Price Currency')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('FX Rate')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Accept Currency')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Amount')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Unit Price xQty')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Total')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Price Currency')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('FX Rate')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Accept Currency')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Amount')}
                          </div>
                        </th>
                        <th id="tblPlatform" className="td-cost text-nowrap no-border-radius">
                          <div>
                            <CImg src={'avatars/titleicon.png'} className="title-icon" alt="from date" />
                            {t('Reason')}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        data.info?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td className="td-date textcenter" >
                                {
                                  ele.from_date
                                }
                              </td>
                              {
                                nameTable == "Accommodation" &&
                                <td className="td-date textcenter" >
                                  {
                                    ele.to_date
                                  }
                                </td>
                              }
                              <td className="td-title textleft" >
                                {`${ele.title} ${ele.arrange_by_admin === 1 ? "[" + t('Arrange By Admin') + "]" : ""}`}
                                {/* {`${ele.title} ${ele.arrange_by_admin === 1 ? "[" + t('Arrange By Admin') + "]" : ""}`} */}
                              </td>
                              <td className="td-file textleft col-color-blue">
                                <table>
                                  <tbody>
                                    {ele.attach_file?.map((i, idx) => {
                                      return (
                                        <tr key={idx}>
                                          <td className="textleft col-color-blue" style={{ border: "none" }}>
                                            <label style={{ cursor: flagHistory ? "pointer" : "not-allowed" }} onClick={(e) => flagHistory && downloadFile(e, i, true, i.file_name.slice(i.file_name.lastIndexOf("/") + 1))}>
                                              <i className="fas fa-file-alt icon-btn pr-1"></i>
                                              <CLink> {i.file_name.slice(i.file_name.lastIndexOf("/") + 1)}</CLink>
                                            </label>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
                              </td>
                              <td className="td-title textleft td-green">
                                {ele.actual_cost?.description}
                              </td>
                              <td className={ele.budget_cost?.unit_price === "-" ? "td-cost textcenter col-color-pink" : "td-cost textleft col-color-pink"}>
                                {ele.budget_cost?.unit_price === "-" ? "-" : ele.budget_cost?.unit_price && ele.budget_cost?.day_times && `${ele.budget_cost?.unit_price}x${ele.budget_cost?.day_times}`}
                              </td>
                              <td className={ele.budget_cost?.unit_price === "-" ? "td-cost  col-color-pink textcenter" : "td-cost  col-color-pink textright"}>
                                {ele.budget_cost?.unit_price === "-" ? "-" : ele.budget_cost?.unit_price && ele.budget_cost?.day_times && ele.budget_cost?.unit_price * ele.budget_cost?.day_times}
                              </td>
                              <td className="td-cost textcenter col-color-pink">
                                {ele.budget_cost?.price_currency}
                              </td>
                              <td className={ele.budget_cost?.unit_price === "-" ? "td-cost  col-color-pink textcenter" : "td-cost  col-color-pink textright"}>
                                {ele.budget_cost?.fx_rate}
                              </td>
                              <td className="td-cost textcenter col-color-pink">
                                {ele.budget_cost?.accept_currency}
                              </td>
                              <td className={ele.budget_cost?.unit_price === "-" ? "td-cost  col-color-pink textcenter" : "td-cost  col-color-pink textright"}>
                                {ele.budget_cost?.cost}
                              </td>
                              <td className={ele.actual_cost?.unit_price === "-" ? "td-cost textcenter td-actual" : "td-cost textleft td-actual"}>
                                {ele.actual_cost?.unit_price === "-" ? "-" : ele.actual_cost?.unit_price && ele.actual_cost?.day_times && `${ele.actual_cost?.unit_price}x${ele.actual_cost?.day_times}`}
                              </td>
                              <td className={ele.actual_cost?.unit_price === "-" ? "td-cost  td-actual textcenter" : "td-cost  td-actual textright"}>
                                {ele.actual_cost?.unit_price === "-" ? "-" : ele.actual_cost?.unit_price && ele.actual_cost?.day_times && ele.actual_cost?.unit_price * ele.actual_cost?.day_times}
                              </td>
                              <td className="td-drop textcenter td-actual">
                                {ele.actual_cost?.price_currency}
                              </td>
                              <td className={ele.actual_cost?.unit_price === "-" ? "td-cost  td-actual textcenter" : "td-cost  td-actual textright"}>
                                {ele.actual_cost?.fx_rate}
                              </td>
                              <td className="td-drop textcenter td-actual">
                                {ele.actual_cost?.accept_currency}
                              </td>
                              <td className={ele.actual_cost?.unit_price === "-" ? "td-cost  td-actual textcenter" : "td-cost  td-actual textright"}>
                                {ele.actual_cost?.cost}
                              </td>
                              <td className="td-title textleft td-actual">
                                {ele.actual_cost?.reason}
                              </td>
                            </tr>
                          )
                        })
                      }
                      <tr>
                        <td colSpan={nameTable == "Accommodation" ? 5 : 4} rowSpan={allCurrency.length} style={{ borderBottomLeftRadius: "14px" }}>
                          {t('Sub Total')}
                        </td>
                        <td colSpan="3" className="col-color-green">
                          {allCurrency[0]?.currency_desc}
                        </td>
                        <td colSpan="3" className={data.category_total_amount && data.category_total_amount[0]?.budget_cost?.sub_total === "-" ? "col-color-green textcenter" : "col-color-green textright"}>
                          {data.category_total_amount ? data.category_total_amount[0]?.budget_cost?.sub_total : ""}
                        </td>
                        <td colSpan="3" className="col-color-green">
                          {allCurrency[0]?.currency_desc}
                        </td>
                        <td colSpan="3" className={data.category_total_amount && data.category_total_amount[0]?.actual_cost?.sub_total === "-" ? "col-color-green textcenter" : "col-color-green textright"}>
                          {data.category_total_amount ? data.category_total_amount[0]?.actual_cost?.sub_total : ""}
                        </td>
                        <td className="col-color-green textright"></td>
                      </tr>
                      {
                        allCurrency.map((ele, index) => {
                          return (index != 0 && ele.expense_flag === 1 &&
                            <tr key={index}>
                              <td colSpan="3" className="col-color-green">
                                {ele.currency_desc}
                              </td>
                              <td colSpan="3" className={data.category_total_amount && data.category_total_amount[index]?.budget_cost?.sub_total === "-" ? "col-color-green textcenter" : "col-color-green textright"}>
                                {data.category_total_amount ? data.category_total_amount[index]?.budget_cost?.sub_total : ""}
                              </td>
                              <td colSpan="3" className="col-color-green">
                                {ele.currency_desc}
                              </td>
                              <td colSpan="3" className={data.category_total_amount && data.category_total_amount[index]?.actual_cost?.sub_total === "-" ? "col-color-green textcenter" : "col-color-green textright"}>
                                {data.category_total_amount ? data.category_total_amount[index]?.actual_cost?.sub_total : ""}
                              </td>
                              <td className="col-color-green textright"></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </CCol>
            </CRow>
          </CCard>
        </>
      }
    </div>
  )
}

export default BusinessTripAdjustmentDetailTable
