import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CLabel, CSelect } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import LogHistoryListStatusBox from './LogHistoryListStatusBox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchLogHistoryList = props => {
  const { t } = useTranslation();
  let {
    statusData,
    chooseStatus,
    platformData,
    platformChange,
    platformState,
    formNameState,
    formNameChange,
    showFormSearchBox,
    selectedFromDate,
    selectedToDate,
    handleFromDateChange,
    handleToDateChange,
    searchClick,
  } = props;
  useEffect(() => {
  });
  return (
    <>
      <CRow lg="12" className="my-4">
        <CCol lg="5" className="mb-4">
          <CLabel id="lblFromDate" className="required">{t('From Date')}</CLabel>
          <DatePicker id="txtFromDate" value={selectedFromDate} change={handleFromDateChange} />
        </CCol>
        <CCol lg="2">
          <div className="line"></div>
        </CCol>
        <CCol lg="5" className="mb-4">
          <CLabel id="lbToDate" className="required">{t('To Date')}</CLabel>
          <DatePicker id="txtToDate" value={selectedToDate} change={handleToDateChange} />
        </CCol>
      </CRow>
      <CRow lg="12" className="my-4">
        <CCol lg="5" className="mb-4">
          <label id="lbFormName">{t('Form Name')}</label>
          <TextField className="log-his-list-text" id="txtFormName" fullWidth value={formNameState} onChange={formNameChange} />
          <i className="fas fa-plus-circle fa-lg date-icon mx-lg-6"
            style={{ position: "absolute", color: "#B1AAF6", right: "25px", cursor: "pointer" }}
            onClick={showFormSearchBox}></i>
        </CCol>
        <CCol lg="2">
          <div className="line"></div>
        </CCol>
        <CCol lg="5" className="mb-4">
          <CLabel id="lbPlatform">{t('Platform')}</CLabel>
          <CSelect className="bamawl-select" value={platformState} onChange={platformChange} custom>
            <option key="" value=""></option>
            {platformData !== "" &&
              platformData.map((item, index) => {
                return (<option key={index} value={item.device_flag}> {item.name} </option>)
              })
            }
          </CSelect>
        </CCol>
      </CRow>
      <br />
      <CRow className="">
        <LogHistoryListStatusBox statusData={statusData} chooseStatus={chooseStatus} />
      </CRow>
      <br />
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }}>
          <CButton id="btnSearch" className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
        </CCol>
      </CRow><br />
    </>
  )
}

export default SearchLogHistoryList
