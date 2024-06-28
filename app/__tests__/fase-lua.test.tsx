import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FaseLua from "../home/fase-lua";

Object.defineProperty(global.navigator, "geolocation", {
    value: {
        getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
            success({
                coords: {
                    latitude: 50,
                    longitude: 50,
                },
            })
        ),
    },
    writable: true,
});

describe("FaseLua component", () => {
    it("prompts for location update when no location is set", () => {
        const queryClient = new QueryClient();

        render(
            <QueryClientProvider client={queryClient}>
                <FaseLua />
            </QueryClientProvider>
        );

        const button = screen.getByRole("button", {
            name: "Atualize a localização",
        });
        expect(button).toBeInTheDocument();
    });
});
