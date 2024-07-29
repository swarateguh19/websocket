const ws = new WebSocket("ws://192.168.12.221:8080"); // Ganti <alamat-ip-lokal> dengan alamat IP lokal server
let player = null;
let myTurn = false;

ws.onmessage = (message) => {
  const data = JSON.parse(message.data);
  switch (data.type) {
    case "start":
      player = data.player;
      alert(`You are player ${player}`);
      break;
    case "ready":
      myTurn = player === "X";
      break;
    case "update":
      updateBoard(data.board);
      myTurn = data.currentPlayer === player;
      break;
    case "win":
      alert(`Player ${data.player} wins!`);
      resetBoard();
      break;
    case "draw":
      alert("The game is a draw!");
      resetBoard();
      break;
    case "reset":
      resetBoard();
      break;
    case "full":
      alert("The game is full. Please try again later.");
      break;
  }
};

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", () => {
    const index = cell.getAttribute("data-index");
    if (myTurn && !cell.textContent) {
      ws.send(JSON.stringify({ type: "move", index, player }));
      myTurn = false;
    }
  });
});

function updateBoard(board) {
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function resetBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
  });
  myTurn = player === "X";
}
