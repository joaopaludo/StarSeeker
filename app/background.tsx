import ReactPlayer from "./videoPlayer";
import Image from "next/image";

const Background = () => {
    // const value = await fetch(
    //     `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API}`
    // )
    //     .then((response) => response.json())
    //     .catch((err) => console.log(err));

    // if (value.media_type === "video") {
    //     return (
    //         <div className="background-video">
    //             <ReactPlayer
    //                 url={value.url}
    //                 playing={true}
    //                 loop={true}
    //                 controls={false}
    //                 muted={true}
    //                 height={"100%"}
    //                 width={"100%"}
    //             />
    //         </div>
    //     );
    // }

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
