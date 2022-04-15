import React, { useEffect } from 'react';
import { CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * SaveCancelEmployeeAllowanceRegistration Component use for EmployeeOvertimeRegistrationIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const SaveCancelEmployeeAllowanceRegistration = props => {
    let {
        saveData,
        cancelData,
        mainTable
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (
        mainTable.length > 0 &&
        <>
            <CRow lg="12">
                <CCol className="text-center">
                    <CButton id="btnSave" className="form-btn mr-2" onClick={saveData}>{t('Save')}</CButton>
                    <CButton id="btnCancel" className="form-btn" onClick={cancelData} >{t('Cancel')}</CButton>
                </CCol>
            </CRow><br />
        </>
    )
}

export default SaveCancelEmployeeAllowanceRegistration;