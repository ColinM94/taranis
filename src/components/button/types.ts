export interface ButtonProps {
  label: string;
  type: "default" | "icon" | "text";
  onClick: () => void;
  onMouseOver?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}
