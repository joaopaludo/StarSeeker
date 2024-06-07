import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
    if (!req.nextUrl) return NextResponse.json({ message: "Hello, World!" });

    const bodyMap = req.nextUrl.searchParams;

    const data = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
            bodyMap.get("latitude") ?? 0
        }%2C${
            bodyMap.get("longitude") || 0
        }/today?unitGroup=metric&elements=sunrise%2Csunset%2Cmoonphase&key=${
            process.env.MOONPHASE_API_KEY
        }&contentType=json`,
        {
            method: "GET",
        }
    )
        .then((response) => response.json())
        .catch((err) => console.log(err));

    return NextResponse.json({
        moonrise: data.currentConditions.sunset,
        moonset: data.currentConditions.sunrise,
        moonphase: data.currentConditions.moonphase,
    });
};

// ?longitude=-53.5204071&latitude=-26.725999&elevation=1&from_date=2024-06-05&to_date=2024-06-05&time=15%3A22%3A37"
