import React, { useState, useEffect } from 'react';
import { CRow, CCol, CLabel, CInput, CTextarea, CButton } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';


const FormInput = props => {

	const {t} = useTranslation();

	return(<>
        {
			( (props.criteria == "1" && props.data.length > 0) || props.criteria == "2" || props.criteria == "3") &&
			// ( props.criteria == "1" && props.data.length > 0) &&
			<>
				<CRow>
		            <CCol lg="5" className="mb-4">
		                <CLabel className="required">{t('From Date')}</CLabel>
		                <DatePicker className="bamawl-input" value={props.fromDate} fromDate={props.currentDate} change={props.fromChange} />
		            </CCol>
		            <CCol lg="2">
		                <div className="line"></div>
		            </CCol>
		            <CCol lg="5" className="mb-4">
		                <CLabel className="required">{t('To Date')}</CLabel>
		                <DatePicker className="bamawl-input" fromDate={props.fromDate} value={props.toDate} change={props.toChange} />
		            </CCol>
		        </CRow>

				<CRow>
		            <CCol lg="5" className="mb-4">
		                <CLabel className="required">{t('Announce Title')}</CLabel>
		                <CInput className="bamawl-input" value={props.title} onChange={props.changeTitle} />
		            </CCol>
					<CCol lg="2"></CCol>
		            <CCol lg="5" className="mb-4">
		                <CLabel className="required">{t('Announce Description')}</CLabel>
		                <CTextarea rows="1" className="bamawl-input" value={props.description} onChange={props.changeDesc} />
		            </CCol>
		        </CRow>

				<CRow alignHorizontal="center" className="mt-5 mb-4">
					<CButton className="form-btn" onClick={props.save}>{t('Save')}</CButton>
				</CRow>
			</>
		}
	</>)
}

export default FormInput
