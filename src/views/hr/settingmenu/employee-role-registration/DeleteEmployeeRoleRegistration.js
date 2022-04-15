import { CButton } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DeleteEmployeeRoleRegistration = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CButton className="form-btn emp-role-regis-margin-left"
            id='btnDelete'
            name='deleteBtn'
            onClick={props.deleteToggleAlert}
        >{t('Delete')}</CButton>
    </>)
}
export default DeleteEmployeeRoleRegistration;