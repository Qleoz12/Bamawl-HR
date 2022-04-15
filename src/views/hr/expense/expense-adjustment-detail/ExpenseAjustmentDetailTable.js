/* eslint-disable eqeqeq */
import { CCard, CCol, CRow, CImg ,CLink} from "@coreui/react";
import React from "react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const ExpenseAjustmentDetailTable = (props) => {
    const { t } = useTranslation();
    let { currencyList, expenseItemList,historyFlag,downloadFileAttach,adjustmentBudget,advanceAdditional } = props;

    return (
        <div className="">
            <br />
            <span>{t(`(If you select the checkbox, you will get xx% extra additional for target items)`).replace('xx',advanceAdditional)}</span>
            <br />
            <br />
            <CImg
                src={"/avatars/list.png"}
                className="list-icon"
                width="6px"
                style={{ marginRight: "10px", marginBottom: "6px" }}
            />
            <label className="font-weight-bold">{t("Expense Item")}</label>
            <CCard className="card-form card-bonus table-panel">
                <CCard className="table-panel card-table table-category">
                    <CRow id="table" className="category-border-tfoot">
                        <CCol lg="12">
                            <div className="table-responsive no-border-header">
                                {expenseItemList.length > 0 && (
                                    <table className="table purchase-order-list" aria-label="simple table">
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th
                                                    rowSpan="2"
                                                    id="tblCheckBox"
                                                    width="10px"
                                                    className="text-left text-nowrap align-middle"
                                                >
                                                    <input
                                                        style={{ marginLeft: "3px" }}
                                                        type="checkbox"
                                                        value="all-check"
                                                        disabled
                                                    />
                                                </th>
                                                <th className="text-left text-nowrap align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="No"
                                                    />
                                                    {t("No")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Date"
                                                    />
                                                    {t("Date")}
                                                </th>
                                                <th
                                                    className="text-left text-nowrap align-middle"
                                                    rowSpan="2"
                                                    style={{ minWidth: "100px" }}
                                                >
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Item"
                                                    />
                                                    {t("Item")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Expense Category"
                                                    />
                                                    {t("Expense Category")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Attachement"
                                                    />
                                                    {t("Attachment")}
                                                </th>
                                                <th
                                                    className="text-center text-nowrap align-middle"
                                                    colSpan="7"
                                                    style={{ borderBottom: "2px solid #FFFFFF" }}
                                                >
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Budget Cost"
                                                    />
                                                    {t("Budget Cost")}
                                                </th>
                                                <th
                                                    className="text-center text-nowrap align-middle"
                                                    colSpan="8"
                                                    style={{ borderBottom: "2px solid #FFFFFF" }}
                                                >
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Actual Cost"
                                                    />
                                                    {t("Actual Cost")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle" rowSpan="2">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Description"
                                                    />
                                                    {t("Description")}
                                                </th>
                                            </tr>
                                            <tr width="100%">
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Unit price"
                                                    />
                                                    {t("Unit Price")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Qty"
                                                    />
                                                    {t("Qty")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Total"
                                                    />
                                                    {t("Total")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Price Currency"
                                                    />
                                                    {t("Price Currency")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Fx Rate"
                                                    />
                                                    {t("FX Rate")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Accept Currency"
                                                    />
                                                    {t("Accept Currency")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Amount"
                                                    />
                                                    {t("Amount")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Unit Price"
                                                    />
                                                    {t("Unit Price")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Qty"
                                                    />
                                                    {t("Qty")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Total"
                                                    />
                                                    {t("Total")}
                                                </th>
                                                <th className="text-left text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Price Currency"
                                                    />
                                                    {t("Price Currency")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Fx Rate"
                                                    />
                                                    {t("FX Rate")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Accept Currency"
                                                    />
                                                    {t("Accept Currency")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Amount"
                                                    />
                                                    {t("Amount")}
                                                </th>
                                                <th className="text-center text-nowrap align-middle">
                                                    <CImg
                                                        src={"avatars/titleicon.png"}
                                                        className="imgTitle"
                                                        alt="Reason"
                                                    />
                                                    {t("Reason")}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                expenseItemList.map((expenseItem,index)=>{
                                                    return(
                                            <tr key={index}>
                                                <td className="td-gray" 
                                                    style={{
                                                        borderLeft: "3px solid #858BC3",
                                                    }}>
                                                    <input
                                                        style={{ marginLeft: "3px" }}
                                                        type="checkbox"
                                                        value="all-check"
                                                        disabled
                                                        checked={expenseItem.additional_advance_item==1?true:false}
                                                    />
                                                </td>
                                                <td className="td-gray text-right">
                                                    {index+1}
                                                </td>
                                                <td className="text-center text-nowrap align-middle td-gray">
                                                    {expenseItem.date}
                                                </td>
                                                <td className="text-left text-break align-middle td-gray">
                                                    {expenseItem.title} {expenseItem.arrange_by_admin==1?`[${t('Arrange By Admin')}]`:''}
                                                </td>
                                                <td className="td-green text-left text-break align-middle td-gray">
                                                    {expenseItem.expense_category}
                                                </td>
                                                <td className="td-pink text-left text-break align-middle td-pink-blur customer-td-img">
                                                    {
                                                        expenseItem.expense_item_attachment.length>0&&
                                                        expenseItem.expense_item_attachment.map((file,index)=>{
                                                            return(
                                                                <div tabIndex="0" key={index} className="d-flex td-img" style={{ cursor: historyFlag ? "pointer" : "not-allowed",height:`${100/expenseItem.expense_item_attachment.length}%`,borderBottom:index!=expenseItem.expense_item_attachment.length-1?'2px solid white':'none' }} onClick={historyFlag?downloadFileAttach.bind(this,file,expenseItem.actual_cost.length!=null?false:true):null}>
                                                                    <i className="fas fas fa-file file"></i>
                                                                    <CLink  className="text-break text-nowrap ml-1">{file.file_name.split('/')[file.file_name.split('/').length-1]}</CLink>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td className=" text-right text-nowrap text-break align-middle td-pink-blur">
                                                    {
                                                       expenseItem.budget_cost.unit_price
                                                    }
                                                </td>
                                                <td className=" text-right text-nowrap text-break align-middle td-pink-blur">
                                                    {
                                                       expenseItem.budget_cost.quantity
                                                    }
                                                </td>
                                                <td className=" text-right text-nowrap text-break align-middle td-pink-blur">
                                                    {
                                                        expenseItem.budget_cost?.unit_price=="-"?"-":expenseItem.budget_cost?.unit_price==null?"":
                                                        Math.round(expenseItem.budget_cost?.unit_price*expenseItem.budget_cost?.quantity*100)/100
                                                    }
                                                </td>
                                                <td className=" text-left text-nowrap text-break align-middle td-pink-blur">{
                                                    expenseItem.budget_cost.price_currency?expenseItem.budget_cost.price_currency:''
                                                }</td>
                                                <td className=" text-right text-nowrap text-break align-middle td-pink-blur">
                                                    {
                                                    expenseItem.budget_cost.fx_rate
                                                    }
                                                </td>
                                                <td className=" text-left text-break text-nowrap align-middle td-pink-blur">{
                                                    expenseItem.budget_cost.accept_currency?expenseItem.budget_cost.accept_currency:''
                                                }</td>
                                                <td className=" text-right text-nowrap text-break align-middle td-pink-blur">
                                                    {
                                                        expenseItem.budget_cost?.unit_price=="-"?"-":expenseItem.budget_cost?.unit_price==null?"":
                                                        Math.round(expenseItem.budget_cost?.unit_price*expenseItem.budget_cost?.quantity*expenseItem.budget_cost?.fx_rate*100)/100
                                                    }
                                                </td>
                                                <td className="text-right text-nowrap text-break align-middle td-actual">
                                                    {
                                                       expenseItem.actual_cost.unit_price
                                                    }
                                                </td>
                                                <td className="text-right text-nowrap text-break align-middle td-actual">
                                                    {
                                                       expenseItem.actual_cost.quantity
                                                    }
                                                </td>
                                                <td className="text-right text-nowrap text-break align-middle td-actual">
                                                    {
                                                        expenseItem.actual_cost.unit_price=="-"?"-":expenseItem.actual_cost.unit_price==null?"":
                                                        Math.round(expenseItem.actual_cost.unit_price*expenseItem.actual_cost.quantity*100)/100
                                                    }
                                                </td>
                                                <td className="text-left text-nowrap text-break align-middle td-actual">{
                                                       expenseItem.actual_cost.price_currency?expenseItem.actual_cost.price_currency:''

                                                }</td>
                                                <td className="text-right text-nowrap text-break align-middle td-actual">{
                                                       expenseItem.actual_cost.fx_rate
                                                }</td>
                                                <td className="text-left text-nowrap text-break align-middle td-actual">{
                                                       expenseItem.actual_cost.accept_currency?expenseItem.actual_cost.accept_currency:''

                                                }</td>
                                                <td className="text-right text-nowrap text-break align-middle td-actual">
                                                {
                                                    expenseItem.actual_cost.unit_price=="-"?"-":expenseItem.actual_cost.unit_price==null?"":
                                                        Math.round(expenseItem.actual_cost?.unit_price*expenseItem.actual_cost?.quantity*expenseItem.actual_cost?.fx_rate*100)/100
                                                    }
                                                </td>
                                                <td className="text-left text-break align-middle td-actual">
                                                    {
                                                       expenseItem.actual_cost.reason?expenseItem.actual_cost.reason:''
                                                    }
                                                </td>
                                                <td className="text-left text-break  align-middle td-gray">
                                                    {
                                                       expenseItem.actual_cost.description?expenseItem.actual_cost.description:expenseItem.budget_cost.description?expenseItem.budget_cost.description:''
                                                    }
                                                </td>
                                            </tr>
                                                    )
                                                })
                                            }
                                    </tbody>
                                        <tfoot className="footer">
                                            {currencyList.length > 0 &&
                                                currencyList.map((i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <tr width="100%">
                                                                {index == 0 && (
                                                                    <td
                                                                        className="text-center text-nowrap align-middle td-gray"
                                                                        colSpan="6"
                                                                        rowSpan={currencyList.length}
                                                                        style={{
                                                                            borderLeft: "3px solid #858BC3",
                                                                        }}
                                                                    >
                                                                        {t('Total')}
                                                                    </td>
                                                                )}
                                                                <td
                                                                    className="text-center text-nowrap align-middle td-green-blur"
                                                                    colSpan="4"
                                                                >
                                                                    {i.currency_name}
                                                                </td>
                                                                <td
                                                                    className="text-right text-nowrap align-middle td-green-blur"
                                                                    colSpan="3"
                                                                >
                                                                    {adjustmentBudget.budget_total?.estimated_budget_total.find(e=>e.currency_id==i.id).sub_total}
                                                                </td>
                                                                <td
                                                                    className="text-center text-nowrap align-middle td-green-blur"
                                                                    colSpan="4"
                                                                >
                                                                    {i.currency_name}
                                                                </td>
                                                                <td
                                                                    className="text-right text-nowrap align-middle td-green-blur"
                                                                    colSpan="3"
                                                                    style={{borderRight:'none'}}
                                                                >
                                                                    {adjustmentBudget.budget_total?.actual_cost.find(e=>e.currency_id==i.id).sub_total}
                                                                </td>
                                                                <td
                                                                    className="text-right text-nowrap align-middle td-green-blur"
                                                                    style={{borderLeft:'none'}}
                                                                >
                                                                </td>
                                                                {index == 0 && (
                                                                    <td
                                                                        className="text-right text-nowrap align-middle td-gray"
                                                                        rowSpan={currencyList.length}
                                                                    ></td>
                                                                )}
                                                            </tr>
                                                        </Fragment>
                                                    );
                                                })}
                                        </tfoot>
                                    </table>
                                )}
                            </div>
                        </CCol>
                    </CRow>
                </CCard>
            </CCard>
        </div>
    );
};

export default ExpenseAjustmentDetailTable;
