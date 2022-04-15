import React from 'react';
import { CButton } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeleteEmployeeAllowanceList = props => {
    const { t } = useTranslation();
    let {
        cancelModel,
        mainTableLenght
    } = props
    return (
        mainTableLenght > 0 &&
        <>

            <div className="mt-2 d-flex justify-content-center">
                <CButton
                    className="form-btn"
                    onClick={cancelModel}
                    id='btnDelete'
                >
                    {t("Delete")}
                </CButton>
            </div>
        </>
    )
}

export default DeleteEmployeeAllowanceList