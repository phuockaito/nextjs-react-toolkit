/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    },
    reactStrictMode: true,

}