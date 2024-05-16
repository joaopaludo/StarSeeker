import type { Metadata } from "next";
import Link from "next/link";
import { Montserrat, Hind } from "next/font/google";
import "./global.style.scss";
import Background from "./background";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--ff-montserrat",
    weight: "700",
});
const hind = Hind({ subsets: ["latin"], variable: "--ff-hind", weight: "400" });

export const metadata: Metadata = {
    title: "StarSeeker",
    description: "Astronomy calendar and events",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${montserrat.variable} ${hind.variable}`}>
                <Background />

                <nav>
                    <div className="logo"></div>

                    <div className="links">
                        <Link href={"/calendario"}>Calendário</Link>
                        <Link href={"/noticias"}>Notícias</Link>
                        <Link href={"/sistema-solar"}>Sistema Solar</Link>
                    </div>
                </nav>

                {children}
            </body>
        </html>
    );
}
