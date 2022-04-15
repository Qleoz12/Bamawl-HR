/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Confirmation from "../../../brycen-common/confirmation/Confirmation";
import { checkNullOrBlank } from "../../hr-common/common-validation/CommonValidation";
import EmployeeLeaveSettingTable from "./EmployeeLeaveSettingTable";
import AddEditFormEmployeeLeaveSetting from "./AddEditFormEmployeeLeaveSetting";
import SaveNextPrevEmployeeLeaveSetting from "./SaveNextPrevEmployeeLeaveSetting";
import HeaderBox from "../../hr-common/employee-personal-header-box/HeaderBox";
import EmployeeLeaveSettingEmployeeBox from './EmployeeLeaveSettingEmployeeBox';
import NextPreviousPageEmployeeLeaveSetting from './NextPreviousPageEmployeeLeaveSetting';
import ApiPath from "../../../brycen-common/api-path/ApiPath";
import Loading from '../../../brycen-common/loading/Loading';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import Message from '../../../brycen-common/message/Message';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';

function LegacyWelcomeClass({ t, i18n }) {
    //create const
    const LeaveType = {
        CASUAL_LEAVE: 1,
        ANNUAL_LEAVE: 2,
        MEDICAL_LEAVE_BELOW_EXP_6_MONTH_UNPAID: 3,
        MEDICAL_LEAVE_BASIC_PAY: 4,
        MARRIAGE_LEAVE: 5,
        MATERNITY_LEAVE_BELOW_6_MONTH_UNPAID: 6,
        MATERNITY_LEAVE_BASIC_PAY: 7,
        PATERNITY_LEAVE: 8,
        ABSENT: 9,
        UNPAID_LEAVE: 10,
        COMPENSATORY_LEAVE: 11,
        OFF_IN_LIEU: 12,
        PH_IN_LIEU: 13,
        FUNERAL_LEAVE: 14,
        EXAM_LEAVE: 15
    };
    const EmployeeType = {
        PERMANANT: 1,
        PART_TIME: 2,
        CONTRAT: 3,
        INDIRECT_DRIVER: 4,
    };
    const EligibleNoneligible = {
        ELIGIBLE: 1,
        NONE_LIGIBLE: 2,
    };
    const Gender = {
        MALE: "M",
        FEMALE: "F",
    };
    const SettingAuto={
        AUTO:1,
        MANUAL:2
    }
    const DetailEdit={
        EDIT:1,
        DETAIL:2
    }
	//create useState hook
    const history                                                   = useHistory(); // For edit link
    const [error, setError]                                         = useState([]); // for error message
    const [success, setSuccess] 				    				= useState([]); // for success message
    const [loading, setLoading]                                     = useState(false);
    const [totalLeaveType, setTotalLeaveType] 			    		= useState(""); //for total leave type
    const [startDate, setStartDate] 			            		= useState(null); //for start time
    const [endDate, setEndDate] 				    				= useState(null); //for end time
    const [remainDay, setRemainDay] 								= useState(""); //for remain leave
    const [listLeaveType, setListLeaveType] 						= useState([]); //for list leave type
    const [leaveTypeId, setLeaveTypeId] 							= useState(""); //for leave type id
    const [employeeLeaveSetting, setEmployeeLeaveSetting] 	        = useState([]); //for employee leave setting
    const [totalEmployeeLeaveSetting, setTotalEmployeeLeaveSetting] = useState(0); //for total employee leave setting
    const [idDelete, setIdDelete] 									= useState(0); //for id delete
    const [idEmployeeLeaveSetting, setIdEmployeeLeaveSetting] 		= useState(0); // for id employeeLeaveSetting
    const [checkAutoSetting, setCheckAutoSetting] 					= useState(SettingAuto.MANUAL); // for check auto setting
    const [leaveTypeIdDelete, setLeaveTypeIdDelete] 				= useState(""); // for leave type id when delete
	const [employeeID, setEmployeeID] 							    = useState(); // for employee show id, name,code
    const [checkDetailEdit, setCheckDetailEdit] 					= useState(DetailEdit.DETAIL); // for detail or edit
    const [content, setContent]                                     = useState('');
    const [type, setType]                                           = useState('');
    const [showModalBox, setShowModalBox]                           = useState(false);// For show/hide confirmation box
    const [permission, setPermission]                               = useState(ViewPermision.ONLY_ME) // for view permission


    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);     // keep value time out

    // load first
    useEffect(() => {
        let editData = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_EDIT")); // return data from EMPLOYEE List Form
        let detailData = JSON.parse(sessionStorage.getItem("RETURN_EMP_LIST_ID_DETAILS")); // return data from EMPLOYEE List Form
        if(detailData==null&&editData==null){
            history.push('./employee-list');
        }else if(editData['is_new']==true){
            history.push('./employee-personal');
        }
        else {
            loadViewPermission();
            let empID = detailData !=null ? detailData : editData['id'];
            setCheckDetailEdit(detailData!=null?DetailEdit.DETAIL:DetailEdit.EDIT);
            setEmployeeID(empID);
            loadEmployeeLeaveSetting(empID);
            loadLeaveType();
        }
    }, []);

    /**
    * Load view permission user login
    *
    * @author  dh_khanh
    * @create  02/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const loadViewPermission = async  () => {
        let response = await ApiViewPermission.loadViewPermission();
        setLoading(false);
        if (response.flag !== false) {
            setPermission(response.data.view_permission);
        }
    }

    //load employee leave setting
    const loadEmployeeLeaveSetting = async (idEmployee,index = 0,isDelete=0,idEmployeeLeaveSetting=0,idDelete=0) => {
        let url = `${ApiPath.EmployeeLeaveSetting}/${idEmployee}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}&index=${index}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if(response.flag === false){
            setError(response.message);
            setSuccess([]);
        }else {
            setError([]);
            setEmployeeLeaveSetting(response.data.data);
            setTotalEmployeeLeaveSetting(response.data.total);
            setEmployeeID(response.data.data.employee_id);
            //store employee id
            if(index != 0){
                let item = {
                    id: response.data.data.employee_id,
                    is_new: response.data.data.is_new
                }
                sessionStorage.setItem("RETURN_EMP_LIST_ID_EDIT",JSON.stringify(item));
                if(response.data.data.is_new==true){
                    history.push('./employee-personal');
                }
            }
            // reset form add and edits
            if(idEmployeeLeaveSetting == idDelete){
                setIdEmployeeLeaveSetting(0);
                setLeaveTypeId("");
                setStartDate(null);
                setEndDate(null);
                setRemainDay("");
                setTotalLeaveType("");
            }
            setCheckAutoSetting(SettingAuto.MANUAL);
        }
    }

    //load leave type
    const loadLeaveType = async () => {
        let obj = { package_name: 'hr', url: `${ApiPath.EmployeeLeaveSetting}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`, method: 'get'};
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setListLeaveType([]);
        } else {
            if (response.data.total !== 0) {
                setListLeaveType(response.data.data);
            }
        }
    }

    //select leave type
    const selectLeaveType = (e) => {
        let leaveType = listLeaveType.find((item) => item.leave_type_id === Number(e.target.value));
        //set value when select drop leavetype
        setTotalLeaveType(leaveType==null?"":leaveType.total_max_day.toString());
        setRemainDay(leaveType==null?"":leaveType.total_max_day.toString());
        setLeaveTypeId(leaveType==null?"":leaveType.leave_type_id);
        setCheckAutoSetting(leaveType==null?SettingAuto.MANUAL:leaveType.setting_auto);
    };
    //select start date
    const selectStartDate = (e) => {
        setStartDate(e);
    };
    //select end date
    const selectEndDate = (e) => {
        setEndDate(e);
    };
    //change remain leave
    const changeRemainDay = (e) => {
        if(isDecimal(e.target.value))
            setRemainDay(e.target.value);
    };
    //check decimal
    function isDecimal(value){
        var decimalOnly = /^[]*?(\d{0,4})(\.\d{0,1})?$/;
        if(decimalOnly.test(value)&&value.substring(0,1)!="." && value.substring(value.length,value.length-1)!=" ") {
            return true;
        }
        return false;
    }
    //event click save data form
    const clickSave = () => {
        let arrMsg = [];
        setSuccess([]);
        setError([]);
        //validation employee
        if (
            (employeeLeaveSetting.employee_type === EmployeeType.CONTRAT ||
                employeeLeaveSetting.employee_type === EmployeeType.PART_TIME) &&
            leaveTypeId !== LeaveType.ABSENT &&
            leaveTypeId !== LeaveType.UNPAID_LEAVE && leaveTypeId!=""
        ) {
            let errMsg = t("JSE134").replace("%s", t("Part time or contract worker")).replace("%s", t("unpaid and absent leave"));
            arrMsg.push(errMsg);
        } else {
            if (
                employeeLeaveSetting.gender === Gender.MALE &&
                (leaveTypeId === LeaveType.MATERNITY_LEAVE_BASIC_PAY ||
                    leaveTypeId === LeaveType.MATERNITY_LEAVE_BELOW_6_MONTH_UNPAID)
            ) {
                let errMsg = t("JSE135").replace("%s", t("Male")).replace("%s", t("marternity leave"));
                arrMsg.push(errMsg);
            }
            if (employeeLeaveSetting.gender === Gender.FEMALE && leaveTypeId === LeaveType.PATERNITY_LEAVE) {
                let errMsg = t("JSE135").replace("%s", t("Female")).replace("%s", t("parternity leave"));
                arrMsg.push(errMsg);
            }
            if (
                employeeLeaveSetting.eligible_noneligible === EligibleNoneligible.ELIGIBLE &&
                leaveTypeId === LeaveType.COMPENSATORY_LEAVE
            ) {
                let errMsg = t("JSE135").replace("%s", t("Eligible")).replace("%s", t("compensatory leave"));
                arrMsg.push(errMsg);
            }
        }
        //validation leave type
        if (!checkNullOrBlank(leaveTypeId)) {
            let errMsg = t("JSE001").replace("%s", t("Leave Type"));
            arrMsg.push(errMsg);
        }
        //validation start Date
        if (!checkNullOrBlank(startDate)) {
            let errMsg = t("JSE001").replace("%s", t("Start Date"));
            arrMsg.push(errMsg);
        }
        //validation end Date
        if (!checkNullOrBlank(endDate)) {
            let errMsg = t("JSE001").replace("%s", t("End Date"));
            arrMsg.push(errMsg);
        }
        //validation check start date > end date
        if (checkNullOrBlank(startDate) && checkNullOrBlank(endDate)) {
            if (formatDate(startDate) > formatDate(endDate)) {
                let errMsg = t("JSE016").replace("%s", t("Start Date")).replace("%s", t("End Date"));
                arrMsg.push(errMsg);
            }
        }
        //validation remain date
        if (!checkNullOrBlank(remainDay)) {
            let errMsg = t("JSE124").replace("%s", t("Remain Leave"));
            arrMsg.push(errMsg);
        } else if (!remainDay) {
            let errMsg = t("JSE005").replace("%s", t("Remain Leave"));
            arrMsg.push(errMsg);
        } else if (remainDay < 0) {
            let errMsg = t("JSE018").replace("%s", t("Remain Leave"));
            arrMsg.push(errMsg);
        }
        if (arrMsg.length > 0) {
            setError(arrMsg);
        } else {
            setContent(t('Are you sure want to save?')); setType('save');
            setShowModalBox(!showModalBox);
        }
        if(remainDay.toString().substr(remainDay.length-1)==".")
            setRemainDay(remainDay.toString().substring(0,remainDay.length-1))
    };
    //click delete show model delete
    const showModelDelete = (e) => {
        setIdDelete(e["id"]);
        let employeeLeaveSettingTmp = employeeLeaveSetting.employee_leave_list.find((item) => item.id === e["id"]);
        setLeaveTypeIdDelete(employeeLeaveSettingTmp.leave_type_id);
        setContent(t('Are you sure want to delete?')); setType('delete');
        setShowModalBox(!showModalBox);
    };
    //close delete form
    const deleteToggleAlert = () => {
        setIdDelete(0);
        setShowModalBox(!showModalBox);
    };
    // close save form
    const closeSaveAlert = () => {
        setShowModalBox(!showModalBox);
    };
    // event save
    const saveOK = () => {
        closeSaveAlert();
        if (idEmployeeLeaveSetting !== 0) {
            saveEditData();
        } else {
            saveAddData();
        }
    };
    //format date yyyy-MM-dd
    const formatDate=(date)=> {
        let d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
    //save edit data
    const saveEditData = async () => {
        let params = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "remain_day": remainDay,
            "leave_type_id": leaveTypeId,
            "start_date": formatDate(startDate),
            "end_date": formatDate(endDate),
            "updated_emp": ApiPath.updatedEmp,
        }
        setLoading(true);
        let obj = { package_name: 'hr', url: `${ApiPath.EmployeeLeaveSetting}/${idEmployeeLeaveSetting}`, method: 'put', params };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
        } else {
            loadEmployeeLeaveSetting(employeeID);
            setSuccess([response.data.message]);
            setError([]);
        }
    }

    //save add data
    const saveAddData = async () => {
        let params = {
            "company_id": ApiPath.companyID,
            "employee_id": employeeID,
            "leave_type_id": leaveTypeId,
            "remain_day": remainDay,
            "start_date": formatDate(startDate),
            "end_date": formatDate(endDate),
            "created_emp": ApiPath.createdEmp,
            "updated_emp": ApiPath.updatedEmp,
            "language": ApiPath.lang
        }
        let obj = { package_name: 'hr', url: ApiPath.EmployeeLeaveSetting, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
        } else {
            loadEmployeeLeaveSetting(employeeID);
            setSuccess([response.data.message]);
            setError([]);
        }
    }

    //event delete row
    const deleteOK = async () => {
        deleteToggleAlert();
        let url = `${ApiPath.EmployeeLeaveSetting}/${idDelete}?employee_id=${employeeID}&language=${ApiPath.lang}&company_id=${ApiPath.companyID}&leave_type_id=${leaveTypeIdDelete}`;
        let obj = { package_name: 'hr', url: url, method: 'delete'};
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            setSuccess([]);
        } else {
            loadEmployeeLeaveSetting(employeeID);
            loadEmployeeLeaveSetting(employeeID,0,1,idEmployeeLeaveSetting,idDelete);
            setCheckAutoSetting(SettingAuto.MANUAL);
            setSuccess([response.data.message]);
            setError([]);
        }
    }

    // click edit
    const clickEdit = (e) => {
        let employeeLeaveSettingTmp = employeeLeaveSetting.employee_leave_list.find((item) => item.id === e["id"]);
        //set value when click edit
        setIdEmployeeLeaveSetting(employeeLeaveSettingTmp.id);
        setLeaveTypeId(employeeLeaveSettingTmp.leave_type_id);
        setStartDate(employeeLeaveSettingTmp.start_date);
        setEndDate(employeeLeaveSettingTmp.end_date);
        setRemainDay(employeeLeaveSettingTmp.remain_day.toString());
        setTotalLeaveType(employeeLeaveSettingTmp.total_max_day);
        //get leave type check autosetting
        let leaveType = listLeaveType.find((item) => item.leave_type_id === employeeLeaveSettingTmp.leave_type_id);
        setCheckAutoSetting(leaveType.setting_auto);
    };
    // next employee
    const nextEmp = () => {
        loadEmployeeLeaveSetting(employeeID,1);
        setSuccess([]);
        setError([]);
    };
    // prev employee
    const prevEmp = () => {
        loadEmployeeLeaveSetting(employeeID,-1);
        setSuccess([]);
        setError([]);
    };

    return (
        <CRow className="employee-leave-setting">
            <CCol lg="12">
                <Loading start={loading} />
                <Message success={success} error={error} />
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={showModalBox}
                    cancel={()=>setShowModalBox(!showModalBox)}
                    deleteOK={deleteOK}
                    saveOK={saveOK}
                />
                <CCard>
                    <HeaderBox
                        setLeaveSetting = {true}
                        PaymentSetting = {employeeLeaveSetting.salary_transfer_setting}
                    ></HeaderBox>
                    <CCardHeader>
                        <div className="next-previous-page" style={{ display: "flex", justifyContent: "space-between",flexWrap:'wrap', alignItems: "center" }}>
                            <h5 id="lblAllowanceList"><label>{t("Employee Leave Setting")}</label></h5>
                            <NextPreviousPageEmployeeLeaveSetting
                                history={history}
                            ></NextPreviousPageEmployeeLeaveSetting>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <EmployeeLeaveSettingEmployeeBox employeeData={employeeLeaveSetting}></EmployeeLeaveSettingEmployeeBox>
                        <h5 style={{ color: "#5C64B1", marginBottom: "30px",fontWeight:'bold' }}>Leave Setting</h5>
                        {/*show form add and edit leave setting*/}
                        <AddEditFormEmployeeLeaveSetting
                            listLeaveType={listLeaveType}
                            selectLeaveType={selectLeaveType}
                            leaveTypeId={leaveTypeId}
                            totalLeaveType={totalLeaveType}
                            startDate={startDate}
                            endDate={endDate}
                            remainDay={remainDay}
                            selectStartDate={selectStartDate}
                            selectEndDate={selectEndDate}
                            changeRemainDay={changeRemainDay}
                            checkAutoSetting={checkAutoSetting}
                            SettingAuto={SettingAuto}
                            checkDetailEdit={checkDetailEdit}
                            DetailEdit={DetailEdit}
                        ></AddEditFormEmployeeLeaveSetting>
                        {/* show save, next employee and previous employee */}
                        <SaveNextPrevEmployeeLeaveSetting
                            clickSave={clickSave}
                            prevEmp={prevEmp}
                            nextEmp={nextEmp}
                            checkDetailEdit={checkDetailEdit}
                            DetailEdit={DetailEdit}
                            permission={permission}
                        ></SaveNextPrevEmployeeLeaveSetting>
                        {/* show table employee leave setting */}
                        <EmployeeLeaveSettingTable
                            listEmployeeLeaveSetting={employeeLeaveSetting.employee_leave_list==null?[]:employeeLeaveSetting.employee_leave_list}
                            totalEmployeeLeaveSetting={totalEmployeeLeaveSetting}
                            showModelDelete={showModelDelete}
                            clickEdit={clickEdit}
                            checkDetailEdit={checkDetailEdit}
                            DetailEdit={DetailEdit}
                        ></EmployeeLeaveSettingTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function EmployeeLeaveSettingIndex() {
    return <Welcome />;
}
