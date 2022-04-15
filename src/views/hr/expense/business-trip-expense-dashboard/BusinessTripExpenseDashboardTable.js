/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CLabel, CRow, CCollapse, CLink } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const BusinessTripExpenseDashboardTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    let {
        mainTable,
        currency,
        clickHereBusinessTrip,
        clickHereExpenseList,
        clickHereBusinessTripRequest,
        clickHereBusinessTripAdjustmentRequest,
        clickHereExpenseAdjustmentRequest,
        clickHereExpenseRequest,
        confirmBusiness,
        openItemModal,
        numCurrencies,
        handleChangeCollapseBTRequest,
        handleChangeCollapseBTARequest,
        handleChangeCollapseERequest,
        handleChangeCollapseEARequest,
        collapseBTRequest,
        collapseBTARequest,
        collapseERequest,
        collapseEARequest,
        employeeName,
        settingTime
    } = props;

    return (<>
        {
            <>
                {
                    <CRow lg="12">
                        <CCol className="px-lg-6">
                            <CCard className="expense-request-card-detail">
                                <CRow lg="12" >
                                    <CCol lg="4"><CLabel className="dashboard-title">{t('Welcome!')}</CLabel></CCol>
                                </CRow>
                                <CRow lg="12" >
                                    <CCol lg="12">
                                        <CLabel className="dashboard-title">{t('Dear')}&nbsp;</CLabel><CLabel className="dashboard-title" style={{ color: "#4e57a9" }}>{employeeName},</CLabel>&nbsp;<CLabel className="dashboard-title">{settingTime} </CLabel>
                                    </CCol>
                                </CRow>
                                {/* Business Trip Request Start*/}
                                {mainTable.busines_trip_request_list && mainTable.busines_trip_request_list.length > 0 &&
                                    <>
                                        <CCol lg="12">
                                            <CRow alignHorizontal="start">
                                                {collapseBTRequest == true &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8018.png'} width="17px" height="17px" onClick={handleChangeCollapseBTRequest} />
                                                }
                                                {collapseBTRequest == false &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8228.png'} width="17px" height="17px" onClick={handleChangeCollapseBTRequest} />
                                                }
                                                <CImg className="m-left-19" src={'/avatars/icon_awesome_star8.png'} width="17px" height="17px" /><CLabel className="m-left-10 mt-2">{t('Business Trip Request')}</CLabel>
                                            </CRow>
                                        </CCol>
                                        <CCollapse show={collapseBTRequest}>
                                            <CCol lg="12">
                                                <CCol lg="12">
                                                    <CRow alignHorizontal="end">
                                                        <div className="row-count-msg" id="lblTotalRows">
                                                            {t('Total Rows').replace("%s", mainTable.busines_trip_request_list && mainTable.busines_trip_request_list.length > 0 ? mainTable.busines_trip_request_list.length : 0)}
                                                        </div>
                                                    </CRow>
                                                </CCol>
                                                <div className="table-responsive tableFixHead">
                                                    <table className="table">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblNo" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("No")}
                                                                </th>
                                                                <th id="tblBusinessTripDate" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Business Trip Date")}
                                                                </th>
                                                                <th id="tblEmployeeID" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeName" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblDestination" width="" className="text-nowrap text-left align-middle" rowSpan="2" >
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Destination")}
                                                                </th>
                                                                <th id="tblTotalAmount" width="" className="responsive-tableTh text-nowrap text-center" colSpan={numCurrencies} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Total Amount")}
                                                                </th>
                                                                <th id="tblAction" width="30%" className="responsive-tableTh" colSpan="4" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Action")}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                {
                                                                    currency.map((currency, index) => {
                                                                        return (
                                                                            currency.expense_flag === 1 &&
                                                                            <th key={index} id={currency.id} width="10%" className="text-center responsive-tableTh no-border-radius">
                                                                                <CImg
                                                                                    className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                                    src="/avatars/titleicon.png"
                                                                                    alt="titleicon"
                                                                                />
                                                                                {currency.currency_name}
                                                                            </th>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mainTable.busines_trip_request_list && mainTable.busines_trip_request_list.length > 0 &&
                                                                mainTable.busines_trip_request_list.map((sec, index) => {
                                                                    return (
                                                                        <tr width="100%" key={index}>
                                                                            <td id="tblNo" width="" className="text-right checkIO-request-vertical-line"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td id="tblTripPeriodDate" width="" className="text-center td-pink">
                                                                                {sec.infor.trip_period_from_date}, <br />
                                                                                {sec.infor.trip_period_to_date}
                                                                            </td>
                                                                            <td id="tblEmployeeID" width="" className="text-right"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_id}
                                                                            </td>
                                                                            <td id="tblEmployeeName" width="" className="text-left"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_name}
                                                                            </td>
                                                                            <td id="tblDestination" width="" style={{ maxWidth: "200px" }} className="text-left col-color-blue">
                                                                                {sec.infor.destination}
                                                                            </td>
                                                                            {
                                                                                sec.infor.total_amount.length === 0 &&
                                                                                currency.map((currency, index) => {
                                                                                    return (
                                                                                        currency.expense_flag === 1 &&
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                        </td>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                sec.infor.total_amount.map((amount, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                            {amount.advance_amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
                                                                            }
                                                                            {!sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={confirmBusiness.bind(this, sec.infor, "Business Trip Request")}>{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={openItemModal.bind(this, sec.infor, "Business Trip Request")}>{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {!sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={clickHereBusinessTripRequest.bind(this, sec.infor)}>{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            <td className="td-num" width="7%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                <CLink onClick={clickHereBusinessTrip.bind(this, sec.infor)} >{t('Click Here')}</CLink>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CCollapse>
                                        <br />
                                    </>
                                }
                                {/* Business Trip Request End*/}
                           
                                {/* Business Trip Adjustment Request Start*/}
                                {mainTable.busines_trip_adjustment_request_list && mainTable.busines_trip_adjustment_request_list.length > 0 &&
                                    <>
                                        <CCol lg="12">
                                            <CRow alignHorizontal="start">
                                                {collapseBTARequest == true &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8226.png'} width="17px" height="17px" onClick={handleChangeCollapseBTARequest} />
                                                }
                                                {collapseBTARequest == false &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8015.png'} width="17px" height="17px" onClick={handleChangeCollapseBTARequest} />
                                                }
                                                <CImg className="m-left-19" src={'/avatars/icon_awesome_star5.png'} width="17px" height="17px" /><CLabel className="m-left-10 mt-2">{t('Business Trip Adjustment Request')}</CLabel>
                                            </CRow>
                                        </CCol>
                                        <CCollapse show={collapseBTARequest}>
                                            <CCol lg="12">
                                                <CCol lg="12">
                                                    <CRow alignHorizontal="end">
                                                        <div className="row-count-msg" id="lblTotalRows">
                                                            {t('Total Rows').replace("%s", mainTable.busines_trip_adjustment_request_list && mainTable.busines_trip_adjustment_request_list.length > 0 ? mainTable.busines_trip_adjustment_request_list.length : 0)}
                                                        </div>
                                                    </CRow>
                                                </CCol>
                                                <div className="table-responsive tableFixHead">
                                                    <table className="table">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblNo" width="3%" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("No")}
                                                                </th>
                                                                <th id="tblBusinessTripDate" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Business Trip Date")}
                                                                </th>
                                                                <th id="tblEmployeeID" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeName" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblDestination" width="" className="text-nowrap text-left align-middle" rowSpan="2" >
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Destination")}
                                                                </th>
                                                                <th id="tblTotalAmount" width="" className="responsive-tableTh text-nowrap text-center" colSpan={numCurrencies} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Total Amount")}
                                                                </th>
                                                                <th id="tblAction" width="30%" className="responsive-tableTh" colSpan="4" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Action")}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                {
                                                                    currency.map((currency, index) => {
                                                                        return (
                                                                            currency.expense_flag === 1 &&
                                                                            <th key={index} id={currency.id} width="10%" className="text-center responsive-tableTh no-border-radius">
                                                                                <CImg
                                                                                    className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                                    src="/avatars/titleicon.png"
                                                                                    alt="titleicon"
                                                                                />
                                                                                {currency.currency_name}
                                                                            </th>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mainTable.busines_trip_adjustment_request_list && mainTable.busines_trip_adjustment_request_list.length > 0 &&
                                                                mainTable.busines_trip_adjustment_request_list.map((sec, index) => {
                                                                    return (
                                                                        <tr width="100%" key={index}>
                                                                            <td id="tblNo" width="" className="text-right checkIO-request-vertical-line"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td id="" width="" className="text-center td-pink">
                                                                                {sec.infor.trip_period_from_date}, <br />
                                                                                {sec.infor.trip_period_to_date}
                                                                            </td>
                                                                            <td id="" width="" className="text-right"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_id}
                                                                            </td>
                                                                            <td id="" width="" className="text-left"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_name}
                                                                            </td>
                                                                            <td id="" width="" style={{ maxWidth: "200px" }} className="text-left col-color-blue">
                                                                                {sec.infor.destination}
                                                                            </td>
                                                                            {
                                                                                sec.infor.total_amount.length === 0 &&
                                                                                currency.map((currency, index) => {
                                                                                    return (
                                                                                        currency.expense_flag === 1 &&
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                        </td>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                sec.infor.total_amount.length > 0 &&
                                                                                sec.infor.total_amount.map((amount, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                            {amount.advance_amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
                                                                            }
                                                                            {!sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={confirmBusiness.bind(this, sec.infor, "Business Trip Adjustment Request")}>{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={openItemModal.bind(this, sec.infor, "Business Trip Adjustment Request")}>{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {!sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={clickHereBusinessTripAdjustmentRequest.bind(this, sec.infor)}>{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            <td className="td-num" width="7%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                <CLink onClick={clickHereBusinessTrip.bind(this, sec.infor)} >{t('Click Here')}</CLink>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CCollapse>
                                        <br />
                                    </>
                                }
                                {/* Business Trip Adjustment Request End*/}                        
                                {/* Expense Request Start*/}
                                {mainTable.expense_request_list && mainTable.expense_request_list.length > 0 &&
                                    <>
                                        <CCol lg="12">
                                            <CRow alignHorizontal="start">
                                                {collapseERequest == true &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8225.png'} width="17px" height="17px" onClick={handleChangeCollapseERequest} />
                                                }
                                                {collapseERequest == false &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8016.png'} width="17px" height="17px" onClick={handleChangeCollapseERequest} />
                                                }
                                                <CImg className="m-left-19" src={'/avatars/icon_awesome_star6.png'} width="17px" height="17px" /><CLabel className="m-left-10 mt-2">{t('Expense Request')}</CLabel>
                                            </CRow>
                                        </CCol>
                                        <CCollapse show={collapseERequest}>
                                            <CCol lg="12">
                                                <CCol lg="12">
                                                    <CRow alignHorizontal="end">
                                                        <div className="row-count-msg" id="lblTotalRows">
                                                            {t('Total Rows').replace("%s", mainTable.expense_request_list && mainTable.expense_request_list.length > 0 ? mainTable.expense_request_list.length : 0)}
                                                        </div>
                                                    </CRow>
                                                </CCol>
                                                <div className="table-responsive tableFixHead">
                                                    <table className="table">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblNo" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("No")}
                                                                </th>
                                                                <th id="tblRequestDate" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Request Date")}
                                                                </th>
                                                                <th id="tblEmployeeID" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeName" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblSubject" width="" className="text-nowrap text-left align-middle" rowSpan="2" >
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Subject")}
                                                                </th>
                                                                <th id="tblTotalAmount" width="" className="responsive-tableTh text-nowrap text-center" colSpan={numCurrencies} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Total Amount")}
                                                                </th>
                                                                <th id="tblAction" width="30%" className="responsive-tableTh" colSpan="4" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Action")}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                {
                                                                    currency.map((currency, index) => {
                                                                        return (
                                                                            currency.expense_flag === 1 &&
                                                                            <th key={index} id={currency.id} width="10%" className="text-center responsive-tableTh no-border-radius">
                                                                                <CImg
                                                                                    className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                                    src="/avatars/titleicon.png"
                                                                                    alt="titleicon"
                                                                                />
                                                                                {currency.currency_name}
                                                                            </th>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mainTable.expense_request_list && mainTable.expense_request_list.length > 0 &&
                                                                mainTable.expense_request_list.map((sec, index) => {
                                                                    return (

                                                                        <tr width="100%" key={index}>
                                                                            <td id="tblNo" width="" className="text-right checkIO-request-vertical-line"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td id="" width="" className="text-center td-pink">
                                                                                {sec.infor.requested_date}
                                                                            </td>
                                                                            <td id="" width="" className="text-right"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_id}
                                                                            </td>
                                                                            <td id="" width="" className="text-left"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_name}
                                                                            </td>
                                                                            <td id="" width="" style={{ maxWidth: "200px" }} className="text-left col-color-blue">
                                                                                {sec.infor.subject}
                                                                            </td>
                                                                            {
                                                                                sec.infor.total_amount.length === 0 &&
                                                                                currency.map((currency, index) => {
                                                                                    return (
                                                                                        currency.expense_flag === 1 &&
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                        </td>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                sec.infor.total_amount.map((amount, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                            {amount.advance_amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
                                                                            }
                                                                            {!sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={confirmBusiness.bind(this, sec.infor, "Expense Request")}>{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={openItemModal.bind(this, sec.infor, "Expense Request")}>{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {!sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={clickHereExpenseRequest.bind(this, sec.infor)}>{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            <td className="td-num" width="7%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                <CLink onClick={clickHereExpenseList.bind(this, sec.infor)} >{t('Click Here')}</CLink>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CCollapse>
                                        <br />
                                    </>
                                }
                                {/* Expense Request End*/}
                                {/* Expense Adjustment Request Start*/}
                                {mainTable.expense_adjustment_request_list && mainTable.expense_adjustment_request_list.length > 0 &&
                                    <>
                                        <CCol lg="12">
                                            <CRow alignHorizontal="start">
                                                {collapseEARequest == true &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8220.png'} width="17px" height="17px" onClick={handleChangeCollapseEARequest} />
                                                }
                                                {collapseEARequest == false &&
                                                    <CImg className="pointer image-radius" src={'/avatars/group_8012.png'} width="17px" height="17px" onClick={handleChangeCollapseEARequest} />
                                                }
                                                <CImg className="m-left-19" src={'/avatars/icon_awesome_star2.png'} width="17px" height="17px" /><CLabel className="m-left-10 mt-2">{t('Expense Adjustment Request')}</CLabel>
                                            </CRow>
                                        </CCol>
                                        <CCollapse show={collapseEARequest}>
                                            <CCol lg="12">
                                                <CCol lg="12">
                                                    <CRow alignHorizontal="end">
                                                        <div className="row-count-msg" id="lblTotalRows">
                                                            {t('Total Rows').replace("%s", mainTable.expense_adjustment_request_list && mainTable.expense_adjustment_request_list.length > 0 ? mainTable.expense_adjustment_request_list.length : 0)}
                                                        </div>
                                                    </CRow>
                                                </CCol>
                                                <div className="table-responsive tableFixHead">
                                                    <table className="table">
                                                        <thead id="thead-id">
                                                            <tr width="100%">
                                                                <th id="tblNo" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("No")}
                                                                </th>
                                                                <th id="tblRequestDate" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Request Date")}
                                                                </th>
                                                                <th id="tblEmployeeID" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee ID")}
                                                                </th>
                                                                <th id="tblEmployeeName" width="" className="text-nowrap text-left align-middle" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Employee Name")}
                                                                </th>
                                                                <th id="tblSubject" width="" className="text-nowrap text-left align-middle" rowSpan="2" >
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Subject")}
                                                                </th>
                                                                <th id="tblTotalAmount" width="" className="responsive-tableTh text-nowrap text-center" colSpan={numCurrencies} style={{ borderBottom: "1px solid #FFFFFF" }}>
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Total Amount")}
                                                                </th>
                                                                <th id="tblAction" width="30%" className="responsive-tableTh" colSpan="4" rowSpan="2">
                                                                    <CImg
                                                                        className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                        src="/avatars/titleicon.png"
                                                                        alt="titleicon"
                                                                    />
                                                                    {t("Action")}
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                {
                                                                    currency.map((currency, index) => {
                                                                        return (
                                                                            currency.expense_flag === 1 &&
                                                                            <th key={index} id={currency.id} width="10%" className="text-center responsive-tableTh no-border-radius">
                                                                                <CImg
                                                                                    className="mr-2 checkIO-request-title-icon-img-col-table"
                                                                                    src="/avatars/titleicon.png"
                                                                                    alt="titleicon"
                                                                                />
                                                                                {currency.currency_name}
                                                                            </th>
                                                                        )
                                                                    })
                                                                }
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {mainTable.expense_adjustment_request_list && mainTable.expense_adjustment_request_list.length > 0 &&
                                                                mainTable.expense_adjustment_request_list.map((sec, index) => {
                                                                    return (
                                                                        <tr width="100%" key={index}>
                                                                            <td id="tblNo" width="" className="text-right checkIO-request-vertical-line"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td id="" width="" className="text-center td-pink">
                                                                                {sec.infor.requested_date}
                                                                            </td>
                                                                            <td id="" width="" className="text-right"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_id}
                                                                            </td>
                                                                            <td id="" width="" className="text-left"
                                                                                style={{ backgroundColor: index % 2 ? '#F1F3F8' : '#FFFFFF' }}>
                                                                                {sec.infor.employee_name}
                                                                            </td>
                                                                            <td id="" width="" style={{ maxWidth: "200px" }} className="text-left col-color-blue">
                                                                                {sec.infor.subject}
                                                                            </td>
                                                                            {
                                                                                sec.infor.total_amount.length === 0 &&
                                                                                currency.map((currency, index) => {
                                                                                    return (
                                                                                        currency.expense_flag === 1 &&
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                        </td>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                sec.infor.total_amount.map((amount, temp) => {
                                                                                    return (<Fragment key={temp}>
                                                                                        <td className="td-actual" style={{ textAlign: "right" }}>
                                                                                            {amount.advance_amount}
                                                                                        </td>
                                                                                    </Fragment>)
                                                                                })
                                                                            }
                                                                            {!sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.approve_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={confirmBusiness.bind(this, sec.infor, "Expense Adjustment Request")}>{t('Confirm')}</CLink>
                                                                                    </td>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={openItemModal.bind(this, sec.infor, "Expense Adjustment Request")}>{t('Reject')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {!sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink tabIndex="-1" style={{ color: "gray", textDecoration: "none" }} className="not-allow">{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            {sec.detail_flag &&
                                                                                <>
                                                                                    <td className="td-num" width="5%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                        <CLink onClick={clickHereExpenseAdjustmentRequest.bind(this, sec.infor)}>{t('Detail')}</CLink>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                            <td className="td-num" width="7%" style={{ backgroundColor: "#f6f1f5" }}>
                                                                                <CLink onClick={clickHereExpenseList.bind(this, sec.infor)} >{t('Click Here')}</CLink>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </CCol>
                                        </CCollapse>
                                    </>
                                }
                                {/* Expense Adjustment Request End*/}
                            </CCard>
                        </CCol>
                    </CRow>
                }
            </>
        }
    </>
    );
}
export default BusinessTripExpenseDashboardTable;
