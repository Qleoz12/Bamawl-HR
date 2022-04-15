import React from 'react'
import {
  CRow, CCol, CCard, CCardBody, CCardHeader, CCardFooter,
  CButton, CFormGroup, CLabel, CInputCheckbox
} from '@coreui/react'

const BlockPackage = (props) => {

  return (
    <>
      <CCard>        
        <CCard className="rounded-0 mt-0 box_style">
          <CCardHeader className="rounded-0 pl-4 bg-transparent font-lg">
            {props.t("Check the Package to be assigned")}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" md="12">
                {
                  props.packageInfo.length > 0 &&
                  props.packageInfo.map((pInfo, index) => {
                  return(
                    <CCol md="6" className="emp_pkg" key={index}>
                      <CCardBody className="pl-3 package-body">
                        <CFormGroup variant="checkbox" className="checkbox">
                            <div className="d-inline">
                              <CFormGroup row className="ml-2 mb-2 form-check-label">
                                <div className="d-inline-block package-block">
                                  <CLabel variant="checkbox" className="package" htmlFor={pInfo.package_name}>
                                    {pInfo.package_name}
                                  </CLabel>
                                </div>                                  
                                <CInputCheckbox
                                  onChange={(e) => {props.checkPackage(e, pInfo.pk_id, pInfo.package_name)}}
                                  id ={pInfo.package_name} name='chk_status'
                                  checked={pInfo.chk_status}
                                />
                              </CFormGroup>
                            </div>
                        </CFormGroup>
                      </CCardBody>
                    </CCol>                    
                  )
                })}
              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter className="pt-0 text-center">
          {
            ((props.btnSaveEdit === "Save" && props.loginPermission.includes("Save")) ||
             (props.btnSaveEdit === "Update" && props.loginPermission.includes("Update"))) &&
            <CFormGroup>
              <CButton className="form-btn" type="submit" onClick={(e) => props.Save(e)} value={props.btnSaveEdit}>
                {props.t(props.btnSaveEdit)}
              </CButton>
            </CFormGroup>
          }
          </CCardFooter>
        </CCard>              
      </CCard>
    </>
  )
}

export default BlockPackage