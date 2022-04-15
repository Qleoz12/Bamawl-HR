import {
    CButton,
    CCol,
    CRow
} from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';

const SaveBonusRegister = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol className="text-center">
                <CButton id="btnSave" className="form-btn" onClick={props.saveData} >{t('Save')}</CButton>
                {/* Confirmation for Save Button */}
                <Confirmation
                    content={props.content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={props.type}
                    show={props.saveModalBox}
                    cancel={() => props.setSaveModalBox(!props.saveModalBox)}
                    saveOK={props.saveOK}
                    updateOK={props.saveOK}
                />
            </CCol>
        </CRow>
    </>)
}
export default SaveBonusRegister