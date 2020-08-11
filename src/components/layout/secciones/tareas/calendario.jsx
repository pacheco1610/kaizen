import React, { Component } from 'react'
import {Calendar,momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css'

require('moment/locale/es.js');
  
const localizer = momentLocalizer(moment);
//array de eventos
const myEventsList= [{
  title: "Realizar Reporte",
  start: new Date('2020-07-21 10:22:00'),
  end: new Date('2020-07-21 10:42:00')
},
{
  title: "Verficiar Obra",
   start: new Date('2020-07-19 12:22:00'),
  end: new Date('2020-07-19 13:42:00')
}]

export default class calendario extends Component {
    render() {
        return (
            <div style={{height:`${500}px`}} className="bigCalendar-container">
                <Calendar
                localizer={localizer}
                events={myEventsList}
                startAccessor="start"
                endAccessor="end"
                
                messages={{
                        next: "sig",
                        previous: "ant",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                        }}
                />
            </div>
        )
    }
}
