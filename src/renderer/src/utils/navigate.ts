import { GameScreenProps } from "screens/gameScreen/types";
import { MainMenuScreenProps } from "screens/mainMenuScreen/types";
import { useGameStore } from "store";

const { setActiveScreen } = useGameStore.getState();

export type ActiveScreenPreloader = {
  name: "preloader";
  params: undefined;
};

export type ActiveScreenMainMenu = {
  name: "mainMenu";
  params: MainMenuScreenProps;
};

export type ActiveScreenSettings = {
  name: "settings";
  params: undefined;
};

export type ActiveScreenGame = {
  name: "game";
  params: GameScreenProps;
};

export type ActiveScreen =
  | ActiveScreenPreloader
  | ActiveScreenMainMenu
  | ActiveScreenSettings
  | ActiveScreenGame;

export const navigate = (
  name: ActiveScreen["name"],
  params?: ActiveScreen["params"]
) => {
  console.log("navigate", name, params);
  setActiveScreen(name, params);
};
