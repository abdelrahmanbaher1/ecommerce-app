const withImages = require("next-images");

module.exports = withImages({
  images: {
    domains: [
      "i.imgur.com",
      "res.cloudinary.com",
      "api.escuelajs.co",
      "https://placeimg.com",
    ],
  },
});
