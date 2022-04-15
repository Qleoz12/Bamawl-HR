/* eslint-disable no-use-before-define */
import React, {useState} from 'react';
import {CCol, CCard, CRow, CImg, CButton, CModal, CModalHeader, CModalBody, CButtonToolbar } from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Aye Thiri Mon
 * @create 28/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const HolidayListTable=props=> {
    const{t} = useTranslation();
    

    return (<>
              <CCard className='holiday-list-card'>
                {
                      props.mainTable !== ""  &&
                      <>
                      <table className="table holiday-list-table card-table table-responsive" style={{display:'table'}} aria-label="simple table">
                      <thead id="thead-id">
                        <tr width="100%">
                          {
                            props.mainTable !== ""  &&
                            <th width="" className="" style={{textAlign:'center'}}>
                              <input type="checkbox" value="all-check" checked={props.AllCheck === true} onChange={props.change_checkbox}/>
                            </th>
                          }
                          {
                            props.mainTable === ""  &&
                            <th width="" className="" style={{textAlign:'center'}}></th>
                          }
                          <th width="" className="">
                          { t('Date') }
                          </th>
                          <th width="" className="">
                          { t('Holiday Name') }
                          </th>
                        </tr>
                        </thead>
                        <tbody >
                          {
                            props.mainTable !== ""  &&
                            props.mainTable.map((i,index) => {
                          return(
                            <tr key={index} width="100%">
                              {i.deleteable === true &&
                                <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                                <input type="checkbox" value={i.id} id={i.id} checked={i.is_checked === true} onChange={props.change_checkbox}/>
                                </td>
                              }
                              {i.deleteable === false &&
                                <td className="td-num" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                                </td>
                              }
                              <td width="" className="t d-emp-id" style={{textAlign:"center"}}>
                              {i.holiday_date}
                              </td>
                              <td width="" style={{textAlign:"left"}}>
                              {i.holiday_name}
                              </td>
                            </tr>
                          )
                          })}
                        </tbody>
                      </table>
                      <CCol style={{textAlign:"center"}}>
                      <CButton className="form-btn" id='deleteBtn' name = 'deleteBtn' onClick={props.deleteData}>
                          {t('Delete')}
                      </CButton> 
                      </CCol>
                    </>
    
                    }
            </CCard>
    </>
    );
}

export default HolidayListTable;


