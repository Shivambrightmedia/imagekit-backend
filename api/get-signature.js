const crypto = require("crypto");

module.exports = (req, res) => {
  const token = crypto.randomBytes(16).toString("hex");
  const expire = Math.floor(Date.now() / 1000) + 240; // 4 minutes
  const signature = crypto
    .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY)
    .update(token + expire)
    .digest("hex");

  res.status(200).json({
    token,
    expire,
    signature
  });
};
