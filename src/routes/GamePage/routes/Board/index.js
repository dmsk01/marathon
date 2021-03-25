import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "../../../../components/PokemonCard";
import { PokemonContext } from "../../../../context/pokemonContext";
import PlayerBoard from "./component/PlayerBoard";
import s from "./style.module.css";

// Player points counter func =====
const counterWin = (board, player1, player2) => {
  let player1CountCards = player1.length;
  let player2CountCards = player2.length;

  board.forEach((item) => {
    if (item.card.possession === "tomato") {
      player2CountCards++;
    }

    if (item.card.possession === "lightblue") {
      player1CountCards++;
    }
  });

  return [player1CountCards, player2CountCards];
};

// BoardPage component =====
const BoardPage = () => {
  const { pokemons } = useContext(PokemonContext);
  const pokemonsContext = useContext(PokemonContext);

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(pokemons).map((item) => ({
      ...item,
      possession: "lightblue",
    }));
  });
  const [player2, setPlayer2] = useState([]);
  const [chosenCard, setChosenCard] = useState(null);
  const [steps, setSteps] = useState(0);

  const history = useHistory();

  if (Object.keys(pokemons).length === 0) {
    history.replace("/game");
  }

  const handlerClickBoardPlate = async (position) => {
    if (chosenCard) {
      const params = {
        position,
        card: chosenCard,
        board,
      };

      const res = await fetch("https://reactmarathon-api.netlify.app/api/players-turn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const request = await res.json();

      setBoard(request.data);

      if (chosenCard.player === 1) {
        setPlayer1((prevState) => prevState.filter((item) => item.id !== chosenCard.id));
      }

      if (chosenCard.player === 2) {
        setPlayer2((prevState) => prevState.filter((item) => item.id !== chosenCard.id));
      }

      setSteps((prevState) => prevState + 1);
    }
  };

  useEffect(async () => {
    const boardResponse = await fetch("https://reactmarathon-api.netlify.app/api/board");
    const boardRequest = await boardResponse.json();

    setBoard(boardRequest.data);

    const player2Response = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
    const player2Request = await player2Response.json();

    setPlayer2(() => {
      return player2Request.data.map((item) => ({
        ...item,
        possession: "tomato",
      }));
    });

    let secondPlayerCards = player2Request.data.reduce(function (acc, cur, i) {
      acc[i] = cur;
      return acc;
    }, {});

    pokemonsContext.onReceivePokemons(secondPlayerCards);
  }, []);

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert("WIN");
      } else if (count1 < count2) {
        alert("LOSE");
      } else if (count1 === count2) {
        alert("DRAW");
      }
      setTimeout(() => {
        history.replace("/game/finish");
      }, 1000);
    }
  }, [steps]);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => {
            setChosenCard(card);
          }}
        />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div
            key={item.position}
            className={s.boardPlate}
            onClick={() => {
              !item.card && handlerClickBoardPlate(item.position);
            }}
          >
            {item.card && <PokemonCard {...item.card} active minimize />}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => {
            setChosenCard(card);
          }}
        />
      </div>
    </div>
  );
};

export default BoardPage;
