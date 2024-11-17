<?php
// File ip.txt tempat menyimpan daftar IP
$file = 'ip.txt';

// Mengecek jika data IP dikirimkan via POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ip'])) {
    $ip = $_POST['ip'];

    // Mengecek apakah file ip.txt sudah ada
    if (!file_exists($file)) {
        // Jika file tidak ada, buat file kosong
        file_put_contents($file, "");
    }

    // Membaca semua IP yang ada di file ip.txt
    $existingIps = file_get_contents($file);

    // Mengecek apakah IP sudah ada di dalam file
    if (strpos($existingIps, $ip) !== false) {
        echo 'IP sudah digunakan';
    } else {
        // Jika IP belum ada, simpan ke dalam file
        file_put_contents($file, $ip . PHP_EOL, FILE_APPEND);
        echo 'IP berhasil disimpan';
    }
} else {
    echo 'Tidak ada IP yang diterima';
}
?>