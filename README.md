# REALTIME TIC-TAC-TOE 
## _Implementasi WebSocket koneksi Realtime Game Tic Tac Toe, Ever_

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
# game.js

*untuk koneksi awal websoket dan variabel awal, player, myTurn, playerName, opponentName, <br>
scores: Variabel untuk menyimpan informasi tentang pemain, giliran, nama pemain, nama lawan, dan skor.*<br>

const ws = new WebSocket("ws://*ketik alamat ip perangkatmu*:8080");<br>
let player = null;<br>
let myTurn = false;<br>
let playerName = "";<br>
let opponentName = "";<br>
let scores = { X: 0, O: 0 };<br>

*buat event listener untuk tombol login dan ambil nama pemain dari input lalu<br>
kirim pesan login ke server websocket. Setelah itu sembunyikan login dan menampilkan board game.<br>*

<br>
document.getElementById("loginButton").addEventListener("click", () => {<br>
  playerName = document.getElementById("name").value;<br>
  if (playerName) {<br>
    console.log("Sending login message:", playerName);<br>
    ws.send(JSON.stringify({ type: "login", name: playerName }));<br>
    document.getElementById("login").classList.add("hidden");<br>
    document.getElementById("gameContainer").classList.remove("hidden");<br>
  }<br>
});<br>




