import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,

            staleTime: Infinity,
            refetchInterval: 1000 * 60 * 60 * 24, // 24 hours
        },
    },
});

const localStoragePersister = createSyncStoragePersister({
    storage: globalThis.localStorage,
});

persistQueryClient({
    queryClient,
    persister: localStoragePersister,
});

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
