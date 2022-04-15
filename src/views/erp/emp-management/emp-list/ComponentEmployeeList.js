import React from 'react'
import {
  CButton, CCard, CCardBody, CCol, CFormGroup, CInput,
  CLabel, CRow, CSelect, CTooltip, CPagination
} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const ComponentEmployeeList = (props) => {
  const{t} = useTranslation();
  let number = props.number

  return (
    <CRow>
        <CCol xs="12" md="12">
          <CCard>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                      <CLabel htmlFor="emp-id">{props.t("Employee ID")}</CLabel>
                      <CInput id="emp-id" name="employee_id"
                       onChange={props.dataChange}
                      />
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                      <CLabel htmlFor="dept-name">{props.t("Department Name")}</CLabel>
                      <CSelect custom id="dept-name" name="department_id"
                        onChange={(e) => {props.deptChange(e)}}
                        >
                          <option value="0">.....{t('Select Department')}.....</option>
                          {
                            props.deptList.length > 0 &&
                            props.deptList.map(dept => {
                            return(
                              <option key={dept.id} value={dept.id}>{dept.department_name}</option>
                            )})
                          }
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" md="5">
                    <CFormGroup>
                      <CLabel htmlFor="pos-name">{props.t("Position Name")}</CLabel>
                      <CSelect custom id="pos-name" name="position_id"
                        onChange={props.dataChange}
                        >
                          <option value="0">.....{t('Select Position')}.....</option>
                          {
                            props.posList !== "" &&
                            props.posList.map(pos => {
                            return(
                              <option key={pos.id} value={pos.id}>{pos.position_name}</option>
                            )                          
                          })}
                      </CSelect>
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12" md="2">
                    <CFormGroup>
                        <CButton className="form-btn m-save-btn" type="submit" onClick={props.search}>
                          {props.t("Search")}
                        </CButton>
                    </CFormGroup>
                  </CCol>
                </CRow>
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
                          <th style={{ width: "60px" }}>{props.t("No")}</th>
                          <th>{props.t("Employee ID")}</th>
                          <th>{props.t("Employee Code")}</th>
                          <th>{props.t("Employee Name")}</th>
                          <th>{props.t("Employee Name ENG")}</th>
                          <th>{props.t("Department")}</th>
                          <th>{props.t("Position")}</th>
                          <th>{props.t("Role")}</th>
                          <th>{props.t("Employee Type")}</th>
                          {
                            props.loginPermission.length > 1 &&
                            <th
                              width = {
                                props.loginPermission.length > 2 ?
                                  props.loginPermission.includes("Unresign") ?
                                    `${(props.loginPermission.length-2)*60}px`
                                  : `${(props.loginPermission.length-1)*60}px`
                                : "60px"
                              }
                            >
                              {props.t("Action")}
                            </th>
                          }
                        </tr>
                      </thead>
                      <tbody>
                        {
                          props.employeeTable.map((emp, index) => {
                            return(
                              <tr key={index}>
                                <td width="60px">{ number++ }</td>
                                <td width="115px">{ emp.employee_id }</td>
                                <td width="115px">{ emp.code }</td>
                                <td width="115px">{ emp.name }</td>
                                <td width="115px">{ emp.name_eng }</td>
                                <td width="135px">
                                  {
                                    emp.departments.map((dept, i) => {
                                      return(
                                        (emp.departments.length > 1 &&
                                          emp.departments.length-1 !== i) ?
                                          dept.department_name + ", "
                                          : dept.department_name
                                      )
                                    })
                                  }
                                </td>
                                <td width="135px">
                                  {
                                    emp.positions.map((pos, i) => {
                                      return(
                                        (emp.positions.length > 1 &&
                                          emp.positions.length-1 !== i) ?
                                          pos.position_name + ", "
                                          : pos.position_name
                                      )
                                    })
                                  }
                                </td>
                                <td width="140px"> { emp.role_name }</td>
                                <td width="110px" className="permission">
                                  { emp.employee_type === 1 && "Permanent" }
                                  { emp.employee_type === 2 && "Part time" }
                                  { emp.employee_type === 3 && "Contract" }
                                  { emp.employee_type === 4 && "Indirect/Driver" }
                                </td>
                                {
                                  props.loginPermission.length > 1 &&
                                  <td className="pl-4">
                                    {
                                      emp.deleted_at === null && props.loginPermission.includes("Edit") &&
                                      <span className="mr-2 user-list-table text-center btn-action b-action">
                                        <CTooltip content={props.t("Edit")}>
                                          <CButton size="sm" className="edit-btn" onClick={() => props.editEmployee(emp.employee_id)}>
                                            <img alt="edit" className="span-icon" src="/image/edit.png" width="15px"/>                            
                                          </CButton>
                                        </CTooltip>
                                      </span>
                                    }
                                    {
                                      props.loginPermission.length > 0 && emp.deleted_at === null && props.loginPermission.includes("Delete") &&
                                      <span className="mr-2 user-list-table text-center btn-action b-action del-txt" id="delete-btn">
                                        <CTooltip content={props.t("Delete")}>
                                          <CButton size="sm" className="delete-btn" onClick={() => props.deleteData(emp.employee_id)} >
                                            <img alt="delete" className="span-icon" src="/image/delete.png" width="15px"/>                                    
                                          </CButton>
                                        </CTooltip>
                                      </span>
                                    }
                                    {
                                       props.loginPermission.length > 0 && props.loginPermission.includes("Detail") &&
                                       <span className="mr-2 user-list-table text-center btn-action b-action">
                                          <CTooltip content={props.t("Detail")}>
                                            <CButton size="sm" className="detail-btn" onClick={() => props.detailEmployee(emp.employee_id)}>
                                              <img alt="detail" className="span-icon" src="/image/detail.png" width="15px"/>
                                            </CButton>
                                          </CTooltip>
                                        </span>
                                    }
                                    {
                                      props.loginPermission.length > 0 && emp.deleted_at === null && props.loginPermission.includes("Resign") &&
                                        <span className="user-list-table text-center btn-action b-action del-txt" id="delete-btn">                                  
                                          <CTooltip content={props.t("Resign")}>
                                            <CButton size="sm" className="resign-btn" onClick={() => props.resignData(emp.employee_id)}>
                                              <img alt="resign" className="span-icon" src="/image/resign.png" width="15px"/>
                                            </CButton>
                                          </CTooltip>
                                        </span>
                                    }
                                    {
                                      props.loginPermission.length > 0 && emp.deleted_at !== null && props.loginPermission.includes("Unresign") &&
                                      <span colSpan={props.loginPermission.length -1}  id="delete-btn">
                                        <CTooltip content={props.t("Rehire")}>
                                          <CButton size="sm" className="rehire-btn" onClick={() => props.rehireData(emp.employee_id)}>
                                            <img alt="rehire" className="span-icon" src="/image/rehire.png" width="15px"/>
                                          </CButton>
                                        </CTooltip>
                                      </span>
                                    }
                                  </td>
                                }
                              </tr>
                            )
                          })
                        }
                        {
                          props.lastPage > 1 &&
                          <tr>
                            <td className="custom-pagination" colSpan="11">
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
export default ComponentEmployeeList;