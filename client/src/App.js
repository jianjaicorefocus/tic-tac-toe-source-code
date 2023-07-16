import { useState } from "react";
import Board from "./components/board/board";
import "./style.css";
import axios from "axios";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [gameID, setGameID] = useState(null);
  const [history, setHistory] = useState([]);

  const initializeGame = () => {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game-prep").style.display = "block";

    document.getElementById("player1name").value = "";
    document.getElementById("player2name").value = "";
  };

  const initializeMain = () => {
    document.getElementById("mainmenu").style.display = "block";
    document.getElementById("game-prep").style.display = "none";
    document.getElementById("history").style.display = "none";

    setGameID(null);
  };

  const initializeHistory = async () => {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("history").style.display = "block";

    const response = await axios.get("http://35.241.100.73/api/", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });

    setHistory(response.data);
  };

  const startGame = (e) => {
    axios
      .post("http://35.241.100.73/api/create-game", {
        player1: document.getElementById("player1name").value,
        player2: document.getElementById("player2name").value,
      })
      .then((response) => {
        console.log(response.data);

        setGameID(response.data.gameid);
        setGameStart(true);
      })
      .catch((er) => console.log(er));

    e.preventDefault();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  if (gameStart) return <Board gameID={gameID} setGameStart={setGameStart} />;
  else
    return (
      <div className="App">
        <h1>Tic-Tac-Toe</h1>

        <div id="mainmenu" className="card">
          <div>
            <button onClick={initializeGame}>Start New Game</button> <br />
            <button onClick={initializeHistory}>History</button>
          </div>
          <p className="card-footer">Created by Jian Jaico Cajita</p>
        </div>

        <div id="history" className="card">
          <h3>Last 10 Games</h3>

          {history.map((value, idx) => {
            return (
              <p key={idx}>
                {value.player1} ({value.player1wins}) vs. {value.player2} (
                {value.player2wins}) <br />{" "}
                <span className="date-format">
                  {" "}
                  {formatDate(new Date(value.date_created))}
                </span>
              </p>
            );
          })}

          <button onClick={initializeMain}>Back</button>
        </div>

        <div id="game-prep" className="card">
          <form onSubmit={startGame}>
            <div>
              Player 1 &nbsp;
              <input required id="player1name" type="text" />
              <span className="x"> X </span>
              <br />
              Player 2 &nbsp;
              <input required id="player2name" type="text" />
              <span className="o"> O </span>
            </div>
            <br />

            <button type="submit">Start</button>
          </form>
          <br />
          <button onClick={initializeMain}>Back</button>
        </div>
      </div>
    );
}

export default App;
