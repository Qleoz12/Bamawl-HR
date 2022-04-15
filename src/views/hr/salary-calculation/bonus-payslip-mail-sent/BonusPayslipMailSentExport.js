import React ,{useEffect} from 'react';
import {CRow,CButton,CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BonusPayslipMailSentExport=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let{
      mailSent,
      exportBonus
    }=props
    return (<>
        <CRow lg="12" className="d-flex justify-content-center mb-5 mt-5 text-center">
          <div>
              <CButton className="form-btn-green mr-3" onClick={mailSent} id='btnMailSent'>{t('Mail Sent')}</CButton>
            <CButton id="btnExelDownload ml-3" className="form-btn" onClick={exportBonus} >
                <CImg className="icon-download" src='/avatars/download.png' style={{marginRight:'10px'}} />
                {t('Excel Download')}
              </CButton>
          </div>
        </CRow>
    </>
    );
}
export default BonusPayslipMailSentExport;
