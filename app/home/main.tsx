"use client";

import { PropsWithChildren, FC } from "react";
import { useBackgroundContext } from "./layout-context";
import classnames from "classnames";

const Main: FC<PropsWithChildren> = ({ children }) => {
    const { showBackground } = useBackgroundContext();

    return (
        <main className={classnames({ showBackground }, "main-home")}>
            {children}
        </main>
    );
};

export default Main;
