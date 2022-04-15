import { CCol, CLabel, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const RoleAndPermissionRegistrationDashboardBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        mainTable,
        handleRadioChange,
        radioCheck,
        handleViewChange,
        viewCheck
    } = props;
    return (<>
        {mainTable && mainTable.length > 0 &&
            <>
                <CRow className="pb-3" lg="12">
                    <CCol lg="3">
                        <CLabel id="roleQuestion">{t('Can this Role see whose requests at Dashboard and List?')}<span className="role-and-permission-registration-labe-required">*</span></CLabel>
                    </CCol>
                    <CCol>
                        <div>
                            <label>
                                <input className="ml-2" id="1" type="radio" value={1} name="role-requests" onChange={handleRadioChange} checked={radioCheck === 1} />
                                {t('  All')}</label>
                            <br></br>

                            <label>
                                <input className="ml-2" id="0" type="radio" value={0} name="role-requests" onChange={handleRadioChange} checked={radioCheck === 0} />
                                {t('  Only Me')}</label>
                            <br></br>

                            <label>
                                <input className="ml-2" id="2" type="radio" value={2} name="role-requests" onChange={handleRadioChange} checked={radioCheck === 2} />
                                {t('  My Data and who send request to me')} </label>

                        </div>
                    </CCol>
                </CRow>
                <CRow className="pb-3" lg="12">
                    <CCol lg="3">
                        <CLabel className="role-permission-right" id="roleQuestion">{t('View permission criteria')}<span className="role-and-permission-registration-labe-required">*</span></CLabel>
                    </CCol>
                    <CCol>
                        <div>
                            <label>
                                <input className="ml-2" id="1" type="radio" value={1} name="role-views" onChange={handleViewChange} checked={viewCheck === 1} />
                                {t('  All')}</label>
                            <br></br>

                            <label>
                                <input className="ml-2" id="0" type="radio" value={0} name="role-views" onChange={handleViewChange} checked={viewCheck === 0} />
                                {t('  Only Me')}</label>
                            <br></br>

                            <label>
                                <input className="ml-2" id="2" type="radio" value={2} name="role-views" onChange={handleViewChange} checked={viewCheck === 2} />
                                {t('  My Data and my member')} </label>
                            <br></br>

                            <label>
                                <input className="ml-2" id="3" type="radio" value={3} name="role-views" onChange={handleViewChange} checked={viewCheck === 3} />
                                {t('  All But not money')} </label>

                        </div>
                    </CCol>
                </CRow>
            </>
        }
    </>
    );

}

export default RoleAndPermissionRegistrationDashboardBox;