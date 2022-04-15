import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard,CInput,
    CDropdownItem,CDropdownMenu,CDropdown,CDropdownToggle } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
/**
 * @author Su Pyae Maung
 * @create 18/06/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableData=props=> {
    const{t} = useTranslation();
    return (<>
        { props.salaryDataTable.length > 0  && <>
            <CRow alignHorizontal="end" style={{marginRight:"15px"}}>
                {!(props.positionRank.includes(0)) &&
                    <CButton className="mail-btn" onClick={props.mailSend} >{t('Request Mail Send')}</CButton>
                }
                <CDropdown className="">
                    <CDropdownToggle caret className="dropdown-btn">
                        <CImg src={'/image/download.png'} width="12px" height="12px" />
                        <span className="ml-2">{t('Download Excel')}</span>
                    </CDropdownToggle>
                    <CDropdownMenu className="mt-1 mb-1 four-side-shadow">
                        <CDropdownItem onClick={()=>props.downloadExcel(0)} >{t('Salary')}</CDropdownItem>
                        <CDropdownItem onClick={()=>props.downloadExcel(1)} >{t('Attendance')}</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CRow><br/>
            <div style={{border:'1px solid #E6E6E6',borderRadius:'10px',paddingTop:"10px"}}>
                <CCard className='table-panel'>
                    <CRow id="table">
                            <CCol lg="12">
                            <div className="table-responsive" >
                                <table className="table">
                                    <thead>
                                    {<>
                                        <tr>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '8rem' }} >
                                                { t('Employee ID') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '10rem' }}>
                                                { t('Employee Code') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '10rem' }}>
                                                { t('Employee Name') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '15rem' }}>
                                                { t('Position') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Basic Salary') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Total Salary') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Overtime') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Perfect Attendance') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Requested Allownance') }
                                            </th>
                                            <th colSpan={props.curLength*2} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Bonus') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Advanced Salary') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Income Tax') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('SSB') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('All Deduction') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Adjustment PIT') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Adjustment') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Net Salary') }
                                            </th>
                                        </tr>
                                        <tr>
                                            { // Basic Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Total Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Overtime (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Perfect Attendance (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Requested Allowance (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            <th colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t('Yearly Bonus') }</th>
                                            <th colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t('Service Bonus') }</th>
                                            { // Advanced Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Income Tax (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // SSB (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // All Deduction (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Adjustment PIT (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Adjustment (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Net Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            { // Yearly Bonus (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th className="top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Service Bonus (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th className="top-border" style={{ minWidth: '6rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                        </tr>
                                    </>}
                                    </thead>
                                    <tbody >
                                    {
                                        props.salaryDataTable.length > 0  &&
                                        props.salaryDataTable.map((i,index) => {
                                            let posArr = [];
                                            i.empinfoerp.positions.map((p,idx)=>{
                                                posArr.push(p.position_name);
                                            })
                                            let position = posArr.toString();
                                            return(
                                                <tr key={index} width="100%">
                                                    <td className="td-no" style={{textAlign:"right"}}>
                                                        { i.employee_id }
                                                    </td>
                                                    <td style={{textAlign:"left"}}>
                                                        { i.empinfoerp.code }
                                                    </td>
                                                    <td style={{textAlign:"left"}}>
                                                        { i.empinfoerp.name_eng }
                                                    </td>
                                                    <td style={{textAlign:"left"}}>
                                                        { position }
                                                    </td>
                                                    { // Basic Salary (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            if(cur.id == i.basic_salary_currency_id){
                                                               amount = i.basic_salary;
                                                            }
                                                            return(<>
                                                                <td className="bg-peach">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Total Salary (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2totalsalaries.map((j,idx)=>{
                                                                if(cur.id == j.total_salary_currency_id){
                                                                    amount = j.total_salary;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Overtime (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2overtimes.map((j,idx)=>{
                                                                if(cur.id == j.overtime_currency_id){
                                                                    amount = j.overtime_amount;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Perfect Attendance (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            if(cur.id == i.perfect_attendance_currency_id){
                                                                amount = i.perfect_attendance_amount;
                                                            }
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Requested Allownance (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2requestallowances.map((j,idx)=>{
                                                                if(cur.id == j.amount_currency_id){
                                                                    amount = j.request_allowance_amount;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Yearly Bonus (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2bonuses.map((j,idx)=>{
                                                                if(cur.id == j.yearly_bonus_currency_id){
                                                                    amount = j.yearly_bonus;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Service Bonus (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2servicebonuses.map((j,idx)=>{
                                                                if(cur.id == j.service_bonus_currency_id){
                                                                    amount = j.service_bonus;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-blue">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Advanced Salary (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            if(cur.id == i.advanced_currency){
                                                               amount = i.advanced_salary;
                                                            }
                                                            return(<>
                                                                <td className="bg-cyan">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Income Tax (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            if(cur.id == i.income_tax_currency_id){
                                                               amount = i.income_tax;
                                                            }
                                                            return(<>
                                                                <td className="bg-cyan">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // SSB (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            if(cur.id == i.employee_ssb_currency_id){
                                                               amount = i.employee_ssb;
                                                            }
                                                            return(<>
                                                                <td className="bg-cyan">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // All Deduction (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0, amt1 = 0, amt2 = 0 ;
                                                            let ded1 = i.salarycalculate2deductions.filter((j,idx)=>{
                                                                if(cur.id == j.deduction_currency_id){
                                                                    return j;
                                                                }
                                                            })
                                                            let ded2 = i.salarycalculate2attendancedeductions.filter((attded,indexII) => {
                                                                if(cur.id == attded.absent_currency_id){
                                                                    return attded;
                                                                }
                                                            });
                                                            if(ded1.length <= 0){
                                                                amt1  = 0;
                                                            }else{
                                                                amt1 = ded1[0]['sum_deduction_amount'];
                                                            }
                                                            if(ded2.length <= 0){
                                                                amt2 = 0;
                                                            }else{
                                                                amt2 = ded2[0]['total_amount'];
                                                            }
                                                            amount = parseFloat(amt1) + parseFloat(amt2);
                                                            return(<>
                                                                <td className="bg-cyan">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Adjustment PIT (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2adjustments.map((j,idx)=>{
                                                                if(cur.id == j.adjustment_pid_currency_id){
                                                                    amount = j.adjustment_pid_amount;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-green">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Adjustment (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2adjustments.map((j,idx)=>{
                                                                if(cur.id == j.adjustment_currency_id){
                                                                    amount = j.adjustment_amount;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-green">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                    { // Net Salary (MMK,USD,...)
                                                        props.currencyArr.map((cur, index) => {
                                                            let amount = 0;
                                                            i.salarycalculate2totalsalaries.map((j,idx)=>{
                                                                if(cur.id == j.net_salary_currency_id){
                                                                    amount = j.net_salary;
                                                                }
                                                            })
                                                            return(<>
                                                                <td className="bg-pink">{ amount }</td>
                                                            </>)
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </CCol>
                    </CRow>
                </CCard> 
            </div>
        </>}
    </>
    );
}
export default TableData;