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
    const [location, setLocation] = useState<GeolocationPosition | null>(
        globalThis.localStorage?.getItem("location")
            ? JSON.parse(globalThis.localStorage?.getItem("location") ?? "") ||
                  null
            : null
    );

    const handleSetLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation(position);
                globalThis.localStorage?.setItem(
                    "location",
                    JSON.stringify({
                        coords: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        },
                    })
                );
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

            const urlData = {
                latitude: location.coords.latitude.toString(),
                longitude: location.coords.longitude.toString(),
            };

            return await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${urlData.latitude}%2C${urlData.longitude}/today?unitGroup=metric&elements=sunrise%2Csunset%2Cmoonphase&key=${process.env.NEXT_PUBLIC_MOONPHASE_API_KEY}&contentType=json`,
                {
                    method: "GET",
                }
            )
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
                    {moonPhase(data.currentConditions.moonphase)}
                </h4>

                <span className="fase-lua__horarios">
                    <span className="fase-lua__nascer p-m">
                        nas: {data.currentConditions.sunset}
                    </span>
                    <span className="fase-lua__por p-m">
                        pôr: {data.currentConditions.sunrise}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default FaseLua;
