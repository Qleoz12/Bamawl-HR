/**
 * No Permission Dashboard Form
 * @author Thin Thin Nwe
 * @create 6/8/2021 d/m/yyyy
 */

import { CCard, CCardBody, CRow } from '@coreui/react'
import React from "react";
import { withTranslation } from 'react-i18next'

function LegacyWelcomeClass({ t }) {
  let login_id = localStorage.getItem("LOGIN_ID");
  
  return (
    <CCard className="border-0  px-0 mr-auto border-radius">
      <CCardBody className="mx-0">
        <CRow>
          <h5 className="require ml-2">{t(`Employee ${login_id} is not registered in HR system.`)}</h5>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default withTranslation()(LegacyWelcomeClass)