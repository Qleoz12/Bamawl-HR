import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CButton, CFormGroup, CSelect } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from './../../hr-common/datepicker/DatePicker';
/**
 * SearchEmployeeAllowanceRegistration Component use for EmployeeAllowanceRegistration
 *
 * @author  dh_khanh
 * @create_date
 */
const SearchEmployeeAllowanceRegistration = props => {
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
                        disabled={editData || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                        autoFocus={true}
                        onChange={(i) => changeAutocomplete('id', i)}
                        onSelect={selectAutocomplete}
                        items={idArr}
                        name={empID}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="verticle-line mb-4">
                <label id="lbEmployeeCode">{t('Employee Code')}</label><br />
                <div className="autocomplete-wrapper" >
                    <Autocomplete
                        id="txtEmployeeCode"
                        disabled={editData || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
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
                        disabled={editData || parseInt(viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                        onChange={(i) => changeAutocomplete('name', i)}
                        onSelect={selectAutocomplete}
                        items={nameArr}
                        name={empName}
                    />
                </div>
            </CCol>
        </CRow>
        <CRow lg="12" className="mb-4" >
            <CCol lg="5">
                <label id="lbDepartmentName">{t('Department Name')}</label><br />
                <CSelect id="dropDepartment" className="bamawl-select" onChange={deptChange} value={deptState} disabled={editData} custom>
                    <option key="" value="">---{t('Select Department')}---</option>
                    {departmentAPI &&
                        departmentAPI.map((dept, index) => {
                            return (
                                <option key={index} value={dept.id}>{dept.name}</option>
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
        <CRow className="mb-4">
            <CCol lg="5">
                <label className="">{t('Join Date (From)')}</label>
                <DatePicker id="dropFromDate" value={selectedFromDate} change={handleFromDateChange} disabled={editData != null} />
            </CCol>
            <CCol lg="1" className="verticle-line"/>
            <CCol lg="1"/>
            <CCol lg="5">
                <label className="">{t('Join Date (To)')}</label>
                <DatePicker id="dropToDate" value={selectedToDate} change={handleToDateChange} disabled={editData != null} />
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton id="searchBtn" className="form-btn" onClick={searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}
export default SearchEmployeeAllowanceRegistration;
