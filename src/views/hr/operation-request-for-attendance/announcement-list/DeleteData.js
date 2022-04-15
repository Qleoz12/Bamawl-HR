import React from 'react';
import {CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const DeleteData=props=> {
    const{t} = useTranslation();
    return (<>
        <CRow lg="12">
            <CCol style={{textAlign:"center"}}>
                {props.mainTable != ""  &&
                    <CButton className="form-btn" id='deleteBtn' name = 'deleteBtn' onClick={props.deleteToggleAlert}>
                        {t('Delete')}
                    </CButton> 
                }
            </CCol>
        </CRow> 
    </>
    );
}
export default DeleteData;