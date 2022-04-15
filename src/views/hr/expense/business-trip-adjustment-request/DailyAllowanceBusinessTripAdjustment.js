import React, { } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import DailyAllowanceTableBusinessTripAdjustment from './DailyAllowanceTableBusinessTripAdjustment';
import { CButton, CCard, CCol, CImg, CInput, CLabel, CRow, CSelect, CTextarea } from '@coreui/react';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const DailyAllowanceBusinessTripAdjustment = props => {
    const { t } = useTranslation();

    let { onAllowanceTitleChangeTable,
        btnRemoveRowTableAllwance,
        subTotal, btnRemoveFileInTableAllwance,
        descriptionAllwanceState,
        handleChangeDescriptionAllwance,
        handleChangeDateOutTableAllwance,
        allowanceAPI,
        allCurrency,
        unitPriceAllowance,
        handleDateAllowanceChange,
        dateAllowance,
        currencyAllowance,
        dayTimeAllwance,
        dayTimeAllwanceChange,
        totalAllwance,
        dataAllwance,
        onAllowanceTitleChange,
        allowanceState,
        multiFile,
        btnAddRowAllwance,
        numCurrencies,
        hanldeChangeReason,
        setDataAllwance,
    } = props;

    return (
        <>
            <CRow lg="12">
                <CCol className="">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="title-icon" />
                    <CLabel style={{ fontWeight: "bold" }} id="lblDailyAllowance" className="title-lbl">{t('Daily Allowance')}</CLabel>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol className="">
                    <CCard className="table-panel table-panel-businesstrip-adjustment">
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <label id="lblAllowance" className="required">{t("Allowance Name")}</label>
                                <br />
                                <CSelect className="bamawl-select" value={allowanceState} onChange={onAllowanceTitleChange} custom>
                                    <option key="" value="">---{t('Select Allowance')}---</option>
                                    {
                                        allowanceAPI.map((i, index) => {
                                            return (<option key={index} name={i.others_allowance} value={i.id}> {i.others_allowance} </option>)
                                        })
                                    }
                                </CSelect>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblUnitPrice" className="required expense-request-label-disable">
                                    {t('Unit Price')}
                                </CLabel>
                                <CRow>
                                    <CCol className="">
                                        <CInput id="txtUnitPrice"
                                            placeholder={t('Enter Price')}
                                            className="bamawl-select gray-background"
                                            value={unitPriceAllowance}
                                            disabled
                                        ></CInput>
                                    </CCol>
                                    <CCol md="5" className="mt-1">
                                        <CLabel className="expense-request-label-disable">
                                        </CLabel>
                                        <TextField id="txtUnitPrice"
                                            className="expense-request-input-card-detail custom_backgrond expense-request-label-disable"
                                            value={currencyAllowance}
                                            disabled
                                        ></TextField>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblDays/Times" className="required">
                                    {t('Days/Times')}
                                </CLabel>
                                <CInput className="bamawl-select gray-background" id="txtDays/Times" placeholder={t('Enter Days/Times')} value={dayTimeAllwance} onChange={dayTimeAllwanceChange} ></CInput>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblTotal" className="expense-request-label-disable">
                                    {t('Total')}
                                </CLabel>
                                <TextField id="txtTotal" value={totalAllwance} disabled ></TextField>
                            </CCol>
                        </CRow>
                        <CRow lg="12">
                            <CCol lg="5" className="mb-4">
                                <CLabel id="lblDate" className="required">{t('Date')}</CLabel>
                                <DatePicker value={dateAllowance} change={handleDateAllowanceChange} />
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" xl="5" lg="5" style={{ marginBottom: "10px", alignSelf: "end" }}>
                                <div>
                                    <CLabel id="lblDescription">
                                        {t('Description')}
                                    </CLabel>
                                </div>
                                <CTextarea
                                    placeholder="Enter Description"
                                    id="txtDescription"
                                    className="business-trip-adjustment-textarea-input business-trip-adjustment-text-area"
                                    value={descriptionAllwanceState}
                                    onChange={handleChangeDescriptionAllwance}
                                />
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" xl="5" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbAttachmentCardDetail">
                                    {t('Attachment')}
                                </CLabel>
                                <div className="pt-lg-4">
                                    <i className="fas fa-paperclip"></i>
                                    <label className="expense-request-attachment-file-label" >{t('Drag & Drop files to attach or')}
                                    </label>
                                    &nbsp;
                                    <a id="importFileAllwance" className="expense-request-attachment-file-browser" tabIndex={0}>
                                        {t('Browse')}
                                    </a>
                                    <input
                                        value=""
                                        type="file"
                                        htmlFor="importFileAllwance"
                                        style={{ opacity: "0", position: "absolute", left: "12px", zindex: "9999999" }}
                                        multiple
                                        accept=".pdf,.jpg,.jpeg,.png,.PDF,.JPG,.JPEG,.PNG"
                                        onChange={(e) => props.handleImportFile(e, props.multiFile, props.setMultiFile)} />
                                    <div style={{}} >
                                        {
                                            props.multiFile.map((ele, index) => {
                                                let file_name = ele.name;
                                                if (file_name.length > 21) {
                                                    file_name = file_name.substring(0, 9).concat("...")
                                                        .concat(file_name.substring(file_name.length - 10, file_name.length));
                                                }
                                                return (
                                                    <span key={index}>
                                                        <i className="fas fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{file_name}&nbsp;
                                                        <i className="fa fa-times" style={{ cursor: "pointer" }} onClick={() => props.removeFile(props.multiFile, props.setMultiFile, index)} ></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        <CCol lg="12" style={{ textAlign: "center" }}>
                            <CButton ib="btnAdd" className="btn form-btn" onClick={() => btnAddRowAllwance(multiFile)}>{t('ADD')}</CButton>
                        </CCol>
                        <br />
                        <DailyAllowanceTableBusinessTripAdjustment
                            allCurrency={allCurrency}
                            numCurrencies={numCurrencies}
                            dataAllwance={dataAllwance}
                            setDataAllwance={setDataAllwance}
                            onAllowanceTitleChangeTable={onAllowanceTitleChangeTable}
                            allowanceAPI={allowanceAPI}
                            btnRemoveFileInTableAllwance={btnRemoveFileInTableAllwance}
                            handleChangeDateOutTableAllwance={handleChangeDateOutTableAllwance}
                            subTotal={subTotal}
                            btnRemoveRowTableAllwance={btnRemoveRowTableAllwance}
                            hanldeChangeReason={hanldeChangeReason}
                        />
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default DailyAllowanceBusinessTripAdjustment;