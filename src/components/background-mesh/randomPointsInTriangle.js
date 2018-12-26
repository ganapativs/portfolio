// https://stackoverflow.com/questions/19654251/random-point-inside-triangle-inside-java
// https://math.stackexchange.com/questions/18686/uniform-random-point-in-triangle
const RandomPointsInTriangle = (
  A = [0, 0],
  B = [0, 0],
  C = [0, 0],
  pointsCount = 0,
) => {
  const arr = new Array(pointsCount).fill(0);

  return arr.reduce((prev, curr) => {
    const r1 = Math.random();
    const r2 = Math.random();

    const x =
      (1 - Math.sqrt(r1)) * A[0] +
      Math.sqrt(r1) * (1 - r2) * B[0] +
      Math.sqrt(r1) * r2 * C[0];
    const y =
      (1 - Math.sqrt(r1)) * A[1] +
      Math.sqrt(r1) * (1 - r2) * B[1] +
      Math.sqrt(r1) * r2 * C[1];

    prev.push([Math.floor(x), Math.floor(y)]);

    return prev;
  }, []);
};

export default RandomPointsInTriangle;
