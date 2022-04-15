/* eslint-disable no-use-before-define */
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CLabel,
    CRow
} from '@coreui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { default as ApiPath } from '../../../brycen-common/api-path/ApiPath';
import { ApiRequest } from '../../../brycen-common/api-request/ApiRequest';
import ApiViewPermission from '../../../brycen-common/api-request/ApiViewPermission';
import Confirmation from '../../../brycen-common/confirmation/Confirmation';
import Loading from '../../../brycen-common/loading/Loading';
import Message from '../../../brycen-common/message/Message';
import { checkNullOrBlankString, validateIntegerOnly, validateNumberOnly } from '../../../hr/hr-common/common-validation/CommonValidation';
import ListTableBonusRateList from './ListTableBonusRateList';
import SearchBonusRateList from './SearchBonusRateList';

// use hoc for functional based components
function LegacyWelcomeClass({ t, i18n }) {

    const history = useHistory(); // For edit link

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");

    const [content, setContent] = useState('');
    const [type, setType] = useState('');

    const [loading, setLoading] = useState(false);

    const [selectedBonusTitleData, setSelectedBonusTitleData] = useState("");

    const [yearData, setYearData] = useState(""); // for show role name
    const [selectedYearData, setSelectedYearData] = useState("");

    const [selectedMonthData, setSelectedMonthData] = useState(""); // for selected month 
    const [monthData, setMonthData] = useState(""); // for show role name

    const [limitData, setLimitData] = useState([]); // for show role name
    const [selectedLimitData, setSelectedLimitData] = useState(""); // for selected month

    const [deleteModalBox, setDeleteModalBox] = useState(false); // for delete button confirmation
    const [deleteID, setDeleteID] = useState(""); // for delete ID
    const [mainTable, setMainTable] = useState([]); // for main table
    const [rowCount, setRowCount] = useState(""); // for row count

    const [methodData, setMethodData] = useState([]);

    const [currentPage, setActivePage] = useState(1)  // for Pagination
    const [totalPage, setTotalPage] = useState(1)     // for Pagination
    const [perPage, setPerPage] = useState(1)         // for Pagination


    /** Start Form Load */
    useEffect(() => {
        setLoading(true);
        ApiViewPermission.loadViewPermission();
        mockYearData();
        loadBonusTitle();
        mockMonthData();
        mockLimitData();
        mockMethodData();
    }, [loadBonusTitle]);
    /** End Form Load */

    /** start API for Title */
    const [bonusTitleAPI, setBonusTitleAPI] = useState([]);
    const loadBonusTitle = useCallback(async () => {
        setLoading(true);
        let obj = {
            package_name: 'hr',
            url: ApiPath.employeeBonusRateListBonusTitle + "?company_id=" + ApiPath.companyID + "&language=" + ApiPath.lang,
            method: 'get',
        };
        let response = await ApiRequest(obj);
        setLoading(false);
        if (response.flag !== false) {
            setBonusTitleAPI(response.data.data);
        }
    }, []);

    const titleChange = (e) => {
        setSelectedBonusTitleData(e.target.value);
    }
    /** end API for department */

    /* MOCK DATA SELECT BOX */
    const mockYearData = () => {
        let data = []
        for (let i = 0; i <= 15; i++) {
            data.push({
                year: i,
            });
        }
        setYearData(data);
    }
    const mockMonthData = () => {
        let data = []
        for (let i = 0; i <= 11; i++) {
            data.push({
                month: i,
            });
        }
        setMonthData(data);
    }
    const mockLimitData = () => {
        let data = [
            {
                id: 1,
                value: t("below")
            },
            {
                id: 2,
                value: t("equal")
            },
            {
                id: 3,
                value: t("above")
            },
            {
                id: 4,
                value: t("and above")
            },
            {
                id: 5,
                value: t("and below")
            },
        ]
        setLimitData(data);
    }
    const mockMethodData = () => {
        let data = [
            {
                id: 1,
                value: t("Basic Salary")
            },
            {
                id: 2,
                value: t("Total Salary")
            },
            {
                id: 3,
                value: t("Basic Salary *working month /12")
            },
            {
                id: 4,
                value: t("Total salary *working month /12")
            },
            {
                id: 5,
                value: t("Percentage of basic salary")
            },
            {
                id: 6,
                value: t("Percentage of total salary")
            },
            {
                id: 7,
                value: t("Fixed Amount")
            },
        ]
        setMethodData(data);
    }
    const getLimitData = (id) => {
        return limitData.find(element => element.id === id).value;
    }

    const getMethodData = (id) => {
        return methodData.find(element => element.id === id).value;
    }
    const getIncludeBasic = (basic) => {
        if (basic)
            return t("Basic Salary");
    }
    const getIncludeTotal = (total) => {
        if (total)
            return t("Total Salary");
    }
    const getIncludeData = (basic, total) => {
        if (basic && total)
            return getIncludeBasic(basic) + ", " + getIncludeTotal(total);
        else if (basic && !total)
            return getIncludeBasic(basic)
        else if (!basic && total)
            return getIncludeTotal(total);
        else return "";
    }

    /** start change select box */

    const monthChange = (e) => {
        setSelectedMonthData(e.target.value);
    }

    const yearChange = (e) => {
        setSelectedYearData(e.target.value);
    }

    const limitChange = (e) => {
        setSelectedLimitData(e.target.value);
    }
    /** end change select box */


    /** Valid */
    function validSearch() {
        setError([]);
        setSuccess("");
        let allError = [];
        let check = true;
        if (!checkNullOrBlankString(selectedBonusTitleData)) {
            let errMsg = t("JSE001").replace('%s', t('Bonus Title'))
            allError.push(errMsg);
            check = false;
        }
        if (!validateNumberOnly(selectedYearData) && checkNullOrBlankString(selectedYearData)) {
            let errMsg = t("JSE005").replace('%s', t('Year'))
            allError.push(errMsg);
            check = false;
        }
        if (!validateNumberOnly(selectedMonthData) && checkNullOrBlankString(selectedMonthData)) {
            let errMsg = t("JSE005").replace('%s', t('Month'))
            allError.push(errMsg);
            check = false;
        }
        if (!validateNumberOnly(selectedLimitData) && checkNullOrBlankString(selectedLimitData)) {
            let errMsg = t("JSE005").replace('%s', t('Limit'))
            allError.push(errMsg);
            check = false;
        }
        setError(allError);
        if (check)
            return true;
    }
    function validDelete() {
        setError([]);
        setSuccess("");
        let allError = [];
        if (!validateIntegerOnly(deleteID)) {
            let errMsg = t("JSE005").replace('%s', t('Delete ID'))
            allError.push(errMsg);
        } else if (!checkNullOrBlankString(deleteID)) {
            let errMsg = t("JSE001").replace('%s', t('Delete ID'))
            allError.push(errMsg);
        }
        else {
            return true;
        }
        setError([allError]);
    }
    /** Valid */
    /** refresh */
    const resetForm = () => {
        setSelectedBonusTitleData("");
        setSelectedYearData("");
        setSelectedMonthData("");
        setSelectedLimitData("");
    }
    /** refresh */

    /** Start Search Function */
    const [requestState, setRequestState] = useState();
    const fnSearch = useCallback(() => {
        setError([]);
        setSuccess('');
        const request = {
            bonus_title: selectedBonusTitleData,
            bonus_year: selectedYearData,
            bonus_month: selectedMonthData,
            bonus_limit: selectedLimitData,
            company_id: ApiPath.companyID,
            language: ApiPath.lang
        }
        setRequestState(request);
        searchAPI(request);
    })
    let searchAPI = async (request, page) => {
        page = parseInt(page) ? page : 1;
        setActivePage(page);
        request = { ...request, page: page }
        setError([]);
        setSuccess('');
        if (validSearch()) {
            setLoading(true);
            let params = request
            let obj = { package_name: 'hr', url: ApiPath.employeeBonusRateListBonusSearch, method: 'post', params };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                setMainTable([]);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                setRowCount(t("Total Rows").replace("%s", response.data.row_count));
                setMainTable(response.data.result.data);
                setTotalPage(response.data.result.last_page);
                setPerPage(parseInt(response.data.result.per_page));
                setError([]);
                setSuccess('');
            }

        }
    }
    /** End Search Function */

    /* Page active */
    async function pagination(i) {
        await searchAPI(requestState, i);
        setActivePage(i)
    }


    /** Start Delete function */
    const deleteToggleAlert = (e) => {
        if (e) setDeleteID(e['id']);
        setDeleteModalBox(!deleteModalBox);
        setContent(t('Are you sure want to delete?'));
        setType('delete')
    }

    const deleteOK = async () => {
        setDeleteModalBox(!deleteModalBox);
        if (validDelete()) {
            setLoading(true);
            let obj = {
                package_name: 'hr',
                url: ApiPath.employeeBonusRateListBonusDelete + deleteID + "?company_id=" + ApiPath.companyID + "&language=" + ApiPath.lang,
                method: 'delete'
            };
            let response = await ApiRequest(obj);
            setLoading(false);
            if (response.flag === false) {
                setError(response.message);
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            } else {
                setError([]);
                setSuccess([response.data.message]);
                resetForm();
                setMainTable([]);
                loadBonusTitle();
            }
        }
    }

    /* EDIT  MODAL BOX */
    const [editModalBox, setEditModalBox] = useState(false); // Edit confirm box show or hide
    const [editID, setEditID] = useState('');
    const editToggleAlert = (e) => {
        setEditID(e['id']);
        setEditModalBox(!editModalBox);
        setContent(t('Are you sure want to edit?'));
        setType('edit')
    }

    const editOK = () => {
        setEditModalBox(!editModalBox);
        editRow(editID);
    }

    /** Start edit link next page */
    const editRow = (id) => {
        localStorage.setItem('RETURN_BONUS_ID', JSON.stringify(id));
        history.push("../setting/bonus-register");
    }
    /** End edit link next page */

    return (
        <CRow>
            <CCol xs="12">
                <Loading start={loading} />
                <Message success={success} error={error} />

                <CCard>
                    <CCardHeader>
                        <h5 id="cardTitle"><CLabel>{t('Bonus Rate List')}</CLabel></h5>
                    </CCardHeader>
                    <CCardBody>
                        {/* Search Start */}
                        <SearchBonusRateList
                            titleChange={titleChange}
                            yearChange={yearChange}
                            monthChange={monthChange}
                            limitChange={limitChange}

                            selectedBonusTitleData={selectedBonusTitleData}
                            bonusTitleAPI={bonusTitleAPI}
                            setSelectedBonusTitleData={setSelectedBonusTitleData}
                            selectedBonusTitleData={selectedBonusTitleData}

                            yearData={yearData}
                            setSelectedYearData={setSelectedYearData}
                            selectedYearData={selectedYearData}
                            monthData={monthData}
                            setSelectedMonthData={setSelectedMonthData}
                            selectedMonthData={selectedMonthData}
                            limitData={limitData}
                            setSelectedLimitData={setSelectedLimitData}
                            selectedLimitData={selectedLimitData}

                            searchAPI={() => fnSearch()}
                        />
                        {/* Search End */}

                        {/* Employee List Table Start */}
                        <ListTableBonusRateList
                            mainTable={mainTable}
                            rowCount={rowCount}

                            deleteToggleAlert={deleteToggleAlert}
                            editToggleAlert={editToggleAlert}

                            getLimitData={getLimitData}
                            getMethodData={getMethodData}
                            getIncludeData={getIncludeData}

                            totalPage={totalPage}
                            currentPage={currentPage}
                            pagination={pagination}
                            perPage = {perPage}
                        />
                        {/* Employee List Table End */}

                        <br />

                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={deleteModalBox}
                            cancel={() => setDeleteModalBox(!deleteModalBox)}
                            deleteOK={deleteOK}
                        />
                        {/* Delete Alert End */}

                        {/* Edit Alert Start */}
                        <Confirmation
                            content={content}
                            okButton={t('Ok')}
                            cancelButton={t('Cancel')}
                            type={type}
                            show={editModalBox}
                            cancel={() => setEditModalBox(!editModalBox)}
                            editOK={editOK}
                        />
                        {/* Edit Alert End */}

                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
}

const Welcome = withTranslation()(LegacyWelcomeClass);

export default function BonusRateListIndex() {
    return (
        <Welcome />
    )
}