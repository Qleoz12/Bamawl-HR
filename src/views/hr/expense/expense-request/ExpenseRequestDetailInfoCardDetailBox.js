import { CButton, CCard, CCol, CInput, CLabel, CRow, CSelect, CTextarea } from "@coreui/react";
import { TextField } from "@material-ui/core";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ExpenseRequestDetailInfoDynamicTableBox from "./ExpenseRequestDetailInfoDynamicTableBox";
import ItemNameRegistrationModalExpenseRequestBox from "./ItemNameRegistrationModalExpenseRequestBox";

const ExpenseRequestDetailInfoCardDetailBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (props.unitPriceCurrency === props.acceptCurrency) {
            props.changeFXRateNumberSelect(1)
        }
    });
    return (
        <>
            <CRow lg="12">
                <CCol>
                    <CCard className="expense-request-card-detail" style={{ backgroundColor: "#fafbfc" }}>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="pl-lg-4" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbItemCardDetail" className="required">
                                    {t('Item')}
                                </CLabel>
                                <CRow lg="12">
                                    <CCol lg="10" md="11" xs="9">
                                        <CSelect id="dropItemCardDetail"
                                            className="bamawl-select" value={props.item} onChange={props.changeItem} custom>
                                            <option key="" value="">{t('---Select Item---')}</option>
                                            {
                                                props.itemData && props.itemData.length > 0 &&
                                                props.itemData.map((data, index) => {
                                                    return (
                                                        <option key={index} id={data.id} value={data.expense_item}>{data.expense_item}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    <CCol lg="2" md="1" xs="3">
                                        <input id="lbAddItemCardDetail" type='image' src={'avatars/increase.png'}
                                            onClick={props.openItemModal} className="bonus-rate-list-delete-img" />
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol className="pr-lg-4" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbExpenseCategoryCardDetail">
                                    {t('Expense Category')}
                                </CLabel>
                                <CSelect
                                    id="dropExpenseCategoryCardDetail"
                                    className="bamawl-select"
                                    value={props.expenseCategory}
                                    onChange={props.changeExpenseCategory}
                                    custom>
                                    <option key="" value="">{t('---Select Expense Category---')}</option>
                                    {
                                        props.expenseCategoryData && props.expenseCategoryData.length > 0 &&
                                        props.expenseCategoryData.map((data, index) => {
                                            return (
                                                <option key={index} id={data.id} value={data.expense_category}>{data.expense_category}</option>
                                            )
                                        })
                                    }
                                </CSelect>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="pl-lg-4" xl="5" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbUnitPriceCardDetail" className="required">
                                    {t('Unit Price')}
                                </CLabel>
                                <CRow>
                                    <CCol className="expense-unit-price expense-request-input-card-detail" xl="6" lg="6">
                                        <TextField id="txtUnitPriceNumber"
                                            value={props.unitPriceNumber}
                                            onChange={props.changeUnitPriceNumber}
                                            fullWidth></TextField>
                                    </CCol>
                                    <CCol xl="6" lg="6">
                                        <CSelect id="dropUnitPriceCurrency" className="bamawl-select"
                                            value={props.unitPriceCurrency} onChange={props.changeUnitPriceCurrency} custom>
                                            {
                                                props.currencyData && props.currencyData.length > 0 &&
                                                props.currencyData.map((data, index) => {
                                                    return (
                                                        <option key={index} id={data.id} value={data.currency_desc}>{data.currency_desc}</option>
                                                    )
                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol xl="2" lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol className="pr-lg-4" xl="5" lg="5" style={{ marginBottom: "20px" }}>
                                <CRow>
                                    <CCol className="verticle-line expense-request-input-card-detail">
                                        <CLabel id="lbQtyCardDetail" className="required">
                                            {t('Qty')}
                                        </CLabel>
                                        <TextField id="txtQtyCardDetail"
                                            value={props.qty}
                                            onChange={props.changeQty}
                                            fullWidth></TextField>
                                    </CCol>
                                    <CCol className="expense-request-input-card-detail">
                                        <CLabel id="lbTotalCardDetail" className="expense-request-label-disable">
                                            {t('Total')}
                                        </CLabel>
                                        <TextField id="txtTotalCardDetail" value={props.totalCardDetail}  fullWidth disabled></TextField>
                                    </CCol>
                                </CRow>

                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="pl-lg-4" xl="5" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbAcceptCurrencyCardDetail" className="required">
                                    {t('Accept Currency')}
                                </CLabel>
                                <CRow>
                                    <CCol xl="5">
                                        <CSelect id="dropAcceptCurrencyCardDetail" className="bamawl-select"
                                            value={props.acceptCurrency} onChange={props.changeAcceptCurrency} custom>
                                            {
                                                props.currencyData && props.currencyData.length > 0 &&
                                                props.currencyData.map((data, index) => {
                                                    if (parseInt(data.expense_flag) === 1) {
                                                        return (
                                                            <option key={index} id={data.id} value={data.currency_desc}>{data.currency_desc}</option>
                                                        )
                                                    }

                                                })
                                            }
                                        </CSelect>
                                    </CCol>
                                    {props.unitPriceCurrency !== props.acceptCurrency && (
                                        <Fragment>
                                            <CCol xl="4" className="expense-request-input-card-detail">
                                                <TextField id="txtAcceptAmountCardDetail"
                                                    value={props.fxRateNumber}
                                                    onChange={props.changeFXRateNumber}
                                                    style = {{paddingTop: '4px'}}
                                                    fullWidth></TextField>
                                            </CCol>
                                            <CCol xl="3">
                                                <CLabel id="lbAcceptAmountCardDetail" className="required expense-request-label text-nowrap fx-rate">
                                                    {t('FX Rate')}
                                                </CLabel>
                                            </CCol>
                                        </Fragment>
                                    )}

                                </CRow>

                            </CCol>
                            <CCol xl="2" lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol className="pr-lg-4 expense-request-input-card-detail" xl="5" lg="5" style={{ marginBottom: "20px", alignSelf: "end" }}>
                                <CLabel id="lbAcceptAmountCardDetail" className="required expense-request-label-disable">
                                    {t('Accept Amount')}
                                </CLabel>
                                <TextField id="txtAcceptAmountCardDetail" value={props.amountCardDetail} disabled fullWidth></TextField>
                            </CCol>
                        </CRow>
                        <CRow lg="12" className="move_from_bottom">
                            <CCol className="pl-lg-4" xl="5" lg="5" style={{ marginBottom: "10px", alignSelf: "end" }}>
                                <div>
                                    <CLabel id="lbDescriptionCardDetail" className="required">
                                        {t('Description')}
                                    </CLabel>
                                    <CLabel
                                        className="expense-request-checkbox expense-request-checkbox-admin"
                                        id="lbDescriptionCardDetail">
                                        <div className="pr-2">
                                            <input id="chkArrangeAdmin" type="checkbox" value={props.arrangeAdmin} onChange={props.changeArrangeAdmin} />
                                        </div>
                                        <small>{t('Arrange By Admin')}</small>
                                    </CLabel>
                                </div>
                                <CTextarea
                                    id="txtDescriptionCardDetail"
                                    className="expense-request-textarea-input expense-request-text-area"
                                    value={props.description}
                                    onChange={props.changeDescription}
                                />
                            </CCol>
                            <CCol xl="2" lg="2">
                                <div className="line"></div>
                            </CCol>
                            <CCol className="pr-lg-4" xl="5" lg="5" style={{ marginBottom: "20px" }}>
                                <CLabel id="lbAttachmentCardDetail">
                                    {t('Attachment')}
                                </CLabel>
                                <div className="pt-lg-4">
                                    <i className="fas fa-paperclip"></i>
                                    <label className="expense-request-attachment-file-label" >{t('Drag & Drop files to attach or')}
                                    </label>
                                    &nbsp;
                                    <a id="linkBrowseCardDetailCardDetail" className="expense-request-attachment-file-browser" tabIndex={0}>
                                        {t('Browse')}
                                    </a>
                                    <input
                                        value=""
                                        type="file"
                                        htmlFor="linkBrowseCardDetailCardDetail"
                                        className = "input-browser"
                                        multiple accept=".png, .jpeg, .jpg, .PDF"
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
                                                    <label key={index}>
                                                        <i className="fas fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{file_name}&nbsp;
                                                        <i className="fa fa-times" style={{ cursor: "pointer" }} onClick={() => props.removeFile(props.multiFile, props.setMultiFile, index)} ></i>
                                                        &nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </CCol>
                        </CRow>
                        {props.additionRadio === true && (
                            <CRow  lg="12" >
                                <CCol className="pl-lg-4">
                                    <CLabel
                                        style={{ display: "flex" }}
                                        id="chkAdditionAdvanceAmountCardDetail"
                                        className="expense-request-checkbox" >
                                        <div className="pr-2">
                                            <input type="checkbox"
                                                checked={props.additionCheckbox}
                                                onChange={props.changeAdditionCheckbox} />
                                        </div>
                                        <small>{t('Get Additional Advance Amount for target item')}</small>
                                    </CLabel>
                                </CCol>
                            </CRow>
                        )}
                        <CRow lg="12" >
                            <CCol style={{ textAlign: "center" }}>
                                <CButton id="btnAddCardDetail" className="form-btn" onClick={() => props.addDynamicTable(props.idAddDynamic, props.additionCheckbox)} >{t('Add')}</CButton>
                            </CCol>
                        </CRow>
                        <ItemNameRegistrationModalExpenseRequestBox
                            itemModal={props.itemModal}
                            openItemModal={props.openItemModal}
                            closeItemModal={props.closeItemModal}
                            changeItemName={props.changeItemName}
                            itemName={props.itemName}
                            createItemAPI={props.createItemAPI}
                            popupError={props.popupError}
                            removeMessagePopup={props.removeMessagePopup}
                        />
                        <ExpenseRequestDetailInfoDynamicTableBox
                            dynamicTable={props.dynamicTable}
                            removeAttachFileDynamicTable={props.removeAttachFileDynamicTable}
                            removeRowDynamicTable={props.removeRowDynamicTable}
                            currencyData={props.currencyData}
                            totalCardDetail={props.totalCardDetail}
                            totalCurrency={props.totalCurrency}
                            allCheckDynamic={props.allCheckDynamic}
                            change_checkbox_dynamic={props.change_checkbox_dynamic}
                            additionRadio={props.additionRadio}
                            prepaidVoucher={props.prepaidVoucher}
                            checkAllCheckboxDynamic={props.checkAllCheckboxDynamic}
                        />
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}
export default ExpenseRequestDetailInfoCardDetailBox