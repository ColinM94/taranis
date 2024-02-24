export const getControllerKeyName = (button: number) => {
  const buttonNames = [
    "A",
    "B",
    "X",
    "Y",
    "LB",
    "RB",
    "LT",
    "RT",
    "Back",
    "Start",
    "LS",
    "RS",
    "Up",
    "Down",
    "Left",
    "Right",
  ];

  return buttonNames[button];
};
