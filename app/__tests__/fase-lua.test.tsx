import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FaseLua from "../home/fase-lua";
import { act } from "react-dom/test-utils";

describe("FaseLua component", () => {
    beforeEach(() => {
        // Mock API de geolocalização
        Object.defineProperty(global.navigator, "geolocation", {
            value: {
                getCurrentPosition: jest
                    .fn()
                    .mockImplementationOnce((success) =>
                        act(() => {
                            success({
                                coords: {
                                    latitude: 43.65,
                                    longitude: -79.38,
                                },
                            });
                        })
                    ),
                watchPosition: jest.fn(),
            },
            writable: true,
        });
    });

    it("Deve solicitar atualização de localização quando não está setada", () => {
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
