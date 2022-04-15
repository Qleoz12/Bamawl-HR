import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

const ReportForTransferSalaryPayTable = props => {
    const { t } = useTranslation();
    useEffect(() => {

    });
    return (<>
        {props.mainTable && props.mainTable.length > 0 &&
            <CCard className='table-panel' style = {{ border : "1px solid #d8dbe0" }}>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12 mt-2">
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{props.rowCount}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table purchase-order-list" aria-label="simple table">
                                <thead id="thead-id">
                                    <tr width="100%">
                                        <th id="tblNo" width="100px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                            <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                            {t('No')}
                                        </th>
                                        <th id="tblPaymentName" width="" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                            <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                            {t('File Name')}
                                        </th>
                                        <th id="tblAccountNumber" width="200px" style={{ textAlign: 'left' }} className="responsive-tableTh">
                                            <CImg className="mr-2" src="avatars/titleicon.png" alt="include-salary" style={{ width: '6px', height: '10px', marginBottom: "2px" }} />
                                            {t('Download')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        props.mainTable.map((i, index) => {
                                            return (<Fragment key={index}>
                                                <tr width="100%">
                                                    <td className="td-num textAlignRight" >
                                                        {index + 1}
                                                    </td>
                                                    <td width="" className="td-emp-id td-green textAlignLeft" >
                                                        {i.file_name}
                                                    </td>

                                                    <td width="" >
                                                        <input
                                                            type="image"
                                                            id="tblDownload"
                                                            src={'avatars/download.png'}
                                                            className="icon-clt"
                                                            alt="download"
                                                        onClick={props.downLoadFile.bind(this, i)}
                                                        />
                                                    </td>
                                                </tr>
                                            </Fragment>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </CCol>
                </CRow>
            </CCard>
        }

    </>);
}
export default ReportForTransferSalaryPayTable;