
import React ,{useEffect} from 'react';
import {CRow,CImg, CLabel} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BonusPayslipMailSentAdd=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        <CRow lg="12" className="add-employee d-flex flex-nowrap align-items-end">
              <input
                type="image"
                className="icon-add"
                id="imgIconAdd"
                src="avatars/addlllowance.png"
                alt="add"
                onClick={props.addToggleAlert}
              />
              <CLabel className="ml-2" id="lblEmployeeList">{ t('Employee List')}</CLabel>
        </CRow>
    </>
    );
}
export default BonusPayslipMailSentAdd;
