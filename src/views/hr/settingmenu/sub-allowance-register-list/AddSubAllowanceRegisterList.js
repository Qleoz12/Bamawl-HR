import React ,{useEffect} from 'react';
import { useTranslation } from 'react-i18next';

const AddSubAllowanceRegisterList=props=> {
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {props.currentcies !== null && props.awTitleAPI.length >0 && (
            <div className="add-allowance d-flex">
                <input
                    type="image"
                    autoFocus={true}
                    id="imgIconAdd"
                    src={"avatars/addlllowance.png"}
                    className="icon-add"
                    alt="add"
                    onClick={props.addToggleAlert}
                />
                <label className="lblAddAllowance">{ t('Add Allowance')} </label>
            </div>
          )}
    </>
    );
}
export default AddSubAllowanceRegisterList;
