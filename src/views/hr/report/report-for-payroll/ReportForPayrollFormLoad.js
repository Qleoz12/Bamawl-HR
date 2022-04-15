import React ,{useEffect} from 'react';
import {CCol, CRow,CButton, CLabel,CSelect} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';

const ReportForPayrollFormLoad=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);
    let{
      departmentAPI,
      mainTable,
      exportSalary,
      deptState,
      deptChange
    }=props
    return (<>
         <CRow className="justify-content-start">
            <CCol lg="4" md="4" xs="12" className="mb-4">
                <CLabel id="lblDepartment">{t('Department')}</CLabel>
                <CSelect
                    autoFocus
                    id="dropDepartment"
                    onChange={deptChange}
                    value={deptState}
                    className="bamawl-select" custom
                >
                    <option value="" key="">---{t('Select Department')}---</option>
                    {departmentAPI.map((item,index) => {
                        return (
                            <option key={index} value={item.id}>{item.department_name}</option>
                        )
                        })
                    }
                </CSelect>
            </CCol>
        </CRow>
      {mainTable.length > 0 &&(
        <div className="formLoad">
            { mainTable.map((item,index)=>{
                return (
                  <Fragment key={index}>
                    <div className="boderColum">
                        <CButton id="linkReportSalaryCSV" className="linkDate" value={item} onClick={exportSalary}>{item}</CButton>
                    </div>
                  </Fragment>
                )
              })
            }
        </div>
      )}
    </>
  );
}
export default ReportForPayrollFormLoad;
