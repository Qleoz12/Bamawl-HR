/* eslint-disable eqeqeq */
import { CCard, CCol, CRow,CImg } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ApproverTable = props => {
  const { t } = useTranslation();
  let {
    approverList
  } = props;
  const approverStatus=(id)=>{
    switch(id) {
      case 1:
        return 'Pending';
      case 2:
        return 'Approved';
      case 3:
        return 'Denied';
      default:
        return '';
    }
  }
  return (
    <div className="">
    <CImg
        src={'/avatars/list.png'}
        className="list-icon"
        width="6px"
        style={{ marginRight: '10px', marginBottom: '6px' }}
    />
    <label className="font-weight-bold">{t('Approver')}</label>
    {
      approverList.length>0&&(
        <>
          <CCard className='card-table table-panel loghistory-list'>
            <CRow id="table" className="">
              <CCol lg="12">
                <div className="table-responsive">
                  <table className="table purchase-order-list" aria-label="simple table">
                    <thead id="thead-id">
                      <tr width="100%">
                        <th className='text-left text-nowrap align-middle'>
                        <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="No"
                            />
                            {t('No')}.
                        </th>
                        <th className='text-left text-nowrap align-middle'>
                        <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="Approver ID"
                            />
                            {t('Approver ID')}
                        </th>
                        <th className='text-left text-nowrap align-middle'>
                        <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="Approver Name"
                            />
                            {t('Approver Name')}
                        </th>
                        <th className='text-left text-nowrap align-middle'>
                        <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="Approver Status"
                            />
                            {t('Approver Status')}
                        </th>
                        <th className='text-left text-nowrap align-middle'>
                        <CImg
                            src={"avatars/titleicon.png"}
                            className="imgTitle"
                            alt="Denied Reason"
                            />
                            {t('Denied Reason')}
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        approverList.length>0&&approverList.map((i,index)=>{
                          return(
                            <tr width="100%" key={index}>
                              <td className='text-right text-nowrap align-middle td-gray'
                                style={{
                                  borderLeft: "3px solid #858BC3",
                              }}
                              >{index+1}</td>
                              <td className='text-right text-nowrap align-middle td-gray' >{i.employee_id}</td>
                              <td className='text-left text-nowrap align-middle td-gray' >{i.emp_name}</td>
                              <td className='text-left text-nowrap align-middle td-blue-customer' >{approverStatus(parseInt(i.approve_status))}</td>
                              <td className='text-left text-nowrap align-middle td-orange' >{i.denied_reason}</td>
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
      )
    }
    </div>
  )
}

export default ApproverTable
