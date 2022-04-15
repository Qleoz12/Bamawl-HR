import { CCol, CRow, CSelect } from "@coreui/react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from '../../hr-common/datepicker/DatePicker';

const EmployeeListSearchDepartmentRoleBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            <CRow lg="12">
                <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                    {t('Department & Role')}</h5>
            </CRow>
            <CRow lg="12" className="mb-4 mt-3">
                <CCol lg="5" className="py-1" >
                    <label id="lbDepartmentName">{t('Department Name')}</label>
                    <CSelect id="dropDepartment"
                        className="bamawl-select"
                        value={props.deptState}
                        onChange={props.deptChange}
                        custom>
                        <option key="" value="">{t('---Select Department Name---')}</option>
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
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="py-1" >
                    <label id="lbEligible">{t('Eligible')}</label>
                    <CSelect id="dropEligible"
                        className="bamawl-select"
                        value={props.eligibleState}
                        onChange={props.eligibleChange}
                        custom>
                        <option key="" value="">{t('All')}</option>
                        <option key="1" value="1">{t('Eligible')}</option>
                        <option key="2" value="2">{t('Non-Eligible')}</option>
                    </CSelect>
                </CCol>
            </CRow>
            <CRow lg="12" className="my-4">
                <CCol lg="5" className="py-1" >
                    <label id="lbJoinedDateFrom">{t('Joined Date (From)')}</label>
                    <div>
                        <DatePicker
                            id="datepickerJoinedDateFrom"
                            value={props.selectedFromDate}
                            change={props.handleFromDateChange}
                        />
                    </div>
                </CCol>
                <CCol lg="2">
                    <div className="line"></div>
                </CCol>
                <CCol lg="5" className="py-1">
                    <label id="lbJoinedDateTo">{t('Joined Date (To)')}</label>
                    <div className="" >
                        <DatePicker
                            id="datepickerJoinedDateTo"
                            value={props.selectedToDate}
                            change={props.handleToDateChange}
                        />
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="my-4">
                <CCol lg="5" className="">
                    <label id="lbRole">{t('Role')}</label>
                    <CSelect id="dropRole"
                        className="bamawl-select"
                        value={props.roleState}
                        onChange={props.roleChange}
                        custom>
                        <option key="" value="">{t('All')}</option>
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
        </>
    )

}
export default EmployeeListSearchDepartmentRoleBox;