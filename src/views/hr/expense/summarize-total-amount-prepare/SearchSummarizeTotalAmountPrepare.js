import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CLabel, CSelect } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchSummarizeTotalAmountPrepare = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        appliedFromDate,
        appliedToDate,
        dueFromDate,
        dueToDate,
        selectAppliedFromDate,
        selectAppliedToDate,
        selectDueFromDate,
        selectDueToDate,
        selectPosition,
        positionID,
        position,
        searchClick,
        selectExpenseDepartmentName,
        expenseDepartmentID,
        selectDepartmentName,
        departmentID,
        department,
    } = props

    return (<>
        <CRow>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblEmployeeID">{t('Employee ID')}</CLabel>
                <Autocomplete
                    className="autocomplete-wrapper"
                    id="txtEmployeeID"
                    autoFocus
                    onChange={(i) => props.changeAutocomplete('id', i)}
                    onSelect={props.selectAutocomplete}
                    items={props.idArr}
                    name={props.empID}
                />
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblEmployeeCode">{t('Employee Code')}</CLabel>
                <Autocomplete
                    id="txtEmployeeCode"
                    className="autocomplete-wrapper"
                    onChange={(i) => props.changeAutocomplete('code', i)}
                    onSelect={props.selectAutocomplete}
                    items={props.codeArr}
                    name={props.empCode}
                />
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel id="lblEmployeeName">{t('Employee Name')}</CLabel>
                <Autocomplete
                    id="txtEmployeeName"
                    className="autocomplete-wrapper"
                    onChange={(i) => props.changeAutocomplete('name', i)}
                    onSelect={props.selectAutocomplete}
                    items={props.nameArr}
                    name={props.empName}
                />
            </CCol>
        </CRow>
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDepartment">{t('Department')}</CLabel>
                <CSelect className="bamawl-select" value={departmentID} onChange={selectDepartmentName} custom>
                    <option key="" value="">{t("---Select Department---")}</option>
                    {
                        department.map(i => {
                            return (<option key={i.id} name={i.department_name} value={i.id}> {i.department_name} </option>)
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
                    <option key="" value="">{t("---Select Position---")}</option>
                    {
                        position.map(i => {
                            return (<option key={i.id} name={i.position_name} value={i.id}> {i.position_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblExpenseDepartment">{t('Expense Department')}</CLabel>
                <CSelect className="bamawl-select" value={expenseDepartmentID} onChange={selectExpenseDepartmentName} custom>
                    <option key="" value="">{t("---Select Department---")}</option>
                    {
                        department.map(i => {
                            return (<option key={i.id} name={i.department_name} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <CRow lg="12" style={{ paddingBottom: '10px' }}>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblAppliedFrom">{t('Applied Date (From)')}</CLabel>
                <DatePicker id="txtAppliedFrom" value={appliedFromDate} change={selectAppliedFromDate} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblAppliedTo">{t('Applied Date (To)')}</CLabel>
                <DatePicker id="txtAppliedTo" value={appliedToDate} change={selectAppliedToDate} />
            </CCol>
        </CRow>
        <CRow lg="12" style={{ paddingBottom: '10px' }}>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDueFrom">{t('Due Date (From)')}</CLabel>
                <DatePicker id="txtDueFrom" value={dueFromDate} change={selectDueFromDate} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblDueTo">{t('Due Date (To)')}</CLabel>
                <DatePicker id="txtDueTo" value={dueToDate} change={selectDueToDate} />
            </CCol>
        </CRow>
        <CRow alignHorizontal="center">
            <CButton style={{ marginLeft: "20px" }} id="btnSearch" className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
        </CRow>
        <br />
    </>
    );
}
export default SearchSummarizeTotalAmountPrepare;