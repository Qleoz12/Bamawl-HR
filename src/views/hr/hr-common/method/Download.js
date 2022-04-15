
/**
 *
 * @author Aye Thiri Mon
 * @date 2021-08-31
 * @param props.label1 [ eg. 'With Salary' ]
 *        props.label2 [ eg. 'Without Salary' ]
 *        props.method [ eg. any name('bonus_method', 'transfer_method', etc...) ]
 *        props.checked [ eg. true/false ]
 *        props.change [ change function ]
 *        props.value [ eg. 1/0 ]
 */

import React from 'react';
import { CRow, CLabel, CInput } from '@coreui/react';
import { func } from 'prop-types';

const Download = props => {
    let tmpName = '';
    let getHeader = props.headers["content-disposition"];
    // check header contains utf-8 encoding 
    if(getHeader.indexOf('filename*=utf-8') !== -1) {
        // get only utf-8 file name from getHeader variable
        tmpName = getHeader.split('filename*=utf-8')[1];
        tmpName = decodeURIComponent(tmpName);
    } else {
        tmpName = getHeader.split('filename=')[1];
    }
    let fileName = tmpName.replace(/['"]+/g, '');
    // generate link for blob object
    const url = window.URL.createObjectURL(new Blob([props.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; //or any other extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default Download