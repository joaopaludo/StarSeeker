import ReactPlayer from "./videoPlayer";
import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

const Background = (props: any) => {
    const { data, isFetching, isPending } = useQuery({
        queryKey: ["apod"],

        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,

        queryFn: async () => {
            return await fetch(
                `https://api.nasa.gov/planetary/apod?api_key=${
                    process.env.NASA_API ?? "DEMO_KEY"
                }`
            )
                .then((response) => response.json())
                .catch((err) => console.log(err));
        },

        refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
    });

    if (isFetching || isPending) {
        return <></>;
    }

    if (data?.media_type === "video") {
        return (
            <div className="background-video">
                <ReactPlayer
                    url={data.url}
                    playing={true}
                    loop={true}
                    controls={false}
                    muted={true}
                    height={"100%"}
                    width={"100%"}
                />
            </div>
        );
    }

    if (data?.media_type === "image" && (data?.hdurl || data?.url)) {
        return (
            <div className="background-image">
                <Image
                    src={data.hdurl || data.url}
                    alt={data.title}
                    width={0}
                    height={0}
                />
            </div>
        );
    }

    return (
        <div className="background-image">
            <Image
                src="/background.jpg"
                alt="Imagem de fundo de galáxias"
                width={0}
                height={0}
            />
        </div>
    );
};

export default Background;
