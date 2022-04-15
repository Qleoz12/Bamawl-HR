import React from "react";
import { useTranslation } from 'react-i18next';
import {
    CButton, CCol, CRow, CLabel
} from "@coreui/react";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const SearchIndividualWorkingHourCheck = props => {
    let {
        selectedFromDate,
        selectedToDate,
        handleFromDateChange,
        handleToDateChange,
        searchAPI,
        viewPermissionAPI
    } = props;
    const { t } = useTranslation();
    return (
        <>
            <CRow lg="12" className="move_from_bottom">
                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel className="required">{t('Employee ID')}</CLabel>
                    <div className="autocomplete-wrapper individual-text">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.idArr}
                            name={props.empID}
                            disabled={parseInt(viewPermissionAPI)== 0 ? true : false}
                        />
                    </div>
                </CCol>

                <CCol className="mb-4 verticle-line" lg="4">
                    <CLabel style={{ color: "#c7c6c6" }}>{t('Employee Code')}</CLabel>
                    <div className="autocomplete-wrapper individual-text">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.codeArr}
                            name={props.empCode}
                            disabled={true}
                        />
                    </div>
                </CCol>

                <CCol className="mb-4" lg="4">
                    <CLabel style={{ color: "#c7c6c6" }}>{t('Employee Name')}</CLabel>
                    <div className="autocomplete-wrapper individual-text">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.nameArr}
                            name={props.empName}
                            disabled={true}
                        />
                    </div>
                </CCol>
            </CRow>
            <br />
            <CRow lg="12" className="mar-search">
                <CCol lg="5" className="mb-4">
                    <CLabel className="required" id="lblFromDate">{t('From Date')}</CLabel>
                    <DatePicker change={handleFromDateChange} value={selectedFromDate} />
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="mb-4">
                    <CLabel className="required" id="lblToDate">{t('To Date')}</CLabel>
                    <DatePicker change={handleToDateChange} value={selectedToDate} />
                </CCol>
            </CRow>
            <CCol style={{ textAlign: "center", marginBottom: "20px" }}>
                <CButton id="btnSeach" className="form-btn" onClick={searchAPI}>{t('Search')}</CButton>
            </CCol>
        </>
    )
}

export default SearchIndividualWorkingHourCheck;