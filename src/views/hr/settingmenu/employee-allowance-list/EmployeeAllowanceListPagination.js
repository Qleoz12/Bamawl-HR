import React ,{useEffect} from 'react';
import {CCol, CRow, CPagination} from '@coreui/react';

const EmployeeAllowanceListPagination = props => {
    let {
        rowCount,
        defaultPerPage,
        currentPage,
        totalPage,
        changePage
    } = props;
    useEffect(() => {
    },);

    return (<>
        <CRow>
          <CCol>
            {rowCount > defaultPerPage &&
              <div className={'mt-2'} >
              <CPagination
                activePage={currentPage}
                pages={totalPage}
                dots={false}
                arrows={false}
                align="center"
                firstButton="First page"
                lastButton="Last page"
                onActivePageChange={(newPage) => {changePage(newPage)}}
              ></CPagination>
             </div>
            }
          </CCol>
        </CRow>
    </>
    );
}
export default EmployeeAllowanceListPagination;
