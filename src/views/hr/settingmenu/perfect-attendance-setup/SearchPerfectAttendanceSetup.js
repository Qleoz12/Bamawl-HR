import { CButton, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';
import DatePicker from '../../hr-common/datepicker/DatePicker';
const SearchPerfectAttendanceSetup = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    <CRow>
      <CCol className="mb-4 verticle-line" lg="4">
        <CLabel>{t('Employee ID')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            onChange={(i) => props.changeAutocomplete('id', i)}
            onSelect={props.selectAutocomplete}
            items={props.idArr}
            name={props.empID}
            disabled={!isEmpty(props.editData) || parseInt(props.viewPermissionAPI) === 0 ? true : false}
            autoFocus={isEmpty(props.editData) ? true : false}
          />
        </div>
      </CCol>
      <CCol className="mb-4 verticle-line" lg="4">
        <CLabel>{t('Employee Code')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            onChange={(i) => props.changeAutocomplete('code', i)}
            onSelect={props.selectAutocomplete}
            items={props.codeArr}
            name={props.empCode}
            disabled={!isEmpty(props.editData) || parseInt(props.viewPermissionAPI) === 0 ? true : false}
          />
        </div>
      </CCol>
      <CCol className="mb-4" lg="4">
        <CLabel>{t('Employee Name')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            onChange={(i) => props.changeAutocomplete('name', i)}
            onSelect={props.selectAutocomplete}
            items={props.nameArr}
            name={props.empName}
            disabled={!isEmpty(props.editData) || parseInt(props.viewPermissionAPI) === 0 ? true : false}
          />
        </div>
      </CCol>
    </CRow>
    <CRow lg="12" style={{ paddingBottom: '10px' }}>
      <CCol lg="5" className="mb-4">
        <CLabel>{t('Department')}</CLabel>
        <CSelect className="bamawl-select" value={!isEmpty(props.editData) ? props.deptState : props.deptID} onChange={props.changeDept} disabled={!isEmpty(props.editData) ? true : false} custom>
          <option key="" value="">{t('---Select Department---')}</option>
          {
            props.deptArr.map(i => {
              return (<option key={i.id} value={i.id}> {i.department_name} </option>)
            })
          }
        </CSelect>
      </CCol>
      <CCol lg="2">
        <div className="line"></div>
      </CCol>
      <CCol lg="5" className="mb-4">
        <CLabel>{t('Role')}</CLabel>
        <CSelect className="bamawl-select" value={!isEmpty(props.editData) ? props.roleState : props.roleID} onChange={props.changeRole} disabled={!isEmpty(props.editData) ? true : false} custom>
          <option key="" value="">{t('---Select Role---')}</option>
          {
            props.roleArr.map(i => {
              return (<option key={i.id} value={i.id}> {i.admin_level_name} </option>)
            })
          }
        </CSelect>
      </CCol>
    </CRow>
    <br></br>
    { /* From Date To Date */}
    <CRow>
      <CCol lg="5" className="mb-4">
        <CLabel className="">{t('Joined Date (From)')}</CLabel>
        <DatePicker id="dateFromDate" value={!isEmpty(props.editData) ? props.joinDate : props.fromDate} change={props.changeFromDate} disabled={!isEmpty(props.editData) ? true : false} />
      </CCol>
      <CCol lg="2">
        <div className="line"></div>
      </CCol>
      <CCol lg="5" className="mb-4">
        <CLabel className="">{t('Joined Date (To)')}</CLabel>
        <DatePicker id="dateToDate" value={!isEmpty(props.editData) ? props.joinDate : props.toDate} change={props.changeToDate} disabled={!isEmpty(props.editData) ? true : false} />
      </CCol>
    </CRow>
    <br></br>
    <CRow lg="12">
      <CCol className="t-align-center">
        <CButton
          id="btnSearch"
          className="form-btn"
          onClick={props.searchAPI}
          hidden={!isEmpty(props.editData)}>
          {t("Search")}
        </CButton>
      </CCol>
    </CRow>
    <br />
  </>
  );

}

export default SearchPerfectAttendanceSetup;