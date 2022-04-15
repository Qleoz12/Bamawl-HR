import React from "react";
import { useTranslation } from 'react-i18next';
import { CImg, CButton } from "@coreui/react";

const EmployeeDataEntrySalaryDataEntry = props => {
    const { t } = useTranslation();
    let {
        handleDownload,
        handleImport,
        onUploadFileLabelPress,
    } = props;
    return (
        <>
            <CImg src={'avatars/list.png'} className="mr-2 title-icon" alt="Title icon" />
            <span id="lbSalaryDataEntry">{t('Salary Data Entry')}</span>
            <fieldset>
                <CButton className="form-btn" onClick={handleDownload} id="btnFormatDownloadSDE" >
                    <i className="fas fa-download icon-btn"></i> &nbsp;
                    {t('Format Download')}
                </CButton>
                <label className="btn form-btn" htmlFor="btnImportSDE" tabIndex={0} onKeyPress={onUploadFileLabelPress} role="button">
                    <i className="fas fa-long-arrow-alt-down icon-btn"></i> &nbsp;
                    {t('Import')}
                    <input type="file" hidden onChange={handleImport} id="btnImportSDE" accept=".xlsx" />
                </label>
            </fieldset>
        </>
    );
};

export default EmployeeDataEntrySalaryDataEntry;