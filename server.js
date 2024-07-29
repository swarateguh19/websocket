const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

let players = [];
let board = Array(9).fill(null);
let currentPlayer = "X"; // Pemain pertama yang akan mulai

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X"; // Reset ke pemain pertama
  players.forEach((player) => {
    player.send(JSON.stringify({ type: "reset" }));
  });
}

function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some((combination) => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

server.on("connection", (ws) => {
  if (players.length < 2) {
    players.push(ws);
    ws.send(
      JSON.stringify({
        type: "start",
        player: players.length === 1 ? "X" : "O",
      })
    );

    if (players.length === 2) {
      players.forEach((player) => {
        player.send(JSON.stringify({ type: "ready" }));
      });
    }

    ws.on("message", (message) => {
      const data = JSON.parse(message);
      if (
        data.type === "move" &&
        board[data.index] === null &&
        data.player === currentPlayer
      ) {
        board[data.index] = data.player;
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Ganti pemain setelah setiap gerakan

        players.forEach((player) => {
          player.send(JSON.stringify({ type: "update", board, currentPlayer }));
        });

        if (checkWinner(board)) {
          players.forEach((player) => {
            player.send(JSON.stringify({ type: "win", player: data.player }));
          });
          setTimeout(resetGame, 5000);
        } else if (board.every((cell) => cell !== null)) {
          players.forEach((player) => {
            player.send(JSON.stringify({ type: "draw" }));
          });
          setTimeout(resetGame, 5000);
        }
      }
    });

    ws.on("close", () => {
      players = players.filter((player) => player !== ws);
      if (players.length < 2) {
        resetGame();
      }
    });
  } else {
    ws.send(JSON.stringify({ type: "full" }));
    ws.close();
  }
});

console.log("WebSocket server is running on ws://localhost:8080");
