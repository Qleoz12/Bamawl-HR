import React from 'react';
import { CRow, CCol, CButton, CModal, CModalHeader, CModalBody,CModalFooter, CLabel, CTextarea, CCard, CButtonToolbar } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';

/**
 * To show reject popup
 *
 * @author  Nay Zaw Linn
 * @create  10/05/2021
 * @param   {value} props => textbox value for denied reason
 *			{error} props => to show error message
 *          {open} props => to show popup
 *          {close} props => to hide popup
 *          {change} props => to write textbox value for denied reason
 *          {save} props => to click save button
 * @returns output shown in web page
 */
const RejectModal = props => {

	const { t } = useTranslation();

    return (
        <>
            <CModal centered closeOnBackdrop={false} show={props.open}>
				<CModalHeader style={{ color: 'black', fontSize: 18}}>{t('Enter Denied Reason')}</CModalHeader>
                <CModalBody>
					{
		                props.error.length > 0 &&
		                <CCard className="error p-1 mb-4" style={ { borderRadius: 8 } }>
		                    {
		                        props.error.map((data, index) => {
		                            return(
		                                <div className="ml-2" key={index} >{data}</div>
		                            )
		                        })
		                    }
		                </CCard>
		            }

					<CRow className="mt-3 mb-3">
						<CCol xs="2"></CCol>
						<CCol xs="8" className="m-0 p-0">
							<CTextarea className="bamawl-input" rows="1" value={props.value} onChange={props.change} />
						</CCol>
						<CCol xs="2"></CCol>
					</CRow>

					<CButtonToolbar className="confirm-body" justify="center">
                        <CButton className="confirm-btn" onClick={props.save}>{t('OK')}</CButton>
                    	<CButton className="confirm-btn" onClick={props.close}>{t('Cancel')}</CButton>
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        </>
    )
}
export default RejectModal
