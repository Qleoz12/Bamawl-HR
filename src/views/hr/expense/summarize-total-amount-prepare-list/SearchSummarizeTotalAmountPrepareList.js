import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CSelect, CLabel } from '@coreui/react';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const SearchSummarizeTotalAmountPrepareList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        appliedFromDate,
        appliedToDate,
        selectAppliedFromDate,
        selectAppliedToDate,
        selectPosition,
        positionID,
        position,
        searchClick,
        selectExpenseDepartmentName,
        expenseDepartmentID,
        selectDepartmentName,
        departmentID,
        department,
        selectAutocomplete,
        idArr,
        empID,
        codeArr,
        empCode,
        empName,
        nameArr,
        changeAutocomplete,
    } = props

    return (<>
        <CRow>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblEmployeeID">{t('Employee ID')}</CLabel>
                <Autocomplete
                    className="autocomplete-wrapper"
                    id="txtEmployeeID"
                    autoFocus
                    onChange={(i) => changeAutocomplete('id', i)}
                    onSelect={selectAutocomplete}
                    items={idArr}
                    name={empID}
                />
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblEmployeeCode">{t('Employee Code')}</CLabel>
                <Autocomplete
                    id="txtEmployeeCode"
                    className="autocomplete-wrapper"
                    onChange={(i) => changeAutocomplete('code', i)}
                    onSelect={selectAutocomplete}
                    items={codeArr}
                    name={empCode}
                />
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel id="lblEmployeeName">{t('Employee Name')}</CLabel>
                <Autocomplete
                    id="txtEmployeeName"
                    className="autocomplete-wrapper"
                    onChange={(i) => changeAutocomplete('name', i)}
                    onSelect={selectAutocomplete}
                    items={nameArr}
                    name={empName}
                />
            </CCol>
        </CRow>

        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDepartment">{t('Department')}</CLabel>
                <CSelect className="bamawl-select" value={departmentID} onChange={selectDepartmentName} custom>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {
                        department.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblPosition">{t('Position')}</CLabel>
                <CSelect className="bamawl-select" value={positionID} onChange={selectPosition} custom>
                    <option key="" value="">{t('---Select Position---')}</option>
                    {
                        position.map(i => {
                            return (<option key={i.id} value={i.id}> {i.position_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>

        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblExpenseDepartment">{t('Expense Department')}</CLabel>
                <CSelect className="bamawl-select" value={expenseDepartmentID} onChange={selectExpenseDepartmentName} custom>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {
                        department.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>

        <CRow lg="12" style={{ paddingBottom: '10px' }} className="mar-search">
            <CCol lg="5" className="mb-4">
                <CLabel id="lblSummarizePrepareDateFrom">{t('Summarize Prepare Date (From)')}</CLabel>
                <DatePicker change={selectAppliedFromDate} value={appliedFromDate} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblSummarizePrepareDateTo">{t('Summarize Prepare Date (To)')}</CLabel>
                <DatePicker change={selectAppliedToDate} value={appliedToDate} />
            </CCol>
        </CRow>
        <CRow alignHorizontal="center" style={{ marginBottom : "20px" }}>
            <CButton style={{ marginLeft: "20px" }} id="btnSearch" className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
        </CRow>
    </>
    );
}
export default SearchSummarizeTotalAmountPrepareList;