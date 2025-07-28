const ImageKit = require("imagekit");

export default function handler(req, res) {
  // ✅ Add proper CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ✅ Check if privateKey is missing
  if (!process.env.IMAGEKIT_PRIVATE_KEY) {
    return res.status(500).json({ error: "Private key not configured" });
  }

  // ✅ Fix: Remove line break from URL
  const imagekit = new ImageKit({
    publicKey: "public_W/90/QXL4CgTglxhI3BKX8s6EF0=",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/a16vm6m1m", // ✅ Correct this line
  });

  try {
    const authParams = imagekit.getAuthenticationParameters();
    res.status(200).json(authParams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
