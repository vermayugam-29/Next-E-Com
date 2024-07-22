/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '**'
            },
            {
                protocol: 'https',
                hostname: '5.imimg.com',
                pathname: '**'
            },
            {
                protocol : 'https',
                hostname : 'assets.aceternity.com',
                pathname : '**'
            },
            {
                protocol : 'https',
                hostname : 'via.placeholder.com',
                pathname : '**'
            },
        ]
    },
    reactStrictMode : false,
};

export default nextConfig;
