import React from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CButton, CTooltip
} from '@coreui/react'

const BlockDepartmentPosition = (props) => {

  return (
    <>
      {
      props.deptPosition.length > 0 &&
      <CCard>
        <CCard className="rounded-0 mt-0 pt-2 box_style">
          <CCardHeader className="rounded-0 bg-transparent pl-4 font-lg">
            {props.t('Selected Employee Department and Position')}
          </CCardHeader>
          <CCardBody className="pt-2">
            <CRow id="table">
              <CCol lg="12">
                <div className="table-responsive">
                  
                      <table className="table user-list-table" id="user-list-table">
                      <thead id="thead-id">
                        <tr>
                          <th>{props.t('No')}</th>
                          <th>{props.t('Department')}</th>
                          <th>{props.t('Position')}</th>
                          <th>{props.t('Action')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          props.deptPosition.map((dp, index) => {
                            return(
                              <tr key={index}>
                                  <td>{++index}</td>                                                                        
                                  <td>{dp.department_name}</td>                        
                                  <td>{dp.position_name}</td>
                                  <td className="user-list-table" id="delete-btn">
                                    <CTooltip content={props.t('Delete')}>
                                      <CButton size="sm" className="delete-btn"
                                       onClick={() => props.delDeptPos(dp.department_id)}>
                                        <img alt="delete" className="span-icon" src="/image/delete.png" width="15px"/>
                                      </CButton>
                                    </CTooltip>
                                  </td>
                              </tr>
                            )
                          })
                        }  
                      </tbody>
                    </table>                 
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>                     
      </CCard>
      }
    </>
  )
}

export default BlockDepartmentPosition