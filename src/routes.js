import React from "react";

// ERP
const Dashboard = React.lazy(() => import("./views/erp/dashboard/DashboardIndex"));

const EmpProfile = React.lazy(() =>
  import("./views/erp/emp-management/emp-profile/EmpProfileIndex")
);
const EmpRegistration = React.lazy(() =>
  import("./views/erp/emp-management/emp-registration/EmpRegistrationIndex")
);
const EmployeeList = React.lazy(() =>
  import("./views/erp/emp-management/emp-list/EmployeeListIndex")
);

const DeptRegister = React.lazy(() =>
  import("./views/erp/department-position-management/department-register/DeptRegisterIndex")
);
const DeptPositionList = React.lazy(() =>
  import(
    "./views/erp/department-position-management/department-position-list/DepartmentAndPositionListIndex"
  )
);
const PositionRegister = React.lazy(() =>
  import("./views/erp/department-position-management/position-register/PositionRegisterIndex")
);
const EmpAssignDepPost = React.lazy(() =>
  import("./views/erp/department-position-management/emp-assign-department-position/EmpAssignDepPostIndex")
);

const RoleRegister = React.lazy(() =>
  import("./views/erp/role-per-management/role-register/RoleRegisterIndex")
);
const RolePerManagement = React.lazy(() =>
  import("./views/erp/role-per-management/role-permission-list/RolePermissionIndex")
);

const AssignRolePermisssion = React.lazy(() =>
  import(
    "./views/erp/role-per-management/role-permission-register/RoleandPermissionRegisterIndex"
  )
);

const NoPermissionPackage = React.lazy(() =>
  import("./views/erp/no-permission-package/NoPermissionPackageIndex")
);

// FOR HR
// DASHBOARD
const HRDashboard = React.lazy(() => import('./views/hr/dashboard/DashboardIndex'));
const AnnouncementRegistration = React.lazy(() => import('./views/hr/dashboard/announcement-registration/AnnouncementRegistrationIndex'));

// PROFILE
const EmployeeInformationDetail = React.lazy(() => import('./views/hr/employee-management/employee-info-detail/EmployeeInfoDetailIndex'));


// SETTING
const PayRollRuleSetup = React.lazy(() => import('./views/hr/settingmenu/payroll-rule-setup/PayRollRuleSetupIndex'));
const PayrollCalculationMethodSetup = React.lazy(() => import('./views/hr/settingmenu/payroll-rule-calculation-method-setup/PayrollRuleCalculationMethodSetupIndex'));
const PayrollCalculationList = React.lazy(() => import('./views/hr/settingmenu/payroll-calculation-list/PayrollCalculationListIndex'));
const SSBCalculationMethodSetup = React.lazy(() => import('./views/hr/settingmenu/ssb-calculation-method-setup/SSBCalculationMethodSetupIndex'));
const SSBCalculationList = React.lazy(() => import('./views/hr/settingmenu/ssb-calculation-list/SSBCalculationListIndex'));
const PerfectAttendanceSetup = React.lazy(() => import('./views/hr/settingmenu/perfect-attendance-setup/PerfectAttendanceSetupIndex'));
const PerfectAttendanceList = React.lazy(() => import('./views/hr/settingmenu/perfect-attendance-setup-list/PerfectAttendanceSetupListIndex'));
const CompanyLeaveSetting = React.lazy(() => import('./views/hr/settingmenu/company-leave-setting/CompanyLeaveSettingIndex'));
const ShiftNormalRuleRegister = React.lazy(() => import('./views/hr/settingmenu/shift-normal-rule-register/ShiftNormalRuleRegisterIndex'));
const ShiftNormalRuleList = React.lazy(() => import('./views/hr/settingmenu/shift-normal-rule-list/ShiftNormalRuleListIndex'));
const AllowanceRegister = React.lazy(() => import('./views/hr/settingmenu/allowance-register/AllowanceRegisterIndex'));
const AllowanceList = React.lazy(() => import('./views/hr/settingmenu/allowance-list/AllowanceListIndex'));
const SuballowanceRegisterList = React.lazy(() => import('./views/hr/settingmenu/sub-allowance-register-list/SubAllowanceRegisterListIndex'));
const EmployeeAllowanceRegistration = React.lazy(() => import('./views/hr/settingmenu/employee-allowance-registration/EmployeeAllowanceRegistrationIndex'));
const EmployeeAllowanceList = React.lazy(() => import('./views/hr/settingmenu/employee-allowance-list/EmployeeAllowanceListIndex'));
const DeductionRegister = React.lazy(() => import('./views/hr/settingmenu/deduction-register/DeductionRegisterIndex'));
const DeductionList = React.lazy(() => import('./views/hr/settingmenu/deduction-list/DeductionListIndex'));
const OvertimeRateSetting = React.lazy(() => import('./views/hr/settingmenu/overtime-rate-setting/OvertimeRateSettingIndex'));
const OvertimeRateList = React.lazy(() => import('./views/hr/settingmenu/overtime-rate-list/OvertimeRateListIndex'));
const EmployeeOvertimeRegistration = React.lazy(() => import('./views/hr/settingmenu/employee-overtime-registration/EmployeeOvertimeRegistrationIndex'));
const EmployeeOvertimeList = React.lazy(() => import('./views/hr/settingmenu/employee-overtime-list/EmployeeOvertimeListIndex'));
const OvertimeNotificationSetup = React.lazy(() => import('./views/hr/settingmenu/overtime-notification-setup/OvertimeNotificationSetupIndex'));
const OvertimeNotificationList = React.lazy(() => import('./views/hr/settingmenu/overtime-notification-list/OvertimeNotificationListIndex'));
const BonusRegister = React.lazy(() => import('./views/hr/settingmenu/bonus-register/BonusRegisterIndex'));
const BonusRateList = React.lazy(() => import('./views/hr/settingmenu/bonus-rate-list/BonusRateListIndex'));
const BasicSalaryRegister = React.lazy(() => import('./views/hr/settingmenu/basic-salary-register/BasicSalaryRegisterIndex'));
const BasicSalaryList = React.lazy(() => import('./views/hr/settingmenu/basic-salary-list/BasicSalaryListIndex'));
const RoleAndPermissionRegistration = React.lazy(() => import('./views/hr/settingmenu/role-and-permission-registration/RoleAndPermissionRegistrationIndex'));
const SalaryTransferSettingByGroup = React.lazy(() => import('./views/hr/settingmenu/salary-transfer-setting-by-group/SalaryTransferSettingByGroupIndex'));
const SalaryTransferSettingList = React.lazy(() => import('./views/hr/settingmenu/salary-transfer-setting-list/SalaryTransferSettingListIndex'));
const EmployeeRoleRegistration = React.lazy(() => import('./views/hr/settingmenu/employee-role-registration/EmployeeRoleRegistrationIndex'));
const EmployeeDeductionList = React.lazy(() => import('./views/hr/settingmenu/employee-deduction-list/EmployeeDeductionListIndex'));
const EmployeeDeductionRegistration = React.lazy(() => import('./views/hr/settingmenu/employee-deduction-registration/EmployeeDeductionRegistrationIndex'));

