# websocket TICTACTOE
implementasi websocket realtime di game sederhana tictactoe
By :Hera

# PART YANG DIPERLUKAN
1. Install NodeJS ada pada website Nodejs.org
2. tambahkan library websocket (ws) pada folder project (npm install ws)
3. tambahkan package.json (npm init -y)
4. untuk frontend tambahkan <https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css> pada index.html

beberapa catatan penting pada implementasi websocket pada file game.js dan server.js

# server.js

*untuk impor modul websocekt (ws) dan server berjalan pada port 8080*<br>

const WebSocket = require("ws");<br>
const server = new WebSocket.Server({ port: 8080 });<br>

*untuk variabel awal*<br>
let players = [];<br>
let board = Array(9).fill(null);<br>
let currentPlayer = "X";<br>
let scores = { X: 0, O: 0 };<br>

function resetGame() {<br>
  board = Array(9).fill(null);<br>
  currentPlayer = "X";<br>
  players.forEach((player) => {<br>
    player.ws.send(JSON.stringify({ type: "reset", scores }));<br>
  });<br>
}<br>

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




