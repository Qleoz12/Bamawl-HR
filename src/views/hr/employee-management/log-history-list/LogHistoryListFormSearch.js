import React, { useEffect } from 'react';
import { CButton, CModal, CModalHeader, CModalBody, CButtonToolbar, CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import ErrorMessage from '../../../brycen-common/message/ErrorMessage';

const LogHistoryListFormSearch = props => {
  const { t } = useTranslation();
  let {
    errorModal,
    removeMessageModal,
    formSeachModalBox,
    autocompletedFormName,
    formNameSelect,
    formNameAPI,
    changeAutoFormName,
    btnAddFormSearchList,
    btnCloseFormSearchList,
  } = props;
  useEffect(() => {
  }, []);
  return (
    <>{
      <CModal centered closeOnBackdrop={false} show={formSeachModalBox} className='Modal'>
        <CModalHeader>Form Search List</CModalHeader>
        <CModalBody >
          <ErrorMessage error={errorModal} removeMessage={removeMessageModal} />
          <CInput placeholder="--search--" value={autocompletedFormName} onChange={(i) => changeAutoFormName(i)} /><br />
          <div className="scrollcard">
            <table className="table table-bordered table-hover" style={{ maxHeight: "222.22px" }} width="100%">
              <tbody >
                {
                  formNameAPI.map((ele, index) => {
                    return (
                      <tr key={index} onClick={() => formNameSelect(ele.form)}><td >{ele.form}</td></tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <br />
          <CButtonToolbar className="confirm-body" justify="end">
            <CButton className="confirm-btn" active onClick={() => btnAddFormSearchList(autocompletedFormName)}>{t('Add')}</CButton>
            <CButton className="reject-modal-btn" style={{ background: "#f4f4f4", margin: "1rem" }} onClick={btnCloseFormSearchList}>{t('Close')}</CButton>
          </CButtonToolbar>
        </CModalBody>
      </CModal>
    }</>
  )
}

export default LogHistoryListFormSearch
