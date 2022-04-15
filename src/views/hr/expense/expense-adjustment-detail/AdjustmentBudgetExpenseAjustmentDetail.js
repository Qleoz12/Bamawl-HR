/* eslint-disable eqeqeq */
import { CCard, CCol, CRow,CImg } from '@coreui/react'
import React from 'react'
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next'

const AdjustmentBudgetExpenseAjustmentDetail = props => {
  const { t } = useTranslation();
  let {
    currencyList,
    adjustmentBudget,
    advanceAdditional,
    advanceFlag
  } = props;

  return (
    <div className="">
    <CImg
        src={'avatars/list.png'}
        className="list-icon"
        width="6px"
        style={{ marginRight: '10px', marginBottom: '6px' }}
    />
    <label className="font-weight-bold">{t('Adjustment Budget ')}</label>
    <CCard className='card-form card-bonus table-panel mt-2'>
    <CCard className='card-table table-panel loghistory-list'>
        <CRow id="table" className="">
          <CCol lg="12">
            <div className="table-responsive no-border-header">
              <table className="table purchase-order-list" aria-label="simple table">
                <thead id="thead-id">
                  <tr width="100%">
                    <th rowSpan="2">
                    </th>
                    <th className='text-center text-nowrap align-middle' style={{borderBottom:"2px solid #FFFFFF"}} colSpan={currencyList.length}>
                        <CImg
                        src={"avatars/titleicon.png"}
                        className="imgTitle"
                        alt="Estimated Total"
                        />
                        {t('Estimated Total')}
                    </th>
                    <th className='text-center text-nowrap align-middle' style={{borderBottom:"2px solid #FFFFFF"}} colSpan={currencyList.length}>
                        <CImg
                        src={"avatars/titleicon.png"}
                        className="imgTitle"
                        alt="Actual Total"
                        />
                        {t('Actual Total')}
                    </th>
                  </tr>
                  <tr width="100%">
                    {
                      currencyList.length>0&&
                          currencyList.map((i, index) => {
                              return(
                                    <Fragment key={index}>
                                      <th className='text-left text-nowrap align-middle' >
                                          {i.currency_name}
                                      </th>
                                    </Fragment>

                              )
                          })
                    }
                    {
                      currencyList.length>0&&
                          currencyList.map((i, index) => {
                              return(
                                  <Fragment key={index}>
                                    <th className='text-left text-nowrap align-middle' >
                                        {i.currency_name}
                                    </th>
                                  </Fragment>

                              )
                          })
                    }
                  </tr>
                </thead>
                <tbody >
                <tr width="100%">
                        <td className='text-left text-nowrap align-middle td-blue-customer'
                            style={{
                                borderLeft: "3px solid #858BC3",
                            }}
                        >{t('Budget Total')}</td>
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget.budget_total?.estimated_budget_total.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget.budget_total?.actual_cost.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                </tr>
                <tr width="100%">
                        <td className='text-left text-nowrap align-middle td-blue-customer'
                            style={{
                                borderLeft: "3px solid #858BC3",
                            }}
                        >{t('Total (Admin Arrange Amount Not Include)')}</td>
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget.total_not_include_admin_arrange?.estimated_budget_total.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget.total_not_include_admin_arrange?.actual_cost.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                </tr>
                <tr width="100%">
                        <td className='text-left text-nowrap align-middle td-blue-customer'
                            style={{
                                borderLeft: "3px solid #858BC3",
                            }}
                        >{t('Advance Money')}<br/>{advanceFlag==2?advanceAdditional+'%'+t('Additional for target items'):advanceFlag==3?t('Specified Amount'):''}</td>
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget?.advance_money?.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget?.advance_money?.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                </tr>
                <tr width="100%">
                        <td className='text-left text-nowrap align-middle td-blue-customer'
                            style={{
                                borderLeft: "3px solid #858BC3",
                            }}
                        >{t('Adjustment Total')}</td>      
                        {
                           currencyList.map((i,index)=>{
                            return(
                                <td key={index} className='text-right text-nowrap align-middle td-gray'></td>
                            )
                        }) 
                        }
                        {
                            currencyList.map((i,index)=>{
                                return(
                                    <td key={index} className='text-right text-nowrap align-middle td-gray' >{adjustmentBudget.adjustment_total?.find(e=>e.currency_id==i.id).sub_total}</td>
                                )
                            })
                        }
                </tr>
                </tbody>
              </table>
            </div>
          </CCol>
        </CRow>
      </CCard>
    </CCard>
    </div>
  )
}

export default AdjustmentBudgetExpenseAjustmentDetail
