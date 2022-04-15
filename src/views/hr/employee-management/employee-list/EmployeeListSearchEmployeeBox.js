import { CCol, CRow } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';

const EmployeeListSearchEmployeeBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (
        <>
            <CRow lg="12" className="emp-list-col-title">
                <CCol lg="4" className="emp-list-vertical-border">
                    <label id="lbEmployeeID">{t('Employee ID')}</label><br />
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
                <CCol lg="4" className="emp-list-vertical-border">
                    <label id="lbEmployeeCode">{t('Employee Code')}</label><br />
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
                <CCol lg="4" className="">
                    <label id="lbEmployeeName">{t('Employee Name')}</label><br />
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
        </>
    )
}
export default EmployeeListSearchEmployeeBox;