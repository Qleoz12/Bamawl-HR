import React, { } from 'react';
import {
    CRow,
    CCol,
    CButton,
    CSelect,
    CLabel,
} from "@coreui/react";
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from './../../hr-common/datepicker/DatePicker';
const EmployeeAllowanceListForm = props => {
    const { t } = useTranslation();
    let {
        deptChange,
        deptState,
        departmentAPI,
        roleChange,
        roleState,
        roleAPI,
        allowanceState,
        allowanceAPI,
        onAllowanceTitleChange,
        subAllowanceState,
        subAllowanceAPI,
        onSubAllowanceTitleChange,
        searchAPI,
        selectedFromDate,
        handleFromDateChange,
        selectedToDate,
        handleToDateChange,
        changeAutocomplete,
        selectAutocomplete,
        idArr,
        codeArr,
        nameArr,
        employeeID,
        employeeCode,
        employeeName,
        viewPermissionAPI,
        ViewPermision
    } = props;
    function getFirst40Char(str) {
        let outputStr = str;
        if (outputStr.length >= 40) {
            outputStr = outputStr.substring(0, 40) + "...";
        }
        return outputStr;
    }
    return (
        <>
            <CRow lg="12" className="move_from_bottom">
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            autoFocus={true}
                            id="txtEmployeeID"
                            onChange={(i) => changeAutocomplete('id', i)}
                            onSelect={selectAutocomplete}
                            items={idArr}
                            name={employeeID}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                        />
                    </div>
                </CCol>
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            id="txtEmployeeCode"
                            onChange={(i) => changeAutocomplete('code', i)}
                            onSelect={selectAutocomplete}
                            items={codeArr}
                            name={employeeCode}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}

                        />
                    </div>
                </CCol>
                <CCol className="mb-4" lg="4">
                    <CLabel id="lbEmployeeName">{t('Employee Name')}</CLabel>
                    <div className="autocomplete-wrapper">
                        <Autocomplete
                            id="txtEmployeeName"
                            onChange={(i) => changeAutocomplete('name', i)}
                            onSelect={selectAutocomplete}
                            items={nameArr}
                            name={employeeName}
                            disabled={parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}

                        />
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel id='lblDepartmentName' >{t('Department Name')}</CLabel><br />
                    <CSelect onChange={deptChange} className="bamawl-select" custom value={deptState} id='dropDepartment'>
                        <option key="" value="" >---{t('Select Department Name')}---</option>
                        {departmentAPI.length > 0 &&
                            departmentAPI.map((dept, index) => {
                                return (
                                    <option key={index} value={dept.id}>
                                        {getFirst40Char(dept.department_name)}
                                    </option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5" >
                    <CLabel id='lblRole'>{t('Role')}</CLabel><br />
                    <CSelect onChange={roleChange} value={roleState} className="bamawl-select" custom id='dropRole'>
                        <option key="" value="">---{t('Select Role')}---</option>
                        {roleAPI.length > 0 &&
                            roleAPI.map((role, index) => {
                                return (
                                    <option key={index} value={role.id}>
                                        {getFirst40Char(role.admin_level_name)}
                                    </option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel id='lblAllowanceTitle'>{t('Allowance Title')}</CLabel><br />
                    <CSelect onChange={onAllowanceTitleChange} value={allowanceState} id='dropAllowanceTitle' className="bamawl-select" custom>
                        <option key="" value="" >---{t('Select Allowance Title')}---</option>
                        {
                            allowanceAPI.length > 0 &&
                            allowanceAPI.map((title, index) => {
                                return (
                                    <option key={index} value={title.id}>
                                        {getFirst40Char(title.allowance_name)}
                                    </option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id='lblSubAllowanceTitle'>{t('Sub Allowance Title')}</CLabel><br />
                    <CSelect onChange={onSubAllowanceTitleChange} value={subAllowanceState} id='dropSubAllowanceTitle' className="bamawl-select" custom>
                        <option key="" value="">---{t('Select Sub Allowance Title')}---</option>
                        {subAllowanceAPI.length > 0 &&
                            subAllowanceAPI.map((title, index) => {
                                return (
                                    <option key={index} value={title.id}>
                                        {getFirst40Char(title.sub_allowance_name)}
                                    </option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <CLabel className="">{t('Join Date (From)')}</CLabel>
                    <DatePicker id="dropFromDate" value={selectedFromDate} change={handleFromDateChange} />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel className="">{t('Join Date (To)')}</CLabel>
                    <DatePicker id="dropToDate" value={selectedToDate} change={handleToDateChange} />
                </CCol>
            </CRow>
            <div className="d-flex justify-content-center mt-4">
                <CButton
                    id='btnSearch'
                    className="form-btn"
                    onClick={searchAPI}
                >{t("Search")}
                </CButton>
            </div>
        </>
    )
}

export default EmployeeAllowanceListForm;
