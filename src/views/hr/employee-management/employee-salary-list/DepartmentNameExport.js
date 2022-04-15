/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CButton,
    CCol,
    CRow,
    CSelect,
    CLabel
} from '@coreui/react';
import Select from "@material-ui/core/Select";
import { useTranslation } from 'react-i18next';

/**
 * DepartmentNameExport
 * 
 * @author  v_hao
 * @create_date  2021-05-06
 */

const DepartmentNameExport = props => {
    let {
        departmentAPI,
        deptChange,
        deptState,
        exportSalary
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            <>
                <CRow lg="12" style={{ marginBottom: '10px' }} className="custom-autocomplete">
                    <CCol lg="3" className="mb-4">
                        <CLabel id="lblDepartmentName">{t('Department Name')}</CLabel>
                        <CSelect className="bamawl-select" value={deptState} onChange={deptChange} custom>
                            <option key="" value="">{t("---Select Department---")}</option>
                            {departmentAPI !== "" &&
                                departmentAPI.map((department, index) => {
                                    return (<option key={index} name={department.department_name} value={department.id}> {department.department_name} </option>)
                                })
                            }
                        </CSelect>
                    </CCol>
                    <CCol lg="2" xs="2">
                        <CButton id="btnExport" className="form-btn custom-mar" style={{ marginLeft: "50px", minWidth: "135px", marginTop: "25px" }} onClick={exportSalary}><i className="fas fa-arrow-up"
                            style={{ margin: "5px", color: "#3300ff" }}></i>{t('Export Salary')}</CButton>
                    </CCol>
                </CRow>
            </>
        }
    </>
    );
}
export default DepartmentNameExport;
