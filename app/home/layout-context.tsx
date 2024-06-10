"use client";

import {
    useState,
    useContext,
    createContext,
    type Dispatch,
    type SetStateAction,
    type FC,
    type PropsWithChildren,
} from "react";

const backgroundContext = createContext<{
    showBackground: boolean;
    setShowBackground: Dispatch<SetStateAction<boolean>>;
}>(null as any);

export const BackgroundProvider: FC<PropsWithChildren> = ({ children }) => {
    const [showBackground, setShowBackground] = useState(false);

    return (
        <backgroundContext.Provider
            value={{
                showBackground,
                setShowBackground,
            }}
        >
            {children}
        </backgroundContext.Provider>
    );
};

export const useBackgroundContext = () => useContext(backgroundContext);
