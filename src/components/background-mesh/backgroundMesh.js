import React from 'react';
import styled, { keyframes, css } from 'styled-components/macro';
import useMesh, { BLOCK_SIZE } from './useMesh';

const DivWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
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

const Spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const SpinAnimationMixin = css`
  animation: ${Spin} 8s linear infinite;
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
  opacity: 0;
  transition: all 0.1s ease-out;
  ${props => (props.active ? SpinAnimationMixin : 'none')};

  ${Column}:hover & {
    opacity: ${props => (props.theme === 'light' ? 0.6 : 0.6)};
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
                className="animated fadeInUp"
                style={{
                  animationDelay: `${i * 0.015 + j * 0.015}s`,
                }}
                key={`${j}_${column.visibility}`}
                onClick={() => toggleCircle(column)}>
                <Circle
                  theme={theme}
                  color={column.color}
                  active={column.active}
                  style={
                    column.active
                      ? {
                          background: column.color,
                          opacity: 0.5,
                          width: 12,
                          height: 12,
                          transform: `rotate(${column.rotation}deg)`,
                          borderRadius: '40% 60% 40% 60% / 35% 30% 70% 65%',
                          animationDuration: `${column.rotationSpeed}s`,
                        }
                      : {}
                  }
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
