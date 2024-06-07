"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat, Hind } from "next/font/google";
import "./global.style.scss";
import Background from "./background";
import { QueryProvider } from "./query-client";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--ff-montserrat",
    weight: "700",
});
const hind = Hind({ subsets: ["latin"], variable: "--ff-hind", weight: "400" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    return (
        <QueryProvider>
            <html lang="en">
                <body className={`${montserrat.variable} ${hind.variable}`}>
                    <Background />

                    <nav className="navbar">
                        <div className="nav_logo">
                            <Link href={"/"}>
                                <Image
                                    alt="StarSeeker logo"
                                    src={"/Logo.svg"}
                                    width={160}
                                    height={51.5}
                                />
                            </Link>
                        </div>

                        <div className="nav_links h-s">
                            <Link
                                href={"/calendario"}
                                className={
                                    pathname === "/calendario" ? `active` : ""
                                }
                            >
                                Calendário
                            </Link>
                            <Link
                                href={"/noticias"}
                                className={
                                    pathname === "/noticias" ? `active` : ""
                                }
                            >
                                Notícias
                            </Link>
                            <Link
                                href={"/sistema-solar"}
                                className={
                                    pathname === "/sistema-solar"
                                        ? `active`
                                        : ""
                                }
                            >
                                Sistema Solar
                            </Link>
                        </div>
                    </nav>

                    {children}
                </body>
            </html>
        </QueryProvider>
    );
}
