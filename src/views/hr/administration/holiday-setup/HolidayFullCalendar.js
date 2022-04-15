/* eslint-disable no-use-before-define */
import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { format } from 'date-fns';
import {CCard, CCol, CRow, CImg, CButton, CModal, CModalHeader, CModalBody, CButtonToolbar } from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { get } from 'jquery';
import $ from 'jquery';
import { MonthSelection } from '@material-ui/pickers/views/Month/MonthView';
import moment from 'moment';

/**
 * @author Aye Thiri Mon
 * @create 28/04/2021
 * @param  {*} props
 * @returns output shown in web page
 */
const HolidayFullCalendar=props=> {
    const{t} = useTranslation();
    return (<>
        <FullCalendar
          id='calendara'
          // className="demo-app demo-app-calendar table-responsive" // 
          defaultView="dayGridMonth"
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          ref={props.calendarComponentRef}
          weekends={props.event.calendarWeekends}
          events={props.event.calendarEvents}
          datesSet={(args) => {
            // props.setEvent({calendarWeekends: true,calendarEvents:[]}); 
            let label = $('.fc-toolbar-title');
            let text = '1 '+label.text();
            let get_month = format(new Date(text), 'yyyy-MM');
            props.setYearMonth(get_month);
            props.loadCalendar(get_month);
          }}
        />   
    </>
    );
}
export default HolidayFullCalendar;


