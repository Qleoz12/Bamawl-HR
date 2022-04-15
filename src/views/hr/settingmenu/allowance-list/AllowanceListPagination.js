/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {
    CCol,
    CPagination,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const AllowanceListPagination=props=> {
    let{
        currentPage,
        totalPage,
        changePage,
        defaultPerPage,
        countRecord
    }=props
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {countRecord>defaultPerPage && <CCol>
            <div className={'mt-2 d-flex justify-content-center'}>
                <CPagination
                    activePage={currentPage}
                    pages={totalPage}
                    dots={false}
                    arrows={false}
                    align="center"
                    firstButton="First page"
                    lastButton="Last page"
                    onActivePageChange={newPage => {
                        changePage(newPage);
                    }}
                ></CPagination>
            </div>
        </CCol>}
    </>
    );
}
export default AllowanceListPagination;
