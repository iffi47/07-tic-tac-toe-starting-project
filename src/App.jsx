import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import Player from "./components/Player"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";


const initialGameBoard = [
 [null, null, null],
 [null, null, null],
 [null, null, null],
];
function deriveActivePlayer (gameTurn){
  let currentPlayer= 'X'
    if(gameTurn.length>0 && gameTurn[0].player==='X'){
      currentPlayer='O'
    }
    return currentPlayer
}

function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [players, setPlayers] = useState({
    'X': "Player 1",
    'O': "Player 2"
  });
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard= [...initialGameBoard.map(array=>[...array])];
  let winner= ""
  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col]= player
  }
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column]
    if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner= players[firstSquareSymbol]
    }
  }
  const hasDraw = gameTurns.length===9 && !winner;
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
  function onRematchClick() {
    setGameTurns([])
  }
  function handlePlayerName (symbol, newName ) {
    setPlayers((oldPlayer) => {
      return{
        ...oldPlayer,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerName}/>
          <Player name="Player 2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerName}/>
        </ol>
       {(winner  || hasDraw) && <GameOver restart={onRematchClick} winner={winner} />}
       <GameBoard onSelectSquare={handleSelectSquare} boards={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main> 
  )
}

export default App
