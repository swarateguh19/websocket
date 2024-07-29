# websocket TICTACTOE
implementasi websocket realtime di game sederhana tictactoe
By :Hera

# PART YANG DIPERLUKAN
1. Install NodeJS ada pada website Nodejs.org
2. tambahkan library websocket (ws) pada folder project (npm install ws)
3. tambahkan package.json (npm init -y)
4. untuk frontend tambahkan <https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css> pada index.html

# beberapa catatan penting pada implementasi websocket pada file game.js dan server.js

*server.js*

*untuk impor modul websocekt (ws) dan server berjalan pada port 8080*<br>

const WebSocket = require("ws");<br>
const server = new WebSocket.Server({ port: 8080 });<br>

*untuk variabel awal*
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

*game.js*

*untuk koneksi awal websoket dan variabel awal, player, myTurn, playerName, opponentName, 
scores: Variabel untuk menyimpan informasi tentang pemain, giliran, nama pemain, nama lawan, dan skor.*
const ws = new WebSocket("ws://*ketik alamat ip perangkatmu*:8080");
let player = null;
let myTurn = false;
let playerName = "";
let opponentName = "";
let scores = { X: 0, O: 0 };

# ============================================================================================================ #


