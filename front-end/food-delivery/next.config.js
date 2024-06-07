/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains: [
          'imageio.forbes.com',
          'www.adameshandbook.com',
          'images.unsplash.com',
          'api.dicebear.com',
          'pixabay.com',
          'res.cloudinary.com',
          'api.dicebear.com',
          'https://api.dicebear.com',
          'media-assets.swiggy.com',
          'https://media-assets.swiggy.com',
      ],
  },
  domains: ["pixabay.com"],
  remotePatterns: [
      {
          protocol: "https",
          host: "res.cloudinary.com/rajan7clould",
      },
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
