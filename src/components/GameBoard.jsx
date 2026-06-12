import { useState } from "react";


export default function GameBoard({onSelectSquare, boards}) {

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
    {boards.map((row, rowIndex) => (
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
