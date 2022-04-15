import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CSelect, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from './../../hr-common/datepicker/DatePicker';
const SearchPayrollRuleCalculationMethodSetup = props => {
    let {
        empID,
        empCode,
        empName,
        changeAutocomplete,
        selectAutocomplete,
        idArr,
        nameArr,
        codeArr,
        deptChange,
        deptState,
        departmentAPI,
        roleChange,
        roleState,
        roleAPI,
        selectedFromDate,
        handleFromDateChange,
        selectedToDate,
        handleToDateChange,
        searchAPI,
        editData,
        viewPermissionAPI,
        ViewPermision
    } = props;
    let clickSearch = () => {
        searchAPI();
    }
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (<>
        <CRow lg="12" className="move_from_bottom">
            <CCol lg="4" className="verticle-line mb-4">
                <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                <div className="autocomplete-wrapper">
                    <Autocomplete
                        id="txtEmployeeID"
                        autoFocus={true}
                        onChange={(i) => changeAutocomplete('id', i)}
                        onSelect={selectAutocomplete}
                        items={idArr}
                        name={empID}
                        disabled={editData !== null || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="verticle-line mb-4">
                <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                <div className="autocomplete-wrapper">
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => changeAutocomplete('code', i)}
                        onSelect={selectAutocomplete}
                        items={codeArr}
                        name={empCode}
                        disabled={editData !== null || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="mb-4" >
                <CLabel id="lbEmployeeName">{t('Employee Name')}</CLabel>
                <div className="autocomplete-wrapper">
                    <Autocomplete
                        id="txtEmployeeName"
                        disabled={editData !== null || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                        onChange={(i) => changeAutocomplete('name', i)}
                        onSelect={selectAutocomplete}
                        items={nameArr}
                        name={empName}
                    />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="mb-4">
            <CCol lg="5">
                <CLabel id="lbDepartmentName">{t('Department Name')}</CLabel>
                <CSelect className="bamawl-select" id="dropDepartment" onChange={deptChange} value={deptState} disabled={editData} custom>
                    <option key="" value="">---{t('Select Department')}---</option>
                    {departmentAPI &&
                        departmentAPI.map((dept, index) => {
                            return (
                                <option key={index} value={dept.id}>{dept.department_name}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="1" className="verticle-line"/>
            <CCol lg="1"/>
            <CCol lg="5">
                <label id="lbRole">{t('Role')}</label><br />
                <CSelect id="dropRole" className="bamawl-select" onChange={roleChange} value={roleState} disabled={editData} custom>
                    <option key="" value="">---{t('Select Role')}---</option>
                    {roleAPI &&
                        roleAPI.map((role, index) => {
                            return (
                                <option key={index} value={role.id}>{role.admin_level_name}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>

        </CRow>

        <CRow className="mb-4" >
            <CCol lg="5">
                <CLabel className="">{t('Join Date (From)')}</CLabel>
                <DatePicker id="dropFromDate" value={selectedFromDate} change={handleFromDateChange} disabled={editData!=null} />
            </CCol>
            <CCol lg="1" className="verticle-line"/>
            <CCol lg="1"/>
            <CCol lg="5">
                <CLabel className="">{t('Join Date (To)')}</CLabel>
                <DatePicker id="dropToDate" value={selectedToDate} change={handleToDateChange} disabled={editData!=null}/>
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol className="text-center">
                <CButton id="searchBtn" className="form-btn" onClick={clickSearch}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}
export default SearchPayrollRuleCalculationMethodSetup;
