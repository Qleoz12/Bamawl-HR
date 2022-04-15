let customer_name = window.location.href.split("/")[3];
if(customer_name === "" || customer_name === null) {
  customer_name = "demo";
}
export default {
    /*Common Temp*/
    companyID: localStorage.getItem("COMPANY_ID"),
    createdEmp: localStorage.getItem("LOGIN_ID"),
    updatedEmp: localStorage.getItem("LOGIN_ID"),
    loginEmp: localStorage.getItem("LOGIN_ID"),
    lang: localStorage.getItem("LANGUAGE"),
    positionRank: JSON.parse(localStorage.getItem("POSITION_RANK")),
    departmentID: JSON.parse(localStorage.getItem('DEPARTMENT_ID')),
    deviceFlag: 1,
    customerName: customer_name,
    defaultPerPage: 20,
    // mapKey :'AIzaSyAt24vxJs95c3z15U7G8arp7cDN4Ycw56U',

    //ERP approver-list
    ERPApproverList: `api/${customer_name}/approver-list`,
    //ERP get-all-department
    ERPGetAllDepartment: `api/${customer_name}/department/get-all-department`,

    //ERP position/get-all-position
    ERPGetAllPosition: `api/${customer_name}/position/get-all-position`,

    //ERP get-all-department
    ERPGetDepartment: `api/${customer_name}/department/get-all-department`,

    //ERP search employee
    ERPSearchEmployee: `api/${customer_name}/employee/search`,

    //HR employee-by-view-permission
    employeeByViewPermission: `api/${customer_name}/employee-by-view-permission`,

    perfectAttendanceSetupSearch: `api/${customer_name}/perfect-attendance-setup/search`,
    perfectAttendanceSetupGetDepartment: `api/${customer_name}/department/autocomplete-search`,
    perfectAttendanceSetupGetRole: `api/${customer_name}/perfect-attendance-setup/get-user-level`,
    perfectAttendanceSetupGetEmployee: `api/${customer_name}/employee/autocomplete-search`,
    perfectAttendanceSetupGetCurrency: `api/${customer_name}/perfect-attendance-setup/get-currency`,
    perfectAttendanceSetupSave: `api/${customer_name}/perfect-attendance-setup/save`,
    perfectAttendanceSetupSaveOverwrite: `api/${customer_name}/perfect-attendance-setup/save-overwrite`,
    perfectAttendanceSetup: `api/${customer_name}/perfect-attendance-setup/`,

    empBasicSalarySave: `api/${customer_name}/basic-salary-register/save`,
    empBasicSalaryUpdate: `api/${customer_name}/basic-salary-register/`,
    empBasicSalaryDetail: `api/${customer_name}/basic-salary-register/`,
    empBasicSalarySaveOverwrite: `api/${customer_name}/basic-salary-register/save-overwrite`,
    empBasicSalaryList: `api/${customer_name}/basic-salary-register/list`,
    empBasicSalaryRemove: `api/${customer_name}/basic-salary-register/remove`,

    // (tc_son) Role And Permission Registration
    roleAndPerrmissionRegistrationSearch: `api/${customer_name}/role-and-permission/search`,
    roleAndPerrmissionRegistrationMenuName: `api/${customer_name}/role-and-permission/get-menus`,
    roleAndPerrmissionRegistrationSubMenuName: `api/${customer_name}/role-and-permission/get-permissions`,
    // roleAndPerrmissionRegistrationRoleName: `api/${customer_name}/role-and-permission/get-roles`,
    roleAndPerrmissionRegistrationSave: `api/${customer_name}/role-and-permission/save`,
    roleAndPerrmissionRegistrationDelete : `api/${customer_name}/role-and-permission/`,

    /**Basic salary list start*/
    employeeBasicSalaryListGetDepartment: `api/${customer_name}/department/autocomplete-search`,
    // employeeBasicSalaryListGetRole: `api/${customer_name}/basic-salary-list/get-user-level`,
    employeeBasicSalaryListGetEmployee: `api/${customer_name}/employee/autocomplete-search`,
    employeeBasicSalaryListSearch: `api/${customer_name}/basic-salary-list/search`,
    employeeBasicSalaryListDelete: `api/${customer_name}/basic-salary-list/`,
    /**Basic salary list end*/

    /**Basic salary registration start*/
    employeeBasicSalaryRegistrationGetDepartment: `api/${customer_name}/department/autocomplete-search`,
    // employeeBasicSalaryRegistrationGetRole: `api/${customer_name}/basic-salary-register/get-user-level`,
    employeeBasicSalaryRegistrationGetEmployee: `api/${customer_name}/employee/autocomplete-search`,
    employeeBasicSalaryRegistrationGetCurrency: `api/${customer_name}/basic-salary-register/get-currency`,
    employeeBasicSalaryRegistrationSearch: `api/${customer_name}/basic-salary-register/search`,
    /**Basic salary registration end*/

    /** Start Employee Perfect Attendance Setup List */
    employeePerfectAttendanceSetupListSearch: `api/${customer_name}/perfect-attendance-setup-list/search`,
    employeePerfectAttendanceSetupListGetDepartment: `api/${customer_name}/department/autocomplete-search`,//`api/${customer_name}/perfect-attendance-list/get-department`,
    // employeePerfectAttendanceSetupListGetRole: `api/${customer_name}/perfect-attendance-setup-list/get-user-level`,//`api/${customer_name}/perfect-attendance-list/get-user-level`,
    employeePerfectAttendanceSetupListGetEmployee: `api/${customer_name}/employee/autocomplete-search`,//`api/${customer_name}/perfect-attendance-list/get-employee`,
    employeePerfectAttendanceSetupListRemove: `api/${customer_name}/perfect-attendance-setup-list/`,
    employeePerfectAttendanceSetupListMethod: `api/${customer_name}/perfect-attendance-setup-list/get-method`,
    /** End Employee Perfect Attendance Setup List */

    /** Payroll Rule Calculation Method Setup */
    PayrollRuleCalculationMeThodSetupGetCalculateMethod:    `api/${customer_name}/payrollcaculationmethod-set/getcalculatemethods`,
    PayrollRuleCalculationMeThodSetupSearch:                `api/${customer_name}/payrollcaculationmethod-set/search`,
    PayrollRuleCalculationMeThodSetupSave:                  `api/${customer_name}/payroll-caculation-method-set/save`,
    PayrollRuleCalculationMeThodSetup:                      `api/${customer_name}/payroll-caculation-method-set/`,
    PayrollRuleCalculationMeThodSetupOverwritesave:         `api/${customer_name}/payroll-caculation-method-set/overwritesave`,

    /** Shift/Normal Rule Register */
    ShiftNormalRuleRegisterDetailGetWorkDay:                `api/${customer_name}/shiftnormalrule-register/getworkday`,
    ShiftNormalRuleRegisterDetailSave:                      `api/${customer_name}/shift-normal-rule-register/save`,
    ShiftNormalRuleRegister:                                `api/${customer_name}/shift-normal-rule-register/`,

    /** Employee Allowance Registration */
    EmployeeAllowanceRegistrationGetAllowace:               `api/${customer_name}/employeeallowance-register/getallowance`,
    EmployeeAllowanceRegistrationChangeAllowance:           `api/${customer_name}/employeeallowance-register/changeallowance/`,
    EmployeeAllowanceRegistrationSearch:                    `api/${customer_name}/employeeallowance-register/search`,
    EmployeeAllowanceRegistrationSave:                      `api/${customer_name}/employee-allowance-register/save`,
    EmployeeAllowanceRegistrationOverwritesave:             `api/${customer_name}/employee-allowance-register/overwritesave`,
    EmployeeAllowanceRegistration:                          `api/${customer_name}/employee-allowance-register/`,

    /* Company Leave Setting */
    CompanyLeaveSettingGetListLeaveType:                     `api/${customer_name}/company-leave-setting`,
    CompanyLeaveSettingOverwrite:                            `api/${customer_name}/companyleave-setting/overwritesave`,
    CompanyLeaveSettingInsertCompanyLeave:                   `api/${customer_name}/companyleave-setting/save`,
    CompanyLeaveSettingGetFiscalYear:                        `api/${customer_name}/companyleave-setting/getfiscalyear`,
    /* Allowance List */
    AllowanceListDelete:                                     `api/${customer_name}/allowance-list/`,
    AllowanceListSearch:                                     `api/${customer_name}/allowance-list/search`,
    AllowanceList:                                            `api/${customer_name}/allowancelist/getallowance`,

    //** Department (dh_khanh)*/
    departmentAutoCompleteSearch:                            `api/${customer_name}/department/autocomplete-search`,
    /** Role  */
    roleAutoCompleteSearch:                                 `api/${customer_name}/employeeovertime-register/getrole`,
    positionAutoCompleSearch:                                `api/${customer_name}/position/get-all-position`,
    /** Employee */
    employeeAutoCompleteResult:                             `api/${customer_name}/employee/autocomplete-result`,
    employeeIDAutoCompleteSearch:                           `api/${customer_name}/employee/id-autocomplete-search`,
    employeeCodeAutoCompleteSearch:                         `api/${customer_name}/employee/code-autocomplete-search`,
    employeeNameAutoCompleteSearch:                         `api/${customer_name}/employee/name-autocomplete-search`,
    /** Allowance Register */
    AllowanceRegisterGetShiftName:                          `api/${customer_name}/allowanceregister/getshiftname`,
    AllowanceRegisterEditAllowanceID:                       `api/${customer_name}/allowance-register/`,
    AllowanceRegisterSave:                                  `api/${customer_name}/allowance-register/save`,
    AllowanceRegisterEdit:                                  `api/${customer_name}/allowance-register/`,

    /** Shift Normal Rule List */
    ShiftNormalRuleListGetData:                             `api/${customer_name}/shift-normal-rule-list`,
    ShiftNormalRuleListDelete:                              `api/${customer_name}/shift-normal-rule-list/`,

    /** Employee Allowance List */
    EmployeeAllowanceListSearch:                            `api/${customer_name}/employee-allowance-list/search`,
    EmployeeAllowanceListDelete:                            `api/${customer_name}/employee-allowance-list/`,

    /**Sub Allowance Register List */
    SubAllowanceRegisterListGetTitleAllowance:              `api/${customer_name}/suballowance-register-list/getallowance`,
    SubAllowanceRegisterListGetAllAllowance:                `api/${customer_name}/sub-allowance-register-list`,
    SubAllowanceRegisterListSave:                           `api/${customer_name}/sub-allowance-register-list/save`,
    SubAllowanceRegisterListGetAllowance:                   `api/${customer_name}/sub-allowance-register-list/`,

    /**Payroll Calculation List */
    PayrollCalculationListGetMethods:                       `api/${customer_name}/payrollcaculationmethod-set/getcalculatemethods`,
    PayrollCalculationListGetSearch:                        `api/${customer_name}/payroll-caculation-list/search`,
    PayrollCalculationListDelete:                           `api/${customer_name}/payroll-caculation-list/`,
    /** Start Employee Role Registration */
    // employeeRoleRegistrationGetRole:                        `api/${customer_name}/employee-role-registration/get-roles`,
    employeeRoleRegistrationGetDepartment:                  `api/${customer_name}/department/autocomplete-search`,
    employeeRoleRegistrationGetEmployee:                    `api/${customer_name}/employee/autocomplete-search`,
    employeeRoleRegistrationSearch:                         `api/${customer_name}/employee-role-registration/search`,
    employeeRoleRegistrationSave:                           `api/${customer_name}/employee-role-registration/save`,
    employeeRoleRegistrationDelete:                         `api/${customer_name}/employee-role-registration/`,
    employeeRoleRegistrationSaveOverWrite:                  `api/${customer_name}/employee-role-registration/save-overwrite`,
    /** End Employee Role Registration */
    /**Bonus Register start*/
    employeeBonusRateSettingSave :                          `api/${customer_name}/bonus-rate-setting/save`,
    employeeBonusRateSettingGetCurrency:                    `api/${customer_name}/bonus-rate-setting/get-currencies`,
    employeeBonusRateSettingUpdate:                         `api/${customer_name}/bonus-rate-setting/`,
    employeeBonusRateSettingGetDetail:                      `api/${customer_name}/bonus-rate-setting/`,
    /**Bonus Register end */

    /**Bonus Rate List start*/
    employeeBonusRateListBonusTitle:                        `api/${customer_name}/bonus-rate-list/get-bonuses`,
    employeeBonusRateListBonusSearch:                       `api/${customer_name}/bonus-rate-list/search`,
    employeeBonusRateListBonusDelete:                       `api/${customer_name}/bonus-rate-list/`,
    /**Bonus Rate List end */

     /**Salary Transfer Setting By Group start*/
     salaryTransferSettingByGroupPaymentAcount:             `api/${customer_name}/salary-transfer-setting-by-group/get-payment-accounts`,
     salaryTransferSettingByGroupGetPaymentAccountSetting : `api/${customer_name}/salary-transfer-setting-by-group/get-payment-accounts-setting`,
     salaryTransferSettingByGroupSearch:                    `api/${customer_name}/salary-transfer-setting-by-group/search`,
     salaryTransferSettingByGroupSave:                      `api/${customer_name}/salary-transfer-setting-by-group/save`,
     salaryTransferSettingByGroupUpdate:                    `api/${customer_name}/salary-transfer-setting-by-group/`,
     salaryTransferSettingByGroupOverwrite:                 `api/${customer_name}/salary-transfer-setting-by-group/save-overwrite`,
     salaryTransferSettingByGroupDetail:                    `api/${customer_name}/salary-transfer-setting-by-group/`,
     /**Salary Transfer Setting By Group end */

    /**Admin Levels*/
    adminLevels:                                            `api/${customer_name}/admin-levels/get-admin-levels`,
    /**Admin Levels end */

    //Get All currencies
    currencies:                                             `api/${customer_name}/currencies/get-currencies`,

    /*Calculation Method start*/
    ssbCalculateMethodSetupSearch : `api/${customer_name}/ssb-calculate-method-setup/search`,
    ssbCalculateMethodSetupSave : `api/${customer_name}/ssb-calculate-method-setup/save`,
    ssbCalculateMethodSetupUpdate : `api/${customer_name}/ssb-calculate-method-setup/`,
    ssbCalculateMethodSetupOverwriteSave : `api/${customer_name}/ssb-calculate-method-setup/overwritesave`,
    ssbCalculateMethodListSearch : `api/${customer_name}/ssb-calculation-list/search`,
    ssbCalculateMethodListDelete : `api/${customer_name}/ssb-calculation-list/`,
    ssbCalculateMethodBasedOnMethods: `api/${customer_name}/ssbcalculation-list/get-based-on-methods`,
    /*Calculation Method end*/

    /*Deduction start*/
    deductionRegister : `api/${customer_name}/deduction-register/`,
    deductionRegisterSave : `api/${customer_name}/deduction-register/save`,
    deductionGetDeductions : `api/${customer_name}/deductionlist/get-deduction-category`,
    deductionName: `api/${customer_name}/deduction-list/get-deduction-name`,
    deductionCalculateMethods : `api/${customer_name}/deductionregister/get-calculate-methods`,
    deductionGetBasedOnMethods : `api/${customer_name}/deductionlist/get-based-on-methods`,
    deductionListSearchPage : `api/${customer_name}/deduction-list/search`,
    deductionListDelete : `api/${customer_name}/deduction-list/`,
    deductionNameCreate : `api/${customer_name}/deduction-register/deduction-name-create`,
    /*Deduction end*/

    /*Orvertime Notification start*/
    overtimeNotificationSearch : `api/${customer_name}/overtime-notification-setup/search`,
    overtimeNotificationSave : `api/${customer_name}/overtime-notification-setup/save`,
    overtimeNotificationUpdate : `api/${customer_name}/overtime-notification-setup/`,
    overtimeNotificationOverwriteSave : `api/${customer_name}/overtime-notification-setup/overwritesave`,
    overtimeNotificationListSearch : `api/${customer_name}/overtime-notification-list/search`,
    overtimeNotificationListDelete : `api/${customer_name}/overtime-notification-list/`,
    /*Orvertime Notification end*/

    /*Overtime Rate start*/
    overtimeRateGetShiftNormalRules : `api/${customer_name}/overtime-rate/get-shift-normal-rules`,
    overtimeRateGetCalculateMethods : `api/${customer_name}/overtime-rate/get-calculate-methods`,
    overtimeRateGetMinuteRanges : `api/${customer_name}/overtime-rate/get-minute-ranges`,
    overtimeRateSave : `api/${customer_name}/overtime-rate/save`,
    overtimeRateUpdate : `api/${customer_name}/overtime-rate-settings/`,
    overtimeRateGetOTName: `api/${customer_name}/overtime-rate-list/get-overtime-rate-settings`,
    overtimeRateListDelete: `api/${customer_name}/overtime-rate-list/`,
    overtimeRateListSearch: `api/${customer_name}/overtime-rate-list/search`,

    /*Overtime Rate end*/

    /*Employee Overtime start*/
    employeeOvertimeGetRateInfo: `api/${customer_name}/employeeovertime-registration/getovertimerate-info/`,
    employeeOvertimeGetRate: `api/${customer_name}/employee-overtime-registration/getovertimerate`,
    employeeOvertimeRegistrationSearch : `api/${customer_name}/employee-overtime-registration/search`,
    employeeOvertimeRegistrationSave : `api/${customer_name}/employee-overtime-registration/save`,
    employeeOvertimeRegistration : `api/${customer_name}/employee-overtime-registration/`,
    employeeOvertimeRegistrationOverwritesave : `api/${customer_name}/employee-overtime-registration/overwritesave`,
    employeeOvertimeListSearch: `api/${customer_name}/employeeovertime-list/search`,
    employeeOvertimeList: `api/${customer_name}/employeeovertime-list/`,
    /*Employee Overtime end*/

    /**Salary Transfer Setting List start*/
    SalaryTransferSettingListGetDepartment: `api/${customer_name}/department/autocomplete-search`,
    SalaryTransferSettingListGetEmployee: `api/${customer_name}/employee/autocomplete-search`,
    SalaryTransferSettingListSearch: `api/${customer_name}/salary-transfer-setting-list/search`,
    SalaryTransferSettingListDelete: `api/${customer_name}/salary-transfer-setting-list/`,
    SalaryTransferSettingListGetPaymentAccount: `api/${customer_name}/salary-transfer-setting-list/get-payment-accounts`,
    /**Salary Transfer Setting List end*/
    /*Employee Leave Setting*/
    EmployeeLeaveSetting:`api/${customer_name}/employee-leave-setting`,

    /* Family Member Register/List */
    FamlilyMemberGet: `api/${customer_name}/family-member-registration-list`,
    FamilyMemberAdd: `api/${customer_name}/family-member-registration-list/add-check-family-member`,
    /* Family Member Register/List */

    /** Log History List start */
    logHistoryListSearch: `api/${customer_name}/log-history-list/search`,
    getFormName: `api/${customer_name}/log-history-list/getformname`,
    /** Log History List end */
    /* Employee List */
    EmployeeListSearch:                     `api/${customer_name}/employee-list/search`,
    EmployeeListExport:                     `api/${customer_name}/employee-list/export`,
    EmployeeListResign:                     `api/${customer_name}/employee-list/resign-employee`,
    /* Employee List */

    /**Emloyee Salary List start*/
    exportSalary: `api/${customer_name}/salary-list/exportsalarydata`,
    employeeListSearch: `api/${customer_name}/approver-register/search-approver-list`,
    approverListSearch: `api/${customer_name}/approver-list/search`,
    approverListSave: `api/${customer_name}/approver-list/save`,
    approverListCheckPendingDelete : `api/${customer_name}/approver-list/check-pending-approver-delete`,
    approverListDelete: `api/${customer_name}/approver-list/`,
    approverListCheckPendingEdit: `api/${customer_name}/approver-list/check-pending-approver-edit`,
    ApproverGetPositionRank: `api/${customer_name}/approver-register/get-position-rank`,
    ApproverGetPosition: `api/${customer_name}/approver-register/get-position`,
    /**Emloyee Salary List end*/

    /**Employee Personal Start */
    EmployeePersonalGetCurrency: `api/${customer_name}/currencies/get-currencies`,
    EmployeePersonalGetBank: `api/${customer_name}/employee-personal/get-bank`,
    EmployeePersonalGetDetail: `api/${customer_name}/employee-personal/`,
    EmployeePersonalUpdate: `api/${customer_name}/employee-personal/`,
    EmployeePersonalDownload: `api/${customer_name}/employee-personal/download`,
    EmployeePersonalSave: `api/${customer_name}/employee-personal/save`,
    EmployeePersonalSaveOvewrite: `api/${customer_name}/employee-personal/save-overwrite`,
    /**Employee Personal End */

    /**Salary TransferSetting Start */
    SalaryTransferSettingEdit :`api/${customer_name}/employee-salary-transfer-setting/`,
    SalaryTransferSettingDelete : `api/${customer_name}/employee-salary-transfer-setting/`,
    SalaryTransferSetting : `api/${customer_name}/employee-salary-transfer-setting/`,

    /**Salary TransferSetting End */
    /**Approver Register Start*/
    // ApproverGetPositionRank: `api/${customer_name}/approver-register/get-position-rank`,
    // ApproverGetPosition: `api/${customer_name}/approver-register/get-position`,
    ApplicantListSearch: `api/${customer_name}/approver-register/search-applicant-list`,
    ApproverListSearch: `api/${customer_name}/approver-register/search-approver-list`,
    ApproverRegisterSave: `api/${customer_name}/approver-register/save`,
    ApproverRegisterUpdate: `api/${customer_name}/approver-register/`,
    ApproverGetApproverSetting: `api/${customer_name}/approver-register/check-approver-setting`,
    /**Approver Register End */

    /**Salary Calculate Setting*/
    SalaryCalculateSettingDetail: `api/${customer_name}/salary-calculate-setting/`,
    SalaryCalculateSettingGetCalculateAllSalary: `api/${customer_name}/salarycalculate-setting/calculate-all-salary`,
    /**Salary Calculate Setting End*/
    /**Employee Data Entry Start */
    EmployeeDataEntrySearch : `api/${customer_name}/employee-data-entry/search`,
    EmployeeDataEntryExportPersonalDataEntry : `api/${customer_name}/employee-data-entry/personaldataentry-exportexcel`,
    EmployeeDataEntryExportFamilyDataEntry : `api/${customer_name}/employee-data-entry/familydataentry-exportexcel`,
    EmployeeDataEntryExportSalaryDataEntry : `api/${customer_name}/employee-data-entry/salarydataentry-exportexcel`,
    EmployeeDataEntryImportPersonalDataEntry : `api/${customer_name}/employee-data-entry/personaldataentry-importexcel`,
    EmployeeDataEntryImportFamilyDataEntry :`api/${customer_name}/employee-data-entry/familydataentry-importexcel`,
    EmployeeDataEntryImportSalaryDataEntry:`api/${customer_name}/employee-data-entry/salarydataentry-importexcel`,
    /**Employee Data Entry End */

    /*Employee Deduction start*/
    employeeDeductionChangeCategory: `api/${customer_name}/employee-deduction-registration/get-deduction-name-by-category`,
    employeeDeductionChangeName: `api/${customer_name}/employee-deduction-registration/get-deduction-detail`,
    employeeDeductionRegister : `api/${customer_name}/employee-deduction-registration/`,
    employeeDeductionRegisterSave : `api/${customer_name}/employee-deduction-registration/save`,
    employeeDeductionRegistrationOverwriteSave: `api/${customer_name}/employee-deduction-registration/overwritesave`,
    employeeDeductionName: `api/${customer_name}/employee-deduction-registration/get-deduction-name`,
    employeeDeductionCategory: `api/${customer_name}/employee-deduction-registration/get-deduction-category`,
    employeeDeductionSearch: `api/${customer_name}/employee-deduction-registration/search`,
    employeeDeductionListSearch: `api/${customer_name}/employee-deduction-list/search`,
    employeeDeductionListDelete: `api/${customer_name}/employee-deduction-list/`,

    /*Employee Deduction end*/

    /**employee shift assign list*/
    EmployeeShiftAssignList:`api/${customer_name}/employee-shift-assign-list`,
    EmployeeShiftAssignListSearch:`api/${customer_name}/employee-shift-assign-list/search`,
    EmployeeShiftAssignListExport:`api/${customer_name}/employeeshiftassign-list/export-employee-shift-assign`,
    EmployeeShiftAssignListShiftName: `api/${customer_name}/employeeshiftassign-list/get-shift-name`,
    EmployeeShiftAssignListGetViewPermission:`api/${customer_name}/employeeshiftassign-list/get_view_permission`,
    /**employee shift assign list*/

    /**Individual Working Hour Check */
    GetViewPermission : `api/${customer_name}/individual-working-hour-check/getviewpermission`,
    SearchWorkingHour : `api/${customer_name}/individual-working-hour-check/search`,
    GetDateRange: `api/${customer_name}/individual-working-hour-check/getrangedatesearch`,
    //SearchWorkingHour : `api/${customer_name}/individual-working-hour-check/search`,
    /**Individual Working Hour Check  */

    /** Perfect For Attendance start */
    ReportForAttendance: `api/${customer_name}/report-for-attendance`,
    ReportForAttendanceExport: `api/${customer_name}/report-for-attendance/export`,
    /** Perfect For Attendance end */

    /**Report for payroll */
    ReportForPayroll: `api/${customer_name}/report-for-payroll`,
    ReportForPayrollExport :`api/${customer_name}/report-for-payroll/export`,
    /**Mail Send For Bonus Pay Slip*/
    BonusPayslipMailSentSearch:`api/${customer_name}/bonus-pay-slip-mail-sent/search`,
    BonusPayslipMailSentExport:`api/${customer_name}/bonuspay-slip-mail-sent/export-bonus-pay-slip`,
    BonusPayslipMailSent:`api/${customer_name}/bonuspay-slip-mail-sent/sent-mail-bonus-pay-slip`,
    /* API for Bugget Year Income Tax */
    BudgetYearIncomeTaxGetEmployeeID: `api/${customer_name}/employee/id-autocomplete-search`,
    BudgetYearIncomeTaxGetEmployeeCode: `api/${customer_name}/employee/code-autocomplete-search`,
    BudgetYearIncomeTaxGetEmployeeName: `api/${customer_name}/employee/name-autocomplete-search`,
    BudgetYearIncomeTaxGetEmployeeResult: `api/${customer_name}/employee/autocomplete-result`,
    BudgetYearIncomeTaxSearch: `api/${customer_name}/budget-year-income-tax-salary/search`,
    /* API for Bugget Year Income Tax */

    /** Department */
    getAllDepartment:                            `api/${customer_name}/department/get-all-department`,
    /**Check In Check Out List Start */
    CheckInCheckOutListGetEmployeeInfor: `api/${customer_name}/check-in-check-out-list/get-employee-info`,
    CheckInCheckOutListSearch: `api/${customer_name}/check-in-check-out-list/search`,
    CheckInCheckOutListConfirm: `api/${customer_name}/check-in-check-out-list/confirm`,
    CheckInCheckOutListGetEmployeeId: `api/${customer_name}/employee/id-autocomplete-search`,
    CheckInCheckOutListGetEmployeeCode: `api/${customer_name}/employee/code-autocomplete-search`,
    CheckInCheckOutListGetEmployeeName: `api/${customer_name}/employee/name-autocomplete-search`,
    CheckInCheckOutListAutocompleteResult: `api/${customer_name}/employee/autocomplete-result`,
    CheckInCheckOutListDelete: `api/${customer_name}/check-in-check-out-list/`,
    CheckInCheckOutListReject: `api/${customer_name}/check-in-check-out-list/reject`,
    /**Check In Check Out List End */

    /** Check In Check Out Request Start */
    CheckInCheckOutRequestGetDetailEmp:                      `api/${customer_name}/check-in-check-out-request/`,
    CheckInCheckOutRequestSearch:                            `api/${customer_name}/check-in-check-out-request/approver-on-department-data`,
    CheckInCheckOutRequestClockInOut:                        `api/${customer_name}/check-in-check-out-request/clock-in-out`,
    CheckInCheckOutRequestLoadApproverData:                  `api/${customer_name}/check-in-check-out-request/get-approver-data`,
    /** Check In Check Out Request End */

    /** Employee Info Detail Start */
    EmployeeInfoDetailGetDetail:                             `api/${customer_name}/employee-information-detail/`,
    EmployeeInfoDetailDownloadFile:                           `api/${customer_name}/employee-information-detail/download`,
    /** Employee Info Detail End */
    /**Checkin Checkout Detail Information Start */

    CheckinCheckoutDetailInformationDetail : `api/${customer_name}/check-in-check-out-detail-information/`,
    CheckinCheckoutDetailInformationConfirm : `api/${customer_name}/check-in-check-out-detail-information/confirm`,
    CheckinCheckoutDetailInformationReject: `api/${customer_name}/check-in-check-out-detail-information/reject`,

     /**Checkin Checkout Detail Information End */

      /**Report Transfer Salary Pay Start */
    ReportForTransferSalaryPayGetCurrency : `api/${customer_name}/report-for-transfer-salary-pay/get-currencies`,
    ReportForTransferSalaryPayGetPaymentName :`api/${customer_name}/report-for-transfer-salary-pay/get-payment-list`,
    ReportForTransferSalaryPaySearch:`api/${customer_name}/report-for-transfer-salary-pay/search`,
    ReportForTransferSalaryDownload :`api/${customer_name}/report-for-transfer-salary-pay/download`,

      /**Report Transfer Salary Pay End */
    businessTripAdjustmentRequest : `api/${customer_name}/business-trip-adjustment-request/`,
    businessTripAdjustmentRequestSave : `api/${customer_name}/businesstrip-adjustment-request/save`,
    businessTripAdjustmentRequestUpdate : `api/${customer_name}/businesstrip-adjustment-request/update`,
    testAllowance: `api/${customer_name}/businesstrip-adjustment-request/get-allowance`,
    businessTripAdjustmentRequestSearchApprover: `api/${customer_name}/businesstrip-adjustment-request/search-approver`,
    businessTripAdjustmentRequestGetPoisionRank : `api/${customer_name}/businesstrip-adjustment-request/get-position-rank`,
    /**Buniness Trip Request */
    businessTripRequestGetAllowance:`api/${customer_name}/businesstrip-request/get-allowance`,
    businessTripRequestGetCurrency:`api/${customer_name}/businesstrip-request/get-currency`,
    businessTripRequestGetApprover:`api/${customer_name}/businesstrip-request/search-approver`,
    businessTripRequestGetViewPermisstion:`api/${customer_name}/businesstrip-request/get-view-permission`,
    businessTripRequestUpdate:`api/${customer_name}/business-trip-request/update`,
    businessTripRequestSave:`api/${customer_name}/business-trip-request/save`,
    businessTripRequestDetail:`api/${customer_name}/business-trip-request`,
    businessTripRequestGetTripType:`api/${customer_name}/business-trip-request/get-trip-type`,
    businessTripRequestGetAddtional:`api/${customer_name}/businesstrip-request/get-advance-additional`,
    businessTripRequestGetPoisionRank:`api/${customer_name}/businesstrip-request/get-position-rank`,
    businessTripRequestGetApproverData:`api/${customer_name}/businesstrip-request/get-approver-data`,

    /**Business Trip Detail */
    BusinessTripDetail:`api/${customer_name}/business-trip-request-detail`,
    BusinessTripDetailConfirm:`api/${customer_name}/business-trip-request-detail`,
    BusinessTripDetailReject:`api/${customer_name}/business-trip-request-detail`,
    BusinessTripDetailExport:`api/${customer_name}/business-trip-request-detail/export`,
    CurrenciesBusinessTripDetail:`api/${customer_name}/businesstrip-request/get-currency`,
    BusinessTripDetailExportFile:`api/${customer_name}/business-trip-request-detail/download-trip-attach`,
    BusinessTripDetailExportFileDetail:`api/${customer_name}/business-trip-request-detail/download-trip-detail-attach`,

      /**Business Trip List Start */
    BusinessTripListSearch: `api/${customer_name}/business-trip-list/search`,
    BusinessTripListGetEmployeeId: `api/${customer_name}/employee/id-autocomplete-search`,
    BusinessTripListGetEmployeeCode: `api/${customer_name}/employee/code-autocomplete-search`,
    BusinessTripListGetEmployeeName: `api/${customer_name}/employee/name-autocomplete-search`,
    BusinessTripListAutocompleteResult: `api/${customer_name}/employee/autocomplete-result`,
    BusinessTripListGetEmployeeInfo: `api/${customer_name}/business-trip-list/get-employee-info`,
    BusinessTripListGetBzTripHistory: `api/${customer_name}/business-trip-list/get-biz-trip-history`,
    BusinessTripListDelete: `api/${customer_name}/business-trip-list/`,
    BusinessTripListConfirm: `api/${customer_name}/business-trip-list/confirm`,
    BusinessTripListReject: `api/${customer_name}/business-trip-list/reject`,
    BusinessTripListBzTripHistory: `api/${customer_name}/business-trip-list/get-bz-trip-history`,
    /**Business Trip List End */

    /*Expense Request Start */
    ExpenseRequestGetViewPermission:                `api/${customer_name}/expense-request/get-view-permission`,
    ExpenseRequestGetExpenseItem:                   `api/${customer_name}/expense-request/get-expense-items`,
    ExpenseRequestGetExpenseCategory:               `api/${customer_name}/expense-request/get-expense-categories`,
    ExpenseRequestGetCurrencies:                    `api/${customer_name}/expense-request/get-currencies`,
    ExpenseRequestGetExpenseAdvanceAdditional:      `api/${customer_name}/expense-request/get-expense-advance-additional`,
    ExpenseRequestSearchApprover:                   `api/${customer_name}/expense-request/approver-on-department-data`,
    ExpenseRequestItemsRegistration:                `api/${customer_name}/expense-request/save-expense-item`,
    ExpenseRequestSaveRequest:                      `api/${customer_name}/expense-request/save`,
    ExpenseRequestGetDetail:                        `api/${customer_name}/expense-request/get-detail`,
    ExpenseRequestUpdateRequest:                    `api/${customer_name}/expense-request/`,
    ExpenseRequestGetPositionRank:                  `api/${customer_name}/expense-request/get-position-rank`,
    ExpenseRequestLoadApproverData:                 `api/${customer_name}/expense-request/get-approver-data`,
    /*Expense Request End */

    /**Expense Ajustment Detail Start */
    ExpenseAjustmentDetailGetCurrency:`api/${customer_name}/`,
    ExpenseAjustmentDetail:`api/${customer_name}/expense-adjustment-detail/get-detail`,
    ExpenseAjustmentDetailHistory:`api/${customer_name}/expense-adjustment-detail/get-detail-history`,
    ExpenseAjustmentDetailExport:`api/${customer_name}/expense-adjustment-detail/export`,
    ExpenseAjustmentDetailDownloadExpenseAjustmentAttach:`api/${customer_name}/expense-adjustment-detail/download`,
    /**Expense Ajustment Detail End */

    /** Business Trip Adjustment Detail Start */
    businessTripAdjustmentRequestGetCurrency:`api/${customer_name}/businesstrip-adjustment-request/get-currency`,
    businessTripAdjustmentGetDetail:`api/${customer_name}/business-trip-adjustment-detail/get-detail`,
    businessTripAdjustmentGetDetailHistory:`api/${customer_name}/business-trip-adjustment-detail/get-detail-history`,
    businessTripAdjustmentDetailConfirm:`api/${customer_name}/business-trip-list/confirm`,
    businessTripAdjustmentDetailReject:`api/${customer_name}/business-trip-list/reject`,
    businessTripAdjustmentDetailExport:`api/${customer_name}/business-trip-adjustment-detail/export`,
    businessTripAdjustmentDetailDownload:`api/${customer_name}/business-trip-adjustment-detail/download/`,
    /** Business Trip Adjustment Detail End */

    /** Expense Adjustment Request */
    expenseadjustmentrequestGetDetail : `api/${customer_name}/expense-adjustment-request/`,
    expenseadjustmentrequestSaveItem: `api/${customer_name}/expense-request/save-expense-item`,
    expenseadjustmentrequestGetItem: `api/${customer_name}/expenseadjustment-request/get-expense-item`,
    expenseadjustmentrequestGetExpenseCategory: `api/${customer_name}/expenseadjustment-request/get-expense-category`,
    expenseadjustmentrequestGetCurrency: `api/${customer_name}/expenseadjustment-request/get-currency`,
    expenseadjustmentrequestSearch: `api/${customer_name}/expenseadjustment-request/search-approver`,
    expenseadjustmentrequestGetPosition: `api/${customer_name}/expenseadjustment-request/get-position-rank`,
    expenseadjustmentrequestSave: `api/${customer_name}/expense-adjustment-request/save`,
    expenseadjustmentrequestUpdate: `api/${customer_name}/expense-adjustment-request/update`,
    expenseadjustmentrequestApproverData: `api/${customer_name}/expenseadjustment-request/get-approver-data`,

    /**Summarize Total Amount Prepare */
    SummarizeTotalAmountPrepareGetAllDepartment:`api/${customer_name}/department/get-all-department`,
    SummarizeTotalAmountPrepareGetAllPosition:`api/${customer_name}/position/get-all-position`,
    SummarizeTotalAmountPrepareGetCurrency:`api/${customer_name}/summarize-total-amount-prepare/get-expense-currency`,
    SummarizeTotalAmountPrepareGetViewPermission:`api/${customer_name}/summarize-total-amount-prepare/get-view-permission`,
    SearchSummarizeTotalAmountPrepare:`api/${customer_name}/summarize-total-amount-prepare/search`,
    SummarizeTotalAmountPrepareConfirm:`api/${customer_name}/summarize-total-amount-prepare/confirm`,
    /**Summarize Total Amount Prepare */

    /**Summarize Total Amount Prepare List*/
    SearchSummarizeTotalAmountPrepareList:`api/${customer_name}/summarize-total-amount-prepare-list/search`,
    SummarizeTotalAmountPrepareListGetCurrency:`api/${customer_name}/summarize-total-amount-prepare/get-expense-currency`,
    DeleteSummarizeTotalAmountPrepareList:`api/${customer_name}/summarize-total-amount-prepare-list/`,
    SummarizeTotalAmountPrepareListGetPositonRankByZero:`api/${customer_name}/summarize-total-amount-prepare/get-position-rank`,
    /**Summarize Total Amount Prepare List */

    /**Business Trip/Expense Dashboard*/
    BusinessExpenseDashboard: `api/${customer_name}/dashboard/business-expense-list`,
    BusinessExpenseDashboardCurrency: `api/${customer_name}/dashboard/get-currency`,

     /**Expense List Start */
     ExpenseListSearch: `api/${customer_name}/expense-list/search`,
     ExpenseListGetEmployeeInfo: `api/${customer_name}/expense-list/get-employee-info`,
     ExpenseListGetBzTripHistory: `api/${customer_name}/expense-list/get-biz-trip-history`,
     ExpenseListDelete: `api/${customer_name}/expense-list/`,
     ExpenseListConfirm: `api/${customer_name}/expense-list/confirm`,
     ExpenseListReject: `api/${customer_name}/expense-list/reject`,
     ExpenseListBzTripHistory: `api/${customer_name}/expense-list/get-expense-history`,
     /**Expense List End */
    /**Expense Detail Start */
    ExpenseDetailGetDetail : `api/${customer_name}/expense-detail/get-detail`,
    ExpenseDetailDownloadFile : `api/${customer_name}/expense-detail/download`,
    ExpenseDetailExportFile: `api/${customer_name}/expense-detail/export`,
    ExpenseDetailConfirm : `api/${customer_name}/expense-list/confirm`,
    ExpenseDetailReject: `api/${customer_name}/expense-list/reject`,
    /**Expense Detail End */

    /**Employee Late Absent Leave List Start */
    EmployeeLateAbsentLeaveListSearch: `api/${customer_name}/employee-late-absent-leave-list/search`,
    EmployeeLateAbsentLeaveListExport: `api/${customer_name}/employee-late-absent-leave-list/export`,
    /**Employee Late Absent Leave List End */
}
