import React ,{useEffect} from 'react';
import {CCol, CRow, CPagination} from '@coreui/react';

const PayrollCalculationListPagination=props=> {
    useEffect(() => {
    },);

    return (<>
        <CRow>
          <CCol>
            { props.rowCount > props.defaultPerPage &&
              <div className={'mt-2'} >
                <CPagination
                  activePage={props.currentPage}
                  pages={props.totalPage}
                  dots={false}
                  arrows={false}
                  align="center"
                  firstButton="First page"
                  lastButton="Last page"
                  onActivePageChange={(newPage) => {props.changePage(newPage) }}>
                </CPagination>
             </div>
            }
          </CCol>
        </CRow>
    </>
    );
}
export default PayrollCalculationListPagination;
