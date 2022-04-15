import React, { Fragment, useEffect } from "react";
import { CImg, CRow, CCol,CInput, CSelect} from "@coreui/react";
import { useTranslation } from "react-i18next";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const ExpenseAdjustmentRequestAddTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => {
    });
   let{
        removeRowDynamicTable,
        acceptCurrencyData,
        unitPriceCurrencyData,
        onchangeAcceptDropdown,
        onchangePriceDropdown,
        handleReasonChange,
        allCheckAdd,
        onchangeInput,
        dynamicTable,
        setDynamicTable,
        handleChangeDateInTable,
        removeAttachFile,
        budgetTotal,
        subTotal,
        advanceFlag,
        itemData,
        advanceAdditional
   }= props
    return (
        <>
            <CRow className="">
                <CCol lg="12">
					{advanceFlag == 2 && (
						<label id="lblSelectCheckbox">
					        {t(`(If you select the checkbox, you will get xx% extra additional for target items)`).replace('xx',advanceAdditional)}
						</label>
					)}
                </CCol>
            </CRow>
            <div className="table-responsive no-border-header">
                <table className="table">
                    <thead id="thead-id">
                        <tr width="100%">
                            <th id=""  className="align-middle text-nowrap" rowSpan="2">
                                <input
                                    id="chkTableAdd"
                                    value="allCheckAdd"
                                    type="checkbox"
                                    checked={allCheckAdd==true}
                                    // onChange={changeCheckAllAdd}
									disabled
                                />
                            </th>
                            <th id="tblNo"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("No")}
                            </th>
                            <th id="tblDateTable"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Date")}
                            </th>
                            <th id="tblItemTable"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Item")}
                            </th>
                            <th id="tblExpenseCategoryTable"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Expense Category")}
                            </th>
                            <th id="tblAttachmentTable"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Attachment")}
                            </th>
                            <th id="tblDescriptionTable"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Description")}
                            </th>
                            <th
                                id="tblBudgetCost"
                                className="align-middle text-nowrap"
                                colSpan="7"
                                style={{ borderBottom: "2px solid #fff" }} >
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Budget Cost")}
                            </th>
                            <th
                                id="tblActualCost"
                                className="align-middle text-nowrap"
                                colSpan="7"
                                style={{ borderBottom: "2px solid #fff" }} >
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Actual Cost")}
                            </th>
                            <th id="tblAction"  className="align-middle text-nowrap" rowSpan="2">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Action")}
                            </th>
                        </tr>
                        <tr>
                            <th id="tblUnitPriceBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Unit Price")}
                            </th>
                            <th id="tblQtyBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Qty")}
                            </th>
                            <th id="tblTotalBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Total")}
                            </th>
                            <th id="tblPriceCurrencBudgety"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Price Currency")}
                            </th>
                            <th id="tblFXRateBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("FX Rate")}
                            </th>
                            <th id="tblAcceptCurrencyBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Accept Currency")}
                            </th>
                            <th id="tblAmountBudget"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Amount")}
                            </th>
                            {/* ActualCost */}
                            <th id="tblUnitPriceActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Unit Price")}
                            </th>
                            <th id="tblQtyActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Qty")}
                            </th>
                            <th id="tblPriceCurrencyActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Price Currency")}
                            </th>
                            <th id="tblFXRateActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("FX Rate")}
                            </th>
                            <th id="tblAcceptCurrencyActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Accept Currency")}
                            </th>
                            <th id="tblAmountActual"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Amount")}
                            </th>
                            <th id="tblReason"  className="text-nowrap">
                                <CImg
                                    className="mr-2 expense-request-img-table"
                                    src="/avatars/titleicon.png"
                                    alt="titleicon"
                                />
                                {t("Reason")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                       {dynamicTable.map((i, index) => {
                            return (
                                <Fragment key={index} >
                                    {i.attach_file?.length > 0 && i.attach_file.map((item, idx) => {
                                        return (
                                            <tr key={idx}>
                                                {idx == 0 && <>
                                                    <td  className="text-nowrap td-gray" style={{ borderLeft: "3px solid #B1AAF6" }}
                                                        rowSpan={i.attach_file.length}
                                                        >
                                                        <input
                                                            disabled
                                                            type="checkbox"
                                                            value={i.expense_detail_id}
                                                            id={i.expense_detail_id}
                                                            checked={i.additional_advance_item == 1}
                                                            // onChange={changeCheckAllAdd}
                                                        />
                                                    </td>
                                                    <td className="text-nowrap td-gray text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        {index + 1}
                                                    </td>
                                                    <td className="text-nowrap td-date td-gray text-center"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        { i.flag == 0 ? i.detail_date :
                                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                                <KeyboardDatePicker
                                                                    margin="normal"
                                                                    id= {props.id ? props.id : "date-picker-dialog"}
                                                                    className="date-css"
                                                                    format="yyyy-MM-dd"
                                                                    hidden={i.flag ==1 ||isEmpty(i.actual_cost)}
                                                                    value={!isEmpty(i.detail_date) ? i.detail_date : null}
                                                                    onChange={(e) => handleChangeDateInTable(e, i, dynamicTable, setDynamicTable)}
                                                                    clearable={true}
                                                                    InputProps={{ readOnly: true }}
                                                            />
                                                            </MuiPickersUtilsProvider>
                                                     }
                                                    </td>
                                                    <td className="text-nowrap td-gray text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {itemData.length >0 && itemData.map((ele)=>{
                                                            return (
                                                                i.expense_items_id == ele.id ? ele.expense_item : ""
                                                            )})
                                                        }
                                                        <br />
                                                        {i.arrange_by_admin == 1 ? "[Arrange By Admin]": ""}
                                                    </td>
                                                    <td className="text-nowrap td-gray text-left"
                                                        rowSpan={i.attach_file.length}
                                                      >
                                                        {i.expense_category}
                                                    </td>
                                                </>
                                                }
                                                <td className="text-nowrap col-color-pink text-left" >
                                                    <i className="file fas fa-file icon-btn mr-2"></i>{item.file_name.split('/')[item.file_name.split('/').length-1]}&nbsp;
                                                    <i className="fa fa-times" style={{ cursor: "pointer" }}
                                                    onClick ={() => removeAttachFile(index,idx,dynamicTable,setDynamicTable)}></i>
                                                </td>
                                                {idx == 0 && <>
                                                    <td  className="text-break td-green text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {i.description}
                                                    </td>
                                                {/* Budget Cost */}
                                                    <td className="text-nowrap col-color-pink text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        {isEmpty(i.budget_cost?.unit_price)?"":Math.round(i.budget_cost?.unit_price*100)/100}
                                                    </td>
                                                    <td  className="text-nowrap col-color-pink text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                         {isEmpty(i.budget_cost?.qty)?"": Math.round(i.budget_cost?.qty*100)/100}
                                                    </td>
                                                    <td className="text-nowrap col-color-pink text-right"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {isEmpty(i.budget_cost?.unit_price)?"":  Math.round(i.budget_cost?.unit_price * i.budget_cost?.qty*100)/100}
                                                    </td>
                                                    <td  className="text-nowrap col-color-pink text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {unitPriceCurrencyData.length >0 && unitPriceCurrencyData.map((ele)=>{
                                                            return (
                                                                i.budget_cost?.currency_id == ele.id ? ele.currency_name : ""
                                                            )})
                                                        }
                                                    </td>
                                                    <td className="text-nowrap col-color-pink text-right"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {isEmpty(i.budget_cost?.fx_rate)?"": parseFloat(i.budget_cost?.fx_rate)}
                                                    </td>
                                                    <td className="text-nowrap col-color-pink text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                       {acceptCurrencyData.length >0 && acceptCurrencyData.map((ele)=>{
                                                            return (
                                                                i.budget_cost?.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                            )})
                                                        }
                                                    </td>
                                                    <td className="text-nowrap col-color-pink text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        {isEmpty(i.budget_cost?.cost)?"": Math.round(i.budget_cost?.cost*100)/100 }
                                                    </td>
                                                {/* Actual Cost */}
                                                    <td className="text-nowrap td-actual text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        {i.flag == 0 ? i.actual_cost.unit_price :
                                                            <CInput className="text-right" hidden={i.flag == 1 || isEmpty(i.actual_cost)} name="Unit Price" value={i.actual_cost?.unit_price} onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)}/>
                                                        }
                                                    </td>
                                                    <td className="text-nowrap td-actual td-qty text-right"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        { i.flag == 0 ? i.actual_cost.qty :
                                                            <CInput className="text-right" hidden={i.flag == 1 ||isEmpty(i.actual_cost)} name="Qty" value={i.actual_cost?.qty} onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)}/>
                                                        }
                                                    </td>
                                                    <td className="text-nowrap td-actual text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                       { i.flag == 0 ? unitPriceCurrencyData.map(item => item.id == i.actual_cost.currency_id ? item.currency_name : "") :
                                                            <CSelect className="text-left" hidden={i.flag == 1 ||isEmpty(i.actual_cost)}  value={i.actual_cost?.currency_id} id={i.expense_detail_id} onChange={(e)=>onchangePriceDropdown(e, dynamicTable, setDynamicTable)}>
                                                                {unitPriceCurrencyData.map((ele, index) => {
                                                                    return (
                                                                    <option key={index} value={ele.id}>{ele.currency_name}</option>
                                                                    )
                                                                })}
                                                            </CSelect>
                                                        }
                                                    </td>
                                                    <td  className="text-nowrap td-actual td-qty text-right"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        {(i.flag == 0)  ? i.actual_cost?.fx_rate :
                                                            <CInput className="text-right" disabled={i.actual_cost?.currency_id == i.actual_cost?.accept_currency_id ? true : false} hidden={i.flag == 1 ||isEmpty(i.actual_cost)} name="FX Rate" value={i.actual_cost?.fx_rate} onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)} className="text-right"/>
                                                        }
                                                    </td>
                                                    <td className="text-nowrap td-actual text-left"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                    { i.flag == 0 ? acceptCurrencyData.map(item => item.id == i.actual_cost?.accept_currency_id ? item.currency_name : "") :
                                                        <CSelect className="text-left" hidden={i.flag == 1 ||isEmpty(i.actual_cost)} id={i.expense_detail_id} onChange={(e)=>onchangeAcceptDropdown(e, dynamicTable, setDynamicTable)} value={i.actual_cost?.accept_currency_id}>
                                                            {acceptCurrencyData.map((ele, index) => {
                                                                return (
                                                                <option key={index} value={ele.id}>{ele.currency_name}</option>
                                                                )
                                                            })}
                                                        </CSelect>
                                                    }
                                                    </td>
                                                    <td className="text-nowrap td-actual text-right"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                       {isEmpty(i.actual_cost?.cost)?"": i.flag != 1 && parseFloat(i.actual_cost.cost)}
                                                    </td>
                                                    <td className="text-nowrap td-actual td-reason text-left"
                                                        rowSpan={i.attach_file.length}
                                                     >
                                                        { isEmpty(i.flag) &&
                                                            <CInput className="text-left" hidden={isEmpty(i.actual_cost)} value={i.reason ? i.reason : ""} onChange={(e) => handleReasonChange(e, i, dynamicTable, setDynamicTable)} maxLength={500}/>
                                                        }
                                                    </td>
                                                    {/* Action */}
                                                    <td className="text-nowrap text-center align-self-center td-gray"
                                                        rowSpan={i.attach_file.length}
                                                    >
                                                        <input
                                                            disabled={isEmpty(i.actual_cost)|| i.flag == 1}
                                                            style={isEmpty(i.actual_cost) || i.flag == 1?{cursor:"no-drop"}:{cursor:"pointer"}}
                                                            className="icon-clt"
                                                            id={index}
                                                            type="image"
                                                            src={"/avatars/remove.png"}
                                                            alt="delete"
                                                            onClick = {() => removeRowDynamicTable(dynamicTable, setDynamicTable, i, index)}
                                                        />
                                                    </td>
                                                </>}
                                            </tr>
                                     )
                                    })}
                                    {i.attach_file?.length == 0  && (
                                        <tr>
                                            <td  className="text-nowrap td-gray" style={{ borderLeft: "3px solid #B1AAF6" }}
                                                >
                                                <input
                                                    disabled
                                                    type="checkbox"
                                                    value={i.expense_detail_id}
                                                    id={i.expense_detail_id}
                                                    checked={i.additional_advance_item == 1}
                                                    // onChange={changeCheckAllAdd}
                                                />
                                            </td>
                                            <td className="text-nowrap td-gray text-right"
                                             >
                                                {index + 1}
                                            </td>
                                            <td className="text-nowrap td-date td-gray text-center"
                                            >
                                                { i.flag == 0 ? i.detail_date :
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            margin="normal"
                                                            id= {props.id ? props.id : "date-picker-dialog"}
                                                            className="date-css"
                                                            format="yyyy-MM-dd"
                                                            hidden={i.flag ==1 ||isEmpty(i.actual_cost)}
                                                            value={!isEmpty(i.detail_date) ? i.detail_date : null}
                                                            onChange={(e) => handleChangeDateInTable(e, i, dynamicTable, setDynamicTable)}
                                                            clearable={true}
                                                            InputProps={{ readOnly: true }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                }
                                            </td>
                                            <td className="text-nowrap td-gray text-left"
                                            >
                                                {itemData.length >0 && itemData.map((ele)=>{
                                                    return (
                                                        i.expense_items_id == ele.id ? ele.expense_item : ""
                                                    )})
                                                }
                                                <br />
                                                {i.arrange_by_admin == 1 ? "[Arrange By Admin]": ""}
                                            </td>
                                            <td className="text-nowrap td-gray text-left"
                                              >
                                                {i.expense_category}
                                            </td>
                                            <td className="text-nowrap col-color-pink text-left" >
                                            </td>
                                            <td  className="text-break td-green text-left"
                                            >
                                                {i.description}
                                            </td>
                                        {/* Budget Cost */}
                                            <td className="text-nowrap col-color-pink text-right"
                                             >
                                                {isEmpty(i.budget_cost?.unit_price) ? "": Math.round(i.budget_cost.unit_price*100)/100}
                                            </td>
                                            <td  className="text-nowrap col-color-pink text-right"
                                             >
                                                 {isEmpty(i.budget_cost?.qty) ? "":  Math.round(i.budget_cost?.qty*100)/100}
                                            </td>
                                            <td className="text-nowrap col-color-pink text-right"
                                            >
                                                {isEmpty(i.budget_cost?.unit_price)?"": Math.round(i.budget_cost?.unit_price * i.budget_cost?.qty*100)/100}
                                            </td>
                                            <td  className="text-nowrap col-color-pink text-left"
                                            >
                                                {unitPriceCurrencyData.length >0 && unitPriceCurrencyData.map((ele)=>{
                                                    return (
                                                        i.budget_cost?.currency_id == ele.id ? ele.currency_name : ""
                                                    )})
                                                }
                                            </td>
                                            <td className="text-nowrap col-color-pink text-right"
                                            >
                                                {isEmpty(i.budget_cost?.fx_rate)?"":parseFloat(i.budget_cost?.fx_rate)}
                                            </td>
                                            <td className="text-nowrap col-color-pink text-left"
                                            >
                                               {acceptCurrencyData.length >0 && acceptCurrencyData.map((ele)=>{
                                                    return (
                                                        i.budget_cost?.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                    )})
                                                }
                                            </td>
                                            <td className="text-nowrap col-color-pink text-right"
                                             >
                                                {isEmpty(i.budget_cost?.cost)?"": Math.round(i.budget_cost?.cost*100)/100}
                                            </td>
                                        {/* Actual Cost */}
                                            <td className="text-nowrap td-actual text-right"
                                             >
                                                {i.flag == 0 ? i.actual_cost.unit_price :
                                                    <CInput className="text-right" name="Unit Price" hidden={i.flag == 1||isEmpty(i.actual_cost)}  value={i.actual_cost?.unit_price} onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)}/>
                                                }
                                            </td>
                                            <td className="text-nowrap td-actual td-qty text-right"
                                             >
                                                 { i.flag == 0 ? i.actual_cost.qty :
                                                    <CInput className="text-right" name="Qty" hidden={i.flag == 1||isEmpty(i.actual_cost)}  value={i.actual_cost?.qty} onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)}/>
                                                 }
                                            </td>
                                            <td className="text-nowrap td-actual text-left"
                                            >
                                              { i.flag == 0 ? unitPriceCurrencyData.map(item => item.id == i.actual_cost.currency_id ? item.currency_name : "") :
                                               <CSelect className="text-left" hidden={i.flag == 1||isEmpty(i.actual_cost)}  value={i.actual_cost?.currency_id} id={i.expense_detail_id} onChange={(e)=>onchangePriceDropdown(e, dynamicTable, setDynamicTable)}>
                                                    {unitPriceCurrencyData.map((ele, index) => {
                                                        return (
                                                        <option key={index} value={ele.id}>{ele.currency_name}</option>
                                                        )
                                                    })}
                                                </CSelect>
                                            }
                                            </td>
                                            <td  className="text-nowrap td-actual td-qty text-right"
                                            >
                                                {
                                                i.flag == 0 ? i.actual_cost.fx_rate :
                                                <CInput className="text-right" hidden={i.flag == 1|| isEmpty(i.actual_cost)} disabled={i.actual_cost?.currency_id == i.actual_cost?.accept_currency_id ? true : false} value={i.actual_cost?.fx_rate} name="FX Rate" onChange={(e)=>onchangeInput(i, e, dynamicTable, setDynamicTable)} className="text-right"/>
                                                }
                                                </td>
                                            <td className="text-nowrap td-actual text-left"
                                            >
                                                { i.flag == 0 ? acceptCurrencyData.map(item => item.id == i.actual_cost?.accept_currency_id ? item.currency_name : "") :
                                                <CSelect className="text-left" hidden={i.flag == 1 ||isEmpty(i.actual_cost)}  id={i.expense_detail_id} onChange={(e)=>onchangeAcceptDropdown(e, dynamicTable, setDynamicTable)} value={i.actual_cost?.accept_currency_id}>
                                                    {acceptCurrencyData.map((ele, index) => {
                                                        return (
                                                        <option key={index} value={ele.id}>{ele.currency_name}</option>
                                                        )
                                                    })}
                                                </CSelect>
                                                 }
                                            </td>
                                            <td className="text-nowrap td-actual text-right"
                                            >
                                               {isEmpty(i.actual_cost)? "": i.flag != 1 && parseFloat(i.actual_cost.cost)}
                                            </td>
                                            <td className="text-nowrap td-actual td-reason text-left"
                                             >
                                                { isEmpty(i.flag) &&
                                                    <CInput className="text-left" hidden={isEmpty(i.actual_cost)} value={i.reason ? i.reason : ""} onChange={(e) => handleReasonChange(e, i, dynamicTable, setDynamicTable)} maxLength={500} />
                                                }
                                                </td>
                                            {/* Action */}
                                            <td className="text-nowrap text-center align-self-center td-gray"
                                            >
                                                <input
                                                    disabled={isEmpty(i.actual_cost)|| i.flag == 1}
                                                    style={isEmpty(i.actual_cost) || i.flag == 1?{cursor:"no-drop"}:{cursor:"pointer"}}
                                                    className="icon-clt"
                                                    type="image"
                                                    src={"/avatars/remove.png"}
                                                    alt="delete"
                                                    onClick = {() => removeRowDynamicTable(dynamicTable, setDynamicTable, i, index)}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            )
                        })}
                        {/* Total */}
                        {
                            acceptCurrencyData.length>0&&
                            acceptCurrencyData.map((i, index) => {
                                return(
                                    <Fragment key={index}>
                                        <tr width="100%" >
                                            {index== 0 &&(
                                                <td className='text-center text-nowrap align-middle' colSpan="7" rowSpan={acceptCurrencyData.length}  style={{ borderBottomLeftRadius:"14px",backgroundColor: "#fafbfc", borderLeft: "3px solid #B1AAF6" }}>{t("Total")}</td>
                                            )}
                                            <td className='text-center text-nowrap align-middle col-color-green no-border-radius' colSpan="4" >{i.currency_name}</td>
                                            <td colSpan="3" className="text-right col-color-green rounded-0" >
                                                {parseFloat(budgetTotal&& (budgetTotal?.find(item => item.currency_id == i.id)?.amount || 0))}
                                            </td>
                                            <td className='text-center text-nowrap align-middle col-color-green' colSpan="4" >{i.currency_name}</td>
                                            <td colSpan="2" className="text-right col-color-green rounded-0">
                                                {parseFloat(subTotal.find(item => item.currency_id == i.id) ? parseFloat(subTotal.find(item => item.currency_id == i.id).amount).toFixed(2) : 0)}
                                            </td>
                                            <td className="text-right col-color-green no-border-radius">
                                            </td>
                                            {index== 0 &&(
                                                <td className='text-right text-nowrap align-middle td-gray' style={{borderBottomRightRadius:"14px"}} rowSpan={acceptCurrencyData.length} ></td>
                                            )}
                                        </tr>
                                    </Fragment>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ExpenseAdjustmentRequestAddTable
