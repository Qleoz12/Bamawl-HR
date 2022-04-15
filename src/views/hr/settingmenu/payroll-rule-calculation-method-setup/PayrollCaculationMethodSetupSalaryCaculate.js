/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCol, CRow, CImg, CLabel, CCollapse, CSwitch, CAlert, CModal,
    CModalHeader, CModalBody, CButtonToolbar, CButton, CSelect
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";

const PayrollCaculationMethodSetupSalaryCaculate = props => {
    let {
        mainTable,
        collapseSalary,
        swithFirstDay,
        styleSwitchOff,
        styleSwitchOn,
        salaryCalculationDayStart,
        handleChangeSwitchFirstDay,
        handleChangeSalaryCalculationDayStart,
        salaryCalculationDayEnd,
        handleChangeSalaryCalculationDayEnd,
        handleChangeCollapseSalary,
        bankPaymentDate,
        handleChangeBankPaymentDate,
        switchCreation,
        handleChangeSwitchCreation,
        bankPaymentDateModal,
        handleClickBankPaymentDate,
        bankPaymentDateShow,
        bankPaymentDateModalOK,
        bankPaymentDateModalClose,
        editData
    } = props;
    const { t } = useTranslation();
    useEffect(() => {
    });

    const useStyles = makeStyles(theme => ({
        menuPaper: {
            maxHeight: 600
        },
        anchorOrigin: {
            vertical: "bottom",
        }
    }));

    const classes = useStyles();

    return (
        mainTable.length > 0 && <>
            <CRow lg="12" >
                <CCol lg="5">
                    <div className="d-flex">
                        <CImg src={'avatars/list.png'} className="mt-1" alt="titleicon" style={{ width: '5px', height: '12px' }} />
                        <details onClick={handleChangeCollapseSalary} open={editData !== null}>
                            <summary id="lbSalaryCaculateDayRanges" className="required ml-2 font-weight-bold">{t('Salary Calculate Day Range (days)')}</summary>
                        </details>
                    </div>    
                </CCol>
            </CRow><br />
            <CCollapse show={collapseSalary}>
                <CRow className="pl-5" >
                    <CCol lg="12">
                        <div className="content-secondary pt-4 pb-3 mb-4">
                            <CRow>
                                <div className="pl-4 pr-4">
                                    <CCol className="d-flex">
                                        <CLabel id="lblFirstDayToLastDay" style={swithFirstDay ? styleSwitchOff : styleSwitchOn}>{t('First Day To Last Day')}</CLabel>
                                        <CSwitch id="swItemFM" className={'mx-5'} shape={'pill'} color={'info'} size={'sm'} checked={swithFirstDay} onChange={handleChangeSwitchFirstDay} />
                                        <CLabel id="lblManualSalary" style={swithFirstDay ? styleSwitchOn : styleSwitchOff}>{t('Manual')}</CLabel>
                                    </CCol>
                                </div>
                            </CRow>
                            {
                                swithFirstDay &&
                                <CRow className="ml-5 pl-4 pr-4 text-center">
                                    <CCol lg="5" sm="8" >
                                        <CAlert color="dark">
                                            <CRow>
                                                <CCol lg="6" sm="6" className="mt-2 border-right" >
                                                    <CRow className="justify-content-center">
                                                        <CImg src={'avatars/Salary Calculate Day Range .png'} height={20} />
                                                    </CRow>
                                                    <CRow style={styleSwitchOff} className="justify-content-center">
                                                        <small>{t('From')}</small>
                                                    </CRow>
                                                    <CRow className="justify-content-center">
                                                        <FormControl style={{ width: "90px" }}>
                                                            <Select
                                                                id="slbFrom"
                                                                value={salaryCalculationDayStart}
                                                                onChange={handleChangeSalaryCalculationDayStart}
                                                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                                                            >
                                                                <MenuItem aria-label="None" value="" >{t('None')}</MenuItem>
                                                                {
                                                                    Array.from(Array(31).keys()).map(item => {
                                                                        return (
                                                                            <MenuItem key={item + 1} value={item + 1}>{item + 1}</MenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <br />
                                                    </CRow>
                                                </CCol>
                                                <CCol lg="6" sm="6" className="mt-2">
                                                    <CRow className="justify-content-center">
                                                        <CImg src={'avatars/Salary Calculate Day Range .png'} height={20} />
                                                    </CRow>
                                                    <CRow style={styleSwitchOff} className="justify-content-center">
                                                        <small>{t('To')}</small>
                                                    </CRow>
                                                    <CRow className="justify-content-center">
                                                        <FormControl style={{ width: "90px" }}>
                                                            <Select
                                                                id="slbTo"
                                                                value={salaryCalculationDayEnd}
                                                                onChange={handleChangeSalaryCalculationDayEnd}
                                                                MenuProps={{ classes: { paper: classes.menuPaper } }}
                                                            >
                                                                <MenuItem aria-label="None" value="">{t('None')}</MenuItem>
                                                                {
                                                                    Array.from(Array(31).keys()).map(item => {
                                                                        return (
                                                                            <MenuItem key={item} value={item + 1}>{item + 1}</MenuItem>
                                                                        )
                                                                    })
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                        <br />
                                                    </CRow>
                                                </CCol>
                                            </CRow>
                                        </CAlert>
                                    </CCol>
                                </CRow>
                            }
                        </div>
                    </CCol>
                </CRow>
            </CCollapse>
            <CRow lg="12" className="pl-5">
                <CCol lg="4">
                    <div className="d-flex align-items-center content-secondary pt-4 pb-4 mb-4 pr-4">
                        <div className="d-flex pl-2 pr-4 align-items-center" >
                            <CCol>
                                <CLabel id="lblBankPaymentDate" className="required mb-0">{t('Bank Payment Date')}</CLabel>
                            </CCol>
                        </div>
                        <div className="d-flex flex-grow-1 pl-2 pr-4 align-items-center justify-content-center" >
                            <CLabel className="mr-3 mb-0">{bankPaymentDateShow}</CLabel>
                            <input type="image" src={'avatars/bank_payment_date.png'} alt="remove" height={35} onClick={handleClickBankPaymentDate} className="cursor-pointer" />
                        </div>
                    </div>
                </CCol>
                <CCol lg="8" >
                    <div className="d-flex content-secondary pt-4 pb-4 mb-4 pr-4 pl-2">
                        <div className="d-flex pl-2 pr-4 align-items-center" >
                            <CCol >
                                <CLabel id="lbCreationOfBasicSalary" className="required mb-0">{t('Creation of Basic Salary')}</CLabel>
                            </CCol>
                        </div>
                        <div className="d-flex align-items-center mr-4 mt-1">
                            <CLabel id="lblExperience" style={switchCreation ? styleSwitchOff : styleSwitchOn}>{t('Experience')}</CLabel>
                            <CSwitch id="swItemEM" className={'mx-5'} shape={'pill'} color={'info'} size={'sm'} checked={switchCreation} onChange={handleChangeSwitchCreation} />
                            <CLabel id="lblManualCreation" style={switchCreation ? styleSwitchOn : styleSwitchOff}>{t('Manual')}</CLabel>
                        </div>
                    </div>
                </CCol>
            </CRow><br />
            {bankPaymentDateModal &&
                <CModal centered closeOnBackdrop={false} className='deleteModal' htmlFor='deleteBtn' show={bankPaymentDateModal} onClose={bankPaymentDateModalClose} >
                    <CModalHeader ><h5>{t('Bank Payment Date')}</h5></CModalHeader>
                    <CModalBody>
                        <CRow className="confirm-header" alignHorizontal="center">
                            <CSelect id="slbBankPaymentDate" autoFocus className="bamawl-select" custom style={{ width: '160px', marginBottom: "20px" }} 
                                onChange={handleChangeBankPaymentDate} 
                                value={bankPaymentDate}  >
                                <option key="" value={0}>
                                    {t("None")}
                                </option>
                                {
                                    Array.from(Array(31).keys()).map(item => {
                                        return (
                                            <option key={item} value={item + 1}>{item + 1}</option>
                                        )
                                    })
                                }
                            </CSelect>
                        </CRow>
                        <CButtonToolbar className="confirm-body" justify="center">
                            <CButton className="confirm-btn" active onClick={bankPaymentDateModalOK}>{t('Ok')}</CButton>
                            <CButton className="confirm-btn" onClick={bankPaymentDateModalClose}>{t('Close')}</CButton>
                        </CButtonToolbar>
                    </CModalBody>
                </CModal>
            }
        </>
    );
}
export default PayrollCaculationMethodSetupSalaryCaculate;