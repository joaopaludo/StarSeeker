"use client";

import "./style.scss";
import React, { useRef, useEffect } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const Calendario = () => {
    const calendarRef = useRef<any>(null);

    const { data, isFetching, isPending } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            try {
                const [eventsResponse, launchesResponse] = await Promise.all([
                    fetch(
                        `https://ll.thespacedevs.com/2.2.0/event/upcoming/`
                    ).then((response) => response.json()),
                    fetch(
                        `https://ll.thespacedevs.com/2.2.0/launch/upcoming/`
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

    const events = !data?.events
        ? []
        : data?.events.map((event: any) => {
              return {
                  title: event.description,
                  date: format(new Date(event.date), "yyyy-MM-dd"),
              };
          });

    const launches = !data?.launches
        ? []
        : data?.launches?.map((launch: any) => {
              return {
                  title: launch.name,
                  date: format(new Date(launch.net), "yyyy-MM-dd"),
              };
          });

    useEffect(() => {
        if (isFetching || isPending || !calendarRef.current) {
            return;
        }

        const calendar = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, listPlugin, interactionPlugin],
            initialView: "dayGridMonth",
            events: [...events, ...launches],
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
    }, [isFetching, isPending, data]);

    return <div ref={calendarRef}></div>;
};

export default Calendario;
