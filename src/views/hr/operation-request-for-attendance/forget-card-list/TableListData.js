import React from 'react';
import {CCard, CCol, CRow, CImg,CLabel,CButton, CTooltip, CPagination} from '@coreui/react';
import { useTranslation } from 'react-i18next';
/**
 * @author Su Pyae Maung
 * @create 27/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableListData=props=> {
    const{t} = useTranslation();
    return (<>
        {
            props.mainTable.length > 0  &&
            <CCard className='box box-white' style={{marginTop:"25px"}}>
                <CRow className="m-3">
                    <CCol lg="12">
                        <CCol lg="12" style={{marginBottom:"5px"}}>
                            <CRow alignHorizontal="start">
                                <div style={{ position: 'absolute', userSelect: 'none' }}>
                                    <input id="show_delete" type="checkbox" checked={props.deleteFlag} onChange={props.changeDelete} />
                                    <CLabel htmlFor="show_delete" className="ml-1" style={{cursor: 'pointer'}}>{t('Show Delete Button')}</CLabel>
                                </div>
                            </CRow>
                            <CRow alignHorizontal="end">
                                <div className="row-count-msg">{t("Total Rows: ")}{props.total}{t(" Row(s)")}</div>
                            </CRow>
                        </CCol>
                        <div className="table-responsive">
                            <table className="table">
                                {
                                <thead>
                                    <tr>
                                        <th style={{minWidth: '3.5rem'}}>
                                            <input 
                                                type="checkbox" 
                                                value={['allcheck', props.deleteFlag]} 
                                                checked={props.allCheck} 
                                                onChange={props.change_checkbox} 
                                            />
                                        </th>
                                        <th style={{minWidth: '3.5rem'}}>
                                            { t('No') }
                                        </th>
                                        <th style={{minWidth: '7.5rem'}}>
                                            { t('Employee ID') }
                                        </th>
                                        <th style={{minWidth: '10rem'}}>
                                            { t('Employee Code') }
                                        </th>
                                        <th style={{minWidth: '10rem'}}>
                                            { t('Employee Name') }
                                        </th>
                                        <th style={{ minWidth: '10rem' }}>
                                            { t('Date') }
                                        </th>
                                        <th style={{minWidth: '5rem'}}>
                                            { t('Status') }
                                        </th>
                                        <th style={{minWidth: '15rem'}}>
                                            { t('Description') }
                                        </th>
                                        <th colSpan="3" style={{minWidth: '10rem'}}>
                                            { t('Action') }
                                        </th>
                                        <th style={{minWidth: '10rem'}}>
                                            { t('Approver Status') }
                                        </th>
                                        <th style={{minWidth: '10rem'}}>
                                            { t('Denied Reason') }
                                        </th>
                                    </tr>
                                </thead>  
                                }
                                <tbody>
                                {props.mainTable.length > 0  &&
                                props.mainTable.map( (i,index) => {
                                    return(<>
                                        <tr key={index}>
                                            <td className="td-no" style={{textAlign:"center"}}>
                                                <input type="checkbox" 
                                                    value={[i.id, props.deleteFlag]} 
                                                    checked={i.is_checked} 
                                                    onChange={props.change_checkbox} 
                                                    disabled={(i.is_approve === false && props.deleteFlag === false) || (i.can_delete === false && props.deleteFlag === true)}
                                                />
                                            </td> 
                                            <td id={i.id} style={{textAlign:"center"}}>
                                                {index+1}
                                            </td>
                                            <td className="bg-blue" style={{textAlign:"right"}}>
                                                {i.employee_id}
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {i.employee_code}
                                            </td>
                                            <td className="bg-green" style={{textAlign:"left"}}>
                                                {i.employee_name}
                                            </td>
                                            <td className="bg-pink" style={{textAlign:"center"}}>
                                                {i.attendance_date}<br/>{i.time}
                                            </td>
                                            <td className="bg-blue" style={{textAlign:"center"}}>
                                                {i.status}
                                            </td>
                                            <td className="bg-green" style={{textAlign:"left"}}>
                                                {i.description}
                                            </td>
                                            {i.salary_calculate === "Overdue" && <>
                                                <td style={{textAlign:"center",color:"red"}}>
                                                    {t('Overdue')}
                                                </td>
                                                <td>
                                                    {t('-')}
                                                </td>
                                                <td>
                                                    {t('-')}
                                                </td> 
                                            </>}
                                            {i.salary_calculate === "" && <>
                                                <td style={{textAlign:"center"}}>
                                                    {t('-')}
                                                </td>
                                                {i.approve_flag === "Confirmed" && 
                                                    <td style={{textAlign:"center"}}>
                                                        {t('-')}
                                                    </td>
                                                }
                                                {i.approve_flag === "Denied" && 
                                                    <td style={{textAlign:"center"}}>
                                                        {t('-')}
                                                    </td>
                                                }
                                                {i.approve_flag === "Pending" && 
                                                    <td>
                                                        <CTooltip content={t('Edit')}>
                                                        <CImg 
                                                            id = {i.id}
                                                            value={i.id}
                                                            src={'/avatars/edit.png'} 
                                                            className="icon-clt" 
                                                            alt="edit" 
                                                            onClick={props.edit.bind(this,i.id)}
                                                        />
                                                        </CTooltip>
                                                    </td>
                                                }   
                                                <td>
                                                    <CTooltip content={t('Detail')}>
                                                    <CImg 
                                                        id = {i.id}
                                                        value={i.id}
                                                        src={'/avatars/detail.png'} 
                                                        className="icon-clt" 
                                                        alt="detail" 
                                                        onClick={props.detail.bind(this,i)}
                                                    />
                                                    </CTooltip>
                                                </td>
                                            </>}
                                            <td className="bg-cyan" style={{textAlign:"center"}}>
                                                {i.approve_flag}
                                            </td>
                                            <td style={{textAlign:"left"}}>
                                                {i.denied_reason}
                                            </td>
                                        </tr>
                                    </>)
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
                                onActivePageChange={ (i) => {props.changePaginate(i)} }
                            ></CPagination>
                        </CRow>
                        }
                        <CRow alignHorizontal="center" className="mt-5 mb-2">
                        {
                            props.deleteFlag === false && <>
                            { props.confirmRejectShow == true && <>
                                <CButton className="form-btn m-2" onClick={props.confirm}>{t('Confirm')}</CButton>
                                <CButton className="form-btn m-2" onClick={props.reject}>{t('Reject')}</CButton>
                            </>}
                            </>
                        }
                        {
                            props.deleteFlag === true && <>
                            { props.deleteShow == true && <>
                                <CButton className="form-btn m-2" onClick={props.delete}>{t('Delete')}</CButton>
                            </>}
                            </>
                        }
                        </CRow>
                    </CCol>
                </CRow><br/>
            </CCard>
        }
    </>
    );
}
export default TableListData;