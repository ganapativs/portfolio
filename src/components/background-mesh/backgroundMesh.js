import React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import useMesh, { BLOCK_SIZE } from './useMesh';

const smallFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const DivWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: ${smallFadeIn};
`;

const Div = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: ${BLOCK_SIZE}px;
  height: ${BLOCK_SIZE}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Circle = styled.div`
  background: ${props =>
    props.theme === 'light'
      ? 'var(--color-light-op-2)'
      : 'var(--color-light-op-3)'};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: ${props => (props.theme === 'light' ? 0.2 : 0.2)};
  transition: all 0.1s ease-out;

  ${Column}:hover & {
    opacity: ${props => (props.theme === 'light' ? 0.4 : 0.4)};
    width: 20px;
    height: 20px;
    transition: all 0.2s ease-in;
  }
`;

const BackgroundMesh = React.memo(
  ({ theme }) => {
    const [mesh, toggleCircle] = useMesh();

    if (!mesh[0].length) {
      return null;
    }

    const Child = mesh.map((row, i) => {
      return row[0].visibility ? (
        <Row key={i}>
          {row.map((column, j) => {
            return (
              <Column
                key={`${j}_${column.visibility}`}
                onClick={() => toggleCircle(column)}>
                <Circle
                  theme={theme}
                  color={column.color}
                  style={{
                    background: column.active ? column.color : null,
                    opacity: column.active ? 0.7 : null,
                    width: column.active ? 12 : null,
                    height: column.active ? 12 : null,
                  }}
                />
              </Column>
            );
          })}
        </Row>
      ) : null;
    });

    return (
      <DivWrapper>
        <Div>{Child}</Div>
      </DivWrapper>
    );
  },
  () => true, // Never re-render
);

export default BackgroundMesh;
