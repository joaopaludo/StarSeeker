"use client";

import "./style.scss";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Noticia from "./noticia";

const Noticias = () => {
    const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));

    useEffect(() => {
        setDate(format(new Date(), "yyyy-MM-dd"));
    }, [format(new Date(), "yyyy-MM-dd")]);

    const { data, isFetching, isPending } = useQuery({
        queryKey: ["noticias", date],
        queryFn: async () => {
            try {
                const response = await fetch(
                    "https://api.spaceflightnewsapi.net/v4/articles/?limit=10"
                );

                if (!response.ok) {
                    throw new Error("Erro na request da API de notícias");
                }

                return response.json();
            } catch (err) {
                console.log(err);
                return { noticias: [] };
            }
        },
    });

    if (isPending || isFetching) {
        return <div>Carregando notícias...</div>;
    }

    return (
        <main className="main-noticias">
            <h1>Notícias</h1>

            <div className="container-noticias">
                {data?.results.map((noticia: any) => (
                    <Noticia noticia={noticia} key={noticia.id} />
                ))}
            </div>
        </main>
    );
};

export default Noticias;
