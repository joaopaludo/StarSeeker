"use client";

import TableWidget from "./table-widget";
import { useState, useEffect } from "react";
import { format, differenceInMilliseconds } from "date-fns";
import { useQuery } from "@tanstack/react-query";

const FetchingContainer = () => {
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        setDate(format(new Date(), "yyyy-MM-dd"));
    }, [format(new Date(), "yyyy-MM-dd")]);

    const { data, isFetching } = useQuery({
        queryKey: ["fetching-container", date],
        queryFn: async () => {
            try {
                const response = await fetch(
                    "https://api.spaceflightnewsapi.net/v4/articles/?limit=3"
                ).then((response) => response.json());

                const [eventsResponse, launchesResponse] = await Promise.all([
                    await fetch(
                        `https://ll.thespacedevs.com/2.2.0/event/upcoming/?limit=3`
                    ).then((response) => response.json()),
                    await fetch(
                        `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=3`
                    ).then((response) => response.json()),
                ]);

                console.log(response.results);
                console.log(eventsResponse.results);
                console.log(launchesResponse.results);

                return {
                    noticias: (response.results || []).map((artice: any) => {
                        return {
                            title: artice.title,
                            description: artice.summary,
                            date: format(
                                new Date(artice.published_at),
                                "yyyy-MM-dd"
                            ),
                            siteName: artice.news_site,
                        };
                    }) as any[],

                    calendario: [
                        ...(eventsResponse.results || []).map((event: any) => {
                            return {
                                title: event.name,
                                description: event.description,
                                date: format(
                                    new Date(event.date),
                                    "yyyy-MM-dd"
                                ),
                            };
                        }),
                        ...(launchesResponse?.results || []).map(
                            (launch: any) => {
                                return {
                                    title: launch.name,
                                    description: launch.mission?.description,
                                    date: format(
                                        new Date(launch.net),
                                        "yyyy-MM-dd"
                                    ),
                                };
                            }
                        ),
                    ].sort((a: any, b: any) => {
                        return differenceInMilliseconds(
                            new Date(a.updated_at),
                            new Date(b.updated_at)
                        );
                    }) as any[],
                };
            } catch (err) {
                console.log("deu erro aqui >>", err);
                return { noticias: [] as any[], calendario: [] as any[] };
            }
        },
    });

    if (isFetching || !data) {
        return <div>Carregando...</div>;
    }

    console.log(data);

    return (
        <div className="home__content">
            <TableWidget
                title="Notícias"
                linkTo="/noticias"
                linkToText="Ir para as notícias"
                items={data.noticias}
            />
            <TableWidget
                title="Calendário"
                linkTo="/calendario"
                linkToText="Ir para o Calendário"
                items={data.calendario}
            />
        </div>
    );
};

export default FetchingContainer;
