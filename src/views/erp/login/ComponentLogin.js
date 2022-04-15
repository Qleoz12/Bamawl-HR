/**
 * Login Component
 * @author Thin Thin Nwe
 * @create 22/4/2021
 */

 import React from 'react'
 import {
  CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInput,
  CLabel, CRow, CInputGroup, CInputGroupPrepend, CInputGroupText
} from '@coreui/react'
import Message from '../../brycen-common/message/Message';
import CIcon from '@coreui/icons-react'
 
 const ComponentLogin = (props) => {
 let success = []

  return (
    <div className="c-app c-default-layout flex-row align-items-center login-bg">
      <CContainer>        
        <CRow className="login-form justify-content-center">
          <CCol>
            <CCardGroup>
              <CCard className="p-3 login border-0">
                <CCardBody>
                  <CForm>
                    <h2 className="txt-color">
                      Brycen ERP
                      <span className="font-xl font-weight-normal"> {props.t("System")}</span>
                    </h2>
                    <CLabel className="mb-4 font-lg">{props.t("Admin/User")}</CLabel>
                    
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
                      <CInput type="text" placeholder={props.t("Employee Code OR ID")}
                        autoComplete="username" onChange={props.idChange} />
                    </CInputGroup>
                    
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder={props.t("Password")}
                        autoComplete="current-password" onChange={props.passwordChange} />
                    </CInputGroup>

                    <CRow className="mb-1">
                      <CCol className="text-left">
                        <CButton onClick={props.forgotPassword} className="px-0 txt-color font-xs" >{props.t("Forgot password")}?</CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol className="w-100 text-center">
                        <CButton className="mb-3 login-btn text-white" onClick={props.login} >{props.t("Login")}</CButton>
                      </CCol>
                    </CRow>

                    <CRow md="12">
                      <CCol className="text-center lang-all">
                          <CButton className="txt-color font-xs lang p-0 mr-1" onClick={props.changeLanguage}>
                              <img src="/image/english.png" alt="English logo" name="en"
                              className="d-block" />
                              {props.t("English")}
                          </CButton>

                          <CButton className="txt-color font-xs lang p-0 m-1" onClick={props.changeLanguage}>
                              <img src="/image/myanmar.png" alt="Myanmar logo" name="mm"
                              className="d-block" />
                              {props.t("Myanmar")}
                          </CButton>

                          {/* <CButton className="txt-color font-xs lang p-0 ml-1" onClick={props.changeLanguage}>
                              <img src="/image/japan.png" alt="Japan logo" name="jp"
                              className="d-block" />
                              {props.t("Japan")}
                          </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ComponentLogin