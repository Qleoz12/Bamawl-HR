import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CSelect, CButton, CTextarea } from '@coreui/react';


const ApproverTable = props => {
    const {t} = useTranslation();
    return(<>
        {
            props.data.length > 0  &&
            <>
                <CRow className="mt-5 mb-4">
                    <CCol lg="12">
                        <div className="table-responsive">
                            <table className="table" aria-label="simple table">
                                <thead>
                                    <tr width="100%">
                                        <th>
                                            { t('No') }
                                        </th>
                                        <th>
                                            { t('Approver ID') }
                                        </th>
                                        <th>
                                            { t('Approver Name') }
                                        </th>
                                        <th>
                                            { t('Approver Status') }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no" style={{textAlign:"center"}}>{index+1}</td>
                                                    <td className="td-green" style={{textAlign:"right"}}>
                                                        {i.approver_id}
                                                    </td>
                                                    <td style={{textAlign:"center", backgroundColor:'#D6F7DF'}}>
                                                        {i.approver_name}
                                                    </td>
                                                    <td style={{textAlign:"center"}}>
                                                        {i.approver_status}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </>
        }
    </>)
}

export default ApproverTable
