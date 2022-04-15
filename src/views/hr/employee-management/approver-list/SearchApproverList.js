import { CButton, CCol, CLabel, CRow, CSelect } from '@coreui/react';
import MuiAutoComplete from "@material-ui/lab/Autocomplete";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'
/**
 * SearchApproverList
 * 
 * @author  v_hao
 * @create_date  2021-05-06
 */
const SearchApproverList = props => {
    let {
        applicantName,
        autocompleteApplicantName,
        changeApplicantName,
        selectApplicantName,
        applicantPositionChange,
        positionAPI,
        departmentAPI,
        applicantDepartmentChange,
        applicantPosition,
        applicantDepartment,
        approverName,
        autocompleteApproverName,
        changeApproverName,
        selectApproverName,
        approverPosition,
        approverPositionChange,
        approverDepartmentChange,
        approverDepartment,
        searchAPI
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <label id="lblApplicantDetails" className="style-title-approver-list">{t('Applicant Details')}</label><br/><br/>
        <CRow lg="12" className="style-lable">
            <CCol className="mb-4" lg="5">
                <CLabel id="lblApplicantName">{t('Applicant Name')}</CLabel>
                <div className="autocomplete-wrapper">
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={changeApplicantName}
                        onSelect={selectApplicantName}
                        items={autocompleteApplicantName}
                        name={applicantName}
                    />
                </div>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblApplicantPosition">{t('Applicant Position')}</CLabel>
                <CSelect className="bamawl-select" value={applicantPosition} onChange={applicantPositionChange} custom>
                    <option key="" value="">{t("---Select Position---")}</option>
                    {positionAPI !== "" &&
                        positionAPI.map((item, index) => {
                            return (<option key={index} name={item.position_name} value={item.id}> {item.position_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblApplicantDepartment">{t('Applicant Department')}</CLabel>
                <CSelect className="bamawl-select" value={applicantDepartment} onChange={applicantDepartmentChange} custom>
                    <option key="" value="">{t("---Select Department---")}</option>
                    {departmentAPI !== "" &&
                        departmentAPI.map((item, index) => {
                            return (<option key={index} name={item.department_name} value={item.id}> {item.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <br></br>
        <label id="lblApproverDetails" className="style-title-approver-list">{t('Approver Details')}</label><br/><br/>
        <CRow lg="12" className="style-lable">
            <CCol className="mb-4" lg="5">
                <CLabel id="lblApplicantName">{t('Approver Name')}</CLabel>
                <div className="autocomplete-wrapper">
                    <Autocomplete
                        id="txtEmployeeName"
                        onChange={changeApproverName}
                        onSelect={selectApproverName}
                        items={autocompleteApproverName}
                        name={approverName}
                    />
                </div>
            </CCol>
            <CCol lg="2">
                <div className="line"></div>
            </CCol>

            <CCol lg="5" className="mb-4">
                <CLabel id="lblApproverPosition">{t('Approver Position')}</CLabel>
                <CSelect className="bamawl-select" value={approverPosition} onChange={approverPositionChange} custom>
                    <option key="" value="">{t("---Select Position---")}</option>
                    {positionAPI !== "" &&
                        positionAPI.map((item, index) => {
                            return (<option key={index} name={item.position_name} value={item.id}> {item.position_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
            <CCol lg="5" className="mb-4">
                <CLabel id="lblApproverDepartment">{t('Approver Department')}</CLabel>
                <CSelect className="bamawl-select" value={approverDepartment} onChange={approverDepartmentChange} custom>
                    <option key="" value="">{t("---Select Department---")}</option>
                    {departmentAPI !== "" &&
                        departmentAPI.map((item, index) => {
                            return (<option key={index} name={item.department_name} value={item.id}> {item.department_name} </option>)
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>

        <CRow lg="12" style={{ paddingTop: "50px" }}>
            <CCol className="t-align-center">
                <CButton id="btnSearch" className="form-btn" onClick={searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>
    );
}

export default SearchApproverList;