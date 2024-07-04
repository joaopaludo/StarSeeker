"use client";

import "./style.scss";
import React, { useRef, useEffect, useState, useMemo } from "react";
// import { Calendar } from "@fullcalendar/core";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Calendario = () => {
    const calendarRef = useRef<Calendar | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const { data, dataUpdatedAt } = useQuery({
        queryKey: ["events", currentMonth + 1, currentYear],
        queryFn: async () => {
            try {
                const [eventsResponse, launchesResponse] = await Promise.all([
                    fetch(
                        `https://ll.thespacedevs.com/2.2.0/event/?month=${
                            currentMonth + 1
                        }&year=${currentYear}`
                    ).then((response) => response.json()),
                    fetch(
                        `https://ll.thespacedevs.com/2.2.0/launch/?month=${
                            currentMonth + 1
                        }&year=${currentYear}`
                    ).then((response) => response.json()),
                ]);

                return {
                    events: eventsResponse.results,
                    launches: launchesResponse.results,
                };
            } catch (err) {
                console.log(err);
                return { events: [], launches: [] };
            }
        },
    });

    const events = useMemo(() => {
        return !data?.events
            ? []
            : data?.events.map((event: any) => {
                  return {
                      title: event.description,
                      date: format(new Date(event.date), "yyyy-MM-dd"),
                  };
              });
    }, [dataUpdatedAt]);

    const launches = useMemo(() => {
        return !data?.launches
            ? []
            : data?.launches?.map((launch: any) => {
                  return {
                      title: launch.name,
                      date: format(new Date(launch.net), "yyyy-MM-dd"),
                  };
              });
    }, [dataUpdatedAt]);

    return (
        <main className="main-calendar">
            <Calendar
                ref={calendarRef}
                plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={[...events, ...launches]}
                height="auto"
                headerToolbar={{
                    start: "prev,next",
                    center: "title",
                    end: "dayGridMonth dayGridWeek listDay",
                }}
                buttonText={{
                    month: "Mensal",
                    week: "Semanal",
                    day: "Diário",
                }}
                locale="pt-BR"
                dayHeaders={false}
                dayCellContent={(e) => {
                    return `${e.dayNumberText} - ${weekdays[e.date.getDay()]}`;
                }}
                datesSet={(e) => {
                    // on month change, refetch data
                    if (e.view.currentStart.getMonth() !== currentMonth) {
                        setCurrentMonth(e.view.currentStart.getMonth());
                    }

                    if (e.view.currentStart.getFullYear() !== currentYear) {
                        setCurrentYear(e.view.currentStart.getFullYear());
                    }
                }}
            />
        </main>
    );
};

export default Calendario;
