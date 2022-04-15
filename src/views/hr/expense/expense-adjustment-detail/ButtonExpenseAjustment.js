/* eslint-disable eqeqeq */
import { CCard, CCol, CRow,CButton } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ApproverTable = props => {
  const { t } = useTranslation();
  let {
    confirmClick,
    rejectClick,
    downloadClick,
    historyFlag,
    confirmFlag
  } = props;

  return (
      <>
      {historyFlag &&
    (
        <CRow lg="12" className="mt-3">
        <CCol className="d-flex justify-content-center flex-wrap">
            {
                confirmFlag==true&&(
                <>
                <CButton
                className="form-btn mt-3"
                onClick={confirmClick}
                >{t('Confirm')}
                </CButton>
                <CButton
                    className="form-btn mr-md-3 ml-3 mt-3 mr-sm-3"
                    onClick={rejectClick}
                >{t('Reject')}
                </CButton>
                </>
                )
            }
            <CButton
                className="form-btn mt-3"
                onClick={downloadClick}
            ><i className="fas fa-download mr-1 "></i>{t('Download')}
            </CButton>
        </CCol>
    </CRow>
    )}
      </>
  )

}

export default ApproverTable
