import type { Metadata } from "next";
import FaseLua from "./fase-lua";

export const metadata: Metadata = {
    title: "StarSeeker",
    description: "Astronomy calendar and events",
};

export default function Home() {
    return (
        <main>
            <FaseLua />
        </main>
    );
}
