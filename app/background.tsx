import ReactPlayer from "./videoPlayer";

const Background = async () => {
    const value = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
    ).then((response) => response.json());

    if (value.media_type === "video") {
        return (
            <div className="background-video">
                <ReactPlayer
                    url={value.url}
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

    return (
        <div>
            <h1>Background</h1>
        </div>
    );
};

export default Background;
