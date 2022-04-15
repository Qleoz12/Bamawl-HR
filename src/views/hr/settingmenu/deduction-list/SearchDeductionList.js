import {
  CButton,
  CCol,
  CRow,
  CCard,
  CSelect,
  CImg,
  CLabel
} from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import DeductionListNameBox from './DeductionListNameBox'


const SearchDeductionList = props => {
  const { t } = useTranslation();
  let {
    deductionCategoryAPI,
    chooseCategoryName,
    otTitleChange,
    OTData,
    DeductionNameAPI,
    searchAPI,
  } = props;

  return (
    <>
      <DeductionListNameBox deductionCategoryAPI={deductionCategoryAPI} chooseCategoryName={chooseCategoryName} />
      <CCol lg="12">
        <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" />
        <CLabel style={{ fontWeight: "bold" }} id="lbDeductionName" className="title-lbl">{t('Deduction Name')}</CLabel>
      </CCol>
      <CCard className="panel-employee-deduction" style={{ height: "87px", background: "#fafbfc" }}>
        <div className="panel-name" style={{ width: "25%", minWidth: "250px" }}>
          <CSelect className="bamawl-select mt-2" onChange={otTitleChange} value={OTData} custom>
            <option key="" value="">{t('---Select Deduction Name---')}</option>
            {
              DeductionNameAPI != "" && props.DeductionNameAPI.length > 0 &&
              DeductionNameAPI.map((ot, index) => {
                return (
                  <option key={index} value={ot.deduction_name}>{ot.deduction_name.length > 40 ? ot.deduction_name.substring(0, 40) + "..." : ot.deduction_name}</option>
                )
              })
            }
          </CSelect>
        </div>
      </CCard>
      <br></br>
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }}>
          <CButton id="btnSearch" className="form-btn" onClick={() => searchAPI()}>{t('Search')}</CButton>
        </CCol>
      </CRow><br />
    </>
  )
}

export default SearchDeductionList
