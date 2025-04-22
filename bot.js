require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const fs = require("fs");
const { exec } = require("child_process");

const TOKEN = process.env.TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

async function downloadFile(fileUrl, inputPath) {
  const writer = fs.createWriteStream(inputPath);
  try {
    const response = await axios.get(fileUrl, { responseType: "stream" });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (err) {
    console.error(`Download error: ${err.message}`);
    throw new Error(`Failed to download the file: ${err.message}`);
  }
}

async function removeBackground(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    exec(`python3 remove.py ${inputPath} ${outputPath}`, (err, stdout, stderr) => {
      if (err || stderr) {
        console.error(`Error removing background: ${stderr || err.message}`);
        reject(new Error(`Error removing background: ${stderr || err.message}`));
      } else {
        console.log(`Background removal success: ${stdout}`);
        resolve(stdout);
      }
    });
  });
}

bot.on("photo", async (msg) => {
  const chatId = msg.chat.id;
  const fileId = msg.photo[msg.photo.length - 1].file_id;

  try {
    console.log(`[INFO] User ${chatId} sent a photo. File ID: ${fileId}`);

    const fileInfo = await bot.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${TOKEN}/${fileInfo.file_path}`;
    console.log(`[INFO] File URL: ${fileUrl}`);

    const filename = `tele_${chatId}_${Date.now()}.jpg`;
    const inputPath = `uploads/${filename}`;
    const outputPath = `results/${filename.replace(/\.[^/.]+$/, ".png")}`;
    console.log(`[INFO] Saving photo as ${inputPath}`);

    await downloadFile(fileUrl, inputPath);
    console.log(`[INFO] Photo downloaded successfully.`);

    await removeBackground(inputPath, outputPath);
    console.log(`[INFO] Background removed successfully. Sending back the processed image.`);

    await bot.sendPhoto(chatId, fs.createReadStream(outputPath));
    console.log(`[INFO] Photo sent to ${chatId}.`);

  } catch (err) {
    console.error(`Error during photo processing: ${err.message}`);
    bot.sendMessage(chatId, "❌ Gagal menghapus background.");
  }
});

bot.onText(/\/start/, (msg) => {
  console.log(`[INFO] User ${msg.chat.id} started the bot.`);
  bot.sendMessage(msg.chat.id, "👋 Kirimkan gambar ke bot ini, dan aku akan menghapus background-nya untukmu!");
});
