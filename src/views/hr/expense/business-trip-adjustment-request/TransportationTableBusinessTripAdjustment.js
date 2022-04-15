/* eslint-disable eqeqeq */
import { CCard, CCol, CImg, CInput, CRow, CSelect } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const TransportationTableBusinessTripAdjustment = props => {
  const { t } = useTranslation();
  let {
    allCurrency,
    subTotal,
    data, setData,
    btnRemoveFileInTable,
    btnRemoveRowTable,
    onchangeInput,
    handleChangeDateInTable,
    onchangePriceDropdown,
    onchangeAcceptDropdown,
    hanldeChangeReason,
  } = props;

  return (
    <div className="">
      {data.infor && data.infor.length > 0 &&
        <>
          <CCard className='table-panel loghistory-list'>
            <CRow id="table" className="">
              <CCol lg="12">
                <div className="table-responsive">
                  <table className="table purchase-order-list" aria-label="simple table">
                    <thead id="thead-id">
                      <tr width="100%">
                        <th id="tblNo" className="text-nowrap text-left align-middle" rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t("No")}
                        </th>
                        <th id="tblDate" className="text-left " rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Date')}
                        </th>
                        <th id="tblTitle" className="text-nowrap text-left align-middle" rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Title')}
                        </th>
                        <th id="tblAttachement" className="text-nowrap text-left align-middle" rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Attachment')}
                        </th>
                        <th id="tblDescription" className="text-nowrap text-left align-middle" rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Description')}
                        </th>
                        <th id="tblBudgetCost" className="text-nowrap align-middle" colSpan={6} style={{ borderBottom: "1px solid #fff" }} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Budget Cost')}
                        </th>
                        <th id="tblActualCost" className="text-nowrap align-middle" colSpan={7} style={{ borderBottom: "1px solid #fff" }} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Actual Cost')}
                        </th>
                        <th id="tblAction" className="text-nowrap text-left align-middle" rowSpan={2} >
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Action')}
                        </th>
                      </tr>
                      <tr width="100%">
                        <th id="lblUnitPricexQty" className="text-nowrap text-left align-middle no-border-radius">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Unit Price xQty')}
                        </th>
                        <th id="lblTotal" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Total')}
                        </th>
                        <th id="lblPriceCurrency" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Price Currency')}
                        </th>
                        <th id="lblFXRate" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('FX Rate')}
                        </th>
                        <th id="lblAcceptCurrency" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Accept Currency')}
                        </th>
                        <th id="lblAmount" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Amount')}
                        </th>
                        <th id="lblUnitPrice" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Unit Price')}
                        </th>
                        <th id="lblQty" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Qty')}
                        </th>
                        <th id="lblPriceCurrency" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Price Currency')}
                        </th>
                        <th id="lblFXRate" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('FX Rate')}
                        </th>
                        <th id="lblAcceptCurrency" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Accept Currency')}
                        </th>
                        <th id="lblAmount" className="text-nowrap text-left align-middle">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Amount')}
                        </th>
                        <th id="lblReason" className="text-nowrap text-left align-middle no-border-radius">
                          <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="no"
                          />
                          {t('Reason')}
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        data.infor?.map((ele, index) => {
                          return (
                            <tr key={index}>
                              <td className="td-no textright" >
                                {index + 1}
                              </td>
                              <td className="td-date textleft" >
                                {
                                  ele.flag === 0 ? ele.date_in :
                                    <DatePicker value={!isEmpty(ele.date_in) ? ele.date_in : null} change={(value) => handleChangeDateInTable(value, ele, data, setData)}/>
                                }
                              </td>
                              <td className="td-title textleft">
                                {ele.title} {(ele.arrange_by_admin == 1 && ele.flag != 0) ? "[Arrange By Admin]" : ""}
                              </td>
                              <td className="text-left text-nowrap col-color-blue">
                                <table>
                                <tbody>
                                    {ele.attach_file.map((i, idx) => {
                                      let file_name = i.business_trip_detail_document_name;
                                      if (file_name.length > 21) {
                                        file_name = file_name.substring(0, 9).concat("...")
                                          .concat(file_name.substring(file_name.length - 10, file_name.length));
                                      }
                                      return (
                                        <tr key={idx}>
                                          <td className="text-left" style={{ border: "none", backgroundColor: '#d5f7df' }}>
                                            <i className="fas fa-file-alt" style={{ color: "#01a3f8" }}></i>
                                            {file_name.substring(file_name.lastIndexOf("/") + 1, file_name.length)}&nbsp;
                                            <i className="fa fa-times" style={{ cursor: "pointer" }} onClick={() => btnRemoveFileInTable(index, idx, data, setData, "Transportation")} ></i>
                                          </td>
                                        </tr>
                                      )
                                    })}
                                  </tbody>
                                </table>
                              </td>
                              <td className="td-title textleft td-green">
                                {ele.description}
                              </td>
                              <td className="td-cost textleft col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && `${ele.budget_cost.unit_price}x${ele.budget_cost.day_times}`}
                              </td>
                              <td className="td-cost textright col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && ele.budget_cost.unit_price * ele.budget_cost.day_times}
                              </td>
                              <td className="td-cost textcenter col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && allCurrency.map(item => item.id == ele.budget_cost.unit_price_currency_id ? item.currency_desc : "")}
                              </td>
                              <td className="td-cost textright col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && ele.budget_cost.fx_rate}
                              </td>
                              <td className="td-cost textcenter col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && allCurrency.map(item => item.id == ele.budget_cost.accept_currency_id ? item.currency_desc : "")}
                              </td>
                              <td className="td-cost textright col-color-pink">
                                {!isEmpty(ele.budget_cost?.unit_price) && ele.budget_cost.cost.toFixed(2)}
                              </td>
                              <td className="td-cost textcenter td-actual">
                                {
                                  ele.flag === 0 ? ele.actual_cost.unit_price :
                                    <CInput style={{ textAlign: "right" }} value={ele.actual_cost.unit_price} hidden={ele.flag === 1} name="Unit Price" onChange={(e) => onchangeInput(ele, e, data, setData, "Transportation")} />
                                }
                              </td>
                              <td className="td-cost textcenter td-actual">
                                {
                                  ele.flag === 0 ? ele.actual_cost.day_times :
                                    <CInput style={{ textAlign: "right" }} value={Number(ele.actual_cost.day_times)} hidden={ele.flag === 1} name="Qty" onChange={(e) => onchangeInput(ele, e, data, setData, "Transportation")} />
                                }
                              </td>
                              <td className="td-drop textcenter td-actual">
                                {
                                  ele.flag === 0 ? allCurrency.map(item => item.id == ele.actual_cost.unit_price_currency_id ? item.currency_desc : "") :
                                    <CSelect value={ele.actual_cost.unit_price_currency_id} hidden={ele.flag === 1} name={ele.id} onChange={(e) => onchangePriceDropdown(e, data, setData)} >
                                      {allCurrency.map((ele, index) => {
                                        return (
                                          <option key={index} value={ele.id}>{ele.currency_desc}</option>
                                        )
                                      })}
                                    </CSelect>
                                }
                              </td>
                              <td className="td-cost textcenter td-actual">
                                {
                                  ele.flag === 0 ? ele.actual_cost.fx_rate :
                                    <CInput disabled={ele.actual_cost.unit_price_currency_id == ele.actual_cost.accept_currency_id ? true : false} style={{ textAlign: "right" }} value={ele.actual_cost.fx_rate} hidden={ele.flag === 1} name="FX Rate" onChange={(e) => onchangeInput(ele, e, data, setData, "Transportation")} />
                                }
                              </td>
                              <td className="td-drop textcenter td-actual">
                                {
                                  ele.flag === 0 ? allCurrency.map(item => item.id == ele.actual_cost.accept_currency_id ? item.currency_desc : "") :
                                    <CSelect value={ele.actual_cost.accept_currency_id} hidden={ele.flag === 1} name={ele.id} onChange={(e) => onchangeAcceptDropdown(e, data, setData, "Transportation")} >
                                      {allCurrency.map((ele, index) => {
                                        return (
                                          ele.expense_flag === 1 &&
                                          <option key={index} value={ele.id}>{ele.currency_desc}</option>
                                        )
                                      })}
                                    </CSelect>
                                }
                              </td>
                              <td className="td-cost textright td-actual">
                                {ele.flag !== 1 && ele.actual_cost.cost.toFixed(2)}
                              </td>
                              <td className="td-title textcenter td-actual">
                                {
                                  isEmpty(ele.flag) &&
                                  <CInput value={ele.reason ? ele.reason : ""} onChange={(e) => hanldeChangeReason(e, ele, data, setData)} />
                                }
                              </td>
                              <td className="td-action textcenter">
                                <CImg src={'avatars/remove.png'} className="icon-clt" alt="titleicon" onClick={() => btnRemoveRowTable(data, setData, ele, index, "Transportation")} />
                              </td>
                            </tr>
                          )
                        })
                      }
                      <tr>
                        <td id="lblSubTotal" style={{ borderBottomLeftRadius: "14px" }} colSpan="5" rowSpan={allCurrency.length}>
                          {t('Sub Total')}
                        </td>
                        <td colSpan="3" className="col-color-green">
                          {allCurrency[0]?.currency_desc}
                        </td>
                        <td colSpan="3" className="textright col-color-green no-border-radius">
                          {data?.budget_cost[0] && data?.budget_cost[0].currency_id == allCurrency[0]?.id ? data?.budget_cost[0].sub_total.toFixed(2) : parseFloat(0).toFixed(2)}
                        </td>
                        <td colSpan="3" className="col-color-green">
                          {allCurrency[0]?.currency_desc}
                        </td>
                        <td colSpan="3" className="textright col-color-green">
                          {subTotal[0] && subTotal[0].currency_id == allCurrency[0]?.id ? parseFloat(subTotal[0].sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                        </td>
                        <td className="col-color-green"></td>
                        <td className="td-gray"></td>
                      </tr>
                      {
                        allCurrency.map((ele, index) => {
                          return (index != 0 && ele.expense_flag === 1 &&
                            <tr style={{ background: "#d8dbe0" }} key={index}>
                              <td colSpan="3" className="col-color-green no-border-radius">
                                {ele.currency_desc}
                              </td>
                              <td colSpan="3" className="textright col-color-green">
                                {data.budget_cost && (data.budget_cost?.find(item => item.currency_id == ele.id)?.sub_total.toFixed(2) || parseFloat(0).toFixed(2))}
                              </td>
                              <td colSpan="3" className="col-color-green">
                                {ele.currency_desc}
                              </td>
                              <td colSpan="3" className="textright col-color-green">
                                {subTotal.find(item => item.currency_id == ele.id) ? parseFloat(subTotal.find(item => item.currency_id == ele.id).sub_total).toFixed(2) : parseFloat(0).toFixed(2)}
                              </td>
                              <td className="col-color-green"></td>
                              <td className="td-gray"></td>
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

export default TransportationTableBusinessTripAdjustment
