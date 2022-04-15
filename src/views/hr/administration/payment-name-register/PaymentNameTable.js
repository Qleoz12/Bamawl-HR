import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CSelect, CButton, CTextarea } from '@coreui/react';


const PaymentNameTable = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0  &&
            <>
                <CRow className="mt-5 mb-4">
                    <CCol lg="12">
                        <CCol lg="12">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table" aria-label="simple table">
                                <thead>
                                    <tr width="100%">
                                        <th>
                                            <input
                                                type="checkbox"
                                                value="allcheck"
                                                checked={props.allChecked}
                                                onChange={props.checkboxChanged}
                                            />
                                        </th>
                                        <th>
                                            { t('Payment/Bank Name') }
                                        </th>
                                        <th>
                                            { t('Currency') }
                                        </th>
                                        <th>
                                            { t('Priority') }
                                        </th>
                                        <th>
                                            { t('Address') }
                                        </th>
                                        <th>
                                            { t('Phone') }
                                        </th>
                                        <th>
                                            { t('Transfer Method') }
                                        </th>
                                        <th>
                                            { t('Edit') }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                i.bankcurrencies.map((sec,idx)=>{
                                                    return(
                                                        <tr key={idx} width="100%">
                                                            {idx === 0 && <>
                                                                <td className="td-no" rowSpan={i.bankcurrencies.length}>
                                                                    <input type="checkbox"
                                                                        value={i.id}
                                                                        id={i.id}
                                                                        checked={i.is_checked === true}
                                                                        onChange={props.checkboxChanged}
                                                                    />
                                                                </td>
                                                                <td style={{textAlign:"left"}} rowSpan={i.bankcurrencies.length}>
                                                                    {i.bank_name}
                                                                </td>
                                                            </>
                                                            }
                                                            <td className="td-green" style={{textAlign:"right"}}>
                                                                {sec.currencies['0']['currency_name']}
                                                            </td>
                                                            {idx === 0 && <>
                                                                <td className="td-pink" style={{textAlign:"right"}} rowSpan={i.bankcurrencies.length}>
                                                                    {i.parent_priority}
                                                                </td>
                                                                <td style={{textAlign:"left"}} rowSpan={i.bankcurrencies.length}>
                                                                    {i.address}
                                                                </td>
                                                                <td className="td-orange" style={{textAlign:"right"}} rowSpan={i.bankcurrencies.length}>
                                                                    {i.phone}
                                                                </td>
                                                                <td style={{textAlign:"left"}} rowSpan={i.bankcurrencies.length}>
                                                                    {i.transfer_method}
                                                                </td>
                                                                <td rowSpan={i.bankcurrencies.length}>
                                                                    <CImg src='/avatars/edit.png' id={i.id} className="icon-clt" alt="edit" onClick={props.edit.bind(this,i)} />
                                                                </td>
                                                            </>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>

                <CRow alignHorizontal="center" className="mb-4">
                    <CButton className="form-btn" onClick={props.delete}>{t('Delete')}</CButton>
                </CRow>
            </>
        }
    </>)
}

export default PaymentNameTable
