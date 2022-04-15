import React, { useEffect } from "react";
import { CCol, CRow, CImg, CCard, CLink } from "@coreui/react";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
const BusinessTripDetailTable = (props) => {
    const { t } = useTranslation();
    useEffect(() => {});
    let { mainTable,
        currencies,
        currenciesAll,
        airTicket,
        businessTrip,
        accommodation,
        other,
        dailyAllowance,
        transportation,
        subTotalTicket,
        subTotalAcc,
        subTotalTran,
        subTotalDaily,
        subTotalOther,
        bugetTotal,
        totalAdvance,
        advanceFlag,
        currencyID,
        exportFile,
        checkBorder,
        setCheckBorder
    } = props;
    let nameTotal="";
    //get name currency
    let nameCurrencies=(value)=>{
        currencies.map((i)=>{
            if(i.id==value)
               nameTotal=i.currency_name;
        })
        return nameTotal;
    }
    const sumRow = (name) =>{
        switch(name){
            case(1):
                let lenghAirTicket = 0;
                airTicket.map(i=>{
                    if(i.attachement.length==0)
                        lenghAirTicket+=1;
                    else
                        lenghAirTicket+= i.attachement.length;
                })
                setCheckBorder(1);
                return lenghAirTicket;
            case(2):
                 let lenghAcc = 0;
                accommodation.map(i=>{
                    if(i.attachement.length==0)
                        lenghAcc+=1;
                    else
                        lenghAcc+= i.attachement.length
                })
                setCheckBorder(2);
                return lenghAcc;
            case(3):
                let lenghTran = 0;
                transportation.map(i=>{
                    if(i.attachement.length==0)
                        lenghTran+=1;
                    else
                        lenghTran+= i.attachement.length;
                })
                setCheckBorder(3);
                return lenghTran;
            case(4):
                let lenghDaily = 0;
                dailyAllowance.map(i=>{
                    if(i.attachement.length==0)
                        lenghDaily+=1;
                    else
                        lenghDaily+= i.attachement.length;
                })
                setCheckBorder(4);
                return lenghDaily;
            default:
                let lenghOther = 0;
                other.map(i=>{
                    if(i.attachement.length==0)
                        lenghOther+=1;
                    else
                        lenghOther+= i.attachement.length;
                })
                setCheckBorder(5);
                return lenghOther;
        }

    }
    return (
        <>
            {mainTable !== "" && businessTrip !=="" && currenciesAll.length > 0 && (
                <>
                 <span style={{ color: "red" }}>
                    #{t("Arrange By Admin")}:{t("You cannot get this amount because of admin or company arrange/buy for you.")}
                </span>
                <br />
                <CCard>
                    <CRow id="table">
                        <CCol lg="12">
                            <div className="table-responsive no-border-header">
                                <table
                                    id="tbBusinessTrip"
                                    className="table "
                                    aria-label="simple table"
                                >
                                    <thead id="thead-id">
                                        <tr width="100%">
                                            <th
                                                className="text-left text-nowrap"
                                                colSpan="2"
                                                rowSpan="2"
                                            ></th>
                                            <th
                                                className="align-middle text-left text-nowrap"
                                                id="tblAttachement"
                                                rowSpan="2"
                                            >
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Attachment")}
                                            </th>
                                            <th
                                                className="text-center text-nowrap th-bottom"
                                                id="tblBudgetCost"
                                                colSpan="6"
                                            >
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Budget Cost")}
                                            </th>
                                            <th
                                                className="align-middle text-left text-nowrap"
                                                id="tblDescription"
                                                rowSpan="2"
                                            >
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Description")}
                                            </th>
                                        </tr>
                                        <tr width="100%">
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Unit Price")}x{t("Day/Times")}
                                            </th>
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Total")}
                                            </th>
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Price Currency")}
                                            </th>
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("FX Rate")}
                                            </th>
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Accept Currency")}
                                            </th>
                                            <th className="text-left text-nowrap">
                                                <CImg
                                                    src={
                                                        "avatars/titleicon.png"
                                                    }
                                                    className="imgTitle"
                                                    alt="titleicon"
                                                />
                                                {t("Amount")}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Air Ticket */}
                                        {airTicket.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {i.attachement.length>0 && i.attachement.map((file,idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                { idx == 0 && index ==0 && (
                                                                    <>
                                                                        <td
                                                                            id="tblAirTicket"
                                                                            className="td-num text-left text-nowrap td-gray"
                                                                            style={{
                                                                                borderLeft:
                                                                                    "3px solid #858BC3",
                                                                            }}
                                                                            rowSpan={sumRow(1)}
                                                                        >
                                                                            {t(
                                                                                "Air Ticket"
                                                                            )}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                { idx ==0 && (
                                                                    <td className="td-num text-left text-nowrap td-gray" rowSpan={i.attachement.length}>
                                                                        {i.title}
                                                                        <br />
                                                                        {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                                    </td>
                                                                )}
                                                                <td className="td-num text-left text-nowrap col-color-blue">
                                                                    <i
                                                                        className="file fas fa-file mr-2"
                                                                    ></i>
                                                                    <CLink type="button" onClick={exportFile.bind(this, file,file.business_trip_detail_document_name)}>
                                                                        {
                                                                            file.business_trip_detail_document_name?.split("/")[file.business_trip_detail_document_name?.split("/").length-1]
                                                                        }
                                                                    </CLink>
                                                                </td>
                                                                { idx == 0  && (<>
                                                                    <td
                                                                    className="td-num text-right td-pink text-nowrap" rowSpan={i.attachement.length}
                                                                >
                                                                    {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.unit_price==null ?"":
                                                                        (i.unit_price*i.quantity)||"-"
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currenciesAll.map((ele)=>{
                                                                        return (
                                                                            i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.fx_rate==null ?"":
                                                                        (i.fx_rate)
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currencies.length >0 && currencies.map((ele)=>{
                                                                        return (
                                                                            i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.cost==null?"": (i.cost) }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-gray text-break"
                                                                >
                                                                    {
                                                                        i.description
                                                                    }
                                                                </td>
                                                            </>)}
                                                            </tr>
                                                    );}
                                                    )}
                                                     {i.attachement.length == 0 && <>
                                                        <tr>
                                                         {index ==0 && (
                                                            <td rowSpan={sumRow(1)}
                                                                id="tblAirTicket"
                                                                className="td-num text-left text-nowrap td-gray"
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t(
                                                                    "Air Ticket"
                                                                )}
                                                            </td>
                                                         )}
                                                            <td className="td-num text-left text-nowrap td-gray" >
                                                                {i.title}
                                                                <br />
                                                                {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                            </td>
                                                            <td className="td-num text-left text-nowrap col-color-blue">
                                                            </td>
                                                                <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                 {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.unit_price==null ?"":
                                                                    (i.unit_price*i.quantity)||"-"
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currenciesAll.map((ele)=>{
                                                                    return (
                                                                        i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.fx_rate==null ?"":
                                                                    (i.fx_rate)
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currencies.length >0 && currencies.map((ele)=>{
                                                                    return (
                                                                        i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.cost==null?"": (i.cost) }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-gray text-break"
                                                            >
                                                                {
                                                                    i.description
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                    }
                                                </Fragment>
                                            )}
                                        )}
                                        {/* Sub total */}
                                        {subTotalTicket.length >0 && subTotalTicket.map((ele,idex)=>{
                                            return(
                                                <Fragment key={idex}>
                                                    <tr className="td-gray">
                                                        {idex == 0 &&  <>
                                                            <td id="tblSubTotal"
                                                                colSpan="3"
                                                                rowSpan={subTotalTicket.length}
                                                                className={checkBorder==1?"td-num text-center td-gray border-bottom-left-radius":"td-num text-center td-gray"}
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t("Sub Total")}
                                                            </td>
                                                        </>
                                                        }
                                                            <td
                                                            colSpan="3"
                                                            className="td-num text-center td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {currencies.map((i) =>{
                                                                return i.id == ele.currency_id?i.currency_name:""
                                                            })}
                                                        </td>
                                                        <td
                                                                colSpan="3"
                                                                className="td-num text-right td-currencies text-nowrap no-border-radius"
                                                            >
                                                            { ele.sub_total==null?"" : (ele.sub_total) }
                                                        </td>
                                                        {idex == 0 && <>
                                                            <td
                                                                rowSpan={subTotalTicket.length}
                                                                className={checkBorder==1?"text-left td-gray border-bottom-right-radius":"text-left td-gray"}
                                                            ></td>
                                                        </>
                                                        }
                                                    </tr>
                                                </Fragment>
                                                )
                                        })}
                                        {/* End of Air Ticket  */}
                                        {/* Accomodation */}
                                        {accommodation.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {i.attachement.length>0 && i.attachement.map((file,idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                { idx == 0 && index ==0 && (
                                                                    <>
                                                                        <td
                                                                            id="tblAccomodation"
                                                                            className="td-num text-left text-nowrap td-gray"
                                                                            style={{
                                                                                borderLeft:
                                                                                    "3px solid #858BC3",
                                                                            }}
                                                                            rowSpan={sumRow(2)}
                                                                        >
                                                                            {t(
                                                                                "Accomodation"
                                                                            )}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                { idx ==0 && (
                                                                    <td className="td-num text-left text-nowrap td-gray" rowSpan={i.attachement.length}>
                                                                        {i.title}
                                                                        <br />
                                                                        {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                                    </td>
                                                                )}
                                                                <td className="td-num text-left text-nowrap col-color-blue">
                                                                    <i
                                                                        className="file fas fa-file mr-2"
                                                                    ></i>
                                                                    <CLink type="button" onClick={exportFile.bind(this, file,file.business_trip_detail_document_name)}>
                                                                        {
                                                                             file.business_trip_detail_document_name?.split("/")[file.business_trip_detail_document_name?.split("/").length-1]
                                                                        }
                                                                    </CLink>
                                                                </td>
                                                                { idx ==0  && (<>
                                                                    <td
                                                                    className="td-num text-right td-pink text-nowrap" rowSpan={i.attachement.length}
                                                                >
                                                                   {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.unit_price==null ?"":
                                                                        (i.unit_price*i.quantity)|| "-"
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currenciesAll.map((ele)=>{
                                                                        return (
                                                                            i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.fx_rate==null ?"":
                                                                        (i.fx_rate)
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currencies.length >0 && currencies.map((ele)=>{
                                                                        return (
                                                                            i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.cost==null?"": (i.cost) }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-gray text-break"
                                                                >
                                                                    {
                                                                        i.description
                                                                    }
                                                                </td>
                                                            </>)}
                                                            </tr>
                                                    );}
                                                    )}
                                                     {i.attachement.length == 0 && <>
                                                        <tr>
                                                         {index ==0 && (
                                                            <td rowSpan={sumRow(2)}
                                                                id="tblAccomodation"
                                                                className="td-num text-left text-nowrap td-gray"
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t(
                                                                    "Accomodation"
                                                                )}
                                                            </td>
                                                         )}
                                                            <td className="td-num text-left text-nowrap td-gray" >
                                                                {i.title}
                                                                <br />
                                                                {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                            </td>
                                                            <td className="td-num text-left text-nowrap col-color-blue">
                                                            </td>
                                                                <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.unit_price==null ?"":
                                                                    (i.unit_price*i.quantity)|| "-"
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currenciesAll.map((ele)=>{
                                                                    return (
                                                                        i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.fx_rate==null ?"":
                                                                    (i.fx_rate)
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currencies.length >0 && currencies.map((ele)=>{
                                                                    return (
                                                                        i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.cost==null?"": (i.cost) }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-gray text-break"
                                                            >
                                                                {
                                                                    i.description
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                    }
                                                </Fragment>
                                            )}
                                        )}
                                        {/* Sub total */}
                                        {subTotalAcc.length >0 && subTotalAcc.map((ele,idex)=>{
                                            return(
                                                <Fragment key={idex}>
                                                    <tr>
                                                        {idex == 0 &&  <>
                                                            <td
                                                            id="tblSubTotal"
                                                                colSpan="3"
                                                                rowSpan={subTotalAcc.length}
                                                                className={checkBorder==2?"td-num text-center td-gray border-bottom-left-radius":"td-num text-center td-gray"}
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t("Sub Total")}
                                                            </td>
                                                        </>
                                                        }
                                                            <td
                                                            colSpan="3"
                                                            className="td-num text-center td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {currencies.map((i) =>{
                                                                return i.id == ele.currency_id?i.currency_name:""
                                                            })}
                                                        </td>
                                                        <td
                                                            colSpan="3"
                                                            className="td-num text-right td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                        {idex == 0 && <>
                                                            <td
                                                                rowSpan={subTotalAcc.length}
                                                                className={checkBorder==2?"text-left td-gray border-bottom-right-radius":"text-left td-gray"}

                                                            ></td>
                                                        </>
                                                        }
                                                    </tr>
                                                </Fragment>
                                            )
                                        })}
                                        {/* End of Accomodation  */}
                                        {/*Transportation */}
                                        {transportation.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {i.attachement.length>0 && i.attachement.map((file,idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                { idx == 0 && index ==0 && (
                                                                    <>
                                                                        <td
                                                                            id="tblTransportation"
                                                                            className="td-num text-left text-nowrap td-gray"
                                                                            style={{
                                                                                borderLeft:
                                                                                    "3px solid #858BC3",
                                                                            }}
                                                                            rowSpan={sumRow(3)}
                                                                        >
                                                                            {t(
                                                                                "Transportation"
                                                                            )}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                { idx ==0 && (
                                                                    <td className="td-num text-left text-nowrap td-gray" rowSpan={i.attachement.length}>
                                                                        {i.title}
                                                                        <br />
                                                                        {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                                    </td>
                                                                )}
                                                                <td className="td-num text-left text-nowrap col-color-blue">
                                                                    <i
                                                                        className="file fas fa-file mr-2"
                                                                    ></i>
                                                                    <CLink type="button" onClick={exportFile.bind(this, file,file.business_trip_detail_document_name)}>
                                                                        {
                                                                             file.business_trip_detail_document_name?.split("/")[file.business_trip_detail_document_name?.split("/").length-1]
                                                                        }
                                                                    </CLink>
                                                                </td>
                                                                { idx ==0  && (<>
                                                                    <td
                                                                    className="td-num text-right td-pink text-nowrap" rowSpan={i.attachement.length}
                                                                >
                                                                    {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.unit_price==null ?"":
                                                                        (i.unit_price*i.quantity)|| "-"
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currenciesAll.map((ele)=>{
                                                                        return (
                                                                            i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.fx_rate==null ?"":
                                                                        (i.fx_rate)
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currencies.length >0 && currencies.map((ele)=>{
                                                                        return (
                                                                            i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.cost==null?"": (i.cost) }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-gray text-break"
                                                                >
                                                                    {
                                                                        i.description
                                                                    }
                                                                </td>
                                                            </>)}
                                                            </tr>
                                                    );}
                                                    )}
                                                     {i.attachement.length == 0 &&
                                                     <>
                                                        <tr>
                                                         {index ==0 && (
                                                            <td rowSpan={sumRow(3)}
                                                                id="tblTransportation"
                                                                className="td-num text-left text-nowrap td-gray"
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t(
                                                                    "Transportation"
                                                                )}
                                                            </td>
                                                         )}
                                                            <td className="td-num text-left text-nowrap td-gray" >
                                                                {i.title}
                                                                <br />
                                                                {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                            </td>
                                                            <td className="td-num text-left text-nowrap col-color-blue">
                                                            </td>
                                                                <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.unit_price==null ?"":
                                                                    (i.unit_price*i.quantity)|| "-"
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currenciesAll.map((ele)=>{
                                                                    return (
                                                                        i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.fx_rate==null ?"":
                                                                    (i.fx_rate)
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currencies.length >0 && currencies.map((ele)=>{
                                                                    return (
                                                                        i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.cost==null?"": (i.cost) }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-gray text-break"
                                                            >
                                                                {
                                                                    i.description
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                    }
                                                </Fragment>
                                            )}
                                        )}
                                        {/* Sub total */}
                                        {subTotalTran.length >0 && subTotalTran.map((ele,idex)=>{
                                            return(
                                                <Fragment key={idex}>
                                                    <tr className="td-gray">
                                                        {idex == 0 &&  <>
                                                            <td id="tblSubTotal"
                                                                colSpan="3"
                                                                rowSpan={subTotalTran.length}
                                                                className="td-num text-center td-gray"
                                                                className={checkBorder==3?"td-num text-center td-gray border-bottom-left-radius":"td-num text-center td-gray"}
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t("Sub Total")}
                                                            </td>
                                                        </>
                                                        }
                                                            <td
                                                            colSpan="3"
                                                            className="td-num text-center td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {currencies.map((i) =>{
                                                                return i.id == ele.currency_id?i.currency_name:""
                                                            })}
                                                        </td>
                                                        <td
                                                            colSpan="3"
                                                            className="td-num text-right td-currencies text-nowrap no-border-radius"
                                                        >
                                                           {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                        {idex == 0 && <>
                                                            <td
                                                                rowSpan={subTotalTran.length}
                                                                className={checkBorder==3?"text-left td-gray border-bottom-right-radius":"text-left td-gray"}
                                                            ></td>
                                                        </>
                                                        }
                                                    </tr>
                                                </Fragment>
                                                )
                                        })}
                                        {/* End of Transportation */}
                                        {/* Daily Allowance */}
                                        {dailyAllowance.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {i.attachement.length >0 && i.attachement.map((file,idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                {  idx == 0 && index == 0 &&(
                                                                    <>
                                                                        <td
                                                                            id="tblDailyAllowance"
                                                                            className="td-num text-left text-nowrap td-gray"
                                                                            style={{
                                                                                borderLeft:
                                                                                    "3px solid #858BC3",
                                                                            }}
                                                                            rowSpan={sumRow(4)}
                                                                        >
                                                                            {t(
                                                                                "Daily Allowance"
                                                                            )}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                { idx ==0 && (
                                                                    <td className="td-num text-left text-nowrap td-gray" rowSpan={i.attachement.length}>
                                                                        {i.title}
                                                                        <br />
                                                                        {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                                    </td>
                                                                )}
                                                                <td className="td-num text-left text-nowrap col-color-blue">
                                                                    <i
                                                                        className="file fas fa-file mr-2"
                                                                    ></i>
                                                                    <CLink type="button" onClick={exportFile.bind(this, file,file.business_trip_detail_document_name)}>
                                                                        {
                                                                             file.business_trip_detail_document_name?.split("/")[file.business_trip_detail_document_name?.split("/").length-1]
                                                                        }
                                                                    </CLink>
                                                                </td>
                                                                { idx ==0 && (<>
                                                                    <td
                                                                    className="td-num text-right td-pink text-nowrap" rowSpan={i.attachement.length}
                                                                >
                                                                    {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.unit_price==null ?"":
                                                                        (i.unit_price*i.quantity)|| "-"
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currenciesAll.map((ele)=>{
                                                                        return (
                                                                            i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.fx_rate==null ?"":
                                                                        (i.fx_rate)
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currencies.length >0 && currencies.map((ele)=>{
                                                                        return (
                                                                            i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.cost==null?"": (i.cost) }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-gray text-break"
                                                                >
                                                                    {
                                                                        i.description
                                                                    }
                                                                </td>
                                                            </>)}
                                                            </tr>
                                                    );}
                                                    )}
                                                     {i.attachement.length == 0 && <>
                                                        <tr>
                                                         {index ==0 && (
                                                            <td rowSpan={sumRow(4)}
                                                                id="tblDailyAllowance"
                                                                className="td-num text-left text-nowrap td-gray"
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t(
                                                                    "Daily Allowance"
                                                                )}
                                                            </td>
                                                         )}
                                                            <td className="td-num text-left text-nowrap td-gray" >
                                                                {i.title}
                                                                <br />
                                                                {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                            </td>
                                                            <td className="td-num text-left text-nowrap col-color-blue">
                                                            </td>
                                                                <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.unit_price==null ?"":
                                                                    (i.unit_price*i.quantity)|| "-"
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currenciesAll.map((ele)=>{
                                                                    return (
                                                                        i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.fx_rate==null ?"":
                                                                    (i.fx_rate)
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currencies.length >0 && currencies.map((ele)=>{
                                                                    return (
                                                                        i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.cost==null?"": (i.cost) }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-gray text-break"
                                                            >
                                                                {
                                                                    i.description
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                    }
                                                </Fragment>
                                            )}
                                        )}
                                        {/* Sub total */}
                                        {subTotalDaily.map((ele,idex)=>{
                                            return(
                                                <Fragment key={idex}>
                                                    <tr className="td-gray">
                                                        {idex == 0 &&  <>
                                                            <td
                                                                id="tblSubTotal"
                                                                colSpan="3"
                                                                rowSpan={subTotalDaily.length}
                                                                className="td-num text-center td-gray"
                                                                className={checkBorder==4?"td-num text-center td-gray border-bottom-left-radius":"td-num text-center td-gray"}
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3"
                                                                }}
                                                            >
                                                                {t("Sub Total")}
                                                            </td>
                                                        </>
                                                        }
                                                        <td
                                                            colSpan="3"
                                                            className="td-num text-center td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {currencies.map((i) =>{
                                                                return i.id == ele.currency_id?i.currency_name:""
                                                            })}
                                                        </td>
                                                        <td
                                                            colSpan="3"
                                                            className="td-num text-right td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                        {idex == 0 && <>
                                                            <td
                                                                rowSpan={subTotalDaily.length}
                                                                className="text-left td-gray"
                                                                className={checkBorder==4?"text-left td-gray border-bottom-right-radius":"text-left td-gray"}
                                                            ></td>
                                                        </>
                                                        }
                                                    </tr>
                                                </Fragment>
                                                )
                                        })}
                                        {/* End of Daily Allowance */}
                                        {/* Other */}
                                        {other.map((i, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    {i.attachement.length>0 && i.attachement.map((file,idx) => {
                                                        return (
                                                            <tr key={idx}>
                                                                { idx == 0 && index == 0 && (
                                                                    <>
                                                                        <td
                                                                            id="tblOther"
                                                                            className="td-num text-left text-nowrap td-gray"
                                                                            style={{
                                                                                borderLeft:
                                                                                    "3px solid #858BC3",
                                                                            }}
                                                                            rowSpan={sumRow(5)}
                                                                        >
                                                                            {t(
                                                                                "Other"
                                                                            )}
                                                                        </td>
                                                                    </>
                                                                )}
                                                                { idx ==0 && (
                                                                    <td className="td-num text-left text-nowrap td-gray" rowSpan={i.attachement.length}>
                                                                        {i.title}
                                                                        <br />
                                                                        {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                                    </td>
                                                                )}
                                                                <td className="td-num text-left text-nowrap col-color-blue">
                                                                    <i
                                                                        className="file fas fa-file mr-2"
                                                                    ></i>
                                                                    <CLink type="button" onClick={exportFile.bind(this, file,file.business_trip_detail_document_name)}>
                                                                        {
                                                                            file.business_trip_detail_document_name?.split("/")[file.business_trip_detail_document_name?.split("/").length-1]
                                                                        }
                                                                    </CLink>
                                                                </td>
                                                                { idx ==0 && (<>
                                                                    <td
                                                                    className="td-num text-right td-pink text-nowrap" rowSpan={i.attachement.length}
                                                                >
                                                                     {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.unit_price==null ?"":
                                                                        (i.unit_price*i.quantity)|| "-"
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currenciesAll.map((ele)=>{
                                                                        return (
                                                                            i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.fx_rate==null ?"":
                                                                        (i.fx_rate)
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-pink text-nowrap"
                                                                >
                                                                    {currencies.length >0 && currencies.map((ele)=>{
                                                                        return (
                                                                            i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                        )})
                                                                    }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-right td-pink text-nowrap"
                                                                >
                                                                    { i.cost==null?"": (i.cost) }
                                                                </td>
                                                                <td  rowSpan={i.attachement.length}
                                                                    className="td-num text-left td-gray text-break"
                                                                >
                                                                    {
                                                                        i.description
                                                                    }
                                                                </td>
                                                            </>)}
                                                            </tr>
                                                    );}
                                                    )}
                                                     {i.attachement.length == 0 && <>
                                                        <tr>
                                                         {index ==0 && (
                                                            <td rowSpan={sumRow(5)}
                                                                id="tblOther"
                                                                className="td-num text-left text-nowrap td-gray"
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t(
                                                                    "Other"
                                                                )}
                                                            </td>
                                                         )}
                                                            <td className="td-num text-left text-nowrap td-gray" >
                                                                {i.title}
                                                                <br />
                                                                {i.arrange_by_admin ==1 ? "[Arrange By Admin]": ""}
                                                            </td>
                                                            <td className="td-num text-left text-nowrap col-color-blue">
                                                            </td>
                                                                <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                 {i.unit_price ==null ?"": i.unit_price =="-" ?"-": (i.unit_price) +" x "+ (i.quantity)}
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.unit_price==null ?"":
                                                                    (i.unit_price*i.quantity)|| "-"
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currenciesAll.map((ele)=>{
                                                                    return (
                                                                        i.price_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.fx_rate==null ?"":
                                                                    (i.fx_rate)
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-pink text-nowrap"
                                                            >
                                                                {currencies.length >0 && currencies.map((ele)=>{
                                                                    return (
                                                                        i.accept_currency_id ==ele.id ? ele.currency_name : ""
                                                                    )})
                                                                }
                                                            </td>
                                                            <td
                                                                className="td-num text-right td-pink text-nowrap"
                                                            >
                                                                { i.cost==null?"": (i.cost) }
                                                            </td>
                                                            <td
                                                                className="td-num text-left td-gray text-break"
                                                            >
                                                                {
                                                                    i.description
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                    }
                                                </Fragment>
                                            )}
                                        )}
                                        {/* Sub total */}
                                        {subTotalOther.length > 0 && subTotalOther.map((ele,idex)=>{
                                            return(
                                                <Fragment key={idex}>
                                                    <tr className="td-gray">
                                                        {idex == 0 &&  <>
                                                            <td id="tblSubTotal"
                                                                colSpan="3"
                                                                rowSpan={subTotalOther.length}
                                                                className={checkBorder==5?"td-num text-center td-gray border-bottom-left-radius":"td-num text-center td-gray"}
                                                                style={{
                                                                    borderLeft:
                                                                        "3px solid #858BC3",
                                                                }}
                                                            >
                                                                {t("Sub Total")}
                                                            </td>
                                                        </>
                                                        }
                                                            <td
                                                            colSpan="3"
                                                            className="td-num text-center td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {currencies.map((i) =>{
                                                                return i.id == ele.currency_id?i.currency_name:""
                                                            })}
                                                        </td>
                                                        <td
                                                            colSpan="3"
                                                            className="td-num text-right td-currencies text-nowrap no-border-radius"
                                                        >
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                        {idex == 0 && <>
                                                            <td
                                                                rowSpan={subTotalOther.length}
                                                                className={checkBorder==5?"text-left td-gray border-bottom-right-radius":"text-left td-gray"}
                                                            ></td>
                                                        </>
                                                        }
                                                    </tr>
                                                </Fragment>
                                                )
                                             })}
                                        {/* End of Other */}
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </CCard>
                    {/*
					Start tableEstimated Budget
					*/}
                    <CRow>
                        <CCol lg="auto" md="auto" xs="auto">
                            <CImg
                                className="img-title"
                                src="avatars/list.png"
                                alt="titleicon"
                            />
                            <label
                                id="lblEstimatedBudget"
                                className="font-weight-bold ml-3"
                            >
                                {t("Estimated Budget")}
                            </label>
                        </CCol>
                        <CCol md="auto" xs="auto">
                            <span id="lblSelectTager">
                                {t(`(If you select the checkbox, you will get xx% extra additional for target items)`).replace('xx',mainTable.advance_additional)}
                            </span>
                        </CCol>
                    </CRow>
                    <CCard>
                        <CRow id="table">
                            <CCol lg="12">
                                <div className="table-responsive no-border-header">
                                    <table
                                        className="table purchase-order-list"
                                        aria-label="simple table"
                                    >
                                        <thead id="thead-id">
                                            <tr width="100%">
                                                <th
                                                    className="text-left text-nowrap"
                                                    colSpan="2"
                                                    rowSpan="2"
                                                ></th>
                                                <th
                                                    className="text-center text-nowrap th-bottom"
                                                    id="tblTotal"
                                                    colSpan={currencyID.length}
                                                >
                                                    <CImg
                                                        src={
                                                            "avatars/titleicon.png"
                                                        }
                                                        className="imgTitle"
                                                        alt="titleicon"
                                                    />
                                                    {t("Total")}
                                                </th>
                                            </tr>
                                            <tr width="100%">
                                                {currencyID.length > 0 && currencyID.map((i, index)=>{
                                                    return(
                                                        <Fragment key={index} >
                                                            <th className="text-center text-nowrap">
                                                                {nameCurrencies(i)}
                                                            </th>
                                                        </Fragment>
                                                    )
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr width="100%">
                                                <td
                                                    className="td-num text-center"
                                                    style={{
                                                        borderLeft:
                                                            "3px solid #858BC3"
                                                    }}
                                                >
                                             {airTicket.length >0 ? airTicket.map(
                                                (i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            {index == 0 && (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={i.additional_advance_item ==1}
                                                                    disabled
                                                                />
                                                            )}
                                                        </Fragment>
                                                    );}
                                                    )
                                                 :
                                                    <input
                                                        type="checkbox"
                                                        disabled
                                                    />
                                                 }
                                                    </td>
                                                <td className="text-left col-color-blue" id="tblAirTicket">
                                                    {t("Air Ticket")}
                                                </td>
                                                {subTotalTicket.length >0 ?subTotalTicket.map((ele,key) =>{
                                                    return(
                                                        <td className="text-center td-gray" key={key}>
                                                          {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                    )
                                                 }):
                                                 currencyID.map((i,index)=>{
                                                    return (
                                                        <td className="text-center td-gray" key={index}></td>
                                                    )
                                                 })
                                                }
                                            </tr>
                                            <tr width="100%">
                                            <td
                                                    className="td-num text-center"
                                                    style={{
                                                        borderLeft:
                                                            "3px solid #858BC3"
                                                    }}
                                                >
                                             {accommodation.length >0 ? accommodation.map(
                                                (i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            {index == 0 && (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={i.additional_advance_item ==1}
                                                                     disabled
                                                                />
                                                            )}
                                                        </Fragment>
                                                    );}
                                                    )
                                                 :
                                                    <input
                                                        type="checkbox"
                                                        disabled
                                                    />
                                                 }
                                                    </td>
                                                    <td className="text-left col-color-blue" id="tblAccomodation">
                                                        {t("Accomodation")}
                                                    </td>
                                                    {subTotalAcc.length>0 ?subTotalAcc.map((ele,key) =>{
                                                        return(
                                                            <td className="text-center td-gray" key={key}>
                                                                {ele.sub_total != null ? (ele.sub_total):""}
                                                            </td>
                                                        )
                                                    }):
                                                    currencyID.map((i,index)=>{
                                                        return (
                                                            <td className="text-center td-gray" key={index}></td>
                                                        )
                                                     })
                                                    }
                                            </tr>
                                            <tr width="100%">
                                            <td
                                                    className="td-num text-center"
                                                    style={{
                                                        borderLeft:
                                                            "3px solid #858BC3"
                                                    }}
                                                >
                                                {transportation.length >0 ? transportation.map(
                                                    (i, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                {index == 0 && (
                                                                    <input
                                                                        type="checkbox"
                                                                         disabled
                                                                        checked={i.additional_advance_item ==1}
                                                                    />
                                                                )}
                                                            </Fragment>
                                                        );}
                                                        )
                                                    :
                                                        <input
                                                            type="checkbox"
                                                            disabled
                                                        />
                                                    }
                                                </td>
                                                <td className="text-left col-color-blue" id="tblTransportation">
                                                    {t("Transportation")}
                                                </td>
                                                {subTotalTran.length>0 ? subTotalTran.map((ele,key) =>{
                                                    return(
                                                        <td className="text-center td-gray" key={key}>
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                    )
                                                 }):
                                                currencyID.map((i,index)=>{
                                                    return (
                                                        <td className="text-center td-gray" key={index}></td>
                                                    )
                                                 })
                                                }
                                            </tr>
                                            <tr width="100%">
                                            <td
                                                    className="td-num text-center"
                                                    style={{
                                                        borderLeft:
                                                            "3px solid #858BC3"
                                                    }}
                                                >
                                             {dailyAllowance.length >0 ? dailyAllowance.map(
                                                (i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            {index == 0 && (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={i.additional_advance_item ==1}
                                                                     disabled
                                                                />
                                                            )}
                                                        </Fragment>
                                                    );}
                                                    )
                                                 :
                                                    <input
                                                        type="checkbox"
                                                        disabled
                                                    />
                                                 }
                                                </td>

                                                <td className="text-left col-color-blue" id="tblDailyAllowance">
                                                    {t("Daily Allowance")}
                                                </td>
                                                {subTotalDaily.length>0 ?subTotalDaily.map((ele,k) =>{
                                                    return(
                                                        <td className="text-center td-gray" key={k}>
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                    )
                                                 }):
                                                 currencyID.map((i,index)=>{
                                                    return (
                                                        <td className="text-center td-gray" key={index}></td>
                                                    )
                                                 })
                                                }

                                            </tr>
                                            <tr width="100%">
                                            <td
                                                    className="td-num text-center"
                                                    style={{
                                                        borderLeft:
                                                            "3px solid #858BC3"
                                                    }}
                                                >
                                             {other.length >0 ? other.map(
                                                (i, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            {index == 0 && (
                                                                <input
                                                                    type="checkbox"
                                                                    checked={i.additional_advance_item ==1}
                                                                    disabled
                                                                />
                                                            )}
                                                        </Fragment>
                                                    );}
                                                    )
                                                 :
                                                    <input
                                                        type="checkbox"
                                                        disabled
                                                    />
                                                 }
                                                    </td>

                                                <td className="text-left col-color-blue" id="tblOther">
                                                    {t("Other")}
                                                </td>
                                                {subTotalOther.length>0 ?subTotalOther.map((ele,key) =>{
                                                    return(
                                                        <td className="text-center td-gray" key={key}>
                                                            {ele.sub_total != null ? (ele.sub_total):""}
                                                        </td>
                                                    )
                                                 }):
                                                 currencyID.map((i,index)=>{
                                                    return (
                                                        <td className="text-center td-gray" key={index}></td>
                                                    )
                                                 })
                                                }
                                            </tr>
                                            <tr>
                                                <td
                                                className="text-left col-color-blue"
                                                    style={{
                                                        borderRight: "none",
                                                        borderLeft:
                                                            "3px solid #858BC3",
                                                    }}
                                                ></td>
                                                <td className="text-left col-color-blue" id="tblBudgetTotal">
                                                    {t("Budget Total")}
                                                </td>
                                                {bugetTotal.map((i,index)=>{
                                                    return(
                                                        <td className="text-center td-gray" key={index}>
                                                            {i.budget_total == null? "":i.budget_total}
                                                        </td>
                                                    )
                                                  })
                                                }
                                            </tr>
                                            <tr>
                                                <td className="text-left col-color-blue"
                                                    style={{
                                                        borderRight: "none",
                                                        borderLeft:
                                                            "3px solid #858BC3",
                                                    }}
                                                ></td>
                                                <td className="text-left col-color-blue" id="tblTotalAdmin">
                                                    {t(
                                                        "Total (Admin Arrange Amount Not Include)"
                                                    )}
                                                </td>
                                                {bugetTotal.map((i,index)=>{
                                                    return(
                                                        <td className="text-center td-gray" key={index}>
                                                            {i.total_not_include_admin_arrange!=null?(i.total_not_include_admin_arrange) : ""}
                                                        </td>
                                                    )
                                                  })
                                                }
                                            </tr>
                                            <tr>
                                                <td className="text-left col-color-blue"
                                                    style={{
                                                        borderRight: "none",
                                                        borderLeft:
                                                            "3px solid #858BC3",
                                                    }}
                                                ></td>
                                                <td className="text-left col-color-blue" id="tblAdvanceMoney">
                                                    {t("Advance Money")}<span className="required"></span>
                                                    <br />
                                                    {(() => {
                                                        switch (advanceFlag) {
                                                            case 2: return mainTable.advance_additional + t("% Additional for target items");
                                                            case 3: return t("Specified Amount");
                                                            default : return;
                                                        }
                                                    })()}
                                                </td>
                                                {totalAdvance.map((i,index)=>{
                                                    return(
                                                        <Fragment key={index}>
                                                            <td className="text-center td-gray">
                                                                {i.advance_amount != null ? (i.advance_amount) :""}
                                                            </td>
                                                        </Fragment>
                                                    )
                                                  })
                                                }
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CCol>
                        </CRow>
                    </CCard>
                </>
            )}
        </>
    );
};
export default BusinessTripDetailTable;
