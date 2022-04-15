import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CForm, CRow, CCol, CImg, CLabel, CSelect } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete';


const Position = props => {

	const {t} = useTranslation();

	return(<>
		{
			props.criteria == "3" &&
			<CRow className="mt-5 move_from_bottom">
				<CCol className="mb-4" lg="5">
					<CLabel className="required">{t('Position')}</CLabel>
					{
						props.flag == 'save' &&
						<CSelect className="bamawl-select" value={props.posID} onChange={props.change} custom>
							<option key="" value="">{t('Select Position')}</option>
							{
								props.data.length > 0 &&
								props.data.map( i => {
									return( <option key={ i.id } value={ i.id }> { i.position_name } </option> )
								} )
							}
						</CSelect>
					}
					{
						props.flag == 'edit' &&
						<CSelect className="bamawl-select" value={props.posID} custom disabled>
							{
								props.data.length > 0 &&
								props.data.map( i => {
									return( <option key={ i.id } value={ i.id }> { i.position_name } </option> )
								} )
							}
						</CSelect>
					}
				</CCol>
			</CRow>
		}
	</>)
}

export default Position
