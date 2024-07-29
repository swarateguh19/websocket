# websocket TICTACTOE
implementasi websocket realtime di game sederhana tictactoe
=========================================================
install websocket pada folder game ( npm install ws)
buat package.json (npm init -y)

========================================================
pada file server. js:

const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

*untuk impor modul websocekt (ws) dan server berjalan pada port 8080*

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

