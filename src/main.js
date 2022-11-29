playerTurn = true

function clicked(event) {
  let button = event.originalTarget;

  if (button.textContent !== 'X' && button.textContent !== 'O') {
    button.textContent = playerTurn ? 'X' : 'O'
    checkWinner()
    playerTurn = !playerTurn
  }
}

function checkWinner() {
  let board = document.getElementById("board").querySelectorAll(".p-4")
  // console.log(board)
  let states = []

  for (let i = 0; i < 3; i++) {
    states.push([])
    for (let j = 0; j < 3; j++) {
      let button = board[i * 3 + j];
      if (button.textContent == 'X') {
        states[i].push(1)
      } else if (button.textContent == 'O') {
        states[i].push(0)
      } else {
        states[i].push(-1)
      }
    }
  }

  // console.log(states)
  // TODO: replace alerts with function to wipe board and announce winner

  for (let i = 0; i < 3; i++) {
    if (checkLine(states[i])) {
      alert(`Player ${states[i][0]}`);
    }

    if (checkLine([states[0][i], states[1][i], states[2][i]])) {
      alert(`Player ${states[0][i]}`);
    }
  }

  if (checkLine([states[0][0], states[1][1], states[2][2]])) {
    alert(`Player ${states[0][0]}`);
  }

  if (checkLine([states[0][2], states[1][1], states[2][0]])) {
    alert(`Player ${states[0][2]}`);
  }
}

function checkLine(line) {
  return line[0] !== -1 && line[0] === line[1] && line[1] === line[2]
}

const buttons = document.querySelectorAll('button');

for (const button of buttons) {
  button.addEventListener('click', clicked);
}
