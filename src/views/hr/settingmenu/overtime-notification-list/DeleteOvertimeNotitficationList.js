/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeleteOvertimeNotitficationList = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    <CRow lg="12">
      <CCol style={{ textAlign: "center" }}>
        {props.mainTable != "" &&
          <CButton className="form-btn" id='btnDelete' name='btnDelete' onClick={props.deleteToggleAlert}>
            {t('Delete')}
          </CButton>
        }
      </CCol>
    </CRow>
  </>
  );
}
export default DeleteOvertimeNotitficationList;