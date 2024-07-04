"use client";

import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import TableWidget from "./table-widget";

const ArticleTable = () => {
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        setDate(format(new Date(), "yyyy-MM-dd"));
    }, [format(new Date(), "yyyy-MM-dd")]);

    const { data, isFetching, isPending } = useQuery({
        queryKey: ["noticias-table", date],
        queryFn: async () => {
            const response = await fetch(
                "https://api.spaceflightnewsapi.net/v4/articles/?limit=3"
            );

            const res = await response.json();

            return res.results.map((noticia: any) => ({
                title: noticia.title,
                date: format(
                    new Date(noticia.published_at),
                    "dd/MM/yyyy HH:mm"
                ),
                description: noticia.summary,
                siteName: noticia.news_site,
                siteUrl: new URL(noticia.url).hostname,
            }));
        },
    });

    if (isFetching || !data) {
        return <div>Carregando...</div>;
    }

    return (
        <TableWidget
            title="Notícias"
            linkTo="/noticias"
            linkToText="Ir para as notícias"
            items={data}
        />
    );
};

export default ArticleTable;
