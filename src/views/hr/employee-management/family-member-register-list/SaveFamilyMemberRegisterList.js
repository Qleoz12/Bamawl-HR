import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { CRow,CButton} from '@coreui/react';

const SaveFamilyMemberRegisterList=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        { props.checkAction == 1 && (<>
            <CRow alignHorizontal="center" className="mt-3 mb-2">
                <CButton className= "form-btn m-2" id='btnSave' name = 'btnSave' onClick={props.saveConfirm}>
                    {t('Save')}
                </CButton>
            </CRow>
            </>
        )}
    </>
  );
}
export default SaveFamilyMemberRegisterList;
