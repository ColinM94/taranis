import { classes } from "utils";
import { ButtonProps } from "./types";
import styles from "./styles.module.scss";

export const Button = (props: ButtonProps) => {
  const { label, onClick, type = "default", onMouseOver, className } = props;

  return (
    <button
      onClick={onClick}
      onMouseOver={onMouseOver}
      className={classes(
        styles.container,
        type === "default" && styles.default,
        type === "icon" && styles.icon,
        type === "text" && styles.text,
        className
      )}
    >
      {label}
    </button>
  );
};
