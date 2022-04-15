import { CButton, CCard, CCol, CImg, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SearchBonusRateList = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    return (<>
        <CRow lg="12" className="bonus-rate-list-bonus-title-row">
            <CCol className="bonus-rate-list-title-col">
                <CImg className="bonus-rate-list-title-icon-img-title" src="avatars/list.png" alt="titleicon" />
                <label id="lbBonusTitle" className="ml-3 mt-2 text-nowrap required">{t('Bonus Title')}</label>
                <CSelect id="dropBonusTitle"
                    className="bonus-rate-list-drop-dow-bonus-title ml-5 bamawl-select "
                    id="select-title"
                    value={props.selectedBonusTitleData}
                    onChange={props.titleChange}
                    autoFocus={true}
                    custom>
                    <option key="" value="">{t('---Select Title---')}</option>
                    {
                        props.bonusTitleAPI && props.bonusTitleAPI.length > 0 &&
                        props.bonusTitleAPI.map((data, index) => {
                            return (
                                <option key={index} value={data}>{data.length > 30 ? data.substr(0, 30) + '...' : data}</option>
                            )
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
        <CImg className="bonus-rate-list-title-icon-img" src="avatars/list.png" alt="titleicon" />
        <label className="ml-3">{t('Experience')}</label>
        <CCard className='card-bonus table-panel mt-2 bonus-rate-list-card-color'>
            <CRow lg="12" className="mt-3 mb-3 ml-2 mr-2">
                <CCol lg="3" className="bonus-rate-list-vertical-border">
                    <CImg src={'avatars/year.png'} className="date-icon" alt="year" />
                    <label id="lbYear" className="bonus-rate-list-label-year-month font-weight-bold mt-2">{t('Year')}</label>
                    <CSelect id="dropYear" className="bamawl-select" onChange={props.yearChange} value={props.selectedYearData} custom>
                        <option key="" value="">{t('---Select year---')}</option>
                        {
                            props.yearData && props.yearData.length > 0 &&
                            props.yearData.map((data, index) => {
                                return (
                                    <option key={index} value={data.year}>{data.year}&nbsp;{data.year > 1 ? t('years') : t('year')}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="3" className="bonus-rate-list-vertical-border">
                    <CImg src={'avatars/month.png'} className="date-icon" alt="month" />
                    <label id="lbMonth" className="bonus-rate-list-label-year-month font-weight-bold mt-2">{t('Month')}</label>
                    <CSelect id="dropMonth" className="bamawl-select" onChange={props.monthChange} value={props.selectedMonthData} custom>
                        <option key="" value="">{t('---Select month---')}</option>
                        {
                            props.monthData && props.monthData.length > 0 &&
                            props.monthData.map((data, index) => {
                                return (
                                    <option key={index} value={data.month}>{data.month}&nbsp;{data.month > 1 ? t('months') : t('month')}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
                <CCol lg="3" className="bonus-rate-list-limit-col">
                    <label id="lbLimit" className="font-weight-bold" >{t('Limit')}</label>
                    <CSelect id="dropLimit" className="bamawl-select" onChange={props.limitChange} value={props.selectedLimitData} custom>
                        <option key="" value="">{t('---Select limit---')}</option>
                        {
                            props.limitData && props.limitData.length > 0 &&
                            props.limitData.map((data, index) => {
                                return (
                                    <option key={index} value={data.id}>{data.value}</option>
                                )
                            })
                        }
                    </CSelect>
                </CCol>
            </CRow>
        </CCard>
        <br></br>
        <CRow lg="12">
            <CCol className="bonus-rate-list-btnSearch-col">
                <CButton id="btnSearch" className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton>
            </CCol>
        </CRow><br />
    </>)
}
export default SearchBonusRateList;