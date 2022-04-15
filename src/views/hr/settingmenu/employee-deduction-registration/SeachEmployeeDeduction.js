/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CCol, CRow, CButton } from '@coreui/react';
/**
 * SeachEmployeeDeduction
 * 
 * @author  v_hao
 * @create_date  2021-05-31
 */
const SeachEmployeeDeduction = props => {
    let {
        searchAPI,
        calMethod,
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" className="overtime-rate" >
            {calMethod == true &&
                <CCol style={{ textAlign: "center", marginTop: "15px" }}>
                    <CButton id="btnSearchApplicant" className="form-btn"
                        onClick={searchAPI}
                    >{t('Search')}</CButton>
                </CCol>
            }
        </CRow>
    </>
    );
}
export default SeachEmployeeDeduction;