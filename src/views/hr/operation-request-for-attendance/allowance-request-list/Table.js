import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRow, CCol, CImg, CButton, CInput, CLabel, CPagination } from '@coreui/react';

const Table = props => {
    const {t} = useTranslation();
    return(<>
        <div className="box box-white">
            <CRow className="m-4">
                <CCol lg="12">
                    <CCol lg="12" className="mb-2">
                        <CRow alignHorizontal="start">
                            <div style={{ position: 'absolute', userSelect: 'none' }}>
                                <input id="show_delete" type="checkbox" onChange={props.changeShowDeleteButton}/>
                                <CLabel htmlFor="show_delete" className="ml-1" style={{cursor: 'pointer'}}>{t('Show Delete Button')}</CLabel>
                            </div>
                        </CRow>
                        <CRow alignHorizontal="end">
                            <div className="row-count-msg">{props.rowCount}</div>
                        </CRow>
                    </CCol>
                    <div className="table-responsive">
                        <table className="table">  
                            {
                                <thead>
                                    <tr>
                                        <th style={{minWidth: '5rem'}}>
                                            <input
                                                type="checkbox"
                                                value={['allcheck', props.flag]}
                                                checked={props.allChecked}
                                                onChange={props.changeCheckbox}
                                            />
                                        </th>
                                        <th style={{minWidth: '5rem'}}>{ t('No') }</th>
                                        <th style={{minWidth: '10rem'}}>{ t('Employee ID') }</th>
                                        <th style={{ minWidth: '10rem' }}>{ t('Employee Name') }</th>
                                        <th style={{ minWidth: '13rem' }}>{ t('Allowance Request Date') }</th>
                                        <th style={{minWidth: '10rem'}}>{ t('Allowance Payment') }</th>
                                        <th style={{minWidth: '15rem'}}>{ t('Allowance Name') }</th>
                                        <th style={{minWidth: '10rem'}}>{ t('Total Amount') }</th>
                                        <th style={{ minWidth: '15rem' }}>{ t('Description') }</th>
                                        <th style={{minWidth: '7.5rem'}}>{ t('Attendance') }</th>
                                        <th style={{minWidth: '10rem'}}>{ t('Approver Status') }</th>
                                        <th style={{minWidth: '5rem'}}>{ t('Detail') }</th>
                                        <th style={{ minWidth: '15rem' }}>{ t('Denied Reason') }</th>
                                    </tr>
                                </thead>
                            }
                            <tbody>
                                {
                                    props.data.map( (i,index) => {
                                        let route; i.attendance === true ? route = "/avatars/true.png" : route = "/avatars/false.png";
                                        return(
                                            i.allowance_request_date.map( (ii,indexIII)=>{
                                                return(
                                                    <tr key={ii}>
                                                        {
                                                            indexIII === 0 &&
                                                            <>
                                                                <td className="td-no" rowSpan={i.allowance_request_date.length}>
                                                                    <input type="checkbox"
                                                                        value={[i.allowance_request_id, props.flag]}
                                                                        checked={i.is_checked}
                                                                        onChange={props.changeCheckbox}
                                                                        disabled={ (i.is_approver === false && props.flag === false) || (i.can_delete === false && props.flag === true) }
                                                                    />
                                                                </td>
                                                                <td style={{textAlign:"cemter"}} rowSpan={i.allowance_request_date.length}>
                                                                    {index + 1}
                                                                </td>
                                                                <td style={{textAlign:"right"}} className="bg-blue" rowSpan={i.allowance_request_date.length}>
                                                                    {i.employee_id}
                                                                </td>
                                                                <td style={{textAlign:"left"}} className="bg-blue" rowSpan={i.allowance_request_date.length}>
                                                                    {i.employee_name}
                                                                </td>
                                                            </>
                                                        }
                                                        <td style={{textAlign:"center"}}>
                                                            {
                                                                ii // allowance_request_date
                                                            }
                                                        </td>
                                                        {
                                                            indexIII === 0 &&
                                                            <>
                                                                <td className="bg-peach" style={{textAlign:"center"}} rowSpan={i.allowance_request_date.length}>
                                                                    {i.allowance_payment}
                                                                </td>
                                                                <td className="bg-pink" style={{textAlign:"left"}} rowSpan={i.allowance_request_date.length}>
                                                                    {i.allowance_name}
                                                                </td>
                                                                <td style={{textAlign:"right"}} rowSpan={i.allowance_request_date.length}>
                                                                    {i.total_amount}
                                                                </td>
                                                                <td style={{textAlign:"left"}} className="bg-green" rowSpan={i.allowance_request_date.length}>
                                                                    {i.description}
                                                                </td>
                                                                <td style={{textAlign:"center"}} rowSpan={i.allowance_request_date.length}>
                                                                    <CImg width="23px" src={route} />
                                                                </td>
                                                                <td style={{textAlign:"center"}} className="bg-cyan" rowSpan={i.allowance_request_date.length}>
                                                                    {
                                                                        parseInt(i.approver_status) === 1 &&
                                                                        'Pending'
                                                                    }
                                                                    {
                                                                        parseInt(i.approver_status) === 2 &&
                                                                        'Confirm'
                                                                    }
                                                                    {
                                                                        parseInt(i.approver_status) === 3 &&
                                                                        'Reject'
                                                                    }
                                                                    {
                                                                        parseInt(i.approver_status) === 4 &&
                                                                        <p className="m-0 p-0" style={{ color: 'red' }}>Overdue</p>
                                                                    }
                                                                </td>
                                                                <td style={{textAlign:"center"}} rowSpan={i.allowance_request_date.length}>
                                                                    <CImg onClick={props.detail.bind(this,i)} className="icon-clt" src="/avatars/detail.png" />
                                                                </td>
                                                                <td style={{textAlign:"left"}} rowSpan={i.allowance_request_date.length}>
                                                                    {i.denied_reason}
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
                    {
                        props.total > 20 &&
                        <CRow className="mt-5" alignHorizontal="center">
                            <CPagination
                                activePage={props.currentPage}
                                pages={props.lastPage}
                                dots={false}
                                arrows={false}
                                align="center"
                                firstButton="First page"
                                lastButton="Last page"
                                onActivePageChange={ (i) => props.changePaginate(i) }
                            ></CPagination>
                        </CRow>
                    }
                </CCol>
            </CRow>
        </div>
        <CRow alignHorizontal="center" className="mt-5 mb-2">
            {
                (props.flag === false && props.showConfirmReject === true) &&
                <>
                    <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                    <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                </>
            }
            {
                props.flag === true &&
                <CButton className="form-btn m-2" onClick={props.delete}>{t('Delete')}</CButton>
            }
        </CRow>
    </>)
}

export default Table