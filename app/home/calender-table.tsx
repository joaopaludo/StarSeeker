"use client";

import { format, differenceInMilliseconds } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import TableWidget from "./table-widget";

const CalendarTable = () => {
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        setDate(format(new Date(), "yyyy-MM-dd"));
    }, [format(new Date(), "yyyy-MM-dd")]);

    const { data, isFetching, dataUpdatedAt } = useQuery({
        queryKey: ["calendar-table", date],
        queryFn: async () => {
            const [eventsResponse, launchesResponse] = await Promise.all([
                await fetch(
                    `https://ll.thespacedevs.com/2.2.0/event/upcoming/?limit=3`
                ).then((response) => response.json()),
                await fetch(
                    `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=3`
                ).then((response) => response.json()),
            ]);

            return {
                events: eventsResponse.results,
                launches: launchesResponse.results,
            };
        },
    });

    const calendarData: any[] = useMemo(() => {
        return !data
            ? []
            : [
                  ...(data?.events?.map((event: any) => {
                      return {
                          title: event.description,
                          date: format(
                              new Date(event.date),
                              "dd/MM/yyyy HH:mm"
                          ),
                      };
                  }) || []),
                  ...(data?.launches?.map((launch: any) => {
                      return {
                          title: launch.name,
                          date: format(
                              new Date(launch.net),
                              "dd/MM/yyyy HH:mm"
                          ),
                      };
                  }) || []),
              ];
    }, [dataUpdatedAt]);

    if (isFetching || !data) {
        return <div>Carregando...</div>;
    }

    return (
        <TableWidget
            title="Calendário"
            linkTo="/calendario"
            linkToText="Ir para o Calendário"
            items={calendarData}
        />
    );
};

export default CalendarTable;
