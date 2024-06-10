import { BackgroundProvider } from "./home/layout-context";
import { QueryProvider } from "./query-client";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <QueryProvider>
            <BackgroundProvider>{children}</BackgroundProvider>
        </QueryProvider>
    );
};

export default Providers;
