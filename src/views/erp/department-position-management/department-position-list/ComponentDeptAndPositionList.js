/**
 * Department And Position List Form
 * @author Thin Thin Nwe
 * @create
*/

import React from 'react'
import {
  CButton, CCard, CCardBody, CCol, CForm, CFormGroup, CLabel,
  CRow, CPagination, CSelect, CTooltip
} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const ComponentDeptAndPositionList = (props) => {
  const{t} = useTranslation();
  let number = props.number

  return (      
      <CRow>
        <CCol xs="12" md="12">            
          <CCard>
              <CCardBody md="10">
                <CForm id="dept_pos_register" action="" method="post" className="form-horizontal">
                  <CFormGroup row>
                      <CCol xs="12" md="2">
                        <CLabel htmlFor="dept_name">{props.t("Department Name")}<span className="require">*</span></CLabel>
                      </CCol>
                      <CCol xs="12" md="7">
                        <CSelect custom id="dept_name"
                           name="department_id" onChange={props.dataChange}>
                            <option value="0">.....{props.t('select Department Name')}.....</option>                        
                            {
                              props.department.map(d => {
                              return(
                                <option key={d.id} value={d.id}>{d.department_name}</option>
                              )                          
                            })}
                          </CSelect>
                      </CCol>                                       
                  </CFormGroup> 
                  <CFormGroup row>
                      <CCol xs="12" md="2">
                        <CLabel htmlFor="pos_name">{props.t("Position Name")}<span className="require">*</span></CLabel>
                      </CCol>
                      <CCol xs="12" md="5">
                          <CSelect custom id="pos_name"
                           name="position_id" onChange={props.dataChange}>
                            <option value="0">.....{props.t('select Position Name')}.....</option>                        
                            {
                              props.position.map(p => {
                              return(
                                <option key={p.id} value={p.id}>{p.position_name}</option>
                              )                          
                            })}
                          </CSelect>
                      </CCol>                                             
                  </CFormGroup>
                  {
                    props.loginPermission.includes("Save") &&                  
                    <CFormGroup>
                        <CCol className="text-center">
                            <CButton className="form-btn" type="submit"
                            onClick={props.Save}>
                              {props.t("Save")}
                            </CButton>
                        </CCol>                          
                    </CFormGroup>
                  }
                </CForm>                           
              </CCardBody>              
          </CCard>
          
          {
            props.total > 0 &&                
            <CRow id="table">
              <CCol lg="12">
                <div style={{ color: "#046C0A" }}>{t("Total Rows").replace('%s', props.total)}</div>
                <div className="table-responsive">                
                  {
                  props.deptPosTable.length > 0 &&
  
                  <table className="table user-list-table" id="user-list-table">
                    <thead id="thead-id">
                      <tr>
                        <th style={{ width: "55px" }}>{props.t("No")}</th>
                        <th>{props.t("Department Name")}</th>
                        <th>{props.t("Position")}</th>
                        <th>{props.t("Position Rank")}</th>
                        <th>{props.t("Action")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.deptPosTable.map((deptPos, index) => {
                          return(
                            <tr key={index} value={ deptPos.id }>
                                  <td className="no"> { number++ } </td>                       
                                  <td className="name"> { deptPos.department_name } </td>
                                  <td className="pos_name"> { deptPos.position_name } </td>
                                  <td className="pos_rank"> { deptPos.position_rank } </td>
                                  <td className="user-list-table del-txt" id="delete-btn">
                                    {
                                      props.loginPermission.includes("Delete") &&                                  
                                      <CTooltip content={props.t("Delete")}>
                                        <CButton size="sm" className="delete-btn"
                                         onClick={() => props.deleteData(deptPos.department_id, deptPos.position_id)}>
                                          <img alt="delete" className="span-icon" src="/image/delete.png" width="15px"/>
                                        </CButton>
                                      </CTooltip>
                                    }
                                  </td>
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
                  }
                  <br/>
                </div>
              </CCol>
            </CRow>
          }
        </CCol>
      </CRow>
  )
}

export default ComponentDeptAndPositionList;