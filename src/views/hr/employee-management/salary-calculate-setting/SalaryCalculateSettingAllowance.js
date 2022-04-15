import React, { useEffect } from 'react';
import { CCol, CRow, CImg, CLabel, CModal, CModalHeader, CModalBody, CButtonToolbar, CButton } from '@coreui/react';
import { TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
/**
 * SalaryCalculateSettingCalculateSalary Component use for SalaryCalculateSettingIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const SalaryCalculateSettingAllowance = props => {
    let {
        currencyAPI,
        basicSalaryAPI,
        allowanceAPI,
        calculateAllSaralyAPI,
        radAllowance,
        radPaymentType,
        radSalaryEqualityAdjust,
        basicSalaryCreateAPI,
        basicSalary,
        basicReason,
        lifeInsurance,
        salaryEqualityAdjust,
        salaryEqualityAdjustReson,
        radbasicSalary,
        detailData,
        basicSalaryModal,
        basicSalaryModalAdd,
        basicSalaryModalClose,
        handleChangeRadAllowance,
        handleClickBasicSalary,
        handleChangeTextField,
        handleChangePaymentType,
        handleChangeRadBasicSalary,
        handleChangeRadSalaryAdjust,
        payrollCalculateOption,
        transactionCurrency
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (<>
        <CRow className="mt-3">
            <CCol>
                <div className="d-flex align-items-center" >
                    <CImg src={'avatars/list.png'} alt="titleicon" style={{ width: '5px', height: '12px', marginBottom: '2px' }} />
                    <CLabel id="lblAllowance" style={{ margin: "0 10px" }}>{t('Allowance')}</CLabel>
                </div>
                <div className="box-container">
                    <div className="box-box-container">
                        <div className="box-container-grid">
                            <label className="box-content">
                                <span id="lbMonthly" className="mr-10" >{t('Monthly')}</span>
                                <input type="radio" id="radNotCalculateSalary" name="radAllowance" value="1"
                                    onChange={handleChangeRadAllowance}
                                    checked={radAllowance === 1}
                                    disabled={detailData !== null && radAllowance !== 1}
                                ></input>
                            </label>
                            <label className="box-content">
                                <span id="lbDaily" className="mr-10" >{t('Daily')}</span>
                                <input type="radio" id="radCalculate" name="radAllowance" value="2"
                                    onChange={handleChangeRadAllowance}
                                    checked={radAllowance === 2}
                                    disabled={detailData !== null && radAllowance !== 2}
                                ></input>
                            </label>
                            <label className="box-content">
                                <span id="lbHourly" className="mr-10" >{t('Hourly')}</span>
                                <input type="radio" id="radCalculateSalary" name="radAllowance" value="3"
                                    onChange={handleChangeRadAllowance}
                                    checked={radAllowance === 3}
                                    disabled={detailData !== null && radAllowance !== 3}
                                ></input>
                            </label>
                        </div>

                        {
                            basicSalaryCreateAPI === 2 && payrollCalculateOption === 2 && transactionCurrency === null &&
                            <CRow className="mt-4">
                                <CCol className="d-flex">
                                    <CImg id="imgPaymentType" className="mr-2 mt-0" src={'avatars/paymenttype.png'} alt="remove" height={20} />
                                    <label id="lbPaymentType">{t('Payment Type')}</label>
                                    <div className="d-flex ml-5">
                                        {
                                            currencyAPI.map((currency, idx) => {
                                                return (
                                                    <label key={idx} className="d-flex align-items-center mr-3">
                                                        <span id={`${'lbPaymentType'}${currency.currency_name}`} className="mr-2" >{currency.currency_name}</span>
                                                        <input type="radio" name="radPaymentType"
                                                            value={currency.id}
                                                            checked={radPaymentType === currency.id}
                                                            onChange={handleChangePaymentType}
                                                            disabled={detailData !== null && radPaymentType !== currency.id}
                                                        ></input>
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </CCol>
                            </CRow>
                        }
                        {
                            currencyAPI.length > 1 && basicSalaryCreateAPI === 2 && payrollCalculateOption === 1 && 
                            <CRow className="mt-4">
                                <CCol className="d-flex">
                                    <CImg id="imgPaymentType" className="mr-2 mt-0" src={'avatars/paymenttype.png'} alt="remove" height={20} />
                                    <label id="lbPaymentType">{t('Payment Type')}</label>
                                    <div className="d-flex ml-5">
                                        {
                                            currencyAPI.map((currency, idx) => {
                                                return (
                                                    <label key={idx} className="d-flex align-items-center mr-3">
                                                        <span id={`${'lbPaymentType'}${currency.currency_name}`} className="mr-2" >{currency.currency_name}</span>
                                                        <input type="radio" name="radPaymentType"
                                                            value={currency.id}
                                                            checked={radPaymentType === currency.id}
                                                            onChange={handleChangePaymentType}
                                                            disabled={detailData !== null && radPaymentType !== currency.id}
                                                        ></input>
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </CCol>
                            </CRow>
                        }
                        <CRow className="mt-4 expense-request-text-field">
                            <CCol xl="6" md="6">
                                <div className="d-flex flex-column border-right">
                                    <label id="lbBasicSalary">{t('Basic Salary')}</label>
                                    <div className="d-flex ">
                                        <TextField
                                            id="txtBasicSalary"
                                            type="text"
                                            value={basicSalary}
                                            onChange={handleChangeTextField}
                                            className={`input-col flex-grow-1 ${basicSalaryCreateAPI === 1 ? 'mr-2' : ''}`}
                                            disabled={basicSalaryCreateAPI === 1 || detailData !== null}
                                            inputProps={{ maxLength: 200, className: "text-align-left" }}
                                        />
                                        {
                                            basicSalaryCreateAPI === 1 &&
                                            <input id="imgAddBasicSalary" type="image" src={'avatars/Add Working Day and Shift.png'} alt="add" height={30}
                                                className="cursor-pointer input-col"
                                                onClick={handleClickBasicSalary}
                                            />
                                        }

                                    </div>
                                </div>
                            </CCol>
                            <CCol xl="6" md="6">
                                <div className="d-flex flex-column input-reponsive">
                                    <label id="lbBasicReason">{t('Basic Reason')}</label>
                                    <TextField
                                        id="txtBasicReason"
                                        type="text"
                                        value={basicReason}
                                        onChange={handleChangeTextField}
                                        className="input-col"
                                        inputProps={{ maxLength: 512, className: "text-align-left" }}
                                        disabled={detailData !== null}
                                    />
                                </div>
                            </CCol>
                        </CRow>
                    </div>
                    <div className="wrapper">
                        {
                            allowanceAPI.map((allowance, i) => {
                                return (<Fragment key={i} >
                                    {
                                        <div className={`item d-flex flex-column${i % 2 === 0 && i !== allowanceAPI.length - 1 ? ' border-right padding-right-4' : ''}${i % 2 === 0 ? ' padding-right-4' : ' margin-left-3'}`}>
                                            <label name="lblNameAllowance">
                                                <span>{allowance.allowance_name}</span>
                                                {
                                                    allowance.tax_calculate_include === 1 ?
                                                        <span className="text-tax-include"> ({t('Tax Include')}:</span>
                                                        :
                                                        <span className="text-tax-include"> ({t('Tax Not Include')}:</span>
                                                }
                                                {
                                                    allowance.total_calculate_include === 1 ?
                                                        <span className="text-total-include">{t('Total Include')}</span>
                                                        :
                                                        <span className="text-total-include">{t('Total Not Include')}</span>
                                                }
                                                <span className="text-tax-include">)</span>
                                            </label>
                                            <TextField
                                                name="txtValueAllowance"
                                                type="text"
                                                value={allowance.allowance_amount}
                                                onChange={handleChangeTextField}
                                                className="input-col"
                                                disabled
                                                inputProps={{ maxLength: 200, className: "text-align-left" }}
                                            />
                                        </div>
                                    }

                                </Fragment>
                                )
                            })
                        }
                    </div>
                    <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                        <CCol xl="6" md="6">
                            <div className="d-flex flex-column padding-right-4">
                                <label>
                                    <span id="lbLifeInsurance">{t('Life Insurance')}</span>
                                </label>
                                <TextField
                                    id="txtLifeInsurance"
                                    type="text"
                                    value={lifeInsurance}
                                    onChange={handleChangeTextField}
                                    className="input-col background-gray"
                                    inputProps={{ maxLength: 200, className: "text-align-left bamawl-select" }}
                                    disabled={detailData !== null}
                                />
                            </div>
                        </CCol>
                    </CRow>
                    {
                        radAllowance === 1 &&
                            <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                                <CCol xl="6" md="6">
                                    <div className="d-flex flex-column border-right padding-right-4">
                                        <label className="d-flex">
                                            <span id="lbSalaryEqualityAdjust" className="mr-5">{t('Salary Equality Adjust')}</span>
                                            {
                                                basicSalaryCreateAPI === 2 && payrollCalculateOption === 2 && transactionCurrency === null &&
                                                currencyAPI.map((currency, idx) => {
                                                    return (
                                                        <div key={idx} className="d-flex">
                                                            <label className="d-flex align-items-center mr-3">
                                                                <span id={`${'lbSalaryEqualityAdjust'}${currency.currency_name}`} className="mr-2" >{currency.currency_name}</span>
                                                                <input type="radio" name="radSalaryEqualityAdjust" value={currency.id}
                                                                    checked={radSalaryEqualityAdjust === currency.id}
                                                                    onChange={handleChangeRadSalaryAdjust}
                                                                    disabled={detailData !== null && radSalaryEqualityAdjust !== currency.id}
                                                                >
                                                                </input>
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {
                                                currencyAPI.length > 1 && basicSalaryCreateAPI === 2 && payrollCalculateOption === 1 && 
                                                currencyAPI.map((currency, idx) => {
                                                    return (
                                                        <div key={idx} className="d-flex">
                                                            <label className="d-flex align-items-center mr-3">
                                                                <span id={`${'lbSalaryEqualityAdjust'}${currency.currency_name}`} className="mr-2" >{currency.currency_name}</span>
                                                                <input type="radio" name="radSalaryEqualityAdjust" value={currency.id}
                                                                    checked={radSalaryEqualityAdjust === currency.id}
                                                                    onChange={handleChangeRadSalaryAdjust}
                                                                    disabled={detailData !== null && radSalaryEqualityAdjust !== currency.id}
                                                                >
                                                                </input>
                                                            </label>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </label>
                                        <TextField
                                            id="txtSalaryEqualityAdjust"
                                            type="text"
                                            value={salaryEqualityAdjust}
                                            onChange={handleChangeTextField}
                                            className="input-col background-gray"
                                            inputProps={{ maxLength: 200, className: "text-align-left bamawl-select" }}
                                            disabled={detailData !== null}
                                        />
                                    </div>
                                </CCol>
                                <CCol xl="6" md="6">
                                    <div className="d-flex flex-column input-reponsive padding-right-3">
                                        <label className="d-flex align-items-center">
                                            <span id="lbSalaryEqualityAdjust">{t('Salary Equality Adjust')}:{t('Reason')}</span>
                                        </label>
                                        <TextField
                                            id="txtSalaryEqualityAdjustReson"
                                            type="text"
                                            value={salaryEqualityAdjustReson}
                                            onChange={handleChangeTextField}
                                            className="input-col background-gray"
                                            inputProps={{ maxLength: 512, className: "text-align-left bamawl-select" }}
                                            disabled={detailData !== null}
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                    }      
                     {
                        radAllowance !== 1 &&
                            <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                                <CCol xl="6" md="6">
                                    <div className="d-flex flex-column border-right padding-right-4">
                                        <label className="d-flex">
                                            <span id="lbSalaryEqualityAdjust" className="mr-5">{t('Salary Equality Adjust')}</span>
                                
                                        </label>
                                        <TextField
                                            id="txtSalaryEqualityAdjust"
                                            type="text"
                                            value={salaryEqualityAdjust}
                                            // onChange={handleChangeTextField}
                                            className="input-col background-gray"
                                            inputProps={{ maxLength: 200, className: "text-align-left bamawl-select" }}
                                            disabled={true}
                                        />
                                    </div>
                                </CCol>
                                <CCol xl="6" md="6">
                                    <div className="d-flex flex-column input-reponsive padding-right-3">
                                        <label className="d-flex align-items-center">
                                            <span id="lbSalaryEqualityAdjust">{t('Salary Equality Adjust')}:{t('Reason')}</span>
                                        </label>
                                        <TextField
                                            id="txtSalaryEqualityAdjustReson"
                                            type="text"
                                            value={salaryEqualityAdjustReson}
                                            // onChange={handleChangeTextField}
                                            className="input-col background-gray"
                                            inputProps={{ maxLength: 512, className: "text-align-left bamawl-select" }}
                                            disabled={true}
                                        />
                                    </div>
                                </CCol>
                            </CRow>
                    }               
                    {
                        calculateAllSaralyAPI.map((salary, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                                        <CCol xl="6" md="6">
                                            <div className="d-flex flex-column padding-right-4">
                                                <label id={`${'lbSubTotal'}${salary.currency_name}`} className="d-flex align-items-top">
                                                    <span >{t('Sub Total')}</span>
                                                    <span className="h6 ml-1">({salary.currency_name})</span>
                                                </label>
                                                <TextField
                                                    id={`${'txtSubTotal'}${salary.currency_name}`}
                                                    type="text"
                                                    value={salary.sub_total}
                                                    className="input-col"
                                                    disabled
                                                    inputProps={{ maxLength: 200, className: "text-align-left" }}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol xl="6" md="6" className="d-flex align-items-end input-reponsive">
                                            <span id={`${'lbBAS'}${salary.currency_name}`} className="font-italic">
                                                ({t('Basic Salary')} + {t('Allowance Include Tax')} + {t('Salary Equality Adjust')})
                                            </span>
                                        </CCol>
                                    </CRow>
                                </Fragment>
                            )
                        })
                    }
                    {
                        radAllowance === 1 &&
                        calculateAllSaralyAPI.map((salary, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                                        <CCol xl="6" md="6">
                                            <div className="d-flex flex-column padding-right-4">
                                                <label id={`${'lbTotalIncludeSalary'}${salary.currency_name}`} className="d-flex align-items-top">
                                                    <span >{t('Total Include Salary')}</span>
                                                    <span className="h6 ml-1">({salary.currency_name})</span>
                                                </label>
                                                <TextField
                                                    id={`${'txtTotalIncludeSalary'}${salary.currency_name}`}
                                                    type="text"
                                                    value={salary.total_include_salary}
                                                    className="input-col"
                                                    disabled
                                                    inputProps={{ maxLength: 200, className: "text-align-left" }}
                                                />
                                            </div>
                                        </CCol>
                                        <CCol xl="6" md="6" className="d-flex align-items-end input-reponsive">
                                            <span id={`${'lbBTS'}${salary.currency_name}`} className="font-italic">
                                                ({t('Basic Salary')} + {t('Total Include Allowance')} + {t('Salary Equality Adjust')})
                                            </span>
                                        </CCol>
                                    </CRow>
                                </Fragment>
                            )
                        })
                    }
                    {
                        radAllowance === 1 &&
                        calculateAllSaralyAPI.map((salary, idx) => {
                            return (
                                <Fragment key={idx}>
                                    <CRow className="mt-4 expense-request-input-card-detail-salary-calculate ">
                                        <CCol xl="6" md="6">
                                            <div className="d-flex flex-column padding-right-4">
                                                <label id={`${'lbTotalMonthlySalary'}${salary.currency_name}`} className="d-flex align-items-top">
                                                    <span >{t('Total Monthly Salary')}</span>
                                                    <span className="h6 ml-1">({salary.currency_name})</span>
                                                </label>
                                                <TextField
                                                    id={`${'txtTotalMonthlySalary'}${salary.currency_name}`}
                                                    type="text"
                                                    value={salary.total_monthly_salary}
                                                    className="input-col"
                                                    disabled
                                                    inputProps={{ maxLength: 200, className: "text-align-left" }}
                                                />
                                            </div>
                                        </CCol>
                                    </CRow>
                                </Fragment>
                            )
                        })
                    }
                    <br />
                </div>
            </CCol>
        </CRow>
        {
            basicSalaryModal &&
            <CModal centered closeOnBackdrop={false} className='deleteModal' htmlFor='deleteBtn' show={basicSalaryModal} onClose={basicSalaryModalClose} >
                <CModalHeader ><h5 id="lblBasicSalarySetting">{t('Basic Salary Setting')}</h5></CModalHeader>
                <CModalBody>
                    <CRow className="confirm-header expense-request-input-card-detail-salary-calculate " alignHorizontal="center">
                        <CCol>
                            <div className="box-container d-flex flex-column pr-5 m-0">
                                <div className="popup-item font-weight-bold">
                                    <label id="lbStatus" style={{ marginLeft: "35px" }}>{t('Status')}</label>
                                    <label id="lbAmount" >{t('Amount')}</label>
                                </div>
                                <div className="popup-item">
                                    <label className="d-flex align-items-center">
                                        <input type="radio" name="radBasicSalarySetting" value={0}
                                            onChange={handleChangeRadBasicSalary}
                                            checked={radbasicSalary === 0}
                                            disabled={detailData !== null && radbasicSalary !== 0}
                                        >
                                        </input>
                                        <span className="ml-4">{t('NONE')}</span>
                                    </label>
                                </div>
                                {
                                    basicSalaryAPI.map((basicSalary, idx) => {
                                        return (
                                            <Fragment key={idx}>
                                                <div className="popup-item">
                                                    <label className="d-flex align-items-center">
                                                        <input type="radio" name="radBasicSalarySetting"
                                                            value={basicSalary.id}
                                                            onChange={handleChangeRadBasicSalary}
                                                            checked={radbasicSalary === basicSalary.id}
                                                            disabled={detailData !== null && radbasicSalary !== basicSalary.id}
                                                        >
                                                        </input>
                                                        <span className="ml-4">{basicSalary.experience}</span>
                                                    </label>
                                                    <label>{basicSalary.basic_amount}</label>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </CCol>
                    </CRow>
                    <CButtonToolbar className="confirm-body mt-3" justify="center">
                        {
                            detailData == null &&
                            <CButton className="form-btn mr-3" id="btnAddBasicSalarySetting" active onClick={basicSalaryModalAdd}>{t('Add')}</CButton>
                        }
                        <CButton className="form-btn" onClick={basicSalaryModalClose}>{t('Close')}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        }
    </>)
}

export default SalaryCalculateSettingAllowance;