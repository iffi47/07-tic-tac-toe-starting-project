import { useState } from "react";

const initialGameBoard = [
 [null, null, null],
 [null, null, null],
 [null, null, null],
];

export default function GameBoard({onSelectSquare, turns}) {
  let gameBoard= initialGameBoard;
  for(const turn of turns){
    const {square, player} = turn;
    const {row, col} = square;
    gameBoard[row][col]= player
  }
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);
  // const handleSelectSquare = (rowIndex, colIndex) =>{
  //   setGameBoard((prevGameBoard) =>{
  //     let updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updateBoard[rowIndex][colIndex]= activePlayerSymbol;
  //     return updateBoard;
  //   });
  //   onSelectSquare();
  // }
 return (
  <>
   <ol id="game-board">
    {gameBoard.map((row, rowIndex) => (
     <li key={rowIndex}>
      <ol>
       {row.map((col, colIndex) => (
        <li key={colIndex}>
         <button disabled={col!==null} onClick={() => onSelectSquare(rowIndex, colIndex)} >{col}</button>
        </li>
       ))}
      </ol>
     </li>
    ))}
   </ol>
  </>
 );
}
