import React, { useEffect } from 'react';
import { CRow,CCol, CLink} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const OtherAttachementExpenseAjustmentDetail = props => {
    const { t } = useTranslation();
    // create user ref
    const refUpload = React.useRef(null);
    let {
        expenseOtherAttachementFile,
        historyFlag,
        downloadFileAttach
    } = props;
    useEffect(() => {
    });
    return (<>
    <CRow className="align-items-center mb-3">
        <CCol lg="12">
            <div className="" style={{marginRight:"10px"}}>
                <label>{t('Expense Other Attachement')}</label>
            </div>
            <div className="d-flex flex-wrap">
                {
                    expenseOtherAttachementFile.map((file,index)=>{
                        return(
                            <div tabIndex={0} className="d-flex flex-nowrap mr-1" key={index} style={{ cursor: historyFlag ? "pointer" : "not-allowed" }} onClick={historyFlag?downloadFileAttach.bind(this,file,'NO'):null}>
                                <i className="fas fas fa-file file"></i>
                                <CLink style={{marginBottom:"0px"}} className="text-break ml-1 mr-1">{file.expense_adjustment_document_name.split('/')[file.expense_adjustment_document_name.split('/').length-1]}</CLink>
                            </div>
                        )
                    })
                }
            </div >
        </CCol>
    </CRow>
    </>
    );
}
export default OtherAttachementExpenseAjustmentDetail;