/**  Employee Management */
const EmployeeLists = React.lazy(() => import('./views/hr/employee-management/employee-list/EmployeeListIndex'));
const EmployeePersonal = React.lazy(() => import('./views/hr/employee-management/employee-personal/EmployeePersonalIndex'));
const EmployeeDataEntry = React.lazy(() => import('./views/hr/employee-management/employee-data-entry/EmployeeDataEntryIndex'));
const ApproverRegister = React.lazy(() => import('./views/hr/employee-management/approver-register/ApproverRegisterIndex'));
const ApproverList = React.lazy(() => import('./views/hr/employee-management/approver-list/ApproverListIndex'));
const LogHistroyList = React.lazy(() => import('./views/hr/employee-management/log-history-list/LogHistoryListIndex'));
const SalaryList = React.lazy(() => import('./views/hr/employee-management/employee-salary-list/EmployeeSalaryListIndex'));
const SalaryTransferSetting = React.lazy(() => import('./views/hr/employee-management/salary-transfer-setting/SalaryTransferSettingIndex'));
const SalaryCalculateSetting = React.lazy(() => import('./views/hr/employee-management/salary-calculate-setting/SalaryCalculateSettingIndex'));
const EmployeeLeaveSetting = React.lazy(() => import('./views/hr/employee-management/employee-leave-setting/EmployeeLeaveSettingIndex'));
const FamilyMemberRegisterList = React.lazy(() => import('./views/hr/employee-management/family-member-register-list/FamilyMemberRegisterListIndex'));


/** ATTENDANCE MANAGEMENT */
const DeleteEmployeeAttendance = React.lazy(() => import('./views/hr/attendance-management/delete-employee-attendance/DeleteEmployeeAttendanceIndex'));
const AttendanceCalendar = React.lazy(() => import('./views/hr/attendance-management/attendance-calendar/AttendanceCalendarIndex'));
const EmployeeAttendanceList = React.lazy(() => import('./views/hr/attendance-management/employee-attendance-list/EmployeeAttendanceListIndex'));

/** ADMINSTRATION */
const OvertimeSetMinuteRange = React.lazy(() => import('./views/hr/administration/overtime-set-minute-range/OvertimeSetMinuteRangeIndex'));
const PaymentNameRegister = React.lazy(() => import('./views/hr/administration/payment-name-register/PaymentNameRegisterIndex'));
const LeaveTypeRegistration = React.lazy(() => import('./views/hr/administration/leave-type-registration/LeaveTypeRegistrationIndex'));
const HolidaySetup = React.lazy(() => import('./views/hr/administration/holiday-setup/HolidaySetupIndex'));

