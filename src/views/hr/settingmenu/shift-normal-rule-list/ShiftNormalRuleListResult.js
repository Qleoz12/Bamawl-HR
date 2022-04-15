import React, { } from 'react';
import { CImg, CAlert, CRow, CCol,CCard } from "@coreui/react";
import { useTranslation } from 'react-i18next';

const ShiftNormalRuleResult = props => {
    let {
        listTable,
        editToggleAlert,
        deleteToggleAlert,
    } = props;
    return (
        <>
            {
                typeof (listTable) === 'string' &&
                <CAlert color='secondary'>{listTable}</CAlert>
            }
            {
                typeof (listTable) === 'object' && listTable.length > 0 &&
                <CRow>
                    {
                        listTable.map((item, index) => {
                            return (
                                <CCol lg="12" key={index} className="mb-4 d-flex align-items-baseline">
                                    <CImg
                                        src={'avatars/list.png'}
                                        className="list-icon mr-2 mb-1"
                                        width="6px"  
                                    />
                                    <details key={item.id} className="w-100">
                                        <summary className='lblShiftName' value={item.id}>{item.sn_name}</summary>
                                        <ResultTable
                                            tableIndex={item.id}
                                            data={item}
                                            editToggleAlert={editToggleAlert}
                                            deleteToggleAlert={deleteToggleAlert}
                                        />
                                    </details>
                                </CCol>
                            )
                        })
                    }
                </CRow>
            }
        </>
    )
}

const ResultTable = props => {
    const { t } = useTranslation();
    const tableHeader = [
        {
            displayName: t("No"),
            class: 'tblNo',
        },
        {
            displayName: t("Working Day"),
            class: 'tblWorkingDay',
        },
        {
            displayName: t("Working Hour From - To"),
            class: 'tblWorkingHourFormTo',
        },
        {
            displayName: t("Edit"),
            class: 'tblEdit',
        },
        {
            displayName: t("Remove"),
            class: 'tblRemove',
        },
    ]
    let {
        tableIndex,                 // for display color
        data,                       // for data
        editToggleAlert,            // for action when click edit's icon
        deleteToggleAlert           // for action when click delete's icon
    } = props;

    return (
        <>
            <div className="box box-white mt-2">
            <CCard className="table-panel table-responsive" style={{ width: "100%" }}>
                <table className='table'>
                    <caption className="row-count-msg SNRLCustomCaption" >{data.shiftnormalruleworkdays.length + " " + t("Working Day and Working Hours")}</caption>
                    <thead>
                        <tr>
                            {
                                tableHeader.map((field, index) => {
                                    return (
                                        <th key={index} className={field.class}>
                                            <div className="SNRLFlexContainer">
                                                <CImg src={'avatars/titleicon.png'} className="title-icon" />
                                                {field.displayName}
                                            </div>
                                        </th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.shiftnormalruleworkdays.length > 0 &&
                            data.shiftnormalruleworkdays.map((row, idx) => {
                                return (
                                    <TableRow
                                        key={idx}
                                        tableIndex={tableIndex}
                                        index={idx}
                                        rowCount={data.shiftnormalruleworkdays.length}
                                        tableId={data.id}
                                        workingDay={row.work_day_name}
                                        workingHalfTime1Start={row.working_hr_start}
                                        workingHalfTime2End={row.working_hr_end}
                                        editToggleAlert={editToggleAlert}
                                        deleteToggleAlert={deleteToggleAlert}
                                    />
                                )
                            })
                        }
                        {
                            data.shiftnormalruleworkdays.length <= 0 &&
                            <tr>
                                <td colSpan={5}>{t('No data')}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </CCard>
            </div>
        </>
    )
}

const TableRow = (props) => {
    let {
        tableIndex,             // for table Color
        index,                  // for index of row
        rowCount,               // for rowspan ( edit, delete)
        workingDay,             // for working day
        tableId,
        workingHalfTime1Start,  // for working times
        workingHalfTime2End,    // for working times
        editToggleAlert,        // for popup
        deleteToggleAlert,      // for popup
    } = props;

    function setRowColor(index) {
        let idx = index % 5;
        switch (idx) {
            case 1:
                return "td-pink"
            case 2:
                return "td-blue"
            case 3:
                return "td-green"
            case 4:
                return "td-orange"
            default:
                return "td-name"
        }
    }
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return (
        <tr>
            <td className={rowCount-1==index?'border-bottom-left-radius td-no':'td-no'} style={{ width: "10%", textAlign: "right" }}>{index + 1}</td>
            <td style={{ textAlign: "left" }}>{capitalize(workingDay)}</td>
            <td className={`${setRowColor(tableIndex)}  no-border-radius`}>
                {
                    (workingHalfTime1Start || workingHalfTime2End) &&
                    <ul className="SNRLWorkingHourCell">
                        <li>
                            <div className="timeblock">
                                <CImg src={'avatars/intime.png'} className="year-icon" />
                                {workingHalfTime1Start ? workingHalfTime1Start : "NOT SET"}
                            </div>

                        </li>
                        <li className="SNRLLeftBorder">
                            <div className="timeblock">
                            <CImg src={'avatars/ontime.png'} className="year-icon" />
                            {workingHalfTime2End ? workingHalfTime2End : "NOT SET"}
                            </div>
                            
                        </li>
                    </ul>
                }
                {
                    !workingHalfTime1Start && !workingHalfTime2End &&
                    <div style={{ textAlign: "center" }}>
                        WORKING HOURS ARE NOT SET
                    </div>
                }
            </td>
            {
                index === 0 &&
                <>
                    <td rowSpan={rowCount} style={{ verticalAlign: "top", width: "10%" }}>
                        <input type='image' src="avatars/edit.png" className='SNRLIcon btnEdit'
                            onClick={() => editToggleAlert(tableId)}
                            alt='edit'
                        ></input>
                    </td>
                    <td rowSpan={rowCount} className="border-bottom-right-radius" style={{ verticalAlign: "top", width: '10%' }}>
                        <input type='image' src='avatars/remove.png' className="SNRLIcon btnDelete"
                            onClick={() => deleteToggleAlert(tableId)}
                            alt="delete"
                        ></input>
                    </td>
                </>
            }
        </tr>
    )
}


export default ShiftNormalRuleResult