/* global localStorage */

let playerTurn = true

function clicked (event) {
  const button = event.target

  if (button.textContent !== 'X' && button.textContent !== 'O') {
    button.textContent = playerTurn ? 'X' : 'O'
    playerTurn = !playerTurn
    // playerTurn
    localStorage.__PLAYERTURN__ = playerTurn
    checkWinner()
  }
}
function checkWinner () {
  const board = document.getElementById('board').querySelectorAll('.tic-tac-toe-tile')
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

  localStorage.__GAMESTATES__ = states.join(',')

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

  if (!states.some(row => row.includes(-1))) {
    window.alert("Cat's game! No one wins")
    clearBoard()
  }
}

function checkLine (line) {
  return line[0] !== -1 && line[0] === line[1] && line[1] === line[2]
}

function enableBoard (bool) {
  const buttons = document.getElementById('board').querySelectorAll('.tic-tac-toe-tile')
  for (const button of buttons) {
    button.disabled = !bool
  }
}

// clear
function clearBoard () {
  const board = document.getElementById('board').querySelectorAll('.tic-tac-toe-tile')
  board.forEach(s => { s.textContent = '' })
  // clear storage
  localStorage.__GAMESTATES__ = ''
  localStorage.__PLAYERTURN__ = ''
}
function startGame () {
  enableBoard(true)
}

function endGame (winner) {
  window.alert(`Player ${winner} wins`)
  clearBoard()
  enableBoard(false)
}

// reset
function resetGame () {
  clearBoard()
  enableBoard(true)
}

const buttons = document.getElementById('board').querySelectorAll('.tic-tac-toe-tile')

for (const button of buttons) {
  button.addEventListener('click', clicked)
  button.disabled = true
}

const start = document.getElementById('start')
const reset = document.getElementById('reset')

start.addEventListener('click', startGame)
reset.addEventListener('click', resetGame)

// determine whether should restore the game status when reopen/refresh the web browser
if (localStorage.__GAMESTATES__ && localStorage.__PLAYERTURN__) {
  playerTurn = JSON.parse(localStorage.__PLAYERTURN__)

  let gameStates = localStorage.__GAMESTATES__
  gameStates = gameStates.split(',')

  const buttons = document.getElementsByClassName('tic-tac-toe-tile')

  for (let i = 0; i < gameStates.length; i++) {
    if (Number(gameStates[i]) === 1) {
      buttons[i].textContent = 'X'
    } else if (Number(gameStates[i]) === 0) {
      buttons[i].textContent = 'O'
    }
  }
  startGame()
}
