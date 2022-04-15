import React from "react";
import { useTranslation } from "react-i18next";
import { CCol, CRow, CLabel, CButton, CSelect } from "@coreui/react";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from './../../hr-common/datepicker/DatePicker';
const SearchEmployeeShiftAssignList = (props) => {
    let {
        fromDate,
        selectFromDate,
        toDate,
        selectToDate,
        selectDepartmentName,
        departmentID,
        department,
        selectShiftName,
        shiftNameID,
        shiftName,
        searchClick,
        permission,
        ViewPermision
    } = props;
    const { t } = useTranslation();
    return (
        <>
            <CRow lg="12" className="move_from_bottom">
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                        <Autocomplete
                            autoFocus={true}
                            id="txtEmployeeID"
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.idArr}
                            name={props.empID}
                            disabled={permission == ViewPermision.ONLY_ME}
                        />
                </CCol>
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                        <Autocomplete
                            id="txtEmployeeCode"
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.codeArr}
                            name={props.empCode}
                            disabled={permission == ViewPermision.ONLY_ME}
                        />
                </CCol>
                <CCol className="mb-4" lg="4">
                    <CLabel id="lbEmployeeName">{t('Employee Name')}</CLabel>
                        <Autocomplete
                            id="txtEmployeeName"
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.nameArr}
                            name={props.empName}
                            disabled={permission == ViewPermision.ONLY_ME}
                        />
                </CCol>
            </CRow>

            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel className="required">{t('From Date')}</CLabel>
                    <DatePicker id="dropFromDate" value={fromDate} change={selectFromDate} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <div className="to-date column column-right" >
                        <CLabel className="required">{t('To Date')}</CLabel>
                        <DatePicker id="dropToDate" value={toDate} change={selectToDate} />
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel id="lbDepartMentName">{t('Department Name')}</CLabel>
                    <CSelect id="dropDepartMentName" className="bamawl-select" value={departmentID} onChange={selectDepartmentName} custom>
                        <option key="" value="">---{t("Select Department")}---</option>
                        {
                            department.map(i => {
                                return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <div className="shift-name-g column column-right">
                        <CLabel id="lbShiftName">{t('Shift Name')}</CLabel>
                        <CSelect id="dropShiftName" className="bamawl-select" value={shiftNameID} onChange={selectShiftName} custom>
                            <option key="" value="">---{t("Select Shift Name")}---</option>
                            {
                                shiftName.map(i => {
                                    return (<option key={i.id} value={i.id}> {i.sn_name} </option>)
                                })
                            }
                        </CSelect>
                    </div>
                </CCol>
            </CRow>
            <CRow alignHorizontal="center" className="mt-3 mb-1">
                <CButton className="form-btn" onClick={searchClick}>{t('Search')}</CButton>
            </CRow>
        </>
    );
};

export default SearchEmployeeShiftAssignList;