/** SALARY CALCULATION */
const YearlyBonusRegistration = React.lazy(() => import('./views/hr/salary-calculation/yearly-bonus-registration/YearlyBonusRegistrationIndex'));
const YearlyBonusRegistrationList = React.lazy(() => import('./views/hr/salary-calculation/yearly-bonus-registration-list/YearlyBonusRegistrationListIndex'));
const BankSalaryPay = React.lazy(() => import('./views/hr/salary-calculation/bank-salary-pay/BankSalaryPayIndex'));
const PayslipMailSent = React.lazy(() => import('./views/hr/salary-calculation/payslip-mail-sent/PayslipMailSentIndex'));
const SalaryCalculation1 = React.lazy(() => import('./views/hr/salary-calculation/salary-calculation1/SalaryCalculation1Index'));
const SalaryCalculation2 = React.lazy(() => import('./views/hr/salary-calculation/salary-calculation2/SalaryCalculation2Index'));
const SalaryCalculation3 = React.lazy(() => import('./views/hr/salary-calculation/salary-calculation3/SalaryCalculation3Index'));
const BankErrorCheckList = React.lazy(() => import('./views/hr/salary-calculation/bank-error-check-list/BankErrorCheckListIndex'));
const ConfirmSalaryCalculation = React.lazy(() => import('./views/hr/salary-calculation/confirm-salary-calculation/ConfirmSalaryCalculationIndex'));
// const IndividualDailyDeduction = React.lazy(() => import('./views/hr/salary-calculation/'));
const BonusBankSalaryPay = React.lazy(() => import('./views/hr/salary-calculation/bonus-bank-salary-pay/BonusBankSalaryPayIndex'));
const BonusPayslipMailSend = React.lazy(() => import('./views/hr/salary-calculation/bonus-payslip-mail-sent/BonusPayslipMailSentIndex'));


/** OPERATION REQUEST FOR ATTENDANCE */
const ForgetCardDetail = React.lazy(() => import('./views/hr/operation-request-for-attendance/forget-card-detail/ForgetCardDetailIndex'));
const EmployeeLeaveDetail = React.lazy(() => import('./views/hr/operation-request-for-attendance/employee-leave-detail/EmployeeLeaveDetailIndex'));
const AllowanceRequestDetail = React.lazy(() => import('./views/hr/operation-request-for-attendance/allowance-request-detail/AllowanceRequestDetailIndex'));
const AllowanceRequest = React.lazy(() => import('./views/hr/operation-request-for-attendance/allowance-request/AllownaceRequestIndex'));
const AllowanceRequestList = React.lazy(() => import('./views/hr/operation-request-for-attendance/allowance-request-list/AllowanceRequestListIndex'));
const AnnouncementList = React.lazy(() => import('./views/hr/operation-request-for-attendance/announcement-list/AnnouncementListIndex'));
const ForgetCardEntry = React.lazy(() => import('./views/hr/operation-request-for-attendance/forget-card-request/ForgetCardRequestIndex'));
const ForgetCardList = React.lazy(() => import('./views/hr/operation-request-for-attendance/forget-card-list/ForgetCardListIndex'));
const EmployeeLeaveRequest = React.lazy(() => import('./views/hr/operation-request-for-attendance/employee-leave-request/EmployeeLeaveRequestIndex'));
const EmployeeLeaveList = React.lazy(() => import('./views/hr/operation-request-for-attendance/employee-leave-list/EmployeeLeaveListIndex'));
const EmployeeShiftAssignEntry = React.lazy(() => import('./views/hr/operation-request-for-attendance/employee-shift-assign-entry/EmployeeShiftAssignEntryIndex'));
const EmployeeShiftAssignList = React.lazy(() => import('./views/hr/operation-request-for-attendance/employee-shift-assign-list/EmployeeShiftAssignListIndex'));
const IndividualWorkingHourCheck = React.lazy(() => import('./views/hr/operation-request-for-attendance/individual-working-hour-check/IndividualWorkingHourCheckIndex'));
const CheckInCheckOutRequest = React.lazy(() => import('./views/hr/operation-request-for-attendance/checkin-checkout-request/CheckInCheckOutRequestIndex'));
const CheckInCheckOutList = React.lazy(() => import('./views/hr/operation-request-for-attendance/checkin-checkout-list/CheckInCheckOutListIndex'));
const CheckinCheckoutDetailInformation = React.lazy(() => import('./views/hr/operation-request-for-attendance/checkin-checkout-detail-information/CheckinCheckoutDetailInformationIndex'));


