import {CCol,CRow} from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const FamilyMemberRegisterListInfoEmployee = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return(<>
            <CRow lg="12">
                <CCol lg="4"  className="border-right">
                    <label>{t('Employee ID')}</label><br />
                    <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }}>
                        {props.empId}
                    </div>
                </CCol>
                <CCol lg="4" className="border-right">
                    <label>{t('Employee Code')}</label><br />
                    <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }}>
                        {props.empCode}
                    </div>
                </CCol>
                <CCol lg="4" >
                    <label>{t('Employee Name')}</label><br />
                    <div className="autocomplete-wrapper text-muted" style={{ display: "grid" }}>
                        {props.empName}
                    </div>
                </CCol>
            </CRow>
            <br/>
       </>
    )
}
export default FamilyMemberRegisterListInfoEmployee;
