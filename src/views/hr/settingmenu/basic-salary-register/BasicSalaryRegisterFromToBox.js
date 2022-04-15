/* eslint-disable no-use-before-define */
import { CCard, CCardBody, CCardText, CCol, CContainer, CImg, CLabel, CRow, CSelect } from '@coreui/react';
import { TextField } from "@material-ui/core";
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';

const BasicSalaryRegisterFromToBox = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    {/* From Date Table Start */}
    {!isEmpty(props.mainTable) &&
      <CContainer fluid>
        <CRow>
          <CCol sm="5 pl-0 salary-from-to salary-background-color">
            <CCardText>
              <CImg
                src={"avatars/list.png"}
                className="title-Icon"
                alt="titleicon"
              />
              <CLabel id="lbFrom" className="ml-2 mt-2 required">{t("From")}</CLabel>
            </CCardText>

            <CCard
              className="table-panel mt-2 basicSalaryList cCard" style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}
            >
              <CCardBody>
                <CRow lg="12" className="mt-2 mb-2 ">
                  <CCol lg="6" className="basicSalaryList borderRight ">
                    <CImg src={'avatars/year.png'} className="date-icon" alt="year" />
                    <label name="lbYear" className="ml-5 mt-2">{t('Year')}</label>
                    <div className="basicSalary textField basicSalary-text-field ">
                      <TextField
                        className="background-textfield"
                        id="txtFromYear"
                        placeholder={t('Type Year')}
                        name="txtYear"
                        onChange={props.fixedExpYearFromChane}
                        value={props.expYearFrom}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </CCol>
                  <CCol lg="6" >
                    <CImg src={'avatars/month.png'} className="date-icon" alt="month" />
                    <CLabel id="lbMonthFrom" className="ml-5 mt-2">{t('Month')}</CLabel>
                    <CSelect className="bamawl-select" id="dropMonthFrom" value={props.expMonthFrom} onChange={props.monthFromChange} custom>
                      <option key="" value="">{t('---Select Month---')}</option>
                      {props.monthData &&
                        props.monthData.map((i, index) => {
                          return (<option key={index} value={i.month}>{i.month}&nbsp;{i.month > 1 ? t('months') : t('month')}</option>)
                        })
                      }
                    </CSelect>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
          <CCol sm="2"></CCol>
          <CCol sm="5 pr-0 salary-from-to salary-background-color">
            <CCardText>
              <CImg
                src={"avatars/list.png"}
                className="title-Icon"
                alt="titleicon"
              />
              <CLabel id="lbTo" className="ml-2 mt-2 required">{t("To")}</CLabel>
            </CCardText>
            <CCard
              className="table-panel mt-2 basicSalaryList cCard" style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}
            >
              <CCardBody>
                <CRow lg="12" className="mt-2 mb-2">
                  <CCol lg="6" className="basicSalaryList borderRight ">
                    <CImg src={'avatars/year.png'} className="date-icon" alt="year" />
                    <label name="lbYear" className="ml-5 mt-2">{t('Year')}</label>
                    <div className="basicSalary textField basicSalary-text-field">
                      <TextField
                        className="background-textfield"
                        id="txtToYear"
                        placeholder={t('Type Year')}
                        name="txtYear"
                        value={props.expYearTo}
                        onChange={props.fixedExpYearToChane}
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </CCol>
                  <CCol lg="6" >
                    <CImg
                      src={"avatars/month.png"}
                      className="date-icon"

                      alt="month"
                    />
                    <CLabel id="lbMonthTo" className="ml-5 mt-2">{t('Month')}</CLabel>
                    <CSelect className="bamawl-select" id="dropMonthTo" value={props.expMonthTo} onChange={props.monthToChange} custom>
                      <option key="" value="">{t('---Select Month---')}</option>
                      {props.monthData &&
                        props.monthData.map((i, index) => {
                          return (<option key={index} value={i.month}>{i.month}&nbsp;{i.month > 1 ? t('months') : t('month')}</option>)
                        })
                      }
                    </CSelect>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    }
    {/* To  Date Table End */}
  </>
  );
}
export default BasicSalaryRegisterFromToBox;
