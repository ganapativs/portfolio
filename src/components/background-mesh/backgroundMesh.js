import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components/macro';
import useMesh, { BLOCK_SIZE } from './useMesh';
import ThemeContext from '../../contexts/themeContext';

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
`;

const Circle = styled.div`
  background: var(--color-light-op-3);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: ${props => (props.theme === 'light' ? 0.7 : 0.3)};
  transition: opacity 0.1s ease-out, width 0.1s ease-out, height 0.1s ease-out;

  ${Column}:hover & {
    opacity: ${props => (props.theme === 'light' ? 0.9 : 0.5)};
    width: 20px;
    height: 20px;
    transition: opacity 0.2s ease-in, width 0.2s ease-in, height 0.2s ease-in;
  }
`;

const BackgroundMesh = React.memo(
  () => {
    const { theme } = useContext(ThemeContext);
    const mesh = useMesh();

    if (!mesh[0].length) {
      return null;
    }

    const Child = mesh.map((row, i) => {
      return (
        <Row key={i}>
          {row.map((column, j) => {
            return (
              <Column
                key={`${j}_${column.visibility}`}
                style={{
                  visibility: column.visibility ? 'visible' : 'hidden',
                }}>
                <Circle theme={theme} />
              </Column>
            );
          })}
        </Row>
      );
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
