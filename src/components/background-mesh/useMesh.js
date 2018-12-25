import { useState, useEffect } from 'react';
import useWindowSize from '@rehooks/window-size';
import { getRandomInt } from '../../utils';

export const COLORS = [
  '#222A68',
  '#3B28CC',
  '#2667FF',
  '#DD503B',
  '#E0607E',
  '#EDAE49',
  '#CAD178',
  '#AAF683',
  '#61E8E1',
  '#F3E1BC',
];

export const STATUS = {
  VISIBLE: 1,
  HIDDEN: 2,
};

export const BLOCK_SIZE = 40;

const useMesh = () => {
  const { innerWidth, innerHeight } = useWindowSize();
  const [mesh, setMesh] = useState([[]]);

  useEffect(
    () => {
      const horizontalBlocks = Math.ceil(innerWidth / BLOCK_SIZE);
      const verticalBlocks = Math.ceil(innerHeight / BLOCK_SIZE);
      const newMesh = [...mesh];
      const hasLessRows = newMesh.length < verticalBlocks;
      const hasLessColumns = newMesh[0].length < horizontalBlocks;

      if (hasLessRows || hasLessColumns) {
        // Compute new mesh elements in viewport
        for (let i = 0; i < verticalBlocks; i++) {
          if (!newMesh[i]) {
            newMesh[i] = [];
          }

          for (let j = 0; j < horizontalBlocks; j++) {
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
        // Update visibility status of invisible rows/columns
        for (let i = 0; i < newMesh.length; i++) {
          for (let j = 0; j < newMesh[0].length; j++) {
            if (newMesh[i][j]) {
              newMesh[i][j] = {
                ...newMesh[i][j],
                status:
                  i >= verticalBlocks || j >= horizontalBlocks
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

  return mesh;
};

export default useMesh;
