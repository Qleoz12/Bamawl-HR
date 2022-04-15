import React from 'react';
import { Markup } from 'interweave';
import { CCard } from '@coreui/react';

/**
 * To show error and success message
 *
 * @author  Nay Zaw Linn, Zin Min Myat
 * @create  06/04/2021
 * @param   {error} props => for error message
 *          {error2} props => for error2 message
 *          {success} props => for success message
 * @returns output shown in web page
 */

const Message = props => {
    return (
        <>
            {
                // to show error message
                props.error?.length > 0 &&
                <CCard className="custom-card error p-3 mb-3">
                    {
                        props.error.map((data, index) => {
                            return(
                                <div key={index} >
                                    <Markup content={data}/>
                                </div>
                            )
                        })
                    }
                </CCard>
            }

            {
                // to show error message
                props.error2?.length > 0 &&
                <CCard className="custom-card error p-3 mb-3">
                    {
                        props.error2.map((data, index) => {
                            return(
                                <div key={index} >
                                    <Markup content={data}/>
                                </div>
                            )
                        })
                    }
                </CCard>
            }

            {
                // to show success message
                props.success?.length > 0 &&
                <CCard className="custom-card success p-3 mb-3">
                    {
                        props.success.map((data, index) => {
                            return(
                                <div key={index} >
                                    <Markup content={data}/>
                                </div>
                            )
                        })
                    }
                </CCard>
            }
        </>
    )
}
export default Message
