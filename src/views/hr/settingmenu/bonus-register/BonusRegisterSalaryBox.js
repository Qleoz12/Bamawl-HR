import { CCard, CCardBody, CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BonusRegisterSalaryBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol lg="6" className="bonus-register-title-col" >
            <CImg className="bonus-register-title-img" src="avatars/list.png" alt="list" />
            <label id="lblSalary" className="ml-3 mt-2 required">{t('Salary')}</label>
        </CCol>
        <CCard className='table-panel mt-2 bonus-register-card-bonus'>
            <CRow lg="12" className="mt-3 mb-3 ml-2 mr-2">
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioBasicSalary"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck1}
                            value={1}
                            checked={props.radioCheck === 1} />
                        <CCard className='card-bonus-register d-flex justify-content-between' >
                            <CCardBody >
                                <div className="bonus-register-basic-salary-border">
                                    <h6 id="lbBasicSalary" className='m-3 font-weight-bold'>{t('Basic Salary')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    <div>
                                        <label id="lbIncludeTax1" >
                                            <input id='chkIncludeTax1' className='m-1' type='checkbox' 
                                            checked={props.includeTax1} 
                                            onChange={props.getIncludeTax1} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div  style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary1">
                                            <input id='chkIncludeBasicSalary1' className='m-1' type='checkbox' 
                                            checked={props.includeBasic1} 
                                            onChange={props.getIncludeBasic1} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioTotalSalary"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck2}
                            value={2}
                            checked={props.radioCheck === 2} />
                        <CCard className='card-bonus-register d-flex justify-content-between' >
                            <CCardBody >
                                <div className="bonus-register-total-salary-border">
                                    <h6 id="lbTotalSalary" className='m-3 font-weight-bold'>{t('Total Salary')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    <div>
                                        <label id="lbIncludeTax2">
                                            <input id='chkIncludeTax2' className='m-1' 
                                            type='checkbox' checked={props.includeTax2} 
                                            onChange={props.getIncludeTax2} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary2">
                                            <input id='chkIncludeBasicSalary2' className='m-1' type='checkbox' 
                                            checked={props.includeBasic2} 
                                            onChange={props.getIncludeBasic2} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioBasicSalaryWorkingMonth12"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck3}
                            value={3}
                            checked={props.radioCheck === 3} />
                        <CCard className='card-bonus-register d-flex justify-content-between'>
                            <CCardBody >
                                <div className="bonus-register-basic-salary-working-border">
                                    <h6 id="lbBasicSalary/12" className='m-3 font-weight-bold'>{t('Basic Salary *working month /12')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2' >
                                    <div>
                                        <label id="lbIncludeTax3">
                                            <input id='chkIncludeTax3' className='m-1' type='checkbox' 
                                            checked={props.includeTax3} 
                                            onChange={props.getIncludeTax3} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary3">
                                            <input id='chkIncludeBasicSalary3' className='m-1' type='checkbox' 
                                            checked={props.includeBasic3} 
                                            onChange={props.getIncludeBasic3} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                   
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mt-3 mb-3 ml-2 mr-2">
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioFixedAmount"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck4}
                            value={7}
                            checked={props.radioCheck === 7} />
                        <CCard className='card-bonus-register d-flex justify-content-center' >
                            <CCardBody >
                                <div className="bonus-register-fixed-amount-border">
                                    <h6 id="lbFixedAmount" className='m-3 font-weight-bold'>{t('Fixed Amount')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    <div>
                                        <TextField id='txtAmount'
                                            type="text"
                                            className='input-bonus-register bonus-register-text-field-placeholder'
                                            placeholder={t('Type Amount')}
                                            fullWidth aria-label="Close"
                                            value={props.fixedAmount}
                                            onChange={props.getFixedAmount} />
                                    </div>
                                    <CRow lg="12" className="mt-1 mb-1 ml-2 mr-2">
                                        {
                                            props.currencyAPI &&
                                            props.currencyAPI.map((i, index) => {
                                                return (
                                                    <CRow key={index} lg="12" className="mt-1 mb-1 mr-2">
                                                        <label className="ml-3">{i.currency_desc}
                                                            <div className="bonus-register-radio">
                                                                <input type="radio" name="currency_desc"
                                                                    id="radioUSD"
                                                                    onChange={props.selectedCurrentChange}
                                                                    value={i.id}
                                                                    checked={props.currencies === i.id} />
                                                            </div>
                                                        </label>
                                                    </CRow>
                                                )
                                            })
                                        }
                                    </CRow>
                                    <div>
                                        <label id="lbIncludeTax4">
                                            <input id='chkIncludeTax4' className='m-1' type='checkbox' 
                                            checked={props.includeTax4} 
                                            onChange={props.getIncludeTax4} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary4">
                                            <input id='chkIncludeBasicSalary4' className='m-1' type='checkbox' 
                                            checked={props.includeBasic4} 
                                            onChange={props.getIncludeBasic4} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeTotalSalary4">
                                            <input id='chkIncludeTotalSalary4' className='m-1' type='checkbox' 
                                            checked={props.includeTotal4} 
                                            onChange={props.getIncludeTotal4} />
                                            {t('Include Total Salary')}
                                        </label>
                                    </div>
                                   
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioPercentBasic"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck5}
                            value={5}
                            checked={props.radioCheck === 5} />
                        <CCard className='card-bonus-register d-flex justify-content-center' >
                            <CCardBody >
                                <div className="bonus-register-per-basic-salary-border">
                                    <h6 id="lbPercentBasic" className='m-3 font-weight-bold'>{t('Percentage of basic salary')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    <div>
                                        <TextField className='input-bonus-register bonus-register-text-field-placeholder'
                                            placeholder={t('Type percentage')}
                                            fullWidth aria-label="Close"
                                            type="text"
                                            value={props.percentBasic}
                                            onChange={props.getPercentBasic}
                                            id='txtTypePercentageBasicSalary' />
                                    </div>
                                    <div className="mt-4">
                                        <label id="lbIncludeTax5">
                                            <input id='chkIncludeTax5' className='m-1' type='checkbox' 
                                            checked={props.includeTax5} 
                                            onChange={props.getIncludeTax5} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div className="mt-2" style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary5">
                                            <input id='chkIncludeBasicSalary5' className='m-1' type='checkbox' 
                                            checked={props.includeBasic5} 
                                            onChange={props.getIncludeBasic5} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeTotalSalary5">
                                            <input id='chkIncludeTotalSalary5' className='m-1' type='checkbox' 
                                            checked={props.includeTotal5} 
                                            onChange={props.getIncludeTotal5} />
                                            {t('Include Total Salary')}
                                        </label>
                                    </div>
                                   
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioPercentTotal"
                            name="choose-pay-type" type='radio'
                            onChange={props.getCheck6}
                            value={6}
                            checked={props.radioCheck === 6} />
                        <CCard className='card-bonus-register d-flex justify-content-center' >
                            <CCardBody >
                                <div className="bonus-register-per-total-salary-border">
                                    <h6 id="lbPercentTotal" className='m-3 font-weight-bold'>{t('Percentage of total salary')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    
                                    <div>
                                        <TextField className='input-bonus-register bonus-register-text-field-placeholder'
                                            placeholder={t('Type percentage')}
                                            type="text"
                                            id="txtTypePercentageTotalSalary"
                                            value={props.percentTotal}
                                            fullWidth aria-label="Close"
                                            onChange={props.getPercentTotal} />
                                    </div>
                                    <div className="mt-4">
                                        <label id="lbIncludeTax6">
                                            <input id='chkIncludeTax6' className='m-1' type='checkbox' 
                                            checked={props.includeTax6} 
                                            onChange={props.getIncludeTax6} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div className="mt-2" style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary6">
                                            <input id='chkIncludeBasicSalary6' className='m-1' type='checkbox' 
                                            checked={props.includeBasic6} 
                                            onChange={props.getIncludeBasic6} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    <div>
                                        <label id="lbIncludeTotalSalary6" style={{display: "none"}}>
                                            <input id='chkIncludeTotalSalary6' className='m-1' type='checkbox' 
                                            checked={props.includeTotal6} 
                                            onChange={props.getIncludeTotal6} />
                                            {t('Include Total Salary')}
                                        </label>
                                    </div>
                                    
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
            </CRow>
            <CRow lg="12" className="mt-3 mb-3 ml-2 mr-2">
                <CCol lg="4" className="bonus-register-limit-col">
                    <div className='col-xl-10 col-lg-12 col-md-12 col-sm-12 p-0'>
                        <input className="bonus-register-pay-type"
                            id="radioTotalSalaryWorkingMonth12"
                            name="choose-pay-type"
                            type='radio' onChange={props.getCheck7}
                            value={4}
                            checked={props.radioCheck === 4} />
                        <CCard className='card-bonus-register d-flex justify-content-center'>
                            <CCardBody >
                                <div className="bonus-register-basic-salary-border">
                                    <h6 id="lbTotalSalary/12" className='m-3 font-weight-bold'>{t('Total salary *working month /12')}</h6>
                                </div>
                                <div className='ml-3 mr-3 mt-2 mb-2'>
                                    <div>
                                        <label id='lbIncludeTax7'>
                                            <input id='chkIncludeTax7' className='m-1' type='checkbox' 
                                            checked={props.includeTax7} 
                                            onChange={props.getIncludeTax7} />
                                            {t('Include Tax')}
                                        </label>
                                    </div>
                                    <div style={{display: "none"}}>
                                        <label id="lbIncludeBasicSalary7">
                                            <input id='chkIncludeBasicSalary7' className='m-1' type='checkbox' 
                                            checked={props.includeBasic7} 
                                            onChange={props.getIncludeBasic7} />
                                            {t('Include Basic Salary')}
                                        </label>
                                    </div>
                                    
                                </div>
                            </CCardBody>
                        </CCard>
                    </div>
                </CCol>
            </CRow>
            <CRow sm="12" lg="8" className="mt-3 mb-3 ml-2 mr-2">
                <CCol sm="6" lg="4" className="bonus-register-title-col justify-content-sm-left">
                    <label id="lbMultiplyBy"
                        className="mt-2 pt-1 font-weight-bold bonus-register-add-mul-label required text-nowrap">
                            {t('Multiply By')}</label>
                    <TextField className="bonus-register-text-field-mul"
                        value={props.multiplyBy} aria-label="Close"
                        onChange={props.getMultiplyBy}
                        type="text"
                        disabled={props.radioCheck === 7} 
                        />
                </CCol>
                <CCol sm="6" lg="4" className="bonus-register-title-col justify-content-sm-left" >
                    <label id="lbAddBy"
                        className="mt-2 pt-1 font-weight-bold bonus-register-add-mul-label required text-nowrap">
                            {t('Added By')}</label>
                    <TextField className="bonus-register-text-field-add"
                        value={props.addedBy} aria-label="Close"
                        onChange={props.getAddedBy}
                        type="text"
                        disabled={props.radioCheck === 7} />
                </CCol>
            </CRow>
        </CCard>
    </>)
}
export default BonusRegisterSalaryBox;