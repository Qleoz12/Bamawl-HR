import React from "react";
import { useTranslation } from "react-i18next";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import { CCol, CRow, CLabel,CButton,CSelect } from "@coreui/react";

const SearchEmployeeShiftAssignList = (props) => {
    let {
        selectDepartmentName,
        departmentID,
        department,
        searchClick,
        positionList,
        selectPosition,
        positionID,
        changeAutocomplete,
        selectAutocomplete,
        idArr,
        employeeID,
        codeArr,
        employeeCode,
        nameArr,
        employeeName,
        ViewPermision,
        permission,
        listEmployeeModal
    } = props;
    const { t } = useTranslation();
    return (
        <>
            <CRow lg="12" className="row-search">
                <CCol lg="4" className="mb-4 verticle-line" >
                    <div className="search-form">
                        <CLabel id="lblEmployeeID">
                        {t('Employee ID')}
                        </CLabel>
                        <Autocomplete
                            id="txtEmployeeID"
							onChange={(i) => changeAutocomplete('id', i)}
							onSelect={selectAutocomplete}
							items={idArr}
							name={employeeID}
                            disabled={permission==ViewPermision.ONLY_ME}
						/>
                    </div>
                </CCol>
                <CCol lg="4" className="mb-4 verticle-line">
                    <div  className="search-form">
                        <CLabel id="lblEmployeeCode">
                        {t('Employee Code')}
                        </CLabel>
                        <Autocomplete
                            id="txtEmployeeCode"
							onChange={(i) => changeAutocomplete('code', i)}
							onSelect={selectAutocomplete}
							items={codeArr}
							name={employeeCode}
                            disabled={permission==ViewPermision.ONLY_ME}
						/>
                    </div>
                </CCol>
                <CCol lg="4" className="mb-4">
                    <div  className="search-form">
                        <CLabel id="lblEmployeeName">
                        {t('Employee Name')}
                        </CLabel>
                        <Autocomplete
                            id="txtEmployeeName"
							onChange={(i) => changeAutocomplete('name', i)}
							onSelect={selectAutocomplete}
							items={nameArr}
							name={employeeName}
                            disabled={permission==ViewPermision.ONLY_ME}
						/>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4" >
                <CCol lg="5">
                    <CLabel id="lblDepartment">{t('Department')}</CLabel>
                    <CSelect id="dropSelectDepartMent" onChange={selectDepartmentName} value={departmentID} className="bamawl-select" custom >
                        <option key="" value="">
                            ---{t("Select Department")}---
                        </option>
                        { department.map((department, index) => {
                            return(
                                <option key={index} value={department.id}>{department.department_name}</option>
                            )
                        })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id="lblPosition">{t('Position')}</CLabel>
                    <CSelect id="dropSelectDPosition" onChange={selectPosition} value={positionID} className="bamawl-select" custom >
                        <option key="" value="">
                            ---{t("Select Position")}---
                        </option>
                        {positionList.map((position, index) => {
                            return(
                                <option key={index} value={position.id}>{position.position_name}</option>
                            )
                        })
                        }
                    </CSelect>
                </CCol>
            </CRow>
            <Grid container className="justify-content-center">
                <Grid item  style={{ marginTop: "20px",marginBottom:"20px" }}>
                    <CButton className="form-btn" id="btnSearch" hidden={listEmployeeModal.length==0} onClick={searchClick}>{t('Search')}</CButton>
                </Grid>
            </Grid>
        </>
    );
};

export default SearchEmployeeShiftAssignList;
