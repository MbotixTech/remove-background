const express = require("express");
const multer = require("multer");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const fileName = `web_${Date.now()}_${file.originalname}`;
    console.log(`[UPLOAD] Menyimpan file sebagai: ${fileName}`);
    cb(null, fileName);
  },
});
const upload = multer({ storage });

app.use("/results", express.static("results"));
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("[ROUTE] Akses halaman utama");
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/upload", upload.single("image"), (req, res) => {
  const inputPath = `uploads/${req.file.filename}`;
  const outputFile = req.file.filename.replace(/\.[^/.]+$/, ".png");
  const outputPath = `results/${outputFile}`;

  console.log(`[PROCESS] Mulai remove background untuk: ${inputPath}`);

  exec(`python3 remove.py ${inputPath} ${outputPath}`, (err) => {
    if (err) {
      console.error(`[ERROR] Gagal memproses ${inputPath}`, err);

      fs.readFile(path.join(__dirname, "views", "failed.html"), "utf8", (err, html) => {
        if (err) {
          console.error("[ERROR] Gagal baca template failed.html", err);
          return res.send("Gagal menampilkan halaman gagal.");
        }
        console.log("[RENDER] Menampilkan halaman gagal");
        res.send(html);
      });

      return;
    }

    console.log(`[SUCCESS] Gambar berhasil diproses: ${outputPath}`);

    fs.readFile(path.join(__dirname, "views", "preview.html"), "utf8", (err, html) => {
      if (err) {
        console.error("[ERROR] Gagal baca template preview.html", err);
        return res.send("Gagal menampilkan preview.");
      }
      const finalHtml = html.replace(/__FILE_URL__/g, `/results/${outputFile}`);
      console.log(`[RENDER] Menampilkan preview untuk: ${outputFile}`);
      res.send(finalHtml);
    });
  });
});

app.get("/preview/:file", (req, res) => {
  const filename = req.params.file;
  const fileUrl = `/results/${filename}`;
  console.log(`[ROUTE] Akses preview manual: ${fileUrl}`);

  fs.readFile(path.join(__dirname, "views", "preview.html"), "utf8", (err, html) => {
    if (err) {
      console.error("[ERROR] Gagal baca template preview.html", err);
      return res.send("Gagal menampilkan preview.");
    }
    const finalHtml = html.replace(/__FILE_URL__/g, fileUrl);
    res.send(finalHtml);
  });
});

app.get("/interaction.js", (req, res) => {
  res.type("application/javascript");
  res.send(`
    document.addEventListener("DOMContentLoaded", () => {
      const img = document.querySelector(".preview-img");
      if (img) {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
          const overlay = document.createElement("div");
          overlay.style.position = "fixed";
          overlay.style.top = 0;
          overlay.style.left = 0;
          overlay.style.width = "100vw";
          overlay.style.height = "100vh";
          overlay.style.background = "rgba(0,0,0,0.85)";
          overlay.style.display = "flex";
          overlay.style.alignItems = "center";
          overlay.style.justifyContent = "center";
          overlay.style.zIndex = 9999;

          const imgClone = document.createElement("img");
          imgClone.src = img.src;
          imgClone.style.maxWidth = "90vw";
          imgClone.style.maxHeight = "90vh";
          imgClone.style.borderRadius = "12px";
          imgClone.style.boxShadow = "0 0 25px rgba(255,255,255,0.4)";

          overlay.appendChild(imgClone);
          document.body.appendChild(overlay);

          overlay.addEventListener("click", () => overlay.remove());
        });
      }
    });
  `);
});

app.listen(PORT, () => console.log(`🚀 Server jalan di http://localhost:${PORT}`));