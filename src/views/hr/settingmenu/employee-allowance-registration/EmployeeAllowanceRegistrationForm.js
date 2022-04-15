import React, { useEffect } from 'react';
import { CCol, CRow, CSelect, CLabel, CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { TextField } from "@material-ui/core";
/**
 * EmployeeAllowanceRegistrationForm Component use for EmployeeOvertimeRegistrationIndex
 * 
 * @author  dh_khanh
 * @create_date  
 */
const EmployeeAllowanceRegistrationForm = props => {
    let {
        mainTable,
        handleChangeAllowance,
        selectAllowanceID,
        allowanceAPI,
        subAllowanceAPI,
        handleChangeSubAllowance,
        selectSubAllowanceID,
        selectedPayDate,
        handlePayDateChange,
        allowanceAmount,
        handleChangeAllowanceAmount,
        editData,
        currencyName
    } = props;
    const { t } = useTranslation();

    const getFirst40Character = (str) => {
        let value = str;
        if (value.length > 40) {
            return value = value.substr(0, 40) + '...';
        }
        return value;
    }
    return (
        mainTable.length > 0 &&
        <>
            <CRow lg="12" >
                <CCol lg="12" >
                    <div className="content-secondary pb-3 pt-3 mb-4">
                        <CRow className="pt-2 pl-4 pr-4 align-items-end">
                            <CCol lg="3" className="d-flex flex-column mb-3 border-right">
                                <CLabel id="lblAllowanceTitle" className="required">{t('Allowance Title')}</CLabel>
                                <div className="mt-2">
                                    <CSelect id="dropAllowanceTitle" className="bamawl-select" custom onChange={handleChangeAllowance} value={selectAllowanceID} autoFocus={editData}>
                                        <option key="" value="">---{t('Select Allowance Title')}---</option>
                                        {allowanceAPI != "" &&
                                            allowanceAPI.map((allowance, index) => {
                                                return (
                                                    <option key={index} value={allowance.id}>
                                                        {getFirst40Character(allowance.allowance_name)}
                                                    </option>
                                                )
                                            })
                                        }
                                    </CSelect>
                                </div>
                            </CCol>
                            <CCol lg="3" className="d-flex flex-column mb-3 border-right">
                                <CLabel id="lblSubAllowanceTitle" className="required">{t('Sub Allowance Title')}</CLabel>
                                <div className="mt-2">
                                    <CSelect id="dropSubAllowanceTitle" className="bamawl-select" custom onChange={handleChangeSubAllowance} value={selectSubAllowanceID}>
                                        <option key="" value="">---{t('Select Sub Allowance Title')}---</option>
                                        {subAllowanceAPI != "" &&
                                            subAllowanceAPI.map((subAllowance, index) => {
                                                return (
                                                    <option key={index} value={subAllowance.id}>
                                                        {getFirst40Character(subAllowance.sub_allowance_name)}
                                                    </option>
                                                )
                                            })
                                        }
                                    </CSelect>
                                </div>
                            </CCol>
                            <CCol lg="3" className="d-flex flex-column mb-3 border-right">
                                <CLabel id="lblPayDate" className="required mb-3">{t('Pay Date')}</CLabel>
                                <DatePicker
                                    id="dropPayDate"
                                    className="flex-fill"
                                    placeholder={t('Select Pay Date')}
                                    value={selectedPayDate}
                                    change={handlePayDateChange}
                                    inputProps={{ className: "bamawl-select", style: { height: "22px" } }}
                                />
                            </CCol>
                            <CCol lg="3" className="d-flex flex-column mb-3 expense-request-input-card-detail-Allowance-Amount">
                                <CLabel id="lblAllowanceAmount" className="mb-3">{t('Allowance Amount')}</CLabel>
                                <div className="d-flex">
                                    <TextField
                                        fullWidth
                                        id="txtAllowanceAmount"
                                        type="text"
                                        placeholder={t('Type Amount')}
                                        value={allowanceAmount}
                                        onChange={handleChangeAllowanceAmount}
                                        className="bamawl-select"
                                    />
                                    <CLabel className="mt-2" style={{ marginLeft: "-40px", zIndex: 10}}>{currencyName}</CLabel>
                                </div>
                            </CCol>
                        </CRow>
                    </div>
                </CCol>
            </CRow>
        </>
    )
}

export default EmployeeAllowanceRegistrationForm;