/**
 * Forget Password Form
 * @author Thin Thin Nwe
 * @create
 */

import React from 'react'
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput,
  CLabel, CRow, CButtonToolbar, CInputGroup, CInputGroupPrepend, CInputGroupText
} from '@coreui/react'
import Message from '../../brycen-common/message/Message';
import CIcon from '@coreui/icons-react'

const ComponentForgotPassword = (props) => {

  let success = []

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-bg">
      <CContainer>
        {
          props.formChange === "submit" &&
          <CRow className="reset-form justify-content-center">
            <CCol>
              <CCardGroup>
                <CCard className="p-3 reset-pwd border-0">
                  <CCardBody>
                    <CForm>
                      <h2 className="txt-color">
                        Reset
                        <font className="font-xl font-weight-normal"> Password</font>
                      </h2>
                      
                      <CRow>
                        <span className="w-100 d-block txt-block font-lg">                            
                          { props.success }
                        </span>
                        
                        <CCol className="w-100">
                          <CButton className="mb-3 ok-btn text-white" onClick={props.ok} >{props.t("OK")}</CButton>
                        </CCol>
                      </CRow>                                            
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        }

        {
          props.formChange !== "submit" &&
          <CRow className="forgot-form justify-content-center">
            <CCol>
              <CCardGroup>
                <CCard className="p-3 reset-pwd border-0">
                  <CCardBody className="pl-0 pr-0">
                    <CForm>
                      <div style={{padding:"0 1.25rem"}}>
                        <h2 className="txt-color">
                          Reset
                          <font className="font-xl font-weight-normal"> Password</font>
                        </h2>
  
                        <CLabel className="mb-4">
                          {props.t("Please enter your ID and Email address")}
                        </CLabel>
  
                        <CRow>
                          <CCol>
                              <Message success={success} error={props.error} error2={[]} />
                          </CCol>
                        </CRow>

                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name={'cil-user'} />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder={props.t("Employee ID")}
                            name="employee_id" onChange={props.dataChange}/>
                        </CInputGroup>
                        
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-closed" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput className="form-control" type="email" placeholder={props.t("Email")}
                             autoComplete="email" onChange={props.dataChange} name="email" />
                        </CInputGroup>
                      </div>
                      <CButtonToolbar className="mt-5" justify="center">
                        <CButton className="reset-btn text-white" onClick={props.Back}>{props.t("Back")}</CButton>
                        <CButton className="reset-btn text-white" onClick={props.mailSubmit}>{props.t("Submit")}</CButton>
                     </CButtonToolbar>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        }        
      </CContainer>
    </div>
  )
}

export default ComponentForgotPassword