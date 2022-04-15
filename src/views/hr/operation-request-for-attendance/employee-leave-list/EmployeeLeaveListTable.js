/* eslint-disable no-use-before-define */
import React, {useState, useEffect} from 'react';
import {CCard, CCardBody, CCol, CRow, CImg, CLabel, CTooltip, CButton, CPagination } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import $ from 'jquery';
import { Markup } from 'interweave';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation'; // Common message
/**
 * @author Aye Thiri Mon
 * @create 11/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const EmployeeLeaveListTable=props=> {
  const{t} = useTranslation();

  return (
    <>
    {
      props.mainTable != '' &&
      <CCard className='emp-leave-list-table-card'>
        <CCardBody>
          <CRow>
            <CCol lg='6' className='show-delete-btn'>
              <input type="checkbox" value="all-delete-show-check" checked={props.showDelete} onChange={props.changeDeleteCheckbox} style={{marginRight:'3px'}}/>
              <CLabel>{ t('Show Delete Button') }</CLabel>
            </CCol>
            <CCol lg='6' className='row-count-msg' style={{textAlign:'right'}}>
              <CLabel>{t("Total Row")+":"+props.rowCount+t("(rows)")}</CLabel>
            </CCol>
          </CRow>
          <div className="table-responsive">
            <table className="table" aria-label="simple table">
              <thead id="thead-id">
                <tr width="100%">
                  {props.showDelete === false &&
                  <th width="" className="" style={{textAlign:'center'}}>
                    <input type="checkbox" value="all-check"  onChange={props.change_checkbox} checked={props.AllCheck === true}/>
                  </th>
                  }
                  {props.showDelete === true &&
                  <th width="" className="" style={{textAlign:'center'}}>
                    <input type="checkbox" value="all-delete-check"  onChange={props.change_del_checkbox} checked={props.AllDelCheck === true}/>
                  </th>
                  }
                  <th style={{ minWidth: '50px' }}>
                  { t('No') }
                  </th>
                  <th style={{ minWidth: '100px' }}>
                  { t('Employee ID') }
                  </th>
                  <th style={{ minWidth: '100px' }}>
                  { t('Employee Code') }
                  </th>
                  <th style={{ minWidth: '200px' }}>
                  { t('Employee Name') }
                  </th>
                  <th width="" className={"leave-date-set"}>
                  { t('Leave Request Date') }
                  </th>
                  <th style={{ minWidth: '200px' }}>
                  { t('Leave Type') }
                  </th>
                  <th style={{ minWidth: '200px' }}>
                  { t('Description') }
                  </th>
                  <th style={{ minWidth: '100px' }}>
                  { t('Approver Status') }
                  </th>
                  <th style={{ minWidth: '150px' }} colSpan="2">
                  { t('Action') }
                  </th>
                  <th style={{ minWidth: '200px' }}>
                  { t('Denied Reason') }
                  </th>
                </tr>
                </thead>
              <tbody >
              {
                props.mainTable.map((i,index) => {
                return(
                  <tr key={index} width="100%">
                    {props.showDelete === false && i.is_approve === true &&
                      <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                      <input type="checkbox" value={i.leave_attach_id} id={'check_'+i.id} checked={i.is_checked === true} onChange={props.change_checkbox}/>
                      </td>
                    }
                    {props.showDelete === true && i.can_delete === true &&
                      <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                        <input type="checkbox" value={i.leave_attach_id} id={'check_del_'+i.id} checked={i.is_del_checked === true} onChange={props.change_del_checkbox}/>
                      </td>
                    }
                    {((i.is_approve === false && props.showDelete === false) || (i.can_delete === false && props.showDelete === true)) &&
                      <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}></td>
                    }
                    <td width="" className="" style={{textAlign:"center"}}>
                    {index+1}
                    </td>
                    <td width="" className="td-green" style={{textAlign:"right"}}>
                    {i.employee_id}
                    </td>
                    <td width="" className="td-green" style={{textAlign:"right"}}>
                    {i.employee_code}
                    </td>
                    <td width="" style={{textAlign:"left"}}>
                    {i.employee_name}
                    </td>
                    <td width="" className={"leave-date-set"} style={{textAlign:"center"}}>
                      <p tabIndex="1" className="leave-date-detail">{i.leave_date_detail}</p>
                      <label className="leave-date-detail-hover" style={{fontWeight: 'normal'}}><Markup content={i.leave_date}/></label>
                    </td>
                    <td width="" className="td-pink" style={{textAlign:"left"}}>
                    {i.leave_name}
                    </td>
                    <td width="" className="td-orange" style={{textAlign:"left"}}>
                    {i.reason}
                    </td>
                    <td width="" style={{textAlign:"center"}}>
                    {i.approve_status}
                    </td>
                    <td width="" style={{textAlign:"center"}}>
                      <CTooltip content={t('Detail')}>
                        <CImg onClick={props.detail.bind(this,i)} className="icon-clt" src="/avatars/detail.png" />
                      </CTooltip>
                    </td>
                    {isEmpty(i.salary_calculate) &&
                      <td>-</td>
                    }
                    {!isEmpty(i.salary_calculate) &&
                      <td style={{textAlign:"center",color:"red"}}>{i.salary_calculate}</td>
                    }
                    <td width="" style={{textAlign:"left"}}>
                    {i.denied_reason}
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
          { props.rowCount > 20 &&
            <CRow alignHorizontal="center" className="mt-3">
              <div className="mt-4">
                <CPagination
                  activePage={props.currentPage}
                  pages={props.lastPage}
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton="First page"
                  lastButton="Last page"
                  onActivePageChange={ (i) => props.setActivePage(i) }
                ></CPagination>
              </div>
            </CRow>
          }
          {props.showDelete === false    &&
            <>  { props.confirmRejectShow == true &&
              <CRow className='mt-4'>
                <CCol style={{textAlign:"center"}}>
                  <CButton className="form-btn" id='confirmBtn' name = 'confirmBtn' style={{margin:'2px 10px'}} onClick={props.confirmData}>
                    {t('Confirm')}
                  </CButton> 
                  <CButton className="form-btn" id='rejectBtn' name = 'rejectBtn' style={{margin:'2px 10px'}} onClick={props.rejectData}>
                    {t('Reject')}
                  </CButton> 
                </CCol>
              </CRow>
            }
            </>
          }
          {props.showDelete === true    &&
            <>  { props.confirmRejectShow == true &&
              <CRow className='mt-4'>
                <CCol style={{textAlign:"center"}}>
                  <CButton className="form-btn" id='deleteBtn' name = 'deleteBtn' style={{margin:'2px 10px'}} onClick={props.deleteData}>
                    {t('Delete')}
                  </CButton> 
                </CCol>
              </CRow>
            }
            </>
          }
        </CCardBody>
      </CCard>
    }
    </>
  );
}
export default EmployeeLeaveListTable;


