"use client";

import "./style.scss";
import React, { useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// TODO fetch events from API

const FullCalendar = () => {
    const calendarRef = useRef<any>(null);

    useEffect(() => {
        const calendar = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, listPlugin, interactionPlugin],
            initialView: "dayGridMonth",
            events: [
                { title: "Event 1", date: "2024-05-17" },
                { title: "Event 2", date: "2024-05-23" },
                { title: "Event 3", date: "2024-05-01" },
                { title: "Event 4", date: "2024-05-13" },
                { title: "Event 5", date: "2024-05-30" },
            ],
            height: "auto",
            headerToolbar: {
                start: "prev,next",
                center: "title",
                end: "dayGridMonth dayGridWeek listDay",
            },
            buttonText: {
                month: "Mensal",
                week: "Semanal",
                day: "Diário",
            },
            locale: "pt-BR",
            dayHeaders: false,
            dayCellContent: (e) => {
                return `${e.dayNumberText} - ${weekdays[e.date.getDay()]}`;
            },
        });

        calendar.render();
    }, []);

    return <div ref={calendarRef}></div>;
};

export default FullCalendar;
