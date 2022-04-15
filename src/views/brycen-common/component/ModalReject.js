
import { CButton, CButtonToolbar, CCard, CLabel, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ModalReject = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });
  return (
    <>
      {props.modalReject === true && (
        <CModal centered closeOnBackdrop={false} className='saveModal' htmlFor='saveBtn' show={props.modalReject} onClose={props.closeModalReject}>
          <CModalHeader closeButton><h4 className="font-weight-bold">{t('Denied Reason')}</h4></CModalHeader>
          {/* Error */}
          {props.errorModal && props.errorModal.length > 0 &&
              <CCard className="custom-card error p-2 mt-3">
                {
                  props.errorModal.map((data, index) => {
                    return (
                      <div key={index} className="msg">
                        {data}
                        <span>
                          <CButton className="btn btn-danger remove-err-reject" onClick={props.removeMessage}>X</CButton>
                        </span>
                      </div>
                    )
                  })}
              </CCard>
            }
          <CModalBody style={{ display: "flex" }}>
            <CLabel className="mt-4 mr-3 font-weight-bold">{t("Reason")}<span className="required">*</span></CLabel>
            <textarea id="w3review" name="w3review" rows="4" cols="50" placeholder={t("Reason")} style={{ resize: "none", marginLeft: "15px", marginRight: "5px" }} value={props.reason} onChange={props.changeReason}>
              {/* {t("At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies")} */}
            </textarea>

          </CModalBody>
          <CModalFooter>
            <CButtonToolbar className="confirm-body" justify="end">
              <CButton className="confirm-btn" style={{ marginRight: "0px" }} active onClick={props.RejectOK}>{t('Save')}</CButton>
              <CButton className="cancel-btn" style={{ borderColor: "gainsboro", backgroundColor: "gainsboro" }} onClick={props.closeModalReject}>{t('Close')}</CButton>
            </CButtonToolbar>
          </CModalFooter>
        </CModal>
      )}
    </>
  );
}
export default ModalReject;
