import { CButton, CCard, CCardBody, CCol, CImg, CLabel, CRow, CSelect, CSwitch } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';
import { useTranslation } from 'react-i18next';

const SearchSalaryTransferSettingByGroup = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            props.mainEmployeeList && props.mainEmployeeList === true &&
            <div>
                <CRow>
                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee ID')}</CLabel>
                        <div className="expense-autocomplete">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('id', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.idArr}
                            name={props.empID}
                            disabled={parseInt(props.viewPermissionAPI) === 0 ? true : false}
                        />
                        </div>
                    </CCol>

                    <CCol className="mb-4 verticle-line" lg="4">
                        <CLabel>{t('Employee Code')}</CLabel>
                        <div className="expense-autocomplete">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('code', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.codeArr}
                            name={props.empCode}
                            disabled={parseInt(props.viewPermissionAPI) === 0 ? true : false}
                        />
                        </div>
                    </CCol>

                    <CCol className="mb-4" lg="4">
                        <CLabel>{t('Employee Name')}</CLabel>
                        <div className="expense-autocomplete">
                        <Autocomplete
                            onChange={(i) => props.changeAutocomplete('name', i)}
                            onSelect={props.selectAutocomplete}
                            items={props.nameArr}
                            name={props.empName}
                            disabled={parseInt(props.viewPermissionAPI) === 0 ? true : false}
                        />
                        </div>
                    </CCol>
                </CRow>
                <CRow lg="12" style={{ paddingBottom: '10px' }}>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Department')}</CLabel>
                        <CSelect className="bamawl-select" value={props.deptID} onChange={props.changeDept} custom>
                            <option key="" value="">{t('---Select Department---')}</option>
                            {
                                props.deptArr.map(i => {
                                    return (<option key={i.id} value={i.id}> {i.department_name} </option>)
                                })
                            }
                        </CSelect>
                    </CCol>
                    <CCol lg="2">
                        <div className="line"></div>
                    </CCol>
                    <CCol lg="5" className="mb-4">
                        <CLabel>{t('Position')}</CLabel>
                        <CSelect className="bamawl-select" value={props.posID} onChange={props.changePos} custom>
                            <option key="" value="">{t('---Select Position---')}</option>
                            {
                                props.posArr.map( i => {
                                    return( <option key={ i.id } value={ i.id }> { i.position_name } </option> )
                                } )
                            }
                        </CSelect>
                    </CCol>
                </CRow>
                <br></br>
            </div>
        }
        {
            props.mainEmployeeList && props.mainEmployeeList === true &&
            <>
                <CRow className="ml-0" >
                    <CImg className="mt-2" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
                    <label className="ml-3 mt-1">{t('Salary Transfer Setting Already Exist')}<span style={{ color: "red" }}>*</span></label>
                    <CSwitch className={'ml-5 c-switch-sm switch-usd'} id={"swYes"}
                        onChange={props.salaryTransferChange}
                        checked={props.salaryTransferState === true}
                        shape={'pill'} labelOn={'Yes'} labelOff={'No'} />
                </CRow>
            </>
        }
        {
            props.mainEmployeeList && props.mainEmployeeList === true &&
            <div>
                <CImg className="" src="avatars/list.png" alt="titleicon" style={{ width: '6px', height: '12px' }} />
                <CImg className="ml-3" src="avatars/paymenttype.png" style={{ width: '17px', height: '14px' }} alt="Payment Type"></CImg>
                <label className="ml-3 mt-2">{t('Payment Account')}<span style={{ color: "red" }}>*</span></label>
                {props.paymentAccountAPI && props.paymentAccountAPI.length > 0 &&
                    props.paymentAccountAPI.map((i, k) => {
                        return (
                            <CCard className="mt-4" style={{ flexDirection: 'row', backgroundColor : "#fafbfc", border: "1px solid #c8ccd0" }} key={k}>
                                <CCardBody onClick={props.getCurrencyID} currency_desc={i.currency_desc} style={{ alignItems: "center", maxWidth: "100px", display: "flex", flexWrap: 'wrap' }} lg="3" className={i.currency_id === 1 ? "salary-transfer-setting-by-group-mmk td-currency" : "salary-transfer-setting-by-group-mmk td-pink"}>
                                    <CLabel className="ml-2" style={{ fontSize: "18px", marginBottom: "0px" }}>{i.currency_desc}</CLabel>
                                </CCardBody>
                                <CCardBody className="">
                                    {
                                        i.priority_list.map((j, ind) => {
                                            return (<Fragment key={ind}>
                                                <CRow style={{ display: "flex", flexWrap: "wrap" }}>
                                                    {j.bank_priority.map((sec, index) => {
                                                        return (
                                                            <Fragment key={index}>
                                                                <CCol lg="3" className="flex">
                                                                <CLabel className="flex font-weight-normal">
                                                                    <input id={sec.bank_currency_id} bank_currency_id={sec.bank_currency_id} priority={sec.priority} bank_name={sec.bank_name} priority_name={sec.priority_name} checked={props.is_checked} onChange={props.paymentAccountChange} type="checkbox" className="mt-1" ></input>
                                                                    <div className='ml-3'>{sec.bank_name}<br></br>{sec.priority_name}</div></CLabel>
                                                                </CCol>
                                                            </Fragment>
                                                        )
                                                    })}
                                                </CRow>
                                            </Fragment>)
                                        }

                                        )}
                                </CCardBody>
                            </CCard>
                        )
                    })
                }
                <br></br>
            </div>
        }
        {
            props.mainEmployeeList && props.mainEmployeeList === true &&
            <CRow lg="12">
                <CCol style={{ textAlign: "center" }}>
                    <CButton className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
                </CCol>
            </CRow>
        }
    </>
    );

}

export default SearchSalaryTransferSettingByGroup;