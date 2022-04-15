import { CButton } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SaveEmployeeRoleRegistration = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CButton className="form-btn"
            id='btnSave'
            name='saveBtn'
            onClick={props.saveToggleAlert}
        >{t('Save')}</CButton>
    </>)
}
export default SaveEmployeeRoleRegistration;