import { classes } from "utils";
import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = ({ label, onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={classes(styles.button, className)}>
      Quit
    </button>
  );
};
