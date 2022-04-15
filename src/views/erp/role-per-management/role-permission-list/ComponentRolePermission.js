/**
 * Role and Permission Form
 * @author Thin Thin Nwe
 * @create
*/

import React from "react";
import {
  CLink, CTooltip, CPagination, CButton, CCol, CRow, CFormGroup
} from "@coreui/react";
import { Link } from 'react-router-dom';

const ComponentRolePermission = (props) => {

    //use customize customer name 
    let customer_name = window.location.href.split("/")[3];

  return (
    <div>
      {
        props.total > 0 && props.detail === false &&
        <>
            <CRow className="mt-3 mb-3">
                <CCol lg="12">
                    <div className="table-responsive">
                        <table className="b-radius-1rem role-permission table">
                            <thead>
                                <tr>
                                    <th width="300px">{props.t('Admin Level')}</th>
                                    <th width="300px">{props.t('Action Name')}</th>
                                    <th width="200px">{props.t('Action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {
                                        props.main.map( (i, index) => {
                                            return(
                                                <tr key={index}>
                                                    <td>
                                                        <CLink onClick={props.click_admin_level.bind(this,i)}>{i.name}</CLink>
                                                    </td>
                                                    <td>
                                                        <CLink onClick={props.click_go_to_detail.bind(this,i)}>{props.t('Go to detail action name')}</CLink>
                                                    </td>
                                                    <td className="text-center border-none">
                                                        {
                                                            props.loginPermission.includes("Edit") &&                                                        
                                                            <CTooltip content={props.t('Edit')}>
                                                                <CButton onClick={props.Edit} data-ref={i.id} className="edit-btn" style={{marginRight: "10px"}}>
                                                                    <img alt="edit" className="span-icon" data-ref={i.id} src="/image/edit.png" width="15px"/>
                                                                </CButton>
                                                            </CTooltip>
                                                        }
                                                        {
                                                            props.loginPermission.includes("Delete") &&                                                        
                                                            <CTooltip content={props.t('Delete')}>
                                                                <CButton onClick={props.Delete} data-ref={i.id} className="delete-btn">
                                                                    <img alt="delete" className="span-icon" data-ref={i.id} src="/image/delete.png" width="15px"/>
                                                                </CButton>
                                                            </CTooltip>
                                                        }

                                                        <Link id="go_to_emp_list" to={{pathname:`/${customer_name}/erp/EmployeeManagement/EmployeeList`}} ></Link>
                                                        <Link id="go_to_assign_role_permission" to={{pathname:`/${customer_name}/erp/RoleandPermissionManagement/UserRoleandPermissionRegister`}} ></Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </>
                                <tr>
                                    <td className="custom-pagination" colSpan="3">
                                        {
                                            props.total > 10 &&
                                            <div className="mt-4">
                                                <CPagination
                                                    activePage={props.currentPage}
                                                    pages={props.lastPage}
                                                    dots={false}
                                                    arrows={false}
                                                    align="center"
                                                    firstButton="First page"
                                                    lastButton="Last page"
                                                    onActivePageChange={ (i) => props.change_paginate(i) }
                                                />
                                            </div>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CCol>
            </CRow>
        </>
      }

      {
          props.detail === true &&
          <>
              <CCol lg="12">
                  <CFormGroup row>
                      <CLink className="align-middle back-btn" onClick={props.click_back}>{props.t('<< Back')}</CLink>
                  </CFormGroup>
              </CCol>
              <CRow>
                  <CCol lg="12">
                      <div className="table-responsive">
                          <table className="b-radius-1rem table role-permission" style={ { minWidth: props.header.length * 120 } }>
                              <thead>
                                  <tr>
                                      <th width="500px">{props.t('Action Name')}</th>
                                      {
                                          props.header.map( (i, index) => {
                                              return(
                                                  <th key={index} width="200px" className="text-center">{i.name}</th>
                                              )
                                          })
                                      }
                                  </tr>
                              </thead>
                              <tbody>
                                  <>
                                      {
                                          props.detail_data.map( (i, idx) => {
                                              return(
                                                  <tr key={idx}>
                                                      <td width="500px">
                                                          {i.action_name}
                                                      </td>
                                                      {
                                                          i.levels.map( (ii, index2) => {
                                                              return(
                                                                  <td key={index2} width="200px" className="text-center">
                                                                      {
                                                                          ii.level_action === true &&
                                                                          <div className="circle"></div>
                                                                      }
                                                                      {
                                                                          ii.level_action === false &&
                                                                          <div className="cross"></div>
                                                                      }
                                                                  </td>
                                                              )
                                                          })
                                                      }
                                                  </tr>
                                              )
                                          })
                                      }
                                  </>
                              <tr><td className="custom-pagination" colSpan={props.header.length + 1}></td></tr>
                              </tbody>
                          </table>
                      </div>
                  </CCol>
              </CRow>
          </>
      }
    </div>
  );
};

export default ComponentRolePermission;