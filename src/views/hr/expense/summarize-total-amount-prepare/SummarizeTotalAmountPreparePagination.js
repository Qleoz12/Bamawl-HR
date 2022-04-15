/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import {
    CCol,
    CPagination,
} from '@coreui/react';

const SummarizeTotalAmountPreparePagination = props => {
    let {
        currentPage,
        totalPage,
        changePage,
        defaultPerPage,
        totalRow
    } = props
    useEffect(() => {
    });

    return (<>
        {totalRow > defaultPerPage &&
            <CCol>
                <div className={'mt-2'} id="btnPanigation">
                    <CPagination
                        dots={false}
                        arrows={false}
                        align="center"
                        firstButton="First page"
                        lastButton="Last page"
                        activePage={currentPage}
                        pages={totalPage}
                        onActivePageChange={newPage => { changePage(newPage); }}
                    ></CPagination>
                </div>
            </CCol>}
    </>
    );
}
export default SummarizeTotalAmountPreparePagination;
