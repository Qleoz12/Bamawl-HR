import React from 'react';
import {
  CCol,
  CRow,
  CImg,
  CLabel,
  CButton,CSelect, CInput,CInputRadio,CButtonGroup
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../hr-common/datepicker/DatePicker';
import Method from '../../hr-common/method/Method';
import Autocomplete from '../../../brycen-common/autocomplete/CommonAutocomplete' 

/**
 * @author Su Pyae Maung
 * @create 27/06/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const FormData = props => {
    const{t} = useTranslation();
    return (<>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Name')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg='4' className="deduction-inner">
                <CSelect onChange={props.dedNameChange} value={props.dedName} className="bamawl-select" custom >
                    <option key="" value="">---{t('Select Deduction Name')}---</option>
                        {props.dednameAPI != "" &&
                            props.dednameAPI.map((name,index)=>{
                                return(
                                    <option key={index} value={name.id}>{name.deduction_name}</option>
                                )
                            })
                        }
                </CSelect>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Category')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                {props.decateAPI != "" && 
                    props.decateAPI.map((cate,index)=>{ 
                    let cName = "cate"+cate.id;
                        return(<>
                        <CCol lg='2' className="bank_errlist_inner">
                            <CLabel htmlFor={cName}>{cate.category_name}</CLabel>
                            <CInputRadio className="bank_errlist_radio"
                                disabled={true}
                                key={index}
                                id={cName}
                                value={cate.id}
                                checked={props.deCate == cate.id}
                                // checked={cate.id == 3}
                                // onChange={props.cateNameChange}
                            ></CInputRadio>
                        </CCol>
                        </>) 
                    })
                }
            </CRow><br/>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Type')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg='3'>
                {props.deType == "1" &&
                    <CButton className="deduction-type" disabled>Percentage</CButton >
                }
                {props.deType == "2" &&
                    <CButton className="deduction-type" disabled>Amount</CButton >
                }   
                    
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Count')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg='3'>
                    <CInput className="deduction-count" value={props.deCount} disabled></CInput >
                </CCol>
            </CRow>
            <CRow lg='12'>
                <CCol lg='9'>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Period')}</CLabel>
                </CCol>
                <CCol>
                    <CButtonGroup className="btn-gp">
                        <CButton value="1" className="perCust" disabled>{t('Customized')}</CButton>
                        <CButton value="2" className="perEvery" disabled>{t('Every Month')}</CButton>
                    </CButtonGroup>
                </CCol>
            </CRow>
            {props.dePeriod == "1" && 
                <div className="bank_errlist">
                    <CRow lg='12'>
                        <CCol lg='1'></CCol>
                        <CCol lg='2' className="deduction-month">
                            <CImg src={'/avatars/month.png'} style={{marginRight:'10px',width:"15px",height:"15px"}} alt="month" />
                            <CLabel >{t('Month')}</CLabel>
                        </CCol>
                        <CCol lg='3'>
                            <CInput className="deduction-count" value={props.deMonth} disabled></CInput >
                        </CCol>
                        </CRow>
                    <hr/>
                    <CRow lg='12'>
                        <CCol lg="1"></CCol>
                        <CCol lg="6" className="de-period" > 
                            <div className="ml-4">
                                <Method label1={props.label1} label2={props.label2} checked={props.methodCheck} value={props.dePeriodMethod} method={props.method} />
                            </div>
                            {   props.deInstallType == "1" &&
                                props.deTable != ""  && <>
                                <table className="table" style={{minWidth:"28rem"}}>
                                    <thead>
                                        <tr>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}} >
                                                { t('Month') }
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}} >
                                                { t('Deduct') }
                                            </th>
                                            <th style={{textAlign:'center',verticalAlign:'middle'}} >
                                                { t('') }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.deTable.map((i,index) => {
                                            let month_name = "";
                                            if(i.month == "1"){month_name ="First";}
                                            else if(i.month == "2"){month_name ="Second";}
                                            else if(i.month == "3"){month_name = "Third";}
                                            else if(i.month == "4"){month_name = "Fourth";}
                                            else if(i.month == "5"){month_name = "Fifth";}
                                            else if(i.month == "6"){month_name = "Sixth";}
                                            else if(i.month == "7"){month_name = "Seventh";}
                                            else if(i.month == "8"){month_name = "Eighth";}
                                            else if(i.month == "9"){month_name = "Ninth";}
                                            else if(i.month == "10"){month_name = "Tenth";}
                                            else if(i.month == "11"){month_name = "Eleventh";}
                                            else if(i.month == "12"){month_name = "Twelfth";}
                                            return(
                                                <tr key={index} >
                                                    <td>{month_name}</td>
                                                    <td>{i.deduction}</td>
                                                    {props.deType == "1" &&
                                                        <td style={{textAlign:"left"}}>{'%'}</td>
                                                    }
                                                    {props.deType == "2" &&
                                                        <td style={{textAlign:"left"}}>{t('Amount')}</td>
                                                    }
                                                </tr> 
                                            )
                                        })}    
                                    </tbody>
                               </table>
                            </>}
                            {props.deInstallType == "2" && <>
                                <CRow lg="12">
                                    <CCol lg="3"></CCol>
                                    <CCol lg="4">
                                        <CInput value={props.deEqual} className="de-equal" disabled></CInput >
                                    </CCol>
                                    <CCol lg="1">
                                        {props.deType == "1" &&
                                            <CLabel className="de-eq-label">{t('%')}</CLabel>
                                        }
                                        {props.deType == "2" &&
                                            <CLabel className="de-eq-label">{t('Amount')}</CLabel>
                                        }
                                    </CCol>
                                </CRow>
                            </>}
                        </CCol>
                    </CRow>
                </div>
            }
            {props.dePeriod == "2" &&
                <CRow lg="12" className="bank_errlist">
                    <CCol lg="3">
                        <CInput value={props.deEveryMonth} className="deduction-count" disabled></CInput >
                    </CCol>
                    <CCol lg="1">
                        {props.deType == "1" &&
                            <CLabel className="de-everymonth">{t('%')}</CLabel>
                        }
                        {props.deType == "2" &&
                            <CLabel className="de-everymonth">{t('Amount')}</CLabel>
                        }
                    </CCol>
                </CRow>
            }
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Date')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg='3' style={{margin:"20px 0px 0px"}}>
                    <DatePicker value={props.deductionDate} change={props.changeDate} />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Reason')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg='4'>
                    <CInput type="text" className="deduction-count" value={props.deReason} onChange={props.changeReason} placeholder="Enter Reason" ></CInput >
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CImg src={'/avatars/list.png'} className="titleicon listicon" alt="titleicon" />
                    <CLabel className="required middle">{t('Deduction Calculate Method For')}</CLabel>
                </CCol>
            </CRow>
            <CRow className="bank_errlist">
                <CCol lg="9">
                
                    <div className="ml-4" style={{margin:"15px 0px"}} >
                        {props.editID === null &&
                            <Method label1={props.calmethod1} label2={props.calmethod2} checked={props.calculateCheck} change={props.changeCalculateMethod} value={props.deCalculateMethod} method={props.calMethod} />
                        }    
                    </div>
                    <div className="ml-4" style={{margin:"15px 0px"}} >
                        {props.editID != null &&
                            <Method label1={props.calmethod1} label2={props.calmethod2} checked={props.calculateCheck} method={props.calMethod} />
                        }    
                    </div>
                
                </CCol>
            </CRow>
            {props.calculateCheck === true && (props.editID === "" || props.editID === null) &&
                <div style={{marginTop:'50px'}}>
                    <CRow lg="12" style={{marginBottom:'25px'}}>
                        <CCol lg="5">
                            <CLabel>{t('Department Name')}</CLabel><br/>
                            <CSelect className="bamawl-select" value={props.deptState} onChange={props.deptChange} custom>
                                <option key="" value="">---{t('Select Department Name')}---</option>
                                {
                                    props.departmentAPI.map((dept,index) => {
                                        return( <option key={index} value={dept.id}>{dept.department_name}</option> )
                                    } )
                                }
                            </CSelect>
                        </CCol>
                        <CCol lg="1" className="verticle-line"/>
                        <CCol lg="1"/>
                        <CCol lg="5">
                            <CLabel>{t('Role')}</CLabel><br/>
                            <CSelect onChange={props.positionChange} value={props.positionState} className="bamawl-select" custom>
                                <option key="" value="">---{t('Role')}---</option>
                                {props.positionAPI != "" &&
                                    props.positionAPI.map((pos,index)=>{
                                        return(
                                            <option key={index} value={pos.id}>{pos.admin_level_name}</option>
                                        ) 
                                    })
                                }
                            </CSelect>
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'25px'}}>
                        <CCol lg="5">
                            <CLabel className="required">{t('Joined Date (From)')}</CLabel><br/>
                            <DatePicker value={props.selectedFromDate} change={props.changeFromDate} />
                        </CCol>
                        <CCol lg="1" className="verticle-line"/>
                        <CCol lg="1"/>
                        <CCol lg="5">
                            <CLabel className="required">{t('Joined Date (To)')}</CLabel><br/>
                            <DatePicker value={props.selectedToDate} change={props.changeToDate} />
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'25px'}}>
                        <CCol lg="5">
                            <CLabel htmlFor="app_name" >{t('Employee Name')}</CLabel>
                            <Autocomplete
                                onChange={(i) => props.changeAutocomplete('name', i)}
                                onSelect={props.selectAutocomplete}
                                items={props.autocompleteName}
                                name={props.empName}
                            />
                        </CCol>
                        <CCol lg="1" className="verticle-line"/>
                        <CCol lg="1"/>
                        <CCol lg="5">
                            <CLabel htmlFor="app_id" >{t('Employee ID')}</CLabel>
                            <Autocomplete
                                onChange={(i) => props.changeAutocomplete('id', i)}
                                onSelect={props.selectAutocomplete}
                                items={props.autocompleteID}
                                name={props.empId}
                            />
                        </CCol>
                    </CRow>
                    <CRow lg="12" style={{marginBottom:'25px'}}>
                        <CCol lg="5">
                            <CLabel htmlFor="app_name" >{t('Employee Code')}</CLabel>
                            <Autocomplete
                                onChange={(i) => props.changeAutocomplete('code', i)}
                                onSelect={props.selectAutocomplete}
                                items={props.autocompleteCode}
                                name={props.empCode}
                            />
                        </CCol>
                    </CRow>
                    <CRow alignHorizontal="center">
                        <CButton className="form-btn" onClick={props.searchAPI}>{t('Search')}</CButton> 
                    </CRow><br/>
                </div>
            }
            </>
        );  
}
export default FormData;