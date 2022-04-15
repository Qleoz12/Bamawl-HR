import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CButton, CCardHeader, CForm, CRow, CCol, CImg, CLabel } from '@coreui/react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import Message from '../../../brycen-common/message/Message';

const DepartmentList = props => {

	const {t} = useTranslation();

	return(<>
		{
			(props.criteria == "1" && props.data.length == 0 && props.message !== '') &&
			<p style={{ color: 'red', margin: 0 }}>※{t(props.message)}</p>
		}
		{
			(props.criteria == "1" && props.data.length > 0) &&
			<>
				<div className="move_from_bottom">
					<CRow>
						<CCol lg="12">
							<CImg src='/avatars/list.png' alt="titleicon" style={{width:'5px',height:'12px',marginBottom:'2px'}}/>
							<CLabel className="required middle ml-2">{t('Department List')}</CLabel>
						</CCol>
					</CRow>
					<CRow className="leave-time-count mb-5 cannot-select">
						<CCol lg="12">
							<CheckboxTree
								checkModel="leaf"
								// iconsClass="fa5"
								showExpandAll={false}
								nodes={props.data}
								checked={props.checked}
								expanded={props.expanded}
								onCheck={props.onCheck}
								onExpand={props.onExpand}
								showNodeIcon={false}
								disabled={props.flag === 'save' ? false : true}
								icons={{
							        check: <span style={{ fontSize: 16 }}>&#128505;</span>,
							        uncheck: <span style={{ fontSize: 16 }}>&#9744;</span>,
							        halfCheck: <span style={{ fontSize: 16, opacity: 0.5 }}>&#128505;</span>,
									expandClose: <span style={{ fontSize: 18 }}>&#11162;</span>,
							        expandOpen: <span style={{ fontSize: 18 }}>&#11163;</span>,
							        // expandAll: <span className="rct-icon rct-icon-expand-all" />,
							        // collapseAll: <span className="rct-icon rct-icon-collapse-all" />,
							        parentClose: <span style={{ fontSize: 18 }}>&#11162;</span>,
							        parentOpen: <span style={{ fontSize: 18 }}>&#11163;</span>,
							        // leaf: <span>gsafasdfasdfasdfasdfg</span>,
							    }}
							/>
						</CCol>
					</CRow>
				</div>
			</>
		}
	</>)
}

export default DepartmentList
