
/**
 *
 * @author Nay Zaw Linn
 * @date 2021-05-03
 * @param props.label1 [ eg. 'With Salary' ]
 *        props.label2 [ eg. 'Without Salary' ]
 *        props.method [ eg. any name('bonus_method', 'transfer_method', etc...) ]
 *        props.checked [ eg. true/false ]
 *        props.change [ change function ]
 *        props.value [ eg. 1/0 ]
 */

import React from 'react';
import { CRow, CLabel, CInput } from '@coreui/react';

const Method = props => {
    return(
        <CRow>
            <CLabel className="mr-5">{props.label1}</CLabel>
                <div className='shift-name-divC'>
                    <div className="toggle-switch">
                        <CInput
                            type="checkbox"
                            className="toggle-switch-checkbox"
                            id={props.method}
                            value={props.value}
                            checked={props.checked}
                            onChange={props.change}
                        />
                        <CLabel className="toggle-switch-label" htmlFor={props.method}>
                            <span className='toggle-switch-inner-1'/>
                            <span className="toggle-switch-switch"/>
                        </CLabel>
                    </div>
                </div>
            <CLabel className="ml-5">{props.label2}</CLabel>
        </CRow>
    )
}
export default Method

