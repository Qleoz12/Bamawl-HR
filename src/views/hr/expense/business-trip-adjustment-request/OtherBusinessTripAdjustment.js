/* eslint-disable eqeqeq */
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { CButton, CCard, CCol, CImg, CInput, CLabel, CRow, CSelect, CTextarea } from '@coreui/react';
import OtherTableBusinessTripAdjustment from './OtherTableBusinessTripAdjustment';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const OtherBusinessTripAdjustment = props => {
    let {
        allCurrency,
        data, setData,
        subTotal,
        titleState, setTitleState,
        unitPriceState, setUnitPriceState,
        unitCurrency, setUnitCurrency,
        timesState, setTimesState,
        totalState, setTotalState,
        acceptCurrency, setAcceptCurrency,
        fxRateState, setFxRateState,
        acceptAmountState, setAcceptAmountState,
        checkInState, setCheckInState,
        descriptionState, setDescriptionState,
        checkerState, setCheckerState,
        multiFile, setMultiFile,
        flagHidden, setFlagHidden,
        btnRemoveRowTable,
        handleImportFile,
        handleChangeCurrency,
        removeFile,
        updateTable,
        handleChangeTitle,
        handleChangePrice,
        handleChangeTimes,
        handleChangeFxRate,
        handleChangeInDate,
        handleChangeChecker,
        handleChangeDescription,
        btnAddRow,
        onchangeInput,
        btnRemoveFileInTable,
        handleChangeDateInTable,
        onchangePriceDropdown,
        onchangeAcceptDropdown,
        hanldeChangeReason,
        onUploadPress,
        refUpload
        // removeDateInOther
    } = props

    const { t } = useTranslation();

    return (
        <>
            <CRow lg="12">
                <CCol className="">
                    <CImg src={'avatars/list.png'} alt="titleicon" className="title-icon" />
                    <CLabel style={{ fontWeight: "bold" }} id="lbOther" className="title-lbl">{t('Other')}</CLabel>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol className="">
                    <CCard className="table-panel table-panel-businesstrip-adjustment">
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblTitle" className="required">
                                    {t('Title')}
                                </CLabel>
                                <CInput placeholder={t('Enter Title')} id="txtTitle" value={titleState} onChange={(e) => handleChangeTitle(e, setTitleState)} className="bamawl-select gray-background" ></CInput>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblUnitPrice" className="required">
                                    {t('Unit Price')}
                                </CLabel>
                                <CRow>
                                    <CCol className="">
                                        <CInput id="txtQty"
                                            placeholder={t('Enter Price')}
                                            className="bamawl-select gray-background"
                                            value={unitPriceState}
                                            onChange={(e) => handleChangePrice(e, timesState, setUnitPriceState, setTotalState, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState)}
                                        ></CInput>
                                    </CCol>
                                    <CCol md="5">
                                        <CLabel className="expense-request-label-disable">
                                        </CLabel>
                                        <CSelect className="bamawl-select" name="unit" value={unitCurrency} onChange={(e) => handleChangeCurrency(e, acceptCurrency, unitCurrency, setFlagHidden, setAcceptAmountState, setUnitCurrency, setAcceptCurrency, totalState, fxRateState)} custom>
                                            {
                                                allCurrency.map((i, index) => {
                                                    return (<option key={i.id} value={i.id}> {i.currency_desc} </option>)
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>

                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblDays/Times" className="required">
                                    {t('Days/Times')}
                                </CLabel>
                                <CInput className="bamawl-select gray-background" id="txtDays/Times" placeholder={t('Enter Days/Times')} value={timesState} onChange={(e) => handleChangeTimes(e, unitPriceState, setTimesState, setTotalState, unitCurrency, acceptCurrency, setAcceptAmountState, fxRateState)} ></CInput>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblTotal" className="expense-request-label-disable">
                                    {t('Total')}
                                </CLabel>
                                <TextField id="txtTotal" value={totalState} disabled={true} ></TextField>
                            </CCol>
                        </CRow>

                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" xl="5" lg="6" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblAcceptCurrency" className="required">
                                    {t('Accept Currency')}
                                </CLabel>
                                <CRow>
                                    <CCol xl="5">
                                        <CSelect className="bamawl-select" name="accept" value={acceptCurrency} onChange={(e) => handleChangeCurrency(e, acceptCurrency, unitCurrency, setFlagHidden, setAcceptAmountState, setUnitCurrency, setAcceptCurrency, totalState, fxRateState)} custom>
                                            {
                                                allCurrency.map((i, index) => {
                                                    return (i.expense_flag === 1 &&
                                                        <option key={i.id} value={i.id}> {i.currency_desc} </option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    {!flagHidden && (
                                        <Fragment>
                                            <CCol xl="4">
                                                <CInput id="txtFXRate"
                                                    placeholder={t('Enter fx rate')}
                                                    className="bamawl-select gray-background"
                                                    value={fxRateState}
                                                    onChange={(e) => handleChangeFxRate(e, setFxRateState, setAcceptAmountState, totalState)}
                                                ></CInput>
                                            </CCol>
                                            <CCol xl="3">
                                                <CLabel id="lblFXRate" className="required expense-request-label text-nowrap fx-rate">
                                                    {t('FX Rate')}
                                                </CLabel>
                                            </CCol>
                                        </Fragment>
                                    )}
                                </CRow>
                            </CCol>
                            <CCol lg="2"><div className="line"></div></CCol>
                            <CCol className="" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lblAcceptAmount" className="expense-request-label-disable">
                                    {t('Accept Amount')}
                                </CLabel>
                                <TextField id="txtAcceptAmount" value={acceptAmountState} disabled={true} ></TextField>
                            </CCol>
                        </CRow>

                        <CRow lg="12">
                            <CCol lg="5" className="mb-4">
                                <CLabel id="lblDate" className="required">{t('Date')}</CLabel>
                                <DatePicker value={checkInState} change={(e) => handleChangeInDate(e, setCheckInState)} />
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="" xl="5" lg="5" style={{ marginBottom: "10px", alignSelf: "end" }}>
                                <div>
                                    <CLabel id="lblDescription">
                                        {t('Description')}
                                    </CLabel>
                                    <CLabel
                                        className="expense-request-checkbox expense-request-checkbox-admin">
                                        <div className="pr-2">
                                            <input type="checkbox" id="chkAttachement" onChange={() => handleChangeChecker(checkerState, setCheckerState)} checked={checkerState} />
                                        </div>
                                        <small id="lblArrangebyAdmin">{t('Arrange by Admin')}</small>
                                    </CLabel>
                                </div>
                                <CTextarea
                                    placeholder="Enter Description"
                                    id="txtDescription"
                                    className="business-trip-adjustment-textarea-input business-trip-adjustment-text-area"
                                    value={descriptionState}
                                    onChange={(e) => handleChangeDescription(e, setDescriptionState)}
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
                                    <a id="importFileOther" className="expense-request-attachment-file-browser" tabIndex={0}>
                                        {t('Browse')}
                                    </a>
                                    <input
                                        value=""
                                        type="file"
                                        htmlFor="importFileOther"
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
                            <CButton id="btnAdd" className="btn form-btn" onClick={() => btnAddRow(titleState, unitPriceState, timesState, acceptCurrency, unitCurrency, fxRateState, checkInState, null, multiFile, checkerState, descriptionState, setData, data, "Other")}>{t('ADD')}</CButton>
                        </CCol>
                        <br />
                        <OtherTableBusinessTripAdjustment
                            allCurrency={allCurrency}
                            subTotal={subTotal}
                            btnAddRow={btnAddRow} data={data} setData={setData}
                            btnRemoveFileInTable={btnRemoveFileInTable}
                            btnRemoveRowTable={btnRemoveRowTable} updateTable={updateTable}
                            onchangeInput={onchangeInput}
                            handleChangeDateInTable={handleChangeDateInTable}
                            onchangePriceDropdown={onchangePriceDropdown}
                            onchangeAcceptDropdown={onchangeAcceptDropdown}
                            hanldeChangeReason={hanldeChangeReason}
                        />
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default OtherBusinessTripAdjustment;