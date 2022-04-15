import React from 'react';
import {CRow,CButton,CModal,CModalBody,CButtonToolbar} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * To show confirm alert 
 *
 * @author  Zin Min Myat
 * @create  04/06/2021
 * @param   {content} props => confirmation message. Eg: 'You don't have permission to request for Employee ID:(20000,20005,20006).Do you want to continue?'
 *          {cancelBtn} props => to hide popup box when user click `Cancel` button
 *          {continues} props => if continues is true, `OK` button will show but don't it.
 *          {okBtn}={FUNCTION_NAME} props => `okBtn` if user want to delete and continues action
 *          {okButton}={FUNCTION_NAME} props => `okButton`  if user want to  continues action again                 
 *                          
 * @returns output shown in web page
 */
const CommonAlert = props => {
    const{t} = useTranslation();
    return (
        <>
            <CModal  centered closeOnBackdrop={false} show={props.show}>
                <CModalBody>
                    <CRow className="confirm-header mt-3" alignHorizontal="center">
                        <p className="alert-p  break-word" >{props.content}</p>
                    </CRow>
                    <CButtonToolbar className="confirm-body" justify="center">
                        {
                            props.continues === true &&
                            <>
                                <CButton className="confirm-btn" onClick={props.okBtn}>{t('OK')}</CButton>
                                <CButton className="confirm-btn" onClick={props.cancelBtn}>{t('Cancel')}</CButton>
                            </>
                        }
                        {
                            props.continues === false &&
                            <>
                                <CButton className="confirm-btn" onClick={props.okButton}>{t('OK')}</CButton>
                            </>
                        }
                    </CButtonToolbar>
                </CModalBody>
            </CModal>
        </>
    )
}
export default CommonAlert