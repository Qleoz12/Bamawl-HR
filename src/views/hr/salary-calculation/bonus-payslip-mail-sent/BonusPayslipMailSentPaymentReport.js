import React ,{useEffect} from 'react';
import {CCol, CRow,CImg,CSwitch, CLabel} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const BonusPayslipMailSentPaymentReport=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let{
        report,
        reportChange
    }=props

    return (<>
        <CRow lg="12" className="">
          <CCol className="d-flex flex-nowrap align-items-center">
              <CImg className="img-title" src="avatars/list.png" alt="titleicon" />
              <CLabel id="lbBonusTitle" className="ml-3 mt-2 required">{t('Payment Transfer Report')}
              </CLabel>
          </CCol>
        </CRow>
        <div className="payment">
          <CCol lg='4' className="d-inline-flex">
              <label htmlFor="toggleSwitch" id="lblYes" className={report ===1 ? 'lableYesNo mr-2' : 'mr-2 text-black-50'} >
                  {t("Yes")}
              </label>
              <CSwitch
                  name="swiItem"
                  id="swiYesNo"
                  className="mx-1 switch-alive-die c-switch-sm"
                  checked={report === 1 ? false: true}
                  onChange={reportChange}
                  shape="pill"
              />
              <label id="lblNo" className= {report !== 1 ? 'lableYesNo ml-2' : 'ml-2 text-black-50'} htmlFor="toggleSwitch">
                  {t("No")}
              </label>
          </CCol>
        </div>
    </>
    );
}
export default BonusPayslipMailSentPaymentReport;
