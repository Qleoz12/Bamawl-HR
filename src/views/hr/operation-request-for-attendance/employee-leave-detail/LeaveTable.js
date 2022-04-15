import React from 'react';
import { useTranslation } from 'react-i18next';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CLabel, CImg, CInput, CFormGroup, CForm, CSelect, CButton, CTextarea } from '@coreui/react';


const LeaveTable = props => {
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
                                            { t('Leave Day') }
                                        </th>
                                        <th>
                                            { t('Leave Time') }
                                        </th>
                                        <th>
                                            { t('Working Time') }
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        props.data.map( (i,index) => {
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no" style={{textAlign:"center"}}>{index+1}</td>
                                                    <td className="td-pink" style={{textAlign:"center"}}>
                                                        {i.leave_day}
                                                    </td>
                                                    <td className="td-orange" style={{textAlign:"center"}}>
                                                        {i.leave_time}
                                                    </td>
                                                    <td style={{textAlign:"right"}}>
                                                        {i.working_time}
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

export default LeaveTable
