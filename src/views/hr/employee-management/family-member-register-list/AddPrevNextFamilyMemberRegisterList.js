import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { CRow,CButton} from '@coreui/react';
import ViewPermision from './../../../brycen-common/constant/ViewPermission';

const AddPrevNextFamilyMemberRegisterList=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
    { props.checkAction == 1 && (<>
        <CRow className="mt-3 mb-4 d-flex" alignHorizontal="center">
            <CButton
                id="btnAdd"
                className="form-btn mr-3 ml-3"
                onClick={props.addFamily}
            >
                {t("Add")}
            </CButton>
            {
                props.permission !== ViewPermision.ONLY_ME &&
                <div>
                    <CButton id="btnPrev" className="form-btn-green" onClick={props.preEmp}>
                        <i className="fa fa-step-backward mr-2" style={{ color: "#6AB51B" }}></i>
                        {t("Prev")}
                    </CButton>
                    <CButton id="btnNext" className="form-btn-green ml-2" onClick={props.nextEmp}>
                        {t("Next")}
                        <i className="fa fa-step-forward ml-2" style={{ color: "#6AB51B" }}></i>
                    </CButton>
                </div>
            }
        </CRow>
        </>
    )}
    </>
    );
}
export default AddPrevNextFamilyMemberRegisterList;
