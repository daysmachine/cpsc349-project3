let playerTurn = true

function clicked (event) {
  const button = event.originalTarget

  if (button.textContent !== 'X' && button.textContent !== 'O') {
    button.textContent = playerTurn ? 'X' : 'O'
    playerTurn = !playerTurn
    checkWinner()
  }
}

function checkWinner () {
  const board = document.getElementById('board').querySelectorAll('.p-4')
  const states = []

  for (let i = 0; i < 3; i++) {
    states.push([])
    for (let j = 0; j < 3; j++) {
      const button = board[i * 3 + j]
      if (button.textContent === 'X') {
        states[i].push(1)
      } else if (button.textContent === 'O') {
        states[i].push(0)
      } else {
        states[i].push(-1)
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (checkLine(states[i])) {
      endGame(states[i][0])
      return
    }

    if (checkLine([states[0][i], states[1][i], states[2][i]])) {
      endGame(states[0][i])
      return
    }
  }

  if (checkLine([states[0][0], states[1][1], states[2][2]])) {
    endGame(states[0][0])
    return
  }

  if (checkLine([states[0][2], states[1][1], states[2][0]])) {
    endGame(states[0][2])
    return
  }

  console.log(states)
  if (!states.some(row => row.includes(-1))) {
    alert("Cat's game! No one wins")
    clearBoard()
  }
}

function checkLine (line) {
  return line[0] !== -1 && line[0] === line[1] && line[1] === line[2]
}

function endGame (winner) {
  alert(`Player ${winner} wins`)
  clearBoard()
}

function clearBoard () {
  const board = document.getElementById('board').querySelectorAll('.p-4')
  board.forEach(s => { s.textContent = '' })
}

const buttons = document.querySelectorAll('button')

for (const button of buttons) {
  button.addEventListener('click', clicked)
}
