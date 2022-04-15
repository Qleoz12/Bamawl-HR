/**
* Expense Ajustment Detail
*
* @author  lq_don
* @create  13/07/2021 (D/M/Y)
* @param
* @return
*/
import React ,{ useState, useEffect, useCallback,useRef} from 'react';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';
import Loading from '../../../brycen-common/loading/Loading';
import { CCard, CCardBody, CCardHeader, CCol, CRow,CButton} from '@coreui/react';
import { withTranslation } from 'react-i18next';
import { checkMaxLength, isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation'; // Common validation function
import CommonExpenseAjustmentDetail from './CommonExpenseAjustmentDetail';
import ExpenseAjustmentDetailTable from './ExpenseAjustmentDetailTable';
import OtherAttachementExpenseAjustmentDetail from './OtherAttachementExpenseAjustmentDetail';
import AdjustmentBudgetExpenseAjustmentDetail from './AdjustmentBudgetExpenseAjustmentDetail';
import ButtonPreviousExpenseAjustmentDetail from './ButtonPreviousExpenseAjustmentDetail';
import ApproverTable from './ApproverTable';
import ButtonExpenseAjustment from './ButtonExpenseAjustment';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Confirmation  from '../../../brycen-common/confirmation/Confirmation';
// import RejectModal from '../../hr-common/reject-modal/RejectModal';
import ModalReject from '../../hr-common/modal-reject/ModalReject';
import { useHistory } from "react-router-dom";
function LegacyWelcomeClass({ t}) {
    const history                                                                   = useHistory(); // For edit link
    //create useState hook
    const [error, setError]                                                         = useState([]); // for error message
    const [success, setSuccess]                                                     = useState(""); // for success message
    const [loading, setLoading]                                                     = useState(false);// for page load before call api
    const [currencyList,setCurrencyList]                                            = useState([]);//for get list currency
    const [expenseAjustmentDetailInfo,setExpenseAjustmentDetailInfo]                = useState([]);//for expense ajust ment detail
    const [confirmModalBox, setConfirmModalBox]                                     = useState(false); //for show hide model confirm
    const [content, setContent]                                                     = useState('');//for content mdel box
    const [type, setType]                                                           = useState('');//for type model box
    const [rejectError, setRejectError]                                             = useState([]);//for reject error
    const [open, setOpen]                                                           = useState(false);//for model reject
    const [reason, setReason]                                                       = useState('');//for add reason
    const [approverList,setApproverList]                                            = useState([]);//for approver list
    const [expenseOtherAttachementFile,setExpenseOtherAttachementFile]              = useState([]);//for Expense Other Attachement
    const [expenseItemList,setExpenseItemList]                                      = useState([]);//for Expense item list
    const [adjustmentBudget,setAdjustmentBudget]                                    = useState([]);// for ajustment budget
    const [advanceAdditional,setAdvanceAdditional]                                  = useState("");//for advance additional
    const [advanceFlag,setAdvanceFlag]                                              = useState(1);//for advance flag
    const [expenseID,setExpenseID]                                                  = useState("")//for set expense id
    const [historyFlag,setHistoryFlag]                                              = useState(true)//for set history flag
    const [confirmFlag,setConfirmFlag]                                              = useState(false);//for set confirm flag
    const [dashBoardFlag,setDashBoardFlag]                                          = useState(false);//for set dashboard

/**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
       useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);
    /**
    * Page Load
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
      document.body.style.overflow = "auto";
      let detailID = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS")); // return data from expense list
      let detailIDHistory= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY"));
      let detailIDDashboard= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD"));
      if (!detailID &&!detailIDHistory&&!detailIDDashboard) {
        history.push('./expense-list')
      }
      else{
        loadCurrency();
        if(detailIDDashboard){
          setDashBoardFlag(true);
          setExpenseID(detailIDDashboard);
          loadExpenAjustmentDetail(detailIDDashboard,true);
        }else{
          if(detailID){
            setExpenseID(detailID);
            loadExpenAjustmentDetail(detailID,false);
        }else{
            setExpenseID(detailIDHistory);
            loadExpenAjustmentDetailHistory(detailIDHistory,false);
            setHistoryFlag(false);
        }
        }
    }
    }, []);
        /**
    * load ExpenAjustment Detail
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
         const loadExpenAjustmentDetailHistory= async(detailID,flagDashboard)=>{
        setLoading(true);
          let params={
              "expense_adjustment_history_id": detailID,
              "company_id": ApiPath.companyID,
              "login_id": ApiPath.loginEmp
          }
          let obj = { package_name: 'hr', url: ApiPath.ExpenseAjustmentDetailHistory, method: 'post',params };
          let response = await ApiRequest(obj);
          if(response.flag === false)
          {
            if(flagDashboard){
              sessionStorage.removeItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD");
              history.push("./dashboard");
            }else{
              sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS");
              sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY");
              history.push("./expense-list");
            }
          }
          else{
            let dataAjustment=response.data.data;
            let expenseAjustment={
              "demployee_ID":dataAjustment.employee_id,
              "employee_Code":dataAjustment.employee_code,
              "employee_Name":dataAjustment.employee_name,
              "department":dataAjustment.employee_has_dept_position.map(i=>i.departments.department_name),
              "position":dataAjustment.employee_has_dept_position.map(i=>i.positions.position_name),
              "expense_Department":dataAjustment.expense_department,
              "vender_Name":dataAjustment.vendor_name,
              "vender_Company":dataAjustment.vendor_company,
              "poNumber":dataAjustment.po_number,
              "exchange_Rate":parseFloat(dataAjustment.exchange_rate),
              "phone_Email":dataAjustment.email,
              "applied_Date":dataAjustment.applied_date,
              "due_Date":dataAjustment.due_date,
              "subject":dataAjustment.subject
          }
          let arrayExxpenseItemBudget=[];
          let arrayExxpenseItemActualCost=[];
          //sort data expense item
          dataAjustment.expense_item.map(e=>{
            if(e.budget_cost.length==null){
              arrayExxpenseItemBudget.push(e);
            }
            else
              if(e.actual_cost.length==null){
                arrayExxpenseItemActualCost.push(e);
              }
          })
          let arrayExxpenseItemBudgetSort=arrayExxpenseItemBudget.sort((a,b)=>(a.id-b.id));
          let arrayExxpenseItemActualCostSort=arrayExxpenseItemActualCost.sort((a,b)=>(a.id-b.id));
          setConfirmFlag(dataAjustment.can_confirm);
          setExpenseAjustmentDetailInfo(expenseAjustment);
          setExpenseItemList([...arrayExxpenseItemBudgetSort,...arrayExxpenseItemActualCostSort]);
          setAdjustmentBudget(dataAjustment.adjustment_budget);
          setApproverList(dataAjustment.approver);
          setExpenseOtherAttachementFile(dataAjustment.expense_adjustment_attach);
          setAdvanceAdditional(dataAjustment.advance_additional);
          setAdvanceFlag(dataAjustment.advance_flag);
          };
          setLoading(false);
          }
    /**
    * load ExpenAjustment Detail
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadExpenAjustmentDetail= async(detailID,flagDashboard)=>{
      setLoading(true);
      let params={
          "expense_id": detailID,
          "company_id": ApiPath.companyID,
          "login_id": ApiPath.loginEmp
      }
      let obj = { package_name: 'hr', url: ApiPath.ExpenseAjustmentDetail, method: 'post',params };
      let response = await ApiRequest(obj);
      if(response.flag === false)
      if(flagDashboard){
        sessionStorage.removeItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD");
        history.push("./dashboard");
      }else{
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS");
        sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY");
        history.push("./expense-list");
      }
      else{
        let dataAjustment=response.data.data;
        let expenseAjustment={
          "demployee_ID":dataAjustment.employee_id,
          "employee_Code":dataAjustment.emp_code,
          "employee_Name":dataAjustment.emp_name,
          "department":dataAjustment.employee_has_dept_position.map(i=>i.departments.department_name),
          "position":dataAjustment.employee_has_dept_position.map(i=>i.positions.position_name),
          "expense_Department":dataAjustment.expense_department,
          "vender_Name":dataAjustment.vendor_name,
          "vender_Company":dataAjustment.vendor_company,
          "poNumber":dataAjustment.po_number,
          "exchange_Rate":parseFloat(dataAjustment.exchange_rate),
          "phone_Email":dataAjustment.email,
          "applied_Date":dataAjustment.applied_date,
          "due_Date":dataAjustment.due_date,
          "subject":dataAjustment.subject
      }
      let arrayExxpenseItemBudget=[];
      let arrayExxpenseItemActualCost=[];
      //sort data expense item
      dataAjustment.expense_item.map(e=>{
        if(e.budget_cost.length==null){
          arrayExxpenseItemBudget.push(e);
        }
        else
          if(e.actual_cost.length==null){
            arrayExxpenseItemActualCost.push(e);
          }
      })
      let arrayExxpenseItemBudgetSort=arrayExxpenseItemBudget.sort((a,b)=>(a.id-b.id));
      let arrayExxpenseItemActualCostSort=arrayExxpenseItemActualCost.sort((a,b)=>(a.id-b.id));
      setConfirmFlag(dataAjustment.can_confirm);
      setExpenseAjustmentDetailInfo(expenseAjustment);
      setExpenseItemList([...arrayExxpenseItemBudgetSort,...arrayExxpenseItemActualCostSort]);
      setAdjustmentBudget(dataAjustment.adjustment_budget);
      setApproverList(dataAjustment.approver);
      setExpenseOtherAttachementFile(dataAjustment.expense_adjustment_attach);
      setAdvanceAdditional(dataAjustment.advance_additional);
      setAdvanceFlag(dataAjustment.advance_flag);
      };

      setLoading(false);
      }

    /**
    * Load currency list
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadCurrency = async () => {
      // setCurrencyList([{"id":1,"currency_name":"Kyat","expense_flag":1},{"id":2,"currency_name":"Dollar","expense_flag":1}])
      let url = `${ApiPath.businessTripRequestGetCurrency}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
      let obj = { package_name: 'hr', url: url, method: 'get' };
      let response = await ApiRequest(obj);
      if(response.flag === false){
      }else{
        setCurrencyList(response.data.data.filter((i) =>i.expense_flag ===1));
      }
    }
    /**
    * when click confirm
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const confirmClick=()=>{
      setContent(t('Are you sure want to confirm?')); setType('confirm');
      setConfirmModalBox(!confirmModalBox);
      setError("");
    }
    /**
    * when click reject
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const rejectClick=()=>{
		    setReason(''); setOpen(!open); setRejectError([]);
    }
        /**
    * when click confirm ok
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const confirmOK= async()=>{
      setLoading(true);
      setConfirmModalBox(!confirmModalBox);
      let request = {
        login_id: ApiPath.loginEmp,
        expense_ids: [expenseID],
        company_id: ApiPath.companyID,
        is_adjustment: true,
        language:ApiPath.lang
      }
      let obj = {
        package_name: 'hr',
        url: ApiPath.ExpenseListConfirm,
        method: 'post',
        params: request
      }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
      } else {
        setSuccess([response.data.message]);
        setError([]);
        let detailID = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS")); // return data from expense list
      let detailIDHistory= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY"));
      let detailIDDashboard= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD"));
      if (!detailID &&!detailIDHistory&&!detailIDDashboard) {
        history.push('./expense-list')
      }
      else{
        setLoading(true);
        if(detailIDDashboard){
          setDashBoardFlag(true);
          setExpenseID(detailIDDashboard);
          loadExpenAjustmentDetail(detailIDDashboard,true);
        }else{
          if(detailID){
            setExpenseID(detailID);
            loadExpenAjustmentDetail(detailID,false);
        }else{
            setExpenseID(detailIDHistory);
            loadExpenAjustmentDetailHistory(detailIDHistory,false);
            setHistoryFlag(false);
        }
        }
    }
      }
    }
    /**
    * when click download
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const downloadClick= async()=>{
      setLoading(true);
    const request = {
      expense_id: expenseID,
      login_id: ApiPath.loginEmp,
      company_id: ApiPath.companyID,
      language: ApiPath.lang
    }
    let obj = {
      package_name: 'hr',
      url: ApiPath.ExpenseAjustmentDetailExport,
      method: 'post',
      params: request,
      type: "blob",
    }
    let response = await ApiRequest(obj);
    setLoading(false);
    if (response.flag === false) {
      setError(response.message);
    }
    else {
      const isReturnFile = response.headers["content-disposition"];
      if (isReturnFile) {
        let fileName = response.headers["content-disposition"].split("filename=")[1];
        const modifyFileName = fileName.slice(1, fileName.length - 1);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", modifyFileName);
        document.body.appendChild(link);
        link.click();
      }
      else {
        setError(response.message);
        setSuccess("");
      }
    }
    }
    /**
    * click reject button
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const rejectBotton = () => {
      setReason(''); setOpen(!open); setRejectError([]);
    }
        /**
    * click reject ok
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const rejectOK = async () => {
      let arMess = []
    if (isEmpty(reason.trim())) {
      let errMsg = t('JSE124').replace('%s', t('Reason'));
      arMess.push(errMsg);
    }
    else if (!checkMaxLength(reason, 500)) {
      let errMsg = t('JSE123').replace('%s', t('Reason')).replace('%s', 500);
      arMess.push(errMsg);
    }

    if (arMess.length > 0) {
      setRejectError(arMess);
    }
    else {
      setError([]);
      setSuccess("");
      setOpen(!open);
      setLoading(true);
      let request = {
        login_id: ApiPath.loginEmp,
        expense_ids: [expenseID],
        company_id: ApiPath.companyID,
        denied_reason: reason,
        is_adjustment: true,
        language:ApiPath.lang
      }
      let obj = {
        package_name: 'hr',
        url: ApiPath.ExpenseListReject,
        method: 'post',
        params: request
      }
      let response = await ApiRequest(obj);
      setLoading(false);
      if (response.flag === false) {
        setError(response.message);
        setSuccess("");
      } else {
        setSuccess([response.data.message]);
        setError([]);
        let detailID = JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS")); // return data from expense list
      let detailIDHistory= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY"));
      let detailIDDashboard= JSON.parse(sessionStorage.getItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD"));
      if (!detailID &&!detailIDHistory&&!detailIDDashboard) {
        history.push('./expense-list')
      }
      else{
        setLoading(true);
        if(detailIDDashboard){
          setDashBoardFlag(true);
          setExpenseID(detailIDDashboard);
          loadExpenAjustmentDetail(detailIDDashboard,true);
        }else{
          if(detailID){
            setExpenseID(detailID);
            loadExpenAjustmentDetail(detailID,false);
        }else{
            setExpenseID(detailIDHistory);
            loadExpenAjustmentDetailHistory(detailIDHistory,false);
            setHistoryFlag(false);
        }
        }
    }
      }
    }
    }
          /**
    * click back button
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
      const clickBack=()=>{
        if(dashBoardFlag){
          sessionStorage.removeItem("RETURN_EXPENSE_ID_ADJUSTMENT_DETAILS_DASHBOARD");
          history.push("./dashboard");
        }else{
          sessionStorage.setItem("RETURN_EXPENSE_LIST_INFO_DETAILS_PREVIOUS", 1);
          sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS");
          sessionStorage.removeItem("RETURN_EXPENSE_LIST_ID_DETAILS_HISTORY");
          history.push("./expense-list");
        }
      }
/**
    * click download file attach
    *
    * @author  lq_don
    * @create  13/07/2021 (D/M/Y)
    * @param
    * @return
    */
      const downloadFileAttach= async(file,checkAjustMent='NO')=>{
        setLoading(true);
        let request={};
        if(checkAjustMent=='NO')
        request = {
          company_id: ApiPath.companyID,
          login_id: ApiPath.loginEmp,
          language: ApiPath.lang,
          file_id: file.id!=null?file.id:file.file_id,
          is_detail:file.id!=null?false:true,
        }
        else
        request = {
          company_id: ApiPath.companyID,
          login_id: ApiPath.loginEmp,
          language: ApiPath.lang,
          file_id: file.id!=null?file.id:file.file_id,
          is_detail:file.id!=null?false:true,
          is_adjustment:checkAjustMent
        }
        let param = {
          package_name: 'hr',
          url: ApiPath.ExpenseAjustmentDetailDownloadExpenseAjustmentAttach,
          method: 'post',
          params: request,
          type: "blob",
        }
        let response = await ApiRequest(param);
        setLoading(false);
        if (response.flag === false) {
          setError(response.message);
        }
        else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download',file.id!=null?file.expense_adjustment_document_name.split('/')[file.expense_adjustment_document_name.split('/').length-1]:file.file_name.split('/')[file.file_name.split('/').length-1]); //or any other extension
          document.body.appendChild(link);
          link.click();
        }
      }
  return (
    <CRow className="expense-ajustment-detail">
      <CCol>
      <Loading start={loading} />
      <Message success={success} error={error} />
      <Confirmation
          content={content}
          okButton={t('Ok')}
          cancelButton={t('Cancel')}
          type={type}
          show={confirmModalBox}
          cancel={()=>setConfirmModalBox(!confirmModalBox)}
          confirmOK={confirmOK}
      />
      <ModalReject
        modalReject={open}
        closeModalReject={rejectBotton}
        reason={reason}
        changeReason={(i)=>setReason(i.target.value)}
        errorModal={rejectError}
        RejectOK={rejectOK}
      />
        <CCard className="">
          <CCardHeader >
            <h5 id='lblExpenseAdjustmentDetail'>{t('Expense Adjustment Detail')}</h5>
          </CCardHeader>
          <CCardBody >
            {/* show button previous */}
            <ButtonPreviousExpenseAjustmentDetail
            clickBack={clickBack}>
            </ButtonPreviousExpenseAjustmentDetail>
            {/* show detail expense ajustment detail */}
            <CommonExpenseAjustmentDetail
                expenseAjustmentDetailInfo={expenseAjustmentDetailInfo}
            >
            </CommonExpenseAjustmentDetail>
            {/* show other attachement */}
            <OtherAttachementExpenseAjustmentDetail
                expenseOtherAttachementFile={expenseOtherAttachementFile}
                historyFlag={historyFlag}
                downloadFileAttach={downloadFileAttach}
            >
            </OtherAttachementExpenseAjustmentDetail>
            <span className="text-danger"># {t('Arrange By Admin')} :{t('You cannot get this amount because of admin or company arrange/buy for you.')}</span>
            {/* show table expense ajustment detail */}
            <ExpenseAjustmentDetailTable
              currencyList={currencyList}
              expenseItemList={expenseItemList}
              historyFlag={historyFlag}
              downloadFileAttach={downloadFileAttach}
              adjustmentBudget={adjustmentBudget}
              advanceAdditional={advanceAdditional}

            >
            </ExpenseAjustmentDetailTable>
            {/* show adjustment budget table  */}
            <AdjustmentBudgetExpenseAjustmentDetail
              adjustmentBudget={adjustmentBudget}
              currencyList={currencyList}
              advanceAdditional={advanceAdditional}
              advanceFlag={advanceFlag}
            >
            </AdjustmentBudgetExpenseAjustmentDetail>
            {/* show table approver */}
            <ApproverTable
              approverList={approverList}
            >
            </ApproverTable>
            {/* show button expense ajustment */}
            <ButtonExpenseAjustment
                confirmClick={confirmClick}
                rejectClick={rejectClick}
                downloadClick={downloadClick}
                historyFlag={historyFlag}
                confirmFlag={confirmFlag}
            ></ButtonExpenseAjustment>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}
const Welcome = withTranslation()(LegacyWelcomeClass);
export default function ExpenseAjustmentDetailIndex() { return ( <Welcome />) }
