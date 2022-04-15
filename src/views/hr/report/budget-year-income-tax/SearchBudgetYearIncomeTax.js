import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CInput } from '@coreui/react';
import DateFnsUtils from '@date-io/date-fns';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

const SearchBudgetYearIncomeTax = props => {
  const { t } = useTranslation();
  let {
    employeeID,
    employeeCode,
    employeeName,
    IdArr,
    codeArr,
    changeAutocomplete,
    selectAutocomplete,
    budgetYearState,
    handleBudgetDateChange,
    searchAPI,
    viewPermissionAPI
  } = props;

  useEffect(() => {
  });

  return (
    <>
      <CRow lg="12" style={{ marginBottom: '10px' }} className="">
        <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
          <label id="lblEmployeeID">{t('Employee ID')}<span className="required"></span></label><br />
          <div className="" style={{ display: 'grid' }}>
            <Autocomplete
              className="autocomplete-wrapper"
              disabled = {viewPermissionAPI === 0 ? true : false}
              onChange={(i) => changeAutocomplete('id', i)}
              onSelect={selectAutocomplete}
              items={IdArr}
              name={employeeID}
            />
          </div>
        </CCol>
        <CCol lg="4" style={{ borderRight: "1px solid #E3E5F1" }}>
          <label id="lblEmployeeCode">{t('Employee Code')}</label><br />
          <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
            <Autocomplete
              className="autocomplete-wrapper"
              disabled = {viewPermissionAPI === 0 ? true : false}
              onChange={(i) => changeAutocomplete('code', i)}
              onSelect={selectAutocomplete}
              items={codeArr}
              name={employeeCode}
            />
          </div>
        </CCol>
        <CCol lg="4">
          <label id="lblEmployeeName" disabled className="lbl-disable">{t('Employee Name')}</label><br />
          <div className="autocomplete-wrapper" style={{ display: 'grid' }}>
            <CInput className="lbl-disable" value={employeeName || ""} disabled />
          </div>
        </CCol>
      </CRow>
      <CRow lg="12" className="">
        <CCol lg="4">
          <label id="lblBudgetYear">{t('Budget Year')}<span className="required"></span></label>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="date-picker-dialog-td"
                name="txtBudgetYear"
                margin="normal"
                className="date-css"
                views={["year"]}
                openTo="year"
                placeholder="YYYY"
                format="yyyy"
                value={budgetYearState}
                key={budgetYearState}
                onChange={handleBudgetDateChange}
                clearable={true}
                InputProps={{ readOnly: true }}
                disabled={props.disabled}
              />
            </MuiPickersUtilsProvider>
          </div>
        </CCol>
      </CRow>
      <br />
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }}>
          <CButton id="btnSearch" className="form-btn" onClick={searchAPI}>{t('Search')}</CButton>
        </CCol>
      </CRow><br />
    </>
  )
}

export default SearchBudgetYearIncomeTax
