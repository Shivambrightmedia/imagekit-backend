const express = require("express");
const dotenv = require("dotenv");
const crypto = require("crypto");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/get-signature", (req, res) => {
    const token = crypto.randomBytes(16).toString("hex");
    const expire = Math.floor(Date.now() / 1000) + 240; // valid for 4 minutes
    const signature = crypto
        .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY)
        .update(token + expire)
        .digest("hex");

    res.json({
        token,
        expire,
        signature,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
