/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['imageio.forbes.com','www.adameshandbook.com','images.unsplash.com',"api.dicebear.com"],
      },
      domains: ["pixabay.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
        },
        {
          protocol: "https",
          hostname: "api.dicebear.com",
        },
      ],
}

module.exports = nextConfig
