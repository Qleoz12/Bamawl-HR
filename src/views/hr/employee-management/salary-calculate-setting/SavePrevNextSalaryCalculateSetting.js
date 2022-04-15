import React, { useEffect } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
/**
 * SalaryCalculateSettingCalculateSalary Component use for SalaryCalculateSettingIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const SavePrevNextSalaryCalculateSetting = props => {
    let {
        nextEmployee,
        prevEmployee,
        saveData,
        permission
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (
        <>
            <br />
            <CRow lg="12">
                <CCol className="text-center inline-salary ">
                    <CButton id="btnSave" className="form-btn margin-right-4" onClick={saveData}>{t('Save')}</CButton>
                    {
                        permission !== ViewPermision.ONLY_ME &&
                        <>
                            <CButton id="btnPrev" className="form-btn btn-navigation" onClick={prevEmployee}>
                                <i style={{ color: "#7bbe35" }} className="fas fa-step-backward mr-2"></i>{t('Prev')}
                            </CButton>
                            <CButton id="btnNxt" className="form-btn btn-navigation ml-2" onClick={nextEmployee}>
                                {t('Next')}<i style={{ color: "#7bbe35" }} className="fas fa-step-forward ml-2"></i>
                            </CButton>
                        </>
                    }
                </CCol>
            </CRow>
        </>
    )
}

export default SavePrevNextSalaryCalculateSetting;