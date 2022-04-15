/* eslint-disable no-use-before-define */
import { CButton, CCol, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const DeletePerfectAttendanceSetupList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CRow lg="12">
            <CCol style={{ textAlign: "center" }}>
                {!isEmpty(props.mainTable) &&
                    <CButton className="form-btn" id='deleteBtn' name='deleteBtn' style={{margin: "10px"}} onClick={props.deleteToggleAlert}>
                        {t('Delete')}
                    </CButton>
                }
            </CCol>
        </CRow>
    </>
    );
}
export default DeletePerfectAttendanceSetupList;