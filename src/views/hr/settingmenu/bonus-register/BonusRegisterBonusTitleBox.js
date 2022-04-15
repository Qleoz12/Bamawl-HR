import { CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BonusRegisterBonusTitleBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12" className="bonus-register-title-row">
            <CCol lg="6" className="bonus-register-title-col" >
                <CImg className="bonus-register-title-img" src="avatars/list.png" alt="list" />
                <label id="lbBonusTitle"
                    className="ml-3 mt-2 bonus-register-value-label text-nowrap required">
                    {t('Bonus Title')}</label>
                <TextField className="bonus-register-text-field-title" aria-label="Close"
                    value={props.bonusTitleState}
                    onChange={props.getValueBonusTitle}
                    id="txtBonusTitle"
                    autoFocus={true} />
            </CCol>
        </CRow>
    </>)
}
export default BonusRegisterBonusTitleBox