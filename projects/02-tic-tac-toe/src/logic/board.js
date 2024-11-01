import { WINNER_COMBOS } from "../../constants"

export const checkWinner = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] &&
      boardToCheck[a] == boardToCheck[b] && 
      boardToCheck[a] == boardToCheck[c]
    ) { 
      return boardToCheck[a] // x u o
    }
  }
  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // Revisamos si hay un empate
  // si no hay más espacios vacíos en el tablero

  // newBoard = ['x', null, null, 'o', null, null, null, null,null]
  return newBoard.every((square) => square != null)
}