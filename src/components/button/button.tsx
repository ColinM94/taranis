import { classes } from "utils";
import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: ButtonProps) => {
  const { label, onClick, type = "default", className } = props;

  return (
    <button
      onClick={onClick}
      className={classes(
        styles.container,
        type === "default" && styles.default,
        type === "icon" && styles.icon,
        className
      )}
    >
      {label}
    </button>
  );
};
