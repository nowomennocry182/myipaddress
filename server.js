const express = require('express');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // untuk memanggil API eksternal
const app = express();
const PORT = 3000;

// Lokasi file ip.txt
const ipFilePath = path.join(__dirname, 'ip.txt');

// Fungsi untuk memeriksa apakah IP sudah ada dan menyimpan jika belum
function checkAndSaveIp(ip, res) {
  fs.readFile(ipFilePath, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      return res.json({ message: 'Error reading IP file' });
    }
    const ipList = data ? data.split('\n') : [];
    if (ipList.includes(ip)) {
      return res.json({ message: 'IP already used' });
    } else {
      ipList.push(ip);
      fs.writeFile(ipFilePath, ipList.join('\n'), (err) => {
        if (err) {
          return res.json({ message: 'Error saving IP' });
        }
        return res.json({ message: 'IP saved successfully' });
      });
    }
  });
}

// Endpoint untuk mendapatkan IP dari API eksternal dan memeriksa daftar IP
app.get('/check-ip', async (req, res) => {
  try {
    // Ambil IP pengguna dari API eksternal
    const response = await axios.get('https://api.ipify.org?format=json');
    const userIp = response.data.ip;

    // Panggil fungsi untuk memeriksa dan menyimpan IP
    checkAndSaveIp(userIp, res);
  } catch (error) {
    res.json({ message: 'Error fetching IP from external API' });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
