import React, { useEffect } from "react";
import { CRow, CButton } from "@coreui/react";
import { useTranslation } from "react-i18next";

const BusinessTripDetailButton = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let { confirmBusiness,
      confirmReason,
      downloadBusiness,
      mainTable
       }=props;
    return (
        <>
           <CRow lg="12" className="d-flex justify-content-center mb-5 mt-4 text-center">
                <div>
                    {mainTable.can_confirm == true && (
                        <>
                            <CButton className="form-btn m-2" onClick={confirmBusiness} id='btnConfirm'>{t('Confirm')}</CButton>
                            <CButton id="btnReject m-2" className="form-btn" onClick={confirmReason}> {t("Reject")}</CButton>
                        </>
                    )}
                    {mainTable !=="" && (
                        <CButton id="btnDownload" className="form-btn m-2" onClick={downloadBusiness}><i
                       className="fas fa-download mr-1" ></i>{t("Download")}</CButton>
                    )}
                </div>
        </CRow>
        </>
    );
};
export default BusinessTripDetailButton;
