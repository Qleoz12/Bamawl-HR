import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CForm, CRow, CCol, CImg, CLabel } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';


const ChooseAnnouncement = props => {

	const {t} = useTranslation();

	return(<>
		<CRow>
			<CCol lg="12">
				<CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
				<CLabel className="middle ml-2">{t('How do you want to announce?')}</CLabel>
			</CCol>
        </CRow>
		<CRow className="leave-time-count mb-4">
			<CCol lg='2' className="leave-time-count-inner">
                <span>{t('Department')}</span>
                <input
					className="leave-time-count-radio"
					type="radio"
					name="leave-time-count"
					value={1}
					checked={props.criteria == "1" ? true : false}
					onChange={props.change}
					disabled={props.flag == 'save' ? false : true}
                />
			</CCol>
          	<CCol lg='3' className="leave-time-count-inner">
                <span style={{ width: "90%" }}>{t('Employee ID and Name')}</span>
                <input
                  	className="leave-time-count-radio"
                  	type="radio"
                  	name="leave-time-count"
					value={2}
					checked={props.criteria == "2" ? true : false}
                  	onChange={props.change}
					disabled={props.flag == 'save' ? false : true}
                />
          	</CCol>
          	<CCol lg='2' className="leave-time-count-inner">
            	<span>{t('Position')}</span>
            	<input
                  	className="leave-time-count-radio"
                  	type="radio"
                  	name="leave-time-count"
					value={3}
					checked={props.criteria == "3" ? true : false}
                  	onChange={props.change}
					disabled={props.flag == 'save' ? false : true}
            	/>
          	</CCol>
        </CRow>
	</>)
}

export default ChooseAnnouncement
