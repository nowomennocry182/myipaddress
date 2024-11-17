from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Path file ip.txt
ip_file_path = "ip.txt"

# Fungsi untuk mengecek dan menambahkan IP ke dalam file
def check_and_add_ip(ip_address):
    # Baca daftar IP yang sudah ada
    if not os.path.exists(ip_file_path):
        open(ip_file_path, "w").close()  # Buat file jika belum ada

    with open(ip_file_path, "r") as file:
        ip_list = file.read().splitlines()

    # Cek apakah IP sudah ada dalam daftar
    if ip_address in ip_list:
        return "IP telah digunakan"
    else:
        # Tambahkan IP baru dengan keterangan
        with open(ip_file_path, "a") as file:
            file.write(f"{ip_address} - IP belum digunakan\n")
        return "IP belum digunakan"

@app.route('/get_ip_status', methods=['GET'])
def get_ip_status():
    ip_address = request.remote_addr  # Mendapatkan IP pengguna
    status = check_and_add_ip(ip_address)
    return jsonify({"ip": ip_address, "status": status})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
