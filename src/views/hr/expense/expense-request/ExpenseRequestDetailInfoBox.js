import { CCard, CCol, CInput, CLabel, CRow } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExpenseRequestDetailInfoCardDetailBox from "./ExpenseRequestDetailInfoCardDetailBox";

const ExpenseRequestDetailInfoBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>

            <CRow lg="12">
                <CCol  lg="5" style={{ marginBottom: "10px" }}>
                    <CLabel id="lbPayment">
                        {t('Payment')}
                    </CLabel>
                </CCol>
            </CRow>
            <CRow lg="12">
                <CCol>
                    <CCard className="expense-request-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                        <CRow>
                            <CCol xl="2" lg="3" className='radio-setting-small' >
                                <label id="lbCashVoucher" className="expense-request-label">
                                    {t('Cash Voucher')}
                                    <input
                                        onChange={props.changePaymentCash}
                                        type="radio"
                                        name={"payment"}
                                        id="radCashVoucher"
                                        checked={props.cashVoucher}
                                    />
                                </label>
                            </CCol>
                            <CCol xl="2" lg="3" className='radio-setting-small' >
                                <label id="lbPrepaidVoucher" className="expense-request-label">
                                    {t('Prepaid Voucher')}
                                    <input
                                        onChange={props.changePaymentPrepaid}
                                        type="radio"
                                        name={"payment"}
                                        id="radPrepaidVoucher"
                                        checked={props.prepaidVoucher}
                                    />
                                </label>
                            </CCol>
                            <CCol xl="8" lg="6">
                                <label id="lbPaymentInfo" className="expense-request-label">
                                    {t("(You choose cash voucher , you don't need to request for adjustment request)")}
                                </label>
                            </CCol>
                        </CRow>
                    </CCard>
                </CCol>
            </CRow>
            {props.prepaidVoucher === true && (
                <Fragment>
                    <CRow lg="12">
                        <CCol  lg="5" style={{ marginBottom: "10px" }}>
                            <CLabel id="lbAdvancedMoney" className="required">
                                {t('Advanced Money')}
                            </CLabel>
                        </CCol>
                    </CRow>
                    <CRow lg="12">
                        <CCol>
                            <CCard className="expense-request-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                                <CRow>
                                    <CCol xl="2" lg="3" className='radio-setting-small' >
                                        <label id="lbNeed" className="expense-request-label">
                                            {t('Need')}
                                            <input
                                                onChange={props.changeNeedRadio}
                                                type="radio"
                                                name={"AdvancedMoney"}
                                                id="radNeed"
                                                checked={props.need}
                                            />
                                        </label>
                                    </CCol>
                                    <CCol xl="2" lg="3" className='radio-setting-small' >
                                        <label id="lbNoNeed" className="expense-request-label">
                                            {t('No Need')}
                                            <input
                                                onChange={props.changeNoNeedRadio}
                                                type="radio"
                                                name={"AdvancedMoney"}
                                                id="radNoNeed"
                                                checked={props.noNeed}
                                            />
                                        </label>
                                    </CCol>
                                    <CCol xl="8" lg="6" className="pt-lg-2">
                                        <label id="lbAdvancedMoneyInfo" className="expense-request-label">
                                            {t("(If you need advanced money for this expense request, please check this button)")}

                                        </label>
                                    </CCol>
                                    {props.need === true && (
                                        <Fragment>
                                            <CCol xl="3" lg="6" className='radio-setting-small pt-lg-2' >
                                                <label id="lbAdditionTarget" className="expense-request-label">
                                                   {props.additionData}{t("% Additional for target items")}
                                                    <input
                                                        onChange={props.changeAdditionRadio}
                                                        type="radio"
                                                        name={"AdvancedMoneyNeed"}
                                                        id="radAdditionTarget"
                                                        checked={props.additionRadio}
                                                    />
                                                </label>
                                            </CCol>
                                            <CCol xl="3" lg="6" className='radio-setting-small pt-lg-2' >
                                                <label id="lbNeedSpecifiedAmount" className="expense-request-label">
                                                    {t("Need the Specified Amount")}
                                                    <input
                                                        onChange={props.changeAmountRadio}
                                                        type="radio"
                                                        name={"AdvancedMoneyNeed"}
                                                        id="radNeedSpecifiedAmount"
                                                        checked={props.amountRadio}
                                                    />
                                                </label>
                                            </CCol>
                                        </Fragment>
                                    )}
                                </CRow>
                            </CCard>
                        </CCol>
                    </CRow>
                </Fragment>
            )}
            <CRow lg="12" >
                <CCol >
                    <CLabel id="lbWarning" className="expense-request-label-warning">
                        #{t("Arrange By Admin")}:{t("You cannot get this amount because of admin or company arrange/buy for this item")}
                    </CLabel>
                </CCol>
            </CRow>
            <ExpenseRequestDetailInfoCardDetailBox
                itemModal={props.itemModal}
                openItemModal={props.openItemModal}
                closeItemModal={props.closeItemModal}

                handleImportFile={props.handleImportFile}
                multiFile={props.multiFile}
                setMultiFile={props.setMultiFile}
                removeFile={props.removeFile}

                item={props.item}
                changeItem={props.changeItem}
                expenseCategory={props.expenseCategory}
                changeExpenseCategory={props.changeExpenseCategory}
                unitPriceCurrency={props.unitPriceCurrency}
                changeUnitPriceCurrency={props.changeUnitPriceCurrency}
                acceptCurrency={props.acceptCurrency}
                changeAcceptCurrency={props.changeAcceptCurrency}
                itemData={props.itemData}
                expenseCategoryData={props.expenseCategoryData}
                currencyData={props.currencyData}
                arrangeAdmin={props.arrangeAdmin}
                changeArrangeAdmin={props.changeArrangeAdmin}

                description={props.description}
                unitPriceNumber={props.unitPriceNumber}
                qty={props.qty}
                fxRateNumber={props.fxRateNumber}
                changeDescription={props.changeDescription}
                changeUnitPriceNumber={props.changeUnitPriceNumber}
                changeQty={props.changeQty}
                changeFXRateNumber={props.changeFXRateNumber}
                changeFXRateNumberSelect={props.changeFXRateNumberSelect}
                addDynamicTable={props.addDynamicTable}
                totalCardDetail={props.totalCardDetail}
                amountCardDetail={props.amountCardDetail}
                totalCurrency={props.totalCurrency}

                dynamicTable={props.dynamicTable}
                removeAttachFileDynamicTable={props.removeAttachFileDynamicTable}
                removeRowDynamicTable={props.removeRowDynamicTable}
                additionRadio={props.additionRadio}
                prepaidVoucher = {props.prepaidVoucher}
                allCheckDynamic={props.allCheckDynamic}
                change_checkbox_dynamic={props.change_checkbox_dynamic}
                idAddDynamic={props.idAddDynamic}
                changeAdditionCheckbox={props.changeAdditionCheckbox}
                additionCheckbox={props.additionCheckbox}

                changeItemName = {props.changeItemName}
                itemName = {props.itemName}
                createItemAPI = {props.createItemAPI}
                popupError = {props.popupError}
                removeMessagePopup = {props.removeMessagePopup}

                checkAllCheckboxDynamic={props.checkAllCheckboxDynamic}
            />
            <CRow lg="12" >
                <CCol lg="6" md="6" className="pb-2">
                    <CLabel id="lbExpenseOtherAttachmentCardDetail">
                        {t("Expense Other Attachment")}
                    </CLabel>
                    <div className="pt-lg-4">
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
                            className = "input-browser"
                            onChange={(e) => props.handleImportFile(e, props.multiFileOtherAttach, props.setMultiFileOtherAttach)} />
                        <div style={{}} >
                            {
                                props.multiFileOtherAttach && props.multiFileOtherAttach.map((ele, index) => {
                                    let file_name = ele.name;
                                    if (file_name.length > 21) {
                                        file_name = file_name.substring(0, 9).concat("...")
                                            .concat(file_name.substring(file_name.length - 10, file_name.length));
                                    }
                                    return (
                                        <label key={index}>
                                            <i className="fas fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{file_name}&nbsp;
                                            <i className="fa fa-times" style={{ cursor: "pointer" }}
                                                onClick={() => props.removeFile(props.multiFileOtherAttach, props.setMultiFileOtherAttach, index, ele.id)} ></i>
                                            &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    )
                                })
                            }
                        </div>
                    </div>
                </CCol>

            </CRow>
        </>
    )
}
export default ExpenseRequestDetailInfoBox
