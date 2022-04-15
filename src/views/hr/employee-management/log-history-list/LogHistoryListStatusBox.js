import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CFormGroup, CLabel, CCard, CInputCheckbox } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';

const LogHistoryListStatusBox = props => {
  const { t } = useTranslation();
  let {
    statusData,
    chooseStatus,
  } = props
  useEffect(() => {
  });
  return (
    <>
      <CCol lg="12">
        <CRow style={{ height: "30px" }} lg="12">
          <CCol>
            {/* <CImg src={'avatars/list.png'} className="title-icon log-history-list-title-icon" alt="titleicon" /> */}
            <CLabel id="lbStatus" className="log-history-list-label required">{t('Status')}</CLabel>
          </CCol>
        </CRow>
      </CCol>
      <CCard className="panel mx-5" >
        <CRow className="panel-border">
          {
            statusData.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="item-select" >
                    <label className="card" style={{ padding: "10px", width: "150px", marginBottom: "unset" }}>
                      <CFormGroup variant="checkbox">
                        <CLabel variant="checkbox" className="form-check-label"
                          htmlFor={`chkStatus[${item.op_flag}]`} >{item.name}</CLabel>
                        <div className="float-right" >
                          <CInputCheckbox id={`chkStatus[${item.op_flag}]`} name={item.name} onChange={chooseStatus}
                            checked={item.is_checked === true} value={item.op_flag} style={{ cursor: "pointer" }} />
                        </div>
                      </CFormGroup>
                    </label>
                  </div>
                </Fragment>
              )
            })
          }
        </CRow>
      </CCard>
    </>
  )
}

export default LogHistoryListStatusBox
