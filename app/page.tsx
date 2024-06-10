import type { Metadata } from "next";
import FaseLua from "./home/fase-lua";

import "./home.style.scss";

import UnblurButton from "./home/unblur_button";
import Main from "./home/main";

export const metadata: Metadata = {
    title: "StarSeeker",
    description: "Astronomy calendar and events",
};

export default function Home() {
    return (
        <Main>
            <div className="home__head-container">
                <FaseLua />

                <UnblurButton />
            </div>
        </Main>
    );
}
