/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig

/** next.config.js - with Webpack v5.x */
module.exports = {


    webpack: (config, { isServer }) => {

        // If client-side, don't polyfill `fs`
        if (!isServer) {
            config.resolve.fallback = {
                fs: false,
                path: false,
            }
        }

        return config
    },

}