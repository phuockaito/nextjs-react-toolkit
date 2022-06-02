/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    publicRuntimeConfig: {
        backendUrl: process.env.API_URL,
    },
    reactStrictMode: true,

}