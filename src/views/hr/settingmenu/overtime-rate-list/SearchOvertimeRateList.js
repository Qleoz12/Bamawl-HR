import { CButton, CCard, CCol, CFormGroup, CImg, CInputCheckbox, CLabel, CRow, CSelect } from '@coreui/react';
import React, { Fragment, useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const SearchOvertimeRateList = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>

    <CCol className="">
      <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" style = {{marginTop: "-3px"}}/>
      <CLabel id="lbShiftName" className="required">{t('Shift Name')}</CLabel>
    </CCol>
    <CCard className="panel ratelist" >
      <CRow className="panel-border">
        {
          props.shiftName.length > 0 &&
          props.shiftName.map((item, index) => {
            return (
              <Fragment key={index}>
                <div className="item-select" >
                  <label className="card" style={{ padding: "10px", width: "250px"}}>
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CLabel style={{ minWidth: "110px", fontWeight: "normal" }} variant="checkbox" className="form-check-label" htmlFor={`chkShift[${item.id}]`} >
                      {item.sn_name.length > 25 ? item.sn_name.substring(0, 25) + "..." : item.sn_name}
                      </CLabel>
                      <div className="float-right" style={{ marginLeft: "-10px" }}>
                        <CInputCheckbox id={`chkShift[${item.id}]`} name={item.sn_name} onChange={props.chooseShiftName} checked={item.is_checked == true} value={item.id} />
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
    <CCol className="">
      <CRow lg="12" className="">
        <CImg src={'avatars/list.png'} className="title-icon" alt="titleicon" style = {{marginLeft: "15px", marginTop: "3px"}}/>
        <CLabel id='lbOvertimeTitle' className="title-lbl required">{t('Overtime Title')}</CLabel>
        <CSelect className="bamawl-select drop-title" value={props.OTData} onChange={props.otTitleChange} custom>
          <option key="" value=""></option>
          {
            props.OTNameAPI.map(i => {
              return (<option key={i.overtime_name} value={i.overtime_name}> {i.overtime_name} </option>)
            })
          }
        </CSelect>
      </CRow>
    </CCol>
    <br></br>
    <CRow lg="12" className="ratelist">
      <CCol style={{ textAlign: "center" }}>
        <CButton id="btnSearch" className="form-btn" onClick={props.searchClick}>{t('Search')}</CButton>
      </CCol>
    </CRow><br />
  </>
  );
}

export default SearchOvertimeRateList;