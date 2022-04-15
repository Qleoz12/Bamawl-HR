/* eslint-disable no-use-before-define */
import { CButton, CCard, CCol, CImg, CRow, CTextarea } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const EducationContractFileTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            // !isEmpty(props.mainTable)  &&
            <>
                {
                    props.detailAPI &&
                    props.detailAPI.map((data, index) => {
                        return (<Fragment key={index}>
                            <CRow lg="12">
                                <div className="employee-personal pl-3 mt-4" style={{ display: "flex", marginTop: "30px" }}>
                                    <input
                                        type="image"
                                        src={'avatars/addlllowance.png'}
                                        style={{ width: '40px', height: "40px" }}
                                        onClick={props.editData ? props.addContractFile : null}
                                        className={props.editData ? "cursor-pointer" : "not-allowed"}
                                    />
                                    <div style={{ marginTop: "10px", marginLeft: "10px" }}><label>{t('Contract File')}</label></div>
                                </div>
                            </CRow>
                            <CCard className='table-panel mt-2' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                                <CRow id="table" style={{ padding: "20px" }}>
                                    <CCol lg="12">
                                        <CCol lg="12">
                                            <CRow alignHorizontal="end">
                                                <div className="row-count-msg">{props.rowCount}</div>
                                            </CRow>
                                        </CCol>

                                        <div className="table-responsive">
                                            <table className="table purchase-order-list" aria-label="simple table">
                                                <thead id="thead-id">
                                                    {
                                                        props.mainTable !== "" &&
                                                        <tr width="100%">
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('No')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('File Path')}
                                                            </th>
                                                            <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                {t('Download')}
                                                            </th>
                                                            {!isEmpty(props.editData) &&
                                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                                    {t('Delete')}
                                                                </th>
                                                            }
                                                        </tr>

                                                    }

                                                </thead>
                                                <tbody >
                                                    {
                                                        props.tableContractFile !== "" &&
                                                        props.tableContractFile.map((i, index) => {
                                                            var file_ = i.employee_document_name.split("/");
                                                            var file_name = file_[file_.length - 1];
                                                            return (<Fragment key={index}>
                                                                <tr width="100%">
                                                                    <td className="td-num td-no textAlignRight" >
                                                                        {index + 1}
                                                                    </td>
                                                                    <td width="" className="td-emp-id td-blue textAlignLeft" >
                                                                        {file_name}
                                                                    </td>

                                                                    <td width="" >
                                                                        <input
                                                                            type="image"
                                                                            id="tblDownload"
                                                                            src={'avatars/download.png'}
                                                                            className="icon-clt"
                                                                            alt="download"
                                                                            onClick={props.downLoadContractFile.bind(this, i)}
                                                                        />
                                                                    </td>
                                                                    {!isEmpty(props.editData) &&
                                                                        <td width="" >
                                                                            <input
                                                                                type="image"
                                                                                id="tblDelete"
                                                                                src={'avatars/remove.png'}
                                                                                className="icon-clt"
                                                                                alt="edit"
                                                                                onClick={props.removeRowContractFile.bind(this, i)}
                                                                            />
                                                                        </td>
                                                                    }
                                                                </tr>
                                                            </Fragment>)
                                                        })}
                                                </tbody>
                                            </table>

                                        </div>
                                    </CCol>
                                </CRow>
                                <CRow lg="12">
                                    <CCol className="emp-list-btnExport-col">
                                        <div style={{ position: "relative" }}>
                                            {props.listContractFile != "" &&
                                                props.listContractFile.map((sec, i) => {
                                                    return (<Fragment key={i}>
                                                        <div className="mt-3 personal-flex">
                                                            <i className="fas fa-paperclip"></i>
                                                            <label style={{ position: "relative" }}>&nbsp;{sec.file_name !== "" ? sec.file_name : t('Drag & Drop files to attach or')}&nbsp;</label>
                                                            <input
                                                                ref={(element) => props.inputFileContract.current[i] = element}
                                                                onChange={props.handleFileUploadContract.bind(this, i)}
                                                                type="file"
                                                                style={{ opacity: "0", position: "absolute", zindex: "9999999" }}
                                                                id={i}
                                                            />
                                                            <a style={{ borderBottom: "dotted 1.5px", color: "blue", cursor: "pointer" }} onClick={props.onButtonClickContract.bind(this, i)}>
                                                                {t('Browse')}
                                                            </a>
                                                        </div>
                                                        <div className="ml-3" style={{ margin: "5px" }}>
                                                            <CButton val_cancel={i} id={i} className="form-btn" onClick={props.cancelContract.bind(this, i)}>{t('Cancel')}</CButton>
                                                        </div>
                                                    </Fragment>)
                                                })
                                            }
                                        </div>
                                    </CCol>
                                </CRow><br />
                            </CCard>
                            <CRow lg="12">
                                <CCol lg="5" className="mb-4" >
                                    <label id="lbStatus">{t('Address')}</label>
                                    <div className="input-emp-list">
                                        <CTextarea disabled className={props.editData ? "textbox-lines not-allowed" : "textbox-lines"} onChange={props.changeAddress} id="txtAddress" rows="2" style={{ color: "currentColor" }} value={data.addressess.address ? data.addressess.address : ""}></CTextarea>
                                    </div>
                                </CCol>
                                <CCol lg="2">
                                    <div className="line"></div>
                                </CCol>
                                <CCol lg="5" className="mb-4" >
                                    <label id="lbMaritalStatus">{t('Phone Number')}</label>
                                    <div className="input-emp-list">
                                        <TextField disabled onChange={props.changePhoneNumber} id="txtPhoneNumber" fullWidth value={data.addressess.phone ? data.addressess.phone : ""} />
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow lg="12">
                                <CCol lg="5" className="mb-4" >
                                    <label id="lbStatus" className="required">{t('SSB Number')}</label>
                                    <div className="input-emp-list">
                                        <TextField type="text" id="txtEmail" onChange={props.changeSSBNumber} id="txtSSBNumber" fullWidth value={props.SSBNumber ? props.SSBNumber : ""} />
                                    </div>
                                </CCol>
                            </CRow>
                        </Fragment>)
                    })
                }
            </>
        }
    </>
    );
}
export default EducationContractFileTable;
