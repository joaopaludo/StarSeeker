/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true,
    },

    async rewrites() {
        return [
            {
                source: "/astronomyapi/:path*",
                destination: "https://api.astronomyapi.com/:path*",
            },
        ];
    },
};

export default nextConfig;
