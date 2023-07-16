import { useState, useEffect } from "react";
import Box from "../box/box";
import "./board.css";
import axios from "axios";


const Board =  ({gameID, setGameStart}) => {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [playerX, setPlayerX] = useState(true);
  const [moves, setMoves] = useState(0);
  const [stopGame, setStopGame] = useState(false);
  const [gameInfo, setGameInfo] = useState(null);

  const win_condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  useEffect( () => {
    const fetchData = async () =>{
      const response = await axios.get(`http://35.241.100.73/api/${gameID}`);

      setGameInfo(response.data);
    }

    fetchData();
  }, [gameID])

  const boxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) =>{
      if(idx === boxIdx) return playerX === true ? "X" : "O";
      else return value
    })

    checkWin(updatedBoard);

    setBoard(updatedBoard);

    setPlayerX(!playerX);

    setMoves(moves + 1);
  }

  const checkWin = (board) => {
    for(let i = 0; i < win_condition.length; i++){
      const [a, b, c] = win_condition[i];

      if(board[a] && board[a] === board[b] && board[b] === board[c]){
        console.log(board[a]);
        setStopGame(true);

        const status = board[a] === "X" ? {player1wins: gameInfo.player1wins + 1} : {player2wins: gameInfo.player2wins + 1};


        setGameInfo({...gameInfo, ...status});
        updateData(status);
        return board[a];
      }
      else if(moves === 8){
        console.log("DRAW");
        setStopGame(true);

        setGameInfo({...gameInfo, draw: gameInfo.draw + 1});
        updateData({draw: gameInfo.draw + 1});
        return moves;
      }
    }
  }

  const updateData = (data) => {

    console.log(data)
    axios.put(`http://35.241.100.73/api/${gameID}`, {
    ...gameInfo, ...data
    }).then((response) => 
      console.log(response)
    ).catch(er => console.log(er));
  }

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setStopGame(false);
    setMoves(0);
  }

  if(gameInfo)
  return(
    <>
      {gameInfo.player1} <span className="x">X</span> - {gameInfo.player1wins}&nbsp; | &nbsp;
      {gameInfo.player2}  <span className="o">O</span>  - {gameInfo.player2wins}<br />
      Draw - {gameInfo.draw}

      <div className="board">
      
        {board.map((value, idx) => {
          return <Box disabled={stopGame} key={idx} value={value} onClick={() => boxClick(idx)} />
        })}
      </div>


        {stopGame && <div><button onClick={() => setGameStart(false)}>Stop</button><button onClick={restartGame}>Continue</button>      </div>}
  
    </>
  );
  else return <h1>Game Loading...</h1>
}

export default  Board;