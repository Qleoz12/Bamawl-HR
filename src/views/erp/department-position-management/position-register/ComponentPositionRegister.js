/**
 * Position Register Form
 * @author Thin Thin Nwe
 * @create
*/

import React from 'react'
import {
  CButton, CCard, CCardBody, CCol, CForm, CFormGroup, CInput,
  CLabel, CRow, CPagination, CTooltip
} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const ComponentPositionRegister = (props) => {
  const{t} = useTranslation();
  let number = props.number

  return (      
      <CRow>
        <CCol xs="12" md="12">            
          <CCard>
              <CCardBody md="10">
                <CForm id="pos_register" action="" method="post" className="form-horizontal">
                    <CFormGroup row>
                        <CCol xs="12" md="5">
                          <CLabel htmlFor="pos-name">{props.t("Position Name")}<span className="require">*</span></CLabel>
                          <CInput id="pos-name" name="position_name" onChange={(e) => {props.dataChange(e)}}
                          value={props.positionData.position_name || ''}/>
                        </CCol>
                        <CCol xs="12" md="5">
                          <CLabel htmlFor="pos-rank">{props.t("Position Rank")}<span className="require">*</span></CLabel>
                          <CInput id="pos-rank" placeholder={props.t("... 0 is highest level and 255 is the lowest level ...")}
                            name="position_rank" onChange={(e) => {props.dataChange(e)}}
                            value={ props.positionData.position_rank !== 0 ? props.positionData.position_rank || '' : 0 }/>
                        </CCol>
                        {
                          ((props.btnSaveEdit === "Save" && props.loginPermission.includes("Save")) ||
                           (props.btnSaveEdit === "Update" && props.loginPermission.includes("Update"))) &&                        
                          <CCol xs="12" md="2">
                            <CFormGroup>
                              <CButton className="form-btn m-save-btn" type="submit" onClick={props.Save} value={props.positionData.id}>
                                {props.t(props.btnSaveEdit)}
                              </CButton>
                            </CFormGroup>
                          </CCol>
                        }
                    </CFormGroup>                    
                </CForm>                           
              </CCardBody>              
          </CCard>
          <CRow id="table">
            <CCol lg="12">
              {
                props.total > 0 &&
                <>
                  <div style={{ color: "#046C0A" }}>{t("Total Rows").replace('%s', props.total)}</div>
                  <div className="table-responsive">                
                    <table className="table user-list-table" id="user-list-table">
                      <thead id="thead-id">
                        <tr>
                          <th>{props.t("No")}</th>
                          <th>{props.t("Position Name")}</th>
                          <th>{props.t("Position Rank")}</th>
                          <th colSpan="2">{props.t("Action")}</th>
                        </tr>
                      </thead>
                      <tbody>
                          {
                            props.positionTable.map(p => {
                              return(
                                <tr key={ p.id } value={ p.id }>
                                  <td className="no"> { number++ } </td>                       
                                  <td className="name"> { p.position_name } </td>
                                  <td className="rank"> { p.position_rank } </td>
                                  {
                                    !props.loginPermission.includes("Edit") &&
                                    !props.loginPermission.includes("Delete") &&
                                    <td></td>
                                  }
                                  {
                                      props.loginPermission.includes("Edit") &&
                                      <td className="user-list-table btn-action" id="edit-btn">
                                        <CTooltip content={props.t("Edit")}>
                                          <CButton size="sm" className="edit-btn" onClick={() => props.editPosition(p.id)}>
                                            <img alt="edit" className="span-icon" src="/image/edit.png" width="15px"/>                                    
                                          </CButton>
                                        </CTooltip>
                                      </td>
                                  }
                                  {
                                    props.loginPermission.includes("Delete") &&                              
                                    <td className="user-list-table btn-action del-txt" id="delete-btn">
                                      <CTooltip content={props.t("Delete")}>
                                        <CButton size="sm" className="delete-btn" onClick={() => props.deleteData(p.id)} >
                                          <img alt="delete" className="span-icon" src="/image/delete.png" width="15px"/>                                    
                                        </CButton>
                                      </CTooltip>
                                    </td>
                                  }
                                </tr>
                              )
                          })}
                        
                        {
                          props.lastPage > 1 &&
                          <tr>
                            <td className="custom-pagination" colSpan="9">
                            <br/>
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
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>                
                    <br/>
                  </div>
                </>
              }
            </CCol>
          </CRow>
        </CCol>
      </CRow>
  )
}

export default ComponentPositionRegister;