/** OPERATION REQUEST FOR SALARY */
const AfterOvertimeRequest = React.lazy(() => import('./views/hr/operation-request-for-salary/after-overtime-request/AfterOvertimeRequestIndex'));
const AfterOvertimeRequestList = React.lazy(() => import('./views/hr/operation-request-for-salary/after-overtime-request-list/AfterOvertimeRequestListIndex'));
const AfterOvertimeRequestDetail = React.lazy(() => import('./views/hr/operation-request-for-salary/after-overtime-request-detail/AfterOvertimeRequestDetailIndex'));
const IndividualTaxCalculationList = React.lazy(() => import('./views/hr/operation-request-for-salary/individual-tax-calculation-list/IndividualTaxCalculationListIndex'));
const EmployeeDeductionRequest = React.lazy(() => import('./views/hr/operation-request-for-salary/employee-deduction-request/EmployeeDeductionRequestIndex'));
const EmployeeDeductionRequestList = React.lazy(() => import('./views/hr/operation-request-for-salary/employee-deduction-request-list/EmployeeDeductionRequestList'));


/** REPORT */
const TotalSSBDownload = React.lazy(() => import('./views/hr/report/total-ssb-download/TotalSSBDownloadIndex'));
// const EmployeeLeaveAbsentList = React.lazy(() => import('./views/hr/report/'));
const BudgetYearIncomeTaxSalary = React.lazy(() => import('./views/hr/report/budget-year-income-tax/BudgetYearIncomeTaxIndex'));
const ReportForTransferSalaryPay = React.lazy(() => import('./views/hr/report/report-for-transfer-salary-pay/ReportForTransferSalaryPayIndex'));
const ReportForPayroll = React.lazy(() => import('./views/hr/report/report-for-payroll/ReportForPayrollIndex'));
const ReportForAttendance = React.lazy(() => import('./views/hr/report/report-for-attendance/ReportForAttendanceIndex'));
const EmployeeLateAbsentLeaveList = React.lazy(() => import('./views/hr/report/employee-late-absent-leave-list/EmployeeLateAbsentLeaveListIndex'));
/** EXPENSE */
const BusinessTripList = React.lazy(() => import('./views/hr/expense/business-trip-list/BusinessTripListIndex'));
const BusinessTripDetail = React.lazy(() => import('./views/hr/expense/business-trip-detail/BusinessTripDetailIndex'));
const BusinessTripRequest = React.lazy(() => import('./views/hr/expense/business-trip-request/BusinessTripRequestIndex'));
const ExpenseDetail = React.lazy(() => import('./views/hr/expense/expense-detail/ExpenseDetailIndex'));
const ExpenseRequest = React.lazy(() => import('./views/hr/expense/expense-request/ExpenseRequestIndex'));
const ExpenseAdjustmentRequest = React.lazy(() => import('./views/hr/expense/expense-adjustment-request/ExpenseAdjustmentRequestIndex'));
const ExpenseAdjustmentDetail = React.lazy(() => import('./views/hr/expense/expense-adjustment-detail/ExpenseAjustmentDetailIndex'));
const SummarizeTotalAmountPrepare = React.lazy(() => import('./views/hr/expense/summarize-total-amount-prepare/SummarizeTotalAmountPrepareIndex'));
const BusinessTripAdjustmentDetail = React.lazy(() => import('./views/hr/expense/business-trip-adjustment-detail/BusinessTripAdjustmentDetailIndex'));
const BusinessTripAdjustmentRequest = React.lazy(() => import('./views/hr/expense/business-trip-adjustment-request/BusinessTripAdjustmentRequestIndex'));
const SummarizeTotalAmountPrepareList = React.lazy(() => import('./views/hr/expense/summarize-total-amount-prepare-list/SummarizeTotalAmountPrepareListIndex'));
// const ReportForBankTransferOfExpense = React.lazy(() => import('./views/hr/expense/'));
const ExpenseList = React.lazy(() => import('./views/hr/expense/expense-list/ExpenseListIndex'));
const BusinessTripExpenseDashboard = React.lazy(() => import('./views/hr/expense/business-trip-expense-dashboard/BusinessTripExpenseDashboardIndex'));

//use customize customer name 
let customer_name = window.location.href.split("/")[3];

