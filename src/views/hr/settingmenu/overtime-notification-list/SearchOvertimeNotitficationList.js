import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CSelect, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchOvertimeNotitficationList = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });
  let {
    roleState,
    deptChange,
    deptState,
    departmentAPI,
    roleAPI,
    roleChange,
    searchClick,
    handleFromDateChange,
    selectedFromDate,
    handleToDateChange,
    selectedToDate,
    selectAutocomplete,
    idArr,
    empID,
    codeArr,
    empCode,
    changeAutocomplete,
    nameArr,
    empName,
    viewPermissionAPI
  } = props

  return (
    <>
      <CRow>
        <CCol className="mb-4 verticle-line" lg="4">
          <CLabel>{t('Employee ID')}</CLabel>
          <div className="expense-autocomplete">
            <Autocomplete
              disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
              id="txtEmployeeID"
              autoFocus
              onChange={(i) => changeAutocomplete('id', i)}
              onSelect={selectAutocomplete}
              items={idArr}
              name={empID}
            />
          </div>
        </CCol>
        <CCol className="mb-4 verticle-line" lg="4">
          <CLabel>{t('Employee Code')}</CLabel>
          <div className="expense-autocomplete">
            <Autocomplete
              disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
              id="txtEmployeeCode"
              onChange={(i) => changeAutocomplete('code', i)}
              onSelect={selectAutocomplete}
              items={codeArr}
              name={empCode}
            />
          </div>
        </CCol>
        <CCol className="mb-4" lg="4">
          <CLabel>{t('Employee Name')}</CLabel>
          <div className="expense-autocomplete">
            <Autocomplete
              disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
              id="txtEmployeeName"
              onChange={(i) => changeAutocomplete('name', i)}
              onSelect={selectAutocomplete}
              items={nameArr}
              name={empName}
            />
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg="5" className="mb-4">
          <CLabel id="lblDepartment">{t('Department')}</CLabel>
          <CSelect className="bamawl-select" value={deptState} onChange={deptChange} custom>
            <option key="" value="">{t('---Select Department---')}</option>
            {
              departmentAPI.map(i => {
                return (<option key={i.id} value={i.id}> {i.department_name} </option>)
              })
            }
          </CSelect>
        </CCol>
        <CCol lg="2">
          <div className="line"></div>
        </CCol>
        <CCol lg="5" className="mb-4">
          <CLabel id="lblRole">{t('Role')}</CLabel>
          <CSelect className="bamawl-select" value={roleState} onChange={roleChange} custom>
            <option key="" value="">{t('---Select Role---')}</option>
            {
              roleAPI.map(i => {
                return (<option key={i.id} value={i.id}> {i.admin_level_name} </option>)
              })
            }
          </CSelect>
        </CCol>
      </CRow>
      <CRow lg="12" className="mar-search">
        <CCol lg="5" className="mb-4">
          <CLabel id="lblJoinedDateFrom">{t('Joined Date (From)')}</CLabel>
          <DatePicker change={handleFromDateChange} value={selectedFromDate} />
        </CCol>
        <CCol lg="2">
          <div className="line"></div>
        </CCol>
        <CCol lg="5" className="mb-4">
          <CLabel id="lblJoinedDateTo">{t('Joined Date (To)')}</CLabel>
          <DatePicker change={handleToDateChange} value={selectedToDate} />
        </CCol>
      </CRow>
      <br />
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }}>
          <CButton style={{ marginLeft: "20px" }} id="btnSearch" className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
        </CCol>
      </CRow><br />
    </>
  );
}
export default SearchOvertimeNotitficationList;