import { CButton, CCard, CCardBody, CCol, CImg, CLabel, CRow, CSelect } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import ViewPermision from '../../../brycen-common/constant/ViewPermission';

const SearchSalaryTransferSettingList = props => {
  const { t } = useTranslation();
  useEffect(() => {
  });

  return (<>
    <CRow lg="12" style={{ paddingBottom: '10px' }}>
      <CCol lg="4" className="mb-4 verticle-line">
        <CLabel id="lbEmployeeID">{t('Employee ID')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            id="txtEmployeeID"
            onChange={(i) => props.changeAutocomplete('id', i)}
            onSelect={props.selectAutocomplete}
            items={props.idArr}
            name={props.empID}
            autoFocus={true}
            disabled={parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
          />
        </div>
      </CCol>
      <CCol lg="4" className="mb-4 verticle-line">
        <CLabel id="lbEmployeeCode">{t('Employee Code')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            id="txtEmployeeCode"
            onChange={(i) => props.changeAutocomplete('code', i)}
            onSelect={props.selectAutocomplete}
            items={props.codeArr}
            name={props.empCode}
            disabled={parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
          />
        </div>
      </CCol>
      <CCol lg="4" className="mb-4">
        <CLabel id="lbEmployeeName" >{t('Employee Name')}</CLabel>
        <div className="expense-autocomplete">
          <Autocomplete
            id="txtEmployeeName"
            onChange={(i) => props.changeAutocomplete('name', i)}
            onSelect={props.selectAutocomplete}
            items={props.nameArr}
            name={props.empName}
            disabled={parseInt(props.viewPermissionAPI) === ViewPermision.ONLY_ME ? true : false}
          />
        </div>
      </CCol>
    </CRow>

    {/* Department && Position */}
    <CRow>
      <CCol lg="4" className="mb-4 verticle-line">
        <CLabel>{t('Department')}</CLabel>
        <CSelect className="bamawl-select" id="dropDepartment" value={props.deptState} onChange={props.deptChange} custom>
          <option key="" value="">{t('---Select Department---')}</option>
          {props.departmentAPI &&
            props.departmentAPI.map(i => {
              return (<option key={i.id} value={i.id}> {i.department_name} </option>)
            })
          }
        </CSelect>
      </CCol>
      <CCol lg="4" className="mb-4">
        <CLabel>{t('Position')}</CLabel>
        <CSelect className="bamawl-select" id="dropPosition" value={props.posState} onChange={props.posChange} custom>
          <option key="" value="">{t('---Select Position---')}</option>
          {props.positionAPI &&
            props.positionAPI.map(i => {
              return (<option key={i.id} value={i.id}> {i.position_name} </option>)
            })
          }
        </CSelect>
      </CCol>
    </CRow>

    <br></br>
    <CImg className="salaryTransferSettingList titleicon" src="avatars/list.png" alt="titleicon" />
    <CImg className="salaryTransferSettingList payment-type" src="avatars/paymenttype.png" alt="Payment Type"></CImg>
    <label className="mt-2">{t('Payment Account')}<span className="SalaryTransferSettingList label-require">*</span></label>
    {props.paymentAccountAPI &&
      props.paymentAccountAPI.map((index, i) => {
        return (<Fragment key={i}>
          <CCard className="mt-4 flexDirection" style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
            <CCardBody lg="3" className={index.currency_id === 1 ? "basicSalaryList mmk" : "basicSalaryList usd td-pink"} style={{ minWidth: "100px" }}>
              <CLabel className="ml-2 salaryTransferSettingList sizeLabel">{index.currency_desc}</CLabel>
            </CCardBody>
            <CCardBody className="col-lg-12">
              {
                index.priority_list.map((sec, ix) => {
                  return (<Fragment key={ix}>
                    <CRow style={{ display: "flex", flexWrap: "wrap" }}>
                      {
                        sec.bank_priority.map((idx, tx) => {
                          return (<Fragment key={tx}>
                            <CCol lg="2" className="flex">
                              <CLabel className="flex font-weight-normal">
                                <input id={tx} bank_name={idx.bank_name} priority_name={idx.priority_name} priority={idx.priority} bank_currency_id={idx.bank_currency_id} onChange={props.paymentAccountChange} type="checkbox" className="mt-1"></input>
                                <div className='ml-3'>{idx.bank_name}<br></br>{idx.priority_name}</div></CLabel>
                            </CCol>
                          </Fragment>)
                        })}
                    </CRow>
                  </Fragment>)
                }
                )
              }
            </CCardBody>
          </CCard>
        </Fragment>)
      }
      )}
    <br></br>
    <CRow lg="12">
      <CCol className="textAlignCenter">
        <CButton id="btnSearch" className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
      </CCol>
    </CRow><br />
  </>
  );
}
export default SearchSalaryTransferSettingList;