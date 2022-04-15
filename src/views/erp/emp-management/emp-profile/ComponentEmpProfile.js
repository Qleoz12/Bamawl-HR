import React from 'react'
import {
  CCard, CCardBody, CCol, CLabel, CRow, CImg,
} from '@coreui/react'
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../../erp/erp-common/commonValidation';

const ComponentEmpProfile = (props) => {
  const{t} = useTranslation();
  return (
    <>      
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CRow className="avatar-block">
                <div className="ml-2">
                  {
                    isEmpty(props.empData.avatar)
                    ?
                    <div className="c-avatar-img">
                      <span className="d-block text-center" style={{marginTop: "2.5rem"}}>No Image</span>
                    </div>
                    :
                      <CImg
                        src = {props.empData.avatar} alt={props.empData.avatar}
                        className="c-avatar-img"
                      />
                  }
                </div>
                <div className="avatar-info" style={{marginLeft: "15px"}}>
                  <CLabel className="d-block mt-1">
                    <h5 className="font-weight-bold">{ !isEmpty(props.empData.name_eng) ? props.empData.name_eng : '-' }</h5>
                  </CLabel>
                  <CLabel className="d-block">{ !isEmpty(props.address.email) ? props.address.email : '-' }</CLabel>
                </div>
              </CRow>
              <CRow className="mt-2 profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Employee ID") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.employee_id) ? props.empData.employee_id : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Employee Code") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.code) ? props.empData.code : '-' }
                  </CLabel>  
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Employee Name") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.name) ? props.empData.name : '-' 
                  }</CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Phone Number") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.address.phone) ? props.address.phone : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("NRC Number") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.nrc_number) ? props.empData.nrc_number : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Postal Code") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.address.post_code) && props.address.post_code !== 0 ? props.address.post_code : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Address") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.address.address) ? props.address.address : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Area") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    {
                      props.areaData.length > 0
                      ?
                        props.areaData.map((area, index) =>
                          <span key={index}>
                            {area.area_name}
                            {(++index !== props.areaData.length) ? ', ' : ' '}
                          </span>
                        )
                      : '-'
                    }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Passport Number") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.passport_number) ? props.empData.passport_number : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Employee Type") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.employee_type)
                    ? props.empData.employee_type === 1 && "Permanent" ||
                      props.empData.employee_type === 2 && "Part time" ||
                      props.empData.employee_type === 3 && "Contract" ||
                      props.empData.employee_type === 4 && "Indirect/Driver"
                    : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Role") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    { !isEmpty(props.empData.role) ? props.empData.role : '-' }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Department") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                  {
                    props.deptPosData.length > 0
                    ?
                      props.deptPosData.map((dp, index) => 
                        <span key={index}>
                          {dp.department.department_name}
                          {(++index !== props.deptPosData.length) ? ', ' : ' '}
                        </span>
                      )
                    : '-'
                  }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Position") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                  {
                    props.deptPosData.length > 0
                    ?
                      props.deptPosData.map((dp, index) => 
                        <span key={index}>
                          {dp.position.position_name}
                          {(++index !== props.deptPosData.length) ? ', ' : ' '}
                        </span>
                      )
                    : '-'
                  }
                  </CLabel>
                </CCol>
              </CRow>
              <CRow className="profile">
                <CCol md="3">
                  <CLabel className="d-block">{ t("Package") }</CLabel>
                </CCol>
                <CCol>
                  <CLabel className="d-block font-weight-bolder">
                    {
                      props.pkgData.length > 0
                      ?
                        props.pkgData.map((pkg, index) =>
                          <span key={index}>
                            {pkg.name}
                            {(++index !== props.pkgData.length) ? ', ' : ' '}
                          </span>
                        )
                      : '-'
                    }
                  </CLabel>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ComponentEmpProfile