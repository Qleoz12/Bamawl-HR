/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { CCol, CRow, CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeleteEmployeeDeductionList = props => {
  const { t } = useTranslation();
  let {
    mainTable,
    deleteToggleAlert,
  } = props
  useEffect(() => {
  });

  return (
    <>
      <CRow lg="12">
        <CCol style={{ textAlign: "center" }} >
          {
            mainTable != "" &&
            <CButton className="form-btn" id='btnDelete' name='btnDelete' onClick={deleteToggleAlert}>
              {t('Delete')}
            </CButton>
          }
        </CCol>
      </CRow>
    </>
  );
}
export default DeleteEmployeeDeductionList;