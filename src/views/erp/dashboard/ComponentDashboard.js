/**
 * Dashboard Form
 * @author Thin Thin Nwe
 * @create 09/15/2021  mm/dd/yyyy
*/

import React from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { useTranslation } from 'react-i18next';

const ComponentDashboard = (props) => {
  const {t} = useTranslation();
  
  return (
    <div>
      <CCard className="border-0  px-0 mr-auto border-radius">
        <CCardBody style={{paddingBottom: "2.5rem"}}>
          <CCard className="border-0 dashboard-block">
            <CCardHeader className="border-0 mt-0 pb-0">
              <h4 className="mb-1" style={{color: "#4E57AA"}}>{t("Hello")}</h4>
              <span className="font-lg">{t("Welcome Back")} !</span>
            </CCardHeader>
            <CCardBody className="mx-0 p-2">
              <CCol className="employee">
                <CRow md="12" xs="12">
                  {/* Total Employee block */}
                  <CCol md="4" xs="12" sm="4" className="p-2">
                    <CCard className="total common-div d-block mb-2">
                      <div className="d-inline-block img-block">
                        <img src="/image/total_employee.png" alt="total icon" />
                      </div>
                      <div className="d-inline-block font-lg text-block">
                        <div className="mb-1">
                          { t("Total Employee") }
                        </div>
                        <h2 className="font-4xl mb-0">
                          { props.empData.total_employee !== "" ? props.empData.total_employee : 0 }
                        </h2>
                      </div>
                    </CCard>
                  </CCol>
                  {/* Permanent block */}
                  <CCol md="4" xs="12" sm="4" className="p-2">
                    <CCard className="permanent common-div d-block mb-2">
                      <div className="d-inline-block img-block">
                        <img src="/image/permanent.png" alt="permanent icon" />
                      </div>
                      <div className="d-inline-block font-lg text-block">
                        <div className="mb-1">
                          { t("Permanent") }
                        </div>
                        <h2 className="font-4xl mb-0">
                          { props.empData.permanent_employee !== "" ? props.empData.permanent_employee : 0 }
                        </h2>
                      </div>
                    </CCard>
                  </CCol>
                  {/* Part Time block */}
                  <CCol md="4" xs="12" sm="4" className="p-2">
                    <CCard className="part_time common-div d-block mb-2">
                      <div className="d-inline-block img-block">
                        <img src="/image/part_time.png" alt="parttime icon" />
                      </div>
                      <div className="d-inline-block font-lg text-block">
                        <div className="mb-1">
                          { t("Part Time") }
                        </div>
                        <h2 className="font-4xl mb-0">
                          { props.empData.part_time_employee !== "" ? props.empData.part_time_employee : 0 }
                        </h2>
                      </div>
                    </CCard>
                  </CCol>
                </CRow>
                <CRow md="12" xs="12">
                  {/* Contract block */}
                  <CCol md="4" xs="12" sm="4" className="p-2">
                    <CCard className="contract common-div d-block mb-2">
                      <div className="d-inline-block img-block">
                        <img src="/image/contract.png" alt="contract icon" />
                      </div>
                      <div className="d-inline-block font-lg text-block">
                        <div className="mb-1">
                          { t("Contract") }
                        </div>
                        <h2 className="font-4xl mb-0">
                          { props.empData.contract_employee !== "" ? props.empData.contract_employee : 0 }
                        </h2>
                      </div>
                    </CCard>
                  </CCol>
                  {/* Indirect / Driver block */}
                  <CCol md="4" xs="12" sm="4" className="p-2">
                    <CCard className="driver common-div d-block mb-2">
                      <div className="d-inline-block img-block">
                        <img src="/image/driver.png" alt="driver icon" />
                      </div>
                      <div className="d-inline-block font-lg text-block">
                        <div className="mb-1">
                          { t("Indirect / Driver") }
                        </div>
                        <h2 className="font-4xl mb-0">
                          { props.empData.indirect_direct_employee !== "" ? props.empData.indirect_direct_employee : 0 }
                        </h2>
                      </div>
                    </CCard>
                  </CCol>
                </CRow>
              </CCol>
            </CCardBody>
          </CCard>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default ComponentDashboard