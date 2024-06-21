"use client";

import "./style.scss";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Noticias = () => {
    const { data, isFetching, isPending } = useQuery({
        queryKey: ["noticias"],
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
        <div>
            <h1>Notícias</h1>

            <div className="container-noticias">
                {data?.results.map((noticia: any) => (
                    <div className="noticia">
                        <div className="conteudo-noticia" key={noticia.id}>
                            <h2>{noticia.title}</h2>
                            <p>
                                {format(
                                    new Date(noticia.updated_at),
                                    "d MMMM, yyyy",
                                    { locale: ptBR }
                                )}
                            </p>
                            <p>{noticia.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Noticias;
