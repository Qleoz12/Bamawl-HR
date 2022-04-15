import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CSelect } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from './../../hr-common/datepicker/DatePicker';
/**
 * SearchEmployeeLateAbsentLeaveList Component use for EmployeeLateAbsentLeaveListIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const SearchEmployeeLateAbsentLeaveList = props => {
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
        selectedFromDate,
        handleFromDateChange,
        selectedToDate,
        handleToDateChange,
        searchAPI,
        viewPermissionAPI,
        ViewPermision
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (<>
        <CRow lg="12" className="move_from_bottom">
            <CCol lg="4" className="verticle-line mb-4">
                <label id="lbEmployeeID">{t('Employee ID')}</label><br />
                <div className="autocomplete-wrapper" >
                    <Autocomplete
                        id="txtEmployeeID"
                        autoFocus={true}
                        onChange={(i) => changeAutocomplete('id', i)}
                        onSelect={selectAutocomplete}
                        items={idArr}
                        name={empID}
                        disabled={viewPermissionAPI === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="verticle-line mb-4">
                <label id="lbEmployeeCode">{t('Employee Code')}</label><br />
                <div className="autocomplete-wrapper" >
                    <Autocomplete
                        id="txtEmployeeCode"
                        disabled={viewPermissionAPI === ViewPermision.ONLY_ME ? true : false}
                        onChange={(i) => changeAutocomplete('code', i)}
                        onSelect={selectAutocomplete}
                        items={codeArr}
                        name={empCode}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="mb-4">
                <label id="lbEmployeeName">{t('Employee Name')}</label><br />
                <div className="autocomplete-wrapper" >
                    <Autocomplete
                        id="txtEmployeeName"
                        disabled={viewPermissionAPI === ViewPermision.ONLY_ME ? true : false}
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
                <label className="required">{t('From Date')}</label>
                <DatePicker id="dropFromDate" value={selectedFromDate} change={handleFromDateChange} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <label className="required">{t('To Date')}</label>
                <DatePicker id="dropToDate" value={selectedToDate} change={handleToDateChange} />
            </CCol>
        </CRow>
        <CRow lg="12" >
            <CCol lg="5" className="mb-4">
                <label id="lbDepartmentName">{t('Department Name')}</label><br />
                <CSelect id="dropDepartment" className="bamawl-select" onChange={deptChange} value={deptState} custom>
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
        </CRow>
        <br />
        <CRow lg="12">
            <CCol className="text-center">
                <CButton id="searchBtn" className="form-btn" onClick={searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow>
        <br />
    </>
    );
}
export default SearchEmployeeLateAbsentLeaveList;