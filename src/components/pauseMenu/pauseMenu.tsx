import * as React from "react";
import { useGameStore } from "store";

import sword from "assets/swords/1.png";
import sword2 from "assets/swords/2.png";
import sword3 from "assets/swords/3.png";
import sword4 from "assets/swords/4.png";
import sword5 from "assets/swords/5.png";
import sword6 from "assets/swords/6.png";
import sword7 from "assets/swords/7.png";
import sword8 from "assets/swords/8.png";
import sword9 from "assets/swords/9.png";
import sword10 from "assets/swords/10.png";
import sword11 from "assets/swords/11.png";
import sword12 from "assets/swords/12.png";

import styles from "./styles.module.scss";
import { navigate } from "utils";

export const PauseMenu = () => {
  const { isPaused, setIsPaused, game } = useGameStore();

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isPaused) {
          setIsPaused(false);
          game?.scene.launch("MainGame");
        } else {
          setIsPaused(true);
          game?.scene.pause();
        }
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  });

  const swords = [
    sword,
    sword2,
    sword3,
    sword4,
    sword5,
    sword6,
    sword7,
    sword8,
    sword9,
    sword10,
    sword11,
    sword12,
  ];

  const handleQuit = () => {
    navigate("mainMenu");
    setIsPaused(false);
  };

  const renderItems = React.useMemo(() => {
    const items = [];

    let swordIndex = 0;

    for (let i = 0; i < 60; i++) {
      items.push(
        <div className={styles.inventoryItem} key={i}>
          <img src={swords[swordIndex]} alt="inventory item" />
        </div>
      );

      swordIndex++;

      if (swordIndex === swords.length) {
        swordIndex = 0;
      }
    }

    return items;
  }, []);

  if (!isPaused) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Game Paused</div>

      <div className={styles.inventory}>
        <div className={styles.inventoryHeader}>Inventory</div>

        <div className={styles.inventoryItems}>{renderItems}</div>
      </div>

      <button onClick={handleQuit} className={styles.button}>
        Quit to Main Menu
      </button>
    </div>
  );
};
