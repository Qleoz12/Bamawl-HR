import React, { useEffect } from 'react';
import { CCol,CCard, CRow, CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const CategoryBusinessTripRequestTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let {
      businessTripList,
      total,
      deleteFileBusinessList,
      deleteRow,
      businessTripListFile
    }=props
    return (<>
    {businessTripList.length>0&&(
      <CCard className="table-panel table-panel-businesstrip-white add-employee pt-4 pb-3">
                <CRow id="table " className="category-border-tfoot">
                  <CCol lg="12">
                    <div className="table-responsive no-border-header">
                      <table
                        className="table table-category purchase-order-list"
                        aria-label="simple table"
                      >
                        <thead id="thead-id">
                          <tr width="100%">
                            <th className='text-left text-nowrap align-middle' rowSpan="2" id='tblNo'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="no"
                              />
                              {t("No")}
                            </th>
                            <th className='text-left text-nowrap align-middle' style={{maxWidth:"700px",minWidth:"400px"}} rowSpan="2" id='tblTitle'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Title")}
                            </th>
                            <th className='text-left text-nowrap align-middle' rowSpan="2" id='tblAttachment'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Attachment")}
                            </th>
                            <th className='text-left text-nowrap align-middle'style={{maxWidth:"200px",minWidth:"100px"}} rowSpan="2" id='tblDescription'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Description")}
                            </th>
                            <th className='text-center text-nowrap' colSpan="6" style={{borderBottom:"2px solid #FFFFFF"}} id='tblBudgetCost'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Budget Cost")}
                            </th>
                            <th className='text-left text-nowrap align-middle' rowSpan="2" sid='tblAction'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Action")}
                            </th>
                          </tr>
                          <tr width="100%">
                            <th className='text-left text-nowrap' id='tblUnitPriceQty'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="no"
                              />
                              {t("Unit Price")}x{t("Day/Times")}
                            </th>
                            <th className='text-left text-nowrap' id='tblTotal'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Total")}
                            </th>
                            <th className='text-left text-nowrap' id='tblPriceCurrency'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Price Currency")}
                            </th>
                            <th className='text-left text-nowrap' id='tblFXRate'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("FX Rate")}
                            </th>
                            <th className='text-left text-nowrap'id='tblAcceptCurrency'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Accept Currency")}
                            </th>
                            <th className='text-left text-nowrap' id='tblAmount'>
                              <CImg
                                src={"avatars/titleicon.png"}
                                className="imgTitle"
                                alt="titleicon"
                              />
                              {t("Amount")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          { businessTripList.map((i, index) => {
                              return (
                                  <tr width="100%" key={index}>
                                      <td className="td-num text-right text-nowrap td-gray"
                                        style={{
                                          borderLeft: "3px solid #858BC3",
                                        }} >
                                        {index+1}
                                      </td>
                                      <td className="td-num text-left text-break td-gray">
                                        {i.title} {i.arrange_by_admin==1?t('[Arrange By Admin]'):''}
                                      </td>
                                      <td
                                        className="text-left text-nowrap td-blue-customer customer-td-img"
                                      >
                                        {
                                          businessTripListFile.length>0&&businessTripListFile[index].map((e,indexFile)=>{
                                            return(
                                              <div key={indexFile} className="td-img" style={{height:`${100/businessTripListFile[index].length}%`,borderBottom:indexFile!=businessTripListFile[index].length-1?'2px solid white':'none'}}>
                                                  <i className="fas fa-file icon-btn file"></i><span className="text-break name-file ml-3">{e.name.split('/')[e.name.split('/').length-1]}</span>
                                                  <i className="fas fa-times" onClick={deleteFileBusinessList.bind(this,e,index,indexFile)}></i>
                                              </div>
                                            )
                                          })
                                        }
                                      </td>
                                      <td
                                        className="text-left text-break td-green"
                                        >
                                        {i.description}
                                      </td>
                                      <td className="text-right text-nowrap td-pink-blur">
                                        {parseFloat(i.unit_price)}X{i.day_times}
                                      </td>
                                      <td className="text-right text-nowrap td-pink-blur">
                                        {Math.round(i.unit_price*i.day_times*100)/100}
                                      </td>
                                      <td className="text-left text-nowrap td-pink-blur">
                                        {i.unit_price_curency}
                                      </td>
                                      <td className="text-right text-nowrap td-pink-blur">
                                       {i.fx_rate!=""?parseFloat(i.fx_rate):""}
                                      </td>
                                      <td className="text-left text-nowrap td-pink-blur">
                                        {i.accept_currency}
                                      </td>
                                      <td className="text-right text-nowrap td-pink-blur">
                                        {i.fx_rate!=""?Math.round(i.unit_price*i.fx_rate*i.day_times*100)/100:Math.round(i.unit_price*i.day_times*100)/100}
                                      </td>
                                      <td className="td-gray no-border-radius" >
                                        <input
                                          type="image"
                                          id={""}
                                          src={"avatars/remove.png"}
                                          className="icon-clt"
                                          alt="Delete"
                                          onClick={deleteRow.bind(this, i,index)}
                                        />
                                      </td>
                                  </tr>
                              );
                            })}
                        </tbody>
                        <tfoot className="footer">
                          { total.length>0 &&
                            total.map((e,index)=>{
                              return(
                                <tr key={index}>
                                    {index==0&&(
                                      <td colSpan="4" rowSpan={total.length} className="text-center text-nowrap align-middle td-gray" style={{
                                        borderLeft: "3px solid #858BC3",
                                    }}>{t('Sub Total')}</td>
                                    )}
                                    <td colSpan="3" className="text-center text-nowrap td-green-blur">{e.currency_name}</td>
                                    <td colSpan="3" className="text-right text-nowrap td-green-blur">{e.currency_amount}</td>
                                    {index==0&&(
                                        <td rowSpan={total.length} className="td-gray"></td>
                                      )}
                                </tr>
                              )
                            })
                          }
                        </tfoot>
                      </table>
                    </div>
                  </CCol>
                </CRow>
              </CCard>
    )}
    </>
    );
}
export default CategoryBusinessTripRequestTable;
