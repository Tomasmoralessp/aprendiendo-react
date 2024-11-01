import { useState, useEffect} from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square"
import { TURNS } from "../constants" 
import { checkWinner, checkEndGame } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js"

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromstorage = window.localStorage.getItem('turn')
    return turnFromstorage ?? TURNS.X
  }) 
  // Null significa no ganador, false empate
  const [winner, setWinner] = useState(null) 
  
  // Reiniciar los estados a sus estados inciales
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  


  const updateBoard = (index) => {
    // si hay algo en el board no actualizamos la posición o hay un ganador
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    
    // si modificas el estado directamente pueden existir problemas de renderizado
    // los datos del nuevo renderizado siempre deben ser nuevos
    // esto está mal
    // board[index] = turn
    // setBoard(board)


    // Actualizar el tablero
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Guardar aqui partida
    saveGameToStorage({board: newBoard, turn: newTurn})

    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) { 
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic tac Toe ⏱️</h1>
      <button onClick={resetGame}> Reset Game </button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}> {TURNS.X} </Square>
        <Square isSelected={turn === TURNS.O}> {TURNS.O} </Square>
      </section>

      <section>
      <WinnerModal resetGame={resetGame} winner={winner}/>
      </section>
    </main>
  )
}

export default App
