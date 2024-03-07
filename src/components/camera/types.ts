export interface Props {
  /** Lock camera to this X position. */
  x?: number;
  /** Lock camera to this Y position. */
  y?: number;
  defaultZoom?: number;
  defaultX?: number;
  defaultY?: number;
  children: React.ReactNode;
}
