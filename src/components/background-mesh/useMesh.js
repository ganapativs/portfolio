import { useState, useRef, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import { getRandomInt } from '../../utils';
import RandomPointsInTriangle from './randomPointsInTriangle';

export const COLORS = [
  '#222A68',
  '#3B28CC',
  '#2667FF',
  '#DD503B',
  '#E0607E',
  '#EDAE49',
  '#F3E1BC',
  '#CAD178',
  '#AAF683',
  '#61E8E1',
];

export const STATUS = {
  VISIBLE: 1,
  HIDDEN: 2,
};

export const BLOCK_SIZE = 40;

const useMesh = () => {
  const { innerWidth, innerHeight } = useWindowSize();
  const [mesh, setMesh] = useState([[]]);
  const horizontalBlocks = useRef(0);
  const verticalBlocks = useRef(0);

  useEffect(
    () => {
      horizontalBlocks.current = Math.ceil(innerWidth / BLOCK_SIZE);
      verticalBlocks.current = Math.ceil(innerHeight / BLOCK_SIZE);

      const newMesh = [...mesh.map(e => [...e])];
      const hasLessRows = newMesh.length < verticalBlocks.current;
      const hasLessColumns = newMesh[0].length < horizontalBlocks.current;

      if (hasLessRows || hasLessColumns) {
        // Scenario - when window is expanded in horizontal/vertical direction
        // Compute new mesh elements in viewport
        for (let i = 0; i < verticalBlocks.current; i++) {
          if (!newMesh[i]) {
            newMesh[i] = [];
          }

          for (let j = 0; j < horizontalBlocks.current; j++) {
            if (!newMesh[i][j]) {
              const colorIndex = getRandomInt(0, COLORS.length - 1);

              newMesh[i][j] = {
                status: STATUS.VISIBLE,
                color: COLORS[colorIndex],
                colorIndex,
                posX: i,
                posY: j,
              };
            }
          }
        }
      } else {
        // Scenario - when window is sized down in horizontal/vertical direction
        // Update visibility status of invisible rows/columns
        for (let i = 0; i < newMesh.length; i++) {
          for (let j = 0; j < newMesh[0].length; j++) {
            if (newMesh[i][j]) {
              newMesh[i][j] = {
                ...newMesh[i][j],
                status:
                  i >= verticalBlocks.current || j >= horizontalBlocks.current
                    ? STATUS.HIDDEN
                    : STATUS.VISIBLE,
              };
            }
          }
        }
      }

      setMesh(newMesh);
    },
    [innerWidth, innerHeight],
  );

  useEffect(() => {
    const randomTrianglePoints = RandomPointsInTriangle(
      [0, verticalBlocks.current],
      [verticalBlocks.current, horizontalBlocks.current],
      [horizontalBlocks.current, 0],
      (horizontalBlocks.current * verticalBlocks.current) / 4,
    );

    console.log(mesh, randomTrianglePoints);
  }, []);

  return mesh;
};

export default useMesh;
