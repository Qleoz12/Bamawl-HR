import React from 'react';
import {
  CCard,
  CCol,
  CRow,
  CImg,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

/**
 * @author Su Pyae Maung
 * @create 21/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
 const TableData = props => {
    const{t} = useTranslation();
    return (<>
            {props.mainTable != ""  &&
            <CCard className='table-panel' style={{border:'1px solid #E6E6E6',borderRadius:'10px',paddingTop:"15px"}}>
                <CRow id="table">
                    <CCol lg="12">
                        <CCol lg="12">
                        <CRow alignHorizontal="end">
                            <div className="row-count-msg">{props.rowCount}</div>
                        </CRow>
                        </CCol>
                        <div className="table-responsive">
                        <table className="table">
                            <thead id="thead-id">
                            {
                            <tr width="100%">
                                <th width="" className="">
                                { t('No') }
                                </th>
                                <th width="" className="">
                                { t('Company Name') }
                                </th>
                                <th width="" className="">
                                { t('Minute From') }
                                </th>
                                <th width="" className="">
                                { t('Minute To') }
                                </th>
                                <th width="" className="">
                                { t('Rate') }
                                </th>
                                <th width="" className="">
                                { t('Remove') }
                                </th>
                            </tr>
                            }
                            </thead>
                            <tbody >
                            {
                            props.mainTable != ""  &&
                            props.mainTable.map((i,index) => {
                                return(
                                <tr key={index} width="100%">
                                    <td width="" id={i.id} className="t d-emp-id" style={{borderLeft:'3px solid #858BC3',textAlign:"center"}}>
                                    {index+1}
                                    </td>
                                    <td width="" style={{textAlign:"left"}}>
                                    {i.company_name}
                                    </td>
                                    <td width="" className="td-emp-name" style={{textAlign:"right"}}>
                                    {i.minute_from}
                                    </td>
                                    <td width="" className="td-dept" style={{textAlign:"right"}}>
                                    {i.minute_to}
                                    </td>
                                    <td width="" className="" style={{textAlign:"right"}}>
                                    {i.rate}
                                    </td>
                                    <td width="" className="">
                                    <CImg 
                                        id = {i.id}
                                        value={i.id}
                                        src={'/avatars/remove.png'} 
                                        className="icon-clt" 
                                        alt="delete" 
                                        onClick={props.deleteToggleAlert.bind(this,i)}
                                    />
                                    </td>
                                </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                        </div>
                    </CCol>
                </CRow><br/>
            </CCard>
            }
            </>
        );  
}
export default TableData;