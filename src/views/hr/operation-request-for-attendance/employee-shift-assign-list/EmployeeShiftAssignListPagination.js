/* eslint-disable no-use-before-define */
import React ,{useEffect} from 'react';
import {
    CCol,
    CPagination,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';

const EmployeeShiftAssignListPagination=props=> {
    let{
        currentPage,
        totalPage,
        changePage,
        defaultPerPage,
        totalRow
    }=props
    const{t} = useTranslation();
    useEffect(() => {
    },);

    return (<>
        {totalRow>defaultPerPage && <CCol>
            <div className={'mt-2'}>
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
export default EmployeeShiftAssignListPagination;
