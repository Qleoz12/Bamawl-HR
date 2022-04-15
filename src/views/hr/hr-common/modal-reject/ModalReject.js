
import { CButton, CButtonToolbar, CCard, CCol, CLabel, CModal, CModalBody, CModalHeader, CRow, CTextarea } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ModalReject = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });
  return (
    <>
      <CModal size="lg" centered closeOnBackdrop={false} show={props.modalReject}>
        <CModalHeader><h5>{t('Deny Reason')}</h5></CModalHeader>
        <CModalBody>
          <CRow id="approver-modal">
            <CCol lg="12">
              {
                props.errorModal.length > 0 &&
                <CCard className="custom-card error p-3 mb-3">
                  {
                    props.errorModal.map((data, index) => {
                      return (
                        <div key={index} >{data}</div>
                      )
                    })
                  }
                </CCard>
              }
              <CRow lg="12" style={{ marginBottom: '10px' }} className="mt-3">
                <CCol lg="2"></CCol>
                <CCol lg="2" ><CLabel htmlFor="reason" className="required">{t('Reason')}</CLabel></CCol>
                <CCol lg="6">
                  <CTextarea name="reason" id="txaReason" rows="3" placeholder="Remark" value={props.reason} onChange={props.changeReason} />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
          <CButtonToolbar className="confirm-body" justify="center">
            <CButton id="btnSave" className="confirm-btn" onClick={props.RejectOK}>{t('Save')}</CButton>
            <CButton id="btnClose" className="confirm-btn" onClick={props.closeModalReject}>{t('Close')}</CButton>
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    </>
  );
}
export default ModalReject;
