import { CButton, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import ViewPermision from '../../../brycen-common/constant/ViewPermission';

const SearchBasicSalaryRegister = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" style={{ paddingBottom: '10px' }}>
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeID"
                        onChange={(i) => props.changeAutocomplete('id', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.idArr}
                        name={props.empID}
                        autoFocus={true}
                        disabled={props.editData && props.editData != "" || parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => props.changeAutocomplete('code', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.codeArr}
                        name={props.empCode}
                        disabled={props.editData && props.editData != "" || parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
            <CCol lg="4" className="mb-4">
                <CLabel id="lbEmployeeName" >{t('Employee Name')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={(i) => props.changeAutocomplete('name', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.nameArr}
                        name={props.empName}
                        disabled={props.editData && props.editData != "" || parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
                    />
                </div>
            </CCol>
        </CRow>

        {/* Department && Role */}
        <CRow>
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel>{t('Department')}</CLabel>
                <CSelect className="bamawl-select" id="dropDepartment" value={props.deptState} onChange={props.deptChange} custom disabled={props.editData && props.editData != "" ? true : false}>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {props.departmentAPI &&
                        props.departmentAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="4" className="mb-4">
                <CLabel>{t('Role')}</CLabel>
                <CSelect className="bamawl-select" id="dropRole" value={props.roleState} onChange={props.roleChange} custom disabled={props.editData && props.editData != "" ? true : false}>
                    <option key="" value="">{t('---Select Role---')}</option>
                    {props.roleAPI &&
                        props.roleAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.admin_level_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>

        { /* From Date To Date */}
        <CRow>
            <CCol lg="4" className="mb-4 verticle-line">
                <CLabel >{t('Joined Date (From)')}</CLabel>
                <DatePicker id="dropFromDate" value={props.selectedFromDate} change={props.handleFromDateChange} disabled={props.editData && props.editData != "" ? true : false} />
            </CCol>
            <CCol lg="4" className="mb-4">
                <CLabel >{t('Joined Date (To)')}</CLabel>
                <DatePicker id="dropToDate" value={props.selectedToDate} change={props.handleToDateChange} disabled={props.editData && props.editData != "" ? true : false} />
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton id="btnSearch" className="form-btn" onClick={props.searchAPI} hidden={props.editData != ""}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}
export default SearchBasicSalaryRegister;