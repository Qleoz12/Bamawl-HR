/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton, CSelect, CLabel, CCard } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';
/**
 * ShowDeductionAllBox
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const ShowDeductionAllBox = props => {
    let {
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
        calMethod,
        selectAutocomplete,
        idArr,
        empID,
        codeArr,
        empCode,
        changeAutocomplete,
        nameArr,
        empName,
        viewPermissionAPI
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {calMethod == true &&
            <CCard className="panel-employee-deduction br-radi" style={{ margin: "0 -1.30rem 0 -1.30rem", padding: "25px 35px 0px 32px", borderTop: "1px", borderBottom: "1px" }}>
                <CRow>
                    <CCol lg="5" className="mb-4">
                        <CLabel style={{ fontWeight: "bold" }}>{t('Department')}</CLabel>
                        <CSelect className="bamawl-select" value={deptState} onChange={deptChange} custom>
                            <option key="" value="">{t('---Select Department---')}</option>
                            {
                                departmentAPI.map(i => {
                                    return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                                })
                            }
                        </CSelect>
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel style={{ fontWeight: "bold" }}>{t('Role')}</CLabel>
                        <CSelect className="bamawl-select" value={roleState} onChange={roleChange} custom>
                            <option key="" value="">{t('---Select Role---')}</option>
                            {
                                roleAPI.map(i => {
                                    return (<option key={i.id} value={i.id}> {i.admin_level_name} </option>)
                                })
                            }
                        </CSelect>
                    </CCol>
                </CRow>
                <CRow lg="12" className="mar-search">
                    <CCol lg="5" className="mb-4">
                        <CLabel style={{ fontWeight: "bold" }} id="lblJoinedDateFrom">{t('Joined Date (From)')}</CLabel>
                        <DatePicker change={handleFromDateChange} value={selectedFromDate} />
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel style={{ fontWeight: "bold" }} id="lblJoinedDateTo">{t('Joined Date (To)')}</CLabel>
                        <DatePicker change={handleToDateChange} value={selectedToDate} />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol className="mb-4" lg="5">
                        <CLabel style={{ fontWeight: "bold" }}>{t('Employee Name')}</CLabel>
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
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol className="mb-4" lg="5">
                        <CLabel style={{ fontWeight: "bold" }}>{t('Employee ID')}</CLabel>
                        <Autocomplete
                            className="autocomplete-wrapper"
                            disabled={parseInt(viewPermissionAPI)=== 0 ? true : false}
                            id="txtEmployeeID"
                            onChange={(i) => changeAutocomplete('id', i)}
                            onSelect={selectAutocomplete}
                            items={idArr}
                            name={empID}
                        />
                    </CCol>
                </CRow>
                <CRow>
                    <CCol className="mb-4" lg="5">
                        <CLabel style={{ fontWeight: "bold" }}>{t('Employee Code')}</CLabel>
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
                </CRow>
                <br />
            </CCard>
        }
    </>
    );
}
export default ShowDeductionAllBox;