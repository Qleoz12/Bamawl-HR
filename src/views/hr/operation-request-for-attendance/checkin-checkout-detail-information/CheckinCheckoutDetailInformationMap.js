
import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { isEmpty } from '../../hr-common/common-validation/CommonValidation';
import ApiPath from '../../../brycen-common/api-path/ApiPath';



const CheckinCheckoutDetailInformationMap = props => {
    const { t } = useTranslation();    
    useEffect(() => {
    });
    return (<>
    {
        //  !isEmpty(props.editData) && 
        //  <div className="mx-lg-0" style={{ height: "750px", position:"relative"}}>
        //  {props.mainTable.map((item, index) => {
        //      return(<Fragment key={index}>
        //       <Map 
        //            className="mr-3"
        //            google={props.google}
        //            zoom={20}
        //            style={{ width: "100%", height: "100%" }}
        //            initialCenter={{ lat: item.lat, lng: item.long }}
        //        >
        //            <Marker position={{ lat: item.lat, lng: item.long }}/>                 
        //        </Map>
        //      </Fragment>)                    
        //  }
        //        )}     
        // </div>
        <div className="mx-lg-0" > 
            {props.mainTable.map((item, index) => {
            const src = `https://www.google.com/maps/embed/v1/place?key=${props.googleMapApiKey}
            &center=${item.lat},${item.long}&q=${item.lat},${item.long}&zoom=18`;
             return(<Fragment key={index}>   
                <iframe width="100%" height="600" src={src} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe> 
             </Fragment>)                
             }
             )}
        </div>
    }
    </>);
}
export default (CheckinCheckoutDetailInformationMap);
    
