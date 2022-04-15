import { CButton, CCol, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchEmployeeRoleRegistration = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" className="emp-role-regis-col-title">
            <CCol lg="4" className="emp-role-regis-vertical-border">
                <label>{t('Employee ID')}</label><br />
                <div className="emp-list-autocomplete">
                    <Autocomplete
                        id="txtEmployeeID"
                        onChange={(i) => props.changeAutocomplete('id', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.idArr}
                        name={props.empID}
                        autoFocus={true}
                        disabled={props.permission === props.ViewPermission.ONLY_ME}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="emp-role-regis-vertical-border">
                <label>{t('Employee Code')}</label><br />
                <div className="emp-list-autocomplete" style={{ display: "grid" }}>
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => props.changeAutocomplete('code', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.codeArr}
                        name={props.empCode}
                        disabled={props.permission === props.ViewPermission.ONLY_ME}
                    />
                </div>
            </CCol>
            <CCol lg="4">
                <label>{t('Employee Name')}</label><br />
                <div className="emp-list-autocomplete" style={{ display: "grid" }}>
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={(i) => props.changeAutocomplete('name', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.nameArr}
                        name={props.empName}
                        disabled={props.permission === props.ViewPermission.ONLY_ME}
                    />
                </div>
            </CCol>
        </CRow>
        <br></br>
        <CRow className="emp-role-regis-row">
            <CCol lg="4" className="emp-role-regis-vertical-border">
                <label id="lbDepartmentName">{t('Department Name')}</label>
                <CSelect id="dropDepartment" className="bamawl-select" onChange={props.deptChange} value={props.deptState} custom>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {
                        props.departmentAPI && props.departmentAPI.length > 0 &&
                        props.departmentAPI.map((data, index) => {
                            return (
                                <option key={index} value={data.id}>{data.department_name}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="4" className="emp-role-regis-vertical-border">
                <label id="lbRank">{t('Rank')}</label>
                <CSelect id="dropRank" className="bamawl-select" onChange={props.rankChange} value={props.rankState} custom>
                    <option key="" value="">{t('---Select Rank---')}</option>
                    {
                        props.rankAPI && props.rankAPI.length > 0 &&
                        props.rankAPI.map((data, index) => {
                            return (
                                <option key={index} id={data.position_rank} value={data.id}>{"Rank" + " " + data.position_rank}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="4">
                <label id="lbRoleName">{t('Role Name')}</label>
                <CSelect id="dropRoleName" className="bamawl-select" onChange={props.roleChange} value={props.roleState} custom>
                    <option key="" value="">{t('---Select Name---')}</option>
                    {
                        props.roleAPI && props.roleAPI.length > 0 &&
                        props.roleAPI.map((data, index) => {
                            return (
                                <option key={index} value={data.id}>{data.admin_level_name}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <br></br>
        <CRow className="emp-role-regis-row">
            <CCol lg="4" className="emp-role-regis-vertical-border" >
                <label id="lbJoinDateFromDate" className='middle'>{t('Joined Date (From)')}</label>
                <DatePicker id="dpkJoinDateFromDate" value={props.selectedFromDate} change={props.handleFromDateChange} />
            </CCol>
            <CCol lg="4" >
                <label id="lbJoinDateToDate" className='middle'>{t('Joined Date (To)')}</label>
                <DatePicker id="dpkJoinDateToDate" value={props.selectedToDate} change={props.handleToDateChange} />
            </CCol>
        </CRow>
        <br></br>
        <CRow lg="12">
            <CCol className="text-center">
                <CButton className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>)
}
export default SearchEmployeeRoleRegistration