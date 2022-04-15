/* eslint-disable eqeqeq */
import { CCard, CCardBody, CCol, CImg, CLabel, CRow } from '@coreui/react';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../hr/hr-common/common-validation/CommonValidation';

const BudgetYearIncomeTaxTable = props => {
  const { t } = useTranslation();
  let {
    mainTable,
  } = props;
  
  useEffect(() => { });

  return (
    <>
      {
        !isEmpty(mainTable) &&
        <div>
          <CRow lg="12">
            <CCol>
              <CImg src={'avatars/list.png'} className="title-icon log-history-list-title-icon" alt="titleicon" />
              <CLabel id="lolTargetYear" className="log-history-list-label">{mainTable.budget_time}</CLabel>
            </CCol>
          </CRow>
          <CCard className="budget-year-result-data">
            <CCardBody>
                <CCol lg="6">
                  <CRow>
                    <CCol lg="6" id="lblEmployeeID">{t('Employee ID')}</CCol>
                    <CCol lg="5"><span className="pr-3">:</span>{mainTable.employee_id}</CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="6" id="lblEmployeeCode">{t('Employee Code')}</CCol>
                    <CCol lg="5"><span className="pr-3">:</span>{mainTable.employee_code}</CCol>
                  </CRow>
                  <CRow>
                    <CCol lg="6" id="lblEmployeeName">{t('Employee Name')}</CCol>
                    <CCol lg="5"><span className="pr-3">:</span>{mainTable.employee_name}</CCol>
                  </CRow>
                  {
                    mainTable.monthly_salary?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblMonthlySalary(${item.name})`}>{`${t('Monthly Salary')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    mainTable.total_income?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblTotalIncome(${item.name})`}>{`${t('Total Income')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    mainTable.total_overtime_amount?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblTotalOvertimeAmount(${item.name})`}>{`${t('Total Overtime Amount')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    mainTable.total_bonus?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblTotalBonus(${item.name})`}>{`${t('Total Bonus')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    mainTable.total_deduction_amount?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblTotalDeductionAmount(${item.name})`}>{`${t('Total Deduction Amount')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                  {
                    mainTable.total_income_tax?.map((item, index) => {
                      return (
                        <CRow key={index}>
                          <CCol lg="6" id={`lblTotalIncome_Tax(${item.name})`}>{`${t('Total Income_Tax')} (${item.name})`}</CCol>
                          <CCol lg="5"><span className="pr-3">:</span>{item.amount}</CCol>
                        </CRow>
                      )
                    })
                  }
                </CCol>
            </CCardBody>
          </CCard>
        </div>
      }
    </>
  )
}

export default BudgetYearIncomeTaxTable
