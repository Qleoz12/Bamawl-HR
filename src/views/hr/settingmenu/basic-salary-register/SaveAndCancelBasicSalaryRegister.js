/* eslint-disable no-use-before-define */
import {
  CButton, CCol,
  CRow
} from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SaveAndCancelBasicSalaryRegister = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    <br />
    {props.mainTable != "" && (
      <CRow className="" lg="12">
        <CCol className="t-align-center">
          <CButton className="form-btn"
            id="btnSave"
            onClick={props.saveData}>

            {t("Save")}
          </CButton>
          <CButton
            className="form-btn ml-3"
            id="btnCancel"
            onClick={props.cancelData}
          >
            {t("Cancel")}
          </CButton>
        </CCol>
      </CRow>
    )}
  </>
  );
}
export default SaveAndCancelBasicSalaryRegister;