import { CButton, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchCheckInCheckOutList = props => {
    const { t } = useTranslation();    
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeID"
                        onChange={(i) => props.changeAutocomplete('id', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.idArr}
                        name={props.empID}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
            <CCol className="mb-4 verticle-line" lg="4">
                <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeCode"
                        onChange={(i) => props.changeAutocomplete('code', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.codeArr}
                        name={props.empCode}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
            <CCol className="mb-4" lg="4">
                <CLabel id="lbEmployeeName" >{t('Employee Name')}</CLabel>
                <div className="basic-autocomplete">
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={(i) => props.changeAutocomplete('name', i)}
                        onSelect={props.selectAutocomplete}
                        items={props.nameArr}
                        name={props.empName}
                        disabled={props.viewPermissionAPI ? false : true}
                    />
                </div>
            </CCol>
        </CRow>

        { /* From Date To Date */}
        <CRow>
            <CCol lg="5" className="mb-4">
                <CLabel className="required">{t('From Date')}</CLabel>
                <DatePicker id="calFromDate" value={props.selectedFromDate} change={props.handleFromDateChange} />
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel className="required">{t('To Date')}</CLabel>
                <DatePicker id="calToDate" value={props.selectedToDate} change={props.handleToDateChange} />
            </CCol>
        </CRow>

        <CRow lg="12">
            <CCol lg="5" className="mb-4" >
                <label id="lbApproverStatus">{t('Approver Status')}</label>
                <CSelect className="bamawl-select" id="dropApproverStatus" onChange={props.chooseApproverStatus} value={props.approverStatus} custom>
                    <option key="" value="">{t('---Select Approver Status---')}</option>
                    {props.approverStatusAPI && props.approverStatusAPI !== "" &&
                        props.approverStatusAPI.map((data, index) => {
                            return (
                                <option key={index} value={data.id}>{data.status_name}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>

        <br />
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                <CButton className="form-btn" onClick={props.searchAPI} id="btnSearch">{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}
export default SearchCheckInCheckOutList;