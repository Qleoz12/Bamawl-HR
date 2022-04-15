import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EmployeeInfoDetailContractFileBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && props.detailData.employee_has_upload_info.contract_file.length > 0 && (
                <Fragment>
                    <CRow lg="12">
                        <div className="emp-info-detail-input-file  pl-3 mt-4">
                            <img
                                type="image"
                                src={'avatars/addlllowance.png'}
                                className="emp-info-detail-allowance-img"
                            />
                            <div className="emp-info-detail-allowance-label">{t('Contract File')}</div>
                        </div>
                    </CRow>
                    <CRow lg="12">
                        <CCol lg="12" className=" pl-3 mt-3">
                            <CCard className='pt-4 px-4 table-panel emp-info-card-color'>
                                <CCard className="table-panel emp-info-card-border">
                                    <div className="pt-4 px-3 table-responsive">
                                        <table className="table">
                                            <thead id="thead-id">
                                                <tr width="100%">
                                                    <th id="tblNoContractFile" width="10%" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("No")}
                                                    </th>
                                                    <th id="tblFilePathContractFile" width="70%" className="responsive-tableTh">
                                                        <CImg
                                                            className="mr-2 checkIO-request-title-icon-img-col-table"
                                                            src="avatars/titleicon.png"
                                                            alt="titleicon"
                                                        />
                                                        {t("File Path")}
                                                    </th>
                                                    {props.detailData.employee_has_upload_info.show_download && (
                                                        <th id="tblDownloadContractFile" width="20%" className="responsive-tableTh">
                                                            <CImg
                                                                className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                src="avatars/titleicon.png"
                                                                alt="titleicon"
                                                            />
                                                            {t("Download")}
                                                        </th>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.detailData.employee_has_upload_info.contract_file.map((i, index) => {
                                                    return (
                                                        <tr key={index} width="100%">
                                                            <td id="tblNoContractFile" width="" className="text-right td-no">
                                                                {index + 1}
                                                            </td>
                                                            <td id="tblFilePathContractFile" width="" className="td-green text-left responsive-tableTh">
                                                                {i.employee_document_name}
                                                            </td>
                                                            {props.detailData.employee_has_upload_info.show_download && (
                                                                <td id="tblDownloadContractFile" width="" className="text-center">
                                                                    <input
                                                                        type="image"
                                                                        id="tblDownload"
                                                                        src={'avatars/download.png'}
                                                                        className="icon-clt"
                                                                        alt="download"
                                                                        onClick={props.downLoadFile.bind(this, i, i.employee_document_name)}
                                                                    />
                                                                </td>
                                                            )}
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </CCard>
                            </CCard>
                        </CCol>
                    </CRow>
                </Fragment>
            )}
            {props.detailData && props.detailData.employee_has_upload_info.contract_file.length === 0 && (
                <Fragment>
                    <CRow lg="12">
                        <div className="emp-info-detail-input-file  pl-3 mt-4">
                            <input
                                type="image"
                                src={'avatars/addlllowance.png'}
                                className="emp-info-detail-allowance-img"
                            />
                            <div className="emp-info-detail-allowance-label">{t('Contract File')}</div>
                        </div>
                    </CRow>
                    <CRow lg="12">
                        <CCol lg="12" className=" pl-3 mt-3">
                            <CCard className='pt-4 px-4 table-panel emp-info-card-color'>
                                <CCard className="table-panel emp-info-card-border">
                                    <div className="pt-4 px-3 table-responsive ">
                                    </div>
                                </CCard>
                            </CCard>
                        </CCol>
                    </CRow>
                </Fragment>
            )}
        </>
    )
}
export default EmployeeInfoDetailContractFileBox;