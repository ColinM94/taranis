export interface ButtonProps {
  label: string;
  type: "default" | "icon";
  onClick: () => void;
  className?: string;
}
