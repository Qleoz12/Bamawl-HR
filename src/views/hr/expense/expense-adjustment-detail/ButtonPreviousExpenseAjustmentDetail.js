/* eslint-disable eqeqeq */
import {CButton } from '@coreui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ButtonPreviousExpenseAjustmentDetail = props => {
  const { t } = useTranslation();
  let {
    clickBack
  } = props;

  return (
    <>
        <div className="clearfix">
            <div className="float-right ">
            <CButton
                    tabIndex="0"
                    onClick={clickBack}
                    style={{ backgroundColor: "#F4F6FD" }}>
                    <i className="fa fa-step-backward" aria-hidden="true" style={{ color: "#76cc39" }}></i>
                    {t("Previous")}
                </CButton>
            </div>
        </div>
    </>
  )
}

export default ButtonPreviousExpenseAjustmentDetail
