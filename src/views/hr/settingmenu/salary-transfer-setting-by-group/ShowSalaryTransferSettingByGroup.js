import { CImg, CLabel, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ShowSalaryTransferSettingByGroup = props => {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow lg="12" className="mb-4">
            <input type="image" tabIndex={1} src={'avatars/addlllowance.png'} className="add-icon sal-trans-group-img" id="btnEmployeeList" alt="Employee List" onClick={props.employeeList}/>
            <CLabel className="mt-2 ml-1">{t('Employee List')}</CLabel>
        </CRow>
    </>
    );
}

export default ShowSalaryTransferSettingByGroup;