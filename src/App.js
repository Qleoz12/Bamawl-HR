import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const ERPMainLayout = React.lazy(() => import("./containers/ERPMainLayout"));
const HRMainLayout = React.lazy(() => import("./containers/HRMainLayout"));

// Pages

const Login = React.lazy(() => import("./views/erp/login/LoginIndex"));
const ForgotPassword = React.lazy(() =>
  import("./views/erp/forgot-password/ForgotPasswordIndex")
);
const ResetPassword = React.lazy(() =>
  import("./views/erp/reset-password/ResetPasswordIndex")
);

const Page404 = React.lazy(() => import("./views/brycen-common/error-page/Page404"));
const Page500 = React.lazy(() => import("./views/brycen-common/error-page/Page500"));
const Page403 = React.lazy(() => import("./views/brycen-common/error-page/Page403"));

const App = () => {
  //use customize customer name 
  let customer_name = window.location.href.split("/")[3];
  let project_name = window.location.href.split("/")[4];
  
  if(customer_name === "" || customer_name === null) {
    customer_name = "demo";    
  }
 
  let lastUrl = ""

  if(window.location.href) {
    lastUrl = window.location.href.split("/").pop();
  }
  
  useEffect(() => {
    if(lastUrl && lastUrl !== "Login" && lastUrl !== "ResetPassword") checkUrl(lastUrl);
  
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('popstate', onBackButtonEvent);  
    };
  }, [lastUrl]);

  const onBackButtonEvent = () => {
    lastUrl = window.location.href.split("/").pop();
    checkUrl(lastUrl)
  }
  
  const checkUrl = (url_path) => {
    let permit = localStorage.getItem("PERMISSION")  
    if(permit !== null) {
      let permitArray = permit.split(',');
      let permission = permitArray.includes(url_path);
      if(permission !== true) {
        return(
          window.location.href = `/${customer_name}/erp/Login`
        )        
      }
    } else window.location.href = `/${customer_name}/erp/Login`
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path={`/${customer_name}/erp/Login`}
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/${project_name}/404`}
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/${project_name}/500`}
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/${project_name}/403`}
              name="Page 403"
              render={(props) => <Page403 {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/Dashboard`}
              name="Dashboard"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/EmployeeManagement/EmployeeList`}
              name="Employee List"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/EmployeeManagement/EmployeeProfile`}
              name="Employee Profile"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/EmployeeManagement/EmployeeRegistration`}
              name="Employee Registration"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/Department&PositionManagement/Department&PositionList`}
              name="Department & Position List"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/Department&PositionManagement/DepartmentRegister`}
              name="Department Register"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/Department&PositionManagement/PositionRegister`}
              name="Position Register"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/Department&PositionManagement/EmployeeAssignDepartment&Position`}
              name="Employee Assign Department & Position"
              render={(props) => <ERPMainLayout {...props} />}
            />

            <Route
              path={`/${customer_name}/erp/RoleandPermissionManagement/RoleRegister`}
              name="Role Register"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/RoleandPermissionManagement/RoleandPermissionList`}
              name="Role and Permission Management"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              path={`/${customer_name}/erp/RoleandPermissionManagement/UserRoleandPermissionRegister`}
              name="User Role and Permission Register"
              render={(props) => <ERPMainLayout {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/ForgotPassword`}
              name="Forgot Password"
              render={(props) => <ForgotPassword {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/ResetPassword`}
              name="Reset Password"
              render={(props) => <ResetPassword {...props} />}
            />
            <Route
              exact
              path={`/${customer_name}/erp/NoPermissionPackage`}
              name="No Permission Package"
              render={(props) => <ERPMainLayout {...props} />}
            />
            
            <Route exact path={`/${customer_name}/hr/dashboard`} name="HR Management" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/dashboard/announcement-register`} name="Announcement Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/profile/employee-information-detail`} name="Employee Information Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/payroll-rule-setup`} name="Payroll Rule Setup" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/payroll-calculation-method-setup`} name="Payroll Calculation Method Setup" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/payroll-calculation-list`} name="Payroll Calculation List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/ssb-calculation-method-setup`} name="SSB Calculation Method Setup" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/ssb-calculation-list`} name="SSB Calculation List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/perfect-attendance-setup`} name="Perfect Attendance Setup" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/perfect-attendance-list`} name="Perfect Attendance List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/company-leave-setting`} name="Company Leave Setting" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/shift-normal-rule-register`} name="Shift Normal Rule Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/shift-normal-rule-list`} name="Shift Normal Rule List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/allowance-register`} name="Allowance Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/allowance-list`} name="Allowance List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/suballowance-register-list`} name="Suballowance Register List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-allowance-registration`} name="Employee Allowance Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-allowance-list`} name="Employee Allowance List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/deduction-register`} name="Deduction Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/deduction-list`} name="Deduction List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/overtime-rate-setting`} name="Overtime Rate Setting" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/overtime-rate-list`} name="Overtime Rate List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-overtime-registration`} name="Employee Overtime Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-overtime-list`} name="Employee Overtime List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/overtime-notification-setup`} name="Overtime Notification Setup" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/overtime-notification-list`} name="Overtime Notification List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/bonus-register`} name="Bonus Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/bonus-rate-list`} name="Bonus Rate List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/basic-salary-register`} name="Basic Salary Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/basic-salary-list`} name="Basic Salary List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/role-and-permission-registration`} name="Role And Permission Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/salary-transfer-setting-by-group`} name="Salary Rransfer Setting By Group" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/salary-transfer-setting-list`} name="Salary Transfer Setting List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-role-registration`} name="Employee Role Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-deduction-list`} name="Employee Deduction List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/setting/employee-deduction-registration`} name="Employee Deduction Registration" render={(props) => <HRMainLayout {...props} />} />
            
            <Route exact path={`/${customer_name}/hr/employee-management/salary-calculate-setting`} name="Salary Calculate Setting" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/family-member-register-list`} name="Family Member Register List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/employee-leave-setting`} name="Employee Leave Setting" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/salary-transfer-setting`} name="Salary Transfer Setting" render={(props) => <HRMainLayout {...props} />} />            
            <Route exact path={`/${customer_name}/hr/employee-management/employee-list`} name="Employee List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/employee-personal`} name="Employee Personal" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/employee-data-entry`} name="Employee Data Entry" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/approver-register`} name="Approver Register" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/approver-list`} name="Approver List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/log-history-list`} name="Log History List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/employee-management/salary-list`} name="Salary List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/attendance-management/attendance-calendar`} name="Attendance Calendar" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/attendance-management/employee-attendance-list`} name="Employee Attendance List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/attendance-management/delete-employee-attendance`} name="Delete Employee Attendance" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/announcement-list`} name="Announcement List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/employee-leave-detail-information`} name="Employee Leave Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/employee-leave-request`} name="Emplyee Leave Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/employee-leave-list`} name="Employee Leave List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/forget-card-request`} name="Forget Card Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/forget-card-detail-information`} name="Forget Card Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/forget-card-list`} name="Forget Card List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/allowance-request`} name="Allowance Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/allowance-request-detail-information`} name="Allowance Request Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/allowance-request-list`} name="Allowance Request List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/employee-shift-assign-entry`} name="Employee Shift Assign Entry" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/employee-shift-assign-list`} name="Employee Shift Assign List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/individual-working-hour-check`} name="Individual Working Hour Check" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-request`} name="Check In Check Out Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-list`} name="Check In Check Out List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-attendance/checkin-checkout-detail-information`} name="Check In Check Out Detail Information" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/individual-tax-calculation-list`} name="Individual Tax Calculation List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/after-overtime-request`} name="After Overtime Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/after-overtime-request-detail-information`} name="After Overtime Request Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/after-overtime-request-list`} name="After Overtime Request List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/employee-deduction-request`} name="Employee Deduction Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/operation-request-for-salary/employee-deduction-request-list`} name="Employee Deduction Request List" render={(props) => <HRMainLayout {...props} />} />
            
            <Route exact path={`/${customer_name}/hr/salary-calculation/yearly-bonus-registration`} name="Yearly Bonus Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/yearly-bonus-registration-list`} name="Yearly Bonus Registration" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/individual-daily-deduction`} name="Individual Daily Deduction" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/salary-calculation-step1`} name="Salary Calculation Step1" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/salary-calculation-step2`} name="Salary Calculation Step2" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/salary-calculation-step3`} name="Salary Calculation Step3" render={(props) => <HRMainLayout {...props} />} /> 
            <Route exact path={`/${customer_name}/hr/salary-calculation/bank-salary-pay`} name="Bank Salary Pay" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/confirm-salary-calculation`} name="Confirm Salary Calculation" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/payslip-mail-send`} name="Pay Slip Mail Send" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/bonus-payslip-mail-send`} name="Bonus Pay Slip Mail Send" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/bank-salary-error-check-list`} name="Bank Salary Error Check List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/salary-calculation/bonus-bank-salary-pay`} name="Bonus Bank Salary Pay" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/total-ssb-download`} name="Total SSB Download" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/employee-leave-absent-list`} name="Employee Leave Absent List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/budget-year-income-tax-salary`} name="Budget Year Income Tax Salary" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/report-for-transfer-salary-pay`} name="Report For Transfer Salary Pay" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/report-for-payroll`} name="Report For Payroll" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/report-for-attendance`} name="Report For Attendance" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/report/employee-late-absent-leave-list`} name="Employee Late Absent Leave List" render={(props) => <HRMainLayout {...props} />} />
            
            <Route exact path={`/${customer_name}/hr/expense/business-trip-list`} name="Business Trip List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/business-trip-request`} name="Business Trip Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/business-trip-adjustment-detail`} name="Business Trip Adjustment Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/business-trip-adjustment-request`} name="Business Trip Adjustment Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/summarize-total-amount-prepare`} name="Summarize Total Amount Prepare" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/summarize-total-amount-prepare-list`} name="Summarize Total Amount Prepare List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-bank-payment-transaction`} name="Expense Bank Payment Transaction" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-bank-error-check-list`} name="Expense Bank Error Check List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/report-for-bank-transfer-of-expense`} name="Report For Bank Transfer Of Expense" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-detail`} name="Expense Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/business-trip-detail`} name="Business Trip Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-request`} name="Expense Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-list`} name="Expense List" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-adjustment-request`} name="Expense Adjustment Request" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/expense-adjustment-detail`} name="Expense Adjustment Detail" render={(props) => <HRMainLayout {...props} />} />
            <Route exact path={`/${customer_name}/hr/expense/dashboard`} name="Dashboard" render={(props) => <HRMainLayout {...props} />} />
            
            <Route
              path="/"
              name="Home"
              render={() => {
                window.location.href = `/${customer_name}/erp/Login`
              }}
            />
          </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;