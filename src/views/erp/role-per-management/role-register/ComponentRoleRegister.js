/**
 * Role Register Form
 * @author Aye Min Aung
 * @create
 * @modify Thin Thin Nwe 30/4/2021
*/

import React from "react";
import {
  CModal, CModalBody, CTooltip, CPagination, CButton, CCard,
  CCardBody, CCol, CForm, CInput, CLabel, CRow, CFormGroup, CButtonToolbar
} from "@coreui/react";
import { useTranslation } from 'react-i18next';

const ComponentRoleRegister = (props) => {
  const{t} = useTranslation();
  let number = props.number

  return (
    <div>
      <CForm>
        <CCard className=" border-radius border-0">
          <CCardBody className="c-h-l">
            <CRow lg="12">
              <CCol xs="12" md="5">
                <CFormGroup>
                  <CLabel htmlFor="role-name">
                    {props.t("Enter The new Role")}<span className="require">*</span>
                  </CLabel>
                  <CInput
                    id="role-name"
                    value={props.roleName}
                    onChange={props.roleNameChange}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="5">
                <CFormGroup>
                  <CLabel htmlFor="role-description">{props.t("Description")}</CLabel>
                  <CInput
                    id="role-description"
                    value={props.description}
                    onChange={props.descriptionChange}
                  />
                </CFormGroup>
              </CCol>
              {
                props.loginPermission.includes("Save") &&              
                <CCol xs="12" md="2" className="btn-mt add-btn text-center">
                    <CButton className="form-btn" onClick={props.createRole}>
                      {props.t("Create Role")}
                    </CButton>
                </CCol>
              }
            </CRow>
          </CCardBody>
        </CCard>
      </CForm>

      {
        props.total > 0 && (
        <CForm className=" margin-top">
          <CRow id="table" sm="12">
            <CCol sm="12">
              <div style={{ color: "#046C0A" }}>{t("Total Rows").replace('%s', props.total)}</div>
              <div className="table-responsive">               
                <table className="table user-list-table" id="user-list-table">
                  <thead id="thead-id">
                    <tr>
                      <th style={{ width: "60px" }}>{props.t("No")}</th>
                      <th style={{ width: "300px" }}>{props.t("Category Name")}</th>
                      <th style={{ width: "530px" }}>{props.t("Description")}</th>
                      <th style={{ width: "100px" }} colSpan="2">
                        {props.t("Action")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {props.dataTable.map((i, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-left">{number++}</td>
                          <td className="text-left">{i.name}</td>
                          <td className="title text-left">{i.description}</td>                                                   
                          {
                            props.loginPermission.includes("Edit") &&                          
                            <td className="user-list-table btn-action">
                              <CTooltip content={props.t("Edit")}>
                                <CButton size="sm" className="edit-btn"
                                  onClick={() => {
                                    props.setId(i.id);
                                    props.setEditName(i.name);
                                    props.setEditDescription(i.description);
                                    props.setEditErr([])
                                    props.setSuccess([])
                                    props.setEdit(!props.edit);
                                  }}
                                >
                                  <img alt="edit" className="span-icon"
                                    src="/image/edit.png" width="15px" />
                                </CButton>
                              </CTooltip>
                            </td>
                          }
                          
                          {
                            props.loginPermission.includes("Delete") &&                          
                            <td className="user-list-table btn-action del-txt" id="delete-btn">
                              <CTooltip content={props.t("Delete")}>
                                <CButton size="sm" className="delete-btn"
                                  onClick={() => {
                                    props.setId(i.id);
                                    props.deleteRow()
                                  }}
                                >
                                  <img alt="delete" className="span-icon"
                                    src="/image/delete.png" width="15px" />
                                </CButton>
                              </CTooltip>
                            </td>
                          }
                        </tr>
                      );
                    })}
                    
                    {
                      props.lastPage > 1 &&                    
                      <tr>
                        <td className="custom-pagination" colSpan="6">
                          <br />
                          <CPagination
                            activePage={props.currentPage}
                            pages={props.lastPage}
                            dots={false}
                            arrows={false}
                            align="center"
                            firstButton="First page"
                            lastButton="Last page"
                            onActivePageChange={(i) => props.setActivePage(i)}
                          ></CPagination>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
                <br />
              </div>
            </CCol>
          </CRow>
        </CForm>
      )}      

      {/* CModal for Edit Button Action */}

      <CModal centered
        className="m-b-r edit_box" 
        show={props.edit} onClose={props.setEdit}
        closeOnBackdrop= {false}>
        {
          props.editErr.length > 0 && 
          <CCard className="error p-3 mt-3 mb-0 ml-3 mr-3">
            {props.editErr.map((data, index) => {
              return (
                <div className="pl-4" key={index}>
                  {data}
                </div>
              );
            })}
          </CCard>
        }
        
        <CModalBody className="border-0 p-4">        
          <CFormGroup row>
            <CCol xs="12" md="5">
              <CLabel htmlFor="cate-name">
                {props.t("Category Name")}<span className="require">*</span>
              </CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput
                id="cate-name"
                className="t-b-color not-allowed"
                value={props.edit_name}
                onChange={props.editNameChange}
              />
            </CCol>
          </CFormGroup>

          <CFormGroup row className="pt-2">
            <CCol xs="12" md="5">
              <CLabel htmlFor="cate-description">{props.t("Description")}</CLabel>
            </CCol>
            <CCol xs="12" md="7">
              <CInput
                id="cate-description"
                className="t-b-color"
                value={props.editDescription || ''}
                onChange={props.editDescriptionChange}
              />
            </CCol>
          </CFormGroup>          
        </CModalBody>
        <CButtonToolbar className="confirm-body" justify="center">
            <CButton className="confirm-btn" onClick={ props.editRow }>{props.t("Update")}</CButton>
            <CButton className="confirm-btn" onClick={() => props.setEdit(false)}>{props.t("Cancel")}</CButton>
        </CButtonToolbar>
      </CModal>
    </div>
  );
};

export default ComponentRoleRegister