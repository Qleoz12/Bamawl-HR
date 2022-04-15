import { CRow, CSwitch } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SwitchBonusRegister = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (
    <>
      <CRow className="bonus-register-title-col">
        <label id="lbQuestion" className="ml-4">{t("Do you want to pay with salary?")}</label>
        <CSwitch
          className={"mx-1 c-switch-sm ml-4 switch-bonus-register-usd"}
          shape={"pill"}
          color={"success"}
          labelOn={"Yes"}
          labelOff={"No"}
          onChange={props.getPayWithSalary}
          id="swYes"
          checked={props.payWithSalary === true}
        />
      </CRow>
    </>
  );
}
export default SwitchBonusRegister