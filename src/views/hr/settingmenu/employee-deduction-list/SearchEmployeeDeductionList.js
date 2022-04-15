/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CLabel, CImg, CCard, CButtonGroup, CSelect } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Select } from "@material-ui/core";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
const SearchEmployeeDeductionList = props => {
  const { t } = useTranslation();
  let {
    deductionOptionChange,
    deductionOptionState,
    departmentAPI, deptState, deptChange,
    roleAPI, roleState, roleChange,
    deductionCategoryAPI, deductionCategoryState, deductionCategoryChange,
    deductionRulesAPI, deductionRulesState, deductionRulesChange,
    fromDateState, handleFromDateChange,
    toDateState, handleToDateChange,
    selectAutocomplete,
    idArr,
    empID,
    codeArr,
    empCode,
    changeAutocomplete,
    nameArr,
    empName,
    searchAPI,
    viewPermissionAPI
  } = props;
  useEffect(() => {
  });

  return (
    <>
      <CRow className="">
        <CCol>
          <CImg src={'avatars/list.png'} alt="titleicon" className="title-icon" />
          <CLabel style={{ fontWeight: "bold" }} id="lbDeductionForEmployee" className="title-lbl">{t('Deduction For Employee')}</CLabel>
        </CCol>
        <CCol style={{ marginRight: "-25px" }}>
          <CCard className="employee-deduction-list-card">
            <CButtonGroup >
              <CButton onClick={deductionOptionChange} disabled={parseInt(viewPermissionAPI)=== 0 || parseInt(viewPermissionAPI)=== 2 ? true : false} value={2} id="btnIndivial" name="btnIndivial"
                className={deductionOptionState == 2 ? "btn-active" : ""}>{t('Individual')}</CButton>
              <CButton onClick={deductionOptionChange} disabled={parseInt(viewPermissionAPI)=== 0 || parseInt(viewPermissionAPI)=== 2 ? true : false} value={1} id="btnAll" name="btnAll"
                className={deductionOptionState == 1 ? "btn-active" : ""}>{t('All')}</CButton>
            </CButtonGroup>
          </CCard>
        </CCol>
      </CRow>
      <div>
        {
          deductionOptionState == 2 &&
          <>
            <CRow>
              <CCol lg="5" className="mb-4">
                <CLabel style={{ fontWeight: "bold" }}>{t('Department')}</CLabel>
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
                <CLabel style={{ fontWeight: "bold" }}>{t('Role')}</CLabel>
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
                <CLabel style={{ fontWeight: "bold" }} id="lblJoinedDateFrom">{t('Joined Date (From)')}</CLabel>
                <DatePicker change={handleFromDateChange} value={fromDateState} />
              </CCol>
              <CCol lg="2">
                <div className="line"></div>
              </CCol>
              <CCol lg="5" className="mb-4">
                <CLabel style={{ fontWeight: "bold" }} id="lblJoinedDateTo">{t('Joined Date (To)')}</CLabel>
                <DatePicker change={handleToDateChange} value={toDateState} />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-4" lg="5">
                <CLabel style={{ fontWeight: "bold" }}>{t('Employee ID')}</CLabel>
                <Autocomplete
                  className="autocomplete-wrapper"
                  disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                  id="txtEmployeeID"
                  onChange={(i) => changeAutocomplete('id', i)}
                  onSelect={selectAutocomplete}
                  items={idArr}
                  name={empID}
                />
              </CCol>
              <CCol lg="2">
                <div className="line"></div>
              </CCol>
              <CCol className="mb-4" lg="5">
                <CLabel style={{ fontWeight: "bold" }}>{t('Employee Code')}</CLabel>
                <Autocomplete
                  className="autocomplete-wrapper"
                  disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                  id="txtEmployeeCode"
                  onChange={(i) => changeAutocomplete('code', i)}
                  onSelect={selectAutocomplete}
                  items={codeArr}
                  name={empCode}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="mb-4" lg="5">
                <CLabel style={{ fontWeight: "bold" }}>{t('Employee Name')}</CLabel>
                <Autocomplete
                  className="autocomplete-wrapper"
                  disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                  id="txtEmployeeName"
                  onChange={(i) => changeAutocomplete('name', i)}
                  onSelect={selectAutocomplete}
                  items={nameArr}
                  name={empName}
                />
              </CCol>
            </CRow>
          </>
        }
        <CRow>
          <CCol lg="5" className="mb-4">
            <CLabel style={{ fontWeight: "bold" }}>{t('Deduction Category')}</CLabel>
            <CSelect className="bamawl-select" value={deductionCategoryState} onChange={deductionCategoryChange} custom>
              <option key="" value=""></option>
              {
                deductionCategoryAPI != "" &&
                deductionCategoryAPI.map((dedcutCaculate, index) => {
                  return (<option key={index} value={dedcutCaculate.id}>{dedcutCaculate.description}</option>)
                })
              }
            </CSelect>
          </CCol>
          <CCol lg="2">
            <div className="line"></div>
          </CCol>
          <CCol lg="5" className="mb-4">
            <CLabel style={{ fontWeight: "bold" }}>{t('Deduction Name')}</CLabel>
            <CSelect className="bamawl-select" value={deductionRulesState} onChange={deductionRulesChange} custom>
              <option key="" value=""></option>
              {
                deductionRulesAPI != "" &&
                deductionRulesAPI.map((dedductionName, index) => {
                  return (
                    <option key={index} value={dedductionName.deduction_name}>{dedductionName.deduction_name}</option>
                  )
                })
              }
            </CSelect>
          </CCol>
        </CRow>
        <CRow lg="12">
          <CCol lg="12" style={{ textAlign: "center" }}>
            <CButton className="form-btn" onClick={() => searchAPI()} id="btnSearch" name="btnSearch" >{t('Search')}</CButton>
          </CCol>
        </CRow><br />
      </div>
    </>
  );
}
export default SearchEmployeeDeductionList;