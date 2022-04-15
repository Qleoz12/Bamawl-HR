import React, { useEffect } from "react";
import { CRow, CButton} from "@coreui/react";
import { useTranslation } from "react-i18next";

const ButtonRequestBusinessTripRequest = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let{
        requestClick
    }=props
    return (
        <>{
        <CRow className="justify-content-center">
            <CButton onClick={requestClick} className="form-btn">
                {t('Request')}
            </CButton>
        </CRow> 
        }          
        </>
    );
};
export default ButtonRequestBusinessTripRequest;