const routes = [

  { path: `/${customer_name}/erp/Dashboard`, name: "Dashboard", component: Dashboard },

  // ERP
  {
    path: `/${customer_name}/erp/EmployeeManagement`,
    name: "Employee Management",
    component: EmpProfile,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/EmployeeManagement/EmployeeProfile`,
    name: "Employee Profile",
    component: EmpProfile,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/EmployeeManagement/EmployeeRegistration`,
    name: "Employee Registration",
    component: EmpRegistration,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/EmployeeManagement/EmployeeList`,
    name: "Employee List",
    component: EmployeeList,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/Department&PositionManagement`,
    name: "Department & Position Management",
    component: DeptRegister,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/Department&PositionManagement/Department&PositionList`,
    name: "Department & Position List",
    component: DeptPositionList,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/Department&PositionManagement/DepartmentRegister`,
    name: "Department Register",
    component: DeptRegister,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/Department&PositionManagement/PositionRegister`,
    name: "Position Register",
    component: PositionRegister,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/Department&PositionManagement/EmployeeAssignDepartment&Position`,
    name: "Employee Assign Department and Position",
    component: EmpAssignDepPost,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/RoleandPermissionManagement`,
    name: "Role and Permission Management",
    exact: true,
  },
  {
    path: `/${customer_name}/erp/RoleandPermissionManagement/RoleRegister`,
    name: "Role Register",
    component: RoleRegister,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/RoleandPermissionManagement/RoleandPermissionList`,
    name: "Role and Permission Management",
    component: RolePerManagement,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/RoleandPermissionManagement/UserRoleandPermissionRegister`,
    name: "User Role and Permission Register",
    component: AssignRolePermisssion,
    exact: true,
  },
  {
    path: `/${customer_name}/erp/NoPermissionPackage/`,
    name: "No Permission Package",
    component: NoPermissionPackage,
    exact: true,
  },

  // FOR HR
  // DASHBOARD
  { path: `/${customer_name}/hr`, exact: true, name: 'HR' },
  { path: `/${customer_name}/hr/dashboard`, exact: true, name: 'Dashboard', component: HRDashboard },
  { path: `/${customer_name}/hr/dashboard/announcement-register`, exact: true, name: 'Announcement Registration', component: AnnouncementRegistration },

  // PROFILE
  { path: `/${customer_name}/hr/profile`, name: 'Profile', exact: true },
  { path: `/${customer_name}/hr/profile/employee-information-detail`, name: 'Employee Information Detail', component: EmployeeInformationDetail, exact: true },

  // SETTING
  { path: `/${customer_name}/hr/setting`, name: 'Setting', exact: true },
  { path: `/${customer_name}/hr/setting/payroll-rule-setup`, name: 'PayRoll Rule Setup', component: PayRollRuleSetup, exact: true },
  { path: `/${customer_name}/hr/setting/employee-overtime-registration`, name: 'Employee Overtime Registration', component: EmployeeOvertimeRegistration, exact: true },
  { path: `/${customer_name}/hr/setting/employee-overtime-list`, name: 'Employee Overtime List', component: EmployeeOvertimeList, exact: true },
  { path: `/${customer_name}/hr/setting/payroll-calculation-method-setup`, name: 'Payroll Calculation Method Setup', component: PayrollCalculationMethodSetup, exact: true },
  { path: `/${customer_name}/hr/setting/payroll-calculation-list`, name: 'Payroll Calculation List', component: PayrollCalculationList, exact: true },
  { path: `/${customer_name}/hr/setting/ssb-calculation-method-setup`, name: 'SSB Calculation Method Setup', component: SSBCalculationMethodSetup, exact: true },
  { path: `/${customer_name}/hr/setting/ssb-calculation-list`, name: 'SSB Calculation List', component: SSBCalculationList, exact: true },
  { path: `/${customer_name}/hr/setting/perfect-attendance-setup`, name: 'Perfect Attendance Setup', component: PerfectAttendanceSetup, exact: true },
  { path: `/${customer_name}/hr/setting/perfect-attendance-list`, name: 'Perfect Attendance List', component: PerfectAttendanceList, exact: true },
  { path: `/${customer_name}/hr/setting/company-leave-setting`, name: 'Company Leave Setting', component: CompanyLeaveSetting, exact: true },
  { path: `/${customer_name}/hr/setting/shift-normal-rule-register`, name: 'Shift Normal Rule Register', component: ShiftNormalRuleRegister, exact: true },
  { path: `/${customer_name}/hr/setting/shift-normal-rule-list`, name: 'Shift Normal Rule List', component: ShiftNormalRuleList, exact: true },
  { path: `/${customer_name}/hr/setting/allowance-register`, name: 'Allowance Register', component: AllowanceRegister, exact: true },
  { path: `/${customer_name}/hr/setting/allowance-list`, name: 'Allowance List', component: AllowanceList, exact: true },
  { path: `/${customer_name}/hr/setting/suballowance-register-list`, name: 'Suballowance Register List', component: SuballowanceRegisterList, exact: true },
  { path: `/${customer_name}/hr/setting/employee-allowance-registration`, name: 'Employee Allowance Registration', component: EmployeeAllowanceRegistration, exact: true },
  { path: `/${customer_name}/hr/setting/employee-allowance-list`, name: 'Employee Allowance List', component: EmployeeAllowanceList, exact: true },
  { path: `/${customer_name}/hr/setting/deduction-register`, name: 'Deduction Register', component: DeductionRegister, exact: true },
  { path: `/${customer_name}/hr/setting/deduction-list`, name: 'Deduction List', component: DeductionList, exact: true },
  { path: `/${customer_name}/hr/setting/overtime-rate-setting`, name: 'Overtime Rate Setting', component: OvertimeRateSetting, exact: true },
  { path: `/${customer_name}/hr/setting/overtime-rate-list`, name: 'Overtime Rate List', component: OvertimeRateList, exact: true },
  { path: `/${customer_name}/hr/setting/employee-overtime-registration`, name: 'Employee Overtime Registration', component: EmployeeOvertimeRegistration, exact: true },
  { path: `/${customer_name}/hr/setting/employee-overtime-list`, name: 'Employee Overtime List', component: EmployeeOvertimeList, exact: true },
  { path: `/${customer_name}/hr/setting/overtime-notification-setup`, name: 'Overtime Notification Setup', component: OvertimeNotificationSetup, exact: true },
  { path: `/${customer_name}/hr/setting/overtime-notification-list`, name: 'Overtime Notification List', component: OvertimeNotificationList, exact: true },
  { path: `/${customer_name}/hr/setting/bonus-register`, name: 'Bonus Register', component: BonusRegister, exact: true },
  { path: `/${customer_name}/hr/setting/bonus-rate-list`, name: 'Bonus Rate List', component: BonusRateList, exact: true },
  { path: `/${customer_name}/hr/setting/basic-salary-register`, name: 'Basic Salary Register', component: BasicSalaryRegister, exact: true },
  { path: `/${customer_name}/hr/setting/basic-salary-list`, name: 'Basic Salary List', component: BasicSalaryList, exact: true },
  { path: `/${customer_name}/hr/setting/role-and-permission-registration`, name: 'Role And Permission Registration', component: RoleAndPermissionRegistration, exact: true },
  { path: `/${customer_name}/hr/setting/salary-transfer-setting-by-group`, name: 'Salary Transfer Setting By Group', component: SalaryTransferSettingByGroup, exact: true },
  { path: `/${customer_name}/hr/setting/salary-transfer-setting-list`, name: 'Salary Transfer Setting List', component: SalaryTransferSettingList, exact: true },
  { path: `/${customer_name}/hr/setting/employee-role-registration`, name: 'Employee Role Registration', component: EmployeeRoleRegistration, exact: true },
  { path: `/${customer_name}/hr/setting/employee-deduction-list`, name: 'Employee Deduction List', component: EmployeeDeductionList, exact: true },
  { path: `/${customer_name}/hr/setting/employee-deduction-registration`, name: 'Employee Deduction Registration', component: EmployeeDeductionRegistration, exact: true },
  /** EMPLOYEE MANAGEMENT */
  { path: `/${customer_name}/hr/employee-management`, name: 'Employee Management', exact: true },
  { path: `/${customer_name}/hr/employee-management/employee-list`, name: 'Employee List', component: EmployeeLists, exact: true },
  { path: `/${customer_name}/hr/employee-management/employee-personal`, name: 'Employee Personal', component: EmployeePersonal, exact: true },
  { path: `/${customer_name}/hr/employee-management/employee-data-entry`, name: 'Employee Data Entry', component: EmployeeDataEntry, exact: true },
  { path: `/${customer_name}/hr/employee-management/approver-register`, name: 'Approver Register', component: ApproverRegister, exact: true },
  { path: `/${customer_name}/hr/employee-management/approver-list`, name: 'Approver List', component: ApproverList, exact: true },
  { path: `/${customer_name}/hr/employee-management/log-history-list`, name: 'Log Histroy List', component: LogHistroyList, exact: true },
  { path: `/${customer_name}/hr/employee-management/salary-list`, name: 'Salary List', component: SalaryList, exact: true },
  { path: `/${customer_name}/hr/employee-management/salary-calculate-setting`, name: 'SalaryCalculateSetting', component: SalaryCalculateSetting, exact: true },
  { path: `/${customer_name}/hr/employee-management/family-member-register-list`, name: 'Family Member', component: FamilyMemberRegisterList, exact: true },
  { path: `/${customer_name}/hr/employee-management/employee-leave-setting`, name: 'Employee Leave Setting', component: EmployeeLeaveSetting, exact: true },
  { path: `/${customer_name}/hr/employee-management/salary-transfer-setting`, name: 'SalaryTransferSetting', component: SalaryTransferSetting, exact: true },

  /** ATTENDANCE MANAGEMENT */
  { path: `/${customer_name}/hr/attendance-management`, name: 'Attendance Management', exact: true },
  { path: `/${customer_name}/hr/attendance-management/delete-employee-attendance`, name: 'Delete Employee Attendance', component: DeleteEmployeeAttendance, exact: true },
  { path: `/${customer_name}/hr/attendance-management/attendance-calendar`, name: 'Attendance Calendar', component: AttendanceCalendar, exact: true },
  { path: `/${customer_name}/hr/attendance-management/employee-attendance-list`, name: 'Employee Attendance List', component: EmployeeAttendanceList, exact: true },

  /** ADMINSTRATION */
  { path: `/${customer_name}/hr/administration`, name: 'Administration', exact: true },
  { path: `/${customer_name}/hr/administration/overtime-set-minute-range`, name: 'Overtime Set Minute Range', component: OvertimeSetMinuteRange, exact: true},
  { path: `/${customer_name}/hr/administration/payment-name-register`, name: 'Payment Name Register', component: PaymentNameRegister, exact: true },
  { path: `/${customer_name}/hr/administration/leave-type-registration`, name: 'Leave Type Registration', component: LeaveTypeRegistration, exact: true },
  { path: `/${customer_name}/hr/administration/holiday-setup`, name: 'Holiday Setup', component: HolidaySetup, exact: true },

  /** SALARY CALCULATION */
  { path: `/${customer_name}/hr/salary-calculation`, name: 'Salary Calculation', exact: true },
  { path: `/${customer_name}/hr/salary-calculation/yearly-bonus-registration`, name: 'Yearly Bonus Registration', component: YearlyBonusRegistration, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/yearly-bonus-registration-list`, name: 'Yearly Bonus Registration List', component: YearlyBonusRegistrationList, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/bank-salary-pay`, name: 'Bank Salary Pay', component: BankSalaryPay, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/payslip-mail-send`, name: 'PaySlip Mail Send', component: PayslipMailSent, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/salary-calculation-step1`, name: 'Salary Calculation Step1', component: SalaryCalculation1, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/salary-calculation-step2`, name: 'Salary Calculation Step2', component: SalaryCalculation2, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/salary-calculation-step3`, name: 'Salary Calculation Step3', component: SalaryCalculation3, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/bank-salary-error-check-list`, name: 'Bank Salary Error Check List', component: BankErrorCheckList, exact: true },
  { path: `/${customer_name}/hr/salary-calculation/confirm-salary-calculation`, name: 'Confirm Salary Calculation', component: ConfirmSalaryCalculation, exact: true },


  /** OPERATION REQUEST FOR ATTENDANCE */
  { path: `/${customer_name}/hr/operation-request-for-attendance`, name: 'Operation Request', exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/forget-card-request`, name: 'Forget Card Request', component: ForgetCardEntry, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/forget-card-list`, name: 'Forget Card List', component: ForgetCardList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/forget-card-detail-information`, name: 'Forget Card Detail', component: ForgetCardDetail, exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/employee-leave-request`, name: 'Employee Leave Request', component: EmployeeLeaveRequest, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/employee-leave-detail-information`, name: 'Employee Leave Detail', component: EmployeeLeaveDetail, exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/allowance-request`, name: 'Allowance Request', component: AllowanceRequest, exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/allowance-request-list`, name: 'Allowance Request List', component: AllowanceRequestList, exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/allowance-request-detail-information`, name: 'Allowance Request Detail', component: AllowanceRequestDetail, exact: true },
  { path: `/${customer_name}/hr/operation-request-for-attendance/announcement-list`, name: 'Announcement List', component: AnnouncementList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/employee-leave-list`, name: 'Employee Leave List', component: EmployeeLeaveList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/employee-shift-assign-entry`, name: 'Employee Shift Assign Entry', component: EmployeeShiftAssignEntry, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/employee-shift-assign-list`, name: 'Employee Shift Assign List', component: EmployeeShiftAssignList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/individual-working-hour-check`, name: 'Individual Working Hour Check', component: IndividualWorkingHourCheck, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-request`, name: 'Check In Check Out Request', component: CheckInCheckOutRequest, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-list`, name: 'Check In Check Out List', component: CheckInCheckOutList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-detail-information`, name: 'CheckinCheckoutDetailInformation', component: CheckinCheckoutDetailInformation, exact: true },


  /** OPERATION REQUEST FOR SALARY */
  { path: `/${customer_name}/hr/operation-request-for-salary`, name: 'Operation Request for Salary', exact: true },
  { path: `/${customer_name}/hr/operation-request-for-salary/after-overtime-request`, name: 'After Overtime Request', component: AfterOvertimeRequest, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-salary/after-overtime-request-list`, name: 'After Overtime Request List', component: AfterOvertimeRequestList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-salary/after-overtime-request-detail-information`, name: 'After Overtime Request Detail', component: AfterOvertimeRequestDetail, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-salary/individual-tax-calculation-list`, name: 'Individual Tax Calculation List', component: IndividualTaxCalculationList, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-salary/employee-deduction-request`, name: 'Employee Deduction Request', component: EmployeeDeductionRequest, exact: true},
  { path: `/${customer_name}/hr/operation-request-for-salary/employee-deduction-request-list`, name: 'Employee Deduction Request List', component: EmployeeDeductionRequestList, exact: true},
  // { path: `/${customer_name}/hr/salary-calculation/individual-daily-deduction`, name: 'Individual Daily Deduction', component: IndividualDailyDeduction, exact: true},
  { path: `/${customer_name}/hr/salary-calculation/bonus-bank-salary-pay`, name: 'Bonus Bank Salary Pay', component: BonusBankSalaryPay, exact: true},
  { path: `/${customer_name}/hr/salary-calculation/bonus-payslip-mail-send`, name: 'Bonus Payslip Mail Send', component: BonusPayslipMailSend, exact: true},


  /** REPORT */
  { path: `/${customer_name}/hr/report`, name: 'Report', exact: true},
  { path: `/${customer_name}/hr/report/total-ssb-download`, name: 'Total SSB Download', component: TotalSSBDownload, exact: true},
  // { path: `/${customer_name}/hr/report/employee-leave-absent-list`, name: 'Employee Leave Absent List', component: EmployeeLeaveAbsentList, exact: true},
  { path: `/${customer_name}/hr/report/budget-year-income-tax-salary`, name: 'Budget Year Income Tax Salary', component: BudgetYearIncomeTaxSalary, exact: true},
  { path: `/${customer_name}/hr/report/report-for-transfer-salary-pay`, name: 'Report For Transfer Salary Pay', component: ReportForTransferSalaryPay, exact: true},
  { path: `/${customer_name}/hr/report/report-for-payroll`, name: 'Report For Payroll', component: ReportForPayroll, exact: true},
  { path: `/${customer_name}/hr/report/report-for-attendance`, name: 'Report For Attendance', component: ReportForAttendance, exact: true},
  { path: `/${customer_name}/hr/report/employee-leave-absent-list`, name: 'Employee Late Absent Leave List', component: EmployeeLateAbsentLeaveList, exact: true },
  /** EXPENSE */
  { path: `/${customer_name}/hr/expense/business-trip-list`, name: 'BusinessTripList', component: BusinessTripList, exact: true },
  { path: `/${customer_name}/hr/expense/business-trip-request`, name: 'BusinessTripRequest', component: BusinessTripRequest, exact: true },
  { path: `/${customer_name}/hr/expense/business-trip-adjustment-detail`, name: 'Business Trip Adjustment Detail', component: BusinessTripAdjustmentDetail, exact: true },
  { path: `/${customer_name}/hr/expense/business-trip-adjustment-request`, name: 'Business Trip Adjustment Request', component: BusinessTripAdjustmentRequest, exact: true },
  { path: `/${customer_name}/hr/expense/summarize-total-amount-prepare`, name: 'Summarize Total Amount Prepare', component: SummarizeTotalAmountPrepare, exact: true },
  { path: `/${customer_name}/hr/expense/summarize-total-amount-prepare-list`, name: 'Summarize Total Amount Prepare List', component: SummarizeTotalAmountPrepareList, exact: true },
  { path: `/${customer_name}/hr/expense/expense-bank-payment-transaction`, name: 'Expense Bank Payment Transaction', component: SummarizeTotalAmountPrepareList, exact: true },
  { path: `/${customer_name}/hr/expense/expense-bank-error-check-list`, name: 'Expense Bank Error Check List', component: SummarizeTotalAmountPrepareList, exact: true },
  // { path: `/${customer_name}/hr/expense/report-for-bank-transfer-of-expense`, name: 'Report For Bank Transfer Of Expense', component: ReportForBankTransferOfExpense, exact: true },
  { path: `/${customer_name}/hr/expense/expense-detail`, name: 'Expense Detail', component: ExpenseDetail, exact: true },
  { path: `/${customer_name}/hr/expense/business-trip-detail`, name: 'Business Trip Detail', component: BusinessTripDetail, exact: true },
  { path: `/${customer_name}/hr/expense/expense-request`, name: 'Expense Request', component: ExpenseRequest, exact: true },
  { path: `/${customer_name}/hr/expense/expense-list`, name: 'Expense List', component: ExpenseList, exact: true },
  { path: `/${customer_name}/hr/expense/expense-adjustment-request`, name: 'Expense Adjustment Request', component: ExpenseAdjustmentRequest, exact: true },
  { path: `/${customer_name}/hr/expense/expense-adjustment-detail`, name: 'Expense Adjustment Detail', component: ExpenseAdjustmentDetail, exact: true },
  { path: `/${customer_name}/hr/expense/dashboard`, name: 'Dashboard', component: BusinessTripExpenseDashboard, exact: true },
];

export default routes;