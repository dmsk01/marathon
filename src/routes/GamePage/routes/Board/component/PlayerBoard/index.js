import { useState } from "react";
import cn from "classnames";

import PokemonCard from "../../../../../../components/PokemonCard";

import styles from "./style.module.css";

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null);
  return (
    <>
      {cards.map((item) => (
        <div
          key={item.id}
          className={cn(styles.cardBoard, { [styles.selected]: isSelected === item.id })}
          onClick={() => {
            setSelected(item.id);
            onClickCard && onClickCard({ player, ...item });
          }}
        >
          <PokemonCard key={item.id} name={item.name} img={item.img} id={item.id} type={item.type} values={item.values} active minimize />
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
