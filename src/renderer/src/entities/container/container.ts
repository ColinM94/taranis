interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

export abstract class Container {
  x = 0;
  y = 0;
  width = 0;
  height = 0;

  constructor({ x, y, width, height }: Props) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  abstract update(): void;
}
