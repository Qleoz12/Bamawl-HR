import React from 'react';
import { CCol, CRow, CPagination } from '@coreui/react';

const EmployeeDataEntryPagination = props => {
    let {
        rowCount,
        defaultPerPage,
        currentPage,
        totalPage,
        changePage,
    } = props;

    return (
        <>
            <CRow>
                <CCol>
                    {rowCount > defaultPerPage &&
                        <div className={'mt-2 float-right'} >
                            <CPagination
                                id="pagPagination"
                                dots={false}
                                arrows={false}
                                activePage={currentPage}
                                pages={totalPage}
                                onActivePageChange={(newPage) => { changePage(newPage) }}
                                arrows={false}
                                firstButton="First page"
                                lastButton="Last page"
                                limit={7}
                            ></CPagination>
                        </div>
                    }
                </CCol>
            </CRow>
        </>
    );
};
export default EmployeeDataEntryPagination;