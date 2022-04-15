import React from "react";
import { useTranslation } from 'react-i18next';
import { CImg, CButton } from "@coreui/react";

const EmployeeDataEntryPersonalDataEntry = props => {
    const { t } = useTranslation();
    let {
        handleDownload,
        handleImport,
        onUploadFileLabelPress
    } = props;
    return (
        <>
            <CImg src={'avatars/list.png'} className="mr-2 title-icon" alt="Title icon" />
            <span id="lbPersonalDataEntry">{t('Personal Data Entry')}</span>
            <fieldset>
                <CButton className="form-btn" onClick={handleDownload} id="btnFormatDownloadPDE">
                    <i className="fas fa-download icon-btn"> </i> &nbsp;
                    {t('Format Download')}
                </CButton>

                <label htmlFor="btnImportPDE" className="btn form-btn" tabIndex={0} onKeyPress={onUploadFileLabelPress} role="button">
                    <i className="fas fa-long-arrow-alt-down icon-btn pr-1"></i>&nbsp;
                    {t('Import')}
                </label>
                <input type="file" id="btnImportPDE" hidden onChange={handleImport} accept=".xlsx" />
            </fieldset>
        </>
    );
};

export default EmployeeDataEntryPersonalDataEntry;