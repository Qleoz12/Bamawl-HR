import { CButton } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const NextPreviousPageEmployeeLeaveSetting = props => {
  const { t } = useTranslation();
  const{
    history
  }=props;
  useEffect(() => {
  });

  return (<>
    <div style={{display:'flex'}}>
        <CButton type="button"
                onClick={() => history.push("./family-member-register-list")}
                style={{ backgroundColor: "#F4F6FD",marginLeft:"0px" }}>
                <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                {t("Previous")}
        </CButton>
        <CButton type="button"
        className="ml-2"
                onClick={() => history.push("./salary-calculate-setting")}
                style={{ backgroundColor: "#F4F6FD" }}>
                {t("Next")}
                <i className="fas fa-step-forward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
        </CButton>
    </div>

  </>);
}
export default NextPreviousPageEmployeeLeaveSetting;
