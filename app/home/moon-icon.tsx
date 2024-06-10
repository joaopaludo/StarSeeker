import Image from "next/image";

const moonImages = [
    "new moon",
    "waxing crescent",
    "first quarter",
    "waxing gibbous",
    "full moon",
    "waning gibbous",
    "last quarter",
    "waning crescent",
];

const MoonIcon: React.FC<{ moonphase: number }> = ({ moonphase }) => {
    let moonNumber = 0;

    if (moonphase === 0) moonNumber = 0;
    if (moonphase > 0 && moonphase < 0.25) moonNumber = 1;
    if (moonphase === 0.25) moonNumber = 2;
    if (moonphase > 0.25 && moonphase < 0.5) moonNumber = 3;
    if (moonphase === 0.5) moonNumber = 4;
    if (moonphase > 0.5 && moonphase < 0.75) moonNumber = 5;
    if (moonphase === 0.75) moonNumber = 6;
    if (moonphase > 0.75 && moonphase <= 1) moonNumber = 7;

    return (
        <Image
            src={`/${moonImages[moonNumber]}.png`}
            alt="Moon phase"
            width={95}
            height={95}
        />
    );
};

export default MoonIcon;
