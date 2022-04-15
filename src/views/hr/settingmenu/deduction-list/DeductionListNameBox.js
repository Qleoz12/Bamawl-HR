import {
  CCard,
  CCol,
  CFormGroup,
  CImg,
  CInputRadio,
  CLabel,
  CRow
} from '@coreui/react'
import React from 'react'
import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

export const DeductionListNameBox = (props) => {
  const { t } = useTranslation();
  let {
    deductionCategoryAPI,
    chooseCategoryName,
  } = props

  return (
    <>
      <CCol>
        <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon"  />
        <CLabel style={{ fontWeight: "bold" }} id="lbDeductionCategory" className="label">{t('Deduction Category')}</CLabel>
      </CCol>
      <CCard className="panel" >
        <CRow className="panel-border">
          {
            deductionCategoryAPI.length > 0 &&
            deductionCategoryAPI.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className="item-select" >
                    <label className="card" style={{ padding: "10px" }}>
                      <CFormGroup variant="custom-radio">
                        <CLabel className="form-check-label" variant="checkbox" htmlFor={item.description}>{item.description}</CLabel>
                        <div className="float-right" style={{ marginLeft: "50px" }} >
                          <CInputRadio name="selectDN" onChange={chooseCategoryName} className="form-check-input"
                            id={item.description} value={item.id} />
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
export default DeductionListNameBox;
