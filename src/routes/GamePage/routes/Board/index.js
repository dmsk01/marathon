import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import PokemonCard from "../../../../components/PokemonCard";
import Result from "../../../../components/Result";
import ArrowChoice from "../../../../components/ArrowChoice";
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
  const [type, setType] = useState(null);
  const [turn, setTurn] = useState(0);
  const [isStopped, setStopped] = useState(false);

  const history = useHistory();

  if (Object.keys(pokemons).length === 0) {
    history.replace("/game");
  }

  const handlerClickBoardPlate = async (position) => {
    if (chosenCard) {
      setTurn(turn === 1 ? 2 : 1);
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

      setChosenCard(null);
    }
  };

  // const handleChosenCard = (card,turn,player) => {
  //   if (turn !== player) {
  //     return
  //   }
  //     setChosenCard(card)
  // }

  const randomTurn = () => {
    const player = Math.random().toFixed(1) > 0.5 ? 1 : 2;
    setTimeout(() => {
      switch (player) {
        case 1:
          setTurn(1);
          break;
        case 2:
          setTurn(2);
          break;
        default:
          setTurn(0);
      }
      setStopped(true);
    }, 2000);
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

    randomTurn();
  }, []);

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        pokemonsContext.onWin("win");
        setType("win");
      } else if (count1 < count2) {
        pokemonsContext.onWin("lose");
        setType("lose");
      } else if (count1 === count2) {
        pokemonsContext.onWin("draw");
        setType("draw");
      }

      setTimeout(() => {
        history.replace("/game/finish");
      }, 2000);
    }
  }, [steps]);

  return (
    <div className={s.root}>
      {type && <Result type={type} />}
      <ArrowChoice side={turn} stop={isStopped} />
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => {
            turn === 1 && setChosenCard(card);
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
            turn === 2 && setChosenCard(card);
          }}
        />
      </div>
    </div>
  );
};

export default BoardPage;
