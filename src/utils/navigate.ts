import { useGameStore } from "store";

const { setActiveScreen } = useGameStore.getState();

export const navigate = (key: "preloader" | "mainMenu") => {
  setActiveScreen(key);
};
