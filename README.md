# Tugas Praktik 3: Pemesanan Bahan Ajar SITTA (Vue Component & Template)

Aplikasi ini merupakan *refactoring* dari Tugas Praktik 2 dengan menerapkan arsitektur **Vue Component**, **Vue Template**, dan *fetching* data JSON eksternal menggunakan Vue.js versi murni (Vanilla).

## Cara Menjalankan Aplikasi (Menghindari CORS Error)

Berhubung aplikasi ini melakukan *fetching* data secara asinkron (menggunakan fungsi `fetch()`) ke file lokal `data/dataBahanAjar.json`, Anda **tidak bisa** menjalankan aplikasi ini dengan sekadar melakukan *double-click* pada file `index.html`. 

Jika Anda membukanya secara langsung melalui *file protocol* (`file:///C:/.../index.html`), *browser* secara otomatis akan memblokir *request* pengambilan data tersebut dengan alasan keamanan, yang disebut sebagai **CORS Error** (Cross-Origin Resource Sharing). Akibatnya, layar akan terus memunculkan status "Gagal Memuat Data".

Untuk menjalankan aplikasi ini secara normal dan memuat data JSON-nya, Anda **wajib** menggunakan *local server*. Berikut adalah dua opsi termudahnya:

### Opsi 1: Menggunakan Ekstensi "Live Server" di VSCode (Sangat Disarankan)
1. Buka folder `tugas3-vue-ut` ini di dalam aplikasi **Visual Studio Code (VSCode)**.
2. Pastikan Anda telah menginstal ekstensi bernama **"Live Server"** (oleh Ritwick Dey) di VSCode.
3. Klik kanan pada file `index.html`.
4. Pilih opsi **"Open with Live Server"**.
5. *Browser* akan terbuka secara otomatis di alamat lokal seperti `http://127.0.0.1:5500/index.html` dan data bahan ajar akan sukses dimuat.

### Opsi 2: Menggunakan Python Lokal (Jika Python sudah terinstal di PC Anda)
1. Buka Terminal / *Command Prompt* Anda.
2. Masuk ke dalam direktori `tugas3-vue-ut` (contoh: `cd tugas3-vue-ut`).
3. Jalankan perintah `python -m http.server 8000`.
4. Buka *browser* dan akses alamat `http://localhost:8000`.

---
*Aplikasi ini mencakup fitur filter, sort, CRUD stok, serta form pembuatan dan tracking Delivery Order (DO) otomatis secara penuh tanpa perlu memproses instalasi build tools / NPM.*
