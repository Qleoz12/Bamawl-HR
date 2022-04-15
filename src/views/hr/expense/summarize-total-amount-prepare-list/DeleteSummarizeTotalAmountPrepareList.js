import { CButton, CCol, CRow } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DeleteSummarizeTotalAmountPrepareList = props => {
  const { t } = useTranslation();
  let {
    listSummarizeTotalAmount,
    deleteToggleAlert,
  } = props;

  return (
    <>
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }}>
          {
            listSummarizeTotalAmount != "" &&
            <CButton className="form-btn" id='deleteBtn' name='deleteBtn' onClick={deleteToggleAlert}  >
              {t('Delete')}
            </CButton>
          }
        </CCol>
      </CRow>
    </>
  )
}

export default DeleteSummarizeTotalAmountPrepareList
