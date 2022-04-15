import React ,{useEffect} from 'react';
import {CCol, CRow, CButton} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const DeleteCalculationList=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow alignHorizontal="center" className="mt-5 mb-2">
            {props.mainTable != ""  &&
                <CButton className="form-btn m-2" id='btnDelete' name = 'btnDelete' onClick={props.deleteToggleAlert}>
                    {t('Delete')}
                </CButton>
            }
        </CRow>
    </>
    );
}
export default DeleteCalculationList;
