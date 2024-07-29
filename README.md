# REALTIME TIC-TAC-TOE 
## _Implementasi WebSocket koneksi Realtime Game Tic Tac Toe,

hai aku hera, jadi di project ini adalah project akhir dari matkul Pemrograman Jaringan. Pada project ini
aku membuat game Tic Tac Toe dengan mengunakan WebSocket. Game ini masih sederhana dan bisa dikembangkan lagi.
ada beberapa part yang perlu disiapkan yaitu :

- NodeJs, download di Nodejs.org dan install
- Buat folder game dan tambahkan library WebSocket (npm install ws)
- Tambahkan juga file package.json (npm init -y)
- untuk frontend tambahkan <https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css> pada index.html

## Fitur yang ada

- login dengan nama 
- dapat menampilkan nama lawan dan skor yang dimiliki
- respon cepat RealTime

## Software / Hardware

Project game ini dibuat dengan menggunakan :

- Visual Code
- NodeJs
- TailWindCss
- Laptop biasa

## Catatan Penting Implementasi

Koneksi Websocket ada pada file server.js dan game.js

pada server.js, ini digunakan untuk impor modul websocekt (ws) dan server berjalan pada port 8080
```sh
const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });
```

Untuk variabel awal...

```sh
let players = [];
let board = Array(9).fill(null);
let currentPlayer = "X";
let scores = { X: 0, O: 0 };

function resetGame() {
board = Array(9).fill(null);
currentPlayer = "X";
players.forEach((player) => {
player.ws.send(JSON.stringify({ type: "reset", scores }));
});
}
```

pada game.js ini untuk koneksi awal websoket dan variabel awal, player, myTurn, playerName, opponentName,
scores: Variabel untuk menyimpan informasi tentang pemain, giliran, nama pemain, nama lawan, dan skor.

```sh
const ws = new WebSocket("ws://ketik alamat ip perangkatmu:8080");
let player = null;
let myTurn = false;
let playerName = "";
let opponentName = "";
let scores = { X: 0, O: 0 };
```

buat event listener untuk tombol login dan ambil nama pemain dari input lalu kirim pesan login ke server websocket.
Setelah itu sembunyikan login dan menampilkan board game.

```sh
document.getElementById("loginButton").addEventListener("click", () => {
playerName = document.getElementById("name").value;
if (playerName) {
console.log("Sending login message:", playerName);
ws.send(JSON.stringify({ type: "login", name: playerName }));
document.getElementById("login").classList.add("hidden");
document.getElementById("gameContainer").classList.remove("hidden");
}
});
```

## Cara Mainkan Game

mau langsung mainkan juga bisa dengan teman-teman kalian atau dengan siapapun, asalkan dalam satu jaringan yang sama.
berikut cara mainkannya :
- download file dari repositori ini
- setelah itu ekstrak seperti biasa terserah mau ditaruh dimana :D
- buka file tersebut dengan Visual Code
- setelah terbuka, kalian buka cmd windows dapat kombinasi tombol windows + r lalu ketik cmd
- ketik ipconfig dan lihat berapa ip perangkat
- setelah itu copy ip tadi dan buka file game.js
pada bagian awal ada  :
```sh
const ws = new WebSocket("ws://<alamat-ip-lokal>:8080"); // Ganti <alamat-ip-lokal> dengan alamat IP tadi
```
- jika sudah, buka terminal pada Visual Code dan pastikan sudah didalam direktori folder project
- ketikkan berikut :
```sh
node server.js
```
- jika sudah, buka folder project dan klik 2x pada index.html
- sip, kalian sudah bisa main berdua dengan teman kalian.
