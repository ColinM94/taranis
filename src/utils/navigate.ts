import { useGameStore } from "store";

const { setShowHud, setShowMainMenu, setShowSettingsMenu } =
  useGameStore.getState();

export const navigate = (key: "hud" | "mainMenu" | "settingsMenu" | "game") => {
  if (key === "hud") {
    setShowHud(true);
    setShowMainMenu(false);
    setShowSettingsMenu(false);
  } else if (key === "mainMenu") {
    setShowHud(false);
    setShowMainMenu(true);
    setShowSettingsMenu(false);
  } else if (key === "settingsMenu") {
    setShowHud(false);
    setShowMainMenu(false);
    setShowSettingsMenu(true);
  } else if (key === "game") {
    setShowHud(true);
    setShowMainMenu(false);
    setShowSettingsMenu(false);
  }
};
