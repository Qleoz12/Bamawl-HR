import React from 'react';
import {CCol,CRow,CButton,CSelect,CLabel,CImg,CCard,CInput } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';
/**
 * @author Su Pyae Maung
 * @create 24/05/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const TableData=props=> {
    const{t} = useTranslation();
    return (<>
        {props.salaryDataTable.length > 0  && <>
            <div style={{border:'1px solid #E6E6E6',borderRadius:'10px',paddingTop:"10px"}}>
                <CCard className='table-panel'>
                    <CRow id="table">
                            <CCol lg="12">
                            <div className="table-responsive" >
                                <table className="table salary-calculate2-table">
                                    <thead>
                                    {<>
                                        <tr>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '8rem' }}>
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
                                                { t('Monthly Salary(Working Day)') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('SSB') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Absent') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Unpaid') }
                                            </th>
                                            <th colSpan={(props.deTotalLength)+(props.curLength)} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('All Deduction') }
                                            </th>
                                            { props.allowTotalLength >0 && 
                                                <th colSpan={props.allowTotalLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                    { t('All Allowance') }
                                                </th>
                                            }
                                            { props.levTotalLength >0 && 
                                                <th colSpan={props.levTotalLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                    { t('All Leave') }
                                                </th>
                                            }
                                            { props.reqTotalLength >0 && 
                                                <th colSpan={props.reqTotalLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                    { t('Requested Allownance Amount') }
                                                </th>
                                            }           
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Advanced Salary') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Overtime Amount') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Salary Equality Adjustment') }
                                            </th>
                                            <th width="200px" colSpan={props.curLength*2} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Bonus') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Perfect Attendance') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Attendance Incomplete') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Total Salary') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Adjustment (Calculate PIT)') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Adjustment (Not Calculate PIT)') }
                                            </th>
                                            <th rowSpan="3" className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Comment') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Income Tax') }
                                            </th>
                                            <th colSpan={props.curLength} className="table-header" style={{ minWidth: '7.5rem' }}>
                                                { t('Net Salary') }
                                            </th>
                                        </tr>
                                        <tr>
                                            { // Basic Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Monthly Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // SSB (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Absent (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Unpaid (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            
                                            {/* { props.deTotalLength >0 &&  */}
                                                <th colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t('Late/Early') }</th>
                                            {/* }    */}

                                            { // All Deduction Sub Name (Late/Early, Uniform,...)
                                            props.deTotalLength >0 && 
                                                props.deductionArr.map((ded, index) => {
                                                    return(<>
                                                        <th key={index} colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t(ded.deduction_name) }</th>
                                                    </>)
                                                })
                                            }
                                            { // All Allowance Sub Name (Language, Transportation,...)
                                            props.allowTotalLength >0 &&
                                                props.allowanceArr.map((allow, index) => {
                                                    return(<>
                                                        <th key={index} colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t(allow.allowance_name) }</th>
                                                    </>)
                                                })
                                            }
                                            { // All Leave Sub Name (Casual, Annual,...)
                                            props.levTotalLength >0 && 
                                                props.leaveArr.map((lev, index) => {
                                                    return(<>
                                                        <th key={index} colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t(lev.leave_name) }</th>
                                                    </>)
                                                })
                                            }
                                            { // All Requested Allowance Name (Business,...)
                                            props.reqTotalLength >0 && 
                                                props.reqAllowArr.map((req, index) => {
                                                    return(<>
                                                        <th key={index} colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t(req.allowance_name) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Advanced Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Overtime Amount (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Salary Equality Adjustment (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            <th colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t('Yearly Bonus') }</th>
                                            <th colSpan={props.curLength} className="table-header top-border" style={{ minWidth: '7.5rem' }}>{ t('Service Bonus') }</th>
                                            { // Perfect Attendance (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Attendance Incomplete (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Total Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Adjustment (Calculate PIT) (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Adjustment (Not Calculate PIT) (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '8rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Income Tax (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                            { // Net Salary (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(<>
                                                        <th key={index} rowSpan={props.curLength+1} className="table-header top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    </>)
                                                })
                                            }
                                        </tr>
                                        <tr>
                                            { // Deduction Late/Early (MMK,USD,...)
                                            // props.deTotalLength >0 && 
                                                props.currencyArr.map((cur, index) => {
                                                    return(
                                                        <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    )
                                                })    
                                            } 
                                            { // All Deduction (MMK,USD,...)
                                            props.deTotalLength >0 && 
                                                props.deductionArr.map((ded, index) => {
                                                    return(
                                                        props.currencyArr.map((cur, index) => {
                                                            return(
                                                                <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                            )
                                                        })
                                                    )
                                                })
                                            } 
                                            { // All Allowance (MMK,USD,...)
                                                props.allowanceArr.map((allow, index) => {
                                                    return(
                                                        props.currencyArr.map((cur, index) => {
                                                            return(
                                                                <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                            )
                                                        })
                                                    )
                                                })
                                            }
                                            { // All Leave (MMK,USD,...)
                                                props.leaveArr.map((lev, index) => {
                                                    return(
                                                        props.currencyArr.map((cur, index) => {
                                                            return(
                                                                <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                            )
                                                        })
                                                    )
                                                })
                                            }
                                            { // All Requested Allowance (MMK,USD,...)
                                                props.reqAllowArr.map((req, index) => {
                                                    return(
                                                        props.currencyArr.map((cur, index) => {
                                                            return(
                                                                <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                            )
                                                        })
                                                    )
                                                })
                                            }
                                            { // Yearly Bonus (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(
                                                        <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    )
                                                })    
                                            }
                                            { // Service Bonus (MMK,USD,...)
                                                props.currencyArr.map((cur, index) => {
                                                    return(
                                                        <th className="top-border" style={{ minWidth: '7rem' }}>{ t(cur.currency_desc) }</th>
                                                    )
                                                })    
                                            }
                                        </tr>
                                    </>}
                                    </thead>
                                    <tbody>
                                    {
                                        props.salaryDataTable.length > 0  &&
                                        props.salaryDataTable.map((i,index) => {


                                            return(
                                            <tr key={index} >
                                                <td className="td-no" style={{textAlign:"right"}}>
                                                    { i.employee_id }
                                                </td>
                                                <td style={{textAlign:"left"}}>
                                                    { i.employee_code }
                                                </td>
                                                <td style={{textAlign:"left"}}>
                                                    { i.employee_name }
                                                </td>
                                                <td className="bg-pink" style={{textAlign:"left"}}>
                                                    { i.position_name }
                                                </td>
                                                { // Basic Salary (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let basic = "";
                                                        if(cur.id == i.basic_salary_currency_id){
                                                           basic = i.basic_salary;
                                                        }
                                                        return(<>
                                                            <td className="">{ basic }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Monthly Salary (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'attend_salary_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-cyan">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // SSB (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let amount = "";
                                                        if(cur.id == i.employee_ssb_currency_id){
                                                           amount = i.employee_ssb;
                                                        }
                                                        return(<>
                                                            <td className="bg-green">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Absent (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'absent_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-purple">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Unpaid (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'unpaid_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-purple">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Late/Early (MMK,USD,...)
                                                // props.deTotalLength >0 && 
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'late_early_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-cyan">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // All Deduction (MMK,USD,...)
                                                props.deTotalLength >0 && 
                                                    props.deductionArr.map((ded, index) => {
                                                        return(
                                                            props.currencyArr.map((cur, index) => {
                                                                let name = 'deduction_amount_'+ded.id+'_'+cur.id; 
                                                                let amount = i[name];
                                                                return(
                                                                    <td className="bg-cyan">{ amount }</td>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                                { // All Allowance (MMK,USD,...)
                                                props.allowTotalLength >0 && 
                                                    props.allowanceArr.map((allow, index) => {
                                                        return(
                                                            props.currencyArr.map((cur, index) => {
                                                                let name = 'allowance_amount_'+allow.id+'_'+cur.id; 
                                                                let amount = i[name];
                                                                return(
                                                                    <td className="bg-peach">{ amount }</td>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                                { // All Leave (MMK,USD,...)
                                                props.levTotalLength >0 && 
                                                    props.leaveArr.map((lev, index) => {
                                                        return(
                                                            props.currencyArr.map((cur, index) => {
                                                                let name = 'leave_amount_'+lev.id+'_'+cur.id; 
                                                                let amount = i[name];
                                                                return(
                                                                    <td className="bg-purple">{ amount }</td>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                                { // Requested Allowance (MMK,USD,...)
                                                props.reqTotalLength >0 && 
                                                    props.reqAllowArr.map((req, index) => {
                                                        return(
                                                            props.currencyArr.map((cur, index) => {
                                                                let name = 'requested_allowance_amount_'+req.id+'_'+cur.id; 
                                                                let amount = i[name];
                                                                return(
                                                                    <td className="bg-blue">{ amount }</td>
                                                                )
                                                            })
                                                        )
                                                    })
                                                }
                                                { // Advanced Salary (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'advance_salary_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-green">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Overtime Amount (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'overtime_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-green">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Salary Equality Adjustment (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'equality_salary_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-peach">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Yearly Bonus (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'yearly_bonus_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-pink">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Service Bonus (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'service_bonus_'+cur.id ; 
                                                        if(!isEmpty(name)){
                                                            let amount = i[name];
                                                            return(<>
                                                                <td className="bg-pink">{ amount }</td>
                                                            </>)
                                                        }
                                                    })
                                                }
                                                { // Perfect Attendance (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let amount = "";
                                                        if(cur.id == i.perfect_attendance_currency_id){
                                                            amount = i.perfect_attendance_amount;
                                                        }
                                                        return(<>
                                                            <td className="bg-green">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Attendance Incomplete (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'attendance_incomplete_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-green">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Total Salary (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'total_salary_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-cyan">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Adjustment (Calculate PIT) (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'adjust_pit_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="">
                                                                <CInput type="text" className="td-input" onBlur={(e)=>props.changeAdjPIT(e,i.employee_id,i.temp_sal2_id,cur.id)} defaultValue={amount !== undefined ? amount : ""}/>
                                                            </td>
                                                        </>)
                                                    })
                                                }
                                                { // Adjustment ( Not Calculate PIT) (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'adjust_not_pit_amount_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="">
                                                                <CInput type="text" className="td-input" onBlur={(e)=>props.changeAdjNotPIT(e,i.employee_id,i.temp_sal2_id,cur.id)} defaultValue={amount !== undefined ? amount : ""} />
                                                            </td>
                                                        </>)
                                                    })
                                                }
                                                <td className="">
                                                    <CInput type="text" className="td-input bg-pink" onBlur={(e)=>props.changeCmt(e,i.employee_id,i.temp_sal2_id)} defaultValue={i.adjust_comment !== undefined ? i.adjust_comment : ""} />
                                                </td>
                                                { // Income Tax (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let amount = "";
                                                        if(cur.id == i.income_tax_currency_id){
                                                           amount = i.income_tax;
                                                        }
                                                        return(<>
                                                            <td className="bg-cyan">{ amount }</td>
                                                        </>)
                                                    })
                                                }
                                                { // Net Salary (MMK,USD,...)
                                                    props.currencyArr.map((cur, index) => {
                                                        let name = 'net_salary_'+cur.id ; 
                                                        let amount = i[name];
                                                        return(<>
                                                            <td className="bg-cyan">{ amount }</td>
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
                    <CRow alignHorizontal="center" style={{marginTop:"30px"}}>
                        <CButton className="form-btn" onClick={props.exportFile} >{t('Export')}</CButton>
                        <CButton className="form-btn" style={{marginLeft:"15px"}} onClick={props.saveAndNext}>{t('Save & Next')}</CButton> 
                    </CRow>
                </CCard>
            </div>
            </>}
        </>
    );
}
export default TableData;