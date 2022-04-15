import React, { useEffect } from 'react';
import { CCol, CRow,CCard,CImg} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import EstimatedBudgetBusinessTripRequestTable from "./EstimatedBudgetBusinessTripRequestTable";

const EstimatedBudgetBusinessTripRequest = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });
    let {
        needAdvance,
        needAdvanceType,
        changeAdvance,
        changeAdvanceType,
        changeCheckboxAdvance,
        airTicketTotal,
        transportationTotal,
        accommodationTotal,
        allowanceTotal,
        otherTotal,
        budgetTotal,
        totalNotAdmin,
        advancedMoney,
        changeAdvanceMoney,
        checkedAccomodation,
        checkedAirTicket,
        checkedAllowance,
        checkedOther,
        checkedTransportation,
        advanceAdditional,
        checkShowCheckboxAirticket,
        checkShowCheckboxAccomodation,
        checkShowCheckboxTransportation,
        checkShowCheckboxDailyAllowance,
        checkShowCheckboxOther
    }=props
    return (<>
    <CRow className="align-items-center" style={{marginTop:"20px"}}>
    <CCol>
    <CImg
        src={'avatars/list.png'}
        className="list-icon"
        width="6px"
        style={{ marginRight: '10px', marginBottom: '6px' }}
    />
    <label className="required">{t('Advanced Money')}</label>
    <CCard className="table-panel table-panel-businesstrip">
        <CCol lg="12" className="d-flex">
        <div className="d-flex align-items-center flex-wrap">
            <label className="radio-estimated-customer ml-3">
                    {t('Need')}
                    <input
                        className="rdoNoNeed"
                        type="radio"
                        id="rdoNeed"
                        name="advancedMoney"
                        style={{marginRight:'5px'}}
                        checked={needAdvance==1}
                        value="1"
                        onChange={changeAdvance}
                    />
             </label>
             <label className="radio-estimated-customer ml-3">
                {t('No Need')}
                <input
                    className="rdoNoNeed"
                    id="rdoNoNeed"
                    type="radio"
                    name="advancedMoney"
                    style={{marginRight:'5px'}}
                    value="0"
                    checked={needAdvance==0}
                    onChange={changeAdvance}
                />
            </label>
            <label className="ml-3" id="lblNeedAdvance" >{t('(If you need advanced money for this business trip, please check this button)')}</label>
        </div>
        </CCol>
        {
        needAdvance==1&&(
            <CCol className="d-flex align-items-center flex-wrap">
            <label className="radio-estimated-customer-need ml-3">
                    {advanceAdditional}% {t('Additional for target items')}
                    <input
                        className="rdoNoNeed"
                        type="radio"
                        id="rdoAdditionalForTargetItems"
                        name="advancedMoneyNeed"
                        style={{marginRight:'5px'}}
                        checked={needAdvanceType==0}
                        onChange={changeAdvanceType}
                        value="0"
                    />
                </label>
                <label className="radio-estimated-customer-need ml-3">
                {t('Need the Specified Amount')}
                        <input
                            className="rdoNoNeed"
                            type="radio"
                            id="rdoNeedTheSpecifiedAmount"
                            name="advancedMoneyNeed"
                            style={{marginRight:'5px'}}
                            checked={needAdvanceType==1}
                            onChange={changeAdvanceType}
                            value="1"
                        />
                    </label>
            </CCol>
            )
        }
        </CCard>
    </CCol>
    </CRow>
    <EstimatedBudgetBusinessTripRequestTable
        needAdvance={needAdvance}
        changeCheckboxAdvance={changeCheckboxAdvance}
        airTicketTotal={airTicketTotal}
        transportationTotal={transportationTotal}
        accommodationTotal={accommodationTotal}
        allowanceTotal={allowanceTotal}
        otherTotal={otherTotal}
        budgetTotal={budgetTotal}
        totalNotAdmin={totalNotAdmin}
        needAdvanceType={needAdvanceType}
        advancedMoney={advancedMoney}
        changeAdvanceMoney={changeAdvanceMoney}
        checkedAccomodation={checkedAccomodation}
        checkedAirTicket={checkedAirTicket}
        checkedAllowance={checkedAllowance}
        checkedOther={checkedOther}
        checkedTransportation={checkedTransportation}
        advanceAdditional={advanceAdditional}
        checkShowCheckboxAirticket={checkShowCheckboxAirticket}
        checkShowCheckboxAccomodation={checkShowCheckboxAccomodation}
        checkShowCheckboxTransportation={checkShowCheckboxTransportation}
        checkShowCheckboxDailyAllowance={checkShowCheckboxDailyAllowance}
        checkShowCheckboxOther={checkShowCheckboxOther}
    ></EstimatedBudgetBusinessTripRequestTable>
    </>
    );
}
export default EstimatedBudgetBusinessTripRequest;
