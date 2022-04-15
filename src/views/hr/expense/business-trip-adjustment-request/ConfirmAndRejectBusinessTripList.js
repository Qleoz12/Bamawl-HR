/* eslint-disable no-use-before-define */
import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../../common-validation/commonValidation';

const ConfirmAndRejectBusinessTripList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        deleteToggleAlert,
        showCheckDelete,
        showDelete,
        mainTable
    } = props;
    
    return (<>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                {!isEmpty(mainTable) &&
                    <>
                        <CButton className="form-btn" id='btnRequest' name='btnRequest' onClick={deleteToggleAlert} style={{ display: showCheckDelete && showDelete ? "inline" : "none" }}>
                            {t('Request')}
                        </CButton>
                    </>}
            </CCol>
        </CRow>
    </>
    );
}
export default ConfirmAndRejectBusinessTripList;
