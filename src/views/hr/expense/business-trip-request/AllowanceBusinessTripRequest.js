import React, { useEffect,useState } from "react";
import { CCol, CRow, CButton, CSelect, CTextarea } from "@coreui/react";
import { useTranslation } from "react-i18next";
import { TextField } from "@material-ui/core";
import AllowanceBusinessTripRequestTable from "./AllowanceBusinessTripRequestTable";
import {validateIntegerOnly,checkNullOrBlank} from "../../../hr/hr-common/common-validation/CommonValidation";

const AllowanceBusinessTripRequest = (props) => {
    const { t } = useTranslation();
    // create user ref
    useEffect(() => {});
    let {
        setError,
        setSuccess,
        businessTripList,
        setBusinessTripList,
        allowanceList,
        daysTimes,
        setDaysTimes,
        currencyList,
        total,
        setTotal,
        tripPeriodFromDate,
        tripPeriodToDate,
        setBusinessTripListFile,
        businessTripListFile,
        storeEditData,
        setDeletedAttachDetailId,
        deletedAttachDetailId,
        deletedBusinessTripDetailId,
        setDeletedBusinessTripDetailId,
    } = props;
    // create usestate
    const [unitPriceCurrency, setUnitPriceCurrency]                                     = useState("");
    const [unitPriceCurrencyId, setUnitPriceCurrencyId]                                 = useState("");
    const [description, setDescription]                                                 = useState("");
    const [unitPrice, setUnitPrice]                                                     = useState("");
    const [mutilFileUpload, setMutilFileUpload]                                         = useState([]);
    const [allowanceName,setAllowanceName]                                              = useState("")
    const [allowanceId, setAllowanceId]                                                 = useState(0);
    const [index, setIndex]                                                             = useState(0);
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
      //count day between two day
  const daysBetween=(dateStart, dateEnd)=>{
    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = new Date(dateStart) - new Date(dateEnd);
    // Convert back to days and return
    return Math.round(differenceMs / ONE_DAY);
  }
    //calculation total for table
    const calculationTotal=()=>{
        //calculation total row in table
        let sum=loadDefaultCurrency();
        sum.map(e=>{
            businessTripList.map(i=>{
                if(e.id==i.accept_currency_id){
                    let number=parseFloat(e.currency_amount)+parseFloat(i.fx_rate!=""?i.unit_price*i.fx_rate*i.day_times:i.unit_price*i.day_times);
                    e.currency_amount=Math.round(number*100)/100;
                }
            });
        })
        setTotal(sum);
    }
    // add click
    const clickADD=(e)=>{
        if(currencyList.length>0){
            let arrMsg = [];
            //validation Unit price not null
            if (allowanceId==0) {
                let errMsg = t("JSE126").replace("%s", t("Allowance"));
                arrMsg.push(errMsg);
            }
            //validation days/times not null
            if (!checkNullOrBlank(daysTimes)) {
                let errMsg = t("JSE124").replace("%s", t("Days/Times Daily Allowance"));
                arrMsg.push(errMsg);
            }
            //validation days/times > 0
            if(parseInt(daysTimes)===0)
            {
                let errMsg = t("JSE10043").replace("%s", t("daysTimes Daily Allowance"));
                arrMsg.push(errMsg);
            }
            //validation sub allowance not exist
            if(businessTripList.filter(e=>e.sub_allowance_id==allowanceId).length>0)
            {
                let errMsg = t("JSE006").replace("%s", t("Allowance"));
                arrMsg.push(errMsg);
            }
            if (arrMsg.length > 0) {
                setError(arrMsg);
                setSuccess([]);
                window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            } else {
                //set sub total mmk and usd
                let businessTripListValue=[...businessTripList];
                let mutilFileListUploadValue=[...businessTripListFile];
                if(storeEditData==""){
                    for(let i=0;i<daysTimes;i++){
                        let businessTripValue={
                            "indexValue":index,
                            "title":allowanceName,
                            "sub_allowance_id":allowanceId,
                            "unit_price":unitPrice,
                            "unit_price_currency_id":unitPriceCurrencyId,
                            "unit_price_curency":unitPriceCurrency,
                            "accept_currency_id":unitPriceCurrencyId,
                            "accept_currency":unitPriceCurrency,
                            "day_times":1,
                            "description":description.trim(),
                            "fx_rate":1,
                        }
                        let mutilFileUploadValue=mutilFileUpload;
                        businessTripListValue=[...businessTripListValue,businessTripValue];
                        mutilFileListUploadValue=[...mutilFileListUploadValue,mutilFileUploadValue];
                    }
                    setIndex(index+1);
                    setBusinessTripListFile([...mutilFileListUploadValue]);
                    setBusinessTripList([...businessTripListValue]);
                }else{
                    for(let i=0;i<daysTimes;i++){
                        let businessTripValue={
                            "is_new":1,
                            "indexValue":index,
                            "title":allowanceName,
                            "sub_allowance_id":allowanceId,
                            "unit_price":unitPrice,
                            "unit_price_currency_id":unitPriceCurrencyId,
                            "unit_price_curency":unitPriceCurrency,
                            "accept_currency_id":unitPriceCurrencyId,
                            "accept_currency":unitPriceCurrency,
                            "day_times":1,
                            "description":description.trim(),
                            "fx_rate":1,
                        }
                        let mutilFileUploadValue=mutilFileUpload;
                        businessTripListValue=[...businessTripListValue,businessTripValue];
                        mutilFileListUploadValue=[...mutilFileListUploadValue,mutilFileUploadValue];
                    }
                    setIndex(index+1);
                    setBusinessTripListFile([...mutilFileListUploadValue]);
                    setBusinessTripList([...businessTripListValue]);
                }
                // set default value
                setUnitPrice("");
                setUnitPriceCurrency("");
                setUnitPriceCurrencyId("");
                setDaysTimes(daysBetween(tripPeriodToDate,tripPeriodFromDate)+1<=0?"":daysBetween(tripPeriodToDate,tripPeriodFromDate)+1);
                setDescription("");
                setMutilFileUpload([]);
                setAllowanceId(0);
            }
        }
    }
    //change Allowance
    const changeAllowance=(e)=>{
        let allowanceValue=allowanceList.find(i=>i.id==e.target.value);
        if(allowanceValue==null){
            setUnitPrice("");
            setUnitPriceCurrency("");
            setUnitPriceCurrencyId(1);
            setAllowanceName("");
            setAllowanceId(0);
        }else{
            setAllowanceId(e.target.value);
            setAllowanceName(allowanceList.find(i=>i.id==e.target.value).others_allowance);
            setUnitPrice(allowanceValue.allowance_amount);
            let currencyValue=currencyList.find(i=>i.id==allowanceValue.currency_id);
            setUnitPriceCurrency(currencyValue.currency_name);
            setUnitPriceCurrencyId(currencyValue.id);
        }

    }
    //change description
    const changeDescription =(e)=>{
        if(e.target.value.length<65535)
            setDescription(e.target.value);
    }
    // change Days/Times
    const changeDaysTimes=(e)=>{
        let daystimeValue=e.target.value;
        if((validateIntegerOnly(daystimeValue)||daystimeValue=="")&&daystimeValue.length<=8)
            setDaysTimes(daystimeValue);
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
    //click delete file in businesslist
    const deleteFileBusinessList=(e,index,indexFile)=>{
        if(storeEditData!=""&&businessTripListFile[index][indexFile].id!=null)
        {
            //get id file delete
            let IdFileDelete=[];
            if(businessTripListFile[index].length>0){
                businessTripList.map((e,indexFileValue)=>{
                    if(businessTripList[index].indexValue==e.indexValue){
                        IdFileDelete.push(businessTripListFile[indexFileValue][indexFile].id);
                    }
                })
            }
            setDeletedAttachDetailId([...deletedAttachDetailId,...IdFileDelete]);
        }
        // let businessTripFileValue=businessTripListFile[index].filter(e=>e!=businessTripListFile[index][indexFile]);
        let businessTripListFileValue=businessTripListFile;
        // businessTripListFileValue[index]=businessTripFileValue;
        businessTripList.map((e,indexFileValue)=>{
            if(businessTripList[index].indexValue==e.indexValue){
                let fileValue=businessTripListFileValue[indexFileValue];
                businessTripListFileValue[indexFileValue]=fileValue.filter(e=>e!=fileValue[indexFile]);
            }
        })
        setBusinessTripListFile([...businessTripListFileValue]);
    }
    //delete data in table business trip
    const deleteRow=(i,index)=>{
        if(storeEditData!=""&&i.id!=null)
        {
            //get id row delete
            let idDeleteRow=i.id;
            setDeletedBusinessTripDetailId([...deletedBusinessTripDetailId,idDeleteRow]);
            //get id file delete
            let businessTripListFileValue=businessTripListFile;
            if(businessTripListFileValue[index].length>0){
                let listIdFileDelete=[];
                businessTripListFileValue[index].map(itemFile=>{
                    listIdFileDelete.push(itemFile.id);
                });
                setDeletedAttachDetailId([...deletedAttachDetailId,...listIdFileDelete]);
            }
        }
        setBusinessTripList(businessTripList.filter(item=>item!=i));
        let businessTripListFileValue=businessTripListFile;
        let businessTripListFileValueTemplate=[];
        businessTripListFileValue.map((e,indexValue)=>{
            if(indexValue!=index){
                businessTripListFileValueTemplate.push(e);
            }
        })
        setBusinessTripListFile([...businessTripListFileValueTemplate]);
    }
    return (
        <>
            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <label id="lblAllowance" className="required">{t("Allowance Name")}</label>
                    <CSelect
                        className="bamawl-select"
                        id="dropAllowance"
                        value={allowanceId} name="unit"
                        onChange={changeAllowance}
                        custom
                    >
                         <option key="" value="">---{t('Select Allowance')}---</option>
                        {
                            allowanceList.map((allowance, index) => {
                                return (
                                    <option key={index} name={allowance.others_allowance} value={allowance.id}>
                                        {allowance.others_allowance}
                                    </option>
                                )
                            })}
                    </CSelect>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <label id="lblUnitPriceAllowance" className="required label-disable">{t("Unit Price")}</label>
                    <div className="d-flex justify-content-around">
                        <TextField fullWidth id="txtUnitPriceAllowance" disabled value={unitPrice} className="mr-1 bamawl-select"></TextField>
                        <div className="border-right"></div>
                        <TextField fullWidth id="txtUnitPriceCurencyAllowance" className="currency bamawl-select" disabled value={unitPriceCurrency}></TextField>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mb-4 expense-request-input-card-detail" >
                <CCol lg="5">
                <label id="lblDaysTimesAllowance" className="required">{t("Day/Times")}</label>
                    <TextField fullWidth
                        className="mb-1 txtDayTime gray-background bamawl-select"
                        value={daysTimes}
                        onChange={changeDaysTimes}
                        placeholder={t("Enter Day/Times")}
                    />
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                <label id="lblTotalAllowance" className="label-disable">{t("Total")}</label>
                    <TextField fullWidth className="mb-1 txtTotal bamawl-select" value={unitPrice!=""&&daysTimes!=""?Math.round(unitPrice*daysTimes*100)/100:unitPrice} disabled />
                </CCol>
            </CRow>

            <CRow lg="12" className="mb-4">
                <CCol lg="5">
                    <label id="lblDescriptionAllowance">{t("Description")}</label>
                    <CTextarea className="text-area-business-trip" value={description} onChange={changeDescription} id="txtDescriptionAllowance" placeholder={t("Enter Description")}></CTextarea>
                </CCol>
                <CCol lg="1" className="verticle-line"/>
                <CCol lg="1"/>
                <CCol lg="5">
                    <div>
                        <label id="lblAttachementAllowance" style={{marginRight:"5px"}}>{t("Attachment")}</label><br/>
                        <i className="fas fa-paperclip"></i>
                        <label className="expense-request-attachment-file-label">{t('Drag & Drop files to attach or')}</label>
                        &nbsp;
                        <a id="linkBrowseCardDetailCardDetailAllowance" className="expense-request-attachment-file-browser" tabIndex={0}>
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
                    <div style={{ marginLeft: "5px" }}>
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
                                    <span style={{ marginLeft: "5px" }}className="text-break">{fileName}</span>
                                    <i className="fas fa-times" onClick={deleteFile.bind(this, file)}></i>
                                </div>
                                );
                            })}
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="justify-content-center mb-1 mt-4">
                <CButton className="form-btn mr-0" id="btnAddAllowance" onClick={clickADD}>
                        {t("Add")}
                </CButton>
            </CRow>
            <AllowanceBusinessTripRequestTable
                businessTripList={businessTripList}
                total={total}
                deleteFileBusinessList={deleteFileBusinessList}
                deleteRow={deleteRow}
                businessTripListFile={businessTripListFile}
            ></AllowanceBusinessTripRequestTable>
        </>
    );
};
export default AllowanceBusinessTripRequest;
