import React ,{useEffect} from 'react';
import {CCol, CRow,CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from "@date-io/date-fns";
import {CLabel} from '@coreui/react';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";

const BonusPayslipMailSentPaymentMonth=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let {
        paymentMonth,
        changePaymentMonth
    }=props;
    return (<>
        <CRow lg="12" className="">
          <CCol className="d-flex flex-nowrap align-items-center">
              <CImg className="img-title" src="avatars/list.png" alt="titleicon" />
              <CLabel id="lblpaymentMonth" className="ml-3 mt-2 required">{t('Payment Month')}
              </CLabel>
          </CCol>
        </CRow>
        <div className="payment">
          <CCol lg="4">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                        InputProps={{ readOnly: true }}
                        autoFocus
                        className="column"
                        name="dropPaymentMonth"
                        id="dropPaymentMonth"
                        format="yyyy-MM"
                        value={paymentMonth}
                        onChange={changePaymentMonth}
                        views={["year", "month"]}
                        // cancelLabel={false}
                        // okLabel={false}
                        clearable={true}
                        // autoOk={true}
                />
            </MuiPickersUtilsProvider>
            </CCol>
        </div>
    </>
    );
}
export default BonusPayslipMailSentPaymentMonth;
