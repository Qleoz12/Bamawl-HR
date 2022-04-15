import React, { useEffect } from 'react';
import { CRow,CCol,CImg} from '@coreui/react'
import { useTranslation } from 'react-i18next';

const OtherAttachementBusinessTripRequest = props => {
    const { t } = useTranslation();
    // create user ref
    let {
        setError,
        setSuccess,
        setOtherFile,
        otherFile,
        storeEditData,
        setDeletedAttachId,
        deletedAttachId
    } = props;
    useEffect(() => {
    });
    //upload file
    const handlerUploadFile=(e)=>{
        setError([]);
        setSuccess([]);
        let arrMsg = [];
        let mutilFile=[]
        for(let file of e.target.files)
        {
            if(validateUploadFile(file)==true)
            {
                mutilFile.push(file);
            }else
                arrMsg.push(validateUploadFile(file));
        }
        if(mutilFile.length>0)
        setOtherFile([...otherFile,...mutilFile]);
        if(arrMsg.length>0)
        {
            setError(arrMsg);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }
    // delete File from list
    const deleteFile=(e)=>{
        let mutilFile=otherFile.filter(file=>file!=e);
        setOtherFile(mutilFile);
        if(storeEditData!=""&&e.id!=null){
            setDeletedAttachId([...deletedAttachId,e.id])
        }
    }
    const validateUploadFile=(file)=>{
        const regex = /.*\.(jpg|jpe?g|png|pdf)$/igm;
        if (!regex.test(file.name)) {
            let errMsg = t("JSE159").replace("%s", t("*.pdf, *.jpg, *.jpeg, *.png."));
            return errMsg;
        }
        if(parseInt(file.size)>10485760)
        {
            let errMsg = t("JSE111");
            return errMsg;
        }
        return true;
    }
    return (<>
    <CRow className="align-items-center">
        <CCol lg="12" className="d-flex flex-wrap align-items-end">
            <div className="mr-2">
                <CImg
                      src={'avatars/list.png'}
                      className="list-icon"
                      width="6px"
                      style={{ marginRight: '10px', marginBottom: '6px' }}
                  />
                <label>{t('Business Trip Other Attachment')}</label>
                    <br />
                    <i className="fas fa-paperclip"></i>
                        <label className="expense-request-attachment-file-label">{t('Drag & Drop files to attach or')}</label>
                        &nbsp;
                        <a id="linkBrowseCardDetailCardDetail" className="expense-request-attachment-file-browser" tabIndex={0}>
                            {t('Browse')}
                        </a>
                        <input
                            value=""
                            type="file"
                            htmlFor="linkBrowseCardDetailCardDetail"
                            style={{ opacity: "0", position: "absolute", left: "12px", zindex: "9999999", width: '90%' }}
                            multiple accept=".pdf,.jpg,.jpeg,.png,.PDF,.JPG,.JPEG,.PNG"
                            onChange={(e) => handlerUploadFile(e)} />
            </div>
        </CCol>
        <CCol>
            <div className="d-flex flex-wrap ml-4">
                {otherFile.length>0&&
                        otherFile.map((file, index) => {
                            let fileName= file.name.split('/')[file.name.split('/').length-1];
                            if (fileName.length > 21) {
                                fileName = fileName.substring(0, 9).concat("...")
                                    .concat(fileName.substring(fileName.length - 10, fileName.length));
                            }
                            return (
                            <div key={index} className="d-flex flex-nowrap align-items-center">
                                <i className="fas fa-file icon-btn file"></i>
                                <span className="text-break ml-3">{fileName}</span>
                                <i className="fas fa-times" onClick={deleteFile.bind(this, file)}></i>
                            </div>
                            );
                })}
            </div>
        </CCol>
    </CRow>
    </>
    );
}
export default OtherAttachementBusinessTripRequest;
