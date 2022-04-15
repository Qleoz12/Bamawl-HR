import { CCard, CCol, CImg, CRow } from '@coreui/react';
import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import EmployeeInfoDetailTableSalaryBox from './EmployeeInfoDetailTableSalaryBox';


const EmployeeInfoDetailSalaryBox = (props) => {
    const { t } = useTranslation();
    useEffect(() => { });

    return (
        <>
            {props.detailData && props.detailData.salary && (
                <Fragment>
                    <CRow lg="12">
                        <h5 className="pl-3 font-weight-bold mt-4" style={{ color: "#4E57AA" }}>
                            <CImg className="emp-info-detail-img-sub" src="avatars/list.png" alt="list" />
                            {t('Salary')}</h5>
                    </CRow>
                    <div>
                        <CCard className="table-panel emp-info-detail-card ">
                            <CRow lg="12" className="mt-3 mb-lg-2">
                                <CCol lg="5" className="px-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                style={{ whiteSpace: 'nowrap' }}
                                                className="font-weight-bold"
                                                id="lbBasicSalary">
                                                {t('Basic Salary')}
                                            </label>
                                        </div>
                                        <div>
                                            <TextField
                                                id="txtBasicSalary"
                                                className="input-emp-info-detail"
                                                fullWidth
                                                value={props.detailData.salary.basic_salary.salary 
                                                    && props.detailData.salary.basic_salary.currency_desc ?
                                                    props.detailData.salary.basic_salary.salary
                                                    + " " +
                                                    "(" + props.detailData.salary.basic_salary.currency_desc + ")"
                                                    : ""}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </CCol>
                                <CCol lg="2">
                                    <div className="line"></div>
                                </CCol>
                                <CCol lg="5" className="pl-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                style={{ whiteSpace: 'nowrap' }}
                                                className="font-weight-bold"
                                                id="">
                                                {t('Salary Equality Adjustment')}
                                            </label>
                                        </div>
                                        {props.detailData.salary.salary_equality_adjustment
                                            && props.detailData.salary.salary_equality_adjustment.length > 0
                                            && (
                                                <CRow lg="12">
                                                    {props.detailData.salary.salary_equality_adjustment.map((i, index) => {
                                                        return (
                                                            <CCol key={index} lg="6">
                                                                <div>
                                                                    <TextField
                                                                        className="input-emp-info-detail"
                                                                        fullWidth
                                                                        value={i.salary + " " + "(" + i.currency_desc + ")"}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </CCol>
                                                        )
                                                    })
                                                    }
                                                </CRow>
                                            )}
                                    </div>
                                </CCol>
                            </CRow>
                            <CRow lg="12" className="mt-3 mb-lg-2">
                                <CCol lg="5" className="px-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                className="font-weight-bold"
                                                id="">
                                                {t('Monthly Salary')}
                                            </label>
                                        </div>
                                        {props.detailData.salary.monthly_salary
                                            && props.detailData.salary.monthly_salary.length > 0
                                            && (
                                                <CRow lg="12">
                                                    {props.detailData.salary.monthly_salary.map((i, index) => {
                                                        return (
                                                            <CCol key={index} lg="6">
                                                                <div>
                                                                    <TextField
                                                                        className="input-emp-info-detail"
                                                                        fullWidth
                                                                        value={i.salary + " " + "(" + i.currency_desc + ")"}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </CCol>
                                                        )
                                                    })
                                                    }
                                                </CRow>
                                            )}
                                    </div>
                                </CCol>
                                <CCol lg="2">
                                    <div className="line"></div>
                                </CCol>
                                <CCol lg="5" className="pl-lg-5">
                                    <div className="mb-2">
                                        <div>
                                            <label
                                                className="font-weight-bold"
                                                id="lb">
                                                {t('Total Salary')}
                                            </label>
                                        </div>
                                        {props.detailData.salary.total_salary
                                            && props.detailData.salary.total_salary.length > 0
                                            && (
                                                <CRow lg="12">
                                                    {props.detailData.salary.total_salary.map((i, index) => {
                                                        return (
                                                            <CCol key={index} lg="6">
                                                                <div>
                                                                    <TextField
                                                                        className="input-emp-info-detail"
                                                                        fullWidth
                                                                        value={i.salary + " " + "(" + i.currency_desc + ")"}
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </CCol>
                                                        )
                                                    })
                                                    }
                                                </CRow>
                                            )}
                                    </div>
                                </CCol>
                            </CRow>
                        </CCard>
                    </div>
                    <EmployeeInfoDetailTableSalaryBox payment={props.detailData.payment_transfer_list} />
                </Fragment>
            )}
        </>
    )
}
export default EmployeeInfoDetailSalaryBox;