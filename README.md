
# Remove Background Web App

<img src="public/logo.jpg" alt="Logo" width="400">


[![MIT License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Apache 2.0 License](https://img.shields.io/badge/License-Apache%202.0-orange)](https://opensource.org/licenses/Apache-2.0)
[![HTML5](https://img.shields.io/badge/HTML5-red)](https://www.w3.org/html/)
[![Node.js](https://img.shields.io/badge/Node.js-green)](https://nodejs.org/)
[![JSON](https://img.shields.io/badge/JSON-black)](https://www.json.org/)

<img src="https://github.com/user-attachments/assets/d7810258-b64f-4a70-bbe5-7bf25f67540b" alt="image" width="400">

## Deskripsi

**Remove Background Web App** adalah aplikasi yang memungkinkan pengguna untuk meng-upload gambar dan secara otomatis menghapus latar belakangnya. Aplikasi ini berjalan di dua platform, yaitu **Web** dan **Telegram Bot**. Aplikasi ini dibangun dengan **HTML**, **CSS**, **JavaScript**, **Python** (untuk proses penghapusan background dengan **`rembg`**), dan menggunakan **Node.js** di backend.

Proses penghapusan latar belakang dilakukan dengan menjalankan **Python** secara otomatis di server menggunakan **`child_process`** di Node.js. Python akan memanggil **`rembg`** untuk menghapus latar belakang gambar yang di-upload dan hasilnya akan dikembalikan ke pengguna dalam format PNG. Selain itu, pengguna juga dapat menggunakan Telegram Bot untuk menghapus latar belakang gambar dengan cara yang lebih cepat melalui perintah bot di Telegram.

## Fitur Utama
- **Upload Gambar**: Pengguna dapat meng-upload gambar untuk menghapus latar belakangnya.
- **Preview Hasil**: Menampilkan gambar hasil setelah latar belakang dihapus.
- **Download Gambar**: Pengguna dapat mengunduh gambar tanpa latar belakang.
- **Telegram Bot**: Bot Telegram yang memungkinkan pengguna menghapus latar belakang gambar melalui perintah.
- **Responsive**: Desain responsif yang cocok di berbagai perangkat.
- **Animasi**: Animasi halus pada tombol dan gambar.

## Stack Teknologi
- **Frontend**:
  - **HTML**: Struktur dasar dari aplikasi.
  - **CSS**: Styling dan desain responsif menggunakan `flexbox` dan `CSS animations`.
  - **JavaScript**: Interaksi dinamis dengan halaman, seperti zoom gambar.
  
- **Backend**:
  - **Node.js & Express**: Server backend untuk menangani upload gambar, proses penghapusan background, dan penghapusan file setelah proses selesai.
  - **Python**: Menggunakan **`rembg`** library untuk menghapus latar belakang gambar. Python dijalankan melalui **`child_process`** di Node.js.
  - **Mulitpart Form Data (Multer)**: Digunakan untuk meng-handle upload file di Node.js.
  
- **Telegram Bot**:
  - **Node.js**: Bot berjalan di platform Telegram untuk menerima gambar dan menghapus latar belakang secara otomatis.

## Cara Kerja
1. Pengguna meng-upload gambar melalui aplikasi web atau Telegram Bot.
2. Node.js menerima request dan menggunakan **Python** untuk memanggil **`rembg`** melalui **child process**.
3. **`rembg`** akan memproses gambar untuk menghapus latar belakang.
4. Hasilnya disimpan dalam format PNG dan dikirim kembali ke pengguna.

## Cara Menggunakan

### 1. **Clone Repository**:
```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

### 2. **Install Dependencies**:
- Install dependensi Node.js:
```bash
npm install
```

- Install dependensi Python (pastikan Python sudah terinstall di sistem):
```bash
pip install rembg
```

### 3. **Jalankan Aplikasi Web**:
- Untuk menjalankan aplikasi web, jalankan perintah berikut:
```bash
npm start
```
- Aplikasi akan berjalan di `http://localhost:3000`.

### 4. **Jalankan Telegram Bot**:
- Pastikan kamu sudah mendapatkan **API Token** dari [@BotFather](https://core.telegram.org/bots#botfather) di Telegram.
- Setel token bot di **`bot.js`** dan jalankan bot dengan perintah:
```bash
node bot.js
```

### 5. **Gunakan Aplikasi**:
- Akses aplikasi web di `http://localhost:3000` untuk upload gambar.
- Gunakan **Telegram Bot** untuk meng-upload gambar ke bot dan menghapus latar belakang gambar secara otomatis.

## Struktur Direktori

```
/project-root
├── public/
│   ├── logo.jpg          # Logo aplikasi
│   ├── style.css         # CSS untuk styling aplikasi
├── results/              # Tempat penyimpanan hasil gambar tanpa latar belakang
├── uploads/              # Tempat penyimpanan file sementara yang di-upload
├── views/
│   ├── failed.html       # Halaman ketika proses gagal
│   ├── index.html        # Halaman utama untuk upload gambar
│   ├── preview.html      # Halaman preview gambar hasil
├── .env.example          # Contoh file environment variables (API Token Telegram, dll)
├── bot.js                # Skrip untuk menjalankan Telegram Bot
├── remove.py             # Skrip Python untuk menghapus latar belakang gambar
├── server.js             # File server utama untuk backend dengan Express
├── package.json          # File konfigurasi Node.js
└── README.md             # Dokumen ini
```

## Kontribusi
Jika kamu ingin berkontribusi, silakan buka **issue** atau buat **pull request**. Kami sangat menghargai kontribusi dari komunitas!

## Lisensi
Proyek ini dilisensikan di bawah **MIT License**. Lihat file [MIT License](./LICENSE) untuk detail lebih lanjut.

## Credits
- [rembg](https://github.com/danielgatis/rembg) - Library Python untuk menghapus latar belakang gambar.
- [Express](https://expressjs.com/) - Framework Node.js untuk membangun server.
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - API untuk berinteraksi dengan Telegram Bot.

**Terima kasih telah menggunakan aplikasi kami! 😊**
