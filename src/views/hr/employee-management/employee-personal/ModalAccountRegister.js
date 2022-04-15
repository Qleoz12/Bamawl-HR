
import { CButton, CCard, CCardBody, CCol, CImg, CModal, CModalBody, CModalHeader, CRow } from '@coreui/react';
import { TextField } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ModalAccountRegister = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });
  return (
    <>
      {props.addModalBox === true && (
        <div>
          <CModal
            size="lg"
            centered
            closeOnBackdrop={false}
            className="addModal"
            htmlFor="addBtn"
            show={props.addModalBox}
            onClose={props.addOnClose}
          >
            <CModalHeader>
              <h5><label>{t('Account Register')}</label></h5>
            </CModalHeader>
            {
              <CModalBody style={{ padding: '2rem' }}>
                <CCardBody>
                  {/* Error */}
                  {props.errorModal && props.errorModal.length > 0 &&
                    <CCard className="custom-card error p-3 mb-5" style={{ margin: "-40px" }}>
                      {
                        props.errorModal.map((data, index) => {
                          return (
                            <div key={index} className="msg">
                              {data}
                              <span>
                                {/* <CButton className="btn btn-danger remove-err" onClick={props.removeMessage}>X</CButton> */}
                              </span>
                            </div>
                          )
                        })}
                    </CCard>
                  }
                  <CRow>
                    <CCol lg="2"></CCol>
                    <CCol lg="8">
                      <div style={{ display: "flex" }}>
                        <CImg
                          src={"avatars/usdIcon.png"}
                          style={{ marginTop: "2px", width: "15px", height: "15px", marginRight: "5px" }}
                          alt="currencyicon"
                        />
                        <h5><b>{t('Account Number')}</b></h5>
                      </div>
                    </CCol>
                    <CCol lg="2"></CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="2"></CCol>
                    <CCol lg="8">
                      <div style={{ display: "flex" }}>
                        <TextField
                          id="txtAccountNumber"
                          fullWidth
                          placeholder="Account Number"
                          className="employee-personal-input"
                          value={props.accountNumber}
                          autoFocus={true}
                          onChange={props.accountNumberChange} />
                      </div>
                    </CCol>
                    <CCol lg="2"></CCol>
                  </CRow>
                </CCardBody>
                <CRow>
                  <CCol style={{ textAlign: "center" }}>
                    <CButton className="form-btn"
                      id='btnSave'
                      name='btnSave'
                      onClick={props.saveAccount}
                    >{t('Save')}
                    </CButton>
                    <CButton className="form-btn"
                      id='btnSave'
                      name='btnSave'
                      onClick={props.addOnClose}
                      style={{ margin: "15px" }}
                    >{t('Close')}
                    </CButton>
                  </CCol>
                </CRow>
                {/* end button save */}
              </CModalBody>
            }
          </CModal>
        </div>
      )}
    </>
  );
}
export default ModalAccountRegister;
