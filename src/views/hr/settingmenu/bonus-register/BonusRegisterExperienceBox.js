import { CCard, CCardBody, CCardHeader, CCol, CImg, CRow, CSelect } from '@coreui/react';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const BonusRegisterExperienceBox = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        <CCol lg="6" className="bonus-register-title-col" >
            <CImg className="bonus-register-title-img" src="avatars/list.png" alt="list" />
            <label id="lbExperience" className="ml-3 mt-2 required">
                {t('Experience')}
            </label>
        </CCol>
        <CCard className='table-panel mt-2' id="bonus-register-card-color">
            <CCardHeader id="bonus-register-card-color">
            </CCardHeader>
            <CCardBody>
                <CRow lg="12" className="mt-3 mb-3 ml-2 mr-2">
                    <CCol lg="3" className="bonus-register-vertical-border">
                        <CImg src={'avatars/year.png'} className="date-icon" alt="year" />
                        <label id="lbYear" className="bonus-register-label-year-month mt-2">{t('Year')}</label>
                        <CSelect id="dropYear" className="bamawl-select" value={props.selectYearData} onChange={props.yearChange} custom>
                            <option key="" value=" ">{t('---Select year---')}</option>
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
                    <CCol lg="3" className="bonus-register-vertical-border">
                        <CImg src={'avatars/month.png'} className="date-icon" alt="month" />
                        <label id="lbMonth" className="bonus-register-label-year-month mt-2">{t('Month')}</label>
                        <CSelect id="dropMonth" className="bamawl-select" value={props.selectMonthData} onChange={props.monthChange} custom>
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
                    <CCol lg="3" className="bonus-register-limit-col">
                        <label id="lbLimit">{t('Limit')}</label>
                        <CSelect id="dropLimit" className="bamawl-select" value={props.selectLimitData} onChange={props.limitChange} custom>
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
            </CCardBody>
        </CCard>
    </>)
}
export default BonusRegisterExperienceBox;