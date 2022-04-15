import React, { useEffect } from "react";
import { CCol, CCard, CRow, CImg, CInput } from "@coreui/react";
import { useTranslation } from "react-i18next";

const EstimatedBudgetBusinessTripRequestTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let{
        needAdvance,
        changeCheckboxAdvance,
        airTicketTotal,
        transportationTotal,
        accommodationTotal,
        allowanceTotal,
        otherTotal,
        budgetTotal,
        totalNotAdmin,
        needAdvanceType,
        advancedMoney,
        changeAdvanceMoney,
        checkedAccomodation,
        checkedAirTicket,
        checkedAllowance,
        checkedOther,
        checkedTransportation,
        advanceAdditional,
        checkShowCheckboxAirticket,
        checkShowCheckboxAccomodation,
        checkShowCheckboxTransportation,
        checkShowCheckboxDailyAllowance,
        checkShowCheckboxOther

    }=props
    return (
        <>
            <CRow className="" style={{ marginTop: "10px" }}>
                <CCol lg="12">
                    <CImg
                        src={'avatars/list.png'}
                        className="list-icon"
                        width="6px"
                        style={{ marginRight: '10px', marginBottom: '6px' }}
                    />
                    <label className="font-weight-bold">{t('Estimated Budget')}</label>
                    <label style={{ marginLeft: "20px" }}>
                        {t(`(If you select the checkbox, you will get xx% extra additional for target items)`).replace('xx',advanceAdditional)}
                    </label>
                </CCol>
            </CRow>
            <CCard className="table-panel table-panel-businesstrip" style={{ backgroundColor: "#fafbfc", padding: "20px" }}>
            <CCard className="table-panel table-panel-businesstrip-white">
                <CRow id="table" className="estimated-border-tfoot">
                    <CCol lg="12">
                        <div className="table-responsive no-border-header">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th rowSpan="2" style={{minWidth:"300px"}} colSpan="2" id="tblNoShow"></th>
                                        <th
                                            className="text-center text-nowrap align-middle "
                                            style={{ borderBottom: "2px solid #FFFFFF" }}
                                            colSpan={budgetTotal.length>0?budgetTotal.length:1}
                                            id="tblTotal"
                                        >
                                            <CImg src={"avatars/titleicon.png"} className="imgTitle" alt="titleicon" />
                                            {t("Total")}
                                        </th>
                                    </tr>
                                    <tr width="100%">
                                        {budgetTotal.length>0&&
                                        budgetTotal.map((e,index)=>{
                                            return(
                                                <th key={index} className="text-center text-nowrap" style={{width:"300px"}}>
                                                {e.currency_name}
                                                </th>
                                            )
                                        })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr width="100%">
                                        <td
                                            className="td-num text-center  td-gray"
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}
                                        >
                                            <input
                                                value="AirTicket"
                                                type="checkbox"
                                                disabled={needAdvanceType==1||needAdvance==0||checkShowCheckboxAirticket==false}
                                                onChange={changeCheckboxAdvance}
                                                checked={checkedAirTicket}
                                            />
                                        </td>
                                        <td className="td-num text-left text-nowrap td-blue-customer">{t('Air Ticket')}</td>
                                        {
                                            airTicketTotal.length>0&&airTicketTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap  td-gray">{e.currency_amount}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td
                                            className="td-num text-center  td-gray"
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                value="Accomodation"
                                                disabled={needAdvanceType==1||needAdvance==0||checkShowCheckboxAccomodation==false}
                                                onChange={changeCheckboxAdvance}
                                                checked={checkedAccomodation}
                                            />
                                        </td>
                                        <td className="td-num text-left text-nowrap td-blue-customer">{t('Accomodation')}</td>
                                        {
                                            accommodationTotal.length>0&&accommodationTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap  td-gray">{e.currency_amount}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td
                                            className="td-num text-center  td-gray"
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                value="Transportation"
                                                disabled={needAdvanceType==1||needAdvance==0||checkShowCheckboxTransportation==false}
                                                onChange={changeCheckboxAdvance}
                                                checked={checkedTransportation}
                                            />
                                        </td>
                                        <td className="td-num text-left text-nowrap td-blue-customer">{t('Transportation')}</td>
                                        {
                                            transportationTotal.length>0&&transportationTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap  td-gray">{e.currency_amount}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td
                                            className="td-num text-center  td-gray"
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                value="DailyAllowance"
                                                disabled={needAdvanceType==1||needAdvance==0||checkShowCheckboxDailyAllowance==false}
                                                onChange={changeCheckboxAdvance}
                                                checked={checkedAllowance}
                                            />
                                        </td>
                                        <td className="td-num text-left text-nowrap td-blue-customer">{t('Daily Allowance')}</td>
                                        {
                                            allowanceTotal.length>0&&allowanceTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap  td-gray">{e.currency_amount}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr width="100%">
                                        <td
                                            className="td-num text-center  td-gray"
                                            style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                value="Other"
                                                disabled={needAdvanceType==1||needAdvance==0||checkShowCheckboxOther==false}
                                                onChange={changeCheckboxAdvance}
                                                checked={checkedOther}
                                            />
                                        </td>
                                        <td className="td-num text-left text-nowrap td-blue-customer">{t('Other')}</td>
                                        {
                                            otherTotal.length>0&&otherTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap  td-gray">{e.currency_amount}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                </tbody>
                                <tfoot className="footer">
                                    <tr>
                                        <td className="border-right-0 td-blue-customer" style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}>
                                        </td>
                                        <td  className="text-left align-middle td-blue-customer" style={{borderLeft:"none"}}>
                                            {t("Budget Total")}
                                        </td>
                                        {
                                            budgetTotal.length>0&&budgetTotal.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right text-nowrap td-gray">{Math.round(e.currency_amount*100)/100}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr>
                                        <td className="border-right-0 td-blue-customer" style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}>
                                        </td>
                                        <td className="text-left align-middle td-blue-customer" style={{borderLeft:"none"}}>
                                            {t("Total (Admin Arrange Amount Not Include)")}
                                        </td>
                                        {
                                            totalNotAdmin.length>0&&totalNotAdmin.map((e,index)=>{
                                                return(
                                                    <td key={index} className="text-right  td-gray">{Math.round(e.currency_amount*100)/100}</td>
                                                )
                                            })
                                        }
                                    </tr>
                                    <tr>
                                        <td className="border-right-0 td-blue-customer" style={{
                                                borderLeft: "3px solid #858BC3",
                                            }}>
                                        </td>
                                        <td className='text-left align-middle td-blue-customer' style={{borderLeft:"none"}}>
                                            <label className={needAdvance==1?'required ':''}>{t("Advance Money")}</label><br/>
                                            {/* <label className="required">{needAdvance==1?t('*'):''}</label><br/> */}
                                            <label>{needAdvanceType==0&&needAdvance==1?advanceAdditional+'% '+t('Additional for target items'):needAdvance==1?t('Specified Amount'):''}</label>
                                        </td>
                                        {
                                            advancedMoney.length>0&&advancedMoney.map((e,index)=>{
                                                return(
                                                    <td key={index} className="align-middle text-right td-gray">
                                                        {
                                                            (needAdvanceType==1&&(
                                                                <CInput  value={(e.currency_amount===0?"":e.currency_amount)} style={{textAlign:"end"}} id={e.id} onChange={changeAdvanceMoney}/>
                                                            ))||(
                                                                needAdvanceType==0&&(
                                                                    e.currency_amount==0&&needAdvance!=0?"":e.currency_amount
                                                                )
                                                            )
                                                        }
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
            </CCard>
        </>
    );
};
export default EstimatedBudgetBusinessTripRequestTable;
