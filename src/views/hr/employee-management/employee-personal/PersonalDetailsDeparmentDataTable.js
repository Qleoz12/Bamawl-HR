/* eslint-disable no-use-before-define */
import { CCard, CCol, CImg, CRow } from '@coreui/react';
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const PersonalDetailsDepartmentDataTable = props => {
    const { t } = useTranslation();
    useEffect(() => {
    });

    return (<>
        {
            // !isEmpty(props.mainTable)  &&
            <>
                <CRow lg="12">
                    <div className="pl-3 mt-4">
                        <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" /><label>{t('Department Data')}</label>
                    </div>
                </CRow>
                <CCard className='table-panel mt-2' style={{ backgroundColor: "#fafbfc", border: "1px solid #c8ccd0" }}>
                    <CRow id="table" style={{padding: "20px"}}>
                        <CCol lg="12">
                            <CCol lg="12">
                                <CRow alignHorizontal="end">
                                    <div className="row-count-msg">{props.rowCount}</div>
                                </CRow>
                            </CCol>

                            <div className="table-responsive">
                                <table className="table purchase-order-list" aria-label="simple table">
                                    <thead id="thead-id">
                                        {
                                            props.detailAPI !== "" &&
                                            <tr width="100%">
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('No')}
                                                </th>
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('Department')}
                                                </th>
                                                <th width="" className="basicSalaryList tableTh" rowSpan="2">
                                                    <CImg src={'avatars/titleicon.png'} alt="titleicon" className="basicSalaryList imgList" />
                                                    {t('Position')}
                                                </th>
                                            </tr>

                                        }

                                    </thead>
                                    <tbody >
                                        {
                                            props.tableDeparment !== "" &&
                                            props.tableDeparment.map((i, index) => {
                                                return (<Fragment key={index}>
                                                    <tr width="100%">
                                                        <td className="td-num textAlignRight td-no" >
                                                            {index + 1}
                                                        </td>
                                                        <td width="" className="td-emp-id td-green textAlignLeft" >
                                                            {i.departments.department_name}
                                                        </td>
                                                        <td width="" className="td-dept td-pink textAlignLeft">
                                                            {i.positions.position_name}
                                                        </td>
                                                    </tr>
                                                </Fragment>)
                                            })}
                                    </tbody>
                                </table>

                            </div>
                        </CCol>
                    </CRow>
                </CCard>
            </>
        }
    </>
    );
}
export default PersonalDetailsDepartmentDataTable;
