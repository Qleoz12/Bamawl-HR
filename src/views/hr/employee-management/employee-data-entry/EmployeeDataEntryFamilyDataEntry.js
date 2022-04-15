import React from "react";
import { useTranslation } from 'react-i18next';
import { CImg, CButton } from "@coreui/react";

const EmployeeDataEntryFamilyDataEntry = props => {
    const { t } = useTranslation();
    let {
        handleDownload,
        handleImport,
        onUploadFileLabelPress,
    } = props;
    return (
        <>
            <CImg src={'avatars/list.png'} className="mr-2 title-icon" alt="Title icon" />
            <span id="lbFamilyDataEntry">{t('Family Data Entry')}</span>
            <fieldset>
                <CButton className="form-btn" onClick={handleDownload} id="btnFormatDownloadFDE" >
                    <i className="fas fa-download icon-btn"></i> &nbsp;
                    {t('Format Download')}
                </CButton>
                <label htmlFor="btnImportFDE" className="btn form-btn" tabIndex={0} onKeyPress={onUploadFileLabelPress} role='button'>
                    <i className="fas fa-long-arrow-alt-down icon-btn pr-1"></i>&nbsp;
                    {t('Import')}
                </label>
                <input type="file" hidden onChange={handleImport}  id="btnImportFDE" accept=".xlsx"/>
            </fieldset>
        </>
    );
};

export default EmployeeDataEntryFamilyDataEntry;