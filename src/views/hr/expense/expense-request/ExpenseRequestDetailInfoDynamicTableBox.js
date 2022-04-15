import { CImg } from "@coreui/react";
import React, { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ExpenseRequestDetailInfoDynamicTableBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (
        <>  
            {props.dynamicTable && props.dynamicTable.length > 0 && (
                <Fragment>
                    <div className="table-responsive pt-4">
                        {props.prepaidVoucher === true && props.additionRadio === true && (
                            <div>
                                <label className="font-weight-normal">{t("(If you select the checkbox, you will get xx% extra additional for target items)")}</label>
                            </div>
                        )}
                        <table className="table">
                            <thead id="thead-id">
                                <tr width="100%">
                                    <th id="tblCheckboxDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <input
                                            type="checkbox"
                                            value="all-check-dynamic"
                                            checked={props.allCheckDynamic === true}
                                            onChange={props.change_checkbox_dynamic}
                                            disabled={!props.additionRadio || (props.additionRadio && !props.checkAllCheckboxDynamic)}
                                        />
                                    </th>
                                    <th id="tblNoDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("No")}
                                    </th>
                                    <th id="tblItemDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Item")}
                                    </th>
                                    <th id="tblExpenseCategoryDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Expense Category")}
                                    </th>
                                    <th id="tblAttachmentDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Attachment")}
                                    </th>
                                    <th id="tblDescriptionDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Description")}
                                    </th>
                                    <th
                                        id="tblBudgetCostDynamicTable" width=""
                                        className="align-middle text-nowrap"
                                        colSpan="7"
                                        style={{ borderBottom: "1px solid #fff" }} >
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Budget Cost")}
                                    </th>
                                    <th id="tblActionDynamicTable" width="" className="align-middle text-nowrap" rowSpan="2">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Action")}
                                    </th>
                                </tr>
                                <tr>
                                    <th id="tblUnitPriceDynamicTable" width="" className="text-nowrap no-border-radius">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Unit Price")}
                                    </th>
                                    <th id="tblQtyDynamicTable" width="" className="text-nowrap">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Qty")}
                                    </th>
                                    <th id="tblTotalDynamicTable" width="" className="text-nowrap">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Total")}
                                    </th>
                                    <th id="tblPriceCurrencyDynamicTable" width="" className="text-nowrap">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Price Currency")}
                                    </th>
                                    <th id="tblFXRateDynamicTable" width="" className="text-nowrap">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("FX Rate")}
                                    </th>
                                    <th id="tblAcceptCurrencyDynamicTable" width="" className="text-nowrap">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Accept Currency")}
                                    </th>
                                    <th id="tblAmountDynamicTable" width="" className="text-nowrap no-border-radius">
                                        <CImg
                                            className="mr-2 expense-request-img-table"
                                            src="avatars/titleicon.png"
                                            alt="titleicon"
                                        />
                                        {t("Amount")}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.dynamicTable.map((i, index) => {
                                    return (
                                        <Fragment key={index} >
                                            {i.attachment.length > 0 && i.attachment.map((item, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        {idx == 0 && <>
                                                            <td id="tblCheckboxDynamicTable" width="" className="text-nowrap text-center td-no"
                                                                style={{backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                rowSpan={i.attachment.length}>
                                                                <input
                                                                    type="checkbox"
                                                                    value={i.idDynamicTable}
                                                                    id={index}
                                                                    checked={i.is_checked === true}
                                                                    onChange={props.change_checkbox_dynamic}
                                                                    disabled={!props.additionRadio || i.data_load ===true}
                                                                />
                                                            </td>
                                                            <td id="tblNoDynamicTable" width="" className="text-nowrap text-right" rowSpan={i.attachment.length}
                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                                {index + 1}
                                                            </td>
                                                            <td id="tblItemDynamicTable" width="" className="text-nowrap text-left" rowSpan={i.attachment.length}
                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }} >
                                                                <div style={{ display: "grid" }}>
                                                                    <label className='text-left expense-label-margin font-weight-normal'>{i.item}</label>
                                                                    {i.arrange_admin === true && (
                                                                        <label className="text-left expense-label-margin font-weight-normal">{t("(Arrange By Admin)")}</label>
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td id="tblExpenseCategoryDynamicTable" width="" className="text-nowrap text-left col-color-blue" rowSpan={i.attachment.length} >
                                                                {i.expense_category}
                                                            </td>
                                                        </>
                                                        }
                                                        <td id="tblAttachmentDynamicTable" width="" className="text-nowrap col-color-pink text-left" >
                                                            <i className="fas fa-file icon-btn pr-1" style={{ color: "#01a3f8" }}></i>{item.name}&nbsp;
                                                            <i className="fa fa-times" style={{ cursor: "pointer" }}
                                                                onClick={() => props.removeAttachFileDynamicTable(index, idx, item)}></i>
                                                        </td>
                                                        {idx == 0 && <>
                                                            <td id="tblDescriptionDynamicTable" width="" className="text-nowrap td-green text-left" rowSpan={i.attachment.length}>
                                                                {i.description}
                                                            </td>
                                                            <td id="tblUnitPriceDynamicTable" width="" className="text-nowrap col-color-pink text-right" rowSpan={i.attachment.length} >
                                                                {i.price_number}
                                                            </td>
                                                            <td id="tblQtyDynamicTable" width="" className="text-nowrap col-color-pink text-right" rowSpan={i.attachment.length} >
                                                                {i.qty}
                                                            </td>
                                                            <td id="tblTotalDynamicTable" width="" className="text-nowrap col-color-pink text-right" rowSpan={i.attachment.length}>
                                                                {i.total}
                                                            </td>
                                                            <td id="tblPriceCurrencyDynamicTable" width="" className="text-nowrap col-color-pink text-left" rowSpan={i.attachment.length} >
                                                                {i.price_currency}
                                                            </td>
                                                            <td id="tblFXRateDynamicTable" width="" className="text-nowrap col-color-pink text-right" rowSpan={i.attachment.length} >
                                                                {i.fx_rate}
                                                            </td>
                                                            <td id="tblAcceptCurrencyDynamicTable" width="" className="text-nowrap col-color-pink text-left" rowSpan={i.attachment.length} >
                                                                {i.accept_currency}
                                                            </td>
                                                            <td id="tblAmountDynamicTable" width="" className="text-nowrap col-color-pink text-right" rowSpan={i.attachment.length} >
                                                                {i.amount}
                                                            </td>
                                                            <td id="tblActionDynamicTable" width="" className="text-nowrap text-center align-self-center"
                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}
                                                                rowSpan={i.attachment.length}
                                                            >
                                                                <input
                                                                    type="image"
                                                                    src={"avatars/remove.png"}
                                                                    className="icon-clt checkIO-request-delete-img"
                                                                    alt="delete"
                                                                    onClick={() => props.removeRowDynamicTable(i,index)}
                                                                />
                                                            </td>
                                                        </>}
                                                    </tr>
                                                )
                                            })}
                                            {i.attachment.length === 0 && (
                                                <tr key={index}>

                                                    <td id="tblCheckboxDynamicTable" width="" className="text-nowrap text-center td-no"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={i.idDynamicTable}
                                                            id={index}
                                                            checked={i.is_checked === true}
                                                            onChange={props.change_checkbox_dynamic}
                                                            disabled={!props.additionRadio || i.data_load ===true}
                                                        />
                                                    </td>
                                                    <td id="tblNoDynamicTable" width="" className="text-nowrap text-right"  >
                                                        {index + 1}
                                                    </td>
                                                    <td id="tblItemDynamicTable" width="" className="text-nowrap text-left"  >
                                                        <div style={{ display: "grid" }}>
                                                            <label className='text-left expense-label-margin font-weight-normal'>{i.item}</label>
                                                            {i.arrange_admin === true && (
                                                                <label className="text-left expense-label-margin font-weight-normal">{t("(Arrange By Admin)")}</label>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td id="tblExpenseCategoryDynamicTable" width="" className="text-nowrap text-left col-color-blue"  >
                                                        {i.expense_category}
                                                    </td>
                                                    <td id="tblAttachmentDynamicTable" width="" className="text-nowrap" >
                                                    </td>
                                                    <td id="tblDescriptionDynamicTable" width="" className="text-nowrap text-left td-green" >
                                                        {i.description}
                                                    </td>
                                                    <td id="tblUnitPriceDynamicTable" width="" className="text-nowrap text-right col-color-pink"  >
                                                        {i.price_number}
                                                    </td>
                                                    <td id="tblQtyDynamicTable" width="" className="text-nowrap text-right col-color-pink"  >
                                                        {i.qty}
                                                    </td>
                                                    <td id="tblTotalDynamicTable" width="" className="text-nowrap text-right col-color-pink" >
                                                        {i.total}
                                                    </td>
                                                    <td id="tblPriceCurrencyDynamicTable" width="" className="text-nowrap text-left col-color-pink"  >
                                                        {i.price_currency}
                                                    </td>
                                                    <td id="tblFXRateDynamicTable" width="" className="text-nowrap text-right col-color-pink"  >
                                                        {i.fx_rate}
                                                    </td>
                                                    <td id="tblAcceptCurrencyDynamicTable" width="" className="text-nowrap text-left col-color-pink"  >
                                                        {i.accept_currency}
                                                    </td>
                                                    <td id="tblAmountDynamicTable" width="" className="text-nowrap text-right col-color-pink"  >
                                                        {i.amount}
                                                    </td>
                                                    <td id="tblActionDynamicTable" width="" className="text-nowrap text-center align-self-center"
                                                        style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}

                                                    >
                                                        <input
                                                            type="image"
                                                            src={"avatars/remove.png"}
                                                            className="icon-clt expense-request-delete-img "
                                                            alt="delete"
                                                            onClick={() => props.removeRowDynamicTable(i, index)}
                                                        />
                                                    </td>
                                                </tr>

                                            )}
                                        </Fragment>
                                    )
                                })}
                                {props.totalCurrency && props.totalCurrency.length > 0 && (
                                    <Fragment>
                                        <tr>
                                            <td id="tbrTotalDynamicTable" width=""
                                                className="text-nowrap td-no border-bottom-left-radius"
                                                colSpan="6"
                                                rowSpan={props.currencyData.length + 1}
                                            >
                                                {t('Total')}
                                            </td>
                                        </tr>
                                        {props.totalCurrency.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <td width="" className="text-nowrap col-color-green" colSpan="4">
                                                        {item.currency_desc}
                                                    </td>
                                                    <td width="" className="text-nowrap col-color-green no-border-radius" colSpan="3">
                                                        {item.total_currency}
                                                    </td>
                                                </tr>
                                            )
                                        })}

                                    </Fragment>
                                )}

                            </tbody>

                        </table>
                    </div>
                </Fragment>
            )}
        </>
    )
}
export default ExpenseRequestDetailInfoDynamicTableBox