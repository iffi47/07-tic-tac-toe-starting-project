import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import { useState } from "react"

function deriveActivePlayer (gameTurn){
  let currentPlayer= 'X'
    if(gameTurn.length>0 && gameTurn[0].player==='X'){
      currentPlayer='O'
    }
    return currentPlayer
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare (rowIndex,colIndex) {
    // setActivePlayer((currentSelectedPlayer) => currentSelectedPlayer==='X' ? 'O' : 'X');
    setGameTurns(prevTurn => {
      let currentPlayer= 'X'
      if(prevTurn.length>0 && prevTurn[0].player==='X'){
        currentPlayer='O'
      }
      const updatedTurns = [{square:{row: rowIndex, col: colIndex}, player:activePlayer},...prevTurn];
      return updatedTurns
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
