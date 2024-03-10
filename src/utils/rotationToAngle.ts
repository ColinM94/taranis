export const rotationToAngle = (x: number, y: number) => {
  let angle = 0

  const halfPi = Math.PI / 2

  // Top right quadrant
  if (Object.is(x, 0)) {
    angle = ((y * -1) / halfPi) * 100
  }

  // Bottom right quadrant
  else if (x > 3.14) {
    angle = ((Math.PI + y) / halfPi) * 100
  }

  // Bottom left quadrant
  else if (x < -3.14) {
    angle = (y / halfPi) * 100 + 180
  }

  // Top left quadrant
  else if (Object.is(x, -0)) {
    angle = 360 + ((y * -1) / halfPi) * 100
  }

  return angle
}
