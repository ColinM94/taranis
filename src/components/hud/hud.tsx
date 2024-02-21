import * as React from "react";
import { useGameStore } from "store";

import { usePlayerStore } from "store/userPlayerStore";
import styles from "./styles.module.scss";

export const Hud = () => {
  const { showHud } = useGameStore();
  const { health, weapon } = usePlayerStore();

  if (!showHud) return null;

  return (
    <>
      <div className={styles.hud}>Health: {health}</div>
      <div className={styles.hud2}>Weapon: {weapon}</div>
    </>
  );
};
