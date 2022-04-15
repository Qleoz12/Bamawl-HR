/**
 * Reset Password Form
 * @author Thin Thin Nwe
 * @create
 */

import React from 'react'
import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput, CRow,
  CInputGroup, CInputGroupPrepend, CInputGroupText, CImg
} from '@coreui/react'
import Message from '../../brycen-common/message/Message';
import CIcon from '@coreui/icons-react'
import message from '../../erp/erp-common/commonMessage'

const ComponentResetPassword = (props) => {

  let success = []

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-bg">
      <CContainer>
        {
          <CRow className="reset-form justify-content-center">
            <CCol>
              <CCardGroup>
                <CCard className="p-3 reset-pwd border-0">
                  <CCardBody className="p-3">
                    <CForm className="accSecurity">

                      <h2 className="txt-color mb-0">
                        {props.t("Account Security")}
                      </h2>
                      
                      <CRow>
                        <span className="d-block p-2 ">
                          { props.t("You are almost done. Please enter your new password below.") }
                          <br />
                          { props.t("This password will provide access to all services.") }
                        </span>
                        
                        <div className="w-100 ml-3 mr-3">
                          <Message success={success} error={props.error} error2={[]} />
                        </div>
                      </CRow>
                      
                      <CRow className="d-block pr-3 text-right">
                        <CButton className="mb-2 submit-btn text-white" style={{width: "auto"}} onClick={props.generatePassword}>
                          {props.t("Generate Password")}
                        </CButton>
                      </CRow>
                      
                      <CCol md="12" sm="12" xs="12" className="pl-0 pr-0">
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput className="pr-5" id="password" placeholder={props.t("Enter New Password")}
                            onChange={props.dataChange} name="password"
                            value={props.data.password || ''}  type={props.form_data.input_type}
                          />
                          <span className="eye" data-ref={props.form_data.eye_value} onClick={props.click_eye}>
                            <CImg src={`/image/${props.form_data.eye_type}`} width="18px" style={ { opacity: 0.8 } } draggable={false} />
                          </span>
                        </CInputGroup>
                        
                        <div className="reset-info-msg">
                          <div className="mt-1">
                              <CIcon name="cil-warning" size="sm" style={{marginBottom: "5px"}}/>
                              <font className="ml-1">{props.t(message.JSE018)}</font>
                          </div>
                        </div>
                        
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput className="form-control" placeholder={props.t("Enter Confirm Password")}
                             value={props.data.confirmPassword || ''} type={props.form_data.input_type}
                             autoComplete="password"  onChange={props.dataChange} name="confirmPassword" />
                        </CInputGroup>
                        
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-envelope-closed" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput className="form-control" type="email" placeholder={props.t("Enter Email")}
                             autoComplete="email" onChange={props.dataChange} name="email" />
                        </CInputGroup>
                        
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basiaddon1"><i className="fas fa-key"></i></span>
                            </div>
                            <CInput className="form-control" type="text" placeholder={props.t("Enter Token")}
                             onChange={props.dataChange} name="token" />
                        </div>
                      
                        <CCol className="w-100 pl-0" style={{ marginTop: "2.5rem" }}>                            
                          <CButton className="submit-btn text-white" onClick={props.Submit}>{props.t("Submit")}</CButton>
                        </CCol>
                      </CCol>                                            
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

export default ComponentResetPassword