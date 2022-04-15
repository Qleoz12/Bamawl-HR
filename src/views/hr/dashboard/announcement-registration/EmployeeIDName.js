import React, { useState, useEffect } from 'react';
import { CRow, CCol, CLabel, CInput } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';


const EmployeeIDName = props => {

	const {t} = useTranslation();

	return(<>
		{
			props.criteria == "2" &&
			<CRow className="mt-5 move_from_bottom">
				{
					props.flag == 'save' &&
					<>
					<CCol className="mb-4 verticle-line" lg="4">
						<CLabel className="required">{t('Employee ID')}</CLabel>
							{
								props.disableAutocomplete &&
								<Autocomplete
									onChange={(i) => props.changeAutocomplete('id', i)}
									onSelect={props.selectAutocomplete}
									items={props.idArr}
									name={props.empID}
								/>
							}
							{
								!props.disableAutocomplete &&
								<CInput value={props.empID} className="bamawl-input" disabled />
							}
					</CCol>

					<CCol className="mb-4 verticle-line" lg="4">
						<CLabel className="required">{t('Employee Code')}</CLabel>
							{
								props.disableAutocomplete &&
								<Autocomplete
									onChange={(i) => props.changeAutocomplete('code', i)}
									onSelect={props.selectAutocomplete}
									items={props.codeArr}
									name={props.empCode}
								/>
							}
							{
								!props.disableAutocomplete &&
								<CInput value={props.empCode} className="bamawl-input" disabled />
							}
					</CCol>

					<CCol className="mb-4" lg="4">
						<CLabel className="required">{t('Employee Name')}</CLabel>
							{
								props.disableAutocomplete &&
								<Autocomplete
									onChange={(i) => props.changeAutocomplete('name', i)}
									onSelect={props.selectAutocomplete}
									items={props.nameArr}
									name={props.empName}
								/>
							}
							{
								!props.disableAutocomplete &&
								<CInput value={props.empName} className="bamawl-input" disabled />
							}
					</CCol>
					</>
				}

				{
					props.flag == 'edit' &&
					<>
					<CCol className="mb-4 verticle-line" lg="4">
						<CLabel className="required">{t('Employee ID')}</CLabel>
						<CInput className="bamawl-input" value={props.empID} disabled />
					</CCol>

					<CCol className="mb-4 verticle-line" lg="4">
						<CLabel className="required">{t('Employee Code')}</CLabel>
						<CInput className="bamawl-input" value={props.empCode} disabled />
					</CCol>

					<CCol className="mb-4" lg="4">
						<CLabel className="required">{t('Employee Name')}</CLabel>
						<CInput className="bamawl-input" value={props.empName} disabled />
					</CCol>
					</>
				}
			</CRow>
		}
	</>)
}

export default EmployeeIDName
