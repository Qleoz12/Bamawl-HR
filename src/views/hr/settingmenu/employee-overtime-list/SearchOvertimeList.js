import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CButton, CSelect, CLabel } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchOvertimeList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        roleState,
        deptChange,
        deptState,
        departmentAPI,
        roleAPI,
        roleChange,
        searchAPI,
        handleFromDateChange,
        selectedFromDate,
        handleToDateChange,
        selectedToDate,
        selectAutocomplete,
        idArr,
        empID,
        codeArr,
        empCode,
        changeAutocomplete,
        nameArr,
        empName,
        dropOvertime,
        overtimeChange,
        otNameAPI,
        viewPermissionAPI
    } = props

    return (<>
        <CRow>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel ib="lblEmployeeID">{t('Employee ID')}</CLabel>
                <Autocomplete
                    className="autocomplete-wrapper"
                    disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                    id="txtEmployeeID"
                    autoFocus
                    onChange={(i) => changeAutocomplete('id', i)}
                    onSelect={selectAutocomplete}
                    items={idArr}
                    name={empID}
                />
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel ib="lblEmployeeCode">{t('Employee Code')}</CLabel>
                <Autocomplete
                    className="autocomplete-wrapper"
                    disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                    id="txtEmployeeCode"
                    onChange={(i) => changeAutocomplete('code', i)}
                    onSelect={selectAutocomplete}
                    items={codeArr}
                    name={empCode}
                />
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel ib="lblEmployeeName">{t('Employee Name')}</CLabel>
                <Autocomplete
                    className="autocomplete-wrapper"
                    disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                    id="txtEmployeeName"
                    onChange={(i) => changeAutocomplete('name', i)}
                    onSelect={selectAutocomplete}
                    items={nameArr}
                    name={empName}
                />
            </CCol>
        </CRow>
        <CRow>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblDepartment">{t('Department')}</CLabel>
                <CSelect className="bamawl-select" value={deptState} onChange={deptChange} custom>
                    <option key="" value="">{t('---Select Department---')}</option>
                    {
                        departmentAPI != "" &&
                        departmentAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lblRole">{t('Role')}</CLabel>
                <CSelect className="bamawl-select" value={roleState} onChange={roleChange} custom>
                    <option key="" value="">{t('---Select Role---')}</option>
                    {
                        roleAPI != "" &&
                        roleAPI.map(i => {
                            return (<option key={i.id} value={i.id}> {i.admin_level_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel id="lblOvertime">{t('Overtime')}</CLabel>
                <CSelect className="bamawl-select" value={dropOvertime} onChange={overtimeChange} custom>
                    <option key="" value="">{t('---Select Overtime---')}</option>
                    {
                        otNameAPI != "" &&
                        otNameAPI.map((ot, index) => {
                            return (
                                <option key={index} value={ot.id}>
                                    {ot.overtime_name.length > 40 ? ot.overtime_name.substring(0, 40) + "..." : ot.overtime_name}({ot.sn_name})
                                </option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <CRow>
        </CRow>
        <CRow lg="12" className="mar-search">
            <CCol lg="5" className="mb-4">
                <CLabel id="lblJoinedDateFrom">{t('Joined Date (From)')}</CLabel>
                <DatePicker change={handleFromDateChange} value={selectedFromDate} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblJoinedDateTo">{t('Joined Date (To)')}</CLabel>
                <DatePicker change={handleToDateChange} value={selectedToDate} />
            </CCol>
        </CRow>
        <br />
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton id="btnSearch" className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}
export default SearchOvertimeList;