/**
 * Department Register Form
 * @author Thin Thin Nwe
 * @create
*/

import React from 'react'
import {
  CButton, CCard, CCardBody, CCol, CFormGroup, CInput, CLabel, CRow,
  CPagination, CForm, CSelect, CTooltip
} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const ComponentDeptRegister = (props) => {
  const{t} = useTranslation();
  let number = props.number

  return (
    <CRow>
      <CCol xs="12" md="12">
        <CCard>
            <CCardBody>
              <CForm id="dept_register" action="" method="post" className="form-horizontal">
                <CRow>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                        <CLabel htmlFor="p-root">{ props.t('Parent Root') }</CLabel>
                        <CSelect custom id="p-root" value={props.deptData.parent_id}
                         name="parent_id" onChange={props.dataChange} disabled={props.flag}>
                          <option value="null">.....{props.t('Select Parent Root')}.....</option>                        
                          {
                            props.parentRoot.map(dept => {
                            return(
                              <option key={dept.id} value={dept.id}>{dept.department_name}</option>
                            )
                          })}
                        </CSelect>                       
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                      <CLabel htmlFor="dept-code">{ props.t('Department Code') }<span className="require">*</span></CLabel>
                      <CInput id="dept-code" name="department_code" disabled={props.flag}
                       onChange={props.dataChange} value={props.deptData.department_code} />
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                      <CLabel htmlFor="dept-name">{ props.t('Department Name') }<span className="require">*</span></CLabel>
                      <CInput id="dept-name" name="department_name"
                       onChange={props.dataChange} value={props.deptData.department_name} />
                    </CFormGroup>
                  </CCol>
                  {
                    ((props.btnSaveEdit === "Save" && props.loginPermission.includes("Save")) ||
                     (props.btnSaveEdit === "Update" && props.loginPermission.includes("Update"))) &&
                    <CCol xs="12" md="2">
                        <CFormGroup>
                            <CButton className="form-btn m-save-btn" type="submit" onClick={(e) => props.Save(e)} value={props.deptData.id}>
                              { props.t(props.btnSaveEdit) }
                            </CButton>
                        </CFormGroup>
                    </CCol>
                  }
                </CRow>
              </CForm>              
            </CCardBody>
        </CCard>          
          
        {
          props.total > 0 &&
          <CRow id="table">
            <CCol lg="12">
              <div style={{ color: "#046C0A" }}>{t("Total Rows").replace('%s', props.total)}</div>
              <div className="table-responsive">                
                  <table className="table user-list-table" id="user-list-table">
                    <thead id="thead-id">
                      <tr>
                        <th>{ props.t('No') }</th>
                        <th>{ props.t('Department Code') }</th>
                        <th>{ props.t('Parent Root/Department Name') }</th>
                        <th colSpan="2">{ props.t('Action') }</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        props.deptTable.map(dept => {
                          return(
                            <tr key={ dept.id } value={ dept.id }>
                              <td className="no"> { number++ } </td>                       
                              <td className="code"> { dept.department_code } </td>
                              <td className="name"> { dept.department_name } </td>
                                {
                                  !props.loginPermission.includes("Edit") &&
                                  !props.loginPermission.includes("Delete") &&
                                  <td></td>
                                }
                                {
                                  props.loginPermission.includes("Edit") &&
                                  <td className="user-list-table btn-action" id="edit-btn">
                                    <CTooltip content={ props.t("Edit") }>
                                      <CButton size="sm" className="edit-btn" onClick={() => props.editDepartment(dept.id)}>
                                        <img alt="edit" className="span-icon" src="/image/edit.png" width="15px"/>
                                      </CButton>
                                    </CTooltip>                                
                                  </td>
                                }
                                {
                                  props.loginPermission.includes("Delete") &&
                                  <td className="user-list-table btn-action del-txt" id="delete-btn">
                                    <CTooltip content={ props.t("Delete") }>
                                      <CButton size="sm" className="delete-btn" onClick={() => props.deleteData(dept.id)}>
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
            </CCol>
          </CRow>
        }
      </CCol>
    </CRow>
  );
}
export default ComponentDeptRegister