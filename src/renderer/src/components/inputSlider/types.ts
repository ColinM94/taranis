export interface InputSliderProps {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  className?: string;
}
