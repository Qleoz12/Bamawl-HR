/**
* Allowance list
*
* @author  lq_don
* @create  30/07/2021 (D/M/Y)
* @param
* @return
*/
import React, { useState, useEffect, useCallback} from "react";
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiPath from '../../../brycen-common/api-path/ApiPath';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from "@coreui/react";
import CommonAPI from "../../../brycen-common/api-path/ApiPath";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Confirmation from "./../../../brycen-common/confirmation/Confirmation";
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import SearchAllowanceList from "./SearchAllowanceList";
import AllowanceListTable from "./AllowanceListTable";
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
function LegacyWelcomeClass({ t, i18n }) {
    const defaultPerPage                                    = ApiPath.defaultPerPage;
    //create useState hook
    const history                                           = useHistory(); // For edit link
    // const [deleteModalBox, setDeleteModalBox]               = useState(false); //for show hide model delete
    // const [editModalBox, setEditModalBox]                   = useState(false); //for show hide model edit
    const [showmodelBox,setShowModelBox]                    = useState(false);//for show hide modal box
    const [dataTableAPI, setDataTableAPI]                   = useState([]); // for data in table (get API)
    const [error, setError]                                 = useState([]); // for error message
    const [success, setSuccess]                             = useState(""); // for success message
    const [currentPage, setActivePage]                      = useState(1); // for Pagination
    const [totalPage, setTotalPage]                         = useState(1); // for Pagination
    const [idDelete, setIdDelete]                           = useState(0); //for id delete
    const [idEdit, setIdEdit]                               = useState(0);//for id edit
    const [allowanceId, setAllowanceId]                     = useState("");//for allowance 
    const [allowanceList, setAllowanceList]                 = useState([]);//for get list allowance list
    const [allowanceType, setAllowanceType]                 = useState(1);//for allowance Type
    const [allowanceCategory, setAllowanceCategory]         = useState(2);//for allowance category
    const [countRecord, setcountRecord]                     = useState("");//for count record
    const [formSearchStage, setFormSearchStage]             = useState("");//for count record
    const [defaultValueAllowance, setDefaultValueAllowance]  = useState("");//for set default dropdown allowance
    const [loading,setLoading]                               = useState(false);//for loading page
    const [content, setContent]                              = useState('');// for content
    const [type, setType]                                    = useState('');// for type
    /**
    * If error state or succes state is changed, scroll automatically to top
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
        useEffect(() => {
        if (error.length > 0 || success.length > 0) {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
    }, [error, success]);
    // load allowance
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        loadAllowance();
    },[loadAllowance]);
    const loadAllowance = async() => {
        let url = `${ApiPath.AllowanceList}?company_id=${ApiPath.companyID}&language=${ApiPath.lang}`;
        let obj = { package_name: 'hr', url: url, method: 'get' };
        let response = await ApiRequest(obj);
        if(response.flag === false){
            setAllowanceList([]);
        }else{
            setAllowanceList(response.data.data);
        }
        setLoading(false);
    };
    /**
    * choose allowance in dropdown
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const selectAllowance=(e)=>{
        setAllowanceId(e.target.value);
        setDefaultValueAllowance(e.target.value);
    }
    /**
    * delete model
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const showModelDelete = (e) => {
        setIdDelete(e["id"]);
        setShowModelBox(!showmodelBox);
        setContent(t('Are you sure want to delete?')); setType('delete');
    };
    /**
    * edit model
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const showModelEdit = (e) => {
        setIdEdit(e["id"]);
        setShowModelBox(!showmodelBox);
        setContent(t('Are you sure want to edit?')); setType('edit');
    };
    const editOK = () => {
        setShowModelBox(!showmodelBox);
        editRow(idEdit);
    };
    /**
    * edit link to next page
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const editRow = (id) => {
        sessionStorage.setItem("RETURN_OF_AR_DATA", JSON.stringify(id));
        history.push("./allowance-register");
    };
    /**
    * get value allowance type(radio)
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const getAllowanceType = (event) => {
        setAllowanceType(event.currentTarget.id);
    };
    /**
    * get value allowance Category(radio)
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const getAllowanceCategory = (event) => {
        setAllowanceCategory(event.currentTarget.id);
    };

    /**
    * event delete row
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const deleteOK = async() => {
        setShowModelBox(!showmodelBox);
        setLoading(true);
        let url = `${ApiPath.AllowanceListDelete}${idDelete}?language=${CommonAPI.lang}`;
        let obj = { package_name: 'hr',url: url, method: 'delete' };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setError(response.message);
            search(1, defaultPerPage, false, 0 , true,true,true);
            setActivePage(1);
            setSuccess([]);
        } else {
            loadAllowance();
            if(allowanceId != "")
            {
                //if select dropdown and delete
                setAllowanceId("");
                setDefaultValueAllowance("");
                search(1,defaultPerPage,allowanceId != ""? true: false,1, false);
            }
            else{
                // if the last row of the page is deleted, page -1
                let currentPageCheck=currentPage
                if((defaultPerPage-(defaultPerPage*currentPage-countRecord)) == 1&&currentPage != 1){
                    setActivePage(currentPage-1)
                    currentPageCheck=currentPage-1
                }
                search(currentPageCheck,defaultPerPage,allowanceId != ""? true: false,1, false);
            }
            setSuccess([response.data.message]);
            setError([]);
        }
    };
    /**
    * event search
    *
    * @author  lq_don
    * @create  30/07/2021 (D/M/Y)
    * @param
    * @return
    */
    const search = async(page = 1, perPage = 20, allowanceIdxx = false,deleteOk=0, flagSearchClick = true,flagPageChange=true,checkLoadForm=false) => {
        let dataSearch= null;
        if (flagSearchClick ){
            dataSearch = {
                "company_id": CommonAPI.companyID,
                "allowance_id":  !allowanceIdxx ?  allowanceId : "",
                "allowance_category": allowanceCategory,
                "allowance_type": allowanceType,
                "language":CommonAPI.lang
            }
            setFormSearchStage(dataSearch);
        } else {
            if(flagPageChange == true)
                dataSearch = {...formSearchStage,"allowance_id":!allowanceIdxx ?  allowanceId : "" };
            else
            dataSearch = {...formSearchStage};
        }
        let params = {...dataSearch,page, per_page: perPage};
        let obj = { package_name: 'hr', url: ApiPath.AllowanceListSearch, method: 'post', params };
        setLoading(true);
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag === false) {
            setDataTableAPI("");
            setcountRecord("");
            //if delete not show data not found
            if(deleteOk != 1){
                setError(response.message);
            }
        } else {
            setDataTableAPI(response.data.data);
            setcountRecord(response.data.total);
            if(!checkLoadForm){
                setError([]);
            }
            setTotalPage(response.data?.last_page);
        }
    };
    const clodeModelBox =()=>{
        setIdDelete(0);
        setShowModelBox(!showmodelBox);
        setIdEdit(0);
    }
    const changePage = (newPage) => {
        setSuccess([])
        setActivePage(newPage);
        search(newPage, defaultPerPage, false, 0 , false,false);
    };

    const searchList = () => {
        search(1, defaultPerPage, false, 0 , true);
        setSuccess("");
        setError([]);
        setActivePage(1)//set default curent page
    };
    return (
        <CRow className="allowance-list">
            <CCol lg="12">
                {/* Error and success msg */}
                <Loading start={loading} />
                <Message success={success} error={error} />
                {/* show model box confirm */}
                <Confirmation
                    content={content}
                    okButton={t('Ok')}
                    cancelButton={t('Cancel')}
                    type={type}
                    show={showmodelBox}
                    cancel={clodeModelBox}
                    editOK={editOK}
                    deleteOK={deleteOK}
                />
                <CCard>
                    <CCardHeader>
                        <h5 id="lblAllowanceList"><label>{t("Allowance List")}</label></h5>
                    </CCardHeader>
                    <CCardBody>
                        {/* show search */}
                        <SearchAllowanceList
                            getAllowanceCategory={getAllowanceCategory}
                            getAllowanceType={getAllowanceType}
                            searchList={searchList}
                            allowanceList={allowanceList}
                            selectAllowance={selectAllowance}
                            defaultValueAllowance={defaultValueAllowance}
                        ></SearchAllowanceList>
                        {/* show table */}
                        <AllowanceListTable
                            countRecord={countRecord}
                            dataTableAPI={dataTableAPI}
                            currentPage={currentPage}
                            defaultPerPage={defaultPerPage}
                            showModelEdit={showModelEdit}
                            showModelDelete={showModelDelete}
                            changePage={changePage}
                            totalPage={totalPage}
                        ></AllowanceListTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}
const Welcome = withTranslation()(LegacyWelcomeClass);

export default function AllowanceListIndex() {
    return <Welcome />;
}
