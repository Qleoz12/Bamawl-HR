import React, { useEffect,useState } from "react";
import { CCol, CRow, CButton, CSelect, CTextarea, CLabel } from "@coreui/react";
import { TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import CategoryBusinessTripRequestTable from "./CategoryBusinessTripRequestTable";
import {validateIntegerOnly,checkNullOrBlank} from "../../../hr/hr-common/common-validation/CommonValidation";

const CategoryBusinessTripRequest = (props) => {
    const { t } = useTranslation();
    let {
        currencyList,
        setError,
        setSuccess,
        businessTripList,
        setBusinessTripList,
        setTotal,
        total,
        setCategolyTotalNotAdmin,
        setBusinessTripListFile,
        businessTripListFile,
        storeEditData,
        setDeletedAttachDetailId,
        deletedAttachDetailId,
        deletedBusinessTripDetailId,
        setDeletedBusinessTripDetailId,
        titleName,
        nameCategory
    } = props;
    // create usestate
    const [unitPriceCurrency, setUnitPriceCurrency]                                     = useState("");
    const [acceptCurrency, setAcceptCurrency]                                           = useState("");
    const [unitPriceCurrencyId, setUnitPriceCurrencyId]                                 = useState(1);
    const [acceptCurrencyId, setAcceptCurrencyId]                                       = useState(1);
    const [fxRate, setFxRate]                                                           = useState("");
    const [description, setDescription]                                                 = useState("");
    const [arrangeByAdmin, setArrangeByAdmin]                                           = useState(0);
    const [daysTimes, setDaysTimes]                                                     = useState("");
    const [unitPrice, setUnitPrice]                                                     = useState("");
    const [title, setTitle]                                                             = useState("");
    const [mutilFileUpload, setMutilFileUpload]                                         = useState([]);
    useEffect(()=>{
        calculationTotal();
    },[businessTripList]);
      //set default total
    const loadDefaultCurrency=()=>{
        let currencyData=[];
        currencyList.map(i=>{
            if(i.expense_flag==1){
                let itemCurrency={
                "id":i.id,
                "currency_name":i.currency_name,
                "currency_amount":0
                }
                currencyData.push(itemCurrency);
            }
            })
        //calculation total row in table
        return currencyData;
    }
    //calculation total for table
    const calculationTotal=()=>{
        //calculation total row in table
        let sum=loadDefaultCurrency();
        sum.map(e=>{
            businessTripList.map(i=>{
                if(e.id==i.accept_currency_id){
                    let number=parseFloat(e.currency_amount)+parseFloat(i.fx_rate!=""?i.unit_price*i.fx_rate*i.day_times:i.unit_price*i.day_times)
                    e.currency_amount=Math.round(number*100)/100;
                }

            });
        })
        setTotal(sum);
        //calculation total row in table not arrange by admin
        let sumNotAdmin=loadDefaultCurrency();
        sumNotAdmin.map(e=>{
            businessTripList.map(i=>{
                if(i.arrange_by_admin==0&&e.id==i.accept_currency_id){
                    let number=parseFloat(e.currency_amount)+parseFloat(i.fx_rate!=""?i.unit_price*i.fx_rate*i.day_times:i.unit_price*i.day_times);
                    e.currency_amount=Math.round(number*100)/100;

                }
            });
        })
        setCategolyTotalNotAdmin(sumNotAdmin);
    }
    //change unit price curency
    const changeUnitPriceCurrency =(e)=>{
        setUnitPriceCurrencyId(e.target.value);
        setUnitPriceCurrency(currencyList.find(i=>i.id==e.target.value).currency_name);
        if(e.target.value==acceptCurrencyId)
            setFxRate("");
    }
    // change title
    const changeTitle=(e)=>{
        if(e.target.value.length<65535)
            setTitle(e.target.value);
    }
    // add click
    const clickADD=(e)=>{
        if(currencyList.length>0){
            if(acceptCurrency=="")
            setAcceptCurrency(currencyList[0].currency_name);
        if(unitPriceCurrency=="")
            setUnitPriceCurrency(currencyList[0].currency_name);
        let arrMsg = [];
        //remove "." last in unit price
        if(unitPrice.substr(unitPrice.length-1)==".")
            setUnitPrice(unitPrice.substring(0,unitPrice.length-1))
        //remove "." last in fx rate
        if(fxRate.substr(fxRate.length-1)==".")
            setUnitPrice(fxRate.substring(0,fxRate.length-1))
        //validation title not null
        if (!checkNullOrBlank(title.trim())) {
            let errMsg = t("JSE124").replace("%s", t(`Title ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation Unit price not null
        if (!checkNullOrBlank(unitPrice)) {
            let errMsg = t("JSE124").replace("%s", t(`Unit Price ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation fx rate
        if(acceptCurrencyId!="" && unitPriceCurrencyId!="" && acceptCurrencyId!=unitPriceCurrencyId){
            //not null
            if (!checkNullOrBlank(fxRate)) {
                let errMsg = t("JSE124").replace("%s", t(`Fx Rate ${titleName}`));
                arrMsg.push(errMsg);
            }
            //must >0
            if(parseFloat(fxRate)===0)
            {
                let errMsg = t("JSE10043").replace("%s", t(`Fx Rate ${titleName}`));
                arrMsg.push(errMsg);
            }
        }
        //validation Unit price > 0
        if(parseFloat(unitPrice)===0)
        {
            let errMsg = t("JSE10043").replace("%s", t(`Unit Price ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation Day/Times not null
        if (!checkNullOrBlank(daysTimes)) {
            let errMsg = t("JSE124").replace("%s", t(`Day/Times ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation Day/Times > 0
        if(parseInt(daysTimes)===0)
        {
            let errMsg = t("JSE10043").replace("%s", t(`day/Times ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation accept currency
        if (!checkNullOrBlank(acceptCurrencyId)) {
            let errMsg = t("JSE001").replace("%s", t(`Accept Currency ${titleName}`));
            arrMsg.push(errMsg);
        }
        //validation Unit Price currency
        if (!checkNullOrBlank(unitPriceCurrencyId)) {
            let errMsg = t("JSE001").replace("%s", t(`Unit Price Currency ${titleName}`));
            arrMsg.push(errMsg);
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
            setSuccess([]);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            setError([]);
            let businessTripValue={};
            if(storeEditData==""){
                businessTripValue={
                    "title":title.trim(),
                    "unit_price":unitPrice.substr(unitPrice.length-1)=="."?unitPrice.substring(0,unitPrice.length-1):unitPrice,
                    "unit_price_currency_id":unitPriceCurrencyId,
                    "unit_price_curency":unitPriceCurrency==""?currencyList[0].currency_name:unitPriceCurrency,
                    "day_times":parseInt(daysTimes),
                    "fx_rate":fxRate!=""?fxRate.substr(fxRate.length-1)=="."?fxRate.substring(0,fxRate.length-1):fxRate:1,
                    "accept_currency_id":acceptCurrencyId,
                    "accept_currency":acceptCurrency==""?currencyList[0].currency_name:acceptCurrency,
                    "arrange_by_admin":arrangeByAdmin,
                    "description":description,
                }
            }else{
                businessTripValue={
                    "is_new":1,
                    "title":title.trim(),
                    "unit_price":unitPrice.substr(unitPrice.length-1)=="."?unitPrice.substring(0,unitPrice.length-1):unitPrice,
                    "unit_price_currency_id":unitPriceCurrencyId,
                    "unit_price_curency":unitPriceCurrency==""?currencyList[0].currency_name:unitPriceCurrency,
                    "day_times":parseInt(daysTimes),
                    "fx_rate":fxRate!=""?fxRate.substr(fxRate.length-1)=="."?fxRate.substring(0,fxRate.length-1):fxRate:1,
                    "accept_currency_id":acceptCurrencyId,
                    "accept_currency":acceptCurrency==""?currencyList[0].currency_name:acceptCurrency,
                    "arrange_by_admin":arrangeByAdmin,
                    "description":description,
                }
            }
            setBusinessTripListFile([...businessTripListFile,mutilFileUpload]);
            setBusinessTripList([...businessTripList,businessTripValue]);
            // set default value
            setTitle("");
            setUnitPrice("");
            setUnitPriceCurrency("");
            setUnitPriceCurrencyId(1);
            setDaysTimes("");
            if(acceptCurrencyId!="" && unitPriceCurrencyId!="" && acceptCurrencyId!=unitPriceCurrencyId)
                setFxRate("");
            setAcceptCurrency("");
            setAcceptCurrencyId(1);
            setArrangeByAdmin(0);
            setDescription("");
            setMutilFileUpload([]);
        }
        }
    }
    //change accept amount curency
    const changeacceptCurrency =(e)=>{
        setAcceptCurrencyId(e.target.value);
        setAcceptCurrency(currencyList.find(i=>i.id==e.target.value).currency_name);
        if(e.target.value==unitPriceCurrencyId)
        setFxRate("");
    }
    //change fx rate
    const changeFxRate =(e)=>{
        let fxRateValue=e.target.value;
        if(isDecimalPriceFxrate(fxRateValue))
            setFxRate(fxRateValue);
    }
    //change description
    const changeDescription =(e)=>{
        if(e.target.value.length<65535)
            setDescription(e.target.value);
    }
    //change fx rate
    const changeArrangeByAdmin =(e)=>{
        setArrangeByAdmin(arrangeByAdmin==0?1:0);
    }
    // change Day/Times
    const changeDaysTimes=(e)=>{
        let daystimeValue=e.target.value;
        if((validateIntegerOnly(daystimeValue)||daystimeValue=="")&&daystimeValue.length<=8)
            setDaysTimes(daystimeValue);
    }
    // change Unit price
    const changeUnitPrice=(e)=>{
        let unitPriceValue=e.target.value;
        if(isDecimalPrice(unitPriceValue))
            setUnitPrice(unitPriceValue);
    }
    //check decimal for fx rate
    const isDecimalPriceFxrate=(value)=>{
        var decimalOnly = /^[]*?(\d{0,6})(\.\d{0,6})?$/;
        if(decimalOnly.test(value)&&value.substring(0,1)!=".") {
            return true;
        }
        return false;
    }
    //check decimal for unit price
    const isDecimalPrice=(value)=>{
        var decimalOnly = /^[]*?(\d{0,8})(\.\d{0,2})?$/;
        if(decimalOnly.test(value)&&value.substring(0,1)!=".") {
            return true;
        }
        return false;
    }
    //upload file
    const handlerUploadFile=(e)=>{
        setError([]);
        setSuccess([]);
        let arrMsg = [];
        let mutilFile=[]
        for(let file of e.target.files)
        {
            if(validateUploadFile(file)==true)
            {
                mutilFile.push(file);
            }else
                arrMsg.push(validateUploadFile(file));
        }
        if(mutilFile.length>0)
        setMutilFileUpload([...mutilFileUpload,...mutilFile]);
        if(arrMsg.length>0)
        {
            setError(arrMsg);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    // delete File from list
    const deleteFile=(e)=>{
        let mutilFile=mutilFileUpload.filter(file=>file!=e);
        setMutilFileUpload(mutilFile);
    }
    const validateUploadFile=(file)=>{
        const regex = /.*\.(jpg|jpe?g|png|pdf)$/igm;
        if (!regex.test(file.name)) {
            let errMsg = t("JSE159").replace("%s", t("*.pdf, *.jpg, *.jpeg, *.png."));
            return errMsg;
        }
        if(parseInt(file.size)>10485760)
        {
            let errMsg = t("JSE111");
            return errMsg;
        }
        return true;
    }
    //check decimal
    const isDecimal=(value)=>{
        var decimalOnly = /^[]*?(\d{0,12})(\.\d{0,6})?$/;
        if(decimalOnly.test(value)&&value.substring(0,1)!=".") {
            return true;
        }
        return false;
    }
    //click delete file in businesslist
    const deleteFileBusinessList=(e,index,indexFile)=>{
        if(storeEditData!=""&&businessTripListFile[index][indexFile].id!=null)
        {
            //get id file delete
            let IdFileDelete=businessTripListFile[index][indexFile].id;
            setDeletedAttachDetailId([...deletedAttachDetailId,IdFileDelete]);
        }
        let businessTripFileValue=businessTripListFile[index].filter(e=>e!=businessTripListFile[index][indexFile]);
        let businessTripListFileValue=businessTripListFile;
        businessTripListFileValue[index]=businessTripFileValue;
        setBusinessTripListFile([...businessTripListFileValue]);
    }
    //delete data in table business trip
    const deleteRow=(e,index)=>{
        if(storeEditData!=""&&e.id!=null)
        {
            //get id row delete
            let idDeleteRow=e.id;
            setDeletedBusinessTripDetailId([...deletedBusinessTripDetailId,idDeleteRow]);
            //get id file delete
            if(businessTripListFile[index].length>0){
                let listIdFileDelete=[];
                businessTripListFile[index].map(itemFile=>{
                    listIdFileDelete.push(itemFile.id);
                });
                setDeletedAttachDetailId([...deletedAttachDetailId,listIdFileDelete]);
            }
        }
        setBusinessTripList(businessTripList.filter(item=>item!=e));
        setBusinessTripListFile(businessTripListFile.filter(item=>item!=businessTripListFile[index]));

    }
    return (
        <>
            <CRow lg="12" className="mb-4">
                <CCol lg="5" className="expense-request-input-card-detail">
                    <CLabel id={`lblTitle${nameCategory}`} className="required">{t("Title")}</CLabel>
                    <TextField fullWidth onChange={changeTitle} value={title} placeholder={t("Enter Title")} id={`txtTitle${nameCategory}`} className="bamawl-select gray-background" ></TextField>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5" className="expense-request-input-card-detail">
                <CLabel id={`lblUnitPrice${nameCategory}`} className="required">{t("Unit Price")}</CLabel>
                    <div className="d-flex justify-content-around">
                        <TextField fullWidth onChange={changeUnitPrice} className="mr-1 bamawl-select gray-background" value={unitPrice} placeholder={t("Enter Unit Price")} id={`txtUnitPrice${nameCategory}`}></TextField>
                        <div className="border-right"></div>
                        <CSelect
                            className="dropCurrency currency bamawl-select"
                            id={`dropCurrency${nameCategory}`}
                            value={unitPriceCurrencyId} name="unit"
                            onChange={changeUnitPriceCurrency}
                            custom
                        >
                            {
                                currencyList.map((currency, index) => {
                                    return (
                                        <option key={index} title={currency.currency_name} value={currency.id}>
                                            {currency.currency_name}
                                        </option>
                                    )
                                })}
                        </CSelect>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4 expense-request-input-card-detail" >
                <CCol lg="5">
                    <CLabel id={`lblDaysTimes${nameCategory}`} className="required">{t("Day/Times")}</CLabel>
                    <TextField fullWidth onChange={changeDaysTimes} id={`txtDayTime${nameCategory}`} value={daysTimes} placeholder={t("Enter Day/Times")} className="bamawl-select gray-background"></TextField>
                </CCol>

                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id={`lblTotal${nameCategory}`} className="label-disable">{t("Total")}</CLabel>
                    <TextField fullWidth id={`txtTotal${nameCategory}`} value={unitPrice!=""&&daysTimes!=""?Math.round(unitPrice*daysTimes*100)/100:unitPrice} disabled className="bamawl-select"></TextField>
                </CCol>
            </CRow>
            <CRow lg="12"className="mb-4">
                <CCol lg="5">
                    <CRow lg="12" className="align-items-end">
                        <CCol lg="5">
                            <CLabel id={`lblAcceptCurrency${nameCategory}`} className="required">{t("Accept Currency")}</CLabel>
                            <CSelect
                                className="dropAccepCurency mr-1 bamawl-select"
                                id={`dropAccepCurency${nameCategory}`}
                                value={acceptCurrencyId}
                                onChange={changeacceptCurrency}
                                custom
                            >
                                {
                                    currencyList.map((currency, index) => {
                                        if(currency.expense_flag==1)
                                        return (
                                            <option key={index} title={currency.currency_name} value={currency.id}>
                                                {currency.currency_name}
                                            </option>
                                        )
                                    })}
                            </CSelect>
                        </CCol>
                        {
                        acceptCurrencyId!=""&&unitPriceCurrencyId!=""&&acceptCurrencyId!=unitPriceCurrencyId&&(
                        <>
                            <CCol lg="4">
                                <TextField fullWidth id={`txtFxRate${nameCategory}`} onChange={changeFxRate} value={fxRate} placeholder={t('Enter fx rate')} className="bamawl-select gray-background"></TextField>
                            </CCol>
                            <CCol lg="3">
                                <CLabel id={`lblFXRate${nameCategory}`} className="required expense-request-label text-nowrap fx-rate">
                                    {t('FX Rate')}
                                </CLabel>
                            </CCol>
                        </>
                        )}
                    </CRow>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <CLabel id={`lblAcceptAmount${nameCategory}`} className="label-disable">{t("Accept Amount")}</CLabel>
                    <TextField fullWidth className="bamawl-select" id={`txtAccepAmount${nameCategory}`} value={unitPrice!=""&&fxRate!=""?Math.round(unitPrice*daysTimes*fxRate*100)/100:unitPrice*daysTimes==0?"":Math.round(unitPrice*daysTimes*100)/100} disabled></TextField>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <div className="d-flex justify-content-between">
                        <CLabel id={`lblDescription${nameCategory}`}>{t("Description")}</CLabel>
                        <div>
                            <input type="checkbox" checked={arrangeByAdmin} id={`checkbox${nameCategory}`} onChange={changeArrangeByAdmin} style={{ marginRight: "5px", marginBottom: "5px" }} />
                            <span style={{ marginBottom: "0px" }} id={`lblArrangeByAdmin${nameCategory}`}>
                                {t("Arrange by Admin")}
                            </span>
                        </div>
                    </div>
                    <CTextarea className="text-area-business-trip" id={`txtDescription${nameCategory}`} value={description} onChange={changeDescription} placeholder={t("Enter Description")}></CTextarea>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <div>
                        <CLabel id={`lblAttachement${nameCategory}`} className="mr-3">{t("Attachment")}</CLabel><br/>
                        <i className="fas fa-paperclip"></i>
                        <CLabel className="expense-request-attachment-file-label">{t('Drag & Drop files to attach or')}</CLabel>
                        &nbsp;
                        <a id="linkBrowseCardDetailCardDetail" className="expense-request-attachment-file-browser" tabIndex={0}>
                            {t('Browse')}
                        </a>
                        <input
                            value=""
                            type="file"
                            htmlFor="linkBrowseCardDetailCardDetail"
                            style={{ opacity: "0", position: "absolute", left: "12px", zindex: "9999999", width: '90%' }}
                            multiple accept=".pdf,.jpg,.jpeg,.png,.PDF,.JPG,.JPEG,.PNG"
                            onChange={(e) => handlerUploadFile(e)} />
                    </div>
                    <div className="ml-2">
                        {mutilFileUpload.length>0&&
                            mutilFileUpload.map((file, index) => {
                                let fileName= file.name.split('/')[file.name.split('/').length-1];
                                if (fileName.length > 21) {
                                    fileName = fileName.substring(0, 9).concat("...")
                                        .concat(fileName.substring(fileName.length - 10, fileName.length));
                                }
                                return (
                                <div key={index} className="d-flex flex-nowrap align-items-center">
                                    <i className="fas fa-file icon-btn file"></i>
                                    <span className="text-break ml-2">{fileName}</span>
                                    <i className="fas fa-times" onClick={deleteFile.bind(this, file)}></i>
                                </div>
                                );
                            })}
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="justify-content-center mb-1 mt-4">
                <CButton className="form-btn mr-0" id={`btnAdd${nameCategory}`} onClick={clickADD}>
                        {t("Add")}
                </CButton>
            </CRow>
            <CategoryBusinessTripRequestTable
                businessTripList={businessTripList}
                total={total}
                deleteFileBusinessList={deleteFileBusinessList}
                deleteRow={deleteRow}
                businessTripListFile={businessTripListFile}
            ></CategoryBusinessTripRequestTable>
        </>
    );
};
export default CategoryBusinessTripRequest;
