import { CButton, CCard, CCol, CLabel, CRow, CTextarea,CSelect } from "@coreui/react";
import { TextField} from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExpenseAdjustmentRequestAddTable from './ExpenseAdjustmentRequestAddTable';
import DatePicker from '../../hr-common/datepicker/DatePicker';

const ExpenseAdjustmentRequestAdd = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });
    let{ dynamicTable,
        advanceAdditional,
        handleDateTableChange,
        removeRowDynamicTable,
        acceptCurrencyData,
        handlePriceTableChange,
        handleQtyTableChange,
        handleReasonChange,
        handleFXRateTableChange,
        handleAcceptTableChange,
        handlePriceCurrencyTableChange,
        unitPriceCurrencyData,
        checkByAdmin,
        changeCheckByAdmin,
        allCheckAdd,
        changeCheckAllAdd,
        reason,
        multiFileOtherAttach,
        removeFileOtherAttachement,
        setDynamicTable,
        onchangeInput,
        onchangeAcceptDropdown,
        onchangePriceDropdown,
        handleChangeDateInTable,
        budgetTotal,
        subTotal,
        acceptAmountAdd,
        advanceFlag,
        totalAdd,
        handleFileOtherAttachement,
        itemData,
        removeAttachFile,
        dateAdd,
        handleDateAddChange,
        unitPriceNumber,
        changeUnitPriceNumber,
        unitPriceCurrency,
        changeUnitPriceCurrency,
        expenseCategory,
        changeExpenseCategory,
        expenseCategoryData,
        item,
        changeItem,
        openItemModal,
        qty,
        changeQty,
        acceptCurrency,
        changeAcceptCurrency
    }=props
    return (
        <>
            <CRow lg="12" >
                <CCol className="mb-2">
                    <CLabel id="lblArrangeByAdmin" className="expense-request-label-warning">
                        #{t("Arrange By Admin")}:{t("You cannot get this amount because of admin or company arrange/buy for this item")}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol>
                    <CCard className="card">
                        <CRow lg="12" className="move_from_bottom mb-4">
                            <CCol lg="5">
                                <CLabel id="lblItem" className="required">
                                    {t('Item')}
                                </CLabel>
                                <CRow lg="12">
                                    <CCol lg="10" md="11" xs="9">
                                        <CSelect className="bamawl-select" value={item} onChange={changeItem} custom>
                                            <option key="" value=""> ---{t("Select item")}---</option>
                                            {
                                                props.itemData.map((i, index) => {
                                                    return (
                                                        <option key={index} value={i.id}>
                                                            {i.expense_item}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    <CCol lg="2" md="1" xs="3">
                                        <input id="imgItem" type='image' src={'/avatars/increase.png'} onClick={openItemModal} className="bonus-rate-list-delete-img" alt=""/>
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol lg="1" className="verticle-line"/>
                            <CCol lg="1"/>
                            <CCol lg="5">
                                <CLabel id="lblExpenseCategory">
                                    {t('Expense Category')}
                                </CLabel>
                                <CSelect className="bamawl-select" value={expenseCategory} onChange={changeExpenseCategory} custom>
                                    <option key="" value=""> ---{t("Select Expense Category")}---</option>
                                    {
                                        expenseCategoryData.map((i, index) => {
                                            return (
                                                <option key={index} value={i.id}>
                                                    {i.expense_category}
                                                </option>
                                            )
                                    })}
                                </CSelect>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="mb-4">
                            <CCol xl="5" lg="5">
                                <CLabel id="lblUnitPrice" className="required">
                                    {t('Unit Price')}
                                </CLabel>
                                <CRow className="align-items-end">
                                    <CCol xl="6" lg="6">
                                        <TextField id="txtUnitPrice"
                                        className="expense-request-input-card-detail"
                                        value={unitPriceNumber}
                                        onChange = {changeUnitPriceNumber}
                                        >
                                        </TextField>
                                    </CCol>
                                    <CCol xl="6" lg="6" >
                                        <CSelect
                                            className="bamawl-select"
                                            id="dropUnitPrice"
                                            value={unitPriceCurrency}
                                            onChange={changeUnitPriceCurrency}
                                            custom
                                        >
                                            {
                                                unitPriceCurrencyData.map((i, index) => {
                                                    return (
                                                        <option key={index} value={i.id}>
                                                            {i.currency_name}
                                                        </option>
                                                    )
                                            })}
                                        </CSelect>
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol lg="1" className="verticle-line"/>
                            <CCol lg="1"/>
                            <CCol xl="5" lg="5">
                                <CRow>
                                    <CCol className="verticle-line">
                                        <CLabel id="lblQty" className="required">
                                            {t('Qty')}
                                        </CLabel>
                                        <TextField id="txtQty"
                                        className="expense-request-input-card-detail"
                                        value={qty}
                                        onChange = {changeQty}
                                        ></TextField>
                                    </CCol>
                                    <CCol md="6" className="disabled-form">
                                        <CLabel id="lblTotalAdd">
                                            {t('Total')}
                                        </CLabel>
                                        <TextField id="txtTotal" value={totalAdd} disabled></TextField>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom mb-4">
                            <CCol xl="5" lg="5">
                                <CLabel id="lblAcceptCurrency" className="required">
                                    {t('Accept Currency')}
                                </CLabel>
                                <CRow className="align-items-end">
                                    <CCol xl="5">
                                        <CSelect
                                            className="bamawl-select"
                                            id="dropAcceptCurrency"
                                            value={acceptCurrency}
                                            onChange={changeAcceptCurrency}
                                            custom
                                        >
                                            {
                                                acceptCurrencyData.map((i, index) => {
                                                    return (
                                                        <option key={index} value={i.id}>
                                                            {i.currency_name}
                                                        </option>
                                                    )
                                                })}
                                        </CSelect>
                                    </CCol>
                                    { unitPriceCurrency != acceptCurrency && (
                                        <Fragment>
                                            <CCol xl="4">
                                                <TextField id="txtFXRate"
                                                className="expense-request-input-card-detail"
                                                value={props.fxRateNumber}
                                                onChange = {props.changeFXRateNumber}
                                                ></TextField>
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
                            <CCol lg="1" className="verticle-line"/>
                            <CCol lg="1"/>
                            <CCol xl="5" lg="5" className="disabled-form">
                                <CLabel id="lblAcceptAmount" className="required">
                                        {t('Accept Amount')}
                                </CLabel>
                                <TextField id="txtAcceptAmount" disabled value={acceptAmountAdd}></TextField>
                            </CCol>
                        </CRow>
                        <CRow className="mb-4">
                            <CCol md="5">
                                <CLabel className="required" id="lblDateAdd">
                                    {t('Date')}
                                </CLabel>
                                <DatePicker value={dateAdd} change={handleDateAddChange}/>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom mb-4">
                            <CCol xl="5" lg="5" className="justify-content-end" >
                                <div>
                                    <CLabel id="lblDescription">
                                        {t('Description')}
                                    </CLabel>
                                    <CLabel
                                        className="expense-request-checkbox expense-request-checkbox-admin">
                                        <div className="pr-2">
                                            <input type="checkbox" id="chkAttachement" checked={checkByAdmin} onChange={changeCheckByAdmin}/>
                                        </div>
                                        <span id="lblArrangebyAdmin">{t('Arrange By Admin')}</span>
                                    </CLabel>
                                </div>
                                <CTextarea
                                    id="txtareaDescription"
                                    className="expense-request-textarea-input expense-request-text-area"
                                    value={props.description}
                                    onChange = {props.changeDescription}
                                />
                            </CCol>
                            <CCol lg="1" className="verticle-line"/>
                            <CCol lg="1"/>
                            <CCol xl="5" lg="5">
                                <CLabel id="lblAttachment">
                                    {t('Attachment')}
                                </CLabel>
                                <CRow className="pt-lg-4">
                                    <CCol>
                                        <i className="fas fa-paperclip"></i>
                                        <label className="expense-request-attachment-file-label" >{t('Drag & Drop files to attach or')}</label>
                                        &nbsp;
                                        <a id="linkExpenseOtherAttachmentCardDetail" className="expense-request-attachment-file-browser" tabIndex={0}>
                                            {t('Browse')}
                                        </a>
                                        <input
                                            value=""
                                            type="file"
                                            htmlFor="linkExpenseOtherAttachmentCardDetail"
                                            multiple accept=".png, .jpeg, .jpg, .PDF"
                                            style={{ opacity: "0", position: "absolute", left: "45px", zindex: "9999999", width: '90%' }}
                                            onChange={(e) => props.handleImportFile(e, props.multiFile, props.setMultiFile)}
                                        />
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <div>
                                        {
                                            props.multiFile.map((ele, index) => {
                                                let fileName= ele.name;
                                                if (fileName.length > 21) {
                                                    fileName = fileName.substring(0, 9).concat("...")
                                                        .concat(fileName.substring(fileName.length - 10, fileName.length));
                                                }
                                                return (
                                                    <span key={index}>
                                                        <i className="file fas fa-file icon-btn mr-2"></i>{fileName}&nbsp;
                                                        <i className="fa fa-times" style={{ cursor: "pointer" }} onClick={() => props.removeFile(props.multiFile, props.setMultiFile, index)} ></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </CRow>
                            </CCol>
                        </CRow>
                        <CRow lg="12" >
                            <CCol className="text-center mb-4 mt-4">
                                <CButton id="btnAdd" className="form-btn" onClick={props.addDynamicTable} >{t('Add')}</CButton>
                            </CCol>
                        </CRow>
                        {/* Table Add */}
                        <ExpenseAdjustmentRequestAddTable
                            advanceAdditional={advanceAdditional}
                            itemData={itemData}
                            removeAttachFile={removeAttachFile}
                            allCheckAdd={allCheckAdd}
                            changeCheckAllAdd={changeCheckAllAdd}
                            setDynamicTable={setDynamicTable}
                            dynamicTable={dynamicTable}
                            unitPriceCurrencyData={unitPriceCurrencyData}
                            acceptCurrencyData={acceptCurrencyData}
                            handleDateTableChange={handleDateTableChange}
                            removeRowDynamicTable = {removeRowDynamicTable}
                            handlePriceTableChange={handlePriceTableChange}
                            handleQtyTableChange={handleQtyTableChange}
                            handleReasonChange={handleReasonChange}
                            handleRateTableChange={handleFXRateTableChange}
                            handleAcceptTableChange={handleAcceptTableChange}
                            handlePriceCurrencyTableChange={handlePriceCurrencyTableChange}
                            reason={reason}
                            onchangeInput={onchangeInput}
                            onchangeAcceptDropdown={onchangeAcceptDropdown}
                            onchangePriceDropdown={onchangePriceDropdown}
                            handleChangeDateInTable={handleChangeDateInTable}
                            budgetTotal={budgetTotal}
                            subTotal={subTotal}
                            advanceFlag={advanceFlag}
                        />
                    </CCard>
                </CCol>
            </CRow>
             {/* Expense Other Attachement */}
            <CRow lg="12" >
                <CCol className="pb-2">
                    <CLabel id="lblExpenseOtherAttachement">
                        {t("Expense Other Attachement")}
                    </CLabel>
                    <CRow>
                        <CCol lg="3" md="5">
                            <i className="fas fa-paperclip"></i>
                            <label className="expense-request-attachment-file-label" >{t('Drag & Drop files to attach or')}</label>
                            &nbsp;
                            <a id="linkExpenseOtherAttachmentCardDetail" className="expense-request-attachment-file-browser" tabIndex={0}>
                                {t('Browse')}
                            </a>
                            <input
                                value=""
                                type="file"
                                htmlFor="linkExpenseOtherAttachmentCardDetail"
                                multiple accept=".png, .jpeg, .jpg, .PDF"
                                style={{ opacity: "0", position: "absolute", left: "45px", zindex: "9999999", width: '90%' }}
                                onChange={handleFileOtherAttachement}
                            />
                        </CCol>
                        <CCol className="d-flex flex-wrap" >
                            {
                              multiFileOtherAttach.length > 0 &&  multiFileOtherAttach.map((ele, index) => {
                                    let fileName= ele.expense_document_name?.split('/')[ele.expense_document_name.split('/').length-1] || ele.expense_adjustment_document_name?.split('/')[ele.expense_adjustment_document_name.split('/').length-1];
                                    if (fileName.length > 21) {
                                        fileName = fileName.substring(0, 9).concat("...")
                                            .concat(fileName.substring(fileName.length - 10, fileName.length));
                                    }
                                    return (
                                        <Fragment key={index}>
                                            <div className="d-flex flex-nowrap">
                                                <span className="text-nowrap">
                                                <i className="file ml-4 fas fa-file icon-btn mr-2"
                                                ></i>
                                                {fileName}
                                                <i className="fa fa-times pe-auto ml-3" type="button"
                                                   onClick={() => removeFileOtherAttachement(index)} ></i>
                                                </span>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            }
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseAdjustmentRequestAdd
