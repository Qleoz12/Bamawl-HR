import React from "react";
import { CRow, CLabel, CFormGroup, CButton, CImg, CCol } from "@coreui/react";
import { useTranslation } from "react-i18next";
import CommonDatePicker from "../../hr-common/datepicker/DatePicker";
import EmployeeListModal from "./EmployeeListModal";
import EmployeeListTable from "./EmployeeListTable";

const SettingSetup = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <CRow style={{ display: "flex" }}>
        <CCol lg="6">
          <CImg
            src="/avatars/list.png"
            alt="titleicon"
            style={{ width: "5px", height: "12px", marginBottom: "2px" }}
          />
          <CLabel className="ml-2 middle">
            {t("View Employee Data for Bonus Bank Salary Pay")}
          </CLabel>
        </CCol>
      </CRow>
      <div
        style={{
          border: "1px solid #E6E6E6",
          borderRadius: "10px",
          marginLeft: "10px",
          marginRight: "10px",
          marginBottom: "30px",
          paddingTop: "10px",
          paddingRight: "20px",
          paddingBottom: "10px",
          paddingLeft: "20px",
        }}
      >
        <CRow style={{ display: "flex" }}>
          <CCol lg="6">
            <CImg
              src="/avatars/list.png"
              alt="titleicon"
              style={{ width: "5px", height: "12px", marginBottom: "2px" }}
            />
            <CLabel className="ml-2 middle">{t("Year/Month")}</CLabel>
            <span className="required" />
          </CCol>
        </CRow>
        <div
          style={{
            backgroundColor: "#FCFCFC",
            border: "1px solid #E6E6E6",
            borderRadius: "10px",
            marginLeft: "10px",
            marginRight: "10px",
            marginBottom: "30px",
          }}
        >
          <CRow lg="12" style={{ margin: "20px 0px 10px 10px" }}>
            <CCol lg="3" xs="4">
              <CFormGroup className="">
                <CommonDatePicker
                  value={props.selectedPaymentMonth}
                  change={props.handlePaymentMonthChange}
                  format={"month"}
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
        {props.currencyBankAccount.length > 1 && (
          <>
            <CRow style={{ display: "flex" }}>
              <CCol lg="6">
                <CImg
                  src="/avatars/list.png"
                  alt="titleicon"
                  style={{ width: "5px", height: "12px", marginBottom: "2px" }}
                />
                <CLabel className="ml-2 middle">{t("Bonus Currency")}</CLabel>
                <span className="required" />
              </CCol>
            </CRow>
            <div
              style={{
                backgroundColor: "#FCFCFC",
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "30px",
              }}
            >
              <CRow lg="12" style={{ margin: "20px 0px 10px 10px" }}>
                {props.currencyBankAccount.map((i, index) => {
                  return (
                    <CCol
                      lg="3"
                      className="currency-bank-account-inner"
                      key={index}
                    >
                      <label className="bank-salary-pay-inner-label">
                        <input
                          className="currency-bank-account-radio"
                          type="radio"
                          name="currency-bank-account"
                          checked={i.currency_id == props.curBankRadio}
                          value={i.currency_id}
                          onChange={props.currencyBankAccOnChange.bind(this, i)}
                        />
                        {i.currency_name}
                      </label>
                    </CCol>
                  );
                })}
              </CRow>
            </div>
          </>
        )}
        {props.paymentMethod.length > 1 && (
          <>
            <CRow style={{ display: "flex" }}>
              <CCol lg="6">
                <CImg
                  src="/avatars/list.png"
                  alt="titleicon"
                  style={{ width: "5px", height: "12px", marginBottom: "2px" }}
                />
                <CLabel className="ml-2 middle">{t("Payment Method")}</CLabel>
                <span className="required" />
              </CCol>
            </CRow>
            <div
              style={{
                backgroundColor: "#FCFCFC",
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "30px",
              }}
            >
              <CRow lg="12" style={{ margin: "20px 0px 10px 10px" }}>
                {props.paymentMethod.map((i, index) => {
                  return (
                    <CCol
                      lg="3"
                      className="currency-bank-account-inner"
                      key={index}
                    >
                      <label className="bank-salary-pay-inner-label">
                        <input
                          className="currency-bank-account-radio"
                          type="checkbox"
                          name="payment-method"
                          checked={i.is_checked === true}
                          defaultValue={i.bank_id}
                          onChange={props.paymentMethodOnChange.bind(this, i)}
                        />
                        {i.bank_name}
                      </label>
                    </CCol>
                  );
                })}
              </CRow>
            </div>
          </>
        )}
        {props.transferMethod.length > 1 && (
          <>
            <CRow style={{ display: "flex" }}>
              <CCol lg="6">
                <CImg
                  src="/avatars/list.png"
                  alt="titleicon"
                  style={{ width: "5px", height: "12px", marginBottom: "2px" }}
                />
                <CLabel className="ml-2 middle">{t("Transfer Method")}</CLabel>
                <span className="required" />
              </CCol>
            </CRow>
            <div
              style={{
                backgroundColor: "#FCFCFC",
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
                marginLeft: "10px",
                marginRight: "10px",
                marginBottom: "30px",
              }}
            >
              <CRow lg="12" style={{ margin: "20px 0px 10px 10px" }}>
                {props.transferMethod.map((i, index) => {
                  return (
                    <CCol
                      lg="3"
                      className="currency-bank-account-inner"
                      key={index}
                    >
                      <label className="bank-salary-pay-inner-label">
                        <input
                          className="currency-bank-account-radio"
                          type="radio"
                          name="transfer-method"
                          checked={
                            i.transfer_method == props.transferMethodRadio
                          }
                          value={i.transfer_name}
                          onChange={props.transferMethodOnChange.bind(this, i)}
                        />
                        {i.transfer_name}
                      </label>
                    </CCol>
                  );
                })}
              </CRow>
            </div>
          </>
        )}
        <CRow className="mt-3 ml-1 mb-4">
          <CButton size="sm" className="" onClick={props.empListPlusBtn}>
            <img width="34px" src="/avatars/Add Allowance .png" />
          </CButton>
          <CLabel className="" style={{ paddingTop: "12px" }}>
            {t("Employee List")}
          </CLabel>
        </CRow>
        <EmployeeListModal
          rowCountModalBox={props.rowCountModalBox}
          addBtn={props.addBtn}
          closeBtn={props.empListModalClose}
          empListModalShow={props.empListModalShow}
          data={props.empListModalData}
          allCheckBoxChange={props.allCheckBoxChange}
          empAllCheck={props.empAllCheck}
          subCheckboxChange={props.subCheckboxChange}
          empIDData={props.empIDData}
          empID={props.empID}
          empNameData={props.empNameData}
          empName={props.empName}
          departmentData={props.departmentData}
          searchBtn={props.searchBtn}
          empModalError={props.empModalError}
          changeAutocomplete={props.changeAutocomplete}
          selectAutocomplete={props.selectAutocomplete}
          empCodeData={props.empCodeData}
          empCode={props.empCode}
          departmentAPI={props.departmentAPI}
          deptState={props.deptState}
          deptChange={props.deptChange}
          roleAPI={props.roleAPI}
          roleState={props.roleState}
          roleChange={props.roleChange}
          showEmployeeAddError={props.showEmployeeAddError}
          employeeAddErrorMessage={props.employeeAddErrorMessage}
        />
        <EmployeeListTable
          rowCount={props.rowCount}
          data={props.addEmpListData}
          deleteBtn={props.empListTableDeleteBtn}
          empAllListCheck={props.empAllListCheck}
          allListCheckBoxChange={props.allListCheckBoxChange}
          subCheckboxChange={props.subCheckboxChange}
          subListCheckboxChange={props.subListCheckboxChange}
          addEmpListDataHeader={props.addEmpListDataHeader}
          notAcceptCharacter={props.notAcceptCharacter}
          bonusBankTransfer={props.bonusBankTransfer}
        />
      </div>
    </>
  );
};
export default SettingSetup;
