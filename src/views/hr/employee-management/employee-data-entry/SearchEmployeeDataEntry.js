import React from "react";
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CButton, CLabel, CSelect } from "@coreui/react";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const SearchEmployeeDataEntry = props => {
    let {
        deptChange,
        deptState,
        departmentAPI,
        search,
        viewPermissionAPI,
        ViewPermision
    } = props;
    const { t } = useTranslation();
    return (
        <>
            <CRow lg="12" className="move_from_bottom mb-4">
                <CCol lg="5">
                    <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            id="txtEmployeeID"
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.idArr}
                            name={props.empId}
                            autoFocus={true}
                            disabled={viewPermissionAPI == ViewPermision.ONLY_ME}
                        />
                    </div>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol  lg="5">
                    <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            id="txtEmployeeCode"
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.codeArr}
                            name={props.empCode}
                            disabled={viewPermissionAPI == ViewPermision.ONLY_ME}
                        />
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="move_from_bottom mb-4">
                <CCol lg="5">
                    <CLabel id="lbEmployeeName">{t('Employee Name')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            id="txtEmployeeName"
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.nameArr}
                            name={props.empName}
                            disabled={viewPermissionAPI == ViewPermision.ONLY_ME}
                        />
                    </div>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id='lblDepartmentName'>{t('Department Name')}</CLabel>
                    <br />
                    <CSelect className="bamawl-select" id="dropSelectDepartmentName" onChange={deptChange} value={deptState}  custom>
                        <option key="" value="">---{t('Select Department Name')}---</option>
                        {departmentAPI &&
                            departmentAPI.map((dept, index) => {
                                return (
                                    <option key={index} value={dept.id}>{dept.department_name}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <br />
            <CRow alignHorizontal="center" className="mt-3 mb-1">
                <CButton className="form-btn" onClick={search}>{t('Search')}</CButton>
            </CRow>
        </>
    );
};

export default SearchEmployeeDataEntry;
