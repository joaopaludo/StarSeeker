"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MoonIcon from "./moon-icon";

import "./fase-lua.style.scss";

const moonPhase = (phase: number) => {
    // 0 – new moon
    // 0-0.25 – waxing crescent
    // 0.25 – first quarter
    // 0.25-0.5 – waxing gibbous
    // 0.5 – full moon
    // 0.5-0.75 – waning gibbous
    // 0.75 – last quarter
    // 0.75 -1 – waning crescent

    if (phase === 0) return "Lua Nova";
    if (phase > 0 && phase < 0.25) return "Lua Crescente";
    if (phase === 0.25) return "Quarto Crescente";
    if (phase > 0.25 && phase < 0.5) return "Lua Crescente Gibosa";
    if (phase === 0.5) return "Lua Cheia";
    if (phase > 0.5 && phase < 0.75) return "Lua Minguante Gibosa";
    if (phase === 0.75) return "Quarto Minguante";
    if (phase > 0.75 && phase <= 1) return "Lua Minguante";
};

const FaseLua: React.FC = () => {
    const [location, setLocation] = useState<GeolocationPosition | null>(null);

    const handleSetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                localStorage.setItem("location", JSON.stringify(position));
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["moon"],

        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,

        enabled: !!location && !!location.coords,

        queryFn: async () => {
            if (!location || !location.coords) return;

            const urlData = new URLSearchParams({
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString(),
            });

            return await fetch(`/api/moon-widget?${urlData.toString()}`, {})
                .then((response) => response.json())
                .catch((err) => console.log(err));
        },
    });

    if (!location || !location.coords) {
        return (
            <button onClick={handleSetLocation}>Atualize a localização</button>
        );
    }

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (isError) {
        return <div>Erro ao carregar a fase da lua</div>;
    }

    return (
        <div className="fase-lua__container">
            <div className="fase-lua__image" data-moonphase={data.moonphase}>
                <MoonIcon moonphase={data.moonphase} />

                <span className="fase-lua__image_shadow" />
            </div>
            <div className="fase-lua__content">
                <h4 className="fase-lua__title h-s">
                    {moonPhase(data.moonphase)}
                </h4>

                <span className="fase-lua__horarios">
                    <span className="fase-lua__nascer p-m">
                        nas: {data.moonrise}
                    </span>
                    <span className="fase-lua__por p-m">
                        pôr: {data.moonset}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default FaseLua;
