import { useGameStore } from "store";

import styles from "./styles.module.scss";
import { navigate } from "utils";

export const PauseMenu = () => {
  const { isPaused, setIsPaused, game } = useGameStore();

  const handleQuit = () => {
    navigate("mainMenu");
    setIsPaused(false);
  };

  if (!isPaused) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>Game Paused</div>

      <div className={styles.inventory}>
        <div className={styles.inventoryHeader}>Inventory</div>
      </div>

      <button onClick={handleQuit} className={styles.button}>
        Quit to Main Menu
      </button>
    </div>
  );
};
