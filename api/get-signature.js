const ImageKit = require("imagekit");

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // or use your exact domain for better security
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const imagekit = new ImageKit({
    publicKey: "public_W/90/QXL4CgTglxhI3BKX8s6EF0=",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/a16vm6m1m",
  });

  const result = imagekit.getAuthenticationParameters();
  res.status(200).json(result);
}
