/**
 *
 * @author Nay Zaw Linn
 * @date 2021-04-28
 * @param props.data -
 *          eg. [
 *                  {id : 1, currency_name: "Kyat", currency_desc: "MMK", "main_flag": 1, "is_checked": true},
 *                  {id : 2, currency_name: "Dollor", currency_desc: "USD", "main_flag": 1, "is_checked": false}
 *              ]
 *        props.for -
 *          eg. any name ( 'ssb', 'payment', etc... )
 *
 *        props.is_checked - eg. (true/false)
 *
 */

 import React from 'react';
 import { CCol, CRow, CLabel, CInput } from '@coreui/react';

 const Currency = props => {

     return(<>
         <CRow>
             {
                 props.data.length > 0 &&
                 props.data.map((cur,index)=>{
                     let pay = props.for+cur.id;
                     return(
                         <CCol lg="2" key={index}>
                             <CLabel>{cur.currency_name}</CLabel>
                             <div className="toggle-switch" style={{marginLeft:"10px"}}>
                                 <CInput
                                     key={index}
                                     type="checkbox"
                                     className="toggle-switch-checkbox"
                                     id={pay}
                                     value={ cur !== '' ? parseInt(cur.id) : '' }
                                     checked={cur.is_checked}
                                     onChange={props.change}
                                 />
                                 <CLabel className="toggle-switch-label" htmlFor={pay}>
                                     <span className='toggle-switch-inner-1'/>
                                     <span className="toggle-switch-switch"/>
                                 </CLabel>
                             </div>
                         </CCol>
                     )
                 })
             }
         </CRow>
     </>)
 }

 export default Currency
