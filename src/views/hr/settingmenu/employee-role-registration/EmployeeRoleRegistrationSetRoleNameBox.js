import { CCol, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeRoleRegistrationSetRoleNameBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" className="emp-role-regis-col-title">
            <CCol lg="4">
                <label className="required">{t('Set Role Name')}</label>
                <CSelect id="dropSetRoleName" value={props.roleNameState} className="bamawl-select" onChange={props.roleNameChange} custom>
                    <option key="" value="">{t('---Select Name---')}</option>
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
    </>)

}
export default EmployeeRoleRegistrationSetRoleNameBox